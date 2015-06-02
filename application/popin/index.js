// Dependencies
let React = require('react');
let builder = require('focus').component.builder;

/**
 * Small overlay component used to listen to scroll and prevent it to leave the Popin component
 */
let Overlay = React.createClass({
    /**
     * Component did mount event handler.
     * Add a listener to the mouse wheel, to spy the scroll.
     */
    componentDidMount: function () {
        React.findDOMNode(this.refs.overlay).addEventListener('mousewheel', this._onScroll);
        this._oldScroll = document.getElementsByTagName('body')[0].style['overflow-y'];
        document.getElementsByTagName('body')[0].style['overflow-y'] = 'hidden';
    },
    /**
     * Component will unmount event handler.
     * Remove the mouse wheel listener.
     */
    componentWillUnmount: function () {
        React.findDOMNode(this.refs.overlay).removeEventListener('mousewheel', this._onScroll);
        document.getElementsByTagName('body')[0].style['overflow-y'] = this._oldScroll;
    },
    /**
     * Mouse wheel event handler.
     * @param {Object} event - raised by the mouse wheel.
     * @private
     */
    _onScroll(event) {
        let target = event.target;
        let direction = event.wheelDeltaY < 0 ? 'down' : 'up';
        // Test if scrolling down the lower limit
        if (target.clientHeight + target.scrollTop === target.scrollHeight && direction === 'down') {
            event.preventDefault();
        }
        // Test if scrolling up the upper limit
        if (target.scrollTop === 0 && direction === 'up') {
            event.preventDefault();
        }
    },
    /**
     * Render the component
     * @return {XML} the rendered HTML
     */
    render() {
        return (
            <div data-focus='popin-overlay' data-visible={this.props.show} ref='overlay'
                 onClick={this.props.clickHandler}>
                {this.props.children}
            </div>
        );
    }
});

/**
 * The popin component configuration
 * @type {Object}
 */
let popin = {
    /**
     * Init the component.
     * The popin is closed by default.
     * @return {Object} the initial state
     */
    getInitialState() {
        return ({
            opened: false
        });
    },
    /**
     * Init the props if not provided.
     * By default, a popin is full, medium and modal.
     * @return {Object} the default props
     */
    getDefaultProps() {
        return ({
            modal: true,
            size: 'medium',
            type: 'full',
            level: 0,
            overlay: true
        });
    },
    /**
     * Helper attribute, for React debugging
     */
    displayName: 'Popin',
    /**
     * Properties validation
     */
    propTypes: {
        modal: React.PropTypes.bool,
        size: React.PropTypes.string,
        type: React.PropTypes.string,
        level: React.PropTypes.number,
        overlay: React.PropTypes.bool
    },
    /**
     * Toggle the popin's open state
     */
    toggleOpen() {
        this.setState({
            opened: !this.state.opened
        });
    },
    /**
     * Render the component
     * @return {XML} the rendered HTML
     */
    render() { // test for this.state.opened and return an Overlay component if true
        return (
            <div data-focus='popin' data-size={this._validateSize()} data-type={this.props.type}
                 data-level={this.props.level}>
                {this.state.opened &&
                <Overlay clickHandler={this.props.modal && this.toggleOpen} resize={this.props.type=='full'}
                         show={this.props.overlay}>
                    <div className={this._getAnimationClasses()} data-animation='animation' data-focus='popin-window'
                         onClick={this._preventPopinClose}>
                        <i className='fa fa-close' onClick={this.toggleOpen}></i>
                        {this.props.children}
                    </div>
                </Overlay>
                }
            </div>
        );
    },
    /**
     *
     * @return {*}
     * @private
     */
    _getAnimationClasses() {
        switch (this.props.type) {
            case 'from-menu':
                return 'animated fadeInLeftBig';
            case 'from-right':
                return 'animated fadeInRightBig';
            default:
                return 'animated zoomIn';
        }
    },
    /**
     * Validate the optional given size
     * @return {string} the validated size
     * @private
     */
    _validateSize() {
        if (['small', 'medium', 'large'].indexOf(this.props.size) === -1) {
            throw new Focus.exception.ArgumentInvalidException('Please provide a valid popin size among small, medium and large. Provided ' + this.props.size);
        }
        return this.props.size;
    },
    /**
     * Prevent popin close when there's a click on the popin window
     * @param {Object} event - raised by the click
     * @private
     */
    _preventPopinClose(event) {
        event.stopPropagation();
    }
};

module.exports = builder(popin);
