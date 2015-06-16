// Dependencies

let assign = require('object-assign');
let type = require('focus').component.types;
let builder = require('focus').component.builder;
let React = require('react');

// Components

let SearchBar  = require('../../../search/search-bar').component;

// Mixins

let ScrollInfoMixin = require('../common/scroll-info-mixin').mixin;
let GroupByMixin= require('../common/group-by-mixin').mixin;
let SearchMixin = require('../common/search-mixin').mixin;

/**
 * General search mixin.
 * Contains a search bar, and a results list.
 * @type {Object}
 */
let QuickSearchComponent = {
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
            isSelection: false,
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
        this.props.store.addSearchChangeListener(this.onSearchChange);
        Focus.search.builtInStore.queryStore.addQueryChangeListener(this.onChange);
        Focus.search.builtInStore.queryStore.addScopeChangeListener(this.onChange);
    },
    /**
     * Unregister a listener on the store.
     * @private
     */
    _unRegisterListeners(){
        this.props.store.removeSearchChangeListener(this.onSearchChange);
        Focus.search.builtInStore.queryStore.removeQueryChangeListener(this.onChange);
        Focus.search.builtInStore.queryStore.removeScopeChangeListener(this.onChange);
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
    //_prepareSearch(searchValues){
    //    clearTimeout(this._searchTimeout);
    //    this._searchTimeout = setTimeout(() => {
    //        this.setState(
    //            assign(
    //                {isLoadingSearch: true},
    //                searchValues,
    //                this.getNoFetchState()
    //            ),
    //            this.search
    //        );
    //    }, 500);
    //},
    onChange() {
        this.setState(
            assign(
                {isLoadingSearch: true},
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
            <this.props.SearchBar
                data-focus='search-bar'
                ref='searchBar'
                scope={this.props.scope}
                scopes={this.props.scopeList}
                loading={this.state.isLoadingSearch}
            />
        );
    },
    render() {
        return (
            <div className="search-panel" data-focus="quick-search">
                {this.getSearchBarComponent()}
                {this.getResultListComponent()}
            </div>
        );
    }
};

module.exports = builder(QuickSearchComponent);
