'use strict';

var React = require('react');
var builder = require('focus').component.builder;
var user = require('focus').user;
var intersection = require('lodash/array/intersection');
var isArray = require('lodash/lang/isArray');
var type = require('focus').component.types;

/**
 * Mixin button.
 * @type {Object}
 */
var roleMixin = {
  propTypes: {
    hasOne: type('array'),
    hasAll: type('array')
  },
  render: function render() {
    var userRoles = user.getRoles();
    if (isArray(this.props.hasAll) && intersection(userRoles, this.props.hasAll).length === this.props.hasAll.length) {
      return this.props.children;
    } else if (isArray(this.props.hasOne) && intersection(userRoles, this.props.hasOne).length > 0) {
      return this.props.children;
    }
    return null;
  }
};

module.exports = builder(roleMixin);