import React, { Component } from 'react';
import ComponentBaseBehaviour from '../../../behaviours/component-base';

/**
 * Autcomplete select component consultation view.
 */
@ComponentBaseBehaviour
class AutocompleteSelectConsult extends Component {

    static displayName = 'AutocompleteSelectConsult';

    /** Initial state. */
    state = {};

    /** @inheritdoc */
    componentDidMount() {
        this._callKeyResolver(this.props.value);
    }

    /** @inheritdoc */
    componentWillReceiveProps({ value }) {
        if (value !== this.props.value) {
            this._callKeyResolver(value);
        }
    }

    /**
     * Callback to resolve value into label.
     * @param {string} value value.
     */
    _callKeyResolver(value) {
        const { keyResolver } = this.props;
        if (keyResolver && value !== undefined && value !== null) {
            keyResolver(value).then(label => {
                this.setState({ resolvedLabel: label });
            }).catch(err => { console.error(err.message); });
        } else {
            this.setState({ resolvedLabel: '' });
        }
    }

    /** @inheritdoc */
    render() {
        const { label, name, type, value } = this.props;
        const { resolvedLabel = value } = this.state;

        return (
            <div
                label={label}
                name={name}
                type={type}
            >
                {this.i18n(resolvedLabel)}
            </div>
        );
    }
}

export default AutocompleteSelectConsult;
