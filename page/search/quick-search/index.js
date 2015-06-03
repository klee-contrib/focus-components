// Dependencies

let assign = require('object-assign');
let type = require('focus').component.types;
let checkIsNotNull = require('focus').util.object.checkIsNotNull;
let builder = require('focus').component.builder;
let React = require('react');

// Components

let SearchBar  = require('../../../search/search-bar').component;
let List = require('../../../list/selection').list.component;

// Mixins

let ScrollInfoMixin = require('../common/scroll-info-mixin').mixin;
let GroupByMixin= require('../common/group-by-mixin').mixin;
let SearchMixin = require('../common/search-mixin').mixin;

/**
 * General search mixin.
 * Contains a search bar, and a results list.
 * @type {Object}
 */
let QuickSearchMixin = {
    mixins: [ScrollInfoMixin, GroupByMixin, SearchMixin],
    /**
     * Tag name.
     */
    displayName: 'quick-search',
    /**
     * Component initialization
     */
    componentDidMount(){
        this._registerListeners();
    },

    /**
     * Actions before component will unmount.
     * @constructor
     */
    componentWillUnmount(){
        this._unRegisterListeners();
    },
    getDefaultProps(){
        return {
            lineMap: undefined,
            isSelection: false,
            lineOperationList: [],
            idField: 'id',
            SearchBar: SearchBar,
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
        SearchBar: type('func'),
        groupMaxRows: type('number')
    },
    /**
     * Initial state of the list component.
     * @returns {{list: (*|Array)}} the state
     */
    getInitialState() {
        return {
            isAllSelected: false,
            selected: []
        };
    },
    getCriteria() {
      if(!this.refs.searchBar){
        return {};
      }
      return this.refs.searchBar.getValue();
    },
    /**
     * Register a listener on the store.
     * @private
     */
    _registerListeners(){
        if(this.store){
            this.store.addSearchChangeListener(this.onSearchChange);
        } else {
            console.warn('Search result has no store to listen to. Please provide one as a "store" property.');
        }
    },
    /**
     * Unregister a listener on the store.
     * @private
     */
    _unRegisterListeners(){
        if(this.store){
            this.store.removeSearchChangeListener(this.onSearchChange);
        }
    },
    /**
     * Handler when store emit a change event.
     */
    onSearchChange() {
        this.setState(assign({isLoadingSearch: false}, this.getScrollState()));
    },
    /**
     * Action on item selection.
     * @param {object} item selected
     */
    _selectItem(item){
        let selected = this.state.selected;
        let index = selected.indexOf(item);
        if(index){
            selected.splice(index, index);
        }else{
            selected.push(item);
        }
        this.setState({selected});
    },
    /**
     * Action on line click.
     * @param {object} item  the item clicked
     */
    _lineClick(item){
        if(this.props.onLineClick){
            this.props.onLineClick(item);
        }
    },
    _prepareSearch(searchValues){
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
     * return a SearchBar
     * @returns {XML} the component
     */
    getSearchBarComponent() {
        return (
            <this.props.SearchBar handleChange={this._prepareSearch}
                ref='searchBar'
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
    simpleListComponent(options) {
        checkIsNotNull('options', options);
        checkIsNotNull('options.type', options.type);
        let newList = options.list || this.state.list;
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

module.exports = builder(QuickSearchMixin, true);
