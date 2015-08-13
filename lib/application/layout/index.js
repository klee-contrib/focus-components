// Dependencies

'use strict';

var builder = require('focus').component.builder;

// Components

var AppHeader = require('./app-header');
var LoadingBar = require('../loading-bar').component;
var MessageCenter = require('../message-center').component;
var ErrorCenter = require('../error-center').component;

// Mixins

var stylableBehaviour = require('../../mixin/stylable');

var contentActionsMixin = {
    mixins: [stylableBehaviour],
    getDefaultProps: function getDefaultProps() {
        return {
            AppHeader: AppHeader,
            LoadingBar: LoadingBar,
            MessageCenter: MessageCenter,
            ErrorCenter: ErrorCenter,
            footerText: 'Please override the footer text by giving a "footerText" property to the Layout component.'
        };
    },
    render: function render() {
        return React.createElement(
            'div',
            { className: this._getStyleClassName(), 'data-focus': 'layout' },
            React.createElement(this.props.LoadingBar, null),
            React.createElement(this.props.MessageCenter, null),
            React.createElement(this.props.ErrorCenter, null),
            React.createElement(this.props.AppHeader, null),
            React.createElement(
                'div',
                { 'data-focus': 'menu' },
                this.props.MenuLeft && React.createElement(this.props.MenuLeft, null)
            ),
            React.createElement('div', { 'data-focus': 'page-content' }),
            React.createElement(
                'footer',
                { 'data-focus': 'footer' },
                this.props.footerText
            ),
            this.props.children
        );
    }
};

module.exports = builder(contentActionsMixin);