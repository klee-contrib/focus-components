'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _builder = require('focus-core/component/builder');

var _builder2 = _interopRequireDefault(_builder);

var _translation = require('focus-core/translation');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var stylableMixin = require('../../../mixin/stylable');

var BTN_JS = 'mdl-js-button';
var BTN_CLASS = 'mdl-button';
var BUTTON_PRFX = 'mdl-button--';
var RIPPLE_EFFECT = 'mdl-js-ripple-effect';

var materialBehaviour = require('../../mixin/mdl-behaviour');

var propTypes = {
    id: _react.PropTypes.string,
    label: _react.PropTypes.string,
    handleOnClick: _react.PropTypes.func,
    type: _react.PropTypes.oneOf(['submit', 'button']),
    shape: _react.PropTypes.oneOf([undefined, 'raised', 'fab', 'icon', 'mini-fab']),
    color: _react.PropTypes.oneOf([undefined, 'colored', 'primary', 'accent']),
    hasRipple: _react.PropTypes.bool,
    isJs: _react.PropTypes.bool,
    icon: _react.PropTypes.string,
    iconLibrary: _react.PropTypes.oneOf(['material', 'font-awesome', 'font-custom'])
};

/**
* Mixin button.
* @type {Object}
*/
var buttonMixin = {
    /** inheritedDoc */
    mixins: [stylableMixin, materialBehaviour],
    displayName: 'Button',
    componentWillMount: function componentWillMount() {
        console.warn('FocusComponents v0.15: the \'Button\' component from FocusComponents.common is deprecated, please use FocusComponents.components.Button');
    },

    /** inheritedDoc */
    getDefaultProps: function getDefaultProps() {
        return {
            type: 'submit',
            shape: 'raised',
            label: '',
            icon: null,
            id: '',
            hasRipple: false,
            isJs: false,
            iconLibrary: 'material'
        };
    },

    propTypes: propTypes,
    /**
    * Handle click event.
    * @return {Object} - Action call.
    */
    handleOnClick: function handleOnClick() {
        var handleOnClick = this.props.handleOnClick;

        if (handleOnClick) {
            return handleOnClick.apply(this, arguments);
        }
    },

    /**
    * Date de composant.
    * @return {string} Classe.
    */
    _getComponentClassName: function _getComponentClassName() {
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
            default:
                SHAPE_CLASS = null;
                break;
        }
        var COLOR_CLASS = color ? '' + BUTTON_PRFX + color : '';
        var JS_CLASS = isJs ? BTN_JS : '';
        var RIPPLE_EFFECT_CLASS = hasRipple ? RIPPLE_EFFECT : '';
        return BTN_CLASS + ' ' + COLOR_CLASS + ' ' + SHAPE_CLASS + ' ' + JS_CLASS + ' ' + RIPPLE_EFFECT_CLASS;
    },

    /**
    * Render the pressed button.
    * @return {Component} - Component button.
    */
    renderPressedButton: function renderPressedButton() {
        return _react2.default.createElement(
            'button',
            null,
            'Loading...'
        );
    },

    /**
    * Render an icon.
    * @return {Component} - Composant icone.
    */
    _renderIcon: function _renderIcon() {
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
    },

    /**
    * Render the label.
    * @return {Component} - Tle button label.
    */
    _renderLabel: function _renderLabel() {
        var _props3 = this.props,
            label = _props3.label,
            shape = _props3.shape;

        if (label && 'fab' !== shape && 'icon' !== shape && 'mini-fab' !== shape) {
            return (0, _translation.translate)(label);
        }
        return null;
    },

    /** inheritedDoc */
    render: function render() {
        var _props4 = this.props,
            className = _props4.className,
            icon = _props4.icon,
            id = _props4.id,
            type = _props4.type,
            label = _props4.label,
            style = _props4.style,
            otherProps = _objectWithoutProperties(_props4, ['className', 'icon', 'id', 'type', 'label', 'style']);

        return _react2.default.createElement(
            'button',
            _extends({ alt: (0, _translation.translate)(label), className: className + ' ' + this._getComponentClassName(), 'data-focus': 'button-action', id: id, onClick: this.handleOnClick, title: (0, _translation.translate)(label), type: type }, otherProps),
            icon && this._renderIcon(),
            this._renderLabel()
        );
    }
};

