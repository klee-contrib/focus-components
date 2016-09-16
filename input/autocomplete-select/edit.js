'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _dec, _class;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _material = require('../../behaviours/material');

var _material2 = _interopRequireDefault(_material);

var _i18next = require('i18next');

var _i18next2 = _interopRequireDefault(_i18next);

var _closest = require('closest');

var _closest2 = _interopRequireDefault(_closest);

var _debounce = require('lodash/debounce');

var _debounce2 = _interopRequireDefault(_debounce);

var _uniqueId = require('lodash/uniqueId');

var _uniqueId2 = _interopRequireDefault(_uniqueId);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

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

var Autocomplete = (_dec = (0, _material2.default)('loader', 'inputText'), _dec(_class = function (_Component) {
    _inherits(Autocomplete, _Component);

    function Autocomplete(props) {
        _classCallCheck(this, Autocomplete);

        var _this = _possibleConstructorReturn(this, _Component.call(this, props));

        _this._handleDocumentClick = function (_ref) {
            var target = _ref.target;
            var _this$state = _this.state;
            var focus = _this$state.focus;
            var inputValue = _this$state.inputValue;
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
            var _this$props = _this.props;
            var querySearcher = _this$props.querySearcher;
            var keyName = _this$props.keyName;
            var labelName = _this$props.labelName;

            querySearcher(value).then(function (_ref3) {
                var data = _ref3.data;
                var totalCount = _ref3.totalCount;

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
            var _this$state2 = _this.state;
            var active = _this$state2.active;
            var options = _this$state2.options;

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
            var _this$state3 = _this.state;
            var active = _this$state3.active;
            var options = _this$state3.options;
            var focus = _this$state3.focus;

            var renderedOptions = [];
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = options[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var _step2$value = _slicedToArray(_step2.value, 2);

                    var key = _step2$value[0];
                    var value = _step2$value[1];

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
                        _i18next2.default.t(value)
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

        var _props = this.props;
        var value = _props.value;
        var keyResolver = _props.keyResolver;
        var inputTimeout = _props.inputTimeout;

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

        var value = _ref4.value;
        var customError = _ref4.customError;
        var error = _ref4.error;
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
        var _props2 = this.props;
        var labelName = _props2.labelName;
        var keyName = _props2.keyName;
        var value = _props2.value;
        var _state = this.state;
        var inputValue = _state.inputValue;
        var selected = _state.selected;
        var options = _state.options;
        var fromKeyResolver = _state.fromKeyResolver;

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
        var _props3 = this.props;
        var onChange = _props3.onChange;
        var keyName = _props3.keyName;
        var labelName = _props3.labelName;

        var resolvedLabel = options.get(key) || '';
        this.refs.htmlInput.blur();
        this.setState({ inputValue: _i18next2.default.t(resolvedLabel), selected: key, focus: false }, function () {
            if (onChange) onChange(key);
        });
    };

    Autocomplete.prototype.render = function render() {
        var _props4 = this.props;
        var customError = _props4.customError;
        var inputTimeout = _props4.inputTimeout;
        var keyName = _props4.keyName;
        var keyResolver = _props4.keyResolver;
        var labelName = _props4.labelName;
        var placeholder = _props4.placeholder;
        var querySearcher = _props4.querySearcher;
        var renderOptions = _props4.renderOptions;

        var inputProps = _objectWithoutProperties(_props4, ['customError', 'inputTimeout', 'keyName', 'keyResolver', 'labelName', 'placeholder', 'querySearcher', 'renderOptions']);

        var _state2 = this.state;
        var inputValue = _state2.inputValue;
        var isLoading = _state2.isLoading;
        var _handleQueryFocus = this._handleQueryFocus;
        var _handleQueryKeyDown = this._handleQueryKeyDown;
        var _handleQueryChange = this._handleQueryChange;

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
                    onChange: _handleQueryChange,
                    onFocus: _handleQueryFocus,
                    onKeyDown: _handleQueryKeyDown,
                    ref: 'htmlInput',
                    type: 'text',
                    value: inputValue
                })),
                _react2.default.createElement(
                    'label',
                    { className: 'mdl-textfield__label' },
                    _i18next2.default.t(placeholder)
                ),
                _react2.default.createElement(
                    'span',
                    { className: 'mdl-textfield__error' },
                    _i18next2.default.t(customError)
                )
            ),
            renderOptions ? renderOptions.call(this) : this._renderOptions()
        );
    };

    return Autocomplete;
}(_react.Component)) || _class);


