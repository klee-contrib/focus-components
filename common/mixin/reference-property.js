'use strict';

var _types = require('focus-core/component/types');

var _types2 = _interopRequireDefault(_types);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var referenceMixin = {
    /** @inheritdoc */
    getDefaultProps: function getDefaultProps() {
        return {
            /**
             * Size of the label in the grid system.
             * @type {Number}
             */
            reference: {}
        };
    },

    /** @inheritdoc */
    propTypes: {
        reference: (0, _types2.default)('object')
    },

    /**
     * @returns {object} -
     */
    _getReference: function getReference() {
        return this.props.reference;
    }
};
module.exports = referenceMixin;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJyZWZlcmVuY2VNaXhpbiIsImdldERlZmF1bHRQcm9wcyIsInJlZmVyZW5jZSIsInByb3BUeXBlcyIsIl9nZXRSZWZlcmVuY2UiLCJnZXRSZWZlcmVuY2UiLCJwcm9wcyIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7O0FBQUE7Ozs7OztBQUNBLElBQUlBLGlCQUFpQjtBQUNuQjtBQUNFQyxxQkFBaUIsU0FBU0EsZUFBVCxHQUEyQjtBQUN4QyxlQUFPO0FBQ1A7Ozs7QUFJSUMsdUJBQVc7QUFMUixTQUFQO0FBT0gsS0FWZ0I7O0FBWW5CO0FBQ0VDLGVBQVc7QUFDUEQsbUJBQVcscUJBQUssUUFBTDtBQURKLEtBYk07O0FBaUJuQjs7O0FBR0VFLG1CQUFlLFNBQVNDLFlBQVQsR0FBd0I7QUFDbkMsZUFBTyxLQUFLQyxLQUFMLENBQVdKLFNBQWxCO0FBQ0g7QUF0QmdCLENBQXJCO0FBd0JBSyxPQUFPQyxPQUFQLEdBQWlCUixjQUFqQiIsImZpbGUiOiJpcy1yZWFjdC1jbGFzcy1jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgdHlwZSBmcm9tICdmb2N1cy1jb3JlL2NvbXBvbmVudC90eXBlcyc7XHJcbnZhciByZWZlcmVuY2VNaXhpbiA9IHtcclxuICAvKiogQGluaGVyaXRkb2MgKi9cclxuICAgIGdldERlZmF1bHRQcm9wczogZnVuY3Rpb24gZ2V0RGVmYXVsdFByb3BzKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogU2l6ZSBvZiB0aGUgbGFiZWwgaW4gdGhlIGdyaWQgc3lzdGVtLlxyXG4gICAgICAgICAqIEB0eXBlIHtOdW1iZXJ9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgICAgIHJlZmVyZW5jZToge31cclxuICAgICAgICB9O1xyXG4gICAgfSxcclxuXHJcbiAgLyoqIEBpbmhlcml0ZG9jICovXHJcbiAgICBwcm9wVHlwZXM6IHtcclxuICAgICAgICByZWZlcmVuY2U6IHR5cGUoJ29iamVjdCcpXHJcbiAgICB9LFxyXG5cclxuICAvKipcclxuICAgKiBAcmV0dXJucyB7b2JqZWN0fSAtXHJcbiAgICovXHJcbiAgICBfZ2V0UmVmZXJlbmNlOiBmdW5jdGlvbiBnZXRSZWZlcmVuY2UoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMucmVmZXJlbmNlO1xyXG4gICAgfVxyXG59O1xyXG5tb2R1bGUuZXhwb3J0cyA9IHJlZmVyZW5jZU1peGluO1xyXG4iXX0=