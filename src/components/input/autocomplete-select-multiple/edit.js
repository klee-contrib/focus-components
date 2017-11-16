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
        error: PropTypes.string,
        ChipElement: PropTypes.any,
        position: PropTypes.oneOf(['top', 'bottom'])
    };

    /**
     * Component's default props.
     */
    static defaultProps = {
        value: [],
        checkDuplicate: false,
        error: null,
        ChipElement: undefined,
        position: 'top'
    };

    /**
     * Class constructor.
     * @param {object} props props given to component.
     */
    constructor(props) {
        super(props);

        this.state = { customError: '' };

        this.handleOnChange = this.handleOnChange.bind(this);
        this.renderConsult = this.renderConsult.bind(this);
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
     * Render consult component.
     * @return {ReactElement} markup.
     */
    renderConsult() {
        return (
            <Consult
                value={this.props.value}
                keyResolver={this.props.keyResolver}
                readonly={false}
                onChange={value => this.props.onChange(value)}
                ChipElement={this.props.ChipElement}
            />
        );
    }

    /**
     * Render component.
     * @return {ReactElement} markup.
     */
    render() {
        const { keyResolver, querySearcher, error, keyName, labelName } = this.props;
        return (
            <div data-focus='autocomplete-select-multiple'>
                {this.props.position === 'top' && this.renderConsult()}
                <AutocompleteSelectEdit
                    customError={this.state.customError || error}
                    keyResolver={keyResolver}
                    keyName={keyName}
                    labelName={labelName}
                    querySearcher={querySearcher}
                    onChange={this.handleOnChange}
                    onSelectClear
                />
                {this.props.position === 'bottom' && this.renderConsult()}
            </div>
        );
    }

}

export default AutocompleteMutipleEdit;