import React, { Component, PropTypes } from 'react';
import ComponentBaseBehaviour from '../../../behaviours/component-base';

@ComponentBaseBehaviour
/**
 * Autcomplete select component consultation view.
 */
class AutocompleteSelectConsult extends Component {

    /** DisplayName. */
    static displayName = 'AutocompleteSelectConsult';

    /** PropTypes. */
    static propTypes = {
        keyName: PropTypes.string,
        keyResolver: PropTypes.func.isRequired,
        label: PropTypes.string.isRequired,
        labelName: PropTypes.string,
        name: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
        wholeItem: PropTypes.bool
    };

    /** DefaultProps. */
    static defaultProps = {
        keyName: 'key',
        labelName: 'label',
        wholeItem: false
    };

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
        const { keyResolver, keyName, wholeItem } = this.props;
        if (keyResolver && value !== undefined && value !== null) {
            const key = wholeItem ? value[keyName] : value;
            keyResolver(key).then(label => {
                this.setState({ resolvedLabel: label });
            }).catch(err => { console.error(err.message); });
        } else {
            this.setState({ resolvedLabel: '' });
        }
    }

    /** @inheritdoc */
    render() {
        const { label, name, type, value, wholeItem, labelName } = this.props;
        const { resolvedLabel = wholeItem ? value[labelName] : value } = this.state;

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
