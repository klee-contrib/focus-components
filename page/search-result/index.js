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
            orderableColumnList:{},
            groupableColumnList:{},
            operationList:{}
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
            orderSelected:undefined,
            groupSelectedKey: undefined
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
                                orderSelected={this.state.orderSelected}
                                groupableColumnList={this.props.groupableColumnList}
                                groupAction={this.groupAction}
                                groupSelectedKey={this.state.groupSelectedKey}
                                facetList={this._getFacetListForBar()}
                                facetClickAction={this.facetClickAction}
                                operationList={this.props.operationList} />
                </div>
            </div>
        );
    },
    _getFacetListForBar: function() {
        var facetList = {};
        for(var key in this.state.selectedFacetList) {
            var facet = this.state.selectedFacetList[key];
            facetList[key] = facet.data.label;
        }
        return facetList;
    },
    facetClickAction: function(key) {
        var keyLength = key.split("_")[0];
        var indexLength = keyLength.length + 1;
        keyLength = parseInt(keyLength);

        var selectedFacetList = this.state.selectedFacetList;
        delete selectedFacetList[key];

        console.warn("TODO : implement the search service ");

        this.setState({
            facetList: this.state.facetList,
            selectedFacetList: selectedFacetList,
            openedFacetList: this.state.openedFacetList
        });
    },
    groupAction: function(key) {
        console.warn("TODO : implement the search service ");
        this.setState({
            groupSelectedKey: key,
            orderSelected: (key != undefined ? undefined : this.state.orderSelected)
        });

        console.log("(GROUPING) Group : " + key);
    },

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
