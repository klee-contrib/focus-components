'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _class; // Dependencies


var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _reactDatePicker = require('react-date-picker');

var _reactDatePicker2 = _interopRequireDefault(_reactDatePicker);

var _isArray = require('lodash/lang/isArray');

var _isArray2 = _interopRequireDefault(_isArray);

var _uniqueId = require('lodash/utility/uniqueId');

var _uniqueId2 = _interopRequireDefault(_uniqueId);

var _closest = require('closest');

var _closest2 = _interopRequireDefault(_closest);

var _componentBase = require('../../../behaviours/component-base');

var _componentBase2 = _interopRequireDefault(_componentBase);

var _text = require('../text');

var _text2 = _interopRequireDefault(_text);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var isISOString = function isISOString(value) {
    return _moment2.default.utc(value, _moment2.default.ISO_8601, true).isValid();
};

var propTypes = {
    beforeValueGetter: _react.PropTypes.func.isRequired,
    checkOnlyOnBlur: _react.PropTypes.bool,
    triggerOnChangeIfEmpty: _react.PropTypes.bool,
    drops: _react.PropTypes.oneOf(['up', 'down']).isRequired,
    error: _react.PropTypes.string,
    locale: _react.PropTypes.string.isRequired,
    minDate: _react.PropTypes.string,
    maxDate: _react.PropTypes.string,
    name: _react.PropTypes.string.isRequired,
    onChange: _react.PropTypes.func.isRequired,
    placeholder: _react.PropTypes.string,
    showDropdowns: _react.PropTypes.bool.isRequired,
    validate: _react.PropTypes.func,
    value: function value(props, propName, componentName) {
        var prop = props[propName];
        if (prop && !isISOString(prop)) {
            throw new Error('The date ' + prop + ' provided to the component ' + componentName + ' is not an ISO date. Please provide a valid date string.');
        }
    }
};

var defaultProps = {
    beforeValueGetter: function beforeValueGetter(value) {
        return value;
    },
    checkOnlyOnBlur: false,
    triggerOnChangeIfEmpty: true,
    drops: 'down',
    format: 'MM/DD/YYYY',
    locale: 'en',
    /**
    * Default onChange prop, that will log an error.
    */
    onChange: function onChange() {
        console.error('You did not give an onChange method to an input date, please check your code.');
    },

    showDropdowns: true,
    validate: isISOString
};

/**
 * Date input component with text input and date picker.
 * Validate user input at each change in the text input.
 */

var InputDate = (0, _componentBase2.default)(_class = function (_Component) {
    _inherits(InputDate, _Component);

    /**
     * Create a new component.
     * @param {*} props Props.
     */
    function InputDate(props) {
        _classCallCheck(this, InputDate);

        var _this = _possibleConstructorReturn(this, _Component.call(this, props));

        _initialiseProps.call(_this);

        var value = props.value;

        var state = {
            dropDownDate: isISOString(value) ? _moment2.default.utc(value, _moment2.default.ISO_8601) : _moment2.default.utc(),
            inputDate: _this._formatDate(value),
            displayPicker: false
        };
        _this.state = state;
        _this._inputDateId = (0, _uniqueId2.default)('input-date-');
        return _this;
    }

    /**
     * Before component mount.
     */


    InputDate.prototype.componentWillMount = function componentWillMount() {
        document.addEventListener('click', this._onDocumentClick);
    };

    /**
     * Receive component props.
     * @param {*} param0 
     */


    InputDate.prototype.componentWillReceiveProps = function componentWillReceiveProps(_ref) {
        var value = _ref.value;

        this.setState({
            dropDownDate: isISOString(value) ? _moment2.default.utc(value, _moment2.default.ISO_8601) : _moment2.default.utc(),
            inputDate: this._formatDate(value)
        });
    };

    /**
     * Before component unmount.
     */


    InputDate.prototype.componentWillUnmount = function componentWillUnmount() {
        document.removeEventListener('click', this._onDocumentClick);
    };

    /**
     * Check if input value is a valid date.
     */


    /**
     * Parse input value and try converting it to date.
     * Formats could be defined with the format props.
     * The default format is 'MM/DD/YYYY'.
     */


    /**
     * Format the date to the first format in the format props (if array). 
     * The default format is 'MM/DD/YYYY'.
     */


    /**
     * Handle changes.
     */


    /**
     * Handle input text blur.
     */


    /**
     * Handle calendar changes.
     * @memberOf InputDate
     */


    /**
     * Handle input text focus.
     */


    /**
     * Handle document click to close the calendar.
     * @memberOf InputDate
     */


    /**
     * Handle Tab and Enter keys to close the calendar.
     */


    /**
     * Return value in a valid date format.
     */


    /**
     * Validate the input.
     */


    /**
     * Render text input and datepicker.
     */
    InputDate.prototype.render = function render() {
        var _props = this.props,
            error = _props.error,
            locale = _props.locale,
            name = _props.name,
            placeholder = _props.placeholder,
            disabled = _props.disabled,
            minDate = _props.minDate,
            maxDate = _props.maxDate;
        var _state = this.state,
            dropDownDate = _state.dropDownDate,
            inputDate = _state.inputDate,
            displayPicker = _state.displayPicker;
        var _onInputBlur = this._onInputBlur,
            _onInputChange = this._onInputChange,
            _onInputFocus = this._onInputFocus,
            _onDropDownChange = this._onDropDownChange,
            _onPickerCloserClick = this._onPickerCloserClick,
            _handleKeyDown = this._handleKeyDown;

        var inputProps = { disabled: disabled };
        return _react2.default.createElement(
            'div',
            { 'data-focus': 'input-date', 'data-id': this._inputDateId },
            _react2.default.createElement(_text2.default, _extends({ error: error, name: name, onChange: _onInputChange, onKeyDown: _handleKeyDown, onFocus: _onInputFocus, placeholder: placeholder, ref: 'input', value: inputDate }, inputProps)),
            displayPicker && _react2.default.createElement(
                'div',
                { 'data-focus': 'picker-zone' },
                _react2.default.createElement(_reactDatePicker2.default, {
                    date: dropDownDate,
                    hideFooter: true,
                    locale: locale,
                    onChange: _onDropDownChange,
                    ref: 'picker',
                    minDate: minDate,
                    maxDate: maxDate
                })
            )
        );
    };

    return InputDate;
}(_react.Component)) || _class;

