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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJCVE5fSlMiLCJCVE5fQ0xBU1MiLCJCVVRUT05fUFJGWCIsIlJJUFBMRV9FRkZFQ1QiLCJwcm9wVHlwZXMiLCJjb2xvciIsIm9uZU9mIiwidW5kZWZpbmVkIiwiaWQiLCJzdHJpbmciLCJoYW5kbGVPbkNsaWNrIiwiZnVuYyIsImhhc1JpcHBsZSIsImJvb2wiLCJpc0pzIiwiaWNvbiIsImljb25MaWJyYXJ5IiwibGFiZWwiLCJvbkNsaWNrIiwic2hhcGUiLCJ0eXBlIiwiZGVmYXVsdFByb3BzIiwiQnV0dG9uIiwiY29tcG9uZW50RGlkTW91bnQiLCJwcm9wcyIsInJlZk5vZGUiLCJmaW5kRE9NTm9kZSIsInJlZnMiLCJjb21wb25lbnRIYW5kbGVyIiwidXBncmFkZUVsZW1lbnQiLCJfZ2V0Q29tcG9uZW50Q2xhc3NOYW1lIiwiU0hBUEVfQ0xBU1MiLCJDT0xPUl9DTEFTUyIsIkpTX0NMQVNTIiwiUklQUExFX0VGRkVDVF9DTEFTUyIsInJlbmRlclByZXNzZWRCdXR0b24iLCJfcmVuZGVySWNvbiIsImNsYXNzTmFtZUljb24iLCJsYWJlbEljb24iLCJhcmlhSGlkZGVuIiwiZmFDc3MiLCJfcmVuZGVyTGFiZWwiLCJpMThuIiwicmVuZGVyIiwiY2xhc3NOYW1lIiwiZGlzYWJsZWQiLCJmb3JtTm9WYWxpZGF0ZSIsInN0eWxlIiwibm9BbHRBbmROb1RpdGxlIiwicmVzdCIsIm90aGVySW5wdXRQcm9wcyIsInJlbmRlcmVkQ2xhc3NOYW1lIiwidHJpbSIsImRpc3BsYXlOYW1lIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQUVBLElBQU1BLFNBQVMsZUFBZjtBQUNBLElBQU1DLFlBQVksWUFBbEI7QUFDQSxJQUFNQyxjQUFjLGNBQXBCO0FBQ0EsSUFBTUMsZ0JBQWdCLHNCQUF0Qjs7QUFFQSxJQUFNQyxZQUFZO0FBQ2RDLFdBQU8saUJBQVVDLEtBQVYsQ0FBZ0IsQ0FBQ0MsU0FBRCxFQUFZLFNBQVosRUFBdUIsU0FBdkIsRUFBa0MsUUFBbEMsQ0FBaEIsQ0FETztBQUVkQyxRQUFJLGlCQUFVQyxNQUZBO0FBR2RDLG1CQUFlLGlCQUFVQyxJQUhYLEVBR2lCO0FBQy9CQyxlQUFXLGlCQUFVQyxJQUpQO0FBS2RDLFVBQU0saUJBQVVELElBTEY7QUFNZEUsVUFBTSxpQkFBVU4sTUFORjtBQU9kTyxpQkFBYSxpQkFBVVYsS0FBVixDQUFnQixDQUFDLFVBQUQsRUFBYSxjQUFiLEVBQTZCLGFBQTdCLENBQWhCLENBUEM7QUFRZFcsV0FBTyxpQkFBVVIsTUFSSDtBQVNkUyxhQUFTLGlCQUFVUCxJQVRMO0FBVWRRLFdBQU8saUJBQVViLEtBQVYsQ0FBZ0IsQ0FBQ0MsU0FBRCxFQUFZLFFBQVosRUFBc0IsS0FBdEIsRUFBNkIsTUFBN0IsRUFBcUMsVUFBckMsQ0FBaEIsQ0FWTztBQVdkYSxVQUFNLGlCQUFVZCxLQUFWLENBQWdCLENBQUMsUUFBRCxFQUFXLFFBQVgsQ0FBaEI7QUFYUSxDQUFsQjs7QUFjQSxJQUFNZSxlQUFlO0FBQ2pCRCxVQUFNLFFBRFc7QUFFakJELFdBQU8sUUFGVTtBQUdqQkYsV0FBTyxFQUhVO0FBSWpCRixVQUFNLElBSlc7QUFLakJQLFFBQUksRUFMYTtBQU1qQkksZUFBVyxLQU5NO0FBT2pCRSxVQUFNLEtBUFc7QUFRakJFLGlCQUFhO0FBUkksQ0FBckI7O0lBYU1NLE0sV0FGTCx3QkFBWSxnQkFBWixFQUE4QixnQkFBOUIsQzs7Ozs7Ozs7O0FBSUc7OztxQkFHQUMsaUIsZ0NBQW9CO0FBQUEsWUFDVFgsU0FEUyxHQUNJLEtBQUtZLEtBRFQsQ0FDVFosU0FEUzs7QUFFaEIsWUFBTWEsVUFBVSxtQkFBU0MsV0FBVCxDQUFxQixLQUFLQyxJQUFMLENBQVUsZ0JBQVYsQ0FBckIsQ0FBaEI7QUFDQSxZQUFJZixTQUFKLEVBQWU7QUFDWGdCLDZCQUFpQkMsY0FBakIsQ0FBZ0NKLE9BQWhDLEVBQXlDLGdCQUF6QztBQUNIO0FBQ0osSzs7QUFFRDs7Ozs7O3FCQUlBSyxzQixxQ0FBeUI7QUFBQSxxQkFDbUIsS0FBS04sS0FEeEI7QUFBQSxZQUNkTCxLQURjLFVBQ2RBLEtBRGM7QUFBQSxZQUNQZCxLQURPLFVBQ1BBLEtBRE87QUFBQSxZQUNBTyxTQURBLFVBQ0FBLFNBREE7QUFBQSxZQUNXRSxJQURYLFVBQ1dBLElBRFg7O0FBRXJCLFlBQUlpQixvQkFBSjtBQUNBLGdCQUFRWixLQUFSO0FBQ0ksaUJBQUssUUFBTDtBQUNJWSw4QkFBaUI3QixXQUFqQjtBQUNBO0FBQ0osaUJBQUssS0FBTDtBQUNJNkIsOEJBQWlCN0IsV0FBakI7QUFDQTtBQUNKLGlCQUFLLE1BQUw7QUFDSTZCLDhCQUFpQjdCLFdBQWpCO0FBQ0E7QUFDSixpQkFBSyxVQUFMO0FBQ0k2Qiw4QkFBaUI3QixXQUFqQixpQkFBd0NBLFdBQXhDO0FBQ0E7QUFDSixpQkFBSyxJQUFMO0FBQ0k2Qiw4QkFBYyxFQUFkO0FBQ0E7QUFDSjtBQUNJQSw4QkFBYyxJQUFkO0FBQ0E7QUFsQlI7QUFvQkEsWUFBTUMsY0FBYzNCLGFBQVdILFdBQVgsR0FBeUJHLEtBQXpCLEdBQW1DLEVBQXZEO0FBQ0EsWUFBTTRCLFdBQVduQixPQUFPZCxNQUFQLEdBQWdCLEVBQWpDO0FBQ0EsWUFBTWtDLHNCQUFzQnRCLFlBQVlULGFBQVosR0FBNEIsRUFBeEQ7QUFDQSxlQUFVRixTQUFWLFNBQXVCK0IsV0FBdkIsU0FBc0NELFdBQXRDLFNBQXFERSxRQUFyRCxTQUFpRUMsbUJBQWpFO0FBQ0gsSzs7QUFFRDs7Ozs7O3FCQUlBQyxtQixrQ0FBc0I7QUFDbEIsZUFBUTtBQUFBO0FBQUE7QUFBQTtBQUFBLFNBQVI7QUFDSCxLOztBQUVEOzs7Ozs7cUJBSUFDLFcsMEJBQWM7QUFBQSxzQkFDd0QsS0FBS1osS0FEN0Q7QUFBQSxZQUNIVCxJQURHLFdBQ0hBLElBREc7QUFBQSxZQUNHQyxXQURILFdBQ0dBLFdBREg7QUFBQSxZQUNnQnFCLGFBRGhCLFdBQ2dCQSxhQURoQjtBQUFBLFlBQytCQyxTQUQvQixXQUMrQkEsU0FEL0I7QUFBQSxZQUMwQ0MsVUFEMUMsV0FDMENBLFVBRDFDOztBQUVWLGdCQUFRdkIsV0FBUjtBQUNJLGlCQUFLLFVBQUw7QUFDSSxvQkFBSXFCLGlCQUFpQkMsU0FBckIsRUFBZ0M7QUFDNUIsMkJBQ0k7QUFBQTtBQUFBO0FBQ0k7QUFBQTtBQUFBLDhCQUFNLFdBQVdELGFBQWpCO0FBQWlDQztBQUFqQyx5QkFESjtBQUVJO0FBQUE7QUFBQSw4QkFBRyxXQUFVLGdCQUFiO0FBQStCdkI7QUFBL0I7QUFGSixxQkFESjtBQU1IO0FBQ0QsdUJBQU87QUFBQTtBQUFBLHNCQUFHLFdBQVUsZ0JBQWIsRUFBOEIsZUFBYXdCLFVBQTNDO0FBQXdEeEI7QUFBeEQsaUJBQVA7QUFDSixpQkFBSyxjQUFMO0FBQ0ksb0JBQU15QixtQkFBaUJ6QixJQUF2QjtBQUNBLHVCQUFPLHFDQUFHLFdBQVd5QixLQUFkLEdBQVA7QUFDSixpQkFBSyxhQUFMO0FBQ0ksdUJBQU8sd0NBQU0scUJBQW1CekIsSUFBekIsR0FBUDtBQUNKO0FBQ0ksdUJBQU8sSUFBUDtBQWpCUjtBQW1CSCxLOztBQUVEOzs7O3FCQUlBMEIsWSwyQkFBZTtBQUFBLHNCQUNZLEtBQUtqQixLQURqQjtBQUFBLFlBQ0pQLEtBREksV0FDSkEsS0FESTtBQUFBLFlBQ0dFLEtBREgsV0FDR0EsS0FESDs7QUFFWCxZQUFJRixTQUFTLFVBQVVFLEtBQW5CLElBQTRCLFdBQVdBLEtBQXZDLElBQWdELGVBQWVBLEtBQW5FLEVBQTBFO0FBQ3RFLG1CQUFPLEtBQUt1QixJQUFMLENBQVV6QixLQUFWLENBQVA7QUFDSDtBQUNELGVBQU8sSUFBUDtBQUNILEs7O0FBRUQ7cUJBQ0EwQixNLHFCQUFTO0FBQ0w7QUFDQTtBQUZLLHNCQUd1SixLQUFLbkIsS0FINUo7QUFBQSxZQUdFb0IsU0FIRixXQUdFQSxTQUhGO0FBQUEsWUFHYUMsUUFIYixXQUdhQSxRQUhiO0FBQUEsWUFHdUJDLGNBSHZCLFdBR3VCQSxjQUh2QjtBQUFBLFlBR3VDcEMsYUFIdkMsV0FHdUNBLGFBSHZDO0FBQUEsWUFHc0RLLElBSHRELFdBR3NEQSxJQUh0RDtBQUFBLFlBRzREUCxFQUg1RCxXQUc0REEsRUFINUQ7QUFBQSxZQUdnRVUsT0FIaEUsV0FHZ0VBLE9BSGhFO0FBQUEsWUFHeUVFLElBSHpFLFdBR3lFQSxJQUh6RTtBQUFBLFlBRytFSCxLQUgvRSxXQUcrRUEsS0FIL0U7QUFBQSxZQUdzRjhCLEtBSHRGLFdBR3NGQSxLQUh0RjtBQUFBLFlBRzZGbkMsU0FIN0YsV0FHNkZBLFNBSDdGO0FBQUEsWUFHd0dFLElBSHhHLFdBR3dHQSxJQUh4RztBQUFBLFlBRzhHRSxXQUg5RyxXQUc4R0EsV0FIOUc7QUFBQSxZQUcySGdDLGVBSDNILFdBRzJIQSxlQUgzSDtBQUFBLFlBRytJQyxJQUgvSTs7QUFJTCxZQUFNQyw2QkFBb0JMLGtCQUFwQixFQUE4QkMsOEJBQTlCLEVBQThDNUIsU0FBU1IsZ0JBQWdCQSxhQUFoQixHQUFnQ1EsT0FBdkYsRUFBZ0c2QixZQUFoRyxFQUF1RzNCLFVBQXZHLElBQWdINkIsSUFBaEgsQ0FBTixDQUpLLENBSXlIO0FBQzlILFlBQU1FLG9CQUFvQixFQUFHUCxZQUFZQSxTQUFaLEdBQXdCLEVBQTNCLFVBQW1DLEtBQUtkLHNCQUFQLE1BQUUsSUFBRixDQUFqQyxFQUMzQnNCLElBRDJCLEVBQTFCO0FBRUEsWUFBR0osZUFBSCxFQUFtQjtBQUNmLG1CQUNBO0FBQUE7QUFBQSwyQkFBUSxXQUFXRyxpQkFBbkIsRUFBc0MsY0FBVyxlQUFqRCxFQUFpRSxJQUFJM0MsRUFBckUsSUFBNEUwQyxlQUE1RSxJQUE2RixLQUFJLGdCQUFqRztBQUN5Qm5DLHdCQUFVLEtBQUtxQixXQUFQLE1BQUUsSUFBRixDQURqQztBQUVPLHFCQUFLSyxZQUFQLE1BQUUsSUFBRjtBQUZMLGFBREE7QUFNSDtBQUNELGVBQ0k7QUFBQTtBQUFBLHVCQUFRLEtBQUssS0FBS0MsSUFBTCxDQUFVekIsS0FBVixDQUFiLEVBQStCLFdBQVdrQyxpQkFBMUMsRUFBNkQsY0FBVyxlQUF4RSxFQUF3RixJQUFJM0MsRUFBNUYsRUFBZ0csT0FBTyxLQUFLa0MsSUFBTCxDQUFVekIsS0FBVixDQUF2RyxJQUE2SGlDLGVBQTdILElBQThJLEtBQUksZ0JBQWxKO0FBQ3lCbkMsb0JBQVUsS0FBS3FCLFdBQVAsTUFBRSxJQUFGLENBRGpDO0FBRU8saUJBQUtLLFlBQVAsTUFBRSxJQUFGO0FBRkwsU0FESjtBQU1ILEs7Ozs7OztBQUdMbkIsT0FBTytCLFdBQVAsR0FBcUIsUUFBckI7QUFDQS9CLE9BQU9ELFlBQVAsR0FBc0JBLFlBQXRCO0FBQ0FDLE9BQU9sQixTQUFQLEdBQW1CQSxTQUFuQjs7a0JBRWVrQixNIiwiZmlsZSI6ImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQsIFByb3BUeXBlcyB9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IFJlYWN0RE9NIGZyb20gJ3JlYWN0LWRvbSc7XHJcbmltcG9ydCBNREJlaGF2aW91ciBmcm9tICcuLi8uLi9iZWhhdmlvdXJzL21hdGVyaWFsJztcclxuaW1wb3J0IFRyYW5zbGF0aW9uIGZyb20gJy4uLy4uL2JlaGF2aW91cnMvdHJhbnNsYXRpb24nO1xyXG5pbXBvcnQgQ29tcG9uZW50QmFzZUJlaGF2aW91ciBmcm9tICcuLi8uLi9iZWhhdmlvdXJzL2NvbXBvbmVudC1iYXNlJztcclxuXHJcbmNvbnN0IEJUTl9KUyA9ICdtZGwtanMtYnV0dG9uJztcclxuY29uc3QgQlROX0NMQVNTID0gJ21kbC1idXR0b24nO1xyXG5jb25zdCBCVVRUT05fUFJGWCA9ICdtZGwtYnV0dG9uLS0nO1xyXG5jb25zdCBSSVBQTEVfRUZGRUNUID0gJ21kbC1qcy1yaXBwbGUtZWZmZWN0JztcclxuXHJcbmNvbnN0IHByb3BUeXBlcyA9IHtcclxuICAgIGNvbG9yOiBQcm9wVHlwZXMub25lT2YoW3VuZGVmaW5lZCwgJ2NvbG9yZWQnLCAncHJpbWFyeScsICdhY2NlbnQnXSksXHJcbiAgICBpZDogUHJvcFR5cGVzLnN0cmluZyxcclxuICAgIGhhbmRsZU9uQ2xpY2s6IFByb3BUeXBlcy5mdW5jLCAvL3RvIHJlbW92ZSBpbiBWMlxyXG4gICAgaGFzUmlwcGxlOiBQcm9wVHlwZXMuYm9vbCxcclxuICAgIGlzSnM6IFByb3BUeXBlcy5ib29sLFxyXG4gICAgaWNvbjogUHJvcFR5cGVzLnN0cmluZyxcclxuICAgIGljb25MaWJyYXJ5OiBQcm9wVHlwZXMub25lT2YoWydtYXRlcmlhbCcsICdmb250LWF3ZXNvbWUnLCAnZm9udC1jdXN0b20nXSksXHJcbiAgICBsYWJlbDogUHJvcFR5cGVzLnN0cmluZyxcclxuICAgIG9uQ2xpY2s6IFByb3BUeXBlcy5mdW5jLFxyXG4gICAgc2hhcGU6IFByb3BUeXBlcy5vbmVPZihbdW5kZWZpbmVkLCAncmFpc2VkJywgJ2ZhYicsICdpY29uJywgJ21pbmktZmFiJ10pLFxyXG4gICAgdHlwZTogUHJvcFR5cGVzLm9uZU9mKFsnc3VibWl0JywgJ2J1dHRvbiddKVxyXG59XHJcblxyXG5jb25zdCBkZWZhdWx0UHJvcHMgPSB7XHJcbiAgICB0eXBlOiAnc3VibWl0JyxcclxuICAgIHNoYXBlOiAncmFpc2VkJyxcclxuICAgIGxhYmVsOiAnJyxcclxuICAgIGljb246IG51bGwsXHJcbiAgICBpZDogJycsXHJcbiAgICBoYXNSaXBwbGU6IGZhbHNlLFxyXG4gICAgaXNKczogZmFsc2UsXHJcbiAgICBpY29uTGlicmFyeTogJ21hdGVyaWFsJ1xyXG59XHJcblxyXG5ATURCZWhhdmlvdXIoJ21hdGVyaWFsQnV0dG9uJywgJ01hdGVyaWFsQnV0dG9uJylcclxuQFRyYW5zbGF0aW9uXHJcbmNsYXNzIEJ1dHRvbiBleHRlbmRzIENvbXBvbmVudCB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAqIENhbGxlZCB3aGVuIGNvbXBvbmVudCBpcyBtb3VudGVkLlxyXG4gICAgKi9cclxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xyXG4gICAgICAgIGNvbnN0IHtoYXNSaXBwbGV9ID0gdGhpcy5wcm9wcztcclxuICAgICAgICBjb25zdCByZWZOb2RlID0gUmVhY3RET00uZmluZERPTU5vZGUodGhpcy5yZWZzWydtYXRlcmlhbEJ1dHRvbiddKTtcclxuICAgICAgICBpZiAoaGFzUmlwcGxlKSB7XHJcbiAgICAgICAgICAgIGNvbXBvbmVudEhhbmRsZXIudXBncmFkZUVsZW1lbnQocmVmTm9kZSwgJ01hdGVyaWFsUmlwcGxlJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgKiBEYXRlIGRlIGNvbXBvc2FudC5cclxuICAgICogQHJldHVybiB7c3RyaW5nfSBDbGFzc2UuXHJcbiAgICAqL1xyXG4gICAgX2dldENvbXBvbmVudENsYXNzTmFtZSgpIHtcclxuICAgICAgICBjb25zdCB7c2hhcGUsIGNvbG9yLCBoYXNSaXBwbGUsIGlzSnN9ID0gdGhpcy5wcm9wcztcclxuICAgICAgICBsZXQgU0hBUEVfQ0xBU1M7XHJcbiAgICAgICAgc3dpdGNoIChzaGFwZSkge1xyXG4gICAgICAgICAgICBjYXNlICdyYWlzZWQnOlxyXG4gICAgICAgICAgICAgICAgU0hBUEVfQ0xBU1MgPSBgJHtCVVRUT05fUFJGWH1yYWlzZWRgO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ2ZhYic6XHJcbiAgICAgICAgICAgICAgICBTSEFQRV9DTEFTUyA9IGAke0JVVFRPTl9QUkZYfWZhYmA7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnaWNvbic6XHJcbiAgICAgICAgICAgICAgICBTSEFQRV9DTEFTUyA9IGAke0JVVFRPTl9QUkZYfWljb25gO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ21pbmktZmFiJzpcclxuICAgICAgICAgICAgICAgIFNIQVBFX0NMQVNTID0gYCR7QlVUVE9OX1BSRlh9bWluaS1mYWIgJHtCVVRUT05fUFJGWH1mYWJgO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgbnVsbDpcclxuICAgICAgICAgICAgICAgIFNIQVBFX0NMQVNTID0gJyc7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIFNIQVBFX0NMQVNTID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBDT0xPUl9DTEFTUyA9IGNvbG9yID8gYCR7QlVUVE9OX1BSRlh9JHtjb2xvcn1gIDogJyc7XHJcbiAgICAgICAgY29uc3QgSlNfQ0xBU1MgPSBpc0pzID8gQlROX0pTIDogJyc7XHJcbiAgICAgICAgY29uc3QgUklQUExFX0VGRkVDVF9DTEFTUyA9IGhhc1JpcHBsZSA/IFJJUFBMRV9FRkZFQ1QgOiAnJztcclxuICAgICAgICByZXR1cm4gYCR7QlROX0NMQVNTfSAke0NPTE9SX0NMQVNTfSAke1NIQVBFX0NMQVNTfSAke0pTX0NMQVNTfSAke1JJUFBMRV9FRkZFQ1RfQ0xBU1N9YDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICogUmVuZGVyIHRoZSBwcmVzc2VkIGJ1dHRvbi5cclxuICAgICogQHJldHVybiB7Q29tcG9uZW50fSAtIENvbXBvbmVudCBidXR0b24uXHJcbiAgICAqL1xyXG4gICAgcmVuZGVyUHJlc3NlZEJ1dHRvbigpIHtcclxuICAgICAgICByZXR1cm4gKDxidXR0b24+TG9hZGluZy4uLjwvYnV0dG9uPik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAqIFJlbmRlciBhbiBpY29uLlxyXG4gICAgKiBAcmV0dXJuIHtDb21wb25lbnR9IC0gQ29tcG9zYW50IGljb25lLlxyXG4gICAgKi9cclxuICAgIF9yZW5kZXJJY29uKCkge1xyXG4gICAgICAgIGNvbnN0IHtpY29uLCBpY29uTGlicmFyeSwgY2xhc3NOYW1lSWNvbiwgbGFiZWxJY29uLCBhcmlhSGlkZGVufSA9IHRoaXMucHJvcHM7XHJcbiAgICAgICAgc3dpdGNoIChpY29uTGlicmFyeSkge1xyXG4gICAgICAgICAgICBjYXNlICdtYXRlcmlhbCc6XHJcbiAgICAgICAgICAgICAgICBpZiAoY2xhc3NOYW1lSWNvbiAmJiBsYWJlbEljb24pIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPXtjbGFzc05hbWVJY29ufT57bGFiZWxJY29ufTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzTmFtZT0nbWF0ZXJpYWwtaWNvbnMnPntpY29ufTwvaT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIDxpIGNsYXNzTmFtZT0nbWF0ZXJpYWwtaWNvbnMnIGFyaWEtaGlkZGVuPXthcmlhSGlkZGVufT57aWNvbn08L2k+O1xyXG4gICAgICAgICAgICBjYXNlICdmb250LWF3ZXNvbWUnOlxyXG4gICAgICAgICAgICAgICAgY29uc3QgZmFDc3MgPSBgZmEgZmEtJHtpY29ufWA7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gPGkgY2xhc3NOYW1lPXtmYUNzc30+PC9pPjtcclxuICAgICAgICAgICAgY2FzZSAnZm9udC1jdXN0b20nOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIDxzcGFuIGNsYXNzTmFtZT17YGljb24tJHtpY29ufWB9Pjwvc3Bhbj47XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgKiBSZW5kZXIgdGhlIGxhYmVsLlxyXG4gICAgKiBAcmV0dXJuIHtDb21wb25lbnR9IC0gVGxlIGJ1dHRvbiBsYWJlbC5cclxuICAgICovXHJcbiAgICBfcmVuZGVyTGFiZWwoKSB7XHJcbiAgICAgICAgY29uc3Qge2xhYmVsLCBzaGFwZX0gPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIGlmIChsYWJlbCAmJiAnZmFiJyAhPT0gc2hhcGUgJiYgJ2ljb24nICE9PSBzaGFwZSAmJiAnbWluaS1mYWInICE9PSBzaGFwZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5pMThuKGxhYmVsKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKiBpbmhlcml0ZWREb2MgKi9cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICAvLyBhdHRyaWJ1dGUgZG9jIDogaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZnIvZG9jcy9XZWIvSFRNTC9FbGVtZW50L0J1dHRvblxyXG4gICAgICAgIC8vIGJlIGNhcmVmdWwgdGhlIHdheSB5b3UgZGVjbGFyZSB5b3VyIGF0dHJpYnV0ZSBuYW1lcyA6IGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2ZyL2RvY3MvV2ViL0hUTUwvRWxlbWVudC9CdXR0b25cclxuICAgICAgICBjb25zdCB7Y2xhc3NOYW1lLCBkaXNhYmxlZCwgZm9ybU5vVmFsaWRhdGUsIGhhbmRsZU9uQ2xpY2ssIGljb24sIGlkLCBvbkNsaWNrLCB0eXBlLCBsYWJlbCwgc3R5bGUsIGhhc1JpcHBsZSwgaXNKcywgaWNvbkxpYnJhcnksIG5vQWx0QW5kTm9UaXRsZSwgLi4ucmVzdH0gPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIGNvbnN0IG90aGVySW5wdXRQcm9wcyA9IHsgZGlzYWJsZWQsIGZvcm1Ob1ZhbGlkYXRlLCBvbkNsaWNrOiBoYW5kbGVPbkNsaWNrID8gaGFuZGxlT25DbGljayA6IG9uQ2xpY2ssIHN0eWxlLCB0eXBlLCAuLi5yZXN0IH07IC8vb24gY2xpY2sgZm9yIGxlZ2FjeS4gUmVtb3ZlIGhhbmRsZU9uQ2xpY2sgaW4gdjJcclxuICAgICAgICBjb25zdCByZW5kZXJlZENsYXNzTmFtZSA9IGAke2NsYXNzTmFtZSA/IGNsYXNzTmFtZSA6ICcnfSAkezo6dGhpcy5fZ2V0Q29tcG9uZW50Q2xhc3NOYW1lKClcclxuICAgIH1gLnRyaW0oKTtcclxuICAgICAgICBpZihub0FsdEFuZE5vVGl0bGUpe1xyXG4gICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT17cmVuZGVyZWRDbGFzc05hbWV9IGRhdGEtZm9jdXM9J2J1dHRvbi1hY3Rpb24nIGlkPXtpZH17Li4ub3RoZXJJbnB1dFByb3BzfSByZWY9J21hdGVyaWFsQnV0dG9uJz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge2ljb24gJiYgOjp0aGlzLl9yZW5kZXJJY29uKCl9XHJcbiAgICAgICAgICAgICAgICB7Ojp0aGlzLl9yZW5kZXJMYWJlbCgpfVxyXG4gICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8YnV0dG9uIGFsdD17dGhpcy5pMThuKGxhYmVsKX0gY2xhc3NOYW1lPXtyZW5kZXJlZENsYXNzTmFtZX0gZGF0YS1mb2N1cz0nYnV0dG9uLWFjdGlvbicgaWQ9e2lkfSB0aXRsZT17dGhpcy5pMThuKGxhYmVsKX0gey4uLm90aGVySW5wdXRQcm9wc30gcmVmPSdtYXRlcmlhbEJ1dHRvbic+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtpY29uICYmIDo6dGhpcy5fcmVuZGVySWNvbigpfVxyXG4gICAgICAgICAgICAgICAgezo6dGhpcy5fcmVuZGVyTGFiZWwoKX1cclxuICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgIH1cclxufVxyXG5cclxuQnV0dG9uLmRpc3BsYXlOYW1lID0gJ0J1dHRvbidcclxuQnV0dG9uLmRlZmF1bHRQcm9wcyA9IGRlZmF1bHRQcm9wcztcclxuQnV0dG9uLnByb3BUeXBlcyA9IHByb3BUeXBlcztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEJ1dHRvbjtcclxuIl19