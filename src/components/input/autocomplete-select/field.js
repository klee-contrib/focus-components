import React, { Component, PropTypes } from 'react';
import AutocompleteSelectEdit from './edit';
import AutocompleteSelectConsult from './consult';
import { translate } from 'focus-core/translation';

/**
 * Autocomplete select component.
 */
class AutocompleteSelectField extends Component {

    static displayName = 'AutocompleteSelectField';

    /** Proptypes. */
    static propTypes = {
        isEdit: PropTypes.bool.isRequired,
        keyResolver: PropTypes.func.isRequired,
        onChange: PropTypes.func.isRequired,
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
        querySearcher: PropTypes.func.isRequired
    };

    /** Initial state. */
    state = {};

    /**
     * AutocompleteSelectField constructor.
     * @param {object} props props.
     */
    constructor(props) {
        super(props);

        this._handleAutocompleteBadInput = this._handleAutocompleteBadInput.bind(this);
        this._handleAutocompleteChange = this._handleAutocompleteChange.bind(this);
    }

    /** @inheritdoc */
    componentWillReceiveProps({ error }) {
        this.setState({ customError: error });
    }

    /**
     * Get value.
     * @returns {string} value.
     */
    getValue() {
        const { isEdit, value } = this.props;
        if (isEdit) {
            return this.refs.autocomplete.getValue();
        } else {
            return value;
        }
    }

    /**
     * Handle bad input and display error message.
     * @param {string} value value.
     */
    _handleAutocompleteBadInput(value) {
        this.setState({ customError: translate('autocomplete.error.badInput', { value }) })
    }

    /**
     * Handle for value selection.
     * @param {object} value value.
     */
    _handleAutocompleteChange(value) {
        const { onChange } = this.props;
        this.setState({ customError: null }, () => {
            if (onChange) {
                onChange(value);
            }
        });
    }

    /**
     * Renders component in edition mode.
     * @returns {JSXElement} Edit component.
     */
    _renderEdit() {
        const { customError } = this.state;
        return (
            <AutocompleteSelectEdit
                customError={customError}
                onBadInput={this._handleAutocompleteBadInput}
                onChange={this._handleAutocompleteChange}
                ref='autocomplete'
                {...this.props}
            />
        );
    }

    /**
     * Renders component in consultation mode.
     * @returns {JSXElement} Consult component.
     */
    _renderConsult() {
        return (
            <AutocompleteSelectConsult
                {...this.props}
            />
        );
    }

    /** @inheritdoc */
    render() {
        const { isEdit } = this.props;
        return isEdit ? this._renderEdit() : this._renderConsult();
    }
}

export default AutocompleteSelectField;
