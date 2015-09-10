// Dependencies

'use strict';

var builder = require('focus').component.builder;

// Components

var AppHeaderDefault = require('./app-header');
var LoadingBarDefault = require('../loading-bar').component;
var MessageCenterDefault = require('../message-center').component;
var ErrorCenterDefault = require('../error-center').component;

// Mixins

var stylableBehaviour = require('../../mixin/stylable');

var contentActionsMixin = {
    mixins: [stylableBehaviour],
    /** inheriteddoc */
    getDefaultProps: function getDefaultProps() {
        return {
            AppHeader: AppHeaderDefault,
            LoadingBar: LoadingBarDefault,
            MessageCenter: MessageCenterDefault,
            ErrorCenter: ErrorCenterDefault,
            footerText: 'Please override the footer text by giving a "footerText" property to the Layout component.'
        };
    },
    /** inheriteddoc */
    render: function render() {
        var _props = this.props;
        var LoadingBar = _props.LoadingBar;
        var MessageCenter = _props.MessageCenter;
        var ErrorCenter = _props.ErrorCenter;
        var AppHeader = _props.AppHeader;
        var MenuLeft = _props.MenuLeft;
        var footerText = _props.footerText;
        var children = _props.children;

        return React.createElement(
            'div',
            { className: this._getStyleClassName(), 'data-focus': 'layout' },
            React.createElement(LoadingBar, null),
            React.createElement(MessageCenter, null),
            React.createElement(ErrorCenter, null),
            React.createElement(AppHeader, null),
            React.createElement(
                'div',
                { 'data-focus': 'menu' },
                MenuLeft && React.createElement(MenuLeft, null)
            ),
            React.createElement('div', { 'data-focus': 'page-content' }),
            React.createElement(
                'footer',
                { 'data-focus': 'footer' },
                footerText
            ),
            children
        );
    }
};

module.exports = builder(contentActionsMixin);