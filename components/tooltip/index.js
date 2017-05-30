'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _dec, _class; //dependencies


var _react = require('react');

var _react2 = _interopRequireDefault(_react);

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

/**
 * Component's props
 */
var propTypes = {
    position: _react.PropTypes.oneOf(['top', 'left', 'bottom', 'right']),
    isLarge: _react.PropTypes.bool,
    label: _react.PropTypes.string.isRequired,
    htmlFor: _react.PropTypes.string.isRequired
};

/**
 * Component default Props
 */
var defaultProps = {
    position: 'bottom',
    isLarge: false
};

/**
* Tooltip Component.
*/
var Tooltip = (_dec = (0, _material2.default)('materialTooltip'), _dec(_class = (0, _translation2.default)(_class = function (_PureComponent) {
    _inherits(Tooltip, _PureComponent);

    function Tooltip() {
        var _temp, _this, _ret;

        _classCallCheck(this, Tooltip);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, _PureComponent.call.apply(_PureComponent, [this].concat(args))), _this), _this.buildClassname = function () {
            var _this$props = _this.props,
                isLarge = _this$props.isLarge,
                position = _this$props.position;

            var tooltipLarge = isLarge === true ? ' mdl-tooltip--large' : '';
            return 'mdl-tooltip mdl-tooltip--' + position + tooltipLarge;
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    /**
     * Builds the tooltip's className
     * @return {string} The built classname
     */


    Tooltip.prototype.render = function render() {
        var _props = this.props,
            label = _props.label,
            className = _props.className,
            htmlFor = _props.htmlFor,
            others = _objectWithoutProperties(_props, ['label', 'className', 'htmlFor']);

        var renderedClassName = '' + (className ? className : '') + this.buildClassname();
        var tooltipProps = _extends({}, (0, _filterHtmlAttributes2.default)(others), { htmlFor: htmlFor, className: renderedClassName });

        return _react2.default.createElement(
            'div',
            _extends({ 'data-focus': 'tooltip', ref: 'materialTooltip' }, tooltipProps),
            _react2.default.createElement(
                'span',
                { className: 'tooltip-text' },
                this.i18n(label)
            )
        );
    };

    return Tooltip;
}(_react.PureComponent)) || _class) || _class);


Tooltip.displayName = 'Tooltip';
Tooltip.propTypes = propTypes;
Tooltip.defaultProps = defaultProps;

