/**@jsx*/
var builder = require('focus').component.builder;
var dispatcher = require('focus').dispatcher;
var React = require('react');
var LiveFilter = require('../../../search/live-filter/index').component;
var ListActionBar = require('../../../list/action-bar/index').component;
var ListSelection = require('../../../list/selection').list.component;
var SearchStore = require('focus').store.SearchStore;

var searchFilterResultMixin = {

    /**
     * Display name.
     */
    displayName: "search-filter-result",

    /**
     * Init default props.
     */
    getDefaultProps: function() {
        return {
            facetConfig:{},
            orderableColumnList:{},
            groupableColumnList:{},
            operationList:{},
            searchStore: new SearchStore(),
            lineComponent:undefined,
            isSelection:true,
            lineOperationList:{}
        }
    },
    /**
     * Init default state.
     */
    getInitialState: function() {
        return {
            facetList: {},
            selectedFacetList: {},
            openedFacetList: {},

            selectionStatus: 0,
            orderSelected:undefined,
            groupSelectedKey: undefined,

            list:[]
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
                                                    dataSelectionHandler={this._facetSelectionClick}/>
                </div>
                <div className="resultContainer">
                    <div className="listActionBarContainer panel">
                        <ListActionBar selectionStatus={this.state.selectionStatus}
                                    selectionAction={this._selectionGroupLineClick}
                                    orderableColumnList={this.props.orderableColumnList}
                                    orderAction={this._orderClick}
                                    orderSelected={this.state.orderSelected}
                                    groupableColumnList={this.props.groupableColumnList}
                                    groupAction={this._groupClick}
                                    groupSelectedKey={this.state.groupSelectedKey}
                                    facetList={this._getFacetListForBar()}
                                    facetClickAction={this._facetBarClick}
                                    operationList={this.props.operationList} />
                    </div>
                    <div className="listResultContainer panel">
                        <ListSelection data={this.state.list}
                                hasMoreData={true}
                                lineComponent={this.props.lineComponent}
                                onLineClick={this.props.onLineClick}
                                isSelection={this.props.isSelection}
                                operationList={this.props.lineOperationList} />
                    </div>
                </div>
            </div>
        );
    },
    componentDidMount: function() {
        this._registerEventList();
        this._doSearch();
    },
    _registerEventList: function registerEventList() {
        this.props.searchStore.addSearchChangeListener(this._searchSuccessEvent);
    },

    _doSearch: function doSearch() {
        var facets = [];
        for(var selectedFacet in this.state.selectedFacetList) {
            facets.push({key:selectedFacet, value:this.state.selectedFacetList[selectedFacet].key});
           // facets[selectedFacet] = this.state.selectedFacetList[selectedFacet].key;
        }

        this.props.action.search({
            facets: facets,
            criteria:{},
            groupKey: this.state.groupSelectedKey,
            order: this.state.orderSelected
        });
    },
    _searchSuccessEvent: function searchSuccessEvent() {
        console.log("Search success");
        this.setState(this._getToUpdateState());

    },
    _getToUpdateState: function getToUpdateState() {
        var data = this.props.searchStore.get('search');
        return {
            facetList: data.facet,
            list: data.list
        }
    },

    _getFacetListForBar: function() {
        var facetList = {};
        for(var key in this.state.selectedFacetList) {
            var facet = this.state.selectedFacetList[key];
            facetList[key] = facet.data.label;
        }
        return facetList;
    },

    _facetBarClick: function(key) {
        var selectedFacetList = this.state.selectedFacetList;
        delete selectedFacetList[key];

        // TODO : do we do it now ?
        this.setState({selectedFacetList: selectedFacetList});
        this._doSearch();
    },
    _groupClick: function(key) {
        console.log("Group by : " + key);
        // TODO : do we do it now ?
        this.setState({
            groupSelectedKey: key,
            orderSelected: (key != undefined ? undefined : this.state.orderSelected)
        });

        this._doSearch();
    },

    _orderClick: function(key, order) {
        console.log("Order : " + key + " - " + order);
        // TODO : do we do it now ?
        this.setState({orderSelected: {key:key, order:order}});
        this._doSearch();
    },

    /**
     * Selection action handler.
     * @param selectionStatus (0 => nonde, 1= > all, 2=> some).
     */
    _selectionGroupLineClick: function(selectionStatus) {
        console.log("Selection status : " + selectionStatus);
        console.warn("TODO : implement check/uncheck on the list rows (it shoudl be working like this, but need to be checked)");
        this.setState({selectionStatus: selectionStatus});
    },

    /**
     * Handler called when facet is selected.
     * @param facetComponentData Data of facet.
     */
    _facetSelectionClick: function(facetComponentData) {
        var selectedFacetList= facetComponentData.selectedFacetList;
        var openedFacetList=facetComponentData.openedFacetList;

        console.warn("Facet selection ");
        console.log(selectedFacetList);

        // TODO : Do we do it now ?
        this.setState({
            selectedFacetList: selectedFacetList,
            openedFacetList: openedFacetList
        });

        this._doSearch();
    }
}

module.exports = builder(searchFilterResultMixin);
