'use strict';

// Dependencies

var isFunction = require('lodash/lang/isFunction');

// Stores

var BuiltInSearchStore = Focus.search.builtInStore;

var SearchMixin = {
    getDefaultProps: function getDefaultProps() {
        return {
            store: BuiltInSearchStore.searchStore
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
     * State for a no fetch search.
     * @returns {object} current page set to 1.
     */
    getNoFetchState: function getNoFetchState() {
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
    _buildSearchCriteria: function _buildSearchCriteria(facets) {
        var query = Focus.search.builtInStore.queryStore.getQuery() || '';
        var scope = Focus.search.builtInStore.queryStore.getScope() || '';
        return {
            criteria: { scope: scope, query: query },
            pageInfos: {
                page: this.state.currentPage,
                order: this.state.orderSelected,
                group: this.state.groupSelectedKey
            },
            facets: facets
        };
    },
    getSearchCriteria: function getSearchCriteria() {
        if (!isFunction(this.props.searchAction)) {
            console.warn('Your page seems to miss a search action, add in your props a {searchAction: function(scope, query, facets){}}', this.props.searchAction);
        }
        return this._buildSearchCriteria(this.state.selectedFacetList);
    },
    search: function search() {
        this.props.searchAction(this.getSearchCriteria());
    }
};

module.exports = {
    mixin: SearchMixin
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJpc0Z1bmN0aW9uIiwicmVxdWlyZSIsIkJ1aWx0SW5TZWFyY2hTdG9yZSIsIkZvY3VzIiwic2VhcmNoIiwiYnVpbHRJblN0b3JlIiwiU2VhcmNoTWl4aW4iLCJnZXREZWZhdWx0UHJvcHMiLCJzdG9yZSIsInNlYXJjaFN0b3JlIiwiZmV0Y2hOZXh0UGFnZSIsInNldFN0YXRlIiwiaXNMb2FkaW5nIiwiY3VycmVudFBhZ2UiLCJzdGF0ZSIsImdldE5vRmV0Y2hTdGF0ZSIsIl9idWlsZFNlYXJjaENyaXRlcmlhIiwiZmFjZXRzIiwicXVlcnkiLCJxdWVyeVN0b3JlIiwiZ2V0UXVlcnkiLCJzY29wZSIsImdldFNjb3BlIiwiY3JpdGVyaWEiLCJwYWdlSW5mb3MiLCJwYWdlIiwib3JkZXIiLCJvcmRlclNlbGVjdGVkIiwiZ3JvdXAiLCJncm91cFNlbGVjdGVkS2V5IiwiZ2V0U2VhcmNoQ3JpdGVyaWEiLCJwcm9wcyIsInNlYXJjaEFjdGlvbiIsImNvbnNvbGUiLCJ3YXJuIiwic2VsZWN0ZWRGYWNldExpc3QiLCJtb2R1bGUiLCJleHBvcnRzIiwibWl4aW4iXSwibWFwcGluZ3MiOiI7O0FBQUE7O0FBRUEsSUFBSUEsYUFBYUMsUUFBUSx3QkFBUixDQUFqQjs7QUFFQTs7QUFFQSxJQUFJQyxxQkFBcUJDLE1BQU1DLE1BQU4sQ0FBYUMsWUFBdEM7O0FBRUEsSUFBSUMsY0FBYztBQUNkQyxtQkFEYyw2QkFDSTtBQUNkLGVBQVE7QUFDSkMsbUJBQU9OLG1CQUFtQk87QUFEdEIsU0FBUjtBQUdILEtBTGE7O0FBTWQ7OztBQUdBQyxpQkFUYywyQkFTRTtBQUNaLGFBQUtDLFFBQUwsQ0FBYztBQUNWQyx1QkFBVyxJQUREO0FBRVZDLHlCQUFhLEtBQUtDLEtBQUwsQ0FBV0QsV0FBWCxHQUF5QjtBQUY1QixTQUFkLEVBR0csS0FBS1QsTUFIUjtBQUlILEtBZGE7O0FBZWQ7Ozs7QUFJQVcsbUJBbkJjLDZCQW1CSTtBQUNkLGVBQU87QUFDSEYseUJBQWE7QUFEVixTQUFQO0FBR0gsS0F2QmE7O0FBd0JkOzs7Ozs7O0FBT0FHLHdCQS9CYyxnQ0ErQk9DLE1BL0JQLEVBK0JlO0FBQ3pCLFlBQUlDLFFBQVFmLE1BQU1DLE1BQU4sQ0FBYUMsWUFBYixDQUEwQmMsVUFBMUIsQ0FBcUNDLFFBQXJDLE1BQW1ELEVBQS9EO0FBQ0EsWUFBSUMsUUFBUWxCLE1BQU1DLE1BQU4sQ0FBYUMsWUFBYixDQUEwQmMsVUFBMUIsQ0FBcUNHLFFBQXJDLE1BQW1ELEVBQS9EO0FBQ0EsZUFBTztBQUNIQyxzQkFBVSxFQUFDRixZQUFELEVBQVFILFlBQVIsRUFEUDtBQUVITSx1QkFBVztBQUNQQyxzQkFBTSxLQUFLWCxLQUFMLENBQVdELFdBRFY7QUFFUGEsdUJBQU8sS0FBS1osS0FBTCxDQUFXYSxhQUZYO0FBR1BDLHVCQUFPLEtBQUtkLEtBQUwsQ0FBV2U7QUFIWCxhQUZSO0FBT0haO0FBUEcsU0FBUDtBQVNILEtBM0NhO0FBNENkYSxxQkE1Q2MsK0JBNENNO0FBQ2hCLFlBQUcsQ0FBQzlCLFdBQVcsS0FBSytCLEtBQUwsQ0FBV0MsWUFBdEIsQ0FBSixFQUF5QztBQUNyQ0Msb0JBQVFDLElBQVIsQ0FBYSwrR0FBYixFQUE4SCxLQUFLSCxLQUFMLENBQVdDLFlBQXpJO0FBQ0g7QUFDRCxlQUFPLEtBQUtoQixvQkFBTCxDQUEwQixLQUFLRixLQUFMLENBQVdxQixpQkFBckMsQ0FBUDtBQUNILEtBakRhO0FBa0RkL0IsVUFsRGMsb0JBa0RMO0FBQ0wsYUFBSzJCLEtBQUwsQ0FBV0MsWUFBWCxDQUNJLEtBQUtGLGlCQUFMLEVBREo7QUFHSDtBQXREYSxDQUFsQjs7QUF5REFNLE9BQU9DLE9BQVAsR0FBaUI7QUFDYkMsV0FBT2hDO0FBRE0sQ0FBakIiLCJmaWxlIjoiaXMtcmVhY3QtY2xhc3MtY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gRGVwZW5kZW5jaWVzXHJcblxyXG5sZXQgaXNGdW5jdGlvbiA9IHJlcXVpcmUoJ2xvZGFzaC9sYW5nL2lzRnVuY3Rpb24nKTtcclxuXHJcbi8vIFN0b3Jlc1xyXG5cclxubGV0IEJ1aWx0SW5TZWFyY2hTdG9yZSA9IEZvY3VzLnNlYXJjaC5idWlsdEluU3RvcmU7XHJcblxyXG5sZXQgU2VhcmNoTWl4aW4gPSB7XHJcbiAgICBnZXREZWZhdWx0UHJvcHMoKSB7XHJcbiAgICAgICAgcmV0dXJuICh7XHJcbiAgICAgICAgICAgIHN0b3JlOiBCdWlsdEluU2VhcmNoU3RvcmUuc2VhcmNoU3RvcmVcclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcbiAgICAvKipcclxuICAgICAqIE5leHQgcGFnZSBmZXRjaCBhY3Rpb24gaGFuZGxlci5cclxuICAgICAqL1xyXG4gICAgZmV0Y2hOZXh0UGFnZSgpIHtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgICAgICAgaXNMb2FkaW5nOiB0cnVlLFxyXG4gICAgICAgICAgICBjdXJyZW50UGFnZTogdGhpcy5zdGF0ZS5jdXJyZW50UGFnZSArIDFcclxuICAgICAgICB9LCB0aGlzLnNlYXJjaCk7XHJcbiAgICB9LFxyXG4gICAgLyoqXHJcbiAgICAgKiBTdGF0ZSBmb3IgYSBubyBmZXRjaCBzZWFyY2guXHJcbiAgICAgKiBAcmV0dXJucyB7b2JqZWN0fSBjdXJyZW50IHBhZ2Ugc2V0IHRvIDEuXHJcbiAgICAgKi9cclxuICAgIGdldE5vRmV0Y2hTdGF0ZSgpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBjdXJyZW50UGFnZTogMVxyXG4gICAgICAgIH07XHJcbiAgICB9LFxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBzZWFyY2ggY3JpdGVyaWEgc2VudCB0byB0aGUgc3RvcmUuXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc2NvcGUgQ3VycmVudCBzY29wZS5cclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBxdWVyeSBDdXJyZW50IHF1ZXJ5LlxyXG4gICAgICogQHBhcmFtIHtvYmplY3R9IGZhY2V0cyBTZWxlY3RlZCBmYWNldHMuXHJcbiAgICAgKiBAcmV0dXJucyB7b2JqZWN0fSBGb3JtYXR0ZWQgY3JpdGVyaWEge2NyaXRlcmlhOnt9LCBwYWdlc0luZm9zOnt9LCBmYWNldHM6e319LlxyXG4gICAgICovXHJcbiAgICBfYnVpbGRTZWFyY2hDcml0ZXJpYShmYWNldHMpIHtcclxuICAgICAgICBsZXQgcXVlcnkgPSBGb2N1cy5zZWFyY2guYnVpbHRJblN0b3JlLnF1ZXJ5U3RvcmUuZ2V0UXVlcnkoKSB8fCAnJztcclxuICAgICAgICBsZXQgc2NvcGUgPSBGb2N1cy5zZWFyY2guYnVpbHRJblN0b3JlLnF1ZXJ5U3RvcmUuZ2V0U2NvcGUoKSB8fCAnJztcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBjcml0ZXJpYToge3Njb3BlLCBxdWVyeX0sXHJcbiAgICAgICAgICAgIHBhZ2VJbmZvczoge1xyXG4gICAgICAgICAgICAgICAgcGFnZTogdGhpcy5zdGF0ZS5jdXJyZW50UGFnZSxcclxuICAgICAgICAgICAgICAgIG9yZGVyOiB0aGlzLnN0YXRlLm9yZGVyU2VsZWN0ZWQsXHJcbiAgICAgICAgICAgICAgICBncm91cDogdGhpcy5zdGF0ZS5ncm91cFNlbGVjdGVkS2V5XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGZhY2V0c1xyXG4gICAgICAgIH07XHJcbiAgICB9LFxyXG4gICAgZ2V0U2VhcmNoQ3JpdGVyaWEoKSB7XHJcbiAgICAgICAgaWYoIWlzRnVuY3Rpb24odGhpcy5wcm9wcy5zZWFyY2hBY3Rpb24pKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUud2FybignWW91ciBwYWdlIHNlZW1zIHRvIG1pc3MgYSBzZWFyY2ggYWN0aW9uLCBhZGQgaW4geW91ciBwcm9wcyBhIHtzZWFyY2hBY3Rpb246IGZ1bmN0aW9uKHNjb3BlLCBxdWVyeSwgZmFjZXRzKXt9fScsIHRoaXMucHJvcHMuc2VhcmNoQWN0aW9uKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2J1aWxkU2VhcmNoQ3JpdGVyaWEodGhpcy5zdGF0ZS5zZWxlY3RlZEZhY2V0TGlzdCk7XHJcbiAgICB9LFxyXG4gICAgc2VhcmNoKCkge1xyXG4gICAgICAgIHRoaXMucHJvcHMuc2VhcmNoQWN0aW9uKFxyXG4gICAgICAgICAgICB0aGlzLmdldFNlYXJjaENyaXRlcmlhKClcclxuICAgICAgICApO1xyXG4gICAgfVxyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcbiAgICBtaXhpbjogU2VhcmNoTWl4aW5cclxufTtcclxuIl19