'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _dec, _dec2, _class;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _componentBase = require('../../../behaviours/component-base');

var _componentBase2 = _interopRequireDefault(_componentBase);

var _material = require('../../../behaviours/material');

var _material2 = _interopRequireDefault(_material);

var _debounce = require('lodash/function/debounce');

var _debounce2 = _interopRequireDefault(_debounce);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var AutocompleteTextEdit = (_dec = (0, _material2.default)('materialInput'), _dec2 = (0, _material2.default)('loader'), _dec(_class = _dec2(_class = (0, _componentBase2.default)(_class = function (_Component) {
    _inherits(AutocompleteTextEdit, _Component);

    function AutocompleteTextEdit() {
        var _temp, _this, _ret;

        _classCallCheck(this, AutocompleteTextEdit);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.state = {
            inputValue: _this.props.value,
            suggestions: [],
            hasSuggestions: false,
            error: _this.props.error,
            hasFocus: false,
            isLoading: false
        }, _this.getValue = function () {
            var inputValue = _this.state.inputValue;

            if (inputValue !== undefined) {
                return inputValue;
            } else {
                return null;
            }
        }, _this._querySearcher = function (value) {
            var querySearcher = _this.props.querySearcher;
            var hasSuggestions = _this.state.hasSuggestions;


            querySearcher(value).then(function (_ref) {
                var data = _ref.data,
                    totalCount = _ref.totalCount;

                if (totalCount > 0) {
                    _this.setState({ hasSuggestions: true, suggestions: data, error: '' });
                }
                _this.refs.loader.classList.remove('mdl-progress__indeterminate');
                _this.setState({ isLoading: false });
            }).catch(function (err) {
                _this.refs.loader.classList.remove('mdl-progress__indeterminate');
                _this.setState({ error: JSON.stringify(err), isLoading: false });
                _this.refs.materialInput.classList.add('is-invalid');
            });
        }, _this.onQueryChange = function (_ref2) {
            var value = _ref2.target.value;

            _this.setState({ inputValue: value });
            if (value.trim() == '') {
                _this.setState({ hasSuggestions: false });
            } else {
                _this.refs.loader.classList.add('mdl-progress__indeterminate');
                _this.setState({ isLoading: true });
                _this._debouncedQuerySearcher(value);
                // this._querySearcher(value);
            }
        }, _this.renderSuggestions = function () {
            var suggestions = _this.state.suggestions;

            var allSuggestions = suggestions.map(function (_ref3) {
                var key = _ref3.key,
                    label = _ref3.label;
                return _react2.default.createElement(
                    'li',
                    { key: key, onMouseDown: function onMouseDown(e) {
                            _this.onResultClick(label);e.preventDefault();
                        }, 'data-focus': 'option' },
                    label
                );
            });
            return _react2.default.createElement(
                'ul',
                { ref: 'suggestions', 'data-focus': 'options' },
                allSuggestions
            );
        }, _this.toggleHasFocus = function (e) {
            var _this$state = _this.state,
                hasSuggestions = _this$state.hasSuggestions,
                hasFocus = _this$state.hasFocus;
            var _this$props = _this.props,
                showAtFocus = _this$props.showAtFocus,
                emptyShowAll = _this$props.emptyShowAll;

            _this.setState({ hasFocus: !_this.state.hasFocus });
            if (hasSuggestions && !showAtFocus && hasFocus === false) {
                _this.setState({ hasSuggestions: false });
            }
            if (!hasSuggestions && e.target.value.trim() === '' && emptyShowAll && hasFocus === false) {
                // Doing a global search here
                _this._querySearcher('');
            }
            return true;
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    AutocompleteTextEdit.prototype.componentWillReceiveProps = function componentWillReceiveProps(_ref4) {
        var error = _ref4.error;

        if (error) {
            this.setState({ error: error });
        }
    };

    AutocompleteTextEdit.prototype.componentDidMount = function componentDidMount() {
        var inputTimeout = this.props.inputTimeout;

        this._debouncedQuerySearcher = (0, _debounce2.default)(this._querySearcher, inputTimeout);
    };

    // Returns the state's inputValue


    // Gets the defined props' querySearch and returns the object given by the promise
    // Sets the hasSuggestions' state if the given object has a none empty array


    // Sets the state's inputValue when the user is typing


    // Sets the value input with the selected suggestion and hides the dropdown
    AutocompleteTextEdit.prototype.onResultClick = function onResultClick(value) {
        this.refs.inputText.value = value;
        this.setState({ inputValue: value, hasSuggestions: false, suggestions: [] });
        return value;
    };

    // Returns an html list whith the Suggestions


    // Behaviour when onFocus and onBlur are triggered


    // Maybe give the option for the floating label
    AutocompleteTextEdit.prototype.render = function render() {
        var _state = this.state,
            inputValue = _state.inputValue,
            hasSuggestions = _state.hasSuggestions,
            hasFocus = _state.hasFocus,
            isLoading = _state.isLoading,
            otherProps = _objectWithoutProperties(_state, ['inputValue', 'hasSuggestions', 'hasFocus', 'isLoading']);

        var _props = this.props,
            placeholder = _props.placeholder,
            inputTimeout = _props.inputTimeout,
            showAtFocus = _props.showAtFocus,
            emptyShowAll = _props.emptyShowAll,
            error = _props.error;

        return _react2.default.createElement(
            'div',
            { 'data-focus': 'autocompleteText' },
            _react2.default.createElement(
                'div',
                { className: 'mdl-textfield mdl-js-textfield' + (error ? ' is-invalid' : ''), ref: 'materialInput' },
                _react2.default.createElement('div', { 'data-focus': 'loading', 'data-loading': isLoading, className: 'mdl-progress mdl-js-progress', ref: 'loader' }),
                _react2.default.createElement('input', _extends({ onFocus: this.toggleHasFocus, onBlur: this.toggleHasFocus, className: 'mdl-textfield__input', type: 'text', value: !inputValue ? '' : inputValue, ref: 'inputText', onChange: this.onQueryChange.bind(this), showAtFocus: showAtFocus, emptyShowAll: emptyShowAll }, otherProps)),
                _react2.default.createElement(
                    'label',
                    { className: 'mdl-textfield__label' },
                    this.i18n(placeholder)
                ),
                _react2.default.createElement(
                    'span',
                    { className: 'mdl-textfield__error', ref: 'errorMessage' },
                    this.i18n(error)
                )
            ),
            hasSuggestions && hasFocus && this.renderSuggestions()
        );
    };

    return AutocompleteTextEdit;
}(_react.Component)) || _class) || _class) || _class);
AutocompleteTextEdit.defaultProps = {
    placeholder: 'Search here...',
    showAtFocus: false,
    emptyShowAll: false,
    inputTimeout: 200
};
AutocompleteTextEdit.propTypes = {
    /**
    * Returns a promise which is connected to the web service.
    * @type {Function}
    */
    querySearcher: _react.PropTypes.func.isRequired,

    /**
    * Field value.
    * @type {String}
    */
    value: _react.PropTypes.string,

    /**
    * Launches the querySearcher.
    * @type {Function}
    */
    onChange: _react.PropTypes.func,

    /**
    * Error showed message.
    * @type {String}
    */
    error: _react.PropTypes.string,

    /**
    * Placeholder field.
    * @type {String}
    */
    placeholder: _react.PropTypes.string,

    /**
    * Defines it shows suggestions on focus.
    * @type {Boolean}
    */
    showAtFocus: _react.PropTypes.bool,

    /**
    * Defines if it shows suggestions on focus when the input is empty.
    * @type {Boolean}
    */
    emptyShowAll: _react.PropTypes.bool,

    /**
     * [inputTimeout description]
     * @type {number}
     */
    inputTimeout: _react.PropTypes.number.isRequired
};
exports.default = AutocompleteTextEdit;

/*
EXAMPLE
const _querySearcher = query => {
    let data = [
        {
            key: 'JL',
            label: 'Joh Lickeur'
        },
        {
            key: 'GK',
            label: 'Guénolé Kikabou'
        },
        {
            key: 'YL',
            label: 'Yannick Lounivis'
        }
    ];
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({
                data,
                totalCount: data.length
            });
        }, 500);
    });
};

<AutocompleteText
    isEdit={isEdit}
    querySearcher={_querySearcher}
    placeholder={'Your search...'}
    error{Something wrong happend. Retry please...}
/>
*/

module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJBdXRvY29tcGxldGVUZXh0RWRpdCIsInN0YXRlIiwiaW5wdXRWYWx1ZSIsInByb3BzIiwidmFsdWUiLCJzdWdnZXN0aW9ucyIsImhhc1N1Z2dlc3Rpb25zIiwiZXJyb3IiLCJoYXNGb2N1cyIsImlzTG9hZGluZyIsImdldFZhbHVlIiwidW5kZWZpbmVkIiwiX3F1ZXJ5U2VhcmNoZXIiLCJxdWVyeVNlYXJjaGVyIiwidGhlbiIsImRhdGEiLCJ0b3RhbENvdW50Iiwic2V0U3RhdGUiLCJyZWZzIiwibG9hZGVyIiwiY2xhc3NMaXN0IiwicmVtb3ZlIiwiY2F0Y2giLCJKU09OIiwic3RyaW5naWZ5IiwiZXJyIiwibWF0ZXJpYWxJbnB1dCIsImFkZCIsIm9uUXVlcnlDaGFuZ2UiLCJ0YXJnZXQiLCJ0cmltIiwiX2RlYm91bmNlZFF1ZXJ5U2VhcmNoZXIiLCJyZW5kZXJTdWdnZXN0aW9ucyIsImFsbFN1Z2dlc3Rpb25zIiwibWFwIiwia2V5IiwibGFiZWwiLCJlIiwib25SZXN1bHRDbGljayIsInByZXZlbnREZWZhdWx0IiwidG9nZ2xlSGFzRm9jdXMiLCJzaG93QXRGb2N1cyIsImVtcHR5U2hvd0FsbCIsImNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMiLCJjb21wb25lbnREaWRNb3VudCIsImlucHV0VGltZW91dCIsImlucHV0VGV4dCIsInJlbmRlciIsIm90aGVyUHJvcHMiLCJwbGFjZWhvbGRlciIsImkxOG4iLCJkZWZhdWx0UHJvcHMiLCJwcm9wVHlwZXMiLCJmdW5jIiwiaXNSZXF1aXJlZCIsInN0cmluZyIsIm9uQ2hhbmdlIiwiYm9vbCIsIm51bWJlciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7SUFLTUEsb0IsV0FITCx3QkFBWSxlQUFaLEMsVUFDQSx3QkFBWSxRQUFaLEM7Ozs7Ozs7Ozs7OztnSkE0REdDLEssR0FBUTtBQUNKQyx3QkFBWSxNQUFLQyxLQUFMLENBQVdDLEtBRG5CO0FBRUpDLHlCQUFhLEVBRlQ7QUFHSkMsNEJBQWdCLEtBSFo7QUFJSkMsbUJBQU8sTUFBS0osS0FBTCxDQUFXSSxLQUpkO0FBS0pDLHNCQUFVLEtBTE47QUFNSkMsdUJBQVc7QUFOUCxTLFFBcUJSQyxRLEdBQVcsWUFBTztBQUFBLGdCQUNQUixVQURPLEdBQ08sTUFBS0QsS0FEWixDQUNQQyxVQURPOztBQUVkLGdCQUFHQSxlQUFlUyxTQUFsQixFQUE2QjtBQUN6Qix1QkFBT1QsVUFBUDtBQUNILGFBRkQsTUFHSztBQUNELHVCQUFPLElBQVA7QUFDSDtBQUNKLFMsUUFJRFUsYyxHQUFpQixpQkFBUztBQUFBLGdCQUNmQyxhQURlLEdBQ0UsTUFBS1YsS0FEUCxDQUNmVSxhQURlO0FBQUEsZ0JBRWZQLGNBRmUsR0FFRyxNQUFLTCxLQUZSLENBRWZLLGNBRmU7OztBQUl0Qk8sMEJBQWNULEtBQWQsRUFBcUJVLElBQXJCLENBQTBCLGdCQUF3QjtBQUFBLG9CQUF0QkMsSUFBc0IsUUFBdEJBLElBQXNCO0FBQUEsb0JBQWhCQyxVQUFnQixRQUFoQkEsVUFBZ0I7O0FBQzlDLG9CQUFHQSxhQUFhLENBQWhCLEVBQW1CO0FBQ2YsMEJBQUtDLFFBQUwsQ0FBYyxFQUFDWCxnQkFBZ0IsSUFBakIsRUFBdUJELGFBQWFVLElBQXBDLEVBQTBDUixPQUFPLEVBQWpELEVBQWQ7QUFDSDtBQUNELHNCQUFLVyxJQUFMLENBQVVDLE1BQVYsQ0FBaUJDLFNBQWpCLENBQTJCQyxNQUEzQixDQUFrQyw2QkFBbEM7QUFDQSxzQkFBS0osUUFBTCxDQUFjLEVBQUNSLFdBQVcsS0FBWixFQUFkO0FBQ0gsYUFORCxFQU1HYSxLQU5ILENBTVMsZUFBTztBQUNaLHNCQUFLSixJQUFMLENBQVVDLE1BQVYsQ0FBaUJDLFNBQWpCLENBQTJCQyxNQUEzQixDQUFrQyw2QkFBbEM7QUFDQSxzQkFBS0osUUFBTCxDQUFjLEVBQUNWLE9BQU9nQixLQUFLQyxTQUFMLENBQWVDLEdBQWYsQ0FBUixFQUE2QmhCLFdBQVcsS0FBeEMsRUFBZDtBQUNBLHNCQUFLUyxJQUFMLENBQVVRLGFBQVYsQ0FBd0JOLFNBQXhCLENBQWtDTyxHQUFsQyxDQUFzQyxZQUF0QztBQUNILGFBVkQ7QUFXSCxTLFFBR0RDLGEsR0FBZ0IsaUJBQXVCO0FBQUEsZ0JBQVp4QixLQUFZLFNBQXJCeUIsTUFBcUIsQ0FBWnpCLEtBQVk7O0FBQ25DLGtCQUFLYSxRQUFMLENBQWMsRUFBQ2YsWUFBWUUsS0FBYixFQUFkO0FBQ0EsZ0JBQUdBLE1BQU0wQixJQUFOLE1BQWdCLEVBQW5CLEVBQXVCO0FBQ25CLHNCQUFLYixRQUFMLENBQWMsRUFBQ1gsZ0JBQWdCLEtBQWpCLEVBQWQ7QUFDSCxhQUZELE1BR0s7QUFDRCxzQkFBS1ksSUFBTCxDQUFVQyxNQUFWLENBQWlCQyxTQUFqQixDQUEyQk8sR0FBM0IsQ0FBK0IsNkJBQS9CO0FBQ0Esc0JBQUtWLFFBQUwsQ0FBYyxFQUFDUixXQUFXLElBQVosRUFBZDtBQUNBLHNCQUFLc0IsdUJBQUwsQ0FBNkIzQixLQUE3QjtBQUNBO0FBQ0g7QUFDSixTLFFBVUQ0QixpQixHQUFvQixZQUFNO0FBQUEsZ0JBQ2YzQixXQURlLEdBQ0EsTUFBS0osS0FETCxDQUNmSSxXQURlOztBQUV0QixnQkFBTTRCLGlCQUFpQjVCLFlBQVk2QixHQUFaLENBQWdCO0FBQUEsb0JBQUVDLEdBQUYsU0FBRUEsR0FBRjtBQUFBLG9CQUFPQyxLQUFQLFNBQU9BLEtBQVA7QUFBQSx1QkFBa0I7QUFBQTtBQUFBLHNCQUFJLEtBQUtELEdBQVQsRUFBYyxhQUFhLHFCQUFDRSxDQUFELEVBQU87QUFBQyxrQ0FBS0MsYUFBTCxDQUFtQkYsS0FBbkIsRUFBMkJDLEVBQUVFLGNBQUY7QUFBb0IseUJBQWxGLEVBQW9GLGNBQVcsUUFBL0Y7QUFBMEdIO0FBQTFHLGlCQUFsQjtBQUFBLGFBQWhCLENBQXZCO0FBQ0EsbUJBQ0k7QUFBQTtBQUFBLGtCQUFJLEtBQUksYUFBUixFQUFzQixjQUFXLFNBQWpDO0FBQ0tIO0FBREwsYUFESjtBQUtILFMsUUFHRE8sYyxHQUFpQixhQUFLO0FBQUEsOEJBQ2lCLE1BQUt2QyxLQUR0QjtBQUFBLGdCQUNYSyxjQURXLGVBQ1hBLGNBRFc7QUFBQSxnQkFDS0UsUUFETCxlQUNLQSxRQURMO0FBQUEsOEJBRWtCLE1BQUtMLEtBRnZCO0FBQUEsZ0JBRVhzQyxXQUZXLGVBRVhBLFdBRlc7QUFBQSxnQkFFRUMsWUFGRixlQUVFQSxZQUZGOztBQUdsQixrQkFBS3pCLFFBQUwsQ0FBYyxFQUFDVCxVQUFVLENBQUMsTUFBS1AsS0FBTCxDQUFXTyxRQUF2QixFQUFkO0FBQ0EsZ0JBQUdGLGtCQUFrQixDQUFDbUMsV0FBbkIsSUFBa0NqQyxhQUFhLEtBQWxELEVBQXlEO0FBQ3JELHNCQUFLUyxRQUFMLENBQWMsRUFBQ1gsZ0JBQWdCLEtBQWpCLEVBQWQ7QUFDSDtBQUNELGdCQUFHLENBQUNBLGNBQUQsSUFBbUIrQixFQUFFUixNQUFGLENBQVN6QixLQUFULENBQWUwQixJQUFmLE9BQTBCLEVBQTdDLElBQW1EWSxZQUFuRCxJQUFtRWxDLGFBQWEsS0FBbkYsRUFBMEY7QUFDdEY7QUFDQSxzQkFBS0ksY0FBTCxDQUFvQixFQUFwQjtBQUNIO0FBQ0QsbUJBQU8sSUFBUDtBQUNILFM7OzttQ0F0RkQrQix5Qiw2Q0FBbUM7QUFBQSxZQUFScEMsS0FBUSxTQUFSQSxLQUFROztBQUMvQixZQUFHQSxLQUFILEVBQVU7QUFDTixpQkFBS1UsUUFBTCxDQUFjLEVBQUNWLE9BQU9BLEtBQVIsRUFBZDtBQUNIO0FBQ0osSzs7bUNBRURxQyxpQixnQ0FBb0I7QUFBQSxZQUNYQyxZQURXLEdBQ0ssS0FBSzFDLEtBRFYsQ0FDWDBDLFlBRFc7O0FBRWxCLGFBQUtkLHVCQUFMLEdBQStCLHdCQUFTLEtBQUtuQixjQUFkLEVBQThCaUMsWUFBOUIsQ0FBL0I7QUFDRCxLOztBQUVEOzs7QUFXQTtBQUNBOzs7QUFrQkE7OztBQWNBO21DQUNBUCxhLDBCQUFjbEMsSyxFQUFPO0FBQ2pCLGFBQUtjLElBQUwsQ0FBVTRCLFNBQVYsQ0FBb0IxQyxLQUFwQixHQUE0QkEsS0FBNUI7QUFDQSxhQUFLYSxRQUFMLENBQWMsRUFBQ2YsWUFBWUUsS0FBYixFQUFvQkUsZ0JBQWdCLEtBQXBDLEVBQTJDRCxhQUFhLEVBQXhELEVBQWQ7QUFDQSxlQUFPRCxLQUFQO0FBQ0gsSzs7QUFFRDs7O0FBV0E7OztBQWVBO21DQUNBMkMsTSxxQkFBUztBQUFBLHFCQUNvRSxLQUFLOUMsS0FEekU7QUFBQSxZQUNFQyxVQURGLFVBQ0VBLFVBREY7QUFBQSxZQUNjSSxjQURkLFVBQ2NBLGNBRGQ7QUFBQSxZQUM4QkUsUUFEOUIsVUFDOEJBLFFBRDlCO0FBQUEsWUFDd0NDLFNBRHhDLFVBQ3dDQSxTQUR4QztBQUFBLFlBQ3NEdUMsVUFEdEQ7O0FBQUEscUJBRWlFLEtBQUs3QyxLQUZ0RTtBQUFBLFlBRUU4QyxXQUZGLFVBRUVBLFdBRkY7QUFBQSxZQUVlSixZQUZmLFVBRWVBLFlBRmY7QUFBQSxZQUU2QkosV0FGN0IsVUFFNkJBLFdBRjdCO0FBQUEsWUFFMENDLFlBRjFDLFVBRTBDQSxZQUYxQztBQUFBLFlBRXdEbkMsS0FGeEQsVUFFd0RBLEtBRnhEOztBQUdMLGVBQ0k7QUFBQTtBQUFBLGNBQUssY0FBVyxrQkFBaEI7QUFDSTtBQUFBO0FBQUEsa0JBQUssK0NBQTRDQSxRQUFRLGFBQVIsR0FBd0IsRUFBcEUsQ0FBTCxFQUErRSxLQUFJLGVBQW5GO0FBQ0ksdURBQUssY0FBVyxTQUFoQixFQUEwQixnQkFBY0UsU0FBeEMsRUFBbUQsV0FBVSw4QkFBN0QsRUFBNEYsS0FBSSxRQUFoRyxHQURKO0FBRUksa0VBQU8sU0FBUyxLQUFLK0IsY0FBckIsRUFBcUMsUUFBUSxLQUFLQSxjQUFsRCxFQUFrRSxXQUFVLHNCQUE1RSxFQUFtRyxNQUFLLE1BQXhHLEVBQStHLE9BQU8sQ0FBQ3RDLFVBQUQsR0FBYyxFQUFkLEdBQW1CQSxVQUF6SSxFQUFxSixLQUFJLFdBQXpKLEVBQXFLLFVBQVksS0FBSzBCLGFBQWpCLE1BQVksSUFBWixDQUFySyxFQUFxTSxhQUFhYSxXQUFsTixFQUErTixjQUFjQyxZQUE3TyxJQUErUE0sVUFBL1AsRUFGSjtBQUdJO0FBQUE7QUFBQSxzQkFBTyxXQUFVLHNCQUFqQjtBQUF5Qyx5QkFBS0UsSUFBTCxDQUFVRCxXQUFWO0FBQXpDLGlCQUhKO0FBSUk7QUFBQTtBQUFBLHNCQUFNLFdBQVUsc0JBQWhCLEVBQXVDLEtBQUksY0FBM0M7QUFBMkQseUJBQUtDLElBQUwsQ0FBVTNDLEtBQVY7QUFBM0Q7QUFKSixhQURKO0FBT0tELDhCQUFrQkUsUUFBbEIsSUFDRyxLQUFLd0IsaUJBQUw7QUFSUixTQURKO0FBYUgsSzs7OztBQTVLQ2hDLG9CLENBQ0ttRCxZLEdBQWU7QUFDbEJGLGlCQUFhLGdCQURLO0FBRWxCUixpQkFBYSxLQUZLO0FBR2xCQyxrQkFBYyxLQUhJO0FBSWxCRyxrQkFBYztBQUpJLEM7QUFEcEI3QyxvQixDQVFLb0QsUyxHQUFZO0FBQ2Y7Ozs7QUFJQXZDLG1CQUFlLGlCQUFVd0MsSUFBVixDQUFlQyxVQUxmOztBQU9mOzs7O0FBSUFsRCxXQUFPLGlCQUFVbUQsTUFYRjs7QUFhZjs7OztBQUlBQyxjQUFVLGlCQUFVSCxJQWpCTDs7QUFtQmY7Ozs7QUFJQTlDLFdBQU8saUJBQVVnRCxNQXZCRjs7QUF5QmY7Ozs7QUFJQU4saUJBQWEsaUJBQVVNLE1BN0JSOztBQStCZjs7OztBQUlBZCxpQkFBYSxpQkFBVWdCLElBbkNSOztBQXFDZjs7OztBQUlBZixrQkFBYyxpQkFBVWUsSUF6Q1Q7O0FBMkNmOzs7O0FBSUFaLGtCQUFlLGlCQUFVYSxNQUFWLENBQWlCSjtBQS9DakIsQztrQkF1S1J0RCxvQjs7QUFFZiIsImZpbGUiOiJpcy1yZWFjdC1jbGFzcy1jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnQsIFByb3BUeXBlc30gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgUmVhY3RET00gZnJvbSAncmVhY3QtZG9tJztcclxuaW1wb3J0IENvbXBvbmVudEJhc2VCZWhhdmlvdXIgZnJvbSAnLi4vLi4vLi4vYmVoYXZpb3Vycy9jb21wb25lbnQtYmFzZSc7XHJcbmltcG9ydCBNREJlaGF2aW91ciBmcm9tICcuLi8uLi8uLi9iZWhhdmlvdXJzL21hdGVyaWFsJztcclxuXHJcbmltcG9ydCBkZWJvdW5jZSBmcm9tICdsb2Rhc2gvZnVuY3Rpb24vZGVib3VuY2UnO1xyXG5cclxuQE1EQmVoYXZpb3VyKCdtYXRlcmlhbElucHV0JylcclxuQE1EQmVoYXZpb3VyKCdsb2FkZXInKVxyXG5AQ29tcG9uZW50QmFzZUJlaGF2aW91clxyXG5jbGFzcyBBdXRvY29tcGxldGVUZXh0RWRpdCBleHRlbmRzIENvbXBvbmVudCB7XHJcbiAgICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xyXG4gICAgICAgIHBsYWNlaG9sZGVyOiAnU2VhcmNoIGhlcmUuLi4nLFxyXG4gICAgICAgIHNob3dBdEZvY3VzOiBmYWxzZSxcclxuICAgICAgICBlbXB0eVNob3dBbGw6IGZhbHNlLFxyXG4gICAgICAgIGlucHV0VGltZW91dDogMjAwXHJcbiAgICB9O1xyXG5cclxuICAgIHN0YXRpYyBwcm9wVHlwZXMgPSB7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgKiBSZXR1cm5zIGEgcHJvbWlzZSB3aGljaCBpcyBjb25uZWN0ZWQgdG8gdGhlIHdlYiBzZXJ2aWNlLlxyXG4gICAgICAgICogQHR5cGUge0Z1bmN0aW9ufVxyXG4gICAgICAgICovXHJcbiAgICAgICAgcXVlcnlTZWFyY2hlcjogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgKiBGaWVsZCB2YWx1ZS5cclxuICAgICAgICAqIEB0eXBlIHtTdHJpbmd9XHJcbiAgICAgICAgKi9cclxuICAgICAgICB2YWx1ZTogUHJvcFR5cGVzLnN0cmluZyxcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgKiBMYXVuY2hlcyB0aGUgcXVlcnlTZWFyY2hlci5cclxuICAgICAgICAqIEB0eXBlIHtGdW5jdGlvbn1cclxuICAgICAgICAqL1xyXG4gICAgICAgIG9uQ2hhbmdlOiBQcm9wVHlwZXMuZnVuYyxcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgKiBFcnJvciBzaG93ZWQgbWVzc2FnZS5cclxuICAgICAgICAqIEB0eXBlIHtTdHJpbmd9XHJcbiAgICAgICAgKi9cclxuICAgICAgICBlcnJvcjogUHJvcFR5cGVzLnN0cmluZyxcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgKiBQbGFjZWhvbGRlciBmaWVsZC5cclxuICAgICAgICAqIEB0eXBlIHtTdHJpbmd9XHJcbiAgICAgICAgKi9cclxuICAgICAgICBwbGFjZWhvbGRlcjogUHJvcFR5cGVzLnN0cmluZyxcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgKiBEZWZpbmVzIGl0IHNob3dzIHN1Z2dlc3Rpb25zIG9uIGZvY3VzLlxyXG4gICAgICAgICogQHR5cGUge0Jvb2xlYW59XHJcbiAgICAgICAgKi9cclxuICAgICAgICBzaG93QXRGb2N1czogUHJvcFR5cGVzLmJvb2wsXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICogRGVmaW5lcyBpZiBpdCBzaG93cyBzdWdnZXN0aW9ucyBvbiBmb2N1cyB3aGVuIHRoZSBpbnB1dCBpcyBlbXB0eS5cclxuICAgICAgICAqIEB0eXBlIHtCb29sZWFufVxyXG4gICAgICAgICovXHJcbiAgICAgICAgZW1wdHlTaG93QWxsOiBQcm9wVHlwZXMuYm9vbCxcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogW2lucHV0VGltZW91dCBkZXNjcmlwdGlvbl1cclxuICAgICAgICAgKiBAdHlwZSB7bnVtYmVyfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGlucHV0VGltZW91dCA6IFByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZFxyXG4gICAgfTtcclxuXHJcbiAgICBzdGF0ZSA9IHtcclxuICAgICAgICBpbnB1dFZhbHVlOiB0aGlzLnByb3BzLnZhbHVlLFxyXG4gICAgICAgIHN1Z2dlc3Rpb25zOiBbXSxcclxuICAgICAgICBoYXNTdWdnZXN0aW9uczogZmFsc2UsXHJcbiAgICAgICAgZXJyb3I6IHRoaXMucHJvcHMuZXJyb3IsXHJcbiAgICAgICAgaGFzRm9jdXM6IGZhbHNlLFxyXG4gICAgICAgIGlzTG9hZGluZzogZmFsc2VcclxuICAgIH07XHJcblxyXG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyh7ZXJyb3J9KSB7XHJcbiAgICAgICAgaWYoZXJyb3IpIHtcclxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7ZXJyb3I6IGVycm9yfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xyXG4gICAgICBjb25zdCB7aW5wdXRUaW1lb3V0fSA9IHRoaXMucHJvcHM7XHJcbiAgICAgIHRoaXMuX2RlYm91bmNlZFF1ZXJ5U2VhcmNoZXIgPSBkZWJvdW5jZSh0aGlzLl9xdWVyeVNlYXJjaGVyLCBpbnB1dFRpbWVvdXQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFJldHVybnMgdGhlIHN0YXRlJ3MgaW5wdXRWYWx1ZVxyXG4gICAgZ2V0VmFsdWUgPSAoKSA9PiAge1xyXG4gICAgICAgIGNvbnN0IHtpbnB1dFZhbHVlfSA9IHRoaXMuc3RhdGU7XHJcbiAgICAgICAgaWYoaW5wdXRWYWx1ZSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBpbnB1dFZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICAvLyBHZXRzIHRoZSBkZWZpbmVkIHByb3BzJyBxdWVyeVNlYXJjaCBhbmQgcmV0dXJucyB0aGUgb2JqZWN0IGdpdmVuIGJ5IHRoZSBwcm9taXNlXHJcbiAgICAvLyBTZXRzIHRoZSBoYXNTdWdnZXN0aW9ucycgc3RhdGUgaWYgdGhlIGdpdmVuIG9iamVjdCBoYXMgYSBub25lIGVtcHR5IGFycmF5XHJcbiAgICBfcXVlcnlTZWFyY2hlciA9IHZhbHVlID0+IHtcclxuICAgICAgICBjb25zdCB7cXVlcnlTZWFyY2hlcn0gPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIGNvbnN0IHtoYXNTdWdnZXN0aW9uc30gPSB0aGlzLnN0YXRlO1xyXG5cclxuICAgICAgICBxdWVyeVNlYXJjaGVyKHZhbHVlKS50aGVuKCh7ZGF0YSwgdG90YWxDb3VudH0pID0+IHtcclxuICAgICAgICAgICAgaWYodG90YWxDb3VudCA+IDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2hhc1N1Z2dlc3Rpb25zOiB0cnVlLCBzdWdnZXN0aW9uczogZGF0YSwgZXJyb3I6ICcnfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5yZWZzLmxvYWRlci5jbGFzc0xpc3QucmVtb3ZlKCdtZGwtcHJvZ3Jlc3NfX2luZGV0ZXJtaW5hdGUnKTtcclxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7aXNMb2FkaW5nOiBmYWxzZX0pO1xyXG4gICAgICAgIH0pLmNhdGNoKGVyciA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMucmVmcy5sb2FkZXIuY2xhc3NMaXN0LnJlbW92ZSgnbWRsLXByb2dyZXNzX19pbmRldGVybWluYXRlJyk7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2Vycm9yOiBKU09OLnN0cmluZ2lmeShlcnIpLCBpc0xvYWRpbmc6IGZhbHNlfSk7XHJcbiAgICAgICAgICAgIHRoaXMucmVmcy5tYXRlcmlhbElucHV0LmNsYXNzTGlzdC5hZGQoJ2lzLWludmFsaWQnKTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgLy8gU2V0cyB0aGUgc3RhdGUncyBpbnB1dFZhbHVlIHdoZW4gdGhlIHVzZXIgaXMgdHlwaW5nXHJcbiAgICBvblF1ZXJ5Q2hhbmdlID0gKHt0YXJnZXQ6IHt2YWx1ZX19KSA9PiB7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7aW5wdXRWYWx1ZTogdmFsdWV9KTtcclxuICAgICAgICBpZih2YWx1ZS50cmltKCkgPT0gJycpIHtcclxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7aGFzU3VnZ2VzdGlvbnM6IGZhbHNlfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnJlZnMubG9hZGVyLmNsYXNzTGlzdC5hZGQoJ21kbC1wcm9ncmVzc19faW5kZXRlcm1pbmF0ZScpO1xyXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtpc0xvYWRpbmc6IHRydWV9KTtcclxuICAgICAgICAgICAgdGhpcy5fZGVib3VuY2VkUXVlcnlTZWFyY2hlcih2YWx1ZSk7XHJcbiAgICAgICAgICAgIC8vIHRoaXMuX3F1ZXJ5U2VhcmNoZXIodmFsdWUpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgLy8gU2V0cyB0aGUgdmFsdWUgaW5wdXQgd2l0aCB0aGUgc2VsZWN0ZWQgc3VnZ2VzdGlvbiBhbmQgaGlkZXMgdGhlIGRyb3Bkb3duXHJcbiAgICBvblJlc3VsdENsaWNrKHZhbHVlKSB7XHJcbiAgICAgICAgdGhpcy5yZWZzLmlucHV0VGV4dC52YWx1ZSA9IHZhbHVlO1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe2lucHV0VmFsdWU6IHZhbHVlLCBoYXNTdWdnZXN0aW9uczogZmFsc2UsIHN1Z2dlc3Rpb25zOiBbXX0pO1xyXG4gICAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgIH07XHJcblxyXG4gICAgLy8gUmV0dXJucyBhbiBodG1sIGxpc3Qgd2hpdGggdGhlIFN1Z2dlc3Rpb25zXHJcbiAgICByZW5kZXJTdWdnZXN0aW9ucyA9ICgpID0+IHtcclxuICAgICAgICBjb25zdCB7c3VnZ2VzdGlvbnN9ID0gdGhpcy5zdGF0ZTtcclxuICAgICAgICBjb25zdCBhbGxTdWdnZXN0aW9ucyA9IHN1Z2dlc3Rpb25zLm1hcCgoe2tleSwgbGFiZWx9KSA9PiA8bGkga2V5PXtrZXl9IG9uTW91c2VEb3duPXsoZSkgPT4ge3RoaXMub25SZXN1bHRDbGljayhsYWJlbCk7IGUucHJldmVudERlZmF1bHQoKTt9fSBkYXRhLWZvY3VzPSdvcHRpb24nID57bGFiZWx9PC9saT4pO1xyXG4gICAgICAgIHJldHVybihcclxuICAgICAgICAgICAgPHVsIHJlZj0nc3VnZ2VzdGlvbnMnIGRhdGEtZm9jdXM9J29wdGlvbnMnPlxyXG4gICAgICAgICAgICAgICAge2FsbFN1Z2dlc3Rpb25zfVxyXG4gICAgICAgICAgICA8L3VsPlxyXG4gICAgICAgICk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8vIEJlaGF2aW91ciB3aGVuIG9uRm9jdXMgYW5kIG9uQmx1ciBhcmUgdHJpZ2dlcmVkXHJcbiAgICB0b2dnbGVIYXNGb2N1cyA9IGUgPT4ge1xyXG4gICAgICAgIGNvbnN0IHtoYXNTdWdnZXN0aW9ucywgaGFzRm9jdXN9ID0gdGhpcy5zdGF0ZTtcclxuICAgICAgICBjb25zdCB7c2hvd0F0Rm9jdXMsIGVtcHR5U2hvd0FsbH0gPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe2hhc0ZvY3VzOiAhdGhpcy5zdGF0ZS5oYXNGb2N1c30pO1xyXG4gICAgICAgIGlmKGhhc1N1Z2dlc3Rpb25zICYmICFzaG93QXRGb2N1cyAmJiBoYXNGb2N1cyA9PT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7aGFzU3VnZ2VzdGlvbnM6IGZhbHNlfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKCFoYXNTdWdnZXN0aW9ucyAmJiBlLnRhcmdldC52YWx1ZS50cmltKCkgPT09ICcnICYmIGVtcHR5U2hvd0FsbCAmJiBoYXNGb2N1cyA9PT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgLy8gRG9pbmcgYSBnbG9iYWwgc2VhcmNoIGhlcmVcclxuICAgICAgICAgICAgdGhpcy5fcXVlcnlTZWFyY2hlcignJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfTtcclxuXHJcbiAgICAvLyBNYXliZSBnaXZlIHRoZSBvcHRpb24gZm9yIHRoZSBmbG9hdGluZyBsYWJlbFxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIGNvbnN0IHtpbnB1dFZhbHVlLCBoYXNTdWdnZXN0aW9ucywgaGFzRm9jdXMsIGlzTG9hZGluZywgLi4ub3RoZXJQcm9wc30gPSB0aGlzLnN0YXRlO1xyXG4gICAgICAgIGNvbnN0IHtwbGFjZWhvbGRlciwgaW5wdXRUaW1lb3V0LCBzaG93QXRGb2N1cywgZW1wdHlTaG93QWxsLCBlcnJvcn0gPSB0aGlzLnByb3BzXHJcbiAgICAgICAgcmV0dXJuKFxyXG4gICAgICAgICAgICA8ZGl2IGRhdGEtZm9jdXM9J2F1dG9jb21wbGV0ZVRleHQnPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e2BtZGwtdGV4dGZpZWxkIG1kbC1qcy10ZXh0ZmllbGQke2Vycm9yID8gJyBpcy1pbnZhbGlkJyA6ICcnfWB9IHJlZj0nbWF0ZXJpYWxJbnB1dCc+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBkYXRhLWZvY3VzPSdsb2FkaW5nJyBkYXRhLWxvYWRpbmc9e2lzTG9hZGluZ30gY2xhc3NOYW1lPSdtZGwtcHJvZ3Jlc3MgbWRsLWpzLXByb2dyZXNzJyByZWY9J2xvYWRlcicvPlxyXG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCBvbkZvY3VzPXt0aGlzLnRvZ2dsZUhhc0ZvY3VzfSBvbkJsdXI9e3RoaXMudG9nZ2xlSGFzRm9jdXN9IGNsYXNzTmFtZT0nbWRsLXRleHRmaWVsZF9faW5wdXQnIHR5cGU9J3RleHQnIHZhbHVlPXshaW5wdXRWYWx1ZSA/ICcnIDogaW5wdXRWYWx1ZX0gcmVmPSdpbnB1dFRleHQnIG9uQ2hhbmdlPXs6OnRoaXMub25RdWVyeUNoYW5nZX0gc2hvd0F0Rm9jdXM9e3Nob3dBdEZvY3VzfSBlbXB0eVNob3dBbGw9e2VtcHR5U2hvd0FsbH0gey4uLm90aGVyUHJvcHN9IC8+XHJcbiAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cIm1kbC10ZXh0ZmllbGRfX2xhYmVsXCI+e3RoaXMuaTE4bihwbGFjZWhvbGRlcil9PC9sYWJlbD5cclxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJtZGwtdGV4dGZpZWxkX19lcnJvclwiIHJlZj0nZXJyb3JNZXNzYWdlJz57dGhpcy5pMThuKGVycm9yKX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIHtoYXNTdWdnZXN0aW9ucyAmJiBoYXNGb2N1cyAmJlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyU3VnZ2VzdGlvbnMoKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBBdXRvY29tcGxldGVUZXh0RWRpdDtcclxuXHJcbi8qXHJcbkVYQU1QTEVcclxuY29uc3QgX3F1ZXJ5U2VhcmNoZXIgPSBxdWVyeSA9PiB7XHJcbiAgICBsZXQgZGF0YSA9IFtcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGtleTogJ0pMJyxcclxuICAgICAgICAgICAgbGFiZWw6ICdKb2ggTGlja2V1cidcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAga2V5OiAnR0snLFxyXG4gICAgICAgICAgICBsYWJlbDogJ0d1w6lub2zDqSBLaWthYm91J1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBrZXk6ICdZTCcsXHJcbiAgICAgICAgICAgIGxhYmVsOiAnWWFubmljayBMb3VuaXZpcydcclxuICAgICAgICB9XHJcbiAgICBdO1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgcmVzb2x2ZSh7XHJcbiAgICAgICAgICAgICAgICBkYXRhLFxyXG4gICAgICAgICAgICAgICAgdG90YWxDb3VudDogZGF0YS5sZW5ndGhcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSwgNTAwKTtcclxuICAgIH0pO1xyXG59O1xyXG5cclxuPEF1dG9jb21wbGV0ZVRleHRcclxuICAgIGlzRWRpdD17aXNFZGl0fVxyXG4gICAgcXVlcnlTZWFyY2hlcj17X3F1ZXJ5U2VhcmNoZXJ9XHJcbiAgICBwbGFjZWhvbGRlcj17J1lvdXIgc2VhcmNoLi4uJ31cclxuICAgIGVycm9ye1NvbWV0aGluZyB3cm9uZyBoYXBwZW5kLiBSZXRyeSBwbGVhc2UuLi59XHJcbi8+XHJcbiovXHJcbiJdfQ==