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

var _material = require('../../behaviours/material');

var _material2 = _interopRequireDefault(_material);

var _translation = require('../../behaviours/translation');

var _translation2 = _interopRequireDefault(_translation);

var _filterHtmlAttributes = require('../../utils/filter-html-attributes');

var _filterHtmlAttributes2 = _interopRequireDefault(_filterHtmlAttributes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var BTN_JS = 'mdl-js-button';
var BTN_CLASS = 'mdl-button';
var BUTTON_PRFX = 'mdl-button--';
var RIPPLE_EFFECT = 'mdl-js-ripple-effect';

var propTypes = {
    color: _react.PropTypes.oneOf([undefined, 'colored', 'primary', 'accent']),
    handleOnClick: _react.PropTypes.func, //to remove in V2
    hasRipple: _react.PropTypes.bool,
    id: _react.PropTypes.string,
    icon: _react.PropTypes.string,
    iconLibrary: _react.PropTypes.oneOf(['material', 'font-awesome', 'font-custom']),
    isJs: _react.PropTypes.bool,
    isLoading: _react.PropTypes.bool,
    label: _react.PropTypes.string,
    onClick: _react.PropTypes.func,
    shape: _react.PropTypes.oneOf([undefined, 'raised', 'fab', 'icon', 'mini-fab']),
    type: _react.PropTypes.oneOf(['submit', 'button'])
};

var defaultProps = {
    hasRipple: false,
    icon: null,
    iconLibrary: 'material',
    id: '',
    isJs: false,
    label: '',
    shape: 'raised',
    type: 'submit'
};

var Button = (_dec = (0, _material2.default)('materialButton', 'MaterialButton'), _dec(_class = (0, _translation2.default)(_class = function (_Component) {
    _inherits(Button, _Component);

    function Button() {
        _classCallCheck(this, Button);

        return _possibleConstructorReturn(this, _Component.apply(this, arguments));
    }

    /**
    * Called when component is mounted.
    */
    Button.prototype.componentDidMount = function componentDidMount() {
        var hasRipple = this.props.hasRipple;

        var refNode = _reactDom2.default.findDOMNode(this.refs.materialButton);
        if (hasRipple) {
            componentHandler.upgradeElement(refNode, 'MaterialRipple');
        }
    };

    Button.prototype.componentDidUpdate = function componentDidUpdate() {
        var spinnerNode = _reactDom2.default.findDOMNode(this.refs['double-action-button-spinner']);
        if (spinnerNode) {
            componentHandler.upgradeElement(spinnerNode, 'MaterialSpinner');
        }
    };

    /**
    * Date de composant.
    * @return {string} Classe.
    */


    Button.prototype._getComponentClassName = function _getComponentClassName() {
        var _props = this.props,
            shape = _props.shape,
            color = _props.color,
            hasRipple = _props.hasRipple,
            isJs = _props.isJs;

        var SHAPE_CLASS = void 0;
        switch (shape) {
            case 'raised':
                SHAPE_CLASS = BUTTON_PRFX + 'raised';
                break;
            case 'fab':
                SHAPE_CLASS = BUTTON_PRFX + 'fab';
                break;
            case 'icon':
                SHAPE_CLASS = BUTTON_PRFX + 'icon';
                break;
            case 'mini-fab':
                SHAPE_CLASS = BUTTON_PRFX + 'mini-fab ' + BUTTON_PRFX + 'fab';
                break;
            case null:
                SHAPE_CLASS = '';
                break;
            default:
                SHAPE_CLASS = null;
                break;
        }
        var COLOR_CLASS = color ? '' + BUTTON_PRFX + color : '';
        var JS_CLASS = isJs ? BTN_JS : '';
        var RIPPLE_EFFECT_CLASS = hasRipple ? RIPPLE_EFFECT : '';
        return BTN_CLASS + ' ' + COLOR_CLASS + ' ' + SHAPE_CLASS + ' ' + JS_CLASS + ' ' + RIPPLE_EFFECT_CLASS;
    };

    /**
    * Render the pressed button.
    * @return {Component} - Component button.
    */


    Button.prototype.renderPressedButton = function renderPressedButton() {
        return _react2.default.createElement(
            'button',
            null,
            'Loading...'
        );
    };

    /**
    * Render an icon.
    * @return {Component} - Composant icone.
    */


    Button.prototype._renderIcon = function _renderIcon() {
        var _props2 = this.props,
            icon = _props2.icon,
            iconLibrary = _props2.iconLibrary,
            classNameIcon = _props2.classNameIcon,
            labelIcon = _props2.labelIcon,
            ariaHidden = _props2.ariaHidden;

        switch (iconLibrary) {
            case 'material':
                if (classNameIcon && labelIcon) {
                    return _react2.default.createElement(
                        'div',
                        null,
                        _react2.default.createElement(
                            'span',
                            { className: classNameIcon },
                            labelIcon
                        ),
                        _react2.default.createElement(
                            'i',
                            { className: 'material-icons' },
                            icon
                        )
                    );
                }
                return _react2.default.createElement(
                    'i',
                    { className: 'material-icons', 'aria-hidden': ariaHidden },
                    icon
                );
            case 'font-awesome':
                return _react2.default.createElement('i', { className: 'fa fa-' + icon });
            case 'font-custom':
                return _react2.default.createElement('span', { className: 'icon-' + icon });
            default:
                return null;
        }
    };

    /**
    * Render the label.
    * @return {Component} - Tle button label.
    */


    Button.prototype._renderLabel = function _renderLabel() {
        var _props3 = this.props,
            isLoading = _props3.isLoading,
            label = _props3.label,
            processLabel = _props3.processLabel,
            shape = _props3.shape;


        if (label && 'fab' !== shape && 'icon' !== shape && 'mini-fab' !== shape && (!isLoading || !processLabel)) {
            return _react2.default.createElement(
                'span',
                { 'data-focus': 'button-label' },
                this.i18n(label)
            );
        } else if (processLabel && 'fab' !== shape && 'icon' !== shape && 'mini-fab' !== shape && isLoading) {
            return _react2.default.createElement(
                'span',
                { 'data-focus': 'button-label' },
                this.i18n(processLabel)
            );
        }
        return null;
    };

    /**
     * Wrapper around on click, to prevent click action is spinner is showed.
     * 
     * @param {any} event the html event
     * @param {any} onClick the onclick function to call
     * 
     * @memberOf Button
     */


    Button.prototype._wrappedOnClick = function _wrappedOnClick(event, onClick) {
        if (this.props.isLoading) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            onClick(event);
        }
    };

    /** inheritedDoc */


    Button.prototype.render = function render() {
        var _this2 = this,
            _extends3;

        // attribute doc : https://developer.mozilla.org/fr/docs/Web/HTML/Element/Button
        // be careful the way you declare your attribute names : https://developer.mozilla.org/fr/docs/Web/HTML/Element/Button
        var _props4 = this.props,
            className = _props4.className,
            disabled = _props4.disabled,
            formNoValidate = _props4.formNoValidate,
            handleOnClick = _props4.handleOnClick,
            icon = _props4.icon,
            id = _props4.id,
            onClick = _props4.onClick,
            type = _props4.type,
            label = _props4.label,
            style = _props4.style,
            hasRipple = _props4.hasRipple,
            isJs = _props4.isJs,
            iconLibrary = _props4.iconLibrary,
            noAltAndNoTitle = _props4.noAltAndNoTitle,
            isLoading = _props4.isLoading,
            rest = _objectWithoutProperties(_props4, ['className', 'disabled', 'formNoValidate', 'handleOnClick', 'icon', 'id', 'onClick', 'type', 'label', 'style', 'hasRipple', 'isJs', 'iconLibrary', 'noAltAndNoTitle', 'isLoading']);

        var onClickFunc = handleOnClick ? handleOnClick : onClick;
        var otherInputProps = (0, _filterHtmlAttributes2.default)(_extends({ disabled: disabled, formNoValidate: formNoValidate, style: style, type: type }, rest)); //on click for legacy. Remove handleOnClick in v2

        if (onClickFunc) {
            otherInputProps.onClick = function (event) {
                return _this2._wrappedOnClick(event, onClickFunc);
            };
        }
        var renderedClassName = ((className ? className : '') + ' ' + this._getComponentClassName.call(this)).trim();
        if (noAltAndNoTitle) {
            var _extends2;

            return _react2.default.createElement(
                'button',
                _extends((_extends2 = { className: renderedClassName, 'data-focus': 'button-action', id: id, 'data-saving': isLoading }, _defineProperty(_extends2, 'id', id), _defineProperty(_extends2, 'disabled', isLoading), _extends2), otherInputProps, { ref: 'materialButton' }),
                icon && this._renderIcon.call(this),
                this._renderLabel.call(this)
            );
        }
        return _react2.default.createElement(
            'button',
            _extends((_extends3 = { alt: this.i18n(label), className: renderedClassName, 'data-focus': 'button-action', id: id, title: this.i18n(label), 'data-saving': isLoading }, _defineProperty(_extends3, 'id', id), _defineProperty(_extends3, 'disabled', isLoading), _extends3), otherInputProps, { ref: 'materialButton' }),
            icon && this._renderIcon.call(this),
            this._renderLabel.call(this),
            isLoading && _react2.default.createElement('div', { className: 'mdl-spinner mdl-spinner--single-color mdl-js-spinner is-active', 'data-focus': 'double-action-button-spinner', ref: 'double-action-button-spinner' })
        );
    };

    return Button;
}(_react.Component)) || _class) || _class);


