import React, {Component, PropTypes} from 'react';
import capitalize from 'lodash/string/capitalize';
import messageStore from 'focus-core/message/built-in-store';

const defaultProps = {
    ttlError: 8000,
    ttlInfo: 3000,
    ttlSuccess: 3000,
    ttlWarning: 3000
};

const propTypes = {
    ttlError: PropTypes.number.isRequired,
    ttlInfo: PropTypes.number.isRequired,
    ttlSuccess: PropTypes.number.isRequired,
    ttlWarning: PropTypes.number.isRequired
};

const CONSTANT = {
    ANIMATION_LENGTH: 250
};

class MessageCenter extends Component {

    queuedNotifications = [];

    constructor(props) {
        super(props);
        this.state = {
            active: false,
            currentNotification: null,
        };
    };



    /** @inheriteddoc */
    componentWillMount() {
        messageStore.addPushedMessageListener(this._handlePushMessage);
    };
    /** @inheriteddoc */
    componentWillUnmount() {
        messageStore.removePushedMessageListener(this._handlePushMessage);
    };

    /**
    * Check if the queue has items within it.
    * If it does, display the next entry.
    *
    * @private
    */
    _checkQueue = () => {
        if (this.queuedNotifications.length > 0) {
            this.showSnackbar(this.queuedNotifications.shift());
        }
    };

    /**
    * Cleanup the snackbar event listeners and accessiblity attributes.
    *
    * @private
    */
    _cleanup = () => {
        setTimeout(() => {
            this.setState({
                currentNotification: null,
                active: null
            })
            this._checkQueue();
        }, CONSTANT.ANIMATION_LENGTH);
    };

    _handlePushMessage = messageId => {
        const message = messageStore.getMessage(messageId);
        const {content, action, type} = message;
        const ttl = this.props[`ttl${capitalize(type)}`];
        const notificationData = {
            message: content,
            timeout: ttl
        };
        if(action) {
            notificationData['actionText'] = action.text;
            notificationData['actionHandler'] = action.handler;
        }
        this.showSnackbar(notificationData);
    };

    /** @inheritDoc */
    render() {
        const { active, currentNotification } = this.state;
        const notification = currentNotification == null ? {} : currentNotification;
        const { actionText, actionHandler, message } = notification;
        const classNames = `mdl-snackbar ${active ? 'mdl-snackbar--active' :  ''}`;
        const otherProps = { 'aria-hidden': active, 'aria-live':'assertive', 'aria-atomic':'true', 'aria-relevant': 'text' };
        return (
            <div data-focus='snackbar-message-center' className={classNames} {...otherProps}>
                <div className='mdl-snackbar__text'>{message}</div>
                {actionText &&
                    <button className='mdl-snackbar__action' type='button' onClick={actionHandler}>{actionText}</button>
                }
            </div>
        );
    };

    /**
    * Show the snackbar.
    *
    * @param {Object} data The data for the notification.
    * @public
    */
    showSnackbar = data => {
        if (data === undefined) {
            throw new Error('Please provide a data object with at least a message to display.');
        }
        if (data['message'] === undefined) {
            throw new Error('Please provide a message to be displayed.');
        }
        if (data['actionHandler'] && !data['actionText']) {
            throw new Error('Please provide action text with the handler.');
        }
        const {active} = this.state;
        if (active) {
            this.queuedNotifications.push(data);
        } else {
            this.setState({
                active: true,
                currentNotification: data
            });
            setTimeout(this._cleanup, data.timeout);
        }
    };

};

//Static props.
MessageCenter.displayName = 'MessageCenter';
MessageCenter.defaultProps = defaultProps;
MessageCenter.propTypes = propTypes;

export default MessageCenter;
