// Dependencies

let builder = require('focus').component.builder;
let React = require('react');
let assign = require('object-assign');
let reduce = require('lodash/collection/reduce');
let includes = require('lodash/collection/includes');
let omit = require('lodash/object/omit');

// Components

let FacetBox = require('../../../search/facet-box').component;
let ListActionBar = require('../../../list/action-bar/index').component;
let ListSummary = require('../../../list/summary/index').component;
let BackToTopComponent = require('../../../common/button/back-to-top').component;

// Store

let queryStore = Focus.search.builtInStore.queryStore;

// Mixins

let ScrollInfoMixin = require('../common/scroll-info-mixin').mixin;
let GroupByMixin = require('../common/group-by-mixin').mixin;
let SearchMixin = require('../common/search-mixin').mixin;
let CartridgeBehaviour = require('../../mixin/cartridge-behaviour');
let storeBehaviour = require('../../../common/mixin/store-behaviour');
let type = require('focus').component.types;
/**
 * Page mixin of the advanced search.
 * @type {Object}
 */
let AdvancedSearch = {
    mixins: [ScrollInfoMixin, GroupByMixin, SearchMixin, CartridgeBehaviour, storeBehaviour],
    stores: [{
        store: queryStore,
        properties: ['scope', 'query']
    }],
    onChange() {
        this.setState(this._getStateFromStores())
    },
    /**
     * Display name.
     */
    displayName: 'advanced-search',
    /**
     * Component initialisation
     */
    componentDidMount() {
        this.__registerListeners();
        this.search();
    },
    /**
     * Actions before component will unmount.
     * @constructor
     */
    componentWillUnmount() {
        this.__unRegisterListeners();
    },
    /** @inheritedDoc
     */
    getDefaultProps() {
        return {
            facetConfig: {},
            idField: 'id', //To remove?
            isSelection: true,
            hasBackToTop: true,
            BackToTopComponent: BackToTopComponent
        };
    },
    propTypes: {
        facetConfig: type('object'),
        idField: type('string'),
        isSelection: type('bool'),
        scope: type('string'),
        query: type('string'),
        exportAction: type(['function', 'object']),
        unselectedScopeAction: type(['function', 'object'])
    },
    /**
     * Init default state.
     * @returns {object} Initialized state.
     */
    getInitialState() {
        return assign({
            facetList: {},
            selectedFacetList: {},
            openedFacetList: this.props.openedFacetList,
            selectionStatus: 'none',
            orderSelected: undefined,
            groupSelectedKey: undefined,
            scope: this.props.scope,
            query: this.props.query
        });
    },
    componentWillReceiveProps(nextProps) {
        this.setState(reduce(nextProps, (newState, key, value) => {
            if (includes(['scope', 'query'], key)) {
                newState[key] = value;
            }
            return newState;
        }, {}));
    },
    /**
     * Get the state from store.
     * @returns {object} Dtat to update store.
     */
    __getStateFromStore() {
        if (this.props.store) {
            let data = this.props.store.get();
            return assign({
                facetList: data.facet
            }, this.getScrollState());
        }
    },

    /**
     * Register a listener on the store.
     * @private
     */
    __registerListeners() {
        if (this.props.store) {
            this.props.store.addSearchChangeListener(this._onSearchChange);
        }
    },
    /**
     * Unregister a listener on the store.
     * @private
     */
    __unRegisterListeners() {
        if (this.props.store) {
            this.props.store.removeSearchChangeListener(this._onSearchChange);
        }
    },

    /**
     * Handler when store emit a change event.
     */
    _onSearchChange() {
        this.setState(this.__getStateFromStore());
    },
    /**
     * Get the list of facet to print into the top bar.
     * @returns {{}} Facets object : [facet1: 'Label of facet1', facet2: 'Label of facet2'}.
     * @private
     */
    _getFacetListForBar() {
        let facetList = {};
        for (let key in this.state.selectedFacetList) {
            if (key !== 'FCT_SCOPE') {
                let facet = this.state.selectedFacetList[key];
                facetList[key] = facet.data.label;
            }
        }
        return facetList;
    },
    /**
     * Click on bar facet action handler.
     * @param key [string]  Key of the clicked facet.
     * @private
     */
    _facetBarClick(key) {
        let selectedFacetList = this.state.selectedFacetList;
        if (key === 'FCT_SCOPE') {
            Focus.search.changeScope('ALL');
            selectedFacetList = {};
        } else {
            delete selectedFacetList[key];
        }

        this.setState(
            assign(
                {selectedFacetList: selectedFacetList},
                this.getNoFetchState())
            , this.search);
    },
    /**
     * Group action click handler.
     * @param {string} key Name of the column to group (if null => ungroup action).
     * @private
     */
    _groupClick(key) {
        console.log('Group by : ' + key);
        this.setState(
            assign(
                {groupSelectedKey: key},
                this.getNoFetchState()
            ), this.search);
    },
    /**
     * Order action click handler.
     * @param {string} key Column to order.
     * @param {string} order Order  asc/desc
     * @private
     */
    _orderClick(key, order) {
        console.log('Order : ' + key + ' - ' + order);
        this.setState(
            assign(
                {orderSelected: {key: key, order: order}},
                this.getNoFetchState()
            ), this.search);
    },
    /**
     * Selection action handler.
     * @param selectionStatus Current selection status.
     * @private
     */
    _selectionGroupLineClick(selectionStatus) {
        console.log('Selection status : ' + selectionStatus);
        this.setState({
            selectionStatus
        });
    },
    /**
     * Handler called when facet is selected.
     * @param facetComponentData Data of facet.
     */
    _facetSelectionClick(facetComponentData, isDisableGroup) {
        console.warn('Facet selection ');
        console.log(facetComponentData.selectedFacetList);

        let newState = {
            selectedFacetList: facetComponentData.selectedFacetList,
            openedFacetList: facetComponentData.openedFacetList
        };
        if (isDisableGroup) {
            newState.groupSelectedKey = undefined;
        }

        this.setState(assign(newState, this.getNoFetchState()), this.search);
    },
    /**
     * Line selection handler.
     * @param item Line checked/unchecked.
     */
    _selectItem(item) {
        this.setState({selectionStatus: 'partial'});
    },
    /**
     * Export action handler.
     */
    _exportHandler() {
        this.props.exportAction();
    },
    /**
     * Click on scope action handler.
     */
    _scopeClick() {
        Focus.search.changeScope('ALL');
        this.setState({
            selectedFacetList: {},
            scope: 'ALL'
        }, this.search);
    },
    /**
     * Action on line click.
     * @param {object} item  the item clicked
     */
    _lineClick(item) {
        if (this.props.onLineClick) {
            this.props.onLineClick(item);
        }
    },
    /**
     * Render the show all button  seect the group corresponding facet.
     * @param groupKey Group key.
     * @returns {Function} Function to select the facet.
     */
    showAllGroupListHandler(groupKey) {
        return (event)=> {
            let selectedFacetList = this.state.selectedFacetList;

            let facet = this.props.store.getFacet();
            selectedFacetList[this.state.groupSelectedKey] = {
                data: facet[this.state.groupSelectedKey][groupKey],
                key: groupKey
            };
            this._facetSelectionClick({
                selectedFacetList: selectedFacetList,
                facetComponentData: this.state.openedFacetList
            }, true);
        };
    },

    /**
     * Render the facet box.
     * @returns {XML} Render the facetBox.
     */
    getFacetBoxComponent() {
        return (
            <FacetBox
                data-focus='advanced-search-facet-box'
                facetList={this.state.facetList}
                selectedFacetList={this.state.selectedFacetList}
                openedFacetList={this.state.openedFacetList}
                config={this.props.facetConfig}
                dataSelectionHandler={this._facetSelectionClick}
                />
        );
    },
    /**
     * Render the list summary component.
     * @returns {XML} Htm code.
     */
    getListSummaryComponent() {
        let scope = this.state.scope !== 'ALL' ? {scope: this.state.scope} : undefined;
        return (
            <ListSummary
                data-focus='advanced-search-list-summary'
                nb={this.state.totalRecords}
                queryText={this.state.query}
                scopeList={scope}
                scopeClickAction={this._scopeClick}
                exportAction={this._exportHandler}/>
        );
    },
    /**
     * Render the action bar.
     * @returns {XML} Rendering of the action bar.
     */
    getActionBarComponent() {
        let groupableColumnList = Object.keys(this.state.facetList).reduce((result, facetKey) => {
            result[facetKey] = facetKey;
            return result;
        }, {});
        return (
            <ListActionBar data-focus='advanced-search-action-bar'
                           selectionStatus={this.state.selectionStatus}
                           selectionAction={this._selectionGroupLineClick}
                           orderableColumnList={this.props.orderableColumnList}
                           orderAction={this._orderClick}
                           orderSelected={this.state.orderSelected}
                           groupableColumnList={groupableColumnList}
                           groupAction={this._groupClick}
                           groupSelectedKey={this.state.groupSelectedKey}
                           facetList={this._getFacetListForBar()}
                           facetClickAction={this._facetBarClick}
                           operationList={this.props.lineOperationList}/>
        );
    },
    render: function render() {
        return (
            <div className="advanced-search" data-focus="advanced-search">
                <div data-focus="facet-container">
                    {this.getFacetBoxComponent()}
                </div>
                <div data-focus="result-container">
                    {this.getListSummaryComponent()}
                    {this.getActionBarComponent()}
                    {this.getResultListComponent(true)}
                </div>
                {this.props.hasBackToTop && <this.props.BackToTopComponent/>}
            </div>
        );
    }
};

module.exports = builder(AdvancedSearch);
