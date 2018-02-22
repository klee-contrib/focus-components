import PropTypes from 'prop-types';
import React, { Component } from 'react';
import AutocompleteSelectEdit from './edit';
import AutocompleteSelectConsult from './consult';
import translation from 'focus-core/translation';

class AutocompleteSelectField extends Component {

    state = {};

    static propTypes = {
        isEdit: PropTypes.bool.isRequired,
        keyResolver: PropTypes.func.isRequired,
        onChange: PropTypes.func.isRequired,
        querySearcher: PropTypes.func.isRequired
    };

    componentWillReceiveProps({ error }) {
        this.setState({ customError: error });
    }

    getValue = () => {
        const { isEdit, value } = this.props;
        if (isEdit) {
            return this.refs.autocomplete.getValue();
        } else {
            return value;
        }
    };

    _handleAutocompleteBadInput = value => {
        this.setState({ customError: translation.translate('autocomplete.error.badInput', { value }) })
    };

    _handleAutocompleteChange = value => {
        const { onChange } = this.props;
        this.setState({ customError: null }, () => {
            if (onChange) onChange(value);
        });
    };

    _renderEdit = () => {
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
    };

    _renderConsult = () => {
        return (
            <AutocompleteSelectConsult
                {...this.props}
            />
        );
    };

    render() {
        const { isEdit } = this.props;
        return isEdit ? this._renderEdit() : this._renderConsult();
    }
}

export default AutocompleteSelectField;