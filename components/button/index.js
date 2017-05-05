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
            iconLibrary = _props2.iconLibrary;

        switch (iconLibrary) {
            case 'material':
                return _react2.default.createElement(
                    'i',
                    { className: 'material-icons' },
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
            id = _props4.id,
            _onClick = _props4.onClick,
            type = _props4.type,
            label = _props4.label,
            style = _props4.style,
            hasRipple = _props4.hasRipple,
            isJs = _props4.isJs,
            iconLibrary = _props4.iconLibrary,
            isLoading = _props4.isLoading,
            rest = _objectWithoutProperties(_props4, ['className', 'disabled', 'formNoValidate', 'handleOnClick', 'icon', 'id', 'onClick', 'type', 'label', 'style', 'hasRipple', 'isJs', 'iconLibrary', 'isLoading']);

        var otherInputProps = (0, _filterHtmlAttributes2.default)(_extends({ disabled: disabled, formNoValidate: formNoValidate, onClick: function onClick(event) {
                return _this2._wrappedOnClick(event, handleOnClick ? handleOnClick : _onClick);
            }, style: style, type: type }, rest)); //on click for legacy. Remove handleOnClick in v2
        var renderedClassName = ((className ? className : '') + ' ' + this._getComponentClassName.call(this)).trim();
        return _react2.default.createElement(
            'button',
            _extends({ alt: this.i18n(label), className: renderedClassName, 'data-focus': 'button-action', 'data-saving': isLoading, id: id, disabled: isLoading, title: this.i18n(label) }, otherInputProps, { ref: 'materialButton' }),
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJCVE5fSlMiLCJCVE5fQ0xBU1MiLCJCVVRUT05fUFJGWCIsIlJJUFBMRV9FRkZFQ1QiLCJwcm9wVHlwZXMiLCJjb2xvciIsIm9uZU9mIiwidW5kZWZpbmVkIiwiaGFuZGxlT25DbGljayIsImZ1bmMiLCJoYXNSaXBwbGUiLCJib29sIiwiaWQiLCJzdHJpbmciLCJpY29uIiwiaWNvbkxpYnJhcnkiLCJpc0pzIiwiaXNMb2FkaW5nIiwibGFiZWwiLCJvbkNsaWNrIiwic2hhcGUiLCJ0eXBlIiwiZGVmYXVsdFByb3BzIiwiQnV0dG9uIiwiY29tcG9uZW50RGlkTW91bnQiLCJwcm9wcyIsInJlZk5vZGUiLCJmaW5kRE9NTm9kZSIsInJlZnMiLCJtYXRlcmlhbEJ1dHRvbiIsImNvbXBvbmVudEhhbmRsZXIiLCJ1cGdyYWRlRWxlbWVudCIsImNvbXBvbmVudERpZFVwZGF0ZSIsInNwaW5uZXJOb2RlIiwiX2dldENvbXBvbmVudENsYXNzTmFtZSIsIlNIQVBFX0NMQVNTIiwiQ09MT1JfQ0xBU1MiLCJKU19DTEFTUyIsIlJJUFBMRV9FRkZFQ1RfQ0xBU1MiLCJyZW5kZXJQcmVzc2VkQnV0dG9uIiwiX3JlbmRlckljb24iLCJfcmVuZGVyTGFiZWwiLCJwcm9jZXNzTGFiZWwiLCJpMThuIiwiX3dyYXBwZWRPbkNsaWNrIiwiZXZlbnQiLCJwcmV2ZW50RGVmYXVsdCIsInN0b3BQcm9wYWdhdGlvbiIsInJlbmRlciIsImNsYXNzTmFtZSIsImRpc2FibGVkIiwiZm9ybU5vVmFsaWRhdGUiLCJzdHlsZSIsInJlc3QiLCJvdGhlcklucHV0UHJvcHMiLCJyZW5kZXJlZENsYXNzTmFtZSIsInRyaW0iLCJkaXNwbGF5TmFtZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQSxJQUFNQSxTQUFTLGVBQWY7QUFDQSxJ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QixFQUE0QnJDLGdCQUFnQkEsYUFBaEIsR0FBZ0NXLFFBQTVELENBQVQ7QUFBQSxhQUFqRCxFQUFnSWlDLFlBQWhJLEVBQXVJL0IsVUFBdkksSUFBZ0pnQyxJQUFoSixFQUF4QixDQUpLLENBSTRLO0FBQ2pMLFlBQU1FLG9CQUFvQixFQUFHTixZQUFZQSxTQUFaLEdBQXdCLEVBQTNCLFVBQW1DLEtBQUtmLHNCQUFQLE1BQUUsSUFBRixDQUFqQyxFQUFtRXNCLElBQW5FLEVBQTFCO0FBQ0EsZUFDSTtBQUFBO0FBQUEsdUJBQVEsS0FBSyxLQUFLYixJQUFMLENBQVV6QixLQUFWLENBQWIsRUFBK0IsV0FBV3FDLGlCQUExQyxFQUE2RCxjQUFXLGVBQXhFLEVBQXdGLGVBQWF0QyxTQUFyRyxFQUFnSCxJQUFJTCxFQUFwSCxFQUF3SCxVQUFVSyxTQUFsSSxFQUE2SSxPQUFPLEtBQUswQixJQUFMLENBQVV6QixLQUFWLENBQXBKLElBQTBLb0MsZUFBMUssSUFBMkwsS0FBSSxnQkFBL0w7QUFDS3hDLG9CQUFVLEtBQUswQixXQUFQLE1BQUUsSUFBRixDQURiO0FBRU8saUJBQUtDLFlBQVAsTUFBRSxJQUFGLENBRkw7QUFHS3hCLHlCQUFhLHVDQUFLLFdBQVUsZ0VBQWYsRUFBZ0YsY0FBVyw4QkFBM0YsRUFBMEgsS0FBSSw4QkFBOUg7QUFIbEIsU0FESjtBQU9ILEs7Ozs7OztBQUdMTSxPQUFPa0MsV0FBUCxHQUFxQixRQUFyQjtBQUNBbEMsT0FBT0QsWUFBUCxHQUFzQkEsWUFBdEI7QUFDQUMsT0FBT25CLFNBQVAsR0FBbUJBLFNBQW5COztrQkFFZW1CLE0iLCJmaWxlIjoiaXMtcmVhY3QtY2xhc3MtY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCwgUHJvcFR5cGVzIH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgUmVhY3RET00gZnJvbSAncmVhY3QtZG9tJztcclxuaW1wb3J0IE1EQmVoYXZpb3VyIGZyb20gJy4uLy4uL2JlaGF2aW91cnMvbWF0ZXJpYWwnO1xyXG5pbXBvcnQgVHJhbnNsYXRpb24gZnJvbSAnLi4vLi4vYmVoYXZpb3Vycy90cmFuc2xhdGlvbic7XHJcbmltcG9ydCBmaWx0ZXJQcm9wcyBmcm9tICcuLi8uLi91dGlscy9maWx0ZXItaHRtbC1hdHRyaWJ1dGVzJztcclxuXHJcbmNvbnN0IEJUTl9KUyA9ICdtZGwtanMtYnV0dG9uJztcclxuY29uc3QgQlROX0NMQVNTID0gJ21kbC1idXR0b24nO1xyXG5jb25zdCBCVVRUT05fUFJGWCA9ICdtZGwtYnV0dG9uLS0nO1xyXG5jb25zdCBSSVBQTEVfRUZGRUNUID0gJ21kbC1qcy1yaXBwbGUtZWZmZWN0JztcclxuXHJcbmNvbnN0IHByb3BUeXBlcyA9IHtcclxuICAgIGNvbG9yOiBQcm9wVHlwZXMub25lT2YoW3VuZGVmaW5lZCwgJ2NvbG9yZWQnLCAncHJpbWFyeScsICdhY2NlbnQnXSksXHJcbiAgICBoYW5kbGVPbkNsaWNrOiBQcm9wVHlwZXMuZnVuYywgLy90byByZW1vdmUgaW4gVjJcclxuICAgIGhhc1JpcHBsZTogUHJvcFR5cGVzLmJvb2wsXHJcbiAgICBpZDogUHJvcFR5cGVzLnN0cmluZyxcclxuICAgIGljb246IFByb3BUeXBlcy5zdHJpbmcsXHJcbiAgICBpY29uTGlicmFyeTogUHJvcFR5cGVzLm9uZU9mKFsnbWF0ZXJpYWwnLCAnZm9udC1hd2Vzb21lJywgJ2ZvbnQtY3VzdG9tJ10pLFxyXG4gICAgaXNKczogUHJvcFR5cGVzLmJvb2wsXHJcbiAgICBpc0xvYWRpbmc6IFByb3BUeXBlcy5ib29sLFxyXG4gICAgbGFiZWw6IFByb3BUeXBlcy5zdHJpbmcsXHJcbiAgICBvbkNsaWNrOiBQcm9wVHlwZXMuZnVuYyxcclxuICAgIHNoYXBlOiBQcm9wVHlwZXMub25lT2YoW3VuZGVmaW5lZCwgJ3JhaXNlZCcsICdmYWInLCAnaWNvbicsICdtaW5pLWZhYiddKSxcclxuICAgIHR5cGU6IFByb3BUeXBlcy5vbmVPZihbJ3N1Ym1pdCcsICdidXR0b24nXSlcclxufVxyXG5cclxuY29uc3QgZGVmYXVsdFByb3BzID0ge1xyXG4gICAgaGFzUmlwcGxlOiBmYWxzZSxcclxuICAgIGljb246IG51bGwsXHJcbiAgICBpY29uTGlicmFyeTogJ21hdGVyaWFsJyxcclxuICAgIGlkOiAnJyxcclxuICAgIGlzSnM6IGZhbHNlLFxyXG4gICAgbGFiZWw6ICcnLFxyXG4gICAgc2hhcGU6ICdyYWlzZWQnLFxyXG4gICAgdHlwZTogJ3N1Ym1pdCdcclxufVxyXG5cclxuQE1EQmVoYXZpb3VyKCdtYXRlcmlhbEJ1dHRvbicsICdNYXRlcmlhbEJ1dHRvbicpXHJcbkBUcmFuc2xhdGlvblxyXG5jbGFzcyBCdXR0b24gZXh0ZW5kcyBDb21wb25lbnQge1xyXG5cclxuICAgIC8qKlxyXG4gICAgKiBDYWxsZWQgd2hlbiBjb21wb25lbnQgaXMgbW91bnRlZC5cclxuICAgICovXHJcbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcclxuICAgICAgICBjb25zdCB7IGhhc1JpcHBsZSB9ID0gdGhpcy5wcm9wcztcclxuICAgICAgICBjb25zdCByZWZOb2RlID0gUmVhY3RET00uZmluZERPTU5vZGUodGhpcy5yZWZzLm1hdGVyaWFsQnV0dG9uKTtcclxuICAgICAgICBpZiAoaGFzUmlwcGxlKSB7XHJcbiAgICAgICAgICAgIGNvbXBvbmVudEhhbmRsZXIudXBncmFkZUVsZW1lbnQocmVmTm9kZSwgJ01hdGVyaWFsUmlwcGxlJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNvbXBvbmVudERpZFVwZGF0ZSgpIHtcclxuICAgICAgICBjb25zdCBzcGlubmVyTm9kZSA9IFJlYWN0RE9NLmZpbmRET01Ob2RlKHRoaXMucmVmc1snZG91YmxlLWFjdGlvbi1idXR0b24tc3Bpbm5lciddKTtcclxuICAgICAgICBpZiAoc3Bpbm5lck5vZGUpIHtcclxuICAgICAgICAgICAgY29tcG9uZW50SGFuZGxlci51cGdyYWRlRWxlbWVudChzcGlubmVyTm9kZSwgJ01hdGVyaWFsU3Bpbm5lcicpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICogRGF0ZSBkZSBjb21wb3NhbnQuXHJcbiAgICAqIEByZXR1cm4ge3N0cmluZ30gQ2xhc3NlLlxyXG4gICAgKi9cclxuICAgIF9nZXRDb21wb25lbnRDbGFzc05hbWUoKSB7XHJcbiAgICAgICAgY29uc3QgeyBzaGFwZSwgY29sb3IsIGhhc1JpcHBsZSwgaXNKcyB9ID0gdGhpcy5wcm9wcztcclxuICAgICAgICBsZXQgU0hBUEVfQ0xBU1M7XHJcbiAgICAgICAgc3dpdGNoIChzaGFwZSkge1xyXG4gICAgICAgICAgICBjYXNlICdyYWlzZWQnOlxyXG4gICAgICAgICAgICAgICAgU0hBUEVfQ0xBU1MgPSBgJHtCVVRUT05fUFJGWH1yYWlzZWRgO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ2ZhYic6XHJcbiAgICAgICAgICAgICAgICBTSEFQRV9DTEFTUyA9IGAke0JVVFRPTl9QUkZYfWZhYmA7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnaWNvbic6XHJcbiAgICAgICAgICAgICAgICBTSEFQRV9DTEFTUyA9IGAke0JVVFRPTl9QUkZYfWljb25gO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ21pbmktZmFiJzpcclxuICAgICAgICAgICAgICAgIFNIQVBFX0NMQVNTID0gYCR7QlVUVE9OX1BSRlh9bWluaS1mYWIgJHtCVVRUT05fUFJGWH1mYWJgO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgbnVsbDpcclxuICAgICAgICAgICAgICAgIFNIQVBFX0NMQVNTID0gJyc7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIFNIQVBFX0NMQVNTID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBDT0xPUl9DTEFTUyA9IGNvbG9yID8gYCR7QlVUVE9OX1BSRlh9JHtjb2xvcn1gIDogJyc7XHJcbiAgICAgICAgY29uc3QgSlNfQ0xBU1MgPSBpc0pzID8gQlROX0pTIDogJyc7XHJcbiAgICAgICAgY29uc3QgUklQUExFX0VGRkVDVF9DTEFTUyA9IGhhc1JpcHBsZSA/IFJJUFBMRV9FRkZFQ1QgOiAnJztcclxuICAgICAgICByZXR1cm4gYCR7QlROX0NMQVNTfSAke0NPTE9SX0NMQVNTfSAke1NIQVBFX0NMQVNTfSAke0pTX0NMQVNTfSAke1JJUFBMRV9FRkZFQ1RfQ0xBU1N9YDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICogUmVuZGVyIHRoZSBwcmVzc2VkIGJ1dHRvbi5cclxuICAgICogQHJldHVybiB7Q29tcG9uZW50fSAtIENvbXBvbmVudCBidXR0b24uXHJcbiAgICAqL1xyXG4gICAgcmVuZGVyUHJlc3NlZEJ1dHRvbigpIHtcclxuICAgICAgICByZXR1cm4gKDxidXR0b24+TG9hZGluZy4uLjwvYnV0dG9uPik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAqIFJlbmRlciBhbiBpY29uLlxyXG4gICAgKiBAcmV0dXJuIHtDb21wb25lbnR9IC0gQ29tcG9zYW50IGljb25lLlxyXG4gICAgKi9cclxuICAgIF9yZW5kZXJJY29uKCkge1xyXG4gICAgICAgIGNvbnN0IHsgaWNvbiwgaWNvbkxpYnJhcnkgfSA9IHRoaXMucHJvcHM7XHJcbiAgICAgICAgc3dpdGNoIChpY29uTGlicmFyeSkge1xyXG4gICAgICAgICAgICBjYXNlICdtYXRlcmlhbCc6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gPGkgY2xhc3NOYW1lPSdtYXRlcmlhbC1pY29ucyc+e2ljb259PC9pPjtcclxuICAgICAgICAgICAgY2FzZSAnZm9udC1hd2Vzb21lJzpcclxuICAgICAgICAgICAgICAgIHJldHVybiA8aSBjbGFzc05hbWU9e2BmYSBmYS0ke2ljb259YH0gLz47XHJcbiAgICAgICAgICAgIGNhc2UgJ2ZvbnQtY3VzdG9tJzpcclxuICAgICAgICAgICAgICAgIHJldHVybiA8c3BhbiBjbGFzc05hbWU9e2BpY29uLSR7aWNvbn1gfSAvPjtcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICogUmVuZGVyIHRoZSBsYWJlbC5cclxuICAgICogQHJldHVybiB7Q29tcG9uZW50fSAtIFRsZSBidXR0b24gbGFiZWwuXHJcbiAgICAqL1xyXG4gICAgX3JlbmRlckxhYmVsKCkge1xyXG4gICAgICAgIGNvbnN0IHsgaXNMb2FkaW5nLCBsYWJlbCwgcHJvY2Vzc0xhYmVsLCBzaGFwZSB9ID0gdGhpcy5wcm9wcztcclxuXHJcbiAgICAgICAgaWYgKGxhYmVsICYmICdmYWInICE9PSBzaGFwZSAmJiAnaWNvbicgIT09IHNoYXBlICYmICdtaW5pLWZhYicgIT09IHNoYXBlICYmICghaXNMb2FkaW5nIHx8ICFwcm9jZXNzTGFiZWwpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiA8c3BhbiBkYXRhLWZvY3VzPSdidXR0b24tbGFiZWwnPnt0aGlzLmkxOG4obGFiZWwpfTwvc3Bhbj47XHJcbiAgICAgICAgfSBlbHNlIGlmIChwcm9jZXNzTGFiZWwgJiYgJ2ZhYicgIT09IHNoYXBlICYmICdpY29uJyAhPT0gc2hhcGUgJiYgJ21pbmktZmFiJyAhPT0gc2hhcGUgJiYgaXNMb2FkaW5nKSB7XHJcbiAgICAgICAgICAgIHJldHVybiA8c3BhbiBkYXRhLWZvY3VzPSdidXR0b24tbGFiZWwnPnt0aGlzLmkxOG4ocHJvY2Vzc0xhYmVsKX08L3NwYW4+XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogV3JhcHBlciBhcm91bmQgb24gY2xpY2ssIHRvIHByZXZlbnQgY2xpY2sgYWN0aW9uIGlzIHNwaW5uZXIgaXMgc2hvd2VkLlxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0ge2FueX0gZXZlbnQgdGhlIGh0bWwgZXZlbnRcclxuICAgICAqIEBwYXJhbSB7YW55fSBvbkNsaWNrIHRoZSBvbmNsaWNrIGZ1bmN0aW9uIHRvIGNhbGxcclxuICAgICAqIFxyXG4gICAgICogQG1lbWJlck9mIEJ1dHRvblxyXG4gICAgICovXHJcbiAgICBfd3JhcHBlZE9uQ2xpY2soZXZlbnQsIG9uQ2xpY2spIHtcclxuICAgICAgICBpZiAodGhpcy5wcm9wcy5pc0xvYWRpbmcpIHtcclxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgb25DbGljayhldmVudCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKiBpbmhlcml0ZWREb2MgKi9cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICAvLyBhdHRyaWJ1dGUgZG9jIDogaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZnIvZG9jcy9XZWIvSFRNTC9FbGVtZW50L0J1dHRvblxyXG4gICAgICAgIC8vIGJlIGNhcmVmdWwgdGhlIHdheSB5b3UgZGVjbGFyZSB5b3VyIGF0dHJpYnV0ZSBuYW1lcyA6IGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2ZyL2RvY3MvV2ViL0hUTUwvRWxlbWVudC9CdXR0b25cclxuICAgICAgICBjb25zdCB7Y2xhc3NOYW1lLCBkaXNhYmxlZCwgZm9ybU5vVmFsaWRhdGUsIGhhbmRsZU9uQ2xpY2ssIGljb24sIGlkLCBvbkNsaWNrLCB0eXBlLCBsYWJlbCwgc3R5bGUsIGhhc1JpcHBsZSwgaXNKcywgaWNvbkxpYnJhcnksIGlzTG9hZGluZywgLi4ucmVzdH0gPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIGNvbnN0IG90aGVySW5wdXRQcm9wcyA9IGZpbHRlclByb3BzKHsgZGlzYWJsZWQsIGZvcm1Ob1ZhbGlkYXRlLCBvbkNsaWNrOiBldmVudCA9PiB0aGlzLl93cmFwcGVkT25DbGljayhldmVudCwgaGFuZGxlT25DbGljayA/IGhhbmRsZU9uQ2xpY2sgOiBvbkNsaWNrKSwgc3R5bGUsIHR5cGUsIC4uLnJlc3QgfSk7IC8vb24gY2xpY2sgZm9yIGxlZ2FjeS4gUmVtb3ZlIGhhbmRsZU9uQ2xpY2sgaW4gdjJcclxuICAgICAgICBjb25zdCByZW5kZXJlZENsYXNzTmFtZSA9IGAke2NsYXNzTmFtZSA/IGNsYXNzTmFtZSA6ICcnfSAkezo6dGhpcy5fZ2V0Q29tcG9uZW50Q2xhc3NOYW1lKCl9YC50cmltKCk7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGJ1dHRvbiBhbHQ9e3RoaXMuaTE4bihsYWJlbCl9IGNsYXNzTmFtZT17cmVuZGVyZWRDbGFzc05hbWV9IGRhdGEtZm9jdXM9J2J1dHRvbi1hY3Rpb24nIGRhdGEtc2F2aW5nPXtpc0xvYWRpbmd9IGlkPXtpZH0gZGlzYWJsZWQ9e2lzTG9hZGluZ30gdGl0bGU9e3RoaXMuaTE4bihsYWJlbCl9IHsuLi5vdGhlcklucHV0UHJvcHN9IHJlZj0nbWF0ZXJpYWxCdXR0b24nPlxyXG4gICAgICAgICAgICAgICAge2ljb24gJiYgOjp0aGlzLl9yZW5kZXJJY29uKCl9XHJcbiAgICAgICAgICAgICAgICB7Ojp0aGlzLl9yZW5kZXJMYWJlbCgpfVxyXG4gICAgICAgICAgICAgICAge2lzTG9hZGluZyAmJiA8ZGl2IGNsYXNzTmFtZT0nbWRsLXNwaW5uZXIgbWRsLXNwaW5uZXItLXNpbmdsZS1jb2xvciBtZGwtanMtc3Bpbm5lciBpcy1hY3RpdmUnIGRhdGEtZm9jdXM9J2RvdWJsZS1hY3Rpb24tYnV0dG9uLXNwaW5uZXInIHJlZj0nZG91YmxlLWFjdGlvbi1idXR0b24tc3Bpbm5lcicgLz59XHJcbiAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbn1cclxuXHJcbkJ1dHRvbi5kaXNwbGF5TmFtZSA9ICdCdXR0b24nXHJcbkJ1dHRvbi5kZWZhdWx0UHJvcHMgPSBkZWZhdWx0UHJvcHM7XHJcbkJ1dHRvbi5wcm9wVHlwZXMgPSBwcm9wVHlwZXM7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBCdXR0b247ICAgICAgICAgICAgICAgICAgICJdfQ==