Button.displayName = 'Button';
Button.defaultProps = defaultProps;
Button.propTypes = propTypes;

exports.default = Button;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJCVE5fSlMiLCJCVE5fQ0xBU1MiLCJCVVRUT05fUFJGWCIsIlJJUFBMRV9FRkZFQ1QiLCJwcm9wVHlwZXMiLCJjb2xvciIsIm9uZU9mIiwidW5kZWZpbmVkIiwiaGFuZGxlT25DbGljayIsImZ1bmMiLCJoYXNSaXBwbGUiLCJib29sIiwiaWQiLCJzdHJpbmciLCJpY29uIiwiaWNvbkxpYnJhcnkiLCJpc0pzIiwiaXNMb2FkaW5nIiwibGFiZWwiLCJvbkNsaWNrIiwic2hhcGUiLCJ0eXBlIiwiZGVmYXVsdFByb3BzIiwiQnV0dG9uIiwiY29tcG9uZW50RGlkTW91bnQiLCJwcm9wcyIsInJlZk5vZGUiLCJmaW5kRE9NTm9kZSIsInJlZnMiLCJtYXRlcmlhbEJ1dHRvbiIsImNvbXBvbmVudEhhbmRsZXIiLCJ1cGdyYWRlRWxlbWVudCIsImNvbXBvbmVudERpZFVwZGF0ZSIsInNwaW5uZXJOb2RlIiwiX2dldENvbXBvbmVudENsYXNzTmFtZSIsIlNIQVBFX0NMQVNTIiwiQ09MT1JfQ0xBU1MiLCJKU19DTEFTUyIsIlJJUFBMRV9FRkZFQ1RfQ0xBU1MiLCJyZW5kZXJQcmVzc2VkQnV0dG9uIiwiX3JlbmRlckljb24iLCJjbGFzc05hbWVJY29uIiwibGFiZWxJY29uIiwiYXJpYUhpZGRlbiIsIl9yZW5kZXJMYWJlbCIsInByb2Nlc3NMYWJlbCIsImkxOG4iLCJfd3JhcHBlZE9uQ2xpY2siLCJldmVudCIsInByZXZlbnREZWZhdWx0Iiwic3RvcFByb3BhZ2F0aW9uIiwicmVuZGVyIiwiY2xhc3NOYW1lIiwiZGlzYWJsZWQiLCJmb3JtTm9WYWxpZGF0ZSIsInN0eWxlIiwibm9BbHRBbmROb1RpdGxlIiwicmVzdCIsIm9uQ2xpY2tGdW5jIiwib3RoZXJJbnB1dFByb3BzIiwicmVuZGVyZWRDbGFzc05hbWUiLCJ0cmltIiwiZGlzcGxheU5hbWUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7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YjtBQUVPLHFCQUFLSSxZQUFQLE1BQUUsSUFBRjtBQUZMLGFBREo7QUFNQztBQUNELGVBQ0k7QUFBQTtBQUFBLG9DQUFRLEtBQUssS0FBS0UsSUFBTCxDQUFVNUIsS0FBVixDQUFiLEVBQStCLFdBQVcwQyxpQkFBMUMsRUFBNkQsY0FBVyxlQUF4RSxFQUF3RixJQUFJaEQsRUFBNUYsRUFBZ0csT0FBTyxLQUFLa0MsSUFBTCxDQUFVNUIsS0FBVixDQUF2RyxFQUF5SCxlQUFhRCxTQUF0SSxxQ0FBcUpMLEVBQXJKLDBDQUFtS0ssU0FBbkssZUFBa0wwQyxlQUFsTCxJQUFtTSxLQUFJLGdCQUF2TTtBQUNLN0Msb0JBQVUsS0FBSzBCLFdBQVAsTUFBRSxJQUFGLENBRGI7QUFFTyxpQkFBS0ksWUFBUCxNQUFFLElBQUYsQ0FGTDtBQUdLM0IseUJBQWEsdUNBQUssV0FBVSxnRUFBZixFQUFnRixjQUFXLDhCQUEzRixFQUEwSCxLQUFJLDhCQUE5SDtBQUhsQixTQURKO0FBT0gsSzs7Ozs7O0FBR0xNLE9BQU91QyxXQUFQLEdBQXFCLFFBQXJCO0FBQ0F2QyxPQUFPRCxZQUFQLEdBQXNCQSxZQUF0QjtBQUNBQyxPQUFPbkIsU0FBUCxHQUFtQkEsU0FBbkI7O2tCQUVlbUIsTSIsImZpbGUiOiJpcy1yZWFjdC1jbGFzcy1jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50LCBQcm9wVHlwZXMgfSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBSZWFjdERPTSBmcm9tICdyZWFjdC1kb20nO1xyXG5pbXBvcnQgTURCZWhhdmlvdXIgZnJvbSAnLi4vLi4vYmVoYXZpb3Vycy9tYXRlcmlhbCc7XHJcbmltcG9ydCBUcmFuc2xhdGlvbiBmcm9tICcuLi8uLi9iZWhhdmlvdXJzL3RyYW5zbGF0aW9uJztcclxuaW1wb3J0IGZpbHRlclByb3BzIGZyb20gJy4uLy4uL3V0aWxzL2ZpbHRlci1odG1sLWF0dHJpYnV0ZXMnO1xyXG5cclxuY29uc3QgQlROX0pTID0gJ21kbC1qcy1idXR0b24nO1xyXG5jb25zdCBCVE5fQ0xBU1MgPSAnbWRsLWJ1dHRvbic7XHJcbmNvbnN0IEJVVFRPTl9QUkZYID0gJ21kbC1idXR0b24tLSc7XHJcbmNvbnN0IFJJUFBMRV9FRkZFQ1QgPSAnbWRsLWpzLXJpcHBsZS1lZmZlY3QnO1xyXG5cclxuY29uc3QgcHJvcFR5cGVzID0ge1xyXG4gICAgY29sb3I6IFByb3BUeXBlcy5vbmVPZihbdW5kZWZpbmVkLCAnY29sb3JlZCcsICdwcmltYXJ5JywgJ2FjY2VudCddKSxcclxuICAgIGhhbmRsZU9uQ2xpY2s6IFByb3BUeXBlcy5mdW5jLCAvL3RvIHJlbW92ZSBpbiBWMlxyXG4gICAgaGFzUmlwcGxlOiBQcm9wVHlwZXMuYm9vbCxcclxuICAgIGlkOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG4gICAgaWNvbjogUHJvcFR5cGVzLnN0cmluZyxcclxuICAgIGljb25MaWJyYXJ5OiBQcm9wVHlwZXMub25lT2YoWydtYXRlcmlhbCcsICdmb250LWF3ZXNvbWUnLCAnZm9udC1jdXN0b20nXSksXHJcbiAgICBpc0pzOiBQcm9wVHlwZXMuYm9vbCxcclxuICAgIGlzTG9hZGluZzogUHJvcFR5cGVzLmJvb2wsXHJcbiAgICBsYWJlbDogUHJvcFR5cGVzLnN0cmluZyxcclxuICAgIG9uQ2xpY2s6IFByb3BUeXBlcy5mdW5jLFxyXG4gICAgc2hhcGU6IFByb3BUeXBlcy5vbmVPZihbdW5kZWZpbmVkLCAncmFpc2VkJywgJ2ZhYicsICdpY29uJywgJ21pbmktZmFiJ10pLFxyXG4gICAgdHlwZTogUHJvcFR5cGVzLm9uZU9mKFsnc3VibWl0JywgJ2J1dHRvbiddKVxyXG59XHJcblxyXG5jb25zdCBkZWZhdWx0UHJvcHMgPSB7XHJcbiAgICBoYXNSaXBwbGU6IGZhbHNlLFxyXG4gICAgaWNvbjogbnVsbCxcclxuICAgIGljb25MaWJyYXJ5OiAnbWF0ZXJpYWwnLFxyXG4gICAgaWQ6ICcnLFxyXG4gICAgaXNKczogZmFsc2UsXHJcbiAgICBsYWJlbDogJycsXHJcbiAgICBzaGFwZTogJ3JhaXNlZCcsXHJcbiAgICB0eXBlOiAnc3VibWl0J1xyXG59XHJcblxyXG5ATURCZWhhdmlvdXIoJ21hdGVyaWFsQnV0dG9uJywgJ01hdGVyaWFsQnV0dG9uJylcclxuQFRyYW5zbGF0aW9uXHJcbmNsYXNzIEJ1dHRvbiBleHRlbmRzIENvbXBvbmVudCB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAqIENhbGxlZCB3aGVuIGNvbXBvbmVudCBpcyBtb3VudGVkLlxyXG4gICAgKi9cclxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xyXG4gICAgICAgIGNvbnN0IHsgaGFzUmlwcGxlIH0gPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIGNvbnN0IHJlZk5vZGUgPSBSZWFjdERPTS5maW5kRE9NTm9kZSh0aGlzLnJlZnMubWF0ZXJpYWxCdXR0b24pO1xyXG4gICAgICAgIGlmIChoYXNSaXBwbGUpIHtcclxuICAgICAgICAgICAgY29tcG9uZW50SGFuZGxlci51cGdyYWRlRWxlbWVudChyZWZOb2RlLCAnTWF0ZXJpYWxSaXBwbGUnKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY29tcG9uZW50RGlkVXBkYXRlKCkge1xyXG4gICAgICAgIGNvbnN0IHNwaW5uZXJOb2RlID0gUmVhY3RET00uZmluZERPTU5vZGUodGhpcy5yZWZzWydkb3VibGUtYWN0aW9uLWJ1dHRvbi1zcGlubmVyJ10pO1xyXG4gICAgICAgIGlmIChzcGlubmVyTm9kZSkge1xyXG4gICAgICAgICAgICBjb21wb25lbnRIYW5kbGVyLnVwZ3JhZGVFbGVtZW50KHNwaW5uZXJOb2RlLCAnTWF0ZXJpYWxTcGlubmVyJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgKiBEYXRlIGRlIGNvbXBvc2FudC5cclxuICAgICogQHJldHVybiB7c3RyaW5nfSBDbGFzc2UuXHJcbiAgICAqL1xyXG4gICAgX2dldENvbXBvbmVudENsYXNzTmFtZSgpIHtcclxuICAgICAgICBjb25zdCB7IHNoYXBlLCBjb2xvciwgaGFzUmlwcGxlLCBpc0pzIH0gPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIGxldCBTSEFQRV9DTEFTUztcclxuICAgICAgICBzd2l0Y2ggKHNoYXBlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgJ3JhaXNlZCc6XHJcbiAgICAgICAgICAgICAgICBTSEFQRV9DTEFTUyA9IGAke0JVVFRPTl9QUkZYfXJhaXNlZGA7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnZmFiJzpcclxuICAgICAgICAgICAgICAgIFNIQVBFX0NMQVNTID0gYCR7QlVUVE9OX1BSRlh9ZmFiYDtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdpY29uJzpcclxuICAgICAgICAgICAgICAgIFNIQVBFX0NMQVNTID0gYCR7QlVUVE9OX1BSRlh9aWNvbmA7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnbWluaS1mYWInOlxyXG4gICAgICAgICAgICAgICAgU0hBUEVfQ0xBU1MgPSBgJHtCVVRUT05fUFJGWH1taW5pLWZhYiAke0JVVFRPTl9QUkZYfWZhYmA7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBudWxsOlxyXG4gICAgICAgICAgICAgICAgU0hBUEVfQ0xBU1MgPSAnJztcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgU0hBUEVfQ0xBU1MgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IENPTE9SX0NMQVNTID0gY29sb3IgPyBgJHtCVVRUT05fUFJGWH0ke2NvbG9yfWAgOiAnJztcclxuICAgICAgICBjb25zdCBKU19DTEFTUyA9IGlzSnMgPyBCVE5fSlMgOiAnJztcclxuICAgICAgICBjb25zdCBSSVBQTEVfRUZGRUNUX0NMQVNTID0gaGFzUmlwcGxlID8gUklQUExFX0VGRkVDVCA6ICcnO1xyXG4gICAgICAgIHJldHVybiBgJHtCVE5fQ0xBU1N9ICR7Q09MT1JfQ0xBU1N9ICR7U0hBUEVfQ0xBU1N9ICR7SlNfQ0xBU1N9ICR7UklQUExFX0VGRkVDVF9DTEFTU31gO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgKiBSZW5kZXIgdGhlIHByZXNzZWQgYnV0dG9uLlxyXG4gICAgKiBAcmV0dXJuIHtDb21wb25lbnR9IC0gQ29tcG9uZW50IGJ1dHRvbi5cclxuICAgICovXHJcbiAgICByZW5kZXJQcmVzc2VkQnV0dG9uKCkge1xyXG4gICAgICAgIHJldHVybiAoPGJ1dHRvbj5Mb2FkaW5nLi4uPC9idXR0b24+KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICogUmVuZGVyIGFuIGljb24uXHJcbiAgICAqIEByZXR1cm4ge0NvbXBvbmVudH0gLSBDb21wb3NhbnQgaWNvbmUuXHJcbiAgICAqL1xyXG4gICAgX3JlbmRlckljb24oKSB7XHJcbiAgICAgICAgY29uc3Qge2ljb24sIGljb25MaWJyYXJ5LCBjbGFzc05hbWVJY29uLCBsYWJlbEljb24sIGFyaWFIaWRkZW59ID0gdGhpcy5wcm9wcztcclxuICAgICAgICBzd2l0Y2ggKGljb25MaWJyYXJ5KSB7XHJcbiAgICAgICAgICAgIGNhc2UgJ21hdGVyaWFsJzpcclxuICAgICAgICAgICAgICAgIGlmIChjbGFzc05hbWVJY29uICYmIGxhYmVsSWNvbikge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9e2NsYXNzTmFtZUljb259PntsYWJlbEljb259PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3NOYW1lPSdtYXRlcmlhbC1pY29ucyc+e2ljb259PC9pPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gPGkgY2xhc3NOYW1lPSdtYXRlcmlhbC1pY29ucycgYXJpYS1oaWRkZW49e2FyaWFIaWRkZW59PntpY29ufTwvaT47XHJcbiAgICAgICAgICAgIGNhc2UgJ2ZvbnQtYXdlc29tZSc6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gPGkgY2xhc3NOYW1lPXtgZmEgZmEtJHtpY29ufWB9IC8+O1xyXG4gICAgICAgICAgICBjYXNlICdmb250LWN1c3RvbSc6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gPHNwYW4gY2xhc3NOYW1lPXtgaWNvbi0ke2ljb259YH0gLz47XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAqIFJlbmRlciB0aGUgbGFiZWwuXHJcbiAgICAqIEByZXR1cm4ge0NvbXBvbmVudH0gLSBUbGUgYnV0dG9uIGxhYmVsLlxyXG4gICAgKi9cclxuICAgIF9yZW5kZXJMYWJlbCgpIHtcclxuICAgICAgICBjb25zdCB7IGlzTG9hZGluZywgbGFiZWwsIHByb2Nlc3NMYWJlbCwgc2hhcGUgfSA9IHRoaXMucHJvcHM7XHJcblxyXG4gICAgICAgIGlmIChsYWJlbCAmJiAnZmFiJyAhPT0gc2hhcGUgJiYgJ2ljb24nICE9PSBzaGFwZSAmJiAnbWluaS1mYWInICE9PSBzaGFwZSAmJiAoIWlzTG9hZGluZyB8fCAhcHJvY2Vzc0xhYmVsKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gPHNwYW4gZGF0YS1mb2N1cz0nYnV0dG9uLWxhYmVsJz57dGhpcy5pMThuKGxhYmVsKX08L3NwYW4+O1xyXG4gICAgICAgIH0gZWxzZSBpZiAocHJvY2Vzc0xhYmVsICYmICdmYWInICE9PSBzaGFwZSAmJiAnaWNvbicgIT09IHNoYXBlICYmICdtaW5pLWZhYicgIT09IHNoYXBlICYmIGlzTG9hZGluZykge1xyXG4gICAgICAgICAgICByZXR1cm4gPHNwYW4gZGF0YS1mb2N1cz0nYnV0dG9uLWxhYmVsJz57dGhpcy5pMThuKHByb2Nlc3NMYWJlbCl9PC9zcGFuPlxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFdyYXBwZXIgYXJvdW5kIG9uIGNsaWNrLCB0byBwcmV2ZW50IGNsaWNrIGFjdGlvbiBpcyBzcGlubmVyIGlzIHNob3dlZC5cclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHthbnl9IGV2ZW50IHRoZSBodG1sIGV2ZW50XHJcbiAgICAgKiBAcGFyYW0ge2FueX0gb25DbGljayB0aGUgb25jbGljayBmdW5jdGlvbiB0byBjYWxsXHJcbiAgICAgKiBcclxuICAgICAqIEBtZW1iZXJPZiBCdXR0b25cclxuICAgICAqL1xyXG4gICAgX3dyYXBwZWRPbkNsaWNrKGV2ZW50LCBvbkNsaWNrKSB7XHJcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuaXNMb2FkaW5nKSB7XHJcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIG9uQ2xpY2soZXZlbnQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKiogaW5oZXJpdGVkRG9jICovXHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgLy8gYXR0cmlidXRlIGRvYyA6IGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2ZyL2RvY3MvV2ViL0hUTUwvRWxlbWVudC9CdXR0b25cclxuICAgICAgICAvLyBiZSBjYXJlZnVsIHRoZSB3YXkgeW91IGRlY2xhcmUgeW91ciBhdHRyaWJ1dGUgbmFtZXMgOiBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9mci9kb2NzL1dlYi9IVE1ML0VsZW1lbnQvQnV0dG9uXHJcbiAgICAgICAgY29uc3Qge2NsYXNzTmFtZSwgZGlzYWJsZWQsIGZvcm1Ob1ZhbGlkYXRlLCBoYW5kbGVPbkNsaWNrLCBpY29uLCBpZCwgb25DbGljaywgdHlwZSwgbGFiZWwsIHN0eWxlLCBoYXNSaXBwbGUsIGlzSnMsIGljb25MaWJyYXJ5LCBub0FsdEFuZE5vVGl0bGUsIGlzTG9hZGluZywgLi4ucmVzdH0gPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIGNvbnN0IG9uQ2xpY2tGdW5jID0gaGFuZGxlT25DbGljayA/IGhhbmRsZU9uQ2xpY2sgOiBvbkNsaWNrO1xyXG4gICAgICAgIGNvbnN0IG90aGVySW5wdXRQcm9wcyA9IGZpbHRlclByb3BzKHsgZGlzYWJsZWQsIGZvcm1Ob1ZhbGlkYXRlLCBzdHlsZSwgdHlwZSwgLi4ucmVzdCB9KTsgLy9vbiBjbGljayBmb3IgbGVnYWN5LiBSZW1vdmUgaGFuZGxlT25DbGljayBpbiB2MlxyXG5cclxuICAgICAgICBpZiAob25DbGlja0Z1bmMpIHtcclxuICAgICAgICAgICAgb3RoZXJJbnB1dFByb3BzLm9uQ2xpY2sgPSBldmVudCA9PiB0aGlzLl93cmFwcGVkT25DbGljayhldmVudCwgb25DbGlja0Z1bmMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCByZW5kZXJlZENsYXNzTmFtZSA9IGAke2NsYXNzTmFtZSA/IGNsYXNzTmFtZSA6ICcnfSAkezo6dGhpcy5fZ2V0Q29tcG9uZW50Q2xhc3NOYW1lKCl9YC50cmltKCk7XHJcbiAgICAgICAgaWYobm9BbHRBbmROb1RpdGxlKXtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT17cmVuZGVyZWRDbGFzc05hbWV9IGRhdGEtZm9jdXM9J2J1dHRvbi1hY3Rpb24nIGlkPXtpZH0gZGF0YS1zYXZpbmc9e2lzTG9hZGluZ30gaWQ9e2lkfSBkaXNhYmxlZD17aXNMb2FkaW5nfSB7Li4ub3RoZXJJbnB1dFByb3BzfSByZWY9J21hdGVyaWFsQnV0dG9uJz5cclxuICAgICAgICAgICAgICAgIHtpY29uICYmIDo6dGhpcy5fcmVuZGVySWNvbigpfVxyXG4gICAgICAgICAgICAgICAgezo6dGhpcy5fcmVuZGVyTGFiZWwoKX1cclxuICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxidXR0b24gYWx0PXt0aGlzLmkxOG4obGFiZWwpfSBjbGFzc05hbWU9e3JlbmRlcmVkQ2xhc3NOYW1lfSBkYXRhLWZvY3VzPSdidXR0b24tYWN0aW9uJyBpZD17aWR9IHRpdGxlPXt0aGlzLmkxOG4obGFiZWwpfSBkYXRhLXNhdmluZz17aXNMb2FkaW5nfSBpZD17aWR9IGRpc2FibGVkPXtpc0xvYWRpbmd9IHsuLi5vdGhlcklucHV0UHJvcHN9IHJlZj0nbWF0ZXJpYWxCdXR0b24nPlxyXG4gICAgICAgICAgICAgICAge2ljb24gJiYgOjp0aGlzLl9yZW5kZXJJY29uKCl9XHJcbiAgICAgICAgICAgICAgICB7Ojp0aGlzLl9yZW5kZXJMYWJlbCgpfVxyXG4gICAgICAgICAgICAgICAge2lzTG9hZGluZyAmJiA8ZGl2IGNsYXNzTmFtZT0nbWRsLXNwaW5uZXIgbWRsLXNwaW5uZXItLXNpbmdsZS1jb2xvciBtZGwtanMtc3Bpbm5lciBpcy1hY3RpdmUnIGRhdGEtZm9jdXM9J2RvdWJsZS1hY3Rpb24tYnV0dG9uLXNwaW5uZXInIHJlZj0nZG91YmxlLWFjdGlvbi1idXR0b24tc3Bpbm5lcicgLz59XHJcbiAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbn1cclxuXHJcbkJ1dHRvbi5kaXNwbGF5TmFtZSA9ICdCdXR0b24nXHJcbkJ1dHRvbi5kZWZhdWx0UHJvcHMgPSBkZWZhdWx0UHJvcHM7XHJcbkJ1dHRvbi5wcm9wVHlwZXMgPSBwcm9wVHlwZXM7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBCdXR0b247ICAgICAgICAgICAgICAgICAgICJdfQ==