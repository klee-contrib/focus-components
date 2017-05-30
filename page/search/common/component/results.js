'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _translation = require('focus-core/translation');

var _builder = require('focus-core/component/builder');

var _builder2 = _interopRequireDefault(_builder);

var _object = require('lodash/object');

var _lang = require('lodash/lang');

var _collection = require('lodash/collection');

var _defaultEmptyComponent = require('./default-empty-component');

var _defaultEmptyComponent2 = _interopRequireDefault(_defaultEmptyComponent);

var _list2 = require('../../../../list/selection/list');

var _groupWrapper = require('./group-wrapper');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; } // Dependencies


// Components


/**
* Results component, used to render the results, grouped or ungrouped
* @type {Object}
*/
var Results = {
    displayName: 'Results',
    /**
    * By default, an empty component is picked.
    * @return {Object} the default props
    */
    getDefaultProps: function getDefaultProps() {
        return {
            action: undefined,
            emptyComponent: _defaultEmptyComponent2.default,
            groupComponent: undefined,
            groupingKey: undefined,
            idField: undefined,
            initialRowsCount: 3,
            isSelection: undefined,
            lineClickHandler: undefined,
            lineComponentMapper: undefined,
            lineOperationList: undefined,
            lineSelectionHandler: undefined,
            scopesConfig: undefined,
            scopeFacetKey: 'FCT_SCOPE',
            scrollParentSelector: undefined,
            selectionStatus: undefined,
            renderSingleGroupDecoration: true,
            resultsMap: undefined,
            resultsFacets: undefined,
            selectionResultsMap: undefined,
            showMoreAdditionalRows: 5,
            store: undefined,
            totalCount: undefined
        };
    },

    /**
    * Initial state
    * @return {Object} Initial state
    */
    getInitialState: function getInitialState() {
        return {
            loading: false
        };
    },

    /**
    * Component will receive props
    */
    componentWillReceiveProps: function componentWillReceiveProps() {
        if (this.state.loading) {
            this.setState({
                loading: false
            });
        }
    },


    /**
    * Render a single group of results, using the group component given as a prop.
    * @param  {array} list the results list
    * @param  {string} key  the group key
    * @param  {int} count  the group's results count
    * @param  {bool} isUnique  is this the only rendered group
    * @return {HMTL}      the rendered group
    */
    _renderSingleGroup: function _renderSingleGroup(list, key, count, isUnique) {
        var initialRowsCount = this.props.initialRowsCount;

        if (this.props.renderSingleGroupDecoration && !this.props.groupComponent) {
            console.warn('You are trying to wrap your list in a group without a groupComponent. Please give one or set "renderSingleGroupDecoration" to false.');
        }

        if (isUnique) {
            if (this.props.renderSingleGroupDecoration) {
                return _react2.default.createElement(_groupWrapper.component, {
                    count: count,
                    groupComponent: this.props.groupComponent,
                    groupKey: key,
                    initialRowsCount: initialRowsCount,
                    isUnique: true,
                    list: list,
                    ref: 'group-' + key,
                    renderResultsList: this._renderResultsList,
                    showAllHandler: this._showAllHandler
                });
            } else {
                return this._renderResultsList(list, key, count, true);
            }
        } else {
            return _react2.default.createElement(_groupWrapper.component, {
                count: count,
                groupComponent: this.props.groupComponent,
                groupKey: key,
                initialRowsCount: initialRowsCount,
                key: key,
                list: list,
                ref: 'group-' + key,
                renderResultsList: this._renderResultsList,
                showAllHandler: this._showAllHandler
            });
        }
    },

    /**
    * Render the empty component given as a prop when the result map is empty.
    * @return {HMTL}      the rendered component
    */
    _renderEmptyResults: function _renderEmptyResults() {
        return _react2.default.createElement(this.props.emptyComponent, null);
    },

    /**
    * Render the results list
    * @param  {Array}  list     the results list
    * @param  {string}  key      the group key
    * @param  {integer}  count    the group count
    * @param  {Boolean} isUnique true if this is the only group rendered
    * @return {HTML}          the rendered component
    */
    _renderResultsList: function _renderResultsList(list, key, count, isUnique) {
        var _props = this.props,
            lineComponentMapper = _props.lineComponentMapper,
            idField = _props.idField,
            isSelection = _props.isSelection,
            lineSelectionHandler = _props.lineSelectionHandler,
            lineClickHandler = _props.lineClickHandler,
            lineOperationList = _props.lineOperationList,
            scrollParentSelector = _props.scrollParentSelector,
            selectionStatus = _props.selectionStatus,
            selectionResultsMap = _props.selectionResultsMap,
            otherProps = _objectWithoutProperties(_props, ['lineComponentMapper', 'idField', 'isSelection', 'lineSelectionHandler', 'lineClickHandler', 'lineOperationList', 'scrollParentSelector', 'selectionStatus', 'selectionResultsMap']);

        var selectionData = selectionResultsMap ? selectionResultsMap[key] || [] : [];
        var scope = otherProps.store.getScope();
        var lineKey = scope === undefined || scope === 'ALL' ? key : scope;
        var LineComponent = lineComponentMapper(lineKey, list);
        var hasMoreData = isUnique !== undefined && isUnique && list.length < count;
        return _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(_list2.component, _extends({
                data: list,
                'data-focus': 'results-list',
                fetchNextPage: this._onScrollReachedBottom,
                hasMoreData: hasMoreData,
                idField: idField,
                isSelection: isSelection,
                LineComponent: LineComponent,
                onLineClick: lineClickHandler,
                onSelection: lineSelectionHandler,
                operationList: lineOperationList,
                parentSelector: scrollParentSelector,
                ref: 'list-' + key,
                selectionData: selectionData,
                selectionStatus: selectionStatus
            }, otherProps)),
            this.state.loading && _react2.default.createElement(
                'div',
                { 'data-focus': 'loading-more-results' },
                (0, _translation.translate)('search.loadingMore')
            )
        );
    },


    /**
    * Construct the show all action
    * @param  {string} key the group key where the show all has been clicked
    */
    _showAllHandler: function _showAllHandler(key) {
        var _props2 = this.props,
            showAllHandler = _props2.showAllHandler,
            resultsFacets = _props2.resultsFacets,
            scopeFacetKey = _props2.scopeFacetKey,
            groupingKey = _props2.groupingKey,
            scopesConfig = _props2.scopesConfig;

        var selectedScope = key;
        if (scopesConfig && key && scopesConfig[key]) {
            selectedScope = scopesConfig[key];
        }
        if (resultsFacets[scopeFacetKey]) {
            this._scopeSelectionHandler(selectedScope);
        } else {
            var facetKey = groupingKey;
            var facetValue = selectedScope;
            this._facetSelectionHandler(facetKey, facetValue);
        }
        // Called if defined (may be used in the quick search to close the popin.)
        if (showAllHandler) {
            showAllHandler();
        }
    },

    /**
    * Construct the show more handler
    * @param  {string} key the group key where the show more has been clicked
    * @return {function}     the show more handler
    */
    _getShowMoreHandler: function _getShowMoreHandler(key) {
        var _this = this;

        return function () {
            var groupsRowsCounts = (0, _lang.clone)(_this.state.groupsRowsCounts);
            groupsRowsCounts[key] = groupsRowsCounts[key] ? groupsRowsCounts[key] + _this.props.showMoreAdditionalRows : _this.props.initialRowsCount;
            _this.setState({ groupsRowsCounts: groupsRowsCounts });
        };
    },


    /**
    * Scope selection handler
    * @param  {string} key the scope key
    */
    _scopeSelectionHandler: function _scopeSelectionHandler(key) {
        this.props.action.updateProperties({
            scope: key
        });
    },

    /**
    * Facet selection handler
    * @param  {string} key the facet key
    * @param  {string} value the facet value
    */
    _facetSelectionHandler: function _facetSelectionHandler(key, value) {
        var selectedFacets = (0, _object.assign)({}, this.props.store.getSelectedFacets(), _defineProperty({}, key, {
            key: value,
            data: {
                label: value,
                count: 0
            }
        }));
        this.props.action.updateProperties({
            groupingKey: undefined,
            selectedFacets: selectedFacets
        });
    },

    /**
    * Scroll reached bottom handler
    */
    _onScrollReachedBottom: function _onScrollReachedBottom() {
        var _this2 = this;

        if (!this.state.loading) {
            this.setState({
                loading: true
            }, function () {
                _this2.props.action.search(true);
            });
        }
    },


    /**
    * Get the group counts object
    * @param  {object} resultsMap the results map
    * @return {object}           the counts map
    */
    _getGroupCounts: function _getGroupCounts(resultsMap) {
        resultsMap = resultsMap ? resultsMap : this.props.resultsMap;
        // resultMap can be either an Array or an Object depending of the search being grouped or not.
        if (resultsMap && (0, _lang.isArray)(resultsMap) && 1 === resultsMap.length) {
            //Check if the resultMap contains an entry which is an array.
            var isResultMapEntryAnArray = (0, _lang.isArray)(resultsMap[0]);
            if (isResultMapEntryAnArray) {
                return _defineProperty({}, resultsMap[0][0], {
                    count: this.props.totalCount
                });
            }
            //this case occurs when the server response contains only one group with results.
            return _defineProperty({}, (0, _object.keys)(resultsMap[0]), {
                count: this.props.totalCount
            });
        } else if (1 === (0, _object.keys)(resultsMap).length) {
            return _defineProperty({}, (0, _object.keys)(resultsMap)[0], {
                count: this.props.totalCount
            });
        }

        // here : grouped list
        var targetFacetData = void 0;
        var resultsFacets = this.props.resultsFacets;

        if (resultsFacets) {
            var _props3 = this.props,
                scopeFacetKey = _props3.scopeFacetKey,
                groupingKey = _props3.groupingKey;

            var key = groupingKey === undefined ? scopeFacetKey : groupingKey;
            var scopeFacet = resultsFacets[key];
            return (0, _object.mapValues)((0, _collection.groupBy)(scopeFacet, 'label'), function (facetData) {
                return facetData[0].count;
            });
        }
        return 0;
    },


    /**
    * Render the whole component
    * @return {HMTL}      the rendered component
    */
    render: function render() {
        var _this3 = this;

        // If there is no result, render the given empty component
        if (0 === this.props.totalCount) {
            return this._renderEmptyResults();
        }

        var resultsMap = void 0;

        // resultsMap can be an Array or an Object.
        if ((0, _lang.isArray)(this.props.resultsMap)) {
            resultsMap = (0, _collection.filter)(this.props.resultsMap, function (resultGroup) {
                var propertyGroupName = (0, _object.keys)(resultGroup)[0]; //group property name
                var list = resultGroup[propertyGroupName];
                return 0 !== list.length;
            });
        } else {
            resultsMap = (0, _object.omit)(this.props.resultsMap, function (resultGroup) {
                var propertyGroupName = (0, _object.keys)(resultGroup)[0]; //group property name
                var list = resultGroup[propertyGroupName];
                return 0 === list.length;
            });
        }

        // Get the count for each group
        var groupCounts = this._getGroupCounts(resultsMap);
        // Check if there is only one group left

        if ((0, _lang.isArray)(resultsMap) && 1 === resultsMap.length) {
            var key = (0, _object.keys)(resultsMap[0])[0];
            var list = resultsMap[0][key];
            var count = groupCounts[key].count;
            return this._renderSingleGroup(list, key, count, true);
        } else if (1 === (0, _object.keys)(resultsMap).length) {
            var _key = (0, _object.keys)(resultsMap)[0];
            var _list = resultsMap[_key];
            var _count = groupCounts[_key].count;
            return this._renderSingleGroup(_list, _key, _count, true);
        } else {
            return _react2.default.createElement(
                'div',
                { 'data-focus': 'search-results' },
                (0, _collection.map)(resultsMap, function (resultGroup) {
                    var key = (0, _object.keys)(resultGroup)[0]; //group property name
                    var list = resultGroup[key];
                    var count = groupCounts[key];
                    return _this3._renderSingleGroup(list, key, count);
                })
            );
        }
    }
};

