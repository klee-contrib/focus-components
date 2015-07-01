// Dependencies

let builder = require('focus').component.builder;
let keys = require('lodash/object/keys');

// Components

let FacetBox = require('../../../search/facet-box').component;

const scopeFacetKey = 'FCT_SCOPE';

let Box = {
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
        if (keys(facetComponentData.selectedFacetList).length === 1 && facetComponentData.selectedFacetList[scopeFacetKey]) {
            this.props.action.updateProperties({
                scope: this.props.scopesConfig[facetComponentData.selectedFacetList[scopeFacetKey].key]
            });
        } else {
            delete facetComponentData.selectedFacetList[scopeFacetKey];
            let newProperties = {
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
                dataSelectionHandler={this._onFacetSelection}
            />
        );
    }
};

module.exports = builder(Box);
