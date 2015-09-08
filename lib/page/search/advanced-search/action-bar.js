// Dependencies

'use strict';

var builder = require('focus').component.builder;
var clone = require('lodash/lang/clone');

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
        var facetList = {};
        for (var key in this.props.selectedFacets) {
            if (key !== 'FCT_SCOPE') {
                var facet = this.props.selectedFacets[key];
                facetList[key] = {
                    label: this.i18n('live.filter.facets.' + key),
                    value: facet.data.label
                };
            }
        }
        return facetList;
    },
    /**
     * On facet click, remove it from the selected facets, and update the store
     * @param  {string} key The facet key to remove
     */
    _onFacetClick: function _onFacetClick(key) {
        var selectedFacets = clone(this.props.selectedFacets);
        delete selectedFacets[key];
        this.props.action.updateProperties({ selectedFacets: selectedFacets });
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
            groupLabelPrefix: 'live.filter.facets.',
            selectionStatus: this.props.selectionStatus,
            selectionAction: this.props.selectionAction,
            orderableColumnList: this.props.orderableColumnList,
            orderAction: this._orderAction,
            orderSelected: this.props.sortBy,
            groupableColumnList: this.props.groupableColumnList,
            groupAction: this._groupAction,
            groupSelectedKey: this.props.groupingKey,
            facetList: this._filterFacetList(),
            facetClickAction: this._onFacetClick,
            operationList: this.props.lineOperationList
        });
    }
};

module.exports = builder(Bar);