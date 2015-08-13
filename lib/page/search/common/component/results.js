// Dependencies

'use strict';

var builder = require('focus').component.builder;
var omit = require('lodash/object/omit');
var map = require('lodash/collection/map');
var reduce = require('lodash/collection/reduce');
var clone = require('lodash/lang/clone');
var keys = require('lodash/object/keys');
var forEach = require('lodash/collection/forEach');
var isEqual = require('lodash/lang/isEqual');
var assign = require('lodash/object/assign');

// Components

var DefaultEmpty = require('./default-empty-component').component;
var ListSelection = require('../../../../list/selection').list.component;
var GroupWrapper = require('./group-wrapper').component;

// Mixins

var i18nMixin = require('../../../../common/i18n/mixin');

/**
 * Results component, used to render the results, grouped or ungrouped
 * @type {Object}
 */
var Results = {
    mixins: [i18nMixin],
    /**
     * By default, an empty component is picked.
     * @return {Object} the default props
     */
    getDefaultProps: function getDefaultProps() {
        return {
            emptyComponent: DefaultEmpty,
            renderSingleGroupDecoration: true,
            initialRowsCount: 3,
            showMoreAdditionalRows: 5,
            scopeFacetKey: 'FCT_SCOPE',
            action: undefined,
            store: undefined,
            resultsMap: undefined,
            totalCount: undefined,
            groupComponent: undefined,
            lineComponentMapper: undefined,
            idField: undefined,
            isSelection: undefined,
            lineSelectionHandler: undefined,
            lineClickHandler: undefined,
            lineOperationList: undefined,
            scrollParentSelector: undefined,
            selectionStatus: undefined,
            groupingKey: undefined,
            resultsFacets: undefined
        };
    },
    getInitialState: function getInitialState() {
        return {
            loading: false
        };
    },
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
        if (isUnique) {
            if (this.props.renderSingleGroupDecoration) {
                return React.createElement(GroupWrapper, {
                    count: count,
                    groupComponent: this.props.groupComponent,
                    isUnique: true,
                    groupKey: key,
                    list: list,
                    renderResultsList: this._renderResultsList
                });
            } else {
                return this._renderResultsList(list, key, count, true);
            }
        } else {
            return React.createElement(GroupWrapper, {
                count: count,
                groupComponent: this.props.groupComponent,
                groupKey: key,
                list: list,
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
        var LineComponent = this.props.lineComponentMapper(key, list);
        var hasMoreData = isUnique !== undefined && isUnique && list.length < count;
        return React.createElement(
            'div',
            null,
            React.createElement(ListSelection, {
                'data-focus': 'results-list',
                data: list,
                idField: this.props.idField,
                isSelection: this.props.isSelection,
                onSelection: this.props.lineSelectionHandler,
                onLineClick: this.props.lineClickHandler,
                fetchNextPage: this._onScrollReachedBottom,
                hasMoreData: hasMoreData,
                operationList: this.props.lineOperationList,
                lineComponent: LineComponent,
                parentSelector: this.props.scrollParentSelector,
                selectionStatus: this.props.selectionStatus
            }),
            this.state.loading && React.createElement(
                'div',
                { 'data-focus': 'loading-more-results' },
                React.createElement('i', { className: 'fa fa-spinner' }),
                this.i18n('search.loadingMore')
            )
        );
    },

    /**
     * Construct the show all action
     * @param  {string} key the group key where the show all has been clicked
     * @return {function}     the show all handler
     */
    _showAllHandler: function _showAllHandler(key) {
        if (this.props.resultsFacets[this.props.scopeFacetKey]) {
            this._scopeSelectionHandler(key);
        } else {
            var facetKey = this.props.groupingKey;
            var facetValue = key;
            this._facetSelectionHandler(facetKey, facetValue);
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
     * Get the group counts object
     * @param  {object} resultsMap the results map
     * @return {object}           the counts map
     */
    _getGroupCounts: function _getGroupCounts(resultsMap) {
        var groupKeys = keys(resultsMap);
        if (groupKeys.length === 1) {
            var _ref;

            return (_ref = {}, _ref[groupKeys[0]] = {
                count: this.props.totalCount
            }, _ref);
        }
        var targetFacetData = undefined;
        forEach(this.props.resultsFacets, function (facetData) {
            if (isEqual(keys(facetData).sort(), groupKeys.sort())) {
                targetFacetData = facetData;
                return false;
            }
        });
        return reduce(targetFacetData, function (result, data, key) {
            result[key] = data.count;
            return result;
        }, {});
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
     */
    _facetSelectionHandler: function _facetSelectionHandler(key, value) {
        var _assign;

        var selectedFacets = assign({}, this.props.store.getSelectedFacets(), (_assign = {}, _assign[key] = {
            key: value,
            data: {
                label: value,
                count: 0
            }
        }, _assign));
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
     * Render the whole component
     * @return {HMTL}      the rendered component
     */
    render: function render() {
        var _this3 = this;

        // If there is no result, render the given empty component
        if (this.props.totalCount === 0) {
            return this._renderEmptyResults();
        }
        // Filter groups with no results
        var resultsMap = omit(this.props.resultsMap, function (list) {
            return list.length === 0;
        });
        // Get the count for each group
        var groupCounts = this._getGroupCounts(this.props.resultsMap);
        // Check if there is only one group left
        if (keys(resultsMap).length === 1) {
            var key = keys(resultsMap)[0];
            var list = resultsMap[key];
            var count = groupCounts[key].count;
            return this._renderSingleGroup(list, key, count, true);
        } else {
            return React.createElement(
                'div',
                { 'data-focus': 'search-results' },
                map(resultsMap, function (list, key) {
                    var count = groupCounts[key];
                    return _this3._renderSingleGroup(list, key, count);
                })
            );
        }
    }
};

module.exports = builder(Results);