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

var _componentBase = require('../../../behaviours/component-base');

var _componentBase2 = _interopRequireDefault(_componentBase);

var _text = require('../text');

var _text2 = _interopRequireDefault(_text);

var _reactDatePicker = require('react-date-picker');

var _reactDatePicker2 = _interopRequireDefault(_reactDatePicker);

var _compose = require('lodash/function/compose');

var _compose2 = _interopRequireDefault(_compose);

var _isArray = require('lodash/lang/isArray');

var _isArray2 = _interopRequireDefault(_isArray);

var _uniqueId = require('lodash/utility/uniqueId');

var _uniqueId2 = _interopRequireDefault(_uniqueId);

var _closest = require('closest');

var _closest2 = _interopRequireDefault(_closest);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var isISOString = function isISOString(value) {
    return _moment2.default.utc(value, _moment2.default.ISO_8601).isValid();
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
    },
    minDate: _react.PropTypes.string,
    maxDate: _react.PropTypes.string
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

var InputDate = (0, _componentBase2.default)(_class = function (_Component) {
    _inherits(InputDate, _Component);

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

    InputDate.prototype.componentWillMount = function componentWillMount() {
        // moment.locale(this.props.locale);
        document.addEventListener('click', this._onDocumentClick);
    };

    InputDate.prototype.componentDidMount = function componentDidMount() {
        var _props = this.props,
            drops = _props.drops,
            showDropdowns = _props.showDropdowns;
        var startDate = this.state.inputDate;
    };

    InputDate.prototype.componentWillReceiveProps = function componentWillReceiveProps(_ref) {
        var value = _ref.value;

        this.setState({
            dropDownDate: isISOString(value) ? _moment2.default.utc(value, _moment2.default.ISO_8601) : _moment2.default.utc(),
            inputDate: this._formatDate(value)
        });
    };

    InputDate.prototype.componentWillUnmount = function componentWillUnmount() {
        document.removeEventListener('click', this._onDocumentClick);
    };

    InputDate.prototype.render = function render() {
        var _props2 = this.props,
            error = _props2.error,
            locale = _props2.locale,
            name = _props2.name,
            placeholder = _props2.placeholder,
            disabled = _props2.disabled,
            minDate = _props2.minDate,
            maxDate = _props2.maxDate;
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

        return _moment2.default.utc(inputDate, format);
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
        if (_this2._isInputFormatCorrect(inputDate)) {
            var dropDownDate = _this2._parseInputDate(inputDate);
            _this2.setState({ dropDownDate: dropDownDate, inputDate: inputDate });
        } else {
            _this2.setState({ inputDate: inputDate });
        }
        if (fromBlur !== true) {
            _this2.props.onChange(inputDate);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJpc0lTT1N0cmluZyIsInV0YyIsInZhbHVlIiwiSVNPXzg2MDEiLCJpc1ZhbGlkIiwicHJvcFR5cGVzIiwiZHJvcHMiLCJvbmVPZiIsImlzUmVxdWlyZWQiLCJlcnJvciIsInN0cmluZyIsImxvY2FsZSIsIm5hbWUiLCJvbkNoYW5nZSIsImZ1bmMiLCJiZWZvcmVWYWx1ZUdldHRlciIsInBsYWNlaG9sZGVyIiwic2hvd0Ryb3Bkb3ducyIsImJvb2wiLCJ2YWxpZGF0ZSIsInByb3BzIiwicHJvcE5hbWUiLCJjb21wb25lbnROYW1lIiwicHJvcCIsIkVycm9yIiwibWluRGF0ZSIsIm1heERhdGUiLCJkZWZhdWx0UHJvcHMiLCJmb3JtYXQiLCJjb25zb2xlIiwiSW5wdXREYXRlIiwic3RhdGUiLCJkcm9wRG93bkRhdGUiLCJpbnB1dERhdGUiLCJfZm9ybWF0RGF0ZSIsImRpc3BsYXlQaWNrZXIiLCJfaW5wdXREYXRlSWQiLCJjb21wb25lbnRXaWxsTW91bnQiLCJkb2N1bWVudCIsImFkZEV2ZW50TGlzdGVuZXIiLCJfb25Eb2N1bWVudENsaWNrIiwiY29tcG9uZW50RGlkTW91bnQiLCJzdGFydERhdGUiLCJjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzIiwic2V0U3RhdGUiLCJjb21wb25lbnRXaWxsVW5tb3VudCIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJyZW5kZXIiLCJkaXNhYmxlZCIsIl9vbklucHV0Qmx1ciIsIl9vbklucHV0Q2hhbmdlIiwiX29uSW5wdXRGb2N1cyIsIl9vbkRyb3BEb3duQ2hhbmdlIiwiX29uUGlja2VyQ2xvc2VyQ2xpY2siLCJfaGFuZGxlS2V5RG93biIsImlucHV0UHJvcHMiLCJfaXNJbnB1dEZvcm1hdENvcnJlY3QiLCJfcGFyc2VJbnB1dERhdGUiLCJpc29EYXRlIiwiZnJvbUJsdXIiLCJ0ZXh0IiwiZGF0ZSIsIl9pc1ZhbGlkIiwiY29ycmVjdGVkRGF0ZSIsImFkZCIsInV0Y09mZnNldCIsInRvSVNPU3RyaW5nIiwidGFyZ2V0IiwidGFyZ2V0Q2xhc3NBdHRyIiwiZ2V0QXR0cmlidXRlIiwiaXNUcmlnZ2VyZWRGcm9tUGlja2VyIiwiaW5jbHVkZXMiLCJ1bmRlZmluZWQiLCJrZXkiLCJnZXRWYWx1ZSIsInJhd1ZhbHVlIiwibWVzc2FnZSIsImkxOG4iLCJkaXNwbGF5TmFtZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7WUFBQTs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FBRUEsSUFBTUEsY0FBYyxTQUFkQSxXQUFjO0FBQUEsV0FBUyxpQkFBT0MsR0FBUCxDQUFXQyxLQUFYLEVBQWtCLGlCQUFPQyxRQUF6QixFQUFtQ0MsT0FBbkMsRUFBVDtBQUFBLENBQXBCOztBQUVBLElBQU1DLFlBQVk7QUFDZEMsV0FBTyxpQkFBVUMsS0FBVixDQUFnQixDQUFDLElBQUQsRUFBTyxNQUFQLENBQWhCLEVBQWdDQyxVQUR6QjtBQUVkQyxXQUFPLGlCQUFVQyxNQUZIO0FBR2RDLFlBQVEsaUJBQVVELE1BQVYsQ0FBaUJGLFVBSFg7QUFJZEksVUFBTSxpQkFBVUYsTUFBVixDQUFpQkYsVUFKVDtBQUtkSyxjQUFVLGlCQUFVQyxJQUFWLENBQWVOLFVBTFg7QUFNZE8sdUJBQW1CLGlCQUFVRCxJQUFWLENBQWVOLFVBTnBCO0FBT2RRLGlCQUFhLGlCQUFVTixNQVBUO0FBUWRPLG1CQUFlLGlCQUFVQyxJQUFWLENBQWVWLFVBUmhCO0FBU2RXLGNBQVUsaUJBQVVMLElBVE47QUFVZFosV0FBTyxlQUFDa0IsS0FBRCxFQUFRQyxRQUFSLEVBQWtCQyxhQUFsQixFQUFvQztBQUN2QyxZQUFNQyxPQUFPSCxNQUFNQyxRQUFOLENBQWI7QUFDQSxZQUFJRSxRQUFRLENBQUN2QixZQUFZdUIsSUFBWixDQUFiLEVBQWdDO0FBQzVCLGtCQUFNLElBQUlDLEtBQUosZUFBc0JE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ckIsRUFBZ0NpQyxXQUFoQyxFQUF4QyxHQUF3RixJQUF6RztBQUNBLGVBQU8sT0FBSzlDLEtBQUwsQ0FBV0wsaUJBQVgsQ0FBNkI0RCxRQUE3QixDQUFQO0FBQ0gsSzs7U0FFRHhELFEsR0FBVyxZQUFNO0FBQUEsWUFDTmMsU0FETSxHQUNPLE9BQUtGLEtBRFosQ0FDTkUsU0FETTtBQUFBLFlBRU56QixVQUZNLEdBRVEsT0FBS1ksS0FGYixDQUVOWixVQUZNOztBQUdiLFlBQUksT0FBT3lCLFNBQVAsSUFBb0IsQ0FBQ0EsU0FBekIsRUFBb0M7QUFDaEMsbUJBQVE7QUFDSjdCLHlCQUFTLENBQUNJLFVBRE47QUFFSm9FLHlCQUFTO0FBRkwsYUFBUjtBQUlILFNBTEQsTUFLTztBQUNILG1CQUFRO0FBQ0p4RSx5QkFBUyxPQUFLb0QscUJBQUwsQ0FBMkJ2QixTQUEzQixDQURMO0FBRUoyQyx5QkFBUyxPQUFLQyxJQUFMLENBQVUsb0JBQVYsRUFBZ0MsRUFBQ2hCLE1BQU01QixTQUFQLEVBQWhDO0FBRkwsYUFBUjtBQUlIO0FBQ0osSzs7O0FBNEJMSCxVQUFVekIsU0FBVixHQUFzQkEsU0FBdEI7QUFDQXlCLFVBQVVILFlBQVYsR0FBeUJBLFlBQXpCO0FBQ0FHLFVBQVVnRCxXQUFWLEdBQXdCLFdBQXhCOztrQkFFZWhELFMiLCJmaWxlIjoiaXMtcmVhY3QtY2xhc3MtY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gRGVwZW5kZW5jaWVzXHJcbmltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgUHJvcFR5cGVzfSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBSZWFjdERPTSBmcm9tICdyZWFjdC1kb20nO1xyXG5pbXBvcnQgbW9tZW50IGZyb20gJ21vbWVudCc7XHJcbmltcG9ydCBCYXNlIGZyb20gJy4uLy4uLy4uL2JlaGF2aW91cnMvY29tcG9uZW50LWJhc2UnO1xyXG5pbXBvcnQgSW5wdXRUZXh0IGZyb20gJy4uL3RleHQnO1xyXG5pbXBvcnQgRGF0ZVBpY2tlciBmcm9tICdyZWFjdC1kYXRlLXBpY2tlcic7XHJcbmltcG9ydCBjb21wb3NlIGZyb20gJ2xvZGFzaC9mdW5jdGlvbi9jb21wb3NlJztcclxuaW1wb3J0IGlzQXJyYXkgZnJvbSAnbG9kYXNoL2xhbmcvaXNBcnJheSc7XHJcbmltcG9ydCB1bmlxdWVJZCBmcm9tICdsb2Rhc2gvdXRpbGl0eS91bmlxdWVJZCc7XHJcbmltcG9ydCBjbG9zZXN0IGZyb20gJ2Nsb3Nlc3QnO1xyXG5cclxuY29uc3QgaXNJU09TdHJpbmcgPSB2YWx1ZSA9PiBtb21lbnQudXRjKHZhbHVlLCBtb21lbnQuSVNPXzg2MDEpLmlzVmFsaWQoKTtcclxuXHJcbmNvbnN0IHByb3BUeXBlcyA9IHtcclxuICAgIGRyb3BzOiBQcm9wVHlwZXMub25lT2YoWyd1cCcsICdkb3duJ10pLmlzUmVxdWlyZWQsXHJcbiAgICBlcnJvcjogUHJvcFR5cGVzLnN0cmluZyxcclxuICAgIGxvY2FsZTogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxyXG4gICAgbmFtZTogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxyXG4gICAgb25DaGFuZ2U6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXHJcbiAgICBiZWZvcmVWYWx1ZUdldHRlcjogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcclxuICAgIHBsYWNlaG9sZGVyOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG4gICAgc2hvd0Ryb3Bkb3duczogUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcclxuICAgIHZhbGlkYXRlOiBQcm9wVHlwZXMuZnVuYyxcclxuICAgIHZhbHVlOiAocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lKSA9PiB7XHJcbiAgICAgICAgY29uc3QgcHJvcCA9IHByb3BzW3Byb3BOYW1lXTtcclxuICAgICAgICBpZiAocHJvcCAmJiAhaXNJU09TdHJpbmcocHJvcCkpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBUaGUgZGF0ZSAke3Byb3B9IHByb3ZpZGVkIHRvIHRoZSBjb21wb25lbnQgJHtjb21wb25lbnROYW1lfSBpcyBub3QgYW4gSVNPIGRhdGUuIFBsZWFzZSBwcm92aWRlIGEgdmFsaWQgZGF0ZSBzdHJpbmcuYCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIG1pbkRhdGU6IFByb3BUeXBlcy5zdHJpbmcsXHJcbiAgICBtYXhEYXRlOiBQcm9wVHlwZXMuc3RyaW5nXHJcbn07XHJcblxyXG5jb25zdCBkZWZhdWx0UHJvcHMgPSB7XHJcbiAgICBkcm9wczogJ2Rvd24nLFxyXG4gICAgbG9jYWxlOiAnZW4nLFxyXG4gICAgZm9ybWF0OiAnTU0vREQvWVlZWScsXHJcbiAgICBiZWZvcmVWYWx1ZUdldHRlcjogdmFsdWUgPT4gdmFsdWUsXHJcbiAgICAvKipcclxuICAgICogRGVmYXVsdCBvbkNoYW5nZSBwcm9wLCB0aGF0IHdpbGwgbG9nIGFuIGVycm9yLlxyXG4gICAgKi9cclxuICAgIG9uQ2hhbmdlKCkge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ1lvdSBkaWQgbm90IGdpdmUgYW4gb25DaGFuZ2UgbWV0aG9kIHRvIGFuIGlucHV0IGRhdGUsIHBsZWFzZSBjaGVjayB5b3VyIGNvZGUuJyk7XHJcbiAgICB9LFxyXG4gICAgc2hvd0Ryb3Bkb3duczogdHJ1ZSxcclxuICAgIHZhbGlkYXRlOiBpc0lTT1N0cmluZ1xyXG59O1xyXG5cclxuQEJhc2VcclxuY2xhc3MgSW5wdXREYXRlIGV4dGVuZHMgQ29tcG9uZW50IHtcclxuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XHJcbiAgICAgICAgc3VwZXIocHJvcHMpO1xyXG4gICAgICAgIGNvbnN0IHt2YWx1ZX0gPSBwcm9wcztcclxuICAgICAgICBjb25zdCBzdGF0ZSA9IHtcclxuICAgICAgICAgICAgZHJvcERvd25EYXRlOiBpc0lTT1N0cmluZyh2YWx1ZSkgPyBtb21lbnQudXRjKHZhbHVlLCBtb21lbnQuSVNPXzg2MDEpIDogbW9tZW50LnV0YygpLFxyXG4gICAgICAgICAgICBpbnB1dERhdGU6IHRoaXMuX2Zvcm1hdERhdGUodmFsdWUpLFxyXG4gICAgICAgICAgICBkaXNwbGF5UGlja2VyOiBmYWxzZVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHN0YXRlO1xyXG4gICAgICAgIHRoaXMuX2lucHV0RGF0ZUlkID0gdW5pcXVlSWQoJ2lucHV0LWRhdGUtJyk7XHJcbiAgICB9XHJcblxyXG4gICAgY29tcG9uZW50V2lsbE1vdW50KCkge1xyXG4gICAgICAgIC8vIG1vbWVudC5sb2NhbGUodGhpcy5wcm9wcy5sb2NhbGUpO1xyXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5fb25Eb2N1bWVudENsaWNrKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XHJcbiAgICAgICAgY29uc3Qge2Ryb3BzLCBzaG93RHJvcGRvd25zfSA9IHRoaXMucHJvcHM7XHJcbiAgICAgICAgY29uc3Qge2lucHV0RGF0ZTogc3RhcnREYXRlfSA9IHRoaXMuc3RhdGU7XHJcbiAgICB9XHJcblxyXG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyh7dmFsdWV9KSB7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgICAgIGRyb3BEb3duRGF0ZTogaXNJU09TdHJpbmcodmFsdWUpID8gbW9tZW50LnV0Yyh2YWx1ZSwgbW9tZW50LklTT184NjAxKSA6IG1vbWVudC51dGMoKSxcclxuICAgICAgICAgICAgaW5wdXREYXRlOiB0aGlzLl9mb3JtYXREYXRlKHZhbHVlKVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xyXG4gICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5fb25Eb2N1bWVudENsaWNrKTtcclxuICAgIH1cclxuXHJcbiAgICBfaXNJbnB1dEZvcm1hdENvcnJlY3QgPSB2YWx1ZSA9PiB0aGlzLl9wYXJzZUlucHV0RGF0ZSh2YWx1ZSkuaXNWYWxpZCgpO1xyXG5cclxuICAgIF9wYXJzZUlucHV0RGF0ZSA9IGlucHV0RGF0ZSA9PiB7XHJcbiAgICAgICAgY29uc3Qge2Zvcm1hdH0gPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIHJldHVybiBtb21lbnQudXRjKGlucHV0RGF0ZSwgZm9ybWF0KTtcclxuICAgIH07XHJcblxyXG4gICAgX2Zvcm1hdERhdGUgPSBpc29EYXRlID0+IHtcclxuICAgICAgICBsZXQge2Zvcm1hdH0gPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIGlmIChpc0lTT1N0cmluZyhpc29EYXRlKSkge1xyXG4gICAgICAgICAgICBpZiAoaXNBcnJheShmb3JtYXQpKSB7XHJcbiAgICAgICAgICAgICAgICBmb3JtYXQgPSBmb3JtYXRbMF07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIG1vbWVudC51dGMoaXNvRGF0ZSwgbW9tZW50LklTT184NjAxKS5mb3JtYXQoZm9ybWF0KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gaXNvRGF0ZTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIF9vbklucHV0Q2hhbmdlID0gKGlucHV0RGF0ZSwgZnJvbUJsdXIpID0+IHtcclxuICAgICAgICBpZiAodGhpcy5faXNJbnB1dEZvcm1hdENvcnJlY3QoaW5wdXREYXRlKSkge1xyXG4gICAgICAgICAgICBjb25zdCBkcm9wRG93bkRhdGUgPSB0aGlzLl9wYXJzZUlucHV0RGF0ZShpbnB1dERhdGUpO1xyXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtkcm9wRG93bkRhdGUsIGlucHV0RGF0ZX0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2lucHV0RGF0ZX0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihmcm9tQmx1ciAhPT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uQ2hhbmdlKGlucHV0RGF0ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBfb25JbnB1dEJsdXIgPSAoKSA9PiB7XHJcbiAgICAgICAgY29uc3Qge2lucHV0RGF0ZX0gPSB0aGlzLnN0YXRlO1xyXG4gICAgICAgIHRoaXMuX29uSW5wdXRDaGFuZ2UoaW5wdXREYXRlLCB0cnVlKTtcclxuICAgIH07XHJcblxyXG4gICAgX29uRHJvcERvd25DaGFuZ2UgPSAodGV4dCwgZGF0ZSkgPT4ge1xyXG4gICAgICAgIGlmIChkYXRlLl9pc1ZhbGlkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2Rpc3BsYXlQaWNrZXI6IGZhbHNlfSwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgY29ycmVjdGVkRGF0ZSA9IG1vbWVudC51dGMoZGF0ZSkuYWRkKG1vbWVudChkYXRlKS51dGNPZmZzZXQoKSwgJ21pbnV0ZXMnKS50b0lTT1N0cmluZygpOyAvLyBBZGQgVVRDIG9mZnNldCB0byBnZXQgcmlnaHQgSVNPIHN0cmluZ1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5vbkNoYW5nZShjb3JyZWN0ZWREYXRlKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX29uSW5wdXRDaGFuZ2UodGhpcy5fZm9ybWF0RGF0ZShjb3JyZWN0ZWREYXRlKSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgX29uSW5wdXRGb2N1cyA9ICgpID0+IHtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHtkaXNwbGF5UGlja2VyOiB0cnVlfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIF9vbkRvY3VtZW50Q2xpY2sgPSAoe3RhcmdldH0pID0+IHtcclxuICAgICAgICBjb25zdCB0YXJnZXRDbGFzc0F0dHIgPSB0YXJnZXQuZ2V0QXR0cmlidXRlKCdjbGFzcycpO1xyXG4gICAgICAgIGNvbnN0IGlzVHJpZ2dlcmVkRnJvbVBpY2tlciA9IHRhcmdldENsYXNzQXR0ciA/IHRhcmdldENsYXNzQXR0ci5pbmNsdWRlcygnZHAtY2VsbCcpIDogZmFsc2U7IC8vdGhpcyBpcyB0aGUgb25seSB3YXkgdG8gY2hlY2sgdGhlIHRhcmdldCBjb21lcyBmcm9tIHBpY2tlciBjYXVzZSBhdCB0aGlzIHN0YWdlLCBtb250aCBhbmQgeWVhciBkaXYgYXJlIHVubW91bnRlZCBieSBSZWFjdC5cclxuICAgICAgICBpZighaXNUcmlnZ2VyZWRGcm9tUGlja2VyKSB7XHJcbiAgICAgICAgICAgIC8vaWYgdGFyZ2V0IHdhcyBub3QgdHJpZ2dlcmVkIGluc2lkZSB0aGUgZGF0ZSBwaWNrZXIsIHdlIGNoZWNrIGl0IHdhcyBub3QgdHJpZ2dlcmVkIGJ5IHRoZSBpbnB1dFxyXG4gICAgICAgICAgICBpZiAoY2xvc2VzdCh0YXJnZXQsIGBbZGF0YS1pZD0nJHt0aGlzLl9pbnB1dERhdGVJZH0nXWAsIHRydWUpID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2Rpc3BsYXlQaWNrZXI6IGZhbHNlfSwgKCkgPT4gdGhpcy5fb25JbnB1dEJsdXIoKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIF9oYW5kbGVLZXlEb3duID0gKHtrZXl9KSA9PiB7XHJcbiAgICAgICAgaWYgKGtleSA9PT0gJ1RhYicgfHwga2V5ID09PSAnRW50ZXInKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2Rpc3BsYXlQaWNrZXI6IGZhbHNlfSwgKCkgPT4gdGhpcy5fb25JbnB1dEJsdXIoKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBnZXRWYWx1ZSA9ICgpID0+IHtcclxuICAgICAgICBjb25zdCB7aW5wdXREYXRlfSA9IHRoaXMuc3RhdGU7XHJcbiAgICAgICAgY29uc3QgcmF3VmFsdWUgPSB0aGlzLl9pc0lucHV0Rm9ybWF0Q29ycmVjdChpbnB1dERhdGUpID8gdGhpcy5fcGFyc2VJbnB1dERhdGUoaW5wdXREYXRlKS50b0lTT1N0cmluZygpIDogbnVsbDtcclxuICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5iZWZvcmVWYWx1ZUdldHRlcihyYXdWYWx1ZSk7XHJcbiAgICB9O1xyXG5cclxuICAgIHZhbGlkYXRlID0gKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHtpbnB1dERhdGV9ID0gdGhpcy5zdGF0ZTtcclxuICAgICAgICBjb25zdCB7aXNSZXF1aXJlZH0gPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIGlmICgnJyA9PT0gaW5wdXREYXRlIHx8ICFpbnB1dERhdGUpIHtcclxuICAgICAgICAgICAgcmV0dXJuICh7XHJcbiAgICAgICAgICAgICAgICBpc1ZhbGlkOiAhaXNSZXF1aXJlZCxcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6ICdmaWVsZC5yZXF1aXJlZCdcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuICh7XHJcbiAgICAgICAgICAgICAgICBpc1ZhbGlkOiB0aGlzLl9pc0lucHV0Rm9ybWF0Q29ycmVjdChpbnB1dERhdGUpLFxyXG4gICAgICAgICAgICAgICAgbWVzc2FnZTogdGhpcy5pMThuKCdpbnB1dC5kYXRlLmludmFsaWQnLCB7ZGF0ZTogaW5wdXREYXRlfSlcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgY29uc3Qge2Vycm9yLCBsb2NhbGUsIG5hbWUsIHBsYWNlaG9sZGVyLCBkaXNhYmxlZCwgbWluRGF0ZSwgbWF4RGF0ZX0gPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIGNvbnN0IHtkcm9wRG93bkRhdGUsIGlucHV0RGF0ZSwgZGlzcGxheVBpY2tlcn0gPSB0aGlzLnN0YXRlO1xyXG4gICAgICAgIGNvbnN0IHtfb25JbnB1dEJsdXIsIF9vbklucHV0Q2hhbmdlLCBfb25JbnB1dEZvY3VzLCBfb25Ecm9wRG93bkNoYW5nZSwgX29uUGlja2VyQ2xvc2VyQ2xpY2ssIF9oYW5kbGVLZXlEb3dufSA9IHRoaXM7XHJcbiAgICAgICAgY29uc3QgaW5wdXRQcm9wcyA9IHsgZGlzYWJsZWQgfTtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2IGRhdGEtZm9jdXM9J2lucHV0LWRhdGUnIGRhdGEtaWQ9e3RoaXMuX2lucHV0RGF0ZUlkfT5cclxuICAgICAgICAgICAgICAgIDxJbnB1dFRleHQgZXJyb3I9e2Vycm9yfSBuYW1lPXtuYW1lfSBvbkNoYW5nZT17X29uSW5wdXRDaGFuZ2V9IG9uS2V5RG93bj17X2hhbmRsZUtleURvd259IG9uRm9jdXM9e19vbklucHV0Rm9jdXN9IHBsYWNlaG9sZGVyPXtwbGFjZWhvbGRlcn0gcmVmPSdpbnB1dCcgdmFsdWU9e2lucHV0RGF0ZX0gey4uLmlucHV0UHJvcHN9IC8+XHJcbiAgICAgICAgICAgICAgICB7ZGlzcGxheVBpY2tlciAmJlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgZGF0YS1mb2N1cz0ncGlja2VyLXpvbmUnPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8RGF0ZVBpY2tlclxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0ZT17ZHJvcERvd25EYXRlfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGlkZUZvb3RlclxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9jYWxlPXtsb2NhbGV9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17X29uRHJvcERvd25DaGFuZ2V9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWY9J3BpY2tlcidcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1pbkRhdGU9e21pbkRhdGV9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXhEYXRlPXttYXhEYXRlfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufVxyXG5cclxuSW5wdXREYXRlLnByb3BUeXBlcyA9IHByb3BUeXBlcztcclxuSW5wdXREYXRlLmRlZmF1bHRQcm9wcyA9IGRlZmF1bHRQcm9wcztcclxuSW5wdXREYXRlLmRpc3BsYXlOYW1lID0gJ0lucHV0RGF0ZSc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBJbnB1dERhdGU7XHJcbiJdfQ==