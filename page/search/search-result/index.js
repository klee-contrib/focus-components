var builder = require('focus').component.builder;
var React = require('react');
var QuickSearch  = require('../../../search/quick-search').component;
var List = require('../../../list/selection').list.component;
var assign = require('object-assign');
var type = require('focus').component.types;
var InfiniteScrollPageMixin = require('../common-mixin/infinite-scroll-page-mixin').mixin;
var GroupByMixin= require('../common-mixin/group-by-mixin').mixin;

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
            lineComponent: undefined,
            isSelection: false,
            lineOperationList: {},
            idField: 'id'
        };
    },

    /**
     * properties validation
     */
    propTypes: {
        lineComponent: type('object'),
        isSelection: type('bool'),
        lineOperationList: type('array'),
        idField: type('string')
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
        var searchValues = this.refs.quickSearch.getValue();
        this.actions.search(
            this.getSearchCriteria(searchValues.scope, searchValues.query)
        );
    },

    _quickSearch: function quickSearch(event){
        event.preventDefault();
        this.setState(assign({isLoadingSearch: true}, this.getNoFetchState()), this.search());
    },

    /**
     * return a quickSearchComponent
     * @returns {XML} the component
     */
    quickSearchComponent: function quickSearchComponent(){
        return (
            <QuickSearch handleKeyUp={this._quickSearch}
                ref="quickSearch"
                scope={this.props.scope}
                scopes={this.props.scopeList}
                loading={this.state.isLoadingSearch}
                handleChangeScope={this._quickSearch}
            />
        );
    },

    renderSimpleList: function renderSimpleList(id, list, maxRows) {
        var newList = list;
        if(maxRows) {
            newList = list.slice(0, maxRows);
        }
        return (
            <List data={newList}
                ref={id}
                idField={this.props.idField}
                isSelection={this.props.isSelection}
                onSelection={this._selectItem}
                onLineClick={this._lineClick}
                fetchNextPage={this.fetchNextPage}
                hasMoreData={this.state.hasMoreData}
                isLoading={this.state.isLoading}
                operationList={this.props.operationList}
                lineComponent={this.props.lineComponent}
            />);
    },

    /**
     * return a list component
     * @returns {XML} the list component
     */
    listComponent: function listComponent(id, list, maxRows){
        if(this.isSimpleList()) {
            return this.renderSimpleList('list', this.state.list);
        }
        return this.renderGroupByList();
    }
};

module.exports = builder(searchMixin, true);
