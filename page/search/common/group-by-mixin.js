let isArray = require('lodash/lang/isArray');
let SingleGroupComponent = require('./single-group-component').component;

/**
 * Mixin used in order to create a block.
 * @type {Object}
 */
let GroupByMixin = {
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
    }
};

module.exports = {mixin: GroupByMixin};