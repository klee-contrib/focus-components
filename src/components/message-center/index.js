import React, {Component, PropTypes} from 'react';
import capitalize from 'lodash/string/capitalize';
import messageStore from 'focus-core/message/built-in-store';

const defaultProps = {
    ttlError: 10000,
    ttlInfo: 10000,
    ttlSuccess: 5000,
    ttlWarning: 5000
};

const propTypes = {
    ttlError: PropTypes.number.isRequired,
    ttlInfo: PropTypes.number.isRequired,
    ttlSuccess: PropTypes.number.isRequired,
    ttlWarning: PropTypes.number.isRequired
};

class MessageCenter extends Component {

    /** @inheriteddoc */
    componentWillMount() {
        messageStore.addPushedMessageListener(this._handlePushMessage);
    };
    /** @inheriteddoc */
    componentWillUnmount() {
        messageStore.removePushedMessageListener(this._handlePushMessage);
    };


    _handlePushMessage = messageId => {
        const {snackbarContainer} = this.refs;
        const message = messageStore.getMessage(messageId);
        const {content, action, type} = message;
        const ttl = this.props[`ttl${capitalize(type)}`];
        var messageData = {
            message: content,
            timeout: ttl
        };
        if(action) {
            messageData.actionText = action.text;
            messageData.actionHandler = action.handler;
        }
        snackbarContainer.MaterialSnackbar.showSnackbar(messageData);
    };



    /** @inheritDoc */
    render() {
        return (
            <div data-focus='message-center2' className='mdl-js-snackbar mdl-snackbar' aria-live='assertive' aria-atomic='true' aria-relevant='text' ref='snackbarContainer'>
                <div className='mdl-snackbar__text'></div>
                <button className='mdl-snackbar__action' type='button'></button>
            </div>
        );
    };

};

//Static props.
MessageCenter.displayName = 'MessageCenter';
MessageCenter.defaultProps = defaultProps;
MessageCenter.propTypes = propTypes;

export default MessageCenter;
