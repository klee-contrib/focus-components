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
        checkDuplicate: PropTypes.bool,
        ChipElement: PropTypes.any,
        position: PropTypes.oneOf(['top', 'bottom'])
    };

    /**
     * Component's default props.
     */
    static defaultProps = {
        checkDuplicate: false,
        ChipElement: undefined,
        position: 'top'
    };

    /**
     * Class constructor.
     * @param {object} props props.
     */
    constructor(props) {
        super(props);

        this.getValue = this.getValue.bind(this);
        this.validate = this.validate.bind(this);
        this.renderEdit = this.renderEdit.bind(this);
        this.renderConsult = this.renderConsult.bind(this);
    }

    /**
     * @inheritdoc
     */
    componentWillReceiveProps({ value }) {
        this.setState({ value });
    }

    /**
     * Returns value.
     * @return {array} current value.
     */
    getValue() {
        return this.props.value;
    }

    /**
     * Validate component state.
     */
    validate() {
        // do nothing, validation is done at each selection
        return true;
    }

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
                position={this.props.position}
                ChipElement={this.props.ChipElement}
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