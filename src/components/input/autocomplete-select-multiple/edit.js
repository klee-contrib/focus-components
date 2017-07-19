import React, { Component, PropTypes } from 'react';
import Consult from './consult';
import AutocompleteSelectEdit from '../autocomplete-select/edit';

class AutocompleteMutipleEdit extends Component {

    constructor(props) {
        super(props);

        this.handleOnChange = this.handleOnChange.bind(this);
        this.handleOnDelete = this.handleOnDelete.bind(this);

        this.state = { customError: '' };
    }

    handleOnChange(id) {
        const alreadyIncluded = (this.props.value || []).includes(id);
        this.setState({ customError: '' })
        if (!alreadyIncluded && id) {
            this.props.onChange((this.props.value || []).concat([id]));
        } else if (this.props.checkDuplicate && alreadyIncluded) {
            this.setState({ customError: 'input.multiAutocomplete.duplicate' })
        }

    }
    handleOnDelete(value) {
        this.props.onChange(value || []);
    }

    render() {
        return (
            <div data-focus='autocomplete-select-multiple'>
                <Consult
                    value={this.props.value}
                    keyResolver={this.props.keyResolver}
                    readonly={false}
                    onChange={this.handleOnDelete}
                />
                <AutocompleteSelectEdit
                    customError={this.state.customError || this.props.error}
                    keyResolver={this.props.keyResolver}
                    querySearcher={this.props.querySearcher}
                    onChange={this.handleOnChange}
                    onSelectClear
                />
            </div>
        );
    }
}

AutocompleteMutipleEdit.propTypes = {
    checkDuplicate: PropTypes.bool.isRequired,
    value: PropTypes.arrayOf(PropTypes.number).isRequired,
    onChange: PropTypes.func.isRequired,
    keyResolver: PropTypes.func.isRequired,
    querySearcher: PropTypes.func.isRequired,
    error: PropTypes.string
};

AutocompleteMutipleEdit.defaultProps = {
    checkDuplicate: false,
    error: null
};

export default AutocompleteMutipleEdit;