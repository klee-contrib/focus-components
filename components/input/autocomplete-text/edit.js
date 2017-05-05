'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _dec, _dec2, _class;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _componentBase = require('../../../behaviours/component-base');

var _componentBase2 = _interopRequireDefault(_componentBase);

var _material = require('../../../behaviours/material');

var _material2 = _interopRequireDefault(_material);

var _filterHtmlAttributes = require('../../../utils/filter-html-attributes');

var _filterHtmlAttributes2 = _interopRequireDefault(_filterHtmlAttributes);

var _debounce = require('lodash/function/debounce');

var _debounce2 = _interopRequireDefault(_debounce);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

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
            if (value.trim() === '') {
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
            isLoading = _state.isLoading;


        var validInputProps = (0, _filterHtmlAttributes2.default)(this.props);
        var _props = this.props,
            placeholder = _props.placeholder,
            error = _props.error;


        validInputProps.value = inputValue === undefined || inputValue === null ? '' : inputValue;
        validInputProps.onFocus = this.toggleHasFocus;
        validInputProps.onChange = this.onQueryChange;
        validInputProps.onBlur = this.toggleHasFocus;
        var inputProps = _extends({}, validInputProps);

        return _react2.default.createElement(
            'div',
            { 'data-focus': 'autocompleteText' },
            _react2.default.createElement(
                'div',
                { className: 'mdl-textfield mdl-js-textfield' + (error ? ' is-invalid' : ''), ref: 'materialInput' },
                _react2.default.createElement('div', { 'data-focus': 'loading', 'data-loading': isLoading, className: 'mdl-progress mdl-js-progress', ref: 'loader' }),
                _react2.default.createElement('input', _extends({ className: 'mdl-textfield__input', type: 'text', ref: 'inputText' }, inputProps)),
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
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJBdXRvY29tcGxldGVUZXh0RWRpdCIsInN0YXRlIiwiaW5wdXRWYWx1ZSIsInByb3BzIiwidmFsdWUiLCJzdWdnZXN0aW9ucyIsImhhc1N1Z2dlc3Rpb25zIiwiZXJyb3IiLCJoYXNGb2N1cyIsImlzTG9hZGluZyIsImdldFZhbHVlIiwidW5kZWZpbmVkIiwiX3F1ZXJ5U2VhcmNoZXIiLCJxdWVyeVNlYXJjaGVyIiwidGhlbiIsImRhdGEiLCJ0b3RhbENvdW50Iiwic2V0U3RhdGUiLCJyZWZzIiwibG9hZGVyIiwiY2xhc3NMaXN0IiwicmVtb3ZlIiwiY2F0Y2giLCJKU09OIiwic3RyaW5naWZ5IiwiZXJyIiwibWF0ZXJpYWxJbnB1dCIsImFkZCIsIm9uUXVlcnlDaGFuZ2UiLCJ0YXJnZXQiLCJ0cmltIiwiX2RlYm91bmNlZFF1ZXJ5U2VhcmNoZXIiLCJyZW5kZXJTdWdnZXN0aW9ucyIsImFsbFN1Z2dlc3Rpb25zIiwibWFwIiwia2V5IiwibGFiZWwiLCJlIiwib25SZXN1bHRDbGljayIsInByZXZlbnREZWZhdWx0IiwidG9nZ2xlSGFzRm9jdXMiLCJzaG93QXRGb2N1cyIsImVtcHR5U2hvd0FsbCIsImNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMiLCJjb21wb25lbnREaWRNb3VudCIsImlucHV0VGltZW91dCIsImlucHV0VGV4dCIsInJlbmRlciIsInZhbGlkSW5wdXRQcm9wcyIsInBsYWNlaG9sZGVyIiwib25Gb2N1cyIsIm9uQ2hhbmdlIiwib25CbHVyIiwiaW5wdXRQcm9wcyIsImkxOG4iLCJkZWZhdWx0UHJvcHMiLCJwcm9wVHlwZXMiLCJmdW5jIiwiaXNSZXF1aXJlZCIsInN0cmluZyIsImJvb2wiLCJudW1iZXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUVBOzs7Ozs7Ozs7Ozs7OztJQUtNQSxvQixXQUhMLHdCQUFZLGVBQVosQyxVQUNBLHdCQUFZLFFBQVosQzs7Ozs7Ozs7Ozs7O2dKQTRER0MsSyxHQUFRO0FBQ0pDLHdCQUFZLE1BQUtDLEtBQUwsQ0FBV0MsS0FEbkI7QUFFSkMseUJBQWEsRUFGVDtBQUdKQyw0QkFBZ0IsS0FIWjtBQUlKQyxtQkFBTyxNQUFLSixLQUFMLENBQVdJLEtBSmQ7QUFLSkMsc0JBQVUsS0FMTjtBQU1KQyx1QkFBVztBQU5QLFMsUUFxQlJDLFEsR0FBVyxZQUFNO0FBQUEsZ0JBQ05SLFVBRE0sR0FDUSxNQUFLRCxLQURiLENBQ05DLFVBRE07O0FBRWIsZ0JBQUlBLGVBQWVTLFNBQW5CLEVBQThCO0FBQzFCLHVCQUFPVCxVQUFQO0FBQ0gsYUFGRCxNQUVPO0FBQ0gsdUJBQU8sSUFBUDtBQUNIO0FBQ0osUyxRQUlEVSxjLEdBQWlCLGlCQUFTO0FBQUEsZ0JBQ2ZDLGFBRGUsR0FDRSxNQUFLVixLQURQLENBQ2ZVLGFBRGU7OztBQUd0QkEsMEJBQWNULEtBQWQsRUFBcUJVLElBQXJCLENBQTBCLGdCQUF3QjtBQUFBLG9CQUF0QkMsSUFBc0IsUUFBdEJBLElBQXNCO0FBQUEsb0JBQWhCQyxVQUFnQixRQUFoQkEsVUFBZ0I7O0FBQzlDLG9CQUFJQSxhQUFhLENBQWpCLEVBQW9CO0FBQ2hCLDBCQUFLQyxRQUFMLENBQWMsRUFBQ1gsZ0JBQWdCLElBQWpCLEVBQXVCRCxhQUFhVSxJQUFwQyxFQUEwQ1IsT0FBTyxFQUFqRCxFQUFkO0FBQ0g7QUFDRCxzQkFBS1csSUFBTCxDQUFVQyxNQUFWLENBQWlCQyxTQUFqQixDQUEyQkMsTUFBM0IsQ0FBa0MsNkJBQWxDO0FBQ0Esc0JBQUtKLFFBQUwsQ0FBYyxFQUFDUixXQUFXLEtBQVosRUFBZDtBQUNILGFBTkQsRUFNR2EsS0FOSCxDQU1TLGVBQU87QUFDWixzQkFBS0osSUFBTCxDQUFVQyxNQUFWLENBQWlCQyxTQUFqQixDQUEyQkMsTUFBM0IsQ0FBa0MsNkJBQWxDO0FBQ0Esc0JBQUtKLFFBQUwsQ0FBYyxFQUFDVixPQUFPZ0IsS0FBS0MsU0FBTCxDQUFlQyxHQUFmLENBQVIsRUFBNkJoQixXQUFXLEtBQXhDLEVBQWQ7QUFDQSxzQkFBS1MsSUFBTCxDQUFVUSxhQUFWLENBQXdCTixTQUF4QixDQUFrQ08sR0FBbEMsQ0FBc0MsWUFBdEM7QUFDSCxhQVZEO0FBV0gsUyxRQUdEQyxhLEdBQWdCLGlCQUF1QjtBQUFBLGdCQUFaeEIsS0FBWSxTQUFyQnlCLE1BQXFCLENBQVp6QixLQUFZOztBQUNuQyxrQkFBS2EsUUFBTCxDQUFjLEVBQUNmLFlBQVlFLEtBQWIsRUFBZDtBQUNBLGdCQUFJQSxNQUFNMEIsSUFBTixPQUFpQixFQUFyQixFQUF5QjtBQUNyQixzQkFBS2IsUUFBTCxDQUFjLEVBQUNYLGdCQUFnQixLQUFqQixFQUFkO0FBQ0gsYUFGRCxNQUVPO0FBQ0gsc0JBQUtZLElBQUwsQ0FBVUMsTUFBVixDQUFpQkMsU0FBakIsQ0FBMkJPLEdBQTNCLENBQStCLDZCQUEvQjtBQUNBLHNCQUFLVixRQUFMLENBQWMsRUFBQ1IsV0FBVyxJQUFaLEVBQWQ7QUFDQSxzQkFBS3NCLHVCQUFMLENBQTZCM0IsS0FBN0I7QUFDQTtBQUNIO0FBQ0osUyxRQVVENEIsaUIsR0FBb0IsWUFBTTtBQUFBLGdCQUNmM0IsV0FEZSxHQUNBLE1BQUtKLEtBREwsQ0FDZkksV0FEZTs7QUFFdEIsZ0JBQU00QixpQkFBaUI1QixZQUFZNkIsR0FBWixDQUFnQjtBQUFBLG9CQUFFQyxHQUFGLFNBQUVBLEdBQUY7QUFBQSxvQkFBT0MsS0FBUCxTQUFPQSxLQUFQO0FBQUEsdUJBQWtCO0FBQUE7QUFBQSxzQkFBSSxLQUFLRCxHQUFULEVBQWMsYUFBYSxxQkFBQ0UsQ0FBRCxFQUFPO0FBQUMsa0NBQUtDLGFBQUwsQ0FBbUJGLEtBQW5CLEVBQTJCQyxFQUFFRSxjQUFGO0FBQW9CLHlCQUFsRixFQUFvRixjQUFXLFFBQS9GO0FBQTBHSDtBQUExRyxpQkFBbEI7QUFBQSxhQUFoQixDQUF2QjtBQUNBLG1CQUNJO0FBQUE7QUFBQSxrQkFBSSxLQUFJLGFBQVIsRUFBc0IsY0FBVyxTQUFqQztBQUNLSDtBQURMLGFBREo7QUFLSCxTLFFBR0RPLGMsR0FBaUIsYUFBSztBQUFBLDhCQUNpQixNQUFLdkMsS0FEdEI7QUFBQSxnQkFDWEssY0FEVyxlQUNYQSxjQURXO0FBQUEsZ0JBQ0tFLFFBREwsZUFDS0EsUUFETDtBQUFBLDhCQUVrQixNQUFLTCxLQUZ2QjtBQUFBLGdCQUVYc0MsV0FGVyxlQUVYQSxXQUZXO0FBQUEsZ0JBRUVDLFlBRkYsZUFFRUEsWUFGRjs7QUFHbEIsa0JBQUt6QixRQUFMLENBQWMsRUFBQ1QsVUFBVSxDQUFDLE1BQUtQLEtBQUwsQ0FBV08sUUFBdkIsRUFBZDtBQUNBLGdCQUFJRixrQkFBa0IsQ0FBQ21DLFdBQW5CLElBQWtDakMsYUFBYSxLQUFuRCxFQUEwRDtBQUN0RCxzQkFBS1MsUUFBTCxDQUFjLEVBQUNYLGdCQUFnQixLQUFqQixFQUFkO0FBQ0g7QUFDRCxnQkFBSSxDQUFDQSxjQUFELElBQW1CK0IsRUFBRVIsTUFBRixDQUFTekIsS0FBVCxDQUFlMEIsSUFBZixPQUEwQixFQUE3QyxJQUFtRFksWUFBbkQsSUFBbUVsQyxhQUFhLEtBQXBGLEVBQTJGO0FBQ3ZGO0FBQ0Esc0JBQUtJLGNBQUwsQ0FBb0IsRUFBcEI7QUFDSDtBQUNELG1CQUFPLElBQVA7QUFDSCxTOzs7bUNBbkZEK0IseUIsNkNBQW1DO0FBQUEsWUFBUnBDLEtBQVEsU0FBUkEsS0FBUTs7QUFDL0IsWUFBSUEsS0FBSixFQUFXO0FBQ1AsaUJBQUtVLFFBQUwsQ0FBYyxFQUFDVixPQUFPQSxLQUFSLEVBQWQ7QUFDSDtBQUNKLEs7O21DQUVEcUMsaUIsZ0NBQW9CO0FBQUEsWUFDVEMsWUFEUyxHQUNPLEtBQUsxQyxLQURaLENBQ1QwQyxZQURTOztBQUVoQixhQUFLZCx1QkFBTCxHQUErQix3QkFBUyxLQUFLbkIsY0FBZCxFQUE4QmlDLFlBQTlCLENBQS9CO0FBQ0gsSzs7QUFFRDs7O0FBVUE7QUFDQTs7O0FBaUJBOzs7QUFhQTttQ0FDQVAsYSwwQkFBY2xDLEssRUFBTztBQUNqQixhQUFLYyxJQUFMLENBQVU0QixTQUFWLENBQW9CMUMsS0FBcEIsR0FBNEJBLEtBQTVCO0FBQ0EsYUFBS2EsUUFBTCxDQUFjLEVBQUNmLFlBQVlFLEtBQWIsRUFBb0JFLGdCQUFnQixLQUFwQyxFQUEyQ0QsYUFBYSxFQUF4RCxFQUFkO0FBQ0EsZUFBT0QsS0FBUDtBQUNILEs7O0FBRUQ7OztBQVdBOzs7QUFlQTttQ0FDQTJDLE0scUJBQVM7QUFBQSxxQkFDcUQsS0FBSzlDLEtBRDFEO0FBQUEsWUFDRUMsVUFERixVQUNFQSxVQURGO0FBQUEsWUFDY0ksY0FEZCxVQUNjQSxjQURkO0FBQUEsWUFDOEJFLFFBRDlCLFVBQzhCQSxRQUQ5QjtBQUFBLFlBQ3dDQyxTQUR4QyxVQUN3Q0EsU0FEeEM7OztBQUdMLFlBQU11QyxrQkFBa0Isb0NBQVksS0FBSzdDLEtBQWpCLENBQXhCO0FBSEsscUJBSXdCLEtBQUtBLEtBSjdCO0FBQUEsWUFJRThDLFdBSkYsVUFJRUEsV0FKRjtBQUFBLFlBSWUxQyxLQUpmLFVBSWVBLEtBSmY7OztBQU1MeUMsd0JBQWdCNUMsS0FBaEIsR0FBd0JGLGVBQWVTLFNBQWYsSUFBNEJULGVBQWUsSUFBM0MsR0FBa0QsRUFBbEQsR0FBdURBLFVBQS9FO0FBQ0E4Qyx3QkFBZ0JFLE9BQWhCLEdBQTBCLEtBQUtWLGNBQS9CO0FBQ0FRLHdCQUFnQkcsUUFBaEIsR0FBMkIsS0FBS3ZCLGFBQWhDO0FBQ0FvQix3QkFBZ0JJLE1BQWhCLEdBQXlCLEtBQUtaLGNBQTlCO0FBQ0EsWUFBTWEsMEJBQWlCTCxlQUFqQixDQUFOOztBQUVBLGVBQ0k7QUFBQTtBQUFBLGNBQUssY0FBVyxrQkFBaEI7QUFDSTtBQUFBO0FBQUEsa0JBQUssK0NBQTRDekMsUUFBUSxhQUFSLEdBQXdCLEVBQXBFLENBQUwsRUFBK0UsS0FBSSxlQUFuRjtBQUNJLHVEQUFLLGNBQVcsU0FBaEIsRUFBMEIsZ0JBQWNFLFNBQXhDLEVBQW1ELFdBQVUsOEJBQTdELEVBQTRGLEtBQUksUUFBaEcsR0FESjtBQUVJLGtFQUFPLFdBQVUsc0JBQWpCLEVBQXdDLE1BQUssTUFBN0MsRUFBb0QsS0FBSSxXQUF4RCxJQUF3RTRDLFVBQXhFLEVBRko7QUFHSTtBQUFBO0FBQUEsc0JBQU8sV0FBVSxzQkFBakI7QUFBeUMseUJBQUtDLElBQUwsQ0FBVUwsV0FBVjtBQUF6QyxpQkFISjtBQUlJO0FBQUE7QUFBQSxzQkFBTSxXQUFVLHNCQUFoQixFQUF1QyxLQUFJLGNBQTNDO0FBQTJELHlCQUFLSyxJQUFMLENBQVUvQyxLQUFWO0FBQTNEO0FBSkosYUFESjtBQU9LRCw4QkFBa0JFLFFBQWxCLElBQ0csS0FBS3dCLGlCQUFMO0FBUlIsU0FESjtBQWFILEs7Ozs7QUFsTENoQyxvQixDQUNLdUQsWSxHQUFlO0FBQ2xCTixpQkFBYSxnQkFESztBQUVsQlIsaUJBQWEsS0FGSztBQUdsQkMsa0JBQWMsS0FISTtBQUlsQkcsa0JBQWM7QUFKSSxDO0FBRHBCN0Msb0IsQ0FRS3dELFMsR0FBWTtBQUNmOzs7O0FBSUEzQyxtQkFBZSxpQkFBVTRDLElBQVYsQ0FBZUMsVUFMZjs7QUFPZjs7OztBQUlBdEQsV0FBTyxpQkFBVXVELE1BWEY7O0FBYWY7Ozs7QUFJQVIsY0FBVSxpQkFBVU0sSUFqQkw7O0FBbUJmOzs7O0FBSUFsRCxXQUFPLGlCQUFVb0QsTUF2QkY7O0FBeUJmOzs7O0FBSUFWLGlCQUFhLGlCQUFVVSxNQTdCUjs7QUErQmY7Ozs7QUFJQWxCLGlCQUFhLGlCQUFVbUIsSUFuQ1I7O0FBcUNmOzs7O0FBSUFsQixrQkFBYyxpQkFBVWtCLElBekNUOztBQTJDZjs7OztBQUlBZixrQkFBYyxpQkFBVWdCLE1BQVYsQ0FBaUJIO0FBL0NoQixDO2tCQTZLUjFELG9CIiwiZmlsZSI6ImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgUHJvcFR5cGVzfSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBDb21wb25lbnRCYXNlQmVoYXZpb3VyIGZyb20gJy4uLy4uLy4uL2JlaGF2aW91cnMvY29tcG9uZW50LWJhc2UnO1xyXG5pbXBvcnQgTURCZWhhdmlvdXIgZnJvbSAnLi4vLi4vLi4vYmVoYXZpb3Vycy9tYXRlcmlhbCc7XHJcbmltcG9ydCBmaWx0ZXJQcm9wcyBmcm9tICcuLi8uLi8uLi91dGlscy9maWx0ZXItaHRtbC1hdHRyaWJ1dGVzJztcclxuXHJcbmltcG9ydCBkZWJvdW5jZSBmcm9tICdsb2Rhc2gvZnVuY3Rpb24vZGVib3VuY2UnO1xyXG5cclxuQE1EQmVoYXZpb3VyKCdtYXRlcmlhbElucHV0JylcclxuQE1EQmVoYXZpb3VyKCdsb2FkZXInKVxyXG5AQ29tcG9uZW50QmFzZUJlaGF2aW91clxyXG5jbGFzcyBBdXRvY29tcGxldGVUZXh0RWRpdCBleHRlbmRzIENvbXBvbmVudCB7XHJcbiAgICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xyXG4gICAgICAgIHBsYWNlaG9sZGVyOiAnU2VhcmNoIGhlcmUuLi4nLFxyXG4gICAgICAgIHNob3dBdEZvY3VzOiBmYWxzZSxcclxuICAgICAgICBlbXB0eVNob3dBbGw6IGZhbHNlLFxyXG4gICAgICAgIGlucHV0VGltZW91dDogMjAwXHJcbiAgICB9O1xyXG5cclxuICAgIHN0YXRpYyBwcm9wVHlwZXMgPSB7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgKiBSZXR1cm5zIGEgcHJvbWlzZSB3aGljaCBpcyBjb25uZWN0ZWQgdG8gdGhlIHdlYiBzZXJ2aWNlLlxyXG4gICAgICAgICogQHR5cGUge0Z1bmN0aW9ufVxyXG4gICAgICAgICovXHJcbiAgICAgICAgcXVlcnlTZWFyY2hlcjogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgKiBGaWVsZCB2YWx1ZS5cclxuICAgICAgICAqIEB0eXBlIHtTdHJpbmd9XHJcbiAgICAgICAgKi9cclxuICAgICAgICB2YWx1ZTogUHJvcFR5cGVzLnN0cmluZyxcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgKiBMYXVuY2hlcyB0aGUgcXVlcnlTZWFyY2hlci5cclxuICAgICAgICAqIEB0eXBlIHtGdW5jdGlvbn1cclxuICAgICAgICAqL1xyXG4gICAgICAgIG9uQ2hhbmdlOiBQcm9wVHlwZXMuZnVuYyxcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgKiBFcnJvciBzaG93ZWQgbWVzc2FnZS5cclxuICAgICAgICAqIEB0eXBlIHtTdHJpbmd9XHJcbiAgICAgICAgKi9cclxuICAgICAgICBlcnJvcjogUHJvcFR5cGVzLnN0cmluZyxcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgKiBQbGFjZWhvbGRlciBmaWVsZC5cclxuICAgICAgICAqIEB0eXBlIHtTdHJpbmd9XHJcbiAgICAgICAgKi9cclxuICAgICAgICBwbGFjZWhvbGRlcjogUHJvcFR5cGVzLnN0cmluZyxcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgKiBEZWZpbmVzIGl0IHNob3dzIHN1Z2dlc3Rpb25zIG9uIGZvY3VzLlxyXG4gICAgICAgICogQHR5cGUge0Jvb2xlYW59XHJcbiAgICAgICAgKi9cclxuICAgICAgICBzaG93QXRGb2N1czogUHJvcFR5cGVzLmJvb2wsXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICogRGVmaW5lcyBpZiBpdCBzaG93cyBzdWdnZXN0aW9ucyBvbiBmb2N1cyB3aGVuIHRoZSBpbnB1dCBpcyBlbXB0eS5cclxuICAgICAgICAqIEB0eXBlIHtCb29sZWFufVxyXG4gICAgICAgICovXHJcbiAgICAgICAgZW1wdHlTaG93QWxsOiBQcm9wVHlwZXMuYm9vbCxcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgKiBbaW5wdXRUaW1lb3V0IGRlc2NyaXB0aW9uXVxyXG4gICAgICAgICogQHR5cGUge251bWJlcn1cclxuICAgICAgICAqL1xyXG4gICAgICAgIGlucHV0VGltZW91dDogUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkXHJcbiAgICB9O1xyXG5cclxuICAgIHN0YXRlID0ge1xyXG4gICAgICAgIGlucHV0VmFsdWU6IHRoaXMucHJvcHMudmFsdWUsXHJcbiAgICAgICAgc3VnZ2VzdGlvbnM6IFtdLFxyXG4gICAgICAgIGhhc1N1Z2dlc3Rpb25zOiBmYWxzZSxcclxuICAgICAgICBlcnJvcjogdGhpcy5wcm9wcy5lcnJvcixcclxuICAgICAgICBoYXNGb2N1czogZmFsc2UsXHJcbiAgICAgICAgaXNMb2FkaW5nOiBmYWxzZVxyXG4gICAgfTtcclxuXHJcbiAgICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKHtlcnJvcn0pIHtcclxuICAgICAgICBpZiAoZXJyb3IpIHtcclxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7ZXJyb3I6IGVycm9yfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xyXG4gICAgICAgIGNvbnN0IHtpbnB1dFRpbWVvdXR9ID0gdGhpcy5wcm9wcztcclxuICAgICAgICB0aGlzLl9kZWJvdW5jZWRRdWVyeVNlYXJjaGVyID0gZGVib3VuY2UodGhpcy5fcXVlcnlTZWFyY2hlciwgaW5wdXRUaW1lb3V0KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBSZXR1cm5zIHRoZSBzdGF0ZSdzIGlucHV0VmFsdWVcclxuICAgIGdldFZhbHVlID0gKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHtpbnB1dFZhbHVlfSA9IHRoaXMuc3RhdGU7XHJcbiAgICAgICAgaWYgKGlucHV0VmFsdWUgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gaW5wdXRWYWx1ZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIC8vIEdldHMgdGhlIGRlZmluZWQgcHJvcHMnIHF1ZXJ5U2VhcmNoIGFuZCByZXR1cm5zIHRoZSBvYmplY3QgZ2l2ZW4gYnkgdGhlIHByb21pc2VcclxuICAgIC8vIFNldHMgdGhlIGhhc1N1Z2dlc3Rpb25zJyBzdGF0ZSBpZiB0aGUgZ2l2ZW4gb2JqZWN0IGhhcyBhIG5vbmUgZW1wdHkgYXJyYXlcclxuICAgIF9xdWVyeVNlYXJjaGVyID0gdmFsdWUgPT4ge1xyXG4gICAgICAgIGNvbnN0IHtxdWVyeVNlYXJjaGVyfSA9IHRoaXMucHJvcHM7XHJcblxyXG4gICAgICAgIHF1ZXJ5U2VhcmNoZXIodmFsdWUpLnRoZW4oKHtkYXRhLCB0b3RhbENvdW50fSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAodG90YWxDb3VudCA+IDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2hhc1N1Z2dlc3Rpb25zOiB0cnVlLCBzdWdnZXN0aW9uczogZGF0YSwgZXJyb3I6ICcnfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5yZWZzLmxvYWRlci5jbGFzc0xpc3QucmVtb3ZlKCdtZGwtcHJvZ3Jlc3NfX2luZGV0ZXJtaW5hdGUnKTtcclxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7aXNMb2FkaW5nOiBmYWxzZX0pO1xyXG4gICAgICAgIH0pLmNhdGNoKGVyciA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMucmVmcy5sb2FkZXIuY2xhc3NMaXN0LnJlbW92ZSgnbWRsLXByb2dyZXNzX19pbmRldGVybWluYXRlJyk7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2Vycm9yOiBKU09OLnN0cmluZ2lmeShlcnIpLCBpc0xvYWRpbmc6IGZhbHNlfSk7XHJcbiAgICAgICAgICAgIHRoaXMucmVmcy5tYXRlcmlhbElucHV0LmNsYXNzTGlzdC5hZGQoJ2lzLWludmFsaWQnKTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgLy8gU2V0cyB0aGUgc3RhdGUncyBpbnB1dFZhbHVlIHdoZW4gdGhlIHVzZXIgaXMgdHlwaW5nXHJcbiAgICBvblF1ZXJ5Q2hhbmdlID0gKHt0YXJnZXQ6IHt2YWx1ZX19KSA9PiB7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7aW5wdXRWYWx1ZTogdmFsdWV9KTtcclxuICAgICAgICBpZiAodmFsdWUudHJpbSgpID09PSAnJykge1xyXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtoYXNTdWdnZXN0aW9uczogZmFsc2V9KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnJlZnMubG9hZGVyLmNsYXNzTGlzdC5hZGQoJ21kbC1wcm9ncmVzc19faW5kZXRlcm1pbmF0ZScpO1xyXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtpc0xvYWRpbmc6IHRydWV9KTtcclxuICAgICAgICAgICAgdGhpcy5fZGVib3VuY2VkUXVlcnlTZWFyY2hlcih2YWx1ZSk7XHJcbiAgICAgICAgICAgIC8vIHRoaXMuX3F1ZXJ5U2VhcmNoZXIodmFsdWUpOyBcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIC8vIFNldHMgdGhlIHZhbHVlIGlucHV0IHdpdGggdGhlIHNlbGVjdGVkIHN1Z2dlc3Rpb24gYW5kIGhpZGVzIHRoZSBkcm9wZG93blxyXG4gICAgb25SZXN1bHRDbGljayh2YWx1ZSkge1xyXG4gICAgICAgIHRoaXMucmVmcy5pbnB1dFRleHQudmFsdWUgPSB2YWx1ZTtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHtpbnB1dFZhbHVlOiB2YWx1ZSwgaGFzU3VnZ2VzdGlvbnM6IGZhbHNlLCBzdWdnZXN0aW9uczogW119KTtcclxuICAgICAgICByZXR1cm4gdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gUmV0dXJucyBhbiBodG1sIGxpc3Qgd2hpdGggdGhlIFN1Z2dlc3Rpb25zXHJcbiAgICByZW5kZXJTdWdnZXN0aW9ucyA9ICgpID0+IHtcclxuICAgICAgICBjb25zdCB7c3VnZ2VzdGlvbnN9ID0gdGhpcy5zdGF0ZTtcclxuICAgICAgICBjb25zdCBhbGxTdWdnZXN0aW9ucyA9IHN1Z2dlc3Rpb25zLm1hcCgoe2tleSwgbGFiZWx9KSA9PiA8bGkga2V5PXtrZXl9IG9uTW91c2VEb3duPXsoZSkgPT4ge3RoaXMub25SZXN1bHRDbGljayhsYWJlbCk7IGUucHJldmVudERlZmF1bHQoKTt9fSBkYXRhLWZvY3VzPSdvcHRpb24nID57bGFiZWx9PC9saT4pO1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDx1bCByZWY9J3N1Z2dlc3Rpb25zJyBkYXRhLWZvY3VzPSdvcHRpb25zJz5cclxuICAgICAgICAgICAgICAgIHthbGxTdWdnZXN0aW9uc31cclxuICAgICAgICAgICAgPC91bD5cclxuICAgICAgICApO1xyXG4gICAgfTtcclxuXHJcbiAgICAvLyBCZWhhdmlvdXIgd2hlbiBvbkZvY3VzIGFuZCBvbkJsdXIgYXJlIHRyaWdnZXJlZFxyXG4gICAgdG9nZ2xlSGFzRm9jdXMgPSBlID0+IHtcclxuICAgICAgICBjb25zdCB7aGFzU3VnZ2VzdGlvbnMsIGhhc0ZvY3VzfSA9IHRoaXMuc3RhdGU7XHJcbiAgICAgICAgY29uc3Qge3Nob3dBdEZvY3VzLCBlbXB0eVNob3dBbGx9ID0gdGhpcy5wcm9wcztcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHtoYXNGb2N1czogIXRoaXMuc3RhdGUuaGFzRm9jdXN9KTtcclxuICAgICAgICBpZiAoaGFzU3VnZ2VzdGlvbnMgJiYgIXNob3dBdEZvY3VzICYmIGhhc0ZvY3VzID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtoYXNTdWdnZXN0aW9uczogZmFsc2V9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCFoYXNTdWdnZXN0aW9ucyAmJiBlLnRhcmdldC52YWx1ZS50cmltKCkgPT09ICcnICYmIGVtcHR5U2hvd0FsbCAmJiBoYXNGb2N1cyA9PT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgLy8gRG9pbmcgYSBnbG9iYWwgc2VhcmNoIGhlcmVcclxuICAgICAgICAgICAgdGhpcy5fcXVlcnlTZWFyY2hlcignJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfTtcclxuXHJcbiAgICAvLyBNYXliZSBnaXZlIHRoZSBvcHRpb24gZm9yIHRoZSBmbG9hdGluZyBsYWJlbFxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIGNvbnN0IHtpbnB1dFZhbHVlLCBoYXNTdWdnZXN0aW9ucywgaGFzRm9jdXMsIGlzTG9hZGluZ30gPSB0aGlzLnN0YXRlO1xyXG5cclxuICAgICAgICBjb25zdCB2YWxpZElucHV0UHJvcHMgPSBmaWx0ZXJQcm9wcyh0aGlzLnByb3BzKTtcclxuICAgICAgICBjb25zdCB7cGxhY2Vob2xkZXIsIGVycm9yfSA9IHRoaXMucHJvcHM7XHJcblxyXG4gICAgICAgIHZhbGlkSW5wdXRQcm9wcy52YWx1ZSA9IGlucHV0VmFsdWUgPT09IHVuZGVmaW5lZCB8fCBpbnB1dFZhbHVlID09PSBudWxsID8gJycgOiBpbnB1dFZhbHVlO1xyXG4gICAgICAgIHZhbGlkSW5wdXRQcm9wcy5vbkZvY3VzID0gdGhpcy50b2dnbGVIYXNGb2N1cztcclxuICAgICAgICB2YWxpZElucHV0UHJvcHMub25DaGFuZ2UgPSB0aGlzLm9uUXVlcnlDaGFuZ2U7XHJcbiAgICAgICAgdmFsaWRJbnB1dFByb3BzLm9uQmx1ciA9IHRoaXMudG9nZ2xlSGFzRm9jdXM7XHJcbiAgICAgICAgY29uc3QgaW5wdXRQcm9wcyA9IHsuLi52YWxpZElucHV0UHJvcHN9O1xyXG5cclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2IGRhdGEtZm9jdXM9J2F1dG9jb21wbGV0ZVRleHQnPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e2BtZGwtdGV4dGZpZWxkIG1kbC1qcy10ZXh0ZmllbGQke2Vycm9yID8gJyBpcy1pbnZhbGlkJyA6ICcnfWB9IHJlZj0nbWF0ZXJpYWxJbnB1dCc+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBkYXRhLWZvY3VzPSdsb2FkaW5nJyBkYXRhLWxvYWRpbmc9e2lzTG9hZGluZ30gY2xhc3NOYW1lPSdtZGwtcHJvZ3Jlc3MgbWRsLWpzLXByb2dyZXNzJyByZWY9J2xvYWRlcicvPlxyXG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCBjbGFzc05hbWU9J21kbC10ZXh0ZmllbGRfX2lucHV0JyB0eXBlPSd0ZXh0JyByZWY9J2lucHV0VGV4dCcgey4uLmlucHV0UHJvcHN9IC8+XHJcbiAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT0nbWRsLXRleHRmaWVsZF9fbGFiZWwnPnt0aGlzLmkxOG4ocGxhY2Vob2xkZXIpfTwvbGFiZWw+XHJcbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPSdtZGwtdGV4dGZpZWxkX19lcnJvcicgcmVmPSdlcnJvck1lc3NhZ2UnPnt0aGlzLmkxOG4oZXJyb3IpfTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAge2hhc1N1Z2dlc3Rpb25zICYmIGhhc0ZvY3VzICYmXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJTdWdnZXN0aW9ucygpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEF1dG9jb21wbGV0ZVRleHRFZGl0O1xyXG4iXX0=