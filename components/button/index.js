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

var _componentBase = require('../../behaviours/component-base');

var _componentBase2 = _interopRequireDefault(_componentBase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

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
    id: _react.PropTypes.string,
    handleOnClick: _react.PropTypes.func, //to remove in V2
    hasRipple: _react.PropTypes.bool,
    isJs: _react.PropTypes.bool,
    icon: _react.PropTypes.string,
    iconLibrary: _react.PropTypes.oneOf(['material', 'font-awesome', 'font-custom']),
    label: _react.PropTypes.string,
    onClick: _react.PropTypes.func,
    shape: _react.PropTypes.oneOf([undefined, 'raised', 'fab', 'icon', 'mini-fab']),
    type: _react.PropTypes.oneOf(['submit', 'button'])
};

var defaultProps = {
    type: 'submit',
    shape: 'raised',
    label: '',
    icon: null,
    id: '',
    hasRipple: false,
    isJs: false,
    iconLibrary: 'material'
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

        var refNode = _reactDom2.default.findDOMNode(this.refs['materialButton']);
        if (hasRipple) {
            componentHandler.upgradeElement(refNode, 'MaterialRipple');
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
            iconLibrary = _props2.iconLibrary;

        switch (iconLibrary) {
            case 'material':
                return _react2.default.createElement(
                    'i',
                    { className: 'material-icons' },
                    icon
                );
            case 'font-awesome':
                var faCss = 'fa fa-' + icon;
                return _react2.default.createElement('i', { className: faCss });
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
            label = _props3.label,
            shape = _props3.shape;

        if (label && 'fab' !== shape && 'icon' !== shape && 'mini-fab' !== shape) {
            return this.i18n(label);
        }
        return null;
    };

    /** inheritedDoc */
    Button.prototype.render = function render() {
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
            rest = _objectWithoutProperties(_props4, ['className', 'disabled', 'formNoValidate', 'handleOnClick', 'icon', 'id', 'onClick', 'type', 'label', 'style', 'hasRipple', 'isJs', 'iconLibrary', 'noAltAndNoTitle']);

        var otherInputProps = _extends({ disabled: disabled, formNoValidate: formNoValidate, onClick: handleOnClick ? handleOnClick : onClick, style: style, type: type }, rest); //on click for legacy. Remove handleOnClick in v2
        var renderedClassName = ((className ? className : '') + ' ' + this._getComponentClassName.call(this)).trim();
        if (noAltAndNoTitle) {
            return _react2.default.createElement(
                'button',
                _extends({ className: renderedClassName, 'data-focus': 'button-action', id: id }, otherInputProps, { ref: 'materialButton' }),
                icon && this._renderIcon.call(this),
                this._renderLabel.call(this)
            );
        }
        return _react2.default.createElement(
            'button',
            _extends({ alt: this.i18n(label), className: renderedClassName, 'data-focus': 'button-action', id: id, title: this.i18n(label) }, otherInputProps, { ref: 'materialButton' }),
            icon && this._renderIcon.call(this),
            this._renderLabel.call(this)
        );
    };

    return Button;
}(_react.Component)) || _class) || _class);


Button.displayName = 'Button';
Button.defaultProps = defaultProps;
Button.propTypes = propTypes;

