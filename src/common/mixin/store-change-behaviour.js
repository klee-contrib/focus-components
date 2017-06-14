import message from 'focus-core/message';
import { changeMode } from 'focus-core/application';
import reduce from 'lodash/collection/reduce';

const changeBehaviourMixin = {
    getInitialState: function getInitialState() {
        return {};
    },
    componentWillMount() {
        this._isMountedChangeBehaviourMixin = false;
        this._pendingActionsChangeBehaviourMixin = [];
    },
    componentDidMount() {
        this._isMountedChangeBehaviourMixin = true;
        this._pendingActionsChangeBehaviourMixin.forEach(func => func());
        this._pendingActionsChangeBehaviourMixin = [];
    },
    componentWillUnmount() {
        this._isMountedChangeBehaviourMixin = false;
    },

    /**
    * Display a message when there is a change on a store property resulting from a component action call.
    * @param  {object} changeInfos - An object containing all the event informations, without the data.
    * @return {function} - An override function can be called.
    */
    _displayMessageOnChange: function displayMessageOnChange(changeInfos) {
        if (this.displayMessageOnChange) {
            return this.displayMessageOnChange(changeInfos);
        }
        if (changeInfos && changeInfos.status && changeInfos.status.name) {
            switch (changeInfos.status.name) {
                /* case 'loading':
                Focus.message.addInformationMessage('detail.loading');
                break;
                case 'loaded':
                Focus.message.addSuccessMessage('detail.loaded');
                break;
                case 'saving':
                Focus.message.addInformationMessage('detail.saving');
                break;*/
                case 'saved':
                    //Maybe the action result or the event should have a caller notion.
                    message.addSuccessMessage('detail.saved');
                    //Change the page mode as edit
                    this.setState({ isEdit: false }, () => {
                        changeMode('consult', 'edit');
                    });
                    break;
                default:
                    break;
            }
        }
    },
    _afterChange: function afterChangeWrapper(changeInfos) {
        if (this._isMountedChangeBehaviourMixin) {
            this._afterChangeWrapped(changeInfos);
        } else {
            this._pendingActionsChangeBehaviourMixin.push(() => this._afterChangeWrapped(changeInfos));
        }
    },
    /**
    * After change informations.
    * You can override this method using afterChange function.
    * @param {object} changeInfos - All informations relative to the change.
    * @returns {undefined} -  The return value is the callback.
    */
    _afterChangeWrapped: function afterChangeFormWrapped(changeInfos) {
        if (this.afterChange) {
            return this.afterChange(changeInfos);
        }
        //If there is no callerId in the event, the display message does not have any sens.
        //Other component responding to the store property change does not need to react on it.
        if (changeInfos && changeInfos.informations && changeInfos.informations.callerId && this._identifier === changeInfos.informations.callerId) {
            return this._displayMessageOnChange(changeInfos);
        }

    },
    _onChange: function _onChangeWrapper(changeInfos) {
        if (this._isMountedChangeBehaviourMixin) {
            this._onChangeWrapped(changeInfos);
        } else {
            this._pendingActionsChangeBehaviourMixin.push(() => this._onChangeWrapped(changeInfos));
        }
    },
    /**
    * Event handler for 'change' events coming from the stores
    * @param {object} changeInfos - The changing informations.
    */
    _onChangeWrapped: function onFormStoreChangeHandler(changeInfos) {
        let onChange = this.props.onChange || this.onChange;
        if (onChange) {
            onChange.call(this, changeInfos);
        }
        this.setState(this._getStateFromStores(changeInfos.property), () => this._afterChange(changeInfos));
    },
    _onError: function _onErrorWrapper(changeInfos) {
        if (this._isMountedChangeBehaviourMixin) {
            this._onErrorWrapped(changeInfos);
        } else {
            this._pendingActionsChangeBehaviourMixin.push(() => this._onErrorWrapped(changeInfos));
        }
    },
    /**
    * Event handler for 'error' events coming from the stores.
    */
    _onErrorWrapped: function onFormErrorHandler(changeInfos) {
        this.setState(this._getLoadingStateFromStores(), () => this._handleErrors(changeInfos)); // update errors after status
    },
    _handleErrors() {
        const errorState = this._getErrorStateFromStores();
        if (this.definitionPath) {
            // In case we have a definitionPath, we might want to trigger a setError on the corresponding field
            for (let key in errorState) {
                // Let's find that corresponding field, considering that the ref might not directly be 'storeNode.fieldName', but in fact 'entityPath.fieldName'
                const ref = reduce(this.refs, (acc, value, candidateRef) => {
                    const candidate = candidateRef.replace(`${this.definitionPath}.`, ''); // Remove the 'definitionPath.'
                    if (candidate === key.match(/([^\.]*)$/)[0]) { // Look for the 'fieldName' part of 'storeNode.fieldName'
                        acc = value;
                    }
                    return acc;
                }, null);
                if (ref) { // If we found it, then bingo
                    ref.setError(errorState[key]);
                }
            }
        }
    },
    _onStatus: function _onStatusWrapper(changeInfos) {
        if (this._isMountedChangeBehaviourMixin) {
            this._onStatusWrapped(changeInfos);
        } else {
            this._pendingActionsChangeBehaviourMixin.push(() => this._onStatusWrapped(changeInfos));
        }
    },  
    /**
    * Read
    * @param  {[type]} changeInfos [description]
    * @return {[type]}             [description]
    */
    _onStatusWrapped: function _onStatus(changeInfos) {
        if (this._getEntity) {
            this.setState({ ...this._getEntity(), ...this._getLoadingStateFromStores() });
        } else {
            this.setState(this._getLoadingStateFromStores());
        }

    }
};
export default changeBehaviourMixin;