var _initialiseProps = function _initialiseProps() {
    var _this2 = this;

    this._isInputFormatCorrect = function (value) {
        return _this2._parseInputDate(value).isValid();
    };

    this._parseInputDate = function (inputDate) {
        var format = _this2.props.format;

        return _moment2.default.utc(inputDate, format, true);
    };

    this._formatDate = function (isoDate) {
        var format = _this2.props.format;

        if (isISOString(isoDate)) {
            if ((0, _isArray2.default)(format)) {
                format = format[0];
            }
            return _moment2.default.utc(isoDate, _moment2.default.ISO_8601).format(format);
        } else {
            return isoDate;
        }
    };

    this._onInputChange = function (inputDate, fromBlur) {
        var _props2 = _this2.props,
            checkOnlyOnBlur = _props2.checkOnlyOnBlur,
            triggerOnChangeIfEmpty = _props2.triggerOnChangeIfEmpty;
        // When checkOnlyOnBlur is true skip all checks.

        if (checkOnlyOnBlur === true && fromBlur !== true) {
            // Use case : incompatibles date formats (DD/MM/YY, DD/MM/YYYY)
            _this2.setState({ inputDate: inputDate });
            return;
        }

        var isCorrect = _this2._isInputFormatCorrect(inputDate);
        var dropDownDate = isCorrect ? _this2._parseInputDate(inputDate) : null;
        var shouldTriggerChange = isCorrect || triggerOnChangeIfEmpty && (inputDate || '').trim() === ''; // Fire onChange event, only if date if correct, or empty, if the option is activated
        var newData = isCorrect ? dropDownDate.toISOString() : null; // if date is not correct, it is empty, so send null (or empty string ?)

        if (isCorrect) {
            _this2.setState({ dropDownDate: dropDownDate, inputDate: inputDate });
        } else {
            _this2.setState({ inputDate: inputDate });
        }

        // When checkOnlyOnBlur is true skip all checks.
        if (checkOnlyOnBlur === true) {
            if (shouldTriggerChange) {
                _this2.props.onChange(newData);
            }
            return;
        }

        // Fire onChange event, only if date if correct, or empty, if the option is activated
        if (fromBlur !== true && shouldTriggerChange) {
            _this2.props.onChange(newData);
        }
    };

    this._onInputBlur = function () {
        var inputDate = _this2.state.inputDate;

        _this2._onInputChange(inputDate, true);
    };

    this._onDropDownChange = function (text, date) {
        if (date._isValid) {
            _this2.setState({ displayPicker: false }, function () {
                var correctedDate = _moment2.default.utc(date).add((0, _moment2.default)(date).utcOffset(), 'minutes').toISOString(); // Add UTC offset to get right ISO string
                _this2.props.onChange(correctedDate);
                _this2._onInputChange(_this2._formatDate(correctedDate), true);
            });
        }
    };

    this._onInputFocus = function () {
        _this2.setState({ displayPicker: true });
    };

    this._onDocumentClick = function (_ref2) {
        var target = _ref2.target;

        var targetClassAttr = target.getAttribute('class');
        var isTriggeredFromPicker = targetClassAttr ? targetClassAttr.includes('dp-cell') : false; //this is the only way to check the target comes from picker cause at this stage, month and year div are unmounted by React.

        // We do not trigger the setState, or the inputBlur if the picker was not displayed
        if (!isTriggeredFromPicker && _this2.state.displayPicker && (0, _closest2.default)(target, '[data-id=\'' + _this2._inputDateId + '\']', true) === undefined) {
            //if target was not triggered inside the date picker, we check it was not triggered by the input
            _this2.setState({ displayPicker: false }, function () {
                return _this2._onInputBlur();
            });
        }
    };

    this._handleKeyDown = function (_ref3) {
        var key = _ref3.key;

        if (key === 'Tab' || key === 'Enter') {
            _this2.setState({ displayPicker: false }, function () {
                return _this2._onInputBlur();
            });
        }
    };

    this.getValue = function () {
        var inputDate = _this2.state.inputDate;

        var rawValue = _this2._isInputFormatCorrect(inputDate) ? _this2._parseInputDate(inputDate).toISOString() : null;
        return _this2.props.beforeValueGetter(rawValue);
    };

    this.validate = function () {
        var inputDate = _this2.state.inputDate;
        var isRequired = _this2.props.isRequired;

        if ('' === inputDate || !inputDate) {
            return {
                isValid: !isRequired,
                message: 'field.required'
            };
        } else {
            return {
                isValid: _this2._isInputFormatCorrect(inputDate),
                message: _this2.i18n('input.date.invalid', { date: inputDate })
            };
        }
    };
};

InputDate.propTypes = propTypes;
InputDate.defaultProps = defaultProps;
InputDate.displayName = 'InputDate';

