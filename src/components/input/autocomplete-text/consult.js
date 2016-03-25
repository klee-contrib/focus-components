import {Component} from 'react';
import ComponentBaseBehaviour from '../../../behaviours/component-base';

@ComponentBaseBehaviour
class AutocompleteTextConsult extends Component {
    state = {};
    render() {
        const {label, name, type, value} = this.props;
        return (
            <div
                label={label}
                name={name}
                type={type}
            >
                {value}
            </div>
        );
    }
}

export default AutocompleteTextConsult;
