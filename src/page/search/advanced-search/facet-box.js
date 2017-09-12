// Dependencies
import React from 'react';
import builder from 'focus-core/component/builder';
// Components
import { component as FacetBox } from '../../../search/facet-box';

const scopeFacetKey = 'FCT_SCOPE';

const Box = {
    /**
     * Get the default props
     * @return {object} the default props
     */
    getDefaultProps() {
        return ({
            facets: {},
            selectedFacets: {},
            facetConfig: {},
            action: undefined,
            scopesConfig: undefined
        });
    },
    /**
     * Facet selection handler
     * @param  {object}  facetComponentData The new facet box state, given by the FacetBox component
     * @param  {Boolean} isDisableGroup     override the groupinKey ?
     */
    _onFacetSelection(facetComponentData, isDisableGroup) {
        if (Object.keys(facetComponentData.selectedFacetList).length === 1 && facetComponentData.selectedFacetList[scopeFacetKey]) {
            this.props.action.updateProperties({
                scope: this.props.scopesConfig[facetComponentData.selectedFacetList[scopeFacetKey].key],
                sortBy: undefined,
                sortAsc: true
            });
        } else {
            delete facetComponentData.selectedFacetList[scopeFacetKey];
            const newProperties = {
                selectedFacets: facetComponentData.selectedFacetList
            };
            if (isDisableGroup) {
                newProperties.groupingKey = undefined;
            }
            this.props.action.updateProperties(newProperties);
        }

    },
    /**
     * Render the component
     * @return {HTML} the rendered component
     */
    render() {
        return (
            <FacetBox
                data-focus='advanced-search-facet-box'
                facetList={this.props.facets}
                selectedFacetList={this.props.selectedFacets}
                config={this.props.facetConfig}
                openedFacetList={this.props.openedFacetList}
                dataSelectionHandler={this._onFacetSelection}
            />
        );
    }
};

const { mixin, component } = builder(Box);
export { mixin, component };
export default { mixin, component };
