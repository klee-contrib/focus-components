let builder = require('focus').component.builder;
let React = require('react');
let type = require('focus').component.types;
let requestStore = require('focus').network.builtInStore();
let assign = require('object-assign');
let ProgressBar = require('../../common/progress-bar').component;
let Icon = require('../../common/icon').component;
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
    var completed  = +((this.state.total - this.state.pending)/this.state.total)*100;
    var visible = false;
    if(completed < 100){
      visible = true;
    }
    //Else empty the loading list?
    return (
      <div data-focus='loading-bar'>
        {visible && <ProgressBar completed={completed} />}
        <ul className='fa-ul'>
          <li><Icon name='circle-o-notch' other='fa-li fa-spin'/> pending {this.state.pending}</li>
          <li><Icon name='circle-thin' other='fa-li'/> cancelled {this.state.cancelled}</li>
          <li><Icon name='check' other='fa-li'/> success {this.state.success}</li>
          <li><Icon name='ban' other='fa-li'/>error {this.state.error}</li>
          <li><Icon name='plus-square-o' other='fa-li'/>total {this.state.total}</li>
        </ul>
      </div>
    );
  }
};

module.exports = builder(LoadingBarMixin);
