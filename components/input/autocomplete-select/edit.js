'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _dec, _dec2, _class;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _componentBase = require('../../../behaviours/component-base');

var _componentBase2 = _interopRequireDefault(_componentBase);

var _material = require('../../../behaviours/material');

var _material2 = _interopRequireDefault(_material);

var _closest = require('closest');

var _closest2 = _interopRequireDefault(_closest);

var _debounce = require('lodash/function/debounce');

var _debounce2 = _interopRequireDefault(_debounce);

var _uniqueId = require('lodash/utility/uniqueId');

var _uniqueId2 = _interopRequireDefault(_uniqueId);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var ENTER_KEY_CODE = 13;
var TAB_KEY_CODE = 27;
var UP_ARROW_KEY_CODE = 38;
var DOWN_ARROW_KEY_CODE = 40;

var propTypes = {
    customError: _react.PropTypes.string,
    inputTimeout: _react.PropTypes.number.isRequired,
    keyName: _react.PropTypes.string.isRequired,
    keyResolver: _react.PropTypes.func.isRequired,
    labelName: _react.PropTypes.string.isRequired,
    onBadInput: _react.PropTypes.func,
    onChange: _react.PropTypes.func.isRequired,
    placeholder: _react.PropTypes.string,
    querySearcher: _react.PropTypes.func.isRequired,
    renderOptions: _react.PropTypes.func,
    value: _react.PropTypes.string
};

var defaultProps = {
    keyName: 'key',
    labelName: 'label',
    inputTimeout: 200
};

