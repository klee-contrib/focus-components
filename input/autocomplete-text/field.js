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
            var _this$props = _this.props;
            var isEdit = _this$props.isEdit;
            var value = _this$props.value;

            if (isEdit) {
                return _this.refs.autocomplete.getValue();
            } else {
                return value;
            }
        }, _this._handleAutocompleteChange = function (value) {
            var onChange = _this.props.onChange;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZyLUZSLmpzIl0sIm5hbWVzIjpbIkF1dG9jb21wbGV0ZVRleHRGaWVsZCIsInN0YXRlIiwiZ2V0VmFsdWUiLCJwcm9wcyIsImlzRWRpdCIsInZhbHVlIiwicmVmcyIsImF1dG9jb21wbGV0ZSIsIl9oYW5kbGVBdXRvY29tcGxldGVDaGFuZ2UiLCJvbkNoYW5nZSIsIl9yZW5kZXJFZGl0IiwiX3JlbmRlckNvbnN1bHQiLCJyZW5kZXIiLCJwcm9wVHlwZXMiLCJib29sIiwiaXNSZXF1aXJlZCIsImZ1bmMiLCJxdWVyeVNlYXJjaGVyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7SUFFTUEscUI7Y0FBQUEscUI7O2FBQUFBLHFCOzs7OEJBQUFBLHFCOzs7Ozs7Z0pBQ0ZDLEssR0FBUSxFLFFBUVJDLFEsR0FBVyxZQUFNO0FBQUEsOEJBQ1csTUFBS0MsS0FEaEI7QUFBQSxnQkFDTkMsTUFETSxlQUNOQSxNQURNO0FBQUEsZ0JBQ0VDLEtBREYsZUFDRUEsS0FERjs7QUFFYixnQkFBSUQsTUFBSixFQUFZO0FBQ1IsdUJBQU8sTUFBS0UsSUFBTCxDQUFVQyxZQUFWLENBQXVCTCxRQUF2QixFQUFQO0FBQ0gsYUFGRCxNQUVPO0FBQ0gsdUJBQU9HLEtBQVA7QUFDSDtBQUNKLFMsUUFFREcseUIsR0FBNEIsaUJBQVM7QUFBQSxnQkFDMUJDLFFBRDBCLEdBQ2QsTUFBS04sS0FEUyxDQUMxQk0sUUFEMEI7QUFFcEMsUyxRQUVEQyxXLEdBQWMsWUFBTTtBQUNoQixtQkFDSTtBQUNJLDBCQUFVLE1BQUtGLHlCQURuQjtBQUVJLHFCQUFJO0FBRlIsZUFHUSxNQUFLTCxLQUhiLEVBREo7QUFPSCxTLFFBRURRLGMsR0FBaUIsWUFBTTtBQUNuQixtQkFDSSxpREFDUSxNQUFLUixLQURiLENBREo7QUFLSCxTOzs7QUF0Q0NILHlCLFdBd0NGWSxNLHFCQUFTO0FBQUEsWUFDRVIsTUFERixHQUNZLEtBQUtELEtBRGpCLENBQ0VDLE1BREY7O0FBRUwsZUFBT0EsU0FBUyxLQUFLTSxXQUFMLEVBQVQsR0FBOEIsS0FBS0MsY0FBTCxFQUFyQztBQUNILEs7O1dBM0NDWCxxQjs7O0FBQUFBLHFCLENBR0thLFMsR0FBWTtBQUNmVCxZQUFRLGlCQUFVVSxJQUFWLENBQWVDLFVBRFI7QUFFZk4sY0FBVSxpQkFBVU8sSUFGTDtBQUdmQyxtQkFBZSxpQkFBVUQsSUFBVixDQUFlRDtBQUhmLEM7a0JBMkNSZixxQiIsImZpbGUiOiJmci1GUi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgUHJvcFR5cGVzfSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBBdXRvY29tcGxldGVUZXh0RWRpdCBmcm9tICcuL2VkaXQnO1xyXG5pbXBvcnQgQXV0b2NvbXBsZXRlVGV4dENvbnN1bHQgZnJvbSAnLi9jb25zdWx0JztcclxuXHJcbmNsYXNzIEF1dG9jb21wbGV0ZVRleHRGaWVsZCBleHRlbmRzIENvbXBvbmVudCB7XHJcbiAgICBzdGF0ZSA9IHt9O1xyXG5cclxuICAgIHN0YXRpYyBwcm9wVHlwZXMgPSB7XHJcbiAgICAgICAgaXNFZGl0OiBQcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxyXG4gICAgICAgIG9uQ2hhbmdlOiBQcm9wVHlwZXMuZnVuYyxcclxuICAgICAgICBxdWVyeVNlYXJjaGVyOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkXHJcbiAgICB9O1xyXG5cclxuICAgIGdldFZhbHVlID0gKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHtpc0VkaXQsIHZhbHVlfSA9IHRoaXMucHJvcHM7XHJcbiAgICAgICAgaWYgKGlzRWRpdCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yZWZzLmF1dG9jb21wbGV0ZS5nZXRWYWx1ZSgpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIF9oYW5kbGVBdXRvY29tcGxldGVDaGFuZ2UgPSB2YWx1ZSA9PiB7XHJcbiAgICAgICAgY29uc3Qge29uQ2hhbmdlfSA9IHRoaXMucHJvcHM7XHJcbiAgICB9O1xyXG5cclxuICAgIF9yZW5kZXJFZGl0ID0gKCkgPT4ge1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxBdXRvY29tcGxldGVUZXh0RWRpdFxyXG4gICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMuX2hhbmRsZUF1dG9jb21wbGV0ZUNoYW5nZX1cclxuICAgICAgICAgICAgICAgIHJlZj0nYXV0b2NvbXBsZXRlJ1xyXG4gICAgICAgICAgICAgICAgey4uLnRoaXMucHJvcHN9XHJcbiAgICAgICAgICAgIC8+XHJcbiAgICAgICAgKTtcclxuICAgIH07XHJcblxyXG4gICAgX3JlbmRlckNvbnN1bHQgPSAoKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPEF1dG9jb21wbGV0ZVRleHRDb25zdWx0XHJcbiAgICAgICAgICAgICAgICB7Li4udGhpcy5wcm9wc31cclxuICAgICAgICAgICAgLz5cclxuICAgICAgICApO1xyXG4gICAgfTtcclxuXHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgY29uc3Qge2lzRWRpdH0gPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIHJldHVybiBpc0VkaXQgPyB0aGlzLl9yZW5kZXJFZGl0KCkgOiB0aGlzLl9yZW5kZXJDb25zdWx0KCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEF1dG9jb21wbGV0ZVRleHRGaWVsZDtcclxuIl19