// Dependencies

'use strict';

var builder = Focus.component.builder;
var types = Focus.component.types;
var find = require('lodash/collection/find');

// Components

var Autocomplete = require('./awesomplete').component;

/**
 * Autocomplete for component
 * @type {Object}
 */
var AutocompleteFor = {
    /**
     * Default props
     * @return {Object} default props
     */
    getDefaultProps: function getDefaultProps() {
        return {
            AutocompleteComp: Autocomplete,
            pickList: [],
            value: ''
        };
    },
    /**
     * Props validation
     * @type {Object}
     */
    propTypes: {
        AutocompleteComp: types('func'),
        allowUnmatchedValue: types('bool'),
        value: types('string'),
        codeResolver: types('func'),
        isEdit: types('bool'),
        pickList: types('array'),
        selectionHandler: types('func'),
        searcher: types('func')
    },
    /**
     * Get initial state
     * @return {Object} initial state
     */
    getInitialState: function getInitialState() {
        var pickList = this.props.pickList;

        return { pickList: pickList };
    },
    /**
     * Component will mount, load the list
     */
    componentWillMount: function componentWillMount() {
        var _this = this;

        var _props = this.props;
        var value = _props.value;
        var codeResolver = _props.codeResolver;

        if (value && codeResolver) {
            codeResolver(value).then(function (resolvedCode) {
                return _this.setState({ value: resolvedCode });
            });
        } else {
            this._doLoad();
        }
    },
    componentWillReceiveProps: function componentWillReceiveProps(_ref) {
        var _this2 = this;

        var codeResolver = _ref.codeResolver;
        var value = _ref.value;

        if (value !== this.props.value) {
            codeResolver(value).then(function (resolvedCode) {
                return _this2.setState({ value: resolvedCode });
            });
        }
    },
    /**
     * List loader
     * @param  {string} text='' input text to search from
     */
    _doLoad: function _doLoad() {
        var _this3 = this;

        var text = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
        var searcher = this.props.searcher;

        if (searcher) {
            searcher(text).then(function (pickList) {
                return _this3.setState({ pickList: pickList });
            });
        }
    },
    /**
     * Get value of the field
     * @return {string} the code of the curren value
     */
    getValue: function getValue() {
        var autocomplete = this.refs.autocomplete;

        return autocomplete.getValue();
    },
    /**
     * Render the edit mode
     * @return {HTML} rendered element
     */
    _renderEdit: function _renderEdit() {
        var _props2 = this.props;
        var AutocompleteComp = _props2.AutocompleteComp;
        var allowUnmatchedValue = _props2.allowUnmatchedValue;
        var selectionHandler = _props2.selectionHandler;
        var code = _props2.value;
        var _state = this.state;
        var pickList = _state.pickList;
        var value = _state.value;

        return React.createElement(AutocompleteComp, {
            allowUnmatchedValue: allowUnmatchedValue,
            code: code,
            inputChangeHandler: this._doLoad,
            pickList: pickList,
            ref: 'autocomplete',
            selectionHandler: selectionHandler,
            value: value
        });
    },
    /**
     * Render the consult mode
     * @return {HTML} rendered element
     */
    _renderConsult: function _renderConsult() {
        var value = this.state.value;
        var code = this.props.value;

        return React.createElement(
            'span',
            null,
            value ? value : code
        );
    },
    /**
     * Render the component
     * @return {HTML} the rendered component
     */
    render: function render() {
        var isEdit = this.props.isEdit;

        return false === isEdit ? this._renderConsult() : this._renderEdit();
    }
};

module.exports = builder(AutocompleteFor);