var builder = require('focus').component.builder;
var React = require('react');
var type = require('focus').component.types;
var messageStore = require('focus').message.builtInStore();
var Message = require('../../message').component;
var assign = require('object-assign');

var messageCenterMixin = {
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
    messageStore.addPushedMessageListener(this._handlePushMessage);
    messageStore.addClearMessagesListener(this._handleClearMessage);
  },
  /** @inheriteddoc */
  componentWillUnMount: function cartridgeWillUnMount(){
    messageStore.removePushedMessageListener(this._handlePushMessage);
    messageStore.removeClearMessagesListener(this._handleClearMessage);
  },
  _getStateFromStore: function getCartridgeStateFromStore(){
    return {messages: messageStore.getMessages() || {} };
  },
  _handlePushMessage: function _handlePushMessage(messageId){
    var messages = this.state.messages;
    messages[messageId] = messageStore.getMessage(messageId);
    this.setState({messages: messages});
  },
  _handleClearMessage: function _handleClearMessage(){
    this.setState({messages: {}});
  },
  _handleRemoveMessage: function _handleRemoveMessage(messageId){
    var msgs = this.state.messages;
    delete msgs[messageId];
    this.setState({messages: msgs});
  },
  renderMessages: function renderMessages(){
    var msgs = [];
    for(var msgKey in this.state.messages){
      msgs.push(React.createElement(Message, assign(this.state.messages[msgKey], {handleOnClick: this._handleRemoveMessage, key: msgKey})));
    }
    return msgs;
  },
  /** @inheriteddoc */
  render: function renderMessageCenter() {
    var className = `message-center ${this.props.style.className}`;
    return (
      <div className={className} data-focus-message-center>
        <h1>Message center</h1>
        {this.renderMessages()}
      </div>
    );
  }
};

module.exports = builder(messageCenterMixin);
