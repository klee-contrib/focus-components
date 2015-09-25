// Dependencies

'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _behavioursComponentBase = require('../../../behaviours/component-base');

var _behavioursComponentBase2 = _interopRequireDefault(_behavioursComponentBase);

var _defaultLocale = require('./default-locale');

var _defaultLocale2 = _interopRequireDefault(_defaultLocale);

var _text = require('../text');

var _text2 = _interopRequireDefault(_text);

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _daterangepicker = require('daterangepicker');

var _daterangepicker2 = _interopRequireDefault(_daterangepicker);

//eslint-disable-line

var _lodashFunction = require('lodash/function');

var isDateStringValid = _lodashFunction.compose(function (bool) {
    return !bool;
}, isNaN, Date.parse);

var propTypes = {
    drops: _react.PropTypes.oneOf(['up', 'down']).isRequired,
    error: _react.PropTypes.string,
    formatter: _react.PropTypes.func.isRequired,
    locale: _react.PropTypes.object.isRequired,
    name: _react.PropTypes.string.isRequired,
    onChange: _react.PropTypes.func.isRequired,
    placeHolder: _react.PropTypes.string.isRequired,
    showDropdowns: _react.PropTypes.bool.isRequired,
    validate: _react.PropTypes.func,
    value: function value(props, propName, componentName) {
        var prop = props[propName];
        if (prop && !isDateStringValid(prop)) {
            throw new Error('The date (' + prop + ') is invalid for component ' + componentName + '. Please provide a valid date string.');
        }
    }
};

var defaultProps = {
    drops: 'down',
    locale: _defaultLocale2['default'],
    /**
     * Default onChange prop, that will log an error.
     */
    onChange: function onChange() {
        console.error('You did not give an onChange method to an input date, please check your code.');
    },
    showDropdowns: true,
    validate: isDateStringValid,
    value: _moment2['default']()
};

var InputDate = (function (_Component) {
    _inherits(InputDate, _Component);

    function InputDate(props) {
        var _this = this;

        _classCallCheck(this, _InputDate);

        _Component.call(this, props);

        this.componentWillReceiveProps = function (_ref) {
            var value = _ref.value;

            if (value !== _this.state.inputDate) {
                if (isDateStringValid(value)) {
                    _this.setState({
                        dropDownDate: _moment2['default'](Date.parse(value)),
                        inputDate: _this._formatDate(value)
                    });
                } else {
                    _this.setState({ inputDate: _this._formatDate(value) });
                }
            }
        };

        this.componentDidMount = function () {
            var _props = _this.props;
            var drops = _props.drops;
            var locale = _props.locale;
            var showDropdowns = _props.showDropdowns;
            var startDate = _this.state.inputDate;

            _jquery2['default'](_reactDom2['default'].findDOMNode(_this.refs.input.refs.htmlInput)).daterangepicker({
                singleDatePicker: true,
                showDropdowns: showDropdowns,
                drops: drops,
                startDate: startDate,
                locale: locale
            }, _this._onDropDownChange);
        };

        this.componentDidUpdate = function () {
            var inputDate = _this.state.inputDate;

            if (isDateStringValid(inputDate)) {
                _jquery2['default'](_reactDom2['default'].findDOMNode(_this.refs.input.refs.htmlInput)).data('daterangepicker').setStartDate(Date.parse(inputDate));
            }
        };

        this.getValue = function () {
            var _state = _this.state;
            var dropDownDate = _state.dropDownDate;
            var inputDate = _state.inputDate;

            return isDateStringValid(inputDate) ? dropDownDate.toISOString() : null;
        };

        this._formatDate = function (unformatedDate) {
            var format = _this.props.locale.format;

            if (isDateStringValid(unformatedDate)) {
                return _moment2['default'](Date.parse(unformatedDate)).format(format);
            } else {
                return unformatedDate;
            }
        };

        this._onInputChange = function (inputDate) {
            if (isDateStringValid(inputDate)) {
                var dropDownDate = _moment2['default'](Date.parse(inputDate));
                _this.setState({ dropDownDate: dropDownDate, inputDate: inputDate });
            } else {
                _this.setState({ inputDate: inputDate });
            }
        };

        this._onInputBlur = function () {
            _this.props.onChange(_this.state.inputDate);
        };

        this._onDropDownChange = function (date) {
            if (date._isValid) {
                _this._onInputChange(_this._formatDate(_moment2['default'](date).add(12, 'hours'))); // Add 12 hours to avoid skipping a day due to different locales
            }
        };

        this.validate = function () {
            var inputDate = arguments.length <= 0 || arguments[0] === undefined ? _this.state.inputDate : arguments[0];

            var isValid = isDateStringValid(inputDate);
            return {
                isValid: isValid,
                message: isValid ? '' : inputDate + ' is not a valid date.'
            };
        };

        var value = props.value;

        var state = {
            dropDownDate: isDateStringValid(value) ? _moment2['default'](Date.parse(value)) : _moment2['default'](),
            inputDate: this._formatDate(value)
        };
        this.state = state;
    }

    InputDate.prototype.render = function render() {
        var _props2 = this.props;
        var error = _props2.error;
        var name = _props2.name;
        var placeHolder = _props2.placeHolder;
        var inputDate = this.state.inputDate;
        var _onInputBlur = this._onInputBlur;
        var _onInputChange = this._onInputChange;

        return React.createElement(
            'div',
            { 'data-focus': 'input-date' },
            React.createElement(_text2['default'], { error: error, name: name, onBlur: _onInputBlur, onChange: _onInputChange, placeHolder: placeHolder, ref: 'input', value: inputDate })
        );
    };

    var _InputDate = InputDate;
    InputDate = _behavioursComponentBase2['default'](InputDate) || InputDate;
    return InputDate;
})(_react.Component);

InputDate.propTypes = propTypes;
InputDate.defaultProps = defaultProps;
InputDate.displayName = 'InputDate';

exports['default'] = InputDate;
module.exports = exports['default'];