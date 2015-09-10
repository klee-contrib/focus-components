// Dependencies

'use strict';

var builder = require('focus').component.builder;
var keys = require('lodash/object/keys');

// Components

var FacetBox = require('../../../search/facet-box').component;

var scopeFacetKey = 'FCT_SCOPE';

var Box = {
    /**
     * Get the default props
     * @return {object} the default props
     */
    getDefaultProps: function getDefaultProps() {
        return {
            facets: {},
            selectedFacets: {},
            facetConfig: {},
            action: undefined,
            scopesConfig: undefined
        };
    },
    /**
     * Facet selection handler
     * @param  {object}  facetComponentData The new facet box state, given by the FacetBox component
     * @param  {Boolean} isDisableGroup     override the groupinKey ?
     */
    _onFacetSelection: function _onFacetSelection(facetComponentData, isDisableGroup) {
        if (keys(facetComponentData.selectedFacetList).length === 1 && facetComponentData.selectedFacetList[scopeFacetKey]) {
            this.props.action.updateProperties({
                scope: this.props.scopesConfig[facetComponentData.selectedFacetList[scopeFacetKey].key]
            });
        } else {
            delete facetComponentData.selectedFacetList[scopeFacetKey];
            var newProperties = {
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
    render: function render() {
        return React.createElement(FacetBox, {
            'data-focus': 'advanced-search-facet-box',
            facetList: this.props.facets,
            selectedFacetList: this.props.selectedFacets,
            config: this.props.facetConfig,
            dataSelectionHandler: this._onFacetSelection
        });
    }
};

module.exports = builder(Box);