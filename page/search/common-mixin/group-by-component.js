/**@jsx*/
var builder = require('focus').component.builder;

var groupByComponent = {

    /**
     * Display name.
     */
    displayName: 'group-by',


    /**
     * Init default props.
     * @returns {object} Default props.
     */
    getDefaultProps: function() {
        return {
            renderGroupBy: function(groupKey, list, maxRows) { console.error('Implement renderGroupBy() function'); },
            list: undefined,
            groupKey: undefined,
            maxRows: 3
        };
    },
    /**
     * Init default state.
     * @returns {object} Initialized state.
     */
    getInitialState: function() {
        return {
            maxRows: this.props.maxRows
        };
    },
    /**
     * Change the number of maxRows dispalyed.
     * @param {int} maxRows New value.
     */
    changeGroupByMaxRows: function changeGroupByMaxRows(maxRows) {
        this.setState({maxRows: maxRows});
    },
    /**
     * Render the group by block.
     * @returns {JSX} Content.
     */
    render: function renderGroupBy() {
        return this.props.renderGroupBy(this.props.groupKey, this.props.list, this.state.maxRows);
    }
};

module.exports = builder(groupByComponent);
