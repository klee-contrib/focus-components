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

var _translation = require('focus-core/translation');

var _translation2 = _interopRequireDefault(_translation);

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
            var _this$props = _this.props,
                isEdit = _this$props.isEdit,
                value = _this$props.value;

            if (isEdit) {
                return _this.refs.autocomplete.getValue();
            } else {
                return value;
            }
        }, _this._handleAutocompleteBadInput = function (value) {
            _this.setState({ customError: _translation2.default.translate('autocomplete.error.badInput', { value: value }) });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJBdXRvY29tcGxldGVTZWxlY3RGaWVsZCIsInN0YXRlIiwiZ2V0VmFsdWUiLCJwcm9wcyIsImlzRWRpdCIsInZhbHVlIiwicmVmcyIsImF1dG9jb21wbGV0ZSIsIl9oYW5kbGVBdXRvY29tcGxldGVCYWRJbnB1dCIsInNldFN0YXRlIiwiY3VzdG9tRXJyb3IiLCJ0cmFuc2xhdGUiLCJfaGFuZGxlQXV0b2NvbXBsZXRlQ2hhbmdlIiwib25DaGFuZ2UiLCJfcmVuZGVyRWRpdCIsIl9yZW5kZXJDb25zdWx0IiwiY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyIsImVycm9yIiwicmVuZGVyIiwicHJvcFR5cGVzIiwiYm9vbCIsImlzUmVxdWlyZWQiLCJrZXlSZXNvbHZlciIsImZ1bmMiLCJxdWVyeVNlYXJjaGVyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7OztJQUVNQSx1Qjs7Ozs7Ozs7Ozs7O2dKQUNGQyxLLEdBQVEsRSxRQWFSQyxRLEdBQVcsWUFBTTtBQUFBLDhCQUNXLE1BQUtDLEtBRGhCO0FBQUEsZ0JBQ05DLE1BRE0sZUFDTkEsTUFETTtBQUFBLGdCQUNFQyxLQURGLGVBQ0VBLEtBREY7O0FBRWIsZ0JBQUlELE1BQUosRUFBWTtBQUNSLHVCQUFPLE1BQUtFLElBQUwsQ0FBVUMsWUFBVixDQUF1QkwsUUFBdkIsRUFBUDtBQUNILGFBRkQsTUFFTztBQUNILHVCQUFPRyxLQUFQO0FBQ0g7QUFDSixTLFFBRURHLDJCLEdBQThCLGlCQUFTO0FBQ25DLGtCQUFLQyxRQUFMLENBQWMsRUFBQ0MsYUFBYSxzQkFBWUMsU0FBWixDQUFzQiw2QkFBdEIsRUFBcUQsRUFBQ04sWUFBRCxFQUFyRCxDQUFkLEVBQWQ7QUFDSCxTLFFBRURPLHlCLEdBQTRCLGlCQUFTO0FBQUEsZ0JBQzFCQyxRQUQwQixHQUNkLE1BQUtWLEtBRFMsQ0FDMUJVLFFBRDBCOztBQUVqQyxrQkFBS0osUUFBTCxDQUFjLEVBQUNDLGFBQWEsSUFBZCxFQUFkLEVBQW1DLFlBQU07QUFDckMsb0JBQUlHLFFBQUosRUFBY0EsU0FBU1IsS0FBVDtBQUNqQixhQUZEO0FBR0gsUyxRQUVEUyxXLEdBQWMsWUFBTTtBQUFBLGdCQUNUSixXQURTLEdBQ00sTUFBS1QsS0FEWCxDQUNUUyxXQURTOztBQUVoQixtQkFDSTtBQUNJLDZCQUFhQSxXQURqQjtBQUVJLDRCQUFZLE1BQUtGLDJCQUZyQjtBQUdJLDBCQUFVLE1BQUtJLHlCQUhuQjtBQUlJLHFCQUFJO0FBSlIsZUFLUSxNQUFLVCxLQUxiLEVBREo7QUFTSCxTLFFBRURZLGMsR0FBaUIsWUFBTTtBQUNuQixtQkFDSSxpREFDUSxNQUFLWixLQURiLENBREo7QUFLSCxTOzs7c0NBM0NEYSx5Qiw0Q0FBbUM7QUFBQSxZQUFSQyxLQUFRLFFBQVJBLEtBQVE7O0FBQy9CLGFBQUtSLFFBQUwsQ0FBYyxFQUFDQyxhQUFhTyxLQUFkLEVBQWQ7QUFDSCxLOztzQ0EyQ0RDLE0scUJBQVM7QUFBQSxZQUNFZCxNQURGLEdBQ1ksS0FBS0QsS0FEakIsQ0FDRUMsTUFERjs7QUFFTCxlQUFPQSxTQUFTLEtBQUtVLFdBQUwsRUFBVCxHQUE4QixLQUFLQyxjQUFMLEVBQXJDO0FBQ0gsSzs7Ozs7QUExRENmLHVCLENBR0ttQixTLEdBQVk7QUFDZmYsWUFBUSxpQkFBVWdCLElBQVYsQ0FBZUMsVUFEUjtBQUVmQyxpQkFBYSxpQkFBVUMsSUFBVixDQUFlRixVQUZiO0FBR2ZSLGNBQVUsaUJBQVVVLElBQVYsQ0FBZUYsVUFIVjtBQUlmRyxtQkFBZSxpQkFBVUQsSUFBVixDQUFlRjtBQUpmLEM7a0JBMERSckIsdUIiLCJmaWxlIjoiaXMtcmVhY3QtY2xhc3MtY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IEF1dG9jb21wbGV0ZVNlbGVjdEVkaXQgZnJvbSAnLi9lZGl0JztcclxuaW1wb3J0IEF1dG9jb21wbGV0ZVNlbGVjdENvbnN1bHQgZnJvbSAnLi9jb25zdWx0JztcclxuaW1wb3J0IHRyYW5zbGF0aW9uIGZyb20gJ2ZvY3VzLWNvcmUvdHJhbnNsYXRpb24nO1xyXG5cclxuY2xhc3MgQXV0b2NvbXBsZXRlU2VsZWN0RmllbGQgZXh0ZW5kcyBDb21wb25lbnQge1xyXG4gICAgc3RhdGUgPSB7fTtcclxuXHJcbiAgICBzdGF0aWMgcHJvcFR5cGVzID0ge1xyXG4gICAgICAgIGlzRWRpdDogUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcclxuICAgICAgICBrZXlSZXNvbHZlcjogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcclxuICAgICAgICBvbkNoYW5nZTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcclxuICAgICAgICBxdWVyeVNlYXJjaGVyOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkXHJcbiAgICB9O1xyXG5cclxuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMoe2Vycm9yfSkge1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe2N1c3RvbUVycm9yOiBlcnJvcn0pO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFZhbHVlID0gKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHtpc0VkaXQsIHZhbHVlfSA9IHRoaXMucHJvcHM7XHJcbiAgICAgICAgaWYgKGlzRWRpdCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yZWZzLmF1dG9jb21wbGV0ZS5nZXRWYWx1ZSgpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIF9oYW5kbGVBdXRvY29tcGxldGVCYWRJbnB1dCA9IHZhbHVlID0+IHtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHtjdXN0b21FcnJvcjogdHJhbnNsYXRpb24udHJhbnNsYXRlKCdhdXRvY29tcGxldGUuZXJyb3IuYmFkSW5wdXQnLCB7dmFsdWV9KX0pXHJcbiAgICB9O1xyXG5cclxuICAgIF9oYW5kbGVBdXRvY29tcGxldGVDaGFuZ2UgPSB2YWx1ZSA9PiB7XHJcbiAgICAgICAgY29uc3Qge29uQ2hhbmdlfSA9IHRoaXMucHJvcHM7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7Y3VzdG9tRXJyb3I6IG51bGx9LCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChvbkNoYW5nZSkgb25DaGFuZ2UodmFsdWUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcbiAgICBfcmVuZGVyRWRpdCA9ICgpID0+IHtcclxuICAgICAgICBjb25zdCB7Y3VzdG9tRXJyb3J9ID0gdGhpcy5zdGF0ZTtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8QXV0b2NvbXBsZXRlU2VsZWN0RWRpdFxyXG4gICAgICAgICAgICAgICAgY3VzdG9tRXJyb3I9e2N1c3RvbUVycm9yfVxyXG4gICAgICAgICAgICAgICAgb25CYWRJbnB1dD17dGhpcy5faGFuZGxlQXV0b2NvbXBsZXRlQmFkSW5wdXR9XHJcbiAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5faGFuZGxlQXV0b2NvbXBsZXRlQ2hhbmdlfVxyXG4gICAgICAgICAgICAgICAgcmVmPSdhdXRvY29tcGxldGUnXHJcbiAgICAgICAgICAgICAgICB7Li4udGhpcy5wcm9wc31cclxuICAgICAgICAgICAgLz5cclxuICAgICAgICApO1xyXG4gICAgfTtcclxuXHJcbiAgICBfcmVuZGVyQ29uc3VsdCA9ICgpID0+IHtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8QXV0b2NvbXBsZXRlU2VsZWN0Q29uc3VsdFxyXG4gICAgICAgICAgICAgICAgey4uLnRoaXMucHJvcHN9XHJcbiAgICAgICAgICAgIC8+XHJcbiAgICAgICAgKTtcclxuICAgIH07XHJcblxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIGNvbnN0IHtpc0VkaXR9ID0gdGhpcy5wcm9wcztcclxuICAgICAgICByZXR1cm4gaXNFZGl0ID8gdGhpcy5fcmVuZGVyRWRpdCgpIDogdGhpcy5fcmVuZGVyQ29uc3VsdCgpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBBdXRvY29tcGxldGVTZWxlY3RGaWVsZDtcclxuIl19