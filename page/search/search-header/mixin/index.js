
// Mixins
let i18nMixin =require('../../../../common/i18n').mixin;
let searchBehaviour = require('../../common/search-mixin').mixin;
var searchWrappedAction = require('../action-wrapper');
let SearchBar = require('../../../../search/search-bar').component;
var React = require('react');

module.exports = {
    mixins: [i18nMixin, searchBehaviour],
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
                scopes={this.props.scopeList}
                loading={this.state.isLoadingSearch}
                handleChange={this._runSearch}
              />;
    },
    componentWillMount(){
      this._prepareSearch = searchWrappedAction(this._runSearch, this);
    }
};