module.exports = (0, _builder2.default)(buttonMixin);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJzdHlsYWJsZU1peGluIiwicmVxdWlyZSIsIkJUTl9KUyIsIkJUTl9DTEFTUyIsIkJVVFRPTl9QUkZYIiwiUklQUExFX0VGRkVDVCIsIm1hdGVyaWFsQmVoYXZpb3VyIiwicHJvcFR5cGVzIiwiaWQiLCJzdHJpbmciLCJsYWJlbCIsImhhbmRsZU9uQ2xpY2siLCJmdW5jIiwidHlwZSIsIm9uZU9mIiwic2hhcGUiLCJ1bmRlZmluZWQiLCJjb2xvciIsImhhc1JpcHBsZSIsImJvb2wiLCJpc0pzIiwiaWNvbiIsImljb25MaWJyYXJ5IiwiYnV0dG9uTWl4aW4iLCJtaXhpbnMiLCJkaXNwbGF5TmFtZSIsImNvbXBvbmVudFdpbGxNb3VudCIsImNvbnNvbGUiLCJ3YXJuIiwiZ2V0RGVmYXVsdFByb3BzIiwicHJvcHMiLCJhcHBseSIsImFyZ3VtZW50cyIsIl9nZXRDb21wb25lbnRDbGFzc05hbWUiLCJTSEFQRV9DTEFTUyIsIkNPTE9SX0NMQVNTIiwiSlNfQ0xBU1MiLCJSSVBQTEVfRUZGRUNUX0NMQVNTIiwicmVuZGVyUHJlc3NlZEJ1dHRvbiIsIl9yZW5kZXJJY29uIiwiZmFDc3MiLCJfcmVuZGVyTGFiZWwiLCJyZW5kZXIiLCJjbGFzc05hbWUiLCJzdHlsZSIsIm90aGVyUHJvcHMiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7QUFDQSxJQUFNQSxnQkFBZ0JDLFFBQVEseUJBQVIsQ0FBdEI7O0FBRUEsSUFBTUMsU0FBUyxlQUFmO0FBQ0EsSUFBTUMsWUFBWSxZQUFsQjtBQUNBLElBQU1DLGNBQWMsY0FBcEI7QUFDQSxJQUFNQyxnQkFBZ0Isc0JBQXRCOztBQUVBLElBQU1DLG9CQUFvQkwsUUFBUSwyQkFBUixDQUExQjs7QUFFQSxJQUFNTSxZQUFZO0FBQ2RDLFFBQUksaUJBQVVDLE1BREE7QUFFZEMsV0FBTyxpQkFBVUQs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VUQsS0FBVixDQUFsSyxFQUFvTCxNQUFNRyxJQUExTCxJQUFvTWdDLFVBQXBNO0FBQ0t4QixvQkFBUSxLQUFLa0IsV0FBTCxFQURiO0FBRUssaUJBQUtFLFlBQUw7QUFGTCxTQURKO0FBTUg7QUF6R2UsQ0FBcEI7O0FBNEdBSyxPQUFPQyxPQUFQLEdBQWlCLHVCQUFReEIsV0FBUixDQUFqQiIsImZpbGUiOiJpcy1yZWFjdC1jbGFzcy1jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtQcm9wVHlwZXN9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IGJ1aWxkZXIgZnJvbSAnZm9jdXMtY29yZS9jb21wb25lbnQvYnVpbGRlcic7XHJcbmltcG9ydCB7dHJhbnNsYXRlfSBmcm9tICdmb2N1cy1jb3JlL3RyYW5zbGF0aW9uJztcclxuY29uc3Qgc3R5bGFibGVNaXhpbiA9IHJlcXVpcmUoJy4uLy4uLy4uL21peGluL3N0eWxhYmxlJyk7XHJcblxyXG5jb25zdCBCVE5fSlMgPSAnbWRsLWpzLWJ1dHRvbic7XHJcbmNvbnN0IEJUTl9DTEFTUyA9ICdtZGwtYnV0dG9uJztcclxuY29uc3QgQlVUVE9OX1BSRlggPSAnbWRsLWJ1dHRvbi0tJztcclxuY29uc3QgUklQUExFX0VGRkVDVCA9ICdtZGwtanMtcmlwcGxlLWVmZmVjdCc7XHJcblxyXG5jb25zdCBtYXRlcmlhbEJlaGF2aW91ciA9IHJlcXVpcmUoJy4uLy4uL21peGluL21kbC1iZWhhdmlvdXInKTtcclxuXHJcbmNvbnN0IHByb3BUeXBlcyA9IHtcclxuICAgIGlkOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG4gICAgbGFiZWw6IFByb3BUeXBlcy5zdHJpbmcsXHJcbiAgICBoYW5kbGVPbkNsaWNrOiBQcm9wVHlwZXMuZnVuYyxcclxuICAgIHR5cGU6IFByb3BUeXBlcy5vbmVPZihbJ3N1Ym1pdCcsICdidXR0b24nXSksXHJcbiAgICBzaGFwZTogUHJvcFR5cGVzLm9uZU9mKFt1bmRlZmluZWQsICdyYWlzZWQnLCAnZmFiJywgJ2ljb24nLCAnbWluaS1mYWInXSksXHJcbiAgICBjb2xvcjogUHJvcFR5cGVzLm9uZU9mKFt1bmRlZmluZWQsJ2NvbG9yZWQnLCAncHJpbWFyeScsICdhY2NlbnQnXSksXHJcbiAgICBoYXNSaXBwbGU6IFByb3BUeXBlcy5ib29sLFxyXG4gICAgaXNKczogUHJvcFR5cGVzLmJvb2wsXHJcbiAgICBpY29uOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG4gICAgaWNvbkxpYnJhcnk6IFByb3BUeXBlcy5vbmVPZihbJ21hdGVyaWFsJywgJ2ZvbnQtYXdlc29tZScsICdmb250LWN1c3RvbSddKVxyXG59O1xyXG5cclxuLyoqXHJcbiogTWl4aW4gYnV0dG9uLlxyXG4qIEB0eXBlIHtPYmplY3R9XHJcbiovXHJcbmNvbnN0IGJ1dHRvbk1peGluID0ge1xyXG4gICAgLyoqIGluaGVyaXRlZERvYyAqL1xyXG4gICAgbWl4aW5zOiBbc3R5bGFibGVNaXhpbiwgbWF0ZXJpYWxCZWhhdmlvdXJdLFxyXG4gICAgZGlzcGxheU5hbWU6ICdCdXR0b24nLFxyXG4gICAgY29tcG9uZW50V2lsbE1vdW50ICgpIHtcclxuICAgICAgICBjb25zb2xlLndhcm4oJ0ZvY3VzQ29tcG9uZW50cyB2MC4xNTogdGhlIFxcJ0J1dHRvblxcJyBjb21wb25lbnQgZnJvbSBGb2N1c0NvbXBvbmVudHMuY29tbW9uIGlzIGRlcHJlY2F0ZWQsIHBsZWFzZSB1c2UgRm9jdXNDb21wb25lbnRzLmNvbXBvbmVudHMuQnV0dG9uJyk7XHJcbiAgICB9LFxyXG4gICAgLyoqIGluaGVyaXRlZERvYyAqL1xyXG4gICAgZ2V0RGVmYXVsdFByb3BzKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHR5cGU6ICdzdWJtaXQnLFxyXG4gICAgICAgICAgICBzaGFwZTogJ3JhaXNlZCcsXHJcbiAgICAgICAgICAgIGxhYmVsOiAnJyxcclxuICAgICAgICAgICAgaWNvbjogbnVsbCxcclxuICAgICAgICAgICAgaWQ6ICcnLFxyXG4gICAgICAgICAgICBoYXNSaXBwbGU6IGZhbHNlLFxyXG4gICAgICAgICAgICBpc0pzOiBmYWxzZSxcclxuICAgICAgICAgICAgaWNvbkxpYnJhcnk6ICdtYXRlcmlhbCdcclxuICAgICAgICB9O1xyXG4gICAgfSxcclxuICAgIHByb3BUeXBlczogcHJvcFR5cGVzLFxyXG4gICAgLyoqXHJcbiAgICAqIEhhbmRsZSBjbGljayBldmVudC5cclxuICAgICogQHJldHVybiB7T2JqZWN0fSAtIEFjdGlvbiBjYWxsLlxyXG4gICAgKi9cclxuICAgIGhhbmRsZU9uQ2xpY2soKSB7XHJcbiAgICAgICAgY29uc3Qge2hhbmRsZU9uQ2xpY2t9ID0gdGhpcy5wcm9wcztcclxuICAgICAgICBpZiAoaGFuZGxlT25DbGljaykge1xyXG4gICAgICAgICAgICByZXR1cm4gaGFuZGxlT25DbGljay5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICAvKipcclxuICAgICogRGF0ZSBkZSBjb21wb3NhbnQuXHJcbiAgICAqIEByZXR1cm4ge3N0cmluZ30gQ2xhc3NlLlxyXG4gICAgKi9cclxuICAgIF9nZXRDb21wb25lbnRDbGFzc05hbWUoKSB7XHJcbiAgICAgICAgY29uc3Qge3NoYXBlLCBjb2xvciwgaGFzUmlwcGxlLCBpc0pzfSA9IHRoaXMucHJvcHM7XHJcbiAgICAgICAgbGV0IFNIQVBFX0NMQVNTO1xyXG4gICAgICAgIHN3aXRjaCAoc2hhcGUpIHtcclxuICAgICAgICAgICAgY2FzZSAncmFpc2VkJzpcclxuICAgICAgICAgICAgU0hBUEVfQ0xBU1MgPSBgJHtCVVRUT05fUFJGWH1yYWlzZWRgO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnZmFiJzpcclxuICAgICAgICAgICAgU0hBUEVfQ0xBU1MgPSBgJHtCVVRUT05fUFJGWH1mYWJgO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnaWNvbic6XHJcbiAgICAgICAgICAgIFNIQVBFX0NMQVNTID0gYCR7QlVUVE9OX1BSRlh9aWNvbmA7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdtaW5pLWZhYic6XHJcbiAgICAgICAgICAgIFNIQVBFX0NMQVNTID0gYCR7QlVUVE9OX1BSRlh9bWluaS1mYWIgJHtCVVRUT05fUFJGWH1mYWJgO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgU0hBUEVfQ0xBU1MgPSBudWxsO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgQ09MT1JfQ0xBU1MgPSBjb2xvciA/IGAke0JVVFRPTl9QUkZYfSR7Y29sb3J9YCA6ICcnO1xyXG4gICAgICAgIGNvbnN0IEpTX0NMQVNTID0gaXNKcyA/IEJUTl9KUyA6ICcnO1xyXG4gICAgICAgIGNvbnN0IFJJUFBMRV9FRkZFQ1RfQ0xBU1MgPSBoYXNSaXBwbGUgPyBSSVBQTEVfRUZGRUNUIDogJyc7XHJcbiAgICAgICAgcmV0dXJuIGAke0JUTl9DTEFTU30gJHtDT0xPUl9DTEFTU30gJHtTSEFQRV9DTEFTU30gJHtKU19DTEFTU30gJHtSSVBQTEVfRUZGRUNUX0NMQVNTfWA7XHJcbiAgICB9LFxyXG4gICAgLyoqXHJcbiAgICAqIFJlbmRlciB0aGUgcHJlc3NlZCBidXR0b24uXHJcbiAgICAqIEByZXR1cm4ge0NvbXBvbmVudH0gLSBDb21wb25lbnQgYnV0dG9uLlxyXG4gICAgKi9cclxuICAgIHJlbmRlclByZXNzZWRCdXR0b24gKCkge1xyXG4gICAgICAgIHJldHVybiAoPGJ1dHRvbj5Mb2FkaW5nLi4uPC9idXR0b24+KTtcclxuICAgIH0sXHJcbiAgICAvKipcclxuICAgICogUmVuZGVyIGFuIGljb24uXHJcbiAgICAqIEByZXR1cm4ge0NvbXBvbmVudH0gLSBDb21wb3NhbnQgaWNvbmUuXHJcbiAgICAqL1xyXG4gICAgX3JlbmRlckljb24oKSB7XHJcbiAgICAgICAgY29uc3Qge2ljb24sIGljb25MaWJyYXJ5fSA9IHRoaXMucHJvcHM7XHJcbiAgICAgICAgc3dpdGNoIChpY29uTGlicmFyeSkge1xyXG4gICAgICAgICAgICBjYXNlICdtYXRlcmlhbCc6XHJcbiAgICAgICAgICAgIHJldHVybiA8aSBjbGFzc05hbWU9J21hdGVyaWFsLWljb25zJz57aWNvbn08L2k+O1xyXG4gICAgICAgICAgICBjYXNlICdmb250LWF3ZXNvbWUnOlxyXG4gICAgICAgICAgICBjb25zdCBmYUNzcyA9IGBmYSBmYS0ke2ljb259YDtcclxuICAgICAgICAgICAgcmV0dXJuIDxpIGNsYXNzTmFtZT17ZmFDc3N9PjwvaT47XHJcbiAgICAgICAgICAgIGNhc2UgJ2ZvbnQtY3VzdG9tJzpcclxuICAgICAgICAgICAgcmV0dXJuIDxzcGFuIGNsYXNzTmFtZT17YGljb24tJHtpY29ufWB9Pjwvc3Bhbj47XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICAvKipcclxuICAgICogUmVuZGVyIHRoZSBsYWJlbC5cclxuICAgICogQHJldHVybiB7Q29tcG9uZW50fSAtIFRsZSBidXR0b24gbGFiZWwuXHJcbiAgICAqL1xyXG4gICAgX3JlbmRlckxhYmVsICgpIHtcclxuICAgICAgICBjb25zdCB7bGFiZWwsIHNoYXBlfSA9IHRoaXMucHJvcHM7XHJcbiAgICAgICAgaWYgKGxhYmVsICYmICdmYWInICE9PSBzaGFwZSAmJiAnaWNvbicgIT09IHNoYXBlICYmICdtaW5pLWZhYicgIT09IHNoYXBlICkge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJhbnNsYXRlKGxhYmVsKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9LFxyXG4gICAgLyoqIGluaGVyaXRlZERvYyAqL1xyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIGNvbnN0IHtjbGFzc05hbWUsIGljb24sIGlkLCB0eXBlLCBsYWJlbCwgc3R5bGUsIC4uLm90aGVyUHJvcHN9ID0gdGhpcy5wcm9wcztcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8YnV0dG9uIGFsdD17dHJhbnNsYXRlKGxhYmVsKX0gY2xhc3NOYW1lPXtgJHtjbGFzc05hbWV9ICR7dGhpcy5fZ2V0Q29tcG9uZW50Q2xhc3NOYW1lKCl9YH0gZGF0YS1mb2N1cz0nYnV0dG9uLWFjdGlvbicgaWQ9e2lkfSBvbkNsaWNrPXt0aGlzLmhhbmRsZU9uQ2xpY2t9IHRpdGxlPXt0cmFuc2xhdGUobGFiZWwpfSB0eXBlPXt0eXBlfSB7Li4ub3RoZXJQcm9wc30+XHJcbiAgICAgICAgICAgICAgICB7aWNvbiAmJiB0aGlzLl9yZW5kZXJJY29uKCl9XHJcbiAgICAgICAgICAgICAgICB7dGhpcy5fcmVuZGVyTGFiZWwoKX1cclxuICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gYnVpbGRlcihidXR0b25NaXhpbik7XHJcbiJdfQ==