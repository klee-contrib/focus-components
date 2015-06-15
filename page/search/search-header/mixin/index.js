
// Mixins
let i18nMixin =require('../../../../common/i18n').mixin;
let searchBehaviour = require('../../common/search-mixin').mixin;
let searchWrappedAction = require('../action-wrapper');
let SearchBar = require('../../../../search/search-bar').component;
let referenceBehaviour = require('../../../../common/form/mixin/reference-behaviour');
let storeBehaviour = require('../../../../common/mixin/store-behaviour');
let React = require('react');

module.exports = {
    mixins: [i18nMixin,referenceBehaviour,storeBehaviour, searchBehaviour],
    getInitialState(){
      return {
        isLoading: false
      }
    },
    _runSearch(){
      var criteria = this.refs.searchBar.getValue();
      return this.props.searchAction(this._buildSearchCriteria(criteria.scope, criteria.query))
    },
    _SearchBarComponent(){
      return <SearchBar
                ref='searchBar'
                value={this.props.query}
                scope={this.props.scope}
                scopes={this.state.reference.scopes}
                loading={this.state.isLoadingSearch}
                handleChange={this._wrappedSearch}
                referenceNames={this.props.referenceNames}
              />;
    },
    componentWillMount(){
      this._wrappedSearch = searchWrappedAction(this._runSearch, this);
      this._loadReference();
    }
};
