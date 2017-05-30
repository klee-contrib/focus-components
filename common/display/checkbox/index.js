'use strict';

var _builder = require('focus-core/component/builder');

var _builder2 = _interopRequireDefault(_builder);

var _types = require('focus-core/component/types');

var _types2 = _interopRequireDefault(_types);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var React = require('react'); //Dependencies.

var i18nBehaviour = require('../../i18n/mixin');
/**
 * Input text mixin.
 * @type {Object}
 */
var displayCheckboxMixin = {
    mixins: [i18nBehaviour],
    /** @inheritdoc */
    getDefaultProps: function getInputDefaultProps() {
        return {
            value: undefined,
            name: undefined,
            style: {}
        };
    },
    /** @inheritdoc */
    propTypes: {
        type: (0, _types2.default)('string'),
        value: (0, _types2.default)('bool'),
        name: (0, _types2.default)('string'),
        style: (0, _types2.default)('object')
    },
    /**
     * Render the boolean value.
     */
    renderValue: function renderValueDisplayText() {
        var stringValue = this.props.value === true ? 'true' : 'false';
        return this.i18n('display.checkbox.' + stringValue);
    },
    /**
     * Render a display field.
     * @return {DOM} - The dom of an input.
     */
    render: function renderInput() {
        return React.createElement(
            'div',
            {
                id: this.props.name,
                name: this.props.name,
                className: this.props.style.class
            },
            this.renderValue()
        );
    }
};

