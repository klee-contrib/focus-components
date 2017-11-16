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
        const { isRequired } = this.props;
        return ({
            isValid: !isRequired || (this.props.value && this.props.value.length > 0),
            message: 'field.required'
        });

    }

    /**
     * Render in consult mode.
     * @return {ReactElement} markup.
     */
    renderConsult() {
        const { value, keyResolver, keyName, labelName } = this.props;

        return (
            <Consult
                value={value}
                keyResolver={keyResolver}
                keyName={keyName}
                labelName={labelName}
                readonly
            />
        );
    }

    /**
     * Render in edit mode.
     * @return {ReactElement} markup.
     */
    renderEdit() {
        const { keyResolver, querySearcher, onChange, checkDuplicate, position, ChipElement, keyName, labelName } = this.props;

        return (
            <Edit
                value={this.props.value}
                readonly={false}
                keyResolver={keyResolver}
                querySearcher={querySearcher}
                onChange={onChange}
                checkDuplicate={checkDuplicate}
                position={position}
                ChipElement={ChipElement}
                keyName={keyName}
                labelName={labelName}
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