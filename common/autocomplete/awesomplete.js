'use strict';

var _builder = require('focus-core/component/builder');

var _builder2 = _interopRequireDefault(_builder);

var _types = require('focus-core/component/types');

var _types2 = _interopRequireDefault(_types);

require('./lib/awesomplete');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* globals Awesomplete */
var React = require('react');
var ReactDOM = require('react-dom');
// Dependencies

var find = require('lodash/collection/find');
var InputText = require('../../components/input/text');

var _require = require('lodash/function'),
    debounce = _require.debounce;

/**
* Autocomplete component.
* Get a pickList as an input, then let the user type and suggests values from the picklist.
* Can force values in the input field to be taken from the pick list only.
* @type {Object}
*/
var Autocomplete = {
    /**
    * Component will mount.
    * Check if the Awesomplete library is in the Window object.
    */
    componentWillMount: function componentWillMount() {
        // Check if Awesomplete is set in Window
        if (!window.Awesomplete) {
            throw new Error('Please include Awesomplete to your application. See http://leaverou.github.io/awesomplete/ for more information');
        }
    },

    /**
    * Component did mount.
    * Initiates the Awesomplete object.
    */
    componentDidMount: function componentDidMount() {
        var _this = this;

        var input = this.refs.input.refs.inputText;
        var _props = this.props,
            code = _props.code,
            codeResolver = _props.codeResolver,
            inputChangeHandler = _props.inputChangeHandler,
            pickList = _props.pickList,
            timeoutDuration = _props.timeoutDuration;

        this._awesomeplete = new Awesomplete(ReactDOM.findDOMNode(input), {
            list: this._extractListFromData(pickList)
        });
        this._awesomeplete.input.addEventListener('awesomplete-select', function (event) {
            return _this._selectionHandler(event.text);
        });
        this._resolveValueFromPicklistOrCodeResolver(code, pickList);
        this._debouncedInputChangeHandler = debounce(function (value) {
            if (inputChangeHandler) {
                inputChangeHandler(value);
            }
        }, timeoutDuration);
    },

    /**
    * Default props.
    * @return {Object} default props
    */
    getDefaultProps: function getDefaultProps() {
        return {
            code: '',
            pickList: [],
            InputAutoComplete: InputText,
            timeoutDuration: 200,
            allowUnmatchedValue: true
        };
    },

    /**
    * Prop validation
    * @type {Object}
    */
    propTypes: {
        allowUnmatchedValue: (0, _types2.default)('bool'), // restrict user input to values of the list, or allow freestyle
        code: (0, _types2.default)('string'), // the field code value
        inputChangeHandler: (0, _types2.default)('func'), // callback when input changed
        onInputBlur: (0, _types2.default)('func'),
        pickList: (0, _types2.default)('array'), // list of values, looking like [{code: '', value: ''}, {code: '', value: ''}, ...]
        selectionHandler: (0, _types2.default)('func'), // selection callback
        timeoutDuration: (0, _types2.default)('number') // the throttle duration of the input rate
    },
    /**
    * Initial state.
    * Retrieve the value from the provided code and pick list.
    * @return {Object} initial state
    */
    getInitialState: function getInitialState() {
        var _props2 = this.props,
            code = _props2.code,
            pickList = _props2.pickList;

        return {
            value: 0 < pickList.length ? this._getValueFromCode(code) : code,
            fromCodeResolver: false
        };
    },

    /**
    * Component will receive props.
    * Update the pick list, and try to resolve the new value.
    * @param  {Object} nextProps new props
    */
    componentWillReceiveProps: function componentWillReceiveProps(_ref) {
        var pickList = _ref.pickList,
            code = _ref.code;

        if (code !== this.props.code) {
            this._resolveValueFromPicklistOrCodeResolver(code, pickList);
        }
        this._awesomeplete.list = this._extractListFromData(pickList);
    },
    _resolveValueFromPicklistOrCodeResolver: function _resolveValueFromPicklistOrCodeResolver(code, pickList) {
        var _this2 = this;

        var codeResolver = this.props.codeResolver;

        var value = this._getValueFromCode(code, pickList);
        if ('' !== value) {
            this.setState({ value: value }); // eslint-disable-line
        } else if (codeResolver) {
            codeResolver(code).then(function (resolvedValue) {
                if ('' !== resolvedValue) {
                    _this2.setState({ value: resolvedValue, fromCodeResolver: true }, function () {
                        _this2.props.inputChangeHandler(resolvedValue);
                    }); // eslint-disable-line
                }
            });
        }
    },

    /**
    * Selection handler.
    * If a selection handler is set in the props, send it the selected pick.
    * Also, set a flag to tell the blur listener not to empty the value, because the selection, as it is a click outside the input, raises a blur event.
    * @param  {String} value selected value from the dropdown list
    */
    _selectionHandler: function _selectionHandler(value) {
        var selectionHandler = this.props.selectionHandler;

        if (selectionHandler) {
            var pickList = this.props.pickList;

            var selectedPick = find(pickList, { value: value });
            selectionHandler(selectedPick);
        }
        this._isSelecting = true; // Private flag to tell the blur listener not to replace the value
        this.setState({ value: value });
    },

    /**
    * Extract list of suggestions from pick list
    * @param  {Object} data the pick list
    * @return {Array}      the suggestion array
    */
    _extractListFromData: function _extractListFromData(data) {
        return data.map(function (datum) {
            return datum.value;
        });
    },

    /**
    * Get code from value in the pick list
    * @param  {String} value the value
    * @return {String} the code
    */
    _getCodeFromValue: function _getCodeFromValue(value) {
        var pickList = this.props.pickList;

        var pick = find(pickList, { value: value });
        return pick ? pick.code : pick;
    },

    /**
    * Get value from code in the pick list
    * @param  {String} code the code
    * @param  {Object} pickList=this.props.pickList  optional pick list to resolve the value from
    * @return {String} value
    */
    _getValueFromCode: function _getValueFromCode(code) {
        var pickList = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.props.pickList;

        var pick = find(pickList, { code: code });
        return pick ? pick.value : '';
    },

    /**
    * Get the current code
    * @return {String} the code
    */
    getValue: function getValue() {
        var value = this.state.value;

        if (value === '') return null;
        var allowUnmatchedValue = this.props.allowUnmatchedValue;

        var computedValue = this._getCodeFromValue(value);
        return computedValue ? computedValue : allowUnmatchedValue ? value : this.props.code;
    },

    /**
    * On input blur.
    * If allowUnmatchedValue is set in the props, validate the current value and erase it if not valid.
    */
    _onInputBlur: function _onInputBlur() {
        var _state = this.state,
            value = _state.value,
            fromCodeResolver = _state.fromCodeResolver;
        var _props3 = this.props,
            allowUnmatchedValue = _props3.allowUnmatchedValue,
            onInputBlur = _props3.onInputBlur,
            pickList = _props3.pickList,
            selectionHandler = _props3.selectionHandler;

        var selectedPick = find(pickList, { value: value });
        var code = this._getCodeFromValue(value);
        if (selectedPick && !this._isSelecting && selectionHandler) {
            selectionHandler(selectedPick);
        }
        if (!code && !allowUnmatchedValue && !this._isSelecting && !fromCodeResolver) {
            this.setState({ value: '' });
            selectionHandler && selectionHandler({ code: '', value: '' });
        }

        onInputBlur && onInputBlur();

        this._isSelecting = false;
    },

    /**
    * On input change
    * @param  {Object} event change event
    */
    _onInputChange: function _onInputChange(_ref2) {
        var value = _ref2.target.value;

        this.setState({ value: value, fromCodeResolver: false });
        this._debouncedInputChangeHandler(value);
    },

    /**
    * Render
    * @return {HTML} rendered element
    */
    render: function render() {
        var value = this.state.value;
        var _props4 = this.props,
            timeoutDuration = _props4.timeoutDuration,
            InputAutoComplete = _props4.InputAutoComplete;
        var _onInputBlur = this._onInputBlur,
            _onInputChange = this._onInputChange;

        return React.createElement(
            'div',
            { 'data-focus': 'autocomplete' },
            InputAutoComplete ? React.createElement(InputAutoComplete, { onBlur: _onInputBlur, onChange: _onInputChange, ref: 'input', value: value }) : React.createElement(InputText, { onBlur: _onInputBlur, onChange: _onInputChange, ref: 'input', value: value })
        );
    }
};

