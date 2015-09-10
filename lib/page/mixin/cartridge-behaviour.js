'use strict';

var isFunction = require('lodash/lang/isFunction');
var dispatcher = require('focus').dispatcher;
var Empty = require('../../common/empty').component;
module.exports = {
  /**
   * Register the cartridge.
   */
  _registerCartridge: function registerCartridge() {
    this.cartridgeConfiguration = this.cartridgeConfiguration || this.props.cartridgeConfiguration;
    if (!isFunction(this.cartridgeConfiguration)) {
      this.cartridgeConfiguration = function cartridgeConfiguration() {
        return {};
      };
      console.warn('\n          Your detail page does not have any cartrige configuration, this is not mandarory but recommended.\n          It should be a component attribute return by a function.\n          function cartridgeConfiguration(){\n            var cartridgeConfiguration = {\n              summary: {component: "A React Component", props: {id: this.props.id}},\n              cartridge: {component: "A React Component"},\n              actions: {components: "react actions"}\n            };\n            return cartridgeConfiguration;\n          }\n        ');
    }
    var cartridgeConf = this.cartridgeConfiguration();
    dispatcher.handleViewAction({
      data: {
        cartridgeComponent: cartridgeConf.cartridge || { component: Empty },
        summaryComponent: cartridgeConf.summary || { component: Empty },
        actions: cartridgeConf.actions || { primary: [], secondary: Empty },
        barContentLeftComponent: cartridgeConf.barLeft || { component: Empty }
      },
      type: 'update'
    });
  },
  componentWillMount: function pageMixinWillMount() {
    this._registerCartridge();
  }
};