Autocomplete.displayName = 'Autocomplete';
Autocomplete.defaultProps = defaultProps;
Autocomplete.propTypes = propTypes;

exports.default = Autocomplete;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZyLUZSLmpzIl0sIm5hbWVzIjpbIkVOVEVSX0tFWV9DT0RFIiwiVEFCX0tFWV9DT0RFIiwiVVBfQVJST1dfS0VZX0NPREUiLCJET1dOX0FSUk9XX0tFWV9DT0RFIiwicHJvcFR5cGVzIiwiY3VzdG9tRXJyb3IiLCJzdHJpbmciLCJpbnB1dFRpbWVvdXQiLCJudW1iZXIiLCJpc1JlcXVpcmVkIiwia2V5TmFtZSIsImtleVJlc29sdmVyIiwiZnVuYyIsImxhYmVsTmFtZSIsIm9uQmFkSW5wdXQiLCJvbkNoYW5nZSIsInBsYWNlaG9sZGVyIiwicXVlcnlTZWFyY2hlciIsInJlbmRlck9wdGlvbnMiLCJ2YWx1ZSIsImRlZmF1bHRQcm9wcyIsIkF1dG9jb21wbGV0ZSIsInByb3BzIiwiX2hhbmRsZURvY3VtZW50Q2xpY2siLCJ0YXJnZXQiLCJzdGF0ZSIsImZvY3VzIiwiaW5wdXRWYWx1ZSIsImNsb3Nlc3RBQ1BhcmVudCIsImF1dG9jb21wbGV0ZUlkIiwidW5kZWZpbmVkIiwic2V0U3RhdGUiLCJnZXRWYWx1ZSIsIl9oYW5kbGVRdWVyeUNoYW5nZSIsImZyb21LZXlSZXNvbHZlciIsImlzTG9hZGluZyIsIl9kZWJvdW5jZWRRdWVyeVNlYXJjaGVyIiwiX3F1ZXJ5U2VhcmNoZXIiLCJ0aGVuIiwiZGF0YSIsInRvdGFsQ291bnQiLCJvcHRpb25zIiwiTWFwIiwiZm9yRWFjaCIsInNldCIsIml0ZW0iLCJjYXRjaCIsImVycm9yIiwibWVzc2FnZSIsIl9oYW5kbGVRdWVyeUZvY3VzIiwicmVmcyIsInNjcm9sbFRvcCIsIm9uRm9jdXMiLCJjYWxsIiwiYWN0aXZlIiwiX2hhbmRsZVF1ZXJ5S2V5RG93biIsImV2ZW50Iiwic3RvcFByb3BhZ2F0aW9uIiwid2hpY2giLCJfc2VsZWN0IiwiaHRtbElucHV0IiwiYmx1ciIsImluZGV4T2YiLCJvcHRpb25LZXlzIiwia2V5cyIsImtleSIsInB1c2giLCJjdXJyZW50SW5kZXgiLCJuZXdJbmRleCIsInNpemUiLCJfaGFuZGxlU3VnZ2VzdGlvbkhvdmVyIiwiX3JlbmRlck9wdGlvbnMiLCJyZW5kZXJlZE9wdGlvbnMiLCJpc0FjdGl2ZSIsImJpbmQiLCJ0Iiwic2VsZWN0ZWQiLCJjb21wb25lbnREaWRNb3VudCIsImRvY3VtZW50IiwiYWRkRXZlbnRMaXN0ZW5lciIsImNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMiLCJjb21wb25lbnREaWRVcGRhdGUiLCJpbnB1dFRleHQiLCJjbGFzc0xpc3QiLCJhZGQiLCJyZW1vdmUiLCJjb21wb25lbnRXaWxsVW5tb3VudCIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJyZXNvbHZlZExhYmVsIiwiZ2V0IiwicmVuZGVyIiwiaW5wdXRQcm9wcyIsImRpc3BsYXlOYW1lIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUVBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQUVBLElBQU1BLGlCQUFpQixFQUF2QjtBQUNBLElBQU1DLGVBQWUsRUFBckI7QUFDQSxJQUFNQyxvQkFBb0IsRUFBMUI7QUFDQSxJQUFNQyxzQkFBc0IsRUFBNUI7O0FBRUEsSUFBTUMsWUFBWTtBQUNkQyxpQkFBYSxpQkFBVUMsTUFEVDtBQUVkQyxrQkFBYyxpQkFBVUMsTUFBVixDQUFpQkMsVUFGakI7QUFHZEMsYUFBUyxpQkFBVUosTUFBVixDQUFpQkcsVUFIWjtBQUlkRSxpQkFBYSxpQkFBVUMsSUFBVixDQUFlSCxVQUpkO0FBS2RJLGVBQVcsaUJBQVVQLE1BQVYsQ0FBaUJHLFVBTGQ7QUFNZEssZ0JBQVksaUJBQVVGLElBTlI7QUFPZEcsY0FBVSxpQkFBVUgsSUFBVixDQUFlSCxVQVBYO0FBUWRPLGlCQUFhLGlCQUFVVixNQVJUO0FBU2RXLG1CQUFlLGlCQUFVTCxJQUFWLENBQWVILFVBVGhCO0FBVWRTLG1CQUFlLGlCQUFVTixJQVZYO0FBV2RPLFdBQU8saUJBQVViO0FBWEgsQ0FBbEI7O0FBY0EsSUFBTWMsZUFBZTtBQUNqQlYsYUFBUyxLQURR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QUh6QyxHQUcrRCxJQUgvRCxDQUd5Q0Esa0JBSHpDOztBQUlOLGVBQ0k7QUFBQTtBQUFBLGNBQUssY0FBVyxjQUFoQixFQUErQixXQUFTLEtBQUtKLGNBQTdDO0FBQ0k7QUFBQTtBQUFBLGtCQUFLLCtDQUE0Q3hCLGNBQWMsYUFBZCxHQUE4QixFQUExRSxDQUFMLEVBQXFGLGNBQVcsWUFBaEcsRUFBNkcsS0FBSSxXQUFqSDtBQUNJLHVEQUFLLGNBQVcsU0FBaEIsRUFBMEIsZ0JBQWM4QixTQUF4QyxFQUFtRCxXQUFVLDBEQUE3RCxFQUF3SCxLQUFJLFFBQTVILEdBREo7QUFFSTtBQUNJLCtCQUFVO0FBRGQsbUJBRVF3RCxVQUZSO0FBR0ksOEJBQVUxRCxrQkFIZDtBQUlJLDZCQUFTZ0IsaUJBSmI7QUFLSSwrQkFBV00sbUJBTGY7QUFNSSx5QkFBSSxXQU5SO0FBT0ksMEJBQUssTUFQVDtBQVFJLDJCQUFPNUI7QUFSWCxtQkFGSjtBQVlJO0FBQUE7QUFBQSxzQkFBTyxXQUFVLHNCQUFqQjtBQUF5QyxzQ0FBUWdELENBQVIsQ0FBVTNELFdBQVY7QUFBekMsaUJBWko7QUFhSTtBQUFBO0FBQUEsc0JBQU0sV0FBVSxzQkFBaEI7QUFBd0Msc0NBQVEyRCxDQUFSLENBQVV0RSxXQUFWO0FBQXhDO0FBYkosYUFESjtBQWdCS2EsNEJBQWdCQSxjQUFjbUMsSUFBZCxDQUFtQixJQUFuQixDQUFoQixHQUEyQyxLQUFLa0IsY0FBTDtBQWhCaEQsU0FESjtBQW9CSCxLOztXQXpNQ2xELFk7Ozs7QUE0TU5BLGFBQWF1RSxXQUFiLEdBQTJCLGNBQTNCO0FBQ0F2RSxhQUFhRCxZQUFiLEdBQTRCQSxZQUE1QjtBQUNBQyxhQUFhakIsU0FBYixHQUF5QkEsU0FBekI7O2tCQUVlaUIsWSIsImZpbGUiOiJmci1GUi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgUHJvcFR5cGVzfSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBSZWFjdERPTSBmcm9tICdyZWFjdC1kb20nO1xyXG5pbXBvcnQgTURCZWhhdmlvdXIgZnJvbSAnLi4vLi4vYmVoYXZpb3Vycy9tYXRlcmlhbCc7XHJcbmltcG9ydCBpMThuZXh0IGZyb20gJ2kxOG5leHQnO1xyXG5cclxuaW1wb3J0IGNsb3Nlc3QgZnJvbSAnY2xvc2VzdCc7XHJcbmltcG9ydCBkZWJvdW5jZSBmcm9tICdsb2Rhc2gvZGVib3VuY2UnO1xyXG5pbXBvcnQgdW5pcXVlSWQgZnJvbSAnbG9kYXNoL3VuaXF1ZUlkJztcclxuXHJcbmNvbnN0IEVOVEVSX0tFWV9DT0RFID0gMTM7XHJcbmNvbnN0IFRBQl9LRVlfQ09ERSA9IDI3O1xyXG5jb25zdCBVUF9BUlJPV19LRVlfQ09ERSA9IDM4O1xyXG5jb25zdCBET1dOX0FSUk9XX0tFWV9DT0RFID0gNDA7XHJcblxyXG5jb25zdCBwcm9wVHlwZXMgPSB7XHJcbiAgICBjdXN0b21FcnJvcjogUHJvcFR5cGVzLnN0cmluZyxcclxuICAgIGlucHV0VGltZW91dDogUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxyXG4gICAga2V5TmFtZTogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxyXG4gICAga2V5UmVzb2x2ZXI6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXHJcbiAgICBsYWJlbE5hbWU6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcclxuICAgIG9uQmFkSW5wdXQ6IFByb3BUeXBlcy5mdW5jLFxyXG4gICAgb25DaGFuZ2U6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXHJcbiAgICBwbGFjZWhvbGRlcjogUHJvcFR5cGVzLnN0cmluZyxcclxuICAgIHF1ZXJ5U2VhcmNoZXI6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXHJcbiAgICByZW5kZXJPcHRpb25zOiBQcm9wVHlwZXMuZnVuYyxcclxuICAgIHZhbHVlOiBQcm9wVHlwZXMuc3RyaW5nXHJcbn07XHJcblxyXG5jb25zdCBkZWZhdWx0UHJvcHMgPSB7XHJcbiAgICBrZXlOYW1lOiAna2V5JyxcclxuICAgIGxhYmVsTmFtZTogJ2xhYmVsJyxcclxuICAgIGlucHV0VGltZW91dDogMjAwXHJcbn07XHJcblxyXG5ATURCZWhhdmlvdXIoJ2xvYWRlcicsICdpbnB1dFRleHQnKVxyXG5jbGFzcyBBdXRvY29tcGxldGUgZXh0ZW5kcyBDb21wb25lbnQge1xyXG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcclxuICAgICAgICBzdXBlcihwcm9wcyk7XHJcbiAgICAgICAgY29uc3Qgc3RhdGUgPSB7XHJcbiAgICAgICAgICAgIGZvY3VzOiBmYWxzZSxcclxuICAgICAgICAgICAgaW5wdXRWYWx1ZTogdGhpcy5wcm9wcy52YWx1ZSxcclxuICAgICAgICAgICAgb3B0aW9uczogbmV3IE1hcCgpLFxyXG4gICAgICAgICAgICBhY3RpdmU6IG51bGwsXHJcbiAgICAgICAgICAgIHNlbGVjdGVkOiB0aGlzLnByb3BzLnZhbHVlLFxyXG4gICAgICAgICAgICBmcm9tS2V5UmVzb2x2ZXI6IGZhbHNlLFxyXG4gICAgICAgICAgICBpc0xvYWRpbmc6IGZhbHNlLFxyXG4gICAgICAgICAgICBjdXN0b21FcnJvcjogdGhpcy5wcm9wcy5jdXN0b21FcnJvcixcclxuICAgICAgICAgICAgdG90YWxDb3VudDogMFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHN0YXRlO1xyXG4gICAgICAgIHRoaXMuYXV0b2NvbXBsZXRlSWQgPSB1bmlxdWVJZCgnYXV0b2NvbXBsZXRlLXRleHQtJyk7XHJcbiAgICB9O1xyXG5cclxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xyXG4gICAgICAgIGNvbnN0IHt2YWx1ZSwga2V5UmVzb2x2ZXIsIGlucHV0VGltZW91dH0gPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIGlmICh2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSBudWxsKSB7IC8vIHZhbHVlIGlzIGRlZmluZWQsIGNhbGwgdGhlIGtleVJlc29sdmVyIHRvIGdldCB0aGUgYXNzb2NpYXRlZCBsYWJlbFxyXG4gICAgICAgICAgICBrZXlSZXNvbHZlcih2YWx1ZSkudGhlbihpbnB1dFZhbHVlID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2lucHV0VmFsdWUsIGZyb21LZXlSZXNvbHZlcjogdHJ1ZX0pO1xyXG4gICAgICAgICAgICB9KS5jYXRjaChlcnJvciA9PiB0aGlzLnNldFN0YXRlKHtjdXN0b21FcnJvcjogZXJyb3IubWVzc2FnZX0pKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLl9oYW5kbGVEb2N1bWVudENsaWNrKTtcclxuICAgICAgICB0aGlzLl9kZWJvdW5jZWRRdWVyeVNlYXJjaGVyID0gZGVib3VuY2UodGhpcy5fcXVlcnlTZWFyY2hlciwgaW5wdXRUaW1lb3V0KTtcclxuICAgIH07XHJcblxyXG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyh7dmFsdWUsIGN1c3RvbUVycm9yLCBlcnJvcn0pIHtcclxuICAgICAgICBjb25zdCB7a2V5UmVzb2x2ZXJ9ID0gdGhpcy5wcm9wcztcclxuICAgICAgICBpZiAodmFsdWUgIT09IHRoaXMucHJvcHMudmFsdWUgJiYgdmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gbnVsbCkgeyAvLyB2YWx1ZSBpcyBkZWZpbmVkLCBjYWxsIHRoZSBrZXlSZXNvbHZlciB0byBnZXQgdGhlIGFzc29jaWF0ZWQgbGFiZWxcclxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7aW5wdXRWYWx1ZTogdmFsdWUsIGN1c3RvbUVycm9yfSwgKCkgPT4ga2V5UmVzb2x2ZXIodmFsdWUpLnRoZW4oaW5wdXRWYWx1ZSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtpbnB1dFZhbHVlLCBmcm9tS2V5UmVzb2x2ZXI6IHRydWV9KTtcclxuICAgICAgICAgICAgfSkuY2F0Y2goZXJyb3IgPT4gdGhpcy5zZXRTdGF0ZSh7Y3VzdG9tRXJyb3I6IGVycm9yLm1lc3NhZ2V9KSkpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoY3VzdG9tRXJyb3IgIT09IHRoaXMucHJvcHMuY3VzdG9tRXJyb3IpIHtcclxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7Y3VzdG9tRXJyb3J9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoZXJyb3IpIHtcclxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7Y3VzdG9tRXJyb3I6IGVycm9yfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBjb21wb25lbnREaWRVcGRhdGUoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuY3VzdG9tRXJyb3IpIHtcclxuICAgICAgICAgICAgdGhpcy5yZWZzLmlucHV0VGV4dC5jbGFzc0xpc3QuYWRkKCdpcy1pbnZhbGlkJyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5yZWZzLmlucHV0VGV4dC5jbGFzc0xpc3QucmVtb3ZlKCdpcy1pbnZhbGlkJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcclxuICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuX2hhbmRsZURvY3VtZW50Q2xpY2spO1xyXG4gICAgfTtcclxuXHJcbiAgICBnZXRWYWx1ZSgpIHtcclxuICAgICAgICBjb25zdCB7bGFiZWxOYW1lLCBrZXlOYW1lLCB2YWx1ZX0gPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIGNvbnN0IHtpbnB1dFZhbHVlLCBzZWxlY3RlZCwgb3B0aW9ucywgZnJvbUtleVJlc29sdmVyfSA9IHRoaXMuc3RhdGU7XHJcbiAgICAgICAgY29uc3QgcmVzb2x2ZWRMYWJlbCA9IG9wdGlvbnMuZ2V0KHNlbGVjdGVkKTtcclxuICAgICAgICBpZiAoaW5wdXRWYWx1ZSA9PT0gJycpIHsgLy8gVGhlIHVzZXIgY2xlYXJlZCB0aGUgZmllbGQsIHJldHVybiBhIG51bGxcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfSBlbHNlIGlmIChmcm9tS2V5UmVzb2x2ZXIpIHsgLy8gVmFsdWUgd2FzIHJlY2VpdmVkIGZyb20gdGhlIGtleVJlc29sdmVyLCBnaXZlIGl0IGZpcmVjdGx5XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgICAgICB9IGVsc2UgaWYgKHJlc29sdmVkTGFiZWwgIT09IGlucHV0VmFsdWUgJiYgc2VsZWN0ZWQgIT09IGlucHV0VmFsdWUpIHsgLy8gVGhlIHVzZXIgdHlwZWQgc29tZXRoaW5nIHdpdGhvdXQgc2VsZWN0aW5nIGFueSBvcHRpb24sIHJldHVybiBhIG51bGxcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfSBlbHNlIHsgLy8gVGhlIHVzZXIgc2VsZWN0ZWQgYW4gb3B0aW9uIChvciBubyB2YWx1ZSB3YXMgcHJvdmlkZWQpLCByZXR1cm4gaXRcclxuICAgICAgICAgICAgcmV0dXJuIHNlbGVjdGVkIHx8IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBfaGFuZGxlRG9jdW1lbnRDbGljayA9ICh7dGFyZ2V0fSkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHtmb2N1cywgaW5wdXRWYWx1ZX0gPSB0aGlzLnN0YXRlO1xyXG4gICAgICAgIGNvbnN0IHtvbkJhZElucHV0fSA9IHRoaXMucHJvcHM7XHJcbiAgICAgICAgaWYgKGZvY3VzKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGNsb3Nlc3RBQ1BhcmVudCA9IGNsb3Nlc3QodGFyZ2V0LCBgW2RhdGEtaWQ9JyR7dGhpcy5hdXRvY29tcGxldGVJZH0nXWAsIHRydWUpO1xyXG4gICAgICAgICAgICBpZihjbG9zZXN0QUNQYXJlbnQgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7Zm9jdXM6IGZhbHNlfSwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvbkJhZElucHV0ICYmIHRoaXMuZ2V0VmFsdWUoKSA9PT0gbnVsbCAmJiBpbnB1dFZhbHVlICE9PSAnJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkJhZElucHV0KGlucHV0VmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBfaGFuZGxlUXVlcnlDaGFuZ2UgPSAoe3RhcmdldDoge3ZhbHVlfX0pID0+IHtcclxuICAgICAgICBpZiAodmFsdWUgPT09ICcnKSB7IC8vIHRoZSB1c2VyIGNsZWFyZWQgdGhlIGlucHV0LCBkb24ndCBjYWxsIHRoZSBxdWVyeVNlYXJjaGVyXHJcbiAgICAgICAgICAgIGNvbnN0IHtvbkNoYW5nZX0gPSB0aGlzLnByb3BzO1xyXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtpbnB1dFZhbHVlOiB2YWx1ZSwgZnJvbUtleVJlc29sdmVyOiBmYWxzZX0pO1xyXG4gICAgICAgICAgICBpZiAob25DaGFuZ2UpIG9uQ2hhbmdlKG51bGwpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2lucHV0VmFsdWU6IHZhbHVlLCBmcm9tS2V5UmVzb2x2ZXI6IGZhbHNlLCBpc0xvYWRpbmc6IHRydWV9KTtcclxuICAgICAgICAgICAgdGhpcy5fZGVib3VuY2VkUXVlcnlTZWFyY2hlcih2YWx1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBfcXVlcnlTZWFyY2hlciA9IHZhbHVlID0+IHtcclxuICAgICAgICBjb25zdCB7cXVlcnlTZWFyY2hlciwga2V5TmFtZSwgbGFiZWxOYW1lfSA9IHRoaXMucHJvcHM7XHJcbiAgICAgICAgcXVlcnlTZWFyY2hlcih2YWx1ZSkudGhlbigoe2RhdGEsIHRvdGFsQ291bnR9KSA9PiB7XHJcbiAgICAgICAgICAgIC8vIFRPRE8gaGFuZGxlIHRoZSBpbmNvbXBsZXRlIG9wdGlvbiBsaXN0IGNhc2VcclxuICAgICAgICAgICAgY29uc3Qgb3B0aW9ucyA9IG5ldyBNYXAoKTtcclxuICAgICAgICAgICAgZGF0YS5mb3JFYWNoKGl0ZW0gPT4ge1xyXG4gICAgICAgICAgICAgICAgb3B0aW9ucy5zZXQoaXRlbVtrZXlOYW1lXSwgaXRlbVtsYWJlbE5hbWVdKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe29wdGlvbnMsIGlzTG9hZGluZzogZmFsc2UsIHRvdGFsQ291bnR9KTtcclxuICAgICAgICB9KS5jYXRjaChlcnJvciA9PiB0aGlzLnNldFN0YXRlKHtjdXN0b21FcnJvcjogZXJyb3IubWVzc2FnZX0pKTtcclxuICAgIH07XHJcblxyXG4gICAgX2hhbmRsZVF1ZXJ5Rm9jdXMgPSAoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5yZWZzLm9wdGlvbnMuc2Nyb2xsVG9wID0gMDtcclxuICAgICAgICBpZiAodGhpcy5wcm9wcy5vbkZvY3VzKSB7XHJcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25Gb2N1cy5jYWxsKHRoaXMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnNldFN0YXRlKHthY3RpdmU6ICcnLCBmb2N1czogdHJ1ZX0pO1xyXG4gICAgfTtcclxuXHJcbiAgICBfaGFuZGxlUXVlcnlLZXlEb3duID0gKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgY29uc3Qge3doaWNofSA9IGV2ZW50O1xyXG4gICAgICAgIGNvbnN0IHthY3RpdmUsIG9wdGlvbnN9ID0gdGhpcy5zdGF0ZTtcclxuICAgICAgICBpZiAod2hpY2ggPT09IEVOVEVSX0tFWV9DT0RFICYmIGFjdGl2ZSkgdGhpcy5fc2VsZWN0KGFjdGl2ZSk7XHJcbiAgICAgICAgaWYgKHdoaWNoID09PSBUQUJfS0VZX0NPREUpIHRoaXMuc2V0U3RhdGUoe2ZvY3VzOiBmYWxzZX0sICgpID0+IHRoaXMucmVmcy5odG1sSW5wdXQuYmx1cigpKTtcclxuICAgICAgICBpZiAoW0RPV05fQVJST1dfS0VZX0NPREUsIFVQX0FSUk9XX0tFWV9DT0RFXS5pbmRleE9mKHdoaWNoKSAhPT0gLTEpIHsgLy8gdGhlIHVzZXIgcHJlc3NlZCBvbiBhbiBhcnJvdyBrZXksIGNoYW5nZSB0aGUgYWN0aXZlIGtleVxyXG4gICAgICAgICAgICBjb25zdCBvcHRpb25LZXlzID0gW107XHJcbiAgICAgICAgICAgIGZvciAobGV0IGtleSBvZiBvcHRpb25zLmtleXMoKSkge1xyXG4gICAgICAgICAgICAgICAgb3B0aW9uS2V5cy5wdXNoKGtleSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29uc3QgY3VycmVudEluZGV4ID0gb3B0aW9uS2V5cy5pbmRleE9mKGFjdGl2ZSk7XHJcbiAgICAgICAgICAgIGxldCBuZXdJbmRleCA9IGN1cnJlbnRJbmRleCArICh3aGljaCA9PT0gRE9XTl9BUlJPV19LRVlfQ09ERSA/IDEgOiAtMSk7XHJcbiAgICAgICAgICAgIGlmIChuZXdJbmRleCA+PSBvcHRpb25zLnNpemUpIHtcclxuICAgICAgICAgICAgICAgIG5ld0luZGV4IC09IG9wdGlvbnMuc2l6ZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChuZXdJbmRleCA8IDApIHtcclxuICAgICAgICAgICAgICAgIG5ld0luZGV4ICs9IG9wdGlvbnMuc2l6ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHthY3RpdmU6IG9wdGlvbktleXNbbmV3SW5kZXhdfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBfaGFuZGxlU3VnZ2VzdGlvbkhvdmVyID0ga2V5ID0+IHtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHthY3RpdmU6IGtleX0pO1xyXG4gICAgfTtcclxuXHJcbiAgICBfc2VsZWN0KGtleSkge1xyXG4gICAgICAgIGNvbnN0IHtvcHRpb25zfSA9IHRoaXMuc3RhdGU7XHJcbiAgICAgICAgY29uc3Qge29uQ2hhbmdlLCBrZXlOYW1lLCBsYWJlbE5hbWV9ID0gdGhpcy5wcm9wcztcclxuICAgICAgICBjb25zdCByZXNvbHZlZExhYmVsID0gb3B0aW9ucy5nZXQoa2V5KSB8fCAnJztcclxuICAgICAgICB0aGlzLnJlZnMuaHRtbElucHV0LmJsdXIoKTtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHtpbnB1dFZhbHVlOiBpMThuZXh0LnQocmVzb2x2ZWRMYWJlbCksIHNlbGVjdGVkOiBrZXksIGZvY3VzOiBmYWxzZX0sICgpID0+IHtcclxuICAgICAgICAgICAgaWYgKG9uQ2hhbmdlKSBvbkNoYW5nZShrZXkpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcbiAgICBfcmVuZGVyT3B0aW9ucyA9ICgpID0+IHtcclxuICAgICAgICBjb25zdCB7YWN0aXZlLCBvcHRpb25zLCBmb2N1c30gPSB0aGlzLnN0YXRlO1xyXG4gICAgICAgIGNvbnN0IHJlbmRlcmVkT3B0aW9ucyA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IFtrZXksIHZhbHVlXSBvZiBvcHRpb25zKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGlzQWN0aXZlID0gYWN0aXZlID09PSBrZXk7XHJcbiAgICAgICAgICAgIHJlbmRlcmVkT3B0aW9ucy5wdXNoKFxyXG4gICAgICAgICAgICAgICAgPGxpXHJcbiAgICAgICAgICAgICAgICBkYXRhLWFjdGl2ZT17aXNBY3RpdmV9XHJcbiAgICAgICAgICAgICAgICBkYXRhLWZvY3VzPSdvcHRpb24nXHJcbiAgICAgICAgICAgICAgICBrZXk9e2tleX1cclxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuX3NlbGVjdC5iaW5kKHRoaXMsIGtleSl9XHJcbiAgICAgICAgICAgICAgICBvbk1vdXNlT3Zlcj17dGhpcy5faGFuZGxlU3VnZ2VzdGlvbkhvdmVyLmJpbmQodGhpcywga2V5KX1cclxuICAgICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgIHtpMThuZXh0LnQodmFsdWUpfVxyXG4gICAgICAgICAgICAgICAgPC9saT5cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPHVsIGRhdGEtZm9jdXM9J29wdGlvbnMnIHJlZj0nb3B0aW9ucycgZGF0YS1mb2N1c3NlZD17Zm9jdXN9PlxyXG4gICAgICAgICAgICB7cmVuZGVyZWRPcHRpb25zfVxyXG4gICAgICAgICAgICA8L3VsPlxyXG4gICAgICAgICk7XHJcbiAgICB9O1xyXG5cclxuICAgIHJlbmRlciAoKSB7XHJcbiAgICAgICAgY29uc3Qge2N1c3RvbUVycm9yLCBpbnB1dFRpbWVvdXQsIGtleU5hbWUsIGtleVJlc29sdmVyLCBsYWJlbE5hbWUsIHBsYWNlaG9sZGVyLCBxdWVyeVNlYXJjaGVyLCByZW5kZXJPcHRpb25zLCAuLi5pbnB1dFByb3BzfSA9IHRoaXMucHJvcHM7XHJcbiAgICAgICAgY29uc3Qge2lucHV0VmFsdWUsIGlzTG9hZGluZ30gPSB0aGlzLnN0YXRlO1xyXG4gICAgICAgIGNvbnN0IHtfaGFuZGxlUXVlcnlGb2N1cywgX2hhbmRsZVF1ZXJ5S2V5RG93biwgX2hhbmRsZVF1ZXJ5Q2hhbmdlfSA9IHRoaXM7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdiBkYXRhLWZvY3VzPSdhdXRvY29tcGxldGUnIGRhdGEtaWQ9e3RoaXMuYXV0b2NvbXBsZXRlSWR9PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e2BtZGwtdGV4dGZpZWxkIG1kbC1qcy10ZXh0ZmllbGQke2N1c3RvbUVycm9yID8gJyBpcy1pbnZhbGlkJyA6ICcnfWB9IGRhdGEtZm9jdXM9J2lucHV0LXRleHQnIHJlZj0naW5wdXRUZXh0Jz5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGRhdGEtZm9jdXM9J2xvYWRpbmcnIGRhdGEtbG9hZGluZz17aXNMb2FkaW5nfSBjbGFzc05hbWU9J21kbC1wcm9ncmVzcyBtZGwtanMtcHJvZ3Jlc3MgbWRsLXByb2dyZXNzX19pbmRldGVybWluYXRlJyByZWY9J2xvYWRlcic+PC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPGlucHV0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT0nbWRsLXRleHRmaWVsZF9faW5wdXQnXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsuLi5pbnB1dFByb3BzfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17X2hhbmRsZVF1ZXJ5Q2hhbmdlfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkZvY3VzPXtfaGFuZGxlUXVlcnlGb2N1c31cclxuICAgICAgICAgICAgICAgICAgICAgICAgb25LZXlEb3duPXtfaGFuZGxlUXVlcnlLZXlEb3dufVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZWY9J2h0bWxJbnB1dCdcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT0ndGV4dCdcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e2lucHV0VmFsdWV9XHJcbiAgICAgICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPSdtZGwtdGV4dGZpZWxkX19sYWJlbCc+e2kxOG5leHQudChwbGFjZWhvbGRlcil9PC9sYWJlbD5cclxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9J21kbC10ZXh0ZmllbGRfX2Vycm9yJz57aTE4bmV4dC50KGN1c3RvbUVycm9yKX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIHtyZW5kZXJPcHRpb25zID8gcmVuZGVyT3B0aW9ucy5jYWxsKHRoaXMpIDogdGhpcy5fcmVuZGVyT3B0aW9ucygpfVxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApO1xyXG4gICAgfTtcclxufVxyXG5cclxuQXV0b2NvbXBsZXRlLmRpc3BsYXlOYW1lID0gJ0F1dG9jb21wbGV0ZSc7XHJcbkF1dG9jb21wbGV0ZS5kZWZhdWx0UHJvcHMgPSBkZWZhdWx0UHJvcHM7XHJcbkF1dG9jb21wbGV0ZS5wcm9wVHlwZXMgPSBwcm9wVHlwZXM7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBBdXRvY29tcGxldGU7XHJcbiJdfQ==