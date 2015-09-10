'use strict';

var type = require('focus').component.types;

var paginationMixin = {
    /**
     * @inheritDoc
     */
    getDefaultProps: function getPaginationDefaultProps() {
        return {
            hasMoreData: false,
            isManualFetch: false
        };
    },

    propTypes: {
        hasMoreData: type('bool'),
        fetchNextPage: type('func'),
        isManualFetch: type('bool')
    },

    /**
     * Fetch the next page.
     * @param {number} page the page to fetch
     * @return {*} the next page
     */
    fetchNextPage: function fetchNextPage(page) {
        if (!this.props.hasMoreData) {
            return;
        }
        if (this.props.fetchNextPage) {
            return this.props.fetchNextPage(page);
        }
    },

    /**
     * handle manual fetch.
     * @param {object} event event received
     */
    handleShowMore: function handleShowMore(event) {
        this.nextPage++;
        this.fetchNextPage(this.nextPage);
    }
};

module.exports = { mixin: paginationMixin };