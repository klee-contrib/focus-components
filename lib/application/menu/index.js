// Dependencies

'use strict';

var builder = require('focus').component.builder;

var Backbone = require('backbone');

var types = require('focus').component.types;

// Mixins

var popinProperties = require('../mixin/popin-behaviour').mixin;
var stylabe = require('../../mixin/stylable');

// Components

var Button = require('../../common/button/action').component;

var Menu = {
    mixins: [stylabe, popinProperties], /** @inheritedProps*/
    /** @inheritedProps*/
    getDefaultProps: function getDefaultProps() {
        return {
            items: []
        };
    },
    /** @inheritedProps*/
    propTypes: {
        code: types('array')
    },
    /**
    * Toggle the state of the menu.
    */
    toggle: function toggle() {
        this.setState({ open: !this.state.open });
    },
    /**
    * Render the links of the menu
    */
    _renderMenuItems: function _renderMenuItems() {
        var _this = this,
            _arguments = arguments;

        return this.props.items.map(function (link, idx) {
            var clickHandler = undefined;
            if (link.route !== undefined) {
                clickHandler = function () {
                    link.onClick.call(_this, _arguments);
                    Backbone.history.navigate(link.route, true);
                };
            } else {
                clickHandler = link.onClick;
            }
            var buttonProps = {
                icon: link.icon,
                style: link.style,
                option: 'link',
                shape: 'icon',
                type: 'button'
            };
            return React.createElement(
                'li',
                { key: idx, onClick: clickHandler },
                React.createElement(Button, buttonProps),
                React.createElement(
                    'span',
                    null,
                    link.name
                )
            );
        });
    },
    /** @inheriteddoc */
    render: function render() {
        var _props = this.props;
        var direction = _props.direction;
        var position = _props.position;
        var children = _props.children;

        var className = 'menu menu-' + direction + ' menu-' + position + ' menu-' + (this.state.open ? 'open' : '') + ' ' + this._getStyleClassName();
        return React.createElement(
            'nav',
            { className: className, 'data-focus': 'menu' },
            React.createElement('div', { 'data-focus': 'menu-brand' }),
            React.createElement(
                'ul',
                { 'data-focus': 'menu-items' },
                this._renderMenuItems()
            ),
            children
        );
    }
};

module.exports = builder(Menu);