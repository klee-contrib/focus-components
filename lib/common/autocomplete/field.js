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
            AutocompleteComponent: Autocomplete,
            pickList: [],
            value: ''
        };
    },
    /**
     * Props validation
     * @type {Object}
     */
    propTypes: {
        AutocompleteComponent: types('func'),
        code: types('string'),
        isEdit: types('bool'),
        loader: types('func'),
        pickList: types('array')
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
        this._doLoad();
    },
    /**
     * List loader
     * @param  {string} text='' input text to search from
     */
    _doLoad: function _doLoad() {
        var _this = this;

        var text = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
        var loader = this.props.loader;

        if (loader) {
            loader(text).then(function (pickList) {
                return _this.setState({ pickList: pickList });
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
        var _props = this.props;
        var AutocompleteComponent = _props.AutocompleteComponent;
        var value = _props.value;
        var pickList = this.state.pickList;

        return React.createElement(AutocompleteComponent, {
            code: value,
            inputChangeHandler: this._doLoad,
            pickList: pickList,
            ref: 'autocomplete'
        });
    },
    /**
     * Render the consult mode
     * @return {HTML} rendered element
     */
    _renderConsult: function _renderConsult() {
        var value = this.props.value;
        var pickList = this.state.pickList;

        var pick = find(pickList, { code: value });
        var text = pick ? pick.value : value;
        return React.createElement(
            'span',
            null,
            text
        );
    },
    /**
     * Render the component
     * @return {HTML} the rendered component
     */
    render: function render() {
        var isEdit = this.props.isEdit;

        return isEdit ? this._renderEdit() : this._renderConsult();
    }
};

module.exports = builder(AutocompleteFor);