var Autocomplete = (_dec = (0, _material2.default)('loader'), _dec2 = (0, _material2.default)('inputText'), _dec(_class = _dec2(_class = (0, _componentBase2.default)(_class = function (_Component) {
    _inherits(Autocomplete, _Component);

    function Autocomplete(props) {
        _classCallCheck(this, Autocomplete);

        var _this = _possibleConstructorReturn(this, _Component.call(this, props));

        _this._handleDocumentClick = function (_ref) {
            var target = _ref.target;
            var _this$state = _this.state,
                focus = _this$state.focus,
                inputValue = _this$state.inputValue;
            var onBadInput = _this.props.onBadInput;

            if (focus) {
                var closestACParent = (0, _closest2.default)(target, '[data-id=\'' + _this.autocompleteId + '\']', true);
                if (closestACParent === undefined) {
                    _this.setState({ focus: false }, function () {
                        if (onBadInput && _this.getValue() === null && inputValue !== '') {
                            onBadInput(inputValue);
                        }
                    });
                }
            }
        };

        _this._handleQueryChange = function (_ref2) {
            var value = _ref2.target.value;

            if (value === '') {
                // the user cleared the input, don't call the querySearcher
                var onChange = _this.props.onChange;

                _this.setState({ inputValue: value, fromKeyResolver: false });
                if (onChange) onChange(null);
            } else {
                _this.setState({ inputValue: value, fromKeyResolver: false, isLoading: true });
                _this._debouncedQuerySearcher(value);
            }
        };

        _this._querySearcher = function (value) {
            var _this$props = _this.props,
                querySearcher = _this$props.querySearcher,
                keyName = _this$props.keyName,
                labelName = _this$props.labelName;

            querySearcher(value).then(function (_ref3) {
                var data = _ref3.data,
                    totalCount = _ref3.totalCount;

                // TODO handle the incomplete option list case
                var options = new Map();
                data.forEach(function (item) {
                    options.set(item[keyName], item[labelName]);
                });
                _this.setState({ options: options, isLoading: false, totalCount: totalCount });
            }).catch(function (error) {
                return _this.setState({ customError: error.message });
            });
        };

        _this._handleQueryFocus = function () {
            _this.refs.options.scrollTop = 0;
            if (_this.props.onFocus) {
                _this.props.onFocus.call(_this);
            }
            _this.setState({ active: '', focus: true });
        };

        _this._handleQueryKeyDown = function (event) {
            event.stopPropagation();
            var which = event.which;
            var _this$state2 = _this.state,
                active = _this$state2.active,
                options = _this$state2.options;

            if (which === ENTER_KEY_CODE && active) _this._select(active);
            if (which === TAB_KEY_CODE) _this.setState({ focus: false }, function () {
                return _this.refs.htmlInput.blur();
            });
            if ([DOWN_ARROW_KEY_CODE, UP_ARROW_KEY_CODE].indexOf(which) !== -1) {
                // the user pressed on an arrow key, change the active key
                var optionKeys = [];
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = options.keys()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var key = _step.value;

                        optionKeys.push(key);
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }
                    } finally {
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }

                var currentIndex = optionKeys.indexOf(active);
                var newIndex = currentIndex + (which === DOWN_ARROW_KEY_CODE ? 1 : -1);
                if (newIndex >= options.size) {
                    newIndex -= options.size;
                }
                if (newIndex < 0) {
                    newIndex += options.size;
                }
                _this.setState({ active: optionKeys[newIndex] });
            }
        };

        _this._handleSuggestionHover = function (key) {
            _this.setState({ active: key });
        };

        _this._renderOptions = function () {
            var _this$state3 = _this.state,
                active = _this$state3.active,
                options = _this$state3.options,
                focus = _this$state3.focus;

            var renderedOptions = [];
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = options[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var _step2$value = _slicedToArray(_step2.value, 2),
                        key = _step2$value[0],
                        value = _step2$value[1];

                    var isActive = active === key;
                    renderedOptions.push(_react2.default.createElement(
                        'li',
                        {
                            'data-active': isActive,
                            'data-focus': 'option',
                            key: key,
                            onClick: _this._select.bind(_this, key),
                            onMouseOver: _this._handleSuggestionHover.bind(_this, key)
                        },
                        _this.i18n(value)
                    ));
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                        _iterator2.return();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }

            return _react2.default.createElement(
                'ul',
                { 'data-focus': 'options', ref: 'options', 'data-focussed': focus },
                renderedOptions
            );
        };

        var state = {
            focus: false,
            inputValue: _this.props.value,
            options: new Map(),
            active: null,
            selected: _this.props.value,
            fromKeyResolver: false,
            isLoading: false,
            customError: _this.props.customError,
            totalCount: 0
        };
        _this.state = state;
        _this.autocompleteId = (0, _uniqueId2.default)('autocomplete-text-');
        return _this;
    }

    Autocomplete.prototype.componentDidMount = function componentDidMount() {
        var _this2 = this;

        var _props = this.props,
            value = _props.value,
            keyResolver = _props.keyResolver,
            inputTimeout = _props.inputTimeout;

        if (value !== undefined && value !== null) {
            // value is defined, call the keyResolver to get the associated label
            keyResolver(value).then(function (inputValue) {
                _this2.setState({ inputValue: inputValue, fromKeyResolver: true });
            }).catch(function (error) {
                return _this2.setState({ customError: error.message });
            });
        }
        document.addEventListener('click', this._handleDocumentClick);
        this._debouncedQuerySearcher = (0, _debounce2.default)(this._querySearcher, inputTimeout);
    };

    Autocomplete.prototype.componentWillReceiveProps = function componentWillReceiveProps(_ref4) {
        var _this3 = this;

        var value = _ref4.value,
            customError = _ref4.customError,
            error = _ref4.error;
        var keyResolver = this.props.keyResolver;

        if (value !== this.props.value && value !== undefined && value !== null) {
            // value is defined, call the keyResolver to get the associated label
            this.setState({ inputValue: value, customError: customError }, function () {
                return keyResolver(value).then(function (inputValue) {
                    _this3.setState({ inputValue: inputValue, fromKeyResolver: true });
                }).catch(function (error) {
                    return _this3.setState({ customError: error.message });
                });
            });
        } else if (customError !== this.props.customError) {
            this.setState({ customError: customError });
        }
        if (error) {
            this.setState({ customError: error });
        }
    };

    Autocomplete.prototype.componentDidUpdate = function componentDidUpdate() {
        if (this.props.customError) {
            this.refs.inputText.classList.add('is-invalid');
        } else {
            this.refs.inputText.classList.remove('is-invalid');
        }
    };

    Autocomplete.prototype.componentWillUnmount = function componentWillUnmount() {
        document.removeEventListener('click', this._handleDocumentClick);
    };

    Autocomplete.prototype.getValue = function getValue() {
        var _props2 = this.props,
            labelName = _props2.labelName,
            keyName = _props2.keyName,
            value = _props2.value;
        var _state = this.state,
            inputValue = _state.inputValue,
            selected = _state.selected,
            options = _state.options,
            fromKeyResolver = _state.fromKeyResolver;

        var resolvedLabel = options.get(selected);
        if (inputValue === '') {
            // The user cleared the field, return a null
            return null;
        } else if (fromKeyResolver) {
            // Value was received from the keyResolver, give it firectly
            return value;
        } else if (resolvedLabel !== inputValue && selected !== inputValue) {
            // The user typed something without selecting any option, return a null
            return null;
        } else {
            // The user selected an option (or no value was provided), return it
            return selected || null;
        }
    };

    Autocomplete.prototype._select = function _select(key) {
        var options = this.state.options;
        var _props3 = this.props,
            onChange = _props3.onChange,
            keyName = _props3.keyName,
            labelName = _props3.labelName;

        var resolvedLabel = options.get(key) || '';
        this.refs.htmlInput.blur();
        this.setState({ inputValue: this.i18n(resolvedLabel), selected: key, focus: false }, function () {
            if (onChange) onChange(key);
        });
    };

    Autocomplete.prototype.render = function render() {
        var _inputProps;

        var _props4 = this.props,
            autoFocus = _props4.autoFocus,
            onBlur = _props4.onBlur,
            disabled = _props4.disabled,
            onKeyPress = _props4.onKeyPress,
            maxLength = _props4.maxLength,
            onFocus = _props4.onFocus,
            onClick = _props4.onClick,
            customError = _props4.customError,
            placeholder = _props4.placeholder,
            renderOptions = _props4.renderOptions,
            otherProps = _objectWithoutProperties(_props4, ['autoFocus', 'onBlur', 'disabled', 'onKeyPress', 'maxLength', 'onFocus', 'onClick', 'customError', 'placeholder', 'renderOptions']);

        var _state2 = this.state,
            inputValue = _state2.inputValue,
            isLoading = _state2.isLoading;
        var _handleQueryFocus = this._handleQueryFocus,
            _handleQueryKeyDown = this._handleQueryKeyDown,
            _handleQueryChange = this._handleQueryChange;

        var inputProps = (_inputProps = {
            autoFocus: autoFocus, disabled: disabled, onKeyPress: onKeyPress, maxLength: maxLength, onFocus: onFocus, onClick: onClick,
            onChange: _handleQueryChange }, _defineProperty(_inputProps, 'onFocus', _handleQueryFocus), _defineProperty(_inputProps, 'onKeyDown', _handleQueryKeyDown), _defineProperty(_inputProps, 'onBlur', onBlur), _defineProperty(_inputProps, 'value', !inputValue ? '' : inputValue), _inputProps);

        return _react2.default.createElement(
            'div',
            { 'data-focus': 'autocomplete', 'data-id': this.autocompleteId },
            _react2.default.createElement(
                'div',
                { className: 'mdl-textfield mdl-js-textfield' + (customError ? ' is-invalid' : ''), 'data-focus': 'input-text', ref: 'inputText' },
                _react2.default.createElement('div', { 'data-focus': 'loading', 'data-loading': isLoading, className: 'mdl-progress mdl-js-progress mdl-progress__indeterminate', ref: 'loader' }),
                _react2.default.createElement('input', _extends({
                    className: 'mdl-textfield__input'
                }, inputProps, {
                    ref: 'htmlInput',
                    type: 'text'
                })),
                _react2.default.createElement(
                    'label',
                    { className: 'mdl-textfield__label' },
                    this.i18n(placeholder)
                ),
                _react2.default.createElement(
                    'span',
                    { className: 'mdl-textfield__error' },
                    this.i18n(customError)
                )
            ),
            renderOptions ? renderOptions.call(this) : this._renderOptions()
        );
    };

    return Autocomplete;
}(_react.Component)) || _class) || _class) || _class);


