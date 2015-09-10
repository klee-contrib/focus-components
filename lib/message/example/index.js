'use strict';

var Message = FocusComponents.message.component;

var MessageSample = React.createClass({
    displayName: 'MessageSample',

    getInitialState: function getInitialState() {
        return { isVisible: true };
    },
    _handleOnClick: function _handleOnClick() {
        this.setState({ isVisible: false });
    },
    /**
    * Render the component.
    * @return {object} React node.
    */
    render: function render() {
        var messageProps = {
            title: 'Alert',
            type: 'error', // success, info, warning, none
            content: 'An error has been encountered.',
            ttl: 1,
            handleOnClick: this._handleOnClick
        };
        var isVisible = this.state.isVisible;
        return React.createElement(
            'div',
            { className: 'message-example' },
            isVisible && React.createElement(Message, messageProps)
        );
    }
});

return React.createElement(MessageSample, null);