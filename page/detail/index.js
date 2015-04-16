var dispatcher = require('focus').dispatcher;

var detailMixin = {
  /**
   * Register the cartridge.
   */
  _registerCartridge: function registerCartridge(){
    if(!this.cartridgeConfiguration){
      this.cartridgeConfiguration = {};
      console.warn(`
        Your detail page does not have any cartrige configuration, this is not mandarory but recommended.
        It should be a component attribute.
        cartridgeConfiguration = {
          summary: {component: "A React Component"},
          cartridge: {component: "A React Component"}
        };
      `);
    }
    dispatcher.handleServerAction({
      data: {
        cartridgeComponent: this.cartridgeConfiguration.cartridge,
        summaryComponent: this.cartridgeConfiguration.summary
      },
      type: 'update'
    });
  }

};
module.exports = {mixin: detailMixin};
