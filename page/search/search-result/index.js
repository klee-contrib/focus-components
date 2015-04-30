var builder = require('focus').component.builder;
var React = require('react');
var QuickSearch  = require('../../../search/quick-search').component;
var List = require('../../../list/selection').list.component;
var assign = require('object-assign');
var type = require('focus').component.types;
var InfiniteScrollPageMixin = require('../common-mixin/infinite-scroll-page-mixin').mixin;
var GroupByMixin= require('../common-mixin/group-by-mixin').mixin;
var checkIsNotNull = require('focus').util.object.checkIsNotNull;

var searchMixin = {
    mixins: [InfiniteScrollPageMixin, GroupByMixin],

    /**
     * Tag name.
     */
    displayName: 'search-panel',

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
            lineMap: undefined,
            isSelection: false,
            lineOperationList: [],
            idField: 'id',
            SearchComponent: QuickSearch,
            groupMaxRows: 3
        };
    },

    /**
     * properties validation
     */
    propTypes: {
        lineMap: type('object'),
        isSelection: type('bool'),
        lineOperationList: type('array'),
        idField: type('string'),
        SearchComponent: type('func'),
        groupMaxRows: type('number')
    },

    /**
     * Initial state of the list component.
     * @returns {{list: (*|Array)}} the state
     */
    getInitialState: function(){
        return {
            isAllSelected: false,
            selected: []
        };
    },

    getCriteria: function getCriteria() {
      if(!this.refs.quickSearch){
        return {};
      }
      return this.refs.quickSearch.getValue();
    },

    /**
     * Register a listener on the store.
     * @private
     */
    _registerListeners: function registerSearchListeners(){
        if(this.store){
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
     * Handler when store emit a change event.
     */
    onSearchChange: function onSearchChange() {
        this.setState(assign({isLoadingSearch: false}, this.getScrollState()));
    },

    /**
     * Action on item selection.
     * @param {object} item selected
     */
    _selectItem: function selectItem(item){
        var index = this.state.selected.indexOf(item);
        if(index){
            this.state.selected.splice(index, index);
        }else{
            this.state.selected.push(item);
        }
    },

    /**
     * Action on line click.
     * @param {object} item  the item clicked
     */
    _lineClick: function lineClick(item){
        if(this.props.onLineClick){
            this.props.onLineClick(item);
        }
    },

    /**
     * Run search action.
     */
    search: function search(){
        this.actions.search(
            this.getSearchCriteria(this.state.scope, this.state.query)
        );
    },

    _quickSearch: function quickSearch(searchValues){
        this.setState(
            assign(
                {isLoadingSearch: true},
                searchValues,
                this.getNoFetchState()
            ),
            this.search
        );
    },

    /**
     * return a quickSearchComponent
     * @returns {XML} the component
     */
    quickSearchComponent: function quickSearchComponent(){
        return (
            <this.props.SearchComponent handleChange={this._quickSearch}
                ref="quickSearch"
                scope={this.props.scope}
                scopes={this.props.scopeList}
                loading={this.state.isLoadingSearch}
            />
        );
    },

    /**
     * Render a list based on a single entity.
     * @param {object} options - map of parameters
     * @return {XML} the List component.
     */
    simpleListComponent: function simpleListComponent(options) {
        checkIsNotNull('options', options);
        checkIsNotNull('options.type', options.type);
        var newList = options.list || this.state.list;
        if(options.maxRows) {
            newList = newList.slice(0, options.maxRows);
        }
        return (
            <List data={newList}
                ref={options.type}
                idField={this.props.idField}
                isSelection={this.props.isSelection}
                onSelection={this._selectItem}
                onLineClick={this._lineClick}
                fetchNextPage={this.fetchNextPage}
                hasMoreData={this.state.hasMoreData}
                isLoading={this.state.isLoading}
                operationList={this.props.operationList}
                lineComponent={this.props.lineMap[options.type]}
                parentSelector= {this.props.parentSelector}
            />
        );
    }
};

module.exports = builder(searchMixin, true);
