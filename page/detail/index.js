var dispatcher = require('focus').dispatcher;
var saveBehaviour = require('./mixin/save-behaviour');
var validateBehaviour = require('./mixin/validate-behaviour');
var isFunction = require('lodash/lang/isFunction');

var detailMixin = {
  mixins: [validateBehaviour, saveBehaviour],
  /**
   * Register the cartridge.
   */
  _registerCartridge: function registerCartridge(){
    if(!isFunction(this.cartridgeConfiguration)){
      this.cartridgeConfiguration = function cartridgeConfiguration(){
        return {};
      };
      console.warn(`
        Your detail page does not have any cartrige configuration, this is not mandarory but recommended.
        It should be a component attribute return by a function.
        function cartridgeConfiguration(){
          var cartridgeConfiguration = {
            summary: {component: "A React Component", props: {id: this.props.id}},
            cartridge: {component: "A React Component"},
            actions: {components: "react actions"}
          };
          return cartridgeConfiguration;
        }
      `);
    }
    var cartridgeConf = this.cartridgeConfiguration();
    dispatcher.handleViewAction({
      data: {
        cartridgeComponent: cartridgeConf.cartridge,
        summaryComponent: cartridgeConf.summary
      },
      type: 'update'
    });
  },
  componentWillMount: function pageMixinWillMount(){
    this._registerCartridge();
  }

};
module.exports = {mixin: detailMixin};
