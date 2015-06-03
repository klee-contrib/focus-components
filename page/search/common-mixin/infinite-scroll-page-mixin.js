let assign = require('object-assign');

/**
 * Infinite scroll mixin.
 * @type {Object}
 */
let InfiniteScrollPageMixin = {
    /**
     * Initial state for a scrolling page.
     * @returns {*} the initial state
     */
    getInitialState() {
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
    getScrollState() {
        if (this.store) {
            let data = this.store.get();
            let hasMoreData = data.pageInfos && data.pageInfos.totalPages && data.pageInfos.currentPage < data.pageInfos.totalPages;
            let totalRecords = data.pageInfos ? data.pageInfos.totalRecords : undefined;
            return {
                list: data.list || [],
                hasMoreData,
                totalRecords,
                isLoading: false
            };
        } else {
            return {};
        }
    },
    /**
     * State for a no fetch search.
     * @returns {object} currentpage set to 1.
     */
    getNoFetchState() {
        return {
            currentPage: 1
        };
    },
    /**
     * Next page fetch action handler.
     */
    fetchNextPage() {
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
    getSearchCriteria(scope, query, facets) {
        return {
            criteria: {scope, query},
            pageInfos: {
                page: this.state.currentPage,
                order: this.state.orderSelected,
                group: this.state.groupSelectedKey
            },
            facets
        };
    }
};

module.exports = {mixin: InfiniteScrollPageMixin};
