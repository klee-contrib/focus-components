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

var _lodashUtility = require('lodash/utility');

var _behavioursComponentBase = require('../../../behaviours/component-base');

var _behavioursComponentBase2 = _interopRequireDefault(_behavioursComponentBase);

var _behavioursMaterial = require('../../../behaviours/material');

var _behavioursMaterial2 = _interopRequireDefault(_behavioursMaterial);

var propTypes = {
    error: _react.PropTypes.string,
    name: _react.PropTypes.string.isRequired,
    onChange: _react.PropTypes.func.isRequired,
    onKeyPress: _react.PropTypes.func,
    placeHolder: _react.PropTypes.string,
    unformatter: _react.PropTypes.func,
    formatter: _react.PropTypes.func,
    type: _react.PropTypes.string,
    value: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number])
};

var defaultProps = {
    type: 'text',
    formatter: _lodashUtility.identity,
    unformatter: _lodashUtility.identity
};

/**
 * Component standing for an HTML input.
 */

var InputText = (function (_Component) {
    _inherits(InputText, _Component);

    function InputText() {
        var _this = this;

        _classCallCheck(this, _InputText);

        _Component.apply(this, arguments);

        this.getValue = function () {
            var unformatter = _this.props.unformatter;

            var domEl = _reactDom2['default'].findDOMNode(_this.refs.htmlInput);
            return unformatter(domEl.value);
        };

        this._handleInputChange = function (evt) {
            var _props = _this.props;
            var unformatter = _props.unformatter;
            var onChange = _props.onChange;
            var value = evt.target.value;

            return onChange(unformatter(value));
        };
    }

    //Static props.

    /**
     * @inheritdoc
     * @override
    */

    InputText.prototype.render = function render() {
        var _props2 = this.props;
        var error = _props2.error;
        var name = _props2.name;
        var placeholder = _props2.placeholder;
        var style = _props2.style;
        var rawValue = _props2.value;
        var formatter = _props2.formatter;

        var otherProps = _objectWithoutProperties(_props2, ['error', 'name', 'placeholder', 'style', 'value', 'formatter']);

        var value = formatter(rawValue);
        var pattern = error ? 'hasError' : null; //add pattern to overide mdl error style when displaying an focus error.
        var inputProps = _extends({}, otherProps, { value: value, id: name, onChange: this._handleInputChange, pattern: pattern });
        return _react2['default'].createElement(
            'div',
            { className: 'mdl-textfield mdl-js-textfield', 'data-focus': 'input-text', ref: 'inputText', style: style },
            _react2['default'].createElement('input', _extends({ className: 'mdl-textfield__input', ref: 'htmlInput' }, inputProps)),
            _react2['default'].createElement(
                'label',
                { className: 'mdl-textfield__label', htmlFor: name },
                this.i18n(placeholder)
            ),
            error && _react2['default'].createElement(
                'span',
                { className: 'mdl-textfield__error' },
                error
            )
        );
    };

    var _InputText = InputText;
    InputText = _behavioursComponentBase2['default'](InputText) || InputText;
    InputText = _behavioursMaterial2['default']('inputText')(InputText) || InputText;
    return InputText;
})(_react.Component);

InputText.displayName = 'InputText';
InputText.defaultProps = defaultProps;
InputText.propTypes = propTypes;

exports['default'] = InputText;
module.exports = exports['default'];

/**
 * Get the dom value of the component.
 * @return {object} - The unformated dom value.
 */

/**
 * Handle the change on the input text, it only propagate the value.
 * @param  {object} evt - The react DOM event.
 * @return {object} - The function onChannge from the props, called.
 */