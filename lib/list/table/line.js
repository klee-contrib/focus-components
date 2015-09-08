// Dependencies

'use strict';

var type = require('focus').component.types;

// Mixins

var translationMixin = require('../../common/i18n').mixin;
var referenceMixin = require('../../common/mixin/reference-property');
var definitionMixin = require('../../common/mixin/definition');
var builtInComponentsMixin = require('../mixin/built-in-components');

// Components

var ContextualActions = require('../action-contextual').component;

var lineMixin = {
    /**
     * React component name.
     */
    displayName: 'table-line',

    /**
     * Mixin dependancies.
     */
    mixins: [translationMixin, definitionMixin, referenceMixin, builtInComponentsMixin],

    /**@inheritDoc**/
    getDefaultProps: function getDefaultProps() {
        return {};
    },

    /**@inheritDoc**/
    getInitialState: function getInitialState() {
        return {};
    },

    /**
     * line property validation.
     * @type {Object}
     */
    propTypes: {
        data: type('object'),
        saveAction: type('func'),
        deleteAction: type('func'),
        onLineClick: type('func'),
        onSelection: type('func'),
        operationList: type('array', true)
    },

    /**
     * Render line Actions.
     */
    renderLineActions: function renderLineActions() {
        if (this.props.operationList.length > 0) {
            return React.createElement(
                'div',
                { 'data-focus': 'table-line-actions' },
                React.createElement(ContextualActions, { operationList: this.props.operationList, operationParam: this.props.data })
            );
        }
    },
    _onLineClickHandler: function _onLineClickHandler(data) {
        var _this = this;

        return function () {
            _this.props.onLineClick(data);
        };
    },
    render: function render() {
        return this.renderLineContent(this.props.data);
    }
};

module.exports = { mixin: lineMixin };