'use strict';

var _types = require('focus-core/component/types');

var _types2 = _interopRequireDefault(_types);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Mixin used in order to create a popin or a menu.
 * @type {Object} - popin behavour mixin
 */
var PopinProperties = {
    /** @inheritdoc */
    getDefaultProps: function getMenuDefaultProps() {
        return {
            direction: 'vertical', //horizontal
            position: 'left', // top, bottom, right, left
            open: false
        };
    },
    /** @inheritdoc */
    propTypes: {
        open: (0, _types2.default)('bool')
    },
    /** @inheritdoc */
    getInitialState: function getDefaultState() {
        return {
            open: this.props.open
        };
    }
};

module.exports = { mixin: PopinProperties };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJQb3BpblByb3BlcnRpZXMiLCJnZXREZWZhdWx0UHJvcHMiLCJnZXRNZW51RGVmYXVsdFByb3BzIiwiZGlyZWN0aW9uIiwicG9zaXRpb24iLCJvcGVuIiwicHJvcFR5cGVzIiwiZ2V0SW5pdGlhbFN0YXRlIiwiZ2V0RGVmYXVsdFN0YXRlIiwicHJvcHMiLCJtb2R1bGUiLCJleHBvcnRzIiwibWl4aW4iXSwibWFwcGluZ3MiOiI7O0FBQUE7Ozs7OztBQUNBOzs7O0FBSUEsSUFBSUEsa0JBQWtCO0FBQ3BCO0FBQ0VDLHFCQUFpQixTQUFTQyxtQkFBVCxHQUErQjtBQUM1QyxlQUFPO0FBQ0hDLHVCQUFXLFVBRFIsRUFDbUI7QUFDdEJDLHNCQUFVLE1BRlAsRUFFZTtBQUNsQkMsa0JBQU07QUFISCxTQUFQO0FBS0gsS0FSaUI7QUFTcEI7QUFDRUMsZUFBVztBQUNQRCxjQUFNLHFCQUFLLE1BQUw7QUFEQyxLQVZPO0FBYXBCO0FBQ0VFLHFCQUFpQixTQUFTQyxlQUFULEdBQTJCO0FBQ3hDLGVBQU87QUFDSEgsa0JBQU0sS0FBS0ksS0FBTCxDQUFXSjtBQURkLFNBQVA7QUFHSDtBQWxCaUIsQ0FBdEI7O0FBcUJBSyxPQUFPQyxPQUFQLEdBQWlCLEVBQUNDLE9BQU9aLGVBQVIsRUFBakIiLCJmaWxlIjoiaXMtcmVhY3QtY2xhc3MtY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHR5cGUgZnJvbSAnZm9jdXMtY29yZS9jb21wb25lbnQvdHlwZXMnO1xyXG4vKipcclxuICogTWl4aW4gdXNlZCBpbiBvcmRlciB0byBjcmVhdGUgYSBwb3BpbiBvciBhIG1lbnUuXHJcbiAqIEB0eXBlIHtPYmplY3R9IC0gcG9waW4gYmVoYXZvdXIgbWl4aW5cclxuICovXHJcbnZhciBQb3BpblByb3BlcnRpZXMgPSB7XHJcbiAgLyoqIEBpbmhlcml0ZG9jICovXHJcbiAgICBnZXREZWZhdWx0UHJvcHM6IGZ1bmN0aW9uIGdldE1lbnVEZWZhdWx0UHJvcHMoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgZGlyZWN0aW9uOiAndmVydGljYWwnLC8vaG9yaXpvbnRhbFxyXG4gICAgICAgICAgICBwb3NpdGlvbjogJ2xlZnQnLCAvLyB0b3AsIGJvdHRvbSwgcmlnaHQsIGxlZnRcclxuICAgICAgICAgICAgb3BlbjogZmFsc2VcclxuICAgICAgICB9O1xyXG4gICAgfSxcclxuICAvKiogQGluaGVyaXRkb2MgKi9cclxuICAgIHByb3BUeXBlczoge1xyXG4gICAgICAgIG9wZW46IHR5cGUoJ2Jvb2wnKVxyXG4gICAgfSxcclxuICAvKiogQGluaGVyaXRkb2MgKi9cclxuICAgIGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24gZ2V0RGVmYXVsdFN0YXRlKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIG9wZW46IHRoaXMucHJvcHMub3BlblxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHttaXhpbjogUG9waW5Qcm9wZXJ0aWVzfTtcclxuIl19