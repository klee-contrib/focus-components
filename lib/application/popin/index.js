// Dependencies

'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = require('react');
var builder = require('focus').component.builder;
var types = require('focus').component.types;
var ArgumentInvalidException = require('focus').exception.ArgumentInvalidException;
var includes = require('lodash').includes;

/**
 * Small overlay component used to listen to scroll and prevent it to leave the Popin component
 */
var Overlay = React.createClass({
    displayName: 'popin-overlay',
    propTypes: {
        children: types('object'),
        clickHandler: types('func'),
        show: types('boolean')
    },
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
        var direction = 0 > event.wheelDeltaY ? 'down' : 'up';
        // Test if scrolling down the lower limit
        if (target.clientHeight + target.scrollTop === target.scrollHeight && 'down' === direction) {
            event.preventDefault();
        }
        // Test if scrolling up the upper limit
        if (0 === target.scrollTop && 'up' === direction) {
            event.preventDefault();
        }
    },
    /**
     * Render the component
     * @return {XML} the rendered HTML
     */
    render: function render() {
        var _props = this.props;
        var children = _props.children;
        var clickHandler = _props.clickHandler;
        var show = _props.show;

        return React.createElement(
            'div',
            { className: 'animated fadeIn', 'data-animation': 'fadeIn', 'data-closing-animation': 'fadeOut', 'data-focus': 'popin-overlay', 'data-visible': show, onClick: clickHandler, ref: 'overlay' },
            children
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
        modal: types('bool'),
        size: types('string'),
        types: types('string'),
        level: types('number'),
        overlay: types('bool'),
        open: types('bool')
    },
    /**
     * Wheel event handler.
     * @param  {object} event wheel event
     */
    _onWheel: function _onWheel(event) {
        React.findDOMNode(this.refs['popin-window']).scrollTop += 0 < event.deltaY ? 100 : -100;
    },
    /**
     * Toggle the popin's open state
     */
    toggleOpen: function toggleOpen() {
        var _this = this;

        var timeout = 0;
        var opened = this.state.opened;
        var onPopinClose = this.props.onPopinClose;

        if (opened) {
            var popinWindow = React.findDOMNode(this.refs['popin-window']);
            var popinOverlay = React.findDOMNode(this.refs['popin-overlay']);
            popinWindow.classList.remove(popinWindow.getAttribute('data-animation'));
            popinWindow.classList.add(popinWindow.getAttribute('data-closing-animation'));
            popinOverlay.classList.remove(popinOverlay.getAttribute('data-animation'));
            popinOverlay.classList.add(popinOverlay.getAttribute('data-closing-animation'));
            timeout = 200;
        }
        if (opened && onPopinClose) {
            onPopinClose();
        }
        setTimeout(function () {
            // Store the current popin state
            var wasOpened = _this.state.opened;
            // If it was  opened, then we are closing it, so restore the body overflow before closing.
            if (wasOpened) {
                _this.refs['popin-overlay']._restoreBodyOverflow();
            }
            _this.setState({
                opened: !wasOpened
            }, function () {
                if (_this.refs['popin-overlay']) {
                    if (!wasOpened) {
                        // We just opened the popin, so store and hide the body overflow.
                        _this.refs['popin-overlay']._storeAndHideBodyOverflow();
                    }
                }
            });
        }, timeout);
    },
    /**
     * Render the component
     * @return {XML} the rendered HTML
     */
    render: function render() {
        // test for this.state.opened and return an Overlay component if true
        var _props2 = this.props;
        var type = _props2.type;
        var level = _props2.level;
        var modal = _props2.modal;
        var overlay = _props2.overlay;
        var children = _props2.children;

        return React.createElement(
            'div',
            { 'data-focus': 'popin', 'data-level': level, 'data-size': this._validateSize(), 'data-type': type },
            this.state.opened && React.createElement(
                Overlay,
                { clickHandler: modal && this.toggleOpen, ref: 'popin-overlay', resize: 'full' === type, show: overlay },
                React.createElement(
                    'div',
                    _extends({}, this._getAnimationProps(), { 'data-focus': 'popin-window', onClick: this._preventPopinClose, ref: 'popin-window' }),
                    React.createElement('i', { className: 'fa fa-close', onClick: this.toggleOpen }),
                    React.createElement(
                        'div',
                        { onWheel: this._onWheel },
                        children
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