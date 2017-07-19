import React, { Component, PropTypes } from 'react';
import Consult from './consult';
import Edit from './edit';


class MultiAutocomplete extends Component {
    render() {
        return this.props.isEdit ? this.renderEdit() : this.renderConsult();

    }
    renderConsult() {
        return (
            <Consult
                value={this.props.value}
                keyResolver={this.props.keyResolver}
                readonly
            />
        )

    }
    renderEdit() {
        return (
            <Edit
                value={this.props.value}
                readonly={false}
                keyResolver={this.props.keyResolver}
                querySearcher={this.props.querySearcher}
                onChange={this.props.onChange}
                checkForDouble={this.props.checkForDouble}
            />
        )

    }
}

MultiAutocomplete.propTypes = {
    isEdit: PropTypes.bool.isRequired,
    keyResolver: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    querySearcher: PropTypes.func.isRequired,
    checkForDouble: PropTypes.bool
};

MultiAutocomplete.defaultProps = {
    checkForDouble: false
}

export default MultiAutocomplete;