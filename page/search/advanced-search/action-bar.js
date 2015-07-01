// Dependencies

let builder = require('focus').component.builder;
let clone = require('lodash/lang/clone');

// Components

let ListActionBar = require('../../../list/action-bar/index').component;

//Mixins

let i18nMixin = require('../../../common/i18n/mixin');

let Bar = {
    mixins: [i18nMixin],
    /**
     * Get the default props
     * @return {object} the default props
     */
    getDefaultProps() {
        return ({
            orderableColumnList: {},
            groupableColumnList: {},
            orderSelected: undefined,
            selectionStatus: undefined,
            selectionAction: undefined,
            groupingKey: undefined,
            selectedFacets: {},
            action: undefined,
            lineOperationList: undefined
        });
    },
    /**
     * Filter the facet list so that the scope facet is not displayed
     * @return {object} The filtered facet list
     */
    _filterFacetList() {
        let facetList = {};
        for (let key in this.props.selectedFacets) {
            if (key !== 'FCT_SCOPE') {
                let facet = this.props.selectedFacets[key];
                facetList[key] = {
                    label: this.i18n(`live.filter.facets.${key}`),
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
    _onFacetClick(key) {
        let selectedFacets = clone(this.props.selectedFacets);
        delete selectedFacets[key];
        this.props.action.updateProperties({selectedFacets});
    },
    /**
     * Update the store to ask for a new results order
     * @param  {string} key   the filed key to sort by
     * @param  {boolean} order the sort direciton, ascending or descending
     */
    _orderAction(key, order) {
        this.props.action.updateProperties({
            sortBy: key,
            sortAsc: order
        });
    },
    /**
     * Group by the given key
     * @param  {string} key The facet key to base the grouping on
     */
    _groupAction(key) {
        this.props.action.updateProperties({
            groupingKey: key
        });
    },
    /**
     * Render the component
     * @return {HTML} the rendered component
     */
    render() {
        return (
            <ListActionBar
                data-focus='advanced-search-action-bar'
                groupLabelPrefix='live.filter.facets.'
                selectionStatus={this.props.selectionStatus}
                selectionAction={this.props.selectionAction}
                orderableColumnList={this.props.orderableColumnList}
                orderAction={this._orderAction}
                orderSelected={this.props.sortBy}
                groupableColumnList={this.props.groupableColumnList}
                groupAction={this._groupAction}
                groupSelectedKey={this.props.groupingKey}
                facetList={this._filterFacetList()}
                facetClickAction={this._onFacetClick}
                operationList={this.props.lineOperationList}
            />
        );
    }
};

module.exports = builder(Bar);
