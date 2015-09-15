// Dependencies

'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var builder = require('focus').component.builder;

var _require = require('lodash/collection');

var reduce = _require.reduce;

// Components

var Button = require('../../common/button/action').component;
var SelectAction = require('../../common/select-action').component;

var actionContextualMixin = {

    /**
    * Display name.
    */
    displayName: 'ActionContextual',

    /**
    * Init default props.
    * @returns {object} Default props.
    */
    getDefaultProps: function getDefaultProps() {
        return {
            buttonComponent: Button,
            operationList: [],
            operationParam: undefined
        };
    },
    /**
    * Init default state.
    * @returns {oject} Initial state.
    */
    getInitialState: function getInitialState() {
        return {
            isSecondaryActionListExpanded: false // true if secondary actionList is expanded.
        };
    },

    /**
    * Handle contextual action on click.
    * @param {string} key Action key.
    * @return {function} action handler.
    */
    _handleAction: function _handleAction(key) {
        var _props = this.props;
        var operationList = _props.operationList;
        var operationParam = _props.operationParam;

        return function (event) {
            event.preventDefault();
            event.stopPropagation();
            if (operationParam) {
                operationList[key].action(operationParam);
            } else {
                operationList[key].action();
            }
        };
    },

    /**
    * render the component.
    * @returns {JSX} Html code.
    */
    render: function render() {
        var _this = this;

        var _props2 = this.props;
        var operationList = _props2.operationList;
        var operationParam = _props2.operationParam;
        var buttonComponent = _props2.buttonComponent;
        var isSecondaryActionListExpanded = this.state.isSecondaryActionListExpanded;

        var _reduce = reduce(operationList, function (actionLists, operation, key) {
            var primaryActions = actionLists.primaryActionList;
            var secondaryActions = actionLists.secondaryActionList;

            if (1 === operation.priority) {
                primaryActions.push(React.createElement(_this.props.buttonComponent, _extends({
                    handleOnClick: _this._handleAction(key),
                    key: key,
                    label: operation.label,
                    shape: operation.style.shape || 'icon',
                    style: operation.style || {},
                    type: 'button'
                }, _this.props)));
            } else {
                secondaryActions.push(operation);
            }
            return actionLists;
        }, { primaryActionList: [], secondaryActionList: [] }, this);

        var primaryActionList = _reduce.primaryActionList;
        var secondaryActionList = _reduce.secondaryActionList;

        return React.createElement(
            'div',
            { className: 'list-action-contextual' },
            React.createElement(
                'span',
                null,
                primaryActionList
            ),
            React.createElement(SelectAction, {
                isExpanded: isSecondaryActionListExpanded,
                operationList: secondaryActionList,
                operationParam: operationParam
            })
        );
    }
};

module.exports = builder(actionContextualMixin);