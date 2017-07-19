import React, { Component, PropTypes } from 'react';
import Chip from '../../chip';

class AutocompleteMultipleConsult extends Component {

    state = {}

    componentWillMount() {
        (this.props.value || []).forEach(id => this.props.keyResolver(id).then((resolvedLabel) => {
            this.setState({ [id]: resolvedLabel });
        }))
    }

    componentWillReceiveProps({ value }) {
        value.filter(id => !this.state[id]).forEach(id => this.props.keyResolver(id).then((resolvedLabel) => {
            this.setState({ [id]: resolvedLabel });
        }))
    }

    deleteElement(id) {
        if (!this.props.readonly) {
            this.props.onChange(this.props.value.filter(elt => elt !== id))
        }
    }

    renderChip(id) {
        const { ChipElement } = this.props;
        return (
            <ChipElement key={id} label={this.state[id] || id} readonly={this.props.readonly} deleteElement={() => this.deleteElement(id)} />
        );
    }

    render() {
        const { value } = this.props;
        return (
            <div data-focus='list-chips'>
                {(value || []).map(id => this.renderChip(id))}
            </div>
        );
    }
}

AutocompleteMultipleConsult.propTypes = {
    value: PropTypes.arrayOf(PropTypes.number).isRequired,
    readonly: PropTypes.bool.isRequired,
    keyResolver: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    ChipElement: PropTypes.any
};

AutocompleteMultipleConsult.defaultProps = {
    ChipElement: Chip,
    readonly: true
};

export default AutocompleteMultipleConsult;