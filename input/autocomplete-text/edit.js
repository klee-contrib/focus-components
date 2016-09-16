'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _dec, _class;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _i18next = require('i18next');

var _i18next2 = _interopRequireDefault(_i18next);

var _material = require('../../behaviours/material');

var _material2 = _interopRequireDefault(_material);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var AutocompleteTextEdit = (_dec = (0, _material2.default)('materialInput', 'loader'), _dec(_class = function (_Component) {
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
                var data = _ref.data;
                var totalCount = _ref.totalCount;

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
                _this._querySearcher(value);
            }
        }, _this.renderSuggestions = function () {
            var suggestions = _this.state.suggestions;

            var allSuggestions = suggestions.map(function (_ref3) {
                var key = _ref3.key;
                var label = _ref3.label;
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
            var _this$state = _this.state;
            var hasSuggestions = _this$state.hasSuggestions;
            var hasFocus = _this$state.hasFocus;
            var _this$props = _this.props;
            var showAtFocus = _this$props.showAtFocus;
            var emptyShowAll = _this$props.emptyShowAll;

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
        var _state = this.state;
        var inputValue = _state.inputValue;
        var hasSuggestions = _state.hasSuggestions;
        var hasFocus = _state.hasFocus;
        var isLoading = _state.isLoading;

        var otherProps = _objectWithoutProperties(_state, ['inputValue', 'hasSuggestions', 'hasFocus', 'isLoading']);

        var _props = this.props;
        var placeholder = _props.placeholder;
        var showAtFocus = _props.showAtFocus;
        var emptyShowAll = _props.emptyShowAll;
        var error = _props.error;

        return _react2.default.createElement(
            'div',
            { 'data-focus': 'autocompleteText' },
            _react2.default.createElement(
                'div',
                { className: 'mdl-textfield mdl-js-textfield' + (error ? ' is-invalid' : ''), ref: 'materialInput' },
                _react2.default.createElement('div', { 'data-focus': 'loading', 'data-loading': isLoading, className: 'mdl-progress mdl-js-progress', ref: 'loader' }),
                _react2.default.createElement('input', _extends({ onFocus: this.toggleHasFocus, onBlur: this.toggleHasFocus, className: 'mdl-textfield__input', type: 'text', value: inputValue, ref: 'inputText', onChange: this.onQueryChange.bind(this), showAtFocus: showAtFocus, emptyShowAll: emptyShowAll }, otherProps)),
                _react2.default.createElement(
                    'label',
                    { className: 'mdl-textfield__label' },
                    _i18next2.default.t(placeholder)
                ),
                _react2.default.createElement(
                    'span',
                    { className: 'mdl-textfield__error', ref: 'errorMessage' },
                    _i18next2.default.t(error)
                )
            ),
            hasSuggestions && hasFocus && this.renderSuggestions()
        );
    };

    return AutocompleteTextEdit;
}(_react.Component)) || _class);
AutocompleteTextEdit.defaultProps = {
    placeholder: 'Search here...',
    showAtFocus: false,
    emptyShowAll: false
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
    emptyShowAll: _react.PropTypes.bool
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZyLUZSLmpzIl0sIm5hbWVzIjpbIkF1dG9jb21wbGV0ZVRleHRFZGl0Iiwic3RhdGUiLCJpbnB1dFZhbHVlIiwicHJvcHMiLCJ2YWx1ZSIsInN1Z2dlc3Rpb25zIiwiaGFzU3VnZ2VzdGlvbnMiLCJlcnJvciIsImhhc0ZvY3VzIiwiaXNMb2FkaW5nIiwiZ2V0VmFsdWUiLCJ1bmRlZmluZWQiLCJfcXVlcnlTZWFyY2hlciIsInF1ZXJ5U2VhcmNoZXIiLCJ0aGVuIiwiZGF0YSIsInRvdGFsQ291bnQiLCJzZXRTdGF0ZSIsInJlZnMiLCJsb2FkZXIiLCJjbGFzc0xpc3QiLCJyZW1vdmUiLCJjYXRjaCIsIkpTT04iLCJzdHJpbmdpZnkiLCJlcnIiLCJtYXRlcmlhbElucHV0IiwiYWRkIiwib25RdWVyeUNoYW5nZSIsInRhcmdldCIsInRyaW0iLCJyZW5kZXJTdWdnZXN0aW9ucyIsImFsbFN1Z2dlc3Rpb25zIiwibWFwIiwia2V5IiwibGFiZWwiLCJlIiwib25SZXN1bHRDbGljayIsInByZXZlbnREZWZhdWx0IiwidG9nZ2xlSGFzRm9jdXMiLCJzaG93QXRGb2N1cyIsImVtcHR5U2hvd0FsbCIsImNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMiLCJpbnB1dFRleHQiLCJyZW5kZXIiLCJvdGhlclByb3BzIiwicGxhY2Vob2xkZXIiLCJ0IiwiZGVmYXVsdFByb3BzIiwicHJvcFR5cGVzIiwiZnVuYyIsImlzUmVxdWlyZWQiLCJzdHJpbmciLCJvbkNoYW5nZSIsImJvb2wiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztJQUdNQSxvQixXQURMLHdCQUFZLGVBQVosRUFBNkIsUUFBN0IsQztjQUNLQSxvQjs7YUFBQUEsb0I7Ozs4QkFBQUEsb0I7Ozs7OztnSkFtREZDLEssR0FBUTtBQUNKQyx3QkFBWSxNQUFLQyxLQUFMLENBQVdDLEtBRG5CO0FBRUpDLHlCQUFhLEVBRlQ7QUFHSkMsNEJBQWdC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QkFBTDtBQVJSLFNBREo7QUFhSCxLOztXQS9KQy9CLG9COztBQUFBQSxvQixDQUNLZ0QsWSxHQUFlO0FBQ2xCRixpQkFBYSxnQkFESztBQUVsQk4saUJBQWEsS0FGSztBQUdsQkMsa0JBQWM7QUFISSxDO0FBRHBCekMsb0IsQ0FPS2lELFMsR0FBWTtBQUNmOzs7O0FBSUFwQyxtQkFBZSxpQkFBVXFDLElBQVYsQ0FBZUMsVUFMZjs7QUFPZjs7OztBQUlBL0MsV0FBTyxpQkFBVWdELE1BWEY7O0FBYWY7Ozs7QUFJQUMsY0FBVSxpQkFBVUgsSUFqQkw7O0FBbUJmOzs7O0FBSUEzQyxXQUFPLGlCQUFVNkMsTUF2QkY7O0FBeUJmOzs7O0FBSUFOLGlCQUFhLGlCQUFVTSxNQTdCUjs7QUErQmY7Ozs7QUFJQVosaUJBQWEsaUJBQVVjLElBbkNSOztBQXFDZjs7OztBQUlBYixrQkFBYyxpQkFBVWE7QUF6Q1QsQztrQkEySlJ0RCxvQjs7QUFHZiIsImZpbGUiOiJmci1GUi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgUHJvcFR5cGVzfSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBSZWFjdERPTSBmcm9tICdyZWFjdC1kb20nO1xyXG5pbXBvcnQgaTE4bmV4dCBmcm9tICdpMThuZXh0JztcclxuaW1wb3J0IE1EQmVoYXZpb3VyIGZyb20gJy4uLy4uL2JlaGF2aW91cnMvbWF0ZXJpYWwnO1xyXG5cclxuQE1EQmVoYXZpb3VyKCdtYXRlcmlhbElucHV0JywgJ2xvYWRlcicpXHJcbmNsYXNzIEF1dG9jb21wbGV0ZVRleHRFZGl0IGV4dGVuZHMgQ29tcG9uZW50IHtcclxuICAgIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XHJcbiAgICAgICAgcGxhY2Vob2xkZXI6ICdTZWFyY2ggaGVyZS4uLicsXHJcbiAgICAgICAgc2hvd0F0Rm9jdXM6IGZhbHNlLFxyXG4gICAgICAgIGVtcHR5U2hvd0FsbDogZmFsc2VcclxuICAgIH07XHJcblxyXG4gICAgc3RhdGljIHByb3BUeXBlcyA9IHtcclxuICAgICAgICAvKipcclxuICAgICAgICAqIFJldHVybnMgYSBwcm9taXNlIHdoaWNoIGlzIGNvbm5lY3RlZCB0byB0aGUgd2ViIHNlcnZpY2UuXHJcbiAgICAgICAgKiBAdHlwZSB7RnVuY3Rpb259XHJcbiAgICAgICAgKi9cclxuICAgICAgICBxdWVyeVNlYXJjaGVyOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAqIEZpZWxkIHZhbHVlLlxyXG4gICAgICAgICogQHR5cGUge1N0cmluZ31cclxuICAgICAgICAqL1xyXG4gICAgICAgIHZhbHVlOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAqIExhdW5jaGVzIHRoZSBxdWVyeVNlYXJjaGVyLlxyXG4gICAgICAgICogQHR5cGUge0Z1bmN0aW9ufVxyXG4gICAgICAgICovXHJcbiAgICAgICAgb25DaGFuZ2U6IFByb3BUeXBlcy5mdW5jLFxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAqIEVycm9yIHNob3dlZCBtZXNzYWdlLlxyXG4gICAgICAgICogQHR5cGUge1N0cmluZ31cclxuICAgICAgICAqL1xyXG4gICAgICAgIGVycm9yOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAqIFBsYWNlaG9sZGVyIGZpZWxkLlxyXG4gICAgICAgICogQHR5cGUge1N0cmluZ31cclxuICAgICAgICAqL1xyXG4gICAgICAgIHBsYWNlaG9sZGVyOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAqIERlZmluZXMgaXQgc2hvd3Mgc3VnZ2VzdGlvbnMgb24gZm9jdXMuXHJcbiAgICAgICAgKiBAdHlwZSB7Qm9vbGVhbn1cclxuICAgICAgICAqL1xyXG4gICAgICAgIHNob3dBdEZvY3VzOiBQcm9wVHlwZXMuYm9vbCxcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgKiBEZWZpbmVzIGlmIGl0IHNob3dzIHN1Z2dlc3Rpb25zIG9uIGZvY3VzIHdoZW4gdGhlIGlucHV0IGlzIGVtcHR5LlxyXG4gICAgICAgICogQHR5cGUge0Jvb2xlYW59XHJcbiAgICAgICAgKi9cclxuICAgICAgICBlbXB0eVNob3dBbGw6IFByb3BUeXBlcy5ib29sXHJcbiAgICB9O1xyXG5cclxuICAgIHN0YXRlID0ge1xyXG4gICAgICAgIGlucHV0VmFsdWU6IHRoaXMucHJvcHMudmFsdWUsXHJcbiAgICAgICAgc3VnZ2VzdGlvbnM6IFtdLFxyXG4gICAgICAgIGhhc1N1Z2dlc3Rpb25zOiBmYWxzZSxcclxuICAgICAgICBlcnJvcjogdGhpcy5wcm9wcy5lcnJvcixcclxuICAgICAgICBoYXNGb2N1czogZmFsc2UsXHJcbiAgICAgICAgaXNMb2FkaW5nOiBmYWxzZVxyXG4gICAgfTtcclxuXHJcbiAgICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKHtlcnJvcn0pIHtcclxuICAgICAgICBpZihlcnJvcikge1xyXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtlcnJvcjogZXJyb3J9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gUmV0dXJucyB0aGUgc3RhdGUncyBpbnB1dFZhbHVlXHJcbiAgICBnZXRWYWx1ZSA9ICgpID0+ICB7XHJcbiAgICAgICAgY29uc3Qge2lucHV0VmFsdWV9ID0gdGhpcy5zdGF0ZTtcclxuICAgICAgICBpZihpbnB1dFZhbHVlICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGlucHV0VmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIC8vIEdldHMgdGhlIGRlZmluZWQgcHJvcHMnIHF1ZXJ5U2VhcmNoIGFuZCByZXR1cm5zIHRoZSBvYmplY3QgZ2l2ZW4gYnkgdGhlIHByb21pc2VcclxuICAgIC8vIFNldHMgdGhlIGhhc1N1Z2dlc3Rpb25zJyBzdGF0ZSBpZiB0aGUgZ2l2ZW4gb2JqZWN0IGhhcyBhIG5vbmUgZW1wdHkgYXJyYXlcclxuICAgIF9xdWVyeVNlYXJjaGVyID0gdmFsdWUgPT4ge1xyXG4gICAgICAgIGNvbnN0IHtxdWVyeVNlYXJjaGVyfSA9IHRoaXMucHJvcHM7XHJcbiAgICAgICAgY29uc3Qge2hhc1N1Z2dlc3Rpb25zfSA9IHRoaXMuc3RhdGU7XHJcblxyXG4gICAgICAgIHF1ZXJ5U2VhcmNoZXIodmFsdWUpLnRoZW4oKHtkYXRhLCB0b3RhbENvdW50fSkgPT4ge1xyXG4gICAgICAgICAgICBpZih0b3RhbENvdW50ID4gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7aGFzU3VnZ2VzdGlvbnM6IHRydWUsIHN1Z2dlc3Rpb25zOiBkYXRhLCBlcnJvcjogJyd9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnJlZnMubG9hZGVyLmNsYXNzTGlzdC5yZW1vdmUoJ21kbC1wcm9ncmVzc19faW5kZXRlcm1pbmF0ZScpO1xyXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtpc0xvYWRpbmc6IGZhbHNlfSk7XHJcbiAgICAgICAgfSkuY2F0Y2goZXJyID0+IHtcclxuICAgICAgICAgICAgdGhpcy5yZWZzLmxvYWRlci5jbGFzc0xpc3QucmVtb3ZlKCdtZGwtcHJvZ3Jlc3NfX2luZGV0ZXJtaW5hdGUnKTtcclxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7ZXJyb3I6IEpTT04uc3RyaW5naWZ5KGVyciksIGlzTG9hZGluZzogZmFsc2V9KTtcclxuICAgICAgICAgICAgdGhpcy5yZWZzLm1hdGVyaWFsSW5wdXQuY2xhc3NMaXN0LmFkZCgnaXMtaW52YWxpZCcpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcbiAgICAvLyBTZXRzIHRoZSBzdGF0ZSdzIGlucHV0VmFsdWUgd2hlbiB0aGUgdXNlciBpcyB0eXBpbmdcclxuICAgIG9uUXVlcnlDaGFuZ2UgPSAoe3RhcmdldDoge3ZhbHVlfX0pID0+IHtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHtpbnB1dFZhbHVlOiB2YWx1ZX0pO1xyXG4gICAgICAgIGlmKHZhbHVlLnRyaW0oKSA9PSAnJykge1xyXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtoYXNTdWdnZXN0aW9uczogZmFsc2V9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVmcy5sb2FkZXIuY2xhc3NMaXN0LmFkZCgnbWRsLXByb2dyZXNzX19pbmRldGVybWluYXRlJyk7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2lzTG9hZGluZzogdHJ1ZX0pO1xyXG4gICAgICAgICAgICB0aGlzLl9xdWVyeVNlYXJjaGVyKHZhbHVlKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIC8vIFNldHMgdGhlIHZhbHVlIGlucHV0IHdpdGggdGhlIHNlbGVjdGVkIHN1Z2dlc3Rpb24gYW5kIGhpZGVzIHRoZSBkcm9wZG93blxyXG4gICAgb25SZXN1bHRDbGljayh2YWx1ZSkge1xyXG4gICAgICAgIHRoaXMucmVmcy5pbnB1dFRleHQudmFsdWUgPSB2YWx1ZTtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHtpbnB1dFZhbHVlOiB2YWx1ZSwgaGFzU3VnZ2VzdGlvbnM6IGZhbHNlLCBzdWdnZXN0aW9uczogW119KTtcclxuICAgICAgICByZXR1cm4gdmFsdWU7XHJcbiAgICB9O1xyXG5cclxuICAgIC8vIFJldHVybnMgYW4gaHRtbCBsaXN0IHdoaXRoIHRoZSBTdWdnZXN0aW9uc1xyXG4gICAgcmVuZGVyU3VnZ2VzdGlvbnMgPSAoKSA9PiB7XHJcbiAgICAgICAgY29uc3Qge3N1Z2dlc3Rpb25zfSA9IHRoaXMuc3RhdGU7XHJcbiAgICAgICAgY29uc3QgYWxsU3VnZ2VzdGlvbnMgPSBzdWdnZXN0aW9ucy5tYXAoKHtrZXksIGxhYmVsfSkgPT4gPGxpIGtleT17a2V5fSBvbk1vdXNlRG93bj17KGUpID0+IHt0aGlzLm9uUmVzdWx0Q2xpY2sobGFiZWwpOyBlLnByZXZlbnREZWZhdWx0KCk7fX0gZGF0YS1mb2N1cz0nb3B0aW9uJyA+e2xhYmVsfTwvbGk+KTtcclxuICAgICAgICByZXR1cm4oXHJcbiAgICAgICAgICAgIDx1bCByZWY9J3N1Z2dlc3Rpb25zJyBkYXRhLWZvY3VzPSdvcHRpb25zJz5cclxuICAgICAgICAgICAgICAgIHthbGxTdWdnZXN0aW9uc31cclxuICAgICAgICAgICAgPC91bD5cclxuICAgICAgICApO1xyXG4gICAgfTtcclxuXHJcbiAgICAvLyBCZWhhdmlvdXIgd2hlbiBvbkZvY3VzIGFuZCBvbkJsdXIgYXJlIHRyaWdnZXJlZFxyXG4gICAgdG9nZ2xlSGFzRm9jdXMgPSBlID0+IHtcclxuICAgICAgICBjb25zdCB7aGFzU3VnZ2VzdGlvbnMsIGhhc0ZvY3VzfSA9IHRoaXMuc3RhdGU7XHJcbiAgICAgICAgY29uc3Qge3Nob3dBdEZvY3VzLCBlbXB0eVNob3dBbGx9ID0gdGhpcy5wcm9wcztcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHtoYXNGb2N1czogIXRoaXMuc3RhdGUuaGFzRm9jdXN9KTtcclxuICAgICAgICBpZihoYXNTdWdnZXN0aW9ucyAmJiAhc2hvd0F0Rm9jdXMgJiYgaGFzRm9jdXMgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2hhc1N1Z2dlc3Rpb25zOiBmYWxzZX0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZighaGFzU3VnZ2VzdGlvbnMgJiYgZS50YXJnZXQudmFsdWUudHJpbSgpID09PSAnJyAmJiBlbXB0eVNob3dBbGwgJiYgaGFzRm9jdXMgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgIC8vIERvaW5nIGEgZ2xvYmFsIHNlYXJjaCBoZXJlXHJcbiAgICAgICAgICAgIHRoaXMuX3F1ZXJ5U2VhcmNoZXIoJycpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH07XHJcblxyXG4gICAgLy8gTWF5YmUgZ2l2ZSB0aGUgb3B0aW9uIGZvciB0aGUgZmxvYXRpbmcgbGFiZWxcclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICBjb25zdCB7aW5wdXRWYWx1ZSwgaGFzU3VnZ2VzdGlvbnMsIGhhc0ZvY3VzLCBpc0xvYWRpbmcsIC4uLm90aGVyUHJvcHN9ID0gdGhpcy5zdGF0ZTtcclxuICAgICAgICBjb25zdCB7cGxhY2Vob2xkZXIsIHNob3dBdEZvY3VzLCBlbXB0eVNob3dBbGwsIGVycm9yfSA9IHRoaXMucHJvcHNcclxuICAgICAgICByZXR1cm4oXHJcbiAgICAgICAgICAgIDxkaXYgZGF0YS1mb2N1cz0nYXV0b2NvbXBsZXRlVGV4dCc+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17YG1kbC10ZXh0ZmllbGQgbWRsLWpzLXRleHRmaWVsZCR7ZXJyb3IgPyAnIGlzLWludmFsaWQnIDogJyd9YH0gcmVmPSdtYXRlcmlhbElucHV0Jz5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGRhdGEtZm9jdXM9J2xvYWRpbmcnIGRhdGEtbG9hZGluZz17aXNMb2FkaW5nfSBjbGFzc05hbWU9J21kbC1wcm9ncmVzcyBtZGwtanMtcHJvZ3Jlc3MnIHJlZj0nbG9hZGVyJy8+XHJcbiAgICAgICAgICAgICAgICAgICAgPGlucHV0IG9uRm9jdXM9e3RoaXMudG9nZ2xlSGFzRm9jdXN9IG9uQmx1cj17dGhpcy50b2dnbGVIYXNGb2N1c30gY2xhc3NOYW1lPSdtZGwtdGV4dGZpZWxkX19pbnB1dCcgdHlwZT0ndGV4dCcgdmFsdWU9e2lucHV0VmFsdWV9IHJlZj0naW5wdXRUZXh0JyBvbkNoYW5nZT17Ojp0aGlzLm9uUXVlcnlDaGFuZ2V9IHNob3dBdEZvY3VzPXtzaG93QXRGb2N1c30gZW1wdHlTaG93QWxsPXtlbXB0eVNob3dBbGx9IHsuLi5vdGhlclByb3BzfSAvPlxyXG4gICAgICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJtZGwtdGV4dGZpZWxkX19sYWJlbFwiPntpMThuZXh0LnQocGxhY2Vob2xkZXIpfTwvbGFiZWw+XHJcbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwibWRsLXRleHRmaWVsZF9fZXJyb3JcIiByZWY9J2Vycm9yTWVzc2FnZSc+e2kxOG5leHQudChlcnJvcil9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICB7aGFzU3VnZ2VzdGlvbnMgJiYgaGFzRm9jdXMgJiZcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbmRlclN1Z2dlc3Rpb25zKClcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQXV0b2NvbXBsZXRlVGV4dEVkaXQ7XHJcblxyXG5cclxuLypcclxuRVhBTVBMRVxyXG5jb25zdCBfcXVlcnlTZWFyY2hlciA9IHF1ZXJ5ID0+IHtcclxuICAgIGxldCBkYXRhID0gW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgICAga2V5OiAnSkwnLFxyXG4gICAgICAgICAgICBsYWJlbDogJ0pvaCBMaWNrZXVyJ1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBrZXk6ICdHSycsXHJcbiAgICAgICAgICAgIGxhYmVsOiAnR3XDqW5vbMOpIEtpa2Fib3UnXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGtleTogJ1lMJyxcclxuICAgICAgICAgICAgbGFiZWw6ICdZYW5uaWNrIExvdW5pdmlzJ1xyXG4gICAgICAgIH1cclxuICAgIF07XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICByZXNvbHZlKHtcclxuICAgICAgICAgICAgICAgIGRhdGEsXHJcbiAgICAgICAgICAgICAgICB0b3RhbENvdW50OiBkYXRhLmxlbmd0aFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9LCA1MDApO1xyXG4gICAgfSk7XHJcbn07XHJcblxyXG48QXV0b2NvbXBsZXRlVGV4dFxyXG4gICAgaXNFZGl0PXtpc0VkaXR9XHJcbiAgICBxdWVyeVNlYXJjaGVyPXtfcXVlcnlTZWFyY2hlcn1cclxuICAgIHBsYWNlaG9sZGVyPXsnWW91ciBzZWFyY2guLi4nfVxyXG4gICAgZXJyb3J7U29tZXRoaW5nIHdyb25nIGhhcHBlbmQuIFJldHJ5IHBsZWFzZS4uLn1cclxuLz5cclxuKi9cclxuIl19