// Dependencies
import isFunction from 'lodash/lang/isFunction';
// Stores
import { BuiltInSearchStore } from 'focus-core/search';

const SearchMixin = {
    getDefaultProps() {
        return ({
            store: BuiltInSearchStore.searchStore
        });
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
     * State for a no fetch search.
     * @returns {object} current page set to 1.
     */
    getNoFetchState() {
        return {
            currentPage: 1
        };
    },
    /**
     * Returns the search criteria sent to the store.
     * @param {string} scope Current scope.
     * @param {string} query Current query.
     * @param {object} facets Selected facets.
     * @returns {object} Formatted criteria {criteria:{}, pagesInfos:{}, facets:{}}.
     */
    _buildSearchCriteria(facets) {
        let query = Focus.search.builtInStore.queryStore.getQuery() || '';
        let scope = Focus.search.builtInStore.queryStore.getScope() || '';
        return {
            criteria: { scope, query },
            pageInfos: {
                page: this.state.currentPage,
                order: this.state.orderSelected,
                group: this.state.groupSelectedKey
            },
            facets
        };
    },
    getSearchCriteria() {
        if (!isFunction(this.props.searchAction)) {
            console.warn('Your page seems to miss a search action, add in your props a {searchAction: function(scope, query, facets){}}', this.props.searchAction);
        }
        return this._buildSearchCriteria(this.state.selectedFacetList);
    },
    search() {
        this.props.searchAction(
            this.getSearchCriteria()
        );
    }
};

export { SearchMixin as mixin };
export default { mixin: SearchMixin };
