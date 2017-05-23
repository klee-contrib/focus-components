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
            iconLibrary = _props2.iconLibrary,
            classNameIcon = _props2.classNameIcon,
            labelIcon = _props2.labelIcon;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJCVE5fSlMiLCJCVE5fQ0xBU1MiLCJCVVRUT05fUFJGWCIsIlJJUFBMRV9FRkZFQ1QiLCJwcm9wVHlwZXMiLCJjb2xvciIsIm9uZU9mIiwidW5kZWZpbmVkIiwiaWQiLCJzdHJpbmciLCJoYW5kbGVPbkNsaWNrIiwiZnVuYyIsImhhc1JpcHBsZSIsImJvb2wiLCJpc0pzIiwiaWNvbiIsImljb25MaWJyYXJ5IiwibGFiZWwiLCJvbkNsaWNrIiwic2hhcGUiLCJ0eXBlIiwiZGVmYXVsdFByb3BzIiwiQnV0dG9uIiwiY29tcG9uZW50RGlkTW91bnQiLCJwcm9wcyIsInJlZk5vZGUiLCJmaW5kRE9NTm9kZSIsInJlZnMiLCJjb21wb25lbnRIYW5kbGVyIiwidXBncmFkZUVsZW1lbnQiLCJfZ2V0Q29tcG9uZW50Q2xhc3NOYW1lIiwiU0hBUEVfQ0xBU1MiLCJDT0xPUl9DTEFTUyIsIkpTX0NMQVNTIiwiUklQUExFX0VGRkVDVF9DTEFTUyIsInJlbmRlclByZXNzZWRCdXR0b24iLCJfcmVuZGVySWNvbiIsImNsYXNzTmFtZUljb24iLCJsYWJlbEljb24iLCJmYUNzcyIsIl9yZW5kZXJMYWJlbCIsImkxOG4iLCJyZW5kZXIiLCJjbGFzc05hbWUiLCJkaXNhYmxlZCIsImZvcm1Ob1ZhbGlkYXRlIiwic3R5bGUiLCJub0FsdEFuZE5vVGl0bGUiLCJyZXN0Iiwib3RoZXJJbnB1dFByb3BzIiwicmVuZGVyZWRDbGFzc05hbWUiLCJ0cmltIiwiZGlzcGxheU5hbWUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FBRUEsSUFBTUEsU0FBUyxlQUFmO0FBQ0EsSUFBTUMsWUFBWSxZQUFsQjtBQUNBLElBQU1DLGNBQWMsY0FBcEI7QUFDQSxJQUFNQyxnQkFBZ0Isc0JBQXRCOztBQUVBLElBQU1DLFlBQVk7QUFDZEMsV0FBTyxpQkFBVUMsS0FBVixDQUFnQixDQUFDQyxTQUFELEVBQVksU0FBWixFQUF1QixTQUF2QixFQUFrQyxRQUFsQyxDQUFoQixDQURPO0FBRWRDLFFBQUksaUJBQVVDLE1BRkE7QUFHZEMsbUJBQWUsaUJBQVVDLElBSFgsRUFHaUI7QUFDL0JDLGVBQVcsaUJBQVVDLElBSlA7QUFLZEMsVUFBTSxpQkFBVUQsSUFMRjtBQU1kRSxVQUFNLGlCQUFVTixNQU5GO0FBT2RPLGlCQUFhLGlCQUFVVixLQUFWLENBQWdCLENBQUMsVUFBRCxFQUFhLGNBQWIsRUFBNkIsYUFBN0IsQ0FBaEIsQ0FQQztBQVFkVyxXQUFPLGlCQUFVUixNQVJIO0FBU2RTLGFBQVMsaUJBQVVQLElBVEw7QUFVZFEsV0FBTyxpQkFBVWIsS0FBVixDQUFnQixDQUFDQyxTQUFELEVBQVksUUFBWixFQUFzQixLQUF0QixFQUE2QixNQUE3QixFQUFxQyxVQUFyQyxDQUFoQixDQVZPO0FBV2RhLFVBQU0saUJBQVVkLEtBQVYsQ0FBZ0IsQ0FBQyxRQUFELEVBQVcsUUFBWCxDQUFoQjtBQVhRLENBQWxCOztBQWNBLElBQU1lLGVBQWU7QUFDakJELFVBQU0sUUFEVztBQUVqQkQsV0FBTyxRQUZVO0FBR2pCRixXQUFPLEVBSFU7QUFJakJGLFVBQU0sSUFKVztBQUtqQlAsUUFBSSxFQUxhO0FBTWpCSSxlQUFXLEtBTk07QUFPakJFLFVBQU0sS0FQVztBQVFqQkUsaUJBQWE7QUFSSSxDQUFyQjs7SUFhTU0sTSxXQUZMLHdCQUFZLGdCQUFaLEVBQThCLGdCQUE5QixDOzs7Ozs7Ozs7QUFJRzs7O3FCQUdBQyxpQixnQ0FBb0I7QUFBQSxZQUNUWCxTQURTLEdBQ0ksS0FBS1ksS0FEVCxDQUNUWixTQURTOztBQUVoQixZQUFNYSxVQUFVLG1CQUFTQyxXQUFULENBQXFCLEtBQUtDLElBQUwsQ0FBVSxnQkFBVixDQUFyQixDQUFoQjtBQUNBLFlBQUlmLFNBQUosRUFBZTtBQUNYZ0IsNkJBQWlCQyxjQUFqQixDQUFnQ0osT0FBaEMsRUFBeUMsZ0JBQXpDO0FBQ0g7QUFDSixLOztBQUVEOzs7Ozs7cUJBSUFLLHNCLHFDQUF5QjtBQUFBLHFCQUNtQixLQUFLTixLQUR4QjtBQUFBLFlBQ2RMLEtBRGMsVUFDZEEsS0FEYztBQUFBLFlBQ1BkLEtBRE8sVUFDUEEsS0FETztBQUFBLFlBQ0FPLFNBREEsVUFDQUEsU0FEQTtBQUFBLFlBQ1dFLElBRFgsVUFDV0EsSUFEWDs7QUFFckIsWUFBSWlCLG9CQUFKO0FBQ0EsZ0JBQVFaLEtBQVI7QUFDSSxpQkFBSyxRQUFMO0FBQ0lZLDhCQUFpQjdCLFdBQWpCO0FBQ0E7QUFDSixpQkFBSyxLQUFMO0FBQ0k2Qiw4QkFBaUI3QixXQUFqQjtBQUNBO0FBQ0osaUJBQUssTUFBTDtBQUNJNkIsOEJBQWlCN0IsV0FBakI7QUFDQTtBQUNKLGlCQUFLLFVBQUw7QUFDSTZCLDhCQUFpQjdCLFdBQWpCLGlCQUF3Q0EsV0FBeEM7QUFDQTtBQUNKLGlCQUFLLElBQUw7QUFDSTZCLDhCQUFjLEVBQWQ7QUFDQTtBQUNKO0FBQ0lBLDhCQUFjLElBQWQ7QUFDQTtBQWxCUjtBQW9CQSxZQUFNQyxjQUFjM0IsYUFBV0gsV0FBWCxHQUF5QkcsS0FBekIsR0FBbUMsRUFBdkQ7QUFDQSxZQUFNNEIsV0FBV25CLE9BQU9kLE1BQVAsR0FBZ0IsRUFBakM7QUFDQSxZQUFNa0Msc0JBQXNCdEIsWUFBWVQsYUFBWixHQUE0QixFQUF4RDtBQUNBLGVBQVVGLFNBQVYsU0FBdUIrQixXQUF2QixTQUFzQ0QsV0FBdEMsU0FBcURFLFFBQXJELFNBQWlFQyxtQkFBakU7QUFDSCxLOztBQUVEOzs7Ozs7cUJBSUFDLG1CLGtDQUFzQjtBQUNsQixlQUFRO0FBQUE7QUFBQTtBQUFBO0FBQUEsU0FBUjtBQUNILEs7O0FBRUQ7Ozs7OztxQkFJQUMsVywwQkFBYztBQUFBLHNCQUM0QyxLQUFLWixLQURqRDtBQUFBLFlBQ0hULElBREcsV0FDSEEsSUFERztBQUFBLFlBQ0dDLFdBREgsV0FDR0EsV0FESDtBQUFBLFlBQ2dCcUIsYUFEaEIsV0FDZ0JBLGFBRGhCO0FBQUEsWUFDK0JDLFNBRC9CLFdBQytCQSxTQUQvQjs7QUFFVixnQkFBUXRCLFdBQVI7QUFDSSxpQkFBSyxVQUFMO0FBQ0ksb0JBQUlxQixpQkFBaUJDLFNBQXJCLEVBQWdDO0FBQzVCLDJCQUNJO0FBQUE7QUFBQTtBQUNJO0FBQUE7QUFBQSw4QkFBTSxXQUFXRCxhQUFqQjtBQUFpQ0M7QUFBakMseUJBREo7QUFFSTtBQUFBO0FBQUEsOEJBQUcsV0FBVSxnQkFBYjtBQUErQnZCO0FBQS9CO0FBRkoscUJBREo7QUFNSDtBQUNELHVCQUFPO0FBQUE7QUFBQSxzQkFBRyxXQUFVLGdCQUFiO0FBQStCQTtBQUEvQixpQkFBUDtBQUNKLGlCQUFLLGNBQUw7QUFDSSxvQkFBTXdCLG1CQUFpQnhCLElBQXZCO0FBQ0EsdUJBQU8scUNBQUcsV0FBV3dCLEtBQWQsR0FBUDtBQUNKLGlCQUFLLGFBQUw7QUFDSSx1QkFBTyx3Q0FBTSxxQkFBbUJ4QixJQUF6QixHQUFQO0FBQ0o7QUFDSSx1QkFBTyxJQUFQO0FBakJSO0FBbUJILEs7O0FBRUQ7Ozs7cUJBSUF5QixZLDJCQUFlO0FBQUEsc0JBQ1ksS0FBS2hCLEtBRGpCO0FBQUEsWUFDSlAsS0FESSxXQUNKQSxLQURJO0FBQUEsWUFDR0UsS0FESCxXQUNHQSxLQURIOztBQUVYLFlBQUlGLFNBQVMsVUFBVUUsS0FBbkIsSUFBNEIsV0FBV0EsS0FBdkMsSUFBZ0QsZUFBZUEsS0FBbkUsRUFBMEU7QUFDdEUsbUJBQU8sS0FBS3NCLElBQUwsQ0FBVXhCLEtBQVYsQ0FBUDtBQUNIO0FBQ0QsZUFBTyxJQUFQO0FBQ0gsSzs7QUFFRDtxQkFDQXlCLE0scUJBQVM7QUFDTDtBQUNBO0FBRkssc0JBR3VKLEtBQUtsQixLQUg1SjtBQUFBLFlBR0VtQixTQUhGLFdBR0VBLFNBSEY7QUFBQSxZQUdhQyxRQUhiLFdBR2FBLFFBSGI7QUFBQSxZQUd1QkMsY0FIdkIsV0FHdUJBLGNBSHZCO0FBQUEsWUFHdUNuQyxhQUh2QyxXQUd1Q0EsYUFIdkM7QUFBQSxZQUdzREssSUFIdEQsV0FHc0RBLElBSHREO0FBQUEsWUFHNERQLEVBSDVELFdBRzREQSxFQUg1RDtBQUFBLFlBR2dFVSxPQUhoRSxXQUdnRUEsT0FIaEU7QUFBQSxZQUd5RUUsSUFIekUsV0FHeUVBLElBSHpFO0FBQUEsWUFHK0VILEtBSC9FLFdBRytFQSxLQUgvRTtBQUFBLFlBR3NGNkIsS0FIdEYsV0FHc0ZBLEtBSHRGO0FBQUEsWUFHNkZsQyxTQUg3RixXQUc2RkEsU0FIN0Y7QUFBQSxZQUd3R0UsSUFIeEcsV0FHd0dBLElBSHhHO0FBQUEsWUFHOEdFLFdBSDlHLFdBRzhHQSxXQUg5RztBQUFBLFlBRzJIK0IsZUFIM0gsV0FHMkhBLGVBSDNIO0FBQUEsWUFHK0lDLElBSC9JOztBQUlMLFlBQU1DLDZCQUFvQkwsa0JBQXBCLEVBQThCQyw4QkFBOUIsRUFBOEMzQixTQUFTUixnQkFBZ0JBLGFBQWhCLEdBQWdDUSxPQUF2RixFQUFnRzRCLFlBQWhHLEVBQXVHMUIsVUFBdkcsSUFBZ0g0QixJQUFoSCxDQUFOLENBSkssQ0FJeUg7QUFDOUgsWUFBTUUsb0JBQW9CLEVBQUdQLFlBQVlBLFNBQVosR0FBd0IsRUFBM0IsVUFBbUMsS0FBS2Isc0JBQVAsTUFBRSxJQUFGLENBQWpDLEVBQzNCcUIsSUFEMkIsRUFBMUI7QUFFQSxZQUFHSixlQUFILEVBQW1CO0FBQ2YsbUJBQ0E7QUFBQTtBQUFBLDJCQUFRLFdBQVdHLGlCQUFuQixFQUFzQyxjQUFXLGVBQWpELEVBQWlFLElBQUkxQyxFQUFyRSxJQUE0RXlDLGVBQTVFLElBQTZGLEtBQUksZ0JBQWpHO0FBQ3lCbEMsd0JBQVUsS0FBS3FCLFdBQVAsTUFBRSxJQUFGLENBRGpDO0FBRU8scUJBQUtJLFlBQVAsTUFBRSxJQUFGO0FBRkwsYUFEQTtBQU1IO0FBQ0QsZUFDSTtBQUFBO0FBQUEsdUJBQVEsS0FBSyxLQUFLQyxJQUFMLENBQVV4QixLQUFWLENBQWIsRUFBK0IsV0FBV2lDLGlCQUExQyxFQUE2RCxjQUFXLGVBQXhFLEVBQXdGLElBQUkxQyxFQUE1RixFQUFnRyxPQUFPLEtBQUtpQyxJQUFMLENBQVV4QixLQUFWLENBQXZHLElBQTZIZ0MsZUFBN0gsSUFBOEksS0FBSSxnQkFBbEo7QUFDeUJsQyxvQkFBVSxLQUFLcUIsV0FBUCxNQUFFLElBQUYsQ0FEakM7QUFFTyxpQkFBS0ksWUFBUCxNQUFFLElBQUY7QUFGTCxTQURKO0FBTUgsSzs7Ozs7O0FBR0xsQixPQUFPOEIsV0FBUCxHQUFxQixRQUFyQjtBQUNBOUIsT0FBT0QsWUFBUCxHQUFzQkEsWUFBdEI7QUFDQUMsT0FBT2xCLFNBQVAsR0FBbUJBLFNBQW5COztrQkFFZWtCLE0iLCJmaWxlIjoiaXMtcmVhY3QtY2xhc3MtY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCwgUHJvcFR5cGVzIH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgUmVhY3RET00gZnJvbSAncmVhY3QtZG9tJztcclxuaW1wb3J0IE1EQmVoYXZpb3VyIGZyb20gJy4uLy4uL2JlaGF2aW91cnMvbWF0ZXJpYWwnO1xyXG5pbXBvcnQgVHJhbnNsYXRpb24gZnJvbSAnLi4vLi4vYmVoYXZpb3Vycy90cmFuc2xhdGlvbic7XHJcbmltcG9ydCBDb21wb25lbnRCYXNlQmVoYXZpb3VyIGZyb20gJy4uLy4uL2JlaGF2aW91cnMvY29tcG9uZW50LWJhc2UnO1xyXG5cclxuY29uc3QgQlROX0pTID0gJ21kbC1qcy1idXR0b24nO1xyXG5jb25zdCBCVE5fQ0xBU1MgPSAnbWRsLWJ1dHRvbic7XHJcbmNvbnN0IEJVVFRPTl9QUkZYID0gJ21kbC1idXR0b24tLSc7XHJcbmNvbnN0IFJJUFBMRV9FRkZFQ1QgPSAnbWRsLWpzLXJpcHBsZS1lZmZlY3QnO1xyXG5cclxuY29uc3QgcHJvcFR5cGVzID0ge1xyXG4gICAgY29sb3I6IFByb3BUeXBlcy5vbmVPZihbdW5kZWZpbmVkLCAnY29sb3JlZCcsICdwcmltYXJ5JywgJ2FjY2VudCddKSxcclxuICAgIGlkOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG4gICAgaGFuZGxlT25DbGljazogUHJvcFR5cGVzLmZ1bmMsIC8vdG8gcmVtb3ZlIGluIFYyXHJcbiAgICBoYXNSaXBwbGU6IFByb3BUeXBlcy5ib29sLFxyXG4gICAgaXNKczogUHJvcFR5cGVzLmJvb2wsXHJcbiAgICBpY29uOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG4gICAgaWNvbkxpYnJhcnk6IFByb3BUeXBlcy5vbmVPZihbJ21hdGVyaWFsJywgJ2ZvbnQtYXdlc29tZScsICdmb250LWN1c3RvbSddKSxcclxuICAgIGxhYmVsOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG4gICAgb25DbGljazogUHJvcFR5cGVzLmZ1bmMsXHJcbiAgICBzaGFwZTogUHJvcFR5cGVzLm9uZU9mKFt1bmRlZmluZWQsICdyYWlzZWQnLCAnZmFiJywgJ2ljb24nLCAnbWluaS1mYWInXSksXHJcbiAgICB0eXBlOiBQcm9wVHlwZXMub25lT2YoWydzdWJtaXQnLCAnYnV0dG9uJ10pXHJcbn1cclxuXHJcbmNvbnN0IGRlZmF1bHRQcm9wcyA9IHtcclxuICAgIHR5cGU6ICdzdWJtaXQnLFxyXG4gICAgc2hhcGU6ICdyYWlzZWQnLFxyXG4gICAgbGFiZWw6ICcnLFxyXG4gICAgaWNvbjogbnVsbCxcclxuICAgIGlkOiAnJyxcclxuICAgIGhhc1JpcHBsZTogZmFsc2UsXHJcbiAgICBpc0pzOiBmYWxzZSxcclxuICAgIGljb25MaWJyYXJ5OiAnbWF0ZXJpYWwnXHJcbn1cclxuXHJcbkBNREJlaGF2aW91cignbWF0ZXJpYWxCdXR0b24nLCAnTWF0ZXJpYWxCdXR0b24nKVxyXG5AVHJhbnNsYXRpb25cclxuY2xhc3MgQnV0dG9uIGV4dGVuZHMgQ29tcG9uZW50IHtcclxuXHJcbiAgICAvKipcclxuICAgICogQ2FsbGVkIHdoZW4gY29tcG9uZW50IGlzIG1vdW50ZWQuXHJcbiAgICAqL1xyXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XHJcbiAgICAgICAgY29uc3Qge2hhc1JpcHBsZX0gPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIGNvbnN0IHJlZk5vZGUgPSBSZWFjdERPTS5maW5kRE9NTm9kZSh0aGlzLnJlZnNbJ21hdGVyaWFsQnV0dG9uJ10pO1xyXG4gICAgICAgIGlmIChoYXNSaXBwbGUpIHtcclxuICAgICAgICAgICAgY29tcG9uZW50SGFuZGxlci51cGdyYWRlRWxlbWVudChyZWZOb2RlLCAnTWF0ZXJpYWxSaXBwbGUnKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAqIERhdGUgZGUgY29tcG9zYW50LlxyXG4gICAgKiBAcmV0dXJuIHtzdHJpbmd9IENsYXNzZS5cclxuICAgICovXHJcbiAgICBfZ2V0Q29tcG9uZW50Q2xhc3NOYW1lKCkge1xyXG4gICAgICAgIGNvbnN0IHtzaGFwZSwgY29sb3IsIGhhc1JpcHBsZSwgaXNKc30gPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIGxldCBTSEFQRV9DTEFTUztcclxuICAgICAgICBzd2l0Y2ggKHNoYXBlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgJ3JhaXNlZCc6XHJcbiAgICAgICAgICAgICAgICBTSEFQRV9DTEFTUyA9IGAke0JVVFRPTl9QUkZYfXJhaXNlZGA7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnZmFiJzpcclxuICAgICAgICAgICAgICAgIFNIQVBFX0NMQVNTID0gYCR7QlVUVE9OX1BSRlh9ZmFiYDtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdpY29uJzpcclxuICAgICAgICAgICAgICAgIFNIQVBFX0NMQVNTID0gYCR7QlVUVE9OX1BSRlh9aWNvbmA7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnbWluaS1mYWInOlxyXG4gICAgICAgICAgICAgICAgU0hBUEVfQ0xBU1MgPSBgJHtCVVRUT05fUFJGWH1taW5pLWZhYiAke0JVVFRPTl9QUkZYfWZhYmA7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBudWxsOlxyXG4gICAgICAgICAgICAgICAgU0hBUEVfQ0xBU1MgPSAnJztcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgU0hBUEVfQ0xBU1MgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IENPTE9SX0NMQVNTID0gY29sb3IgPyBgJHtCVVRUT05fUFJGWH0ke2NvbG9yfWAgOiAnJztcclxuICAgICAgICBjb25zdCBKU19DTEFTUyA9IGlzSnMgPyBCVE5fSlMgOiAnJztcclxuICAgICAgICBjb25zdCBSSVBQTEVfRUZGRUNUX0NMQVNTID0gaGFzUmlwcGxlID8gUklQUExFX0VGRkVDVCA6ICcnO1xyXG4gICAgICAgIHJldHVybiBgJHtCVE5fQ0xBU1N9ICR7Q09MT1JfQ0xBU1N9ICR7U0hBUEVfQ0xBU1N9ICR7SlNfQ0xBU1N9ICR7UklQUExFX0VGRkVDVF9DTEFTU31gO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgKiBSZW5kZXIgdGhlIHByZXNzZWQgYnV0dG9uLlxyXG4gICAgKiBAcmV0dXJuIHtDb21wb25lbnR9IC0gQ29tcG9uZW50IGJ1dHRvbi5cclxuICAgICovXHJcbiAgICByZW5kZXJQcmVzc2VkQnV0dG9uKCkge1xyXG4gICAgICAgIHJldHVybiAoPGJ1dHRvbj5Mb2FkaW5nLi4uPC9idXR0b24+KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICogUmVuZGVyIGFuIGljb24uXHJcbiAgICAqIEByZXR1cm4ge0NvbXBvbmVudH0gLSBDb21wb3NhbnQgaWNvbmUuXHJcbiAgICAqL1xyXG4gICAgX3JlbmRlckljb24oKSB7XHJcbiAgICAgICAgY29uc3Qge2ljb24sIGljb25MaWJyYXJ5LCBjbGFzc05hbWVJY29uLCBsYWJlbEljb259ID0gdGhpcy5wcm9wcztcclxuICAgICAgICBzd2l0Y2ggKGljb25MaWJyYXJ5KSB7XHJcbiAgICAgICAgICAgIGNhc2UgJ21hdGVyaWFsJzpcclxuICAgICAgICAgICAgICAgIGlmIChjbGFzc05hbWVJY29uICYmIGxhYmVsSWNvbikge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9e2NsYXNzTmFtZUljb259PntsYWJlbEljb259PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3NOYW1lPSdtYXRlcmlhbC1pY29ucyc+e2ljb259PC9pPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gPGkgY2xhc3NOYW1lPSdtYXRlcmlhbC1pY29ucyc+e2ljb259PC9pPjtcclxuICAgICAgICAgICAgY2FzZSAnZm9udC1hd2Vzb21lJzpcclxuICAgICAgICAgICAgICAgIGNvbnN0IGZhQ3NzID0gYGZhIGZhLSR7aWNvbn1gO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIDxpIGNsYXNzTmFtZT17ZmFDc3N9PjwvaT47XHJcbiAgICAgICAgICAgIGNhc2UgJ2ZvbnQtY3VzdG9tJzpcclxuICAgICAgICAgICAgICAgIHJldHVybiA8c3BhbiBjbGFzc05hbWU9e2BpY29uLSR7aWNvbn1gfT48L3NwYW4+O1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICogUmVuZGVyIHRoZSBsYWJlbC5cclxuICAgICogQHJldHVybiB7Q29tcG9uZW50fSAtIFRsZSBidXR0b24gbGFiZWwuXHJcbiAgICAqL1xyXG4gICAgX3JlbmRlckxhYmVsKCkge1xyXG4gICAgICAgIGNvbnN0IHtsYWJlbCwgc2hhcGV9ID0gdGhpcy5wcm9wcztcclxuICAgICAgICBpZiAobGFiZWwgJiYgJ2ZhYicgIT09IHNoYXBlICYmICdpY29uJyAhPT0gc2hhcGUgJiYgJ21pbmktZmFiJyAhPT0gc2hhcGUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaTE4bihsYWJlbCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKiogaW5oZXJpdGVkRG9jICovXHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgLy8gYXR0cmlidXRlIGRvYyA6IGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2ZyL2RvY3MvV2ViL0hUTUwvRWxlbWVudC9CdXR0b25cclxuICAgICAgICAvLyBiZSBjYXJlZnVsIHRoZSB3YXkgeW91IGRlY2xhcmUgeW91ciBhdHRyaWJ1dGUgbmFtZXMgOiBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9mci9kb2NzL1dlYi9IVE1ML0VsZW1lbnQvQnV0dG9uXHJcbiAgICAgICAgY29uc3Qge2NsYXNzTmFtZSwgZGlzYWJsZWQsIGZvcm1Ob1ZhbGlkYXRlLCBoYW5kbGVPbkNsaWNrLCBpY29uLCBpZCwgb25DbGljaywgdHlwZSwgbGFiZWwsIHN0eWxlLCBoYXNSaXBwbGUsIGlzSnMsIGljb25MaWJyYXJ5LCBub0FsdEFuZE5vVGl0bGUsIC4uLnJlc3R9ID0gdGhpcy5wcm9wcztcclxuICAgICAgICBjb25zdCBvdGhlcklucHV0UHJvcHMgPSB7IGRpc2FibGVkLCBmb3JtTm9WYWxpZGF0ZSwgb25DbGljazogaGFuZGxlT25DbGljayA/IGhhbmRsZU9uQ2xpY2sgOiBvbkNsaWNrLCBzdHlsZSwgdHlwZSwgLi4ucmVzdCB9OyAvL29uIGNsaWNrIGZvciBsZWdhY3kuIFJlbW92ZSBoYW5kbGVPbkNsaWNrIGluIHYyXHJcbiAgICAgICAgY29uc3QgcmVuZGVyZWRDbGFzc05hbWUgPSBgJHtjbGFzc05hbWUgPyBjbGFzc05hbWUgOiAnJ30gJHs6OnRoaXMuX2dldENvbXBvbmVudENsYXNzTmFtZSgpXHJcbiAgICB9YC50cmltKCk7XHJcbiAgICAgICAgaWYobm9BbHRBbmROb1RpdGxlKXtcclxuICAgICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9e3JlbmRlcmVkQ2xhc3NOYW1lfSBkYXRhLWZvY3VzPSdidXR0b24tYWN0aW9uJyBpZD17aWR9ey4uLm90aGVySW5wdXRQcm9wc30gcmVmPSdtYXRlcmlhbEJ1dHRvbic+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtpY29uICYmIDo6dGhpcy5fcmVuZGVySWNvbigpfVxyXG4gICAgICAgICAgICAgICAgezo6dGhpcy5fcmVuZGVyTGFiZWwoKX1cclxuICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGJ1dHRvbiBhbHQ9e3RoaXMuaTE4bihsYWJlbCl9IGNsYXNzTmFtZT17cmVuZGVyZWRDbGFzc05hbWV9IGRhdGEtZm9jdXM9J2J1dHRvbi1hY3Rpb24nIGlkPXtpZH0gdGl0bGU9e3RoaXMuaTE4bihsYWJlbCl9IHsuLi5vdGhlcklucHV0UHJvcHN9IHJlZj0nbWF0ZXJpYWxCdXR0b24nPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7aWNvbiAmJiA6OnRoaXMuX3JlbmRlckljb24oKX1cclxuICAgICAgICAgICAgICAgIHs6OnRoaXMuX3JlbmRlckxhYmVsKCl9XHJcbiAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICB9XHJcbn1cclxuXHJcbkJ1dHRvbi5kaXNwbGF5TmFtZSA9ICdCdXR0b24nXHJcbkJ1dHRvbi5kZWZhdWx0UHJvcHMgPSBkZWZhdWx0UHJvcHM7XHJcbkJ1dHRvbi5wcm9wVHlwZXMgPSBwcm9wVHlwZXM7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBCdXR0b247XHJcbiJdfQ==