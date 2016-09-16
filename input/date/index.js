'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _i18next = require('i18next');

var _i18next2 = _interopRequireDefault(_i18next);

var _text = require('../text');

var _text2 = _interopRequireDefault(_text);

var _reactDatePicker = require('react-date-picker');

var _reactDatePicker2 = _interopRequireDefault(_reactDatePicker);

var _isArray = require('lodash/isArray');

var _isArray2 = _interopRequireDefault(_isArray);

var _uniqueId = require('lodash/uniqueId');

var _uniqueId2 = _interopRequireDefault(_uniqueId);

var _closest = require('closest');

var _closest2 = _interopRequireDefault(_closest);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); } // Dependencies


var isISOString = function isISOString(value) {
    return (0, _moment2.default)(value, _moment2.default.ISO_8601).isValid();
};

var propTypes = {
    drops: _react.PropTypes.oneOf(['up', 'down']).isRequired,
    error: _react.PropTypes.string,
    locale: _react.PropTypes.string.isRequired,
    name: _react.PropTypes.string.isRequired,
    onChange: _react.PropTypes.func.isRequired,
    beforeValueGetter: _react.PropTypes.func.isRequired,
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
    drops: 'down',
    locale: 'en',
    format: 'MM/DD/YYYY',
    beforeValueGetter: function beforeValueGetter(value) {
        return value;
    },
    /**
    * Default onChange prop, that will log an error.
    */
    onChange: function onChange() {
        console.error('You did not give an onChange method to an input date, please check your code.');
    },

    showDropdowns: true,
    validate: isISOString
};

var InputDate = function (_Component) {
    _inherits(InputDate, _Component);

    function InputDate(props) {
        _classCallCheck(this, InputDate);

        var _this = _possibleConstructorReturn(this, _Component.call(this, props));

        _initialiseProps.call(_this);

        var value = props.value;

        var state = {
            dropDownDate: isISOString(value) ? (0, _moment2.default)(value, _moment2.default.ISO_8601) : (0, _moment2.default)(),
            inputDate: _this._formatDate(value),
            displayPicker: false
        };
        _this.state = state;
        _this._inputDateId = (0, _uniqueId2.default)('input-date-');
        return _this;
    }

    InputDate.prototype.componentWillMount = function componentWillMount() {
        _moment2.default.locale(this.props.locale);
        document.addEventListener('click', this._onDocumentClick);
    };

    InputDate.prototype.componentDidMount = function componentDidMount() {
        var _props = this.props;
        var drops = _props.drops;
        var showDropdowns = _props.showDropdowns;
        var startDate = this.state.inputDate;
    };

    InputDate.prototype.componentWillReceiveProps = function componentWillReceiveProps(_ref) {
        var value = _ref.value;

        this.setState({
            dropDownDate: isISOString(value) ? (0, _moment2.default)(value, _moment2.default.ISO_8601) : (0, _moment2.default)(),
            inputDate: this._formatDate(value)
        });
    };

    InputDate.prototype.componentWillUnmount = function componentWillUnmount() {
        document.removeEventListener('click', this._onDocumentClick);
    };

    InputDate.prototype.render = function render() {
        var _props2 = this.props;
        var error = _props2.error;
        var locale = _props2.locale;
        var name = _props2.name;
        var placeholder = _props2.placeholder;
        var disabled = _props2.disabled;
        var _state = this.state;
        var dropDownDate = _state.dropDownDate;
        var inputDate = _state.inputDate;
        var displayPicker = _state.displayPicker;
        var _onInputBlur = this._onInputBlur;
        var _onInputChange = this._onInputChange;
        var _onInputFocus = this._onInputFocus;
        var _onDropDownChange = this._onDropDownChange;
        var _onPickerCloserClick = this._onPickerCloserClick;
        var _handleKeyDown = this._handleKeyDown;

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
                    ref: 'picker'
                })
            )
        );
    };

    return InputDate;
}(_react.Component);

