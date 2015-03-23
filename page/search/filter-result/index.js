/**@jsx*/
var builder = require('focus').component.builder;
var React = require('react');
var LiveFilter = require('../../../search/live-filter/index').component;
var ListActionBar = require('../../../list/action-bar/index').component;
var ListSummary = require('../../../list/summary/index').component;
var ListSelection = require('../../../list/selection').list.component;
var SearchStore = require('focus').store.SearchStore;
var assign = require('object-assign');
var InfiniteScrollPageMixin = require('../common-mixin/infinite-scroll-page-mixin').mixin;

var searchFilterResultMixin = {
    mixins: [InfiniteScrollPageMixin],

    /**
     * Display name.
     */
    displayName: 'search-filter-result',
    /**
     * Search store.
     */
    store: new SearchStore(),

    /**
     * Component intialization
     */
    componentDidMount: function componentDidMount() {
        this._registerListeners();
        this.search();
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
     * @returns {object} Default props.
     */
    getDefaultProps: function() {
        return {
            facetConfig: {},
            orderableColumnList: {},
            groupableColumnList: {},
            operationList: {},
            lineComponent: undefined,
            isSelection: true,
            lineOperationList: {},
            criteria: {
                scope: undefined,
                searchText: undefined
            }
        };
    },
    /**
     * Init default state.
     * @returns {object} Initialized state.
     */
    getInitialState: function() {
        return assign({
            facetList: {},
            selectedFacetList: {},
            openedFacetList: {},
            selectionStatus: 'none',
            orderSelected: undefined,
            groupSelectedKey: undefined,
            list: []
        },
        this.getInfiniteScrollInitialState(),
        this._getStateFromStore());
    },
    /**
     * Get the state from store.
     * @returns {object} Dtat to update store.
     */
    _getStateFromStore: function getToUpdateState() {
        if(this.store) {
            var data = this.store.get();
            return assign({
                facetList: data.facet || {}
            }, this.getInfiniteScrollStateFromStore());
        }
    },

    /**
     * Register a listener on the store.
     * @private
     */
    _registerListeners: function registerListeners() {
        if(this.store) {
            this.store.addSearchChangeListener(this.onSearchChange);
        }
    },
    /**
     * Unregister a listener on the store.
     * @private
     */
    _unRegisterListeners: function unRegisterSearchListeners(){
        if(this.store){
            this.store.removeSearchChangeListener(this.onSearchChange);
        }
    },

    /**
     * Search function.
     */
    search: function search() {
        var facets = [];
        for(var selectedFacet in this.state.selectedFacetList) {
            facets.push({key: selectedFacet, value: this.state.selectedFacetList[selectedFacet].key});
        }

        this.props.action.search(
            this.getSearchCriteria(this.props.criteria.scope,  this.props.criteria.searchText, facets)
        );
    },
    /**
     * Get the list of facet to print into the top bar..
     * @returns {{}} Facets object : [facet1: 'Label of facet1', facet2: 'Label of facet2'}.
     * @private
     */
    _getFacetListForBar: function() {
        var facetList = {};
        for(var key in this.state.selectedFacetList) {
            var facet = this.state.selectedFacetList[key];
            facetList[key] = facet.data.label;
        }
        return facetList;
    },
    /**
     * Click on bar facet action handler.
     * @param key [string}  Key of the clicked facet.
     * @private
     */
    _facetBarClick: function(key) {
        var selectedFacetList = this.state.selectedFacetList;
        delete selectedFacetList[key];

        // TODO : do we do it now ?
        this.state.selectedFacetList = selectedFacetList;
        this.setState({selectedFacetList: this.state.selectedFacetList});
        this.search();
    },
    /**
     * Group action click handler.
     * @param {string} key Name of the column to group (if null => ungroup action).
     * @private
     */
    _groupClick: function(key) {
        console.log('Group by : ' + key);
        // TODO : do we do it now ?
        this.state.groupSelectedKey = key
        this.state.orderSelected = (key != undefined ? undefined : this.state.orderSelected);
        this.setState({
            groupSelectedKey: this.state.groupSelectedKey,
            orderSelected: this.state.orderSelected
        });

        this.search();
    },
    /**
     * Order action click handler.
     * @param {string} key Column to order.
     * @param {string} order Order  asc/desc
     * @private
     */
    _orderClick: function(key, order) {
        console.log('Order : ' + key + ' - ' + order);
        // TODO : do we do it now ?
        this.state.orderSelected = {key: key, order: order};
        this.setState({orderSelected: this.state.orderSelected});
        this.search();
    },
    /**
     * Selection action handler.
     * @param selectionStatus Current selection status.
     * @private
     */
    _selectionGroupLineClick: function(selectionStatus) {
        console.log("Selection status : " + selectionStatus);
        this.setState({
            selectionStatus: selectionStatus
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
        this.state.selectedFacetList = selectedFacetList;
        this.state.openedFacetList = openedFacetList;
        this.setState({
            selectedFacetList: this.state.selectedFacetList,
            openedFacetList: this.state.openedFacetList
        });

        this.search();
    },
    /**
     * Line selection handler.
     * @param item Line checked/unchecked.
     */
    _selectItem: function selectItem(item) {
        this.setState({selectionStatus: "partial"});
    },
    /**
     * Export action handler.
     */
    _exportHandler: function exportHandler() {
      console.log("EXPORT TODO");
    },
    /**
     * Click on scope action handler.
     */
    _scopeClick: function scopeClick() {
      console.log("TODO SCOPE CLICK REDIRECTION");
    },
    /**
     * Render the component.
     * @returns {XML} Html code.
     */
    render: function renderSearchResult() {
        var nResult = 5;
        var scopeList = {scope: this.props.criteria.scope};
        return (
            <div className="search-result">
                <div className="liveFilterContainer">
                    <LiveFilter ref="liveFilter"
                        facetList={this.state.facetList}
                        selectedFacetList={this.state.selectedFacetList}
                        openedFacetList={this.state.openedFacetList}
                        config={this.props.facetConfig}
                        dataSelectionHandler={this._facetSelectionClick}/>
                </div>
                <div className="resultContainer">
                    <div className="listSummaryContainer panel">
                        <ListSummary
                                nb={nResult}
                                queryText={this.props.criteria.searchText}
                                scopeList={scopeList}
                                scopeClickAction={this._scopeClick}
                                exportAction={this._exportHandler}
                        />

                    </div>
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
                            lineComponent={this.props.lineComponent}
                            selectionStatus={this.state.selectionStatus} />
                    </div>
                </div>
            </div>
        );
    }
}

module.exports = builder(searchFilterResultMixin);
