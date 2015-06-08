let builder = require('focus').component.builder;
let React = require('react');
let type = require('focus').component.types;
let requestStore = require('focus').network.builtInStore();
let assign = require('object-assign');
let ProgressBar = require('../../common/progress-bar').component;
let LoadingBarMixin = {
  /** @inheriteddoc */
  getInitialState() {
    return this._getStateFromStore();
  },
  /** @inheriteddoc */
  componentWillMount() {
    requestStore.addUpdateRequestListener(this._handleRequestsUpdate);
    requestStore.addClearRequestsListener(this._handleClearRequests);
  },
  /** @inheriteddoc */
  componentWillUnMount: function cartridgeWillUnMount(){
    requestStore.removeUpdateRequestListener(this._handleRequestsUpdate);
    requestStore.removeClearRequestsListener(this._handleClearRequests);
  },
  _getStateFromStore: function getCartridgeStateFromStore(){
    return requestStore.getRequests();
  },
  _handleRequestsUpdate: function _handlePushMessage(messageId){
    this.setState(this._getStateFromStore());
  },
  _handleClearRequests(){
    this.setState({requests: {}});
  },
  /** @inheriteddoc */
  render: function renderProgressBar() {
    var completed  = +(this.state.pending/this.state.total)*100;
    return (
      <div data-focus='request-bar'>
        <ProgressBar completed={completed} />
        <ul>
          <li>pending {this.state.pending}</li>
          <li>cancelled {this.state.cancelled}</li>
          <li>success {this.state.success}</li>
          <li>error {this.state.error}</li>
          <li>total {this.state.total}</li>
        </ul>
      </div>
    );
  }
};

module.exports = builder(LoadingBarMixin);
