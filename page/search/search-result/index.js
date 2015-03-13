var builder = require('../../core/componentBuilder');
var React = require('react');
var QuickSearch  = require('../../../search/quick-search').component;
var List = require('../../../list/selection').list.component;

var searchMixin = {
    displayName: "search-panel",
    count:0,
    countId:3,
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

    /**
     * Initial state of the list component.
     * @returns {{list: (*|Array)}}
     */
    getInitialState: function(){
        return {
            list: this._getStateFromStore(),
            isAllSelected: false,
            selected: [],
            hasMoreData: false,
            isLoading:false
        };
    },

    /**
     * Get liste from current store.
     * @returns {*}
     */
    _getStateFromStore: function getSearchStateFromStore(){
        if(this.store){
            return this.store.getList();
        }
        return [];
    },

    /**
     * Handler when store emit a change event.
     */
    _onChange: function onSearchStoreChange(){
        this.count ++;
        this.setState({
            list: this._getStateFromStore(),
            hasMoreData:this.count<100,
            isLoading:false
        });
    },

    /**
     * Register a listener on the store.
     * @private
     */
    _registerListeners: function registerSearchListeners(){
        if(this.store){
            this.store.addListener(this.store.events.data.change,this._onChange);
        }
    },

    /**
     * Unregister a listener on the store.
     * @private
     */
    _unRegisterListeners: function unRegisterSearchListeners(){
        if(this.store){
            this.store.removeListener(this.store.events.data.change,this._onChange);
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
        if(this.lineClick){
            this.lineClick(item);
        }
    },

    /**
     * Run search action.
     * @param event
     */
    _search: function search(event){
        event.preventDefault();
        var searchValues = this.refs.quickSearch.getValue();
        this.actions.search(searchValues.scope,searchValues.query);
    },

    /**
     * Get the next page of the list.
     * @param page
     */
    _fetchNextPage: function fetchNextPage(page){
        this.setState({isLoading:true});
        var searchValues = this.refs.quickSearch.getValue();
        this.actions.search(searchValues.scope,searchValues.query);
    },

    /**
     * render the searchComponent.
     */
    render: function renderSearchComponent(){
        return(
            <div className="search-panel">
                <QuickSearch handleKeyUp={this._search} ref="quickSearch"/>
                <List data={this.state.list}
                    ref="list" onSelection={this._selectItem}
                    onLineClick={this._lineClick}
                    fetchNextPage={this._fetchNextPage}
                    hasMoreData={this.state.hasMoreData}
                    isLoading={this.state.isLoading}/>
            </div>
        );
    }
};

module.exports = builder(searchMixin);