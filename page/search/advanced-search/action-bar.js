'use strict';

var _builder = require('focus-core/component/builder');

var _builder2 = _interopRequireDefault(_builder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Dependencies
var React = require('react');

var _require = require('lodash/collection'),
    reduce = _require.reduce;

var _require2 = require('lodash/object'),
    omit = _require2.omit;

// Components

var ListActionBar = require('../../../list/action-bar/index').component;

//Mixins

var i18nMixin = require('../../../common/i18n/mixin');

var Bar = {
    mixins: [i18nMixin],
    /**
     * Get the default props
     * @return {object} the default props
     */
    getDefaultProps: function getDefaultProps() {
        return {
            action: undefined,
            groupableColumnList: {},
            groupingKey: undefined,
            hasGrouping: true,
            lineOperationList: undefined,
            orderableColumnList: {},
            orderSelected: undefined,
            selectionAction: undefined,
            selectionStatus: undefined,
            selectedFacets: {}
        };
    },

    /**
     * Filter the facet list so that the scope facet is not displayed
     * @return {object} The filtered facet list
     */
    _filterFacetList: function _filterFacetList() {
        var _this = this;

        var selectedFacets = this.props.selectedFacets;

        return reduce(selectedFacets, function (result, facet, facetKey) {
            result[facetKey] = {
                label: _this.i18n('live.filter.facets.' + facetKey),
                value: facet.data.label
            };
            return result;
        }, {});
    },

    /**
     * On facet click, remove it from the selected facets, and update the store
     * @param  {string} key The facet key to remove
     */
    _onFacetClick: function _onFacetClick(key) {
        var _props = this.props,
            selectedFacets = _props.selectedFacets,
            updateProperties = _props.action.updateProperties;

        updateProperties({ selectedFacets: omit(selectedFacets, key) });
    },

    /**
     * Update the store to ask for a new results order
     * @param  {string} key   the filed key to sort by
     * @param  {boolean} order the sort direciton, ascending or descending
     */
    _orderAction: function _orderAction(key, order) {
        this.props.action.updateProperties({
            sortBy: key,
            sortAsc: order
        });
    },

    /**
     * Group by the given key
     * @param  {string} key The facet key to base the grouping on
     */
    _groupAction: function _groupAction(key) {
        this.props.action.updateProperties({
            groupingKey: key
        });
    },

    /**
     * Render the component
     * @return {HTML} the rendered component
     */
    render: function render() {
        var _props2 = this.props,
            groupableColumnList = _props2.groupableColumnList,
            groupingKey = _props2.groupingKey,
            hasGrouping = _props2.hasGrouping,
            isSelection = _props2.isSelection,
            operationList = _props2.operationList,
            orderableColumnList = _props2.orderableColumnList,
            selectionAction = _props2.selectionAction,
            selectionStatus = _props2.selectionStatus,
            sortBy = _props2.sortBy;

        return React.createElement(ListActionBar, {
            'data-focus': 'advanced-search-action-bar',
            facetClickAction: this._onFacetClick,
            facetList: this._filterFacetList(),
            groupAction: this._groupAction,
            groupableColumnList: groupableColumnList,
            groupLabelPrefix: 'live.filter.facets.',
            groupSelectedKey: groupingKey,
            hasGrouping: hasGrouping,
            isSelection: isSelection,
            operationList: operationList,
            orderAction: this._orderAction,
            orderSelected: sortBy,
            orderableColumnList: orderableColumnList,
            selectionAction: selectionAction,
            selectionStatus: selectionStatus
        });
    }
};

module.exports = (0, _builder2.default)(Bar);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJSZWFjdCIsInJlcXVpcmUiLCJyZWR1Y2UiLCJvbWl0IiwiTGlzdEFjdGlvbkJhciIsImNvbXBvbmVudCIsImkxOG5NaXhpbiIsIkJhciIsIm1peGlucyIsImdldERlZmF1bHRQcm9wcyIsImFjdGlvbiIsInVuZGVmaW5lZCIsImdyb3VwYWJsZUNvbHVtbkxpc3QiLCJncm91cGluZ0tleSIsImhhc0dyb3VwaW5nIiwibGluZU9wZXJhdGlvbkxpc3QiLCJvcmRlcmFibGVDb2x1bW5MaXN0Iiwib3JkZXJTZWxlY3RlZCIsInNlbGVjdGlvbkFjdGlvbiIsInNlbGVjdGlvblN0YXR1cyIsInNlbGVjdGVkRmFjZXRzIiwiX2ZpbHRlckZhY2V0TGlzdCIsInByb3BzIiwicmVzdWx0IiwiZmFjZXQiLCJmYWNldEtleSIsImxhYmVsIiwiaTE4biIsInZhbHVlIiwiZGF0YSIsIl9vbkZhY2V0Q2xpY2siLCJrZXkiLCJ1cGRhdGVQcm9wZXJ0aWVzIiwiX29yZGVyQWN0aW9uIiwib3JkZXIiLCJzb3J0QnkiLCJzb3J0QXNjIiwiX2dyb3VwQWN0aW9uIiwicmVuZGVyIiwiaXNTZWxlY3Rpb24iLCJvcGVyYXRpb25MaXN0IiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7QUFFQTs7Ozs7O0FBRkE7QUFDQSxJQUFNQSxRQUFRQyxRQUFRLE9BQVIsQ0FBZDs7ZUFFaUJBLFFBQVEsbUJBQVIsQztJQUFWQyxNLFlBQUFBLE07O2dCQUNRRCxRQUFRLGVBQVIsQztJQUFSRSxJLGFBQUFBLEk7O0FBRVA7O0FBRUEsSUFBTUMsZ0JBQWdCSCxRQUFRLGdDQUFSLEVBQTBDSSxTQUFoRTs7QUFFQTs7QUFFQSxJQUFNQyxZQUFZTCxRQUFRLDRCQUFSLENBQWxCOztBQUVBLElBQU1NLE1BQU07QUFDUkMsWUFBUSxDQUFDRixTQUFELENBREE7QUFFUjs7OztBQUlBRyxtQkFOUSw2QkFNVTtBQUNkLGVBQVE7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c0NvbnRlbnQiOlsiLy8gRGVwZW5kZW5jaWVzXHJcbmNvbnN0IFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcclxuaW1wb3J0IGJ1aWxkZXIgZnJvbSAnZm9jdXMtY29yZS9jb21wb25lbnQvYnVpbGRlcic7XHJcbmNvbnN0IHtyZWR1Y2V9ID0gcmVxdWlyZSgnbG9kYXNoL2NvbGxlY3Rpb24nKTtcclxuY29uc3Qge29taXR9ID0gcmVxdWlyZSgnbG9kYXNoL29iamVjdCcpO1xyXG5cclxuLy8gQ29tcG9uZW50c1xyXG5cclxuY29uc3QgTGlzdEFjdGlvbkJhciA9IHJlcXVpcmUoJy4uLy4uLy4uL2xpc3QvYWN0aW9uLWJhci9pbmRleCcpLmNvbXBvbmVudDtcclxuXHJcbi8vTWl4aW5zXHJcblxyXG5jb25zdCBpMThuTWl4aW4gPSByZXF1aXJlKCcuLi8uLi8uLi9jb21tb24vaTE4bi9taXhpbicpO1xyXG5cclxuY29uc3QgQmFyID0ge1xyXG4gICAgbWl4aW5zOiBbaTE4bk1peGluXSxcclxuICAgIC8qKlxyXG4gICAgICogR2V0IHRoZSBkZWZhdWx0IHByb3BzXHJcbiAgICAgKiBAcmV0dXJuIHtvYmplY3R9IHRoZSBkZWZhdWx0IHByb3BzXHJcbiAgICAgKi9cclxuICAgIGdldERlZmF1bHRQcm9wcygpIHtcclxuICAgICAgICByZXR1cm4gKHtcclxuICAgICAgICAgICAgYWN0aW9uOiB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgIGdyb3VwYWJsZUNvbHVtbkxpc3Q6IHt9LFxyXG4gICAgICAgICAgICBncm91cGluZ0tleTogdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICBoYXNHcm91cGluZzogdHJ1ZSxcclxuICAgICAgICAgICAgbGluZU9wZXJhdGlvbkxpc3Q6IHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgb3JkZXJhYmxlQ29sdW1uTGlzdDoge30sXHJcbiAgICAgICAgICAgIG9yZGVyU2VsZWN0ZWQ6IHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgc2VsZWN0aW9uQWN0aW9uOiB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgIHNlbGVjdGlvblN0YXR1czogdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICBzZWxlY3RlZEZhY2V0czoge31cclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcbiAgICAvKipcclxuICAgICAqIEZpbHRlciB0aGUgZmFjZXQgbGlzdCBzbyB0aGF0IHRoZSBzY29wZSBmYWNldCBpcyBub3QgZGlzcGxheWVkXHJcbiAgICAgKiBAcmV0dXJuIHtvYmplY3R9IFRoZSBmaWx0ZXJlZCBmYWNldCBsaXN0XHJcbiAgICAgKi9cclxuICAgIF9maWx0ZXJGYWNldExpc3QoKSB7XHJcbiAgICAgICAgY29uc3Qge3NlbGVjdGVkRmFjZXRzfSA9IHRoaXMucHJvcHM7XHJcbiAgICAgICAgcmV0dXJuIHJlZHVjZShzZWxlY3RlZEZhY2V0cywgKHJlc3VsdCwgZmFjZXQsIGZhY2V0S2V5KSA9PiB7XHJcbiAgICAgICAgICAgIHJlc3VsdFtmYWNldEtleV0gPSB7XHJcbiAgICAgICAgICAgICAgICBsYWJlbDogdGhpcy5pMThuKGBsaXZlLmZpbHRlci5mYWNldHMuJHtmYWNldEtleX1gKSxcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBmYWNldC5kYXRhLmxhYmVsXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgfSwge30pO1xyXG4gICAgfSxcclxuICAgIC8qKlxyXG4gICAgICogT24gZmFjZXQgY2xpY2ssIHJlbW92ZSBpdCBmcm9tIHRoZSBzZWxlY3RlZCBmYWNldHMsIGFuZCB1cGRhdGUgdGhlIHN0b3JlXHJcbiAgICAgKiBAcGFyYW0gIHtzdHJpbmd9IGtleSBUaGUgZmFjZXQga2V5IHRvIHJlbW92ZVxyXG4gICAgICovXHJcbiAgICBfb25GYWNldENsaWNrKGtleSkge1xyXG4gICAgICAgIGNvbnN0IHtzZWxlY3RlZEZhY2V0cywgYWN0aW9uOiB7dXBkYXRlUHJvcGVydGllc319ID0gdGhpcy5wcm9wcztcclxuICAgICAgICB1cGRhdGVQcm9wZXJ0aWVzKHtzZWxlY3RlZEZhY2V0czogb21pdChzZWxlY3RlZEZhY2V0cywga2V5KX0pO1xyXG4gICAgfSxcclxuICAgIC8qKlxyXG4gICAgICogVXBkYXRlIHRoZSBzdG9yZSB0byBhc2sgZm9yIGEgbmV3IHJlc3VsdHMgb3JkZXJcclxuICAgICAqIEBwYXJhbSAge3N0cmluZ30ga2V5ICAgdGhlIGZpbGVkIGtleSB0byBzb3J0IGJ5XHJcbiAgICAgKiBAcGFyYW0gIHtib29sZWFufSBvcmRlciB0aGUgc29ydCBkaXJlY2l0b24sIGFzY2VuZGluZyBvciBkZXNjZW5kaW5nXHJcbiAgICAgKi9cclxuICAgIF9vcmRlckFjdGlvbihrZXksIG9yZGVyKSB7XHJcbiAgICAgICAgdGhpcy5wcm9wcy5hY3Rpb24udXBkYXRlUHJvcGVydGllcyh7XHJcbiAgICAgICAgICAgIHNvcnRCeToga2V5LFxyXG4gICAgICAgICAgICBzb3J0QXNjOiBvcmRlclxyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuICAgIC8qKlxyXG4gICAgICogR3JvdXAgYnkgdGhlIGdpdmVuIGtleVxyXG4gICAgICogQHBhcmFtICB7c3RyaW5nfSBrZXkgVGhlIGZhY2V0IGtleSB0byBiYXNlIHRoZSBncm91cGluZyBvblxyXG4gICAgICovXHJcbiAgICBfZ3JvdXBBY3Rpb24oa2V5KSB7XHJcbiAgICAgICAgdGhpcy5wcm9wcy5hY3Rpb24udXBkYXRlUHJvcGVydGllcyh7XHJcbiAgICAgICAgICAgIGdyb3VwaW5nS2V5OiBrZXlcclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcbiAgICAvKipcclxuICAgICAqIFJlbmRlciB0aGUgY29tcG9uZW50XHJcbiAgICAgKiBAcmV0dXJuIHtIVE1MfSB0aGUgcmVuZGVyZWQgY29tcG9uZW50XHJcbiAgICAgKi9cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICBjb25zdCB7Z3JvdXBhYmxlQ29sdW1uTGlzdCwgZ3JvdXBpbmdLZXksIGhhc0dyb3VwaW5nLCBpc1NlbGVjdGlvbiwgb3BlcmF0aW9uTGlzdCwgb3JkZXJhYmxlQ29sdW1uTGlzdCwgc2VsZWN0aW9uQWN0aW9uLCBzZWxlY3Rpb25TdGF0dXMsIHNvcnRCeX0gPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxMaXN0QWN0aW9uQmFyXHJcbiAgICAgICAgICAgICAgICBkYXRhLWZvY3VzPSdhZHZhbmNlZC1zZWFyY2gtYWN0aW9uLWJhcidcclxuICAgICAgICAgICAgICAgIGZhY2V0Q2xpY2tBY3Rpb249e3RoaXMuX29uRmFjZXRDbGlja31cclxuICAgICAgICAgICAgICAgIGZhY2V0TGlzdD17dGhpcy5fZmlsdGVyRmFjZXRMaXN0KCl9XHJcbiAgICAgICAgICAgICAgICBncm91cEFjdGlvbj17dGhpcy5fZ3JvdXBBY3Rpb259XHJcbiAgICAgICAgICAgICAgICBncm91cGFibGVDb2x1bW5MaXN0PXtncm91cGFibGVDb2x1bW5MaXN0fVxyXG4gICAgICAgICAgICAgICAgZ3JvdXBMYWJlbFByZWZpeD0nbGl2ZS5maWx0ZXIuZmFjZXRzLidcclxuICAgICAgICAgICAgICAgIGdyb3VwU2VsZWN0ZWRLZXk9e2dyb3VwaW5nS2V5fVxyXG4gICAgICAgICAgICAgICAgaGFzR3JvdXBpbmc9e2hhc0dyb3VwaW5nfVxyXG4gICAgICAgICAgICAgICAgaXNTZWxlY3Rpb249e2lzU2VsZWN0aW9ufVxyXG4gICAgICAgICAgICAgICAgb3BlcmF0aW9uTGlzdD17b3BlcmF0aW9uTGlzdH1cclxuICAgICAgICAgICAgICAgIG9yZGVyQWN0aW9uPXt0aGlzLl9vcmRlckFjdGlvbn1cclxuICAgICAgICAgICAgICAgIG9yZGVyU2VsZWN0ZWQ9e3NvcnRCeX1cclxuICAgICAgICAgICAgICAgIG9yZGVyYWJsZUNvbHVtbkxpc3Q9e29yZGVyYWJsZUNvbHVtbkxpc3R9XHJcbiAgICAgICAgICAgICAgICBzZWxlY3Rpb25BY3Rpb249e3NlbGVjdGlvbkFjdGlvbn1cclxuICAgICAgICAgICAgICAgIHNlbGVjdGlvblN0YXR1cz17c2VsZWN0aW9uU3RhdHVzfVxyXG4gICAgICAgICAgICAvPlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGJ1aWxkZXIoQmFyKTtcclxuIl19