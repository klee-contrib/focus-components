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
    id: undefined,
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
                    return [_react2.default.createElement(
                        'span',
                        { className: classNameIcon },
                        labelIcon
                    ), _react2.default.createElement(
                        'i',
                        { className: 'material-icons' },
                        icon
                    )];
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
        var _this2 = this;

        // attribute doc : https://developer.mozilla.org/fr/docs/Web/HTML/Element/Button
        // be careful the way you declare your attribute names : https://developer.mozilla.org/fr/docs/Web/HTML/Element/Button
        var _props4 = this.props,
            className = _props4.className,
            disabled = _props4.disabled,
            formNoValidate = _props4.formNoValidate,
            handleOnClick = _props4.handleOnClick,
            icon = _props4.icon,
            onClick = _props4.onClick,
            type = _props4.type,
            label = _props4.label,
            style = _props4.style,
            hasRipple = _props4.hasRipple,
            isJs = _props4.isJs,
            iconLibrary = _props4.iconLibrary,
            noAltAndNoTitle = _props4.noAltAndNoTitle,
            isLoading = _props4.isLoading,
            rest = _objectWithoutProperties(_props4, ['className', 'disabled', 'formNoValidate', 'handleOnClick', 'icon', 'onClick', 'type', 'label', 'style', 'hasRipple', 'isJs', 'iconLibrary', 'noAltAndNoTitle', 'isLoading']);

        var onClickFunc = handleOnClick ? handleOnClick : onClick;
        var otherInputProps = (0, _filterHtmlAttributes2.default)(_extends({ disabled: disabled, formNoValidate: formNoValidate, style: style, type: type }, rest)); //on click for legacy. Remove handleOnClick in v2
        // shape is not a valid attribute for button
        delete otherInputProps.shape;
        //alt={this.i18n(label)} TODO verify usefulness

        if (onClickFunc) {
            otherInputProps.onClick = function (event) {
                return _this2._wrappedOnClick(event, onClickFunc);
            };
        }
        if (!noAltAndNoTitle) {
            otherInputProps.title = this.i18n(label);
        }

        var renderedClassName = ((className ? className : '') + ' ' + this._getComponentClassName()).trim();

        return _react2.default.createElement(
            'button',
            _extends({ className: renderedClassName, 'data-focus': 'button-action', 'data-saving': isLoading, disabled: isLoading }, otherInputProps, { ref: 'materialButton' }),
            icon && this._renderIcon(),
            this._renderLabel(),
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJCVE5fSlMiLCJCVE5fQ0xBU1MiLCJCVVRUT05fUFJGWCIsIlJJUFBMRV9FRkZFQ1QiLCJwcm9wVHlwZXMiLCJjb2xvciIsIm9uZU9mIiwidW5kZWZpbmVkIiwiaGFuZGxlT25DbGljayIsImZ1bmMiLCJoYXNSaXBwbGUiLCJib29sIiwiaWQiLCJzdHJpbmciLCJpY29uIiwiaWNvbkxpYnJhcnkiLCJpc0pzIiwiaXNMb2FkaW5nIiwibGFiZWwiLCJvbkNsaWNrIiwic2hhcGUiLCJ0eXBlIiwiZGVmYXVsdFByb3BzIiwiQnV0dG9uIiwiY29tcG9uZW50RGlkTW91bnQiLCJwcm9wcyIsInJlZk5vZGUiLCJmaW5kRE9NTm9kZSIsInJlZnMiLCJtYXRlcmlhbEJ1dHRvbiIsImNvbXBvbmVudEhhbmRsZXIiLCJ1cGdyYWRlRWxlbWVudCIsImNvbXBvbmVudERpZFVwZGF0ZSIsInNwaW5uZXJOb2RlIiwiX2dldENvbXBvbmVudENsYXNzTmFtZSIsIlNIQVBFX0NMQVNTIiwiQ09MT1JfQ0xBU1MiLCJKU19DTEFTUyIsIlJJUFBMRV9FRkZFQ1RfQ0xBU1MiLCJyZW5kZXJQcmVzc2VkQnV0dG9uIiwiX3JlbmRlckljb24iLCJjbGFzc05hbWVJY29uIiwibGFiZWxJY29uIiwiYXJpYUhpZGRlbiIsIl9yZW5kZXJMYWJlbCIsInByb2Nlc3NMYWJlbCIsImkxOG4iLCJfd3JhcHBlZE9uQ2xpY2siLCJldmVudCIsInByZXZlbnREZWZhdWx0Iiwic3RvcFByb3BhZ2F0aW9uIiwicmVuZGVyIiwiY2xhc3NOYW1lIiwiZGlzYWJsZWQiLCJmb3JtTm9WYWxpZGF0ZSIsInN0eWxlIiwibm9BbHRBbmROb1RpdGxlIiwicmVzdCIsIm9uQ2xpY2tGdW5jIiwib3RoZXJJbnB1dFByb3BzIiwidGl0bGUiLCJyZW5kZXJlZENsYXNzTmFtZSIsInRyaW0iLCJkaXNwbGF5TmFtZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7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SzBCLFdBQUwsRUFEYjtBQUVLLGlCQUFLSSxZQUFMLEVBRkw7QUFHSzNCLHlCQUFhLHVDQUFLLFdBQVUsZ0VBQWYsRUFBZ0YsY0FBVyw4QkFBM0YsRUFBMEgsS0FBSSw4QkFBOUg7QUFIbEIsU0FESjtBQU9ILEs7Ozs7OztBQUdMTSxPQUFPd0MsV0FBUCxHQUFxQixRQUFyQjtBQUNBeEMsT0FBT0QsWUFBUCxHQUFzQkEsWUFBdEI7QUFDQUMsT0FBT25CLFNBQVAsR0FBbUJBLFNBQW5COztrQkFFZW1CLE0iLCJmaWxlIjoiaXMtcmVhY3QtY2xhc3MtY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCwgUHJvcFR5cGVzIH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgUmVhY3RET00gZnJvbSAncmVhY3QtZG9tJztcclxuaW1wb3J0IE1EQmVoYXZpb3VyIGZyb20gJy4uLy4uL2JlaGF2aW91cnMvbWF0ZXJpYWwnO1xyXG5pbXBvcnQgVHJhbnNsYXRpb24gZnJvbSAnLi4vLi4vYmVoYXZpb3Vycy90cmFuc2xhdGlvbic7XHJcbmltcG9ydCBmaWx0ZXJQcm9wcyBmcm9tICcuLi8uLi91dGlscy9maWx0ZXItaHRtbC1hdHRyaWJ1dGVzJztcclxuXHJcbmNvbnN0IEJUTl9KUyA9ICdtZGwtanMtYnV0dG9uJztcclxuY29uc3QgQlROX0NMQVNTID0gJ21kbC1idXR0b24nO1xyXG5jb25zdCBCVVRUT05fUFJGWCA9ICdtZGwtYnV0dG9uLS0nO1xyXG5jb25zdCBSSVBQTEVfRUZGRUNUID0gJ21kbC1qcy1yaXBwbGUtZWZmZWN0JztcclxuXHJcbmNvbnN0IHByb3BUeXBlcyA9IHtcclxuICAgIGNvbG9yOiBQcm9wVHlwZXMub25lT2YoW3VuZGVmaW5lZCwgJ2NvbG9yZWQnLCAncHJpbWFyeScsICdhY2NlbnQnXSksXHJcbiAgICBoYW5kbGVPbkNsaWNrOiBQcm9wVHlwZXMuZnVuYywgLy90byByZW1vdmUgaW4gVjJcclxuICAgIGhhc1JpcHBsZTogUHJvcFR5cGVzLmJvb2wsXHJcbiAgICBpZDogUHJvcFR5cGVzLnN0cmluZyxcclxuICAgIGljb246IFByb3BUeXBlcy5zdHJpbmcsXHJcbiAgICBpY29uTGlicmFyeTogUHJvcFR5cGVzLm9uZU9mKFsnbWF0ZXJpYWwnLCAnZm9udC1hd2Vzb21lJywgJ2ZvbnQtY3VzdG9tJ10pLFxyXG4gICAgaXNKczogUHJvcFR5cGVzLmJvb2wsXHJcbiAgICBpc0xvYWRpbmc6IFByb3BUeXBlcy5ib29sLFxyXG4gICAgbGFiZWw6IFByb3BUeXBlcy5zdHJpbmcsXHJcbiAgICBvbkNsaWNrOiBQcm9wVHlwZXMuZnVuYyxcclxuICAgIHNoYXBlOiBQcm9wVHlwZXMub25lT2YoW3VuZGVmaW5lZCwgJ3JhaXNlZCcsICdmYWInLCAnaWNvbicsICdtaW5pLWZhYiddKSxcclxuICAgIHR5cGU6IFByb3BUeXBlcy5vbmVPZihbJ3N1Ym1pdCcsICdidXR0b24nXSlcclxufVxyXG5cclxuY29uc3QgZGVmYXVsdFByb3BzID0ge1xyXG4gICAgaGFzUmlwcGxlOiBmYWxzZSxcclxuICAgIGljb246IG51bGwsXHJcbiAgICBpY29uTGlicmFyeTogJ21hdGVyaWFsJyxcclxuICAgIGlkOiB1bmRlZmluZWQsXHJcbiAgICBpc0pzOiBmYWxzZSxcclxuICAgIGxhYmVsOiAnJyxcclxuICAgIHNoYXBlOiAncmFpc2VkJyxcclxuICAgIHR5cGU6ICdzdWJtaXQnXHJcblxyXG59XHJcblxyXG5ATURCZWhhdmlvdXIoJ21hdGVyaWFsQnV0dG9uJywgJ01hdGVyaWFsQnV0dG9uJylcclxuQFRyYW5zbGF0aW9uXHJcbmNsYXNzIEJ1dHRvbiBleHRlbmRzIENvbXBvbmVudCB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAqIENhbGxlZCB3aGVuIGNvbXBvbmVudCBpcyBtb3VudGVkLlxyXG4gICAgKi9cclxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xyXG4gICAgICAgIGNvbnN0IHsgaGFzUmlwcGxlIH0gPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIGNvbnN0IHJlZk5vZGUgPSBSZWFjdERPTS5maW5kRE9NTm9kZSh0aGlzLnJlZnMubWF0ZXJpYWxCdXR0b24pO1xyXG4gICAgICAgIGlmIChoYXNSaXBwbGUpIHtcclxuICAgICAgICAgICAgY29tcG9uZW50SGFuZGxlci51cGdyYWRlRWxlbWVudChyZWZOb2RlLCAnTWF0ZXJpYWxSaXBwbGUnKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY29tcG9uZW50RGlkVXBkYXRlKCkge1xyXG4gICAgICAgIGNvbnN0IHNwaW5uZXJOb2RlID0gUmVhY3RET00uZmluZERPTU5vZGUodGhpcy5yZWZzWydkb3VibGUtYWN0aW9uLWJ1dHRvbi1zcGlubmVyJ10pO1xyXG4gICAgICAgIGlmIChzcGlubmVyTm9kZSkge1xyXG4gICAgICAgICAgICBjb21wb25lbnRIYW5kbGVyLnVwZ3JhZGVFbGVtZW50KHNwaW5uZXJOb2RlLCAnTWF0ZXJpYWxTcGlubmVyJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgKiBEYXRlIGRlIGNvbXBvc2FudC5cclxuICAgICogQHJldHVybiB7c3RyaW5nfSBDbGFzc2UuXHJcbiAgICAqL1xyXG4gICAgX2dldENvbXBvbmVudENsYXNzTmFtZSgpIHtcclxuICAgICAgICBjb25zdCB7IHNoYXBlLCBjb2xvciwgaGFzUmlwcGxlLCBpc0pzIH0gPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIGxldCBTSEFQRV9DTEFTUztcclxuICAgICAgICBzd2l0Y2ggKHNoYXBlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgJ3JhaXNlZCc6XHJcbiAgICAgICAgICAgICAgICBTSEFQRV9DTEFTUyA9IGAke0JVVFRPTl9QUkZYfXJhaXNlZGA7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnZmFiJzpcclxuICAgICAgICAgICAgICAgIFNIQVBFX0NMQVNTID0gYCR7QlVUVE9OX1BSRlh9ZmFiYDtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdpY29uJzpcclxuICAgICAgICAgICAgICAgIFNIQVBFX0NMQVNTID0gYCR7QlVUVE9OX1BSRlh9aWNvbmA7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnbWluaS1mYWInOlxyXG4gICAgICAgICAgICAgICAgU0hBUEVfQ0xBU1MgPSBgJHtCVVRUT05fUFJGWH1taW5pLWZhYiAke0JVVFRPTl9QUkZYfWZhYmA7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBudWxsOlxyXG4gICAgICAgICAgICAgICAgU0hBUEVfQ0xBU1MgPSAnJztcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgU0hBUEVfQ0xBU1MgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IENPTE9SX0NMQVNTID0gY29sb3IgPyBgJHtCVVRUT05fUFJGWH0ke2NvbG9yfWAgOiAnJztcclxuICAgICAgICBjb25zdCBKU19DTEFTUyA9IGlzSnMgPyBCVE5fSlMgOiAnJztcclxuICAgICAgICBjb25zdCBSSVBQTEVfRUZGRUNUX0NMQVNTID0gaGFzUmlwcGxlID8gUklQUExFX0VGRkVDVCA6ICcnO1xyXG4gICAgICAgIHJldHVybiBgJHtCVE5fQ0xBU1N9ICR7Q09MT1JfQ0xBU1N9ICR7U0hBUEVfQ0xBU1N9ICR7SlNfQ0xBU1N9ICR7UklQUExFX0VGRkVDVF9DTEFTU31gO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgKiBSZW5kZXIgdGhlIHByZXNzZWQgYnV0dG9uLlxyXG4gICAgKiBAcmV0dXJuIHtDb21wb25lbnR9IC0gQ29tcG9uZW50IGJ1dHRvbi5cclxuICAgICovXHJcbiAgICByZW5kZXJQcmVzc2VkQnV0dG9uKCkge1xyXG4gICAgICAgIHJldHVybiAoPGJ1dHRvbj5Mb2FkaW5nLi4uPC9idXR0b24+KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICogUmVuZGVyIGFuIGljb24uXHJcbiAgICAqIEByZXR1cm4ge0NvbXBvbmVudH0gLSBDb21wb3NhbnQgaWNvbmUuXHJcbiAgICAqL1xyXG4gICAgX3JlbmRlckljb24oKSB7XHJcbiAgICAgICAgY29uc3Qge2ljb24sIGljb25MaWJyYXJ5LCBjbGFzc05hbWVJY29uLCBsYWJlbEljb24sIGFyaWFIaWRkZW59ID0gdGhpcy5wcm9wcztcclxuICAgICAgICBzd2l0Y2ggKGljb25MaWJyYXJ5KSB7XHJcbiAgICAgICAgICAgIGNhc2UgJ21hdGVyaWFsJzpcclxuICAgICAgICAgICAgICAgIGlmIChjbGFzc05hbWVJY29uICYmIGxhYmVsSWNvbikge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFs8c3BhbiBjbGFzc05hbWU9e2NsYXNzTmFtZUljb259PntsYWJlbEljb259PC9zcGFuPiwgPGkgY2xhc3NOYW1lPSdtYXRlcmlhbC1pY29ucyc+e2ljb259PC9pPl1cclxuICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gPGkgY2xhc3NOYW1lPSdtYXRlcmlhbC1pY29ucycgYXJpYS1oaWRkZW49e2FyaWFIaWRkZW59PntpY29ufTwvaT47XHJcbiAgICAgICAgICAgIGNhc2UgJ2ZvbnQtYXdlc29tZSc6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gPGkgY2xhc3NOYW1lPXtgZmEgZmEtJHtpY29ufWB9IC8+O1xyXG4gICAgICAgICAgICBjYXNlICdmb250LWN1c3RvbSc6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gPHNwYW4gY2xhc3NOYW1lPXtgaWNvbi0ke2ljb259YH0gLz47XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAqIFJlbmRlciB0aGUgbGFiZWwuXHJcbiAgICAqIEByZXR1cm4ge0NvbXBvbmVudH0gLSBUbGUgYnV0dG9uIGxhYmVsLlxyXG4gICAgKi9cclxuICAgIF9yZW5kZXJMYWJlbCgpIHtcclxuICAgICAgICBjb25zdCB7IGlzTG9hZGluZywgbGFiZWwsIHByb2Nlc3NMYWJlbCwgc2hhcGUgfSA9IHRoaXMucHJvcHM7XHJcblxyXG4gICAgICAgIGlmIChsYWJlbCAmJiAnZmFiJyAhPT0gc2hhcGUgJiYgJ2ljb24nICE9PSBzaGFwZSAmJiAnbWluaS1mYWInICE9PSBzaGFwZSAmJiAoIWlzTG9hZGluZyB8fCAhcHJvY2Vzc0xhYmVsKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gPHNwYW4gZGF0YS1mb2N1cz0nYnV0dG9uLWxhYmVsJz57dGhpcy5pMThuKGxhYmVsKX08L3NwYW4+O1xyXG4gICAgICAgIH0gZWxzZSBpZiAocHJvY2Vzc0xhYmVsICYmICdmYWInICE9PSBzaGFwZSAmJiAnaWNvbicgIT09IHNoYXBlICYmICdtaW5pLWZhYicgIT09IHNoYXBlICYmIGlzTG9hZGluZykge1xyXG4gICAgICAgICAgICByZXR1cm4gPHNwYW4gZGF0YS1mb2N1cz0nYnV0dG9uLWxhYmVsJz57dGhpcy5pMThuKHByb2Nlc3NMYWJlbCl9PC9zcGFuPlxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFdyYXBwZXIgYXJvdW5kIG9uIGNsaWNrLCB0byBwcmV2ZW50IGNsaWNrIGFjdGlvbiBpcyBzcGlubmVyIGlzIHNob3dlZC5cclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHthbnl9IGV2ZW50IHRoZSBodG1sIGV2ZW50XHJcbiAgICAgKiBAcGFyYW0ge2FueX0gb25DbGljayB0aGUgb25jbGljayBmdW5jdGlvbiB0byBjYWxsXHJcbiAgICAgKiBcclxuICAgICAqIEBtZW1iZXJPZiBCdXR0b25cclxuICAgICAqL1xyXG4gICAgX3dyYXBwZWRPbkNsaWNrKGV2ZW50LCBvbkNsaWNrKSB7XHJcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuaXNMb2FkaW5nKSB7XHJcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIG9uQ2xpY2soZXZlbnQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKiogaW5oZXJpdGVkRG9jICovXHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgLy8gYXR0cmlidXRlIGRvYyA6IGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2ZyL2RvY3MvV2ViL0hUTUwvRWxlbWVudC9CdXR0b25cclxuICAgICAgICAvLyBiZSBjYXJlZnVsIHRoZSB3YXkgeW91IGRlY2xhcmUgeW91ciBhdHRyaWJ1dGUgbmFtZXMgOiBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9mci9kb2NzL1dlYi9IVE1ML0VsZW1lbnQvQnV0dG9uXHJcbiAgICAgICAgY29uc3Qge2NsYXNzTmFtZSwgZGlzYWJsZWQsIGZvcm1Ob1ZhbGlkYXRlLCBoYW5kbGVPbkNsaWNrLCBpY29uLCBvbkNsaWNrLCB0eXBlLCBsYWJlbCwgc3R5bGUsIGhhc1JpcHBsZSwgaXNKcywgaWNvbkxpYnJhcnksIG5vQWx0QW5kTm9UaXRsZSwgaXNMb2FkaW5nLCAuLi5yZXN0fSA9IHRoaXMucHJvcHM7XHJcbiAgICAgICAgY29uc3Qgb25DbGlja0Z1bmMgPSBoYW5kbGVPbkNsaWNrID8gaGFuZGxlT25DbGljayA6IG9uQ2xpY2s7XHJcbiAgICAgICAgY29uc3Qgb3RoZXJJbnB1dFByb3BzID0gZmlsdGVyUHJvcHMoeyBkaXNhYmxlZCwgZm9ybU5vVmFsaWRhdGUsIHN0eWxlLCB0eXBlLCAuLi5yZXN0IH0pOyAvL29uIGNsaWNrIGZvciBsZWdhY3kuIFJlbW92ZSBoYW5kbGVPbkNsaWNrIGluIHYyXHJcbiAgICAgICAgLy8gc2hhcGUgaXMgbm90IGEgdmFsaWQgYXR0cmlidXRlIGZvciBidXR0b25cclxuICAgICAgICBkZWxldGUgb3RoZXJJbnB1dFByb3BzLnNoYXBlO1xyXG4gICAgICAgIC8vYWx0PXt0aGlzLmkxOG4obGFiZWwpfSBUT0RPIHZlcmlmeSB1c2VmdWxuZXNzXHJcblxyXG4gICAgICAgIGlmIChvbkNsaWNrRnVuYykge1xyXG4gICAgICAgICAgICBvdGhlcklucHV0UHJvcHMub25DbGljayA9IGV2ZW50ID0+IHRoaXMuX3dyYXBwZWRPbkNsaWNrKGV2ZW50LCBvbkNsaWNrRnVuYyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghbm9BbHRBbmROb1RpdGxlKSB7XHJcbiAgICAgICAgICAgIG90aGVySW5wdXRQcm9wcy50aXRsZSA9IHRoaXMuaTE4bihsYWJlbCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCByZW5kZXJlZENsYXNzTmFtZSA9IGAke2NsYXNzTmFtZSA/IGNsYXNzTmFtZSA6ICcnfSAke3RoaXMuX2dldENvbXBvbmVudENsYXNzTmFtZSgpfWAudHJpbSgpO1xyXG5cclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT17cmVuZGVyZWRDbGFzc05hbWV9IGRhdGEtZm9jdXM9J2J1dHRvbi1hY3Rpb24nIGRhdGEtc2F2aW5nPXtpc0xvYWRpbmd9IGRpc2FibGVkPXtpc0xvYWRpbmd9IHsuLi5vdGhlcklucHV0UHJvcHN9IHJlZj0nbWF0ZXJpYWxCdXR0b24nPlxyXG4gICAgICAgICAgICAgICAge2ljb24gJiYgdGhpcy5fcmVuZGVySWNvbigpfVxyXG4gICAgICAgICAgICAgICAge3RoaXMuX3JlbmRlckxhYmVsKCl9XHJcbiAgICAgICAgICAgICAgICB7aXNMb2FkaW5nICYmIDxkaXYgY2xhc3NOYW1lPSdtZGwtc3Bpbm5lciBtZGwtc3Bpbm5lci0tc2luZ2xlLWNvbG9yIG1kbC1qcy1zcGlubmVyIGlzLWFjdGl2ZScgZGF0YS1mb2N1cz0nZG91YmxlLWFjdGlvbi1idXR0b24tc3Bpbm5lcicgcmVmPSdkb3VibGUtYWN0aW9uLWJ1dHRvbi1zcGlubmVyJyAvPn1cclxuICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufVxyXG5cclxuQnV0dG9uLmRpc3BsYXlOYW1lID0gJ0J1dHRvbidcclxuQnV0dG9uLmRlZmF1bHRQcm9wcyA9IGRlZmF1bHRQcm9wcztcclxuQnV0dG9uLnByb3BUeXBlcyA9IHByb3BUeXBlcztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEJ1dHRvbjsgICAgICAgICAgICAgICAgICAgIl19