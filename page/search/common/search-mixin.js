let isFunction = require('lodash/lang/isFunction');
let BuiltInSearchStore = Focus.search.builtInStore;

let SearchMixin = {
    getDefaultProps() {
        return ({
            store: BuiltInSearchStore
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
    _buildSearchCriteria(scope, query, facets) {
        return {
            criteria: {scope, query},
            pageInfos: {
                page: this.state.currentPage,
                order: this.state.orderSelected,
                group: this.state.groupSelectedKey
            },
            facets
        };
    },
    getSearchCriteria() {
        let facets = [];
        if (this.state.selectedFacetList) {
            facets = Object.keys(this.state.selectedFacetList).map((selectedFacetKey) => {
                let selectedFacet = this.state.selectedFacetList[selectedFacetKey];
                return {
                    key: selectedFacetKey,
                    value: selectedFacet.key
                };
            });
        }
        if(!isFunction(this.props.searchAction)){
          console.warn(`Your page seems to miss a search action, add in your props a {searchAction: function(scope, query, facets){}}`, this.props.searchAction);
        }
        return this._buildSearchCriteria(this.state.scope, this.state.query, facets);
    },
    search() {
        
        this.props.searchAction(
            this.getSearchCriteria()
        );
    }
};

module.exports = {
    mixin: SearchMixin
};
