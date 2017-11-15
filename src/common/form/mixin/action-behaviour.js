import isFunction from 'lodash/lang/isFunction';
import omit from 'lodash/object/omit';

import FocusException from 'focus-core/exception/focus-exception';

let actionMixin = {

    /**
     * Get the entity identifier for the form loading.
     * @returns {object} - The identifier of the entity.
     */
    _getId() {
        if (this.getId) {
            return this.getId();
        }
        return this.state.id;
    },
    /**
     * Get a clean state to send data to the server.
     * @returns {object} - The state json cleanded
     */
    _getCleanState() {
        return omit(this.state, ['reference', 'isLoading', 'isEdit']);
    },
    /**
     * Get entity from the state.
     * @return {object} - Clean state.
     */
    _getEntityFromHTMLAndState() {
        return this._getCleanState();
    },
    /**
     * Get the constructed entity from the state.
     * If you need to perform a custom getEntity just write a getEntity function in your mixin.
     * @returns {object} - the entity informations.
     */
    _getEntity() {
        if (this.getEntity) {
            return this.getEntity();
        }
        return this._getEntityFromHTMLAndState();
    },
    /**
     * This is the load action of the form.
     */
    _loadData() {
        if (!this.action || !isFunction(this.action.load)) {
            throw new FocusException('It seems your form component does not have a load action, and your props is set to hasLoad={true}.', this);
        }
        this.action.load.call(this, this._getId());
    },
    clearError() {
        for (let r in this.refs) {
            //If the reference has a getValue function if is read.
            if (this.refs[r] && isFunction(this.refs[r].setError)) {
                this.refs[r].setError(undefined);
            }
        }
    }
};

export default actionMixin;
