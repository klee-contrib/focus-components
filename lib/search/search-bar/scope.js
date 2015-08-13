'use strict';

var builder = require('focus').component.builder;
var type = require('focus').component.types;
var uuid = require('uuid');
var find = require('lodash/collection/find');

var scopeMixin = {
    /**
     * Component tag name.
     * @type {String}
     */
    displayName: 'Scope',
    /**
     * Component default properties.
     */
    getDefaultProps: function getDefaultProps() {
        return {
            list: [],
            value: undefined,
            isDeployed: false,
            onScopeSelection: undefined
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
     */
    getInitialState: function getInitialState() {
        return {
            isDeployed: this.props.isDeployed
        };
    },
    _getClassName: function _getClassName() {
        return 'form-control ' + (this.props.className ? this.props.className : '');
    },
    _onScopeClickHandler: function _onScopeClickHandler(scope) {
        var _this = this;

        return function () {
            _this.setState({
                isDeployed: false
            });
            _this.props.onScopeSelection(scope.code);
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
     */
    scopeStyle: function scopeStyle() {
        var activeScope = find(this.props.list, { code: this.props.value });
        if (!activeScope) {
            return 'sb-scope-none';
        }
        return activeScope.style || 'sb-scope sb-scope-' + activeScope.code;
    },
    renderScopeList: function renderScopeList() {
        var _this2 = this;

        if (!this.state.isDeployed) {
            return;
        }
        var scopes = this.props.list.map(function (scope) {
            var selectedValue = _this2.props.value === scope.code ? 'active' : '';
            //Add defaut Style to scope if not define
            var scopeCss = scope.style;
            if (!scopeCss) {
                scopeCss = 'sb-scope sb-scope-' + scope.code;
            }
            scope.style = scopeCss;

            return React.createElement(
                'li',
                { key: scope.code || uuid.v4(), className: selectedValue + ' ' + scope.style, onClick: _this2._onScopeClickHandler(scope) },
                scope.label
            );
        });
        return React.createElement(
            'ul',
            { className: 'sb-scope-list' },
            scopes
        );
    },
    /**
     * Render the complete scope element.
     * @return {object} - The jsx element.
     */
    render: function render() {
        var cssClass = 'sb-scope-deploy ' + (this.state.isDeployed ? 'up' : 'down');
        return React.createElement(
            'div',
            { className: this._getClassName(), 'data-focus': 'scope' },
            React.createElement(
                'div',
                { className: cssClass, onClick: this._handleDeployClick },
                React.createElement('div', { className: this.scopeStyle() })
            ),
            this.renderScopeList()
        );
    }
};

module.exports = builder(scopeMixin);