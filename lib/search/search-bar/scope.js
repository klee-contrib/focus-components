// Dependencies
'use strict';

var builder = require('focus').component.builder;
var type = require('focus').component.types;
var uuid = require('uuid');
var find = require('lodash/collection/find');

// Components
var Icon = require('../../common/icon').component;
var Dropdown = require('../../common/select-action').component;
var componentHandler = window.componentHandler;

// Mixins
var i18nMixin = require('../../common/i18n/mixin');

var operationList = [{
    label: 'Action_a',
    action: function action() {
        alert('Actiona');
    }
}, {
    label: 'Action_b',
    action: function action() {
        alert('Actionb');
    }
}, {
    label: 'Action_c',
    action: function action() {
        alert('Actionc');
    }
}];

var scopeMixin = {
    /**
    * Component tag name.
    * @type {String}
    */
    displayName: 'Scope',
    mixins: [i18nMixin],
    /**
    * Component default properties.
    * @return {Object} the default props.
    */
    getDefaultProps: function getDefaultProps() {
        return {
            list: [],
            isDeployed: false
        };
    },
    /**
    * Scope property validation.
    * @type {Object}
    */
    propTypes: {
        list: type('array'),
        isDeployed: type('bool'),
        value: type(['string', 'number'])
    },
    /**
    * Get the initial state from the data.
    * @return {Object} the initial state
    */
    getInitialState: function getInitialState() {
        return {
            isDeployed: this.props.isDeployed
        };
    },
    /**
    * Called when component is mounted.
    */
    componentDidMount: function componentDidMount() {
        if (React.findDOMNode(this.refs.dropdown)) {
            componentHandler.upgradeElement(React.findDOMNode(this.refs.dropdown));
        }
    },
    /**
     * Component will receive props.
     * @param {Object} nextProps the next props
     */
    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
        if (React.findDOMNode(this.refs.scopeDropdown)) {
            componentHandler.upgradeElement(React.findDOMNode(this.refs.scopeDropdown));
        }
    },
    /**
    * Called before component is unmounted.
    */
    componentWillUnmount: function componentWillUnmount() {
        if (React.findDOMNode(this.refs.scopeDropdown)) {
            componentHandler.downgradeElements(React.findDOMNode(this.refs.scopeDropdown));
        }
    },
    /**
    * Get the scope click handler, based on the scope given as an argument.
    * @param  {String} code   the clicked scope's code
    * @return {Function}  the scope click handler
    */
    _getScopeClickHandler: function _getScopeClickHandler(_ref) {
        var _this = this;

        var code = _ref.code;
        var onScopeSelection = this.props.onScopeSelection;

        return function () {
            _this.setState({
                isDeployed: false
            });
            if (onScopeSelection) {
                onScopeSelection(code);
            }
        };
    },
    /**
    * Handle the click on the scope element.
    */
    _handleDeployClick: function _handleDeployClick() {
        this.setState({
            isDeployed: !this.state.isDeployed
        });
    },
    /**
    * Return the css class for the scope.
    * @return {String} the current scope's classname
    */
    getActiveScopeIcon: function getActiveScopeIcon() {
        var _props = this.props;
        var list = _props.list;
        var value = _props.value;

        var activeScope = find(list, { code: value });
        if (!activeScope) {
            return 'list';
        }
        return activeScope.code;
    },
    /**
    * Render the scope list if it is deployed
    * @return {HTML} the rendered scope list
    */
    _renderScopeList: function _renderScopeList() {
        var _this2 = this;

        var _props2 = this.props;
        var scopeList = _props2.list;
        var value = _props2.value;

        return React.createElement(
            'ul',
            { className: 'mdl-menu mdl-menu--bottom-left mdl-js-menu mdl-js-ripple-effect', 'data-focus': 'search-bar-scopes', htmlFor: 'dropdown', ref: 'scopeDropdown' },
            0 < scopeList.length && scopeList.map(function (scope) {
                var isActive = value === scope.code;
                return React.createElement(
                    'li',
                    { className: 'mdl-menu__item', 'data-active': isActive, key: scope.code || uuid.v4(), onClick: _this2._getScopeClickHandler(scope) },
                    scope.code && React.createElement(Icon, { name: scope.code }),
                    React.createElement(
                        'span',
                        null,
                        scope.label
                    )
                );
            }),
            0 === scopeList.length && React.createElement(
                'li',
                { className: 'mdl-menu__item' },
                this.i18n('scopes.empty')
            )
        );
    },
    /**
    * Render the complete scope element.
    * @return {object} - The jsx element.
    */
    render: function render() {
        var isDeployed = this.state.isDeployed;

        var activeIcon = this.getActiveScopeIcon();
        var deployedIcon = isDeployed ? 'keyboard_arrow_up' : 'keyboard_arrow_down';
        return React.createElement(
            'div',
            { 'data-focus': 'search-bar-scope' },
            React.createElement(
                'button',
                { className: 'mdl-button mdl-js-button', id: 'dropdown', onClick: this._handleDeployClick },
                React.createElement(Icon, { name: deployedIcon }),
                React.createElement(Icon, { name: activeIcon })
            ),
            this._renderScopeList()
        );
    }
};
module.exports = builder(scopeMixin);