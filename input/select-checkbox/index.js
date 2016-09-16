'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _checkbox = require('../checkbox');

var _checkbox2 = _interopRequireDefault(_checkbox);

var _i18next = require('i18next');

var _i18next2 = _interopRequireDefault(_i18next);

var _pull = require('lodash/pull');

var _pull2 = _interopRequireDefault(_pull);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var SelectCheckbox = function (_Component) {
    _inherits(SelectCheckbox, _Component);

    function SelectCheckbox() {
        var _temp, _this, _ret;

        _classCallCheck(this, SelectCheckbox);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.state = {
            selectedValues: _this.props.value
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    SelectCheckbox.prototype.componentWillReceiveProps = function componentWillReceiveProps(newProps) {
        if (newProps) {
            this.setState({ selectedValues: newProps.value });
        }
    };

    /**
    * Get the value from the select in the DOM.
    * @return {string} value
    */


    SelectCheckbox.prototype.getValue = function getValue() {
        return this.state.selectedValues;
    };

    /**
     * Handle a change of value.
     * @param  {[type]} key       the key
     * @param  {[type]} newStatus the new status
     */


    SelectCheckbox.prototype._handleCheckboxChange = function _handleCheckboxChange(key, newStatus) {
        if (this.props.onChange) {
            this.props.onChange(key, newStatus);
            return;
        }
        var selectedValues = this.state.selectedValues;
        if (newStatus) {
            selectedValues.push(key);
        } else {
            (0, _pull2.default)(selectedValues, key);
        }
        this.setState({ value: selectedValues });
    };

    /**
     * Closure to capture key and checbox status.
     * @param  {[type]} key the key of checkbox
     * @return {[type]} status closure
     */


    SelectCheckbox.prototype._getCheckboxChangeHandler = function _getCheckboxChangeHandler(key) {
        var _this2 = this;

        return function (status) {
            _this2._handleCheckboxChange(key, status);
        };
    };

    /**
     * Render all selection checkbox.
     * @return {ReactDOMNode} list of ReactDomNode
     */


    SelectCheckbox.prototype.renderCheckboxes = function renderCheckboxes() {
        var _this3 = this;

        return this.props.values.map(function (val, idx) {
            var value = val[_this3.props.valueKey];
            var label = val[_this3.props.labelKey];
            var isChecked = 0 <= _this3.state.selectedValues.indexOf(value);
            return _react2.default.createElement(_checkbox2.default, { key: idx, label: _i18next2.default.t(label), onChange: _this3._getCheckboxChangeHandler(value), value: isChecked });
        });
    };

    SelectCheckbox.prototype.render = function render() {
        return _react2.default.createElement(
            'div',
            { 'data-focus': 'select-checkbox' },
            this.renderCheckboxes()
        );
    };

    return SelectCheckbox;
}(_react.Component);

SelectCheckbox.defaultProps = {
    values: [], // all values
    value: [], // selected values list
    valueKey: 'value', // key for the displayed value
    labelKey: 'label' // key for the displayed label
};
SelectCheckbox.propTypes = {
    values: _react.PropTypes.array,
    value: _react.PropTypes.array,
    valueKey: _react.PropTypes.string,
    labelKey: _react.PropTypes.string,
    onChange: _react.PropTypes.func
};


SelectCheckbox.displayName = 'SelectCheckbox';

exports.default = SelectCheckbox;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZyLUZSLmpzIl0sIm5hbWVzIjpbIlNlbGVjdENoZWNrYm94Iiwic3RhdGUiLCJzZWxlY3RlZFZhbHVlcyIsInByb3BzIiwidmFsdWUiLCJjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzIiwibmV3UHJvcHMiLCJzZXRTdGF0ZSIsImdldFZhbHVlIiwiX2hhbmRsZUNoZWNrYm94Q2hhbmdlIiwia2V5IiwibmV3U3RhdHVzIiwib25DaGFuZ2UiLCJwdXNoIiwiX2dldENoZWNrYm94Q2hhbmdlSGFuZGxlciIsInN0YXR1cyIsInJlbmRlckNoZWNrYm94ZXMiLCJ2YWx1ZXMiLCJtYXAiLCJ2YWwiLCJpZHgiLCJ2YWx1ZUtleSIsImxhYmVsIiwibGFiZWxLZXkiLCJpc0NoZWNrZWQiLCJpbmRleE9mIiwidCIsInJlbmRlciIsImRlZmF1bHRQcm9wcyIsInByb3BUeXBlcyIsImFycmF5Iiwic3RyaW5nIiwiZnVuYyIsImRpc3BsYXlOYW1lIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7SUFFTUEsYztjQUFBQSxjOzthQUFBQSxjOzs7OEJBQUFBLGM7Ozs7OztnSkFnQkZDLEssR0FBUTtBQUNKQyw0QkFBZ0IsTUFBS0MsS0FBTCxDQUFXQztBQUR2QixTOzs7QUFoQk5KLGtCLFdBb0JGSyx5QixzQ0FBMEJDLFEsRUFBVTtBQUNoQyxZQUFHQSxRQUFILEVBQWE7QUFDVCxpQkFBS0MsUUFBTCxDQUFjLEVBQUNMLGdCQUFnQkksU0FBU0YsS0FBMUIsRUFBZDtBQUNIO0FBQ0osSzs7QUFFRDs7Ozs7O0FBMUJFSixrQixXQThCRlEsUSx1QkFBVztBQUNQLGVBQU8sS0FBS1AsS0FBTCxDQUFXQyxjQUFsQjtBQUNILEs7O0FBRUQ7Ozs7Ozs7QUFsQ0VGLGtCLFdBdUNGUyxxQixrQ0FBc0JDLEcsRUFBS0MsUyxFQUFXO0FBQ2xDLFlBQUcsS0FBS1IsS0FBTCxDQUFXUyxRQUFkLEVBQXdCO0FBQ3BCLGlCQUFLVCxLQUFMLENBQVdTLFFBQVgsQ0FBb0JGLEdBQXBCLEVBQXlCQyxTQUF6QjtBQUNBO0FBQ0g7QUFDRCxZQUFNVCxpQkFBaUIsS0FBS0QsS0FBTCxDQUFXQyxjQUFsQztBQUNBLFlBQUdTLFNBQUgsRUFBYztBQUNWVCwyQkFBZVcsSUFBZixDQUFvQkgsR0FBcEI7QUFDSCxTQUZELE1BRU87QUFDSCxnQ0FBS1IsY0FBTCxFQUFxQlEsR0FBckI7QUFDSDtBQUNELGFBQUtILFFBQUwsQ0FBYyxFQUFDSCxPQUFPRixjQUFSLEVBQWQ7QUFDSCxLOztBQUVEOzs7Ozs7O0FBckRFRixrQixXQTBERmMseUIsc0NBQTBCSixHLEVBQUs7QUFBQTs7QUFDM0IsZUFBTyxVQUFDSyxNQUFELEVBQVk7QUFDZixtQkFBS04scUJBQUwsQ0FBMkJDLEdBQTNCLEVBQWdDSyxNQUFoQztBQUNILFNBRkQ7QUFHSCxLOztBQUVEOzs7Ozs7QUFoRUVmLGtCLFdBb0VGZ0IsZ0IsK0JBQW1CO0FBQUE7O0FBQ2YsZUFBTyxLQUFLYixLQUFMLENBQVdjLE1BQVgsQ0FBa0JDLEdBQWxCLENBQXNCLFVBQUNDLEdBQUQsRUFBTUMsR0FBTixFQUFjO0FBQ3ZDLGdCQUFNaEIsUUFBUWUsSUFBSSxPQUFLaEIsS0FBTCxDQUFXa0IsUUFBZixDQUFkO0FBQ0EsZ0JBQU1DLFFBQVFILElBQUksT0FBS2hCLEtBQUwsQ0FBV29CLFFBQWYsQ0FBZDtBQUNBLGdCQUFNQyxZQUFZLEtBQUssT0FBS3ZCLEtBQUwsQ0FBV0MsY0FBWCxDQUEwQnVCLE9BQTFCLENBQWtDckIsS0FBbEMsQ0FBdkI7QUFDQSxtQkFDSSxvREFBVSxLQUFLZ0IsR0FBZixFQUFvQixPQUFPLGtCQUFRTSxDQUFSLENBQVVKLEtBQVYsQ0FBM0IsRUFBNkMsVUFBVSxPQUFLUix5QkFBTCxDQUErQlYsS0FBL0IsQ0FBdkQsRUFBOEYsT0FBT29CLFNBQXJHLEdBREo7QUFHSCxTQVBNLENBQVA7QUFRSCxLOztBQTdFQ3hCLGtCLFdBK0VGMkIsTSxxQkFBUztBQUNMLGVBQ0k7QUFBQTtBQUFBLGNBQUssY0FBVyxpQkFBaEI7QUFDSyxpQkFBS1gsZ0JBQUw7QUFETCxTQURKO0FBS0gsSzs7V0FyRkNoQixjOzs7QUFBQUEsYyxDQUNLNEIsWSxHQUFlO0FBQ2xCWCxZQUFRLEVBRFUsRUFDTjtBQUNaYixXQUFPLEVBRlcsRUFFUDtBQUNYaUIsY0FBVSxPQUhRLEVBR0M7QUFDbkJFLGNBQVUsT0FKUSxDQUlBO0FBSkEsQztBQURwQnZCLGMsQ0FRSzZCLFMsR0FBWTtBQUNmWixZQUFRLGlCQUFVYSxLQURIO0FBRWYxQixXQUFPLGlCQUFVMEIsS0FGRjtBQUdmVCxjQUFVLGlCQUFVVSxNQUhMO0FBSWZSLGNBQVUsaUJBQVVRLE1BSkw7QUFLZm5CLGNBQVUsaUJBQVVvQjtBQUxMLEM7OztBQWdGdkJoQyxlQUFlaUMsV0FBZixHQUE2QixnQkFBN0I7O2tCQUVlakMsYyIsImZpbGUiOiJmci1GUi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgUHJvcFR5cGVzfSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBDaGVja2JveCBmcm9tICcuLi9jaGVja2JveCc7XHJcbmltcG9ydCBpMThuZXh0IGZyb20gJ2kxOG5leHQnO1xyXG5pbXBvcnQgcHVsbCBmcm9tICdsb2Rhc2gvcHVsbCc7XHJcblxyXG5jbGFzcyBTZWxlY3RDaGVja2JveCBleHRlbmRzIENvbXBvbmVudCB7XHJcbiAgICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xyXG4gICAgICAgIHZhbHVlczogW10sIC8vIGFsbCB2YWx1ZXNcclxuICAgICAgICB2YWx1ZTogW10sIC8vIHNlbGVjdGVkIHZhbHVlcyBsaXN0XHJcbiAgICAgICAgdmFsdWVLZXk6ICd2YWx1ZScsIC8vIGtleSBmb3IgdGhlIGRpc3BsYXllZCB2YWx1ZVxyXG4gICAgICAgIGxhYmVsS2V5OiAnbGFiZWwnIC8vIGtleSBmb3IgdGhlIGRpc3BsYXllZCBsYWJlbFxyXG4gICAgfTtcclxuXHJcbiAgICBzdGF0aWMgcHJvcFR5cGVzID0ge1xyXG4gICAgICAgIHZhbHVlczogUHJvcFR5cGVzLmFycmF5LFxyXG4gICAgICAgIHZhbHVlOiBQcm9wVHlwZXMuYXJyYXksXHJcbiAgICAgICAgdmFsdWVLZXk6IFByb3BUeXBlcy5zdHJpbmcsXHJcbiAgICAgICAgbGFiZWxLZXk6IFByb3BUeXBlcy5zdHJpbmcsXHJcbiAgICAgICAgb25DaGFuZ2U6IFByb3BUeXBlcy5mdW5jXHJcbiAgICB9O1xyXG5cclxuICAgIHN0YXRlID0ge1xyXG4gICAgICAgIHNlbGVjdGVkVmFsdWVzOiB0aGlzLnByb3BzLnZhbHVlXHJcbiAgICB9O1xyXG5cclxuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV3UHJvcHMpIHtcclxuICAgICAgICBpZihuZXdQcm9wcykge1xyXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtzZWxlY3RlZFZhbHVlczogbmV3UHJvcHMudmFsdWV9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAqIEdldCB0aGUgdmFsdWUgZnJvbSB0aGUgc2VsZWN0IGluIHRoZSBET00uXHJcbiAgICAqIEByZXR1cm4ge3N0cmluZ30gdmFsdWVcclxuICAgICovXHJcbiAgICBnZXRWYWx1ZSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5zdGF0ZS5zZWxlY3RlZFZhbHVlcztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEhhbmRsZSBhIGNoYW5nZSBvZiB2YWx1ZS5cclxuICAgICAqIEBwYXJhbSAge1t0eXBlXX0ga2V5ICAgICAgIHRoZSBrZXlcclxuICAgICAqIEBwYXJhbSAge1t0eXBlXX0gbmV3U3RhdHVzIHRoZSBuZXcgc3RhdHVzXHJcbiAgICAgKi9cclxuICAgIF9oYW5kbGVDaGVja2JveENoYW5nZShrZXksIG5ld1N0YXR1cykge1xyXG4gICAgICAgIGlmKHRoaXMucHJvcHMub25DaGFuZ2UpIHtcclxuICAgICAgICAgICAgdGhpcy5wcm9wcy5vbkNoYW5nZShrZXksIG5ld1N0YXR1cyk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3Qgc2VsZWN0ZWRWYWx1ZXMgPSB0aGlzLnN0YXRlLnNlbGVjdGVkVmFsdWVzO1xyXG4gICAgICAgIGlmKG5ld1N0YXR1cykge1xyXG4gICAgICAgICAgICBzZWxlY3RlZFZhbHVlcy5wdXNoKGtleSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcHVsbChzZWxlY3RlZFZhbHVlcywga2V5KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7dmFsdWU6IHNlbGVjdGVkVmFsdWVzfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDbG9zdXJlIHRvIGNhcHR1cmUga2V5IGFuZCBjaGVjYm94IHN0YXR1cy5cclxuICAgICAqIEBwYXJhbSAge1t0eXBlXX0ga2V5IHRoZSBrZXkgb2YgY2hlY2tib3hcclxuICAgICAqIEByZXR1cm4ge1t0eXBlXX0gc3RhdHVzIGNsb3N1cmVcclxuICAgICAqL1xyXG4gICAgX2dldENoZWNrYm94Q2hhbmdlSGFuZGxlcihrZXkpIHtcclxuICAgICAgICByZXR1cm4gKHN0YXR1cykgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLl9oYW5kbGVDaGVja2JveENoYW5nZShrZXksIHN0YXR1cyk7XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlbmRlciBhbGwgc2VsZWN0aW9uIGNoZWNrYm94LlxyXG4gICAgICogQHJldHVybiB7UmVhY3RET01Ob2RlfSBsaXN0IG9mIFJlYWN0RG9tTm9kZVxyXG4gICAgICovXHJcbiAgICByZW5kZXJDaGVja2JveGVzKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnByb3BzLnZhbHVlcy5tYXAoKHZhbCwgaWR4KSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gdmFsW3RoaXMucHJvcHMudmFsdWVLZXldO1xyXG4gICAgICAgICAgICBjb25zdCBsYWJlbCA9IHZhbFt0aGlzLnByb3BzLmxhYmVsS2V5XTtcclxuICAgICAgICAgICAgY29uc3QgaXNDaGVja2VkID0gMCA8PSB0aGlzLnN0YXRlLnNlbGVjdGVkVmFsdWVzLmluZGV4T2YodmFsdWUpO1xyXG4gICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgICAgPENoZWNrYm94IGtleT17aWR4fSBsYWJlbD17aTE4bmV4dC50KGxhYmVsKX0gb25DaGFuZ2U9e3RoaXMuX2dldENoZWNrYm94Q2hhbmdlSGFuZGxlcih2YWx1ZSl9IHZhbHVlPXtpc0NoZWNrZWR9IC8+XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXYgZGF0YS1mb2N1cz0nc2VsZWN0LWNoZWNrYm94Jz5cclxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlckNoZWNrYm94ZXMoKX1cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufVxyXG5cclxuU2VsZWN0Q2hlY2tib3guZGlzcGxheU5hbWUgPSAnU2VsZWN0Q2hlY2tib3gnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgU2VsZWN0Q2hlY2tib3g7XHJcbiJdfQ==