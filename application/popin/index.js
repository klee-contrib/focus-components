// Dependencies

let React = require('react');
let builder = require('focus').component.builder;
let type = require('focus').component.types;
let ArgumentInvalidException = require('focus').exception.ArgumentInvalidException;
let includes = require('lodash').includes;

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
    },
    /**
     * Store the body overgflow property, and set it to hidden
     * @private
     */
    _storeAndHideBodyOverflow() {
        this._oldScroll = document.body.style['overflow-y'];
        document.body.style['overflow-y'] = 'hidden';
    },
    /**
     * Restore body overflow property
     * @private
     */
    _restoreBodyOverflow() {
        document.body.style['overflow-y'] = this._oldScroll;
    },
    /**
     * Component will unmount event handler.
     * Remove the mouse wheel listener.
     */
    componentWillUnmount: function () {
        React.findDOMNode(this.refs.overlay).removeEventListener('mousewheel', this._onScroll);
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
            <div className='animated fadeIn' data-animation='fadeIn' data-closing-animation='fadeOut' data-focus='popin-overlay' data-visible={this.props.show} ref='overlay' onClick={this.props.clickHandler}>
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
            opened: this.props.open
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
            overlay: true,
            open: false
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
        modal: type('bool'),
        size: type('string'),
        type: type('string'),
        level: type('number'),
        overlay: type('bool'),
        open: type('bool')
    },
    _onWheel(event) {
        React.findDOMNode(this.refs['popin-window']).scrollTop += event.deltaY > 0 ? 100 : -100;
    },
    /**
     * Toggle the popin's open state
     */
    toggleOpen() {
        let timeout = 0;
        if (this.state.opened) {
            let popinWindow = React.findDOMNode(this.refs['popin-window']);
            let popinOverlay = React.findDOMNode(this.refs['popin-overlay']);
            popinWindow.classList.remove(popinWindow.getAttribute('data-animation'));
            popinWindow.classList.add(popinWindow.getAttribute('data-closing-animation'));
            popinOverlay.classList.remove(popinOverlay.getAttribute('data-animation'));
            popinOverlay.classList.add(popinOverlay.getAttribute('data-closing-animation'));
            timeout = 200;
        }
        setTimeout(() => {
            this.setState({
                opened: !this.state.opened
            });
            if (this.refs['popin-overlay']) {
                this.state.opened ? this.refs['popin-overlay']._restoreBodyOverflow() : this.refs['popin-overlay']._storeAndHideBodyOverflow();
            }
        }, timeout);
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
                <Overlay clickHandler={this.props.modal && this.toggleOpen} ref='popin-overlay' resize={this.props.type=='full'} show={this.props.overlay}>
                    <div {...this._getAnimationProps()} data-focus='popin-window' onClick={this._preventPopinClose} ref='popin-window'>
                        <i className='fa fa-close' onClick={this.toggleOpen}></i>
                        <div onWheel={this._onWheel}>
                            {this.props.children}
                        </div>
                    </div>
                </Overlay>
                }
            </div>
        );
    },
    /**
     * Compute the animation classes
     * @return {Object} the props to attach to the component
     * @private
     */
    _getAnimationProps() {
        let openingAnimation;
        let closingAnimation;
        switch (this.props.type) {
            case 'from-menu':
                openingAnimation =  'slideInLeft';
                closingAnimation = 'slideOutLeft';
                break;
            case 'from-right':
                openingAnimation = 'slideInRight';
                closingAnimation = 'slideOutRight';
                break;
            default:
                openingAnimation = 'zoomIn';
                closingAnimation = 'zoomOut';
                break;
        }
        return ({
            className: `animated ${openingAnimation}`,
            'data-animation': openingAnimation,
            'data-closing-animation': closingAnimation
        });
    },
    /**
     * Validate the optional given size
     * @return {string} the validated size
     * @private
     */
    _validateSize() {
        if (!includes(['small', 'medium', 'large'], this.props.size)) {
            throw new ArgumentInvalidException('Please provide a valid popin size among small, medium and large. Provided ' + this.props.size);
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
