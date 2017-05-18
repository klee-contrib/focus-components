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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJSZWFjdCIsInJlcXVpcmUiLCJjYW1lbCIsImNhbWVsQ2FzZSIsImNhcGl0YWxpemUiLCJpc0Z1bmN0aW9uIiwicmVkdWNlIiwiRmFjZXRCb3giLCJjb21wb25lbnQiLCJMaXN0QWN0aW9uQmFyIiwiTGlzdFN1bW1hcnkiLCJSZXN1bHRzIiwiQ2FydHJpZGdlQmVoYXZpb3VyIiwiQWR2YW5jZWRTZWFyY2giLCJtaXhpbnMiLCJkaXNwbGF5TmFtZSIsImdldERlZmF1bHRQcm9wcyIsImFjdGlvbiIsInVuZGVmaW5lZCIsImJhY2tUb1RvcENvbXBvbmVudCIsImNhbGxTZWFyY2hPbk1vdW50IiwiZmFjZXRDb25maWciLCJncm91cENvbXBvbmVudCIsImhhc0JhY2tUb1RvcCIsImlzU2VsZWN0aW9uIiwibGluZU9wZXJhdGlvbkxpc3QiLCJsaW5lQ29tcG9uZW50TWFwcGVyIiwib3JkZXJhYmxlQ29sdW1uTGlzdCIsIm9uTGluZUNsaWNrIiwib3BlbmVkRmFjZXRMaXN0Iiwic2NvcGVzQ29uZmlnIiwic2Nyb2xsUGFyZW50U2VsZWN0b3IiLCJzZXJ2aWNlIiwic3RvcmUiLCJwcm9wVHlwZXMiLCJleHBvcnRBY3Rpb24iLCJnZXRJbml0aWFsU3RhdGUiLCJfZ2V0TmV3U3RhdGVGcm9tU3RvcmUiLCJjb21wb25lbnRXaWxsTW91bnQiLCJwcm9wcyIsIm9uIiwiX29uU3RvcmVDaGFuZ2VXaXRoU2VhcmNoIiwiZm9yRWFjaCIsIm5vZGUiLCJfb25TdG9yZUNoYW5nZVdpdGhvdXRTZWFyY2giLCJhZGRTY29wZUNoYW5nZUxpc3RlbmVyIiwiX29uU2NvcGVDaGFuZ2UiLCJfYWN0aW9uIiwiaWRlbnRpZmllciIsImdldFNlYXJjaE9wdGlvbnMiLCJnZXRWYWx1ZSIsImNhbGwiLCJzZWFyY2giLCJjb21wb25lbnRXaWxsVW5tb3VudCIsInJlbW92ZUxpc3RlbmVyIiwicmVtb3ZlU2NvcGVDaGFuZ2VMaXN0ZW5lciIsImdldFNlbGVjdGVkSXRlbXMiLCJyZXN1bHRzIiwicmVmcyIsInJlc3VsdExpc3QiLCJzZWxlY3RlZEl0ZW1zIiwicmVmIiwiY29uY2F0Iiwic3ViU2VsZWN0ZWRJdGVtcyIsInN1YlJlZiIsInNldFN0YXRlIiwiaGFuZGxlVmlld0FjdGlvbiIsImRhdGEiLCJzb3J0QnkiLCJzb3J0QXNjIiwidHlwZSIsInF1ZXJ5IiwiZ2V0UXVlcnkiLCJzY29wZSIsImdldFNjb3BlIiwic2VsZWN0ZWRGYWNldHMiLCJnZXRTZWxlY3RlZEZhY2V0cyIsImdyb3VwaW5nS2V5IiwiZ2V0R3JvdXBpbmdLZXkiLCJnZXRTb3J0QnkiLCJnZXRTb3J0QXNjIiwiZmFjZXRzIiwiZ2V0RmFjZXRzIiwiZ2V0UmVzdWx0cyIsInRvdGFsQ291bnQiLCJnZXRUb3RhbENvdW50Iiwic2VsZWN0aW9uU3RhdHVzIiwiaGFzR3JvdXBpbmciLCJfZXhwb3J0SGFuZGxlciIsIl9yZW5kZXJGYWNldEJveCIsInN0YXRlIiwiX3JlbmRlckxpc3RTdW1tYXJ5IiwiX3JlbmRlckFjdGlvbkJhciIsImdyb3VwYWJsZUNvbHVtbkxpc3QiLCJPYmplY3QiLCJrZXlzIiwicmVzdWx0IiwiZmFjZXRLZXkiLCJsZW5ndGgiLCJzZWxlY3Rpb25BY3Rpb24iLCJzdGF0dXMiLCJfcmVuZGVyUmVzdWx0cyIsIl9saW5lQ2xpY2siLCJfc2VsZWN0SXRlbSIsInNlbGVjdGVkSXRlbXNDb3VudCIsInZpc2libGVJdGVtc0NvdW50IiwicmVmQ29tcG9uZW50IiwicmVmS2V5IiwiaW5kZXhPZiIsImxpc3QiLCJyZXN1bHRzRGlzcGxheWVkQ291bnQiLCJpdGVtIiwicmVuZGVyIiwiZmFjZXRDb2xsYXBzZWRDbGFzc05hbWUiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOztBQUVBOzs7O0FBQ0E7Ozs7QUFXQTs7OztBQUNBOzs7O0FBR0E7O0FBSUE7Ozs7QUFHQTs7Ozs7O0FBekJBO0FBQ0EsSUFBTUEsUUFBUUMsUUFBUSxPQUFSLENB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akIiLCJmaWxlIjoiaXMtcmVhY3QtY2xhc3MtY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gRGVwZW5kZW5jaWVzXHJcbmNvbnN0IFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcclxuaW1wb3J0IGJ1aWxkZXIgZnJvbSAnZm9jdXMtY29yZS9jb21wb25lbnQvYnVpbGRlcic7XHJcbmltcG9ydCBkaXNwYXRjaGVyIGZyb20gJ2ZvY3VzLWNvcmUvZGlzcGF0Y2hlcic7XHJcbmNvbnN0IHtjYW1lbENhc2U6IGNhbWVsfSA9IHJlcXVpcmUoJ2xvZGFzaC9zdHJpbmcnKTtcclxuY29uc3Qge2NhcGl0YWxpemV9ID0gcmVxdWlyZSgnbG9kYXNoL3N0cmluZycpO1xyXG5jb25zdCB7aXNGdW5jdGlvbn0gPSByZXF1aXJlKCdsb2Rhc2gvbGFuZycpO1xyXG5jb25zdCB7cmVkdWNlfSA9IHJlcXVpcmUoJ2xvZGFzaC9jb2xsZWN0aW9uJyk7XHJcblxyXG4vLyBDb21wb25lbnRzXHJcbmNvbnN0IEZhY2V0Qm94ID0gcmVxdWlyZSgnLi9mYWNldC1ib3gnKS5jb21wb25lbnQ7XHJcbmNvbnN0IExpc3RBY3Rpb25CYXIgPSByZXF1aXJlKCcuL2FjdGlvbi1iYXInKS5jb21wb25lbnQ7XHJcbmNvbnN0IExpc3RTdW1tYXJ5ID0gcmVxdWlyZSgnLi9saXN0LXN1bW1hcnknKS5jb21wb25lbnQ7XHJcbmNvbnN0IFJlc3VsdHMgPSByZXF1aXJlKCcuLi9jb21tb24vY29tcG9uZW50L3Jlc3VsdHMnKS5jb21wb25lbnQ7XHJcbmltcG9ydCBCYWNrVG9Ub3BDb21wb25lbnQgZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9idXR0b24tYmFjay10by10b3AnO1xyXG5pbXBvcnQgRGVmYXVsdEdyb3VwQ29tcG9uZW50IGZyb20gJy4vZ3JvdXAnO1xyXG5cclxuLy8gU3RvcmVcclxuaW1wb3J0IHthZHZhbmNlZFNlYXJjaFN0b3JlfSBmcm9tICdmb2N1cy1jb3JlL3NlYXJjaC9idWlsdC1pbi1zdG9yZSc7XHJcblxyXG4vLyBNaXhpbnNcclxuY29uc3QgQ2FydHJpZGdlQmVoYXZpb3VyID0gcmVxdWlyZSgnLi4vLi4vbWl4aW4vY2FydHJpZGdlLWJlaGF2aW91cicpO1xyXG5pbXBvcnQgdHlwZSBmcm9tICdmb2N1cy1jb3JlL2NvbXBvbmVudC90eXBlcyc7XHJcblxyXG4vLyBBY3Rpb25zXHJcbmltcG9ydCBhY3Rpb25CdWlsZGVyIGZyb20gJ2ZvY3VzLWNvcmUvc2VhcmNoL2FjdGlvbi1idWlsZGVyJztcclxuXHJcbi8qKlxyXG4qIFBhZ2UgbWl4aW4gb2YgdGhlIGFkdmFuY2VkIHNlYXJjaC5cclxuKiBAdHlwZSB7T2JqZWN0fVxyXG4qL1xyXG5jb25zdCBBZHZhbmNlZFNlYXJjaCA9IHtcclxuICAvKipcclxuICAqIENvbXBvbmVudCdzIG1peGluc1xyXG4gICogQHR5cGUge0FycmF5fVxyXG4gICovXHJcbiAgbWl4aW5zOiBbQ2FydHJpZGdlQmVoYXZpb3VyXSxcclxuICAvKipcclxuICAqIERpc3BsYXkgbmFtZS5cclxuICAqL1xyXG4gIGRpc3BsYXlOYW1lOiAnYWR2YW5jZWQtc2VhcmNoJyxcclxuICAvKipcclxuICAqIEdldCB0aGUgZGVmYXVsdCBwcm9wc1xyXG4gICogQHJldHVybiB7b2JqZWN0fSB0aGUgZGVmYXVsdCBwcm9wc1xyXG4gICovXHJcbiAgZ2V0RGVmYXVsdFByb3BzKCkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgYWN0aW9uOiB1bmRlZmluZWQsXHJcbiAgICAgIGJhY2tUb1RvcENvbXBvbmVudDogQmFja1RvVG9wQ29tcG9uZW50LFxyXG4gICAgICBjYWxsU2VhcmNoT25Nb3VudCA6IHRydWUsXHJcbiAgICAgIGZhY2V0Q29uZmlnOiB7fSxcclxuICAgICAgZ3JvdXBDb21wb25lbnQ6IERlZmF1bHRHcm91cENvbXBvbmVudCxcclxuICAgICAgaGFzQmFja1RvVG9wOiB0cnVlLFxyXG4gICAgICBpc1NlbGVjdGlvbjogdHJ1ZSxcclxuICAgICAgbGluZU9wZXJhdGlvbkxpc3Q6IFtdLFxyXG4gICAgICBsaW5lQ29tcG9uZW50TWFwcGVyOiB1bmRlZmluZWQsXHJcbiAgICAgIG9yZGVyYWJsZUNvbHVtbkxpc3Q6IFtdLFxyXG4gICAgICBvbkxpbmVDbGljazogdW5kZWZpbmVkLFxyXG4gICAgICBvcGVuZWRGYWNldExpc3Q6IHt9LFxyXG4gICAgICBzY29wZXNDb25maWc6IHt9LFxyXG4gICAgICBzY3JvbGxQYXJlbnRTZWxlY3RvcjogdW5kZWZpbmVkLFxyXG4gICAgICBzZXJ2aWNlOiB1bmRlZmluZWQsXHJcbiAgICAgIHN0b3JlOiBhZHZhbmNlZFNlYXJjaFN0b3JlXHJcbiAgICB9O1xyXG4gIH0sXHJcbiAgLyoqXHJcbiAgKiBQcm9wcyB2YWxpZGF0aW9uXHJcbiAgKiBAdHlwZSB7T2JqZWN0fVxyXG4gICovXHJcbiAgcHJvcFR5cGVzOiB7XHJcbiAgICBhY3Rpb246IHR5cGUoJ29iamVjdCcpLFxyXG4gICAgYmFja1RvVG9wQ29tcG9uZW50OiB0eXBlKCdmdW5jJyksXHJcbiAgICBjYWxsU2VhcmNoT25Nb3VudCA6IHR5cGUoJ2Jvb2wnKSxcclxuICAgIGV4cG9ydEFjdGlvbjogdHlwZSgnZnVuYycpLFxyXG4gICAgZmFjZXRDb25maWc6IHR5cGUoJ29iamVjdCcpLFxyXG4gICAgZ3JvdXBDb21wb25lbnQ6IHR5cGUoJ2Z1bmMnKSxcclxuICAgIGhhc0JhY2tUb1RvcDogdHlwZSgnYm9vbCcpLFxyXG4gICAgaXNTZWxlY3Rpb246IHR5cGUoJ2Jvb2wnKSxcclxuICAgIGxpbmVDb21wb25lbnRNYXBwZXI6IHR5cGUoJ2Z1bmMnKSxcclxuICAgIGxpbmVPcGVyYXRpb25MaXN0OiB0eXBlKFsnYXJyYXknLCAnb2JqZWN0J10pLFxyXG4gICAgb25MaW5lQ2xpY2s6IHR5cGUoJ2Z1bmMnKSxcclxuICAgIG9yZGVyYWJsZUNvbHVtbkxpc3Q6IHR5cGUoWydhcnJheScsICdvYmplY3QnXSksXHJcbiAgICBvcGVuZWRGYWNldExpc3Q6IHR5cGUoJ29iamVjdCcpLFxyXG4gICAgc2NvcGVzQ29uZmlnOiB0eXBlKCdvYmplY3QnKSxcclxuICAgIHNjcm9sbFBhcmVudFNlbGVjdG9yOiB0eXBlKCdzdHJpbmcnKSxcclxuICAgIHNlcnZpY2U6IHR5cGUoJ29iamVjdCcpLFxyXG4gICAgc3RvcmU6IHR5cGUoJ29iamVjdCcpXHJcbiAgfSxcclxuICAvKipcclxuICAqIEdldCBpbml0aWFsIHN0YXRlXHJcbiAgKiBAcmV0dXJuIHtPYmplY3R9IGluaXRpYWwgc3RhdGVcclxuICAqL1xyXG4gIGdldEluaXRpYWxTdGF0ZSgpIHtcclxuICAgIHJldHVybiAodGhpcy5fZ2V0TmV3U3RhdGVGcm9tU3RvcmUoKSk7XHJcbiAgfSxcclxuICAvKipcclxuICAqIFJlZ2lzdGVyIHRoZSBzdG9yZSBsaXN0ZW5lcnNcclxuICAqL1xyXG4gIGNvbXBvbmVudFdpbGxNb3VudCgpIHtcclxuICAgIGNvbnN0IHtzdG9yZSwgY2FsbFNlYXJjaE9uTW91bnQsIHNlcnZpY2V9ID0gdGhpcy5wcm9wcztcclxuICAgIC8vbGlzdGVuIHRvIHNlYXJjaCBldmVudFxyXG4gICAgc3RvcmUub24oJ2FkdmFuY2VkLXNlYXJjaC1jcml0ZXJpYXM6Y2hhbmdlJywgdGhpcy5fb25TdG9yZUNoYW5nZVdpdGhTZWFyY2gpO1xyXG5cclxuICAgIC8vbGlzdGVuIHRvIGRhdGEgY2hhbmdlc1xyXG4gICAgWydmYWNldHMnLCAncmVzdWx0cycsICd0b3RhbC1jb3VudCddLmZvckVhY2goKG5vZGUpID0+IHtcclxuICAgICAgc3RvcmVbYGFkZCR7Y2FwaXRhbGl6ZShjYW1lbChub2RlKSl9Q2hhbmdlTGlzdGVuZXJgXSh0aGlzLl9vblN0b3JlQ2hhbmdlV2l0aG91dFNlYXJjaCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBsaXN0ZW4gdG8gc2NvcGUgY2hhbmdlXHJcbiAgICBzdG9yZS5hZGRTY29wZUNoYW5nZUxpc3RlbmVyKHRoaXMuX29uU2NvcGVDaGFuZ2UpO1xyXG5cclxuICAgIHRoaXMuX2FjdGlvbiA9IHRoaXMucHJvcHMuYWN0aW9uIHx8IGFjdGlvbkJ1aWxkZXIoe1xyXG4gICAgICBzZXJ2aWNlOiBzZXJ2aWNlLFxyXG4gICAgICBpZGVudGlmaWVyOiBzdG9yZS5pZGVudGlmaWVyLFxyXG4gICAgICBnZXRTZWFyY2hPcHRpb25zOiAoKSA9PiB7cmV0dXJuIHN0b3JlLmdldFZhbHVlLmNhbGwoc3RvcmUpOyB9IC8vIEJpbmRpbmcgdGhlIHN0b3JlIGluIHRoZSBmdW5jdGlvbiBjYWxsXHJcbiAgICB9KTtcclxuICAgIGlmKHRoaXMucHJvcHMuY2FsbFNlYXJjaE9uTW91bnQpIHtcclxuICAgICAgdGhpcy5fYWN0aW9uLnNlYXJjaCgpO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgLyoqXHJcbiAgKiBVbi1yZWdpc3RlciB0aGUgc3RvcmUgbGlzdGVuZXJzXHJcbiAgKi9cclxuICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcclxuICAgIC8vIHJlbW92ZSBsaXN0ZW5lcnNcclxuICAgIHRoaXMucHJvcHMuc3RvcmUucmVtb3ZlTGlzdGVuZXIoJ2FkdmFuY2VkLXNlYXJjaC1jcml0ZXJpYXM6Y2hhbmdlJywgdGhpcy5fb25TdG9yZUNoYW5nZVdpdGhTZWFyY2gpO1xyXG4gICAgWydmYWNldHMnLCAncmVzdWx0cycsICd0b3RhbC1jb3VudCddLmZvckVhY2goKG5vZGUpID0+IHtcclxuICAgICAgdGhpcy5wcm9wcy5zdG9yZVtgcmVtb3ZlJHtjYXBpdGFsaXplKGNhbWVsKG5vZGUpKX1DaGFuZ2VMaXN0ZW5lcmBdKHRoaXMuX29uU3RvcmVDaGFuZ2VXaXRob3V0U2VhcmNoKTtcclxuICAgIH0pO1xyXG4gICAgdGhpcy5wcm9wcy5zdG9yZS5yZW1vdmVTY29wZUNoYW5nZUxpc3RlbmVyKHRoaXMuX29uU2NvcGVDaGFuZ2UpO1xyXG4gIH0sXHJcblxyXG4gIGdldFNlbGVjdGVkSXRlbXMoKSB7XHJcbiAgICBjb25zdCByZXN1bHRzID0gdGhpcy5yZWZzLnJlc3VsdExpc3Q7XHJcbiAgICBjb25zdCBzZWxlY3RlZEl0ZW1zID0gcmVkdWNlKHJlc3VsdHMucmVmcywgKHNlbGVjdGVkSXRlbXMsIHJlZikgPT4ge1xyXG4gICAgICBpZiAoaXNGdW5jdGlvbihyZWYuZ2V0U2VsZWN0ZWRJdGVtcykpIHtcclxuICAgICAgICBzZWxlY3RlZEl0ZW1zID0gc2VsZWN0ZWRJdGVtcy5jb25jYXQocmVmLmdldFNlbGVjdGVkSXRlbXMoKSk7XHJcbiAgICAgIH0gZWxzZSBpZiAocmVmLnJlZnMpIHtcclxuICAgICAgICBzZWxlY3RlZEl0ZW1zID0gc2VsZWN0ZWRJdGVtcy5jb25jYXQocmVkdWNlKHJlZi5yZWZzLCAoc3ViU2VsZWN0ZWRJdGVtcywgc3ViUmVmKSA9PiB7XHJcbiAgICAgICAgICBpZiAoaXNGdW5jdGlvbihzdWJSZWYuZ2V0U2VsZWN0ZWRJdGVtcykpIHtcclxuICAgICAgICAgICAgc3ViU2VsZWN0ZWRJdGVtcyA9IHN1YlNlbGVjdGVkSXRlbXMuY29uY2F0KHN1YlJlZi5nZXRTZWxlY3RlZEl0ZW1zKCkpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgcmV0dXJuIHN1YlNlbGVjdGVkSXRlbXM7XHJcbiAgICAgICAgfSwgW10pKTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gc2VsZWN0ZWRJdGVtcztcclxuICAgIH0sIFtdKTtcclxuICAgIHJldHVybiBzZWxlY3RlZEl0ZW1zO1xyXG4gIH0sXHJcbiAgLyoqXHJcbiAgKiBTdG9yZSBjaGFuZ2VkLCB1cGRhdGUgdGhlIHN0YXRlLCB0cmlnZ2VyIGEgc2VhcmNoIGFmdGVyIHVwZGF0ZVxyXG4gICovXHJcbiAgX29uU3RvcmVDaGFuZ2VXaXRoU2VhcmNoKCkge1xyXG4gICAgdGhpcy5zZXRTdGF0ZSh0aGlzLl9nZXROZXdTdGF0ZUZyb21TdG9yZSgpLCB0aGlzLl9hY3Rpb24uc2VhcmNoKTtcclxuICB9LFxyXG4gIC8qKlxyXG4gICogU3RvcmUgY2hhbmdlZCwgdXBkYXRlIHRoZSBzdGF0ZSwgZG8gbm90IHRyaWdnZXIgYSBzZWFyY2ggYWZ0ZXIgdXBkYXRlXHJcbiAgKi9cclxuICBfb25TdG9yZUNoYW5nZVdpdGhvdXRTZWFyY2goKSB7XHJcbiAgICB0aGlzLnNldFN0YXRlKHRoaXMuX2dldE5ld1N0YXRlRnJvbVN0b3JlKCkpO1xyXG4gIH0sXHJcbiAgLyoqXHJcbiAgKiBTY29wZSBjaGFuZ2VkLCBuZWVkIHRvIHJlbW92ZSBhbGwgZXhpc3Rpbmcgc29ydC5cclxuICAqL1xyXG4gIF9vblNjb3BlQ2hhbmdlOiBmdW5jdGlvbiBfb25TY29wZUNoYW5nZSgpIHtcclxuICAgIGRpc3BhdGNoZXIuaGFuZGxlVmlld0FjdGlvbih7ZGF0YTp7c29ydEJ5OiBudWxsLCBzb3J0QXNjOiBudWxsfSxcclxuICAgICAgdHlwZTogJ3VwZGF0ZScsXHJcbiAgICAgIGlkZW50aWZpZXI6IGFkdmFuY2VkU2VhcmNoU3RvcmUuaWRlbnRpZmllcn1cclxuICAgICk7XHJcbiAgfSxcclxuICAvKipcclxuICAqIENvbXB1dGUgYSBzdGF0ZSBvYmplY3QgZnJvbSB0aGUgc3RvcmUgdmFsdWVzLlxyXG4gICogQHJldHVybiB7W3R5cGVdfSBbZGVzY3JpcHRpb25dXHJcbiAgKi9cclxuICBfZ2V0TmV3U3RhdGVGcm9tU3RvcmUoKSB7XHJcbiAgICBjb25zdCB7c3RvcmV9ID0gdGhpcy5wcm9wcztcclxuICAgIGNvbnN0IHF1ZXJ5ID0gc3RvcmUuZ2V0UXVlcnkoKTtcclxuICAgIGNvbnN0IHNjb3BlID0gc3RvcmUuZ2V0U2NvcGUoKTtcclxuICAgIGNvbnN0IHNlbGVjdGVkRmFjZXRzID0gc3RvcmUuZ2V0U2VsZWN0ZWRGYWNldHMoKSB8fCB7fTtcclxuICAgIGNvbnN0IGdyb3VwaW5nS2V5ID0gc3RvcmUuZ2V0R3JvdXBpbmdLZXkoKTtcclxuICAgIGNvbnN0IHNvcnRCeSA9IHN0b3JlLmdldFNvcnRCeSgpO1xyXG4gICAgY29uc3Qgc29ydEFzYyA9IHN0b3JlLmdldFNvcnRBc2MoKTtcclxuICAgIGNvbnN0IGZhY2V0cyA9IHN0b3JlLmdldEZhY2V0cygpO1xyXG4gICAgY29uc3QgcmVzdWx0cyA9IHN0b3JlLmdldFJlc3VsdHMoKTtcclxuICAgIGNvbnN0IHRvdGFsQ291bnQgPSBzdG9yZS5nZXRUb3RhbENvdW50KCk7XHJcbiAgICBjb25zdCBzZWxlY3Rpb25TdGF0dXMgPSAnbm9uZSc7XHJcbiAgICBjb25zdCBoYXNHcm91cGluZyA9IHNjb3BlICE9PSB1bmRlZmluZWQgJiYgc2NvcGUgIT09ICdBTEwnO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgZmFjZXRzLFxyXG4gICAgICBncm91cGluZ0tleSxcclxuICAgICAgaGFzR3JvdXBpbmcsXHJcbiAgICAgIHF1ZXJ5LFxyXG4gICAgICBzZWxlY3Rpb25TdGF0dXMsXHJcbiAgICAgIHNjb3BlLFxyXG4gICAgICBzZWxlY3RlZEZhY2V0cyxcclxuICAgICAgc29ydEJ5LFxyXG4gICAgICBzb3J0QXNjLFxyXG4gICAgICByZXN1bHRzLFxyXG4gICAgICB0b3RhbENvdW50XHJcbiAgICB9O1xyXG4gIH0sXHJcbiAgLyoqXHJcbiAgKiBFeHBvcnQgYWN0aW9uIGhhbmRsZXIuXHJcbiAgKi9cclxuICBfZXhwb3J0SGFuZGxlcigpIHtcclxuICAgIHRoaXMucHJvcHMuZXhwb3J0QWN0aW9uKCk7XHJcbiAgfSxcclxuICAvKipcclxuICAqIFJlbmRlciB0aGUgZmFjZXQgYm94LlxyXG4gICogQHJldHVybnMge0hUTUx9IHRoZSByZW5kZXJlZCBjb21wb25lbnRcclxuICAqL1xyXG4gIF9yZW5kZXJGYWNldEJveCgpIHtcclxuICAgIGNvbnN0IHtmYWNldHMsIHNlbGVjdGVkRmFjZXRzfSA9IHRoaXMuc3RhdGU7XHJcbiAgICBjb25zdCB7ZmFjZXRDb25maWcsIHNjb3Blc0NvbmZpZywgb3BlbmVkRmFjZXRMaXN0fSA9IHRoaXMucHJvcHM7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8RmFjZXRCb3hcclxuICAgICAgYWN0aW9uPXt0aGlzLl9hY3Rpb259XHJcbiAgICAgIGZhY2V0Q29uZmlnPXtmYWNldENvbmZpZ31cclxuICAgICAgb3BlbmVkRmFjZXRMaXN0PXtvcGVuZWRGYWNldExpc3R9XHJcbiAgICAgIGZhY2V0cz17ZmFjZXRzfVxyXG4gICAgICByZWY9J2ZhY2V0Qm94J1xyXG4gICAgICBzY29wZXNDb25maWc9e3Njb3Blc0NvbmZpZ31cclxuICAgICAgc2VsZWN0ZWRGYWNldHM9e3NlbGVjdGVkRmFjZXRzfVxyXG4gICAgICAvPlxyXG4gICAgKTtcclxuICB9LFxyXG4gIC8qKlxyXG4gICogUmVuZGVyIHRoZSBsaXN0IHN1bW1hcnkgY29tcG9uZW50LlxyXG4gICogQHJldHVybnMge0hUTUx9IHRoZSByZW5kZXJlZCBjb21wb25lbnRcclxuICAqL1xyXG4gIF9yZW5kZXJMaXN0U3VtbWFyeSgpIHtcclxuICAgIGNvbnN0IHtxdWVyeSwgc2NvcGUsIHRvdGFsQ291bnR9ID0gdGhpcy5zdGF0ZTtcclxuICAgIHJldHVybiAoXHJcbiAgICAgIDxMaXN0U3VtbWFyeVxyXG4gICAgICBhY3Rpb249e3RoaXMuX2FjdGlvbn1cclxuICAgICAgcXVlcnk9e3F1ZXJ5fVxyXG4gICAgICByZWY9J3N1bW1hcnknXHJcbiAgICAgIHNjb3BlPXtzY29wZX1cclxuICAgICAgdG90YWxDb3VudD17dG90YWxDb3VudH1cclxuICAgICAgLz5cclxuICAgICk7XHJcbiAgfSxcclxuICAvKipcclxuICAqIFJlbmRlciB0aGUgYWN0aW9uIGJhci5cclxuICAqIEByZXR1cm5zIHtIVE1MfSB0aGUgcmVuZGVyZWQgY29tcG9uZW50XHJcbiAgKi9cclxuICBfcmVuZGVyQWN0aW9uQmFyKCkge1xyXG4gICAgY29uc3Qge2ZhY2V0cywgZ3JvdXBpbmdLZXksIGhhc0dyb3VwaW5nLCBzZWxlY3RlZEZhY2V0cywgc2VsZWN0aW9uU3RhdHVzLCBzb3J0Qnl9ID0gdGhpcy5zdGF0ZTtcclxuICAgIGNvbnN0IHtpc1NlbGVjdGlvbiwgbGluZU9wZXJhdGlvbkxpc3QsIG9yZGVyYWJsZUNvbHVtbkxpc3R9ID0gdGhpcy5wcm9wcztcclxuICAgIGNvbnN0IGdyb3VwYWJsZUNvbHVtbkxpc3QgPSBmYWNldHMgPyBPYmplY3Qua2V5cyhmYWNldHMpLnJlZHVjZSgocmVzdWx0LCBmYWNldEtleSkgPT4ge1xyXG4gICAgICBpZiAoT2JqZWN0LmtleXMoZmFjZXRzW2ZhY2V0S2V5XSkubGVuZ3RoID4gMSkge1xyXG4gICAgICAgIHJlc3VsdFtmYWNldEtleV0gPSBmYWNldEtleTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfSwge30pIDoge307XHJcbiAgICBjb25zdCBzZWxlY3Rpb25BY3Rpb24gPSAoc3RhdHVzKSA9PiB7XHJcbiAgICAgIHRoaXMuc2V0U3RhdGUoe3NlbGVjdGlvblN0YXR1czogc3RhdHVzfSk7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgPExpc3RBY3Rpb25CYXJcclxuICAgICAgYWN0aW9uPXt0aGlzLl9hY3Rpb259XHJcbiAgICAgIGdyb3VwU2VsZWN0ZWRLZXk9e2dyb3VwaW5nS2V5fVxyXG4gICAgICBncm91cGFibGVDb2x1bW5MaXN0PXtncm91cGFibGVDb2x1bW5MaXN0fVxyXG4gICAgICBoYXNHcm91cGluZz17aGFzR3JvdXBpbmd9XHJcbiAgICAgIGlzU2VsZWN0aW9uPXtpc1NlbGVjdGlvbn1cclxuICAgICAgb3BlcmF0aW9uTGlzdD17bGluZU9wZXJhdGlvbkxpc3R9XHJcbiAgICAgIG9yZGVyU2VsZWN0ZWQ9e3NvcnRCeX1cclxuICAgICAgb3JkZXJhYmxlQ29sdW1uTGlzdD17b3JkZXJhYmxlQ29sdW1uTGlzdH1cclxuICAgICAgcmVmPSdhY3Rpb25CYXInXHJcbiAgICAgIHNlbGVjdGVkRmFjZXRzPXtzZWxlY3RlZEZhY2V0c31cclxuICAgICAgc2VsZWN0aW9uQWN0aW9uPXtzZWxlY3Rpb25BY3Rpb259XHJcbiAgICAgIHNlbGVjdGlvblN0YXR1cz17c2VsZWN0aW9uU3RhdHVzfVxyXG4gICAgICAvPlxyXG4gICAgKTtcclxuICB9LFxyXG4gIC8qKlxyXG4gICogUmVuZGVyIHRoZSByZXN1bHRzIGNvbXBvbmVudFxyXG4gICogQHJldHVybiB7SFRNTH0gdGhlIHJlbmRlcmVkIGNvbXBvbmVudFxyXG4gICovXHJcbiAgX3JlbmRlclJlc3VsdHMoKSB7XHJcbiAgICBjb25zdCB7Z3JvdXBDb21wb25lbnQsIGlzU2VsZWN0aW9uLCBsaW5lQ29tcG9uZW50TWFwcGVyLCBsaW5lT3BlcmF0aW9uTGlzdCwgc2Nyb2xsUGFyZW50U2VsZWN0b3IsIHN0b3JlLCBzY29wZXNDb25maWd9ID0gdGhpcy5wcm9wcztcclxuICAgIGNvbnN0IHtncm91cGluZ0tleSwgZmFjZXRzLCByZXN1bHRzLCBzZWxlY3Rpb25TdGF0dXMsIHRvdGFsQ291bnR9ID0gdGhpcy5zdGF0ZTtcclxuICAgIHJldHVybiAoXHJcbiAgICAgIDxSZXN1bHRzXHJcbiAgICAgIGFjdGlvbj17dGhpcy5fYWN0aW9ufVxyXG4gICAgICBncm91cENvbXBvbmVudD17Z3JvdXBDb21wb25lbnR9XHJcbiAgICAgIGdyb3VwaW5nS2V5PXtncm91cGluZ0tleX1cclxuICAgICAgaXNTZWxlY3Rpb249e2lzU2VsZWN0aW9ufVxyXG4gICAgICBsaW5lQ2xpY2tIYW5kbGVyPXt0aGlzLl9saW5lQ2xpY2t9XHJcbiAgICAgIGxpbmVDb21wb25lbnRNYXBwZXI9e2xpbmVDb21wb25lbnRNYXBwZXJ9XHJcbiAgICAgIGxpbmVPcGVyYXRpb25MaXN0PXtsaW5lT3BlcmF0aW9uTGlzdH1cclxuICAgICAgbGluZVNlbGVjdGlvbkhhbmRsZXI9e3RoaXMuX3NlbGVjdEl0ZW19XHJcbiAgICAgIHJlZj0ncmVzdWx0TGlzdCdcclxuICAgICAgcmVuZGVyU2luZ2xlR3JvdXBEZWNvcmF0aW9uPXtmYWxzZX1cclxuICAgICAgcmVzdWx0c0ZhY2V0cz17ZmFjZXRzfVxyXG4gICAgICByZXN1bHRzTWFwPXtyZXN1bHRzfVxyXG4gICAgICBzY29wZXNDb25maWc9e3Njb3Blc0NvbmZpZ31cclxuICAgICAgc2Nyb2xsUGFyZW50U2VsZWN0b3I9e3Njcm9sbFBhcmVudFNlbGVjdG9yfVxyXG4gICAgICBzZWxlY3Rpb25TdGF0dXM9e3NlbGVjdGlvblN0YXR1c31cclxuICAgICAgc3RvcmU9e3N0b3JlfVxyXG4gICAgICB0b3RhbENvdW50PXt0b3RhbENvdW50fVxyXG4gICAgICAvPlxyXG4gICAgKTtcclxuICB9LFxyXG4gIC8qKlxyXG4gICogTGluZSBzZWxlY3Rpb24gaGFuZGxlclxyXG4gICovXHJcbiAgX3NlbGVjdEl0ZW0oKSB7XHJcbiAgICAvLyBjb3VudCB0aGUgc2VsZWN0ZWQgaXRlbXNcclxuICAgIGNvbnN0IHNlbGVjdGVkSXRlbXNDb3VudCA9IHRoaXMuZ2V0U2VsZWN0ZWRJdGVtcygpLmxlbmd0aDtcclxuICAgIC8vIENvdW50IHRoZSB2aXNpYmxlIGl0ZW1zXHJcbiAgICBjb25zdCB2aXNpYmxlSXRlbXNDb3VudCA9IHJlZHVjZSh0aGlzLnJlZnMucmVzdWx0TGlzdC5yZWZzLCAodmlzaWJsZUl0ZW1zQ291bnQsIHJlZkNvbXBvbmVudCwgcmVmS2V5KSA9PiB7XHJcbiAgICAgIC8vIFJlc3VsdHMgbWlnaHQgYmUgYSBsaXN0IChub24tZ3JvdXBlZCBzZWFyY2gpIG9yIGdyb3VwcyAoZ3JvdXBlZCBzZWFyY2gpXHJcbiAgICAgIGlmIChyZWZLZXkuaW5kZXhPZignbGlzdC0nKSA9PT0gMCkge1xyXG4gICAgICAgIHZpc2libGVJdGVtc0NvdW50ICs9IHJlZkNvbXBvbmVudC5wcm9wcy5kYXRhLmxlbmd0aDtcclxuICAgICAgfVxyXG4gICAgICBpZiAocmVmS2V5LmluZGV4T2YoJ2dyb3VwLScpID09PSAwKSB7XHJcbiAgICAgICAgaWYgKHJlZkNvbXBvbmVudC5wcm9wcy5saXN0Lmxlbmd0aCA8IHJlZkNvbXBvbmVudC5zdGF0ZS5yZXN1bHRzRGlzcGxheWVkQ291bnQpIHtcclxuICAgICAgICAgIHZpc2libGVJdGVtc0NvdW50ICs9IHJlZkNvbXBvbmVudC5wcm9wcy5saXN0Lmxlbmd0aDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdmlzaWJsZUl0ZW1zQ291bnQgKz0gcmVmQ29tcG9uZW50LnN0YXRlLnJlc3VsdHNEaXNwbGF5ZWRDb3VudDtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIHZpc2libGVJdGVtc0NvdW50O1xyXG4gICAgfSwgMCk7XHJcbiAgICAvLyBCeSBkZWZhdWx0LCB0aGUgc2VsZWN0aW9uIHN0YXR1cyBpcyBwYXJ0aWFsXHJcbiAgICBsZXQgc2VsZWN0aW9uU3RhdHVzID0gJ3BhcnRpYWwnO1xyXG4gICAgLy8gSWYgbm8gaXRlbSBpcyBzZWxlY3RlZCwgdGhlbiB0aGUgc2VsZWN0aW9uU3RhdHVzIGlzIG5vbmVcclxuICAgIGlmIChzZWxlY3RlZEl0ZW1zQ291bnQgPT09IDApIHtcclxuICAgICAgc2VsZWN0aW9uU3RhdHVzID0gJ25vbmUnO1xyXG4gICAgfSBlbHNlIGlmKHNlbGVjdGVkSXRlbXNDb3VudCA9PT0gdmlzaWJsZUl0ZW1zQ291bnQpIHtcclxuICAgICAgLy8gVGhlcmUgYXJlIGFzIG1hbnkgc2VsZWN0ZWQgaXRlbXMgYXMgdmlzaWJsZSBpdGVtcywgc28gdGhlIHNlbGVjdGlvblN0YXR1cyBpcyBhbGxcclxuICAgICAgc2VsZWN0aW9uU3RhdHVzID0gJ3NlbGVjdGVkJztcclxuICAgIH1cclxuICAgIHRoaXMuc2V0U3RhdGUoe3NlbGVjdGlvblN0YXR1c30pO1xyXG4gIH0sXHJcbiAgLyoqXHJcbiAgKiBBY3Rpb24gb24gbGluZSBjbGljay5cclxuICAqIEBwYXJhbSB7b2JqZWN0fSBpdGVtICB0aGUgaXRlbSBjbGlja2VkXHJcbiAgKi9cclxuICBfbGluZUNsaWNrKGl0ZW0pIHtcclxuICAgIGlmICh0aGlzLnByb3BzLm9uTGluZUNsaWNrKSB7XHJcbiAgICAgIHRoaXMucHJvcHMub25MaW5lQ2xpY2soaXRlbSk7XHJcbiAgICB9XHJcbiAgfSxcclxuICAvKipcclxuICAqIFJlbmRlciB0aGUgY29tcG9uZW50XHJcbiAgKiBAcmV0dXJuIHtIVE1MfSB0aGUgcmVuZGVyZWQgY29tcG9uZW50XHJcbiAgKi9cclxuICByZW5kZXIoKSB7XHJcbiAgICAvLyB0cnVlIGlmIGEgZmFjZXQgaXMgY29sbGFwc2VkXHJcbiAgICBjb25zdCBmYWNldENvbGxhcHNlZENsYXNzTmFtZSA9IE9iamVjdC5rZXlzKHRoaXMucHJvcHMub3BlbmVkRmFjZXRMaXN0KS5sZW5ndGggPT09IDAgPyAnZmFjZXQtY29sbGFwc2VkJyA6ICcnO1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgPGRpdiBjbGFzc05hbWU9J2FkdmFuY2VkLXNlYXJjaCcgZGF0YS1mb2N1cz0nYWR2YW5jZWQtc2VhcmNoJz5cclxuICAgICAgPGRpdiBkYXRhLWZvY3VzPSdmYWNldC1jb250YWluZXInIGNsYXNzTmFtZT17ZmFjZXRDb2xsYXBzZWRDbGFzc05hbWV9PlxyXG4gICAgICB7dGhpcy5fcmVuZGVyRmFjZXRCb3goKX1cclxuICAgICAgPC9kaXY+XHJcbiAgICAgIDxkaXYgZGF0YS1mb2N1cz0ncmVzdWx0LWNvbnRhaW5lcic+XHJcbiAgICAgIHt0aGlzLl9yZW5kZXJMaXN0U3VtbWFyeSgpfVxyXG4gICAgICB7dGhpcy5fcmVuZGVyQWN0aW9uQmFyKCl9XHJcbiAgICAgIHt0aGlzLl9yZW5kZXJSZXN1bHRzKCl9XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgICB7dGhpcy5wcm9wcy5oYXNCYWNrVG9Ub3AgJiYgPHRoaXMucHJvcHMuYmFja1RvVG9wQ29tcG9uZW50Lz59XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgKTtcclxuICB9XHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGJ1aWxkZXIoQWR2YW5jZWRTZWFyY2gpO1xyXG4iXX0=