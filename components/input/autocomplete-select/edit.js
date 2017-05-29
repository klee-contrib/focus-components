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
    value: _react.PropTypes.string,
    onSelectClear: _react.PropTypes.bool,
    clearOnNullValue: _react.PropTypes.bool
};

var defaultProps = {
    keyName: 'key',
    labelName: 'label',
    inputTimeout: 200,
    onSelectClear: false,
    clearOnNullValue: true
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

        if (this.props.clearOnNullValue && this.props.clearOnNullValue === true && value === null && this.state.inputValue !== null) {
            this.setState({ inputValue: null });
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
        var onChange = this.props.onChange;

        var resolvedLabel = options.get(key) || '';
        this.refs.htmlInput.blur();
        var newState = { inputValue: this.i18n(resolvedLabel), selected: key, focus: false };
        if (this.props.onSelectClear && this.props.onSelectClear === true) {
            newState = { inputValue: null, selected: null, focus: false };
        }
        this.setState(newState, function () {
            if (onChange) {
                onChange(key);
            }
        });
    };

    Autocomplete.prototype.render = function render() {
        var _state2 = this.state,
            inputValue = _state2.inputValue,
            isLoading = _state2.isLoading;
        var _props3 = this.props,
            customError = _props3.customError,
            renderOptions = _props3.renderOptions;


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJFTlRFUl9LRVlfQ09ERSIsIlRBQl9LRVlfQ09ERSIsIlVQX0FSUk9XX0tFWV9DT0RFIiwiRE9XTl9BUlJPV19LRVlfQ09ERSIsInByb3BUeXBlcyIsImN1c3RvbUVycm9yIiwic3RyaW5nIiwiaW5wdXRUaW1lb3V0IiwibnVtYmVyIiwiaXNSZXF1aXJlZCIsImtleU5hbWUiLCJrZXlSZXNvbHZlciIsImZ1bmMiLCJsYWJlbE5hbWUiLCJvbkJhZElucHV0Iiwib25DaGFuZ2UiLCJwbGFjZWhvbGRlciIsInF1ZXJ5U2VhcmNoZXIiLCJyZW5kZXJPcHRpb25zIiwidmFsdWUiLCJvblNlbGVjdENsZWFyIiwiYm9vbCIsImNsZWFyT25OdWxsVmFsdWUiLCJkZWZhdWx0UHJvcHMiLCJBdXRvY29tcGxldGUiLCJwcm9wcyIsIl9oYW5kbGVEb2N1bWVudENsaWNrIiwidGFyZ2V0Iiwic3RhdGUiLCJmb2N1cyIsImlucHV0VmFsdWUiLCJjbG9zZXN0QUNQYXJlbnQiLCJhdXRvY29tcGxldGVJZCIsInVuZGVmaW5lZCIsInNldFN0YXRlIiwiZ2V0VmFsdWUiLCJfaGFuZGxlUXVlcnlDaGFuZ2UiLCJmcm9tS2V5UmVzb2x2ZXIiLCJpc0xvYWRpbmciLCJfZGVib3VuY2VkUXVlcnlTZWFyY2hlciIsIl9xdWVyeVNlYXJjaGVyIiwidGhlbiIsImRhdGEiLCJ0b3RhbENvdW50Iiwib3B0aW9ucyIsIk1hcCIsImZvckVhY2giLCJzZXQiLCJpdGVtIiwiY2F0Y2giLCJlcnJvciIsIm1lc3NhZ2UiLCJfaGFuZGxlUXVlcnlGb2N1cyIsInJlZnMiLCJzY3JvbGxUb3AiLCJvbkZvY3VzIiwiY2FsbCIsImFjdGl2ZSIsIl9oYW5kbGVRdWVyeUtleURvd24iLCJldmVudCIsInN0b3BQcm9wYWdhdGlvbiIsIndoaWNoIiwiX3NlbGVjdCIsImh0bWxJbnB1dCIsImJsdXIiLCJpbmRleE9mIiwib3B0aW9uS2V5cyIsImtleXMiLCJrZXkiLCJwdXNoIiwiY3VycmVudEluZGV4IiwibmV3SW5kZXgiLCJzaXplIiwiX2hhbmRsZVN1Z2dlc3Rpb25Ib3ZlciIsIl9yZW5kZXJPcHRpb25zIiwicmVuZGVyZWRPcHRpb25zIiwiaXNBY3RpdmUiLCJiaW5kIiwiaTE4biIsInNlbGVjdGVkIiwiY29tcG9uZW50RGlkTW91bnQiLCJkb2N1bWVudCIsImFkZEV2ZW50TGlzdGVuZXIiLCJjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzIiwiY29tcG9uZW50RGlkVXBkYXRlIiwiaW5wdXRUZXh0IiwiY2xhc3NMaXN0IiwiYWRkIiwicmVtb3ZlIiwiY29tcG9uZW50V2lsbFVubW91bnQiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwicmVzb2x2ZWRMYWJlbCIsImdldCIsIm5ld1N0YXRlIiwicmVuZGVyIiwidmFsaWRJbnB1dFByb3BzIiwib25LZXlEb3duIiwiaW5wdXRQcm9wcyIsImRpc3BsYXlOYW1lIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7QUFFQSxJQUFNQSxpQkFBaUIsRUFBdkI7QUFDQSxJQUFNQyxlQUFlLEVBQXJCO0FBQ0EsSUFBTUMsb0JBQW9CLEVBQTFCO0FBQ0EsSUFBTUMsc0JBQXNCLEVBQTVCOztBQUVBLElBQU1DLFlBQVk7QUFDZEMsaUJBQWEsaUJBQVVDLE1BRFQ7QUFFZEMsa0JBQWMsaUJBQVVDLE1BQVYsQ0FBaUJDLFVBRmpCO0FBR2RDLGFBQVMsaUJBQVVKLE1BQVYsQ0FBaUJHLFVBSFo7QUFJZEUsaUJBQWEsaUJBQVVDLElBQVYsQ0FBZUgsVUFKZDtBQUtkSSxlQUFXLGlCQUFVUCxNQUFWLENBQWlCRyxVQUxkO0FBTWRLLGdCQUFZLGlCQUFVRixJQU5SO0FBT2RHLGNBQVUsaUJBQVVILElBQVYsQ0FBZUgsVUFQWDtBQVFkTyxpQkFBYSxpQkFBVVYsTUFSVDtBQVNkVyxtQkFBZSxpQkFBVUws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LEtBQUtrQixjQUFMO0FBWmhELFNBREo7QUFnQkgsSzs7Ozs7O0FBR0xsRCxhQUFhMEUsV0FBYixHQUEyQixjQUEzQjtBQUNBMUUsYUFBYUQsWUFBYixHQUE0QkEsWUFBNUI7QUFDQUMsYUFBYXBCLFNBQWIsR0FBeUJBLFNBQXpCOztrQkFFZW9CLFkiLCJmaWxlIjoiaXMtcmVhY3QtY2xhc3MtY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IENvbXBvbmVudEJhc2VCZWhhdmlvdXIgZnJvbSAnLi4vLi4vLi4vYmVoYXZpb3Vycy9jb21wb25lbnQtYmFzZSc7XHJcbmltcG9ydCBNREJlaGF2aW91ciBmcm9tICcuLi8uLi8uLi9iZWhhdmlvdXJzL21hdGVyaWFsJztcclxuaW1wb3J0IGZpbHRlclByb3BzIGZyb20gJy4uLy4uLy4uL3V0aWxzL2ZpbHRlci1odG1sLWF0dHJpYnV0ZXMnO1xyXG5pbXBvcnQgY2xvc2VzdCBmcm9tICdjbG9zZXN0JztcclxuaW1wb3J0IGRlYm91bmNlIGZyb20gJ2xvZGFzaC9mdW5jdGlvbi9kZWJvdW5jZSc7XHJcbmltcG9ydCB1bmlxdWVJZCBmcm9tICdsb2Rhc2gvdXRpbGl0eS91bmlxdWVJZCc7XHJcblxyXG5jb25zdCBFTlRFUl9LRVlfQ09ERSA9IDEzO1xyXG5jb25zdCBUQUJfS0VZX0NPREUgPSAyNztcclxuY29uc3QgVVBfQVJST1dfS0VZX0NPREUgPSAzODtcclxuY29uc3QgRE9XTl9BUlJPV19LRVlfQ09ERSA9IDQwO1xyXG5cclxuY29uc3QgcHJvcFR5cGVzID0ge1xyXG4gICAgY3VzdG9tRXJyb3I6IFByb3BUeXBlcy5zdHJpbmcsXHJcbiAgICBpbnB1dFRpbWVvdXQ6IFByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcclxuICAgIGtleU5hbWU6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcclxuICAgIGtleVJlc29sdmVyOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxyXG4gICAgbGFiZWxOYW1lOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXHJcbiAgICBvbkJhZElucHV0OiBQcm9wVHlwZXMuZnVuYyxcclxuICAgIG9uQ2hhbmdlOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxyXG4gICAgcGxhY2Vob2xkZXI6IFByb3BUeXBlcy5zdHJpbmcsXHJcbiAgICBxdWVyeVNlYXJjaGVyOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxyXG4gICAgcmVuZGVyT3B0aW9uczogUHJvcFR5cGVzLmZ1bmMsXHJcbiAgICB2YWx1ZTogUHJvcFR5cGVzLnN0cmluZyxcclxuICAgIG9uU2VsZWN0Q2xlYXI6IFByb3BUeXBlcy5ib29sLFxyXG4gICAgY2xlYXJPbk51bGxWYWx1ZTogUHJvcFR5cGVzLmJvb2xcclxufTtcclxuXHJcbmNvbnN0IGRlZmF1bHRQcm9wcyA9IHtcclxuICAgIGtleU5hbWU6ICdrZXknLFxyXG4gICAgbGFiZWxOYW1lOiAnbGFiZWwnLFxyXG4gICAgaW5wdXRUaW1lb3V0OiAyMDAsXHJcbiAgICBvblNlbGVjdENsZWFyOiBmYWxzZSxcclxuICAgIGNsZWFyT25OdWxsVmFsdWU6IHRydWVcclxufTtcclxuXHJcbkBNREJlaGF2aW91cignbG9hZGVyJylcclxuQE1EQmVoYXZpb3VyKCdpbnB1dFRleHQnKVxyXG5AQ29tcG9uZW50QmFzZUJlaGF2aW91clxyXG5jbGFzcyBBdXRvY29tcGxldGUgZXh0ZW5kcyBDb21wb25lbnQge1xyXG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcclxuICAgICAgICBzdXBlcihwcm9wcyk7XHJcbiAgICAgICAgY29uc3Qgc3RhdGUgPSB7XHJcbiAgICAgICAgICAgIGZvY3VzOiBmYWxzZSxcclxuICAgICAgICAgICAgaW5wdXRWYWx1ZTogdGhpcy5wcm9wcy52YWx1ZSxcclxuICAgICAgICAgICAgb3B0aW9uczogbmV3IE1hcCgpLFxyXG4gICAgICAgICAgICBhY3RpdmU6IG51bGwsXHJcbiAgICAgICAgICAgIHNlbGVjdGVkOiB0aGlzLnByb3BzLnZhbHVlLFxyXG4gICAgICAgICAgICBmcm9tS2V5UmVzb2x2ZXI6IGZhbHNlLFxyXG4gICAgICAgICAgICBpc0xvYWRpbmc6IGZhbHNlLFxyXG4gICAgICAgICAgICBjdXN0b21FcnJvcjogdGhpcy5wcm9wcy5jdXN0b21FcnJvcixcclxuICAgICAgICAgICAgdG90YWxDb3VudDogMFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHN0YXRlO1xyXG4gICAgICAgIHRoaXMuYXV0b2NvbXBsZXRlSWQgPSB1bmlxdWVJZCgnYXV0b2NvbXBsZXRlLXRleHQtJyk7XHJcbiAgICB9XHJcblxyXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XHJcbiAgICAgICAgY29uc3Qge3ZhbHVlLCBrZXlSZXNvbHZlciwgaW5wdXRUaW1lb3V0fSA9IHRoaXMucHJvcHM7XHJcbiAgICAgICAgaWYgKHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09IG51bGwpIHsgLy8gdmFsdWUgaXMgZGVmaW5lZCwgY2FsbCB0aGUga2V5UmVzb2x2ZXIgdG8gZ2V0IHRoZSBhc3NvY2lhdGVkIGxhYmVsXHJcbiAgICAgICAgICAgIGtleVJlc29sdmVyKHZhbHVlKS50aGVuKGlucHV0VmFsdWUgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7aW5wdXRWYWx1ZSwgZnJvbUtleVJlc29sdmVyOiB0cnVlfSk7XHJcbiAgICAgICAgICAgIH0pLmNhdGNoKGVycm9yID0+IHRoaXMuc2V0U3RhdGUoe2N1c3RvbUVycm9yOiBlcnJvci5tZXNzYWdlfSkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuX2hhbmRsZURvY3VtZW50Q2xpY2spO1xyXG4gICAgICAgIHRoaXMuX2RlYm91bmNlZFF1ZXJ5U2VhcmNoZXIgPSBkZWJvdW5jZSh0aGlzLl9xdWVyeVNlYXJjaGVyLCBpbnB1dFRpbWVvdXQpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMoe3ZhbHVlLCBjdXN0b21FcnJvciwgZXJyb3J9KSB7XHJcbiAgICAgICAgY29uc3Qge2tleVJlc29sdmVyfSA9IHRoaXMucHJvcHM7XHJcbiAgICAgICAgaWYgKHZhbHVlICE9PSB0aGlzLnByb3BzLnZhbHVlICYmIHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09IG51bGwpIHsgLy8gdmFsdWUgaXMgZGVmaW5lZCwgY2FsbCB0aGUga2V5UmVzb2x2ZXIgdG8gZ2V0IHRoZSBhc3NvY2lhdGVkIGxhYmVsXHJcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2lucHV0VmFsdWU6IHZhbHVlLCBjdXN0b21FcnJvcn0sICgpID0+IGtleVJlc29sdmVyKHZhbHVlKS50aGVuKGlucHV0VmFsdWUgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7aW5wdXRWYWx1ZSwgZnJvbUtleVJlc29sdmVyOiB0cnVlfSk7XHJcbiAgICAgICAgICAgIH0pLmNhdGNoKGVycm9yID0+IHRoaXMuc2V0U3RhdGUoe2N1c3RvbUVycm9yOiBlcnJvci5tZXNzYWdlfSkpKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGN1c3RvbUVycm9yICE9PSB0aGlzLnByb3BzLmN1c3RvbUVycm9yKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2N1c3RvbUVycm9yfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoZXJyb3IpIHtcclxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7Y3VzdG9tRXJyb3I6IGVycm9yfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5wcm9wcy5jbGVhck9uTnVsbFZhbHVlICYmIHRoaXMucHJvcHMuY2xlYXJPbk51bGxWYWx1ZSA9PT0gdHJ1ZSAmJiB2YWx1ZSA9PT0gbnVsbCAmJiB0aGlzLnN0YXRlLmlucHV0VmFsdWUgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7aW5wdXRWYWx1ZTogbnVsbH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjb21wb25lbnREaWRVcGRhdGUoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuY3VzdG9tRXJyb3IpIHtcclxuICAgICAgICAgICAgdGhpcy5yZWZzLmlucHV0VGV4dC5jbGFzc0xpc3QuYWRkKCdpcy1pbnZhbGlkJyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5yZWZzLmlucHV0VGV4dC5jbGFzc0xpc3QucmVtb3ZlKCdpcy1pbnZhbGlkJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xyXG4gICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5faGFuZGxlRG9jdW1lbnRDbGljayk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0VmFsdWUoKSB7XHJcbiAgICAgICAgY29uc3Qge2xhYmVsTmFtZSwga2V5TmFtZSwgdmFsdWV9ID0gdGhpcy5wcm9wcztcclxuICAgICAgICBjb25zdCB7aW5wdXRWYWx1ZSwgc2VsZWN0ZWQsIG9wdGlvbnMsIGZyb21LZXlSZXNvbHZlcn0gPSB0aGlzLnN0YXRlO1xyXG4gICAgICAgIGNvbnN0IHJlc29sdmVkTGFiZWwgPSBvcHRpb25zLmdldChzZWxlY3RlZCk7XHJcbiAgICAgICAgaWYgKGlucHV0VmFsdWUgPT09ICcnKSB7IC8vIFRoZSB1c2VyIGNsZWFyZWQgdGhlIGZpZWxkLCByZXR1cm4gYSBudWxsXHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoZnJvbUtleVJlc29sdmVyKSB7IC8vIFZhbHVlIHdhcyByZWNlaXZlZCBmcm9tIHRoZSBrZXlSZXNvbHZlciwgZ2l2ZSBpdCBmaXJlY3RseVxyXG4gICAgICAgICAgICByZXR1cm4gdmFsdWU7XHJcbiAgICAgICAgfSBlbHNlIGlmIChyZXNvbHZlZExhYmVsICE9PSBpbnB1dFZhbHVlICYmIHNlbGVjdGVkICE9PSBpbnB1dFZhbHVlKSB7IC8vIFRoZSB1c2VyIHR5cGVkIHNvbWV0aGluZyB3aXRob3V0IHNlbGVjdGluZyBhbnkgb3B0aW9uLCByZXR1cm4gYSBudWxsXHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH0gZWxzZSB7IC8vIFRoZSB1c2VyIHNlbGVjdGVkIGFuIG9wdGlvbiAob3Igbm8gdmFsdWUgd2FzIHByb3ZpZGVkKSwgcmV0dXJuIGl0XHJcbiAgICAgICAgICAgIHJldHVybiBzZWxlY3RlZCB8fCBudWxsO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBfaGFuZGxlRG9jdW1lbnRDbGljayA9ICh7dGFyZ2V0fSkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHtmb2N1cywgaW5wdXRWYWx1ZX0gPSB0aGlzLnN0YXRlO1xyXG4gICAgICAgIGNvbnN0IHtvbkJhZElucHV0fSA9IHRoaXMucHJvcHM7XHJcbiAgICAgICAgaWYgKGZvY3VzKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGNsb3Nlc3RBQ1BhcmVudCA9IGNsb3Nlc3QodGFyZ2V0LCBgW2RhdGEtaWQ9JyR7dGhpcy5hdXRvY29tcGxldGVJZH0nXWAsIHRydWUpO1xyXG4gICAgICAgICAgICBpZiAoY2xvc2VzdEFDUGFyZW50ID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2ZvY3VzOiBmYWxzZX0sICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAob25CYWRJbnB1dCAmJiB0aGlzLmdldFZhbHVlKCkgPT09IG51bGwgJiYgaW5wdXRWYWx1ZSAhPT0gJycpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb25CYWRJbnB1dChpbnB1dFZhbHVlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgX2hhbmRsZVF1ZXJ5Q2hhbmdlID0gKHt0YXJnZXQ6IHt2YWx1ZX19KSA9PiB7XHJcbiAgICAgICAgaWYgKHZhbHVlID09PSAnJykgeyAvLyB0aGUgdXNlciBjbGVhcmVkIHRoZSBpbnB1dCwgZG9uJ3QgY2FsbCB0aGUgcXVlcnlTZWFyY2hlclxyXG4gICAgICAgICAgICBjb25zdCB7b25DaGFuZ2V9ID0gdGhpcy5wcm9wcztcclxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7aW5wdXRWYWx1ZTogdmFsdWUsIGZyb21LZXlSZXNvbHZlcjogZmFsc2V9KTtcclxuICAgICAgICAgICAgaWYgKG9uQ2hhbmdlKSBvbkNoYW5nZShudWxsKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtpbnB1dFZhbHVlOiB2YWx1ZSwgZnJvbUtleVJlc29sdmVyOiBmYWxzZSwgaXNMb2FkaW5nOiB0cnVlfSk7XHJcbiAgICAgICAgICAgIHRoaXMuX2RlYm91bmNlZFF1ZXJ5U2VhcmNoZXIodmFsdWUpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgX3F1ZXJ5U2VhcmNoZXIgPSB2YWx1ZSA9PiB7XHJcbiAgICAgICAgY29uc3Qge3F1ZXJ5U2VhcmNoZXIsIGtleU5hbWUsIGxhYmVsTmFtZX0gPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIHF1ZXJ5U2VhcmNoZXIodmFsdWUpLnRoZW4oKHtkYXRhLCB0b3RhbENvdW50fSkgPT4ge1xyXG4gICAgICAgICAgICAvLyBUT0RPIGhhbmRsZSB0aGUgaW5jb21wbGV0ZSBvcHRpb24gbGlzdCBjYXNlXHJcbiAgICAgICAgICAgIGNvbnN0IG9wdGlvbnMgPSBuZXcgTWFwKCk7XHJcbiAgICAgICAgICAgIGRhdGEuZm9yRWFjaChpdGVtID0+IHtcclxuICAgICAgICAgICAgICAgIG9wdGlvbnMuc2V0KGl0ZW1ba2V5TmFtZV0sIGl0ZW1bbGFiZWxOYW1lXSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtvcHRpb25zLCBpc0xvYWRpbmc6IGZhbHNlLCB0b3RhbENvdW50fSk7XHJcbiAgICAgICAgfSkuY2F0Y2goZXJyb3IgPT4gdGhpcy5zZXRTdGF0ZSh7Y3VzdG9tRXJyb3I6IGVycm9yLm1lc3NhZ2V9KSk7XHJcbiAgICB9O1xyXG5cclxuICAgIF9oYW5kbGVRdWVyeUZvY3VzID0gKCkgPT4ge1xyXG4gICAgICAgIHRoaXMucmVmcy5vcHRpb25zLnNjcm9sbFRvcCA9IDA7XHJcbiAgICAgICAgaWYgKHRoaXMucHJvcHMub25Gb2N1cykge1xyXG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uRm9jdXMuY2FsbCh0aGlzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7YWN0aXZlOiAnJywgZm9jdXM6IHRydWV9KTtcclxuICAgIH07XHJcblxyXG4gICAgX2hhbmRsZVF1ZXJ5S2V5RG93biA9IChldmVudCkgPT4ge1xyXG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgIGNvbnN0IHt3aGljaH0gPSBldmVudDtcclxuICAgICAgICBjb25zdCB7YWN0aXZlLCBvcHRpb25zfSA9IHRoaXMuc3RhdGU7XHJcbiAgICAgICAgaWYgKHdoaWNoID09PSBFTlRFUl9LRVlfQ09ERSAmJiBhY3RpdmUpIHRoaXMuX3NlbGVjdChhY3RpdmUpO1xyXG4gICAgICAgIGlmICh3aGljaCA9PT0gVEFCX0tFWV9DT0RFKSB0aGlzLnNldFN0YXRlKHtmb2N1czogZmFsc2V9LCAoKSA9PiB0aGlzLnJlZnMuaHRtbElucHV0LmJsdXIoKSk7XHJcbiAgICAgICAgaWYgKFtET1dOX0FSUk9XX0tFWV9DT0RFLCBVUF9BUlJPV19LRVlfQ09ERV0uaW5kZXhPZih3aGljaCkgIT09IC0xKSB7IC8vIHRoZSB1c2VyIHByZXNzZWQgb24gYW4gYXJyb3cga2V5LCBjaGFuZ2UgdGhlIGFjdGl2ZSBrZXlcclxuICAgICAgICAgICAgY29uc3Qgb3B0aW9uS2V5cyA9IFtdO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBrZXkgb2Ygb3B0aW9ucy5rZXlzKCkpIHtcclxuICAgICAgICAgICAgICAgIG9wdGlvbktleXMucHVzaChrZXkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRJbmRleCA9IG9wdGlvbktleXMuaW5kZXhPZihhY3RpdmUpO1xyXG4gICAgICAgICAgICBsZXQgbmV3SW5kZXggPSBjdXJyZW50SW5kZXggKyAod2hpY2ggPT09IERPV05fQVJST1dfS0VZX0NPREUgPyAxIDogLTEpO1xyXG4gICAgICAgICAgICBpZiAobmV3SW5kZXggPj0gb3B0aW9ucy5zaXplKSB7XHJcbiAgICAgICAgICAgICAgICBuZXdJbmRleCAtPSBvcHRpb25zLnNpemVcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAobmV3SW5kZXggPCAwKSB7XHJcbiAgICAgICAgICAgICAgICBuZXdJbmRleCArPSBvcHRpb25zLnNpemU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7YWN0aXZlOiBvcHRpb25LZXlzW25ld0luZGV4XX0pO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgX2hhbmRsZVN1Z2dlc3Rpb25Ib3ZlciA9IGtleSA9PiB7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7YWN0aXZlOiBrZXl9KTtcclxuICAgIH07XHJcblxyXG4gICAgX3NlbGVjdChrZXkpIHtcclxuICAgICAgICBjb25zdCB7b3B0aW9uc30gPSB0aGlzLnN0YXRlO1xyXG4gICAgICAgIGNvbnN0IHtvbkNoYW5nZX0gPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIGNvbnN0IHJlc29sdmVkTGFiZWwgPSBvcHRpb25zLmdldChrZXkpIHx8ICcnO1xyXG4gICAgICAgIHRoaXMucmVmcy5odG1sSW5wdXQuYmx1cigpO1xyXG4gICAgICAgIGxldCBuZXdTdGF0ZSA9IHtpbnB1dFZhbHVlOiB0aGlzLmkxOG4ocmVzb2x2ZWRMYWJlbCksIHNlbGVjdGVkOiBrZXksIGZvY3VzOiBmYWxzZX07XHJcbiAgICAgICAgaWYgKHRoaXMucHJvcHMub25TZWxlY3RDbGVhciAmJiB0aGlzLnByb3BzLm9uU2VsZWN0Q2xlYXIgPT09IHRydWUpIHtcclxuICAgICAgICAgICAgbmV3U3RhdGUgPSB7aW5wdXRWYWx1ZTogbnVsbCwgc2VsZWN0ZWQ6IG51bGwsIGZvY3VzOiBmYWxzZX07XHJcbiAgICAgICAgfSBcclxuICAgICAgICB0aGlzLnNldFN0YXRlKG5ld1N0YXRlLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChvbkNoYW5nZSkge1xyXG4gICAgICAgICAgICAgICAgb25DaGFuZ2Uoa2V5KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIF9yZW5kZXJPcHRpb25zID0gKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHthY3RpdmUsIG9wdGlvbnMsIGZvY3VzfSA9IHRoaXMuc3RhdGU7XHJcbiAgICAgICAgY29uc3QgcmVuZGVyZWRPcHRpb25zID0gW107XHJcbiAgICAgICAgZm9yIChsZXQgW2tleSwgdmFsdWVdIG9mIG9wdGlvbnMpIHtcclxuICAgICAgICAgICAgY29uc3QgaXNBY3RpdmUgPSBhY3RpdmUgPT09IGtleTtcclxuICAgICAgICAgICAgcmVuZGVyZWRPcHRpb25zLnB1c2goXHJcbiAgICAgICAgICAgICAgICA8bGlcclxuICAgICAgICAgICAgICAgICAgICBkYXRhLWFjdGl2ZT17aXNBY3RpdmV9XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YS1mb2N1cz0nb3B0aW9uJ1xyXG4gICAgICAgICAgICAgICAgICAgIGtleT17a2V5fVxyXG4gICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuX3NlbGVjdC5iaW5kKHRoaXMsIGtleSl9XHJcbiAgICAgICAgICAgICAgICAgICAgb25Nb3VzZU92ZXI9e3RoaXMuX2hhbmRsZVN1Z2dlc3Rpb25Ib3Zlci5iaW5kKHRoaXMsIGtleSl9XHJcbiAgICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICAgICAge3RoaXMuaTE4bih2YWx1ZSl9XHJcbiAgICAgICAgICAgICAgICA8L2xpPlxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8dWwgZGF0YS1mb2N1cz0nb3B0aW9ucycgcmVmPSdvcHRpb25zJyBkYXRhLWZvY3Vzc2VkPXtmb2N1c30+XHJcbiAgICAgICAgICAgICAgICB7cmVuZGVyZWRPcHRpb25zfVxyXG4gICAgICAgICAgICA8L3VsPlxyXG4gICAgICAgICk7XHJcbiAgICB9O1xyXG5cclxuICAgIHJlbmRlciAoKSB7XHJcbiAgICAgICAgY29uc3Qge2lucHV0VmFsdWUsIGlzTG9hZGluZ30gPSB0aGlzLnN0YXRlO1xyXG4gICAgICAgIGNvbnN0IHtjdXN0b21FcnJvciwgcmVuZGVyT3B0aW9uc30gPSB0aGlzLnByb3BzO1xyXG5cclxuICAgICAgICBjb25zdCB2YWxpZElucHV0UHJvcHMgPSBmaWx0ZXJQcm9wcyh0aGlzLnByb3BzKTtcclxuXHJcbiAgICAgICAgY29uc3QgeyBwbGFjZWhvbGRlciB9ID0gdmFsaWRJbnB1dFByb3BzO1xyXG5cclxuICAgICAgICB2YWxpZElucHV0UHJvcHMudmFsdWUgPSBpbnB1dFZhbHVlO1xyXG4gICAgICAgIHZhbGlkSW5wdXRQcm9wcy5vbkZvY3VzID0gdGhpcy5faGFuZGxlUXVlcnlGb2N1cztcclxuICAgICAgICB2YWxpZElucHV0UHJvcHMub25LZXlEb3duID0gdGhpcy5faGFuZGxlUXVlcnlLZXlEb3duO1xyXG4gICAgICAgIHZhbGlkSW5wdXRQcm9wcy5vbkNoYW5nZSA9IHRoaXMuX2hhbmRsZVF1ZXJ5Q2hhbmdlO1xyXG5cclxuICAgICAgICBjb25zdCBpbnB1dFByb3BzID0gey4uLnZhbGlkSW5wdXRQcm9wc307XHJcblxyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXYgZGF0YS1mb2N1cz0nYXV0b2NvbXBsZXRlJyBkYXRhLWlkPXt0aGlzLmF1dG9jb21wbGV0ZUlkfT5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtgbWRsLXRleHRmaWVsZCBtZGwtanMtdGV4dGZpZWxkJHtjdXN0b21FcnJvciA/ICcgaXMtaW52YWxpZCcgOiAnJ31gfSBkYXRhLWZvY3VzPSdpbnB1dC10ZXh0JyByZWY9J2lucHV0VGV4dCc+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBkYXRhLWZvY3VzPSdsb2FkaW5nJyBkYXRhLWxvYWRpbmc9e2lzTG9hZGluZ30gY2xhc3NOYW1lPSdtZGwtcHJvZ3Jlc3MgbWRsLWpzLXByb2dyZXNzIG1kbC1wcm9ncmVzc19faW5kZXRlcm1pbmF0ZScgcmVmPSdsb2FkZXInIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgPGlucHV0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT0nbWRsLXRleHRmaWVsZF9faW5wdXQnXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsuLi5pbnB1dFByb3BzfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZWY9J2h0bWxJbnB1dCdcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT0ndGV4dCdcclxuICAgICAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9J21kbC10ZXh0ZmllbGRfX2xhYmVsJz57dGhpcy5pMThuKHBsYWNlaG9sZGVyKX08L2xhYmVsPlxyXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT0nbWRsLXRleHRmaWVsZF9fZXJyb3InPnt0aGlzLmkxOG4oY3VzdG9tRXJyb3IpfTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAge3JlbmRlck9wdGlvbnMgPyByZW5kZXJPcHRpb25zLmNhbGwodGhpcykgOiB0aGlzLl9yZW5kZXJPcHRpb25zKCl9XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbn1cclxuXHJcbkF1dG9jb21wbGV0ZS5kaXNwbGF5TmFtZSA9ICdBdXRvY29tcGxldGUnO1xyXG5BdXRvY29tcGxldGUuZGVmYXVsdFByb3BzID0gZGVmYXVsdFByb3BzO1xyXG5BdXRvY29tcGxldGUucHJvcFR5cGVzID0gcHJvcFR5cGVzO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgQXV0b2NvbXBsZXRlO1xyXG4iXX0=