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
            rest = _objectWithoutProperties(_props4, ['className', 'disabled', 'formNoValidate', 'handleOnClick', 'icon', 'id', 'onClick', 'type', 'label', 'style', 'hasRipple', 'isJs', 'iconLibrary']);

        var otherInputProps = _extends({ disabled: disabled, formNoValidate: formNoValidate, onClick: handleOnClick ? handleOnClick : onClick, style: style, type: type }, rest); //on click for legacy. Remove handleOnClick in v2
        var renderedClassName = ((className ? className : '') + ' ' + this._getComponentClassName.call(this)).trim();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJCVE5fSlMiLCJCVE5fQ0xBU1MiLCJCVVRUT05fUFJGWCIsIlJJUFBMRV9FRkZFQ1QiLCJwcm9wVHlwZXMiLCJjb2xvciIsIm9uZU9mIiwidW5kZWZpbmVkIiwiaWQiLCJzdHJpbmciLCJoYW5kbGVPbkNsaWNrIiwiZnVuYyIsImhhc1JpcHBsZSIsImJvb2wiLCJpc0pzIiwiaWNvbiIsImljb25MaWJyYXJ5IiwibGFiZWwiLCJvbkNsaWNrIiwic2hhcGUiLCJ0eXBlIiwiZGVmYXVsdFByb3BzIiwiQnV0dG9uIiwiY29tcG9uZW50RGlkTW91bnQiLCJwcm9wcyIsInJlZk5vZGUiLCJmaW5kRE9NTm9kZSIsInJlZnMiLCJjb21wb25lbnRIYW5kbGVyIiwidXBncmFkZUVsZW1lbnQiLCJfZ2V0Q29tcG9uZW50Q2xhc3NOYW1lIiwiU0hBUEVfQ0xBU1MiLCJDT0xPUl9DTEFTUyIsIkpTX0NMQVNTIiwiUklQUExFX0VGRkVDVF9DTEFTUyIsInJlbmRlclByZXNzZWRCdXR0b24iLCJfcmVuZGVySWNvbiIsImZhQ3NzIiwiX3JlbmRlckxhYmVsIiwiaTE4biIsInJlbmRlciIsImNsYXNzTmFtZSIsImRpc2FibGVkIiwiZm9ybU5vVmFsaWRhdGUiLCJzdHlsZSIsInJlc3QiLCJvdGhlcklucHV0UHJvcHMiLCJyZW5kZXJlZENsYXNzTmFtZSIsInRyaW0iLCJkaXNwbGF5TmFtZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQSxJQUFNQSxTQUFTLGVBQWY7QUFDQSxJQUFNQyxZQUFZLFlBQWxCO0FBQ0EsSUFBTUMsY0FBYyxjQUFwQjtBQUNBLElBQU1DLGdCQUFnQixzQkFBdEI7O0FBRUEsSUFBTUMsWUFBWTtBQUNkQyxXQUFPLGlCQUFVQyxLQUFWLENBQWdCLENBQUNDLFNBQUQsRUFBVyxTQUFYLEVB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SixrQkFBcEIsRUFBOEJDLDhCQUE5QixFQUE4Q3pCLFNBQVNSLGdCQUFnQkEsYUFBaEIsR0FBZ0NRLE9BQXZGLEVBQWdHMEIsWUFBaEcsRUFBdUd4QixVQUF2RyxJQUFnSHlCLElBQWhILENBQU4sQ0FKSyxDQUl5SDtBQUM5SCxZQUFNRSxvQkFBb0IsRUFBR04sWUFBWUEsU0FBWixHQUF3QixFQUEzQixVQUFtQyxLQUFLWCxzQkFBUCxNQUFFLElBQUYsQ0FBakMsRUFBbUVrQixJQUFuRSxFQUExQjtBQUNBLGVBQ0k7QUFBQTtBQUFBLHVCQUFRLEtBQUssS0FBS1QsSUFBTCxDQUFVdEIsS0FBVixDQUFiLEVBQStCLFdBQVc4QixpQkFBMUMsRUFBNkQsY0FBVyxlQUF4RSxFQUF3RixJQUFJdkMsRUFBNUYsRUFBZ0csT0FBTyxLQUFLK0IsSUFBTCxDQUFVdEIsS0FBVixDQUF2RyxJQUE2SDZCLGVBQTdILElBQThJLEtBQUksZ0JBQWxKO0FBQ0svQixvQkFBVSxLQUFLcUIsV0FBUCxNQUFFLElBQUYsQ0FEYjtBQUVPLGlCQUFLRSxZQUFQLE1BQUUsSUFBRjtBQUZMLFNBREo7QUFNSCxLOzs7Ozs7QUFHTGhCLE9BQU8yQixXQUFQLEdBQXFCLFFBQXJCO0FBQ0EzQixPQUFPRCxZQUFQLEdBQXNCQSxZQUF0QjtBQUNBQyxPQUFPbEIsU0FBUCxHQUFtQkEsU0FBbkI7O2tCQUVla0IsTSIsImZpbGUiOiJpcy1yZWFjdC1jbGFzcy1jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnQsIFByb3BUeXBlc30gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgUmVhY3RET00gZnJvbSAncmVhY3QtZG9tJztcclxuaW1wb3J0IE1EQmVoYXZpb3VyIGZyb20gJy4uLy4uL2JlaGF2aW91cnMvbWF0ZXJpYWwnO1xyXG5pbXBvcnQgVHJhbnNsYXRpb24gZnJvbSAnLi4vLi4vYmVoYXZpb3Vycy90cmFuc2xhdGlvbic7XHJcbmltcG9ydCBDb21wb25lbnRCYXNlQmVoYXZpb3VyIGZyb20gJy4uLy4uL2JlaGF2aW91cnMvY29tcG9uZW50LWJhc2UnO1xyXG5cclxuY29uc3QgQlROX0pTID0gJ21kbC1qcy1idXR0b24nO1xyXG5jb25zdCBCVE5fQ0xBU1MgPSAnbWRsLWJ1dHRvbic7XHJcbmNvbnN0IEJVVFRPTl9QUkZYID0gJ21kbC1idXR0b24tLSc7XHJcbmNvbnN0IFJJUFBMRV9FRkZFQ1QgPSAnbWRsLWpzLXJpcHBsZS1lZmZlY3QnO1xyXG5cclxuY29uc3QgcHJvcFR5cGVzID0ge1xyXG4gICAgY29sb3I6IFByb3BUeXBlcy5vbmVPZihbdW5kZWZpbmVkLCdjb2xvcmVkJywgJ3ByaW1hcnknLCAnYWNjZW50J10pLFxyXG4gICAgaWQ6IFByb3BUeXBlcy5zdHJpbmcsXHJcbiAgICBoYW5kbGVPbkNsaWNrOiBQcm9wVHlwZXMuZnVuYywgLy90byByZW1vdmUgaW4gVjJcclxuICAgIGhhc1JpcHBsZTogUHJvcFR5cGVzLmJvb2wsXHJcbiAgICBpc0pzOiBQcm9wVHlwZXMuYm9vbCxcclxuICAgIGljb246IFByb3BUeXBlcy5zdHJpbmcsXHJcbiAgICBpY29uTGlicmFyeTogUHJvcFR5cGVzLm9uZU9mKFsnbWF0ZXJpYWwnLCAnZm9udC1hd2Vzb21lJywgJ2ZvbnQtY3VzdG9tJ10pLFxyXG4gICAgbGFiZWw6IFByb3BUeXBlcy5zdHJpbmcsXHJcbiAgICBvbkNsaWNrOiBQcm9wVHlwZXMuZnVuYyxcclxuICAgIHNoYXBlOiBQcm9wVHlwZXMub25lT2YoW3VuZGVmaW5lZCwgJ3JhaXNlZCcsICdmYWInLCAnaWNvbicsICdtaW5pLWZhYiddKSxcclxuICAgIHR5cGU6IFByb3BUeXBlcy5vbmVPZihbJ3N1Ym1pdCcsICdidXR0b24nXSlcclxufVxyXG5cclxuY29uc3QgZGVmYXVsdFByb3BzID0ge1xyXG4gICAgdHlwZTogJ3N1Ym1pdCcsXHJcbiAgICBzaGFwZTogJ3JhaXNlZCcsXHJcbiAgICBsYWJlbDogJycsXHJcbiAgICBpY29uOiBudWxsLFxyXG4gICAgaWQ6ICcnLFxyXG4gICAgaGFzUmlwcGxlOiBmYWxzZSxcclxuICAgIGlzSnM6IGZhbHNlLFxyXG4gICAgaWNvbkxpYnJhcnk6ICdtYXRlcmlhbCdcclxufVxyXG5cclxuQE1EQmVoYXZpb3VyKCdtYXRlcmlhbEJ1dHRvbicsICdNYXRlcmlhbEJ1dHRvbicpXHJcbkBUcmFuc2xhdGlvblxyXG5jbGFzcyBCdXR0b24gZXh0ZW5kcyBDb21wb25lbnQge1xyXG5cclxuICAgIC8qKlxyXG4gICAgKiBDYWxsZWQgd2hlbiBjb21wb25lbnQgaXMgbW91bnRlZC5cclxuICAgICovXHJcbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcclxuICAgICAgICBjb25zdCB7aGFzUmlwcGxlfSA9IHRoaXMucHJvcHM7XHJcbiAgICAgICAgY29uc3QgcmVmTm9kZSA9IFJlYWN0RE9NLmZpbmRET01Ob2RlKHRoaXMucmVmc1snbWF0ZXJpYWxCdXR0b24nXSk7XHJcbiAgICAgICAgaWYgKGhhc1JpcHBsZSkge1xyXG4gICAgICAgICAgICBjb21wb25lbnRIYW5kbGVyLnVwZ3JhZGVFbGVtZW50KHJlZk5vZGUsICdNYXRlcmlhbFJpcHBsZScpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICogRGF0ZSBkZSBjb21wb3NhbnQuXHJcbiAgICAqIEByZXR1cm4ge3N0cmluZ30gQ2xhc3NlLlxyXG4gICAgKi9cclxuICAgIF9nZXRDb21wb25lbnRDbGFzc05hbWUoKSB7XHJcbiAgICAgICAgY29uc3Qge3NoYXBlLCBjb2xvciwgaGFzUmlwcGxlLCBpc0pzfSA9IHRoaXMucHJvcHM7XHJcbiAgICAgICAgbGV0IFNIQVBFX0NMQVNTO1xyXG4gICAgICAgIHN3aXRjaCAoc2hhcGUpIHtcclxuICAgICAgICAgICAgY2FzZSAncmFpc2VkJzpcclxuICAgICAgICAgICAgU0hBUEVfQ0xBU1MgPSBgJHtCVVRUT05fUFJGWH1yYWlzZWRgO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnZmFiJzpcclxuICAgICAgICAgICAgU0hBUEVfQ0xBU1MgPSBgJHtCVVRUT05fUFJGWH1mYWJgO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnaWNvbic6XHJcbiAgICAgICAgICAgIFNIQVBFX0NMQVNTID0gYCR7QlVUVE9OX1BSRlh9aWNvbmA7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdtaW5pLWZhYic6XHJcbiAgICAgICAgICAgIFNIQVBFX0NMQVNTID0gYCR7QlVUVE9OX1BSRlh9bWluaS1mYWIgJHtCVVRUT05fUFJGWH1mYWJgO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBudWxsOlxyXG4gICAgICAgICAgICBTSEFQRV9DTEFTUyA9ICcnO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgU0hBUEVfQ0xBU1MgPSBudWxsO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgQ09MT1JfQ0xBU1MgPSBjb2xvciA/IGAke0JVVFRPTl9QUkZYfSR7Y29sb3J9YCA6ICcnO1xyXG4gICAgICAgIGNvbnN0IEpTX0NMQVNTID0gaXNKcyA/IEJUTl9KUyA6ICcnO1xyXG4gICAgICAgIGNvbnN0IFJJUFBMRV9FRkZFQ1RfQ0xBU1MgPSBoYXNSaXBwbGUgPyBSSVBQTEVfRUZGRUNUIDogJyc7XHJcbiAgICAgICAgcmV0dXJuIGAke0JUTl9DTEFTU30gJHtDT0xPUl9DTEFTU30gJHtTSEFQRV9DTEFTU30gJHtKU19DTEFTU30gJHtSSVBQTEVfRUZGRUNUX0NMQVNTfWA7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAqIFJlbmRlciB0aGUgcHJlc3NlZCBidXR0b24uXHJcbiAgICAqIEByZXR1cm4ge0NvbXBvbmVudH0gLSBDb21wb25lbnQgYnV0dG9uLlxyXG4gICAgKi9cclxuICAgIHJlbmRlclByZXNzZWRCdXR0b24oKSB7XHJcbiAgICAgICAgcmV0dXJuICg8YnV0dG9uPkxvYWRpbmcuLi48L2J1dHRvbj4pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgKiBSZW5kZXIgYW4gaWNvbi5cclxuICAgICogQHJldHVybiB7Q29tcG9uZW50fSAtIENvbXBvc2FudCBpY29uZS5cclxuICAgICovXHJcbiAgICBfcmVuZGVySWNvbigpIHtcclxuICAgICAgICBjb25zdCB7aWNvbiwgaWNvbkxpYnJhcnl9ID0gdGhpcy5wcm9wcztcclxuICAgICAgICBzd2l0Y2ggKGljb25MaWJyYXJ5KSB7XHJcbiAgICAgICAgICAgIGNhc2UgJ21hdGVyaWFsJzpcclxuICAgICAgICAgICAgICAgIHJldHVybiA8aSBjbGFzc05hbWU9J21hdGVyaWFsLWljb25zJz57aWNvbn08L2k+O1xyXG4gICAgICAgICAgICBjYXNlICdmb250LWF3ZXNvbWUnOlxyXG4gICAgICAgICAgICAgICAgY29uc3QgZmFDc3MgPSBgZmEgZmEtJHtpY29ufWA7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gPGkgY2xhc3NOYW1lPXtmYUNzc30+PC9pPjtcclxuICAgICAgICAgICAgY2FzZSAnZm9udC1jdXN0b20nOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIDxzcGFuIGNsYXNzTmFtZT17YGljb24tJHtpY29ufWB9Pjwvc3Bhbj47XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgKiBSZW5kZXIgdGhlIGxhYmVsLlxyXG4gICAgKiBAcmV0dXJuIHtDb21wb25lbnR9IC0gVGxlIGJ1dHRvbiBsYWJlbC5cclxuICAgICovXHJcbiAgICBfcmVuZGVyTGFiZWwoKSB7XHJcbiAgICAgICAgY29uc3Qge2xhYmVsLCBzaGFwZX0gPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIGlmIChsYWJlbCAmJiAnZmFiJyAhPT0gc2hhcGUgJiYgJ2ljb24nICE9PSBzaGFwZSAmJiAnbWluaS1mYWInICE9PSBzaGFwZSApIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaTE4bihsYWJlbCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKiogaW5oZXJpdGVkRG9jICovXHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgLy8gYXR0cmlidXRlIGRvYyA6IGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2ZyL2RvY3MvV2ViL0hUTUwvRWxlbWVudC9CdXR0b25cclxuICAgICAgICAvLyBiZSBjYXJlZnVsIHRoZSB3YXkgeW91IGRlY2xhcmUgeW91ciBhdHRyaWJ1dGUgbmFtZXMgOiBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9mci9kb2NzL1dlYi9IVE1ML0VsZW1lbnQvQnV0dG9uXHJcbiAgICAgICAgY29uc3Qge2NsYXNzTmFtZSwgZGlzYWJsZWQsIGZvcm1Ob1ZhbGlkYXRlLCBoYW5kbGVPbkNsaWNrLCBpY29uLCBpZCwgb25DbGljaywgdHlwZSwgbGFiZWwsIHN0eWxlLCBoYXNSaXBwbGUsIGlzSnMsIGljb25MaWJyYXJ5LCAuLi5yZXN0fSA9IHRoaXMucHJvcHM7XHJcbiAgICAgICAgY29uc3Qgb3RoZXJJbnB1dFByb3BzID0geyBkaXNhYmxlZCwgZm9ybU5vVmFsaWRhdGUsIG9uQ2xpY2s6IGhhbmRsZU9uQ2xpY2sgPyBoYW5kbGVPbkNsaWNrIDogb25DbGljaywgc3R5bGUsIHR5cGUsIC4uLnJlc3QgfTsgLy9vbiBjbGljayBmb3IgbGVnYWN5LiBSZW1vdmUgaGFuZGxlT25DbGljayBpbiB2MlxyXG4gICAgICAgIGNvbnN0IHJlbmRlcmVkQ2xhc3NOYW1lID0gYCR7Y2xhc3NOYW1lID8gY2xhc3NOYW1lIDogJyd9ICR7Ojp0aGlzLl9nZXRDb21wb25lbnRDbGFzc05hbWUoKX1gLnRyaW0oKTtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8YnV0dG9uIGFsdD17dGhpcy5pMThuKGxhYmVsKX0gY2xhc3NOYW1lPXtyZW5kZXJlZENsYXNzTmFtZX0gZGF0YS1mb2N1cz0nYnV0dG9uLWFjdGlvbicgaWQ9e2lkfSB0aXRsZT17dGhpcy5pMThuKGxhYmVsKX0gey4uLm90aGVySW5wdXRQcm9wc30gcmVmPSdtYXRlcmlhbEJ1dHRvbic+XHJcbiAgICAgICAgICAgICAgICB7aWNvbiAmJiA6OnRoaXMuX3JlbmRlckljb24oKX1cclxuICAgICAgICAgICAgICAgIHs6OnRoaXMuX3JlbmRlckxhYmVsKCl9XHJcbiAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbn1cclxuXHJcbkJ1dHRvbi5kaXNwbGF5TmFtZSA9ICdCdXR0b24nXHJcbkJ1dHRvbi5kZWZhdWx0UHJvcHMgPSBkZWZhdWx0UHJvcHM7XHJcbkJ1dHRvbi5wcm9wVHlwZXMgPSBwcm9wVHlwZXM7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBCdXR0b247XHJcbiJdfQ==