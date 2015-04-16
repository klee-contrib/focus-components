var builder = require('focus').component.builder;
var React = require('react');
var applicationStore = require('focus').application.builtInStore();

var cartridgeMixin = {
  getDefaultProps: function getCartridgeDefaultProps(){
    return {
      style: {}
    };
  },
  /** @inheriteddoc */
  getInitialState: function getCartridgeInitialState() {
    return this._getStateFromStore();
  },
  /** @inheriteddoc */
  componentWillMount: function cartridgeWillMount() {
    applicationStore.addCartridgeComponentChangeListener(this._handleComponentChange);
  },
  /** @inheriteddoc */
  componentWillUnMount: function cartridgeWillUnMount(){
    applicationStore.removeCartridgeComponentChangeListener(this._onComponentChange);
  },
  _getStateFromStore: function getCartridgeStateFromStore(){
    return {cartridgeComponent: applicationStore.getCartridgeComponent() || {component: 'div', props: {}}};
  },
  _handleComponentChange: function _handleComponentChange(){
    this.setState(this._getStateFromStore());
  },
  /** @inheriteddoc */
  render: function renderCartridge() {
    var className = `cartridge ${this.props.style.className}`;
    return (
      <div className={className} data-focus-cartridge>
        <this.state.cartridgeComponent.component {...this.state.cartridgeComponent.props}/>
      </div>
    );
  }
};

module.exports = builder(cartridgeMixin);
