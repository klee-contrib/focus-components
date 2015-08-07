var isFunction = require('lodash/lang/isFunction');
var dispatcher = require('focus').dispatcher;
var Empty = require('../../common/empty').component;
module.exports = {
    /**
     * Register the cartridge.
     */
    _registerCartridge: function registerCartridge(){
      this.cartridgeConfiguration = this.cartridgeConfiguration || this.props.cartridgeConfiguration;
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
          cartridgeComponent: cartridgeConf.cartridge || {component: Empty},
          summaryComponent: cartridgeConf.summary|| {component: Empty},
          actions: cartridgeConf.actions|| {primary: [], secondary: Empty},
          barContentLeftComponent: cartridgeConf.barLeft || {component: Empty}
        },
        type: 'update'
      });
    },
    componentWillMount: function pageMixinWillMount(){
      this._registerCartridge();
    }
};
