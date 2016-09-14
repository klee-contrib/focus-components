'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var consultFormComponent = function consultFormComponent(children, loading) {
    return _react2.default.createElement(
        'div',
        { 'data-focus': 'form', 'data-mode': 'consult', 'data-loading': loading },
        children
    );
};

var editFormComponent = function editFormComponent(children, loading, otherProps) {
    return _react2.default.createElement(
        'form',
        { className: 'form-horizontal', 'data-focus': 'form', 'data-mode': 'edit', 'data-loading': loading, noValidate: true },
        _react2.default.createElement(
            'fieldset',
            null,
            children
        )
    );
};

var formComponent = function formComponent(_ref) {
    var children = _ref.children;
    var editing = _ref.editing;
    var loading = _ref.loading;

    var otherProps = _objectWithoutProperties(_ref, ['children', 'editing', 'loading']);

    return editing ? editFormComponent(children, loading, otherProps) : consultFormComponent(children, loading);
};

formComponent.displayName = 'Form';
formComponent.propTypes = {
    editing: _react.PropTypes.bool.isRequired,
    loading: _react.PropTypes.bool
};
formComponent.defaultProps = {
    editing: false,
    loading: false
};
exports.default = formComponent;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZyLUZSLmpzIl0sIm5hbWVzIjpbImNvbnN1bHRGb3JtQ29tcG9uZW50IiwiY2hpbGRyZW4iLCJsb2FkaW5nIiwiZWRpdEZvcm1Db21wb25lbnQiLCJvdGhlclByb3BzIiwiZm9ybUNvbXBvbmVudCIsImVkaXRpbmciLCJkaXNwbGF5TmFtZSIsInByb3BUeXBlcyIsImJvb2wiLCJpc1JlcXVpcmVkIiwiZGVmYXVsdFByb3BzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTs7Ozs7Ozs7QUFFQSxJQUFNQSx1QkFBdUIsU0FBdkJBLG9CQUF1QixDQUFDQyxRQUFELEVBQVdDLE9BQVg7QUFBQSxXQUN4QjtBQUFBO0FBQUEsVUFBSyxjQUFXLE1BQWhCLEVBQXVCLGFBQVUsU0FBakMsRUFBMkMsZ0JBQWNBLE9BQXpEO0FBQW1FRDtBQUFuRSxLQUR3QjtBQUFBLENBQTdCOztBQUlBLElBQU1FLG9CQUFvQixTQUFwQkEsaUJBQW9CLENBQUNGLFFBQUQsRUFBV0MsT0FBWCxFQUFvQkUsVUFBcEI7QUFBQSxXQUN0QjtBQUFBO0FBQUEsVUFBTSxXQUFVLGlCQUFoQixFQUFrQyxjQUFXLE1BQTdDLEVBQW9ELGFBQVUsTUFBOUQsRUFBcUUsZ0JBQWNGLE9BQW5GLEVBQTRGLGdCQUE1RjtBQUNJO0FBQUE7QUFBQTtBQUNLRDtBQURMO0FBREosS0FEc0I7QUFBQSxDQUExQjs7QUFRQSxJQUFNSSxnQkFBZ0IsU0FBaEJBLGFBQWdCO0FBQUEsUUFBRUosUUFBRixRQUFFQSxRQUFGO0FBQUEsUUFBWUssT0FBWixRQUFZQSxPQUFaO0FBQUEsUUFBcUJKLE9BQXJCLFFBQXFCQSxPQUFyQjs7QUFBQSxRQUFpQ0UsVUFBakM7O0FBQUEsV0FBaURFLFVBQVVILGtCQUFrQkYsUUFBbEIsRUFBNEJDLE9BQTVCLEVBQXFDRSxVQUFyQyxDQUFWLEdBQTZESixxQkFBcUJDLFFBQXJCLEVBQStCQyxPQUEvQixDQUE5RztBQUFBLENBQXRCOztBQUVBRyxjQUFjRSxXQUFkLEdBQTRCLE1BQTVCO0FBQ0FGLGNBQWNHLFNBQWQsR0FBMEI7QUFDdEJGLGFBQVMsaUJBQVVHLElBQVYsQ0FBZUMsVUFERjtBQUV0QlIsYUFBUyxpQkFBVU87QUFGRyxDQUExQjtBQUlBSixjQUFjTSxZQUFkLEdBQTZCO0FBQ3pCTCxhQUFTLEtBRGdCO0FBRXpCSixhQUFTO0FBRmdCLENBQTdCO2tCQUllRyxhIiwiZmlsZSI6ImZyLUZSLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7UHJvcFR5cGVzfSBmcm9tICdyZWFjdCc7XHJcblxyXG5jb25zdCBjb25zdWx0Rm9ybUNvbXBvbmVudCA9IChjaGlsZHJlbiwgbG9hZGluZykgPT4gKFxyXG4gICAgIDxkaXYgZGF0YS1mb2N1cz0nZm9ybScgZGF0YS1tb2RlPSdjb25zdWx0JyBkYXRhLWxvYWRpbmc9e2xvYWRpbmd9PntjaGlsZHJlbn08L2Rpdj5cclxuKTtcclxuXHJcbmNvbnN0IGVkaXRGb3JtQ29tcG9uZW50ID0gKGNoaWxkcmVuLCBsb2FkaW5nLCBvdGhlclByb3BzKSA9PiAoXHJcbiAgICA8Zm9ybSBjbGFzc05hbWU9J2Zvcm0taG9yaXpvbnRhbCcgZGF0YS1mb2N1cz0nZm9ybScgZGF0YS1tb2RlPSdlZGl0JyBkYXRhLWxvYWRpbmc9e2xvYWRpbmd9IG5vVmFsaWRhdGU+XHJcbiAgICAgICAgPGZpZWxkc2V0PlxyXG4gICAgICAgICAgICB7Y2hpbGRyZW59XHJcbiAgICAgICAgPC9maWVsZHNldD5cclxuICAgIDwvZm9ybT5cclxuKTtcclxuXHJcbmNvbnN0IGZvcm1Db21wb25lbnQgPSAoe2NoaWxkcmVuLCBlZGl0aW5nLCBsb2FkaW5nLCAuLi5vdGhlclByb3BzfSkgPT4gZWRpdGluZyA/IGVkaXRGb3JtQ29tcG9uZW50KGNoaWxkcmVuLCBsb2FkaW5nLCBvdGhlclByb3BzKSA6IGNvbnN1bHRGb3JtQ29tcG9uZW50KGNoaWxkcmVuLCBsb2FkaW5nKTtcclxuXHJcbmZvcm1Db21wb25lbnQuZGlzcGxheU5hbWUgPSAnRm9ybSc7XHJcbmZvcm1Db21wb25lbnQucHJvcFR5cGVzID0ge1xyXG4gICAgZWRpdGluZzogUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcclxuICAgIGxvYWRpbmc6IFByb3BUeXBlcy5ib29sXHJcbn07XHJcbmZvcm1Db21wb25lbnQuZGVmYXVsdFByb3BzID0ge1xyXG4gICAgZWRpdGluZzogZmFsc2UsXHJcbiAgICBsb2FkaW5nOiBmYWxzZVxyXG59O1xyXG5leHBvcnQgZGVmYXVsdCBmb3JtQ29tcG9uZW50O1xyXG4iXX0=