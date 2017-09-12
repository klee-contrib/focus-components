// Dependencies
import React from 'react';
import builder from 'focus-core/component/builder';
import reduce from 'lodash/collection/reduce';
import omit from 'lodash/object/omit';
// Components
import { component as ListActionBar } from '../../../list/action-bar/index';
//Mixins
import i18nMixin from '../../../common/i18n/mixin';

const Bar = {
    mixins: [i18nMixin],
    /**
     * Get the default props
     * @return {object} the default props
     */
    getDefaultProps() {
        return ({
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
        });
    },
    /**
     * Filter the facet list so that the scope facet is not displayed
     * @return {object} The filtered facet list
     */
    _filterFacetList() {
        const { selectedFacets } = this.props;
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
        const { selectedFacets, action: { updateProperties } } = this.props;
        updateProperties({ selectedFacets: omit(selectedFacets, key) });
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
        const { groupableColumnList, groupingKey, hasGrouping, isSelection, operationList, orderableColumnList, selectionAction, selectionStatus, sortBy } = this.props;
        return (
            <ListActionBar
                data-focus='advanced-search-action-bar'
                facetClickAction={this._onFacetClick}
                facetList={this._filterFacetList()}
                groupAction={this._groupAction}
                groupableColumnList={groupableColumnList}
                groupLabelPrefix='live.filter.facets.'
                groupSelectedKey={groupingKey}
                hasGrouping={hasGrouping}
                isSelection={isSelection}
                operationList={operationList}
                orderAction={this._orderAction}
                orderSelected={sortBy}
                orderableColumnList={orderableColumnList}
                selectionAction={selectionAction}
                selectionStatus={selectionStatus}
            />
        );
    }
};

const { mixin, component } = builder(Bar);
export { mixin, component };
export default { mixin, component };
