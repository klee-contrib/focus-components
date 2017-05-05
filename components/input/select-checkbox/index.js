'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _class;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _checkbox = require('../checkbox');

var _checkbox2 = _interopRequireDefault(_checkbox);

var _translation = require('../../../behaviours/translation');

var _translation2 = _interopRequireDefault(_translation);

var _array = require('lodash/array');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var SelectCheckbox = (0, _translation2.default)(_class = function (_Component) {
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
            (0, _array.pull)(selectedValues, key);
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
            return _react2.default.createElement(_checkbox2.default, { key: idx, label: _this3.i18n(label), onChange: _this3._getCheckboxChangeHandler(value), value: isChecked });
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
}(_react.Component)) || _class;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJTZWxlY3RDaGVja2JveCIsInN0YXRlIiwic2VsZWN0ZWRWYWx1ZXMiLCJwcm9wcyIsInZhbHVlIiwiY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyIsIm5ld1Byb3BzIiwic2V0U3RhdGUiLCJnZXRWYWx1ZSIsIl9oYW5kbGVDaGVja2JveENoYW5nZSIsImtleSIsIm5ld1N0YXR1cyIsIm9uQ2hhbmdlIiwicHVzaCIsIl9nZXRDaGVja2JveENoYW5nZUhhbmRsZXIiLCJzdGF0dXMiLCJyZW5kZXJDaGVja2JveGVzIiwidmFsdWVzIiwibWFwIiwidmFsIiwiaWR4IiwidmFsdWVLZXkiLCJsYWJlbCIsImxhYmVsS2V5IiwiaXNDaGVja2VkIiwiaW5kZXhPZiIsImkxOG4iLCJyZW5kZXIiLCJkZWZhdWx0UHJvcHMiLCJwcm9wVHlwZXMiLCJhcnJheSIsInN0cmluZyIsImZ1bmMiLCJkaXNwbGF5TmFtZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBR01BLGM7Ozs7Ozs7Ozs7OztnSkFnQkZDLEssR0FBUTtBQUNKQyw0QkFBZ0IsTUFBS0MsS0FBTCxDQUFXQztBQUR2QixTOzs7NkJBSVJDLHlCLHNDQUEwQkMsUSxFQUFVO0FBQ2hDLFlBQUlBLFFBQUosRUFBYztBQUNWLGlCQUFLQyxRQUFMLENBQWMsRUFBQ0wsZ0JBQWdCSSxTQUFTRixLQUExQixFQUFkO0FBQ0g7QUFDSixLOztBQUVEOzs7Ozs7NkJBSUFJLFEsdUJBQVc7QUFDUCxlQUFPLEtBQUtQLEtBQUwsQ0FBV0MsY0FBbEI7QUFDSCxLOztBQUVEOzs7Ozs7OzZCQUtBTyxxQixrQ0FBc0JDLEcsRUFBS0MsUyxFQUFXO0FBQ2xDLFlBQUksS0FBS1IsS0FBTCxDQUFXUyxRQUFmLEVBQXlCO0FBQ3JCLGlCQUFLVCxLQUFMLENBQVdTLFFBQVgsQ0FBb0JGLEdBQXBCLEVBQXlCQyxTQUF6QjtBQUNBO0FBQ0g7QUFDRCxZQUFNVCxpQkFBaUIsS0FBS0QsS0FBTCxDQUFXQyxjQUFsQztBQUNBLFlBQUlTLFNBQUosRUFBZTtBQUNYVCwyQkFBZVcsSUFBZixDQUFvQkgsR0FBcEI7QUFDSCxTQUZELE1BRU87QUFDSCw2QkFBS1IsY0FBTCxFQUFxQlEsR0FBckI7QUFDSDtBQUNELGFBQUtILFFBQUwsQ0FBYyxFQUFDSCxPQUFPRixjQUFSLEVBQWQ7QUFDSCxLOztBQUVEOzs7Ozs7OzZCQUtBWSx5QixzQ0FBMEJKLEcsRUFBSztBQUFBOztBQUMzQixlQUFPLFVBQUNLLE1BQUQsRUFBWTtBQUNmLG1CQUFLTixxQkFBTCxDQUEyQkMsR0FBM0IsRUFBZ0NLLE1BQWhDO0FBQ0gsU0FGRDtBQUdILEs7O0FBRUQ7Ozs7Ozs2QkFJQUMsZ0IsK0JBQW1CO0FBQUE7O0FBQ2YsZUFBTyxLQUFLYixLQUFMLENBQVdjLE1BQVgsQ0FBa0JDLEdBQWxCLENBQXNCLFVBQUNDLEdBQUQsRUFBTUMsR0FBTixFQUFjO0FBQ3ZDLGdCQUFNaEIsUUFBUWUsSUFBSSxPQUFLaEIsS0FBTCxDQUFXa0IsUUFBZixDQUFkO0FBQ0EsZ0JBQU1DLFFBQVFILElBQUksT0FBS2hCLEtBQUwsQ0FBV29CLFFBQWYsQ0FBZDtBQUNBLGdCQUFNQyxZQUFZLEtBQUssT0FBS3ZCLEtBQUwsQ0FBV0MsY0FBWCxDQUEwQnVCLE9BQTFCLENBQWtDckIsS0FBbEMsQ0FBdkI7QUFDQSxtQkFDSSxvREFBVSxLQUFLZ0IsR0FBZixFQUFvQixPQUFPLE9BQUtNLElBQUwsQ0FBVUosS0FBVixDQUEzQixFQUE2QyxVQUFVLE9BQUtSLHlCQUFMLENBQStCVixLQUEvQixDQUF2RCxFQUE4RixPQUFPb0IsU0FBckcsR0FESjtBQUdILFNBUE0sQ0FBUDtBQVFILEs7OzZCQUVERyxNLHFCQUFTO0FBQ0wsZUFDSTtBQUFBO0FBQUEsY0FBSyxjQUFXLGlCQUFoQjtBQUNLLGlCQUFLWCxnQkFBTDtBQURMLFNBREo7QUFLSCxLOzs7OztBQXJGQ2hCLGMsQ0FDSzRCLFksR0FBZTtBQUNsQlgsWUFBUSxFQURVLEVBQ047QUFDWmIsV0FBTyxFQUZXLEVBRVA7QUFDWGlCLGNBQVUsT0FIUSxFQUdDO0FBQ25CRSxjQUFVLE9BSlEsQ0FJQTtBQUpBLEM7QUFEcEJ2QixjLENBUUs2QixTLEdBQVk7QUFDZlosWUFBUSxpQkFBVWEsS0FESDtBQUVmMUIsV0FBTyxpQkFBVTBCLEtBRkY7QUFHZlQsY0FBVSxpQkFBVVUsTUFITDtBQUlmUixjQUFVLGlCQUFVUSxNQUpMO0FBS2ZuQixjQUFVLGlCQUFVb0I7QUFMTCxDOzs7QUFnRnZCaEMsZUFBZWlDLFdBQWYsR0FBNkIsZ0JBQTdCOztrQkFFZWpDLGMiLCJmaWxlIjoiaXMtcmVhY3QtY2xhc3MtY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IENoZWNrYm94IGZyb20gJy4uL2NoZWNrYm94JztcclxuaW1wb3J0IFRyYW5zbGF0aW9uIGZyb20gJy4uLy4uLy4uL2JlaGF2aW91cnMvdHJhbnNsYXRpb24nO1xyXG5pbXBvcnQge3B1bGx9IGZyb20gJ2xvZGFzaC9hcnJheSc7XHJcblxyXG5AVHJhbnNsYXRpb25cclxuY2xhc3MgU2VsZWN0Q2hlY2tib3ggZXh0ZW5kcyBDb21wb25lbnQge1xyXG4gICAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcclxuICAgICAgICB2YWx1ZXM6IFtdLCAvLyBhbGwgdmFsdWVzXHJcbiAgICAgICAgdmFsdWU6IFtdLCAvLyBzZWxlY3RlZCB2YWx1ZXMgbGlzdFxyXG4gICAgICAgIHZhbHVlS2V5OiAndmFsdWUnLCAvLyBrZXkgZm9yIHRoZSBkaXNwbGF5ZWQgdmFsdWVcclxuICAgICAgICBsYWJlbEtleTogJ2xhYmVsJyAvLyBrZXkgZm9yIHRoZSBkaXNwbGF5ZWQgbGFiZWxcclxuICAgIH07XHJcblxyXG4gICAgc3RhdGljIHByb3BUeXBlcyA9IHtcclxuICAgICAgICB2YWx1ZXM6IFByb3BUeXBlcy5hcnJheSxcclxuICAgICAgICB2YWx1ZTogUHJvcFR5cGVzLmFycmF5LFxyXG4gICAgICAgIHZhbHVlS2V5OiBQcm9wVHlwZXMuc3RyaW5nLFxyXG4gICAgICAgIGxhYmVsS2V5OiBQcm9wVHlwZXMuc3RyaW5nLFxyXG4gICAgICAgIG9uQ2hhbmdlOiBQcm9wVHlwZXMuZnVuY1xyXG4gICAgfTtcclxuXHJcbiAgICBzdGF0ZSA9IHtcclxuICAgICAgICBzZWxlY3RlZFZhbHVlczogdGhpcy5wcm9wcy52YWx1ZVxyXG4gICAgfTtcclxuXHJcbiAgICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5ld1Byb3BzKSB7XHJcbiAgICAgICAgaWYgKG5ld1Byb3BzKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe3NlbGVjdGVkVmFsdWVzOiBuZXdQcm9wcy52YWx1ZX0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICogR2V0IHRoZSB2YWx1ZSBmcm9tIHRoZSBzZWxlY3QgaW4gdGhlIERPTS5cclxuICAgICogQHJldHVybiB7c3RyaW5nfSB2YWx1ZVxyXG4gICAgKi9cclxuICAgIGdldFZhbHVlKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnN0YXRlLnNlbGVjdGVkVmFsdWVzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSGFuZGxlIGEgY2hhbmdlIG9mIHZhbHVlLlxyXG4gICAgICogQHBhcmFtICB7W3R5cGVdfSBrZXkgICAgICAgdGhlIGtleVxyXG4gICAgICogQHBhcmFtICB7W3R5cGVdfSBuZXdTdGF0dXMgdGhlIG5ldyBzdGF0dXNcclxuICAgICAqL1xyXG4gICAgX2hhbmRsZUNoZWNrYm94Q2hhbmdlKGtleSwgbmV3U3RhdHVzKSB7XHJcbiAgICAgICAgaWYgKHRoaXMucHJvcHMub25DaGFuZ2UpIHtcclxuICAgICAgICAgICAgdGhpcy5wcm9wcy5vbkNoYW5nZShrZXksIG5ld1N0YXR1cyk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3Qgc2VsZWN0ZWRWYWx1ZXMgPSB0aGlzLnN0YXRlLnNlbGVjdGVkVmFsdWVzO1xyXG4gICAgICAgIGlmIChuZXdTdGF0dXMpIHtcclxuICAgICAgICAgICAgc2VsZWN0ZWRWYWx1ZXMucHVzaChrZXkpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHB1bGwoc2VsZWN0ZWRWYWx1ZXMsIGtleSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe3ZhbHVlOiBzZWxlY3RlZFZhbHVlc30pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2xvc3VyZSB0byBjYXB0dXJlIGtleSBhbmQgY2hlY2JveCBzdGF0dXMuXHJcbiAgICAgKiBAcGFyYW0gIHtbdHlwZV19IGtleSB0aGUga2V5IG9mIGNoZWNrYm94XHJcbiAgICAgKiBAcmV0dXJuIHtbdHlwZV19IHN0YXR1cyBjbG9zdXJlXHJcbiAgICAgKi9cclxuICAgIF9nZXRDaGVja2JveENoYW5nZUhhbmRsZXIoa2V5KSB7XHJcbiAgICAgICAgcmV0dXJuIChzdGF0dXMpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5faGFuZGxlQ2hlY2tib3hDaGFuZ2Uoa2V5LCBzdGF0dXMpO1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZW5kZXIgYWxsIHNlbGVjdGlvbiBjaGVja2JveC5cclxuICAgICAqIEByZXR1cm4ge1JlYWN0RE9NTm9kZX0gbGlzdCBvZiBSZWFjdERvbU5vZGVcclxuICAgICAqL1xyXG4gICAgcmVuZGVyQ2hlY2tib3hlcygpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy52YWx1ZXMubWFwKCh2YWwsIGlkeCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCB2YWx1ZSA9IHZhbFt0aGlzLnByb3BzLnZhbHVlS2V5XTtcclxuICAgICAgICAgICAgY29uc3QgbGFiZWwgPSB2YWxbdGhpcy5wcm9wcy5sYWJlbEtleV07XHJcbiAgICAgICAgICAgIGNvbnN0IGlzQ2hlY2tlZCA9IDAgPD0gdGhpcy5zdGF0ZS5zZWxlY3RlZFZhbHVlcy5pbmRleE9mKHZhbHVlKTtcclxuICAgICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICAgIDxDaGVja2JveCBrZXk9e2lkeH0gbGFiZWw9e3RoaXMuaTE4bihsYWJlbCl9IG9uQ2hhbmdlPXt0aGlzLl9nZXRDaGVja2JveENoYW5nZUhhbmRsZXIodmFsdWUpfSB2YWx1ZT17aXNDaGVja2VkfSAvPlxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2IGRhdGEtZm9jdXM9J3NlbGVjdC1jaGVja2JveCc+XHJcbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJDaGVja2JveGVzKCl9XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbn1cclxuXHJcblNlbGVjdENoZWNrYm94LmRpc3BsYXlOYW1lID0gJ1NlbGVjdENoZWNrYm94JztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFNlbGVjdENoZWNrYm94O1xyXG4iXX0=