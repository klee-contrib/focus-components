var builder = require('focus').component.builder;
var React = require('react');
var type = require('focus').component.types;
var messageStore = require('focus').message.builtInStore();
var Message = require('../../message').component;
var assign = require('object-assign');
var capitalize = require('lodash/string/capitalize')
var messageCenterMixin = {
  getDefaultProps: function getCartridgeDefaultProps(){
    return {
      ttlInfo: 10000,
      ttlSuccess: 5000,
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
      let msg = this.state.messages[msgKey];
      let ttlConf = {};
      let messageProps = assign(this.state.messages[msgKey], {handleOnClick: this._handleRemoveMessage, key: msgKey});
      if(msg.type === 'info' || msg.type ==='success'){
        assign(messageProps, {ttl: this.props[`ttl${capitalize(msg.type)}`], handleTimeToLeave: this._handleRemoveMessage});
      }
      msgs.push(React.createElement(Message, messageProps));
    }
    return msgs;
  },
  /** @inheriteddoc */
  render: function renderMessageCenter() {
    var className = `message-center ${this.props.style.className}`;
    return (
      <div className={className} data-focus='message-center'>
        {this.renderMessages()}
      </div>
    );
  }
};

module.exports = builder(messageCenterMixin);
