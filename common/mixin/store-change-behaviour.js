var changeBehaviourMixin = {
    /**
     * Display a message on change.
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
                    Focus.message.addSuccessMessage('detail.saved');
                    //Change the page mode as edit
                    this.setState({isEdit: false});
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
        return this._displayMessageOnChange(changeInfos);
    },
    /**
     * Event handler for 'change' events coming from the stores
     * @param {object} changeInfos - The changing informations.
     */
    _onChange: function onFormStoreChangeHandler(changeInfos) {
        var onChange =  this.props.onChange || this.onChange;
        if (onChange) {
            onChange.call(this,changeInfos);
        }
        this.setState(this._getStateFromStores(), this._afterChange(changeInfos));
    },
    /**
     * Event handler for 'error' events coming from the stores.
     */
    _onError: function onFormErrorHandler() {
        var errorState = this._getErrorStateFromStores();
        for (var key in errorState) {
            if (this.refs[key]) {
                this.refs[key].setError(errorState[key]);
            }
        }
    }
};
module.exports = changeBehaviourMixin;
