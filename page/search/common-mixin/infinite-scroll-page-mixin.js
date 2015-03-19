
var assign = require('object-assign');

/**
 * Mixin used in order to create a block.
 * @type {Object}
 */
var InfiniteScrollPageMixin = {

    getInfiniteScrollInitialState: function getInfiniteScrollInitialState() {
        return {
            hasMoreData: false,
            isLoading:false,
            currentPage:1
        }
    },
    getInfiniteScrollStateFromStore: function getSearchStateFromStore(){
        if(this.store){
            var data = this.store.get();
            var hasMoreData = data.pageInfos && data.pageInfos.totalPages? data.pageInfos.currentPage < data.pageInfos.totalPages : false;
            return {
                list: data.list || [],
                hasMoreData: hasMoreData
            }
        }
        return {};
    },
    /**
     * Handler when store emit a change event.
     */
    onSearchChange: function onSearchChange() {
        console.log("Search success on mixin change");
        this.setState(assign({isLoading:false}, this._getStateFromStore()));

    },
    fetchNextPage: function fetchNextPage(){
        this.setState({
            isLoading:true,
            currentPage: this.state.currentPage + 1
        });
        this.search();
    },

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
        }
    }

}
module.exports = {mixin : InfiniteScrollPageMixin};