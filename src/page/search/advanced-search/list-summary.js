// Dependencies

let builder = require('focus-core').component.builder;

// Components

let ListSummary = require('../../../list/summary/index').component;

const scopeAll = 'ALL';

let Summary = {
    /**
     * Get the default props
     * @return {object} the default props
     */
    getDefaultProps() {
        return ({
            totalCount: 0,
            query: '',
            action: undefined,
            scope: undefined
        });
    },
    /**
     * Scope click handler
     * Set the scope to ALL.
     */
    _onScopeClick() {
        this.props.action.updateProperties({
            scope: scopeAll,
            selectedFacets: {},
            groupingKey: undefined
        });
    },
    /**
     * Render the component
     * @return {HTML} the rendered component
     */
    render() {
        let scope = this.props.scope !== scopeAll ? {scope: {
            code: this.props.scope,
            label: 'Scope',
            value: this.props.scope
        }} : undefined;
        return (
            <ListSummary
                data-focus='advanced-search-list-summary'
                nb={this.props.totalCount}
                queryText={this.props.query}
                scopeList={scope}
                scopeClickAction={this._onScopeClick}
            />
        );
    }
};

module.exports = builder(Summary);
