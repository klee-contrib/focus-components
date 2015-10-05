// Dependencies
const React = require('react');
const builder = require('focus-core').component.builder;
const types = require('focus-core').component.types;
const find = require('lodash/collection/find');

// Components

const Autocomplete = require('./awesomplete').component;

/**
 * Autocomplete for component
 * @type {Object}
 */
const AutocompleteFor = {
    /**
     * Default props
     * @return {Object} default props
     */
    getDefaultProps() {
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
        codeResolver: types('func'),
        isEdit: types('bool'),
        onInputBlur: types('func'),
        pickList: types('array'),
        searcher: types('func'),
        selectionHandler: types('func'),
        value: types('string')
    },
    /**
     * Get initial state
     * @return {Object} initial state
     */
    getInitialState() {
        let {pickList} = this.props;
        return {pickList};
    },
    /**
     * Component will mount, load the list
     */
    componentWillMount() {
        const {isEdit, value, codeResolver} = this.props;
        if (!isEdit && value && codeResolver) { // Resolve the code if in consult
            codeResolver(value).then(resolvedCode => this.setState({value: resolvedCode}));
        } else {
            this._doLoad();
        }
    },
    componentWillReceiveProps({codeResolver, value}) {
        if (value !== this.props.value) {
            codeResolver(value).then(resolvedCode => this.setState({value: resolvedCode}));
        }
    },
    /**
     * List loader
     * @param  {string} text='' input text to search from
     */
    _doLoad(text='') {
        const {searcher} = this.props;
        if (searcher) {
            searcher(text).then(pickList => this.setState({pickList}));
        }
    },
    /**
     * Get value of the field
     * @return {string} the code of the curren value
     */
    getValue() {
        let {autocomplete} = this.refs;
        return autocomplete ? autocomplete.getValue() : this.state.value;
    },
    /**
     * Render the edit mode
     * @return {HTML} rendered element
     */
    _renderEdit() {
        let {AutocompleteComp, allowUnmatchedValue, codeResolver, onInputBlur, selectionHandler, value: code} = this.props;
        let {pickList} = this.state;
        return (
            <AutocompleteComp
                allowUnmatchedValue={allowUnmatchedValue}
                code={code}
                codeResolver={codeResolver}
                inputChangeHandler={this._doLoad}
                onInputBlur={onInputBlur}
                pickList={pickList}
                ref='autocomplete'
                selectionHandler={selectionHandler}
            />
        );
    },
    /**
     * Render the consult mode
     * @return {HTML} rendered element
     */
    _renderConsult() {
        const {value} = this.state;
        const {value: code} = this.props;
        return (
            <span>{value ? value : code}</span>
        );
    },
    /**
     * Render the component
     * @return {HTML} the rendered component
     */
    render() {
        let {isEdit} = this.props;
        return false === isEdit ? this._renderConsult() : this._renderEdit();
    }
};

module.exports = builder(AutocompleteFor);
