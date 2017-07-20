import React, { Component, PropTypes } from 'react';
import Consult from './consult';
import Edit from './edit';

/**
 * Multi-autocomplete with Chip component.
 */
class MultiAutocomplete extends Component {

    /**
     * Component's display name.
     */
    static displayName = 'MultiAutocomplete';

    /**
     * Component's prop types.
     */
    static propTypes = {
        value: PropTypes.arrayOf(PropTypes.number).isRequired,
        isEdit: PropTypes.bool.isRequired,
        keyResolver: PropTypes.func.isRequired,
        querySearcher: PropTypes.func.isRequired,
        onChange: PropTypes.func.isRequired,
        checkDuplicate: PropTypes.bool
    };

    /**
     * Component's default props.
     */
    static defaultProps = {
        checkDuplicate: false
    };

    /**
     * Render in consult mode.
     * @return {ReactElement} markup.
     */
    renderConsult() {
        return (
            <Consult
                value={this.props.value}
                keyResolver={this.props.keyResolver}
                readonly
            />
        );
    }

    /**
     * Render in edit mode.
     * @return {ReactElement} markup.
     */
    renderEdit() {
        return (
            <Edit
                value={this.props.value}
                readonly={false}
                keyResolver={this.props.keyResolver}
                querySearcher={this.props.querySearcher}
                onChange={this.props.onChange}
                checkDuplicate={this.props.checkDuplicate}
            />
        );
    }

    /**
     * Render component.
     * @return {ReactElement} markup.
     */
    render() {
        return this.props.isEdit ? this.renderEdit() : this.renderConsult();
    }

}

export default MultiAutocomplete;