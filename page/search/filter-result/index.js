/**@jsx*/
var builder = require('focus').component.builder;
var dispatcher = require('focus').dispatcher;
var React = require('react');
var LiveFilter = require('../../../search/live-filter/index').component;
var ListActionBar = require('../../../list/action-bar/index').component;
var ListSelection = require('../../../list/selection').list.component;
var SearchStore = require('focus').store.SearchStore;
var assign = require('object-assign');


var searchFilterResultMixin = {

    /**
     * Display name.
     */
    displayName: "search-filter-result",
    /**
     * Search store.
     */
    store: new SearchStore(),

    /**
     * Component intialization
     */
    componentDidMount: function componentDidMount() {
        this._registerListeners();
        this._search();
    },
    /**
     * Actions before component will unmount.
     * @constructor
     */
    componentWillUnmount: function SearchComponentWillUnmount(){
        this._unRegisterListeners();
    },

    /**
     * Init default props.
     */
    getDefaultProps: function() {
        return {
            facetConfig:{},
            orderableColumnList:{},
            groupableColumnList:{},
            operationList:{},
            lineComponent:undefined,
            isSelection:true,
            lineOperationList:{},
            criteria:  {
                scope: undefined,
                searchText : undefined
            }
        };
    },
    /**
     * Init default state.
     */
    getInitialState: function() {
        return assign({
            facetList: {},
            selectedFacetList: {},
            openedFacetList: {},

            selectionStatus: 0,
            orderSelected:undefined,
            groupSelectedKey: undefined,

            list:[],

            isAllSelected:true
        },
        this.getInfiniteScrollInitialState(),
        this._getStateFromStore());
    },

    /**
     * Get liste from current store.
     * @returns {*}
     */
    _getStateFromStore: function getToUpdateState() {
        if(this.store) {
            var data = this.store.get();
            return assign({
                facetList: data.facet || {},
                list: data.list || []
            }, this.getInfiniteScrollStateFromStore())
        }
    },

    /**
     * Register a listener on the store.
     * @private
     */
    _registerListeners: function registerListeners() {
        if(this.store) {
            this.store.addSearchChangeListener(this._onSearchChange);
        }
    },
    /**
     * Unregister a listener on the store.
     * @private
     */
    _unRegisterListeners: function unRegisterSearchListeners(){
        if(this.store){
            this.store.removeSearchChangeListener(this._onSearchChange);
        }
    },

    /**
     * Search function.
     */
    _search: function search() {
        var facets = [];
        for(var selectedFacet in this.state.selectedFacetList) {
            facets.push({key:selectedFacet, value:this.state.selectedFacetList[selectedFacet].key});
        }

        this.props.action.search(
            this.getSearchCriteria(this.props.criteria.scope,  this.props.criteria.searchText, this.state.currentPage, this.state.orderSelected, this.state.groupSelectedKey, facets)
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

    _facetBarClick: function(key) {
        var selectedFacetList = this.state.selectedFacetList;
        delete selectedFacetList[key];

        // TODO : do we do it now ?
        this.setState({selectedFacetList: selectedFacetList});
        this._search();
    },
    _groupClick: function(key) {
        console.log("Group by : " + key);
        // TODO : do we do it now ?
        this.setState({
            groupSelectedKey: key,
            orderSelected: (key != undefined ? undefined : this.state.orderSelected)
        });

        this._search();
    },

    _orderClick: function(key, order) {
        console.log("Order : " + key + " - " + order);
        // TODO : do we do it now ?
        this.setState({orderSelected: {key:key, order:order}});
        this._search();
    },

    /**
     * Selection action handler.
     * @param selectionStatus (0 => nonde, 1= > all, 2=> some).
     */
    _selectionGroupLineClick: function(selectionStatus) {
        console.log("Selection status : " + selectionStatus);
        console.warn("TODO : implement check/uncheck on the list rows (it shoudl be working like this, but need to be checked)");
        this.setState({
            selectionStatus: selectionStatus,
            isAllSelected: selectionStatus == 1
        });
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

        this._search();
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
                            ref="list"
                            isSelection={this.props.isSelection}
                            onSelection={this._selectItem}
                            onLineClick={this.props.onLineClick}
                            fetchNextPage={this.fetchNextPage}
                            operationList={this.props.lineOperationList}
                            hasMoreData={this.state.hasMoreData}
                            isLoading={this.state.isLoading}
                            lineComponent={this.props.lineComponent} />
                    </div>
                </div>
            </div>
        );
    },

    ////////////////////////////////////////////////////////////////////////////////////////////
    // COMMON METHODS FOR INFINITE SCROLL
    /**
     * Handler when store emit a change event.
     */
    _onSearchChange: function onSearchChange() {
        console.log("Search success");
        this.setState(assign({isLoading:false}, this._getStateFromStore()));

    },
    getInfiniteScrollInitialState: function getInfiniteScrollInitialState() {
        return {
            hasMoreData: false,
            isLoading:false,
            currentPage:1
        }
    },
    getInfiniteScrollStateFromStore: function getSearchStateFromStore(){
        if(this.store){
            var data = this.store.get();
            var hasMoreData = data.pageInfos && data.pageInfos.totalPages? data.pageInfos.currentPage < data.pageInfos.totalPages : false;
            return {
                hasMoreData: hasMoreData
            }
        }
        return {};
    },
    getSearchCriteria: function getSearchCriteria(scope, query, currentPage, order, group, facets) {
        return {
            criteria: {
                scope: scope,
                query: query
            },
            pageInfos: {
                page: currentPage,
                order: order,
                group: group
            },
            facets: facets
        }
    },
    fetchNextPage: function fetchNextPage(){
        this.setState({
            isLoading:true,
            currentPage: this.state.currentPage + 1
        });
        this._search();
    }
}

module.exports = builder(searchFilterResultMixin);
