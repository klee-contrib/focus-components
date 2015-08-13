'use strict';

var builder = require('focus').component.builder;
var React = require('react');
var type = require('focus').component.types;
var assign = require('object-assign');
var errorCenter = {
  getDefaultProps: function getDefaultProps() {
    return {
      source: window,
      errors: [],
      isErrorsVisible: false,
      numberDisplayed: 3
    };
  },
  getInitialState: function getInitialState() {
    return { errors: this.props.errors, isErrorsVisible: this.props.isErrorsVisible };
  },
  /** @inheriteddoc */
  componentWillMount: function componentWillMount() {
    var _this = this;

    this.props.source.onerror = function (e) {
      var errs = _this.state.errors;
      errs.push(e);
      _this.setState({ errors: errs });
    };
  },
  _toggleVisible: function _toggleVisible() {
    this.setState({ isErrorsVisible: !this.state.isErrorsVisible });
  },
  _renderErrors: function _renderErrors() {
    var _this2 = this;

    return React.createElement(
      'div',
      { 'data-focus': 'error-center' },
      React.createElement(
        'div',
        { 'data-focus': 'error-counter' },
        React.createElement('i', { className: 'fa fa-times-circle' }),
        this.state.errors.length
      ),
      React.createElement(
        'div',
        { 'data-focus': 'error-actions' },
        React.createElement('i', { className: 'fa fa-refresh', onClick: function () {
            window.location.reload();
          } }),
        React.createElement('i', { className: 'fa fa-arrow-circle-o-' + (this.state.isErrorsVisible ? 'up' : 'down'), onClick: this._toggleVisible }),
        React.createElement('i', { className: 'fa fa-trash-o', onClick: function () {
            _this2.setState({ errors: [] });
          } })
      ),
      React.createElement(
        'ul',
        { 'data-focus': 'error-stack' },
        this.state.isErrorsVisible ? this.state.errors.slice(this.state.errors.length - this.props.numberDisplayed, this.state.errors.length).map(function (err) {
          return React.createElement(
            'li',
            null,
            err
          );
        }) : null
      )
    );
  },
  /** @inheriteddoc */
  render: function render() {
    return this.state.errors.length > 0 ? this._renderErrors() : null;
  }
};

module.exports = builder(errorCenter);