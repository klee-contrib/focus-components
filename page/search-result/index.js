/**@jsx*/
var builder = require('focus/component/builder');
var React = require('react');
var LiveFilter = require('../../search/live-filter').component;
var ListActionBar = require('../../list/action-bar').component;

var searchResultMixin = {

    /**
     * Display name.
     */
    displayName: "search-result",

    /**
     * Init default props.
     */
    getDefaultProps: function() {
        return {
            facetList: {},
            facetConfig:{},
            orderableColumnList:{}
        }
    },
    /**
     * Init default state.
     */
    getInitialState: function() {
        return {
            facetList: this.props.facetList,
            selectedFacetList: {},
            openedFacetList: {},

            selectionStatus: 0,
            orderSelected:undefined
        };
    },
    /**
     * render the component.
     * @returns Html code.
     */
    render: function renderSearchResult() {
        return (
            <div className="search-result">
                <div className="liveFilterContainer">
                    <LiveFilter ref="liveFilter"    facetList={this.state.facetList}
                                                    selectedFacetList={this.state.selectedFacetList}
                                                    openedFacetList={this.state.openedFacetList}
                                                    config={this.props.facetConfig}
                                                    dataSelectionHandler={this.facetSelectionHandler}/>
                </div>
                <div className="listActionBarContainer">
                    <ListActionBar selectionStatus={this.state.selectionStatus}
                                selectionAction={this.selectionAction}
                                orderableColumnList={this.props.orderableColumnList}
                                orderAction={this.orderAction}
                                orderSelected={this.state.orderSelected}/>
                </div>
            </div>
        );
    },

    /*

     facetList: this.facetList,
     facetClickAction:this.facetClickAction,

     groupableColumnList:{col1: "Colonne 1", col2: "Colonne 2"},
     groupAction: this.groupClick,
     groupSelectedKey: this.groupSelectedKey,

     operationList: this.operationList
     */

    orderAction: function(key, order) {
        // Todo call the service
        console.warn("TODO : implement the search service ");
        console.log("Order : " + key + " - " + order);

        this.setState({orderSelected: {key:key, order:order}});
    },

    /**
     * Seelction action handler.
     * @param selectionStatus (0 => nonde, 1= > all, 2=> some).
     */
    selectionAction: function(selectionStatus) {
        console.warn("TODO : implement check/uncheck on the list rows (it shoudl be working like this, but need to be checked)");
        console.log("Selection status : " + selectionStatus);
        this.setState({selectionStatus: selectionStatus});
    },

    /**
     * Handler called when facet is selected.
     * @param facetComponentData Data of facet.
     */
    facetSelectionHandler: function(facetComponentData) {
        var selectedFacetList= facetComponentData.selectedFacetList;
        var openedFacetList=facetComponentData.openedFacetList;

        // Todo call the service
        console.warn("TODO : implement the search service ");
        console.log(selectedFacetList);

        // On search returns, we are waiting for a field "facetList". For the moment we keep the current facetList
        var facetList = this.state.facetList;

        // We update state with :
        // - Data from server : list of facets
        // - Data from client : list of opened facets, list of selected facets
        this.setState({
            facetList: facetList,
            selectedFacetList: selectedFacetList,
            openedFacetList: openedFacetList
        });
    }
}

module.exports = builder(searchResultMixin);
