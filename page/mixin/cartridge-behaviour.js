var isFunction = require('lodash/lang/isFunction');
var dispatcher = require('focus').dispatcher;
module.exports = {
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
          summaryComponent: cartridgeConf.summary,
          actions: cartridgeConf.actions
        },
        type: 'update'
      });
    },
    componentWillMount: function pageMixinWillMount(){
      this._registerCartridge();
    }
};
