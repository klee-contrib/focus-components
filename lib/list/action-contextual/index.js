/**@jsx*/
'use strict';

var builder = require('focus').component.builder;
var Button = require('../../common/button/action').component;
var SelectAction = require('../../common/select-action').component;

var actionContextualMixin = {

    /**
     * Display name.
     */
    displayName: 'list-action-contextual',

    /**
     * Init default props.
     * @returns {object} Default props.
     */
    getDefaultProps: function getDefaultProps() {
        return {
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
     * handle contextual action on click.
     * @param {string} key Action key.
     */
    _handleAction: function handleContextualAction(key) {
        var _this = this;

        return function (event) {
            event.preventDefault();
            if (_this.props.operationParam) {
                _this.props.operationList[key].action(_this.props.operationParam);
            } else {
                _this.props.operationList[key].action();
            }
        };
    },

    /**
     * render the component.
     * @returns {JSX} Html code.
     */
    render: function renderContextualAction() {
        var primaryActionList = [];
        var secondaryActionList = [];
        for (var key in this.props.operationList) {
            var operation = this.props.operationList[key];
            if (operation.priority === 1) {
                primaryActionList.push(React.createElement(Button, { key: key, style: operation.style, handleOnClick: this._handleAction(key), shape: operation.style.shape || 'raised', label: operation.label }));
            } else {
                secondaryActionList.push(operation);
            }
        }
        return React.createElement(
            'div',
            { className: 'list-action-contextual' },
            React.createElement(
                'span',
                null,
                ' ',
                primaryActionList
            ),
            React.createElement(SelectAction, { operationList: secondaryActionList, operationParam: this.props.operationParam, isExpanded: this.state.isSecondaryActionListExpanded })
        );
    }
};

module.exports = builder(actionContextualMixin);