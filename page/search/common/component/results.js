// Dependencies

let builder = require('focus').component.builder;
let omit = require('lodash/object/omit');
let map = require('lodash/collection/map');

// Components

let DefaultEmpty = require('./default-empty-component');

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
            renderSingleGroupDecoration: true
        };
    },
    /**
     * Render a single group of results, using the group component given as a prop.
     * @param  {array} list the results list
     * @param  {string} key  the group key
     * @return {HMTL}      the rendered group
     */
    _renderSingleGroup(list, key) {
        let Group = this.props.groupComponent;
        return (
            <Group groupKey={key} list={list} showAllHandler={this.props.showAllHandler}>

            </Group>
        );
    },
    /**
     * Render the empty component given as a prop when the result map is empty.
     * @return {HMTL}      the rendered component
     */
    _renderEmptyResults() {
        return <this.props.emptyComponent/>;
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
        return map(resultsMap, this._renderSingleGroup);
    }
};

module.exports = builder(Results);
