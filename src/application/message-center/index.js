import builder from 'focus-core/component/builder';
import React from 'react';
import messageStore from 'focus-core/message/built-in-store';
import { component as Message } from '../../message';
import assign from 'object-assign';
import capitalize from 'lodash/string/capitalize';

let messageCenterMixin = {
    getDefaultProps() {
        return {
            ttlInfo: 10000,
            ttlSuccess: 5000,
            style: {}
        };
    },
    /** @inheriteddoc */
    getInitialState() {
        return this._getStateFromStore();
    },
    /** @inheriteddoc */
    componentWillMount() {
        console.warn('FocusComponents 2.2.0: this component is deprecated, please use component from focus-components/components/message-center');
        messageStore.addPushedMessageListener(this._handlePushMessage);
        messageStore.addClearMessagesListener(this._handleClearMessage);
    },
    /** @inheriteddoc */
    componentWillUnmount() {
        messageStore.removePushedMessageListener(this._handlePushMessage);
        messageStore.removeClearMessagesListener(this._handleClearMessage);
    },
    _getStateFromStore() {
        return { messages: messageStore.getMessages() || {} };
    },
    _handlePushMessage(messageId) {
        let messages = this.state.messages;
        messages[messageId] = messageStore.getMessage(messageId);
        this.setState({ messages: messages });
    },
    _handleClearMessage() {
        this.setState({ messages: {} });
    },
    _handleRemoveMessage(messageId) {
        let msgs = this.state.messages;
        delete msgs[messageId];
        this.setState({ messages: msgs });
    },
    renderMessages() {
        let msgs = [];
        for (let msgKey in this.state.messages) {
            let msg = this.state.messages[msgKey];
            let messageProps = assign(this.state.messages[msgKey], { handleOnClick: this._handleRemoveMessage, key: msgKey });
            if (msg.type === 'info' || msg.type === 'success') {
                assign(messageProps, { ttl: this.props[`ttl${capitalize(msg.type)}`], handleTimeToLeave: this._handleRemoveMessage });
            }
            msgs.push(React.createElement(Message, messageProps));
        }
        return msgs;
    },
    /** @inheriteddoc */
    render() {
        let className = `message-center ${this.props.style.className}`;
        return (
            <div className={className} data-focus='message-center'>
                {this.renderMessages()}
            </div>
        );
    }
};

const { mixin, component } = builder(messageCenterMixin);
export { mixin, component };
export default { mixin, component };
