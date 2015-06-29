// Dependencies

let type = require('focus').component.types;
let builder = require('focus').component.builder;

// Components

let SearchBar = require('../../../search/search-bar').component;
let Results = require('../common/component/results').component;

// Mixins

let referenceBehaviour = require('../../../common/form/mixin/reference-behaviour');
let storeBehaviour = require('../../../common/mixin/store-behaviour');

// Actions

let actionBuilder = require('../../../../search/action-builder');

// Stores

let quicSearchStore = Focus.search.builtInStore.quickSearchStore;

/**
 * General search mixin.
 * Contains a search bar, and a results list.
 * @type {Object}
 */
let QuickSearchComponent = {
    mixins: [referenceBehaviour, storeBehaviour],
    /**
     * Tag name.
     */
    displayName: 'quick-search',
    referenceNames: ['scopes'],
    getDefaultProps() {
        return {
            scopeSelectionHandler: this._scopeSelectionHandler,
            store: quicSearchStore,
            scopeFacetKey: 'FCT_SCOPE',
            lineComponentMapper: undefined,
            lineOperationList: undefined,
            groupComponent: undefined,
            service: undefined,
            action: undefined,
            onLineClick: undefined,
            groupMaxRows: undefined
        };
    },
    propTypes() {
        return ({
            scopeSelectionHandler: type('function'),
            store: type('object'),
            scopeFacetKey: type('string'),
            lineComponentMapper: type('function'),
            groupComponent: type('object'),
            service: type('object'),
            action: type('object'),
            onLineClick: type('function'),
            groupMaxRows: type('number')
        });
    },
    componentWillMount() {
        this._action = this.props.action || actionBuilder({
            service: this.props.service,
            identifier: 'QUICK_SEARCH'
        });
        this._loadReference();
        this.props.store.addQueryChangeListener(this.props.action.search);
        this.props.store.addScopeChangeListener(this.props.action.search);
        this.props.store.addResultsChangeListener(this._onResultsChange);
    },
    /**
     * Actions before component will unmount.
     * @constructor
     */
    componentWillUnmount() {
        this.props.store.removeQueryChangeListener(this.props.action.search);
        this.props.store.removeScopeChangeListener(this.props.action.search);
        this.props.store.removeResultsChangeListener(this._onResultsChange);
    },
    _onResultsChange() {
        let resultsMap = this.props.store.getResults();
        let facets = this.props.store.getFacets();
        let totalCount = this.props.store.getTotalCount();
        this.setState({resultsMap, facets, totalCount});
    },
    /**
     * Action on line click.
     * @param {object} item  the item clicked
     */
    _lineClickHandler(item) {
        if (this.props.onLineClick) {
            this.props.onLineClick(item);
        }
    },
    /**
     * return a SearchBar
     * @returns {XML} the component
     */
    _renderSearchBar() {
        return (
            <SearchBar
                data-focus='search-bar'
                ref='searchBar'
                scopes={this.state.reference.scopes}
                loading={this.state.isLoading}
                action={this._action}
                store={this.props.store}
                />
        );
    },
    _renderResults() {
        return (
            <Results
                resultsMap={this.state.resultsMap}
                totalCount={this.state.totalCount}
                resultsFacets={this.state.facets}
                groupComponent={this.props.groupComponent}
                lineComponentMapper={this.props.lineComponentMapper}
                isSelection={false}
                lineClickHandler={this._lineClickHandler}
                lineOperationList={this.props.lineOperationList}
                groupByKey={this.props.scopeFacetKey}
                initialRowsCount={this.props.groupMaxRows}
            />
        );
    },
    render() {
        return (
            <div className="search-panel" data-focus="quick-search">
                {this._renderSearchBar()}
                {this._renderResults()}
            </div>
        );
    }
};

module.exports = builder(QuickSearchComponent);
