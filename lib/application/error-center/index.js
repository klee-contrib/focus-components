'use strict';

var builder = require('focus').component.builder;

var React = require('react');
var REACT_NOT_COMPONENT_ERROR = 'Uncaught TypeError: undefined is not a function';
var REACT_NOT_COMPONENT_MESSAGE = 'Check your console errors, it seems you are trying to create a component from something which is not a component.';
/**
 * Error center component.
 * @example React.render(<ErrorCenter />, document.querySelector('#container'))
 * @type {Object}
 */
var errorCenter = {
    displayName: 'ErrorCenter',
    /** @inheriteddoc */
    getDefaultProps: function getDefaultProps() {
        return {
            source: window,
            errors: [],
            isErrorsVisible: false,
            numberDisplayed: 3
        };
    },
    /** @inheriteddoc */
    getInitialState: function getInitialState() {
        return { errors: this.props.errors, isErrorsVisible: this.props.isErrorsVisible };
    },
    /** @inheriteddoc */
    componentWillMount: function componentWillMount() {
        var _this = this;

        this.props.source.onerror = function (e) {
            var errors = _this.state.errors;

            errors.push(e);
            _this.setState({ errors: errors });
        };
    },
    /**
     * Toggle the visibility of the error component.
     */
    _toggleVisible: function _toggleVisible() {
        this.setState({ isErrorsVisible: !this.state.isErrorsVisible });
    },
    /**
     * Render all the errors.
     * @return {object} - The jsx errors.
     */
    _renderErrors: function _renderErrors() {
        var _this2 = this;

        var _state = this.state;
        var errors = _state.errors;
        var isErrorsVisible = _state.isErrorsVisible;
        var numberDisplayed = this.props.numberDisplayed;

        var errorLength = errors.length;
        return React.createElement(
            'div',
            { 'data-focus': 'error-center' },
            React.createElement(
                'div',
                { 'data-focus': 'error-counter' },
                React.createElement('i', { className: 'fa fa-times-circle' }),
                errorLength
            ),
            React.createElement(
                'div',
                { 'data-focus': 'error-actions' },
                React.createElement('i', { className: 'fa fa-refresh', onClick: function () {
                        window.location.reload();
                    } }),
                React.createElement('i', { className: 'fa fa-arrow-circle-o-' + (isErrorsVisible ? 'up' : 'down'), onClick: this._toggleVisible }),
                React.createElement('i', { className: 'fa fa-trash-o', onClick: function () {
                        _this2.setState({ errors: [] });
                    } })
            ),
            React.createElement(
                'ul',
                { 'data-focus': 'error-stack' },
                isErrorsVisible ? errors.slice(errorLength - numberDisplayed, errorLength).map(function (err) {
                    var e = REACT_NOT_COMPONENT_ERROR === err ? REACT_NOT_COMPONENT_MESSAGE : err;return React.createElement(
                        'li',
                        null,
                        e
                    );
                }) : null
            )
        );
    },
    /** @inheriteddoc */
    render: function render() {
        return 0 < this.state.errors.length ? this._renderErrors() : null;
    }
};

module.exports = builder(errorCenter);