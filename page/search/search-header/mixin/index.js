
// Mixins
let i18nMixin =require('../../../../common/i18n').mixin;
let searchBehaviour = require('../../common/search-mixin').mixin;
var searchWrappedAction = require('../action-wrapper');

module.exports = {
    mixins: [i18nMixin, searchBehaviour],
    getInitialState(){
      return {
        isLoading: false
      }
    },
    componentWillMount(){
      this._prepareSearch = searchWrappedAction(this.search, this);
    }
};
