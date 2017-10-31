// Dependencies
import React from 'react';
import builder from 'focus-core/component/builder';
import types from 'focus-core/component/types';
// Components
import { component as Autocomplete } from './awesomplete';

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
        let { pickList } = this.props;
        return { pickList };
    },
    /**
     * Component will mount, load the list
     */
    componentWillMount() {
        console.warn('FocusComponents 2.2.0: this component is deprecated, please use focus-components/components/input/autocomplete-select');
        const { isEdit, value, codeResolver } = this.props;
        if (!isEdit && value && codeResolver) { // Resolve the code if in consult
            codeResolver(value).then(resolvedCode => this.setState({ value: resolvedCode }));
        } else {
            this._doLoad();
        }
    },
    componentWillReceiveProps({ codeResolver, value }) {
        if (value !== this.props.value) {
            codeResolver(value).then(resolvedCode => this.setState({ value: resolvedCode }));
        }
    },
    /**
     * List loader
     * @param  {string} text='' input text to search from
     */
    _doLoad(text = '') {
        const { searcher } = this.props;
        if (searcher) {
            searcher(text).then(pickList => this.setState({ pickList }));
        }
    },
    /**
     * Get value of the field
     * @return {string} the code of the curren value
     */
    getValue() {
        const { autocomplete } = this.refs;
        const { allowUnmatchedValue, value } = this.props;
        return autocomplete ? autocomplete.getValue() : allowUnmatchedValue ? this.state.value : value;
    },
    /**
     * Render the edit mode
     * @return {HTML} rendered element
     */
    _renderEdit() {
        const { AutocompleteComp, allowUnmatchedValue, codeResolver, onInputBlur, selectionHandler, value: code, InputAutoComplete, pickList: defaultPickList, ...otherProps } = this.props;
        const { pickList } = this.state;
        return (
            <AutocompleteComp
                InputAutoComplete={InputAutoComplete}
                allowUnmatchedValue={allowUnmatchedValue}
                code={code}
                codeResolver={codeResolver}
                inputChangeHandler={this._doLoad}
                onInputBlur={onInputBlur}
                pickList={pickList}
                ref='autocomplete'
                selectionHandler={selectionHandler}
                {...otherProps}
            />
        );
    },
    /**
     * Render the consult mode
     * @return {HTML} rendered element
     */
    _renderConsult() {
        const { value } = this.state;
        const { value: code } = this.props;
        return (
            <span>{value ? value : code}</span>
        );
    },
    /**
     * Render the component
     * @return {HTML} the rendered component
     */
    render() {
        let { isEdit } = this.props;
        return false === isEdit ? this._renderConsult() : this._renderEdit();
    }
};

const { mixin, component } = builder(AutocompleteFor);
export { mixin, component };
export default { mixin, component };
