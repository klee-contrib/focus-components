// Dependencies

let isArray = require('lodash/lang/isArray');
let keys = require('lodash/object/keys');
let checkIsNotNull = require('focus').util.object.checkIsNotNull;
let ArgumentNullException = require('focus').exception.ArgumentNullException;

// Components

let SingleGroupComponent = require('./single-group-component').component;
let ListSelection = require('../../../list/selection').list.component;

/**
 * Mixin used in order to create a block.
 * @type {Object}
 */
let GroupByMixin = {
    /**
     * Init default props.
     * @returns {object} Default props.
     */
    getDefaultProps() {
        return ({
            lineOperationList: [],
            orderableColumnList: {},
            lineComponentMapper() {
                throw new ArgumentNullException('Please provide a inferLineComponentFromList(list) function.');
            }
        });
    },
    /**
     * Change the max rows of a group.
     * @param {string} groupKey Key of the group.
     * @param {int} maxRows Number of needed rows.
     * @returns {Function} The function wich will change the max rows of the group.
     */
    changeGroupByMaxRows(groupKey, maxRows) {
        return (event) => {
            this.refs[groupKey].changeGroupByMaxRows(maxRows);
        };
    },
    getResultListComponent(advancedSearch) {
        let isBounded = keys(this.state.map).length > 1;
        let noDecoration = keys(this.state.map).length === 1;
        if (noDecoration && advancedSearch) {
            let groupKey = keys(this.state.map)[0];
            return this.getSingleTypeResultList(groupKey, this.state.map[groupKey], isBounded && this.props.groupMaxRows);
        } else {
            let groupList = keys(this.state.map).map((groupKey) => {
                return (
                    <SingleGroupComponent
                        data-focus='results-group'
                        key={groupKey}
                        ref={groupKey}
                        renderGroupBy={this.renderGroupByBlock}
                        list={this.state.map[groupKey]}
                        groupKey={groupKey}
                        maxRows={isBounded && this.props.groupMaxRows}
                        />
                );
            });
            return groupList;
        }
    },
    getSingleTypeResultList(groupKey, list, maxRows) {
        if (maxRows) {
            list = list.slice(0, maxRows);
        }
        return (
            <ListSelection
                data-focus='results-list'
                data={list}
                ref={groupKey}
                idField={this.props.idField}
                isSelection={this.props.isSelection}
                onSelection={this._selectItem}
                onLineClick={this._lineClick}
                fetchNextPage={this.fetchNextPage}
                hasMoreData={this.state.hasMoreData}
                isLoading={this.state.isLoading}
                operationList={this.props.lineOperationList}
                lineComponent={this.props.lineComponentMapper(list)}
                parentSelector={this.props.parentSelector}
                selectionStatus={this.state.selectionStatus}
                />
        );
    },
    renderGroupByBlock(groupKey, list, maxRows) {
        let GroupWrapper = this.props.groupComponent;
        return (
            <GroupWrapper data-focus="group-result-container" groupKey={groupKey} query={this.state.query} showAll={this.changeGroupByMaxRows}>
                {this.getSingleTypeResultList(groupKey, list, maxRows)}
            </GroupWrapper>
        );
    }
};

module.exports = {mixin: GroupByMixin};
