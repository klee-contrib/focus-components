/* globals Awesomplete */

// Dependencies
'use strict';

var Focus = require('focus');
var _Focus$component = Focus.component;
var builder = _Focus$component.builder;
var types = _Focus$component.types;

var find = require('lodash/collection/find');
var InputText = require('../input/text').component;

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
        var pickList = this.props.pickList;

        this._awesomeplete = new Awesomplete(React.findDOMNode(input), {
            list: this._extractListFromData(pickList)
        });
        this._awesomeplete.input.addEventListener('awesomplete-select', function (event) {
            return _this._selectionHandler(event.text);
        });
    },
    /**
     * Default props.
     * @return {Object} default props
     */
    getDefaultProps: function getDefaultProps() {
        return {
            code: '',
            pickList: [],
            timeoutDuration: 200,
            allowUnmatchedValue: true
        };
    },
    /**
     * Prop validation
     * @type {Object}
     */
    propTypes: {
        code: types('string'), // the field code value
        inputChangeHandler: types('func'), // callback when input changed
        pickList: types('array'), // list of values, looking like [{code: '', value: ''}, {code: '', value: ''}, ...]
        selectionHandler: types('func'), // selection callback
        timeoutDuration: types('number'), // the throttle duration of the input rate
        allowUnmatchedValue: types('bool') // restrict user input to values of the list, or allow freestyle
    },
    /**
     * Initial state.
     * Retrieve the value from the provided code and pick list.
     * @return {Object} initial state
     */
    getInitialState: function getInitialState() {
        var _props = this.props;
        var code = _props.code;
        var pickList = _props.pickList;

        return {
            value: 0 < pickList.length ? this._getValueFromCode(code) : code
        };
    },
    /**
     * Component will receive props.
     * Update the pick list, and try to resolve the new value.
     * @param  {Object} nextProps new props
     */
    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
        var pickList = nextProps.pickList;
        var code = nextProps.code;

        if (code !== this.props.code) {
            var value = this._getValueFromCode(code, pickList);
            this.setState({ value: value });
        }
        this._awesomeplete._list = this._extractListFromData(pickList);
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
        var pickList = arguments.length <= 1 || arguments[1] === undefined ? this.props.pickList : arguments[1];

        var pick = find(pickList, { code: code });
        return pick ? pick.value : '';
    },
    /**
     * Get the current code
     * @return {String} the code
     */
    getValue: function getValue() {
        var value = this.state.value;
        var allowUnmatchedValue = this.props.allowUnmatchedValue;

        var computedValue = this._getCodeFromValue(value);
        return computedValue ? computedValue : allowUnmatchedValue ? value : undefined;
    },
    /**
     * On input blur.
     * If allowUnmatchedValue is set in the props, validate the current value and erase it if not valid.
     */
    _onInputBlur: function _onInputBlur() {
        var value = this.state.value;
        var _props2 = this.props;
        var allowUnmatchedValue = _props2.allowUnmatchedValue;
        var pickList = _props2.pickList;
        var selectionHandler = _props2.selectionHandler;

        var selectedPick = find(pickList, { value: value });
        var code = this._getCodeFromValue(value);
        if (selectedPick && !this._isSelecting && selectionHandler) {
            selectionHandler(selectedPick);
        }
        if (!code && !allowUnmatchedValue && !this._isSelecting) {
            this.setState({ value: '' });
        }
        this._isSelecting = false;
    },
    /**
     * On input change
     * @param  {Object} event change event
     */
    _onInputChange: function _onInputChange(event) {
        var _this2 = this;

        var value = event.target.value;
        var timeoutDuration = this.props.timeoutDuration;

        this.setState({ value: value });
        if (this._changeTimeout) {
            clearTimeout(this._changeTimeout);
        }
        this._changeTimeout = setTimeout(function () {
            var inputChangeHandler = _this2.props.inputChangeHandler;

            if (inputChangeHandler) {
                inputChangeHandler(value);
            }
        }, timeoutDuration);
    },
    /**
     * Render
     * @return {HTML} rendered element
     */
    render: function render() {
        var value = this.state.value;
        var _onInputBlur = this._onInputBlur;
        var _onInputChange = this._onInputChange;

        return React.createElement(
            'div',
            { 'data-focus': 'autocomplete' },
            React.createElement(InputText, { onBlur: _onInputBlur, onChange: _onInputChange, ref: 'input', value: value })
        );
    }
};

module.exports = builder(Autocomplete);