exports.default = InputDate;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJpc0lTT1N0cmluZyIsInV0YyIsInZhbHVlIiwiSVNPXzg2MDEiLCJpc1ZhbGlkIiwicHJvcFR5cGVzIiwiYmVmb3JlVmFsdWVHZXR0ZXIiLCJmdW5jIiwiaXNSZXF1aXJlZCIsImNoZWNrT25seU9uQmx1ciIsImJvb2wiLCJ0cmlnZ2VyT25DaGFuZ2VJZkVtcHR5IiwiZHJvcHMiLCJvbmVPZiIsImVycm9yIiwic3RyaW5nIiwibG9jYWxlIiwibWluRGF0ZSIsIm1heERhdGUiLCJuYW1lIiwib25DaGFuZ2UiLCJwbGFjZWhvbGRlciIsInNob3dEcm9wZG93bnMiLCJ2YWxpZGF0ZSIsInByb3BzIiwicHJvcE5hbWUiLCJjb21wb25lbnROYW1lIiwicHJvcCIsIkVycm9yIiwiZGVmYXVsdFByb3BzIiwiZm9ybWF0IiwiY29uc29sZSIsIklucHV0RGF0ZSIsInN0YXRlIiwiZHJvcERvd25EYXRlIiwiaW5wdXREYXRlIiwiX2Zvcm1hdERhdGUiLCJkaXNwbGF5UGlja2VyIiwiX2lucHV0RGF0ZUlkIiwiY29tcG9uZW50V2lsbE1vdW50IiwiZG9jdW1lbnQiLCJhZGRFdmVudExpc3RlbmVyIiwiX29uRG9jdW1lbnRDbGljayIsImNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMiLCJzZXRTdGF0ZSIsImNvbXBvbmVudFdpbGxVbm1vdW50IiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsInJlbmRlciIsImRpc2FibGVkIiwiX29uSW5wdXRCbHVyIiwiX29uSW5wdXRDaGFuZ2UiLCJfb25JbnB1dEZvY3VzIiwiX29uRHJvcERvd25DaGFuZ2UiLCJfb25QaWNrZXJDbG9zZXJDbGljayIsIl9oYW5kbGVLZXlEb3duIiwiaW5wdXRQcm9wcyIsIl9pc0lucHV0Rm9ybWF0Q29ycmVjdCIsIl9wYXJzZUlucHV0RGF0ZSIsImlzb0RhdGUiLCJmcm9tQmx1ciIsImlzQ29ycmVjdCIsInNob3VsZFRyaWdnZXJDaGFuZ2UiLCJ0cmltIiwibmV3RGF0YSIsInRvSVNPU3RyaW5nIiwidGV4dCIsImRhdGUiLCJfaXNWYWxpZCIsImNvcnJlY3RlZERhdGUiLCJhZGQiLCJ1dGNPZmZzZXQiLCJ0YXJnZXQiLCJ0YXJnZXRDbGFzc0F0dHIiLCJnZXRBdHRyaWJ1dGUiLCJpc1RyaWdnZXJlZEZyb21QaWNrZXIiLCJpbmNsdWRlcyIsInVuZGVmaW5lZCIsImtleSIsImdldFZhbHVlIiwicmF3VmFsdWUiLCJtZXNzYWdlIiwiaTE4biIsImRpc3BsYXlOYW1lIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztZQUFBOzs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUVBOzs7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FBRUEsSUFBTUEsY0FBYyxTQUFkQSxXQUFjO0FBQUEsV0FBUyxpQkFBT0MsR0FBUCxDQUFXQyxLQUFYLEVBQWtCLGlCQUFPQyxRQUF6QixFQUFtQyxJQUFuQyxFQUF5Q0MsT0FBekMsRUFBVDtBQUFBLENBQXBCOztBQUVBLElBQU1DLFlBQVk7QUFDZEMsdUJBQW1CLGlCQUFVQyxJQUFWLENBQWVDLFVBRHBCO0FBRWRDLHFCQUFpQixpQkFBVUMsSUFGYjtBQUdkQyw0QkFBd0IsaUJBQVVELElBSHBCO0FBSWRFLFdBQU8saUJBQVVDLEtBQVYsQ0FBZ0IsQ0FBQyxJQUFELEVBQU8sTUFBUCxDQUFoQixFQUFnQ0wsVUFKekI7QUFLZE0sV0FBTyxpQkFBVUMsTUFMSDtBQU1kQyxZQUFRLGlCQUFVRCxNQUFWLENBQWlCUCxVQU5YO0FBT2RTLGFBQVMsaUJBQVVGLE1BUEw7QUFRZEcsYUFBUyxpQkFBVUgsTUFSTDtBQVNkSSxVQUFNLGlCQUFVSixNQUFWLENBQWlCUCxVQVRUO0FBVWRZLGNBQVUsaUJBQVViLElBQVYsQ0FBZUMsVUFWWDtBQVdkYSxpQkFBYSxpQkFBVU4sTUFYVDtBQVlkTyxtQkFBZSxpQkFBVVosSUFBVixDQUFlRixVQVpoQjtBQWFkZSxjQUFVLGlCQUFVaEIsSUFiTjtBQWNkTCxXQUFPLGVBQUNzQixLQUFELEVBQVFDLFFBQVIsRUFBa0JDLGFBQWxCLEVBQW9DO0FBQ3ZDLFlBQU1DLE9BQU9ILE1BQU1DLFFBQU4sQ0FBYjtBQUNBLFlBQUlFLFFBQVEsQ0FBQzNCLFlBQVkyQixJQUFaLENBQWIsRUFBZ0M7QUFDNUIsa0JBQU0sSUFBSUMsS0FBSixlQUFzQkQsSUFBdEIsbUNBQXdERCxhQUF4RCw4REFBTjtBQUNIO0FBQ0o7QUFuQmEsQ0FBbEI7O0FBc0JBLElBQU1HLGVBQWU7QUFDakJ2Qix1QkFBbUI7QUFBQSxlQUFTSixLQUFUO0FBQUEsS0FERjtBQUVqQk8scUJBQWlCLEtBRkE7QUFHakJFLDRCQUF3QixJQUhQO0FBSWpCQyxXQUFPLE1BSlU7QUFLakJrQixZQUFRLFlBTFM7QUFNakJkLFlBQVEsSUFOUztBQU9qQjs7O0FBR0FJLFlBVmlCLHNCQVVOO0FBQ1BXLGdCQUFRakIsS0FBUixDQUFjLCtFQUFkO0FBQ0gsS0FaZ0I7O0FBYWpCUSxtQkFBZSxJQWJFO0FBY2pCQyxjQUFVdkI7QUFkTyxDQUFyQjs7QUFpQkE7Ozs7O0lBS01nQyxTOzs7QUFDRjs7OztBQUlBLHVCQUFZUixLQUFaLEVBQW1CO0FBQUE7O0FBQUEscURBQ2Ysc0JBQU1BLEtBQU4sQ0FEZTs7QUFBQTs7QUFBQSxZQUVQdEIsS0FGTyxHQUVHc0IsS0FGSCxDQUVQdEIsS0FGTzs7QUFHZixZQUFNK0IsUUFBUTtBQUNWQywwQkFBY2xDLFlBQVlFLEtBQVosSUFBcUIsaUJBQU9ELEdBQVAsQ0FBV0MsS0FBWCxFQUFrQixpQkFBT0MsUUFBekIsQ0FBckIsR0FBMEQsaUJBQU9GLEdBQVAsRUFEOUQ7QUFFVmtDLHVCQUFXLE1BQUtDLFdBQUwsQ0FBaUJsQyxLQUFqQixDQUZEO0FBR1ZtQywyQkFBZTtBQUhMLFNBQWQ7QUFLQSxjQUFLSixLQUFMLEdBQWFBLEtBQWI7QUFDQSxjQUFLSyxZQUFMLEdBQW9CLHdCQUFTLGFBQVQsQ0FBcEI7QUFUZTtBQVVsQjs7QUFFRDs7Ozs7d0JBR0FDLGtCLGlDQUFxQjtBQUNqQkMsaUJBQVNDLGdCQUFULENBQTBCLE9BQTFCLEVBQW1DLEtBQUtDLGdCQUF4QztBQUNILEs7O0FBRUQ7Ozs7Ozt3QkFJQUMseUIsNENBQXFDO0FBQUEsWUFBVHpDLEtBQVMsUUFBVEEsS0FBUzs7QUFDakMsYUFBSzBDLFFBQUwsQ0FBYztBQUNWViwwQkFBY2xDLFlBQVlFLEtBQVosSUFBcUIsaUJBQU9ELEdBQVAsQ0FBV0MsS0FBWCxFQUFrQixpQkFBT0MsUUFBekIsQ0FBckIsR0FBMEQsaUJBQU9GLEdBQVAsRUFEOUQ7QUFFVmtDLHVCQUFXLEtBQUtDLFdBQUwsQ0FBaUJsQyxLQUFqQjtBQUZELFNBQWQ7QUFJSCxLOztBQUVEOzs7Ozt3QkFHQTJDLG9CLG1DQUF1QjtBQUNuQkwsaUJBQVNNLG1CQUFULENBQTZCLE9BQTdCLEVBQXNDLEtBQUtKLGdCQUEzQztBQUNILEs7O0FBRUQ7Ozs7O0FBS0E7Ozs7Ozs7QUFVQTs7Ozs7O0FBZ0JBOzs7OztBQXFDQTs7Ozs7QUFRQTs7Ozs7O0FBY0E7Ozs7O0FBT0E7Ozs7OztBQWVBOzs7OztBQVNBOzs7OztBQVNBOzs7OztBQW1CQTs7O3dCQUdBSyxNLHFCQUFTO0FBQUEscUJBQ29FLEtBQUt2QixLQUR6RTtBQUFBLFlBQ0dWLEtBREgsVUFDR0EsS0FESDtBQUFBLFlBQ1VFLE1BRFYsVUFDVUEsTUFEVjtBQUFBLFlBQ2tCRyxJQURsQixVQUNrQkEsSUFEbEI7QUFBQSxZQUN3QkUsV0FEeEIsVUFDd0JBLFdBRHhCO0FBQUEsWUFDcUMyQixRQURyQyxVQUNxQ0EsUUFEckM7QUFBQSxZQUMrQy9CLE9BRC9DLFVBQytDQSxPQUQvQztBQUFBLFlBQ3dEQyxPQUR4RCxVQUN3REEsT0FEeEQ7QUFBQSxxQkFFOEMsS0FBS2UsS0FGbkQ7QUFBQSxZQUVHQyxZQUZILFVBRUdBLFlBRkg7QUFBQSxZQUVpQkMsU0FGakIsVUFFaUJBLFNBRmpCO0FBQUEsWUFFNEJFLGFBRjVCLFVBRTRCQSxhQUY1QjtBQUFBLFlBR0dZLFlBSEgsR0FHNEcsSUFINUcsQ0FHR0EsWUFISDtBQUFBLFlBR2lCQyxjQUhqQixHQUc0RyxJQUg1RyxDQUdpQkEsY0FIakI7QUFBQSxZQUdpQ0MsYUFIakMsR0FHNEcsSUFINUcsQ0FHaUNBLGFBSGpDO0FBQUEsWUFHZ0RDLGlCQUhoRCxHQUc0RyxJQUg1RyxDQUdnREEsaUJBSGhEO0FBQUEsWUFHbUVDLG9CQUhuRSxHQUc0RyxJQUg1RyxDQUdtRUEsb0JBSG5FO0FBQUEsWUFHeUZDLGNBSHpGLEdBRzRHLElBSDVHLENBR3lGQSxjQUh6Rjs7QUFJTCxZQUFNQyxhQUFhLEVBQUVQLGtCQUFGLEVBQW5CO0FBQ0EsZUFDSTtBQUFBO0FBQUEsY0FBSyxjQUFXLFlBQWhCLEVBQTZCLFdBQVMsS0FBS1YsWUFBM0M7QUFDSSxxRUFBVyxPQUFPeEIsS0FBbEIsRUFBeUIsTUFBTUssSUFBL0IsRUFBcUMsVUFBVStCLGNBQS9DLEVBQStELFdBQVdJLGNBQTFFLEVBQTBGLFNBQVNILGFBQW5HLEVBQWtILGFBQWE5QixXQUEvSCxFQUE0SSxLQUFJLE9BQWhKLEVBQXdKLE9BQU9jLFNBQS9KLElBQThLb0IsVUFBOUssRUFESjtBQUVLbEIsNkJBQ0c7QUFBQTtBQUFBLGtCQUFLLGNBQVcsYUFBaEI7QUFDSTtBQUNJLDBCQUFNSCxZQURWO0FBRUksb0NBRko7QUFHSSw0QkFBUWxCLE1BSFo7QUFJSSw4QkFBVW9DLGlCQUpkO0FBS0kseUJBQUksUUFMUjtBQU1JLDZCQUFTbkMsT0FOYjtBQU9JLDZCQUFTQztBQVBiO0FBREo7QUFIUixTQURKO0FBa0JILEs7Ozs7Ozs7O1NBNUtEc0MscUIsR0FBd0I7QUFBQSxlQUFTLE9BQUtDLGVBQUwsQ0FBcUJ2RCxLQUFyQixFQUE0QkUsT0FBNUIsRUFBVDtBQUFBLEs7O1NBT3hCcUQsZSxHQUFrQixxQkFBYTtBQUFBLFlBQ25CM0IsTUFEbUIsR0FDUixPQUFLTixLQURHLENBQ25CTSxNQURtQjs7QUFFM0IsZUFBTyxpQkFBTzdCLEdBQVAsQ0FBV2tDLFNBQVgsRUFBc0JMLE1BQXRCLEVBQThCLElBQTlCLENBQVA7QUFDSCxLOztTQU1ETSxXLEdBQWMsbUJBQVc7QUFBQSxZQUNmTixNQURlLEdBQ0osT0FBS04sS0FERCxDQUNmTSxNQURlOztBQUVyQixZQUFJOUIsWUFBWTBELE9BQVosQ0FBSixFQUEwQjtBQUN0QixnQkFBSSx1QkFBUTVCLE1BQVIsQ0FBSixFQUFxQjtBQUNqQkEseUJBQVNBLE9BQU8sQ0FBUCxDQUFUO0FBQ0g7QUFDRCxtQkFBTyxpQkFBTzdCLEdBQVAsQ0FBV3lELE9BQVgsRUFBb0IsaUJBQU92RCxRQUEzQixFQUFxQzJCLE1BQXJDLENBQTRDQSxNQUE1QyxDQUFQO0FBQ0gsU0FMRCxNQUtPO0FBQ0gsbUJBQU80QixPQUFQO0FBQ0g7QUFDSixLOztTQUtEUixjLEdBQWlCLFVBQUNmLFNBQUQsRUFBWXdCLFFBQVosRUFBeUI7QUFBQSxzQkFDWSxPQUFLbkMsS0FEakI7QUFBQSxZQUNoQ2YsZUFEZ0MsV0FDaENBLGVBRGdDO0FBQUEsWUFDZkUsc0JBRGUsV0FDZkEsc0JBRGU7QUFFdEM7O0FBQ0EsWUFBSUYsb0JBQW9CLElBQXBCLElBQTRCa0QsYUFBYSxJQUE3QyxFQUFtRDtBQUMvQztBQUNBLG1CQUFLZixRQUFMLENBQWMsRUFBRVQsb0JBQUYsRUFBZDtBQUNBO0FBQ0g7O0FBRUQsWUFBTXlCLFlBQVksT0FBS0oscUJBQUwsQ0FBMkJyQixTQUEzQixDQUFsQjtBQUNBLFlBQU1ELGVBQWUwQixZQUFZLE9BQUtILGVBQUwsQ0FBcUJ0QixTQUFyQixDQUFaLEdBQThDLElBQW5FO0FBQ0EsWUFBTTBCLHNCQUFzQkQsYUFBY2pELDBCQUEwQixDQUFDd0IsYUFBYSxFQUFkLEVBQWtCMkIsSUFBbEIsT0FBNkIsRUFBakcsQ0FYc0MsQ0FXZ0U7QUFDdEcsWUFBTUMsVUFBVUgsWUFBWTFCLGFBQWE4QixXQUFiLEVBQVosR0FBeUMsSUFBekQsQ0Fac0MsQ0FZeUI7O0FBRS9ELFlBQUlKLFNBQUosRUFBZTtBQUNYLG1CQUFLaEIsUUFBTCxDQUFjLEVBQUVWLDBCQUFGLEVBQWdCQyxvQkFBaEIsRUFBZDtBQUNILFNBRkQsTUFFTztBQUNILG1CQUFLUyxRQUFMLENBQWMsRUFBRVQsb0JBQUYsRUFBZDtBQUNIOztBQUVEO0FBQ0EsWUFBSTFCLG9CQUFvQixJQUF4QixFQUE4QjtBQUMxQixnQkFBSW9ELG1CQUFKLEVBQXlCO0FBQ3JCLHVCQUFLckMsS0FBTCxDQUFXSixRQUFYLENBQW9CMkMsT0FBcEI7QUFDSDtBQUNEO0FBQ0g7O0FBRUQ7QUFDQSxZQUFJSixhQUFhLElBQWIsSUFBcUJFLG1CQUF6QixFQUE4QztBQUMxQyxtQkFBS3JDLEtBQUwsQ0FBV0osUUFBWCxDQUFvQjJDLE9BQXBCO0FBQ0g7QUFDSixLOztTQUtEZCxZLEdBQWUsWUFBTTtBQUFBLFlBQ1RkLFNBRFMsR0FDSyxPQUFLRixLQURWLENBQ1RFLFNBRFM7O0FBRWpCLGVBQUtlLGNBQUwsQ0FBb0JmLFNBQXBCLEVBQStCLElBQS9CO0FBQ0gsSzs7U0FNRGlCLGlCLEdBQW9CLFVBQUNhLElBQUQsRUFBT0MsSUFBUCxFQUFnQjtBQUNoQyxZQUFJQSxLQUFLQyxRQUFULEVBQW1CO0FBQ2YsbUJBQUt2QixRQUFMLENBQWMsRUFBRVAsZUFBZSxLQUFqQixFQUFkLEVBQXdDLFlBQU07QUFDMUMsb0JBQU0rQixnQkFBZ0IsaUJBQU9uRSxHQUFQLENBQVdpRSxJQUFYLEVBQWlCRyxHQUFqQixDQUFxQixzQkFBT0gsSUFBUCxFQUFhSSxTQUFiLEVBQXJCLEVBQStDLFNBQS9DLEVBQTBETixXQUExRCxFQUF0QixDQUQwQyxDQUNxRDtBQUMvRix1QkFBS3hDLEtBQUwsQ0FBV0osUUFBWCxDQUFvQmdELGFBQXBCO0FBQ0EsdUJBQUtsQixjQUFMLENBQW9CLE9BQUtkLFdBQUwsQ0FBaUJnQyxhQUFqQixDQUFwQixFQUFxRCxJQUFyRDtBQUNILGFBSkQ7QUFLSDtBQUNKLEs7O1NBS0RqQixhLEdBQWdCLFlBQU07QUFDbEIsZUFBS1AsUUFBTCxDQUFjLEVBQUVQLGVBQWUsSUFBakIsRUFBZDtBQUNILEs7O1NBTURLLGdCLEdBQW1CLGlCQUFnQjtBQUFBLFlBQWI2QixNQUFhLFNBQWJBLE1BQWE7O0FBQy9CLFlBQU1DLGtCQUFrQkQsT0FBT0UsWUFBUCxDQUFvQixPQUFwQixDQUF4QjtBQUNBLFlBQU1DLHdCQUF3QkYsa0JBQWtCQSxnQkFBZ0JHLFFBQWhCLENBQXlCLFNBQXpCLENBQWxCLEdBQXdELEtBQXRGLENBRitCLENBRThEOztBQUU3RjtBQUNBLFlBQUksQ0FBQ0QscUJBQUQsSUFBMEIsT0FBS3pDLEtBQUwsQ0FBV0ksYUFBckMsSUFBc0QsdUJBQVFrQyxNQUFSLGtCQUE2QixPQUFLakMsWUFBbEMsVUFBb0QsSUFBcEQsTUFBOERzQyxTQUF4SCxFQUFtSTtBQUMvSDtBQUNBLG1CQUFLaEMsUUFBTCxDQUFjLEVBQUVQLGVBQWUsS0FBakIsRUFBZCxFQUF3QztBQUFBLHVCQUFNLE9BQUtZLFlBQUwsRUFBTjtBQUFBLGFBQXhDO0FBQ0g7QUFDSixLOztTQUtESyxjLEdBQWlCLGlCQUFhO0FBQUEsWUFBVnVCLEdBQVUsU0FBVkEsR0FBVTs7QUFDMUIsWUFBSUEsUUFBUSxLQUFSLElBQWlCQSxRQUFRLE9BQTdCLEVBQXNDO0FBQ2xDLG1CQUFLakMsUUFBTCxDQUFjLEVBQUVQLGVBQWUsS0FBakIsRUFBZCxFQUF3QztBQUFBLHVCQUFNLE9BQUtZLFlBQUwsRUFBTjtBQUFBLGFBQXhDO0FBQ0g7QUFDSixLOztTQUtENkIsUSxHQUFXLFlBQU07QUFBQSxZQUNMM0MsU0FESyxHQUNTLE9BQUtGLEtBRGQsQ0FDTEUsU0FESzs7QUFFYixZQUFNNEMsV0FBVyxPQUFLdkIscUJBQUwsQ0FBMkJyQixTQUEzQixJQUF3QyxPQUFLc0IsZUFBTCxDQUFxQnRCLFNBQXJCLEVBQWdDNkIsV0FBaEMsRUFBeEMsR0FBd0YsSUFBekc7QUFDQSxlQUFPLE9BQUt4QyxLQUFMLENBQVdsQixpQkFBWCxDQUE2QnlFLFFBQTdCLENBQVA7QUFDSCxLOztTQUtEeEQsUSxHQUFXLFlBQU07QUFBQSxZQUNMWSxTQURLLEdBQ1MsT0FBS0YsS0FEZCxDQUNMRSxTQURLO0FBQUEsWUFFTDNCLFVBRkssR0FFVSxPQUFLZ0IsS0FGZixDQUVMaEIsVUFGSzs7QUFHYixZQUFJLE9BQU8yQixTQUFQLElBQW9CLENBQUNBLFNBQXpCLEVBQW9DO0FBQ2hDLG1CQUFRO0FBQ0ovQix5QkFBUyxDQUFDSSxVQUROO0FBRUp3RSx5QkFBUztBQUZMLGFBQVI7QUFJSCxTQUxELE1BS087QUFDSCxtQkFBUTtBQUNKNUUseUJBQVMsT0FBS29ELHFCQUFMLENBQTJCckIsU0FBM0IsQ0FETDtBQUVKNkMseUJBQVMsT0FBS0MsSUFBTCxDQUFVLG9CQUFWLEVBQWdDLEVBQUVmLE1BQU0vQixTQUFSLEVBQWhDO0FBRkwsYUFBUjtBQUlIO0FBQ0osSzs7O0FBK0JMSCxVQUFVM0IsU0FBVixHQUFzQkEsU0FBdEI7QUFDQTJCLFVBQVVILFlBQVYsR0FBeUJBLFlBQXpCO0FBQ0FHLFVBQVVrRCxXQUFWLEdBQXdCLFdBQXhCOztrQkFFZWxELFMiLCJmaWxlIjoiaXMtcmVhY3QtY2xhc3MtY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gRGVwZW5kZW5jaWVzXHJcbmltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQsIFByb3BUeXBlcyB9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IFJlYWN0RE9NIGZyb20gJ3JlYWN0LWRvbSc7XHJcbmltcG9ydCBtb21lbnQgZnJvbSAnbW9tZW50JztcclxuaW1wb3J0IERhdGVQaWNrZXIgZnJvbSAncmVhY3QtZGF0ZS1waWNrZXInO1xyXG5pbXBvcnQgaXNBcnJheSBmcm9tICdsb2Rhc2gvbGFuZy9pc0FycmF5JztcclxuaW1wb3J0IHVuaXF1ZUlkIGZyb20gJ2xvZGFzaC91dGlsaXR5L3VuaXF1ZUlkJztcclxuaW1wb3J0IGNsb3Nlc3QgZnJvbSAnY2xvc2VzdCc7XHJcblxyXG5pbXBvcnQgQmFzZSBmcm9tICcuLi8uLi8uLi9iZWhhdmlvdXJzL2NvbXBvbmVudC1iYXNlJztcclxuaW1wb3J0IElucHV0VGV4dCBmcm9tICcuLi90ZXh0JztcclxuXHJcbmNvbnN0IGlzSVNPU3RyaW5nID0gdmFsdWUgPT4gbW9tZW50LnV0Yyh2YWx1ZSwgbW9tZW50LklTT184NjAxLCB0cnVlKS5pc1ZhbGlkKCk7XHJcblxyXG5jb25zdCBwcm9wVHlwZXMgPSB7XHJcbiAgICBiZWZvcmVWYWx1ZUdldHRlcjogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcclxuICAgIGNoZWNrT25seU9uQmx1cjogUHJvcFR5cGVzLmJvb2wsXHJcbiAgICB0cmlnZ2VyT25DaGFuZ2VJZkVtcHR5OiBQcm9wVHlwZXMuYm9vbCxcclxuICAgIGRyb3BzOiBQcm9wVHlwZXMub25lT2YoWyd1cCcsICdkb3duJ10pLmlzUmVxdWlyZWQsXHJcbiAgICBlcnJvcjogUHJvcFR5cGVzLnN0cmluZyxcclxuICAgIGxvY2FsZTogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxyXG4gICAgbWluRGF0ZTogUHJvcFR5cGVzLnN0cmluZyxcclxuICAgIG1heERhdGU6IFByb3BUeXBlcy5zdHJpbmcsXHJcbiAgICBuYW1lOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXHJcbiAgICBvbkNoYW5nZTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcclxuICAgIHBsYWNlaG9sZGVyOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG4gICAgc2hvd0Ryb3Bkb3duczogUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcclxuICAgIHZhbGlkYXRlOiBQcm9wVHlwZXMuZnVuYyxcclxuICAgIHZhbHVlOiAocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lKSA9PiB7XHJcbiAgICAgICAgY29uc3QgcHJvcCA9IHByb3BzW3Byb3BOYW1lXTtcclxuICAgICAgICBpZiAocHJvcCAmJiAhaXNJU09TdHJpbmcocHJvcCkpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBUaGUgZGF0ZSAke3Byb3B9IHByb3ZpZGVkIHRvIHRoZSBjb21wb25lbnQgJHtjb21wb25lbnROYW1lfSBpcyBub3QgYW4gSVNPIGRhdGUuIFBsZWFzZSBwcm92aWRlIGEgdmFsaWQgZGF0ZSBzdHJpbmcuYCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59O1xyXG5cclxuY29uc3QgZGVmYXVsdFByb3BzID0ge1xyXG4gICAgYmVmb3JlVmFsdWVHZXR0ZXI6IHZhbHVlID0+IHZhbHVlLFxyXG4gICAgY2hlY2tPbmx5T25CbHVyOiBmYWxzZSxcclxuICAgIHRyaWdnZXJPbkNoYW5nZUlmRW1wdHk6IHRydWUsXHJcbiAgICBkcm9wczogJ2Rvd24nLFxyXG4gICAgZm9ybWF0OiAnTU0vREQvWVlZWScsXHJcbiAgICBsb2NhbGU6ICdlbicsXHJcbiAgICAvKipcclxuICAgICogRGVmYXVsdCBvbkNoYW5nZSBwcm9wLCB0aGF0IHdpbGwgbG9nIGFuIGVycm9yLlxyXG4gICAgKi9cclxuICAgIG9uQ2hhbmdlKCkge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ1lvdSBkaWQgbm90IGdpdmUgYW4gb25DaGFuZ2UgbWV0aG9kIHRvIGFuIGlucHV0IGRhdGUsIHBsZWFzZSBjaGVjayB5b3VyIGNvZGUuJyk7XHJcbiAgICB9LFxyXG4gICAgc2hvd0Ryb3Bkb3duczogdHJ1ZSxcclxuICAgIHZhbGlkYXRlOiBpc0lTT1N0cmluZ1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIERhdGUgaW5wdXQgY29tcG9uZW50IHdpdGggdGV4dCBpbnB1dCBhbmQgZGF0ZSBwaWNrZXIuXHJcbiAqIFZhbGlkYXRlIHVzZXIgaW5wdXQgYXQgZWFjaCBjaGFuZ2UgaW4gdGhlIHRleHQgaW5wdXQuXHJcbiAqL1xyXG5AQmFzZVxyXG5jbGFzcyBJbnB1dERhdGUgZXh0ZW5kcyBDb21wb25lbnQge1xyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGUgYSBuZXcgY29tcG9uZW50LlxyXG4gICAgICogQHBhcmFtIHsqfSBwcm9wcyBQcm9wcy5cclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcclxuICAgICAgICBzdXBlcihwcm9wcyk7XHJcbiAgICAgICAgY29uc3QgeyB2YWx1ZSB9ID0gcHJvcHM7XHJcbiAgICAgICAgY29uc3Qgc3RhdGUgPSB7XHJcbiAgICAgICAgICAgIGRyb3BEb3duRGF0ZTogaXNJU09TdHJpbmcodmFsdWUpID8gbW9tZW50LnV0Yyh2YWx1ZSwgbW9tZW50LklTT184NjAxKSA6IG1vbWVudC51dGMoKSxcclxuICAgICAgICAgICAgaW5wdXREYXRlOiB0aGlzLl9mb3JtYXREYXRlKHZhbHVlKSxcclxuICAgICAgICAgICAgZGlzcGxheVBpY2tlcjogZmFsc2VcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSBzdGF0ZTtcclxuICAgICAgICB0aGlzLl9pbnB1dERhdGVJZCA9IHVuaXF1ZUlkKCdpbnB1dC1kYXRlLScpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQmVmb3JlIGNvbXBvbmVudCBtb3VudC5cclxuICAgICAqL1xyXG4gICAgY29tcG9uZW50V2lsbE1vdW50KCkge1xyXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5fb25Eb2N1bWVudENsaWNrKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlY2VpdmUgY29tcG9uZW50IHByb3BzLlxyXG4gICAgICogQHBhcmFtIHsqfSBwYXJhbTAgXHJcbiAgICAgKi9cclxuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMoeyB2YWx1ZSB9KSB7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgICAgIGRyb3BEb3duRGF0ZTogaXNJU09TdHJpbmcodmFsdWUpID8gbW9tZW50LnV0Yyh2YWx1ZSwgbW9tZW50LklTT184NjAxKSA6IG1vbWVudC51dGMoKSxcclxuICAgICAgICAgICAgaW5wdXREYXRlOiB0aGlzLl9mb3JtYXREYXRlKHZhbHVlKVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQmVmb3JlIGNvbXBvbmVudCB1bm1vdW50LlxyXG4gICAgICovXHJcbiAgICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcclxuICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuX29uRG9jdW1lbnRDbGljayk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDaGVjayBpZiBpbnB1dCB2YWx1ZSBpcyBhIHZhbGlkIGRhdGUuXHJcbiAgICAgKi9cclxuICAgIF9pc0lucHV0Rm9ybWF0Q29ycmVjdCA9IHZhbHVlID0+IHRoaXMuX3BhcnNlSW5wdXREYXRlKHZhbHVlKS5pc1ZhbGlkKCk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBQYXJzZSBpbnB1dCB2YWx1ZSBhbmQgdHJ5IGNvbnZlcnRpbmcgaXQgdG8gZGF0ZS5cclxuICAgICAqIEZvcm1hdHMgY291bGQgYmUgZGVmaW5lZCB3aXRoIHRoZSBmb3JtYXQgcHJvcHMuXHJcbiAgICAgKiBUaGUgZGVmYXVsdCBmb3JtYXQgaXMgJ01NL0REL1lZWVknLlxyXG4gICAgICovXHJcbiAgICBfcGFyc2VJbnB1dERhdGUgPSBpbnB1dERhdGUgPT4ge1xyXG4gICAgICAgIGNvbnN0IHsgZm9ybWF0IH0gPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIHJldHVybiBtb21lbnQudXRjKGlucHV0RGF0ZSwgZm9ybWF0LCB0cnVlKTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBGb3JtYXQgdGhlIGRhdGUgdG8gdGhlIGZpcnN0IGZvcm1hdCBpbiB0aGUgZm9ybWF0IHByb3BzIChpZiBhcnJheSkuIFxyXG4gICAgICogVGhlIGRlZmF1bHQgZm9ybWF0IGlzICdNTS9ERC9ZWVlZJy5cclxuICAgICAqL1xyXG4gICAgX2Zvcm1hdERhdGUgPSBpc29EYXRlID0+IHtcclxuICAgICAgICBsZXQgeyBmb3JtYXQgfSA9IHRoaXMucHJvcHM7XHJcbiAgICAgICAgaWYgKGlzSVNPU3RyaW5nKGlzb0RhdGUpKSB7XHJcbiAgICAgICAgICAgIGlmIChpc0FycmF5KGZvcm1hdCkpIHtcclxuICAgICAgICAgICAgICAgIGZvcm1hdCA9IGZvcm1hdFswXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gbW9tZW50LnV0Yyhpc29EYXRlLCBtb21lbnQuSVNPXzg2MDEpLmZvcm1hdChmb3JtYXQpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBpc29EYXRlO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBIYW5kbGUgY2hhbmdlcy5cclxuICAgICAqL1xyXG4gICAgX29uSW5wdXRDaGFuZ2UgPSAoaW5wdXREYXRlLCBmcm9tQmx1cikgPT4ge1xyXG4gICAgICAgIGxldCB7IGNoZWNrT25seU9uQmx1ciwgdHJpZ2dlck9uQ2hhbmdlSWZFbXB0eSB9ID0gdGhpcy5wcm9wcztcclxuICAgICAgICAvLyBXaGVuIGNoZWNrT25seU9uQmx1ciBpcyB0cnVlIHNraXAgYWxsIGNoZWNrcy5cclxuICAgICAgICBpZiAoY2hlY2tPbmx5T25CbHVyID09PSB0cnVlICYmIGZyb21CbHVyICE9PSB0cnVlKSB7XHJcbiAgICAgICAgICAgIC8vIFVzZSBjYXNlIDogaW5jb21wYXRpYmxlcyBkYXRlIGZvcm1hdHMgKEREL01NL1lZLCBERC9NTS9ZWVlZKVxyXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgaW5wdXREYXRlIH0pO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBpc0NvcnJlY3QgPSB0aGlzLl9pc0lucHV0Rm9ybWF0Q29ycmVjdChpbnB1dERhdGUpO1xyXG4gICAgICAgIGNvbnN0IGRyb3BEb3duRGF0ZSA9IGlzQ29ycmVjdCA/IHRoaXMuX3BhcnNlSW5wdXREYXRlKGlucHV0RGF0ZSkgOiBudWxsO1xyXG4gICAgICAgIGNvbnN0IHNob3VsZFRyaWdnZXJDaGFuZ2UgPSBpc0NvcnJlY3QgfHwgKHRyaWdnZXJPbkNoYW5nZUlmRW1wdHkgJiYgKGlucHV0RGF0ZSB8fCAnJykudHJpbSgpID09PSAnJyk7IC8vIEZpcmUgb25DaGFuZ2UgZXZlbnQsIG9ubHkgaWYgZGF0ZSBpZiBjb3JyZWN0LCBvciBlbXB0eSwgaWYgdGhlIG9wdGlvbiBpcyBhY3RpdmF0ZWRcclxuICAgICAgICBjb25zdCBuZXdEYXRhID0gaXNDb3JyZWN0ID8gZHJvcERvd25EYXRlLnRvSVNPU3RyaW5nKCkgOiBudWxsOyAvLyBpZiBkYXRlIGlzIG5vdCBjb3JyZWN0LCBpdCBpcyBlbXB0eSwgc28gc2VuZCBudWxsIChvciBlbXB0eSBzdHJpbmcgPylcclxuICAgICAgXHJcbiAgICAgICAgaWYgKGlzQ29ycmVjdCkge1xyXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgZHJvcERvd25EYXRlLCBpbnB1dERhdGUgfSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IGlucHV0RGF0ZSB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gV2hlbiBjaGVja09ubHlPbkJsdXIgaXMgdHJ1ZSBza2lwIGFsbCBjaGVja3MuXHJcbiAgICAgICAgaWYgKGNoZWNrT25seU9uQmx1ciA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICBpZiAoc2hvdWxkVHJpZ2dlckNoYW5nZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5vbkNoYW5nZShuZXdEYXRhKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBGaXJlIG9uQ2hhbmdlIGV2ZW50LCBvbmx5IGlmIGRhdGUgaWYgY29ycmVjdCwgb3IgZW1wdHksIGlmIHRoZSBvcHRpb24gaXMgYWN0aXZhdGVkXHJcbiAgICAgICAgaWYgKGZyb21CbHVyICE9PSB0cnVlICYmIHNob3VsZFRyaWdnZXJDaGFuZ2UpIHtcclxuICAgICAgICAgICAgdGhpcy5wcm9wcy5vbkNoYW5nZShuZXdEYXRhKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogSGFuZGxlIGlucHV0IHRleHQgYmx1ci5cclxuICAgICAqL1xyXG4gICAgX29uSW5wdXRCbHVyID0gKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHsgaW5wdXREYXRlIH0gPSB0aGlzLnN0YXRlO1xyXG4gICAgICAgIHRoaXMuX29uSW5wdXRDaGFuZ2UoaW5wdXREYXRlLCB0cnVlKTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBIYW5kbGUgY2FsZW5kYXIgY2hhbmdlcy5cclxuICAgICAqIEBtZW1iZXJPZiBJbnB1dERhdGVcclxuICAgICAqL1xyXG4gICAgX29uRHJvcERvd25DaGFuZ2UgPSAodGV4dCwgZGF0ZSkgPT4ge1xyXG4gICAgICAgIGlmIChkYXRlLl9pc1ZhbGlkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBkaXNwbGF5UGlja2VyOiBmYWxzZSB9LCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBjb3JyZWN0ZWREYXRlID0gbW9tZW50LnV0YyhkYXRlKS5hZGQobW9tZW50KGRhdGUpLnV0Y09mZnNldCgpLCAnbWludXRlcycpLnRvSVNPU3RyaW5nKCk7IC8vIEFkZCBVVEMgb2Zmc2V0IHRvIGdldCByaWdodCBJU08gc3RyaW5nXHJcbiAgICAgICAgICAgICAgICB0aGlzLnByb3BzLm9uQ2hhbmdlKGNvcnJlY3RlZERhdGUpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fb25JbnB1dENoYW5nZSh0aGlzLl9mb3JtYXREYXRlKGNvcnJlY3RlZERhdGUpLCB0cnVlKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEhhbmRsZSBpbnB1dCB0ZXh0IGZvY3VzLlxyXG4gICAgICovXHJcbiAgICBfb25JbnB1dEZvY3VzID0gKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyBkaXNwbGF5UGlja2VyOiB0cnVlIH0pO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEhhbmRsZSBkb2N1bWVudCBjbGljayB0byBjbG9zZSB0aGUgY2FsZW5kYXIuXHJcbiAgICAgKiBAbWVtYmVyT2YgSW5wdXREYXRlXHJcbiAgICAgKi9cclxuICAgIF9vbkRvY3VtZW50Q2xpY2sgPSAoeyB0YXJnZXQgfSkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHRhcmdldENsYXNzQXR0ciA9IHRhcmdldC5nZXRBdHRyaWJ1dGUoJ2NsYXNzJyk7XHJcbiAgICAgICAgY29uc3QgaXNUcmlnZ2VyZWRGcm9tUGlja2VyID0gdGFyZ2V0Q2xhc3NBdHRyID8gdGFyZ2V0Q2xhc3NBdHRyLmluY2x1ZGVzKCdkcC1jZWxsJykgOiBmYWxzZTsgLy90aGlzIGlzIHRoZSBvbmx5IHdheSB0byBjaGVjayB0aGUgdGFyZ2V0IGNvbWVzIGZyb20gcGlja2VyIGNhdXNlIGF0IHRoaXMgc3RhZ2UsIG1vbnRoIGFuZCB5ZWFyIGRpdiBhcmUgdW5tb3VudGVkIGJ5IFJlYWN0LlxyXG5cclxuICAgICAgICAvLyBXZSBkbyBub3QgdHJpZ2dlciB0aGUgc2V0U3RhdGUsIG9yIHRoZSBpbnB1dEJsdXIgaWYgdGhlIHBpY2tlciB3YXMgbm90IGRpc3BsYXllZFxyXG4gICAgICAgIGlmICghaXNUcmlnZ2VyZWRGcm9tUGlja2VyICYmIHRoaXMuc3RhdGUuZGlzcGxheVBpY2tlciAmJiBjbG9zZXN0KHRhcmdldCwgYFtkYXRhLWlkPScke3RoaXMuX2lucHV0RGF0ZUlkfSddYCwgdHJ1ZSkgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAvL2lmIHRhcmdldCB3YXMgbm90IHRyaWdnZXJlZCBpbnNpZGUgdGhlIGRhdGUgcGlja2VyLCB3ZSBjaGVjayBpdCB3YXMgbm90IHRyaWdnZXJlZCBieSB0aGUgaW5wdXRcclxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IGRpc3BsYXlQaWNrZXI6IGZhbHNlIH0sICgpID0+IHRoaXMuX29uSW5wdXRCbHVyKCkpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBIYW5kbGUgVGFiIGFuZCBFbnRlciBrZXlzIHRvIGNsb3NlIHRoZSBjYWxlbmRhci5cclxuICAgICAqL1xyXG4gICAgX2hhbmRsZUtleURvd24gPSAoeyBrZXkgfSkgPT4ge1xyXG4gICAgICAgIGlmIChrZXkgPT09ICdUYWInIHx8IGtleSA9PT0gJ0VudGVyJykge1xyXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgZGlzcGxheVBpY2tlcjogZmFsc2UgfSwgKCkgPT4gdGhpcy5fb25JbnB1dEJsdXIoKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybiB2YWx1ZSBpbiBhIHZhbGlkIGRhdGUgZm9ybWF0LlxyXG4gICAgICovXHJcbiAgICBnZXRWYWx1ZSA9ICgpID0+IHtcclxuICAgICAgICBjb25zdCB7IGlucHV0RGF0ZSB9ID0gdGhpcy5zdGF0ZTtcclxuICAgICAgICBjb25zdCByYXdWYWx1ZSA9IHRoaXMuX2lzSW5wdXRGb3JtYXRDb3JyZWN0KGlucHV0RGF0ZSkgPyB0aGlzLl9wYXJzZUlucHV0RGF0ZShpbnB1dERhdGUpLnRvSVNPU3RyaW5nKCkgOiBudWxsO1xyXG4gICAgICAgIHJldHVybiB0aGlzLnByb3BzLmJlZm9yZVZhbHVlR2V0dGVyKHJhd1ZhbHVlKTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBWYWxpZGF0ZSB0aGUgaW5wdXQuXHJcbiAgICAgKi9cclxuICAgIHZhbGlkYXRlID0gKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHsgaW5wdXREYXRlIH0gPSB0aGlzLnN0YXRlO1xyXG4gICAgICAgIGNvbnN0IHsgaXNSZXF1aXJlZCB9ID0gdGhpcy5wcm9wcztcclxuICAgICAgICBpZiAoJycgPT09IGlucHV0RGF0ZSB8fCAhaW5wdXREYXRlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAoe1xyXG4gICAgICAgICAgICAgICAgaXNWYWxpZDogIWlzUmVxdWlyZWQsXHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiAnZmllbGQucmVxdWlyZWQnXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiAoe1xyXG4gICAgICAgICAgICAgICAgaXNWYWxpZDogdGhpcy5faXNJbnB1dEZvcm1hdENvcnJlY3QoaW5wdXREYXRlKSxcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6IHRoaXMuaTE4bignaW5wdXQuZGF0ZS5pbnZhbGlkJywgeyBkYXRlOiBpbnB1dERhdGUgfSlcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlbmRlciB0ZXh0IGlucHV0IGFuZCBkYXRlcGlja2VyLlxyXG4gICAgICovXHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgY29uc3QgeyBlcnJvciwgbG9jYWxlLCBuYW1lLCBwbGFjZWhvbGRlciwgZGlzYWJsZWQsIG1pbkRhdGUsIG1heERhdGUgfSA9IHRoaXMucHJvcHM7XHJcbiAgICAgICAgY29uc3QgeyBkcm9wRG93bkRhdGUsIGlucHV0RGF0ZSwgZGlzcGxheVBpY2tlciB9ID0gdGhpcy5zdGF0ZTtcclxuICAgICAgICBjb25zdCB7IF9vbklucHV0Qmx1ciwgX29uSW5wdXRDaGFuZ2UsIF9vbklucHV0Rm9jdXMsIF9vbkRyb3BEb3duQ2hhbmdlLCBfb25QaWNrZXJDbG9zZXJDbGljaywgX2hhbmRsZUtleURvd24gfSA9IHRoaXM7XHJcbiAgICAgICAgY29uc3QgaW5wdXRQcm9wcyA9IHsgZGlzYWJsZWQgfTtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2IGRhdGEtZm9jdXM9J2lucHV0LWRhdGUnIGRhdGEtaWQ9e3RoaXMuX2lucHV0RGF0ZUlkfT5cclxuICAgICAgICAgICAgICAgIDxJbnB1dFRleHQgZXJyb3I9e2Vycm9yfSBuYW1lPXtuYW1lfSBvbkNoYW5nZT17X29uSW5wdXRDaGFuZ2V9IG9uS2V5RG93bj17X2hhbmRsZUtleURvd259IG9uRm9jdXM9e19vbklucHV0Rm9jdXN9IHBsYWNlaG9sZGVyPXtwbGFjZWhvbGRlcn0gcmVmPSdpbnB1dCcgdmFsdWU9e2lucHV0RGF0ZX0gey4uLmlucHV0UHJvcHN9IC8+XHJcbiAgICAgICAgICAgICAgICB7ZGlzcGxheVBpY2tlciAmJlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgZGF0YS1mb2N1cz0ncGlja2VyLXpvbmUnPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8RGF0ZVBpY2tlclxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0ZT17ZHJvcERvd25EYXRlfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGlkZUZvb3RlclxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9jYWxlPXtsb2NhbGV9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17X29uRHJvcERvd25DaGFuZ2V9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWY9J3BpY2tlcidcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1pbkRhdGU9e21pbkRhdGV9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXhEYXRlPXttYXhEYXRlfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG59XHJcblxyXG5JbnB1dERhdGUucHJvcFR5cGVzID0gcHJvcFR5cGVzO1xyXG5JbnB1dERhdGUuZGVmYXVsdFByb3BzID0gZGVmYXVsdFByb3BzO1xyXG5JbnB1dERhdGUuZGlzcGxheU5hbWUgPSAnSW5wdXREYXRlJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IElucHV0RGF0ZTtcclxuIl19