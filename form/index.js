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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZyLUZSLmpzIl0sIm5hbWVzIjpbImNvbnN1bHRGb3JtQ29tcG9uZW50IiwiY2hpbGRyZW4iLCJsb2FkaW5nIiwiZWRpdEZvcm1Db21wb25lbnQiLCJvdGhlclByb3BzIiwiZm9ybUNvbXBvbmVudCIsImVkaXRpbmciLCJkaXNwbGF5TmFtZSIsInByb3BUeXBlcyIsImJvb2wiLCJpc1JlcXVpcmVkIiwiZGVmYXVsdFByb3BzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTs7Ozs7Ozs7QUFFQSxJQUFNQSx1QkFBdUIsU0FBdkJBLG9CQUF1QixDQUFDQyxRQUFELEVBQVdDLE9BQVg7QUFBQSxXQUN4QjtBQUFBO0FBQUEsVUFBSyxjQUFXLE1BQWhCLEVBQXVCLGFBQVUsU0FBakMsRUFBMkMsZ0JBQWNBLE9BQXpEO0FBQW1FRDtBQUFuRSxLQUR3QjtBQUFBLENBQTdCOztBQUlBLElBQU1FLG9CQUFvQixTQUFwQkEsaUJBQW9CLENBQUNGLFFBQUQsRUFBV0MsT0FBWCxFQUFvQkUsVUFBcEI7QUFBQSxXQUN0QjtBQUFBO0FBQUEsVUFBTSxXQUFVLGlCQUFoQixFQUFrQyxjQUFXLE1BQTdDLEVBQW9ELGFBQVUsTUFBOUQsRUFBcUUsZ0JBQWNGLE9BQW5GLEVBQTRGLGdCQUE1RjtBQUNJO0FBQUE7QUFBQTtBQUNLRDtBQURMO0FBREosS0FEc0I7QUFBQSxDQUExQjs7QUFRQSxJQUFNSSxnQkFBZ0IsU0FBaEJBLGFBQWdCO0FBQUEsUUFBRUosUUFBRixRQUFFQSxRQUFGO0FBQUEsUUFBWUssT0FBWixRQUFZQSxPQUFaO0FBQUEsUUFBcUJKLE9BQXJCLFFBQXFCQSxPQUFyQjs7QUFBQSxRQUFpQ0UsVUFBakM7O0FBQUEsV0FBaURFLFVBQVVILGtCQUFrQkYsUUFBbEIsRUFBNEJDLE9BQTVCLEVBQXFDRSxVQUFyQyxDQUFWLEdBQTZESixxQkFBcUJDLFFBQXJCLEVBQStCQyxPQUEvQixDQUE5RztBQUFBLENBQXRCOztBQUVBRyxjQUFjRSxXQUFkLEdBQTRCLE1BQTVCO0FBQ0FGLGNBQWNHLFNBQWQsR0FBMEI7QUFDdEJGLGFBQVMsaUJBQVVHLElBQVYsQ0FBZUMsVUFERjtBQUV0QlIsYUFBUyxpQkFBVU87QUFGRyxDQUExQjtBQUlBSixjQUFjTSxZQUFkLEdBQTZCO0FBQ3pCTCxhQUFTLEtBRGdCO0FBRXpCSixhQUFTO0FBRmdCLENBQTdCO2tCQUllRyxhIiwiZmlsZSI6ImZyLUZSLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7UHJvcFR5cGVzfSBmcm9tICdyZWFjdCc7XG5cbmNvbnN0IGNvbnN1bHRGb3JtQ29tcG9uZW50ID0gKGNoaWxkcmVuLCBsb2FkaW5nKSA9PiAoXG4gICAgIDxkaXYgZGF0YS1mb2N1cz0nZm9ybScgZGF0YS1tb2RlPSdjb25zdWx0JyBkYXRhLWxvYWRpbmc9e2xvYWRpbmd9PntjaGlsZHJlbn08L2Rpdj5cbik7XG5cbmNvbnN0IGVkaXRGb3JtQ29tcG9uZW50ID0gKGNoaWxkcmVuLCBsb2FkaW5nLCBvdGhlclByb3BzKSA9PiAoXG4gICAgPGZvcm0gY2xhc3NOYW1lPSdmb3JtLWhvcml6b250YWwnIGRhdGEtZm9jdXM9J2Zvcm0nIGRhdGEtbW9kZT0nZWRpdCcgZGF0YS1sb2FkaW5nPXtsb2FkaW5nfSBub1ZhbGlkYXRlPlxuICAgICAgICA8ZmllbGRzZXQ+XG4gICAgICAgICAgICB7Y2hpbGRyZW59XG4gICAgICAgIDwvZmllbGRzZXQ+XG4gICAgPC9mb3JtPlxuKTtcblxuY29uc3QgZm9ybUNvbXBvbmVudCA9ICh7Y2hpbGRyZW4sIGVkaXRpbmcsIGxvYWRpbmcsIC4uLm90aGVyUHJvcHN9KSA9PiBlZGl0aW5nID8gZWRpdEZvcm1Db21wb25lbnQoY2hpbGRyZW4sIGxvYWRpbmcsIG90aGVyUHJvcHMpIDogY29uc3VsdEZvcm1Db21wb25lbnQoY2hpbGRyZW4sIGxvYWRpbmcpO1xuXG5mb3JtQ29tcG9uZW50LmRpc3BsYXlOYW1lID0gJ0Zvcm0nO1xuZm9ybUNvbXBvbmVudC5wcm9wVHlwZXMgPSB7XG4gICAgZWRpdGluZzogUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcbiAgICBsb2FkaW5nOiBQcm9wVHlwZXMuYm9vbFxufTtcbmZvcm1Db21wb25lbnQuZGVmYXVsdFByb3BzID0ge1xuICAgIGVkaXRpbmc6IGZhbHNlLFxuICAgIGxvYWRpbmc6IGZhbHNlXG59O1xuZXhwb3J0IGRlZmF1bHQgZm9ybUNvbXBvbmVudDtcbiJdfQ==