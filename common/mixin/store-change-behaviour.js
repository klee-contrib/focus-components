let message = require('focus').message;
let changeBehaviourMixin = {
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
                    this.setState({isEdit: false});
                    break;
                default:
                    break;
            }
        }
    },
    /**
     * After change informations.
     * You can override this method using afterChange function.
     * @param {object} changeInfos - All informations relative to the change.
     * @returns {undefined} -  The return value is the callback.
     */
    _afterChange: function afterChangeForm(changeInfos) {
        if (this.afterChange) {
            return this.afterChange(changeInfos);
        }
        //If there is no callerId in the event, the display message does not have any sens.
        //Other component responding to the store property change does not need to react on it.
        if(changeInfos && changeInfos.informations && changeInfos.informations.callerId && this._identifier === changeInfos.informations.callerId){
            return this._displayMessageOnChange(changeInfos);
        }

    },
    /**
     * Event handler for 'change' events coming from the stores
     * @param {object} changeInfos - The changing informations.
     */
    _onChange: function onFormStoreChangeHandler(changeInfos) {
        let onChange = this.props.onChange || this.onChange;
        if (onChange) {
            onChange.call(this, changeInfos);
        }
        this.setState(this._getStateFromStores(), this._afterChange(changeInfos));
    },
    /**
     * Event handler for 'error' events coming from the stores.
     */
    _onError: function onFormErrorHandler() {
        let errorState = this._getErrorStateFromStores();
        for (let key in errorState) {
            if (this.refs[key]) {
                this.refs[key].setError(errorState[key]);
            }
        }
    }
};
module.exports = changeBehaviourMixin;