module.exports = (0, _builder2.default)(Results);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJSZXN1bHRzIiwiZGlzcGxheU5hbWUiLCJnZXREZWZhdWx0UHJvcHMiLCJhY3Rpb24iLCJ1bmRlZmluZWQiLCJlbXB0eUNvbXBvbmVudCIsImdyb3VwQ29tcG9uZW50IiwiZ3JvdXBpbmdLZXkiLCJpZEZpZWxkIiwiaW5pdGlhbFJvd3NDb3VudCIsImlzU2VsZWN0aW9uIiwibGluZUNsaWNrSGFuZGxlciIsImxpbmVDb21wb25lbnRNYXBwZXIiLCJsaW5lT3BlcmF0aW9uTGlzdCIsImxpbmVTZWxlY3Rpb25IYW5kbGVyIiwic2NvcGVzQ29uZmlnIiwic2NvcGVGYWNldEtleSIsInNjcm9sbFBhcmVudFNlbGVjdG9yIiwic2VsZWN0aW9uU3RhdHVzIiwicmVuZGVyU2luZ2xlR3JvdXBEZWNvcmF0aW9uIiwicmVzdWx0c01hcCIsInJlc3VsdHNGYWNldHMiLCJzZWxlY3Rpb25SZXN1bHRzTWFwIiwic2hvd01vcmVBZGRpdGlvbmFsUm93cyIsInN0b3JlIiwidG90YWxDb3VudCIsImdldEluaXRpYWxTdGF0ZSIsImxvYWRpbmciLCJjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzIiwic3RhdGUiLCJzZXRTdGF0ZSIsIl9yZW5kZXJTaW5nbGVHcm91cCIsImxpc3QiLCJrZXkiLCJjb3VudCIsImlzVW5pcXVlIiwicHJvcHMiLCJjb25zb2xlIiwid2FybiIsIl9yZW5kZXJSZXN1bHRzTGlzdCIsIl9zaG93QWxsSGFuZGxlciIsIl9yZW5kZXJFbXB0eVJlc3VsdHMiLCJvdGhlclByb3BzIiwic2VsZWN0aW9uRGF0YSIsInNjb3BlIiwiZ2V0U2NvcGUiLCJsaW5lS2V5IiwiTGluZUNvbXBvbmVudCIsImhhc01vcmVEYXRhIiwibGVuZ3RoIiwiX29uU2Nyb2xsUmVhY2hlZEJvdHRvbSIsInNob3dBbGxIYW5kbGVyIiwic2VsZWN0ZWRTY29wZSIsIl9zY29wZVNlbGVjdGlvbkhhbmRsZXIiLCJmYWNldEtleSIsImZhY2V0VmFsdWUiLCJfZmFjZXRTZWxlY3Rpb25IYW5kbGVyIiwiX2dldFNob3dNb3JlSGFuZGxlciIsImdyb3Vwc1Jvd3NDb3VudHMiLCJ1cGRhdGVQcm9wZXJ0aWVzIiwidmFsdWUiLCJzZWxlY3RlZEZhY2V0cyIsImdldFNlbGVjdGVkRmFjZXRzIiwiZGF0YSIsImxhYmVsIiwic2VhcmNoIiwiX2dldEdyb3VwQ291bnRzIiwiaXNSZXN1bHRNYXBFbnRyeUFuQXJyYXkiLCJ0YXJnZXRGYWNldERhdGEiLCJzY29wZUZhY2V0IiwiZmFjZXREYXRhIiwicmVuZGVyIiwicmVzdWx0R3JvdXAiLCJwcm9wZXJ0eUdyb3VwTmFtZSIsImdyb3VwQ291bnRzIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFFQTs7QUFDQTs7QUFDQTs7QUFHQTs7OztBQUNBOztBQUNBOzs7Ozs7Nk5BWkE7OztBQVNBOzs7QUFLQTs7OztBQUlBLElBQU1BLFVBQVU7QUFDWkMsaUJBQWEsU0FERDtBQUVaOzs7O0FBSUFDLG1CQU5ZLDZCQU1NO0FBQ2QsZUFBTztBQUNIQyxvQkFBUUMsU0FETDtBQUVIQywyREFGRztBQUdIQyw0QkFBZ0JGLFNBSGI7QUFJSEcseUJBQWFILFNBSlY7QUFLSEkscUJBQVNKLFNBTE47QUFNSEssOEJBQWtCLENBTmY7QUFPSEMseUJBQWFOLFNBUFY7QUFRSE8sOEJBQWtCUCxTQVJmO0FBU0hRLGlDQUFxQlIsU0FUbEI7QUFVSFMsK0JBQW1CVCxTQVZoQjtBQVdIVSxrQ0FBc0JWLFNBWG5CO0FBWUhXLDBCQUFjWCxTQVpYO0FBYUhZLDJCQUFlLFdBYlo7QUFjSEMsa0NBQXNCYixTQWRuQjtBQWVIYyw2QkFBaUJkLFNBZmQ7QUFnQkhlLHlDQUE2QixJQWhCMUI7QUFpQkhDLHdCQUFZaEIsU0FqQlQ7QUFrQkhpQiwyQkFBZWpCLFNBbEJaO0FBbUJIa0IsaUNBQXFCbEIsU0FuQmxCO0FBb0JIbUIsb0NBQXdCLENBcEJyQjtBQXFCSEMs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QUFDN0Isd0JBQU12QyxNQUFNLGtCQUFLdUMsV0FBTCxFQUFrQixDQUFsQixDQUFaLENBRDZCLENBQ0s7QUFDbEMsd0JBQU14QyxPQUFPd0MsWUFBWXZDLEdBQVosQ0FBYjtBQUNBLHdCQUFNQyxRQUFRd0MsWUFBWXpDLEdBQVosQ0FBZDtBQUNBLDJCQUFPLE9BQUtGLGtCQUFMLENBQXdCQyxJQUF4QixFQUE4QkMsR0FBOUIsRUFBbUNDLEtBQW5DLENBQVA7QUFDSCxpQkFMRDtBQUZKLGFBREo7QUFZSDtBQUNKO0FBclZXLENBQWhCOztBQXlWQXlDLE9BQU9DLE9BQVAsR0FBaUIsdUJBQVE1RSxPQUFSLENBQWpCIiwiZmlsZSI6ImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIERlcGVuZGVuY2llc1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7dHJhbnNsYXRlfSBmcm9tICdmb2N1cy1jb3JlL3RyYW5zbGF0aW9uJztcbmltcG9ydCBidWlsZGVyIGZyb20gJ2ZvY3VzLWNvcmUvY29tcG9uZW50L2J1aWxkZXInO1xuXG5pbXBvcnQge2Fzc2lnbiwgbWFwVmFsdWVzLCBrZXlzLCBvbWl0fSBmcm9tICdsb2Rhc2gvb2JqZWN0JztcbmltcG9ydCB7Y2xvbmUsIGlzQXJyYXl9IGZyb20gJ2xvZGFzaC9sYW5nJztcbmltcG9ydCB7ZmlsdGVyLCBmaW5kLCBtYXAsIGdyb3VwQnl9IGZyb20gJ2xvZGFzaC9jb2xsZWN0aW9uJztcblxuLy8gQ29tcG9uZW50c1xuaW1wb3J0IERlZmF1bHRFbXB0eSBmcm9tICcuL2RlZmF1bHQtZW1wdHktY29tcG9uZW50JztcbmltcG9ydCB7Y29tcG9uZW50IGFzIExpc3RTZWxlY3Rpb259IGZyb20gJy4uLy4uLy4uLy4uL2xpc3Qvc2VsZWN0aW9uL2xpc3QnO1xuaW1wb3J0IHtjb21wb25lbnQgYXMgR3JvdXBXcmFwcGVyfSBmcm9tICcuL2dyb3VwLXdyYXBwZXInO1xuXG4vKipcbiogUmVzdWx0cyBjb21wb25lbnQsIHVzZWQgdG8gcmVuZGVyIHRoZSByZXN1bHRzLCBncm91cGVkIG9yIHVuZ3JvdXBlZFxuKiBAdHlwZSB7T2JqZWN0fVxuKi9cbmNvbnN0IFJlc3VsdHMgPSB7XG4gICAgZGlzcGxheU5hbWU6ICdSZXN1bHRzJyxcbiAgICAvKipcbiAgICAqIEJ5IGRlZmF1bHQsIGFuIGVtcHR5IGNvbXBvbmVudCBpcyBwaWNrZWQuXG4gICAgKiBAcmV0dXJuIHtPYmplY3R9IHRoZSBkZWZhdWx0IHByb3BzXG4gICAgKi9cbiAgICBnZXREZWZhdWx0UHJvcHMoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBhY3Rpb246IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIGVtcHR5Q29tcG9uZW50OiBEZWZhdWx0RW1wdHksXG4gICAgICAgICAgICBncm91cENvbXBvbmVudDogdW5kZWZpbmVkLFxuICAgICAgICAgICAgZ3JvdXBpbmdLZXk6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIGlkRmllbGQ6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIGluaXRpYWxSb3dzQ291bnQ6IDMsXG4gICAgICAgICAgICBpc1NlbGVjdGlvbjogdW5kZWZpbmVkLFxuICAgICAgICAgICAgbGluZUNsaWNrSGFuZGxlcjogdW5kZWZpbmVkLFxuICAgICAgICAgICAgbGluZUNvbXBvbmVudE1hcHBlcjogdW5kZWZpbmVkLFxuICAgICAgICAgICAgbGluZU9wZXJhdGlvbkxpc3Q6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIGxpbmVTZWxlY3Rpb25IYW5kbGVyOiB1bmRlZmluZWQsXG4gICAgICAgICAgICBzY29wZXNDb25maWc6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIHNjb3BlRmFjZXRLZXk6ICdGQ1RfU0NPUEUnLFxuICAgICAgICAgICAgc2Nyb2xsUGFyZW50U2VsZWN0b3I6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIHNlbGVjdGlvblN0YXR1czogdW5kZWZpbmVkLFxuICAgICAgICAgICAgcmVuZGVyU2luZ2xlR3JvdXBEZWNvcmF0aW9uOiB0cnVlLFxuICAgICAgICAgICAgcmVzdWx0c01hcDogdW5kZWZpbmVkLFxuICAgICAgICAgICAgcmVzdWx0c0ZhY2V0czogdW5kZWZpbmVkLFxuICAgICAgICAgICAgc2VsZWN0aW9uUmVzdWx0c01hcDogdW5kZWZpbmVkLFxuICAgICAgICAgICAgc2hvd01vcmVBZGRpdGlvbmFsUm93czogNSxcbiAgICAgICAgICAgIHN0b3JlOiB1bmRlZmluZWQsXG4gICAgICAgICAgICB0b3RhbENvdW50OiB1bmRlZmluZWRcbiAgICAgICAgfTtcbiAgICB9LFxuICAgIC8qKlxuICAgICogSW5pdGlhbCBzdGF0ZVxuICAgICogQHJldHVybiB7T2JqZWN0fSBJbml0aWFsIHN0YXRlXG4gICAgKi9cbiAgICBnZXRJbml0aWFsU3RhdGUoKSB7XG4gICAgICAgIHJldHVybiAoe1xuICAgICAgICAgICAgbG9hZGluZzogZmFsc2VcbiAgICAgICAgfSk7XG4gICAgfSxcbiAgICAvKipcbiAgICAqIENvbXBvbmVudCB3aWxsIHJlY2VpdmUgcHJvcHNcbiAgICAqL1xuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMoKSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmxvYWRpbmcpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgIGxvYWRpbmc6IGZhbHNlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAqIFJlbmRlciBhIHNpbmdsZSBncm91cCBvZiByZXN1bHRzLCB1c2luZyB0aGUgZ3JvdXAgY29tcG9uZW50IGdpdmVuIGFzIGEgcHJvcC5cbiAgICAqIEBwYXJhbSAge2FycmF5fSBsaXN0IHRoZSByZXN1bHRzIGxpc3RcbiAgICAqIEBwYXJhbSAge3N0cmluZ30ga2V5ICB0aGUgZ3JvdXAga2V5XG4gICAgKiBAcGFyYW0gIHtpbnR9IGNvdW50ICB0aGUgZ3JvdXAncyByZXN1bHRzIGNvdW50XG4gICAgKiBAcGFyYW0gIHtib29sfSBpc1VuaXF1ZSAgaXMgdGhpcyB0aGUgb25seSByZW5kZXJlZCBncm91cFxuICAgICogQHJldHVybiB7SE1UTH0gICAgICB0aGUgcmVuZGVyZWQgZ3JvdXBcbiAgICAqL1xuICAgIF9yZW5kZXJTaW5nbGVHcm91cChsaXN0LCBrZXksIGNvdW50LCBpc1VuaXF1ZSkge1xuICAgICAgICBjb25zdCB7aW5pdGlhbFJvd3NDb3VudH0gPSB0aGlzLnByb3BzO1xuICAgICAgICBpZih0aGlzLnByb3BzLnJlbmRlclNpbmdsZUdyb3VwRGVjb3JhdGlvbiAmJiAhdGhpcy5wcm9wcy5ncm91cENvbXBvbmVudCkge1xuICAgICAgICAgICAgY29uc29sZS53YXJuKCdZb3UgYXJlIHRyeWluZyB0byB3cmFwIHlvdXIgbGlzdCBpbiBhIGdyb3VwIHdpdGhvdXQgYSBncm91cENvbXBvbmVudC4gUGxlYXNlIGdpdmUgb25lIG9yIHNldCBcInJlbmRlclNpbmdsZUdyb3VwRGVjb3JhdGlvblwiIHRvIGZhbHNlLicpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGlzVW5pcXVlKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcm9wcy5yZW5kZXJTaW5nbGVHcm91cERlY29yYXRpb24pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgICA8R3JvdXBXcmFwcGVyXG4gICAgICAgICAgICAgICAgICAgIGNvdW50PXtjb3VudH1cbiAgICAgICAgICAgICAgICAgICAgZ3JvdXBDb21wb25lbnQ9e3RoaXMucHJvcHMuZ3JvdXBDb21wb25lbnR9XG4gICAgICAgICAgICAgICAgICAgIGdyb3VwS2V5PXtrZXl9XG4gICAgICAgICAgICAgICAgICAgIGluaXRpYWxSb3dzQ291bnQ9e2luaXRpYWxSb3dzQ291bnR9XG4gICAgICAgICAgICAgICAgICAgIGlzVW5pcXVlXG4gICAgICAgICAgICAgICAgICAgIGxpc3Q9e2xpc3R9XG4gICAgICAgICAgICAgICAgICAgIHJlZj17YGdyb3VwLSR7a2V5fWB9XG4gICAgICAgICAgICAgICAgICAgIHJlbmRlclJlc3VsdHNMaXN0PXt0aGlzLl9yZW5kZXJSZXN1bHRzTGlzdH1cbiAgICAgICAgICAgICAgICAgICAgc2hvd0FsbEhhbmRsZXI9e3RoaXMuX3Nob3dBbGxIYW5kbGVyfVxuICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9yZW5kZXJSZXN1bHRzTGlzdChsaXN0LCBrZXksIGNvdW50LCB0cnVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPEdyb3VwV3JhcHBlclxuICAgICAgICAgICAgICAgIGNvdW50PXtjb3VudH1cbiAgICAgICAgICAgICAgICBncm91cENvbXBvbmVudD17dGhpcy5wcm9wcy5ncm91cENvbXBvbmVudH1cbiAgICAgICAgICAgICAgICBncm91cEtleT17a2V5fVxuICAgICAgICAgICAgICAgIGluaXRpYWxSb3dzQ291bnQ9e2luaXRpYWxSb3dzQ291bnR9XG4gICAgICAgICAgICAgICAga2V5PXtrZXl9XG4gICAgICAgICAgICAgICAgbGlzdD17bGlzdH1cbiAgICAgICAgICAgICAgICByZWY9e2Bncm91cC0ke2tleX1gfVxuICAgICAgICAgICAgICAgIHJlbmRlclJlc3VsdHNMaXN0PXt0aGlzLl9yZW5kZXJSZXN1bHRzTGlzdH1cbiAgICAgICAgICAgICAgICBzaG93QWxsSGFuZGxlcj17dGhpcy5fc2hvd0FsbEhhbmRsZXJ9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIC8qKlxuICAgICogUmVuZGVyIHRoZSBlbXB0eSBjb21wb25lbnQgZ2l2ZW4gYXMgYSBwcm9wIHdoZW4gdGhlIHJlc3VsdCBtYXAgaXMgZW1wdHkuXG4gICAgKiBAcmV0dXJuIHtITVRMfSAgICAgIHRoZSByZW5kZXJlZCBjb21wb25lbnRcbiAgICAqL1xuICAgIF9yZW5kZXJFbXB0eVJlc3VsdHMoKSB7XG4gICAgICAgIHJldHVybiA8dGhpcy5wcm9wcy5lbXB0eUNvbXBvbmVudC8+O1xuICAgIH0sXG4gICAgLyoqXG4gICAgKiBSZW5kZXIgdGhlIHJlc3VsdHMgbGlzdFxuICAgICogQHBhcmFtICB7QXJyYXl9ICBsaXN0ICAgICB0aGUgcmVzdWx0cyBsaXN0XG4gICAgKiBAcGFyYW0gIHtzdHJpbmd9ICBrZXkgICAgICB0aGUgZ3JvdXAga2V5XG4gICAgKiBAcGFyYW0gIHtpbnRlZ2VyfSAgY291bnQgICAgdGhlIGdyb3VwIGNvdW50XG4gICAgKiBAcGFyYW0gIHtCb29sZWFufSBpc1VuaXF1ZSB0cnVlIGlmIHRoaXMgaXMgdGhlIG9ubHkgZ3JvdXAgcmVuZGVyZWRcbiAgICAqIEByZXR1cm4ge0hUTUx9ICAgICAgICAgIHRoZSByZW5kZXJlZCBjb21wb25lbnRcbiAgICAqL1xuICAgIF9yZW5kZXJSZXN1bHRzTGlzdChsaXN0LCBrZXksIGNvdW50LCBpc1VuaXF1ZSkge1xuICAgICAgICBsZXQge1xuICAgICAgICAgICAgbGluZUNvbXBvbmVudE1hcHBlcixcbiAgICAgICAgICAgIGlkRmllbGQsXG4gICAgICAgICAgICBpc1NlbGVjdGlvbixcbiAgICAgICAgICAgIGxpbmVTZWxlY3Rpb25IYW5kbGVyLFxuICAgICAgICAgICAgbGluZUNsaWNrSGFuZGxlcixcbiAgICAgICAgICAgIGxpbmVPcGVyYXRpb25MaXN0LFxuICAgICAgICAgICAgc2Nyb2xsUGFyZW50U2VsZWN0b3IsXG4gICAgICAgICAgICBzZWxlY3Rpb25TdGF0dXMsXG4gICAgICAgICAgICBzZWxlY3Rpb25SZXN1bHRzTWFwLFxuICAgICAgICAgICAgLi4ub3RoZXJQcm9wc1xuICAgICAgICB9ID0gdGhpcy5wcm9wcztcbiAgICAgICAgY29uc3Qgc2VsZWN0aW9uRGF0YSA9IHNlbGVjdGlvblJlc3VsdHNNYXAgPyBzZWxlY3Rpb25SZXN1bHRzTWFwW2tleV0gfHwgW10gOiBbXTtcbiAgICAgICAgY29uc3Qgc2NvcGUgPSBvdGhlclByb3BzLnN0b3JlLmdldFNjb3BlKCk7XG4gICAgICAgIGNvbnN0IGxpbmVLZXkgPSBzY29wZSA9PT0gdW5kZWZpbmVkIHx8IHNjb3BlID09PSAnQUxMJyA/IGtleSA6IHNjb3BlO1xuICAgICAgICBjb25zdCBMaW5lQ29tcG9uZW50ID0gbGluZUNvbXBvbmVudE1hcHBlcihsaW5lS2V5LCBsaXN0KTtcbiAgICAgICAgY29uc3QgaGFzTW9yZURhdGEgPSBpc1VuaXF1ZSAhPT0gdW5kZWZpbmVkICYmIGlzVW5pcXVlICYmIGxpc3QubGVuZ3RoIDwgY291bnQ7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgPExpc3RTZWxlY3Rpb25cbiAgICAgICAgICAgIGRhdGE9e2xpc3R9XG4gICAgICAgICAgICBkYXRhLWZvY3VzPSdyZXN1bHRzLWxpc3QnXG4gICAgICAgICAgICBmZXRjaE5leHRQYWdlPXt0aGlzLl9vblNjcm9sbFJlYWNoZWRCb3R0b219XG4gICAgICAgICAgICBoYXNNb3JlRGF0YT17aGFzTW9yZURhdGF9XG4gICAgICAgICAgICBpZEZpZWxkPXtpZEZpZWxkfVxuICAgICAgICAgICAgaXNTZWxlY3Rpb249e2lzU2VsZWN0aW9ufVxuICAgICAgICAgICAgTGluZUNvbXBvbmVudD17TGluZUNvbXBvbmVudH1cbiAgICAgICAgICAgIG9uTGluZUNsaWNrPXtsaW5lQ2xpY2tIYW5kbGVyfVxuICAgICAgICAgICAgb25TZWxlY3Rpb249e2xpbmVTZWxlY3Rpb25IYW5kbGVyfVxuICAgICAgICAgICAgb3BlcmF0aW9uTGlzdD17bGluZU9wZXJhdGlvbkxpc3R9XG4gICAgICAgICAgICBwYXJlbnRTZWxlY3Rvcj17c2Nyb2xsUGFyZW50U2VsZWN0b3J9XG4gICAgICAgICAgICByZWY9e2BsaXN0LSR7a2V5fWB9XG4gICAgICAgICAgICBzZWxlY3Rpb25EYXRhPXtzZWxlY3Rpb25EYXRhfVxuICAgICAgICAgICAgc2VsZWN0aW9uU3RhdHVzPXtzZWxlY3Rpb25TdGF0dXN9XG4gICAgICAgICAgICB7Li4ub3RoZXJQcm9wc31cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgICB7dGhpcy5zdGF0ZS5sb2FkaW5nICYmXG4gICAgICAgICAgICAgICAgPGRpdiBkYXRhLWZvY3VzPSdsb2FkaW5nLW1vcmUtcmVzdWx0cyc+XG4gICAgICAgICAgICAgICAge3RyYW5zbGF0ZSgnc2VhcmNoLmxvYWRpbmdNb3JlJyl9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgKiBDb25zdHJ1Y3QgdGhlIHNob3cgYWxsIGFjdGlvblxuICAgICogQHBhcmFtICB7c3RyaW5nfSBrZXkgdGhlIGdyb3VwIGtleSB3aGVyZSB0aGUgc2hvdyBhbGwgaGFzIGJlZW4gY2xpY2tlZFxuICAgICovXG4gICAgX3Nob3dBbGxIYW5kbGVyKGtleSkge1xuICAgICAgICBjb25zdCB7c2hvd0FsbEhhbmRsZXIsIHJlc3VsdHNGYWNldHMsIHNjb3BlRmFjZXRLZXksIGdyb3VwaW5nS2V5LCBzY29wZXNDb25maWd9ID0gdGhpcy5wcm9wcztcbiAgICAgICAgbGV0IHNlbGVjdGVkU2NvcGUgPSBrZXk7XG4gICAgICAgIGlmIChzY29wZXNDb25maWcgJiYga2V5ICYmIHNjb3Blc0NvbmZpZ1trZXldKSB7XG4gICAgICAgICAgICBzZWxlY3RlZFNjb3BlID0gc2NvcGVzQ29uZmlnW2tleV07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHJlc3VsdHNGYWNldHNbc2NvcGVGYWNldEtleV0pIHtcbiAgICAgICAgICAgIHRoaXMuX3Njb3BlU2VsZWN0aW9uSGFuZGxlcihzZWxlY3RlZFNjb3BlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxldCBmYWNldEtleSA9IGdyb3VwaW5nS2V5O1xuICAgICAgICAgICAgbGV0IGZhY2V0VmFsdWUgPSBzZWxlY3RlZFNjb3BlO1xuICAgICAgICAgICAgdGhpcy5fZmFjZXRTZWxlY3Rpb25IYW5kbGVyKGZhY2V0S2V5LCBmYWNldFZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBDYWxsZWQgaWYgZGVmaW5lZCAobWF5IGJlIHVzZWQgaW4gdGhlIHF1aWNrIHNlYXJjaCB0byBjbG9zZSB0aGUgcG9waW4uKVxuICAgICAgICBpZihzaG93QWxsSGFuZGxlcikge1xuICAgICAgICAgICAgc2hvd0FsbEhhbmRsZXIoKTtcbiAgICAgICAgfVxuXG4gICAgfSxcbiAgICAvKipcbiAgICAqIENvbnN0cnVjdCB0aGUgc2hvdyBtb3JlIGhhbmRsZXJcbiAgICAqIEBwYXJhbSAge3N0cmluZ30ga2V5IHRoZSBncm91cCBrZXkgd2hlcmUgdGhlIHNob3cgbW9yZSBoYXMgYmVlbiBjbGlja2VkXG4gICAgKiBAcmV0dXJuIHtmdW5jdGlvbn0gICAgIHRoZSBzaG93IG1vcmUgaGFuZGxlclxuICAgICovXG4gICAgX2dldFNob3dNb3JlSGFuZGxlcihrZXkpIHtcbiAgICAgICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgICAgIGxldCBncm91cHNSb3dzQ291bnRzID0gY2xvbmUodGhpcy5zdGF0ZS5ncm91cHNSb3dzQ291bnRzKTtcbiAgICAgICAgICAgIGdyb3Vwc1Jvd3NDb3VudHNba2V5XSA9IGdyb3Vwc1Jvd3NDb3VudHNba2V5XSA/IGdyb3Vwc1Jvd3NDb3VudHNba2V5XSArIHRoaXMucHJvcHMuc2hvd01vcmVBZGRpdGlvbmFsUm93cyA6IHRoaXMucHJvcHMuaW5pdGlhbFJvd3NDb3VudDtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2dyb3Vwc1Jvd3NDb3VudHN9KTtcbiAgICAgICAgfTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgKiBTY29wZSBzZWxlY3Rpb24gaGFuZGxlclxuICAgICogQHBhcmFtICB7c3RyaW5nfSBrZXkgdGhlIHNjb3BlIGtleVxuICAgICovXG4gICAgX3Njb3BlU2VsZWN0aW9uSGFuZGxlcihrZXkpIHtcbiAgICAgICAgdGhpcy5wcm9wcy5hY3Rpb24udXBkYXRlUHJvcGVydGllcyh7XG4gICAgICAgICAgICBzY29wZToga2V5XG4gICAgICAgIH0pO1xuICAgIH0sXG4gICAgLyoqXG4gICAgKiBGYWNldCBzZWxlY3Rpb24gaGFuZGxlclxuICAgICogQHBhcmFtICB7c3RyaW5nfSBrZXkgdGhlIGZhY2V0IGtleVxuICAgICogQHBhcmFtICB7c3RyaW5nfSB2YWx1ZSB0aGUgZmFjZXQgdmFsdWVcbiAgICAqL1xuICAgIF9mYWNldFNlbGVjdGlvbkhhbmRsZXIoa2V5LCB2YWx1ZSkge1xuICAgICAgICBsZXQgc2VsZWN0ZWRGYWNldHMgPSBhc3NpZ24oe30sIHRoaXMucHJvcHMuc3RvcmUuZ2V0U2VsZWN0ZWRGYWNldHMoKSwge1xuICAgICAgICAgICAgW2tleV06IHtcbiAgICAgICAgICAgICAgICBrZXk6IHZhbHVlLFxuICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IHZhbHVlLFxuICAgICAgICAgICAgICAgICAgICBjb3VudDogMFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMucHJvcHMuYWN0aW9uLnVwZGF0ZVByb3BlcnRpZXMoe1xuICAgICAgICAgICAgZ3JvdXBpbmdLZXk6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIHNlbGVjdGVkRmFjZXRzXG4gICAgICAgIH0pO1xuICAgIH0sXG4gICAgLyoqXG4gICAgKiBTY3JvbGwgcmVhY2hlZCBib3R0b20gaGFuZGxlclxuICAgICovXG4gICAgX29uU2Nyb2xsUmVhY2hlZEJvdHRvbSgpIHtcbiAgICAgICAgaWYgKCF0aGlzLnN0YXRlLmxvYWRpbmcpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgIGxvYWRpbmc6IHRydWVcbiAgICAgICAgICAgIH0sICgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnByb3BzLmFjdGlvbi5zZWFyY2godHJ1ZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgfSxcblxuICAgIC8qKlxuICAgICogR2V0IHRoZSBncm91cCBjb3VudHMgb2JqZWN0XG4gICAgKiBAcGFyYW0gIHtvYmplY3R9IHJlc3VsdHNNYXAgdGhlIHJlc3VsdHMgbWFwXG4gICAgKiBAcmV0dXJuIHtvYmplY3R9ICAgICAgICAgICB0aGUgY291bnRzIG1hcFxuICAgICovXG4gICAgX2dldEdyb3VwQ291bnRzKHJlc3VsdHNNYXApIHtcbiAgICAgICAgcmVzdWx0c01hcCA9IHJlc3VsdHNNYXAgPyByZXN1bHRzTWFwIDogdGhpcy5wcm9wcy5yZXN1bHRzTWFwO1xuICAgICAgICAvLyByZXN1bHRNYXAgY2FuIGJlIGVpdGhlciBhbiBBcnJheSBvciBhbiBPYmplY3QgZGVwZW5kaW5nIG9mIHRoZSBzZWFyY2ggYmVpbmcgZ3JvdXBlZCBvciBub3QuXG4gICAgICAgIGlmIChyZXN1bHRzTWFwICYmIGlzQXJyYXkocmVzdWx0c01hcCkgJiYgMSA9PT0gcmVzdWx0c01hcC5sZW5ndGgpIHtcbiAgICAgICAgICAgIC8vQ2hlY2sgaWYgdGhlIHJlc3VsdE1hcCBjb250YWlucyBhbiBlbnRyeSB3aGljaCBpcyBhbiBhcnJheS5cbiAgICAgICAgICAgIGNvbnN0IGlzUmVzdWx0TWFwRW50cnlBbkFycmF5ID0gaXNBcnJheShyZXN1bHRzTWFwWzBdKTtcbiAgICAgICAgICAgIGlmKGlzUmVzdWx0TWFwRW50cnlBbkFycmF5KSB7XG4gICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICBbcmVzdWx0c01hcFswXVswXV06IHtcbiAgICAgICAgICAgICAgICAgICAgICBjb3VudDogdGhpcy5wcm9wcy50b3RhbENvdW50XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvL3RoaXMgY2FzZSBvY2N1cnMgd2hlbiB0aGUgc2VydmVyIHJlc3BvbnNlIGNvbnRhaW5zIG9ubHkgb25lIGdyb3VwIHdpdGggcmVzdWx0cy5cbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgW2tleXMocmVzdWx0c01hcFswXSldOiB7XG4gICAgICAgICAgICAgICAgICAgIGNvdW50OiB0aGlzLnByb3BzLnRvdGFsQ291bnRcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICB9IGVsc2UgaWYgKDEgPT09IGtleXMocmVzdWx0c01hcCkubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIFtrZXlzKHJlc3VsdHNNYXApWzBdXToge1xuICAgICAgICAgICAgICAgICAgICBjb3VudDogdGhpcy5wcm9wcy50b3RhbENvdW50XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGhlcmUgOiBncm91cGVkIGxpc3RcbiAgICAgICAgbGV0IHRhcmdldEZhY2V0RGF0YTtcbiAgICAgICAgY29uc3Qge3Jlc3VsdHNGYWNldHN9ID0gdGhpcy5wcm9wcztcbiAgICAgICAgaWYocmVzdWx0c0ZhY2V0cykge1xuICAgICAgICAgICAgY29uc3Qge3Njb3BlRmFjZXRLZXksIGdyb3VwaW5nS2V5fSA9IHRoaXMucHJvcHM7XG4gICAgICAgICAgICBjb25zdCBrZXkgPSBncm91cGluZ0tleSA9PT0gdW5kZWZpbmVkID8gc2NvcGVGYWNldEtleSA6IGdyb3VwaW5nS2V5O1xuICAgICAgICAgICAgY29uc3Qgc2NvcGVGYWNldCA9IHJlc3VsdHNGYWNldHNba2V5XTtcbiAgICAgICAgICAgIHJldHVybiBtYXBWYWx1ZXMoZ3JvdXBCeShzY29wZUZhY2V0LCAnbGFiZWwnKSwgKGZhY2V0RGF0YSkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWNldERhdGFbMF0uY291bnQ7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gMDtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgKiBSZW5kZXIgdGhlIHdob2xlIGNvbXBvbmVudFxuICAgICogQHJldHVybiB7SE1UTH0gICAgICB0aGUgcmVuZGVyZWQgY29tcG9uZW50XG4gICAgKi9cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIC8vIElmIHRoZXJlIGlzIG5vIHJlc3VsdCwgcmVuZGVyIHRoZSBnaXZlbiBlbXB0eSBjb21wb25lbnRcbiAgICAgICAgaWYgKDAgPT09IHRoaXMucHJvcHMudG90YWxDb3VudCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3JlbmRlckVtcHR5UmVzdWx0cygpO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHJlc3VsdHNNYXA7XG5cbiAgICAgICAgLy8gcmVzdWx0c01hcCBjYW4gYmUgYW4gQXJyYXkgb3IgYW4gT2JqZWN0LlxuICAgICAgICBpZiAoaXNBcnJheSh0aGlzLnByb3BzLnJlc3VsdHNNYXApKSB7XG4gICAgICAgICAgICByZXN1bHRzTWFwID0gZmlsdGVyKHRoaXMucHJvcHMucmVzdWx0c01hcCwgZnVuY3Rpb24gKHJlc3VsdEdyb3VwKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcHJvcGVydHlHcm91cE5hbWUgPSBrZXlzKHJlc3VsdEdyb3VwKVswXTsgLy9ncm91cCBwcm9wZXJ0eSBuYW1lXG4gICAgICAgICAgICAgICAgY29uc3QgbGlzdCA9IHJlc3VsdEdyb3VwW3Byb3BlcnR5R3JvdXBOYW1lXTtcbiAgICAgICAgICAgICAgICByZXR1cm4gMCAhPT0gbGlzdC5sZW5ndGg7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlc3VsdHNNYXAgPSBvbWl0KHRoaXMucHJvcHMucmVzdWx0c01hcCwgZnVuY3Rpb24gKHJlc3VsdEdyb3VwKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcHJvcGVydHlHcm91cE5hbWUgPSBrZXlzKHJlc3VsdEdyb3VwKVswXTsgLy9ncm91cCBwcm9wZXJ0eSBuYW1lXG4gICAgICAgICAgICAgICAgY29uc3QgbGlzdCA9IHJlc3VsdEdyb3VwW3Byb3BlcnR5R3JvdXBOYW1lXTtcbiAgICAgICAgICAgICAgICByZXR1cm4gMCA9PT0gbGlzdC5sZW5ndGg7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEdldCB0aGUgY291bnQgZm9yIGVhY2ggZ3JvdXBcbiAgICAgICAgY29uc3QgZ3JvdXBDb3VudHMgPSB0aGlzLl9nZXRHcm91cENvdW50cyhyZXN1bHRzTWFwKTtcbiAgICAgICAgLy8gQ2hlY2sgaWYgdGhlcmUgaXMgb25seSBvbmUgZ3JvdXAgbGVmdFxuXG4gICAgICAgIGlmIChpc0FycmF5KHJlc3VsdHNNYXApICYmIDEgPT09IHJlc3VsdHNNYXAubGVuZ3RoKSB7XG4gICAgICAgICAgICBjb25zdCBrZXkgPSBrZXlzKHJlc3VsdHNNYXBbMF0pWzBdO1xuICAgICAgICAgICAgY29uc3QgbGlzdCA9IHJlc3VsdHNNYXBbMF1ba2V5XTtcbiAgICAgICAgICAgIGNvbnN0IGNvdW50ID0gZ3JvdXBDb3VudHNba2V5XS5jb3VudDtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9yZW5kZXJTaW5nbGVHcm91cChsaXN0LCBrZXksIGNvdW50LCB0cnVlKTtcbiAgICAgICAgfSBlbHNlIGlmICgxID09PSBrZXlzKHJlc3VsdHNNYXApLmxlbmd0aCkge1xuICAgICAgICAgICAgY29uc3Qga2V5ID0ga2V5cyhyZXN1bHRzTWFwKVswXTtcbiAgICAgICAgICAgIGNvbnN0IGxpc3QgPSByZXN1bHRzTWFwW2tleV07XG4gICAgICAgICAgICBjb25zdCBjb3VudCA9IGdyb3VwQ291bnRzW2tleV0uY291bnQ7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fcmVuZGVyU2luZ2xlR3JvdXAobGlzdCwga2V5LCBjb3VudCwgdHJ1ZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxkaXYgZGF0YS1mb2N1cz0nc2VhcmNoLXJlc3VsdHMnPlxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgbWFwKHJlc3VsdHNNYXAsIChyZXN1bHRHcm91cCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qga2V5ID0ga2V5cyhyZXN1bHRHcm91cClbMF07IC8vZ3JvdXAgcHJvcGVydHkgbmFtZVxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbGlzdCA9IHJlc3VsdEdyb3VwW2tleV07XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjb3VudCA9IGdyb3VwQ291bnRzW2tleV07XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fcmVuZGVyU2luZ2xlR3JvdXAobGlzdCwga2V5LCBjb3VudCk7XG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gYnVpbGRlcihSZXN1bHRzKTtcbiJdfQ==