'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _edit = require('./edit');

var _edit2 = _interopRequireDefault(_edit);

var _consult = require('./consult');

var _consult2 = _interopRequireDefault(_consult);

var _i18next = require('i18next');

var _i18next2 = _interopRequireDefault(_i18next);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var AutocompleteSelectField = function (_Component) {
    _inherits(AutocompleteSelectField, _Component);

    function AutocompleteSelectField() {
        var _temp, _this, _ret;

        _classCallCheck(this, AutocompleteSelectField);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.state = {}, _this.getValue = function () {
            var _this$props = _this.props;
            var isEdit = _this$props.isEdit;
            var value = _this$props.value;

            if (isEdit) {
                return _this.refs.autocomplete.getValue();
            } else {
                return value;
            }
        }, _this._handleAutocompleteBadInput = function (value) {
            _this.setState({ customError: _i18next2.default.t('input.autocomplete.error.invalid', { value: value }) });
        }, _this._handleAutocompleteChange = function (value) {
            var onChange = _this.props.onChange;

            _this.setState({ customError: null }, function () {
                if (onChange) onChange(value);
            });
        }, _this._renderEdit = function () {
            var customError = _this.state.customError;

            return _react2.default.createElement(_edit2.default, _extends({
                customError: customError,
                onBadInput: _this._handleAutocompleteBadInput,
                onChange: _this._handleAutocompleteChange,
                ref: 'autocomplete'
            }, _this.props));
        }, _this._renderConsult = function () {
            return _react2.default.createElement(_consult2.default, _this.props);
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    AutocompleteSelectField.prototype.componentWillReceiveProps = function componentWillReceiveProps(_ref) {
        var error = _ref.error;

        this.setState({ customError: error });
    };

    AutocompleteSelectField.prototype.render = function render() {
        var isEdit = this.props.isEdit;

        return isEdit ? this._renderEdit() : this._renderConsult();
    };

    return AutocompleteSelectField;
}(_react.Component);

AutocompleteSelectField.propTypes = {
    isEdit: _react.PropTypes.bool.isRequired,
    keyResolver: _react.PropTypes.func.isRequired,
    onChange: _react.PropTypes.func.isRequired,
    querySearcher: _react.PropTypes.func.isRequired
};
exports.default = AutocompleteSelectField;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZyLUZSLmpzIl0sIm5hbWVzIjpbIkF1dG9jb21wbGV0ZVNlbGVjdEZpZWxkIiwic3RhdGUiLCJnZXRWYWx1ZSIsInByb3BzIiwiaXNFZGl0IiwidmFsdWUiLCJyZWZzIiwiYXV0b2NvbXBsZXRlIiwiX2hhbmRsZUF1dG9jb21wbGV0ZUJhZElucHV0Iiwic2V0U3RhdGUiLCJjdXN0b21FcnJvciIsInQiLCJfaGFuZGxlQXV0b2NvbXBsZXRlQ2hhbmdlIiwib25DaGFuZ2UiLCJfcmVuZGVyRWRpdCIsIl9yZW5kZXJDb25zdWx0IiwiY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyIsImVycm9yIiwicmVuZGVyIiwicHJvcFR5cGVzIiwiYm9vbCIsImlzUmVxdWlyZWQiLCJrZXlSZXNvbHZlciIsImZ1bmMiLCJxdWVyeVNlYXJjaGVyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7OztJQUdNQSx1QjtjQUFBQSx1Qjs7YUFBQUEsdUI7Ozs4QkFBQUEsdUI7Ozs7OztnSkFDRkMsSyxHQUFRLEUsUUFhUkMsUSxHQUFXLFlBQU07QUFBQSw4QkFDVyxNQUFLQyxLQURoQjtBQUFBLGdCQUNOQyxNQURNLGVBQ05BLE1BRE07QUFBQSxnQkFDRUMsS0FERixlQUNFQSxLQURGOztBQUViLGdCQUFJRCxNQUFKLEVBQVk7QUFDUix1QkFBTyxNQUFLRSxJQUFMLENBQVVDLFlBQVYsQ0FBdUJMLFFBQXZCLEVBQVA7QUFDSCxhQUZELE1BRU87QUFDSCx1QkFBT0csS0FBUDtBQUNIO0FBQ0osUyxRQUVERywyQixHQUE4QixpQkFBUztBQUNuQyxrQkFBS0MsUUFBTCxDQUFjLEVBQUNDLGFBQWEsa0JBQVFDLENBQVIsQ0FBVSxrQ0FBVixFQUE4QyxFQUFDTixZQUFELEVBQTlDLENBQWQsRUFBZDtBQUNILFMsUUFFRE8seUIsR0FBNEIsaUJBQVM7QUFBQSxnQkFDMUJDLFFBRDBCLEdBQ2QsTUFBS1YsS0FEUyxDQUMxQlUsUUFEMEI7O0FBRWpDLGtCQUFLSixRQUFMLENBQWMsRUFBQ0MsYUFBYSxJQUFkLEVBQWQsRUFBbUMsWUFBTTtBQUNyQyxvQkFBSUcsUUFBSixFQUFjQSxTQUFTUixLQUFUO0FBQ2pCLGFBRkQ7QUFHSCxTLFFBRURTLFcsR0FBYyxZQUFNO0FBQUEsZ0JBQ1RKLFdBRFMsR0FDTSxNQUFLVCxLQURYLENBQ1RTLFdBRFM7O0FBRWhCLG1CQUNJO0FBQ0ksNkJBQWFBLFdBRGpCO0FBRUksNEJBQVksTUFBS0YsMkJBRnJCO0FBR0ksMEJBQVUsTUFBS0kseUJBSG5CO0FBSUkscUJBQUk7QUFKUixlQUtRLE1BQUtULEtBTGIsRUFESjtBQVNILFMsUUFFRFksYyxHQUFpQixZQUFNO0FBQ25CLG1CQUNJLGlEQUNRLE1BQUtaLEtBRGIsQ0FESjtBQUtILFM7OztBQXJEQ0gsMkIsV0FVRmdCLHlCLDRDQUFtQztBQUFBLFlBQVJDLEtBQVEsUUFBUkEsS0FBUTs7QUFDL0IsYUFBS1IsUUFBTCxDQUFjLEVBQUNDLGFBQWFPLEtBQWQsRUFBZDtBQUNILEs7O0FBWkNqQiwyQixXQXVERmtCLE0scUJBQVM7QUFBQSxZQUNFZCxNQURGLEdBQ1ksS0FBS0QsS0FEakIsQ0FDRUMsTUFERjs7QUFFTCxlQUFPQSxTQUFTLEtBQUtVLFdBQUwsRUFBVCxHQUE4QixLQUFLQyxjQUFMLEVBQXJDO0FBQ0gsSzs7V0ExRENmLHVCOzs7QUFBQUEsdUIsQ0FHS21CLFMsR0FBWTtBQUNmZixZQUFRLGlCQUFVZ0IsSUFBVixDQUFlQyxVQURSO0FBRWZDLGlCQUFhLGlCQUFVQyxJQUFWLENBQWVGLFVBRmI7QUFHZlIsY0FBVSxpQkFBVVUsSUFBVixDQUFlRixVQUhWO0FBSWZHLG1CQUFlLGlCQUFVRCxJQUFWLENBQWVGO0FBSmYsQztrQkEwRFJyQix1QiIsImZpbGUiOiJmci1GUi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgUHJvcFR5cGVzfSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBBdXRvY29tcGxldGVTZWxlY3RFZGl0IGZyb20gJy4vZWRpdCc7XHJcbmltcG9ydCBBdXRvY29tcGxldGVTZWxlY3RDb25zdWx0IGZyb20gJy4vY29uc3VsdCc7XHJcbmltcG9ydCBpMThuZXh0IGZyb20gJ2kxOG5leHQnO1xyXG5cclxuXHJcbmNsYXNzIEF1dG9jb21wbGV0ZVNlbGVjdEZpZWxkIGV4dGVuZHMgQ29tcG9uZW50IHtcclxuICAgIHN0YXRlID0ge307XHJcblxyXG4gICAgc3RhdGljIHByb3BUeXBlcyA9IHtcclxuICAgICAgICBpc0VkaXQ6IFByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXHJcbiAgICAgICAga2V5UmVzb2x2ZXI6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXHJcbiAgICAgICAgb25DaGFuZ2U6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXHJcbiAgICAgICAgcXVlcnlTZWFyY2hlcjogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZFxyXG4gICAgfTtcclxuXHJcbiAgICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKHtlcnJvcn0pIHtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHtjdXN0b21FcnJvcjogZXJyb3J9KTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRWYWx1ZSA9ICgpID0+IHtcclxuICAgICAgICBjb25zdCB7aXNFZGl0LCB2YWx1ZX0gPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIGlmIChpc0VkaXQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucmVmcy5hdXRvY29tcGxldGUuZ2V0VmFsdWUoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gdmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBfaGFuZGxlQXV0b2NvbXBsZXRlQmFkSW5wdXQgPSB2YWx1ZSA9PiB7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7Y3VzdG9tRXJyb3I6IGkxOG5leHQudCgnaW5wdXQuYXV0b2NvbXBsZXRlLmVycm9yLmludmFsaWQnLCB7dmFsdWV9KX0pXHJcbiAgICB9O1xyXG5cclxuICAgIF9oYW5kbGVBdXRvY29tcGxldGVDaGFuZ2UgPSB2YWx1ZSA9PiB7XHJcbiAgICAgICAgY29uc3Qge29uQ2hhbmdlfSA9IHRoaXMucHJvcHM7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7Y3VzdG9tRXJyb3I6IG51bGx9LCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChvbkNoYW5nZSkgb25DaGFuZ2UodmFsdWUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcbiAgICBfcmVuZGVyRWRpdCA9ICgpID0+IHtcclxuICAgICAgICBjb25zdCB7Y3VzdG9tRXJyb3J9ID0gdGhpcy5zdGF0ZTtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8QXV0b2NvbXBsZXRlU2VsZWN0RWRpdFxyXG4gICAgICAgICAgICAgICAgY3VzdG9tRXJyb3I9e2N1c3RvbUVycm9yfVxyXG4gICAgICAgICAgICAgICAgb25CYWRJbnB1dD17dGhpcy5faGFuZGxlQXV0b2NvbXBsZXRlQmFkSW5wdXR9XHJcbiAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5faGFuZGxlQXV0b2NvbXBsZXRlQ2hhbmdlfVxyXG4gICAgICAgICAgICAgICAgcmVmPSdhdXRvY29tcGxldGUnXHJcbiAgICAgICAgICAgICAgICB7Li4udGhpcy5wcm9wc31cclxuICAgICAgICAgICAgLz5cclxuICAgICAgICApO1xyXG4gICAgfTtcclxuXHJcbiAgICBfcmVuZGVyQ29uc3VsdCA9ICgpID0+IHtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8QXV0b2NvbXBsZXRlU2VsZWN0Q29uc3VsdFxyXG4gICAgICAgICAgICAgICAgey4uLnRoaXMucHJvcHN9XHJcbiAgICAgICAgICAgIC8+XHJcbiAgICAgICAgKTtcclxuICAgIH07XHJcblxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIGNvbnN0IHtpc0VkaXR9ID0gdGhpcy5wcm9wcztcclxuICAgICAgICByZXR1cm4gaXNFZGl0ID8gdGhpcy5fcmVuZGVyRWRpdCgpIDogdGhpcy5fcmVuZGVyQ29uc3VsdCgpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBBdXRvY29tcGxldGVTZWxlY3RGaWVsZDtcclxuIl19