module.exports = (0, _builder2.default)(displayCheckboxMixin);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJSZWFjdCIsInJlcXVpcmUiLCJpMThuQmVoYXZpb3VyIiwiZGlzcGxheUNoZWNrYm94TWl4aW4iLCJtaXhpbnMiLCJnZXREZWZhdWx0UHJvcHMiLCJnZXRJbnB1dERlZmF1bHRQcm9wcyIsInZhbHVlIiwidW5kZWZpbmVkIiwibmFtZSIsInN0eWxlIiwicHJvcFR5cGVzIiwidHlwZSIsInJlbmRlclZhbHVlIiwicmVuZGVyVmFsdWVEaXNwbGF5VGV4dCIsInN0cmluZ1ZhbHVlIiwicHJvcHMiLCJpMThuIiwicmVuZGVyIiwicmVuZGVySW5wdXQiLCJjbGFzcyIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7O0FBQ0E7Ozs7QUFFQTs7Ozs7O0FBREEsSUFBSUEsUUFBUUMsUUFBUSxPQUFSLENBQVosQyxDQUZBOztBQUlBLElBQUlDLGdCQUFnQkQsUUFBUSxrQkFBUixDQUFwQjtBQUNBOzs7O0FBSUEsSUFBSUUsdUJBQXVCO0FBQ3ZCQyxZQUFRLENBQUNGLGFBQUQsQ0FEZTtBQUV6QjtBQUNFRyxxQkFBaUIsU0FBU0Msb0JBQVQsR0FBZ0M7QUFDN0MsZUFBTztBQUNIQyxtQkFBT0MsU0FESjtBQUVIQyxrQkFBTUQsU0FGSDtBQUdIRSxtQkFBTztBQUhKLFNBQVA7QUFLSCxLQVRzQjtBQVV6QjtBQUNFQyxlQUFXO0FBQ1BDLGNBQU0scUJBQUssUUFBTCxDQURDO0FBRVBMLGVBQU8scUJBQUssTUFBTCxDQUZBO0FBR1BFLGNBQU0scUJBQUssUUFBTCxDQUhDO0FBSVBDLGVBQU8scUJBQUssUUFBTDtBQUpBLEtBWFk7QUFpQnpCOzs7QUFHRUcsaUJBQWEsU0FBU0Msc0JBQVQsR0FBa0M7QUFDM0MsWUFBSUMsY0FBYyxLQUFLQyxLQUFMLENBQVdULEtBQVgsS0FBcUIsSUFBckIsR0FBNEIsTUFBNUIsR0FBcUMsT0FBdkQ7QUFDQSxlQUFPLEtBQUtVLElBQUwsdUJBQThCRixXQUE5QixDQUFQO0FBQ0gsS0F2QnNCO0FBd0J6Qjs7OztBQUlFRyxZQUFRLFNBQVNDLFdBQVQsR0FBdUI7QUFDM0IsZUFDRjtBQUFBO0FBQUE7QUFDSSxvQkFBSSxLQUFLSCxLQUFMLENBQVdQLElBRG5CO0FBRUksc0JBQU0sS0FBS08sS0FBTCxDQUFXUCxJQUZyQjtBQUdJLDJCQUFXLEtBQUtPLEtBQUwsQ0FBV04sS0FBWCxDQUFpQlU7QUFIaEM7QUFJRSxpQkFBS1AsV0FBTDtBQUpGLFNBREU7QUFPSDtBQXBDc0IsQ0FBM0I7O0FBd0NBUSxPQUFPQyxPQUFQLEdBQWlCLHVCQUFRbkIsb0JBQVIsQ0FBakIiLCJmaWxlIjoiaXMtcmVhY3QtY2xhc3MtY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy9EZXBlbmRlbmNpZXMuXHJcbmltcG9ydCBidWlsZGVyIGZyb20gJ2ZvY3VzLWNvcmUvY29tcG9uZW50L2J1aWxkZXInO1xyXG52YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xyXG5pbXBvcnQgdHlwZSBmcm9tICdmb2N1cy1jb3JlL2NvbXBvbmVudC90eXBlcyc7XHJcbnZhciBpMThuQmVoYXZpb3VyID0gcmVxdWlyZSgnLi4vLi4vaTE4bi9taXhpbicpO1xyXG4vKipcclxuICogSW5wdXQgdGV4dCBtaXhpbi5cclxuICogQHR5cGUge09iamVjdH1cclxuICovXHJcbnZhciBkaXNwbGF5Q2hlY2tib3hNaXhpbiA9IHtcclxuICAgIG1peGluczogW2kxOG5CZWhhdmlvdXJdLFxyXG4gIC8qKiBAaW5oZXJpdGRvYyAqL1xyXG4gICAgZ2V0RGVmYXVsdFByb3BzOiBmdW5jdGlvbiBnZXRJbnB1dERlZmF1bHRQcm9wcygpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICB2YWx1ZTogdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICBuYW1lOiB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgIHN0eWxlOiB7fVxyXG4gICAgICAgIH07XHJcbiAgICB9LFxyXG4gIC8qKiBAaW5oZXJpdGRvYyAqL1xyXG4gICAgcHJvcFR5cGVzOiB7XHJcbiAgICAgICAgdHlwZTogdHlwZSgnc3RyaW5nJyksXHJcbiAgICAgICAgdmFsdWU6IHR5cGUoJ2Jvb2wnKSxcclxuICAgICAgICBuYW1lOiB0eXBlKCdzdHJpbmcnKSxcclxuICAgICAgICBzdHlsZTogdHlwZSgnb2JqZWN0JylcclxuICAgIH0sXHJcbiAgLyoqXHJcbiAgICogUmVuZGVyIHRoZSBib29sZWFuIHZhbHVlLlxyXG4gICAqL1xyXG4gICAgcmVuZGVyVmFsdWU6IGZ1bmN0aW9uIHJlbmRlclZhbHVlRGlzcGxheVRleHQoKSB7XHJcbiAgICAgICAgdmFyIHN0cmluZ1ZhbHVlID0gdGhpcy5wcm9wcy52YWx1ZSA9PT0gdHJ1ZSA/ICd0cnVlJyA6ICdmYWxzZSc7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaTE4bihgZGlzcGxheS5jaGVja2JveC4ke3N0cmluZ1ZhbHVlfWApO1xyXG4gICAgfSxcclxuICAvKipcclxuICAgKiBSZW5kZXIgYSBkaXNwbGF5IGZpZWxkLlxyXG4gICAqIEByZXR1cm4ge0RPTX0gLSBUaGUgZG9tIG9mIGFuIGlucHV0LlxyXG4gICAqL1xyXG4gICAgcmVuZGVyOiBmdW5jdGlvbiByZW5kZXJJbnB1dCgpIHtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICA8ZGl2XHJcbiAgICAgICAgICBpZD17dGhpcy5wcm9wcy5uYW1lfVxyXG4gICAgICAgICAgbmFtZT17dGhpcy5wcm9wcy5uYW1lfVxyXG4gICAgICAgICAgY2xhc3NOYW1lPXt0aGlzLnByb3BzLnN0eWxlLmNsYXNzfVxyXG4gICAgICA+e3RoaXMucmVuZGVyVmFsdWUoKX08L2Rpdj5cclxuICAgICk7XHJcbiAgICB9XHJcbn07XHJcblxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBidWlsZGVyKGRpc3BsYXlDaGVja2JveE1peGluKTtcclxuIl19