// Dependencies

let builder = Focus.component.builder;
let types = Focus.component.types;
let find = require('lodash/collection/find');

// Components

let Autocomplete = require('./awesomplete').component;

/**
 * Autocomplete for component
 * @type {Object}
 */
let AutocompleteFor = {
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
    getInitialState() {
        let {pickList} = this.props;
        return {pickList};
    },
    /**
     * Component will mount, load the list
     */
    componentWillMount() {
        const {value, codeResolver} = this.props;
        if (value && codeResolver) {
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
        return autocomplete.getValue();
    },
    /**
     * Render the edit mode
     * @return {HTML} rendered element
     */
    _renderEdit() {
        let {AutocompleteComp, allowUnmatchedValue, selectionHandler, value: code} = this.props;
        let {pickList, value} = this.state;
        return (
            <AutocompleteComp
                allowUnmatchedValue={allowUnmatchedValue}
                code={code}
                inputChangeHandler={this._doLoad}
                pickList={pickList}
                ref='autocomplete'
                selectionHandler={selectionHandler}
                value={value}
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
