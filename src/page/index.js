// Dependencies
import React from 'react';
import { mixin as detailMixin } from './detail';
import search from './search';
import mixin from './mixin';
import list from './list';

/**
 * Helper to creates a detail page.
 * @param {object} config - The page configuration.
 * @returns {object} - The react component associated to the page.
 */
function createDetail(config) {
    config = config || {};
    if (config.mixins) {
        config.mixins.push(detailMixin);
    } else {
        config.mixins = [detailMixin];
    }
    return React.createClass(config);
}

export {
    detailMixin as detail,
    search,
    mixin,
    list,
    createDetail
}

//Function to help page creation.
export default {
    detail: detailMixin,
    search,
    mixin,
    list,
    createDetail
};
