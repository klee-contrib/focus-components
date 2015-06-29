// Dependencies

let builder = require('focus').component.builder;
let omit = require('lodash/object/omit');
let map = require('lodash/collection/map');
let reduce = require('lodash/collection/reduce');
let clone = require('lodash/lang/clone');
let keys = require('lodash/object/keys');
let forEach = require('lodash/collection/forEach');
let isEqual = require('lodash/lang/isEqual');

// Components

let DefaultEmpty = require('./default-empty-component');
let ListSelection = require('../../../list/selection').list.component;

/**
 * Results component, used to render the results, grouped or ungrouped
 * @type {Object}
 */
let Results = {
    /**
     * By default, an empty component is picked.
     * @return {Object} the default props
     */
    getDefaultProps() {
        return {
            emptyComponent: DefaultEmpty,
            renderSingleGroupDecoration: true,
            initialRowsCount: 3,
            showMoreAdditionalRows: 5,
            scopeFacetKey: 'FCT_SCOPE',
            resultsMap: undefined,
            totalCount: undefined,
            groupComponent: undefined,
            lineComponentMapper: undefined,
            idField: undefined,
            isSelection: undefined,
            lineSelectionHandler: undefined,
            lineClickHandler: undefined,
            scrollReachedBottomHandler: undefined,
            lineOperationList: undefined,
            scrollParentSelector: undefined,
            selectionStatus: undefined,
            groupByKey: undefined,
            scopeSelectionHandler: undefined,
            resultsFacets: undefined
        };
    },
    getInitialState() {
        return ({
            groupsRowsCounts: this._initGroupsRowsCountsFromMap(this.props.resultsMap)
        });
    },
    componentWillReceiveNewProps(nextProps) {
        this.setState({
            groupsRowsCounts: this._initGroupsRowsCountsFromMap(nextProps.resultsMap)
        });
    },
    _initGroupsRowsCountsFromMap(resultsMap) {
        return reduce(resultsMap, (result, list, key) => {
            result[key] = this.props.initialRowsCount;
            return result;
        }, {});
    },
    /**
     * Render a single group of results, using the group component given as a prop.
     * @param  {array} list the results list
     * @param  {string} key  the group key
     * @param  {int} count  the group's results count
     * @param  {bool} isUnique  is this the only rendered group
     * @return {HMTL}      the rendered group
     */
    _renderSingleGroup(list, key, count, isUnique) {
        let Group = this.props.groupComponent;
        if (isUnique) {
            if (this.props.renderSingleGroupDecoration) {
                return (
                    <Group groupKey={key} showAllHandler={this._getShowAllHandler(key)} showMoreHandler={this._getShowMoreHandler(key)} isUnique={true}>
                        {this._renderResultsList(list, key, count, true)}
                    </Group>
                );
            } else {
                return this._renderResultsList(list, key, count, true);
            }
        } else {
            return (
                <this.props.groupComponent groupKey={key} showAllHandler={this._getShowAllHandler(key)} showMoreHandler={this._getShowMoreHandler(key)}>
                    {this._renderResultsList(list, key, count)}
                </this.props.groupComponent>
            );
        }
    },
    /**
     * Render the empty component given as a prop when the result map is empty.
     * @return {HMTL}      the rendered component
     */
    _renderEmptyResults() {
        return <this.props.emptyComponent/>;
    },
    _renderResultsList(list, key, count, isUnique) {
        let LineComponent = this.props.lineComponentMapper(key, list);
        let hasMoreData = isUnique && list.length === count;
        return (
            <ListSelection
                data-focus='results-list'
                data={list}
                idField={this.props.idField}
                isSelection={this.props.isSelection}
                onSelection={this.props.lineSelectionHandler}
                onLineClick={this.props.lineClickHandler}
                fetchNextPage={this.props.scrollReachedBottomHandler}
                hasMoreData={hasMoreData}
                operationList={this.props.lineOperationList}
                lineComponent={LineComponent}
                parentSelector={this.props.scrollParentSelector}
                selectionStatus={this.props.selectionStatus}
            />
        );
    },
    _getShowAllHandler(key) {
        return () => {
            if (this.props.groupByKey === this.props.scopeFacetKey) {
                this.props.scopeSelectionHandler(key);
            } else {
                let facetKey = this.props.groupByKey;
                let facetValue = key;
                // TODO handle this as a facet selection
            }
        };
    },
    _getShowMoreHandler(key) {
        return () => {
            let groupsRowsCounts = clone(this.state.groupsRowsCounts);
            groupsRowsCounts[key] = groupsRowsCounts[key] ? groupsRowsCounts[key] + this.props.showMoreAdditionalRows : this.props.initialRowsCount;
            this.setState({groupsRowsCounts});
        };
    },
    _getGroupCounts(resultsMap) {
        let groupKeys = keys(resultsMap);
        if (groupKeys.length === 1) {
            return {
                [groupKeys[0]]: {
                    count: this.props.totalCount
                }
            };
        }
        let targetFacetData;
        forEach(this.props.resultsFacets(), (facetData) => {
            if (isEqual(keys(facetData).sort(), groupKeys.sort())) {
                targetFacetData = facetData;
                return false;
            }
        });
        return reduce(targetFacetData, (result, data, key) => {
            result[key] = data.count;
            return result;
        }, {});
    },
    /**
     * Render the whole component
     * @return {HMTL}      the rendered component
     */
    render() {
        // If there is no result, render the given empty component
        if (this.props.totalCount === 0) {
            return this._renderEmptyResults();
        }
        // Filter groups with no results
        let resultsMap = omit(this.props.resultsMap, (list) => {
            return list.length === 0;
        });
        // Get the count for each group
        let groupCounts = this._getGroupsCounts(this.props.resultsMap);
        // Check if there is only one group left
        if (keys(resultsMap).length === 1) {
            let key = keys(resultsMap)[0];
            let list = resultsMap[key];
            let count = groupCounts[key];
            return this._renderSingleGroup(list, key, count, true);
        } else {
            return map(resultsMap, (list, key) => {
                let count = groupCounts[key];
                this._renderSingleGroup(list, key, count);
            });
        }
    }
};

module.exports = builder(Results);
