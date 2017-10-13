import React, { Component, PropTypes } from 'react';
import AutocompleteTextEdit from './edit';
import AutocompleteTextConsult from './consult';

class AutocompleteTextField extends Component {

    state = {};

    static propTypes = {
        isEdit: PropTypes.bool.isRequired,
        onChange: PropTypes.func,
        querySearcher: PropTypes.func.isRequired
    };

    getValue = () => {
        const { isEdit, value } = this.props;
        if (isEdit) {
            return this.refs.autocomplete.getValue();
        } else {
            return value;
        }
    };

    _renderEdit = () => {
        return (
            <AutocompleteTextEdit
                ref='autocomplete'
                {...this.props}
            />
        );
    };

    _renderConsult = () => {
        return (
            <AutocompleteTextConsult
                {...this.props}
            />
        );
    };

    render() {
        const { isEdit } = this.props;
        return isEdit ? this._renderEdit() : this._renderConsult();
    }
}

export default AutocompleteTextField;
