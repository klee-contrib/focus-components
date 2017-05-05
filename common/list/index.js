'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.mixin = exports.component = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
//var SelectionList = Focus.components.list.selection.list.component;


var _builder = require('focus-core/component/builder');

var _builder2 = _interopRequireDefault(_builder);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _types = require('focus-core/component/types');

var _types2 = _interopRequireDefault(_types);

var _lodash = require('lodash');

var _memoryScroll = require('../../list/mixin/memory-scroll');

var _memoryScroll2 = _interopRequireDefault(_memoryScroll);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MemoryListMixin = {
    mixins: [_memoryScroll2.default],

    propTypes: {
        listComponent: (0, _types2.default)(['func', 'object'])
    },

    /** @inheritdoc */
    render: function renderFormList() {
        var data = this.props.data || [];
        var hasMoreData = data.length > this.state.maxElements;
        var childProps = (0, _lodash.omit)(this.props, ['lineComponent', 'data']);
        return _react2.default.createElement(this.props.listComponent, _extends({
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

var builtComp = (0, _builder2.default)(MemoryListMixin);
var component = builtComp.component,
    mixin = builtComp.mixin;
exports.component = component;
exports.mixin = mixin;
exports.default = builtComp;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJNZW1vcnlMaXN0TWl4aW4iLCJtaXhpbnMiLCJwcm9wVHlwZXMiLCJsaXN0Q29tcG9uZW50IiwicmVuZGVyIiwicmVuZGVyRm9ybUxpc3QiLCJkYXRhIiwicHJvcHMiLCJoYXNNb3JlRGF0YSIsImxlbmd0aCIsInN0YXRlIiwibWF4RWxlbWVudHMiLCJjaGlsZFByb3BzIiwiZ2V0RGF0YVRvVXNlIiwiTGluZUNvbXBvbmVudCIsImZldGNoTmV4dFBhZ2UiLCJnZXRSZWZlcmVuY2UiLCJidWlsdENvbXAiLCJjb21wb25lbnQiLCJtaXhpbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFDQTs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7OztBQUVBLElBQUlBLGtCQUFrQjtBQUNsQkMsWUFBUSx3QkFEVTs7QUFHbEJDLGVBQVc7QUFDUEMsdUJBQWUscUJBQUssQ0FBQyxNQUFELEVBQVMsUUFBVCxDQUFMO0FBRFIsS0FITzs7QUFPbEI7QUFDQUMsWUFBUSxTQUFTQyxjQUFULEdBQTBCO0FBQzlCLFlBQUlDLE9BQU8sS0FBS0MsS0FBTCxDQUFXRCxJQUFYLElBQW1CLEVBQTlCO0FBQ0EsWUFBSUUsY0FBY0YsS0FBS0csTUFBTCxHQUFjLEtBQUtDLEtBQUwsQ0FBV0MsV0FBM0M7QUFDQSxZQUFJQyxhQUFhLGtCQUFLLEtBQUtMLEtBQVYsRUFBaUIsQ0FBQyxlQUFELEVBQWtCLE1BQWxCLENBQWpCLENBQWpCO0FBQ0EsZUFDSSxtQ0FBTSxLQUFOLENBQVksYUFBWjtBQUNJLGlCQUFJLE1BRFI7QUFFSSxrQkFBTSxLQUFLTSxZQUFMLEVBRlY7QUFHSSx5QkFBYUwsV0FIakI7QUFJSSwyQkFBZSxLQUFLRCxLQUFMLENBQVdPLGFBSjlCO0FBS0kseUJBQWEsS0FMakI7QUFNSSwrQkFOSjtBQU9JLDJCQUFlLEtBQUtDLGFBUHhCO0FBUUksdUJBQVcsS0FBS0MsWUFBTDtBQVJmLFdBU1FKLFVBVFIsRUFESjtBQWFIO0FBekJpQixDQUF0Qjs7QUE0QkEsSUFBTUssWUFBWSx1QkFBUWpCLGVBQVIsQ0FBbEI7SUFDT2tCLFMsR0FBb0JELFMsQ0FBcEJDLFM7SUFBV0MsSyxHQUFTRixTLENBQVRFLEs7UUFHZEQsUyxHQUFBQSxTO1FBQ0FDLEssR0FBQUEsSztrQkFFV0YsUyIsImZpbGUiOiJpcy1yZWFjdC1jbGFzcy1jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuLy92YXIgU2VsZWN0aW9uTGlzdCA9IEZvY3VzLmNvbXBvbmVudHMubGlzdC5zZWxlY3Rpb24ubGlzdC5jb21wb25lbnQ7XHJcbmltcG9ydCBidWlsZGVyIGZyb20gJ2ZvY3VzLWNvcmUvY29tcG9uZW50L2J1aWxkZXInO1xyXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgdHlwZSBmcm9tICdmb2N1cy1jb3JlL2NvbXBvbmVudC90eXBlcyc7XHJcbmltcG9ydCB7b21pdH0gZnJvbSAnbG9kYXNoJztcclxuaW1wb3J0IG1lbW9yeU1peGluIGZyb20gJy4uLy4uL2xpc3QvbWl4aW4vbWVtb3J5LXNjcm9sbCc7XHJcblxyXG5sZXQgTWVtb3J5TGlzdE1peGluID0ge1xyXG4gICAgbWl4aW5zOiBbbWVtb3J5TWl4aW5dLFxyXG5cclxuICAgIHByb3BUeXBlczoge1xyXG4gICAgICAgIGxpc3RDb21wb25lbnQ6IHR5cGUoWydmdW5jJywgJ29iamVjdCddKVxyXG4gICAgfSxcclxuXHJcbiAgICAvKiogQGluaGVyaXRkb2MgKi9cclxuICAgIHJlbmRlcjogZnVuY3Rpb24gcmVuZGVyRm9ybUxpc3QoKSB7XHJcbiAgICAgICAgbGV0IGRhdGEgPSB0aGlzLnByb3BzLmRhdGEgfHwgW107XHJcbiAgICAgICAgbGV0IGhhc01vcmVEYXRhID0gZGF0YS5sZW5ndGggPiB0aGlzLnN0YXRlLm1heEVsZW1lbnRzO1xyXG4gICAgICAgIGxldCBjaGlsZFByb3BzID0gb21pdCh0aGlzLnByb3BzLCBbJ2xpbmVDb21wb25lbnQnLCAnZGF0YSddKTtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8dGhpcy5wcm9wcy5saXN0Q29tcG9uZW50XHJcbiAgICAgICAgICAgICAgICByZWY9J2xpc3QnXHJcbiAgICAgICAgICAgICAgICBkYXRhPXt0aGlzLmdldERhdGFUb1VzZSgpfVxyXG4gICAgICAgICAgICAgICAgaGFzTW9yZURhdGE9e2hhc01vcmVEYXRhfVxyXG4gICAgICAgICAgICAgICAgTGluZUNvbXBvbmVudD17dGhpcy5wcm9wcy5MaW5lQ29tcG9uZW50fVxyXG4gICAgICAgICAgICAgICAgaXNTZWxlY3Rpb249e2ZhbHNlfVxyXG4gICAgICAgICAgICAgICAgaXNNYW51YWxGZXRjaFxyXG4gICAgICAgICAgICAgICAgZmV0Y2hOZXh0UGFnZT17dGhpcy5mZXRjaE5leHRQYWdlfVxyXG4gICAgICAgICAgICAgICAgcmVmZXJlbmNlPXt0aGlzLmdldFJlZmVyZW5jZSgpfVxyXG4gICAgICAgICAgICAgICAgey4uLmNoaWxkUHJvcHN9XHJcbiAgICAgICAgICAgIC8+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufTtcclxuXHJcbmNvbnN0IGJ1aWx0Q29tcCA9IGJ1aWxkZXIoTWVtb3J5TGlzdE1peGluKTtcclxuY29uc3Qge2NvbXBvbmVudCwgbWl4aW59ID0gYnVpbHRDb21wO1xyXG5cclxuZXhwb3J0IHtcclxuICAgIGNvbXBvbmVudCxcclxuICAgIG1peGluXHJcbn1cclxuZXhwb3J0IGRlZmF1bHQgYnVpbHRDb21wOyJdfQ==