import React, { Component, PropTypes } from 'react';
import Consult from './consult';
import AutocompleteSelectEdit from '../autocomplete-select/edit';

/**
 * Multi-autocomplete with Chip component in edit mode.
 */
class AutocompleteMutipleEdit extends Component {

    /**
     * Component's display name.
     */
    static displayName = 'AutocompleteMutipleEdit';

    /**
     * Component's prop types.
     */
    static propTypes = {
        value: PropTypes.arrayOf(PropTypes.number).isRequired,
        onChange: PropTypes.func.isRequired,
        keyResolver: PropTypes.func.isRequired,
        querySearcher: PropTypes.func.isRequired,
        checkDuplicate: PropTypes.bool.isRequired,
        error: PropTypes.string
    };

    /**
     * Component's default props.
     */
    static defaultProps = {
        value: [],
        checkDuplicate: false,
        error: null
    };

    /**
     * Class constructor.
     * @param {object} props props given to component.
     */
    constructor(props) {
        super(props);

        this.state = { customError: '' };

        this.handleOnChange = this.handleOnChange.bind(this);
    }

    /**
     * Handle update behavior.
     * @param {number} id Identifier.
     */
    handleOnChange(id) {
        this.setState({ customError: '' });

        const alreadyIncluded = (this.props.value).includes(id);
        if (!alreadyIncluded && id) {
            this.props.onChange((this.props.value).concat([id]));
        } else if (this.props.checkDuplicate && alreadyIncluded) {
            this.setState({ customError: 'input.multiAutocomplete.duplicate' });
        }
    }

    /**
     * Render component.
     * @return {ReactElement} markup.
     */
    render() {
        return (
            <div data-focus='autocomplete-select-multiple'>
                <Consult
                    value={this.props.value}
                    keyResolver={this.props.keyResolver}
                    readonly={false}
                    onChange={value => this.props.onChange(value)}
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

export default AutocompleteMutipleEdit;