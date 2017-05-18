'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
//var SelectionList = Focus.components.list.selection.list.component;


var _builder = require('focus-core/component/builder');

var _builder2 = _interopRequireDefault(_builder);

var _types = require('focus-core/component/types');

var _types2 = _interopRequireDefault(_types);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var React = require('react');

var assign = require('object-assign');
var omit = require('lodash/object/omit');
var memoryMixin = require('../../list/mixin/memory-scroll');

var MemoryListMixin = {
    mixins: [memoryMixin],

    propTypes: {
        listComponent: (0, _types2.default)(['func', 'object'])
    },

    /** @inheritdoc */
    render: function renderFormList() {
        var data = this.props.data || [];
        var hasMoreData = data.length > this.state.maxElements;
        var childProps = omit(this.props, ['lineComponent', 'data']);
        return React.createElement(this.props.listComponent, _extends({
            ref: 'list',
            data: this.getDataToUse(),
            hasMoreData: hasMoreData,
            LineComponent: this.props.LineComponent,
            isSelection: false,
            isManualFetch: true,
            fetchNextPage: this.fetchNextPage,
            reference: this.getReference()
        }, childProps));
    }
};

module.exports = (0, _builder2.default)(MemoryListMixin);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJSZWFjdCIsInJlcXVpcmUiLCJhc3NpZ24iLCJvbWl0IiwibWVtb3J5TWl4aW4iLCJNZW1vcnlMaXN0TWl4aW4iLCJtaXhpbnMiLCJwcm9wVHlwZXMiLCJsaXN0Q29tcG9uZW50IiwicmVuZGVyIiwicmVuZGVyRm9ybUxpc3QiLCJkYXRhIiwicHJvcHMiLCJoYXNNb3JlRGF0YSIsImxlbmd0aCIsInN0YXRlIiwibWF4RWxlbWVudHMiLCJjaGlsZFByb3BzIiwiZ2V0RGF0YVRvVXNlIiwiTGluZUNvbXBvbmVudCIsImZldGNoTmV4dFBhZ2UiLCJnZXRSZWZlcmVuY2UiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7QUFDQTs7O0FBQ0E7Ozs7QUFFQTs7Ozs7O0FBREEsSUFBSUEsUUFBUUMsUUFBUSxPQUFSLENBQVo7O0FBRUEsSUFBSUMsU0FBU0QsUUFBUSxlQUFSLENBQWI7QUFDQSxJQUFJRSxPQUFPRixRQUFRLG9CQUFSLENBQVg7QUFDQSxJQUFJRyxjQUFjSCxRQUFRLGdDQUFSLENBQWxCOztBQUVBLElBQUlJLGtCQUFrQjtBQUNsQkMsWUFBUSxDQUFDRixXQUFELENBRFU7O0FBR2xCRyxlQUFXO0FBQ1BDLHVCQUFlLHFCQUFLLENBQUMsTUFBRCxFQUFTLFFBQVQsQ0FBTDtBQURSLEtBSE87O0FBT2xCO0FBQ0FDLFlBQVEsU0FBU0MsY0FBVCxHQUEwQjtBQUM5QixZQUFJQyxPQUFPLEtBQUtDLEtBQUwsQ0FBV0QsSUFBWCxJQUFtQixFQUE5QjtBQUNBLFlBQUlFLGNBQWNGLEtBQUtHLE1BQUwsR0FBYyxLQUFLQyxLQUFMLENBQVdDLFdBQTNDO0FBQ0EsWUFBSUMsYUFBYWQsS0FBSyxLQUFLUyxLQUFWLEVBQWlCLENBQUMsZUFBRCxFQUFrQixNQUFsQixDQUFqQixDQUFqQjtBQUNBLGVBQ0kseUJBQU0sS0FBTixDQUFZLGFBQVo7QUFDSSxpQkFBSSxNQURSO0FBRUksa0JBQU0sS0FBS00sWUFBTCxFQUZWO0FBR0kseUJBQWFMLFdBSGpCO0FBSUksMkJBQWUsS0FBS0QsS0FBTCxDQUFXTyxhQUo5QjtBQUtJLHlCQUFhLEtBTGpCO0FBTUksK0JBTko7QUFPSSwyQkFBZSxLQUFLQyxhQVB4QjtBQVFJLHVCQUFXLEtBQUtDLFlBQUw7QUFSZixXQVNRSixVQVRSLEVBREo7QUFhSDtBQXpCaUIsQ0FBdEI7O0FBNEJBSyxPQUFPQyxPQUFQLEdBQWlCLHVCQUFRbEIsZUFBUixDQUFqQiIsImZpbGUiOiJpcy1yZWFjdC1jbGFzcy1jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuLy92YXIgU2VsZWN0aW9uTGlzdCA9IEZvY3VzLmNvbXBvbmVudHMubGlzdC5zZWxlY3Rpb24ubGlzdC5jb21wb25lbnQ7XHJcbmltcG9ydCBidWlsZGVyIGZyb20gJ2ZvY3VzLWNvcmUvY29tcG9uZW50L2J1aWxkZXInO1xyXG5sZXQgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xyXG5pbXBvcnQgdHlwZSBmcm9tICdmb2N1cy1jb3JlL2NvbXBvbmVudC90eXBlcyc7XHJcbmxldCBhc3NpZ24gPSByZXF1aXJlKCdvYmplY3QtYXNzaWduJyk7XHJcbmxldCBvbWl0ID0gcmVxdWlyZSgnbG9kYXNoL29iamVjdC9vbWl0Jyk7XHJcbmxldCBtZW1vcnlNaXhpbiA9IHJlcXVpcmUoJy4uLy4uL2xpc3QvbWl4aW4vbWVtb3J5LXNjcm9sbCcpO1xyXG5cclxubGV0IE1lbW9yeUxpc3RNaXhpbiA9IHtcclxuICAgIG1peGluczogW21lbW9yeU1peGluXSxcclxuXHJcbiAgICBwcm9wVHlwZXM6IHtcclxuICAgICAgICBsaXN0Q29tcG9uZW50OiB0eXBlKFsnZnVuYycsICdvYmplY3QnXSlcclxuICAgIH0sXHJcblxyXG4gICAgLyoqIEBpbmhlcml0ZG9jICovXHJcbiAgICByZW5kZXI6IGZ1bmN0aW9uIHJlbmRlckZvcm1MaXN0KCkge1xyXG4gICAgICAgIHZhciBkYXRhID0gdGhpcy5wcm9wcy5kYXRhIHx8IFtdO1xyXG4gICAgICAgIHZhciBoYXNNb3JlRGF0YSA9IGRhdGEubGVuZ3RoID4gdGhpcy5zdGF0ZS5tYXhFbGVtZW50cztcclxuICAgICAgICB2YXIgY2hpbGRQcm9wcyA9IG9taXQodGhpcy5wcm9wcywgWydsaW5lQ29tcG9uZW50JywgJ2RhdGEnXSk7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPHRoaXMucHJvcHMubGlzdENvbXBvbmVudFxyXG4gICAgICAgICAgICAgICAgcmVmPSdsaXN0J1xyXG4gICAgICAgICAgICAgICAgZGF0YT17dGhpcy5nZXREYXRhVG9Vc2UoKX1cclxuICAgICAgICAgICAgICAgIGhhc01vcmVEYXRhPXtoYXNNb3JlRGF0YX1cclxuICAgICAgICAgICAgICAgIExpbmVDb21wb25lbnQ9e3RoaXMucHJvcHMuTGluZUNvbXBvbmVudH1cclxuICAgICAgICAgICAgICAgIGlzU2VsZWN0aW9uPXtmYWxzZX1cclxuICAgICAgICAgICAgICAgIGlzTWFudWFsRmV0Y2hcclxuICAgICAgICAgICAgICAgIGZldGNoTmV4dFBhZ2U9e3RoaXMuZmV0Y2hOZXh0UGFnZX1cclxuICAgICAgICAgICAgICAgIHJlZmVyZW5jZT17dGhpcy5nZXRSZWZlcmVuY2UoKX1cclxuICAgICAgICAgICAgICAgIHsuLi5jaGlsZFByb3BzfVxyXG4gICAgICAgICAgICAgICAgLz5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBidWlsZGVyKE1lbW9yeUxpc3RNaXhpbik7XHJcbiJdfQ==