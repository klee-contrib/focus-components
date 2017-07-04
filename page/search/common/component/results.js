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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJSZXN1bHRzIiwiZGlzcGxheU5hbWUiLCJnZXREZWZhdWx0UHJvcHMiLCJhY3Rpb24iLCJ1bmRlZmluZWQiLCJlbXB0eUNvbXBvbmVudCIsImdyb3VwQ29tcG9uZW50IiwiZ3JvdXBpbmdLZXkiLCJpZEZpZWxkIiwiaW5pdGlhbFJvd3NDb3VudCIsImlzU2VsZWN0aW9uIiwibGluZUNsaWNrSGFuZGxlciIsImxpbmVDb21wb25lbnRNYXBwZXIiLCJsaW5lT3BlcmF0aW9uTGlzdCIsImxpbmVTZWxlY3Rpb25IYW5kbGVyIiwic2NvcGVzQ29uZmlnIiwic2NvcGVGYWNldEtleSIsInNjcm9sbFBhcmVudFNlbGVjdG9yIiwic2VsZWN0aW9uU3RhdHVzIiwicmVuZGVyU2luZ2xlR3JvdXBEZWNvcmF0aW9uIiwicmVzdWx0c01hcCIsInJlc3VsdHNGYWNldHMiLCJzZWxlY3Rpb25SZXN1bHRzTWFwIiwic2hvd01vcmVBZGRpdGlvbmFsUm93cyIsInN0b3JlIiwidG90YWxDb3VudCIsImdldEluaXRpYWxTdGF0ZSIsImxvYWRpbmciLCJjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzIiwic3RhdGUiLCJzZXRTdGF0ZSIsIl9yZW5kZXJTaW5nbGVHcm91cCIsImxpc3QiLCJrZXkiLCJjb3VudCIsImlzVW5pcXVlIiwicHJvcHMiLCJjb25zb2xlIiwid2FybiIsIl9yZW5kZXJSZXN1bHRzTGlzdCIsIl9zaG93QWxsSGFuZGxlciIsIl9yZW5kZXJFbXB0eVJlc3VsdHMiLCJvdGhlclByb3BzIiwic2VsZWN0aW9uRGF0YSIsInNjb3BlIiwiZ2V0U2NvcGUiLCJsaW5lS2V5IiwiTGluZUNvbXBvbmVudCIsImhhc01vcmVEYXRhIiwibGVuZ3RoIiwiX29uU2Nyb2xsUmVhY2hlZEJvdHRvbSIsInNob3dBbGxIYW5kbGVyIiwic2VsZWN0ZWRTY29wZSIsIl9zY29wZVNlbGVjdGlvbkhhbmRsZXIiLCJmYWNldEtleSIsImZhY2V0VmFsdWUiLCJfZmFjZXRTZWxlY3Rpb25IYW5kbGVyIiwiX2dldFNob3dNb3JlSGFuZGxlciIsImdyb3Vwc1Jvd3NDb3VudHMiLCJ1cGRhdGVQcm9wZXJ0aWVzIiwidmFsdWUiLCJzZWxlY3RlZEZhY2V0cyIsImdldFNlbGVjdGVkRmFjZXRzIiwiZGF0YSIsImxhYmVsIiwic2VhcmNoIiwiX2dldEdyb3VwQ291bnRzIiwiaXNSZXN1bHRNYXBFbnRyeUFuQXJyYXkiLCJ0YXJnZXRGYWNldERhdGEiLCJzY29wZUZhY2V0IiwiZmFjZXREYXRhIiwicmVuZGVyIiwicmVzdWx0R3JvdXAiLCJwcm9wZXJ0eUdyb3VwTmFtZSIsImdyb3VwQ291bnRzIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFFQTs7QUFDQTs7QUFDQTs7QUFHQTs7OztBQUNBOztBQUNBOzs7Ozs7Nk5BWkE7OztBQVNBOzs7QUFLQTs7OztBQUlBLElBQU1BLFVBQVU7QUFDWkMsaUJBQWEsU0FERDtBQUVaOzs7O0FBSUFDLG1CQU5ZLDZCQU1NO0FBQ2QsZUFBTztBQUNIQyxvQkFBUUMsU0FETDtBQUVIQywyREFGRztBQUdIQyw0QkFBZ0JGLFNBSGI7QUFJSEcseUJBQWFILFNBSlY7QUFLSEkscUJBQVNKLFNBTE47QUFNSEssOEJBQWtCLENBTmY7QUFPSEMseUJBQWFOLFNBUFY7QUFRSE8sOEJBQWtCUCxTQVJmO0FBU0hRLGlDQUFxQlIsU0FUbEI7QUFVSFMsK0JBQW1CVCxTQVZoQjtBQVdIVSxrQ0FBc0JWLFNBWG5CO0FBWUhXLDBCQUFjWCxTQVpYO0FBYUhZLDJCQUFlLFdBYlo7QUFjSEMsa0NBQXNCYixTQWRuQjtBQWVIYyw2QkFBaUJkLFNBZmQ7QUFnQkhlLHlDQUE2QixJQWhCMUI7QUFpQkhDLHdCQUFZaEIsU0FqQlQ7QUFrQkhpQiwyQkFBZWpCLFNBbEJaO0FBbUJIa0IsaUNBQXFCbEIsU0FuQmxCO0FBb0JIbUIsb0NBQXdCLENBcEJyQjtBQXFCSEMs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QUFDN0Isd0JBQU12QyxNQUFNLGtCQUFLdUMsV0FBTCxFQUFrQixDQUFsQixDQUFaLENBRDZCLENBQ0s7QUFDbEMsd0JBQU14QyxPQUFPd0MsWUFBWXZDLEdBQVosQ0FBYjtBQUNBLHdCQUFNQyxRQUFRd0MsWUFBWXpDLEdBQVosQ0FBZDtBQUNBLDJCQUFPLE9BQUtGLGtCQUFMLENBQXdCQyxJQUF4QixFQUE4QkMsR0FBOUIsRUFBbUNDLEtBQW5DLENBQVA7QUFDSCxpQkFMRDtBQUZKLGFBREo7QUFZSDtBQUNKO0FBclZXLENBQWhCOztBQXlWQXlDLE9BQU9DLE9BQVAsR0FBaUIsdUJBQVE1RSxPQUFSLENBQWpCIiwiZmlsZSI6ImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIERlcGVuZGVuY2llc1xyXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQge3RyYW5zbGF0ZX0gZnJvbSAnZm9jdXMtY29yZS90cmFuc2xhdGlvbic7XHJcbmltcG9ydCBidWlsZGVyIGZyb20gJ2ZvY3VzLWNvcmUvY29tcG9uZW50L2J1aWxkZXInO1xyXG5cclxuaW1wb3J0IHthc3NpZ24sIG1hcFZhbHVlcywga2V5cywgb21pdH0gZnJvbSAnbG9kYXNoL29iamVjdCc7XHJcbmltcG9ydCB7Y2xvbmUsIGlzQXJyYXl9IGZyb20gJ2xvZGFzaC9sYW5nJztcclxuaW1wb3J0IHtmaWx0ZXIsIGZpbmQsIG1hcCwgZ3JvdXBCeX0gZnJvbSAnbG9kYXNoL2NvbGxlY3Rpb24nO1xyXG5cclxuLy8gQ29tcG9uZW50c1xyXG5pbXBvcnQgRGVmYXVsdEVtcHR5IGZyb20gJy4vZGVmYXVsdC1lbXB0eS1jb21wb25lbnQnO1xyXG5pbXBvcnQge2NvbXBvbmVudCBhcyBMaXN0U2VsZWN0aW9ufSBmcm9tICcuLi8uLi8uLi8uLi9saXN0L3NlbGVjdGlvbi9saXN0JztcclxuaW1wb3J0IHtjb21wb25lbnQgYXMgR3JvdXBXcmFwcGVyfSBmcm9tICcuL2dyb3VwLXdyYXBwZXInO1xyXG5cclxuLyoqXHJcbiogUmVzdWx0cyBjb21wb25lbnQsIHVzZWQgdG8gcmVuZGVyIHRoZSByZXN1bHRzLCBncm91cGVkIG9yIHVuZ3JvdXBlZFxyXG4qIEB0eXBlIHtPYmplY3R9XHJcbiovXHJcbmNvbnN0IFJlc3VsdHMgPSB7XHJcbiAgICBkaXNwbGF5TmFtZTogJ1Jlc3VsdHMnLFxyXG4gICAgLyoqXHJcbiAgICAqIEJ5IGRlZmF1bHQsIGFuIGVtcHR5IGNvbXBvbmVudCBpcyBwaWNrZWQuXHJcbiAgICAqIEByZXR1cm4ge09iamVjdH0gdGhlIGRlZmF1bHQgcHJvcHNcclxuICAgICovXHJcbiAgICBnZXREZWZhdWx0UHJvcHMoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgYWN0aW9uOiB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgIGVtcHR5Q29tcG9uZW50OiBEZWZhdWx0RW1wdHksXHJcbiAgICAgICAgICAgIGdyb3VwQ29tcG9uZW50OiB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgIGdyb3VwaW5nS2V5OiB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgIGlkRmllbGQ6IHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgaW5pdGlhbFJvd3NDb3VudDogMyxcclxuICAgICAgICAgICAgaXNTZWxlY3Rpb246IHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgbGluZUNsaWNrSGFuZGxlcjogdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICBsaW5lQ29tcG9uZW50TWFwcGVyOiB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgIGxpbmVPcGVyYXRpb25MaXN0OiB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgIGxpbmVTZWxlY3Rpb25IYW5kbGVyOiB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgIHNjb3Blc0NvbmZpZzogdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICBzY29wZUZhY2V0S2V5OiAnRkNUX1NDT1BFJyxcclxuICAgICAgICAgICAgc2Nyb2xsUGFyZW50U2VsZWN0b3I6IHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgc2VsZWN0aW9uU3RhdHVzOiB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgIHJlbmRlclNpbmdsZUdyb3VwRGVjb3JhdGlvbjogdHJ1ZSxcclxuICAgICAgICAgICAgcmVzdWx0c01hcDogdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICByZXN1bHRzRmFjZXRzOiB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgIHNlbGVjdGlvblJlc3VsdHNNYXA6IHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgc2hvd01vcmVBZGRpdGlvbmFsUm93czogNSxcclxuICAgICAgICAgICAgc3RvcmU6IHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgdG90YWxDb3VudDogdW5kZWZpbmVkXHJcbiAgICAgICAgfTtcclxuICAgIH0sXHJcbiAgICAvKipcclxuICAgICogSW5pdGlhbCBzdGF0ZVxyXG4gICAgKiBAcmV0dXJuIHtPYmplY3R9IEluaXRpYWwgc3RhdGVcclxuICAgICovXHJcbiAgICBnZXRJbml0aWFsU3RhdGUoKSB7XHJcbiAgICAgICAgcmV0dXJuICh7XHJcbiAgICAgICAgICAgIGxvYWRpbmc6IGZhbHNlXHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgLyoqXHJcbiAgICAqIENvbXBvbmVudCB3aWxsIHJlY2VpdmUgcHJvcHNcclxuICAgICovXHJcbiAgICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKCkge1xyXG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmxvYWRpbmcpIHtcclxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgICAgICAgICBsb2FkaW5nOiBmYWxzZVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgKiBSZW5kZXIgYSBzaW5nbGUgZ3JvdXAgb2YgcmVzdWx0cywgdXNpbmcgdGhlIGdyb3VwIGNvbXBvbmVudCBnaXZlbiBhcyBhIHByb3AuXHJcbiAgICAqIEBwYXJhbSAge2FycmF5fSBsaXN0IHRoZSByZXN1bHRzIGxpc3RcclxuICAgICogQHBhcmFtICB7c3RyaW5nfSBrZXkgIHRoZSBncm91cCBrZXlcclxuICAgICogQHBhcmFtICB7aW50fSBjb3VudCAgdGhlIGdyb3VwJ3MgcmVzdWx0cyBjb3VudFxyXG4gICAgKiBAcGFyYW0gIHtib29sfSBpc1VuaXF1ZSAgaXMgdGhpcyB0aGUgb25seSByZW5kZXJlZCBncm91cFxyXG4gICAgKiBAcmV0dXJuIHtITVRMfSAgICAgIHRoZSByZW5kZXJlZCBncm91cFxyXG4gICAgKi9cclxuICAgIF9yZW5kZXJTaW5nbGVHcm91cChsaXN0LCBrZXksIGNvdW50LCBpc1VuaXF1ZSkge1xyXG4gICAgICAgIGNvbnN0IHtpbml0aWFsUm93c0NvdW50fSA9IHRoaXMucHJvcHM7XHJcbiAgICAgICAgaWYodGhpcy5wcm9wcy5yZW5kZXJTaW5nbGVHcm91cERlY29yYXRpb24gJiYgIXRoaXMucHJvcHMuZ3JvdXBDb21wb25lbnQpIHtcclxuICAgICAgICAgICAgY29uc29sZS53YXJuKCdZb3UgYXJlIHRyeWluZyB0byB3cmFwIHlvdXIgbGlzdCBpbiBhIGdyb3VwIHdpdGhvdXQgYSBncm91cENvbXBvbmVudC4gUGxlYXNlIGdpdmUgb25lIG9yIHNldCBcInJlbmRlclNpbmdsZUdyb3VwRGVjb3JhdGlvblwiIHRvIGZhbHNlLicpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGlzVW5pcXVlKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnByb3BzLnJlbmRlclNpbmdsZUdyb3VwRGVjb3JhdGlvbikge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICAgICAgICA8R3JvdXBXcmFwcGVyXHJcbiAgICAgICAgICAgICAgICAgICAgY291bnQ9e2NvdW50fVxyXG4gICAgICAgICAgICAgICAgICAgIGdyb3VwQ29tcG9uZW50PXt0aGlzLnByb3BzLmdyb3VwQ29tcG9uZW50fVxyXG4gICAgICAgICAgICAgICAgICAgIGdyb3VwS2V5PXtrZXl9XHJcbiAgICAgICAgICAgICAgICAgICAgaW5pdGlhbFJvd3NDb3VudD17aW5pdGlhbFJvd3NDb3VudH1cclxuICAgICAgICAgICAgICAgICAgICBpc1VuaXF1ZVxyXG4gICAgICAgICAgICAgICAgICAgIGxpc3Q9e2xpc3R9XHJcbiAgICAgICAgICAgICAgICAgICAgcmVmPXtgZ3JvdXAtJHtrZXl9YH1cclxuICAgICAgICAgICAgICAgICAgICByZW5kZXJSZXN1bHRzTGlzdD17dGhpcy5fcmVuZGVyUmVzdWx0c0xpc3R9XHJcbiAgICAgICAgICAgICAgICAgICAgc2hvd0FsbEhhbmRsZXI9e3RoaXMuX3Nob3dBbGxIYW5kbGVyfVxyXG4gICAgICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3JlbmRlclJlc3VsdHNMaXN0KGxpc3QsIGtleSwgY291bnQsIHRydWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICAgIDxHcm91cFdyYXBwZXJcclxuICAgICAgICAgICAgICAgIGNvdW50PXtjb3VudH1cclxuICAgICAgICAgICAgICAgIGdyb3VwQ29tcG9uZW50PXt0aGlzLnByb3BzLmdyb3VwQ29tcG9uZW50fVxyXG4gICAgICAgICAgICAgICAgZ3JvdXBLZXk9e2tleX1cclxuICAgICAgICAgICAgICAgIGluaXRpYWxSb3dzQ291bnQ9e2luaXRpYWxSb3dzQ291bnR9XHJcbiAgICAgICAgICAgICAgICBrZXk9e2tleX1cclxuICAgICAgICAgICAgICAgIGxpc3Q9e2xpc3R9XHJcbiAgICAgICAgICAgICAgICByZWY9e2Bncm91cC0ke2tleX1gfVxyXG4gICAgICAgICAgICAgICAgcmVuZGVyUmVzdWx0c0xpc3Q9e3RoaXMuX3JlbmRlclJlc3VsdHNMaXN0fVxyXG4gICAgICAgICAgICAgICAgc2hvd0FsbEhhbmRsZXI9e3RoaXMuX3Nob3dBbGxIYW5kbGVyfVxyXG4gICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgLyoqXHJcbiAgICAqIFJlbmRlciB0aGUgZW1wdHkgY29tcG9uZW50IGdpdmVuIGFzIGEgcHJvcCB3aGVuIHRoZSByZXN1bHQgbWFwIGlzIGVtcHR5LlxyXG4gICAgKiBAcmV0dXJuIHtITVRMfSAgICAgIHRoZSByZW5kZXJlZCBjb21wb25lbnRcclxuICAgICovXHJcbiAgICBfcmVuZGVyRW1wdHlSZXN1bHRzKCkge1xyXG4gICAgICAgIHJldHVybiA8dGhpcy5wcm9wcy5lbXB0eUNvbXBvbmVudC8+O1xyXG4gICAgfSxcclxuICAgIC8qKlxyXG4gICAgKiBSZW5kZXIgdGhlIHJlc3VsdHMgbGlzdFxyXG4gICAgKiBAcGFyYW0gIHtBcnJheX0gIGxpc3QgICAgIHRoZSByZXN1bHRzIGxpc3RcclxuICAgICogQHBhcmFtICB7c3RyaW5nfSAga2V5ICAgICAgdGhlIGdyb3VwIGtleVxyXG4gICAgKiBAcGFyYW0gIHtpbnRlZ2VyfSAgY291bnQgICAgdGhlIGdyb3VwIGNvdW50XHJcbiAgICAqIEBwYXJhbSAge0Jvb2xlYW59IGlzVW5pcXVlIHRydWUgaWYgdGhpcyBpcyB0aGUgb25seSBncm91cCByZW5kZXJlZFxyXG4gICAgKiBAcmV0dXJuIHtIVE1MfSAgICAgICAgICB0aGUgcmVuZGVyZWQgY29tcG9uZW50XHJcbiAgICAqL1xyXG4gICAgX3JlbmRlclJlc3VsdHNMaXN0KGxpc3QsIGtleSwgY291bnQsIGlzVW5pcXVlKSB7XHJcbiAgICAgICAgbGV0IHtcclxuICAgICAgICAgICAgbGluZUNvbXBvbmVudE1hcHBlcixcclxuICAgICAgICAgICAgaWRGaWVsZCxcclxuICAgICAgICAgICAgaXNTZWxlY3Rpb24sXHJcbiAgICAgICAgICAgIGxpbmVTZWxlY3Rpb25IYW5kbGVyLFxyXG4gICAgICAgICAgICBsaW5lQ2xpY2tIYW5kbGVyLFxyXG4gICAgICAgICAgICBsaW5lT3BlcmF0aW9uTGlzdCxcclxuICAgICAgICAgICAgc2Nyb2xsUGFyZW50U2VsZWN0b3IsXHJcbiAgICAgICAgICAgIHNlbGVjdGlvblN0YXR1cyxcclxuICAgICAgICAgICAgc2VsZWN0aW9uUmVzdWx0c01hcCxcclxuICAgICAgICAgICAgLi4ub3RoZXJQcm9wc1xyXG4gICAgICAgIH0gPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIGNvbnN0IHNlbGVjdGlvbkRhdGEgPSBzZWxlY3Rpb25SZXN1bHRzTWFwID8gc2VsZWN0aW9uUmVzdWx0c01hcFtrZXldIHx8IFtdIDogW107XHJcbiAgICAgICAgY29uc3Qgc2NvcGUgPSBvdGhlclByb3BzLnN0b3JlLmdldFNjb3BlKCk7XHJcbiAgICAgICAgY29uc3QgbGluZUtleSA9IHNjb3BlID09PSB1bmRlZmluZWQgfHwgc2NvcGUgPT09ICdBTEwnID8ga2V5IDogc2NvcGU7XHJcbiAgICAgICAgY29uc3QgTGluZUNvbXBvbmVudCA9IGxpbmVDb21wb25lbnRNYXBwZXIobGluZUtleSwgbGlzdCk7XHJcbiAgICAgICAgY29uc3QgaGFzTW9yZURhdGEgPSBpc1VuaXF1ZSAhPT0gdW5kZWZpbmVkICYmIGlzVW5pcXVlICYmIGxpc3QubGVuZ3RoIDwgY291bnQ7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdj5cclxuICAgICAgICAgICAgPExpc3RTZWxlY3Rpb25cclxuICAgICAgICAgICAgZGF0YT17bGlzdH1cclxuICAgICAgICAgICAgZGF0YS1mb2N1cz0ncmVzdWx0cy1saXN0J1xyXG4gICAgICAgICAgICBmZXRjaE5leHRQYWdlPXt0aGlzLl9vblNjcm9sbFJlYWNoZWRCb3R0b219XHJcbiAgICAgICAgICAgIGhhc01vcmVEYXRhPXtoYXNNb3JlRGF0YX1cclxuICAgICAgICAgICAgaWRGaWVsZD17aWRGaWVsZH1cclxuICAgICAgICAgICAgaXNTZWxlY3Rpb249e2lzU2VsZWN0aW9ufVxyXG4gICAgICAgICAgICBMaW5lQ29tcG9uZW50PXtMaW5lQ29tcG9uZW50fVxyXG4gICAgICAgICAgICBvbkxpbmVDbGljaz17bGluZUNsaWNrSGFuZGxlcn1cclxuICAgICAgICAgICAgb25TZWxlY3Rpb249e2xpbmVTZWxlY3Rpb25IYW5kbGVyfVxyXG4gICAgICAgICAgICBvcGVyYXRpb25MaXN0PXtsaW5lT3BlcmF0aW9uTGlzdH1cclxuICAgICAgICAgICAgcGFyZW50U2VsZWN0b3I9e3Njcm9sbFBhcmVudFNlbGVjdG9yfVxyXG4gICAgICAgICAgICByZWY9e2BsaXN0LSR7a2V5fWB9XHJcbiAgICAgICAgICAgIHNlbGVjdGlvbkRhdGE9e3NlbGVjdGlvbkRhdGF9XHJcbiAgICAgICAgICAgIHNlbGVjdGlvblN0YXR1cz17c2VsZWN0aW9uU3RhdHVzfVxyXG4gICAgICAgICAgICB7Li4ub3RoZXJQcm9wc31cclxuICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAge3RoaXMuc3RhdGUubG9hZGluZyAmJlxyXG4gICAgICAgICAgICAgICAgPGRpdiBkYXRhLWZvY3VzPSdsb2FkaW5nLW1vcmUtcmVzdWx0cyc+XHJcbiAgICAgICAgICAgICAgICB7dHJhbnNsYXRlKCdzZWFyY2gubG9hZGluZ01vcmUnKX1cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgKiBDb25zdHJ1Y3QgdGhlIHNob3cgYWxsIGFjdGlvblxyXG4gICAgKiBAcGFyYW0gIHtzdHJpbmd9IGtleSB0aGUgZ3JvdXAga2V5IHdoZXJlIHRoZSBzaG93IGFsbCBoYXMgYmVlbiBjbGlja2VkXHJcbiAgICAqL1xyXG4gICAgX3Nob3dBbGxIYW5kbGVyKGtleSkge1xyXG4gICAgICAgIGNvbnN0IHtzaG93QWxsSGFuZGxlciwgcmVzdWx0c0ZhY2V0cywgc2NvcGVGYWNldEtleSwgZ3JvdXBpbmdLZXksIHNjb3Blc0NvbmZpZ30gPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIGxldCBzZWxlY3RlZFNjb3BlID0ga2V5O1xyXG4gICAgICAgIGlmIChzY29wZXNDb25maWcgJiYga2V5ICYmIHNjb3Blc0NvbmZpZ1trZXldKSB7XHJcbiAgICAgICAgICAgIHNlbGVjdGVkU2NvcGUgPSBzY29wZXNDb25maWdba2V5XTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHJlc3VsdHNGYWNldHNbc2NvcGVGYWNldEtleV0pIHtcclxuICAgICAgICAgICAgdGhpcy5fc2NvcGVTZWxlY3Rpb25IYW5kbGVyKHNlbGVjdGVkU2NvcGUpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGxldCBmYWNldEtleSA9IGdyb3VwaW5nS2V5O1xyXG4gICAgICAgICAgICBsZXQgZmFjZXRWYWx1ZSA9IHNlbGVjdGVkU2NvcGU7XHJcbiAgICAgICAgICAgIHRoaXMuX2ZhY2V0U2VsZWN0aW9uSGFuZGxlcihmYWNldEtleSwgZmFjZXRWYWx1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIENhbGxlZCBpZiBkZWZpbmVkIChtYXkgYmUgdXNlZCBpbiB0aGUgcXVpY2sgc2VhcmNoIHRvIGNsb3NlIHRoZSBwb3Bpbi4pXHJcbiAgICAgICAgaWYoc2hvd0FsbEhhbmRsZXIpIHtcclxuICAgICAgICAgICAgc2hvd0FsbEhhbmRsZXIoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfSxcclxuICAgIC8qKlxyXG4gICAgKiBDb25zdHJ1Y3QgdGhlIHNob3cgbW9yZSBoYW5kbGVyXHJcbiAgICAqIEBwYXJhbSAge3N0cmluZ30ga2V5IHRoZSBncm91cCBrZXkgd2hlcmUgdGhlIHNob3cgbW9yZSBoYXMgYmVlbiBjbGlja2VkXHJcbiAgICAqIEByZXR1cm4ge2Z1bmN0aW9ufSAgICAgdGhlIHNob3cgbW9yZSBoYW5kbGVyXHJcbiAgICAqL1xyXG4gICAgX2dldFNob3dNb3JlSGFuZGxlcihrZXkpIHtcclxuICAgICAgICByZXR1cm4gKCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgZ3JvdXBzUm93c0NvdW50cyA9IGNsb25lKHRoaXMuc3RhdGUuZ3JvdXBzUm93c0NvdW50cyk7XHJcbiAgICAgICAgICAgIGdyb3Vwc1Jvd3NDb3VudHNba2V5XSA9IGdyb3Vwc1Jvd3NDb3VudHNba2V5XSA/IGdyb3Vwc1Jvd3NDb3VudHNba2V5XSArIHRoaXMucHJvcHMuc2hvd01vcmVBZGRpdGlvbmFsUm93cyA6IHRoaXMucHJvcHMuaW5pdGlhbFJvd3NDb3VudDtcclxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7Z3JvdXBzUm93c0NvdW50c30pO1xyXG4gICAgICAgIH07XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgKiBTY29wZSBzZWxlY3Rpb24gaGFuZGxlclxyXG4gICAgKiBAcGFyYW0gIHtzdHJpbmd9IGtleSB0aGUgc2NvcGUga2V5XHJcbiAgICAqL1xyXG4gICAgX3Njb3BlU2VsZWN0aW9uSGFuZGxlcihrZXkpIHtcclxuICAgICAgICB0aGlzLnByb3BzLmFjdGlvbi51cGRhdGVQcm9wZXJ0aWVzKHtcclxuICAgICAgICAgICAgc2NvcGU6IGtleVxyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuICAgIC8qKlxyXG4gICAgKiBGYWNldCBzZWxlY3Rpb24gaGFuZGxlclxyXG4gICAgKiBAcGFyYW0gIHtzdHJpbmd9IGtleSB0aGUgZmFjZXQga2V5XHJcbiAgICAqIEBwYXJhbSAge3N0cmluZ30gdmFsdWUgdGhlIGZhY2V0IHZhbHVlXHJcbiAgICAqL1xyXG4gICAgX2ZhY2V0U2VsZWN0aW9uSGFuZGxlcihrZXksIHZhbHVlKSB7XHJcbiAgICAgICAgbGV0IHNlbGVjdGVkRmFjZXRzID0gYXNzaWduKHt9LCB0aGlzLnByb3BzLnN0b3JlLmdldFNlbGVjdGVkRmFjZXRzKCksIHtcclxuICAgICAgICAgICAgW2tleV06IHtcclxuICAgICAgICAgICAgICAgIGtleTogdmFsdWUsXHJcbiAgICAgICAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IHZhbHVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvdW50OiAwXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLnByb3BzLmFjdGlvbi51cGRhdGVQcm9wZXJ0aWVzKHtcclxuICAgICAgICAgICAgZ3JvdXBpbmdLZXk6IHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgc2VsZWN0ZWRGYWNldHNcclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcbiAgICAvKipcclxuICAgICogU2Nyb2xsIHJlYWNoZWQgYm90dG9tIGhhbmRsZXJcclxuICAgICovXHJcbiAgICBfb25TY3JvbGxSZWFjaGVkQm90dG9tKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5zdGF0ZS5sb2FkaW5nKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgICAgICAgICAgbG9hZGluZzogdHJ1ZVxyXG4gICAgICAgICAgICB9LCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnByb3BzLmFjdGlvbi5zZWFyY2godHJ1ZSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgKiBHZXQgdGhlIGdyb3VwIGNvdW50cyBvYmplY3RcclxuICAgICogQHBhcmFtICB7b2JqZWN0fSByZXN1bHRzTWFwIHRoZSByZXN1bHRzIG1hcFxyXG4gICAgKiBAcmV0dXJuIHtvYmplY3R9ICAgICAgICAgICB0aGUgY291bnRzIG1hcFxyXG4gICAgKi9cclxuICAgIF9nZXRHcm91cENvdW50cyhyZXN1bHRzTWFwKSB7XHJcbiAgICAgICAgcmVzdWx0c01hcCA9IHJlc3VsdHNNYXAgPyByZXN1bHRzTWFwIDogdGhpcy5wcm9wcy5yZXN1bHRzTWFwO1xyXG4gICAgICAgIC8vIHJlc3VsdE1hcCBjYW4gYmUgZWl0aGVyIGFuIEFycmF5IG9yIGFuIE9iamVjdCBkZXBlbmRpbmcgb2YgdGhlIHNlYXJjaCBiZWluZyBncm91cGVkIG9yIG5vdC5cclxuICAgICAgICBpZiAocmVzdWx0c01hcCAmJiBpc0FycmF5KHJlc3VsdHNNYXApICYmIDEgPT09IHJlc3VsdHNNYXAubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIC8vQ2hlY2sgaWYgdGhlIHJlc3VsdE1hcCBjb250YWlucyBhbiBlbnRyeSB3aGljaCBpcyBhbiBhcnJheS5cclxuICAgICAgICAgICAgY29uc3QgaXNSZXN1bHRNYXBFbnRyeUFuQXJyYXkgPSBpc0FycmF5KHJlc3VsdHNNYXBbMF0pO1xyXG4gICAgICAgICAgICBpZihpc1Jlc3VsdE1hcEVudHJ5QW5BcnJheSkge1xyXG4gICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgIFtyZXN1bHRzTWFwWzBdWzBdXToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgY291bnQ6IHRoaXMucHJvcHMudG90YWxDb3VudFxyXG4gICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvL3RoaXMgY2FzZSBvY2N1cnMgd2hlbiB0aGUgc2VydmVyIHJlc3BvbnNlIGNvbnRhaW5zIG9ubHkgb25lIGdyb3VwIHdpdGggcmVzdWx0cy5cclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIFtrZXlzKHJlc3VsdHNNYXBbMF0pXToge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvdW50OiB0aGlzLnByb3BzLnRvdGFsQ291bnRcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9IGVsc2UgaWYgKDEgPT09IGtleXMocmVzdWx0c01hcCkubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICBba2V5cyhyZXN1bHRzTWFwKVswXV06IHtcclxuICAgICAgICAgICAgICAgICAgICBjb3VudDogdGhpcy5wcm9wcy50b3RhbENvdW50XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBoZXJlIDogZ3JvdXBlZCBsaXN0XHJcbiAgICAgICAgbGV0IHRhcmdldEZhY2V0RGF0YTtcclxuICAgICAgICBjb25zdCB7cmVzdWx0c0ZhY2V0c30gPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIGlmKHJlc3VsdHNGYWNldHMpIHtcclxuICAgICAgICAgICAgY29uc3Qge3Njb3BlRmFjZXRLZXksIGdyb3VwaW5nS2V5fSA9IHRoaXMucHJvcHM7XHJcbiAgICAgICAgICAgIGNvbnN0IGtleSA9IGdyb3VwaW5nS2V5ID09PSB1bmRlZmluZWQgPyBzY29wZUZhY2V0S2V5IDogZ3JvdXBpbmdLZXk7XHJcbiAgICAgICAgICAgIGNvbnN0IHNjb3BlRmFjZXQgPSByZXN1bHRzRmFjZXRzW2tleV07XHJcbiAgICAgICAgICAgIHJldHVybiBtYXBWYWx1ZXMoZ3JvdXBCeShzY29wZUZhY2V0LCAnbGFiZWwnKSwgKGZhY2V0RGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhY2V0RGF0YVswXS5jb3VudDtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiAwO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICogUmVuZGVyIHRoZSB3aG9sZSBjb21wb25lbnRcclxuICAgICogQHJldHVybiB7SE1UTH0gICAgICB0aGUgcmVuZGVyZWQgY29tcG9uZW50XHJcbiAgICAqL1xyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIC8vIElmIHRoZXJlIGlzIG5vIHJlc3VsdCwgcmVuZGVyIHRoZSBnaXZlbiBlbXB0eSBjb21wb25lbnRcclxuICAgICAgICBpZiAoMCA9PT0gdGhpcy5wcm9wcy50b3RhbENvdW50KSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9yZW5kZXJFbXB0eVJlc3VsdHMoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCByZXN1bHRzTWFwO1xyXG5cclxuICAgICAgICAvLyByZXN1bHRzTWFwIGNhbiBiZSBhbiBBcnJheSBvciBhbiBPYmplY3QuXHJcbiAgICAgICAgaWYgKGlzQXJyYXkodGhpcy5wcm9wcy5yZXN1bHRzTWFwKSkge1xyXG4gICAgICAgICAgICByZXN1bHRzTWFwID0gZmlsdGVyKHRoaXMucHJvcHMucmVzdWx0c01hcCwgZnVuY3Rpb24gKHJlc3VsdEdyb3VwKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBwcm9wZXJ0eUdyb3VwTmFtZSA9IGtleXMocmVzdWx0R3JvdXApWzBdOyAvL2dyb3VwIHByb3BlcnR5IG5hbWVcclxuICAgICAgICAgICAgICAgIGNvbnN0IGxpc3QgPSByZXN1bHRHcm91cFtwcm9wZXJ0eUdyb3VwTmFtZV07XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gMCAhPT0gbGlzdC5sZW5ndGg7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJlc3VsdHNNYXAgPSBvbWl0KHRoaXMucHJvcHMucmVzdWx0c01hcCwgZnVuY3Rpb24gKHJlc3VsdEdyb3VwKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBwcm9wZXJ0eUdyb3VwTmFtZSA9IGtleXMocmVzdWx0R3JvdXApWzBdOyAvL2dyb3VwIHByb3BlcnR5IG5hbWVcclxuICAgICAgICAgICAgICAgIGNvbnN0IGxpc3QgPSByZXN1bHRHcm91cFtwcm9wZXJ0eUdyb3VwTmFtZV07XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gMCA9PT0gbGlzdC5sZW5ndGg7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gR2V0IHRoZSBjb3VudCBmb3IgZWFjaCBncm91cFxyXG4gICAgICAgIGNvbnN0IGdyb3VwQ291bnRzID0gdGhpcy5fZ2V0R3JvdXBDb3VudHMocmVzdWx0c01hcCk7XHJcbiAgICAgICAgLy8gQ2hlY2sgaWYgdGhlcmUgaXMgb25seSBvbmUgZ3JvdXAgbGVmdFxyXG5cclxuICAgICAgICBpZiAoaXNBcnJheShyZXN1bHRzTWFwKSAmJiAxID09PSByZXN1bHRzTWFwLmxlbmd0aCkge1xyXG4gICAgICAgICAgICBjb25zdCBrZXkgPSBrZXlzKHJlc3VsdHNNYXBbMF0pWzBdO1xyXG4gICAgICAgICAgICBjb25zdCBsaXN0ID0gcmVzdWx0c01hcFswXVtrZXldO1xyXG4gICAgICAgICAgICBjb25zdCBjb3VudCA9IGdyb3VwQ291bnRzW2tleV0uY291bnQ7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9yZW5kZXJTaW5nbGVHcm91cChsaXN0LCBrZXksIGNvdW50LCB0cnVlKTtcclxuICAgICAgICB9IGVsc2UgaWYgKDEgPT09IGtleXMocmVzdWx0c01hcCkubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGtleSA9IGtleXMocmVzdWx0c01hcClbMF07XHJcbiAgICAgICAgICAgIGNvbnN0IGxpc3QgPSByZXN1bHRzTWFwW2tleV07XHJcbiAgICAgICAgICAgIGNvbnN0IGNvdW50ID0gZ3JvdXBDb3VudHNba2V5XS5jb3VudDtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3JlbmRlclNpbmdsZUdyb3VwKGxpc3QsIGtleSwgY291bnQsIHRydWUpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICA8ZGl2IGRhdGEtZm9jdXM9J3NlYXJjaC1yZXN1bHRzJz5cclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBtYXAocmVzdWx0c01hcCwgKHJlc3VsdEdyb3VwKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGtleSA9IGtleXMocmVzdWx0R3JvdXApWzBdOyAvL2dyb3VwIHByb3BlcnR5IG5hbWVcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbGlzdCA9IHJlc3VsdEdyb3VwW2tleV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGNvdW50ID0gZ3JvdXBDb3VudHNba2V5XTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3JlbmRlclNpbmdsZUdyb3VwKGxpc3QsIGtleSwgY291bnQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gYnVpbGRlcihSZXN1bHRzKTtcclxuIl19