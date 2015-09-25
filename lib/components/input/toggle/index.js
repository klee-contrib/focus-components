'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _behavioursTranslation = require('../../../behaviours/translation');

var _behavioursTranslation2 = _interopRequireDefault(_behavioursTranslation);

var _behavioursMaterial = require('../../../behaviours/material');

var _behavioursMaterial2 = _interopRequireDefault(_behavioursMaterial);

var propTypes = {
    label: _react.PropTypes.string,
    onChange: _react.PropTypes.func.isRequired,
    value: _react.PropTypes.bool.isRequired
};

var defaultProps = {
    value: false
};

var displayName = 'InputToggle';

var InputToggle = (function (_Component) {
    _inherits(InputToggle, _Component);

    function InputToggle() {
        var _this = this;

        _classCallCheck(this, _InputToggle);

        _Component.apply(this, arguments);

        this.getValue = function () {
            var domElement = _reactDom2['default'].findDOMNode(_this.refs.toggle);
            return domElement.checked;
        };

        this.handleOnChange = function (_ref) {
            var checked = _ref.target.checked;
            var onChange = _this.props.onChange;

            onChange(checked);
        };
    }

    InputToggle.prototype.render = function render() {
        var _props = this.props;
        var label = _props.label;
        var value = _props.value;

        return _react2['default'].createElement(
            'label',
            { className: 'mdl-switch mdl-js-switch mdl-js-ripple-effect', 'data-focus': 'input-toggle', ref: 'mdlHolder' },
            _react2['default'].createElement('input', { checked: value, className: 'mdl-switch__input', onChange: this.handleOnChange, ref: 'toggle', type: 'checkbox' }),
            label && _react2['default'].createElement(
                'span',
                { className: 'mdl-switch__label' },
                this.i18n(label)
            )
        );
    };

    var _InputToggle = InputToggle;
    InputToggle = _behavioursMaterial2['default']('mdlHolder')(InputToggle) || InputToggle;
    InputToggle = _behavioursTranslation2['default'](InputToggle) || InputToggle;
    return InputToggle;
})(_react.Component);

InputToggle.propTypes = propTypes;
InputToggle.defaultProps = defaultProps;
InputToggle.displayName = displayName;

exports['default'] = InputToggle;
module.exports = exports['default'];