module.exports = (0, _builder2.default)(Autocomplete);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJSZWFjdCIsInJlcXVpcmUiLCJSZWFjdERPTSIsImZpbmQiLCJJbnB1dFRleHQiLCJkZWJvdW5jZSIsIkF1dG9jb21wbGV0ZSIsImNvbXBvbmVudFdpbGxNb3VudCIsIndpbmRvdyIsIkF3ZXNvbXBsZXRlIiwiRXJyb3IiLCJjb21wb25lbnREaWRNb3VudCIsImlucHV0IiwicmVmcyIsImlucHV0VGV4dCIsInByb3BzIiwiY29kZSIsImNvZGVSZXNvbHZlciIsImlucHV0Q2hhbmdlSGFuZGxlciIsInBpY2tMaXN0IiwidGltZW91dER1cmF0aW9uIiwiX2F3ZXNvbWVwbGV0ZSIsImZpbmRET01Ob2RlIiwibGlzdCIsIl9leHRyYWN0TGlzdEZyb21EYXRhIiwiYWRkRXZlbnRMaXN0ZW5lciIsIl9zZWxlY3Rpb25IYW5kbGVyIiwiZXZlbnQiLCJ0ZXh0IiwiX3Jlc29sdmVWYWx1ZUZyb21QaWNrbGlzdE9yQ29kZVJlc29sdmVyIiwiX2RlYm91bmNlZElucHV0Q2hhbmdlSGFuZGxlciIsInZhbHVlIiwiZ2V0RGVmYXVsdFByb3BzIiwiSW5wdXRBdXRvQ29tcGxldGUiLCJhbGxvd1VubWF0Y2hlZFZhbHVlIiwicHJvcFR5cGVzIiwib25JbnB1dEJsdXIiLCJzZWxlY3Rpb25IYW5kbGVyIiwiZ2V0SW5pdGlhbFN0YXRlIiwibGVuZ3RoIiwiX2dldFZhbHVlRnJvbUNvZGUiLCJmcm9tQ29kZVJlc29sdmVyIiwiY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyIsInNldFN0YXRlIiwidGhlbiIsInJlc29sdmVkVmFsdWUiLCJzZWxlY3RlZFBpY2siLCJfaXNTZWxlY3RpbmciLCJkYXRhIiwibWFwIiwiZGF0dW0iLCJfZ2V0Q29kZUZyb21WYWx1ZSIsInBpY2siLCJnZXRWYWx1ZSIsInN0YXRlIiwiY29tcHV0ZWRWYWx1ZSIsIl9vbklucHV0Qmx1ciIsIl9vbklucHV0Q2hhbmdlIiwidGFyZ2V0Iiwi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QUFTOztBQUM5QixhQUFLWSxRQUFMLENBQWMsRUFBQ1osWUFBRCxFQUFRVSxrQkFBa0IsS0FBMUIsRUFBZDtBQUNBLGFBQUtYLDRCQUFMLENBQWtDQyxLQUFsQztBQUNILEtBaExjOztBQWlMZjs7OztBQUlBNEIsVUFyTGUsb0JBcUxOO0FBQUEsWUFDRTVCLEtBREYsR0FDVyxLQUFLdUIsS0FEaEIsQ0FDRXZCLEtBREY7QUFBQSxzQkFFd0MsS0FBS2hCLEtBRjdDO0FBQUEsWUFFRUssZUFGRixXQUVFQSxlQUZGO0FBQUEsWUFFbUJhLGlCQUZuQixXQUVtQkEsaUJBRm5CO0FBQUEsWUFHRXVCLFlBSEYsR0FHa0MsSUFIbEMsQ0FHRUEsWUFIRjtBQUFBLFlBR2dCQyxjQUhoQixHQUdrQyxJQUhsQyxDQUdnQkEsY0FIaEI7O0FBSUwsZUFDSTtBQUFBO0FBQUEsY0FBSyxjQUFXLGNBQWhCO0FBRVF4QixnQ0FDSSxvQkFBQyxpQkFBRCxJQUFtQixRQUFRdUIsWUFBM0IsRUFBeUMsVUFBVUMsY0FBbkQsRUFBbUUsS0FBSSxPQUF2RSxFQUErRSxPQUFPMUIsS0FBdEYsR0FESixHQUdJLG9CQUFDLFNBQUQsSUFBVyxRQUFReUIsWUFBbkIsRUFBaUMsVUFBVUMsY0FBM0MsRUFBMkQsS0FBSSxPQUEvRCxFQUF1RSxPQUFPMUIsS0FBOUU7QUFMWixTQURKO0FBVUg7QUFuTWMsQ0FBbkI7O0FBc01BNkIsT0FBT0MsT0FBUCxHQUFpQix1QkFBUXZELFlBQVIsQ0FBakIiLCJmaWxlIjoiaXMtcmVhY3QtY2xhc3MtY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogZ2xvYmFscyBBd2Vzb21wbGV0ZSAqL1xyXG5jb25zdCBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XHJcbmNvbnN0IFJlYWN0RE9NID0gcmVxdWlyZSgncmVhY3QtZG9tJyk7XHJcbi8vIERlcGVuZGVuY2llc1xyXG5pbXBvcnQgYnVpbGRlciBmcm9tICdmb2N1cy1jb3JlL2NvbXBvbmVudC9idWlsZGVyJztcclxuaW1wb3J0IHR5cGVzIGZyb20gJ2ZvY3VzLWNvcmUvY29tcG9uZW50L3R5cGVzJztcclxubGV0IGZpbmQgPSByZXF1aXJlKCdsb2Rhc2gvY29sbGVjdGlvbi9maW5kJyk7XHJcbmNvbnN0IElucHV0VGV4dCA9IHJlcXVpcmUoJy4uLy4uL2NvbXBvbmVudHMvaW5wdXQvdGV4dCcpO1xyXG5jb25zdCB7ZGVib3VuY2V9ID0gcmVxdWlyZSgnbG9kYXNoL2Z1bmN0aW9uJyk7XHJcbmltcG9ydCAnLi9saWIvYXdlc29tcGxldGUnO1xyXG5cclxuLyoqXHJcbiogQXV0b2NvbXBsZXRlIGNvbXBvbmVudC5cclxuKiBHZXQgYSBwaWNrTGlzdCBhcyBhbiBpbnB1dCwgdGhlbiBsZXQgdGhlIHVzZXIgdHlwZSBhbmQgc3VnZ2VzdHMgdmFsdWVzIGZyb20gdGhlIHBpY2tsaXN0LlxyXG4qIENhbiBmb3JjZSB2YWx1ZXMgaW4gdGhlIGlucHV0IGZpZWxkIHRvIGJlIHRha2VuIGZyb20gdGhlIHBpY2sgbGlzdCBvbmx5LlxyXG4qIEB0eXBlIHtPYmplY3R9XHJcbiovXHJcbmxldCBBdXRvY29tcGxldGUgPSB7XHJcbiAgICAvKipcclxuICAgICogQ29tcG9uZW50IHdpbGwgbW91bnQuXHJcbiAgICAqIENoZWNrIGlmIHRoZSBBd2Vzb21wbGV0ZSBsaWJyYXJ5IGlzIGluIHRoZSBXaW5kb3cgb2JqZWN0LlxyXG4gICAgKi9cclxuICAgIGNvbXBvbmVudFdpbGxNb3VudCgpIHtcclxuICAgICAgICAvLyBDaGVjayBpZiBBd2Vzb21wbGV0ZSBpcyBzZXQgaW4gV2luZG93XHJcbiAgICAgICAgaWYgKCF3aW5kb3cuQXdlc29tcGxldGUpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdQbGVhc2UgaW5jbHVkZSBBd2Vzb21wbGV0ZSB0byB5b3VyIGFwcGxpY2F0aW9uLiBTZWUgaHR0cDovL2xlYXZlcm91LmdpdGh1Yi5pby9hd2Vzb21wbGV0ZS8gZm9yIG1vcmUgaW5mb3JtYXRpb24nKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgLyoqXHJcbiAgICAqIENvbXBvbmVudCBkaWQgbW91bnQuXHJcbiAgICAqIEluaXRpYXRlcyB0aGUgQXdlc29tcGxldGUgb2JqZWN0LlxyXG4gICAgKi9cclxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xyXG4gICAgICAgIGxldCB7aW5wdXRUZXh0OiBpbnB1dH0gPSB0aGlzLnJlZnMuaW5wdXQucmVmcztcclxuICAgICAgICBsZXQge2NvZGUsIGNvZGVSZXNvbHZlciwgaW5wdXRDaGFuZ2VIYW5kbGVyLCBwaWNrTGlzdCwgdGltZW91dER1cmF0aW9ufSA9IHRoaXMucHJvcHM7XHJcbiAgICAgICAgdGhpcy5fYXdlc29tZXBsZXRlID0gbmV3IEF3ZXNvbXBsZXRlKFJlYWN0RE9NLmZpbmRET01Ob2RlKGlucHV0KSwge1xyXG4gICAgICAgICAgICBsaXN0OiB0aGlzLl9leHRyYWN0TGlzdEZyb21EYXRhKHBpY2tMaXN0KVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuX2F3ZXNvbWVwbGV0ZS5pbnB1dC5hZGRFdmVudExpc3RlbmVyKCdhd2Vzb21wbGV0ZS1zZWxlY3QnLCBldmVudCA9PiB0aGlzLl9zZWxlY3Rpb25IYW5kbGVyKGV2ZW50LnRleHQpKTtcclxuICAgICAgICB0aGlzLl9yZXNvbHZlVmFsdWVGcm9tUGlja2xpc3RPckNvZGVSZXNvbHZlcihjb2RlLCBwaWNrTGlzdCk7XHJcbiAgICAgICAgdGhpcy5fZGVib3VuY2VkSW5wdXRDaGFuZ2VIYW5kbGVyID0gZGVib3VuY2UodmFsdWUgPT4ge1xyXG4gICAgICAgICAgICBpZiAoaW5wdXRDaGFuZ2VIYW5kbGVyKSB7XHJcbiAgICAgICAgICAgICAgICBpbnB1dENoYW5nZUhhbmRsZXIodmFsdWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSwgdGltZW91dER1cmF0aW9uKTtcclxuICAgIH0sXHJcbiAgICAvKipcclxuICAgICogRGVmYXVsdCBwcm9wcy5cclxuICAgICogQHJldHVybiB7T2JqZWN0fSBkZWZhdWx0IHByb3BzXHJcbiAgICAqL1xyXG4gICAgZ2V0RGVmYXVsdFByb3BzKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGNvZGU6ICcnLFxyXG4gICAgICAgICAgICBwaWNrTGlzdDogW10sXHJcbiAgICAgICAgICAgIElucHV0QXV0b0NvbXBsZXRlOiBJbnB1dFRleHQsXHJcbiAgICAgICAgICAgIHRpbWVvdXREdXJhdGlvbjogMjAwLFxyXG4gICAgICAgICAgICBhbGxvd1VubWF0Y2hlZFZhbHVlOiB0cnVlXHJcbiAgICAgICAgfTtcclxuICAgIH0sXHJcbiAgICAvKipcclxuICAgICogUHJvcCB2YWxpZGF0aW9uXHJcbiAgICAqIEB0eXBlIHtPYmplY3R9XHJcbiAgICAqL1xyXG4gICAgcHJvcFR5cGVzOiB7XHJcbiAgICAgICAgYWxsb3dVbm1hdGNoZWRWYWx1ZTogdHlwZXMoJ2Jvb2wnKSwgLy8gcmVzdHJpY3QgdXNlciBpbnB1dCB0byB2YWx1ZXMgb2YgdGhlIGxpc3QsIG9yIGFsbG93IGZyZWVzdHlsZVxyXG4gICAgICAgIGNvZGU6IHR5cGVzKCdzdHJpbmcnKSwgLy8gdGhlIGZpZWxkIGNvZGUgdmFsdWVcclxuICAgICAgICBpbnB1dENoYW5nZUhhbmRsZXI6IHR5cGVzKCdmdW5jJyksIC8vIGNhbGxiYWNrIHdoZW4gaW5wdXQgY2hhbmdlZFxyXG4gICAgICAgIG9uSW5wdXRCbHVyOiB0eXBlcygnZnVuYycpLFxyXG4gICAgICAgIHBpY2tMaXN0OiB0eXBlcygnYXJyYXknKSwgLy8gbGlzdCBvZiB2YWx1ZXMsIGxvb2tpbmcgbGlrZSBbe2NvZGU6ICcnLCB2YWx1ZTogJyd9LCB7Y29kZTogJycsIHZhbHVlOiAnJ30sIC4uLl1cclxuICAgICAgICBzZWxlY3Rpb25IYW5kbGVyOiB0eXBlcygnZnVuYycpLCAvLyBzZWxlY3Rpb24gY2FsbGJhY2tcclxuICAgICAgICB0aW1lb3V0RHVyYXRpb246IHR5cGVzKCdudW1iZXInKSAvLyB0aGUgdGhyb3R0bGUgZHVyYXRpb24gb2YgdGhlIGlucHV0IHJhdGVcclxuICAgIH0sXHJcbiAgICAvKipcclxuICAgICogSW5pdGlhbCBzdGF0ZS5cclxuICAgICogUmV0cmlldmUgdGhlIHZhbHVlIGZyb20gdGhlIHByb3ZpZGVkIGNvZGUgYW5kIHBpY2sgbGlzdC5cclxuICAgICogQHJldHVybiB7T2JqZWN0fSBpbml0aWFsIHN0YXRlXHJcbiAgICAqL1xyXG4gICAgZ2V0SW5pdGlhbFN0YXRlKCkge1xyXG4gICAgICAgIGNvbnN0IHtjb2RlLCBwaWNrTGlzdH0gPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIHJldHVybiAoe1xyXG4gICAgICAgICAgICB2YWx1ZTogMCA8IHBpY2tMaXN0Lmxlbmd0aCA/IHRoaXMuX2dldFZhbHVlRnJvbUNvZGUoY29kZSkgOiBjb2RlLFxyXG4gICAgICAgICAgICBmcm9tQ29kZVJlc29sdmVyOiBmYWxzZVxyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuICAgIC8qKlxyXG4gICAgKiBDb21wb25lbnQgd2lsbCByZWNlaXZlIHByb3BzLlxyXG4gICAgKiBVcGRhdGUgdGhlIHBpY2sgbGlzdCwgYW5kIHRyeSB0byByZXNvbHZlIHRoZSBuZXcgdmFsdWUuXHJcbiAgICAqIEBwYXJhbSAge09iamVjdH0gbmV4dFByb3BzIG5ldyBwcm9wc1xyXG4gICAgKi9cclxuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMoe3BpY2tMaXN0LCBjb2RlfSkge1xyXG4gICAgICAgIGlmIChjb2RlICE9PSB0aGlzLnByb3BzLmNvZGUpIHtcclxuICAgICAgICAgICAgdGhpcy5fcmVzb2x2ZVZhbHVlRnJvbVBpY2tsaXN0T3JDb2RlUmVzb2x2ZXIoY29kZSwgcGlja0xpc3QpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9hd2Vzb21lcGxldGUubGlzdCA9IHRoaXMuX2V4dHJhY3RMaXN0RnJvbURhdGEocGlja0xpc3QpO1xyXG4gICAgfSxcclxuICAgIF9yZXNvbHZlVmFsdWVGcm9tUGlja2xpc3RPckNvZGVSZXNvbHZlcihjb2RlLCBwaWNrTGlzdCkge1xyXG4gICAgICAgIGNvbnN0IHtjb2RlUmVzb2x2ZXJ9ID0gdGhpcy5wcm9wcztcclxuICAgICAgICBjb25zdCB2YWx1ZSA9IHRoaXMuX2dldFZhbHVlRnJvbUNvZGUoY29kZSwgcGlja0xpc3QpO1xyXG4gICAgICAgIGlmICgnJyAhPT0gdmFsdWUpIHtcclxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7dmFsdWV9KTsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxyXG4gICAgICAgIH0gZWxzZSBpZiAoY29kZVJlc29sdmVyKSB7XHJcbiAgICAgICAgICAgIGNvZGVSZXNvbHZlcihjb2RlKS50aGVuKHJlc29sdmVkVmFsdWUgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKCcnICE9PSByZXNvbHZlZFZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7dmFsdWU6IHJlc29sdmVkVmFsdWUsIGZyb21Db2RlUmVzb2x2ZXI6IHRydWV9LCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucHJvcHMuaW5wdXRDaGFuZ2VIYW5kbGVyKHJlc29sdmVkVmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICAvKipcclxuICAgICogU2VsZWN0aW9uIGhhbmRsZXIuXHJcbiAgICAqIElmIGEgc2VsZWN0aW9uIGhhbmRsZXIgaXMgc2V0IGluIHRoZSBwcm9wcywgc2VuZCBpdCB0aGUgc2VsZWN0ZWQgcGljay5cclxuICAgICogQWxzbywgc2V0IGEgZmxhZyB0byB0ZWxsIHRoZSBibHVyIGxpc3RlbmVyIG5vdCB0byBlbXB0eSB0aGUgdmFsdWUsIGJlY2F1c2UgdGhlIHNlbGVjdGlvbiwgYXMgaXQgaXMgYSBjbGljayBvdXRzaWRlIHRoZSBpbnB1dCwgcmFpc2VzIGEgYmx1ciBldmVudC5cclxuICAgICogQHBhcmFtICB7U3RyaW5nfSB2YWx1ZSBzZWxlY3RlZCB2YWx1ZSBmcm9tIHRoZSBkcm9wZG93biBsaXN0XHJcbiAgICAqL1xyXG4gICAgX3NlbGVjdGlvbkhhbmRsZXIodmFsdWUpIHtcclxuICAgICAgICBjb25zdCB7c2VsZWN0aW9uSGFuZGxlcn0gPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIGlmIChzZWxlY3Rpb25IYW5kbGVyKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHtwaWNrTGlzdH0gPSB0aGlzLnByb3BzO1xyXG4gICAgICAgICAgICBjb25zdCBzZWxlY3RlZFBpY2sgPSBmaW5kKHBpY2tMaXN0LCB7dmFsdWV9KTtcclxuICAgICAgICAgICAgc2VsZWN0aW9uSGFuZGxlcihzZWxlY3RlZFBpY2spO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9pc1NlbGVjdGluZyA9IHRydWU7IC8vIFByaXZhdGUgZmxhZyB0byB0ZWxsIHRoZSBibHVyIGxpc3RlbmVyIG5vdCB0byByZXBsYWNlIHRoZSB2YWx1ZVxyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe3ZhbHVlfSk7XHJcbiAgICB9LFxyXG4gICAgLyoqXHJcbiAgICAqIEV4dHJhY3QgbGlzdCBvZiBzdWdnZXN0aW9ucyBmcm9tIHBpY2sgbGlzdFxyXG4gICAgKiBAcGFyYW0gIHtPYmplY3R9IGRhdGEgdGhlIHBpY2sgbGlzdFxyXG4gICAgKiBAcmV0dXJuIHtBcnJheX0gICAgICB0aGUgc3VnZ2VzdGlvbiBhcnJheVxyXG4gICAgKi9cclxuICAgIF9leHRyYWN0TGlzdEZyb21EYXRhKGRhdGEpIHtcclxuICAgICAgICByZXR1cm4gZGF0YS5tYXAoZGF0dW0gPT4gZGF0dW0udmFsdWUpO1xyXG4gICAgfSxcclxuICAgIC8qKlxyXG4gICAgKiBHZXQgY29kZSBmcm9tIHZhbHVlIGluIHRoZSBwaWNrIGxpc3RcclxuICAgICogQHBhcmFtICB7U3RyaW5nfSB2YWx1ZSB0aGUgdmFsdWVcclxuICAgICogQHJldHVybiB7U3RyaW5nfSB0aGUgY29kZVxyXG4gICAgKi9cclxuICAgIF9nZXRDb2RlRnJvbVZhbHVlKHZhbHVlKSB7XHJcbiAgICAgICAgY29uc3Qge3BpY2tMaXN0fSA9IHRoaXMucHJvcHM7XHJcbiAgICAgICAgY29uc3QgcGljayA9IGZpbmQocGlja0xpc3QsIHt2YWx1ZX0pO1xyXG4gICAgICAgIHJldHVybiBwaWNrID8gcGljay5jb2RlIDogcGljaztcclxuICAgIH0sXHJcbiAgICAvKipcclxuICAgICogR2V0IHZhbHVlIGZyb20gY29kZSBpbiB0aGUgcGljayBsaXN0XHJcbiAgICAqIEBwYXJhbSAge1N0cmluZ30gY29kZSB0aGUgY29kZVxyXG4gICAgKiBAcGFyYW0gIHtPYmplY3R9IHBpY2tMaXN0PXRoaXMucHJvcHMucGlja0xpc3QgIG9wdGlvbmFsIHBpY2sgbGlzdCB0byByZXNvbHZlIHRoZSB2YWx1ZSBmcm9tXHJcbiAgICAqIEByZXR1cm4ge1N0cmluZ30gdmFsdWVcclxuICAgICovXHJcbiAgICBfZ2V0VmFsdWVGcm9tQ29kZShjb2RlLCBwaWNrTGlzdD10aGlzLnByb3BzLnBpY2tMaXN0KSB7XHJcbiAgICAgICAgY29uc3QgcGljayA9IGZpbmQocGlja0xpc3QsIHtjb2RlfSk7XHJcbiAgICAgICAgcmV0dXJuIHBpY2sgPyBwaWNrLnZhbHVlIDogJyc7XHJcbiAgICB9LFxyXG4gICAgLyoqXHJcbiAgICAqIEdldCB0aGUgY3VycmVudCBjb2RlXHJcbiAgICAqIEByZXR1cm4ge1N0cmluZ30gdGhlIGNvZGVcclxuICAgICovXHJcbiAgICBnZXRWYWx1ZSgpIHtcclxuICAgICAgICBjb25zdCB7dmFsdWV9ID0gdGhpcy5zdGF0ZTtcclxuICAgICAgICBpZiAodmFsdWUgPT09ICcnKSByZXR1cm4gbnVsbDtcclxuICAgICAgICBjb25zdCB7YWxsb3dVbm1hdGNoZWRWYWx1ZX0gPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIGNvbnN0IGNvbXB1dGVkVmFsdWUgPSB0aGlzLl9nZXRDb2RlRnJvbVZhbHVlKHZhbHVlKTtcclxuICAgICAgICByZXR1cm4gY29tcHV0ZWRWYWx1ZSA/IGNvbXB1dGVkVmFsdWUgOiBhbGxvd1VubWF0Y2hlZFZhbHVlID8gdmFsdWUgOiB0aGlzLnByb3BzLmNvZGU7XHJcbiAgICB9LFxyXG4gICAgLyoqXHJcbiAgICAqIE9uIGlucHV0IGJsdXIuXHJcbiAgICAqIElmIGFsbG93VW5tYXRjaGVkVmFsdWUgaXMgc2V0IGluIHRoZSBwcm9wcywgdmFsaWRhdGUgdGhlIGN1cnJlbnQgdmFsdWUgYW5kIGVyYXNlIGl0IGlmIG5vdCB2YWxpZC5cclxuICAgICovXHJcbiAgICBfb25JbnB1dEJsdXIoKSB7XHJcbiAgICAgICAgY29uc3Qge3ZhbHVlLCBmcm9tQ29kZVJlc29sdmVyfSA9IHRoaXMuc3RhdGU7XHJcbiAgICAgICAgY29uc3Qge2FsbG93VW5tYXRjaGVkVmFsdWUsIG9uSW5wdXRCbHVyLCBwaWNrTGlzdCwgc2VsZWN0aW9uSGFuZGxlcn0gPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIGNvbnN0IHNlbGVjdGVkUGljayA9IGZpbmQocGlja0xpc3QsIHt2YWx1ZX0pO1xyXG4gICAgICAgIGNvbnN0IGNvZGUgPSB0aGlzLl9nZXRDb2RlRnJvbVZhbHVlKHZhbHVlKTtcclxuICAgICAgICBpZiAoc2VsZWN0ZWRQaWNrICYmICF0aGlzLl9pc1NlbGVjdGluZyAmJiBzZWxlY3Rpb25IYW5kbGVyKSB7XHJcbiAgICAgICAgICAgIHNlbGVjdGlvbkhhbmRsZXIoc2VsZWN0ZWRQaWNrKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCFjb2RlICYmICFhbGxvd1VubWF0Y2hlZFZhbHVlICYmICF0aGlzLl9pc1NlbGVjdGluZyAmJiAhZnJvbUNvZGVSZXNvbHZlcikge1xyXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHt2YWx1ZTogJyd9KTtcclxuICAgICAgICAgICAgc2VsZWN0aW9uSGFuZGxlciAmJiBzZWxlY3Rpb25IYW5kbGVyKHtjb2RlOiAnJywgdmFsdWU6ICcnfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBvbklucHV0Qmx1ciAmJiBvbklucHV0Qmx1cigpO1xyXG5cclxuICAgICAgICB0aGlzLl9pc1NlbGVjdGluZyA9IGZhbHNlO1xyXG4gICAgfSxcclxuICAgIC8qKlxyXG4gICAgKiBPbiBpbnB1dCBjaGFuZ2VcclxuICAgICogQHBhcmFtICB7T2JqZWN0fSBldmVudCBjaGFuZ2UgZXZlbnRcclxuICAgICovXHJcbiAgICBfb25JbnB1dENoYW5nZSh7dGFyZ2V0OiB7dmFsdWV9fSkge1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe3ZhbHVlLCBmcm9tQ29kZVJlc29sdmVyOiBmYWxzZX0pO1xyXG4gICAgICAgIHRoaXMuX2RlYm91bmNlZElucHV0Q2hhbmdlSGFuZGxlcih2YWx1ZSk7XHJcbiAgICB9LFxyXG4gICAgLyoqXHJcbiAgICAqIFJlbmRlclxyXG4gICAgKiBAcmV0dXJuIHtIVE1MfSByZW5kZXJlZCBlbGVtZW50XHJcbiAgICAqL1xyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIGNvbnN0IHt2YWx1ZX0gPSB0aGlzLnN0YXRlO1xyXG4gICAgICAgIGNvbnN0IHt0aW1lb3V0RHVyYXRpb24sIElucHV0QXV0b0NvbXBsZXRlfSA9IHRoaXMucHJvcHM7XHJcbiAgICAgICAgY29uc3Qge19vbklucHV0Qmx1ciwgX29uSW5wdXRDaGFuZ2V9ID0gdGhpcztcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2IGRhdGEtZm9jdXM9J2F1dG9jb21wbGV0ZSc+XHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgSW5wdXRBdXRvQ29tcGxldGUgID8gXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxJbnB1dEF1dG9Db21wbGV0ZSBvbkJsdXI9e19vbklucHV0Qmx1cn0gb25DaGFuZ2U9e19vbklucHV0Q2hhbmdlfSByZWY9J2lucHV0JyB2YWx1ZT17dmFsdWV9Lz4gXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDogXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxJbnB1dFRleHQgb25CbHVyPXtfb25JbnB1dEJsdXJ9IG9uQ2hhbmdlPXtfb25JbnB1dENoYW5nZX0gcmVmPSdpbnB1dCcgdmFsdWU9e3ZhbHVlfS8+XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGJ1aWxkZXIoQXV0b2NvbXBsZXRlKTtcclxuIl19