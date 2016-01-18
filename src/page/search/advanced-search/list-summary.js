// Dependencies
const React = require('react');
import builder from 'focus-core/component/builder';

// Components

const ListSummary = require('../../../list/summary/index').component;

// Mixins

const referenceBehaviour = require('../../../common/form/mixin/reference-behaviour');
const storeBehaviour = require('../../../common/mixin/store-behaviour');

const scopeAll = 'ALL';

const Summary = {
    /**
    * Component's mixins
    * @type {Array}
    */
    mixins: [referenceBehaviour, storeBehaviour],

    /**
    * Reference names to be fetched by the reference behaviour
    * @type {Array}
    */
    referenceNames: ['scopes'],

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
    /** @inheritdoc */
    componentDidMount () {
        this._loadReference();
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
    _getScopeLabel() {
        if(this.state && this.state.reference.scopes) {
            const selectedScope = this.state.reference.scopes.find(scope =>
                scope.code === this.props.scope
            )
            return selectedScope.label || this.props.scope;
        }
        return this.props.scope;
    },
    /**
     * Render the component
     * @return {HTML} the rendered component
     */
    render() {
        const scope = this.props.scope !== scopeAll ? {scope: {
            code: this.props.scope,
            label: 'Scope',
            value: this._getScopeLabel()
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
