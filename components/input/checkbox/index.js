'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _dec, _class;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _translation = require('../../../behaviours/translation');

var _translation2 = _interopRequireDefault(_translation);

var _material = require('../../../behaviours/material');

var _material2 = _interopRequireDefault(_material);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var propTypes = {
    label: _react.PropTypes.string,
    disabled: _react.PropTypes.bool,
    onChange: _react.PropTypes.func.isRequired,
    value: _react.PropTypes.bool.isRequired
};

var defaultProps = {
    value: false,
    disabled: false
};

var displayName = 'InputCheckBox';

var InputCheckBox = (_dec = (0, _material2.default)('mdlHolder'), (0, _translation2.default)(_class = _dec(_class = function (_Component) {
    _inherits(InputCheckBox, _Component);

    function InputCheckBox() {
        var _temp, _this, _ret;

        _classCallCheck(this, InputCheckBox);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.getValue = function () {
            var domElement = _reactDom2.default.findDOMNode(_this.refs.checkbox);
            return domElement.checked;
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    InputCheckBox.prototype.componentDidUpdate = function componentDidUpdate() {
        var value = this.props.value;

        var method = value ? 'add' : 'remove';
        var node = _reactDom2.default.findDOMNode(this.refs.mdlHolder);
        if (node) {
            node.classList[method]('is-checked');
        }
    };

    InputCheckBox.prototype.handleOnChange = function handleOnChange(_ref) {
        var checked = _ref.target.checked;
        var onChange = this.props.onChange;

        onChange(checked);
    };

    InputCheckBox.prototype.render = function render() {
        var _props = this.props,
            label = _props.label,
            value = _props.value,
            disabled = _props.disabled;

        return _react2.default.createElement(
            'div',
            { 'data-focus': 'input-checkbox-container' },
            _react2.default.createElement(
                'label',
                { className: 'mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect', 'data-focus': 'input-checkbox', ref: 'mdlHolder' },
                _react2.default.createElement('input', { checked: value, className: 'mdl-checkbox__input', disabled: disabled, onChange: this.handleOnChange.bind(this), ref: 'checkbox', type: 'checkbox' }),
                label && _react2.default.createElement(
                    'span',
                    { className: 'mdl-checkbox__label' },
                    this.i18n(label)
                )
            )
        );
    };

    return InputCheckBox;
}(_react.Component)) || _class) || _class);


InputCheckBox.propTypes = propTypes;
InputCheckBox.defaultProps = defaultProps;
InputCheckBox.displayName = displayName;

exports.default = InputCheckBox;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJwcm9wVHlwZXMiLCJsYWJlbCIsInN0cmluZyIsImRpc2FibGVkIiwiYm9vbCIsIm9uQ2hhbmdlIiwiZnVuYyIsImlzUmVxdWlyZWQiLCJ2YWx1ZSIsImRlZmF1bHRQcm9wcyIsImRpc3BsYXlOYW1lIiwiSW5wdXRDaGVja0JveCIsImdldFZhbHVlIiwiZG9tRWxlbWVudCIsImZpbmRET01Ob2RlIiwicmVmcyIsImNoZWNrYm94IiwiY2hlY2tlZCIsImNvbXBvbmVudERpZFVwZGF0ZSIsInByb3BzIiwibWV0aG9kIiwibm9kZSIsIm1kbEhvbGRlciIsImNsYXNzTGlzdCIsImhhbmRsZU9uQ2hhbmdlIiwidGFyZ2V0IiwicmVuZGVyIiwiaTE4biJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7QUFFQSxJQUFNQSxZQUFZO0FBQ2RDLFdBQU8saUJBQVVDLE1BREg7QUFFZEMsY0FBVSxpQkFBVUMsSUFGTjtBQUdkQyxjQUFVLGlCQUFVQyxJQUFWLENBQWVDLFVBSFg7QUFJZEMsV0FBTyxpQkFBVUosSUFBVixDQUFlRztBQUpSLENBQWxCOztBQU9BLElBQU1FLGVBQWU7QUFDakJELFdBQU8sS0FEVTtBQUVqQkwsY0FBVTtBQUZPLENBQXJCOztBQUtBLElBQU1PLGNBQWMsZUFBcEI7O0lBSU1DLGEsV0FETCx3QkFBUyxXQUFULEM7Ozs7Ozs7Ozs7OztnSkFFR0MsUSxHQUFXLFlBQU07QUFDYixnQkFBTUMsYUFBYSxtQkFBU0MsV0FBVCxDQUFxQixNQUFLQyxJQUFMLENBQVVDLFFBQS9CLENBQW5CO0FBQ0EsbUJBQU9ILFdBQVdJLE9BQWxCO0FBQ0gsUzs7OzRCQUVEQyxrQixpQ0FBcUI7QUFBQSxZQUNWVixLQURVLEdBQ0QsS0FBS1csS0FESixDQUNWWCxLQURVOztBQUVqQixZQUFNWSxTQUFTWixRQUFRLEtBQVIsR0FBZ0IsUUFBL0I7QUFDQSxZQUFNYSxPQUFPLG1CQUFTUCxXQUFULENBQXFCLEtBQUtDLElBQUwsQ0FBVU8sU0FBL0IsQ0FBYjtBQUNBLFlBQUlELElBQUosRUFBVTtBQUNOQSxpQkFBS0UsU0FBTCxDQUFlSCxNQUFmLEVBQXVCLFlBQXZCO0FBQ0g7QUFDSixLOzs0QkFFREksYyxpQ0FBb0M7QUFBQSxZQUFYUCxPQUFXLFFBQXBCUSxNQUFvQixDQUFYUixPQUFXO0FBQUEsWUFDekJaLFFBRHlCLEdBQ2IsS0FBS2MsS0FEUSxDQUN6QmQsUUFEeUI7O0FBRWhDQSxpQkFBU1ksT0FBVDtBQUNILEs7OzRCQUVEUyxNLHFCQUFTO0FBQUEscUJBQzRCLEtBQUtQLEtBRGpDO0FBQUEsWUFDRWxCLEtBREYsVUFDRUEsS0FERjtBQUFBLFlBQ1NPLEtBRFQsVUFDU0EsS0FEVDtBQUFBLFlBQ2dCTCxRQURoQixVQUNnQkEsUUFEaEI7O0FBRUwsZUFDRTtBQUFBO0FBQUEsY0FBSyxjQUFXLDBCQUFoQjtBQUNFO0FBQUE7QUFBQSxrQkFBTyxXQUFXLG1EQUFsQixFQUF1RSxjQUFXLGdCQUFsRixFQUFtRyxLQUFJLFdBQXZHO0FBQ0kseURBQU8sU0FBU0ssS0FBaEIsRUFBdUIsV0FBVSxxQkFBakMsRUFBdUQsVUFBVUwsUUFBakUsRUFBMkUsVUFBWSxLQUFLcUIsY0FBakIsTUFBWSxJQUFaLENBQTNFLEVBQTRHLEtBQUksVUFBaEgsRUFBMkgsTUFBSyxVQUFoSSxHQURKO0FBRUt2Qix5QkFBUztBQUFBO0FBQUEsc0JBQU0sV0FBVSxxQkFBaEI7QUFBdUMseUJBQUswQixJQUFMLENBQVUxQixLQUFWO0FBQXZDO0FBRmQ7QUFERixTQURGO0FBUUgsSzs7Ozs7O0FBR0xVLGNBQWNYLFNBQWQsR0FBMEJBLFNBQTFCO0FBQ0FXLGNBQWNGLFlBQWQsR0FBNkJBLFlBQTdCO0FBQ0FFLGNBQWNELFdBQWQsR0FBNEJBLFdBQTVCOztrQkFFZUMsYSIsImZpbGUiOiJpcy1yZWFjdC1jbGFzcy1jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnQsIFByb3BUeXBlc30gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgUmVhY3RET00gZnJvbSAncmVhY3QtZG9tJztcclxuaW1wb3J0IFRyYW5zbGF0aW9uIGZyb20gJy4uLy4uLy4uL2JlaGF2aW91cnMvdHJhbnNsYXRpb24nO1xyXG5pbXBvcnQgTWF0ZXJpYWwgZnJvbSAnLi4vLi4vLi4vYmVoYXZpb3Vycy9tYXRlcmlhbCc7XHJcblxyXG5jb25zdCBwcm9wVHlwZXMgPSB7XHJcbiAgICBsYWJlbDogUHJvcFR5cGVzLnN0cmluZyxcclxuICAgIGRpc2FibGVkOiBQcm9wVHlwZXMuYm9vbCxcclxuICAgIG9uQ2hhbmdlOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxyXG4gICAgdmFsdWU6IFByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWRcclxufTtcclxuXHJcbmNvbnN0IGRlZmF1bHRQcm9wcyA9IHtcclxuICAgIHZhbHVlOiBmYWxzZSxcclxuICAgIGRpc2FibGVkOiBmYWxzZVxyXG59O1xyXG5cclxuY29uc3QgZGlzcGxheU5hbWUgPSAnSW5wdXRDaGVja0JveCc7XHJcblxyXG5AVHJhbnNsYXRpb25cclxuQE1hdGVyaWFsKCdtZGxIb2xkZXInKVxyXG5jbGFzcyBJbnB1dENoZWNrQm94IGV4dGVuZHMgQ29tcG9uZW50IHtcclxuICAgIGdldFZhbHVlID0gKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGRvbUVsZW1lbnQgPSBSZWFjdERPTS5maW5kRE9NTm9kZSh0aGlzLnJlZnMuY2hlY2tib3gpO1xyXG4gICAgICAgIHJldHVybiBkb21FbGVtZW50LmNoZWNrZWQ7XHJcbiAgICB9O1xyXG5cclxuICAgIGNvbXBvbmVudERpZFVwZGF0ZSgpIHtcclxuICAgICAgICBjb25zdCB7dmFsdWV9ID0gdGhpcy5wcm9wcztcclxuICAgICAgICBjb25zdCBtZXRob2QgPSB2YWx1ZSA/ICdhZGQnIDogJ3JlbW92ZSc7XHJcbiAgICAgICAgY29uc3Qgbm9kZSA9IFJlYWN0RE9NLmZpbmRET01Ob2RlKHRoaXMucmVmcy5tZGxIb2xkZXIpO1xyXG4gICAgICAgIGlmIChub2RlKSB7XHJcbiAgICAgICAgICAgIG5vZGUuY2xhc3NMaXN0W21ldGhvZF0oJ2lzLWNoZWNrZWQnKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaGFuZGxlT25DaGFuZ2Uoe3RhcmdldDoge2NoZWNrZWR9fSkge1xyXG4gICAgICAgIGNvbnN0IHtvbkNoYW5nZX0gPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIG9uQ2hhbmdlKGNoZWNrZWQpO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICBjb25zdCB7bGFiZWwsIHZhbHVlLCBkaXNhYmxlZH0gPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICA8ZGl2IGRhdGEtZm9jdXM9J2lucHV0LWNoZWNrYm94LWNvbnRhaW5lcic+XHJcbiAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9eydtZGwtY2hlY2tib3ggbWRsLWpzLWNoZWNrYm94IG1kbC1qcy1yaXBwbGUtZWZmZWN0J30gZGF0YS1mb2N1cz0naW5wdXQtY2hlY2tib3gnIHJlZj0nbWRsSG9sZGVyJz5cclxuICAgICAgICAgICAgICAgIDxpbnB1dCBjaGVja2VkPXt2YWx1ZX0gY2xhc3NOYW1lPSdtZGwtY2hlY2tib3hfX2lucHV0JyBkaXNhYmxlZD17ZGlzYWJsZWR9IG9uQ2hhbmdlPXs6OnRoaXMuaGFuZGxlT25DaGFuZ2V9IHJlZj0nY2hlY2tib3gnIHR5cGU9J2NoZWNrYm94Jy8+XHJcbiAgICAgICAgICAgICAgICB7bGFiZWwgJiYgPHNwYW4gY2xhc3NOYW1lPSdtZGwtY2hlY2tib3hfX2xhYmVsJz57dGhpcy5pMThuKGxhYmVsKX08L3NwYW4+fVxyXG4gICAgICAgICAgICA8L2xhYmVsPlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufVxyXG5cclxuSW5wdXRDaGVja0JveC5wcm9wVHlwZXMgPSBwcm9wVHlwZXM7XHJcbklucHV0Q2hlY2tCb3guZGVmYXVsdFByb3BzID0gZGVmYXVsdFByb3BzO1xyXG5JbnB1dENoZWNrQm94LmRpc3BsYXlOYW1lID0gZGlzcGxheU5hbWU7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBJbnB1dENoZWNrQm94O1xyXG4iXX0=