var _initialiseProps = function _initialiseProps() {
    var _this2 = this;

    this._isInputFormatCorrect = function (value) {
        return _this2._parseInputDate(value).isValid();
    };

    this._parseInputDate = function (inputDate) {
        var format = _this2.props.format;

        return (0, _moment2.default)(inputDate, format);
    };

    this._formatDate = function (isoDate) {
        var format = _this2.props.format;

        if (isISOString(isoDate)) {
            if ((0, _isArray2.default)(format)) {
                format = format[0];
            }
            return (0, _moment2.default)(isoDate, _moment2.default.ISO_8601).format(format);
        } else {
            return isoDate;
        }
    };

    this._onInputChange = function (inputDate) {
        if (_this2._isInputFormatCorrect(inputDate)) {
            var dropDownDate = _this2._parseInputDate(inputDate);
            _this2.setState({ dropDownDate: dropDownDate, inputDate: inputDate });
        } else {
            _this2.setState({ inputDate: inputDate });
        }
    };

    this._onInputBlur = function () {
        var inputDate = _this2.state.inputDate;

        if (_this2._isInputFormatCorrect(inputDate)) {
            _this2.props.onChange(_this2._parseInputDate(inputDate).toISOString());
        } else {
            _this2.props.onChange(inputDate);
        }
    };

    this._onDropDownChange = function (text, date) {
        if (date._isValid) {
            _this2.setState({ displayPicker: false }, function () {
                _this2.props.onChange(date.toISOString());
                _this2._onInputChange(_this2._formatDate(date.toISOString())); // Add 12 hours to avoid skipping a day due to different locales
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
        if (!isTriggeredFromPicker) {
            //if target was not triggered inside the date picker, we check it was not triggered by the input
            if ((0, _closest2.default)(target, '[data-id=\'' + _this2._inputDateId + '\']', true) === undefined) {
                _this2.setState({ displayPicker: false }, function () {
                    return _this2._onInputBlur();
                });
            }
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
                message: _i18next2.default.t('input.date.error.invalid', { date: inputDate })
            };
        }
    };
};

InputDate.propTypes = propTypes;
InputDate.defaultProps = defaultProps;
InputDate.displayName = 'InputDate';

exports.default = InputDate;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZyLUZSLmpzIl0sIm5hbWVzIjpbImlzSVNPU3RyaW5nIiwidmFsdWUiLCJJU09fODYwMSIsImlzVmFsaWQiLCJwcm9wVHlwZXMiLCJkcm9wcyIsIm9uZU9mIiwiaXNSZXF1aXJlZCIsImVycm9yIiwic3RyaW5nIiwibG9jYWxlIiwibmFtZSIsIm9uQ2hhbmdlIiwiZnVuYyIsImJlZm9yZVZhbHVlR2V0dGVyIiwicGxhY2Vob2xkZXIiLCJzaG93RHJvcGRvd25zIiwiYm9vbCIsInZhbGlkYXRlIiwicHJvcHMiLCJwcm9wTmFtZSIsImNvbXBvbmVudE5hbWUiLCJwcm9wIiwiRXJyb3IiLCJkZWZhdWx0UHJvcHMiLCJmb3JtYXQiLCJjb25zb2xlIiwiSW5wdXREYXRlIiwic3RhdGUiLCJkcm9wRG93bkRhdGUiLCJpbnB1dERhdGUiLCJfZm9ybWF0RGF0ZSIsImRpc3BsYXlQaWNrZXIiLCJfaW5wdXREYXRlSWQiLCJjb21wb25lbnRXaWxsTW91bnQiLCJkb2N1bWVudCIsImFkZEV2ZW50TGlzdGVuZXIiLCJfb25Eb2N1bWVudENsaWNrIiwiY29tcG9uZW50RGlkTW91bnQiLCJzdGFydERhdGUiLCJjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzIiwic2V0U3RhdGUiLCJjb21wb25lbnRXaWxsVW5tb3VudCIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJyZW5kZXIiLCJkaXNhYmxlZCIsIl9vbklucHV0Qmx1ciIsIl9vbklucHV0Q2hhbmdlIiwiX29uSW5wdXRGb2N1cyIsIl9vbkRyb3BEb3duQ2hhbmdlIiwiX29uUGlja2VyQ2xvc2VyQ2xpY2siLCJfaGFuZGxlS2V5RG93biIsImlucHV0UHJvcHMiLCJfaXNJbnB1dEZvcm1hdENvcnJlY3QiLCJfcGFyc2VJbnB1dERhdGUiLCJpc29EYXRlIiwidG9JU09TdHJpbmciLCJ0ZXh0IiwiZGF0ZSIsIl9pc1ZhbGlkIiwidGFyZ2V0IiwidGFyZ2V0Q2xhc3NBdHRyIiwiZ2V0QXR0cmlidXRlIiwiaXNUcmlnZ2VyZWRGcm9tUGlja2VyIiwiaW5jbHVkZXMiLCJ1bmRlZmluZWQiLCJrZXkiLCJnZXRWYWx1ZSIsInJhd1ZhbHVlIiwibWVzc2FnZSIsInQiLCJkaXNwbGF5TmFtZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OzsrZUFUQTs7O0FBV0EsSUFBTUEsY0FBYyxTQUFkQSxXQUFjO0FBQUEsV0FBUyxzQkFBT0MsS0FBUCxFQUFjLGlCQUFPQyxRQUFyQixFQUErQkMsT0FBL0IsRUFBVDtBQUFBLENBQXBCOztBQUVBLElBQU1DLFlBQVk7QUFDZEMsV0FBTyxpQkFBVUMsS0FBVixDQUFnQixDQUFDLElBQUQsRUFBTyxNQUFQLENBQWhCLEVBQWdDQyxVQUR6QjtBQUVkQyxXQUFPLGlCQUFVQyxNQUZIO0FBR2RDLFlBQVEsaUJBQVVELE1BQVYsQ0FBaUJGLFVBSFg7QUFJZEksVUFBTSxpQkFBVUYsTUFBVixDQUFpQkYsVUFKVDtBQUtkSyxjQUFVLGlCQUFVQyxJQUFWLENBQWVOLFVBTFg7QUFNZE8sdUJBQW1CLGlCQUFVRCxJQUFWLENBQWVOLFVBTnBCO0FBT2RRLGlCQUFhLGlCQUFVTixNQVBUO0FBUWRPLG1CQUFlLGlCQUFVQyxJQUFWLENBQWVWLFVBUmhCO0FBU2RXLGNBQVUsaUJBQVVMLElBVE47QUFVZFosV0FBTyxlQUFDa0IsS0FBRCxFQUFRQyxRQUFSLEVBQWtCQyxhQUFsQixFQUFvQztBQUN2QyxZQUFNQyxPQUFPSCxNQUFNQyxRQUFOLENBQWI7QUFDQSxZQUFJRSxRQUFRLENBQUN0QixZQUFZc0IsSUFBWixDQUFiLEVBQWdDO0FBQzVCLGtCQUFNLElBQUlDLEtBQUosZUFBc0JELElBQXRCLG1DQUF3REQsYUFBeEQsOERBQU47QUFDSDtBQUNKO0FBZmEsQ0FBbEI7O0FBa0JBLElBQU1HLGVBQWU7QUFDakJuQixXQUFPLE1BRFU7QUFFakJLLFlBQVEsSUFGUztBQUdqQmUsWUFBUSxZ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O0FBRUo4RCx5QkFBUztBQUZMLGFBQVI7QUFJSCxTQUxELE1BS087QUFDSCxtQkFBUTtBQUNKbEUseUJBQVMsT0FBS2tELHFCQUFMLENBQTJCdkIsU0FBM0IsQ0FETDtBQUVKdUMseUJBQVMsa0JBQVFDLENBQVIsQ0FBVSwwQkFBVixFQUFzQyxFQUFDWixNQUFNNUIsU0FBUCxFQUF0QztBQUZMLGFBQVI7QUFJSDtBQUNKLEs7OztBQTBCTEgsVUFBVXZCLFNBQVYsR0FBc0JBLFNBQXRCO0FBQ0F1QixVQUFVSCxZQUFWLEdBQXlCQSxZQUF6QjtBQUNBRyxVQUFVNEMsV0FBVixHQUF3QixXQUF4Qjs7a0JBRWU1QyxTIiwiZmlsZSI6ImZyLUZSLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gRGVwZW5kZW5jaWVzXHJcbmltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgUHJvcFR5cGVzfSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBSZWFjdERPTSBmcm9tICdyZWFjdC1kb20nO1xyXG5pbXBvcnQgbW9tZW50IGZyb20gJ21vbWVudCc7XHJcbmltcG9ydCBpMThuZXh0IGZyb20gJ2kxOG5leHQnO1xyXG5pbXBvcnQgSW5wdXRUZXh0IGZyb20gJy4uL3RleHQnO1xyXG5pbXBvcnQgRGF0ZVBpY2tlciBmcm9tICdyZWFjdC1kYXRlLXBpY2tlcic7XHJcbmltcG9ydCBpc0FycmF5IGZyb20gJ2xvZGFzaC9pc0FycmF5JztcclxuaW1wb3J0IHVuaXF1ZUlkIGZyb20gJ2xvZGFzaC91bmlxdWVJZCc7XHJcbmltcG9ydCBjbG9zZXN0IGZyb20gJ2Nsb3Nlc3QnO1xyXG5cclxuY29uc3QgaXNJU09TdHJpbmcgPSB2YWx1ZSA9PiBtb21lbnQodmFsdWUsIG1vbWVudC5JU09fODYwMSkuaXNWYWxpZCgpO1xyXG5cclxuY29uc3QgcHJvcFR5cGVzID0ge1xyXG4gICAgZHJvcHM6IFByb3BUeXBlcy5vbmVPZihbJ3VwJywgJ2Rvd24nXSkuaXNSZXF1aXJlZCxcclxuICAgIGVycm9yOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG4gICAgbG9jYWxlOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXHJcbiAgICBuYW1lOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXHJcbiAgICBvbkNoYW5nZTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcclxuICAgIGJlZm9yZVZhbHVlR2V0dGVyOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxyXG4gICAgcGxhY2Vob2xkZXI6IFByb3BUeXBlcy5zdHJpbmcsXHJcbiAgICBzaG93RHJvcGRvd25zOiBQcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxyXG4gICAgdmFsaWRhdGU6IFByb3BUeXBlcy5mdW5jLFxyXG4gICAgdmFsdWU6IChwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUpID0+IHtcclxuICAgICAgICBjb25zdCBwcm9wID0gcHJvcHNbcHJvcE5hbWVdO1xyXG4gICAgICAgIGlmIChwcm9wICYmICFpc0lTT1N0cmluZyhwcm9wKSkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFRoZSBkYXRlICR7cHJvcH0gcHJvdmlkZWQgdG8gdGhlIGNvbXBvbmVudCAke2NvbXBvbmVudE5hbWV9IGlzIG5vdCBhbiBJU08gZGF0ZS4gUGxlYXNlIHByb3ZpZGUgYSB2YWxpZCBkYXRlIHN0cmluZy5gKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07XHJcblxyXG5jb25zdCBkZWZhdWx0UHJvcHMgPSB7XHJcbiAgICBkcm9wczogJ2Rvd24nLFxyXG4gICAgbG9jYWxlOiAnZW4nLFxyXG4gICAgZm9ybWF0OiAnTU0vREQvWVlZWScsXHJcbiAgICBiZWZvcmVWYWx1ZUdldHRlcjogdmFsdWUgPT4gdmFsdWUsXHJcbiAgICAvKipcclxuICAgICogRGVmYXVsdCBvbkNoYW5nZSBwcm9wLCB0aGF0IHdpbGwgbG9nIGFuIGVycm9yLlxyXG4gICAgKi9cclxuICAgIG9uQ2hhbmdlKCkge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ1lvdSBkaWQgbm90IGdpdmUgYW4gb25DaGFuZ2UgbWV0aG9kIHRvIGFuIGlucHV0IGRhdGUsIHBsZWFzZSBjaGVjayB5b3VyIGNvZGUuJyk7XHJcbiAgICB9LFxyXG4gICAgc2hvd0Ryb3Bkb3duczogdHJ1ZSxcclxuICAgIHZhbGlkYXRlOiBpc0lTT1N0cmluZ1xyXG59O1xyXG5cclxuY2xhc3MgSW5wdXREYXRlIGV4dGVuZHMgQ29tcG9uZW50IHtcclxuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XHJcbiAgICAgICAgc3VwZXIocHJvcHMpO1xyXG4gICAgICAgIGNvbnN0IHt2YWx1ZX0gPSBwcm9wcztcclxuICAgICAgICBjb25zdCBzdGF0ZSA9IHtcclxuICAgICAgICAgICAgZHJvcERvd25EYXRlOiBpc0lTT1N0cmluZyh2YWx1ZSkgPyBtb21lbnQodmFsdWUsIG1vbWVudC5JU09fODYwMSkgOiBtb21lbnQoKSxcclxuICAgICAgICAgICAgaW5wdXREYXRlOiB0aGlzLl9mb3JtYXREYXRlKHZhbHVlKSxcclxuICAgICAgICAgICAgZGlzcGxheVBpY2tlcjogZmFsc2VcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSBzdGF0ZTtcclxuICAgICAgICB0aGlzLl9pbnB1dERhdGVJZCA9IHVuaXF1ZUlkKCdpbnB1dC1kYXRlLScpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbXBvbmVudFdpbGxNb3VudCgpIHtcclxuICAgICAgICBtb21lbnQubG9jYWxlKHRoaXMucHJvcHMubG9jYWxlKTtcclxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuX29uRG9jdW1lbnRDbGljayk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xyXG4gICAgICAgIGNvbnN0IHtkcm9wcywgc2hvd0Ryb3Bkb3duc30gPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIGNvbnN0IHtpbnB1dERhdGU6IHN0YXJ0RGF0ZX0gPSB0aGlzLnN0YXRlO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMoe3ZhbHVlfSkge1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgICAgICBkcm9wRG93bkRhdGU6IGlzSVNPU3RyaW5nKHZhbHVlKSA/IG1vbWVudCh2YWx1ZSwgbW9tZW50LklTT184NjAxKSA6IG1vbWVudCgpLFxyXG4gICAgICAgICAgICBpbnB1dERhdGU6IHRoaXMuX2Zvcm1hdERhdGUodmFsdWUpXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XHJcbiAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLl9vbkRvY3VtZW50Q2xpY2spO1xyXG4gICAgfVxyXG5cclxuICAgIF9pc0lucHV0Rm9ybWF0Q29ycmVjdCA9IHZhbHVlID0+IHRoaXMuX3BhcnNlSW5wdXREYXRlKHZhbHVlKS5pc1ZhbGlkKCk7XHJcblxyXG4gICAgX3BhcnNlSW5wdXREYXRlID0gaW5wdXREYXRlID0+IHtcclxuICAgICAgICBjb25zdCB7Zm9ybWF0fSA9IHRoaXMucHJvcHM7XHJcbiAgICAgICAgcmV0dXJuIG1vbWVudChpbnB1dERhdGUsIGZvcm1hdCk7XHJcbiAgICB9O1xyXG5cclxuICAgIF9mb3JtYXREYXRlID0gaXNvRGF0ZSA9PiB7XHJcbiAgICAgICAgbGV0IHtmb3JtYXR9ID0gdGhpcy5wcm9wcztcclxuICAgICAgICBpZiAoaXNJU09TdHJpbmcoaXNvRGF0ZSkpIHtcclxuICAgICAgICAgICAgaWYgKGlzQXJyYXkoZm9ybWF0KSkge1xyXG4gICAgICAgICAgICAgICAgZm9ybWF0ID0gZm9ybWF0WzBdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBtb21lbnQoaXNvRGF0ZSwgbW9tZW50LklTT184NjAxKS5mb3JtYXQoZm9ybWF0KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gaXNvRGF0ZTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIF9vbklucHV0Q2hhbmdlID0gaW5wdXREYXRlID0+IHtcclxuICAgICAgICBpZiAodGhpcy5faXNJbnB1dEZvcm1hdENvcnJlY3QoaW5wdXREYXRlKSkge1xyXG4gICAgICAgICAgICBjb25zdCBkcm9wRG93bkRhdGUgPSB0aGlzLl9wYXJzZUlucHV0RGF0ZShpbnB1dERhdGUpO1xyXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtkcm9wRG93bkRhdGUsIGlucHV0RGF0ZX0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2lucHV0RGF0ZX0pO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgX29uSW5wdXRCbHVyID0gKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHtpbnB1dERhdGV9ID0gdGhpcy5zdGF0ZTtcclxuICAgICAgICBpZiAodGhpcy5faXNJbnB1dEZvcm1hdENvcnJlY3QoaW5wdXREYXRlKSkge1xyXG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uQ2hhbmdlKHRoaXMuX3BhcnNlSW5wdXREYXRlKGlucHV0RGF0ZSkudG9JU09TdHJpbmcoKSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5wcm9wcy5vbkNoYW5nZShpbnB1dERhdGUpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgX29uRHJvcERvd25DaGFuZ2UgPSAodGV4dCwgZGF0ZSkgPT4ge1xyXG4gICAgICAgIGlmIChkYXRlLl9pc1ZhbGlkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2Rpc3BsYXlQaWNrZXI6IGZhbHNlfSwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5vbkNoYW5nZShkYXRlLnRvSVNPU3RyaW5nKCkpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fb25JbnB1dENoYW5nZSh0aGlzLl9mb3JtYXREYXRlKGRhdGUudG9JU09TdHJpbmcoKSkpOyAvLyBBZGQgMTIgaG91cnMgdG8gYXZvaWQgc2tpcHBpbmcgYSBkYXkgZHVlIHRvIGRpZmZlcmVudCBsb2NhbGVzXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgX29uSW5wdXRGb2N1cyA9ICgpID0+IHtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHtkaXNwbGF5UGlja2VyOiB0cnVlfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIF9vbkRvY3VtZW50Q2xpY2sgPSAoe3RhcmdldH0pID0+IHtcclxuICAgICAgICBjb25zdCB0YXJnZXRDbGFzc0F0dHIgPSB0YXJnZXQuZ2V0QXR0cmlidXRlKCdjbGFzcycpO1xyXG4gICAgICAgIGNvbnN0IGlzVHJpZ2dlcmVkRnJvbVBpY2tlciA9IHRhcmdldENsYXNzQXR0ciA/IHRhcmdldENsYXNzQXR0ci5pbmNsdWRlcygnZHAtY2VsbCcpIDogZmFsc2U7IC8vdGhpcyBpcyB0aGUgb25seSB3YXkgdG8gY2hlY2sgdGhlIHRhcmdldCBjb21lcyBmcm9tIHBpY2tlciBjYXVzZSBhdCB0aGlzIHN0YWdlLCBtb250aCBhbmQgeWVhciBkaXYgYXJlIHVubW91bnRlZCBieSBSZWFjdC5cclxuICAgICAgICBpZighaXNUcmlnZ2VyZWRGcm9tUGlja2VyKSB7XHJcbiAgICAgICAgICAgIC8vaWYgdGFyZ2V0IHdhcyBub3QgdHJpZ2dlcmVkIGluc2lkZSB0aGUgZGF0ZSBwaWNrZXIsIHdlIGNoZWNrIGl0IHdhcyBub3QgdHJpZ2dlcmVkIGJ5IHRoZSBpbnB1dFxyXG4gICAgICAgICAgICBpZiAoY2xvc2VzdCh0YXJnZXQsIGBbZGF0YS1pZD0nJHt0aGlzLl9pbnB1dERhdGVJZH0nXWAsIHRydWUpID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2Rpc3BsYXlQaWNrZXI6IGZhbHNlfSwgKCkgPT4gdGhpcy5fb25JbnB1dEJsdXIoKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIF9oYW5kbGVLZXlEb3duID0gKHtrZXl9KSA9PiB7XHJcbiAgICAgICAgaWYgKGtleSA9PT0gJ1RhYicgfHwga2V5ID09PSAnRW50ZXInKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2Rpc3BsYXlQaWNrZXI6IGZhbHNlfSwgKCkgPT4gdGhpcy5fb25JbnB1dEJsdXIoKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBnZXRWYWx1ZSA9ICgpID0+IHtcclxuICAgICAgICBjb25zdCB7aW5wdXREYXRlfSA9IHRoaXMuc3RhdGU7XHJcbiAgICAgICAgY29uc3QgcmF3VmFsdWUgPSB0aGlzLl9pc0lucHV0Rm9ybWF0Q29ycmVjdChpbnB1dERhdGUpID8gdGhpcy5fcGFyc2VJbnB1dERhdGUoaW5wdXREYXRlKS50b0lTT1N0cmluZygpIDogbnVsbDtcclxuICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5iZWZvcmVWYWx1ZUdldHRlcihyYXdWYWx1ZSk7XHJcbiAgICB9O1xyXG5cclxuICAgIHZhbGlkYXRlID0gKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHtpbnB1dERhdGV9ID0gdGhpcy5zdGF0ZTtcclxuICAgICAgICBjb25zdCB7aXNSZXF1aXJlZH0gPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIGlmICgnJyA9PT0gaW5wdXREYXRlIHx8ICFpbnB1dERhdGUpIHtcclxuICAgICAgICAgICAgcmV0dXJuICh7XHJcbiAgICAgICAgICAgICAgICBpc1ZhbGlkOiAhaXNSZXF1aXJlZCxcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6ICdmaWVsZC5yZXF1aXJlZCdcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuICh7XHJcbiAgICAgICAgICAgICAgICBpc1ZhbGlkOiB0aGlzLl9pc0lucHV0Rm9ybWF0Q29ycmVjdChpbnB1dERhdGUpLFxyXG4gICAgICAgICAgICAgICAgbWVzc2FnZTogaTE4bmV4dC50KCdpbnB1dC5kYXRlLmVycm9yLmludmFsaWQnLCB7ZGF0ZTogaW5wdXREYXRlfSlcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgY29uc3Qge2Vycm9yLCBsb2NhbGUsIG5hbWUsIHBsYWNlaG9sZGVyLCBkaXNhYmxlZH0gPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIGNvbnN0IHtkcm9wRG93bkRhdGUsIGlucHV0RGF0ZSwgZGlzcGxheVBpY2tlcn0gPSB0aGlzLnN0YXRlO1xyXG4gICAgICAgIGNvbnN0IHtfb25JbnB1dEJsdXIsIF9vbklucHV0Q2hhbmdlLCBfb25JbnB1dEZvY3VzLCBfb25Ecm9wRG93bkNoYW5nZSwgX29uUGlja2VyQ2xvc2VyQ2xpY2ssIF9oYW5kbGVLZXlEb3dufSA9IHRoaXM7XHJcbiAgICAgICAgY29uc3QgaW5wdXRQcm9wcyA9IHsgZGlzYWJsZWQgfTtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2IGRhdGEtZm9jdXM9J2lucHV0LWRhdGUnIGRhdGEtaWQ9e3RoaXMuX2lucHV0RGF0ZUlkfT5cclxuICAgICAgICAgICAgICAgIDxJbnB1dFRleHQgZXJyb3I9e2Vycm9yfSBuYW1lPXtuYW1lfSBvbkNoYW5nZT17X29uSW5wdXRDaGFuZ2V9IG9uS2V5RG93bj17X2hhbmRsZUtleURvd259IG9uRm9jdXM9e19vbklucHV0Rm9jdXN9IHBsYWNlaG9sZGVyPXtwbGFjZWhvbGRlcn0gcmVmPSdpbnB1dCcgdmFsdWU9e2lucHV0RGF0ZX0gey4uLmlucHV0UHJvcHN9IC8+XHJcbiAgICAgICAgICAgICAgICB7ZGlzcGxheVBpY2tlciAmJlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgZGF0YS1mb2N1cz0ncGlja2VyLXpvbmUnPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8RGF0ZVBpY2tlclxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0ZT17ZHJvcERvd25EYXRlfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGlkZUZvb3RlclxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9jYWxlPXtsb2NhbGV9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17X29uRHJvcERvd25DaGFuZ2V9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWY9J3BpY2tlcidcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbn1cclxuXHJcbklucHV0RGF0ZS5wcm9wVHlwZXMgPSBwcm9wVHlwZXM7XHJcbklucHV0RGF0ZS5kZWZhdWx0UHJvcHMgPSBkZWZhdWx0UHJvcHM7XHJcbklucHV0RGF0ZS5kaXNwbGF5TmFtZSA9ICdJbnB1dERhdGUnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgSW5wdXREYXRlO1xyXG4iXX0=