exports.default = Button;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJCVE5fSlMiLCJCVE5fQ0xBU1MiLCJCVVRUT05fUFJGWCIsIlJJUFBMRV9FRkZFQ1QiLCJwcm9wVHlwZXMiLCJjb2xvciIsIm9uZU9mIiwidW5kZWZpbmVkIiwiaWQiLCJzdHJpbmciLCJoYW5kbGVPbkNsaWNrIiwiZnVuYyIsImhhc1JpcHBsZSIsImJvb2wiLCJpc0pzIiwiaWNvbiIsImljb25MaWJyYXJ5IiwibGFiZWwiLCJvbkNsaWNrIiwic2hhcGUiLCJ0eXBlIiwiZGVmYXVsdFByb3BzIiwiQnV0dG9uIiwiY29tcG9uZW50RGlkTW91bnQiLCJwcm9wcyIsInJlZk5vZGUiLCJmaW5kRE9NTm9kZSIsInJlZnMiLCJjb21wb25lbnRIYW5kbGVyIiwidXBncmFkZUVsZW1lbnQiLCJfZ2V0Q29tcG9uZW50Q2xhc3NOYW1lIiwiU0hBUEVfQ0xBU1MiLCJDT0xPUl9DTEFTUyIsIkpTX0NMQVNTIiwiUklQUExFX0VGRkVDVF9DTEFTUyIsInJlbmRlclByZXNzZWRCdXR0b24iLCJfcmVuZGVySWNvbiIsImZhQ3NzIiwiX3JlbmRlckxhYmVsIiwiaTE4biIsInJlbmRlciIsImNsYXNzTmFtZSIsImRpc2FibGVkIiwiZm9ybU5vVmFsaWRhdGUiLCJzdHlsZSIsIm5vQWx0QW5kTm9UaXRsZSIsInJlc3QiLCJvdGhlcklucHV0UHJvcHMiLCJyZW5kZXJlZENsYXNzTmFtZSIsInRyaW0iLCJkaXNwbGF5TmFtZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQSxJQUFNQSxTQUFTLGVBQWY7QUFDQSxJQUFNQyxZQUFZLFlBQWxCO0FBQ0EsSUFBTUMsY0FBYyxjQUFwQjtBQUNBLElBQU1DLGdCQUFnQixzQkFBdEI7O0FBRUEsSUFBTUMsWUFBWTtBQUNkQyxXQUFPLGlCQUFVQyxLQUFWLENBQWdCLENBQUND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anMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50LCBQcm9wVHlwZXMgfSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBSZWFjdERPTSBmcm9tICdyZWFjdC1kb20nO1xyXG5pbXBvcnQgTURCZWhhdmlvdXIgZnJvbSAnLi4vLi4vYmVoYXZpb3Vycy9tYXRlcmlhbCc7XHJcbmltcG9ydCBUcmFuc2xhdGlvbiBmcm9tICcuLi8uLi9iZWhhdmlvdXJzL3RyYW5zbGF0aW9uJztcclxuaW1wb3J0IENvbXBvbmVudEJhc2VCZWhhdmlvdXIgZnJvbSAnLi4vLi4vYmVoYXZpb3Vycy9jb21wb25lbnQtYmFzZSc7XHJcblxyXG5jb25zdCBCVE5fSlMgPSAnbWRsLWpzLWJ1dHRvbic7XHJcbmNvbnN0IEJUTl9DTEFTUyA9ICdtZGwtYnV0dG9uJztcclxuY29uc3QgQlVUVE9OX1BSRlggPSAnbWRsLWJ1dHRvbi0tJztcclxuY29uc3QgUklQUExFX0VGRkVDVCA9ICdtZGwtanMtcmlwcGxlLWVmZmVjdCc7XHJcblxyXG5jb25zdCBwcm9wVHlwZXMgPSB7XHJcbiAgICBjb2xvcjogUHJvcFR5cGVzLm9uZU9mKFt1bmRlZmluZWQsICdjb2xvcmVkJywgJ3ByaW1hcnknLCAnYWNjZW50J10pLFxyXG4gICAgaWQ6IFByb3BUeXBlcy5zdHJpbmcsXHJcbiAgICBoYW5kbGVPbkNsaWNrOiBQcm9wVHlwZXMuZnVuYywgLy90byByZW1vdmUgaW4gVjJcclxuICAgIGhhc1JpcHBsZTogUHJvcFR5cGVzLmJvb2wsXHJcbiAgICBpc0pzOiBQcm9wVHlwZXMuYm9vbCxcclxuICAgIGljb246IFByb3BUeXBlcy5zdHJpbmcsXHJcbiAgICBpY29uTGlicmFyeTogUHJvcFR5cGVzLm9uZU9mKFsnbWF0ZXJpYWwnLCAnZm9udC1hd2Vzb21lJywgJ2ZvbnQtY3VzdG9tJ10pLFxyXG4gICAgbGFiZWw6IFByb3BUeXBlcy5zdHJpbmcsXHJcbiAgICBvbkNsaWNrOiBQcm9wVHlwZXMuZnVuYyxcclxuICAgIHNoYXBlOiBQcm9wVHlwZXMub25lT2YoW3VuZGVmaW5lZCwgJ3JhaXNlZCcsICdmYWInLCAnaWNvbicsICdtaW5pLWZhYiddKSxcclxuICAgIHR5cGU6IFByb3BUeXBlcy5vbmVPZihbJ3N1Ym1pdCcsICdidXR0b24nXSlcclxufVxyXG5cclxuY29uc3QgZGVmYXVsdFByb3BzID0ge1xyXG4gICAgdHlwZTogJ3N1Ym1pdCcsXHJcbiAgICBzaGFwZTogJ3JhaXNlZCcsXHJcbiAgICBsYWJlbDogJycsXHJcbiAgICBpY29uOiBudWxsLFxyXG4gICAgaWQ6ICcnLFxyXG4gICAgaGFzUmlwcGxlOiBmYWxzZSxcclxuICAgIGlzSnM6IGZhbHNlLFxyXG4gICAgaWNvbkxpYnJhcnk6ICdtYXRlcmlhbCdcclxufVxyXG5cclxuQE1EQmVoYXZpb3VyKCdtYXRlcmlhbEJ1dHRvbicsICdNYXRlcmlhbEJ1dHRvbicpXHJcbkBUcmFuc2xhdGlvblxyXG5jbGFzcyBCdXR0b24gZXh0ZW5kcyBDb21wb25lbnQge1xyXG5cclxuICAgIC8qKlxyXG4gICAgKiBDYWxsZWQgd2hlbiBjb21wb25lbnQgaXMgbW91bnRlZC5cclxuICAgICovXHJcbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcclxuICAgICAgICBjb25zdCB7aGFzUmlwcGxlfSA9IHRoaXMucHJvcHM7XHJcbiAgICAgICAgY29uc3QgcmVmTm9kZSA9IFJlYWN0RE9NLmZpbmRET01Ob2RlKHRoaXMucmVmc1snbWF0ZXJpYWxCdXR0b24nXSk7XHJcbiAgICAgICAgaWYgKGhhc1JpcHBsZSkge1xyXG4gICAgICAgICAgICBjb21wb25lbnRIYW5kbGVyLnVwZ3JhZGVFbGVtZW50KHJlZk5vZGUsICdNYXRlcmlhbFJpcHBsZScpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICogRGF0ZSBkZSBjb21wb3NhbnQuXHJcbiAgICAqIEByZXR1cm4ge3N0cmluZ30gQ2xhc3NlLlxyXG4gICAgKi9cclxuICAgIF9nZXRDb21wb25lbnRDbGFzc05hbWUoKSB7XHJcbiAgICAgICAgY29uc3Qge3NoYXBlLCBjb2xvciwgaGFzUmlwcGxlLCBpc0pzfSA9IHRoaXMucHJvcHM7XHJcbiAgICAgICAgbGV0IFNIQVBFX0NMQVNTO1xyXG4gICAgICAgIHN3aXRjaCAoc2hhcGUpIHtcclxuICAgICAgICAgICAgY2FzZSAncmFpc2VkJzpcclxuICAgICAgICAgICAgICAgIFNIQVBFX0NMQVNTID0gYCR7QlVUVE9OX1BSRlh9cmFpc2VkYDtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdmYWInOlxyXG4gICAgICAgICAgICAgICAgU0hBUEVfQ0xBU1MgPSBgJHtCVVRUT05fUFJGWH1mYWJgO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ2ljb24nOlxyXG4gICAgICAgICAgICAgICAgU0hBUEVfQ0xBU1MgPSBgJHtCVVRUT05fUFJGWH1pY29uYDtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdtaW5pLWZhYic6XHJcbiAgICAgICAgICAgICAgICBTSEFQRV9DTEFTUyA9IGAke0JVVFRPTl9QUkZYfW1pbmktZmFiICR7QlVUVE9OX1BSRlh9ZmFiYDtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIG51bGw6XHJcbiAgICAgICAgICAgICAgICBTSEFQRV9DTEFTUyA9ICcnO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICBTSEFQRV9DTEFTUyA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgQ09MT1JfQ0xBU1MgPSBjb2xvciA/IGAke0JVVFRPTl9QUkZYfSR7Y29sb3J9YCA6ICcnO1xyXG4gICAgICAgIGNvbnN0IEpTX0NMQVNTID0gaXNKcyA/IEJUTl9KUyA6ICcnO1xyXG4gICAgICAgIGNvbnN0IFJJUFBMRV9FRkZFQ1RfQ0xBU1MgPSBoYXNSaXBwbGUgPyBSSVBQTEVfRUZGRUNUIDogJyc7XHJcbiAgICAgICAgcmV0dXJuIGAke0JUTl9DTEFTU30gJHtDT0xPUl9DTEFTU30gJHtTSEFQRV9DTEFTU30gJHtKU19DTEFTU30gJHtSSVBQTEVfRUZGRUNUX0NMQVNTfWA7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAqIFJlbmRlciB0aGUgcHJlc3NlZCBidXR0b24uXHJcbiAgICAqIEByZXR1cm4ge0NvbXBvbmVudH0gLSBDb21wb25lbnQgYnV0dG9uLlxyXG4gICAgKi9cclxuICAgIHJlbmRlclByZXNzZWRCdXR0b24oKSB7XHJcbiAgICAgICAgcmV0dXJuICg8YnV0dG9uPkxvYWRpbmcuLi48L2J1dHRvbj4pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgKiBSZW5kZXIgYW4gaWNvbi5cclxuICAgICogQHJldHVybiB7Q29tcG9uZW50fSAtIENvbXBvc2FudCBpY29uZS5cclxuICAgICovXHJcbiAgICBfcmVuZGVySWNvbigpIHtcclxuICAgICAgICBjb25zdCB7aWNvbiwgaWNvbkxpYnJhcnl9ID0gdGhpcy5wcm9wcztcclxuICAgICAgICBzd2l0Y2ggKGljb25MaWJyYXJ5KSB7XHJcbiAgICAgICAgICAgIGNhc2UgJ21hdGVyaWFsJzpcclxuICAgICAgICAgICAgICAgIHJldHVybiA8aSBjbGFzc05hbWU9J21hdGVyaWFsLWljb25zJz57aWNvbn08L2k+O1xyXG4gICAgICAgICAgICBjYXNlICdmb250LWF3ZXNvbWUnOlxyXG4gICAgICAgICAgICAgICAgY29uc3QgZmFDc3MgPSBgZmEgZmEtJHtpY29ufWA7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gPGkgY2xhc3NOYW1lPXtmYUNzc30+PC9pPjtcclxuICAgICAgICAgICAgY2FzZSAnZm9udC1jdXN0b20nOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIDxzcGFuIGNsYXNzTmFtZT17YGljb24tJHtpY29ufWB9Pjwvc3Bhbj47XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgKiBSZW5kZXIgdGhlIGxhYmVsLlxyXG4gICAgKiBAcmV0dXJuIHtDb21wb25lbnR9IC0gVGxlIGJ1dHRvbiBsYWJlbC5cclxuICAgICovXHJcbiAgICBfcmVuZGVyTGFiZWwoKSB7XHJcbiAgICAgICAgY29uc3Qge2xhYmVsLCBzaGFwZX0gPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIGlmIChsYWJlbCAmJiAnZmFiJyAhPT0gc2hhcGUgJiYgJ2ljb24nICE9PSBzaGFwZSAmJiAnbWluaS1mYWInICE9PSBzaGFwZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5pMThuKGxhYmVsKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKiBpbmhlcml0ZWREb2MgKi9cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICAvLyBhdHRyaWJ1dGUgZG9jIDogaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZnIvZG9jcy9XZWIvSFRNTC9FbGVtZW50L0J1dHRvblxyXG4gICAgICAgIC8vIGJlIGNhcmVmdWwgdGhlIHdheSB5b3UgZGVjbGFyZSB5b3VyIGF0dHJpYnV0ZSBuYW1lcyA6IGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2ZyL2RvY3MvV2ViL0hUTUwvRWxlbWVudC9CdXR0b25cclxuICAgICAgICBjb25zdCB7Y2xhc3NOYW1lLCBkaXNhYmxlZCwgZm9ybU5vVmFsaWRhdGUsIGhhbmRsZU9uQ2xpY2ssIGljb24sIGlkLCBvbkNsaWNrLCB0eXBlLCBsYWJlbCwgc3R5bGUsIGhhc1JpcHBsZSwgaXNKcywgaWNvbkxpYnJhcnksIG5vQWx0QW5kTm9UaXRsZSwgLi4ucmVzdH0gPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIGNvbnN0IG90aGVySW5wdXRQcm9wcyA9IHsgZGlzYWJsZWQsIGZvcm1Ob1ZhbGlkYXRlLCBvbkNsaWNrOiBoYW5kbGVPbkNsaWNrID8gaGFuZGxlT25DbGljayA6IG9uQ2xpY2ssIHN0eWxlLCB0eXBlLCAuLi5yZXN0IH07IC8vb24gY2xpY2sgZm9yIGxlZ2FjeS4gUmVtb3ZlIGhhbmRsZU9uQ2xpY2sgaW4gdjJcclxuICAgICAgICBjb25zdCByZW5kZXJlZENsYXNzTmFtZSA9IGAke2NsYXNzTmFtZSA/IGNsYXNzTmFtZSA6ICcnfSAkezo6dGhpcy5fZ2V0Q29tcG9uZW50Q2xhc3NOYW1lKClcclxuICAgIH1gLnRyaW0oKTtcclxuICAgICAgICBpZihub0FsdEFuZE5vVGl0bGUpe1xyXG4gICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT17cmVuZGVyZWRDbGFzc05hbWV9IGRhdGEtZm9jdXM9J2J1dHRvbi1hY3Rpb24nIGlkPXtpZH17Li4ub3RoZXJJbnB1dFByb3BzfSByZWY9J21hdGVyaWFsQnV0dG9uJz5cclxuICAgICAgICAgICAgICAgIHtpY29uICYmIDo6dGhpcy5fcmVuZGVySWNvbigpfVxyXG4gICAgICAgICAgICAgICAgezo6dGhpcy5fcmVuZGVyTGFiZWwoKX1cclxuICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxidXR0b24gYWx0PXt0aGlzLmkxOG4obGFiZWwpfSBjbGFzc05hbWU9e3JlbmRlcmVkQ2xhc3NOYW1lfSBkYXRhLWZvY3VzPSdidXR0b24tYWN0aW9uJyBpZD17aWR9IHRpdGxlPXt0aGlzLmkxOG4obGFiZWwpfSB7Li4ub3RoZXJJbnB1dFByb3BzfSByZWY9J21hdGVyaWFsQnV0dG9uJz5cclxuICAgICAgICAgICAgICAgIHtpY29uICYmIDo6dGhpcy5fcmVuZGVySWNvbigpfVxyXG4gICAgICAgICAgICAgICAgezo6dGhpcy5fcmVuZGVyTGFiZWwoKX1cclxuICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufVxyXG5cclxuQnV0dG9uLmRpc3BsYXlOYW1lID0gJ0J1dHRvbidcclxuQnV0dG9uLmRlZmF1bHRQcm9wcyA9IGRlZmF1bHRQcm9wcztcclxuQnV0dG9uLnByb3BUeXBlcyA9IHByb3BUeXBlcztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEJ1dHRvbjtcclxuIl19