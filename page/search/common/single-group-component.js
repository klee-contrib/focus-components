// Dependencies

let builder = require('focus').component.builder;
let ArgumentNullException = require('focus').exception.ArgumentNullException;

/**
 * Component of a single group, used in the group-by-mixin.
 * @type {Object}
 */
let groupByComponent = {
    /**
     * Display name.
     */
    displayName: 'group-by',
    /**
     * Init default props.
     * @returns {object} Default props.
     */
    getDefaultProps() {
        return {
            renderGroupBy: function(groupKey, list, maxRows) { throw new ArgumentNullException('Please implement renderGroupBy() function.');},
            list: undefined,
            groupKey: undefined,
            maxRows: 3
        };
    },
    /**
     * Init default state.
     * @returns {object} Initialized state.
     */
    getInitialState() {
        return {
            maxRows: this.props.maxRows
        };
    },
    /**
     * Change the number of maxRows displayed.
     * @param {int} maxRows New value.
     */
    changeGroupByMaxRows(maxRows) {
        this.setState({maxRows});
    },
    /**
     * Render the group by block.
     * @returns {XML} Content.
     */
    render() {
        return this.props.renderGroupBy(this.props.groupKey, this.props.count, this.props.list, this.state.maxRows);
    }
};

module.exports = builder(groupByComponent);
