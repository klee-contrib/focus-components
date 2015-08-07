var builder = require('focus').component.builder;
var React = require('react');
var applicationStore = require('focus').application.builtInStore();

var barMixin = {
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
    applicationStore.addSummaryComponentChangeListener(this._handleComponentChange);
    applicationStore.addBarContentLeftComponentChangeListener(this._handleComponentChange);
  },
  /** @inheriteddoc */
  componentWillUnMount: function cartridgeWillUnMount(){
    applicationStore.removeSummaryComponentChangeListener(this._handleComponentChange);
    applicationStore.addBarContentLeftComponentChangeListener(this._handleComponentChange);
  },
  _getStateFromStore: function getCartridgeStateFromStore(){
    return {
      summaryComponent: applicationStore.getSummaryComponent() || {component: 'div', props: {}},
      barContentLeftComponent: applicationStore.getBarContentLeftComponent() || {component: 'div', props:{}}
    };
  },
  _handleComponentChange: function _handleComponentChangeBarSummary(){
    this.setState(this._getStateFromStore());
  },
  /** @inheriteddoc */
  render: function renderBar() {
    var className = `bar ${this.props.style.className}`;
    return (
      <div className={className} data-focus='bar'>
        <div data-focus='bar-content-left'><this.state.barContentLeftComponent.component {...this.state.barContentLeftComponent.props}/> </div>
        <div data-focus='bar-content-right'><i className="fa fa-bell-o fa-2x"></i></div>
        <div data-focus='bar-content-middle'><this.state.summaryComponent.component {...this.state.summaryComponent.props}/></div>
      </div>
    );
  }
};

module.exports = builder(barMixin);
