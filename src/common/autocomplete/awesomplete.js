/* globals Awesomplete */
const React = require('react');
const ReactDOM = require('react-dom');
// Dependencies
const Focus = require('focusjs');
const {builder, types} = Focus.component;
const find = require('lodash/collection/find');

/**
 * Autocomplete component.
 * Get a pickList as an input, then let the user type and suggests values from the picklist.
 * Can force values in the input field to be taken from the pick list only.
 * @type {Object}
 */
let Autocomplete = {
    /**
     * Component will mount.
     * Check if the Awesomplete library is in the Window object.
     */
    componentWillMount() {
        // Check if Awesomplete is set in Window
        if (!window.Awesomplete) {
            throw new Error('Please include Awesomplete to your application. See http://leaverou.github.io/awesomplete/ for more information');
        }
    },
    /**
     * Component did mount.
     * Initiates the Awesomplete object.
     */
    componentDidMount() {
        let {input} = this.refs;
        let {pickList} = this.props;
        this._awesomeplete = new Awesomplete(ReactDOM.findDOMNode(input), {
            list: this._extractListFromData(pickList)
        });
        this._awesomeplete.input.addEventListener('awesomplete-select', event => this._selectionHandler(event.text));
    },
    /**
     * Default props.
     * @return {Object} default props
     */
    getDefaultProps() {
        return {
            code: '',
            pickList: [],
            timeoutDuration: 200,
            allowUnmatchedValue: false
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
    getInitialState() {
        const {code, pickList} = this.props;
        return ({
            value: 0 < pickList.length ? this._getValueFromCode(code) : code
        });
    },
    /**
     * Component will receive props.
     * Update the pick list, and try to resolve the new value.
     * @param  {Object} nextProps new props
     */
    componentWillReceiveProps(nextProps) {
        let {pickList, code} = nextProps;
        if (code) {
            const value = this._getValueFromCode(code, pickList);
            this.setState({value});
        }
        this._awesomeplete._list = this._extractListFromData(pickList);
    },
    /**
     * Selection handler.
     * If a selection handler is set in the props, send it the selected pick.
     * Also, set a flag to tell the blur listener not to empty the value, because the selection, as it is a click outside the input, raises a blur event.
     * @param  {String} value selected value from the dropdown list
     */
    _selectionHandler(value) {
        const {selectionHandler} = this.props;
        if (selectionHandler) {
            const {pickList} = this.props;
            const selectedPick = find(pickList, {value});
            selectionHandler(selectedPick);
        }
        this._isSelecting = true; // Private flag to tell the blur listener not to replace the value
        this.setState({value});
    },
    /**
     * Extract list of suggestions from pick list
     * @param  {Object} data the pick list
     * @return {Array}      the suggestion array
     */
    _extractListFromData(data) {
        return data.map(datum => datum.value);
    },
    /**
     * Get code from value in the pick list
     * @param  {String} value the value
     * @return {String} the code
     */
    _getCodeFromValue(value) {
        const {pickList} = this.props;
        const pick = find(pickList, {value});
        return pick ? pick.code : pick;
    },
    /**
     * Get value from code in the pick list
     * @param  {String} code the code
     * @param  {Object} pickList=this.props.pickList  optional pick list to resolve the value from
     * @return {String} value
     */
    _getValueFromCode(code, pickList=this.props.pickList) {
        const pick = find(pickList, {code});
        return pick ? pick.value : '';
    },
    /**
     * Get the current code
     * @return {String} the code
     */
    getValue() {
        const {value} = this.state;
        const {allowUnmatchedValue} = this.props;
        const computedValue = this._getCodeFromValue(value);
        return computedValue ? computedValue : allowUnmatchedValue ? value : undefined;
    },
    /**
     * On input blur.
     * If allowUnmatchedValue is set in the props, validate the current value and erase it if not valid.
     */
    _onInputBlur() {
        const {value} = this.state;
        const {allowUnmatchedValue} = this.props;
        const code = this._getCodeFromValue(value);
        if (!code && allowUnmatchedValue && !this._isSelecting) {
            this.setState({value: ''});
        }
        this._isSelecting = false;
    },
    /**
     * On input change
     * @param  {Object} event change event
     */
    _onInputChange(event) {
        const {value} = event.target;
        const {timeoutDuration} = this.props;
        this.setState({value});
        if (this._changeTimeout) {
            clearTimeout(this._changeTimeout);
        }
        this._changeTimeout = setTimeout(() => {
            let {inputChangeHandler} = this.props;
            if (inputChangeHandler) {
                inputChangeHandler(value);
            }
        }, timeoutDuration);
    },
    /**
     * Render
     * @return {HTML} rendered element
     */
    render() {
        let {value} = this.state;
        let {_onInputBlur, _onInputChange} = this;
        return (
            <div data-focus='autocomplete'>
                <input onBlur={_onInputBlur} onChange={_onInputChange} ref='input' value={value}/>
            </div>
        );
    }
};

module.exports = builder(Autocomplete);
