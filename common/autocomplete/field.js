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
        AutocompleteComponent: types('function'),
        code: types('string'),
        isEdit: types('bool'),
        loader: types('function'),
        pickList: types('array')
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
        this._doLoad();
    },
    /**
     * List loader
     * @param  {string} text='' input text to search from
     */
    _doLoad(text='') {
        let {loader} = this.props;
        if (loader) {
            loader(text).then(pickList => this.setState({pickList}));
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
        let {AutocompleteComponent, value} = this.props;
        let {pickList} = this.state;
        return (
            <AutocompleteComponent
                code={value}
                inputChangeHandler={this._doLoad}
                pickList={pickList}
                ref='autocomplete'
            />
        );
    },
    /**
     * Render the consult mode
     * @return {HTML} rendered element
     */
    _renderConsult() {
        let {value} = this.props;
        let {pickList} = this.state;
        let pick = find(pickList, {code: value});
        let text = pick ? pick.value : value;
        return (
            <span>{text}</span>
        );
    },
    /**
     * Render the component
     * @return {HTML} the rendered component
     */
    render() {
        let {isEdit} = this.props;
        return isEdit ? this._renderEdit() : this._renderConsult();
    }
};

module.exports = builder(AutocompleteFor);
