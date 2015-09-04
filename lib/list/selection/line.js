// Dependencies

'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var types = require('focus').component.types;

// Components

var ContextualActions = require('../action-contextual').component;
var CheckBox = require('../../common/input/checkbox').component;

// Mixins

var translationMixin = require('../../common/i18n').mixin;
var referenceMixin = require('../../common/mixin/reference-property');
var definitionMixin = require('../../common/mixin/definition');
var builtInComponentsMixin = require('../mixin/built-in-components');

var lineMixin = {
    /**
    * React component name.
    */
    displayName: 'ListLine',

    /**
    * Mixin dependancies.
    */
    mixins: [translationMixin, definitionMixin, referenceMixin, builtInComponentsMixin],

    /**
     * Get default props
     * @return {object} default props
     */
    getDefaultProps: function getDefaultProps() {
        return {
            isSelection: true,
            operationList: []
        };
    },

    /**
    * line property validation.
    * @type {Object}
    */
    propTypes: {
        data: types('object'),
        isSelected: types('bool'),
        isSelection: types('bool'),
        onLineClick: types('func'),
        onSelection: types('func'),
        operationList: types('array')
    },

    /**
    * State initialization.
    * @return {object} initial state
    */
    getInitialState: function getInitialState() {
        return {
            isSelected: this.props.isSelected || false
        };
    },

    /**
     * Component will receive props
     * @param  {object} nextProps new component's props
     */
    componentWillReceiveProps: function componentWillReceiveProps(_ref) {
        var isSelected = _ref.isSelected;

        if (isSelected !== undefined) {
            this.setState({ isSelected: isSelected });
        }
    },

    /**
    * Get the line value.
    * @return {object} the line value
    */
    getValue: function getValue() {
        var _props = this.props;
        var item = _props.data;
        var isSelected = _props.isSelected;

        return { item: item, isSelected: isSelected };
    },

    /**
    * Selection Click handler.
    */
    _handleSelectionClick: function _handleSelectionClick() {
        var isSelected = !this.state.isSelected;
        var _props2 = this.props;
        var data = _props2.data;
        var onSelection = _props2.onSelection;

        this.setState({ isSelected: isSelected });
        if (onSelection) {
            onSelection(data, isSelected);
        }
    },

    /**
    * Line Click handler.
    */
    _handleLineClick: function _handleLineClick() {
        var _props3 = this.props;
        var data = _props3.data;
        var onLineClick = _props3.onLineClick;

        if (onLineClick) {
            onLineClick(data);
        }
    },

    /**
    * Render the left box for selection
    * @return {XML} the rendered selection box
    */
    _renderSelectionBox: function _renderSelectionBox() {
        var isSelection = this.props.isSelection;
        var isSelected = this.state.isSelected;

        if (isSelection) {
            var selectionClass = isSelected ? 'selected' : 'no-selection';
            //const image = this.state.isSelected? undefined : <img src={this.state.lineItem[this.props.iconfield]}/>
            return React.createElement(
                'div',
                { className: 'sl-selection ' + selectionClass },
                React.createElement(CheckBox, { onChange: this._handleSelectionClick, value: isSelected })
            );
        }
        return null;
    },

    /**
    * render content for a line.
    * @return {XML} the rendered line content
    */
    _renderLineContent: function _renderLineContent() {
        var data = this.props.data;
        var title = data.title;
        var body = data.body;

        if (this.renderLineContent) {
            return this.renderLineContent(data);
        } else {
            return React.createElement(
                'div',
                null,
                React.createElement(
                    'div',
                    null,
                    title
                ),
                React.createElement(
                    'div',
                    null,
                    body
                )
            );
        }
    },

    /**
    * Render actions which can be applied on the line
    * @return {XML} the rendered actions
    */
    _renderActions: function _renderActions() {
        var props = _extends({ operationParam: this.props.data }, this.props);
        if (0 < props.operationList.length) {
            return React.createElement(
                'div',
                { className: 'sl-actions' },
                React.createElement(ContextualActions, props)
            );
        }
    },

    /**
    * Render line in list.
    *  @return {XML} the rendered line
    */
    render: function render() {
        if (this.renderLine) {
            return this.renderLine();
        } else {
            return React.createElement(
                'li',
                { 'data-focus': 'sl-line' },
                this._renderSelectionBox(),
                React.createElement(
                    'div',
                    { className: 'sl-content', onClick: this._handleLineClick },
                    this._renderLineContent()
                ),
                this._renderActions()
            );
        }
    }
};

module.exports = { mixin: lineMixin };