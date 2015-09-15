'use strict';

var _Focus = Focus;
var dispatcher = _Focus.dispatcher;

var CartridgeContent = React.createClass({
    displayName: 'CartridgeContent',

    render: function render() {
        return React.createElement(
            'div',
            null,
            'CARTOUCHE'
        );
    }
});
var Summary = React.createClass({
    displayName: 'Summary',

    render: function render() {
        return React.createElement(
            'div',
            null,
            'SUMMARY'
        );
    }
});
var BarContentRight = React.createClass({
    displayName: 'BarContentRight',

    render: function render() {
        return React.createElement(
            'div',
            null,
            'BAR RIGHT'
        );
    }
});
var BarContentLeft = React.createClass({
    displayName: 'BarContentLeft',

    render: function render() {
        return React.createElement(
            'div',
            null,
            'BAR LEFT'
        );
    }
});
var MENU = React.createClass({
    displayName: 'MENU',

    render: function render() {
        return React.createElement(
            'nav',
            null,
            'MENU'
        );
    }
});
//Simple function to update components in the bar.
function updateComponents(cartridgeConf) {
    var cartridgeComponent = cartridgeConf.cartridge;
    var summaryComponent = cartridgeConf.summary;
    var actions = cartridgeConf.actions;
    var barContentLeftComponent = cartridgeConf.barLeft;
    var barContentRightComponent = cartridgeConf.barRight;

    dispatcher.handleViewAction({
        data: {
            cartridgeComponent: cartridgeComponent,
            summaryComponent: summaryComponent,
            actions: actions,
            barContentLeftComponent: barContentLeftComponent,
            barContentRightComponent: barContentRightComponent
        },
        type: 'update'
    });
}
//Add a defer in order to inject the props after the component is mounted
_.defer(function () {
    updateComponents({
        cartridge: { component: CartridgeContent, props: {} },
        summary: { component: Summary, props: {} },
        actions: {
            primary: [],
            secondary: []
        },
        barLeft: { component: BarContentLeft, props: {} },
        barRight: { component: BarContentRight, props: {} }
    });
});

var Layout = FocusComponents.application.layout.component;
var LayoutExample = React.createClass({
    displayName: 'LayoutExample',

    render: function render() {
        return React.createElement(
            Layout,
            { MenuLeft: MENU },
            'Test'
        );
    }
});

return React.createElement(LayoutExample, null);