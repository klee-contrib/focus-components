// Mixins

let i18nMixin = require('../../../../common/i18n').mixin;
let referenceBehaviour = require('../../../../common/form/mixin/reference-behaviour');
let storeBehaviour = require('../../../../common/mixin/store-behaviour');

// Components

let SearchBar = require('../../../../search/search-bar').component;

module.exports = {
    mixins: [i18nMixin, referenceBehaviour, storeBehaviour],
    getInitialState() {
        return {
            isLoading: false
        };
    },
    componentWillMount() {
        this._loadReference();
    },
    _SearchBarComponent() {
        return <SearchBar
            ref='searchBar'
            scopes={this.state.reference.scopes}
            loading={this.state.isLoadingSearch}
            identifier='ADVANCED_SEARCH'
            store={Focus.search.builtInStore.advancedSearchStore}
            service={this.props.service}
            />;
    }
};
