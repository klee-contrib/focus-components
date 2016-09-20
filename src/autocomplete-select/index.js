import React, {Component, PropTypes} from 'react';
import AutocompleteSelectEdit from './edit';
import AutocompleteSelectConsult from './consult';
import i18next from 'i18next';


class AutocompleteSelectField extends Component {
    state = {};

    static propTypes = {
        isEdit: PropTypes.bool.isRequired,
        keyResolver: PropTypes.func.isRequired,
        onChange: PropTypes.func.isRequired,
        querySearcher: PropTypes.func.isRequired
    };

    componentWillReceiveProps({error}) {
        this.setState({customError: error});
    }

    getValue = () => {
        const {isEdit, value} = this.props;
        if (isEdit) {
            return this.refs.autocomplete.getValue();
        } else {
            return value;
        }
    };

    _handleAutocompleteBadInput = value => {
        this.setState({customError: i18next.t('input.autocomplete.error.invalid', {value})})
    };

    _handleAutocompleteChange = value => {
        const {onChange} = this.props;
        this.setState({customError: null}, () => {
            if (onChange) onChange(value);
        });
    };

    _renderEdit = () => {
        const {customError} = this.state;
        return (
            <AutocompleteSelectEdit
                customError={customError}
                onBadInput={this._handleAutocompleteBadInput}
                onChange={this._handleAutocompleteChange}
                ref='autocomplete'
            />
        );
    };

    _renderConsult = () => {
        return (
            <AutocompleteSelectConsult
            />
        );
    };

    render() {
        const {isEdit} = this.props;
        return isEdit ? this._renderEdit() : this._renderConsult();
    }
}

export default AutocompleteSelectField;
