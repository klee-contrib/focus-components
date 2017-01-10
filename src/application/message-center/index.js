import React from 'react';

import assign from 'object-assign';
import { upperFirst } from 'lodash';

import builder from 'focus-core/component/builder';

import messageStore from 'focus-core/message/built-in-store';
import { component as Message } from '../../message';

let messageCenterMixin = {
    getDefaultProps: function getCartridgeDefaultProps() {
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
    componentWillUnmount: function cartridgeWillUnMount() {
        messageStore.removePushedMessageListener(this._handlePushMessage);
        messageStore.removeClearMessagesListener(this._handleClearMessage);
    },
    _getStateFromStore: function getCartridgeStateFromStore() {
        return { messages: messageStore.getMessages() || {} };
    },
    _handlePushMessage: function _handlePushMessage(messageId) {
        let messages = this.state.messages;
        messages[messageId] = messageStore.getMessage(messageId);
        this.setState({ messages: messages });
    },
    _handleClearMessage: function _handleClearMessage() {
        this.setState({ messages: {} });
    },
    _handleRemoveMessage: function _handleRemoveMessage(messageId) {
        let msgs = this.state.messages;
        delete msgs[messageId];
        this.setState({ messages: msgs });
    },
    renderMessages: function renderMessages() {
        let msgs = [];
        for (let msgKey in this.state.messages) {
            let msg = this.state.messages[msgKey];
            let messageProps = assign(this.state.messages[msgKey], { handleOnClick: this._handleRemoveMessage, key: msgKey });
            if (msg.type === 'info' || msg.type === 'success') {
                assign(messageProps, { ttl: this.props[`ttl${upperFirst(msg.type)}`], handleTimeToLeave: this._handleRemoveMessage });
            }
            msgs.push(React.createElement(Message, messageProps));
        }
        return msgs;
    },
    /** @inheriteddoc */
    render: function renderMessageCenter() {
        let className = `message-center ${this.props.style.className}`;
        return (
            <div className={className} data-focus='message-center'>
                {this.renderMessages()}
            </div>
        );
    }
};

const builtComp = builder(messageCenterMixin);
const {component, mixin} = builtComp;

export {
    component,
    mixin
}
export default builtComp;