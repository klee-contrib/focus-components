// Dependencies

import {Component, PropTypes} from 'react';
import moment from 'moment';
import Base from '../../behaviours/component-base';
import defaultLocale from './default-locale';
import DataRangePicker from 'react-bootstrap-daterangepicker';

const propTypes = {
    drops: PropTypes.oneOf(['up', 'down']).isRequired,
    error: PropTypes.string,
    formatter: PropTypes.func.isRequired,
    locale: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
    placeHolder: PropTypes.string.isRequired,
    showDropdown: PropTypes.bool.isRequired,
    value: (props, propName, componentName) => {
        const prop = props[propName];
        if (prop && !moment(prop).isValid()) {
            throw new Error(`The date (${prop}) is invalid for component ${componentName}. Please provide a valid date string.`);
        }
    }
};

const defaultProps = {
    drops: 'down',
    locale: defaultLocale,
    showDropdown: true,
    value: moment()
};

@Base
class InputDate extends Component {
    constructor(props) {
        super(props);
        const {value} = props;
        const state = {
            dropDownDate: moment(value).isValid() ? moment(value) : moment(),
            inputDate: this._formatDate(value)
        };
        this.state = state;
    }

    componentWillReceiveProps = ({value}) => {
        if (value !== this.props.value) {
            this.setState({
                dropDownDate: moment(value).isValid() ? moment(value) : moment(),
                inputDate: this._formatDate(value)
            });
        }
    }

    getValue = () => {
        const {dropDownDate, inputDate} = this.state;
        return inputDate ? dropDownDate.toISOString() : null;
    }

    _formatDate = (unformatedDate = moment()) => {
        const {locale: {format}} = this.props;
        return moment(unformatedDate).format(format);
    }

    render() {
        return (
            <div data-focus='input-date'>

            </div>
        );
    }
}

InputDate.propTypes = propTypes;
InputDate.defaultProps = defaultProps;

export default InputDate;
