// Dependencies

let isArray = require('lodash/lang/isArray');
let checkIsNotNull = require('focus').util.object.checkIsNotNull;

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
            orderableColumnList: {}
        });
    },
    /**
     * @returns {boolean} Returns true if list is a simple list, false if grouped.
     * @private
     */
    isSimpleList() {
        return isArray(this.state.list);
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
    groupByListComponent() {
        let groupList = Object.keys(this.state.list).map((groupKey) => {
            return (
                <SingleGroupComponent key={groupKey}
                                      ref={groupKey}
                                      renderGroupBy={this.renderGroupByBlock}
                                      list={this.state.list[groupKey]}
                                      groupKey={groupKey}
                                      maxRows={this.props.groupMaxRows}
                    />
            );
        });
        return groupList;
    },
    simpleListComponent(options) {
        checkIsNotNull('options', options);
        checkIsNotNull('options.type', options.type);
        let newList = options.list || this.state.list;
        if (options.maxRows) {
            newList = newList.slice(0, options.maxRows);
        }
        return (
            <ListSelection data={newList}
                           ref={options.type}
                           idField={this.props.idField}
                           isSelection={this.props.isSelection}
                           onSelection={this._selectItem}
                           onLineClick={this._lineClick}
                           fetchNextPage={this.fetchNextPage}
                           hasMoreData={this.state.hasMoreData}
                           isLoading={this.state.isLoading}
                           operationList={this.props.lineOperationList}
                           lineComponent={this.props.lineMap[options.type]}
                           parentSelector={this.props.parentSelector}
                           selectionStatus={this.state.selectionStatus}
                />
        );
    }
};

module.exports = {mixin: GroupByMixin};