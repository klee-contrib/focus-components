// Components
let SearchBar = require('../../../search/search-bar').component;
var searchHeaderMixin = require('./mixin');
module.exports = React.createClass({
  mixins: [searchHeaderMixin],
  render() {
      return (
          <div className='cartridge-search' data-focus='cartridge-search'>
            <h1>{this.i18n('search.cartridge.title')}</h1>
            <SearchBar value={this.props.query} scope={this.props.scope} scopes={this.props.scopeList} loading={this.state.isLoadingSearch} handleChange={this._prepareSearch}/>
          </div>
      );
  }
});
