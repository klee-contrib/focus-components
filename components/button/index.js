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
            _onClick = _props4.onClick,
            type = _props4.type,
            label = _props4.label,
            style = _props4.style,
            hasRipple = _props4.hasRipple,
            isJs = _props4.isJs,
            iconLibrary = _props4.iconLibrary,
            noAltAndNoTitle = _props4.noAltAndNoTitle,
            isLoading = _props4.isLoading,
            rest = _objectWithoutProperties(_props4, ['className', 'disabled', 'formNoValidate', 'handleOnClick', 'icon', 'id', 'onClick', 'type', 'label', 'style', 'hasRipple', 'isJs', 'iconLibrary', 'noAltAndNoTitle', 'isLoading']);

        var otherInputProps = (0, _filterHtmlAttributes2.default)(_extends({ disabled: disabled, formNoValidate: formNoValidate, onClick: function onClick(event) {
                return _this2._wrappedOnClick(event, handleOnClick ? handleOnClick : _onClick);
            }, style: style, type: type }, rest)); //on click for legacy. Remove handleOnClick in v2
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJCVE5fSlMiLCJCVE5fQ0xBU1MiLCJCVVRUT05fUFJGWCIsIlJJUFBMRV9FRkZFQ1QiLCJwcm9wVHlwZXMiLCJjb2xvciIsIm9uZU9mIiwidW5kZWZpbmVkIiwiaGFuZGxlT25DbGljayIsImZ1bmMiLCJoYXNSaXBwbGUiLCJib29sIiwiaWQiLCJzdHJpbmciLCJpY29uIiwiaWNvbkxpYnJhcnkiLCJpc0pzIiwiaXNMb2FkaW5nIiwibGFiZWwiLCJvbkNsaWNrIiwic2hhcGUiLCJ0eXBlIiwiZGVmYXVsdFByb3BzIiwiQnV0dG9uIiwiY29tcG9uZW50RGlkTW91bnQiLCJwcm9wcyIsInJlZk5vZGUiLCJmaW5kRE9NTm9kZSIsInJlZnMiLCJtYXRlcmlhbEJ1dHRvbiIsImNvbXBvbmVudEhhbmRsZXIiLCJ1cGdyYWRlRWxlbWVudCIsImNvbXBvbmVudERpZFVwZGF0ZSIsInNwaW5uZXJOb2RlIiwiX2dldENvbXBvbmVudENsYXNzTmFtZSIsIlNIQVBFX0NMQVNTIiwiQ09MT1JfQ0xBU1MiLCJKU19DTEFTUyIsIlJJUFBMRV9FRkZFQ1RfQ0xBU1MiLCJyZW5kZXJQcmVzc2VkQnV0dG9uIiwiX3JlbmRlckljb24iLCJjbGFzc05hbWVJY29uIiwibGFiZWxJY29uIiwiYXJpYUhpZGRlbiIsIl9yZW5kZXJMYWJlbCIsInByb2Nlc3NMYWJlbCIsImkxOG4iLCJfd3JhcHBlZE9uQ2xpY2siLCJldmVudCIsInByZXZlbnREZWZhdWx0Iiwic3RvcFByb3BhZ2F0aW9uIiwicmVuZGVyIiwiY2xhc3NOYW1lIiwiZGlzYWJsZWQiLCJmb3JtTm9WYWxpZGF0ZSIsInN0eWxlIiwibm9BbHRBbmROb1RpdGxlIiwicmVzdCIsIm90aGVySW5wdXRQcm9wcyIsInJlbmRlcmVkQ2xhc3NOYW1lIiwidHJpbSIsImRpc3BsYXlOYW1lIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNB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RSxJQUFMLENBQVU1QixLQUFWLENBQWIsRUFBK0IsV0FBV3lDLGlCQUExQyxFQUE2RCxjQUFXLGVBQXhFLEVBQXdGLElBQUkvQyxFQUE1RixFQUFnRyxPQUFPLEtBQUtrQyxJQUFMLENBQVU1QixLQUFWLENBQXZHLEVBQXlILGVBQWFELFNBQXRJLHFDQUFxSkwsRUFBckosMENBQW1LSyxTQUFuSyxlQUFrTHlDLGVBQWxMLElBQW1NLEtBQUksZ0JBQXZNO0FBQ0s1QyxvQkFBVSxLQUFLMEIsV0FBUCxNQUFFLElBQUYsQ0FEYjtBQUVPLGlCQUFLSSxZQUFQLE1BQUUsSUFBRixDQUZMO0FBR0szQix5QkFBYSx1Q0FBSyxXQUFVLGdFQUFmLEVBQWdGLGNBQVcsOEJBQTNGLEVBQTBILEtBQUksOEJBQTlIO0FBSGxCLFNBREo7QUFPSCxLOzs7Ozs7QUFHTE0sT0FBT3NDLFdBQVAsR0FBcUIsUUFBckI7QUFDQXRDLE9BQU9ELFlBQVAsR0FBc0JBLFlBQXRCO0FBQ0FDLE9BQU9uQixTQUFQLEdBQW1CQSxTQUFuQjs7a0JBRWVtQixNIiwiZmlsZSI6ImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQsIFByb3BUeXBlcyB9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IFJlYWN0RE9NIGZyb20gJ3JlYWN0LWRvbSc7XHJcbmltcG9ydCBNREJlaGF2aW91ciBmcm9tICcuLi8uLi9iZWhhdmlvdXJzL21hdGVyaWFsJztcclxuaW1wb3J0IFRyYW5zbGF0aW9uIGZyb20gJy4uLy4uL2JlaGF2aW91cnMvdHJhbnNsYXRpb24nO1xyXG5pbXBvcnQgZmlsdGVyUHJvcHMgZnJvbSAnLi4vLi4vdXRpbHMvZmlsdGVyLWh0bWwtYXR0cmlidXRlcyc7XHJcblxyXG5jb25zdCBCVE5fSlMgPSAnbWRsLWpzLWJ1dHRvbic7XHJcbmNvbnN0IEJUTl9DTEFTUyA9ICdtZGwtYnV0dG9uJztcclxuY29uc3QgQlVUVE9OX1BSRlggPSAnbWRsLWJ1dHRvbi0tJztcclxuY29uc3QgUklQUExFX0VGRkVDVCA9ICdtZGwtanMtcmlwcGxlLWVmZmVjdCc7XHJcblxyXG5jb25zdCBwcm9wVHlwZXMgPSB7XHJcbiAgICBjb2xvcjogUHJvcFR5cGVzLm9uZU9mKFt1bmRlZmluZWQsICdjb2xvcmVkJywgJ3ByaW1hcnknLCAnYWNjZW50J10pLFxyXG4gICAgaGFuZGxlT25DbGljazogUHJvcFR5cGVzLmZ1bmMsIC8vdG8gcmVtb3ZlIGluIFYyXHJcbiAgICBoYXNSaXBwbGU6IFByb3BUeXBlcy5ib29sLFxyXG4gICAgaWQ6IFByb3BUeXBlcy5zdHJpbmcsXHJcbiAgICBpY29uOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG4gICAgaWNvbkxpYnJhcnk6IFByb3BUeXBlcy5vbmVPZihbJ21hdGVyaWFsJywgJ2ZvbnQtYXdlc29tZScsICdmb250LWN1c3RvbSddKSxcclxuICAgIGlzSnM6IFByb3BUeXBlcy5ib29sLFxyXG4gICAgaXNMb2FkaW5nOiBQcm9wVHlwZXMuYm9vbCxcclxuICAgIGxhYmVsOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG4gICAgb25DbGljazogUHJvcFR5cGVzLmZ1bmMsXHJcbiAgICBzaGFwZTogUHJvcFR5cGVzLm9uZU9mKFt1bmRlZmluZWQsICdyYWlzZWQnLCAnZmFiJywgJ2ljb24nLCAnbWluaS1mYWInXSksXHJcbiAgICB0eXBlOiBQcm9wVHlwZXMub25lT2YoWydzdWJtaXQnLCAnYnV0dG9uJ10pXHJcbn1cclxuXHJcbmNvbnN0IGRlZmF1bHRQcm9wcyA9IHtcclxuICAgIGhhc1JpcHBsZTogZmFsc2UsXHJcbiAgICBpY29uOiBudWxsLFxyXG4gICAgaWNvbkxpYnJhcnk6ICdtYXRlcmlhbCcsXHJcbiAgICBpZDogJycsXHJcbiAgICBpc0pzOiBmYWxzZSxcclxuICAgIGxhYmVsOiAnJyxcclxuICAgIHNoYXBlOiAncmFpc2VkJyxcclxuICAgIHR5cGU6ICdzdWJtaXQnXHJcbn1cclxuXHJcbkBNREJlaGF2aW91cignbWF0ZXJpYWxCdXR0b24nLCAnTWF0ZXJpYWxCdXR0b24nKVxyXG5AVHJhbnNsYXRpb25cclxuY2xhc3MgQnV0dG9uIGV4dGVuZHMgQ29tcG9uZW50IHtcclxuXHJcbiAgICAvKipcclxuICAgICogQ2FsbGVkIHdoZW4gY29tcG9uZW50IGlzIG1vdW50ZWQuXHJcbiAgICAqL1xyXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XHJcbiAgICAgICAgY29uc3QgeyBoYXNSaXBwbGUgfSA9IHRoaXMucHJvcHM7XHJcbiAgICAgICAgY29uc3QgcmVmTm9kZSA9IFJlYWN0RE9NLmZpbmRET01Ob2RlKHRoaXMucmVmcy5tYXRlcmlhbEJ1dHRvbik7XHJcbiAgICAgICAgaWYgKGhhc1JpcHBsZSkge1xyXG4gICAgICAgICAgICBjb21wb25lbnRIYW5kbGVyLnVwZ3JhZGVFbGVtZW50KHJlZk5vZGUsICdNYXRlcmlhbFJpcHBsZScpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjb21wb25lbnREaWRVcGRhdGUoKSB7XHJcbiAgICAgICAgY29uc3Qgc3Bpbm5lck5vZGUgPSBSZWFjdERPTS5maW5kRE9NTm9kZSh0aGlzLnJlZnNbJ2RvdWJsZS1hY3Rpb24tYnV0dG9uLXNwaW5uZXInXSk7XHJcbiAgICAgICAgaWYgKHNwaW5uZXJOb2RlKSB7XHJcbiAgICAgICAgICAgIGNvbXBvbmVudEhhbmRsZXIudXBncmFkZUVsZW1lbnQoc3Bpbm5lck5vZGUsICdNYXRlcmlhbFNwaW5uZXInKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAqIERhdGUgZGUgY29tcG9zYW50LlxyXG4gICAgKiBAcmV0dXJuIHtzdHJpbmd9IENsYXNzZS5cclxuICAgICovXHJcbiAgICBfZ2V0Q29tcG9uZW50Q2xhc3NOYW1lKCkge1xyXG4gICAgICAgIGNvbnN0IHsgc2hhcGUsIGNvbG9yLCBoYXNSaXBwbGUsIGlzSnMgfSA9IHRoaXMucHJvcHM7XHJcbiAgICAgICAgbGV0IFNIQVBFX0NMQVNTO1xyXG4gICAgICAgIHN3aXRjaCAoc2hhcGUpIHtcclxuICAgICAgICAgICAgY2FzZSAncmFpc2VkJzpcclxuICAgICAgICAgICAgICAgIFNIQVBFX0NMQVNTID0gYCR7QlVUVE9OX1BSRlh9cmFpc2VkYDtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdmYWInOlxyXG4gICAgICAgICAgICAgICAgU0hBUEVfQ0xBU1MgPSBgJHtCVVRUT05fUFJGWH1mYWJgO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ2ljb24nOlxyXG4gICAgICAgICAgICAgICAgU0hBUEVfQ0xBU1MgPSBgJHtCVVRUT05fUFJGWH1pY29uYDtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdtaW5pLWZhYic6XHJcbiAgICAgICAgICAgICAgICBTSEFQRV9DTEFTUyA9IGAke0JVVFRPTl9QUkZYfW1pbmktZmFiICR7QlVUVE9OX1BSRlh9ZmFiYDtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIG51bGw6XHJcbiAgICAgICAgICAgICAgICBTSEFQRV9DTEFTUyA9ICcnO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICBTSEFQRV9DTEFTUyA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgQ09MT1JfQ0xBU1MgPSBjb2xvciA/IGAke0JVVFRPTl9QUkZYfSR7Y29sb3J9YCA6ICcnO1xyXG4gICAgICAgIGNvbnN0IEpTX0NMQVNTID0gaXNKcyA/IEJUTl9KUyA6ICcnO1xyXG4gICAgICAgIGNvbnN0IFJJUFBMRV9FRkZFQ1RfQ0xBU1MgPSBoYXNSaXBwbGUgPyBSSVBQTEVfRUZGRUNUIDogJyc7XHJcbiAgICAgICAgcmV0dXJuIGAke0JUTl9DTEFTU30gJHtDT0xPUl9DTEFTU30gJHtTSEFQRV9DTEFTU30gJHtKU19DTEFTU30gJHtSSVBQTEVfRUZGRUNUX0NMQVNTfWA7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAqIFJlbmRlciB0aGUgcHJlc3NlZCBidXR0b24uXHJcbiAgICAqIEByZXR1cm4ge0NvbXBvbmVudH0gLSBDb21wb25lbnQgYnV0dG9uLlxyXG4gICAgKi9cclxuICAgIHJlbmRlclByZXNzZWRCdXR0b24oKSB7XHJcbiAgICAgICAgcmV0dXJuICg8YnV0dG9uPkxvYWRpbmcuLi48L2J1dHRvbj4pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgKiBSZW5kZXIgYW4gaWNvbi5cclxuICAgICogQHJldHVybiB7Q29tcG9uZW50fSAtIENvbXBvc2FudCBpY29uZS5cclxuICAgICovXHJcbiAgICBfcmVuZGVySWNvbigpIHtcclxuICAgICAgICBjb25zdCB7aWNvbiwgaWNvbkxpYnJhcnksIGNsYXNzTmFtZUljb24sIGxhYmVsSWNvbiwgYXJpYUhpZGRlbn0gPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIHN3aXRjaCAoaWNvbkxpYnJhcnkpIHtcclxuICAgICAgICAgICAgY2FzZSAnbWF0ZXJpYWwnOlxyXG4gICAgICAgICAgICAgICAgaWYgKGNsYXNzTmFtZUljb24gJiYgbGFiZWxJY29uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT17Y2xhc3NOYW1lSWNvbn0+e2xhYmVsSWNvbn08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aSBjbGFzc05hbWU9J21hdGVyaWFsLWljb25zJz57aWNvbn08L2k+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiA8aSBjbGFzc05hbWU9J21hdGVyaWFsLWljb25zJyBhcmlhLWhpZGRlbj17YXJpYUhpZGRlbn0+e2ljb259PC9pPjtcclxuICAgICAgICAgICAgY2FzZSAnZm9udC1hd2Vzb21lJzpcclxuICAgICAgICAgICAgICAgIHJldHVybiA8aSBjbGFzc05hbWU9e2BmYSBmYS0ke2ljb259YH0gLz47XHJcbiAgICAgICAgICAgIGNhc2UgJ2ZvbnQtY3VzdG9tJzpcclxuICAgICAgICAgICAgICAgIHJldHVybiA8c3BhbiBjbGFzc05hbWU9e2BpY29uLSR7aWNvbn1gfSAvPjtcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICogUmVuZGVyIHRoZSBsYWJlbC5cclxuICAgICogQHJldHVybiB7Q29tcG9uZW50fSAtIFRsZSBidXR0b24gbGFiZWwuXHJcbiAgICAqL1xyXG4gICAgX3JlbmRlckxhYmVsKCkge1xyXG4gICAgICAgIGNvbnN0IHsgaXNMb2FkaW5nLCBsYWJlbCwgcHJvY2Vzc0xhYmVsLCBzaGFwZSB9ID0gdGhpcy5wcm9wcztcclxuXHJcbiAgICAgICAgaWYgKGxhYmVsICYmICdmYWInICE9PSBzaGFwZSAmJiAnaWNvbicgIT09IHNoYXBlICYmICdtaW5pLWZhYicgIT09IHNoYXBlICYmICghaXNMb2FkaW5nIHx8ICFwcm9jZXNzTGFiZWwpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiA8c3BhbiBkYXRhLWZvY3VzPSdidXR0b24tbGFiZWwnPnt0aGlzLmkxOG4obGFiZWwpfTwvc3Bhbj47XHJcbiAgICAgICAgfSBlbHNlIGlmIChwcm9jZXNzTGFiZWwgJiYgJ2ZhYicgIT09IHNoYXBlICYmICdpY29uJyAhPT0gc2hhcGUgJiYgJ21pbmktZmFiJyAhPT0gc2hhcGUgJiYgaXNMb2FkaW5nKSB7XHJcbiAgICAgICAgICAgIHJldHVybiA8c3BhbiBkYXRhLWZvY3VzPSdidXR0b24tbGFiZWwnPnt0aGlzLmkxOG4ocHJvY2Vzc0xhYmVsKX08L3NwYW4+XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogV3JhcHBlciBhcm91bmQgb24gY2xpY2ssIHRvIHByZXZlbnQgY2xpY2sgYWN0aW9uIGlzIHNwaW5uZXIgaXMgc2hvd2VkLlxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0ge2FueX0gZXZlbnQgdGhlIGh0bWwgZXZlbnRcclxuICAgICAqIEBwYXJhbSB7YW55fSBvbkNsaWNrIHRoZSBvbmNsaWNrIGZ1bmN0aW9uIHRvIGNhbGxcclxuICAgICAqIFxyXG4gICAgICogQG1lbWJlck9mIEJ1dHRvblxyXG4gICAgICovXHJcbiAgICBfd3JhcHBlZE9uQ2xpY2soZXZlbnQsIG9uQ2xpY2spIHtcclxuICAgICAgICBpZiAodGhpcy5wcm9wcy5pc0xvYWRpbmcpIHtcclxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgb25DbGljayhldmVudCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKiBpbmhlcml0ZWREb2MgKi9cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICAvLyBhdHRyaWJ1dGUgZG9jIDogaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZnIvZG9jcy9XZWIvSFRNTC9FbGVtZW50L0J1dHRvblxyXG4gICAgICAgIC8vIGJlIGNhcmVmdWwgdGhlIHdheSB5b3UgZGVjbGFyZSB5b3VyIGF0dHJpYnV0ZSBuYW1lcyA6IGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2ZyL2RvY3MvV2ViL0hUTUwvRWxlbWVudC9CdXR0b25cclxuICAgICAgICBjb25zdCB7Y2xhc3NOYW1lLCBkaXNhYmxlZCwgZm9ybU5vVmFsaWRhdGUsIGhhbmRsZU9uQ2xpY2ssIGljb24sIGlkLCBvbkNsaWNrLCB0eXBlLCBsYWJlbCwgc3R5bGUsIGhhc1JpcHBsZSwgaXNKcywgaWNvbkxpYnJhcnksIG5vQWx0QW5kTm9UaXRsZSwgaXNMb2FkaW5nLCAuLi5yZXN0fSA9IHRoaXMucHJvcHM7XHJcbiAgICAgICAgY29uc3Qgb3RoZXJJbnB1dFByb3BzID0gZmlsdGVyUHJvcHMoeyBkaXNhYmxlZCwgZm9ybU5vVmFsaWRhdGUsIG9uQ2xpY2s6IGV2ZW50ID0+IHRoaXMuX3dyYXBwZWRPbkNsaWNrKGV2ZW50LCBoYW5kbGVPbkNsaWNrID8gaGFuZGxlT25DbGljayA6IG9uQ2xpY2spLCBzdHlsZSwgdHlwZSwgLi4ucmVzdCB9KTsgLy9vbiBjbGljayBmb3IgbGVnYWN5LiBSZW1vdmUgaGFuZGxlT25DbGljayBpbiB2MlxyXG4gICAgICAgIGNvbnN0IHJlbmRlcmVkQ2xhc3NOYW1lID0gYCR7Y2xhc3NOYW1lID8gY2xhc3NOYW1lIDogJyd9ICR7Ojp0aGlzLl9nZXRDb21wb25lbnRDbGFzc05hbWUoKX1gLnRyaW0oKTtcclxuICAgICAgICBpZihub0FsdEFuZE5vVGl0bGUpe1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPXtyZW5kZXJlZENsYXNzTmFtZX0gZGF0YS1mb2N1cz0nYnV0dG9uLWFjdGlvbicgaWQ9e2lkfSBkYXRhLXNhdmluZz17aXNMb2FkaW5nfSBpZD17aWR9IGRpc2FibGVkPXtpc0xvYWRpbmd9IHsuLi5vdGhlcklucHV0UHJvcHN9IHJlZj0nbWF0ZXJpYWxCdXR0b24nPlxyXG4gICAgICAgICAgICAgICAge2ljb24gJiYgOjp0aGlzLl9yZW5kZXJJY29uKCl9XHJcbiAgICAgICAgICAgICAgICB7Ojp0aGlzLl9yZW5kZXJMYWJlbCgpfVxyXG4gICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGJ1dHRvbiBhbHQ9e3RoaXMuaTE4bihsYWJlbCl9IGNsYXNzTmFtZT17cmVuZGVyZWRDbGFzc05hbWV9IGRhdGEtZm9jdXM9J2J1dHRvbi1hY3Rpb24nIGlkPXtpZH0gdGl0bGU9e3RoaXMuaTE4bihsYWJlbCl9IGRhdGEtc2F2aW5nPXtpc0xvYWRpbmd9IGlkPXtpZH0gZGlzYWJsZWQ9e2lzTG9hZGluZ30gey4uLm90aGVySW5wdXRQcm9wc30gcmVmPSdtYXRlcmlhbEJ1dHRvbic+XHJcbiAgICAgICAgICAgICAgICB7aWNvbiAmJiA6OnRoaXMuX3JlbmRlckljb24oKX1cclxuICAgICAgICAgICAgICAgIHs6OnRoaXMuX3JlbmRlckxhYmVsKCl9XHJcbiAgICAgICAgICAgICAgICB7aXNMb2FkaW5nICYmIDxkaXYgY2xhc3NOYW1lPSdtZGwtc3Bpbm5lciBtZGwtc3Bpbm5lci0tc2luZ2xlLWNvbG9yIG1kbC1qcy1zcGlubmVyIGlzLWFjdGl2ZScgZGF0YS1mb2N1cz0nZG91YmxlLWFjdGlvbi1idXR0b24tc3Bpbm5lcicgcmVmPSdkb3VibGUtYWN0aW9uLWJ1dHRvbi1zcGlubmVyJyAvPn1cclxuICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufVxyXG5cclxuQnV0dG9uLmRpc3BsYXlOYW1lID0gJ0J1dHRvbidcclxuQnV0dG9uLmRlZmF1bHRQcm9wcyA9IGRlZmF1bHRQcm9wcztcclxuQnV0dG9uLnByb3BUeXBlcyA9IHByb3BUeXBlcztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEJ1dHRvbjsgICAgICAgICAgICAgICAgICAgIl19