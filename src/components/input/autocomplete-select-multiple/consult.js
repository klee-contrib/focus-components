import React, { Component, PropTypes } from 'react';
import Chip from '../../chip';

/**
 * Multi-autocomplete with Chip component in consult mode.
 */
class AutocompleteMultipleConsult extends Component {

    /**
     * Component's display name.
     */
    static displayName = 'AutocompleteMultipleConsult';

    /**
     * Component's prop types.
     */
    static propTypes = {
        value: PropTypes.arrayOf(PropTypes.number).isRequired,
        readonly: PropTypes.bool.isRequired,
        keyResolver: PropTypes.func.isRequired,
        onChange: PropTypes.func.isRequired,
        ChipElement: PropTypes.any
    };

    /**
     * Component's default props.
     */
    static defaultProps = {
        value: [],
        readonly: true,
        ChipElement: Chip
    };

    /**
     * Class constructor.
     * @param {object} props props given to component.
     */
    constructor(props) {
        super(props);

        this.state = {};

        this.updateLabel = this.updateLabel.bind(this);
        this.deleteElement = this.deleteElement.bind(this);
        this.renderChip = this.renderChip.bind(this);
    }

    /**
     * @inheritdoc
     */
    componentWillMount() {
        this.updateLabel(this.props.value);
    }

    /**
     * @inheritdoc
     */
    componentWillReceiveProps({ value }) {
        this.updateLabel(value);
    }

    /**
     * Method to resolve labels.
     * @param {array} value Array of selected ids.
     */
    updateLabel(value) {
        value.filter(id => !this.state[id]).forEach(id => this.props.keyResolver(id).then((resolvedLabel) => {
            this.setState({ [id]: resolvedLabel });
        }));
    }

    /**
     * Remove a selected element.
     * @param {number} id Identifier to delete.
     */
    deleteElement(id) {
        if (!this.props.readonly) {
            this.props.onChange(this.props.value.filter(elt => elt !== id));
        }
    }

    /**
     * Renders one element.
     * @param {number} id Identifier to render.
     * @return {ReactElement} markup.
     */
    renderChip(id) {
        const { ChipElement } = this.props;

        return (
            <ChipElement
                key={id}
                label={this.state[id] || id}
                readonly={this.props.readonly}
                deleteElement={() => this.deleteElement(id)}
            />
        );
    }

    /**
     * Render component.
     * @return {ReactElement} markup.
     */
    render() {
        const { value } = this.props;

        return (
            <div data-focus='list-chips'>
                {value.map(id => this.renderChip(id))}
            </div>
        );
    }

}

export default AutocompleteMultipleConsult;
