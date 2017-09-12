// Dependencies
import React from 'react';
import { translate } from 'focus-core/translation';
import builder from 'focus-core/component/builder';

import mapValues from 'lodash/object/mapValues';
import omit from 'lodash/object/omit';

import clone from 'lodash/lang/clone';
import isArray from 'lodash/lang/isArray';

import map from 'lodash/collection/map';
import groupBy from 'lodash/collection/groupBy';

// Components
import DefaultEmpty from './default-empty-component';
import { component as ListSelection } from '../../../../list/selection/list';
import { component as GroupWrapper } from './group-wrapper';

/**
* Results component, used to render the results, grouped or ungrouped
* @type {Object}
*/
const Results = {
    displayName: 'Results',
    /**
    * By default, an empty component is picked.
    * @return {Object} the default props
    */
    getDefaultProps() {
        return {
            action: undefined,
            emptyComponent: DefaultEmpty,
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
    getInitialState() {
        return ({
            loading: false
        });
    },
    /**
    * Component will receive props
    */
    componentWillReceiveProps() {
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
    _renderSingleGroup(list, key, count, isUnique) {
        const { initialRowsCount } = this.props;
        if (this.props.renderSingleGroupDecoration && !this.props.groupComponent) {
            console.warn('You are trying to wrap your list in a group without a groupComponent. Please give one or set "renderSingleGroupDecoration" to false.');
        }

        if (isUnique) {
            if (this.props.renderSingleGroupDecoration) {
                return (
                    <GroupWrapper
                        count={count}
                        groupComponent={this.props.groupComponent}
                        groupKey={key}
                        initialRowsCount={initialRowsCount}
                        isUnique
                        list={list}
                        ref={`group-${key}`}
                        renderResultsList={this._renderResultsList}
                        showAllHandler={this._showAllHandler}
                    />
                );
            } else {
                return this._renderResultsList(list, key, count, true);
            }
        } else {
            return (
                <GroupWrapper
                    count={count}
                    groupComponent={this.props.groupComponent}
                    groupKey={key}
                    initialRowsCount={initialRowsCount}
                    key={key}
                    list={list}
                    ref={`group-${key}`}
                    renderResultsList={this._renderResultsList}
                    showAllHandler={this._showAllHandler}
                />
            );
        }
    },
    /**
    * Render the empty component given as a prop when the result map is empty.
    * @return {HMTL}      the rendered component
    */
    _renderEmptyResults() {
        return (
            <this.props.emptyComponent />
        );
    },
    /**
    * Render the results list
    * @param  {Array}  list     the results list
    * @param  {string}  key      the group key
    * @param  {integer}  count    the group count
    * @param  {Boolean} isUnique true if this is the only group rendered
    * @return {HTML}          the rendered component
    */
    _renderResultsList(list, key, count, isUnique) {
        let {
            lineComponentMapper,
            idField,
            isSelection,
            lineSelectionHandler,
            lineClickHandler,
            lineOperationList,
            scrollParentSelector,
            selectionStatus,
            selectionResultsMap,
            ...otherProps
        } = this.props;
        const selectionData = selectionResultsMap ? selectionResultsMap[key] || [] : [];
        const scope = otherProps.store.getScope();
        const lineKey = scope === undefined || scope === 'ALL' ? key : scope;
        const LineComponent = lineComponentMapper(lineKey, list);
        const hasMoreData = isUnique !== undefined && isUnique && list.length < count;
        return (
            <div>
                <ListSelection
                    data={list}
                    data-focus='results-list'
                    fetchNextPage={this._onScrollReachedBottom}
                    hasMoreData={hasMoreData}
                    idField={idField}
                    isSelection={isSelection}
                    LineComponent={LineComponent}
                    onLineClick={lineClickHandler}
                    onSelection={lineSelectionHandler}
                    operationList={lineOperationList}
                    parentSelector={scrollParentSelector}
                    ref={`list-${key}`}
                    selectionData={selectionData}
                    selectionStatus={selectionStatus}
                    {...otherProps}
                />
                {this.state.loading && (
                    <div data-focus='loading-more-results'>
                        {translate('search.loadingMore')}
                    </div>
                )}
            </div>
        );
    },

    /**
    * Construct the show all action
    * @param  {string} key the group key where the show all has been clicked
    */
    _showAllHandler(key) {
        const { showAllHandler, resultsFacets, scopeFacetKey, groupingKey, scopesConfig } = this.props;
        let selectedScope = key;
        if (scopesConfig && key && scopesConfig[key]) {
            selectedScope = scopesConfig[key];
        }
        if (resultsFacets[scopeFacetKey]) {
            this._scopeSelectionHandler(selectedScope);
        } else {
            let facetKey = groupingKey;
            let facetValue = selectedScope;
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
    _getShowMoreHandler(key) {
        return () => {
            let groupsRowsCounts = clone(this.state.groupsRowsCounts);
            groupsRowsCounts[key] = groupsRowsCounts[key] ? groupsRowsCounts[key] + this.props.showMoreAdditionalRows : this.props.initialRowsCount;
            this.setState({ groupsRowsCounts });
        };
    },

    /**
    * Scope selection handler
    * @param  {string} key the scope key
    */
    _scopeSelectionHandler(key) {
        this.props.action.updateProperties({
            scope: key
        });
    },
    /**
    * Facet selection handler
    * @param  {string} key the facet key
    * @param  {string} value the facet value
    */
    _facetSelectionHandler(key, value) {
        let selectedFacets = Object.assign({}, this.props.store.getSelectedFacets(), {
            [key]: {
                key: value,
                data: {
                    label: value,
                    count: 0
                }
            }
        });
        this.props.action.updateProperties({
            groupingKey: undefined,
            selectedFacets
        });
    },
    /**
    * Scroll reached bottom handler
    */
    _onScrollReachedBottom() {
        if (!this.state.loading) {
            this.setState({
                loading: true
            }, () => {
                this.props.action.search(true);
            });
        }

    },

    /**
    * Get the group counts object
    * @param  {object} resultsMap the results map
    * @return {object}           the counts map
    */
    _getGroupCounts(resultsMap) {
        resultsMap = resultsMap ? resultsMap : this.props.resultsMap;
        // resultMap can be either an Array or an Object depending of the search being grouped or not.
        if (resultsMap && isArray(resultsMap) && 1 === resultsMap.length) {
            //Check if the resultMap contains an entry which is an array.
            const isResultMapEntryAnArray = isArray(resultsMap[0]);
            if (isResultMapEntryAnArray) {
                return {
                    [resultsMap[0][0]]: {
                        count: this.props.totalCount
                    }
                };
            }
            //this case occurs when the server response contains only one group with results.
            return {
                [Object.keys(resultsMap[0])]: {
                    count: this.props.totalCount
                }
            };
        } else if (1 === Object.keys(resultsMap).length) {
            return {
                [Object.keys(resultsMap)[0]]: {
                    count: this.props.totalCount
                }
            };
        }

        // here : grouped list
        const { resultsFacets } = this.props;
        if (resultsFacets) {
            const { scopeFacetKey, groupingKey } = this.props;
            const key = groupingKey === undefined ? scopeFacetKey : groupingKey;
            const scopeFacet = resultsFacets[key];
            return mapValues(groupBy(scopeFacet, 'label'), (facetData) => {
                return facetData[0].count;
            });
        }
        return 0;
    },

    /**
    * Render the whole component
    * @return {HMTL}      the rendered component
    */
    render() {
        // If there is no result, render the given empty component
        if (0 === this.props.totalCount) {
            return this._renderEmptyResults();
        }

        let resultsMap;

        // resultsMap can be an Array or an Object.
        if (isArray(this.props.resultsMap)) {
            resultsMap = this.props.resultsMap.filter((resultGroup) => {
                const propertyGroupName = Object.keys(resultGroup)[0]; //group property name
                const list = resultGroup[propertyGroupName];
                return 0 !== list.length;
            });
        } else {
            resultsMap = omit(this.props.resultsMap, (resultGroup) => {
                const propertyGroupName = Object.keys(resultGroup)[0]; //group property name
                const list = resultGroup[propertyGroupName];
                return 0 === list.length;
            });
        }

        // Get the count for each group
        const groupCounts = this._getGroupCounts(resultsMap);
        // Check if there is only one group left

        if (isArray(resultsMap) && 1 === resultsMap.length) {
            const key = Object.keys(resultsMap[0])[0];
            const list = resultsMap[0][key];
            const count = groupCounts[key].count;
            return this._renderSingleGroup(list, key, count, true);
        } else if (1 === Object.keys(resultsMap).length) {
            const key = Object.keys(resultsMap)[0];
            const list = resultsMap[key];
            const count = groupCounts[key].count;
            return this._renderSingleGroup(list, key, count, true);
        } else {
            return (
                <div data-focus='search-results'>
                    {
                        map(resultsMap, (resultGroup) => {
                            const key = Object.keys(resultGroup)[0]; //group property name
                            const list = resultGroup[key];
                            const count = groupCounts[key];
                            return this._renderSingleGroup(list, key, count);
                        })
                    }
                </div>
            );
        }
    }

};

const { mixin, component } = builder(Results);
export { mixin, component };
export default { mixin, component };
