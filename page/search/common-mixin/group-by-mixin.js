var isArray = require('lodash/lang/isArray');
var GroupBy =  require('./group-by-component').component;

/**
 * Mixin used in order to create a block.
 * @type {Object}
 */
var GroupByMixin = {

    getDefaultProps: function getDefaultProps(){
        return {
            groupMaxRows: undefined
        };
    },

    /**
     * @returns {boolean} Returns true if list is a simple list, false if grouped.
     * @private
     */
    isSimpleList: function() {
        return isArray(this.state.list);
    },

    /**
     * Change the max rows of a group.
     * @param {string} groupKey Key of the group.
     * @param {int} maxRows Number of needed rows.
     * @returns {Function} The function wich will change the max rows of the group.
     */
    changeGroupByMaxRows: function changeGroupByMaxRows(groupKey, maxRows) {
        return (event)=> {
            this.refs[groupKey].changeGroupByMaxRows(maxRows);
        };
    },

    renderGroupByList: function renderGroupByList() {
        var groupList = [];
        for (var groupKey in this.state.list) {
            groupList.push(<GroupBy key={groupKey} ref={groupKey}
                                    renderGroupBy={this.renderGroupBy}
                                    list={this.state.list[groupKey]}
                                    groupKey={groupKey}
                                    maxRows={this.props.groupMaxRows} />);
        }
        return groupList;
    }
};

module.exports = {mixin: GroupByMixin};