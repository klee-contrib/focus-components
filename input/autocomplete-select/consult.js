'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _i18next = require('i18next');

var _i18next2 = _interopRequireDefault(_i18next);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

// TODO : add PropTypes
var AutocompleteSelectConsult = function (_Component) {
    _inherits(AutocompleteSelectConsult, _Component);

    function AutocompleteSelectConsult() {
        var _temp, _this, _ret;

        _classCallCheck(this, AutocompleteSelectConsult);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.state = {}, _temp), _possibleConstructorReturn(_this, _ret);
    }

    AutocompleteSelectConsult.prototype.componentDidMount = function componentDidMount() {
        this._callKeyResolver(this.props.value);
    };

    AutocompleteSelectConsult.prototype.componentWillReceiveProps = function componentWillReceiveProps(_ref) {
        var value = _ref.value;

        if (value !== this.props.value) this._callKeyResolver(value);
    };

    AutocompleteSelectConsult.prototype._callKeyResolver = function _callKeyResolver(value) {
        var _this2 = this;

        var keyResolver = this.props.keyResolver;

        keyResolver(value).then(function (label) {
            _this2.setState({ resolvedLabel: label });
        }).catch(function (err) {
            console.error(err.message);
        });
    };

    AutocompleteSelectConsult.prototype.render = function render() {
        var _props = this.props;
        var label = _props.label;
        var name = _props.name;
        var type = _props.type;
        var value = _props.value;
        var _state$resolvedLabel = this.state.resolvedLabel;
        var resolvedLabel = _state$resolvedLabel === undefined ? value : _state$resolvedLabel;

        return _react2.default.createElement(
            'div',
            { label: label, name: name, type: type },
            _i18next2.default.t(resolvedLabel)
        );
    };

    return AutocompleteSelectConsult;
}(_react.Component);

