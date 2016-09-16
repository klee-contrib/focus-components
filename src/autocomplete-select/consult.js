import React, {Component} from 'react';
import i18next from 'i18next';

// TODO : add PropTypes
class AutocompleteSelectConsult extends Component {
    state = {};

    componentDidMount() {
        this._callKeyResolver(this.props.value);
    }

    componentWillReceiveProps({value}) {
        if (value !== this.props.value) this._callKeyResolver(value);
    }

    _callKeyResolver(value) {
        const {keyResolver} = this.props;
        keyResolver(value).then(label => {
            this.setState({resolvedLabel: label});
        }).catch(err => {console.error(err.message);});
    }

    render() {
        const {label, name, type, value} = this.props;
        const {resolvedLabel = value} = this.state;
        return (
            <div label={label} name={name} type={type}>
                {i18next.t(resolvedLabel)}
            </div>
        );
    }
}

export default AutocompleteSelectConsult;
