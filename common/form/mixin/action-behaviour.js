let assign = require('object-assign');
let isFunction = require('lodash/lang/isFunction');
let omit = require('lodash/object/omit');
let {FocusException} = require('focus').exception;
let actionMixin = {

/**
   * Get the entity identifier for the form loading.
   * @returns {object} - The identifier of the entity.
   */
    _getId() {
        if(this.getId){
            return this.getId();
        }
        return this.state.id;
    },
  /**
   * Get a clean state to send data to the server.
   * @returns {object} - The state json cleanded
   */
    _getCleanState(){
        return omit(this.state, ['reference', 'isLoading', 'isEdit']);
    },
  /**
   * Compute the entity read from the html givent the keys and the definition Path, this operation is reversed from the _computeEntityFromStore operation.
   * @param {object} htmlData - Data read from the html form.
   * @returns {object} - The computed entity from html.
   */
    _computeEntityFromHtml(htmlData){
        const DEF = `${this.definitionPath}.`;
        const EMPTY = '';
        let computedEntity = {};
        for(let prop in htmlData){
            computedEntity[prop.replace(DEF, EMPTY)] = htmlData[prop];
        }
        return computedEntity;
    },
  /**
   * Get the constructed entity from the state.
   * @returns {object} - the entity informations.
   */
    _getEntity(){
        if(this.getEntity){
            return this.getEntity();
        }
        //Build the entity value from the ref getVaue.
        let htmlData = {};
        for(let r in this.refs){
             //If the reference has a getValue function if is read.
            if(this.refs[r] && isFunction(this.refs[r].getValue)){
                htmlData[r] = this.refs[r].getValue();
            }
        }
        //Maybe a merge cold be done if we need a deeper property merge.
        return assign({}, this._getCleanState(), this._computeEntityFromHtml(htmlData));
    },
  /**
   * Load data action call.
   */
    _loadData(){
        if(!this.action || !isFunction(this.action.load)){
            throw new FocusException('It seems your form component does not have a load action, and your props is set to hasLoad={true}.', this);
        }
        this.action.load(this._getId());
    },
    clearError(){
        for(let r in this.refs){
            //If the reference has a getValue function if is read.
            if(this.refs[r] && isFunction(this.refs[r].getValue)){
                this.refs[r].setError(undefined);
            }
        }
    }
};


module.exports = actionMixin;
