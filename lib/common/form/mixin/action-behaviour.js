'use strict';

var assign = require('object-assign');
var isFunction = require('lodash/lang/isFunction');
var omit = require('lodash/object/omit');

var FocusException = require('focus').exception.FocusException;

var actionMixin = {

    /**
       * Get the entity identifier for the form loading.
       * @returns {object} - The identifier of the entity.
       */
    _getId: function _getId() {
        if (this.getId) {
            return this.getId();
        }
        return this.state.id;
    },
    /**
     * Get a clean state to send data to the server.
     * @returns {object} - The state json cleanded
     */
    _getCleanState: function _getCleanState() {
        return omit(this.state, ['reference', 'isLoading', 'isEdit']);
    },
    /**
     * Compute the entity read from the html givent the keys and the definition Path, this operation is reversed from the _computeEntityFromStore operation.
     * @param {object} htmlData - Data read from the html form.
     * @returns {object} - The computed entity from html.
     */
    _computeEntityFromHtml: function _computeEntityFromHtml(htmlData) {
        var DEF = this.definitionPath + '.';
        var EMPTY = '';
        var computedEntity = {};
        for (var prop in htmlData) {
            computedEntity[prop.replace(DEF, EMPTY)] = htmlData[prop];
        }
        return computedEntity;
    },
    /**
     * Get entity from the state, and the HTML.
     * @return {object} - Combinaison of state and HTML builded entity.
     */
    _getEntityFromHTMLAndState: function _getEntityFromHTMLAndState() {
        //Build the entity value from the ref getVaue.
        var htmlData = {};
        var refs = this.refs;

        for (var r in refs) {
            //If the reference has a getValue function if is read.
            if (refs[r] && isFunction(refs[r].getValue)) {
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
    _getEntity: function _getEntity() {
        if (this.getEntity) {
            return this.getEntity();
        }
        return this._getEntityFromHTMLAndState();
    },
    /**
     * This is the load action of the form.
     */
    _loadData: function _loadData() {
        if (!this.action || !isFunction(this.action.load)) {
            throw new FocusException('It seems your form component does not have a load action, and your props is set to hasLoad={true}.', this);
        }
        this.action.load.call(this, this._getId());
    },
    clearError: function clearError() {
        for (var r in this.refs) {
            //If the reference has a getValue function if is read.
            if (this.refs[r] && isFunction(this.refs[r].setError)) {
                this.refs[r].setError(undefined);
            }
        }
    }
};

module.exports = actionMixin;