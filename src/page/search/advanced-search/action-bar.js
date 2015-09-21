// Dependencies

const builder = require('focus-core').component.builder;
const {reduce} = require('lodash/collection');
const {omit} = require('lodash/object');

// Components

const ListActionBar = require('../../../list/action-bar/index').component;

//Mixins

const i18nMixin = require('../../../common/i18n/mixin');

const Bar = {
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
        const {selectedFacets} = this.props;
        return reduce(selectedFacets, (result, facet, facetKey) => {
            result[facetKey] = {
                label: this.i18n(`live.filter.facets.${facetKey}`),
                value: facet.data.label
            };
            return result;
        }, {});
    },
    /**
     * On facet click, remove it from the selected facets, and update the store
     * @param  {string} key The facet key to remove
     */
    _onFacetClick(key) {
        const {selectedFacets, action: {updateProperties}} = this.props;
        updateProperties({selectedFacets: omit(selectedFacets, key)});
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
                facetClickAction={this._onFacetClick}
                facetList={this._filterFacetList()}
                groupAction={this._groupAction}
                groupLabelPrefix='live.filter.facets.'
                groupSelectedKey={this.props.groupingKey}
                groupableColumnList={this.props.groupableColumnList}
                operationList={this.props.lineOperationList}
                orderAction={this._orderAction}
                orderSelected={this.props.sortBy}
                orderableColumnList={this.props.orderableColumnList}
                selectionAction={this.props.selectionAction}
                selectionStatus={this.props.selectionStatus}
            />
        );
    }
};

module.exports = builder(Bar);
