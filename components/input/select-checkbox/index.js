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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var _require = require('lodash/array'),
    pull = _require.pull;

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
            pull(selectedValues, key);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJyZXF1aXJlIiwicHVsbCIsIlNlbGVjdENoZWNrYm94Iiwic3RhdGUiLCJzZWxlY3RlZFZhbHVlcyIsInByb3BzIiwidmFsdWUiLCJjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzIiwibmV3UHJvcHMiLCJzZXRTdGF0ZSIsImdldFZhbHVlIiwiX2hhbmRsZUNoZWNrYm94Q2hhbmdlIiwia2V5IiwibmV3U3RhdHVzIiwib25DaGFuZ2UiLCJwdXNoIiwiX2dldENoZWNrYm94Q2hhbmdlSGFuZGxlciIsInN0YXR1cyIsInJlbmRlckNoZWNrYm94ZXMiLCJ2YWx1ZXMiLCJtYXAiLCJ2YWwiLCJpZHgiLCJ2YWx1ZUtleSIsImxhYmVsIiwibGFiZWxLZXkiLCJpc0NoZWNrZWQiLCJpbmRleE9mIiwiaTE4biIsInJlbmRlciIsImRlZmF1bHRQcm9wcyIsInByb3BUeXBlcyIsImFycmF5Iiwic3RyaW5nIiwiZnVuYyIsImRpc3BsYXlOYW1lIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7ZUFDZUEsUUFBUSxjQUFSLEM7SUFBUkMsSSxZQUFBQSxJOztJQUdEQyxjOzs7Ozs7Ozs7Ozs7Z0pBZ0JGQyxLLEdBQVE7QUFDSkMsNEJBQWdCLE1BQUtDLEtBQUwsQ0FBV0M7QUFEdkIsUzs7OzZCQUlSQyx5QixzQ0FBMEJDLFEsRUFBVTtBQUNoQyxZQUFHQSxRQUFILEVBQWE7QUFDVCxpQkFBS0MsUUFBTCxDQUFjLEVBQUNMLGdCQUFnQkksU0FBU0YsS0FBMUIsRUFBZDtBQUNIO0FBQ0osSzs7QUFFRDs7Ozs7OzZCQUlBSSxRLHVCQUFXO0FBQ1AsZUFBTyxLQUFLUCxLQUFMLENBQVdDLGNBQWxCO0FBQ0gsSzs7QUFFRDs7Ozs7Ozs2QkFLQU8scUIsa0NBQXNCQyxHLEVBQUtDLFMsRUFBVztBQUNsQyxZQUFHLEtBQUtSLEtBQUwsQ0FBV1MsUUFBZCxFQUF3QjtBQUNwQixpQkFBS1QsS0FBTCxDQUFXUyxRQUFYLENBQW9CRixHQUFwQixFQUF5QkMsU0FBekI7QUFDQTtBQUNIO0FBQ0QsWUFBTVQsaUJBQWlCLEtBQUtELEtBQUwsQ0FBV0MsY0FBbEM7QUFDQSxZQUFHUyxTQUFILEVBQWM7QUFDVlQsMkJBQWVXLElBQWYsQ0FBb0JILEdBQXBCO0FBQ0gsU0FGRCxNQUVPO0FBQ0hYLGlCQUFLRyxjQUFMLEVBQXFCUSxHQUFyQjtBQUNIO0FBQ0QsYUFBS0gsUUFBTCxDQUFjLEVBQUNILE9BQU9GLGNBQVIsRUFBZDtBQUNILEs7O0FBRUQ7Ozs7Ozs7NkJBS0FZLHlCLHNDQUEwQkosRyxFQUFLO0FBQUE7O0FBQzNCLGVBQU8sVUFBQ0ssTUFBRCxFQUFZO0FBQ2YsbUJBQUtOLHFCQUFMLENBQTJCQyxHQUEzQixFQUFnQ0ssTUFBaEM7QUFDSCxTQUZEO0FBR0gsSzs7QUFFRDs7Ozs7OzZCQUlBQyxnQiwrQkFBbUI7QUFBQTs7QUFDZixlQUFPLEtBQUtiLEtBQUwsQ0FBV2MsTUFBWCxDQUFrQkMsR0FBbEIsQ0FBc0IsVUFBQ0MsR0FBRCxFQUFNQyxHQUFOLEVBQWM7QUFDdkMsZ0JBQU1oQixRQUFRZSxJQUFJLE9BQUtoQixLQUFMLENBQVdrQixRQUFmLENBQWQ7QUFDQSxnQkFBTUMsUUFBUUgsSUFBSSxPQUFLaEIsS0FBTCxDQUFXb0IsUUFBZixDQUFkO0FBQ0EsZ0JBQU1DLFlBQVksS0FBSyxPQUFLdkIsS0FBTCxDQUFXQyxjQUFYLENBQTBCdUIsT0FBMUIsQ0FBa0NyQixLQUFsQyxDQUF2QjtBQUNBLG1CQUNJLG9EQUFVLEtBQUtnQixHQUFmLEVBQW9CLE9BQU8sT0FBS00sSUFBTCxDQUFVSixLQUFWLENBQTNCLEVBQTZDLFVBQVUsT0FBS1IseUJBQUwsQ0FBK0JWLEtBQS9CLENBQXZELEVBQThGLE9BQU9vQixTQUFyRyxHQURKO0FBR0gsU0FQTSxDQUFQO0FBUUgsSzs7NkJBRURHLE0scUJBQVM7QUFDTCxlQUNJO0FBQUE7QUFBQSxjQUFLLGNBQVcsaUJBQWhCO0FBQ0ssaUJBQUtYLGdCQUFMO0FBREwsU0FESjtBQUtILEs7Ozs7O0FBckZDaEIsYyxDQUNLNEIsWSxHQUFlO0FBQ2xCWCxZQUFRLEVBRFUsRUFDTjtBQUNaYixXQUFPLEVBRlcsRUFFUDtBQUNYaUIsY0FBVSxPQUhRLEVBR0M7QUFDbkJFLGNBQVUsT0FKUSxDQUlBO0FBSkEsQztBQURwQnZCLGMsQ0FRSzZCLFMsR0FBWTtBQUNmWixZQUFRLGlCQUFVYSxLQURIO0FBRWYxQixXQUFPLGlCQUFVMEIsS0FGRjtBQUdmVCxjQUFVLGlCQUFVVSxNQUhMO0FBSWZSLGNBQVUsaUJBQVVRLE1BSkw7QUFLZm5CLGNBQVUsaUJBQVVvQjtBQUxMLEM7OztBQWdGdkJoQyxlQUFlaUMsV0FBZixHQUE2QixnQkFBN0I7O2tCQUVlakMsYyIsImZpbGUiOiJpcy1yZWFjdC1jbGFzcy1jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnQsIFByb3BUeXBlc30gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgQ2hlY2tib3ggZnJvbSAnLi4vY2hlY2tib3gnO1xyXG5pbXBvcnQgVHJhbnNsYXRpb24gZnJvbSAnLi4vLi4vLi4vYmVoYXZpb3Vycy90cmFuc2xhdGlvbic7XHJcbmNvbnN0IHtwdWxsfSA9IHJlcXVpcmUoJ2xvZGFzaC9hcnJheScpO1xyXG5cclxuQFRyYW5zbGF0aW9uXHJcbmNsYXNzIFNlbGVjdENoZWNrYm94IGV4dGVuZHMgQ29tcG9uZW50IHtcclxuICAgIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XHJcbiAgICAgICAgdmFsdWVzOiBbXSwgLy8gYWxsIHZhbHVlc1xyXG4gICAgICAgIHZhbHVlOiBbXSwgLy8gc2VsZWN0ZWQgdmFsdWVzIGxpc3RcclxuICAgICAgICB2YWx1ZUtleTogJ3ZhbHVlJywgLy8ga2V5IGZvciB0aGUgZGlzcGxheWVkIHZhbHVlXHJcbiAgICAgICAgbGFiZWxLZXk6ICdsYWJlbCcgLy8ga2V5IGZvciB0aGUgZGlzcGxheWVkIGxhYmVsXHJcbiAgICB9O1xyXG5cclxuICAgIHN0YXRpYyBwcm9wVHlwZXMgPSB7XHJcbiAgICAgICAgdmFsdWVzOiBQcm9wVHlwZXMuYXJyYXksXHJcbiAgICAgICAgdmFsdWU6IFByb3BUeXBlcy5hcnJheSxcclxuICAgICAgICB2YWx1ZUtleTogUHJvcFR5cGVzLnN0cmluZyxcclxuICAgICAgICBsYWJlbEtleTogUHJvcFR5cGVzLnN0cmluZyxcclxuICAgICAgICBvbkNoYW5nZTogUHJvcFR5cGVzLmZ1bmNcclxuICAgIH07XHJcblxyXG4gICAgc3RhdGUgPSB7XHJcbiAgICAgICAgc2VsZWN0ZWRWYWx1ZXM6IHRoaXMucHJvcHMudmFsdWVcclxuICAgIH07XHJcblxyXG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXdQcm9wcykge1xyXG4gICAgICAgIGlmKG5ld1Byb3BzKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe3NlbGVjdGVkVmFsdWVzOiBuZXdQcm9wcy52YWx1ZX0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICogR2V0IHRoZSB2YWx1ZSBmcm9tIHRoZSBzZWxlY3QgaW4gdGhlIERPTS5cclxuICAgICogQHJldHVybiB7c3RyaW5nfSB2YWx1ZVxyXG4gICAgKi9cclxuICAgIGdldFZhbHVlKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnN0YXRlLnNlbGVjdGVkVmFsdWVzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSGFuZGxlIGEgY2hhbmdlIG9mIHZhbHVlLlxyXG4gICAgICogQHBhcmFtICB7W3R5cGVdfSBrZXkgICAgICAgdGhlIGtleVxyXG4gICAgICogQHBhcmFtICB7W3R5cGVdfSBuZXdTdGF0dXMgdGhlIG5ldyBzdGF0dXNcclxuICAgICAqL1xyXG4gICAgX2hhbmRsZUNoZWNrYm94Q2hhbmdlKGtleSwgbmV3U3RhdHVzKSB7XHJcbiAgICAgICAgaWYodGhpcy5wcm9wcy5vbkNoYW5nZSkge1xyXG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uQ2hhbmdlKGtleSwgbmV3U3RhdHVzKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBzZWxlY3RlZFZhbHVlcyA9IHRoaXMuc3RhdGUuc2VsZWN0ZWRWYWx1ZXM7XHJcbiAgICAgICAgaWYobmV3U3RhdHVzKSB7XHJcbiAgICAgICAgICAgIHNlbGVjdGVkVmFsdWVzLnB1c2goa2V5KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBwdWxsKHNlbGVjdGVkVmFsdWVzLCBrZXkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnNldFN0YXRlKHt2YWx1ZTogc2VsZWN0ZWRWYWx1ZXN9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENsb3N1cmUgdG8gY2FwdHVyZSBrZXkgYW5kIGNoZWNib3ggc3RhdHVzLlxyXG4gICAgICogQHBhcmFtICB7W3R5cGVdfSBrZXkgdGhlIGtleSBvZiBjaGVja2JveFxyXG4gICAgICogQHJldHVybiB7W3R5cGVdfSBzdGF0dXMgY2xvc3VyZVxyXG4gICAgICovXHJcbiAgICBfZ2V0Q2hlY2tib3hDaGFuZ2VIYW5kbGVyKGtleSkge1xyXG4gICAgICAgIHJldHVybiAoc3RhdHVzKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuX2hhbmRsZUNoZWNrYm94Q2hhbmdlKGtleSwgc3RhdHVzKTtcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVuZGVyIGFsbCBzZWxlY3Rpb24gY2hlY2tib3guXHJcbiAgICAgKiBAcmV0dXJuIHtSZWFjdERPTU5vZGV9IGxpc3Qgb2YgUmVhY3REb21Ob2RlXHJcbiAgICAgKi9cclxuICAgIHJlbmRlckNoZWNrYm94ZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMudmFsdWVzLm1hcCgodmFsLCBpZHgpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgdmFsdWUgPSB2YWxbdGhpcy5wcm9wcy52YWx1ZUtleV07XHJcbiAgICAgICAgICAgIGNvbnN0IGxhYmVsID0gdmFsW3RoaXMucHJvcHMubGFiZWxLZXldO1xyXG4gICAgICAgICAgICBjb25zdCBpc0NoZWNrZWQgPSAwIDw9IHRoaXMuc3RhdGUuc2VsZWN0ZWRWYWx1ZXMuaW5kZXhPZih2YWx1ZSk7XHJcbiAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICA8Q2hlY2tib3gga2V5PXtpZHh9IGxhYmVsPXt0aGlzLmkxOG4obGFiZWwpfSBvbkNoYW5nZT17dGhpcy5fZ2V0Q2hlY2tib3hDaGFuZ2VIYW5kbGVyKHZhbHVlKX0gdmFsdWU9e2lzQ2hlY2tlZH0gLz5cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdiBkYXRhLWZvY3VzPSdzZWxlY3QtY2hlY2tib3gnPlxyXG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVyQ2hlY2tib3hlcygpfVxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG59XHJcblxyXG5TZWxlY3RDaGVja2JveC5kaXNwbGF5TmFtZSA9ICdTZWxlY3RDaGVja2JveCc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBTZWxlY3RDaGVja2JveDtcclxuIl19