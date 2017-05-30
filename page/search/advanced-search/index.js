'use strict';

var _builder = require('focus-core/component/builder');

var _builder2 = _interopRequireDefault(_builder);

var _dispatcher = require('focus-core/dispatcher');

var _dispatcher2 = _interopRequireDefault(_dispatcher);

var _buttonBackToTop = require('../../../components/button-back-to-top');

var _buttonBackToTop2 = _interopRequireDefault(_buttonBackToTop);

var _group = require('./group');

var _group2 = _interopRequireDefault(_group);

var _builtInStore = require('focus-core/search/built-in-store');

var _types = require('focus-core/component/types');

var _types2 = _interopRequireDefault(_types);

var _actionBuilder = require('focus-core/search/action-builder');

var _actionBuilder2 = _interopRequireDefault(_actionBuilder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Dependencies
var React = require('react');

var _require = require('lodash/string'),
    camel = _require.camelCase;

var _require2 = require('lodash/string'),
    capitalize = _require2.capitalize;

var _require3 = require('lodash/lang'),
    isFunction = _require3.isFunction;

var _require4 = require('lodash/collection'),
    reduce = _require4.reduce;

// Components


var FacetBox = require('./facet-box').component;
var ListActionBar = require('./action-bar').component;
var ListSummary = require('./list-summary').component;
var Results = require('../common/component/results').component;

// Store


// Mixins
var CartridgeBehaviour = require('../../mixin/cartridge-behaviour');

// Actions


/**
* Page mixin of the advanced search.
* @type {Object}
*/
var AdvancedSearch = {
  /**
  * Component's mixins
  * @type {Array}
  */
  mixins: [CartridgeBehaviour],
  /**
  * Display name.
  */
  displayName: 'advanced-search',
  /**
  * Get the default props
  * @return {object} the default props
  */
  getDefaultProps: function getDefaultProps() {
    return {
      action: undefined,
      backToTopComponent: _buttonBackToTop2.default,
      callSearchOnMount: true,
      facetConfig: {},
      groupComponent: _group2.default,
      hasBackToTop: true,
      isSelection: true,
      lineOperationList: [],
      lineComponentMapper: undefined,
      orderableColumnList: [],
      onLineClick: undefined,
      openedFacetList: {},
      scopesConfig: {},
      scrollParentSelector: undefined,
      service: undefined,
      store: _builtInStore.advancedSearchStore
    };
  },

  /**
  * Props validation
  * @type {Object}
  */
  propTypes: {
    action: (0, _types2.default)('object'),
    backToTopComponent: (0, _types2.default)('func'),
    callSearchOnMount: (0, _types2.default)('bool'),
    exportAction: (0, _types2.default)('func'),
    facetConfig: (0, _types2.default)('object'),
    groupComponent: (0, _types2.default)('func'),
    hasBackToTop: (0, _types2.default)('bool'),
    isSelection: (0, _types2.default)('bool'),
    lineComponentMapper: (0, _types2.default)('func'),
    lineOperationList: (0, _types2.default)(['array', 'object']),
    onLineClick: (0, _types2.default)('func'),
    orderableColumnList: (0, _types2.default)(['array', 'object']),
    openedFacetList: (0, _types2.default)('object'),
    scopesConfig: (0, _types2.default)('object'),
    scrollParentSelector: (0, _types2.default)('string'),
    service: (0, _types2.default)('object'),
    store: (0, _types2.default)('object')
  },
  /**
  * Get initial state
  * @return {Object} initial state
  */
  getInitialState: function getInitialState() {
    return this._getNewStateFromStore();
  },

  /**
  * Register the store listeners
  */
  componentWillMount: function componentWillMount() {
    var _this = this;

    var _props = this.props,
        store = _props.store,
        callSearchOnMount = _props.callSearchOnMount,
        service = _props.service;
    //listen to search event

    store.on('advanced-search-criterias:change', this._onStoreChangeWithSearch);

    //listen to data changes
    ['facets', 'results', 'total-count'].forEach(function (node) {
      store['add' + capitalize(camel(node)) + 'ChangeListener'](_this._onStoreChangeWithoutSearch);
    });

    // listen to scope change
    store.addScopeChangeListener(this._onScopeChange);

    this._action = this.props.action || (0, _actionBuilder2.default)({
      service: service,
      identifier: store.identifier,
      getSearchOptions: function getSearchOptions() {
        return store.getValue.call(store);
      } // Binding the store in the function call
    });
    if (this.props.callSearchOnMount) {
      this._action.search();
    }
  },

  /**
  * Un-register the store listeners
  */
  componentWillUnmount: function componentWillUnmount() {
    var _this2 = this;

    // remove listeners
    this.props.store.removeListener('advanced-search-criterias:change', this._onStoreChangeWithSearch);
    ['facets', 'results', 'total-count'].forEach(function (node) {
      _this2.props.store['remove' + capitalize(camel(node)) + 'ChangeListener'](_this2._onStoreChangeWithoutSearch);
    });
    this.props.store.removeScopeChangeListener(this._onScopeChange);
  },
  getSelectedItems: function getSelectedItems() {
    var results = this.refs.resultList;
    var selectedItems = reduce(results.refs, function (selectedItems, ref) {
      if (isFunction(ref.getSelectedItems)) {
        selectedItems = selectedItems.concat(ref.getSelectedItems());
      } else if (ref.refs) {
        selectedItems = selectedItems.concat(reduce(ref.refs, function (subSelectedItems, subRef) {
          if (isFunction(subRef.getSelectedItems)) {
            subSelectedItems = subSelectedItems.concat(subRef.getSelectedItems());
          }
          return subSelectedItems;
        }, []));
      }
      return selectedItems;
    }, []);
    return selectedItems;
  },

  /**
  * Store changed, update the state, trigger a search after update
  */
  _onStoreChangeWithSearch: function _onStoreChangeWithSearch() {
    this.setState(this._getNewStateFromStore(), this._action.search);
  },

  /**
  * Store changed, update the state, do not trigger a search after update
  */
  _onStoreChangeWithoutSearch: function _onStoreChangeWithoutSearch() {
    this.setState(this._getNewStateFromStore());
  },

  /**
  * Scope changed, need to remove all existing sort.
  */
  _onScopeChange: function _onScopeChange() {
    _dispatcher2.default.handleViewAction({ data: { sortBy: null, sortAsc: null },
      type: 'update',
      identifier: _builtInStore.advancedSearchStore.identifier });
  },
  /**
  * Compute a state object from the store values.
  * @return {[type]} [description]
  */
  _getNewStateFromStore: function _getNewStateFromStore() {
    var store = this.props.store;

    var query = store.getQuery();
    var scope = store.getScope();
    var selectedFacets = store.getSelectedFacets() || {};
    var groupingKey = store.getGroupingKey();
    var sortBy = store.getSortBy();
    var sortAsc = store.getSortAsc();
    var facets = store.getFacets();
    var results = store.getResults();
    var totalCount = store.getTotalCount();
    var selectionStatus = 'none';
    var hasGrouping = scope !== undefined && scope !== 'ALL';
    return {
      facets: facets,
      groupingKey: groupingKey,
      hasGrouping: hasGrouping,
      query: query,
      selectionStatus: selectionStatus,
      scope: scope,
      selectedFacets: selectedFacets,
      sortBy: sortBy,
      sortAsc: sortAsc,
      results: results,
      totalCount: totalCount
    };
  },

  /**
  * Export action handler.
  */
  _exportHandler: function _exportHandler() {
    this.props.exportAction();
  },

  /**
  * Render the facet box.
  * @returns {HTML} the rendered component
  */
  _renderFacetBox: function _renderFacetBox() {
    var _state = this.state,
        facets = _state.facets,
        selectedFacets = _state.selectedFacets;
    var _props2 = this.props,
        facetConfig = _props2.facetConfig,
        scopesConfig = _props2.scopesConfig,
        openedFacetList = _props2.openedFacetList;

    return React.createElement(FacetBox, {
      action: this._action,
      facetConfig: facetConfig,
      openedFacetList: openedFacetList,
      facets: facets,
      ref: 'facetBox',
      scopesConfig: scopesConfig,
      selectedFacets: selectedFacets
    });
  },

  /**
  * Render the list summary component.
  * @returns {HTML} the rendered component
  */
  _renderListSummary: function _renderListSummary() {
    var _state2 = this.state,
        query = _state2.query,
        scope = _state2.scope,
        totalCount = _state2.totalCount;

    return React.createElement(ListSummary, {
      action: this._action,
      query: query,
      ref: 'summary',
      scope: scope,
      totalCount: totalCount
    });
  },

  /**
  * Render the action bar.
  * @returns {HTML} the rendered component
  */
  _renderActionBar: function _renderActionBar() {
    var _this3 = this;

    var _state3 = this.state,
        facets = _state3.facets,
        groupingKey = _state3.groupingKey,
        hasGrouping = _state3.hasGrouping,
        selectedFacets = _state3.selectedFacets,
        selectionStatus = _state3.selectionStatus,
        sortBy = _state3.sortBy;
    var _props3 = this.props,
        isSelection = _props3.isSelection,
        lineOperationList = _props3.lineOperationList,
        orderableColumnList = _props3.orderableColumnList;

    var groupableColumnList = facets ? Object.keys(facets).reduce(function (result, facetKey) {
      if (Object.keys(facets[facetKey]).length > 1) {
        result[facetKey] = facetKey;
      }
      return result;
    }, {}) : {};
    var selectionAction = function selectionAction(status) {
      _this3.setState({ selectionStatus: status });
    };
    return React.createElement(ListActionBar, {
      action: this._action,
      groupSelectedKey: groupingKey,
      groupableColumnList: groupableColumnList,
      hasGrouping: hasGrouping,
      isSelection: isSelection,
      operationList: lineOperationList,
      orderSelected: sortBy,
      orderableColumnList: orderableColumnList,
      ref: 'actionBar',
      selectedFacets: selectedFacets,
      selectionAction: selectionAction,
      selectionStatus: selectionStatus
    });
  },

  /**
  * Render the results component
  * @return {HTML} the rendered component
  */
  _renderResults: function _renderResults() {
    var _props4 = this.props,
        groupComponent = _props4.groupComponent,
        isSelection = _props4.isSelection,
        lineComponentMapper = _props4.lineComponentMapper,
        lineOperationList = _props4.lineOperationList,
        scrollParentSelector = _props4.scrollParentSelector,
        store = _props4.store,
        scopesConfig = _props4.scopesConfig;
    var _state4 = this.state,
        groupingKey = _state4.groupingKey,
        facets = _state4.facets,
        results = _state4.results,
        selectionStatus = _state4.selectionStatus,
        totalCount = _state4.totalCount;

    return React.createElement(Results, {
      action: this._action,
      groupComponent: groupComponent,
      groupingKey: groupingKey,
      isSelection: isSelection,
      lineClickHandler: this._lineClick,
      lineComponentMapper: lineComponentMapper,
      lineOperationList: lineOperationList,
      lineSelectionHandler: this._selectItem,
      ref: 'resultList',
      renderSingleGroupDecoration: false,
      resultsFacets: facets,
      resultsMap: results,
      scopesConfig: scopesConfig,
      scrollParentSelector: scrollParentSelector,
      selectionStatus: selectionStatus,
      store: store,
      totalCount: totalCount
    });
  },

  /**
  * Line selection handler
  */
  _selectItem: function _selectItem() {
    // count the selected items
    var selectedItemsCount = this.getSelectedItems().length;
    // Count the visible items
    var visibleItemsCount = reduce(this.refs.resultList.refs, function (visibleItemsCount, refComponent, refKey) {
      // Results might be a list (non-grouped search) or groups (grouped search)
      if (refKey.indexOf('list-') === 0) {
        visibleItemsCount += refComponent.props.data.length;
      }
      if (refKey.indexOf('group-') === 0) {
        if (refComponent.props.list.length < refComponent.state.resultsDisplayedCount) {
          visibleItemsCount += refComponent.props.list.length;
        } else {
          visibleItemsCount += refComponent.state.resultsDisplayedCount;
        }
      }
      return visibleItemsCount;
    }, 0);
    // By default, the selection status is partial
    var selectionStatus = 'partial';
    // If no item is selected, then the selectionStatus is none
    if (selectedItemsCount === 0) {
      selectionStatus = 'none';
    } else if (selectedItemsCount === visibleItemsCount) {
      // There are as many selected items as visible items, so the selectionStatus is all
      selectionStatus = 'selected';
    }
    this.setState({ selectionStatus: selectionStatus });
  },

  /**
  * Action on line click.
  * @param {object} item  the item clicked
  */
  _lineClick: function _lineClick(item) {
    if (this.props.onLineClick) {
      this.props.onLineClick(item);
    }
  },

  /**
  * Render the component
  * @return {HTML} the rendered component
  */
  render: function render() {
    // true if a facet is collapsed
    var facetCollapsedClassName = Object.keys(this.props.openedFacetList).length === 0 ? 'facet-collapsed' : '';
    return React.createElement(
      'div',
      { className: 'advanced-search', 'data-focus': 'advanced-search' },
      React.createElement(
        'div',
        { 'data-focus': 'facet-container', className: facetCollapsedClassName },
        this._renderFacetBox()
      ),
      React.createElement(
        'div',
        { 'data-focus': 'result-container' },
        this._renderListSummary(),
        this._renderActionBar(),
        this._renderResults()
      ),
      this.props.hasBackToTop && React.createElement(this.props.backToTopComponent, null)
    );
  }
};

module.exports = (0, _builder2.default)(AdvancedSearch);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJSZWFjdCIsInJlcXVpcmUiLCJjYW1lbCIsImNhbWVsQ2FzZSIsImNhcGl0YWxpemUiLCJpc0Z1bmN0aW9uIiwicmVkdWNlIiwiRmFjZXRCb3giLCJjb21wb25lbnQiLCJMaXN0QWN0aW9uQmFyIiwiTGlzdFN1bW1hcnkiLCJSZXN1bHRzIiwiQ2FydHJpZGdlQmVoYXZpb3VyIiwiQWR2YW5jZWRTZWFyY2giLCJtaXhpbnMiLCJkaXNwbGF5TmFtZSIsImdldERlZmF1bHRQcm9wcyIsImFjdGlvbiIsInVuZGVmaW5lZCIsImJhY2tUb1RvcENvbXBvbmVudCIsImNhbGxTZWFyY2hPbk1vdW50IiwiZmFjZXRDb25maWciLCJncm91cENvbXBvbmVudCIsImhhc0JhY2tUb1RvcCIsImlzU2VsZWN0aW9uIiwibGluZU9wZXJhdGlvbkxpc3QiLCJsaW5lQ29tcG9uZW50TWFwcGVyIiwib3JkZXJhYmxlQ29sdW1uTGlzdCIsIm9uTGluZUNsaWNrIiwib3BlbmVkRmFjZXRMaXN0Iiwic2NvcGVzQ29uZmlnIiwic2Nyb2xsUGFyZW50U2VsZWN0b3IiLCJzZXJ2aWNlIiwic3RvcmUiLCJwcm9wVHlwZXMiLCJleHBvcnRBY3Rpb24iLCJnZXRJbml0aWFsU3RhdGUiLCJfZ2V0TmV3U3RhdGVGcm9tU3RvcmUiLCJjb21wb25lbnRXaWxsTW91bnQiLCJwcm9wcyIsIm9uIiwiX29uU3RvcmVDaGFuZ2VXaXRoU2VhcmNoIiwiZm9yRWFjaCIsIm5vZGUiLCJfb25TdG9yZUNoYW5nZVdpdGhvdXRTZWFyY2giLCJhZGRTY29wZUNoYW5nZUxpc3RlbmVyIiwiX29uU2NvcGVDaGFuZ2UiLCJfYWN0aW9uIiwiaWRlbnRpZmllciIsImdldFNlYXJjaE9wdGlvbnMiLCJnZXRWYWx1ZSIsImNhbGwiLCJzZWFyY2giLCJjb21wb25lbnRXaWxsVW5tb3VudCIsInJlbW92ZUxpc3RlbmVyIiwicmVtb3ZlU2NvcGVDaGFuZ2VMaXN0ZW5lciIsImdldFNlbGVjdGVkSXRlbXMiLCJyZXN1bHRzIiwicmVmcyIsInJlc3VsdExpc3QiLCJzZWxlY3RlZEl0ZW1zIiwicmVmIiwiY29uY2F0Iiwic3ViU2VsZWN0ZWRJdGVtcyIsInN1YlJlZiIsInNldFN0YXRlIiwiaGFuZGxlVmlld0FjdGlvbiIsImRhdGEiLCJzb3J0QnkiLCJzb3J0QXNjIiwidHlwZSIsInF1ZXJ5IiwiZ2V0UXVlcnkiLCJzY29wZSIsImdldFNjb3BlIiwic2VsZWN0ZWRGYWNldHMiLCJnZXRTZWxlY3RlZEZhY2V0cyIsImdyb3VwaW5nS2V5IiwiZ2V0R3JvdXBpbmdLZXkiLCJnZXRTb3J0QnkiLCJnZXRTb3J0QXNjIiwiZmFjZXRzIiwiZ2V0RmFjZXRzIiwiZ2V0UmVzdWx0cyIsInRvdGFsQ291bnQiLCJnZXRUb3RhbENvdW50Iiwic2VsZWN0aW9uU3RhdHVzIiwiaGFzR3JvdXBpbmciLCJfZXhwb3J0SGFuZGxlciIsIl9yZW5kZXJGYWNldEJveCIsInN0YXRlIiwiX3JlbmRlckxpc3RTdW1tYXJ5IiwiX3JlbmRlckFjdGlvbkJhciIsImdyb3VwYWJsZUNvbHVtbkxpc3QiLCJPYmplY3QiLCJrZXlzIiwicmVzdWx0IiwiZmFjZXRLZXkiLCJsZW5ndGgiLCJzZWxlY3Rpb25BY3Rpb24iLCJzdGF0dXMiLCJfcmVuZGVyUmVzdWx0cyIsIl9saW5lQ2xpY2siLCJfc2VsZWN0SXRlbSIsInNlbGVjdGVkSXRlbXNDb3VudCIsInZpc2libGVJdGVtc0NvdW50IiwicmVmQ29tcG9uZW50IiwicmVmS2V5IiwiaW5kZXhPZiIsImxpc3QiLCJyZXN1bHRzRGlzcGxheWVkQ291bnQiLCJpdGVtIiwicmVuZGVyIiwiZmFjZXRDb2xsYXBzZWRDbGFzc05hbWUiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOztBQUVBOzs7O0FBQ0E7Ozs7QUFXQTs7OztBQUNBOzs7O0FBR0E7O0FBSUE7Ozs7QUFHQTs7Ozs7O0FBekJBO0FBQ0EsSUFBTUEsUUFBUUMsUUFBUSxPQUFSLENB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akIiLCJmaWxlIjoiaXMtcmVhY3QtY2xhc3MtY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gRGVwZW5kZW5jaWVzXG5jb25zdCBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5pbXBvcnQgYnVpbGRlciBmcm9tICdmb2N1cy1jb3JlL2NvbXBvbmVudC9idWlsZGVyJztcbmltcG9ydCBkaXNwYXRjaGVyIGZyb20gJ2ZvY3VzLWNvcmUvZGlzcGF0Y2hlcic7XG5jb25zdCB7Y2FtZWxDYXNlOiBjYW1lbH0gPSByZXF1aXJlKCdsb2Rhc2gvc3RyaW5nJyk7XG5jb25zdCB7Y2FwaXRhbGl6ZX0gPSByZXF1aXJlKCdsb2Rhc2gvc3RyaW5nJyk7XG5jb25zdCB7aXNGdW5jdGlvbn0gPSByZXF1aXJlKCdsb2Rhc2gvbGFuZycpO1xuY29uc3Qge3JlZHVjZX0gPSByZXF1aXJlKCdsb2Rhc2gvY29sbGVjdGlvbicpO1xuXG4vLyBDb21wb25lbnRzXG5jb25zdCBGYWNldEJveCA9IHJlcXVpcmUoJy4vZmFjZXQtYm94JykuY29tcG9uZW50O1xuY29uc3QgTGlzdEFjdGlvbkJhciA9IHJlcXVpcmUoJy4vYWN0aW9uLWJhcicpLmNvbXBvbmVudDtcbmNvbnN0IExpc3RTdW1tYXJ5ID0gcmVxdWlyZSgnLi9saXN0LXN1bW1hcnknKS5jb21wb25lbnQ7XG5jb25zdCBSZXN1bHRzID0gcmVxdWlyZSgnLi4vY29tbW9uL2NvbXBvbmVudC9yZXN1bHRzJykuY29tcG9uZW50O1xuaW1wb3J0IEJhY2tUb1RvcENvbXBvbmVudCBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL2J1dHRvbi1iYWNrLXRvLXRvcCc7XG5pbXBvcnQgRGVmYXVsdEdyb3VwQ29tcG9uZW50IGZyb20gJy4vZ3JvdXAnO1xuXG4vLyBTdG9yZVxuaW1wb3J0IHthZHZhbmNlZFNlYXJjaFN0b3JlfSBmcm9tICdmb2N1cy1jb3JlL3NlYXJjaC9idWlsdC1pbi1zdG9yZSc7XG5cbi8vIE1peGluc1xuY29uc3QgQ2FydHJpZGdlQmVoYXZpb3VyID0gcmVxdWlyZSgnLi4vLi4vbWl4aW4vY2FydHJpZGdlLWJlaGF2aW91cicpO1xuaW1wb3J0IHR5cGUgZnJvbSAnZm9jdXMtY29yZS9jb21wb25lbnQvdHlwZXMnO1xuXG4vLyBBY3Rpb25zXG5pbXBvcnQgYWN0aW9uQnVpbGRlciBmcm9tICdmb2N1cy1jb3JlL3NlYXJjaC9hY3Rpb24tYnVpbGRlcic7XG5cbi8qKlxuKiBQYWdlIG1peGluIG9mIHRoZSBhZHZhbmNlZCBzZWFyY2guXG4qIEB0eXBlIHtPYmplY3R9XG4qL1xuY29uc3QgQWR2YW5jZWRTZWFyY2ggPSB7XG4gIC8qKlxuICAqIENvbXBvbmVudCdzIG1peGluc1xuICAqIEB0eXBlIHtBcnJheX1cbiAgKi9cbiAgbWl4aW5zOiBbQ2FydHJpZGdlQmVoYXZpb3VyXSxcbiAgLyoqXG4gICogRGlzcGxheSBuYW1lLlxuICAqL1xuICBkaXNwbGF5TmFtZTogJ2FkdmFuY2VkLXNlYXJjaCcsXG4gIC8qKlxuICAqIEdldCB0aGUgZGVmYXVsdCBwcm9wc1xuICAqIEByZXR1cm4ge29iamVjdH0gdGhlIGRlZmF1bHQgcHJvcHNcbiAgKi9cbiAgZ2V0RGVmYXVsdFByb3BzKCkge1xuICAgIHJldHVybiB7XG4gICAgICBhY3Rpb246IHVuZGVmaW5lZCxcbiAgICAgIGJhY2tUb1RvcENvbXBvbmVudDogQmFja1RvVG9wQ29tcG9uZW50LFxuICAgICAgY2FsbFNlYXJjaE9uTW91bnQgOiB0cnVlLFxuICAgICAgZmFjZXRDb25maWc6IHt9LFxuICAgICAgZ3JvdXBDb21wb25lbnQ6IERlZmF1bHRHcm91cENvbXBvbmVudCxcbiAgICAgIGhhc0JhY2tUb1RvcDogdHJ1ZSxcbiAgICAgIGlzU2VsZWN0aW9uOiB0cnVlLFxuICAgICAgbGluZU9wZXJhdGlvbkxpc3Q6IFtdLFxuICAgICAgbGluZUNvbXBvbmVudE1hcHBlcjogdW5kZWZpbmVkLFxuICAgICAgb3JkZXJhYmxlQ29sdW1uTGlzdDogW10sXG4gICAgICBvbkxpbmVDbGljazogdW5kZWZpbmVkLFxuICAgICAgb3BlbmVkRmFjZXRMaXN0OiB7fSxcbiAgICAgIHNjb3Blc0NvbmZpZzoge30sXG4gICAgICBzY3JvbGxQYXJlbnRTZWxlY3RvcjogdW5kZWZpbmVkLFxuICAgICAgc2VydmljZTogdW5kZWZpbmVkLFxuICAgICAgc3RvcmU6IGFkdmFuY2VkU2VhcmNoU3RvcmVcbiAgICB9O1xuICB9LFxuICAvKipcbiAgKiBQcm9wcyB2YWxpZGF0aW9uXG4gICogQHR5cGUge09iamVjdH1cbiAgKi9cbiAgcHJvcFR5cGVzOiB7XG4gICAgYWN0aW9uOiB0eXBlKCdvYmplY3QnKSxcbiAgICBiYWNrVG9Ub3BDb21wb25lbnQ6IHR5cGUoJ2Z1bmMnKSxcbiAgICBjYWxsU2VhcmNoT25Nb3VudCA6IHR5cGUoJ2Jvb2wnKSxcbiAgICBleHBvcnRBY3Rpb246IHR5cGUoJ2Z1bmMnKSxcbiAgICBmYWNldENvbmZpZzogdHlwZSgnb2JqZWN0JyksXG4gICAgZ3JvdXBDb21wb25lbnQ6IHR5cGUoJ2Z1bmMnKSxcbiAgICBoYXNCYWNrVG9Ub3A6IHR5cGUoJ2Jvb2wnKSxcbiAgICBpc1NlbGVjdGlvbjogdHlwZSgnYm9vbCcpLFxuICAgIGxpbmVDb21wb25lbnRNYXBwZXI6IHR5cGUoJ2Z1bmMnKSxcbiAgICBsaW5lT3BlcmF0aW9uTGlzdDogdHlwZShbJ2FycmF5JywgJ29iamVjdCddKSxcbiAgICBvbkxpbmVDbGljazogdHlwZSgnZnVuYycpLFxuICAgIG9yZGVyYWJsZUNvbHVtbkxpc3Q6IHR5cGUoWydhcnJheScsICdvYmplY3QnXSksXG4gICAgb3BlbmVkRmFjZXRMaXN0OiB0eXBlKCdvYmplY3QnKSxcbiAgICBzY29wZXNDb25maWc6IHR5cGUoJ29iamVjdCcpLFxuICAgIHNjcm9sbFBhcmVudFNlbGVjdG9yOiB0eXBlKCdzdHJpbmcnKSxcbiAgICBzZXJ2aWNlOiB0eXBlKCdvYmplY3QnKSxcbiAgICBzdG9yZTogdHlwZSgnb2JqZWN0JylcbiAgfSxcbiAgLyoqXG4gICogR2V0IGluaXRpYWwgc3RhdGVcbiAgKiBAcmV0dXJuIHtPYmplY3R9IGluaXRpYWwgc3RhdGVcbiAgKi9cbiAgZ2V0SW5pdGlhbFN0YXRlKCkge1xuICAgIHJldHVybiAodGhpcy5fZ2V0TmV3U3RhdGVGcm9tU3RvcmUoKSk7XG4gIH0sXG4gIC8qKlxuICAqIFJlZ2lzdGVyIHRoZSBzdG9yZSBsaXN0ZW5lcnNcbiAgKi9cbiAgY29tcG9uZW50V2lsbE1vdW50KCkge1xuICAgIGNvbnN0IHtzdG9yZSwgY2FsbFNlYXJjaE9uTW91bnQsIHNlcnZpY2V9ID0gdGhpcy5wcm9wcztcbiAgICAvL2xpc3RlbiB0byBzZWFyY2ggZXZlbnRcbiAgICBzdG9yZS5vbignYWR2YW5jZWQtc2VhcmNoLWNyaXRlcmlhczpjaGFuZ2UnLCB0aGlzLl9vblN0b3JlQ2hhbmdlV2l0aFNlYXJjaCk7XG5cbiAgICAvL2xpc3RlbiB0byBkYXRhIGNoYW5nZXNcbiAgICBbJ2ZhY2V0cycsICdyZXN1bHRzJywgJ3RvdGFsLWNvdW50J10uZm9yRWFjaCgobm9kZSkgPT4ge1xuICAgICAgc3RvcmVbYGFkZCR7Y2FwaXRhbGl6ZShjYW1lbChub2RlKSl9Q2hhbmdlTGlzdGVuZXJgXSh0aGlzLl9vblN0b3JlQ2hhbmdlV2l0aG91dFNlYXJjaCk7XG4gICAgfSk7XG5cbiAgICAvLyBsaXN0ZW4gdG8gc2NvcGUgY2hhbmdlXG4gICAgc3RvcmUuYWRkU2NvcGVDaGFuZ2VMaXN0ZW5lcih0aGlzLl9vblNjb3BlQ2hhbmdlKTtcblxuICAgIHRoaXMuX2FjdGlvbiA9IHRoaXMucHJvcHMuYWN0aW9uIHx8IGFjdGlvbkJ1aWxkZXIoe1xuICAgICAgc2VydmljZTogc2VydmljZSxcbiAgICAgIGlkZW50aWZpZXI6IHN0b3JlLmlkZW50aWZpZXIsXG4gICAgICBnZXRTZWFyY2hPcHRpb25zOiAoKSA9PiB7cmV0dXJuIHN0b3JlLmdldFZhbHVlLmNhbGwoc3RvcmUpOyB9IC8vIEJpbmRpbmcgdGhlIHN0b3JlIGluIHRoZSBmdW5jdGlvbiBjYWxsXG4gICAgfSk7XG4gICAgaWYodGhpcy5wcm9wcy5jYWxsU2VhcmNoT25Nb3VudCkge1xuICAgICAgdGhpcy5fYWN0aW9uLnNlYXJjaCgpO1xuICAgIH1cbiAgfSxcbiAgLyoqXG4gICogVW4tcmVnaXN0ZXIgdGhlIHN0b3JlIGxpc3RlbmVyc1xuICAqL1xuICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICAvLyByZW1vdmUgbGlzdGVuZXJzXG4gICAgdGhpcy5wcm9wcy5zdG9yZS5yZW1vdmVMaXN0ZW5lcignYWR2YW5jZWQtc2VhcmNoLWNyaXRlcmlhczpjaGFuZ2UnLCB0aGlzLl9vblN0b3JlQ2hhbmdlV2l0aFNlYXJjaCk7XG4gICAgWydmYWNldHMnLCAncmVzdWx0cycsICd0b3RhbC1jb3VudCddLmZvckVhY2goKG5vZGUpID0+IHtcbiAgICAgIHRoaXMucHJvcHMuc3RvcmVbYHJlbW92ZSR7Y2FwaXRhbGl6ZShjYW1lbChub2RlKSl9Q2hhbmdlTGlzdGVuZXJgXSh0aGlzLl9vblN0b3JlQ2hhbmdlV2l0aG91dFNlYXJjaCk7XG4gICAgfSk7XG4gICAgdGhpcy5wcm9wcy5zdG9yZS5yZW1vdmVTY29wZUNoYW5nZUxpc3RlbmVyKHRoaXMuX29uU2NvcGVDaGFuZ2UpO1xuICB9LFxuXG4gIGdldFNlbGVjdGVkSXRlbXMoKSB7XG4gICAgY29uc3QgcmVzdWx0cyA9IHRoaXMucmVmcy5yZXN1bHRMaXN0O1xuICAgIGNvbnN0IHNlbGVjdGVkSXRlbXMgPSByZWR1Y2UocmVzdWx0cy5yZWZzLCAoc2VsZWN0ZWRJdGVtcywgcmVmKSA9PiB7XG4gICAgICBpZiAoaXNGdW5jdGlvbihyZWYuZ2V0U2VsZWN0ZWRJdGVtcykpIHtcbiAgICAgICAgc2VsZWN0ZWRJdGVtcyA9IHNlbGVjdGVkSXRlbXMuY29uY2F0KHJlZi5nZXRTZWxlY3RlZEl0ZW1zKCkpO1xuICAgICAgfSBlbHNlIGlmIChyZWYucmVmcykge1xuICAgICAgICBzZWxlY3RlZEl0ZW1zID0gc2VsZWN0ZWRJdGVtcy5jb25jYXQocmVkdWNlKHJlZi5yZWZzLCAoc3ViU2VsZWN0ZWRJdGVtcywgc3ViUmVmKSA9PiB7XG4gICAgICAgICAgaWYgKGlzRnVuY3Rpb24oc3ViUmVmLmdldFNlbGVjdGVkSXRlbXMpKSB7XG4gICAgICAgICAgICBzdWJTZWxlY3RlZEl0ZW1zID0gc3ViU2VsZWN0ZWRJdGVtcy5jb25jYXQoc3ViUmVmLmdldFNlbGVjdGVkSXRlbXMoKSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBzdWJTZWxlY3RlZEl0ZW1zO1xuICAgICAgICB9LCBbXSkpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHNlbGVjdGVkSXRlbXM7XG4gICAgfSwgW10pO1xuICAgIHJldHVybiBzZWxlY3RlZEl0ZW1zO1xuICB9LFxuICAvKipcbiAgKiBTdG9yZSBjaGFuZ2VkLCB1cGRhdGUgdGhlIHN0YXRlLCB0cmlnZ2VyIGEgc2VhcmNoIGFmdGVyIHVwZGF0ZVxuICAqL1xuICBfb25TdG9yZUNoYW5nZVdpdGhTZWFyY2goKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh0aGlzLl9nZXROZXdTdGF0ZUZyb21TdG9yZSgpLCB0aGlzLl9hY3Rpb24uc2VhcmNoKTtcbiAgfSxcbiAgLyoqXG4gICogU3RvcmUgY2hhbmdlZCwgdXBkYXRlIHRoZSBzdGF0ZSwgZG8gbm90IHRyaWdnZXIgYSBzZWFyY2ggYWZ0ZXIgdXBkYXRlXG4gICovXG4gIF9vblN0b3JlQ2hhbmdlV2l0aG91dFNlYXJjaCgpIHtcbiAgICB0aGlzLnNldFN0YXRlKHRoaXMuX2dldE5ld1N0YXRlRnJvbVN0b3JlKCkpO1xuICB9LFxuICAvKipcbiAgKiBTY29wZSBjaGFuZ2VkLCBuZWVkIHRvIHJlbW92ZSBhbGwgZXhpc3Rpbmcgc29ydC5cbiAgKi9cbiAgX29uU2NvcGVDaGFuZ2U6IGZ1bmN0aW9uIF9vblNjb3BlQ2hhbmdlKCkge1xuICAgIGRpc3BhdGNoZXIuaGFuZGxlVmlld0FjdGlvbih7ZGF0YTp7c29ydEJ5OiBudWxsLCBzb3J0QXNjOiBudWxsfSxcbiAgICAgIHR5cGU6ICd1cGRhdGUnLFxuICAgICAgaWRlbnRpZmllcjogYWR2YW5jZWRTZWFyY2hTdG9yZS5pZGVudGlmaWVyfVxuICAgICk7XG4gIH0sXG4gIC8qKlxuICAqIENvbXB1dGUgYSBzdGF0ZSBvYmplY3QgZnJvbSB0aGUgc3RvcmUgdmFsdWVzLlxuICAqIEByZXR1cm4ge1t0eXBlXX0gW2Rlc2NyaXB0aW9uXVxuICAqL1xuICBfZ2V0TmV3U3RhdGVGcm9tU3RvcmUoKSB7XG4gICAgY29uc3Qge3N0b3JlfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgcXVlcnkgPSBzdG9yZS5nZXRRdWVyeSgpO1xuICAgIGNvbnN0IHNjb3BlID0gc3RvcmUuZ2V0U2NvcGUoKTtcbiAgICBjb25zdCBzZWxlY3RlZEZhY2V0cyA9IHN0b3JlLmdldFNlbGVjdGVkRmFjZXRzKCkgfHwge307XG4gICAgY29uc3QgZ3JvdXBpbmdLZXkgPSBzdG9yZS5nZXRHcm91cGluZ0tleSgpO1xuICAgIGNvbnN0IHNvcnRCeSA9IHN0b3JlLmdldFNvcnRCeSgpO1xuICAgIGNvbnN0IHNvcnRBc2MgPSBzdG9yZS5nZXRTb3J0QXNjKCk7XG4gICAgY29uc3QgZmFjZXRzID0gc3RvcmUuZ2V0RmFjZXRzKCk7XG4gICAgY29uc3QgcmVzdWx0cyA9IHN0b3JlLmdldFJlc3VsdHMoKTtcbiAgICBjb25zdCB0b3RhbENvdW50ID0gc3RvcmUuZ2V0VG90YWxDb3VudCgpO1xuICAgIGNvbnN0IHNlbGVjdGlvblN0YXR1cyA9ICdub25lJztcbiAgICBjb25zdCBoYXNHcm91cGluZyA9IHNjb3BlICE9PSB1bmRlZmluZWQgJiYgc2NvcGUgIT09ICdBTEwnO1xuICAgIHJldHVybiB7XG4gICAgICBmYWNldHMsXG4gICAgICBncm91cGluZ0tleSxcbiAgICAgIGhhc0dyb3VwaW5nLFxuICAgICAgcXVlcnksXG4gICAgICBzZWxlY3Rpb25TdGF0dXMsXG4gICAgICBzY29wZSxcbiAgICAgIHNlbGVjdGVkRmFjZXRzLFxuICAgICAgc29ydEJ5LFxuICAgICAgc29ydEFzYyxcbiAgICAgIHJlc3VsdHMsXG4gICAgICB0b3RhbENvdW50XG4gICAgfTtcbiAgfSxcbiAgLyoqXG4gICogRXhwb3J0IGFjdGlvbiBoYW5kbGVyLlxuICAqL1xuICBfZXhwb3J0SGFuZGxlcigpIHtcbiAgICB0aGlzLnByb3BzLmV4cG9ydEFjdGlvbigpO1xuICB9LFxuICAvKipcbiAgKiBSZW5kZXIgdGhlIGZhY2V0IGJveC5cbiAgKiBAcmV0dXJucyB7SFRNTH0gdGhlIHJlbmRlcmVkIGNvbXBvbmVudFxuICAqL1xuICBfcmVuZGVyRmFjZXRCb3goKSB7XG4gICAgY29uc3Qge2ZhY2V0cywgc2VsZWN0ZWRGYWNldHN9ID0gdGhpcy5zdGF0ZTtcbiAgICBjb25zdCB7ZmFjZXRDb25maWcsIHNjb3Blc0NvbmZpZywgb3BlbmVkRmFjZXRMaXN0fSA9IHRoaXMucHJvcHM7XG4gICAgcmV0dXJuIChcbiAgICAgIDxGYWNldEJveFxuICAgICAgYWN0aW9uPXt0aGlzLl9hY3Rpb259XG4gICAgICBmYWNldENvbmZpZz17ZmFjZXRDb25maWd9XG4gICAgICBvcGVuZWRGYWNldExpc3Q9e29wZW5lZEZhY2V0TGlzdH1cbiAgICAgIGZhY2V0cz17ZmFjZXRzfVxuICAgICAgcmVmPSdmYWNldEJveCdcbiAgICAgIHNjb3Blc0NvbmZpZz17c2NvcGVzQ29uZmlnfVxuICAgICAgc2VsZWN0ZWRGYWNldHM9e3NlbGVjdGVkRmFjZXRzfVxuICAgICAgLz5cbiAgICApO1xuICB9LFxuICAvKipcbiAgKiBSZW5kZXIgdGhlIGxpc3Qgc3VtbWFyeSBjb21wb25lbnQuXG4gICogQHJldHVybnMge0hUTUx9IHRoZSByZW5kZXJlZCBjb21wb25lbnRcbiAgKi9cbiAgX3JlbmRlckxpc3RTdW1tYXJ5KCkge1xuICAgIGNvbnN0IHtxdWVyeSwgc2NvcGUsIHRvdGFsQ291bnR9ID0gdGhpcy5zdGF0ZTtcbiAgICByZXR1cm4gKFxuICAgICAgPExpc3RTdW1tYXJ5XG4gICAgICBhY3Rpb249e3RoaXMuX2FjdGlvbn1cbiAgICAgIHF1ZXJ5PXtxdWVyeX1cbiAgICAgIHJlZj0nc3VtbWFyeSdcbiAgICAgIHNjb3BlPXtzY29wZX1cbiAgICAgIHRvdGFsQ291bnQ9e3RvdGFsQ291bnR9XG4gICAgICAvPlxuICAgICk7XG4gIH0sXG4gIC8qKlxuICAqIFJlbmRlciB0aGUgYWN0aW9uIGJhci5cbiAgKiBAcmV0dXJucyB7SFRNTH0gdGhlIHJlbmRlcmVkIGNvbXBvbmVudFxuICAqL1xuICBfcmVuZGVyQWN0aW9uQmFyKCkge1xuICAgIGNvbnN0IHtmYWNldHMsIGdyb3VwaW5nS2V5LCBoYXNHcm91cGluZywgc2VsZWN0ZWRGYWNldHMsIHNlbGVjdGlvblN0YXR1cywgc29ydEJ5fSA9IHRoaXMuc3RhdGU7XG4gICAgY29uc3Qge2lzU2VsZWN0aW9uLCBsaW5lT3BlcmF0aW9uTGlzdCwgb3JkZXJhYmxlQ29sdW1uTGlzdH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IGdyb3VwYWJsZUNvbHVtbkxpc3QgPSBmYWNldHMgPyBPYmplY3Qua2V5cyhmYWNldHMpLnJlZHVjZSgocmVzdWx0LCBmYWNldEtleSkgPT4ge1xuICAgICAgaWYgKE9iamVjdC5rZXlzKGZhY2V0c1tmYWNldEtleV0pLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgcmVzdWx0W2ZhY2V0S2V5XSA9IGZhY2V0S2V5O1xuICAgICAgfVxuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9LCB7fSkgOiB7fTtcbiAgICBjb25zdCBzZWxlY3Rpb25BY3Rpb24gPSAoc3RhdHVzKSA9PiB7XG4gICAgICB0aGlzLnNldFN0YXRlKHtzZWxlY3Rpb25TdGF0dXM6IHN0YXR1c30pO1xuICAgIH07XG4gICAgcmV0dXJuIChcbiAgICAgIDxMaXN0QWN0aW9uQmFyXG4gICAgICBhY3Rpb249e3RoaXMuX2FjdGlvbn1cbiAgICAgIGdyb3VwU2VsZWN0ZWRLZXk9e2dyb3VwaW5nS2V5fVxuICAgICAgZ3JvdXBhYmxlQ29sdW1uTGlzdD17Z3JvdXBhYmxlQ29sdW1uTGlzdH1cbiAgICAgIGhhc0dyb3VwaW5nPXtoYXNHcm91cGluZ31cbiAgICAgIGlzU2VsZWN0aW9uPXtpc1NlbGVjdGlvbn1cbiAgICAgIG9wZXJhdGlvbkxpc3Q9e2xpbmVPcGVyYXRpb25MaXN0fVxuICAgICAgb3JkZXJTZWxlY3RlZD17c29ydEJ5fVxuICAgICAgb3JkZXJhYmxlQ29sdW1uTGlzdD17b3JkZXJhYmxlQ29sdW1uTGlzdH1cbiAgICAgIHJlZj0nYWN0aW9uQmFyJ1xuICAgICAgc2VsZWN0ZWRGYWNldHM9e3NlbGVjdGVkRmFjZXRzfVxuICAgICAgc2VsZWN0aW9uQWN0aW9uPXtzZWxlY3Rpb25BY3Rpb259XG4gICAgICBzZWxlY3Rpb25TdGF0dXM9e3NlbGVjdGlvblN0YXR1c31cbiAgICAgIC8+XG4gICAgKTtcbiAgfSxcbiAgLyoqXG4gICogUmVuZGVyIHRoZSByZXN1bHRzIGNvbXBvbmVudFxuICAqIEByZXR1cm4ge0hUTUx9IHRoZSByZW5kZXJlZCBjb21wb25lbnRcbiAgKi9cbiAgX3JlbmRlclJlc3VsdHMoKSB7XG4gICAgY29uc3Qge2dyb3VwQ29tcG9uZW50LCBpc1NlbGVjdGlvbiwgbGluZUNvbXBvbmVudE1hcHBlciwgbGluZU9wZXJhdGlvbkxpc3QsIHNjcm9sbFBhcmVudFNlbGVjdG9yLCBzdG9yZSwgc2NvcGVzQ29uZmlnfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3Qge2dyb3VwaW5nS2V5LCBmYWNldHMsIHJlc3VsdHMsIHNlbGVjdGlvblN0YXR1cywgdG90YWxDb3VudH0gPSB0aGlzLnN0YXRlO1xuICAgIHJldHVybiAoXG4gICAgICA8UmVzdWx0c1xuICAgICAgYWN0aW9uPXt0aGlzLl9hY3Rpb259XG4gICAgICBncm91cENvbXBvbmVudD17Z3JvdXBDb21wb25lbnR9XG4gICAgICBncm91cGluZ0tleT17Z3JvdXBpbmdLZXl9XG4gICAgICBpc1NlbGVjdGlvbj17aXNTZWxlY3Rpb259XG4gICAgICBsaW5lQ2xpY2tIYW5kbGVyPXt0aGlzLl9saW5lQ2xpY2t9XG4gICAgICBsaW5lQ29tcG9uZW50TWFwcGVyPXtsaW5lQ29tcG9uZW50TWFwcGVyfVxuICAgICAgbGluZU9wZXJhdGlvbkxpc3Q9e2xpbmVPcGVyYXRpb25MaXN0fVxuICAgICAgbGluZVNlbGVjdGlvbkhhbmRsZXI9e3RoaXMuX3NlbGVjdEl0ZW19XG4gICAgICByZWY9J3Jlc3VsdExpc3QnXG4gICAgICByZW5kZXJTaW5nbGVHcm91cERlY29yYXRpb249e2ZhbHNlfVxuICAgICAgcmVzdWx0c0ZhY2V0cz17ZmFjZXRzfVxuICAgICAgcmVzdWx0c01hcD17cmVzdWx0c31cbiAgICAgIHNjb3Blc0NvbmZpZz17c2NvcGVzQ29uZmlnfVxuICAgICAgc2Nyb2xsUGFyZW50U2VsZWN0b3I9e3Njcm9sbFBhcmVudFNlbGVjdG9yfVxuICAgICAgc2VsZWN0aW9uU3RhdHVzPXtzZWxlY3Rpb25TdGF0dXN9XG4gICAgICBzdG9yZT17c3RvcmV9XG4gICAgICB0b3RhbENvdW50PXt0b3RhbENvdW50fVxuICAgICAgLz5cbiAgICApO1xuICB9LFxuICAvKipcbiAgKiBMaW5lIHNlbGVjdGlvbiBoYW5kbGVyXG4gICovXG4gIF9zZWxlY3RJdGVtKCkge1xuICAgIC8vIGNvdW50IHRoZSBzZWxlY3RlZCBpdGVtc1xuICAgIGNvbnN0IHNlbGVjdGVkSXRlbXNDb3VudCA9IHRoaXMuZ2V0U2VsZWN0ZWRJdGVtcygpLmxlbmd0aDtcbiAgICAvLyBDb3VudCB0aGUgdmlzaWJsZSBpdGVtc1xuICAgIGNvbnN0IHZpc2libGVJdGVtc0NvdW50ID0gcmVkdWNlKHRoaXMucmVmcy5yZXN1bHRMaXN0LnJlZnMsICh2aXNpYmxlSXRlbXNDb3VudCwgcmVmQ29tcG9uZW50LCByZWZLZXkpID0+IHtcbiAgICAgIC8vIFJlc3VsdHMgbWlnaHQgYmUgYSBsaXN0IChub24tZ3JvdXBlZCBzZWFyY2gpIG9yIGdyb3VwcyAoZ3JvdXBlZCBzZWFyY2gpXG4gICAgICBpZiAocmVmS2V5LmluZGV4T2YoJ2xpc3QtJykgPT09IDApIHtcbiAgICAgICAgdmlzaWJsZUl0ZW1zQ291bnQgKz0gcmVmQ29tcG9uZW50LnByb3BzLmRhdGEubGVuZ3RoO1xuICAgICAgfVxuICAgICAgaWYgKHJlZktleS5pbmRleE9mKCdncm91cC0nKSA9PT0gMCkge1xuICAgICAgICBpZiAocmVmQ29tcG9uZW50LnByb3BzLmxpc3QubGVuZ3RoIDwgcmVmQ29tcG9uZW50LnN0YXRlLnJlc3VsdHNEaXNwbGF5ZWRDb3VudCkge1xuICAgICAgICAgIHZpc2libGVJdGVtc0NvdW50ICs9IHJlZkNvbXBvbmVudC5wcm9wcy5saXN0Lmxlbmd0aDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB2aXNpYmxlSXRlbXNDb3VudCArPSByZWZDb21wb25lbnQuc3RhdGUucmVzdWx0c0Rpc3BsYXllZENvdW50O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gdmlzaWJsZUl0ZW1zQ291bnQ7XG4gICAgfSwgMCk7XG4gICAgLy8gQnkgZGVmYXVsdCwgdGhlIHNlbGVjdGlvbiBzdGF0dXMgaXMgcGFydGlhbFxuICAgIGxldCBzZWxlY3Rpb25TdGF0dXMgPSAncGFydGlhbCc7XG4gICAgLy8gSWYgbm8gaXRlbSBpcyBzZWxlY3RlZCwgdGhlbiB0aGUgc2VsZWN0aW9uU3RhdHVzIGlzIG5vbmVcbiAgICBpZiAoc2VsZWN0ZWRJdGVtc0NvdW50ID09PSAwKSB7XG4gICAgICBzZWxlY3Rpb25TdGF0dXMgPSAnbm9uZSc7XG4gICAgfSBlbHNlIGlmKHNlbGVjdGVkSXRlbXNDb3VudCA9PT0gdmlzaWJsZUl0ZW1zQ291bnQpIHtcbiAgICAgIC8vIFRoZXJlIGFyZSBhcyBtYW55IHNlbGVjdGVkIGl0ZW1zIGFzIHZpc2libGUgaXRlbXMsIHNvIHRoZSBzZWxlY3Rpb25TdGF0dXMgaXMgYWxsXG4gICAgICBzZWxlY3Rpb25TdGF0dXMgPSAnc2VsZWN0ZWQnO1xuICAgIH1cbiAgICB0aGlzLnNldFN0YXRlKHtzZWxlY3Rpb25TdGF0dXN9KTtcbiAgfSxcbiAgLyoqXG4gICogQWN0aW9uIG9uIGxpbmUgY2xpY2suXG4gICogQHBhcmFtIHtvYmplY3R9IGl0ZW0gIHRoZSBpdGVtIGNsaWNrZWRcbiAgKi9cbiAgX2xpbmVDbGljayhpdGVtKSB7XG4gICAgaWYgKHRoaXMucHJvcHMub25MaW5lQ2xpY2spIHtcbiAgICAgIHRoaXMucHJvcHMub25MaW5lQ2xpY2soaXRlbSk7XG4gICAgfVxuICB9LFxuICAvKipcbiAgKiBSZW5kZXIgdGhlIGNvbXBvbmVudFxuICAqIEByZXR1cm4ge0hUTUx9IHRoZSByZW5kZXJlZCBjb21wb25lbnRcbiAgKi9cbiAgcmVuZGVyKCkge1xuICAgIC8vIHRydWUgaWYgYSBmYWNldCBpcyBjb2xsYXBzZWRcbiAgICBjb25zdCBmYWNldENvbGxhcHNlZENsYXNzTmFtZSA9IE9iamVjdC5rZXlzKHRoaXMucHJvcHMub3BlbmVkRmFjZXRMaXN0KS5sZW5ndGggPT09IDAgPyAnZmFjZXQtY29sbGFwc2VkJyA6ICcnO1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT0nYWR2YW5jZWQtc2VhcmNoJyBkYXRhLWZvY3VzPSdhZHZhbmNlZC1zZWFyY2gnPlxuICAgICAgPGRpdiBkYXRhLWZvY3VzPSdmYWNldC1jb250YWluZXInIGNsYXNzTmFtZT17ZmFjZXRDb2xsYXBzZWRDbGFzc05hbWV9PlxuICAgICAge3RoaXMuX3JlbmRlckZhY2V0Qm94KCl9XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgZGF0YS1mb2N1cz0ncmVzdWx0LWNvbnRhaW5lcic+XG4gICAgICB7dGhpcy5fcmVuZGVyTGlzdFN1bW1hcnkoKX1cbiAgICAgIHt0aGlzLl9yZW5kZXJBY3Rpb25CYXIoKX1cbiAgICAgIHt0aGlzLl9yZW5kZXJSZXN1bHRzKCl9XG4gICAgICA8L2Rpdj5cbiAgICAgIHt0aGlzLnByb3BzLmhhc0JhY2tUb1RvcCAmJiA8dGhpcy5wcm9wcy5iYWNrVG9Ub3BDb21wb25lbnQvPn1cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gYnVpbGRlcihBZHZhbmNlZFNlYXJjaCk7XG4iXX0=