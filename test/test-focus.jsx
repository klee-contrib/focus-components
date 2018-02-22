import TestUtils from 'react-dom/test-utils';
import React from 'react';
import ReactDOM from 'react-dom';
const { renderIntoDocument, findRenderedDOMComponentWithClass, findAllInRenderedTree, isDOMComponent, isCompositeComponent } = TestUtils;

const { forEach } = require('lodash/collection');

//DOM elements
export const TAG_DIV = 'DIV';
export const TAG_INPUT = 'INPUT';

//DOM attributes
export const ATTR_ID = 'id';
export const ATTR_VALUE = 'value';
//Focus attributes
export const ATTR_DATA_FOCUS = 'data-focus';
export const ATTR_DATA_ROLE = 'data-role';

//Focus value
export const VAL_DATA_FOCUS_BUTTON = 'icon-dropdown';
export const VAL_DATA_FOCUS_MENU = 'dropdown-menu';
export const VAL_DATA_ROLE_DROPDOWN_ITEM = 'dropdown-item';

/**
 * filter components having a specific attr
 * @param attr
 * @returns {Function} the filter function
 */
export function filtreAttr(attr) {
    return function (cpt) {
        return (isDOMComponent(cpt) && cpt.hasAttribute(attr));
    };
}
/**
 * filter components having a specific attr with a corresponding value
 * @param attr
 * @param val
 * @returns {Function} the filter function
 */
export function filtreAttrVal(attr, val) {
    return function (cpt) {
        return (isDOMComponent(cpt) && (cpt.getAttribute(attr) === val));
    };
}
/**
 * filter components having a specific text content
 * @param text
 * @returns {Function} the filter function
 */
export function filtreTextContent(text) {
    return function (cpt) {
        return (isDOMComponent(cpt) && cpt.textContent == text);
    };
}

/**
 * filter components having a specific inner html
 * @param text
 * @returns {Function} the filter function
 */
export function filtreInnerHTML(text) {
    return function (cpt) {
        return (isDOMComponent(cpt) && cpt.innerHTML == text);
    };
}

/**
 * get children components having a data-focus attribute
 * @param reactComponent
 * @returns {Object} components array
 */
export function findDataFocusElements(reactComponent) {
    return findAllInRenderedTree(reactComponent, filtreAttr(ATTR_DATA_FOCUS));
}

/**
 * get children components having a data-focus attribute with a corresponding value
 * @param reactComponent
 * @returns {Object} components array
 */
export function findFocusElementsWithDataFocus(reactComponent, attrValue) {
    return findAllInRenderedTree(reactComponent, filtreAttrVal(ATTR_DATA_FOCUS, attrValue));
}

/**
 * get children components having a data-role attribute
 * @param reactComponent
 * @returns {Object} components array
 */
export function findFocusElementsWithDataRole(reactComponent, attrValue) {
    return findAllInRenderedTree(reactComponent, filtreAttrVal(ATTR_DATA_ROLE, attrValue));
}

/**
 * get children components having a data-role attribute with a corresponding value
 * @param reactComponent
 * @returns {Object} components array
 */
export function findDataRoleElements(reactComponent) {
    return findAllInRenderedTree(reactComponent, filtreAttr(ATTR_DATA_ROLE));
}

/**
 * get children components having a specific id
 * @param reactComponent
 * @returns {Object} components array
 */
export function findElementWithId(reactComponent, idName) {
    const filtreId = filtreAttrVal('id', idName);
    return findAllInRenderedTree(testDocument, filtreId);
}

/**
 * get children components having a specific inner html
 * @param reactComponent
 * @returns {Object} components array
 */
export function findElementWithInnerHTML(reactComponent, innerHtml) {
    const filtreText = filtreInnerHTML(innerHtml);
    return findAllInRenderedTree(reactComponent, filtreText);
}

/**
 * get children components having a specific value
 * @param reactComponent
 * @returns {Object} components array
 */
export function findElementWithValue(reactComponent) {
    return findAllInRenderedTree(reactComponent, filtreAttr(ATTR_VALUE));
}

/**
 * log main informations about a DOM component 
 * @param domComponent
 */
function logAttributes(domComponent) {
    console.log();
    if (Array.isArray(domComponent)) {
        console.log('Array: cannot be inspected !!!');
    } else {
        console.log('tagName', domComponent.tagName);
        const arrAttr = domComponent.attributes;
        forEach(arrAttr, (attr => {
            console.log('attr ' + attr.name, attr.value);
        }
        ));
        console.log('textContent', domComponent.textContent);
    }
    console.log();
}

/**
 * filter for DOM components
 * @returns {function] true for DOM component
 */
export function filtreLog() {
    return function (cpt) {
        if (isDOMComponent(cpt)) {
            logAttributes(cpt);
        }
        return true;
    };
}

/**
 * for debug purpose to understand component structure
 * log tagName, textCont and attributes/values
 * @param domComponent DOM component to inspect
 */
export function logElements(domComponent) {

    if (isCompositeComponent(domComponent)) {
        logAttributes(domComponent);
        findAllInRenderedTree(domComponent, filtreLog());
    } else {
        logAttributes(domComponent);
    }
}

/**
 * find Dom node corresponding to the react component
 * @param reactComponent react Component
 * @returns {*} Dom node
 */
export function findDOMNode(reactComponent) {
    return ReactDOM.findDOMNode(reactComponent);
}

