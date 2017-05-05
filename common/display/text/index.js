'use strict';

var _builder = require('focus-core/component/builder');

var _builder2 = _interopRequireDefault(_builder);

var _types = require('focus-core/component/types');

var _types2 = _interopRequireDefault(_types);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//Dependencies.
var React = require('react');
var i18nBehaviour = require('../../i18n/mixin');

/**
* Input text mixin.
* @type {Object}
*/
var displayTextMixin = {
    mixins: [i18nBehaviour],
    displayName: 'DeprecatedDisplayText',
    /** @inheritdoc */
    getDefaultProps: function getDefaultProps() {
        return {
            formatter: function formatter(data) {
                return data;
            }
        };
    },

    /** @inheritdoc */
    propTypes: {
        type: (0, _types2.default)('string'),
        value: (0, _types2.default)(['string', 'number']),
        name: (0, _types2.default)('string'),
        style: (0, _types2.default)('object')
    },
    /**
    * Render the value.
    * @return {string} The formated value.
    */
    renderValue: function renderValue() {
        var _props = this.props,
            formatter = _props.formatter,
            value = _props.value;

        return formatter(value);
    },

    /** @inheritdoc */
    render: function renderInput() {
        return React.createElement(
            'div',
            this.props,
            this.renderValue()
        );
    }
};

module.exports = (0, _builder2.default)(displayTextMixin);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJSZWFjdCIsInJlcXVpcmUiLCJpMThuQmVoYXZpb3VyIiwiZGlzcGxheVRleHRNaXhpbiIsIm1peGlucyIsImRpc3BsYXlOYW1lIiwiZ2V0RGVmYXVsdFByb3BzIiwiZm9ybWF0dGVyIiwiZGF0YSIsInByb3BUeXBlcyIsInR5cGUiLCJ2YWx1ZSIsIm5hbWUiLCJzdHlsZSIsInJlbmRlclZhbHVlIiwicHJvcHMiLCJyZW5kZXIiLCJyZW5kZXJJbnB1dCIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBRkE7QUFHQSxJQUFNQSxRQUFRQyxRQUFRLE9BQVIsQ0FBZDtBQUNBLElBQU1DLGdCQUFnQkQsUUFBUSxrQkFBUixDQUF0Qjs7QUFFQTs7OztBQUlBLElBQU1FLG1CQUFtQjtBQUNyQkMsWUFBUSxDQUFDRixhQUFELENBRGE7QUFFckJHLGlCQUFhLHVCQUZRO0FBR3JCO0FBQ0FDLG1CQUpxQiw2QkFJSDtBQUNkLGVBQU87QUFDSEMsdUJBQVcsbUJBQUNDLElBQUQ7QUFBQSx1QkFBVUEsSUFBVjtBQUFBO0FBRFIsU0FBUDtBQUdILEtBUm9COztBQVNyQjtBQUNBQyxlQUFXO0FBQ1BDLGNBQU0scUJBQU0sUUFBTixDQURDO0FBRVBDLGVBQU8scUJBQU0sQ0FBQyxRQUFELEVBQVcsUUFBWCxDQUFOLENBRkE7QUFHUEMsY0FBTSxxQkFBTSxRQUFOLENBSEM7QUFJUEMsZUFBTyxxQkFBTSxRQUFOO0FBSkEsS0FWVTtBQWdCckI7Ozs7QUFJQUMsZUFwQnFCLHlCQW9CUDtBQUFBLHFCQUNpQixLQUFLQyxLQUR0QjtBQUFBLFlBQ0hSLFNBREcsVUFDSEEsU0FERztBQUFBLFlBQ1FJLEtBRFIsVUFDUUEsS0FEUjs7QUFFVixlQUFPSixVQUFVSSxLQUFWLENBQVA7QUFDSCxLQXZCb0I7O0FBd0JyQjtBQUNBSyxZQUFRLFNBQVNDLFdBQVQsR0FBdUI7QUFDM0IsZUFBTztBQUFBO0FBQVMsaUJBQUtGLEtBQWQ7QUFBc0IsaUJBQUtELFdBQUw7QUFBdEIsU0FBUDtBQUNIO0FBM0JvQixDQUF6Qjs7QUErQkFJLE9BQU9DLE9BQVAsR0FBaUIsdUJBQVFoQixnQkFBUixDQUFqQiIsImZpbGUiOiJpcy1yZWFjdC1jbGFzcy1jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvL0RlcGVuZGVuY2llcy5cclxuaW1wb3J0IGJ1aWxkZXIgZnJvbSAnZm9jdXMtY29yZS9jb21wb25lbnQvYnVpbGRlcic7XHJcbmltcG9ydCB0eXBlcyBmcm9tICdmb2N1cy1jb3JlL2NvbXBvbmVudC90eXBlcyc7XHJcbmNvbnN0IFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcclxuY29uc3QgaTE4bkJlaGF2aW91ciA9IHJlcXVpcmUoJy4uLy4uL2kxOG4vbWl4aW4nKTtcclxuXHJcbi8qKlxyXG4qIElucHV0IHRleHQgbWl4aW4uXHJcbiogQHR5cGUge09iamVjdH1cclxuKi9cclxuY29uc3QgZGlzcGxheVRleHRNaXhpbiA9IHtcclxuICAgIG1peGluczogW2kxOG5CZWhhdmlvdXJdLFxyXG4gICAgZGlzcGxheU5hbWU6ICdEZXByZWNhdGVkRGlzcGxheVRleHQnLFxyXG4gICAgLyoqIEBpbmhlcml0ZG9jICovXHJcbiAgICBnZXREZWZhdWx0UHJvcHMoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgZm9ybWF0dGVyOiAoZGF0YSkgPT4gZGF0YVxyXG4gICAgICAgIH07XHJcbiAgICB9LFxyXG4gICAgLyoqIEBpbmhlcml0ZG9jICovXHJcbiAgICBwcm9wVHlwZXM6IHtcclxuICAgICAgICB0eXBlOiB0eXBlcygnc3RyaW5nJyksXHJcbiAgICAgICAgdmFsdWU6IHR5cGVzKFsnc3RyaW5nJywgJ251bWJlciddKSxcclxuICAgICAgICBuYW1lOiB0eXBlcygnc3RyaW5nJyksXHJcbiAgICAgICAgc3R5bGU6IHR5cGVzKCdvYmplY3QnKVxyXG4gICAgfSxcclxuICAgIC8qKlxyXG4gICAgKiBSZW5kZXIgdGhlIHZhbHVlLlxyXG4gICAgKiBAcmV0dXJuIHtzdHJpbmd9IFRoZSBmb3JtYXRlZCB2YWx1ZS5cclxuICAgICovXHJcbiAgICByZW5kZXJWYWx1ZSgpIHtcclxuICAgICAgICBjb25zdCB7Zm9ybWF0dGVyLCB2YWx1ZX0gPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIHJldHVybiBmb3JtYXR0ZXIodmFsdWUpO1xyXG4gICAgfSxcclxuICAgIC8qKiBAaW5oZXJpdGRvYyAqL1xyXG4gICAgcmVuZGVyOiBmdW5jdGlvbiByZW5kZXJJbnB1dCgpIHtcclxuICAgICAgICByZXR1cm4gPGRpdiB7Li4udGhpcy5wcm9wc30+e3RoaXMucmVuZGVyVmFsdWUoKX08L2Rpdj47XHJcbiAgICB9XHJcbn07XHJcblxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBidWlsZGVyKGRpc3BsYXlUZXh0TWl4aW4pO1xyXG4iXX0=