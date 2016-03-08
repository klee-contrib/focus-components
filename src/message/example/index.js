const Message = FocusComponents.message.component;

const MessageSample = React.createClass({
    getInitialState() {
        return {isVisible: true};
    },
    _handleOnClick: function() {
        this.setState({isVisible: false});
    },
    /**
    * Render the component.
    * @return {object} React node.
    */
    render() {
        const messageProps = {
            title: 'Alert',
            type: 'error', // success, info, warning, none
            content: 'An error has been encountered.',
            ttl: 1,
            handleOnClick: this._handleOnClick
        };
        const isVisible = this.state.isVisible;
        return (
            <div className='message-example'>
                {isVisible &&
                    <Message {...messageProps} />
                }
            </div>
        );
    }
});

return <MessageSample/>;
