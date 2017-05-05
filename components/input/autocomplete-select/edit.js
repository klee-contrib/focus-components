'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _dec, _dec2, _class;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _componentBase = require('../../../behaviours/component-base');

var _componentBase2 = _interopRequireDefault(_componentBase);

var _material = require('../../../behaviours/material');

var _material2 = _interopRequireDefault(_material);

var _filterHtmlAttributes = require('../../../utils/filter-html-attributes');

var _filterHtmlAttributes2 = _interopRequireDefault(_filterHtmlAttributes);

var _closest = require('closest');

var _closest2 = _interopRequireDefault(_closest);

var _debounce = require('lodash/function/debounce');

var _debounce2 = _interopRequireDefault(_debounce);

var _uniqueId = require('lodash/utility/uniqueId');

var _uniqueId2 = _interopRequireDefault(_uniqueId);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

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
        var _state2 = this.state,
            inputValue = _state2.inputValue,
            isLoading = _state2.isLoading;
        var _props4 = this.props,
            customError = _props4.customError,
            renderOptions = _props4.renderOptions;


        var validInputProps = (0, _filterHtmlAttributes2.default)(this.props);

        var placeholder = validInputProps.placeholder;


        validInputProps.value = inputValue;
        validInputProps.onFocus = this._handleQueryFocus;
        validInputProps.onKeyDown = this._handleQueryKeyDown;
        validInputProps.onChange = this._handleQueryChange;

        var inputProps = _extends({}, validInputProps);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJFTlRFUl9LRVlfQ09ERSIsIlRBQl9LRVlfQ09ERSIsIlVQX0FSUk9XX0tFWV9DT0RFIiwiRE9XTl9BUlJPV19LRVlfQ09ERSIsInByb3BUeXBlcyIsImN1c3RvbUVycm9yIiwic3RyaW5nIiwiaW5wdXRUaW1lb3V0IiwibnVtYmVyIiwiaXNSZXF1aXJlZCIsImtleU5hbWUiLCJrZXlSZXNvbHZlciIsImZ1bmMiLCJsYWJlbE5hbWUiLCJvbkJhZElucHV0Iiwib25DaGFuZ2UiLCJwbGFjZWhvbGRlciIsInF1ZXJ5U2VhcmNoZXIiLCJyZW5kZXJPcHRpb25zIiwidmFsdWUiLCJkZWZhdWx0UHJvcHMiLCJBdXRvY29tcGxldGUiLCJwcm9wcyIsIl9oYW5kbGVEb2N1bWVudENsaWNrIiwidGFyZ2V0Iiwic3RhdGUiLCJmb2N1cyIsImlucHV0VmFsdWUiLCJjbG9zZXN0QUNQYXJlbnQiLCJhdXRvY29tcGxldGVJZCIsInVuZGVmaW5lZCIsInNldFN0YXRlIiwiZ2V0VmFsdWUiLCJfaGFuZGxlUXVlcnlDaGFuZ2UiLCJmcm9tS2V5UmVzb2x2ZXIiLCJpc0xvYWRpbmciLCJfZGVib3VuY2VkUXVlcnlTZWFyY2hlciIsIl9xdWVyeVNlYXJjaGVyIiwidGhlbiIsImRhdGEiLCJ0b3RhbENvdW50Iiwib3B0aW9ucyIsIk1hcCIsImZvckVhY2giLCJzZXQiLCJpdGVtIiwiY2F0Y2giLCJlcnJvciIsIm1lc3NhZ2UiLCJfaGFuZGxlUXVlcnlGb2N1cyIsInJlZnMiLCJzY3JvbGxUb3AiLCJvbkZvY3VzIiwiY2FsbCIsImFjdGl2ZSIsIl9oYW5kbGVRdWVyeUtleURvd24iLCJldmVudCIsInN0b3BQcm9wYWdhdGlvbiIsIndoaWNoIiwiX3NlbGVjdCIsImh0bWxJbnB1dCIsImJsdXIiLCJpbmRleE9mIiwib3B0aW9uS2V5cyIsImtleXMiLCJrZXkiLCJwdXNoIiwiY3VycmVudEluZGV4IiwibmV3SW5kZXgiLCJzaXplIiwiX2hhbmRsZVN1Z2dlc3Rpb25Ib3ZlciIsIl9yZW5kZXJPcHRpb25zIiwicmVuZGVyZWRPcHRpb25zIiwiaXNBY3RpdmUiLCJiaW5kIiwiaTE4biIsInNlbGVjdGVkIiwiY29tcG9uZW50RGlkTW91bnQiLCJkb2N1bWVudCIsImFkZEV2ZW50TGlzdGVuZXIiLCJjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzIiwiY29tcG9uZW50RGlkVXBkYXRlIiwiaW5wdXRUZXh0IiwiY2xhc3NMaXN0IiwiYWRkIiwicmVtb3ZlIiwiY29tcG9uZW50V2lsbFVubW91bnQiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwicmVzb2x2ZWRMYWJlbCIsImdldCIsInJlbmRlciIsInZhbGlkSW5wdXRQcm9wcyIsIm9uS2V5RG93biIsImlucHV0UHJvcHMiLCJkaXNwbGF5TmFtZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FBRUEsSUFBTUEsaUJBQWlCLEVBQXZCO0FBQ0EsSUFBTUMsZUFBZSxFQUFyQjtBQUNBLElBQU1DLG9CQUFvQixFQUExQjtBQUNBLElBQU1DLHNCQUFzQixFQUE1Qjs7QUFFQSxJQUFNQyxZQUFZO0FBQ2RDLGlCQUFhLGlCQUFVQyxNQURUO0FBRWRDLGtCQUFjLGlCQUFVQyxNQUFWLENBQWlCQyxVQUZqQjtBQUdkQyxhQUFTLGlCQUFVSixNQUFWLENBQWlCRyxVQUhaO0FBSWRFLGlCQUFhLGlCQUFVQyxJQUFWLENBQWVILFVBSmQ7QUFLZEksZUFBVyxpQkFBVVAsTUFBVixDQUFpQkcsVUFMZDtBQU1kSyxnQkFBWSxpQkFBVUYsSUFOUjtBQU9kRyxjQUFVLGlCQUFVSCxJQUFWLENBQWVILFVBUFg7QUFRZE8saUJBQWEsaUJBQVVWLE1BUlQ7QUFTZFcsbUJBQWUsaUJBQVVMLElBQVYsQ0FBZUgsVUFUaEI7QUFVZFMsbUJBQWUsaUJBQVVOLElBVlg7QUFXZE8sV0FBTyxp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LGtCQUFLLCtDQUE0Q3hCLGNBQWMsYUFBZCxHQUE4QixFQUExRSxDQUFMLEVBQXFGLGNBQVcsWUFBaEcsRUFBNkcsS0FBSSxXQUFqSDtBQUNJLHVEQUFLLGNBQVcsU0FBaEIsRUFBMEIsZ0JBQWM4QixTQUF4QyxFQUFtRCxXQUFVLDBEQUE3RCxFQUF3SCxLQUFJLFFBQTVILEdBREo7QUFFSTtBQUNJLCtCQUFVO0FBRGQsbUJBRVEwRCxVQUZSO0FBR0kseUJBQUksV0FIUjtBQUlJLDBCQUFLO0FBSlQsbUJBRko7QUFRSTtBQUFBO0FBQUEsc0JBQU8sV0FBVSxzQkFBakI7QUFBeUMseUJBQUtsQixJQUFMLENBQVUzRCxXQUFWO0FBQXpDLGlCQVJKO0FBU0k7QUFBQTtBQUFBLHNCQUFNLFdBQVUsc0JBQWhCO0FBQXdDLHlCQUFLMkQsSUFBTCxDQUFVdEUsV0FBVjtBQUF4QztBQVRKLGFBREo7QUFZS2EsNEJBQWdCQSxjQUFjbUMsSUFBZCxDQUFtQixJQUFuQixDQUFoQixHQUEyQyxLQUFLa0IsY0FBTDtBQVpoRCxTQURKO0FBZ0JILEs7Ozs7OztBQUdMbEQsYUFBYXlFLFdBQWIsR0FBMkIsY0FBM0I7QUFDQXpFLGFBQWFELFlBQWIsR0FBNEJBLFlBQTVCO0FBQ0FDLGFBQWFqQixTQUFiLEdBQXlCQSxTQUF6Qjs7a0JBRWVpQixZIiwiZmlsZSI6ImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgUHJvcFR5cGVzfSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBDb21wb25lbnRCYXNlQmVoYXZpb3VyIGZyb20gJy4uLy4uLy4uL2JlaGF2aW91cnMvY29tcG9uZW50LWJhc2UnO1xyXG5pbXBvcnQgTURCZWhhdmlvdXIgZnJvbSAnLi4vLi4vLi4vYmVoYXZpb3Vycy9tYXRlcmlhbCc7XHJcbmltcG9ydCBmaWx0ZXJQcm9wcyBmcm9tICcuLi8uLi8uLi91dGlscy9maWx0ZXItaHRtbC1hdHRyaWJ1dGVzJztcclxuaW1wb3J0IGNsb3Nlc3QgZnJvbSAnY2xvc2VzdCc7XHJcbmltcG9ydCBkZWJvdW5jZSBmcm9tICdsb2Rhc2gvZnVuY3Rpb24vZGVib3VuY2UnO1xyXG5pbXBvcnQgdW5pcXVlSWQgZnJvbSAnbG9kYXNoL3V0aWxpdHkvdW5pcXVlSWQnO1xyXG5cclxuY29uc3QgRU5URVJfS0VZX0NPREUgPSAxMztcclxuY29uc3QgVEFCX0tFWV9DT0RFID0gMjc7XHJcbmNvbnN0IFVQX0FSUk9XX0tFWV9DT0RFID0gMzg7XHJcbmNvbnN0IERPV05fQVJST1dfS0VZX0NPREUgPSA0MDtcclxuXHJcbmNvbnN0IHByb3BUeXBlcyA9IHtcclxuICAgIGN1c3RvbUVycm9yOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG4gICAgaW5wdXRUaW1lb3V0OiBQcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXHJcbiAgICBrZXlOYW1lOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXHJcbiAgICBrZXlSZXNvbHZlcjogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcclxuICAgIGxhYmVsTmFtZTogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxyXG4gICAgb25CYWRJbnB1dDogUHJvcFR5cGVzLmZ1bmMsXHJcbiAgICBvbkNoYW5nZTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcclxuICAgIHBsYWNlaG9sZGVyOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG4gICAgcXVlcnlTZWFyY2hlcjogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcclxuICAgIHJlbmRlck9wdGlvbnM6IFByb3BUeXBlcy5mdW5jLFxyXG4gICAgdmFsdWU6IFByb3BUeXBlcy5zdHJpbmdcclxufTtcclxuXHJcbmNvbnN0IGRlZmF1bHRQcm9wcyA9IHtcclxuICAgIGtleU5hbWU6ICdrZXknLFxyXG4gICAgbGFiZWxOYW1lOiAnbGFiZWwnLFxyXG4gICAgaW5wdXRUaW1lb3V0OiAyMDBcclxufTtcclxuXHJcbkBNREJlaGF2aW91cignbG9hZGVyJylcclxuQE1EQmVoYXZpb3VyKCdpbnB1dFRleHQnKVxyXG5AQ29tcG9uZW50QmFzZUJlaGF2aW91clxyXG5jbGFzcyBBdXRvY29tcGxldGUgZXh0ZW5kcyBDb21wb25lbnQge1xyXG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcclxuICAgICAgICBzdXBlcihwcm9wcyk7XHJcbiAgICAgICAgY29uc3Qgc3RhdGUgPSB7XHJcbiAgICAgICAgICAgIGZvY3VzOiBmYWxzZSxcclxuICAgICAgICAgICAgaW5wdXRWYWx1ZTogdGhpcy5wcm9wcy52YWx1ZSxcclxuICAgICAgICAgICAgb3B0aW9uczogbmV3IE1hcCgpLFxyXG4gICAgICAgICAgICBhY3RpdmU6IG51bGwsXHJcbiAgICAgICAgICAgIHNlbGVjdGVkOiB0aGlzLnByb3BzLnZhbHVlLFxyXG4gICAgICAgICAgICBmcm9tS2V5UmVzb2x2ZXI6IGZhbHNlLFxyXG4gICAgICAgICAgICBpc0xvYWRpbmc6IGZhbHNlLFxyXG4gICAgICAgICAgICBjdXN0b21FcnJvcjogdGhpcy5wcm9wcy5jdXN0b21FcnJvcixcclxuICAgICAgICAgICAgdG90YWxDb3VudDogMFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHN0YXRlO1xyXG4gICAgICAgIHRoaXMuYXV0b2NvbXBsZXRlSWQgPSB1bmlxdWVJZCgnYXV0b2NvbXBsZXRlLXRleHQtJyk7XHJcbiAgICB9XHJcblxyXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XHJcbiAgICAgICAgY29uc3Qge3ZhbHVlLCBrZXlSZXNvbHZlciwgaW5wdXRUaW1lb3V0fSA9IHRoaXMucHJvcHM7XHJcbiAgICAgICAgaWYgKHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09IG51bGwpIHsgLy8gdmFsdWUgaXMgZGVmaW5lZCwgY2FsbCB0aGUga2V5UmVzb2x2ZXIgdG8gZ2V0IHRoZSBhc3NvY2lhdGVkIGxhYmVsXHJcbiAgICAgICAgICAgIGtleVJlc29sdmVyKHZhbHVlKS50aGVuKGlucHV0VmFsdWUgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7aW5wdXRWYWx1ZSwgZnJvbUtleVJlc29sdmVyOiB0cnVlfSk7XHJcbiAgICAgICAgICAgIH0pLmNhdGNoKGVycm9yID0+IHRoaXMuc2V0U3RhdGUoe2N1c3RvbUVycm9yOiBlcnJvci5tZXNzYWdlfSkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuX2hhbmRsZURvY3VtZW50Q2xpY2spO1xyXG4gICAgICAgIHRoaXMuX2RlYm91bmNlZFF1ZXJ5U2VhcmNoZXIgPSBkZWJvdW5jZSh0aGlzLl9xdWVyeVNlYXJjaGVyLCBpbnB1dFRpbWVvdXQpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMoe3ZhbHVlLCBjdXN0b21FcnJvciwgZXJyb3J9KSB7XHJcbiAgICAgICAgY29uc3Qge2tleVJlc29sdmVyfSA9IHRoaXMucHJvcHM7XHJcbiAgICAgICAgaWYgKHZhbHVlICE9PSB0aGlzLnByb3BzLnZhbHVlICYmIHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09IG51bGwpIHsgLy8gdmFsdWUgaXMgZGVmaW5lZCwgY2FsbCB0aGUga2V5UmVzb2x2ZXIgdG8gZ2V0IHRoZSBhc3NvY2lhdGVkIGxhYmVsXHJcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2lucHV0VmFsdWU6IHZhbHVlLCBjdXN0b21FcnJvcn0sICgpID0+IGtleVJlc29sdmVyKHZhbHVlKS50aGVuKGlucHV0VmFsdWUgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7aW5wdXRWYWx1ZSwgZnJvbUtleVJlc29sdmVyOiB0cnVlfSk7XHJcbiAgICAgICAgICAgIH0pLmNhdGNoKGVycm9yID0+IHRoaXMuc2V0U3RhdGUoe2N1c3RvbUVycm9yOiBlcnJvci5tZXNzYWdlfSkpKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGN1c3RvbUVycm9yICE9PSB0aGlzLnByb3BzLmN1c3RvbUVycm9yKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2N1c3RvbUVycm9yfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChlcnJvcikge1xyXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtjdXN0b21FcnJvcjogZXJyb3J9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY29tcG9uZW50RGlkVXBkYXRlKCkge1xyXG4gICAgICAgIGlmICh0aGlzLnByb3BzLmN1c3RvbUVycm9yKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVmcy5pbnB1dFRleHQuY2xhc3NMaXN0LmFkZCgnaXMtaW52YWxpZCcpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVmcy5pbnB1dFRleHQuY2xhc3NMaXN0LnJlbW92ZSgnaXMtaW52YWxpZCcpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcclxuICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuX2hhbmRsZURvY3VtZW50Q2xpY2spO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFZhbHVlKCkge1xyXG4gICAgICAgIGNvbnN0IHtsYWJlbE5hbWUsIGtleU5hbWUsIHZhbHVlfSA9IHRoaXMucHJvcHM7XHJcbiAgICAgICAgY29uc3Qge2lucHV0VmFsdWUsIHNlbGVjdGVkLCBvcHRpb25zLCBmcm9tS2V5UmVzb2x2ZXJ9ID0gdGhpcy5zdGF0ZTtcclxuICAgICAgICBjb25zdCByZXNvbHZlZExhYmVsID0gb3B0aW9ucy5nZXQoc2VsZWN0ZWQpO1xyXG4gICAgICAgIGlmIChpbnB1dFZhbHVlID09PSAnJykgeyAvLyBUaGUgdXNlciBjbGVhcmVkIHRoZSBmaWVsZCwgcmV0dXJuIGEgbnVsbFxyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9IGVsc2UgaWYgKGZyb21LZXlSZXNvbHZlcikgeyAvLyBWYWx1ZSB3YXMgcmVjZWl2ZWQgZnJvbSB0aGUga2V5UmVzb2x2ZXIsIGdpdmUgaXQgZmlyZWN0bHlcclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgICAgIH0gZWxzZSBpZiAocmVzb2x2ZWRMYWJlbCAhPT0gaW5wdXRWYWx1ZSAmJiBzZWxlY3RlZCAhPT0gaW5wdXRWYWx1ZSkgeyAvLyBUaGUgdXNlciB0eXBlZCBzb21ldGhpbmcgd2l0aG91dCBzZWxlY3RpbmcgYW55IG9wdGlvbiwgcmV0dXJuIGEgbnVsbFxyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9IGVsc2UgeyAvLyBUaGUgdXNlciBzZWxlY3RlZCBhbiBvcHRpb24gKG9yIG5vIHZhbHVlIHdhcyBwcm92aWRlZCksIHJldHVybiBpdFxyXG4gICAgICAgICAgICByZXR1cm4gc2VsZWN0ZWQgfHwgbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgX2hhbmRsZURvY3VtZW50Q2xpY2sgPSAoe3RhcmdldH0pID0+IHtcclxuICAgICAgICBjb25zdCB7Zm9jdXMsIGlucHV0VmFsdWV9ID0gdGhpcy5zdGF0ZTtcclxuICAgICAgICBjb25zdCB7b25CYWRJbnB1dH0gPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIGlmIChmb2N1cykge1xyXG4gICAgICAgICAgICBjb25zdCBjbG9zZXN0QUNQYXJlbnQgPSBjbG9zZXN0KHRhcmdldCwgYFtkYXRhLWlkPScke3RoaXMuYXV0b2NvbXBsZXRlSWR9J11gLCB0cnVlKTtcclxuICAgICAgICAgICAgaWYgKGNsb3Nlc3RBQ1BhcmVudCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtmb2N1czogZmFsc2V9LCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9uQmFkSW5wdXQgJiYgdGhpcy5nZXRWYWx1ZSgpID09PSBudWxsICYmIGlucHV0VmFsdWUgIT09ICcnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQmFkSW5wdXQoaW5wdXRWYWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIF9oYW5kbGVRdWVyeUNoYW5nZSA9ICh7dGFyZ2V0OiB7dmFsdWV9fSkgPT4ge1xyXG4gICAgICAgIGlmICh2YWx1ZSA9PT0gJycpIHsgLy8gdGhlIHVzZXIgY2xlYXJlZCB0aGUgaW5wdXQsIGRvbid0IGNhbGwgdGhlIHF1ZXJ5U2VhcmNoZXJcclxuICAgICAgICAgICAgY29uc3Qge29uQ2hhbmdlfSA9IHRoaXMucHJvcHM7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2lucHV0VmFsdWU6IHZhbHVlLCBmcm9tS2V5UmVzb2x2ZXI6IGZhbHNlfSk7XHJcbiAgICAgICAgICAgIGlmIChvbkNoYW5nZSkgb25DaGFuZ2UobnVsbCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7aW5wdXRWYWx1ZTogdmFsdWUsIGZyb21LZXlSZXNvbHZlcjogZmFsc2UsIGlzTG9hZGluZzogdHJ1ZX0pO1xyXG4gICAgICAgICAgICB0aGlzLl9kZWJvdW5jZWRRdWVyeVNlYXJjaGVyKHZhbHVlKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIF9xdWVyeVNlYXJjaGVyID0gdmFsdWUgPT4ge1xyXG4gICAgICAgIGNvbnN0IHtxdWVyeVNlYXJjaGVyLCBrZXlOYW1lLCBsYWJlbE5hbWV9ID0gdGhpcy5wcm9wcztcclxuICAgICAgICBxdWVyeVNlYXJjaGVyKHZhbHVlKS50aGVuKCh7ZGF0YSwgdG90YWxDb3VudH0pID0+IHtcclxuICAgICAgICAgICAgLy8gVE9ETyBoYW5kbGUgdGhlIGluY29tcGxldGUgb3B0aW9uIGxpc3QgY2FzZVxyXG4gICAgICAgICAgICBjb25zdCBvcHRpb25zID0gbmV3IE1hcCgpO1xyXG4gICAgICAgICAgICBkYXRhLmZvckVhY2goaXRlbSA9PiB7XHJcbiAgICAgICAgICAgICAgICBvcHRpb25zLnNldChpdGVtW2tleU5hbWVdLCBpdGVtW2xhYmVsTmFtZV0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7b3B0aW9ucywgaXNMb2FkaW5nOiBmYWxzZSwgdG90YWxDb3VudH0pO1xyXG4gICAgICAgIH0pLmNhdGNoKGVycm9yID0+IHRoaXMuc2V0U3RhdGUoe2N1c3RvbUVycm9yOiBlcnJvci5tZXNzYWdlfSkpO1xyXG4gICAgfTtcclxuXHJcbiAgICBfaGFuZGxlUXVlcnlGb2N1cyA9ICgpID0+IHtcclxuICAgICAgICB0aGlzLnJlZnMub3B0aW9ucy5zY3JvbGxUb3AgPSAwO1xyXG4gICAgICAgIGlmICh0aGlzLnByb3BzLm9uRm9jdXMpIHtcclxuICAgICAgICAgICAgdGhpcy5wcm9wcy5vbkZvY3VzLmNhbGwodGhpcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe2FjdGl2ZTogJycsIGZvY3VzOiB0cnVlfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIF9oYW5kbGVRdWVyeUtleURvd24gPSAoZXZlbnQpID0+IHtcclxuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICBjb25zdCB7d2hpY2h9ID0gZXZlbnQ7XHJcbiAgICAgICAgY29uc3Qge2FjdGl2ZSwgb3B0aW9uc30gPSB0aGlzLnN0YXRlO1xyXG4gICAgICAgIGlmICh3aGljaCA9PT0gRU5URVJfS0VZX0NPREUgJiYgYWN0aXZlKSB0aGlzLl9zZWxlY3QoYWN0aXZlKTtcclxuICAgICAgICBpZiAod2hpY2ggPT09IFRBQl9LRVlfQ09ERSkgdGhpcy5zZXRTdGF0ZSh7Zm9jdXM6IGZhbHNlfSwgKCkgPT4gdGhpcy5yZWZzLmh0bWxJbnB1dC5ibHVyKCkpO1xyXG4gICAgICAgIGlmIChbRE9XTl9BUlJPV19LRVlfQ09ERSwgVVBfQVJST1dfS0VZX0NPREVdLmluZGV4T2Yod2hpY2gpICE9PSAtMSkgeyAvLyB0aGUgdXNlciBwcmVzc2VkIG9uIGFuIGFycm93IGtleSwgY2hhbmdlIHRoZSBhY3RpdmUga2V5XHJcbiAgICAgICAgICAgIGNvbnN0IG9wdGlvbktleXMgPSBbXTtcclxuICAgICAgICAgICAgZm9yIChsZXQga2V5IG9mIG9wdGlvbnMua2V5cygpKSB7XHJcbiAgICAgICAgICAgICAgICBvcHRpb25LZXlzLnB1c2goa2V5KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb25zdCBjdXJyZW50SW5kZXggPSBvcHRpb25LZXlzLmluZGV4T2YoYWN0aXZlKTtcclxuICAgICAgICAgICAgbGV0IG5ld0luZGV4ID0gY3VycmVudEluZGV4ICsgKHdoaWNoID09PSBET1dOX0FSUk9XX0tFWV9DT0RFID8gMSA6IC0xKTtcclxuICAgICAgICAgICAgaWYgKG5ld0luZGV4ID49IG9wdGlvbnMuc2l6ZSkge1xyXG4gICAgICAgICAgICAgICAgbmV3SW5kZXggLT0gb3B0aW9ucy5zaXplXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKG5ld0luZGV4IDwgMCkge1xyXG4gICAgICAgICAgICAgICAgbmV3SW5kZXggKz0gb3B0aW9ucy5zaXplO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2FjdGl2ZTogb3B0aW9uS2V5c1tuZXdJbmRleF19KTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIF9oYW5kbGVTdWdnZXN0aW9uSG92ZXIgPSBrZXkgPT4ge1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe2FjdGl2ZToga2V5fSk7XHJcbiAgICB9O1xyXG5cclxuICAgIF9zZWxlY3Qoa2V5KSB7XHJcbiAgICAgICAgY29uc3Qge29wdGlvbnN9ID0gdGhpcy5zdGF0ZTtcclxuICAgICAgICBjb25zdCB7b25DaGFuZ2UsIGtleU5hbWUsIGxhYmVsTmFtZX0gPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIGNvbnN0IHJlc29sdmVkTGFiZWwgPSBvcHRpb25zLmdldChrZXkpIHx8ICcnO1xyXG4gICAgICAgIHRoaXMucmVmcy5odG1sSW5wdXQuYmx1cigpO1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe2lucHV0VmFsdWU6IHRoaXMuaTE4bihyZXNvbHZlZExhYmVsKSwgc2VsZWN0ZWQ6IGtleSwgZm9jdXM6IGZhbHNlfSwgKCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAob25DaGFuZ2UpIG9uQ2hhbmdlKGtleSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgX3JlbmRlck9wdGlvbnMgPSAoKSA9PiB7XHJcbiAgICAgICAgY29uc3Qge2FjdGl2ZSwgb3B0aW9ucywgZm9jdXN9ID0gdGhpcy5zdGF0ZTtcclxuICAgICAgICBjb25zdCByZW5kZXJlZE9wdGlvbnMgPSBbXTtcclxuICAgICAgICBmb3IgKGxldCBba2V5LCB2YWx1ZV0gb2Ygb3B0aW9ucykge1xyXG4gICAgICAgICAgICBjb25zdCBpc0FjdGl2ZSA9IGFjdGl2ZSA9PT0ga2V5O1xyXG4gICAgICAgICAgICByZW5kZXJlZE9wdGlvbnMucHVzaChcclxuICAgICAgICAgICAgICAgIDxsaVxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGEtYWN0aXZlPXtpc0FjdGl2ZX1cclxuICAgICAgICAgICAgICAgICAgICBkYXRhLWZvY3VzPSdvcHRpb24nXHJcbiAgICAgICAgICAgICAgICAgICAga2V5PXtrZXl9XHJcbiAgICAgICAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5fc2VsZWN0LmJpbmQodGhpcywga2V5KX1cclxuICAgICAgICAgICAgICAgICAgICBvbk1vdXNlT3Zlcj17dGhpcy5faGFuZGxlU3VnZ2VzdGlvbkhvdmVyLmJpbmQodGhpcywga2V5KX1cclxuICAgICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgICAgICB7dGhpcy5pMThuKHZhbHVlKX1cclxuICAgICAgICAgICAgICAgIDwvbGk+XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDx1bCBkYXRhLWZvY3VzPSdvcHRpb25zJyByZWY9J29wdGlvbnMnIGRhdGEtZm9jdXNzZWQ9e2ZvY3VzfT5cclxuICAgICAgICAgICAgICAgIHtyZW5kZXJlZE9wdGlvbnN9XHJcbiAgICAgICAgICAgIDwvdWw+XHJcbiAgICAgICAgKTtcclxuICAgIH07XHJcblxyXG4gICAgcmVuZGVyICgpIHtcclxuICAgICAgICBjb25zdCB7aW5wdXRWYWx1ZSwgaXNMb2FkaW5nfSA9IHRoaXMuc3RhdGU7XHJcbiAgICAgICAgY29uc3Qge2N1c3RvbUVycm9yLCByZW5kZXJPcHRpb25zfSA9IHRoaXMucHJvcHM7XHJcblxyXG4gICAgICAgIGNvbnN0IHZhbGlkSW5wdXRQcm9wcyA9IGZpbHRlclByb3BzKHRoaXMucHJvcHMpO1xyXG5cclxuICAgICAgICBjb25zdCB7IHBsYWNlaG9sZGVyIH0gPSB2YWxpZElucHV0UHJvcHM7XHJcblxyXG4gICAgICAgIHZhbGlkSW5wdXRQcm9wcy52YWx1ZSA9IGlucHV0VmFsdWU7XHJcbiAgICAgICAgdmFsaWRJbnB1dFByb3BzLm9uRm9jdXMgPSB0aGlzLl9oYW5kbGVRdWVyeUZvY3VzO1xyXG4gICAgICAgIHZhbGlkSW5wdXRQcm9wcy5vbktleURvd24gPSB0aGlzLl9oYW5kbGVRdWVyeUtleURvd247XHJcbiAgICAgICAgdmFsaWRJbnB1dFByb3BzLm9uQ2hhbmdlID0gdGhpcy5faGFuZGxlUXVlcnlDaGFuZ2U7XHJcblxyXG4gICAgICAgIGNvbnN0IGlucHV0UHJvcHMgPSB7Li4udmFsaWRJbnB1dFByb3BzfTtcclxuXHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdiBkYXRhLWZvY3VzPSdhdXRvY29tcGxldGUnIGRhdGEtaWQ9e3RoaXMuYXV0b2NvbXBsZXRlSWR9PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e2BtZGwtdGV4dGZpZWxkIG1kbC1qcy10ZXh0ZmllbGQke2N1c3RvbUVycm9yID8gJyBpcy1pbnZhbGlkJyA6ICcnfWB9IGRhdGEtZm9jdXM9J2lucHV0LXRleHQnIHJlZj0naW5wdXRUZXh0Jz5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGRhdGEtZm9jdXM9J2xvYWRpbmcnIGRhdGEtbG9hZGluZz17aXNMb2FkaW5nfSBjbGFzc05hbWU9J21kbC1wcm9ncmVzcyBtZGwtanMtcHJvZ3Jlc3MgbWRsLXByb2dyZXNzX19pbmRldGVybWluYXRlJyByZWY9J2xvYWRlcicgLz5cclxuICAgICAgICAgICAgICAgICAgICA8aW5wdXRcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPSdtZGwtdGV4dGZpZWxkX19pbnB1dCdcclxuICAgICAgICAgICAgICAgICAgICAgICAgey4uLmlucHV0UHJvcHN9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZj0naHRtbElucHV0J1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlPSd0ZXh0J1xyXG4gICAgICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT0nbWRsLXRleHRmaWVsZF9fbGFiZWwnPnt0aGlzLmkxOG4ocGxhY2Vob2xkZXIpfTwvbGFiZWw+XHJcbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPSdtZGwtdGV4dGZpZWxkX19lcnJvcic+e3RoaXMuaTE4bihjdXN0b21FcnJvcil9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICB7cmVuZGVyT3B0aW9ucyA/IHJlbmRlck9wdGlvbnMuY2FsbCh0aGlzKSA6IHRoaXMuX3JlbmRlck9wdGlvbnMoKX1cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufVxyXG5cclxuQXV0b2NvbXBsZXRlLmRpc3BsYXlOYW1lID0gJ0F1dG9jb21wbGV0ZSc7XHJcbkF1dG9jb21wbGV0ZS5kZWZhdWx0UHJvcHMgPSBkZWZhdWx0UHJvcHM7XHJcbkF1dG9jb21wbGV0ZS5wcm9wVHlwZXMgPSBwcm9wVHlwZXM7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBBdXRvY29tcGxldGU7XHJcbiJdfQ==