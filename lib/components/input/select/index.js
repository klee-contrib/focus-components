//dependencies
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _behavioursComponentBase = require('../../../behaviours/component-base');

var _behavioursComponentBase2 = _interopRequireDefault(_behavioursComponentBase);

var _lodashLang = require('lodash/lang');

var _lodashArray = require('lodash/array');

var UNSELECTED_KEY = 'UNSELECTED_KEY';
/**
 * Parse the value.
 * @param  {string | number} propsValue - The value given as props to read the type.
 * @param  {string} rawValue   - The raw string value.
 * @return {strint | number}  - The parsed value.
 */
function _valueParser(propsValue, rawValue) {
    return _lodashLang.isNumber(propsValue) ? +rawValue : rawValue;
}
var propTypes = {
    disabled: _react.PropTypes.bool,
    error: _react.PropTypes.string,
    hasUndefined: _react.PropTypes.bool,
    isRequired: _react.PropTypes.bool,
    labelKey: _react.PropTypes.string,
    mubtiple: _react.PropTypes.bool,
    name: _react.PropTypes.string.isRequired,
    onChange: _react.PropTypes.func.isRequired,
    placeHolder: _react.PropTypes.string,
    value: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number]),
    valueKey: _react.PropTypes.string,
    values: _react.PropTypes.array.isRequired
};

var defaultProps = {
    disabled: false,
    hasUndefined: true,
    isRequired: false,
    labelKey: 'label',
    multiple: false,
    values: [],
    valueKey: 'code',
    valueParser: _valueParser
};

/**
 * Component standing for an HTML input.
 */

var Select = (function (_Component) {
    _inherits(Select, _Component);

    function Select() {
        var _this = this;

        _classCallCheck(this, _Select);

        _Component.apply(this, arguments);

        this.getValue = function () {
            var value = _this.props.value;

            return _lodashLang.isUndefined(value) ? null : value;
        };

        this._handleSelectChange = function (evt) {
            var _props = _this.props;
            var onChange = _props.onChange;
            var valueParser = _props.valueParser;
            var propsValue = _props.value;
            var value = evt.target.value;

            return onChange(valueParser(propsValue, value));
        };
    }

    //Static props.

    /** inheritdoc */

    Select.prototype._renderOptions = function _renderOptions(_ref2) {
        var hasUndefined = _ref2.hasUndefined;
        var labelKey = _ref2.labelKey;
        var isRequired = _ref2.isRequired;
        var value = _ref2.value;
        var _ref2$values = _ref2.values;
        var values = _ref2$values === undefined ? [] : _ref2$values;
        var valueKey = _ref2.valueKey;

        if (true === hasUndefined || true === isRequired && !_lodashLang.isUndefined(value) && !_lodashLang.isNull(value)) {
            var _ref;

            values = _lodashArray.union([(_ref = {}, _ref[labelKey] = 'select.unSelected', _ref[valueKey] = UNSELECTED_KEY, _ref)], values);
        }
        return values.map(function (val, idx) {
            var optVal = '' + val[valueKey];
            var optLabel = val[labelKey] || 'select.noLabel';
            return _react2['default'].createElement(
                'option',
                { key: idx, value: optVal },
                optLabel
            );
        });
    };

    /**
     * @inheritdoc
     * @override
    */

    Select.prototype.render = function render() {
        var _props2 = this.props;
        var error = _props2.error;
        var name = _props2.name;
        var placeholder = _props2.placeholder;
        var style = _props2.style;
        var value = _props2.value;
        var values = _props2.values;
        var disabled = _props2.disabled;
        var onChange = _props2.onChange;

        var otherProps = _objectWithoutProperties(_props2, ['error', 'name', 'placeholder', 'style', 'value', 'values', 'disabled', 'onChange']);

        //const pattern = error ? 'hasError' : null; //add pattern to overide mdl error style when displaying an focus error.
        var selectOtherProps = disabled ? _extends({ disabled: 'disabled' }, otherProps) : otherProps;
        return _react2['default'].createElement(
            'div',
            { 'data-focus': 'select', ref: 'select', style: style },
            _react2['default'].createElement(
                'select',
                _extends({ name: name, onChange: this._handleSelectChange, ref: 'htmlSelect', value: value }, selectOtherProps),
                this._renderOptions(this.props)
            ),
            error && _react2['default'].createElement(
                'span',
                { ref: 'error' },
                error
            )
        );
    };

    var _Select = Select;
    Select = _behavioursComponentBase2['default'](Select) || Select;
    return Select;
})(_react.Component);

Select.displayName = 'Select';
Select.defaultProps = defaultProps;
Select.propTypes = propTypes;

exports['default'] = Select;
module.exports = exports['default'];

/**
 * Get the dom value of the component.
 * @return {object} - The unformated dom value.
 */

/**
 * Handle the change on the select, it only propagates the value.
 * @param  {object} evt - The react DOM event.
 * @return {object} - The function onChange from the props, called.
 */