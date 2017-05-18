'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _class;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _componentBase = require('../../../behaviours/component-base');

var _componentBase2 = _interopRequireDefault(_componentBase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var AutocompleteSelectConsult = (0, _componentBase2.default)(_class = function (_Component) {
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
        var _props = this.props,
            label = _props.label,
            name = _props.name,
            type = _props.type,
            value = _props.value;
        var _state$resolvedLabel = this.state.resolvedLabel,
            resolvedLabel = _state$resolvedLabel === undefined ? value : _state$resolvedLabel;

        return _react2.default.createElement(
            'div',
            {
                label: label,
                name: name,
                type: type
            },
            this.i18n(resolvedLabel)
        );
    };

    return AutocompleteSelectConsult;
}(_react.Component)) || _class;

exports.default = AutocompleteSelectConsult;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJBdXRvY29tcGxldGVTZWxlY3RDb25zdWx0Iiwic3RhdGUiLCJjb21wb25lbnREaWRNb3VudCIsIl9jYWxsS2V5UmVzb2x2ZXIiLCJwcm9wcyIsInZhbHVlIiwiY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyIsImtleVJlc29sdmVyIiwidGhlbiIsInNldFN0YXRlIiwicmVzb2x2ZWRMYWJlbCIsImxhYmVsIiwiY2F0Y2giLCJjb25zb2xlIiwiZXJyb3IiLCJlcnIiLCJtZXNzYWdlIiwicmVuZGVyIiwibmFtZSIsInR5cGUiLCJpMThuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0lBR01BLHlCOzs7Ozs7Ozs7Ozs7Z0pBQ0ZDLEssR0FBUSxFOzs7d0NBRVJDLGlCLGdDQUFvQjtBQUNoQixhQUFLQyxnQkFBTCxDQUFzQixLQUFLQyxLQUFMLENBQVdDLEtBQWpDO0FBQ0gsSzs7d0NBRURDLHlCLDRDQUFtQztBQUFBLFlBQVJELEtBQVEsUUFBUkEsS0FBUTs7QUFDL0IsWUFBSUEsVUFBVSxLQUFLRCxLQUFMLENBQVdDLEtBQXpCLEVBQWdDLEtBQUtGLGdCQUFMLENBQXNCRSxLQUF0QjtBQUNuQyxLOzt3Q0FFREYsZ0IsNkJBQWlCRSxLLEVBQU87QUFBQTs7QUFBQSxZQUNiRSxXQURhLEdBQ0UsS0FBS0gsS0FEUCxDQUNiRyxXQURhOztBQUVwQkEsb0JBQVlGLEtBQVosRUFBbUJHLElBQW5CLENBQXdCLGlCQUFTO0FBQzdCLG1CQUFLQyxRQUFMLENBQWMsRUFBQ0MsZUFBZUMsS0FBaEIsRUFBZDtBQUNILFNBRkQsRUFFR0MsS0FGSCxDQUVTLGVBQU87QUFBQ0Msb0JBQVFDLEtBQVIsQ0FBY0MsSUFBSUMsT0FBbEI7QUFBNEIsU0FGN0M7QUFHSCxLOzt3Q0FFREMsTSxxQkFBUztBQUFBLHFCQUM4QixLQUFLYixLQURuQztBQUFBLFlBQ0VPLEtBREYsVUFDRUEsS0FERjtBQUFBLFlBQ1NPLElBRFQsVUFDU0EsSUFEVDtBQUFBLFlBQ2VDLElBRGYsVUFDZUEsSUFEZjtBQUFBLFlBQ3FCZCxLQURyQixVQUNxQkEsS0FEckI7QUFBQSxtQ0FFMkIsS0FBS0osS0FGaEMsQ0FFRVMsYUFGRjtBQUFBLFlBRUVBLGFBRkYsd0NBRWtCTCxLQUZsQjs7QUFHTCxlQUNJO0FBQUE7QUFBQTtBQUNJLHVCQUFPTSxLQURYO0FBRUksc0JBQU1PLElBRlY7QUFHSSxzQkFBTUM7QUFIVjtBQUtLLGlCQUFLQyxJQUFMLENBQVVWLGFBQVY7QUFMTCxTQURKO0FBU0gsSzs7Ozs7a0JBR1VWLHlCIiwiZmlsZSI6ImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgQ29tcG9uZW50QmFzZUJlaGF2aW91ciBmcm9tICcuLi8uLi8uLi9iZWhhdmlvdXJzL2NvbXBvbmVudC1iYXNlJztcclxuXHJcbkBDb21wb25lbnRCYXNlQmVoYXZpb3VyXHJcbmNsYXNzIEF1dG9jb21wbGV0ZVNlbGVjdENvbnN1bHQgZXh0ZW5kcyBDb21wb25lbnQge1xyXG4gICAgc3RhdGUgPSB7fTtcclxuXHJcbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcclxuICAgICAgICB0aGlzLl9jYWxsS2V5UmVzb2x2ZXIodGhpcy5wcm9wcy52YWx1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyh7dmFsdWV9KSB7XHJcbiAgICAgICAgaWYgKHZhbHVlICE9PSB0aGlzLnByb3BzLnZhbHVlKSB0aGlzLl9jYWxsS2V5UmVzb2x2ZXIodmFsdWUpO1xyXG4gICAgfVxyXG5cclxuICAgIF9jYWxsS2V5UmVzb2x2ZXIodmFsdWUpIHtcclxuICAgICAgICBjb25zdCB7a2V5UmVzb2x2ZXJ9ID0gdGhpcy5wcm9wcztcclxuICAgICAgICBrZXlSZXNvbHZlcih2YWx1ZSkudGhlbihsYWJlbCA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe3Jlc29sdmVkTGFiZWw6IGxhYmVsfSk7XHJcbiAgICAgICAgfSkuY2F0Y2goZXJyID0+IHtjb25zb2xlLmVycm9yKGVyci5tZXNzYWdlKTt9KTtcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgY29uc3Qge2xhYmVsLCBuYW1lLCB0eXBlLCB2YWx1ZX0gPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIGNvbnN0IHtyZXNvbHZlZExhYmVsID0gdmFsdWV9ID0gdGhpcy5zdGF0ZTtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2XHJcbiAgICAgICAgICAgICAgICBsYWJlbD17bGFiZWx9XHJcbiAgICAgICAgICAgICAgICBuYW1lPXtuYW1lfVxyXG4gICAgICAgICAgICAgICAgdHlwZT17dHlwZX1cclxuICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAge3RoaXMuaTE4bihyZXNvbHZlZExhYmVsKX1cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQXV0b2NvbXBsZXRlU2VsZWN0Q29uc3VsdDtcclxuIl19