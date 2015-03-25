var assign = require('object-assign');

/**
 * Mixin used in order to create a block.
 * @type {Object}
 */
var InfiniteScrollPageMixin = {

    /**
     * intial state for a scrolling page.
     * @returns {*} the initial state
     */
    getInitialState: function getInfiniteScrollInitialState() {
        //var additionalStateData = this.getAdditionalStateData ? this.getAdditionalStateData() : {};
        return assign({
                hasMoreData: false,
                currentPage: 1
            },
            this.getScrollState()
        );
    },

    /**
     * current state of the scrolling list.
     * @returns {*} the scroll state
     */
    getScrollState: function _getScrollState() {
        if (this.store) {
            var data = this.store.get();
            var hasMoreData = data.pageInfos && data.pageInfos.totalPages && data.pageInfos.currentPage < data.pageInfos.totalPages;
            var totalRecords = data.pageInfos && data.pageInfos.totalRecords !== undefined ? data.pageInfos.totalRecords : undefined;
            return {
                list: data.list || [],
                hasMoreData: hasMoreData,
                totalRecords: totalRecords,
                isLoading: false
            };
        }
        return {};
    },

    /**
     * State for a no fetch search.
     * @returns {object} currentpage set to 1.
     */
    getNoFetchState: function getNoFetchState() {
        return {
            currentPage: 1
        };
    },

    /**
     * Next page fetch action handler.
     */
    fetchNextPage: function fetchNextPage() {
        this.setState({
            isLoading: true,
            currentPage: this.state.currentPage + 1
        }, this.search);
    },
    /**
     * Returns the search criteria sended to the store.
     * @param {string} scope Current scope.
     * @param {string} query Current query.
     * @param {object} facets Selected facets.
     * @returns {object} Formatted criteria {criteria:{}, pagesInfos:{}, facets:{}}.
     */
    getSearchCriteria: function getSearchCriteria(scope, query, facets) {
        return {
            criteria: {
                scope: scope,
                query: query
            },
            pageInfos: {
                page: this.state.currentPage,
                order: this.state.orderSelected,
                group: this.state.groupSelectedKey
            },
            facets: facets
        };
    }
};

module.exports = {mixin: InfiniteScrollPageMixin};