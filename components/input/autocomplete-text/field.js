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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var AutocompleteTextField = function (_Component) {
    _inherits(AutocompleteTextField, _Component);

    function AutocompleteTextField() {
        var _temp, _this, _ret;

        _classCallCheck(this, AutocompleteTextField);

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
        }, _this._handleAutocompleteChange = function (value) {
            var onChange = _this.props.onChange;

            if (onChange) onChange(value);
        }, _this._renderEdit = function () {
            return _react2.default.createElement(_edit2.default, _extends({
                onChange: _this._handleAutocompleteChange,
                ref: 'autocomplete'
            }, _this.props));
        }, _this._renderConsult = function () {
            return _react2.default.createElement(_consult2.default, _this.props);
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    AutocompleteTextField.prototype.render = function render() {
        var isEdit = this.props.isEdit;

        return isEdit ? this._renderEdit() : this._renderConsult();
    };

    return AutocompleteTextField;
}(_react.Component);

AutocompleteTextField.propTypes = {
    isEdit: _react.PropTypes.bool.isRequired,
    onChange: _react.PropTypes.func,
    querySearcher: _react.PropTypes.func.isRequired
};
exports.default = AutocompleteTextField;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJBdXRvY29tcGxldGVUZXh0RmllbGQiLCJzdGF0ZSIsImdldFZhbHVlIiwicHJvcHMiLCJpc0VkaXQiLCJ2YWx1ZSIsInJlZnMiLCJhdXRvY29tcGxldGUiLCJfaGFuZGxlQXV0b2NvbXBsZXRlQ2hhbmdlIiwib25DaGFuZ2UiLCJfcmVuZGVyRWRpdCIsIl9yZW5kZXJDb25zdWx0IiwicmVuZGVyIiwicHJvcFR5cGVzIiwiYm9vbCIsImlzUmVxdWlyZWQiLCJmdW5jIiwicXVlcnlTZWFyY2hlciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0lBRU1BLHFCOzs7Ozs7Ozs7Ozs7Z0pBQ0ZDLEssR0FBUSxFLFFBUVJDLFEsR0FBVyxZQUFNO0FBQUEsOEJBQ1csTUFBS0MsS0FEaEI7QUFBQSxnQkFDTkMsTUFETSxlQUNOQSxNQURNO0FBQUEsZ0JBQ0VDLEtBREYsZUFDRUEsS0FERjs7QUFFYixnQkFBSUQsTUFBSixFQUFZO0FBQ1IsdUJBQU8sTUFBS0UsSUFBTCxDQUFVQyxZQUFWLENBQXVCTCxRQUF2QixFQUFQO0FBQ0gsYUFGRCxNQUVPO0FBQ0gsdUJBQU9HLEtBQVA7QUFDSDtBQUNKLFMsUUFFREcseUIsR0FBNEIsaUJBQVM7QUFBQSxnQkFDMUJDLFFBRDBCLEdBQ2QsTUFBS04sS0FEUyxDQUMxQk0sUUFEMEI7O0FBRWpDLGdCQUFHQSxRQUFILEVBQWFBLFNBQVNKLEtBQVQ7QUFDaEIsUyxRQUVESyxXLEdBQWMsWUFBTTtBQUNoQixtQkFDSTtBQUNJLDBCQUFVLE1BQUtGLHlCQURuQjtBQUVJLHFCQUFJO0FBRlIsZUFHUSxNQUFLTCxLQUhiLEVBREo7QUFPSCxTLFFBRURRLGMsR0FBaUIsWUFBTTtBQUNuQixtQkFDSSxpREFDUSxNQUFLUixLQURiLENBREo7QUFLSCxTOzs7b0NBRURTLE0scUJBQVM7QUFBQSxZQUNFUixNQURGLEdBQ1ksS0FBS0QsS0FEakIsQ0FDRUMsTUFERjs7QUFFTCxlQUFPQSxTQUFTLEtBQUtNLFdBQUwsRUFBVCxHQUE4QixLQUFLQyxjQUFMLEVBQXJDO0FBQ0gsSzs7Ozs7QUE1Q0NYLHFCLENBR0thLFMsR0FBWTtBQUNmVCxZQUFRLGlCQUFVVSxJQUFWLENBQWVDLFVBRFI7QUFFZk4sY0FBVSxpQkFBVU8sSUFGTDtBQUdmQyxtQkFBZSxpQkFBVUQsSUFBVixDQUFlRDtBQUhmLEM7a0JBNENSZixxQiIsImZpbGUiOiJpcy1yZWFjdC1jbGFzcy1jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnQsIFByb3BUeXBlc30gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgQXV0b2NvbXBsZXRlVGV4dEVkaXQgZnJvbSAnLi9lZGl0JztcclxuaW1wb3J0IEF1dG9jb21wbGV0ZVRleHRDb25zdWx0IGZyb20gJy4vY29uc3VsdCc7XHJcblxyXG5jbGFzcyBBdXRvY29tcGxldGVUZXh0RmllbGQgZXh0ZW5kcyBDb21wb25lbnQge1xyXG4gICAgc3RhdGUgPSB7fTtcclxuXHJcbiAgICBzdGF0aWMgcHJvcFR5cGVzID0ge1xyXG4gICAgICAgIGlzRWRpdDogUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcclxuICAgICAgICBvbkNoYW5nZTogUHJvcFR5cGVzLmZ1bmMsXHJcbiAgICAgICAgcXVlcnlTZWFyY2hlcjogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZFxyXG4gICAgfTtcclxuXHJcbiAgICBnZXRWYWx1ZSA9ICgpID0+IHtcclxuICAgICAgICBjb25zdCB7aXNFZGl0LCB2YWx1ZX0gPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIGlmIChpc0VkaXQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucmVmcy5hdXRvY29tcGxldGUuZ2V0VmFsdWUoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gdmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBfaGFuZGxlQXV0b2NvbXBsZXRlQ2hhbmdlID0gdmFsdWUgPT4ge1xyXG4gICAgICAgIGNvbnN0IHtvbkNoYW5nZX0gPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIGlmKG9uQ2hhbmdlKSBvbkNoYW5nZSh2YWx1ZSk7XHJcbiAgICB9O1xyXG5cclxuICAgIF9yZW5kZXJFZGl0ID0gKCkgPT4ge1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxBdXRvY29tcGxldGVUZXh0RWRpdFxyXG4gICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMuX2hhbmRsZUF1dG9jb21wbGV0ZUNoYW5nZX1cclxuICAgICAgICAgICAgICAgIHJlZj0nYXV0b2NvbXBsZXRlJ1xyXG4gICAgICAgICAgICAgICAgey4uLnRoaXMucHJvcHN9XHJcbiAgICAgICAgICAgIC8+XHJcbiAgICAgICAgKTtcclxuICAgIH07XHJcblxyXG4gICAgX3JlbmRlckNvbnN1bHQgPSAoKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPEF1dG9jb21wbGV0ZVRleHRDb25zdWx0XHJcbiAgICAgICAgICAgICAgICB7Li4udGhpcy5wcm9wc31cclxuICAgICAgICAgICAgLz5cclxuICAgICAgICApO1xyXG4gICAgfTtcclxuXHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgY29uc3Qge2lzRWRpdH0gPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIHJldHVybiBpc0VkaXQgPyB0aGlzLl9yZW5kZXJFZGl0KCkgOiB0aGlzLl9yZW5kZXJDb25zdWx0KCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEF1dG9jb21wbGV0ZVRleHRGaWVsZDtcclxuIl19