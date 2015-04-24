var React = require('react');
var type = require('focus').component.types;
var translationMixin = require('../../common/i18n').mixin;
var referenceMixin = require('../../common/mixin/reference-property');
var definitionMixin = require('../../common/mixin/definition');
var builtInComponentsMixin = require('../mixin/built-in-components');

var lineMixin = {
    /**
     * React component name.
     */
    displayName: 'table-line',

    /**
     * Mixin dependancies.
     */
    mixins: [translationMixin, definitionMixin, referenceMixin, builtInComponentsMixin],

    getDefaultProps: function getLineDefaultProps(){
        return {

        };
    },

    /**
     * line property validation.
     * @type {Object}
     */
    propTypes: {
        saveAction: type('func'),
        deleteAction: type('func'),
        onLineClick: type('func')
    },

    renderActions: function renderLineActions(){

    },

    render: function renderLine(){

    }
};

module.exports = {mixin: lineMixin};
