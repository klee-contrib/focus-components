'use strict';

var Dropdown = FocusComponents.common.selectAction.component;
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

return React.createElement(Dropdown, { operationList: operationList });