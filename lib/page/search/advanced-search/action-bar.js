// Dependencies

'use strict';

var builder = require('focus').component.builder;

var _require = require('lodash/collection');

var reduce = _require.reduce;

var _require2 = require('lodash/object');

var omit = _require2.omit;

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
            orderableColumnList: {},
            groupableColumnList: {},
            orderSelected: undefined,
            selectionStatus: undefined,
            selectionAction: undefined,
            groupingKey: undefined,
            selectedFacets: {},
            action: undefined,
            lineOperationList: undefined
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
        var _props = this.props;
        var selectedFacets = _props.selectedFacets;
        var updateProperties = _props.action.updateProperties;

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
        return React.createElement(ListActionBar, {
            'data-focus': 'advanced-search-action-bar',
            facetClickAction: this._onFacetClick,
            facetList: this._filterFacetList(),
            groupAction: this._groupAction,
            groupLabelPrefix: 'live.filter.facets.',
            groupSelectedKey: this.props.groupingKey,
            groupableColumnList: this.props.groupableColumnList,
            operationList: this.props.lineOperationList,
            orderAction: this._orderAction,
            orderSelected: this.props.sortBy,
            orderableColumnList: this.props.orderableColumnList,
            selectionAction: this.props.selectionAction,
            selectionStatus: this.props.selectionStatus
        });
    }
};

module.exports = builder(Bar);