exports.default = AutocompleteSelectConsult;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZyLUZSLmpzIl0sIm5hbWVzIjpbIkF1dG9jb21wbGV0ZVNlbGVjdENvbnN1bHQiLCJzdGF0ZSIsImNvbXBvbmVudERpZE1vdW50IiwiX2NhbGxLZXlSZXNvbHZlciIsInByb3BzIiwidmFsdWUiLCJjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzIiwia2V5UmVzb2x2ZXIiLCJ0aGVuIiwic2V0U3RhdGUiLCJyZXNvbHZlZExhYmVsIiwibGFiZWwiLCJjYXRjaCIsImNvbnNvbGUiLCJlcnJvciIsImVyciIsIm1lc3NhZ2UiLCJyZW5kZXIiLCJuYW1lIiwidHlwZSIsInQiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FBRUE7SUFDTUEseUI7Y0FBQUEseUI7O2FBQUFBLHlCOzs7OEJBQUFBLHlCOzs7Ozs7Z0pBQ0ZDLEssR0FBUSxFOzs7QUFETkQsNkIsV0FHRkUsaUIsZ0NBQW9CO0FBQ2hCLGFBQUtDLGdCQUFMLENBQXNCLEtBQUtDLEtBQUwsQ0FBV0MsS0FBakM7QUFDSCxLOztBQUxDTCw2QixXQU9GTSx5Qiw0Q0FBbUM7QUFBQSxZQUFSRCxLQUFRLFFBQVJBLEtBQVE7O0FBQy9CLFlBQUlBLFVBQVUsS0FBS0QsS0FBTCxDQUFXQyxLQUF6QixFQUFnQyxLQUFLRixnQkFBTCxDQUFzQkUsS0FBdEI7QUFDbkMsSzs7QUFUQ0wsNkIsV0FXRkcsZ0IsNkJBQWlCRSxLLEVBQU87QUFBQTs7QUFBQSxZQUNiRSxXQURhLEdBQ0UsS0FBS0gsS0FEUCxDQUNiRyxXQURhOztBQUVwQkEsb0JBQVlGLEtBQVosRUFBbUJHLElBQW5CLENBQXdCLGlCQUFTO0FBQzdCLG1CQUFLQyxRQUFMLENBQWMsRUFBQ0MsZUFBZUMsS0FBaEIsRUFBZDtBQUNILFNBRkQsRUFFR0MsS0FGSCxDQUVTLGVBQU87QUFBQ0Msb0JBQVFDLEtBQVIsQ0FBY0MsSUFBSUMsT0FBbEI7QUFBNEIsU0FGN0M7QUFHSCxLOztBQWhCQ2hCLDZCLFdBa0JGaUIsTSxxQkFBUztBQUFBLHFCQUM4QixLQUFLYixLQURuQztBQUFBLFlBQ0VPLEtBREYsVUFDRUEsS0FERjtBQUFBLFlBQ1NPLElBRFQsVUFDU0EsSUFEVDtBQUFBLFlBQ2VDLElBRGYsVUFDZUEsSUFEZjtBQUFBLFlBQ3FCZCxLQURyQixVQUNxQkEsS0FEckI7QUFBQSxtQ0FFMkIsS0FBS0osS0FGaEMsQ0FFRVMsYUFGRjtBQUFBLFlBRUVBLGFBRkYsd0NBRWtCTCxLQUZsQjs7QUFHTCxlQUNJO0FBQUE7QUFBQSxjQUFLLE9BQU9NLEtBQVosRUFBbUIsTUFBTU8sSUFBekIsRUFBK0IsTUFBTUMsSUFBckM7QUFDSyw4QkFBUUMsQ0FBUixDQUFVVixhQUFWO0FBREwsU0FESjtBQUtILEs7O1dBMUJDVix5Qjs7O2tCQTZCU0EseUIiLCJmaWxlIjoiZnItRlIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnR9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IGkxOG5leHQgZnJvbSAnaTE4bmV4dCc7XHJcblxyXG4vLyBUT0RPIDogYWRkIFByb3BUeXBlc1xyXG5jbGFzcyBBdXRvY29tcGxldGVTZWxlY3RDb25zdWx0IGV4dGVuZHMgQ29tcG9uZW50IHtcclxuICAgIHN0YXRlID0ge307XHJcblxyXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XHJcbiAgICAgICAgdGhpcy5fY2FsbEtleVJlc29sdmVyKHRoaXMucHJvcHMudmFsdWUpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMoe3ZhbHVlfSkge1xyXG4gICAgICAgIGlmICh2YWx1ZSAhPT0gdGhpcy5wcm9wcy52YWx1ZSkgdGhpcy5fY2FsbEtleVJlc29sdmVyKHZhbHVlKTtcclxuICAgIH1cclxuXHJcbiAgICBfY2FsbEtleVJlc29sdmVyKHZhbHVlKSB7XHJcbiAgICAgICAgY29uc3Qge2tleVJlc29sdmVyfSA9IHRoaXMucHJvcHM7XHJcbiAgICAgICAga2V5UmVzb2x2ZXIodmFsdWUpLnRoZW4obGFiZWwgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtyZXNvbHZlZExhYmVsOiBsYWJlbH0pO1xyXG4gICAgICAgIH0pLmNhdGNoKGVyciA9PiB7Y29uc29sZS5lcnJvcihlcnIubWVzc2FnZSk7fSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIGNvbnN0IHtsYWJlbCwgbmFtZSwgdHlwZSwgdmFsdWV9ID0gdGhpcy5wcm9wcztcclxuICAgICAgICBjb25zdCB7cmVzb2x2ZWRMYWJlbCA9IHZhbHVlfSA9IHRoaXMuc3RhdGU7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdiBsYWJlbD17bGFiZWx9IG5hbWU9e25hbWV9IHR5cGU9e3R5cGV9PlxyXG4gICAgICAgICAgICAgICAge2kxOG5leHQudChyZXNvbHZlZExhYmVsKX1cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQXV0b2NvbXBsZXRlU2VsZWN0Q29uc3VsdDtcclxuIl19