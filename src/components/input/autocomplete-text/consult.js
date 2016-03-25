import {Component} from 'react';
import ComponentBaseBehaviour from '../../../behaviours/component-base';

@ComponentBaseBehaviour
class AutocompleteTextConsult extends Component {
    state = {};
    render() {
        const {label, name, type, value} = this.props;
        const stateValue;
        const {stateValue = value} = this.state;
        return (
            <div
                label={label}
                name={name}
                type={type}
            >
                {stateValue}
            </div>
        );
    }
}

export default AutocompleteTextConsult;
