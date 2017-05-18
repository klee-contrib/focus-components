'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _translation = require('focus-core/translation');

var _builder = require('focus-core/component/builder');

var _builder2 = _interopRequireDefault(_builder);

var _defaultEmptyComponent = require('./default-empty-component');

var _defaultEmptyComponent2 = _interopRequireDefault(_defaultEmptyComponent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

// Dependencies
var React = require('react');

var assign = require('lodash/object/assign');
var clone = require('lodash/lang/clone');
var filter = require('lodash/collection/filter');
var find = require('lodash/collection/find');
var keys = require('lodash/object/keys');
var isArray = require('lodash/lang/isArray');
var map = require('lodash/collection/map');
var mapValues = require('lodash/object/mapValues');
var omit = require('lodash/object/omit');

// Components

var ListSelection = require('../../../../list/selection').list.component;
var GroupWrapper = require('./group-wrapper').component;

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
                return React.createElement(GroupWrapper, {
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
            return React.createElement(GroupWrapper, {
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
        return React.createElement(this.props.emptyComponent, null);
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
        return React.createElement(
            'div',
            null,
            React.createElement(ListSelection, _extends({
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
            this.state.loading && React.createElement(
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
            var groupsRowsCounts = clone(_this.state.groupsRowsCounts);
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
        var selectedFacets = assign({}, this.props.store.getSelectedFacets(), _defineProperty({}, key, {
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
        if (resultsMap && isArray(resultsMap) && 1 === resultsMap.length) {
            //Check if the resultMap contains an entry which is an array.
            var isResultMapEntryAnArray = isArray(resultsMap[0]);
            if (isResultMapEntryAnArray) {
                return _defineProperty({}, resultsMap[0][0], {
                    count: this.props.totalCount
                });
            }
            //this case occurs when the server response contains only one group with results.
            return _defineProperty({}, keys(resultsMap[0]), {
                count: this.props.totalCount
            });
        } else if (1 === keys(resultsMap).length) {
            return _defineProperty({}, keys(resultsMap)[0], {
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
            return mapValues(scopeFacet, function (facetData) {
                return facetData.count;
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
        if (isArray(this.props.resultsMap)) {
            resultsMap = filter(this.props.resultsMap, function (resultGroup) {
                var propertyGroupName = keys(resultGroup)[0]; //group property name
                var list = resultGroup[propertyGroupName];
                return 0 !== list.length;
            });
        } else {
            resultsMap = omit(this.props.resultsMap, function (resultGroup) {
                var propertyGroupName = keys(resultGroup)[0]; //group property name
                var list = resultGroup[propertyGroupName];
                return 0 === list.length;
            });
        }

        // Get the count for each group
        var groupCounts = this._getGroupCounts(resultsMap);
        // Check if there is only one group left

        if (isArray(resultsMap) && 1 === resultsMap.length) {
            var key = keys(resultsMap[0])[0];
            var list = resultsMap[0][key];
            var count = groupCounts[key].count;
            return this._renderSingleGroup(list, key, count, true);
        } else if (1 === keys(resultsMap).length) {
            var _key = keys(resultsMap)[0];
            var _list = resultsMap[_key];
            var _count = groupCounts[_key].count;
            return this._renderSingleGroup(_list, _key, _count, true);
        } else {
            return React.createElement(
                'div',
                { 'data-focus': 'search-results' },
                map(resultsMap, function (resultGroup) {
                    var key = keys(resultGroup)[0]; //group property name
                    var list = resultGroup[key];
                    var count = groupCounts[key];
                    return _this3._renderSingleGroup(list, key, count);
                })
            );
        }
    }
};

module.exports = (0, _builder2.default)(Results);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJSZWFjdCIsInJlcXVpcmUiLCJhc3NpZ24iLCJjbG9uZSIsImZpbHRlciIsImZpbmQiLCJrZXlzIiwiaXNBcnJheSIsIm1hcCIsIm1hcFZhbHVlcyIsIm9taXQiLCJMaXN0U2VsZWN0aW9uIiwibGlzdCIsImNvbXBvbmVudCIsIkdyb3VwV3JhcHBlciIsIlJlc3VsdHMiLCJkaXNwbGF5TmFtZSIsImdldERlZmF1bHRQcm9wcyIsImFjdGlvbiIsInVuZGVmaW5lZCIsImVtcHR5Q29tcG9uZW50IiwiZ3JvdXBDb21wb25lbnQiLCJncm91cGluZ0tleSIsImlkRmllbGQiLCJpbml0aWFsUm93c0NvdW50IiwiaXNTZWxlY3Rpb24iLCJsaW5lQ2xpY2tIYW5kbGVyIiwibGluZUNvbXBvbmVudE1hcHBlciIsImxpbmVPcGVyYXRpb25MaXN0IiwibGluZVNlbGVjdGlvbkhhbmRsZXIiLCJzY29wZXNDb25maWciLCJzY29wZUZhY2V0S2V5Iiwic2Nyb2xsUGFyZW50U2VsZWN0b3IiLCJzZWxlY3Rpb25TdGF0dXMiLCJyZW5kZXJTaW5nbGVHcm91cERlY29yYXRpb24iLCJyZXN1bHRzTWFwIiwicmVzdWx0c0ZhY2V0cyIsInNlbGVjdGlvblJlc3VsdHNNYXAiLCJzaG93TW9yZUFkZGl0aW9uYWxSb3dzIiwic3RvcmUiLCJ0b3RhbENvdW50IiwiZ2V0SW5pdGlhbFN0YXRlIiwibG9hZGluZyIsImNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMiLCJzdGF0ZSIsInNldFN0YXRlIiwiX3JlbmRlclNpbmdsZUdyb3VwIiwia2V5IiwiY291bnQiLCJpc1VuaXF1ZSIsInByb3BzIiwiY29uc29sZSIsIndhcm4iLCJfcmVuZGVyUmVzdWx0c0xpc3QiLCJfc2hvd0FsbEhhbmRsZXIiLCJfcmVuZGVyRW1wdHlSZXN1bHRzIiwib3RoZXJQcm9wcyIsInNlbGVjdGlvbkRhdGEiLCJzY29wZSIsImdldFNjb3BlIiwibGluZUtleSIsIkxpbmVDb21wb25lbnQiLCJoYXNNb3JlRGF0YSIsImxlbmd0aCIsIl9vblNjcm9sbFJlYWNoZWRCb3R0b20iLCJzaG93QWxsSGFuZGxlciIsInNlbGVjdGVkU2NvcGUiLCJfc2NvcGVTZWxlY3Rpb25IYW5kbGVyIiwiZmFjZXRLZXkiLCJmYWNldFZhbHVlIiwiX2ZhY2V0U2VsZWN0aW9uSGFuZGxlciIsIl9nZXRTaG93TW9yZUhhbmRsZXIiLCJncm91cHNSb3dzQ291bnRzIiwidXBkYXRlUHJvcGVydGllcyIsInZhbHVlIiwic2VsZWN0ZWRGYWNldHMiLCJnZXRTZWxlY3RlZEZhY2V0cyIsImRhdGEiLCJsYWJlbCIsInNlYXJjaCIsIl9nZXRHcm91cENvdW50cyIsImlzUmVzdWx0TWFwRW50cnlBbkFycmF5IiwidGFyZ2V0RmFjZXREYXRhIiwic2NvcGVGYWNldCIsImZhY2V0RGF0YSIsInJlbmRlciIsInJlc3VsdEdyb3VwIiwicHJvcGVydHlHcm91cE5hbWUiLCJncm91cENvdW50cyIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7QUFHQTs7QUFDQTs7OztBQWFBOzs7Ozs7Ozs7O0FBakJBO0FBQ0EsSUFBTUEsUUFBUUMsUUFBUSxPQUFSLENBQWQ7O0FBS0EsSUFBTUMsU0FBU0QsUUFBUSxzQkFBUixDQUFmO0FBQ0EsSUFBTUUsUUFBUUYsUUFBUSxtQkFBUixDQUFkO0FBQ0EsSUFBTUcsU0FBU0gsUUFBUSwwQkFBUixDQUFmO0FBQ0EsSUFBTUksT0FBT0osUUFBUSx3QkFBUixDQUFiO0FBQ0EsSUFBTUssT0FBT0wsUUFBUSxvQkFBUixDQUFiO0FBQ0EsSUFBTU0sVUFBVU4sUUFBUSxxQkFBUixDQUFoQjtBQUNBLElBQU1PLE1BQU1QLFFBQVEsdUJBQVIsQ0FBWjtBQUNBLElBQU1RLFlBQVlSLFFBQVEseUJBQVIsQ0FBbEI7QUFDQSxJQUFNUyxPQUFPVCxRQUFRLG9CQUFSLENBQWI7O0FBRUE7O0FBRUEsSUFBTVUsZ0JBQWdCVixRQUFRLDRCQUFSLEVBQXNDVyxJ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c291cmNlc0NvbnRlbnQiOlsiLy8gRGVwZW5kZW5jaWVzXHJcbmNvbnN0IFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcclxuXHJcbmltcG9ydCB7dHJhbnNsYXRlfSBmcm9tICdmb2N1cy1jb3JlL3RyYW5zbGF0aW9uJztcclxuaW1wb3J0IGJ1aWxkZXIgZnJvbSAnZm9jdXMtY29yZS9jb21wb25lbnQvYnVpbGRlcic7XHJcblxyXG5jb25zdCBhc3NpZ24gPSByZXF1aXJlKCdsb2Rhc2gvb2JqZWN0L2Fzc2lnbicpO1xyXG5jb25zdCBjbG9uZSA9IHJlcXVpcmUoJ2xvZGFzaC9sYW5nL2Nsb25lJyk7XHJcbmNvbnN0IGZpbHRlciA9IHJlcXVpcmUoJ2xvZGFzaC9jb2xsZWN0aW9uL2ZpbHRlcicpO1xyXG5jb25zdCBmaW5kID0gcmVxdWlyZSgnbG9kYXNoL2NvbGxlY3Rpb24vZmluZCcpO1xyXG5jb25zdCBrZXlzID0gcmVxdWlyZSgnbG9kYXNoL29iamVjdC9rZXlzJyk7XHJcbmNvbnN0IGlzQXJyYXkgPSByZXF1aXJlKCdsb2Rhc2gvbGFuZy9pc0FycmF5Jyk7XHJcbmNvbnN0IG1hcCA9IHJlcXVpcmUoJ2xvZGFzaC9jb2xsZWN0aW9uL21hcCcpO1xyXG5jb25zdCBtYXBWYWx1ZXMgPSByZXF1aXJlKCdsb2Rhc2gvb2JqZWN0L21hcFZhbHVlcycpO1xyXG5jb25zdCBvbWl0ID0gcmVxdWlyZSgnbG9kYXNoL29iamVjdC9vbWl0Jyk7XHJcblxyXG4vLyBDb21wb25lbnRzXHJcbmltcG9ydCBEZWZhdWx0RW1wdHkgZnJvbSAnLi9kZWZhdWx0LWVtcHR5LWNvbXBvbmVudCc7XHJcbmNvbnN0IExpc3RTZWxlY3Rpb24gPSByZXF1aXJlKCcuLi8uLi8uLi8uLi9saXN0L3NlbGVjdGlvbicpLmxpc3QuY29tcG9uZW50O1xyXG5jb25zdCBHcm91cFdyYXBwZXIgPSByZXF1aXJlKCcuL2dyb3VwLXdyYXBwZXInKS5jb21wb25lbnQ7XHJcblxyXG4vKipcclxuKiBSZXN1bHRzIGNvbXBvbmVudCwgdXNlZCB0byByZW5kZXIgdGhlIHJlc3VsdHMsIGdyb3VwZWQgb3IgdW5ncm91cGVkXHJcbiogQHR5cGUge09iamVjdH1cclxuKi9cclxuY29uc3QgUmVzdWx0cyA9IHtcclxuICAgIGRpc3BsYXlOYW1lOiAnUmVzdWx0cycsXHJcbiAgICAvKipcclxuICAgICogQnkgZGVmYXVsdCwgYW4gZW1wdHkgY29tcG9uZW50IGlzIHBpY2tlZC5cclxuICAgICogQHJldHVybiB7T2JqZWN0fSB0aGUgZGVmYXVsdCBwcm9wc1xyXG4gICAgKi9cclxuICAgIGdldERlZmF1bHRQcm9wcygpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBhY3Rpb246IHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgZW1wdHlDb21wb25lbnQ6IERlZmF1bHRFbXB0eSxcclxuICAgICAgICAgICAgZ3JvdXBDb21wb25lbnQ6IHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgZ3JvdXBpbmdLZXk6IHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgaWRGaWVsZDogdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICBpbml0aWFsUm93c0NvdW50OiAzLFxyXG4gICAgICAgICAgICBpc1NlbGVjdGlvbjogdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICBsaW5lQ2xpY2tIYW5kbGVyOiB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgIGxpbmVDb21wb25lbnRNYXBwZXI6IHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgbGluZU9wZXJhdGlvbkxpc3Q6IHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgbGluZVNlbGVjdGlvbkhhbmRsZXI6IHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgc2NvcGVzQ29uZmlnOiB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgIHNjb3BlRmFjZXRLZXk6ICdGQ1RfU0NPUEUnLFxyXG4gICAgICAgICAgICBzY3JvbGxQYXJlbnRTZWxlY3RvcjogdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICBzZWxlY3Rpb25TdGF0dXM6IHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgcmVuZGVyU2luZ2xlR3JvdXBEZWNvcmF0aW9uOiB0cnVlLFxyXG4gICAgICAgICAgICByZXN1bHRzTWFwOiB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgIHJlc3VsdHNGYWNldHM6IHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgc2VsZWN0aW9uUmVzdWx0c01hcDogdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICBzaG93TW9yZUFkZGl0aW9uYWxSb3dzOiA1LFxyXG4gICAgICAgICAgICBzdG9yZTogdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICB0b3RhbENvdW50OiB1bmRlZmluZWRcclxuICAgICAgICB9O1xyXG4gICAgfSxcclxuICAgIC8qKlxyXG4gICAgKiBJbml0aWFsIHN0YXRlXHJcbiAgICAqIEByZXR1cm4ge09iamVjdH0gSW5pdGlhbCBzdGF0ZVxyXG4gICAgKi9cclxuICAgIGdldEluaXRpYWxTdGF0ZSgpIHtcclxuICAgICAgICByZXR1cm4gKHtcclxuICAgICAgICAgICAgbG9hZGluZzogZmFsc2VcclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcbiAgICAvKipcclxuICAgICogQ29tcG9uZW50IHdpbGwgcmVjZWl2ZSBwcm9wc1xyXG4gICAgKi9cclxuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUubG9hZGluZykge1xyXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgICAgICAgICAgIGxvYWRpbmc6IGZhbHNlXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAqIFJlbmRlciBhIHNpbmdsZSBncm91cCBvZiByZXN1bHRzLCB1c2luZyB0aGUgZ3JvdXAgY29tcG9uZW50IGdpdmVuIGFzIGEgcHJvcC5cclxuICAgICogQHBhcmFtICB7YXJyYXl9IGxpc3QgdGhlIHJlc3VsdHMgbGlzdFxyXG4gICAgKiBAcGFyYW0gIHtzdHJpbmd9IGtleSAgdGhlIGdyb3VwIGtleVxyXG4gICAgKiBAcGFyYW0gIHtpbnR9IGNvdW50ICB0aGUgZ3JvdXAncyByZXN1bHRzIGNvdW50XHJcbiAgICAqIEBwYXJhbSAge2Jvb2x9IGlzVW5pcXVlICBpcyB0aGlzIHRoZSBvbmx5IHJlbmRlcmVkIGdyb3VwXHJcbiAgICAqIEByZXR1cm4ge0hNVEx9ICAgICAgdGhlIHJlbmRlcmVkIGdyb3VwXHJcbiAgICAqL1xyXG4gICAgX3JlbmRlclNpbmdsZUdyb3VwKGxpc3QsIGtleSwgY291bnQsIGlzVW5pcXVlKSB7XHJcbiAgICAgICAgY29uc3Qge2luaXRpYWxSb3dzQ291bnR9ID0gdGhpcy5wcm9wcztcclxuICAgICAgICBpZih0aGlzLnByb3BzLnJlbmRlclNpbmdsZUdyb3VwRGVjb3JhdGlvbiAmJiAhdGhpcy5wcm9wcy5ncm91cENvbXBvbmVudCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLndhcm4oJ1lvdSBhcmUgdHJ5aW5nIHRvIHdyYXAgeW91ciBsaXN0IGluIGEgZ3JvdXAgd2l0aG91dCBhIGdyb3VwQ29tcG9uZW50LiBQbGVhc2UgZ2l2ZSBvbmUgb3Igc2V0IFwicmVuZGVyU2luZ2xlR3JvdXBEZWNvcmF0aW9uXCIgdG8gZmFsc2UuJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoaXNVbmlxdWUpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMucHJvcHMucmVuZGVyU2luZ2xlR3JvdXBEZWNvcmF0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgICAgICAgIDxHcm91cFdyYXBwZXJcclxuICAgICAgICAgICAgICAgICAgICBjb3VudD17Y291bnR9XHJcbiAgICAgICAgICAgICAgICAgICAgZ3JvdXBDb21wb25lbnQ9e3RoaXMucHJvcHMuZ3JvdXBDb21wb25lbnR9XHJcbiAgICAgICAgICAgICAgICAgICAgZ3JvdXBLZXk9e2tleX1cclxuICAgICAgICAgICAgICAgICAgICBpbml0aWFsUm93c0NvdW50PXtpbml0aWFsUm93c0NvdW50fVxyXG4gICAgICAgICAgICAgICAgICAgIGlzVW5pcXVlXHJcbiAgICAgICAgICAgICAgICAgICAgbGlzdD17bGlzdH1cclxuICAgICAgICAgICAgICAgICAgICByZWY9e2Bncm91cC0ke2tleX1gfVxyXG4gICAgICAgICAgICAgICAgICAgIHJlbmRlclJlc3VsdHNMaXN0PXt0aGlzLl9yZW5kZXJSZXN1bHRzTGlzdH1cclxuICAgICAgICAgICAgICAgICAgICBzaG93QWxsSGFuZGxlcj17dGhpcy5fc2hvd0FsbEhhbmRsZXJ9XHJcbiAgICAgICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fcmVuZGVyUmVzdWx0c0xpc3QobGlzdCwga2V5LCBjb3VudCwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgICAgPEdyb3VwV3JhcHBlclxyXG4gICAgICAgICAgICAgICAgY291bnQ9e2NvdW50fVxyXG4gICAgICAgICAgICAgICAgZ3JvdXBDb21wb25lbnQ9e3RoaXMucHJvcHMuZ3JvdXBDb21wb25lbnR9XHJcbiAgICAgICAgICAgICAgICBncm91cEtleT17a2V5fVxyXG4gICAgICAgICAgICAgICAgaW5pdGlhbFJvd3NDb3VudD17aW5pdGlhbFJvd3NDb3VudH1cclxuICAgICAgICAgICAgICAgIGtleT17a2V5fVxyXG4gICAgICAgICAgICAgICAgbGlzdD17bGlzdH1cclxuICAgICAgICAgICAgICAgIHJlZj17YGdyb3VwLSR7a2V5fWB9XHJcbiAgICAgICAgICAgICAgICByZW5kZXJSZXN1bHRzTGlzdD17dGhpcy5fcmVuZGVyUmVzdWx0c0xpc3R9XHJcbiAgICAgICAgICAgICAgICBzaG93QWxsSGFuZGxlcj17dGhpcy5fc2hvd0FsbEhhbmRsZXJ9XHJcbiAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICAvKipcclxuICAgICogUmVuZGVyIHRoZSBlbXB0eSBjb21wb25lbnQgZ2l2ZW4gYXMgYSBwcm9wIHdoZW4gdGhlIHJlc3VsdCBtYXAgaXMgZW1wdHkuXHJcbiAgICAqIEByZXR1cm4ge0hNVEx9ICAgICAgdGhlIHJlbmRlcmVkIGNvbXBvbmVudFxyXG4gICAgKi9cclxuICAgIF9yZW5kZXJFbXB0eVJlc3VsdHMoKSB7XHJcbiAgICAgICAgcmV0dXJuIDx0aGlzLnByb3BzLmVtcHR5Q29tcG9uZW50Lz47XHJcbiAgICB9LFxyXG4gICAgLyoqXHJcbiAgICAqIFJlbmRlciB0aGUgcmVzdWx0cyBsaXN0XHJcbiAgICAqIEBwYXJhbSAge0FycmF5fSAgbGlzdCAgICAgdGhlIHJlc3VsdHMgbGlzdFxyXG4gICAgKiBAcGFyYW0gIHtzdHJpbmd9ICBrZXkgICAgICB0aGUgZ3JvdXAga2V5XHJcbiAgICAqIEBwYXJhbSAge2ludGVnZXJ9ICBjb3VudCAgICB0aGUgZ3JvdXAgY291bnRcclxuICAgICogQHBhcmFtICB7Qm9vbGVhbn0gaXNVbmlxdWUgdHJ1ZSBpZiB0aGlzIGlzIHRoZSBvbmx5IGdyb3VwIHJlbmRlcmVkXHJcbiAgICAqIEByZXR1cm4ge0hUTUx9ICAgICAgICAgIHRoZSByZW5kZXJlZCBjb21wb25lbnRcclxuICAgICovXHJcbiAgICBfcmVuZGVyUmVzdWx0c0xpc3QobGlzdCwga2V5LCBjb3VudCwgaXNVbmlxdWUpIHtcclxuICAgICAgICBsZXQge1xyXG4gICAgICAgICAgICBsaW5lQ29tcG9uZW50TWFwcGVyLFxyXG4gICAgICAgICAgICBpZEZpZWxkLFxyXG4gICAgICAgICAgICBpc1NlbGVjdGlvbixcclxuICAgICAgICAgICAgbGluZVNlbGVjdGlvbkhhbmRsZXIsXHJcbiAgICAgICAgICAgIGxpbmVDbGlja0hhbmRsZXIsXHJcbiAgICAgICAgICAgIGxpbmVPcGVyYXRpb25MaXN0LFxyXG4gICAgICAgICAgICBzY3JvbGxQYXJlbnRTZWxlY3RvcixcclxuICAgICAgICAgICAgc2VsZWN0aW9uU3RhdHVzLFxyXG4gICAgICAgICAgICBzZWxlY3Rpb25SZXN1bHRzTWFwLFxyXG4gICAgICAgICAgICAuLi5vdGhlclByb3BzXHJcbiAgICAgICAgfSA9IHRoaXMucHJvcHM7XHJcbiAgICAgICAgY29uc3Qgc2VsZWN0aW9uRGF0YSA9IHNlbGVjdGlvblJlc3VsdHNNYXAgPyBzZWxlY3Rpb25SZXN1bHRzTWFwW2tleV0gfHwgW10gOiBbXTtcclxuICAgICAgICBjb25zdCBzY29wZSA9IG90aGVyUHJvcHMuc3RvcmUuZ2V0U2NvcGUoKTtcclxuICAgICAgICBjb25zdCBsaW5lS2V5ID0gc2NvcGUgPT09IHVuZGVmaW5lZCB8fCBzY29wZSA9PT0gJ0FMTCcgPyBrZXkgOiBzY29wZTtcclxuICAgICAgICBjb25zdCBMaW5lQ29tcG9uZW50ID0gbGluZUNvbXBvbmVudE1hcHBlcihsaW5lS2V5LCBsaXN0KTtcclxuICAgICAgICBjb25zdCBoYXNNb3JlRGF0YSA9IGlzVW5pcXVlICE9PSB1bmRlZmluZWQgJiYgaXNVbmlxdWUgJiYgbGlzdC5sZW5ndGggPCBjb3VudDtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICA8TGlzdFNlbGVjdGlvblxyXG4gICAgICAgICAgICBkYXRhPXtsaXN0fVxyXG4gICAgICAgICAgICBkYXRhLWZvY3VzPSdyZXN1bHRzLWxpc3QnXHJcbiAgICAgICAgICAgIGZldGNoTmV4dFBhZ2U9e3RoaXMuX29uU2Nyb2xsUmVhY2hlZEJvdHRvbX1cclxuICAgICAgICAgICAgaGFzTW9yZURhdGE9e2hhc01vcmVEYXRhfVxyXG4gICAgICAgICAgICBpZEZpZWxkPXtpZEZpZWxkfVxyXG4gICAgICAgICAgICBpc1NlbGVjdGlvbj17aXNTZWxlY3Rpb259XHJcbiAgICAgICAgICAgIExpbmVDb21wb25lbnQ9e0xpbmVDb21wb25lbnR9XHJcbiAgICAgICAgICAgIG9uTGluZUNsaWNrPXtsaW5lQ2xpY2tIYW5kbGVyfVxyXG4gICAgICAgICAgICBvblNlbGVjdGlvbj17bGluZVNlbGVjdGlvbkhhbmRsZXJ9XHJcbiAgICAgICAgICAgIG9wZXJhdGlvbkxpc3Q9e2xpbmVPcGVyYXRpb25MaXN0fVxyXG4gICAgICAgICAgICBwYXJlbnRTZWxlY3Rvcj17c2Nyb2xsUGFyZW50U2VsZWN0b3J9XHJcbiAgICAgICAgICAgIHJlZj17YGxpc3QtJHtrZXl9YH1cclxuICAgICAgICAgICAgc2VsZWN0aW9uRGF0YT17c2VsZWN0aW9uRGF0YX1cclxuICAgICAgICAgICAgc2VsZWN0aW9uU3RhdHVzPXtzZWxlY3Rpb25TdGF0dXN9XHJcbiAgICAgICAgICAgIHsuLi5vdGhlclByb3BzfVxyXG4gICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICB7dGhpcy5zdGF0ZS5sb2FkaW5nICYmXHJcbiAgICAgICAgICAgICAgICA8ZGl2IGRhdGEtZm9jdXM9J2xvYWRpbmctbW9yZS1yZXN1bHRzJz5cclxuICAgICAgICAgICAgICAgIHt0cmFuc2xhdGUoJ3NlYXJjaC5sb2FkaW5nTW9yZScpfVxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAqIENvbnN0cnVjdCB0aGUgc2hvdyBhbGwgYWN0aW9uXHJcbiAgICAqIEBwYXJhbSAge3N0cmluZ30ga2V5IHRoZSBncm91cCBrZXkgd2hlcmUgdGhlIHNob3cgYWxsIGhhcyBiZWVuIGNsaWNrZWRcclxuICAgICovXHJcbiAgICBfc2hvd0FsbEhhbmRsZXIoa2V5KSB7XHJcbiAgICAgICAgY29uc3Qge3Nob3dBbGxIYW5kbGVyLCByZXN1bHRzRmFjZXRzLCBzY29wZUZhY2V0S2V5LCBncm91cGluZ0tleSwgc2NvcGVzQ29uZmlnfSA9IHRoaXMucHJvcHM7XHJcbiAgICAgICAgbGV0IHNlbGVjdGVkU2NvcGUgPSBrZXk7XHJcbiAgICAgICAgaWYgKHNjb3Blc0NvbmZpZyAmJiBrZXkgJiYgc2NvcGVzQ29uZmlnW2tleV0pIHtcclxuICAgICAgICAgICAgc2VsZWN0ZWRTY29wZSA9IHNjb3Blc0NvbmZpZ1trZXldO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAocmVzdWx0c0ZhY2V0c1tzY29wZUZhY2V0S2V5XSkge1xyXG4gICAgICAgICAgICB0aGlzLl9zY29wZVNlbGVjdGlvbkhhbmRsZXIoc2VsZWN0ZWRTY29wZSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbGV0IGZhY2V0S2V5ID0gZ3JvdXBpbmdLZXk7XHJcbiAgICAgICAgICAgIGxldCBmYWNldFZhbHVlID0gc2VsZWN0ZWRTY29wZTtcclxuICAgICAgICAgICAgdGhpcy5fZmFjZXRTZWxlY3Rpb25IYW5kbGVyKGZhY2V0S2V5LCBmYWNldFZhbHVlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gQ2FsbGVkIGlmIGRlZmluZWQgKG1heSBiZSB1c2VkIGluIHRoZSBxdWljayBzZWFyY2ggdG8gY2xvc2UgdGhlIHBvcGluLilcclxuICAgICAgICBpZihzaG93QWxsSGFuZGxlcikge1xyXG4gICAgICAgICAgICBzaG93QWxsSGFuZGxlcigpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9LFxyXG4gICAgLyoqXHJcbiAgICAqIENvbnN0cnVjdCB0aGUgc2hvdyBtb3JlIGhhbmRsZXJcclxuICAgICogQHBhcmFtICB7c3RyaW5nfSBrZXkgdGhlIGdyb3VwIGtleSB3aGVyZSB0aGUgc2hvdyBtb3JlIGhhcyBiZWVuIGNsaWNrZWRcclxuICAgICogQHJldHVybiB7ZnVuY3Rpb259ICAgICB0aGUgc2hvdyBtb3JlIGhhbmRsZXJcclxuICAgICovXHJcbiAgICBfZ2V0U2hvd01vcmVIYW5kbGVyKGtleSkge1xyXG4gICAgICAgIHJldHVybiAoKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBncm91cHNSb3dzQ291bnRzID0gY2xvbmUodGhpcy5zdGF0ZS5ncm91cHNSb3dzQ291bnRzKTtcclxuICAgICAgICAgICAgZ3JvdXBzUm93c0NvdW50c1trZXldID0gZ3JvdXBzUm93c0NvdW50c1trZXldID8gZ3JvdXBzUm93c0NvdW50c1trZXldICsgdGhpcy5wcm9wcy5zaG93TW9yZUFkZGl0aW9uYWxSb3dzIDogdGhpcy5wcm9wcy5pbml0aWFsUm93c0NvdW50O1xyXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtncm91cHNSb3dzQ291bnRzfSk7XHJcbiAgICAgICAgfTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAqIFNjb3BlIHNlbGVjdGlvbiBoYW5kbGVyXHJcbiAgICAqIEBwYXJhbSAge3N0cmluZ30ga2V5IHRoZSBzY29wZSBrZXlcclxuICAgICovXHJcbiAgICBfc2NvcGVTZWxlY3Rpb25IYW5kbGVyKGtleSkge1xyXG4gICAgICAgIHRoaXMucHJvcHMuYWN0aW9uLnVwZGF0ZVByb3BlcnRpZXMoe1xyXG4gICAgICAgICAgICBzY29wZToga2V5XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgLyoqXHJcbiAgICAqIEZhY2V0IHNlbGVjdGlvbiBoYW5kbGVyXHJcbiAgICAqIEBwYXJhbSAge3N0cmluZ30ga2V5IHRoZSBmYWNldCBrZXlcclxuICAgICogQHBhcmFtICB7c3RyaW5nfSB2YWx1ZSB0aGUgZmFjZXQgdmFsdWVcclxuICAgICovXHJcbiAgICBfZmFjZXRTZWxlY3Rpb25IYW5kbGVyKGtleSwgdmFsdWUpIHtcclxuICAgICAgICBsZXQgc2VsZWN0ZWRGYWNldHMgPSBhc3NpZ24oe30sIHRoaXMucHJvcHMuc3RvcmUuZ2V0U2VsZWN0ZWRGYWNldHMoKSwge1xyXG4gICAgICAgICAgICBba2V5XToge1xyXG4gICAgICAgICAgICAgICAga2V5OiB2YWx1ZSxcclxuICAgICAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogdmFsdWUsXHJcbiAgICAgICAgICAgICAgICAgICAgY291bnQ6IDBcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMucHJvcHMuYWN0aW9uLnVwZGF0ZVByb3BlcnRpZXMoe1xyXG4gICAgICAgICAgICBncm91cGluZ0tleTogdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICBzZWxlY3RlZEZhY2V0c1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuICAgIC8qKlxyXG4gICAgKiBTY3JvbGwgcmVhY2hlZCBib3R0b20gaGFuZGxlclxyXG4gICAgKi9cclxuICAgIF9vblNjcm9sbFJlYWNoZWRCb3R0b20oKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLnN0YXRlLmxvYWRpbmcpIHtcclxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgICAgICAgICBsb2FkaW5nOiB0cnVlXHJcbiAgICAgICAgICAgIH0sICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMucHJvcHMuYWN0aW9uLnNlYXJjaCh0cnVlKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAqIEdldCB0aGUgZ3JvdXAgY291bnRzIG9iamVjdFxyXG4gICAgKiBAcGFyYW0gIHtvYmplY3R9IHJlc3VsdHNNYXAgdGhlIHJlc3VsdHMgbWFwXHJcbiAgICAqIEByZXR1cm4ge29iamVjdH0gICAgICAgICAgIHRoZSBjb3VudHMgbWFwXHJcbiAgICAqL1xyXG4gICAgX2dldEdyb3VwQ291bnRzKHJlc3VsdHNNYXApIHtcclxuICAgICAgICByZXN1bHRzTWFwID0gcmVzdWx0c01hcCA/IHJlc3VsdHNNYXAgOiB0aGlzLnByb3BzLnJlc3VsdHNNYXA7XHJcbiAgICAgICAgLy8gcmVzdWx0TWFwIGNhbiBiZSBlaXRoZXIgYW4gQXJyYXkgb3IgYW4gT2JqZWN0IGRlcGVuZGluZyBvZiB0aGUgc2VhcmNoIGJlaW5nIGdyb3VwZWQgb3Igbm90LlxyXG4gICAgICAgIGlmIChyZXN1bHRzTWFwICYmIGlzQXJyYXkocmVzdWx0c01hcCkgJiYgMSA9PT0gcmVzdWx0c01hcC5sZW5ndGgpIHtcclxuICAgICAgICAgICAgLy9DaGVjayBpZiB0aGUgcmVzdWx0TWFwIGNvbnRhaW5zIGFuIGVudHJ5IHdoaWNoIGlzIGFuIGFycmF5LlxyXG4gICAgICAgICAgICBjb25zdCBpc1Jlc3VsdE1hcEVudHJ5QW5BcnJheSA9IGlzQXJyYXkocmVzdWx0c01hcFswXSk7XHJcbiAgICAgICAgICAgIGlmKGlzUmVzdWx0TWFwRW50cnlBbkFycmF5KSB7XHJcbiAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgW3Jlc3VsdHNNYXBbMF1bMF1dOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICBjb3VudDogdGhpcy5wcm9wcy50b3RhbENvdW50XHJcbiAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vdGhpcyBjYXNlIG9jY3VycyB3aGVuIHRoZSBzZXJ2ZXIgcmVzcG9uc2UgY29udGFpbnMgb25seSBvbmUgZ3JvdXAgd2l0aCByZXN1bHRzLlxyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgW2tleXMocmVzdWx0c01hcFswXSldOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY291bnQ6IHRoaXMucHJvcHMudG90YWxDb3VudFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH0gZWxzZSBpZiAoMSA9PT0ga2V5cyhyZXN1bHRzTWFwKS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIFtrZXlzKHJlc3VsdHNNYXApWzBdXToge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvdW50OiB0aGlzLnByb3BzLnRvdGFsQ291bnRcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIGhlcmUgOiBncm91cGVkIGxpc3RcclxuICAgICAgICBsZXQgdGFyZ2V0RmFjZXREYXRhO1xyXG4gICAgICAgIGNvbnN0IHtyZXN1bHRzRmFjZXRzfSA9IHRoaXMucHJvcHM7XHJcbiAgICAgICAgaWYocmVzdWx0c0ZhY2V0cykge1xyXG4gICAgICAgICAgICBjb25zdCB7c2NvcGVGYWNldEtleSwgZ3JvdXBpbmdLZXl9ID0gdGhpcy5wcm9wcztcclxuICAgICAgICAgICAgY29uc3Qga2V5ID0gZ3JvdXBpbmdLZXkgPT09IHVuZGVmaW5lZCA/IHNjb3BlRmFjZXRLZXkgOiBncm91cGluZ0tleTtcclxuICAgICAgICAgICAgY29uc3Qgc2NvcGVGYWNldCA9IHJlc3VsdHNGYWNldHNba2V5XTtcclxuICAgICAgICAgICAgcmV0dXJuIG1hcFZhbHVlcyhzY29wZUZhY2V0LCAoZmFjZXREYXRhKSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFjZXREYXRhLmNvdW50O1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIDA7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgKiBSZW5kZXIgdGhlIHdob2xlIGNvbXBvbmVudFxyXG4gICAgKiBAcmV0dXJuIHtITVRMfSAgICAgIHRoZSByZW5kZXJlZCBjb21wb25lbnRcclxuICAgICovXHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgLy8gSWYgdGhlcmUgaXMgbm8gcmVzdWx0LCByZW5kZXIgdGhlIGdpdmVuIGVtcHR5IGNvbXBvbmVudFxyXG4gICAgICAgIGlmICgwID09PSB0aGlzLnByb3BzLnRvdGFsQ291bnQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3JlbmRlckVtcHR5UmVzdWx0cygpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHJlc3VsdHNNYXA7XHJcblxyXG4gICAgICAgIC8vIHJlc3VsdHNNYXAgY2FuIGJlIGFuIEFycmF5IG9yIGFuIE9iamVjdC5cclxuICAgICAgICBpZiAoaXNBcnJheSh0aGlzLnByb3BzLnJlc3VsdHNNYXApKSB7XHJcbiAgICAgICAgICAgIHJlc3VsdHNNYXAgPSBmaWx0ZXIodGhpcy5wcm9wcy5yZXN1bHRzTWFwLCBmdW5jdGlvbiAocmVzdWx0R3JvdXApIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHByb3BlcnR5R3JvdXBOYW1lID0ga2V5cyhyZXN1bHRHcm91cClbMF07IC8vZ3JvdXAgcHJvcGVydHkgbmFtZVxyXG4gICAgICAgICAgICAgICAgY29uc3QgbGlzdCA9IHJlc3VsdEdyb3VwW3Byb3BlcnR5R3JvdXBOYW1lXTtcclxuICAgICAgICAgICAgICAgIHJldHVybiAwICE9PSBsaXN0Lmxlbmd0aDtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmVzdWx0c01hcCA9IG9taXQodGhpcy5wcm9wcy5yZXN1bHRzTWFwLCBmdW5jdGlvbiAocmVzdWx0R3JvdXApIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHByb3BlcnR5R3JvdXBOYW1lID0ga2V5cyhyZXN1bHRHcm91cClbMF07IC8vZ3JvdXAgcHJvcGVydHkgbmFtZVxyXG4gICAgICAgICAgICAgICAgY29uc3QgbGlzdCA9IHJlc3VsdEdyb3VwW3Byb3BlcnR5R3JvdXBOYW1lXTtcclxuICAgICAgICAgICAgICAgIHJldHVybiAwID09PSBsaXN0Lmxlbmd0aDtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBHZXQgdGhlIGNvdW50IGZvciBlYWNoIGdyb3VwXHJcbiAgICAgICAgY29uc3QgZ3JvdXBDb3VudHMgPSB0aGlzLl9nZXRHcm91cENvdW50cyhyZXN1bHRzTWFwKTtcclxuICAgICAgICAvLyBDaGVjayBpZiB0aGVyZSBpcyBvbmx5IG9uZSBncm91cCBsZWZ0XHJcblxyXG4gICAgICAgIGlmIChpc0FycmF5KHJlc3VsdHNNYXApICYmIDEgPT09IHJlc3VsdHNNYXAubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGtleSA9IGtleXMocmVzdWx0c01hcFswXSlbMF07XHJcbiAgICAgICAgICAgIGNvbnN0IGxpc3QgPSByZXN1bHRzTWFwWzBdW2tleV07XHJcbiAgICAgICAgICAgIGNvbnN0IGNvdW50ID0gZ3JvdXBDb3VudHNba2V5XS5jb3VudDtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3JlbmRlclNpbmdsZUdyb3VwKGxpc3QsIGtleSwgY291bnQsIHRydWUpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoMSA9PT0ga2V5cyhyZXN1bHRzTWFwKS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgY29uc3Qga2V5ID0ga2V5cyhyZXN1bHRzTWFwKVswXTtcclxuICAgICAgICAgICAgY29uc3QgbGlzdCA9IHJlc3VsdHNNYXBba2V5XTtcclxuICAgICAgICAgICAgY29uc3QgY291bnQgPSBncm91cENvdW50c1trZXldLmNvdW50O1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fcmVuZGVyU2luZ2xlR3JvdXAobGlzdCwga2V5LCBjb3VudCwgdHJ1ZSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICAgIDxkaXYgZGF0YS1mb2N1cz0nc2VhcmNoLXJlc3VsdHMnPlxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIG1hcChyZXN1bHRzTWFwLCAocmVzdWx0R3JvdXApID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qga2V5ID0ga2V5cyhyZXN1bHRHcm91cClbMF07IC8vZ3JvdXAgcHJvcGVydHkgbmFtZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBsaXN0ID0gcmVzdWx0R3JvdXBba2V5XTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY291bnQgPSBncm91cENvdW50c1trZXldO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fcmVuZGVyU2luZ2xlR3JvdXAobGlzdCwga2V5LCBjb3VudCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBidWlsZGVyKFJlc3VsdHMpO1xyXG4iXX0=