exports.default = Tooltip;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJwcm9wVHlwZXMiLCJwb3NpdGlvbiIsIm9uZU9mIiwiaXNMYXJnZSIsImJvb2wiLCJsYWJlbCIsInN0cmluZyIsImlzUmVxdWlyZWQiLCJodG1sRm9yIiwiZGVmYXVsdFByb3BzIiwiVG9vbHRpcCIsImJ1aWxkQ2xhc3NuYW1lIiwicHJvcHMiLCJ0b29sdGlwTGFyZ2UiLCJyZW5kZXIiLCJjbGFzc05hbWUiLCJvdGhlcnMiLCJyZW5kZXJlZENsYXNzTmFtZSIsInRvb2x0aXBQcm9wcyIsImkxOG4iLCJkaXNwbGF5TmFtZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7a0JBQUE7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FBQ0E7OztBQUdBLElBQU1BLFlBQVk7QUFDZEMsY0FBVSxpQkFBVUMsS0FBVixDQUFnQixDQUFDLEtBQUQsRUFBUSxNQUFSLEVBQWdCLFFBQWhCLEVBQTBCLE9BQTFCLENBQWhCLENBREk7QUFFZEMsYUFBUyxpQkFBVUMsSUFGTDtBQUdkQyxXQUFPLGlCQUFVQyxNQUFWLENBQWlCQyxVQUhWO0FBSWRDLGFBQVMsaUJBQVVGLE1BQVYsQ0FBaUJDO0FBSlosQ0FBbEI7O0FBT0E7OztBQUdBLElBQU1FLGVBQWU7QUFDakJSLGNBQVUsUUFETztBQUVqQkUsYUFBUztBQUZRLENBQXJCOztBQUtBOzs7SUFLTU8sTyxXQUZMLHdCQUFZLGlCQUFaLEM7Ozs7Ozs7Ozs7Ozt3SkFRR0MsYyxHQUFpQixZQUFNO0FBQUEsOEJBQ1MsTUFBS0MsS0FEZDtBQUFBLGdCQUNaVCxPQURZLGVBQ1pBLE9BRFk7QUFBQSxnQkFDSEYsUUFERyxlQUNIQSxRQURHOztBQUVuQixnQkFBSVksZUFBZVYsWUFBWSxJQUFaLEdBQW1CLHFCQUFuQixHQUEyQyxFQUE5RDtBQUNBLGlEQUFtQ0YsUUFBbkMsR0FBOENZLFlBQTlDO0FBQ0gsUzs7O0FBUkQ7Ozs7OztzQkFVQUMsTSxxQkFBUztBQUFBLHFCQUMwQyxLQUFLRixLQUQvQztBQUFBLFlBQ0VQLEtBREYsVUFDRUEsS0FERjtBQUFBLFlBQ1NVLFNBRFQsVUFDU0EsU0FEVDtBQUFBLFlBQ29CUCxPQURwQixVQUNvQkEsT0FEcEI7QUFBQSxZQUNnQ1EsTUFEaEM7O0FBRUwsWUFBTUMsMEJBQXVCRixZQUFZQSxTQUFaLEdBQXdCLEVBQS9DLElBQW9ELEtBQUtKLGNBQUwsRUFBMUQ7QUFDQSxZQUFNTyw0QkFBb0Isb0NBQVlGLE1BQVosQ0FBcEIsSUFBeUNSLGdCQUF6QyxFQUFrRE8sV0FBV0UsaUJBQTdELEdBQU47O0FBRUEsZUFDSTtBQUFBO0FBQUEsdUJBQUssY0FBVyxTQUFoQixFQUEwQixLQUFJLGlCQUE5QixJQUFvREMsWUFBcEQ7QUFDSTtBQUFBO0FBQUEsa0JBQU0sV0FBVSxjQUFoQjtBQUFnQyxxQkFBS0MsSUFBTCxDQUFVZCxLQUFWO0FBQWhDO0FBREosU0FESjtBQUtILEs7Ozs7OztBQUdMSyxRQUFRVSxXQUFSLEdBQXNCLFNBQXRCO0FBQ0FWLFFBQVFWLFNBQVIsR0FBb0JBLFNBQXBCO0FBQ0FVLFFBQVFELFlBQVIsR0FBdUJBLFlBQXZCOztrQkFFZUMsTyIsImZpbGUiOiJpcy1yZWFjdC1jbGFzcy1jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvL2RlcGVuZGVuY2llc1xyXG5pbXBvcnQgUmVhY3QsIHtQcm9wVHlwZXMsIFB1cmVDb21wb25lbnR9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IE1EQmVoYXZpb3VyIGZyb20gJy4uLy4uL2JlaGF2aW91cnMvbWF0ZXJpYWwnO1xyXG5pbXBvcnQgVHJhbnNsYXRpb24gZnJvbSAnLi4vLi4vYmVoYXZpb3Vycy90cmFuc2xhdGlvbic7XHJcbmltcG9ydCBmaWx0ZXJQcm9wcyBmcm9tICcuLi8uLi91dGlscy9maWx0ZXItaHRtbC1hdHRyaWJ1dGVzJ1xyXG4vKipcclxuICogQ29tcG9uZW50J3MgcHJvcHNcclxuICovXHJcbmNvbnN0IHByb3BUeXBlcyA9IHtcclxuICAgIHBvc2l0aW9uOiBQcm9wVHlwZXMub25lT2YoWyd0b3AnLCAnbGVmdCcsICdib3R0b20nLCAncmlnaHQnXSksXHJcbiAgICBpc0xhcmdlOiBQcm9wVHlwZXMuYm9vbCxcclxuICAgIGxhYmVsOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXHJcbiAgICBodG1sRm9yOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWRcclxufTtcclxuXHJcbi8qKlxyXG4gKiBDb21wb25lbnQgZGVmYXVsdCBQcm9wc1xyXG4gKi9cclxuY29uc3QgZGVmYXVsdFByb3BzID0ge1xyXG4gICAgcG9zaXRpb246ICdib3R0b20nLFxyXG4gICAgaXNMYXJnZTogZmFsc2VcclxufTtcclxuXHJcbi8qKlxyXG4qIFRvb2x0aXAgQ29tcG9uZW50LlxyXG4qL1xyXG5ATURCZWhhdmlvdXIoJ21hdGVyaWFsVG9vbHRpcCcpXHJcbkBUcmFuc2xhdGlvblxyXG5jbGFzcyBUb29sdGlwIGV4dGVuZHMgUHVyZUNvbXBvbmVudCB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBCdWlsZHMgdGhlIHRvb2x0aXAncyBjbGFzc05hbWVcclxuICAgICAqIEByZXR1cm4ge3N0cmluZ30gVGhlIGJ1aWx0IGNsYXNzbmFtZVxyXG4gICAgICovXHJcbiAgICBidWlsZENsYXNzbmFtZSA9ICgpID0+IHtcclxuICAgICAgICBjb25zdCB7aXNMYXJnZSwgcG9zaXRpb259ID0gdGhpcy5wcm9wcztcclxuICAgICAgICBsZXQgdG9vbHRpcExhcmdlID0gaXNMYXJnZSA9PT0gdHJ1ZSA/ICcgbWRsLXRvb2x0aXAtLWxhcmdlJyA6ICcnO1xyXG4gICAgICAgIHJldHVybiBgbWRsLXRvb2x0aXAgbWRsLXRvb2x0aXAtLSR7cG9zaXRpb259JHt0b29sdGlwTGFyZ2V9YDtcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgY29uc3Qge2xhYmVsLCBjbGFzc05hbWUsIGh0bWxGb3IsIC4uLm90aGVyc30gPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIGNvbnN0IHJlbmRlcmVkQ2xhc3NOYW1lID0gYCR7Y2xhc3NOYW1lID8gY2xhc3NOYW1lIDogJyd9JHt0aGlzLmJ1aWxkQ2xhc3NuYW1lKCl9YDtcclxuICAgICAgICBjb25zdCB0b29sdGlwUHJvcHMgPSB7IC4uLmZpbHRlclByb3BzKG90aGVycyksIGh0bWxGb3IsIGNsYXNzTmFtZTogcmVuZGVyZWRDbGFzc05hbWV9OyAgICAgICAgXHJcblxyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXYgZGF0YS1mb2N1cz0ndG9vbHRpcCcgcmVmPSdtYXRlcmlhbFRvb2x0aXAnIHsuLi50b29sdGlwUHJvcHN9ID5cclxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT0ndG9vbHRpcC10ZXh0Jz57dGhpcy5pMThuKGxhYmVsKX08L3NwYW4+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbn1cclxuXHJcblRvb2x0aXAuZGlzcGxheU5hbWUgPSAnVG9vbHRpcCc7XHJcblRvb2x0aXAucHJvcFR5cGVzID0gcHJvcFR5cGVzO1xyXG5Ub29sdGlwLmRlZmF1bHRQcm9wcyA9IGRlZmF1bHRQcm9wcztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFRvb2x0aXA7XHJcbiJdfQ==