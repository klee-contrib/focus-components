// Dependencies

'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = require('react');
var builder = require('focus').component.builder;
var type = require('focus').component.types;
var ArgumentInvalidException = require('focus').exception.ArgumentInvalidException;
var includes = require('lodash').includes;

/**
 * Small overlay component used to listen to scroll and prevent it to leave the Popin component
 */
var Overlay = React.createClass({
    displayName: 'Overlay',

    /**
     * Component did mount event handler.
     * Add a listener to the mouse wheel, to spy the scroll.
     */
    componentDidMount: function componentDidMount() {
        React.findDOMNode(this.refs.overlay).addEventListener('mousewheel', this._onScroll);
    },
    /**
     * Store the body overgflow property, and set it to hidden
     * @private
     */
    _storeAndHideBodyOverflow: function _storeAndHideBodyOverflow() {
        this._oldScroll = document.body.style['overflow-y'];
        document.body.style['overflow-y'] = 'hidden';
    },
    /**
     * Restore body overflow property
     * @private
     */
    _restoreBodyOverflow: function _restoreBodyOverflow() {
        document.body.style['overflow-y'] = this._oldScroll;
    },
    /**
     * Component will unmount event handler.
     * Remove the mouse wheel listener.
     */
    componentWillUnmount: function componentWillUnmount() {
        React.findDOMNode(this.refs.overlay).removeEventListener('mousewheel', this._onScroll);
    },
    /**
     * Mouse wheel event handler.
     * @param {Object} event - raised by the mouse wheel.
     * @private
     */
    _onScroll: function _onScroll(event) {
        var target = event.target;
        var direction = event.wheelDeltaY < 0 ? 'down' : 'up';
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
    render: function render() {
        return React.createElement(
            'div',
            { className: 'animated fadeIn', 'data-animation': 'fadeIn', 'data-closing-animation': 'fadeOut', 'data-focus': 'popin-overlay', 'data-visible': this.props.show, ref: 'overlay', onClick: this.props.clickHandler },
            this.props.children
        );
    }
});

/**
 * The popin component configuration
 * @type {Object}
 */
var popin = {
    /**
     * Init the component.
     * The popin is closed by default.
     * @return {Object} the initial state
     */
    getInitialState: function getInitialState() {
        return {
            opened: this.props.open
        };
    },
    /**
     * Init the props if not provided.
     * By default, a popin is full, medium and modal.
     * @return {Object} the default props
     */
    getDefaultProps: function getDefaultProps() {
        return {
            modal: true,
            size: 'medium',
            type: 'full',
            level: 0,
            overlay: true,
            open: false
        };
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
    _onWheel: function _onWheel(event) {
        React.findDOMNode(this.refs['popin-window']).scrollTop += event.deltaY > 0 ? 100 : -100;
    },
    /**
     * Toggle the popin's open state
     */
    toggleOpen: function toggleOpen() {
        var _this = this;

        var timeout = 0;
        if (this.state.opened) {
            var popinWindow = React.findDOMNode(this.refs['popin-window']);
            var popinOverlay = React.findDOMNode(this.refs['popin-overlay']);
            popinWindow.classList.remove(popinWindow.getAttribute('data-animation'));
            popinWindow.classList.add(popinWindow.getAttribute('data-closing-animation'));
            popinOverlay.classList.remove(popinOverlay.getAttribute('data-animation'));
            popinOverlay.classList.add(popinOverlay.getAttribute('data-closing-animation'));
            timeout = 200;
        }
        if (this.state.opened && this.props.onPopinClose) {
            this.props.onPopinClose();
        }
        setTimeout(function () {
            _this.setState({
                opened: !_this.state.opened
            });
            if (_this.refs['popin-overlay']) {
                _this.state.opened ? _this.refs['popin-overlay']._restoreBodyOverflow() : _this.refs['popin-overlay']._storeAndHideBodyOverflow();
            }
        }, timeout);
    },
    /**
     * Render the component
     * @return {XML} the rendered HTML
     */
    render: function render() {
        // test for this.state.opened and return an Overlay component if true
        return React.createElement(
            'div',
            { 'data-focus': 'popin', 'data-size': this._validateSize(), 'data-type': this.props.type,
                'data-level': this.props.level },
            this.state.opened && React.createElement(
                Overlay,
                { clickHandler: this.props.modal && this.toggleOpen, ref: 'popin-overlay', resize: this.props.type == 'full', show: this.props.overlay },
                React.createElement(
                    'div',
                    _extends({}, this._getAnimationProps(), { 'data-focus': 'popin-window', onClick: this._preventPopinClose, ref: 'popin-window' }),
                    React.createElement('i', { className: 'fa fa-close', onClick: this.toggleOpen }),
                    React.createElement(
                        'div',
                        { onWheel: this._onWheel },
                        this.props.children
                    )
                )
            )
        );
    },
    /**
     * Compute the animation classes
     * @return {Object} the props to attach to the component
     * @private
     */
    _getAnimationProps: function _getAnimationProps() {
        var openingAnimation = undefined;
        var closingAnimation = undefined;
        switch (this.props.type) {
            case 'from-menu':
                openingAnimation = 'slideInLeft';
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
        return {
            className: 'animated ' + openingAnimation,
            'data-animation': openingAnimation,
            'data-closing-animation': closingAnimation
        };
    },
    /**
     * Validate the optional given size
     * @return {string} the validated size
     * @private
     */
    _validateSize: function _validateSize() {
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
    _preventPopinClose: function _preventPopinClose(event) {
        event.stopPropagation();
    }
};

module.exports = builder(popin);