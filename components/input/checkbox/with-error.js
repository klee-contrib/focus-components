'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _dec, _class;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _translation = require('../../../behaviours/translation');

var _translation2 = _interopRequireDefault(_translation);

var _material = require('../../../behaviours/material');

var _material2 = _interopRequireDefault(_material);

var _filterHtmlAttributes = require('../../../utils/filter-html-attributes');

var _filterHtmlAttributes2 = _interopRequireDefault(_filterHtmlAttributes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var propTypes = {
    label: _react.PropTypes.string,
    onChange: _react.PropTypes.func.isRequired,
    value: _react.PropTypes.bool.isRequired,
    disabled: _react.PropTypes.bool,
    error: _react.PropTypes.string
};

var defaultProps = {
    value: false,
    disabled: false
};

var InputCheckBoxWithError = (_dec = (0, _material2.default)('mdlHolder'), (0, _translation2.default)(_class = _dec(_class = function (_Component) {
    _inherits(InputCheckBoxWithError, _Component);

    function InputCheckBoxWithError(props) {
        _classCallCheck(this, InputCheckBoxWithError);

        var _this = _possibleConstructorReturn(this, _Component.call(this, props));

        _this.getValue = function () {
            var domElement = _reactDom2.default.findDOMNode(_this.refs.checkbox);
            return domElement.checked;
        };

        _this.handleOnChange = _this.handleOnChange.bind(_this);
        return _this;
    }

    InputCheckBoxWithError.prototype.componentDidUpdate = function componentDidUpdate() {
        var value = this.props.value;

        var method = value ? 'add' : 'remove';
        var node = _reactDom2.default.findDOMNode(this.refs.mdlHolder);
        if (node) {
            node.classList[method]('is-checked');
        }
    };

    InputCheckBoxWithError.prototype.handleOnChange = function handleOnChange(_ref) {
        var checked = _ref.target.checked;
        var onChange = this.props.onChange;

        onChange(checked);
    };

    InputCheckBoxWithError.prototype.render = function render() {
        var validInputProps = (0, _filterHtmlAttributes2.default)(this.props);

        var _props = this.props,
            label = _props.label,
            value = _props.value,
            disabled = _props.disabled,
            error = _props.error;


        validInputProps.onChange = this.handleOnChange;
        var inputProps = _extends({}, validInputProps, { type: 'checkbox', disabled: disabled, checked: value, className: 'mdl-checkbox__input' });
        delete inputProps.value;

        return _react2.default.createElement(
            'div',
            { 'data-error': !!error, 'data-focus': 'input-checkbox-with-error-container' },
            _react2.default.createElement(
                'label',
                { className: 'mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect', 'data-focus': 'input-checkbox', ref: 'mdlHolder' },
                _react2.default.createElement('input', _extends({ ref: 'checkbox' }, inputProps)),
                label && _react2.default.createElement(
                    'span',
                    { className: 'mdl-checkbox__label' },
                    this.i18n(label)
                ),
                error && _react2.default.createElement(
                    'span',
                    { className: 'input-checkbox__error' },
                    this.i18n(error)
                )
            )
        );
    };

    return InputCheckBoxWithError;
}(_react.Component)) || _class) || _class);


InputCheckBoxWithError.displayName = 'InputCheckBoxWithError';
InputCheckBoxWithError.propTypes = propTypes;
InputCheckBoxWithError.defaultProps = defaultProps;
exports.default = InputCheckBoxWithError;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJwcm9wVHlwZXMiLCJsYWJlbCIsInN0cmluZyIsIm9uQ2hhbmdlIiwiZnVuYyIsImlzUmVxdWlyZWQiLCJ2YWx1ZSIsImJvb2wiLCJkaXNhYmxlZCIsImVycm9yIiwiZGVmYXVsdFByb3BzIiwiSW5wdXRDaGVja0JveFdpdGhFcnJvciIsInByb3BzIiwiZ2V0VmFsdWUiLCJkb21FbGVtZW50IiwiZmluZERPTU5vZGUiLCJyZWZzIiwiY2hlY2tib3giLCJjaGVja2VkIiwiaGFuZGxlT25DaGFuZ2UiLCJiaW5kIiwiY29tcG9uZW50RGlkVXBkYXRlIiwibWV0aG9kIiwibm9kZSIsIm1kbEhvbGRlciIsImNsYXNzTGlzdCIsInRhcmdldCIsInJlbmRlciIsInZhbGlkSW5wdXRQcm9wcyIsImlucHV0UHJvcHMiLCJ0eXBlIiwiY2xhc3NOYW1lIiwiaTE4biIsImRpc3BsYXlOYW1lIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7QUFFQSxJQUFNQSxZQUFZO0FBQ2RDLFdBQU8saUJBQVVDLE1BREg7QUFFZEMsY0FBVSxpQkFBVUMsSUFBVixDQUFlQyxVQUZYO0FBR2RDLFdBQU8saUJBQVVDLElBQVYsQ0FBZUYsVUFIUjtBQUlkRyxjQUFVLGlCQUFVRCxJQUpOO0FBS2RFLFdBQU8saUJBQVVQO0FBTEgsQ0FBbEI7O0FBUUEsSUFBTVEsZUFBZTtBQUNqQkosV0FBTyxLQURVO0FBRWpCRSxjQUFVO0FBRk8sQ0FBckI7O0lBT01HLHNCLFdBREwsd0JBQVMsV0FBVCxDOzs7QUFFRyxvQ0FBWUMsS0FBWixFQUFtQjtBQUFBOztBQUFBLHFEQUNmLHNCQUFNQSxLQUFOLENBRGU7O0FBQUEsY0FLbkJDLFFBTG1CLEdBS1IsWUFBTTtBQUNiLGdCQUFNQyxhQUFhLG1CQUFTQyxXQUFULENBQXFCLE1BQUtDLElBQUwsQ0FBVUMsUUFBL0IsQ0FBbkI7QUFDQSxtQkFBT0gsV0FBV0ksT0FBbEI7QUFDSCxTQVJrQjs7QUFFZixjQUFLQyxjQUFMLEdBQXNCLE1BQUtBLGNBQUwsQ0FBb0JDLElBQXBCLE9BQXRCO0FBRmU7QUFHbEI7O3FDQU9EQyxrQixpQ0FBcUI7QUFBQSxZQUNWZixLQURVLEdBQ0QsS0FBS00sS0FESixDQUNWTixLQURVOztBQUVqQixZQUFNZ0IsU0FBU2hCLFFBQVEsS0FBUixHQUFnQixRQUEvQjtBQUNBLFlBQU1pQixPQUFPLG1CQUFTUixXQUFULENBQXFCLEtBQUtDLElBQUwsQ0FBVVEsU0FBL0IsQ0FBYjtBQUNBLFlBQUlELElBQUosRUFBVTtBQUNOQSxpQkFBS0UsU0FBTCxDQUFlSCxNQUFmLEVBQXVCLFlBQXZCO0FBQ0g7QUFDSixLOztxQ0FFREgsYyxpQ0FBb0M7QUFBQSxZQUFYRCxPQUFXLFFBQXBCUSxNQUFvQixDQUFYUixPQUFXO0FBQUEsWUFDekJmLFFBRHlCLEdBQ2IsS0FBS1MsS0FEUSxDQUN6QlQsUUFEeUI7O0FBRWhDQSxpQkFBU2UsT0FBVDtBQUNILEs7O3FDQUVEUyxNLHFCQUFTO0FBQ0wsWUFBTUMsa0JBQWtCLG9DQUFZLEtBQUtoQixLQUFqQixDQUF4Qjs7QUFESyxxQkFHbUMsS0FBS0EsS0FIeEM7QUFBQSxZQUdFWCxLQUhGLFVBR0VBLEtBSEY7QUFBQSxZQUdTSyxLQUhULFVBR1NBLEtBSFQ7QUFBQSxZQUdnQkUsUUFIaEIsVUFHZ0JBLFFBSGhCO0FBQUEsWUFHMEJDLEtBSDFCLFVBRzBCQSxLQUgxQjs7O0FBS0xtQix3QkFBZ0J6QixRQUFoQixHQUEyQixLQUFLZ0IsY0FBaEM7QUFDQSxZQUFNVSwwQkFBaUJELGVBQWpCLElBQWtDRSxNQUFNLFVBQXhDLEVBQW9EdEIsa0JBQXBELEVBQThEVSxTQUFTWixLQUF2RSxFQUE4RXlCLFdBQVcscUJBQXpGLEdBQU47QUFDQSxlQUFPRixXQUFXdkIsS0FBbEI7O0FBRUEsZUFDSTtBQUFBO0FBQUEsY0FBSyxjQUFZLENBQUMsQ0FBQ0csS0FBbkIsRUFBMEIsY0FBVyxxQ0FBckM7QUFDSTtBQUFBO0FBQUEsa0JBQU8sV0FBVyxtREFBbEIsRUFBdUUsY0FBVyxnQkFBbEYsRUFBbUcsS0FBSSxXQUF2RztBQUNJLGtFQUFPLEtBQUksVUFBWCxJQUEwQm9CLFVBQTFCLEVBREo7QUFFSzVCLHlCQUFTO0FBQUE7QUFBQSxzQkFBTSxXQUFVLHFCQUFoQjtBQUF1Qyx5QkFBSytCLElBQUwsQ0FBVS9CLEtBQVY7QUFBdkMsaUJBRmQ7QUFHS1EseUJBQVM7QUFBQTtBQUFBLHNCQUFNLFdBQVUsdUJBQWhCO0FBQXlDLHlCQUFLdUIsSUFBTCxDQUFVdkIsS0FBVjtBQUF6QztBQUhkO0FBREosU0FESjtBQVNILEs7Ozs7OztBQUdMRSx1QkFBdUJzQixXQUF2QixHQUFxQyx3QkFBckM7QUFDQXRCLHVCQUF1QlgsU0FBdkIsR0FBbUNBLFNBQW5DO0FBQ0FXLHVCQUF1QkQsWUFBdkIsR0FBc0NBLFlBQXRDO2tCQUNlQyxzQiIsImZpbGUiOiJpcy1yZWFjdC1jbGFzcy1jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnQsIFByb3BUeXBlc30gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgUmVhY3RET00gZnJvbSAncmVhY3QtZG9tJztcclxuaW1wb3J0IFRyYW5zbGF0aW9uIGZyb20gJy4uLy4uLy4uL2JlaGF2aW91cnMvdHJhbnNsYXRpb24nO1xyXG5pbXBvcnQgTWF0ZXJpYWwgZnJvbSAnLi4vLi4vLi4vYmVoYXZpb3Vycy9tYXRlcmlhbCc7XHJcbmltcG9ydCBmaWx0ZXJQcm9wcyBmcm9tICcuLi8uLi8uLi91dGlscy9maWx0ZXItaHRtbC1hdHRyaWJ1dGVzJztcclxuXHJcbmNvbnN0IHByb3BUeXBlcyA9IHtcclxuICAgIGxhYmVsOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG4gICAgb25DaGFuZ2U6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXHJcbiAgICB2YWx1ZTogUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcclxuICAgIGRpc2FibGVkOiBQcm9wVHlwZXMuYm9vbCxcclxuICAgIGVycm9yOiBQcm9wVHlwZXMuc3RyaW5nXHJcbn07XHJcblxyXG5jb25zdCBkZWZhdWx0UHJvcHMgPSB7XHJcbiAgICB2YWx1ZTogZmFsc2UsXHJcbiAgICBkaXNhYmxlZDogZmFsc2VcclxufTtcclxuXHJcbkBUcmFuc2xhdGlvblxyXG5ATWF0ZXJpYWwoJ21kbEhvbGRlcicpXHJcbmNsYXNzIElucHV0Q2hlY2tCb3hXaXRoRXJyb3IgZXh0ZW5kcyBDb21wb25lbnQge1xyXG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcclxuICAgICAgICBzdXBlcihwcm9wcyk7XHJcbiAgICAgICAgdGhpcy5oYW5kbGVPbkNoYW5nZSA9IHRoaXMuaGFuZGxlT25DaGFuZ2UuYmluZCh0aGlzKTtcclxuICAgIH0gXHJcbiAgICAgICAgXHJcbiAgICBnZXRWYWx1ZSA9ICgpID0+IHtcclxuICAgICAgICBjb25zdCBkb21FbGVtZW50ID0gUmVhY3RET00uZmluZERPTU5vZGUodGhpcy5yZWZzLmNoZWNrYm94KTtcclxuICAgICAgICByZXR1cm4gZG9tRWxlbWVudC5jaGVja2VkO1xyXG4gICAgfTtcclxuXHJcbiAgICBjb21wb25lbnREaWRVcGRhdGUoKSB7XHJcbiAgICAgICAgY29uc3Qge3ZhbHVlfSA9IHRoaXMucHJvcHM7XHJcbiAgICAgICAgY29uc3QgbWV0aG9kID0gdmFsdWUgPyAnYWRkJyA6ICdyZW1vdmUnO1xyXG4gICAgICAgIGNvbnN0IG5vZGUgPSBSZWFjdERPTS5maW5kRE9NTm9kZSh0aGlzLnJlZnMubWRsSG9sZGVyKTtcclxuICAgICAgICBpZiAobm9kZSkge1xyXG4gICAgICAgICAgICBub2RlLmNsYXNzTGlzdFttZXRob2RdKCdpcy1jaGVja2VkJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGhhbmRsZU9uQ2hhbmdlKHt0YXJnZXQ6IHtjaGVja2VkfX0pIHtcclxuICAgICAgICBjb25zdCB7b25DaGFuZ2V9ID0gdGhpcy5wcm9wcztcclxuICAgICAgICBvbkNoYW5nZShjaGVja2VkKTtcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgY29uc3QgdmFsaWRJbnB1dFByb3BzID0gZmlsdGVyUHJvcHModGhpcy5wcm9wcyk7XHJcblxyXG4gICAgICAgIGNvbnN0IHtsYWJlbCwgdmFsdWUsIGRpc2FibGVkLCBlcnJvcn0gPSB0aGlzLnByb3BzO1xyXG5cclxuICAgICAgICB2YWxpZElucHV0UHJvcHMub25DaGFuZ2UgPSB0aGlzLmhhbmRsZU9uQ2hhbmdlO1xyXG4gICAgICAgIGNvbnN0IGlucHV0UHJvcHMgPSB7Li4udmFsaWRJbnB1dFByb3BzLCB0eXBlOiAnY2hlY2tib3gnLCBkaXNhYmxlZCwgY2hlY2tlZDogdmFsdWUsIGNsYXNzTmFtZTogJ21kbC1jaGVja2JveF9faW5wdXQnfTtcclxuICAgICAgICBkZWxldGUgaW5wdXRQcm9wcy52YWx1ZTtcclxuXHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdiBkYXRhLWVycm9yPXshIWVycm9yfSBkYXRhLWZvY3VzPSdpbnB1dC1jaGVja2JveC13aXRoLWVycm9yLWNvbnRhaW5lcic+XHJcbiAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPXsnbWRsLWNoZWNrYm94IG1kbC1qcy1jaGVja2JveCBtZGwtanMtcmlwcGxlLWVmZmVjdCd9IGRhdGEtZm9jdXM9J2lucHV0LWNoZWNrYm94JyByZWY9J21kbEhvbGRlcic+XHJcbiAgICAgICAgICAgICAgICAgICAgPGlucHV0IHJlZj0nY2hlY2tib3gnIHsuLi5pbnB1dFByb3BzfS8+XHJcbiAgICAgICAgICAgICAgICAgICAge2xhYmVsICYmIDxzcGFuIGNsYXNzTmFtZT0nbWRsLWNoZWNrYm94X19sYWJlbCc+e3RoaXMuaTE4bihsYWJlbCl9PC9zcGFuPn1cclxuICAgICAgICAgICAgICAgICAgICB7ZXJyb3IgJiYgPHNwYW4gY2xhc3NOYW1lPSdpbnB1dC1jaGVja2JveF9fZXJyb3InPnt0aGlzLmkxOG4oZXJyb3IpfTwvc3Bhbj59XHJcbiAgICAgICAgICAgICAgICA8L2xhYmVsPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG59XHJcblxyXG5JbnB1dENoZWNrQm94V2l0aEVycm9yLmRpc3BsYXlOYW1lID0gJ0lucHV0Q2hlY2tCb3hXaXRoRXJyb3InO1xyXG5JbnB1dENoZWNrQm94V2l0aEVycm9yLnByb3BUeXBlcyA9IHByb3BUeXBlcztcclxuSW5wdXRDaGVja0JveFdpdGhFcnJvci5kZWZhdWx0UHJvcHMgPSBkZWZhdWx0UHJvcHM7XHJcbmV4cG9ydCBkZWZhdWx0IElucHV0Q2hlY2tCb3hXaXRoRXJyb3I7XHJcbiJdfQ==