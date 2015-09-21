let assign = require('object-assign');
let isFunction = require('lodash/lang/isFunction');
let omit = require('lodash/object/omit');
let {FocusException} = require('focus-core').exception;
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
     * Get entity from the state, and the HTML.
     * @return {object} - Combinaison of state and HTML builded entity.
     */
    _getEntityFromHTMLAndState(){
        //Build the entity value from the ref getVaue.
        let htmlData = {};
        let {refs} = this;
        for(let r in refs){
             //If the reference has a getValue function if is read.
            if(refs[r] && isFunction(refs[r].getValue)){
                htmlData[r] = refs[r].getValue();
            }
        }
        //Maybe a merge cold be done if we need a deeper property merge.
        return assign({}, this._getCleanState(), this._computeEntityFromHtml(htmlData));
    },
  /**
   * Get the constructed entity from the state.
   * If you need to perform a custom getEntity just write a getEntity function in your mixin.
   * @returns {object} - the entity informations.
   */
    _getEntity(){
        if(this.getEntity){
            return this.getEntity();
        }
        return this._getEntityFromHTMLAndState();
    },
    /**
     * This is the load action of the form.
     */
    _loadData(){
        if(!this.action || !isFunction(this.action.load)){
            throw new FocusException('It seems your form component does not have a load action, and your props is set to hasLoad={true}.', this);
        }
        this.action.load.call(this, this._getId());
    },
    clearError(){
        for(let r in this.refs){
            //If the reference has a getValue function if is read.
            if(this.refs[r] && isFunction(this.refs[r].setError)){
                this.refs[r].setError(undefined);
            }
        }
    }
};


module.exports = actionMixin;
