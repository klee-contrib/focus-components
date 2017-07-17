
import TestUtils from 'react-addons-test-utils';
import React from 'react';

const ReactDOM = require('react-dom');
const { renderIntoDocument, findRenderedDOMComponentWithClass, findAllInRenderedTree, isDOMComponent } = TestUtils;
//Focus attributes
export const ATTR_DATA_FOCUS = 'data-focus';
export const ATTR_DATA_ROLE = 'data-role';

//Focus value
export const VAL_DATA_FOCUS_BUTTON = 'icon-dropdown';
export const VAL_DATA_FOCUS_MENU = 'dropdown-menu';
export const VAL_DATA_ROLE_ITEM = 'dropdown-item';

export function filtreAttr(attr) {
    return function (cpt) {
        return (isDOMComponent(cpt) && cpt.hasAttribute(attr));
    };
}

export function filtreAttrVal(attr, val) {
    return function (cpt) {
        return (isDOMComponent(cpt) && (cpt.getAttribute(attr) === val));
    };
}

export function findDataFocusElements(renderedTest) {
    return (findAllInRenderedTree(renderedTest, filtreAttr(ATTR_DATA_FOCUS)));
}

export function findFocusElementsWithDataFocus(renderedTest, attrValue) {
    return (findAllInRenderedTree(renderedTest, filtreAttrVal(ATTR_DATA_FOCUS, attrValue)));
}

export function findFocusElementsWithDataRole(renderedTest, attrValue) {
    return (findAllInRenderedTree(renderedTest, filtreAttrVal(ATTR_DATA_ROLE, attrValue)));
}

export function findDataRoleElements(renderedTest) {
    return (findAllInRenderedTree(renderedTest, filtreAttr(ATTR_DATA_ROLE)));
}

