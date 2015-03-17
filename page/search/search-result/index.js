var builder = require('focus').component.builder;
var React = require('react');
var QuickSearch  = require('../../../search/quick-search').component;
var List = require('../../../list/selection').list.component;
var SearchStore = require('focus').store.SearchStore;
var assign = require('object-assign');

var searchMixin = {
    /**
     * Tag name.
     */
    displayName: "search-panel",

    /**
     * Search store.
     */
    store: new SearchStore(),

    /**
     * Component intialization
     */
    componentDidMount: function searchComponentDidMount(){
        this._registerListeners();
    },

    /**
     * Actions before component will unmount.
     * @constructor
     */
    componentWillUnmount: function SearchComponentWillUnmount(){
        this._unRegisterListeners();
    },

    getDefaultProps: function getDefaultProps(){
        return {
            lineComponent: undefined,
            isSelection: false,
            lineOperationList: {}
        }
    },

    /**
     * Initial state of the list component.
     * @returns {{list: (*|Array)}}
     */
    getInitialState: function(){
        var data = this.store.get();

        return assign({
            isAllSelected: false,
            selected: [],
            hasMoreData: false,
            isLoading:false,
            currentPage:1
        }, this._getStateFromStore());
    },

    /**
     * Get liste from current store.
     * @returns {*}
     */
    _getStateFromStore: function getSearchStateFromStore(){
        if(this.store){
            var data = this.store.get();
            var hasMoreData = data.pageInfos && data.pageInfos.totalPages? data.pageInfos.currentPage < data.pageInfos.totalPages : false;
            return {
                list: data.list || [],
                hasMoreData: hasMoreData
            }
        }
        return {};
    },

    /**
     * Handler when store emit a change event.
     */
    _onSearchChange: function onSearchStoreChange(){
        this.setState(assign({
            isLoading:false
        },this._getStateFromStore()));
    },

    /**
     * Register a listener on the store.
     * @private
     */
    _registerListeners: function registerSearchListeners(){
        if(this.store){
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
     * Action on item selection.
     * @param item
     */
    _selectItem: function selectItem(item){
        var index = this.state.selected.indexOf(item);
        if(index){
            this.state.selected.splice(index,index);
        }else{
            this.state.selected.push(item);
        }
    },

    /**
     * Action on line click.
     * @param item
     */
    _lineClick: function lineClick(item){
        if(this.props.onLineClick){
            this.props.onLineClick(item);
        }
    },

    /**
     * Run search action.
     * @param event
     */
    _search: function search(event){
        event.preventDefault();
        var searchValues = this.refs.quickSearch.getValue();
        this.actions.search({
            scope:searchValues.scope,
            query:searchValues.query,
            page: this.state.currentPage
        });
    },

    /**
     * Get the next page of the list.
     * @param page
     */
    _fetchNextPage: function fetchNextPage(){
        var currentPage = this.state.currentPage + 1;
        this.setState({
            isLoading:true,
            currentPage: currentPage
        });
        var searchValues = this.refs.quickSearch.getValue();
        this.actions.search({
            scope: searchValues.scope,
            query: searchValues.query,
            page: currentPage
        });
    },

    /**
     * render the searchComponent.
     */
    render: function renderSearchComponent(){
        return(
            <div className="search-panel">
                <QuickSearch handleKeyUp={this._search} ref="quickSearch"/>
                <List data={this.state.list}
                    ref="list"
                    isSelection={this.props.isSelection}
                    onSelection={this._selectItem}
                    onLineClick={this._lineClick}
                    fetchNextPage={this._fetchNextPage}
                    hasMoreData={this.state.hasMoreData}
                    isLoading={this.state.isLoading}
                    operationList={this.props.operationList}
                    lineComponent={this.props.lineComponent}
                />
            </div>
        );
    }
};

module.exports = builder(searchMixin);