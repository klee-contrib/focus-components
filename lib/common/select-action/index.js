'use strict';

var builder = require('focus').component.builder;
var React = require('react');
var uuid = require('uuid');
var Button = require('../../common/button/action').component;
var types = require('focus').component.types;

var componentHandler = window.componentHandler;

var Dropdown = {

    /**
    * Display name.
    */
    displayName: 'Dropdown',
    /**
    * Default props.
    * @returns {object} Defauilt props.
    */
    getDefaultProps: function getDefaultProps() {
        return {
            position: 'right',
            iconProps: {
                name: 'more_vert'
            },
            shape: 'icon',
            operationList: []
        };
    },
    /**
    * Scope property validation.
    * @type {Object}
    */
    propTypes: {
        position: types('string'),
        iconProps: types('object'),
        operationList: types('array'),
        shape: types('string')
    },
    /**
     * Component will mount
     */
    componentWillMount: function componentWillMount() {
        this._htmlId = uuid.v4();
    },
    /**
    * Called when component is mounted.
    */
    componentDidMount: function componentDidMount() {
        if (0 !== this.props.operationList.length && React.findDOMNode(this.refs.dropdown)) {
            componentHandler.upgradeElement(React.findDOMNode(this.refs.dropdown));
        }
    },
    /**
     * Component will receive props.
     * @param {Object} nextProps the next props
     */
    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
        if (0 !== nextProps.operationList.length && React.findDOMNode(this.refs.dropdown)) {
            componentHandler.upgradeElement(React.findDOMNode(this.refs.dropdown));
        }
    },
    /**
    * Called before component is unmounted.
    */
    componentWillUnmount: function componentWillUnmount() {
        if (0 !== this.props.operationList.length && React.findDOMNode(this.refs.dropdown)) {
            componentHandler.downgradeElements(React.findDOMNode(this.refs.dropdown));
        }
    },
    /**
    * Handle action on selected item.
    * @param {function} action Action to call
    * @returns {function} Function called when item is selected.
    * @private
    */
    _handleAction: function _handleAction(action) {
        var _this = this;

        return function () {
            if (_this.props.operationParam) {
                action(_this.props.operationParam);
            } else {
                action();
            }
        };
    },
    /**
    * Render the component.
    * @returns  {XML} Htm code.
    */
    render: function render() {
        var _this2 = this;

        var _props = this.props;
        var iconProps = _props.iconProps;
        var operationList = _props.operationList;
        var shape = _props.shape;

        var id = this._htmlId;
        if (0 === operationList.length) {
            return null;
        }
        return React.createElement(
            'div',
            null,
            React.createElement(Button, { icon: iconProps.name, id: id, isJs: true, shape: shape }),
            React.createElement(
                'ul',
                { className: 'mdl-menu mdl-menu--bottom-{position} mdl-js-menu mdl-js-ripple-effect', htmlFor: id, ref: 'dropdown' },
                operationList.map(function (operation, idx) {
                    return React.createElement(
                        'li',
                        { className: 'mdl-menu__item ' + operation.style, key: idx, onClick: _this2._handleAction(operation.action) },
                        operation.label
                    );
                })
            )
        );
    }
};

module.exports = builder(Dropdown);