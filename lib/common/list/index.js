
//var SelectionList = Focus.components.list.selection.list.component;
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var builder = require('focus').component.builder;
var React = require('react');
var type = require('focus').component.types;
var assign = require('object-assign');
var omit = require('lodash/object/omit');
var memoryMixin = require('../../list/mixin/memory-scroll');

var MemoryListMixin = {
  mixins: [memoryMixin],

  propTypes: {
    listComponent: type(['function', 'object'])
  },

  /** @inheritdoc */
  render: function renderFormList() {
    var data = this.props.data || [];
    var hasMoreData = data.length > this.state.maxElements;
    var childProps = omit(this.props, ['lineComponent', 'data']);
    return React.createElement(this.props.listComponent, _extends({
      data: this.getDataToUse(),
      hasMoreData: hasMoreData,
      lineComponent: this.props.lineComponent,
      isSelection: false,
      isManualFetch: true,
      fetchNextPage: this.fetchNextPage,
      reference: this.getReference()
    }, childProps));
  }
};

module.exports = builder(MemoryListMixin);