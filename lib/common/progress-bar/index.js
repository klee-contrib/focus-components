//Code from https://raw.githubusercontent.com/paramaggarwal/react-progressbar/master/index.js
//
'use strict';

var React = require('react');
var builder = require('focus').component.builder;

var progressMixin = {
  getDefaultProps: function getDefaultProps() {
    return {
      type: 'info'
    };
  },
  /**@inheritDoc**/
  render: function render() {
    var completed = +this.props.completed;
    if (completed < 0) {
      completed = 0;
    }
    if (completed > 100) {
      completed = 100;
    }

    var style = {
      width: completed + '%',
      transition: 'width 200ms',
      height: this.props.height || 4
    };
    return React.createElement(
      'div',
      { className: 'progress', 'data-focus': 'progress-bar' },
      React.createElement(
        'div',
        { className: 'progress-bar progress-bar-' + this.props.type, style: style },
        this.props.children
      )
    );
  }
};

module.exports = builder(progressMixin);