// Mixins

let i18nMixin = require('../../../../common/i18n').mixin;
let referenceBehaviour = require('../../../../common/form/mixin/reference-behaviour');
let storeBehaviour = require('../../../../common/mixin/store-behaviour');

// Components

let SearchBar = require('../../../../search/search-bar').component;

// Actions

let actionBuilder = require('../../../../search/action-builder');

module.exports = {
    mixins: [i18nMixin, referenceBehaviour, storeBehaviour],
    getDefaultProps() {
        return ({
            action: actionBuilder({ // TODO check if it is possible to call a prop inside the getDefaultProps
                service: this.props.service,
                identifier: 'ADVANCED_SEARCH'
            })
        });
    },
    getInitialState() {
        return {
            isLoading: false
        };
    },
    componentWillMount() {
        this._loadReference();
        Focus.search.builtInStore.advancedSearchStore.addQueryChangeListener(this._triggerSearch);
        Focus.search.builtInStore.advancedSearchStore.addScopeChangeListener(this._triggerSearch);
    },
    componentWillUnmount() {
        Focus.search.builtInStore.advancedSearchStore.removeQueryChangeListener(this._triggerSearch);
        Focus.search.builtInStore.advancedSearchStore.removeScopeChangeListener(this._triggerSearch);
    },
    _triggerSearch() {
        this.props.action.search();
    },
    _SearchBarComponent() {
        return <SearchBar
            ref='searchBar'
            scopes={this.state.reference.scopes}
            loading={this.state.isLoading}
            action={this.props.action}
            store={Focus.search.builtInStore.advancedSearchStore}
            service={this.props.service}
            />;
    }
};