Autocomplete.displayName = 'Autocomplete';
Autocomplete.defaultProps = defaultProps;
Autocomplete.propTypes = propTypes;

exports.default = Autocomplete;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJFTlRFUl9LRVlfQ09ERSIsIlRBQl9LRVlfQ09ERSIsIlVQX0FSUk9XX0tFWV9DT0RFIiwiRE9XTl9BUlJPV19LRVlfQ09ERSIsInByb3BUeXBlcyIsImN1c3RvbUVycm9yIiwic3RyaW5nIiwiaW5wdXRUaW1lb3V0IiwibnVtYmVyIiwiaXNSZXF1aXJlZCIsImtleU5hbWUiLCJrZXlSZXNvbHZlciIsImZ1bmMiLCJsYWJlbE5hbWUiLCJvbkJhZElucHV0Iiwib25DaGFuZ2UiLCJwbGFjZWhvbGRlciIsInF1ZXJ5U2VhcmNoZXIiLCJyZW5kZXJPcHRpb25zIiwidmFsdWUiLCJkZWZhdWx0UHJvcHMiLCJBdXRvY29tcGxldGUiLCJwcm9wcyIsIl9oYW5kbGVEb2N1bWVudENsaWNrIiwidGFyZ2V0Iiwic3RhdGUiLCJmb2N1cyIsImlucHV0VmFsdWUiLCJjbG9zZXN0QUNQYXJlbnQiLCJhdXRvY29tcGxldGVJZCIsInVuZGVmaW5lZCIsInNldFN0YXRlIiwiZ2V0VmFsdWUiLCJfaGFuZGxlUXVlcnlDaGFuZ2UiLCJmcm9tS2V5UmVzb2x2ZXIiLCJpc0xvYWRpbmciLCJfZGVib3VuY2VkUXVlcnlTZWFyY2hlciIsIl9xdWVyeVNlYXJjaGVyIiwidGhlbiIsImRhdGEiLCJ0b3RhbENvdW50Iiwib3B0aW9ucyIsIk1hcCIsImZvckVhY2giLCJzZXQiLCJpdGVtIiwiY2F0Y2giLCJlcnJvciIsIm1lc3NhZ2UiLCJfaGFuZGxlUXVlcnlGb2N1cyIsInJlZnMiLCJzY3JvbGxUb3AiLCJvbkZvY3VzIiwiY2FsbCIsImFjdGl2ZSIsIl9oYW5kbGVRdWVyeUtleURvd24iLCJldmVudCIsInN0b3BQcm9wYWdhdGlvbiIsIndoaWNoIiwiX3NlbGVjdCIsImh0bWxJbnB1dCIsImJsdXIiLCJpbmRleE9mIiwib3B0aW9uS2V5cyIsImtleXMiLCJrZXkiLCJwdXNoIiwiY3VycmVudEluZGV4IiwibmV3SW5kZXgiLCJzaXplIiwiX2hhbmRsZVN1Z2dlc3Rpb25Ib3ZlciIsIl9yZW5kZXJPcHRpb25zIiwicmVuZGVyZWRPcHRpb25zIiwiaXNBY3RpdmUiLCJiaW5kIiwiaTE4biIsInNlbGVjdGVkIiwiY29tcG9uZW50RGlkTW91bnQiLCJkb2N1bWVudCIsImFkZEV2ZW50TGlzdGVuZXIiLCJjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzIiwiY29tcG9uZW50RGlkVXBkYXRlIiwiaW5wdXRUZXh0IiwiY2xhc3NMaXN0IiwiYWRkIiwicmVtb3ZlIiwiY29tcG9uZW50V2lsbFVubW91bnQiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwicmVzb2x2ZWRMYWJlbCIsImdldCIsInJlbmRlciIsImF1dG9Gb2N1cyIsIm9uQmx1ciIsImRpc2FibGVkIiwib25LZXlQcmVzcyIsIm1heExlbmd0aCIsIm9uQ2xpY2siLCJvdGhlclByb3BzIiwiaW5wdXRQcm9wcyIsImRpc3BsYXlOYW1lIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUVBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRUEsSUFBTUEsaUJBQWlCLEVBQXZCO0FBQ0EsSUFBTUMsZUFBZSxFQUFyQjtBQUNBLElBQU1DLG9CQUFvQixFQUExQjtBQUNBLElBQU1DLHNCQUFzQixFQUE1Qjs7QUFFQSxJQUFNQyxZQUFZO0FBQ2RDLGlCQUFhLGlCQUFVQyxNQURUO0FBRWRDLGtCQUFjLGlCQUFVQyxNQUFWLENBQWlCQyxVQUZqQjtBQUdkQyxhQUFTLGlCQUFVSixNQUFWLENBQWlCRyxVQUhaO0FBSWRFLGlCQUFhLGlCQUFVQyxJQUFWLENBQWVILFVBSmQ7QUFLZEksZUFBVyxpQkFBVVAsTUFBVixDQUFpQkcsVUFMZDtBQU1kSyxnQkFBWSxpQkFBVUYsSUFOUjtBQU9kRyxjQUFVLGlCQUFVSCxJQUFWLENBQWVILFVBUFg7QUFRZE8saUJBQWEsaUJBQVVWLE1BUlQ7QUFTZFcsbUJBQWUsaUJBQVVM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RCxZQUFiLEdBQTRCQSxZQUE1QjtBQUNBQyxhQUFhakIsU0FBYixHQUF5QkEsU0FBekI7O2tCQUVlaUIsWSIsImZpbGUiOiJpcy1yZWFjdC1jbGFzcy1jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnQsIFByb3BUeXBlc30gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgUmVhY3RET00gZnJvbSAncmVhY3QtZG9tJztcclxuaW1wb3J0IENvbXBvbmVudEJhc2VCZWhhdmlvdXIgZnJvbSAnLi4vLi4vLi4vYmVoYXZpb3Vycy9jb21wb25lbnQtYmFzZSc7XHJcbmltcG9ydCBNREJlaGF2aW91ciBmcm9tICcuLi8uLi8uLi9iZWhhdmlvdXJzL21hdGVyaWFsJztcclxuXHJcbmltcG9ydCBjbG9zZXN0IGZyb20gJ2Nsb3Nlc3QnO1xyXG5pbXBvcnQgZGVib3VuY2UgZnJvbSAnbG9kYXNoL2Z1bmN0aW9uL2RlYm91bmNlJztcclxuaW1wb3J0IHVuaXF1ZUlkIGZyb20gJ2xvZGFzaC91dGlsaXR5L3VuaXF1ZUlkJztcclxuXHJcbmNvbnN0IEVOVEVSX0tFWV9DT0RFID0gMTM7XHJcbmNvbnN0IFRBQl9LRVlfQ09ERSA9IDI3O1xyXG5jb25zdCBVUF9BUlJPV19LRVlfQ09ERSA9IDM4O1xyXG5jb25zdCBET1dOX0FSUk9XX0tFWV9DT0RFID0gNDA7XHJcblxyXG5jb25zdCBwcm9wVHlwZXMgPSB7XHJcbiAgICBjdXN0b21FcnJvcjogUHJvcFR5cGVzLnN0cmluZyxcclxuICAgIGlucHV0VGltZW91dDogUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxyXG4gICAga2V5TmFtZTogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxyXG4gICAga2V5UmVzb2x2ZXI6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXHJcbiAgICBsYWJlbE5hbWU6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcclxuICAgIG9uQmFkSW5wdXQ6IFByb3BUeXBlcy5mdW5jLFxyXG4gICAgb25DaGFuZ2U6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXHJcbiAgICBwbGFjZWhvbGRlcjogUHJvcFR5cGVzLnN0cmluZyxcclxuICAgIHF1ZXJ5U2VhcmNoZXI6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXHJcbiAgICByZW5kZXJPcHRpb25zOiBQcm9wVHlwZXMuZnVuYyxcclxuICAgIHZhbHVlOiBQcm9wVHlwZXMuc3RyaW5nXHJcbn07XHJcblxyXG5jb25zdCBkZWZhdWx0UHJvcHMgPSB7XHJcbiAgICBrZXlOYW1lOiAna2V5JyxcclxuICAgIGxhYmVsTmFtZTogJ2xhYmVsJyxcclxuICAgIGlucHV0VGltZW91dDogMjAwXHJcbn07XHJcblxyXG5ATURCZWhhdmlvdXIoJ2xvYWRlcicpXHJcbkBNREJlaGF2aW91cignaW5wdXRUZXh0JylcclxuQENvbXBvbmVudEJhc2VCZWhhdmlvdXJcclxuY2xhc3MgQXV0b2NvbXBsZXRlIGV4dGVuZHMgQ29tcG9uZW50IHtcclxuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XHJcbiAgICAgICAgc3VwZXIocHJvcHMpO1xyXG4gICAgICAgIGNvbnN0IHN0YXRlID0ge1xyXG4gICAgICAgICAgICBmb2N1czogZmFsc2UsXHJcbiAgICAgICAgICAgIGlucHV0VmFsdWU6IHRoaXMucHJvcHMudmFsdWUsXHJcbiAgICAgICAgICAgIG9wdGlvbnM6IG5ldyBNYXAoKSxcclxuICAgICAgICAgICAgYWN0aXZlOiBudWxsLFxyXG4gICAgICAgICAgICBzZWxlY3RlZDogdGhpcy5wcm9wcy52YWx1ZSxcclxuICAgICAgICAgICAgZnJvbUtleVJlc29sdmVyOiBmYWxzZSxcclxuICAgICAgICAgICAgaXNMb2FkaW5nOiBmYWxzZSxcclxuICAgICAgICAgICAgY3VzdG9tRXJyb3I6IHRoaXMucHJvcHMuY3VzdG9tRXJyb3IsXHJcbiAgICAgICAgICAgIHRvdGFsQ291bnQ6IDBcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSBzdGF0ZTtcclxuICAgICAgICB0aGlzLmF1dG9jb21wbGV0ZUlkID0gdW5pcXVlSWQoJ2F1dG9jb21wbGV0ZS10ZXh0LScpO1xyXG4gICAgfTtcclxuXHJcbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcclxuICAgICAgICBjb25zdCB7dmFsdWUsIGtleVJlc29sdmVyLCBpbnB1dFRpbWVvdXR9ID0gdGhpcy5wcm9wcztcclxuICAgICAgICBpZiAodmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gbnVsbCkgeyAvLyB2YWx1ZSBpcyBkZWZpbmVkLCBjYWxsIHRoZSBrZXlSZXNvbHZlciB0byBnZXQgdGhlIGFzc29jaWF0ZWQgbGFiZWxcclxuICAgICAgICAgICAga2V5UmVzb2x2ZXIodmFsdWUpLnRoZW4oaW5wdXRWYWx1ZSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtpbnB1dFZhbHVlLCBmcm9tS2V5UmVzb2x2ZXI6IHRydWV9KTtcclxuICAgICAgICAgICAgfSkuY2F0Y2goZXJyb3IgPT4gdGhpcy5zZXRTdGF0ZSh7Y3VzdG9tRXJyb3I6IGVycm9yLm1lc3NhZ2V9KSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5faGFuZGxlRG9jdW1lbnRDbGljayk7XHJcbiAgICAgICAgdGhpcy5fZGVib3VuY2VkUXVlcnlTZWFyY2hlciA9IGRlYm91bmNlKHRoaXMuX3F1ZXJ5U2VhcmNoZXIsIGlucHV0VGltZW91dCk7XHJcbiAgICB9O1xyXG5cclxuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMoe3ZhbHVlLCBjdXN0b21FcnJvciwgZXJyb3J9KSB7XHJcbiAgICAgICAgY29uc3Qge2tleVJlc29sdmVyfSA9IHRoaXMucHJvcHM7XHJcbiAgICAgICAgaWYgKHZhbHVlICE9PSB0aGlzLnByb3BzLnZhbHVlICYmIHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09IG51bGwpIHsgLy8gdmFsdWUgaXMgZGVmaW5lZCwgY2FsbCB0aGUga2V5UmVzb2x2ZXIgdG8gZ2V0IHRoZSBhc3NvY2lhdGVkIGxhYmVsXHJcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2lucHV0VmFsdWU6IHZhbHVlLCBjdXN0b21FcnJvcn0sICgpID0+IGtleVJlc29sdmVyKHZhbHVlKS50aGVuKGlucHV0VmFsdWUgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7aW5wdXRWYWx1ZSwgZnJvbUtleVJlc29sdmVyOiB0cnVlfSk7XHJcbiAgICAgICAgICAgIH0pLmNhdGNoKGVycm9yID0+IHRoaXMuc2V0U3RhdGUoe2N1c3RvbUVycm9yOiBlcnJvci5tZXNzYWdlfSkpKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGN1c3RvbUVycm9yICE9PSB0aGlzLnByb3BzLmN1c3RvbUVycm9yKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2N1c3RvbUVycm9yfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKGVycm9yKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2N1c3RvbUVycm9yOiBlcnJvcn0pO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgY29tcG9uZW50RGlkVXBkYXRlKCkge1xyXG4gICAgICAgIGlmICh0aGlzLnByb3BzLmN1c3RvbUVycm9yKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVmcy5pbnB1dFRleHQuY2xhc3NMaXN0LmFkZCgnaXMtaW52YWxpZCcpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVmcy5pbnB1dFRleHQuY2xhc3NMaXN0LnJlbW92ZSgnaXMtaW52YWxpZCcpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XHJcbiAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLl9oYW5kbGVEb2N1bWVudENsaWNrKTtcclxuICAgIH07XHJcblxyXG4gICAgZ2V0VmFsdWUoKSB7XHJcbiAgICAgICAgY29uc3Qge2xhYmVsTmFtZSwga2V5TmFtZSwgdmFsdWV9ID0gdGhpcy5wcm9wcztcclxuICAgICAgICBjb25zdCB7aW5wdXRWYWx1ZSwgc2VsZWN0ZWQsIG9wdGlvbnMsIGZyb21LZXlSZXNvbHZlcn0gPSB0aGlzLnN0YXRlO1xyXG4gICAgICAgIGNvbnN0IHJlc29sdmVkTGFiZWwgPSBvcHRpb25zLmdldChzZWxlY3RlZCk7XHJcbiAgICAgICAgaWYgKGlucHV0VmFsdWUgPT09ICcnKSB7IC8vIFRoZSB1c2VyIGNsZWFyZWQgdGhlIGZpZWxkLCByZXR1cm4gYSBudWxsXHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoZnJvbUtleVJlc29sdmVyKSB7IC8vIFZhbHVlIHdhcyByZWNlaXZlZCBmcm9tIHRoZSBrZXlSZXNvbHZlciwgZ2l2ZSBpdCBmaXJlY3RseVxyXG4gICAgICAgICAgICByZXR1cm4gdmFsdWU7XHJcbiAgICAgICAgfSBlbHNlIGlmIChyZXNvbHZlZExhYmVsICE9PSBpbnB1dFZhbHVlICYmIHNlbGVjdGVkICE9PSBpbnB1dFZhbHVlKSB7IC8vIFRoZSB1c2VyIHR5cGVkIHNvbWV0aGluZyB3aXRob3V0IHNlbGVjdGluZyBhbnkgb3B0aW9uLCByZXR1cm4gYSBudWxsXHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH0gZWxzZSB7IC8vIFRoZSB1c2VyIHNlbGVjdGVkIGFuIG9wdGlvbiAob3Igbm8gdmFsdWUgd2FzIHByb3ZpZGVkKSwgcmV0dXJuIGl0XHJcbiAgICAgICAgICAgIHJldHVybiBzZWxlY3RlZCB8fCBudWxsO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgX2hhbmRsZURvY3VtZW50Q2xpY2sgPSAoe3RhcmdldH0pID0+IHtcclxuICAgICAgICBjb25zdCB7Zm9jdXMsIGlucHV0VmFsdWV9ID0gdGhpcy5zdGF0ZTtcclxuICAgICAgICBjb25zdCB7b25CYWRJbnB1dH0gPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIGlmIChmb2N1cykge1xyXG4gICAgICAgICAgICBjb25zdCBjbG9zZXN0QUNQYXJlbnQgPSBjbG9zZXN0KHRhcmdldCwgYFtkYXRhLWlkPScke3RoaXMuYXV0b2NvbXBsZXRlSWR9J11gLCB0cnVlKTtcclxuICAgICAgICAgICAgaWYoY2xvc2VzdEFDUGFyZW50ID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2ZvY3VzOiBmYWxzZX0sICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAob25CYWRJbnB1dCAmJiB0aGlzLmdldFZhbHVlKCkgPT09IG51bGwgJiYgaW5wdXRWYWx1ZSAhPT0gJycpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb25CYWRJbnB1dChpbnB1dFZhbHVlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgX2hhbmRsZVF1ZXJ5Q2hhbmdlID0gKHt0YXJnZXQ6IHt2YWx1ZX19KSA9PiB7XHJcbiAgICAgICAgaWYgKHZhbHVlID09PSAnJykgeyAvLyB0aGUgdXNlciBjbGVhcmVkIHRoZSBpbnB1dCwgZG9uJ3QgY2FsbCB0aGUgcXVlcnlTZWFyY2hlclxyXG4gICAgICAgICAgICBjb25zdCB7b25DaGFuZ2V9ID0gdGhpcy5wcm9wcztcclxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7aW5wdXRWYWx1ZTogdmFsdWUsIGZyb21LZXlSZXNvbHZlcjogZmFsc2V9KTtcclxuICAgICAgICAgICAgaWYgKG9uQ2hhbmdlKSBvbkNoYW5nZShudWxsKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtpbnB1dFZhbHVlOiB2YWx1ZSwgZnJvbUtleVJlc29sdmVyOiBmYWxzZSwgaXNMb2FkaW5nOiB0cnVlfSk7XHJcbiAgICAgICAgICAgIHRoaXMuX2RlYm91bmNlZFF1ZXJ5U2VhcmNoZXIodmFsdWUpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgX3F1ZXJ5U2VhcmNoZXIgPSB2YWx1ZSA9PiB7XHJcbiAgICAgICAgY29uc3Qge3F1ZXJ5U2VhcmNoZXIsIGtleU5hbWUsIGxhYmVsTmFtZX0gPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIHF1ZXJ5U2VhcmNoZXIodmFsdWUpLnRoZW4oKHtkYXRhLCB0b3RhbENvdW50fSkgPT4ge1xyXG4gICAgICAgICAgICAvLyBUT0RPIGhhbmRsZSB0aGUgaW5jb21wbGV0ZSBvcHRpb24gbGlzdCBjYXNlXHJcbiAgICAgICAgICAgIGNvbnN0IG9wdGlvbnMgPSBuZXcgTWFwKCk7XHJcbiAgICAgICAgICAgIGRhdGEuZm9yRWFjaChpdGVtID0+IHtcclxuICAgICAgICAgICAgICAgIG9wdGlvbnMuc2V0KGl0ZW1ba2V5TmFtZV0sIGl0ZW1bbGFiZWxOYW1lXSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtvcHRpb25zLCBpc0xvYWRpbmc6IGZhbHNlLCB0b3RhbENvdW50fSk7XHJcbiAgICAgICAgfSkuY2F0Y2goZXJyb3IgPT4gdGhpcy5zZXRTdGF0ZSh7Y3VzdG9tRXJyb3I6IGVycm9yLm1lc3NhZ2V9KSk7XHJcbiAgICB9O1xyXG5cclxuICAgIF9oYW5kbGVRdWVyeUZvY3VzID0gKCkgPT4ge1xyXG4gICAgICAgIHRoaXMucmVmcy5vcHRpb25zLnNjcm9sbFRvcCA9IDA7XHJcbiAgICAgICAgaWYgKHRoaXMucHJvcHMub25Gb2N1cykge1xyXG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uRm9jdXMuY2FsbCh0aGlzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7YWN0aXZlOiAnJywgZm9jdXM6IHRydWV9KTtcclxuICAgIH07XHJcblxyXG4gICAgX2hhbmRsZVF1ZXJ5S2V5RG93biA9IChldmVudCkgPT4ge1xyXG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgIGNvbnN0IHt3aGljaH0gPSBldmVudDtcclxuICAgICAgICBjb25zdCB7YWN0aXZlLCBvcHRpb25zfSA9IHRoaXMuc3RhdGU7XHJcbiAgICAgICAgaWYgKHdoaWNoID09PSBFTlRFUl9LRVlfQ09ERSAmJiBhY3RpdmUpIHRoaXMuX3NlbGVjdChhY3RpdmUpO1xyXG4gICAgICAgIGlmICh3aGljaCA9PT0gVEFCX0tFWV9DT0RFKSB0aGlzLnNldFN0YXRlKHtmb2N1czogZmFsc2V9LCAoKSA9PiB0aGlzLnJlZnMuaHRtbElucHV0LmJsdXIoKSk7XHJcbiAgICAgICAgaWYgKFtET1dOX0FSUk9XX0tFWV9DT0RFLCBVUF9BUlJPV19LRVlfQ09ERV0uaW5kZXhPZih3aGljaCkgIT09IC0xKSB7IC8vIHRoZSB1c2VyIHByZXNzZWQgb24gYW4gYXJyb3cga2V5LCBjaGFuZ2UgdGhlIGFjdGl2ZSBrZXlcclxuICAgICAgICAgICAgY29uc3Qgb3B0aW9uS2V5cyA9IFtdO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBrZXkgb2Ygb3B0aW9ucy5rZXlzKCkpIHtcclxuICAgICAgICAgICAgICAgIG9wdGlvbktleXMucHVzaChrZXkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRJbmRleCA9IG9wdGlvbktleXMuaW5kZXhPZihhY3RpdmUpO1xyXG4gICAgICAgICAgICBsZXQgbmV3SW5kZXggPSBjdXJyZW50SW5kZXggKyAod2hpY2ggPT09IERPV05fQVJST1dfS0VZX0NPREUgPyAxIDogLTEpO1xyXG4gICAgICAgICAgICBpZiAobmV3SW5kZXggPj0gb3B0aW9ucy5zaXplKSB7XHJcbiAgICAgICAgICAgICAgICBuZXdJbmRleCAtPSBvcHRpb25zLnNpemVcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAobmV3SW5kZXggPCAwKSB7XHJcbiAgICAgICAgICAgICAgICBuZXdJbmRleCArPSBvcHRpb25zLnNpemU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7YWN0aXZlOiBvcHRpb25LZXlzW25ld0luZGV4XX0pO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgX2hhbmRsZVN1Z2dlc3Rpb25Ib3ZlciA9IGtleSA9PiB7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7YWN0aXZlOiBrZXl9KTtcclxuICAgIH07XHJcblxyXG4gICAgX3NlbGVjdChrZXkpIHtcclxuICAgICAgICBjb25zdCB7b3B0aW9uc30gPSB0aGlzLnN0YXRlO1xyXG4gICAgICAgIGNvbnN0IHtvbkNoYW5nZSwga2V5TmFtZSwgbGFiZWxOYW1lfSA9IHRoaXMucHJvcHM7XHJcbiAgICAgICAgY29uc3QgcmVzb2x2ZWRMYWJlbCA9IG9wdGlvbnMuZ2V0KGtleSkgfHwgJyc7XHJcbiAgICAgICAgdGhpcy5yZWZzLmh0bWxJbnB1dC5ibHVyKCk7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7aW5wdXRWYWx1ZTogdGhpcy5pMThuKHJlc29sdmVkTGFiZWwpLCBzZWxlY3RlZDoga2V5LCBmb2N1czogZmFsc2V9LCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChvbkNoYW5nZSkgb25DaGFuZ2Uoa2V5KTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgX3JlbmRlck9wdGlvbnMgPSAoKSA9PiB7XHJcbiAgICAgICAgY29uc3Qge2FjdGl2ZSwgb3B0aW9ucywgZm9jdXN9ID0gdGhpcy5zdGF0ZTtcclxuICAgICAgICBjb25zdCByZW5kZXJlZE9wdGlvbnMgPSBbXTtcclxuICAgICAgICBmb3IgKGxldCBba2V5LCB2YWx1ZV0gb2Ygb3B0aW9ucykge1xyXG4gICAgICAgICAgICBjb25zdCBpc0FjdGl2ZSA9IGFjdGl2ZSA9PT0ga2V5O1xyXG4gICAgICAgICAgICByZW5kZXJlZE9wdGlvbnMucHVzaChcclxuICAgICAgICAgICAgICAgIDxsaVxyXG4gICAgICAgICAgICAgICAgZGF0YS1hY3RpdmU9e2lzQWN0aXZlfVxyXG4gICAgICAgICAgICAgICAgZGF0YS1mb2N1cz0nb3B0aW9uJ1xyXG4gICAgICAgICAgICAgICAga2V5PXtrZXl9XHJcbiAgICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLl9zZWxlY3QuYmluZCh0aGlzLCBrZXkpfVxyXG4gICAgICAgICAgICAgICAgb25Nb3VzZU92ZXI9e3RoaXMuX2hhbmRsZVN1Z2dlc3Rpb25Ib3Zlci5iaW5kKHRoaXMsIGtleSl9XHJcbiAgICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICB7dGhpcy5pMThuKHZhbHVlKX1cclxuICAgICAgICAgICAgICAgIDwvbGk+XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDx1bCBkYXRhLWZvY3VzPSdvcHRpb25zJyByZWY9J29wdGlvbnMnIGRhdGEtZm9jdXNzZWQ9e2ZvY3VzfT5cclxuICAgICAgICAgICAge3JlbmRlcmVkT3B0aW9uc31cclxuICAgICAgICAgICAgPC91bD5cclxuICAgICAgICApO1xyXG4gICAgfTtcclxuXHJcbiAgICByZW5kZXIgKCkge1xyXG4gICAgICAgIGNvbnN0IHsgYXV0b0ZvY3VzLCBvbkJsdXIsIGRpc2FibGVkLCBvbktleVByZXNzLCBtYXhMZW5ndGgsIG9uRm9jdXMsIG9uQ2xpY2ssIGN1c3RvbUVycm9yLCBwbGFjZWhvbGRlciwgcmVuZGVyT3B0aW9ucywgLi4ub3RoZXJQcm9wcyB9ICA9IHRoaXMucHJvcHM7XHJcbiAgICAgICAgY29uc3Qge2lucHV0VmFsdWUsIGlzTG9hZGluZ30gPSB0aGlzLnN0YXRlO1xyXG4gICAgICAgIGNvbnN0IHtfaGFuZGxlUXVlcnlGb2N1cywgX2hhbmRsZVF1ZXJ5S2V5RG93biwgX2hhbmRsZVF1ZXJ5Q2hhbmdlfSA9IHRoaXM7XHJcbiAgICAgICAgY29uc3QgaW5wdXRQcm9wcyA9ICB7XHJcbiAgICAgICAgICAgIGF1dG9Gb2N1cywgZGlzYWJsZWQsIG9uS2V5UHJlc3MsIG1heExlbmd0aCwgb25Gb2N1cywgb25DbGljayxcclxuICAgICAgICAgICAgb25DaGFuZ2U6IF9oYW5kbGVRdWVyeUNoYW5nZSwgb25Gb2N1czogX2hhbmRsZVF1ZXJ5Rm9jdXMsXHJcbiAgICAgICAgICAgIG9uS2V5RG93bjogX2hhbmRsZVF1ZXJ5S2V5RG93biwgb25CbHVyLFxyXG4gICAgICAgICAgICB2YWx1ZTogIWlucHV0VmFsdWUgPyAnJyA6IGlucHV0VmFsdWVcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2IGRhdGEtZm9jdXM9J2F1dG9jb21wbGV0ZScgZGF0YS1pZD17dGhpcy5hdXRvY29tcGxldGVJZH0+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17YG1kbC10ZXh0ZmllbGQgbWRsLWpzLXRleHRmaWVsZCR7Y3VzdG9tRXJyb3IgPyAnIGlzLWludmFsaWQnIDogJyd9YH0gZGF0YS1mb2N1cz0naW5wdXQtdGV4dCcgcmVmPSdpbnB1dFRleHQnPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgZGF0YS1mb2N1cz0nbG9hZGluZycgZGF0YS1sb2FkaW5nPXtpc0xvYWRpbmd9IGNsYXNzTmFtZT0nbWRsLXByb2dyZXNzIG1kbC1qcy1wcm9ncmVzcyBtZGwtcHJvZ3Jlc3NfX2luZGV0ZXJtaW5hdGUnIHJlZj0nbG9hZGVyJz48L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8aW5wdXRcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPSdtZGwtdGV4dGZpZWxkX19pbnB1dCdcclxuICAgICAgICAgICAgICAgICAgICAgICAgey4uLmlucHV0UHJvcHN9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZj0naHRtbElucHV0J1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlPSd0ZXh0J1xyXG4gICAgICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT0nbWRsLXRleHRmaWVsZF9fbGFiZWwnPnt0aGlzLmkxOG4ocGxhY2Vob2xkZXIpfTwvbGFiZWw+XHJcbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPSdtZGwtdGV4dGZpZWxkX19lcnJvcic+e3RoaXMuaTE4bihjdXN0b21FcnJvcil9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICB7cmVuZGVyT3B0aW9ucyA/IHJlbmRlck9wdGlvbnMuY2FsbCh0aGlzKSA6IHRoaXMuX3JlbmRlck9wdGlvbnMoKX1cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKTtcclxuICAgIH07XHJcbn1cclxuXHJcbkF1dG9jb21wbGV0ZS5kaXNwbGF5TmFtZSA9ICdBdXRvY29tcGxldGUnO1xyXG5BdXRvY29tcGxldGUuZGVmYXVsdFByb3BzID0gZGVmYXVsdFByb3BzO1xyXG5BdXRvY29tcGxldGUucHJvcFR5cGVzID0gcHJvcFR5cGVzO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgQXV0b2NvbXBsZXRlO1xyXG4iXX0=