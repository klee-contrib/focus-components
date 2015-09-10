'use strict';

var FacetBox = FocusComponents.search.facetBox.component;

var Demo = React.createClass({
    displayName: 'Demo',

    getInitialState: function getInitialState() {
        return {
            selectedFacetList: {},
            openedFacetList: {}
        };
    },
    config: {
        FCT_PAYS: 'text',
        FCT_STATUS: 'text',
        FCT_REGION: 'text',
        FCT_ONLY_ONE: 'text'
    },
    facetList: {
        FCT_PAYS: {
            FRA: { label: 'France', count: 5 },
            GER: { label: 'Germany', count: 8 }
        },
        FCT_STATUS: {
            OPE: { label: 'Open', count: 7 },
            CLO: { label: 'Closed', count: 2 },
            ST1: { label: 'Status 1', count: 2 },
            ST2: { label: 'Status 2', count: 2 },
            ST3: { label: 'Status 3', count: 2 },
            ST4: { label: 'Status 4', count: 2 },
            ST5: { label: 'Status 5', count: 2 },
            ST6: { label: 'Status 6', count: 2 },
            ST7: { label: 'Status 7', count: 2 },
            ST8: { label: 'Status 8', count: 2 },
            ST9: { label: 'Status 9', count: 2 }
        },
        FCT_REGION: {
            IDF: { label: 'Ile de France', count: 11 },
            NPC: { label: 'Nord - Pas de Calais', count: 6 }
        },
        FCT_ONLY_ONE: {
            IDF: { label: 'Ile de France', count: 11 }
        }
    },
    dataSelectionHandler: function dataSelectionHandler(_ref) {
        var selectedFacetList = _ref.selectedFacetList;
        var openedFacetList = _ref.openedFacetList;

        this.setState({ selectedFacetList: selectedFacetList, openedFacetList: openedFacetList });
    },
    render: function render() {
        var config = this.config;
        var dataSelectionHandler = this.dataSelectionHandler;
        var facetList = this.facetList;
        var _state = this.state;
        var selectedFacetList = _state.selectedFacetList;
        var openedFacetList = _state.openedFacetList;

        return React.createElement(FacetBox, {
            config: config,
            dataSelectionHandler: dataSelectionHandler,
            facetList: facetList,
            openedFacetList: openedFacetList,
            selectedFacetList: selectedFacetList
        });
    }
});

return React.createElement(Demo, null);