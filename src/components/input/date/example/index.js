// Components

const InputDate = FocusComponents.components.input.Date;
import moment from 'moment';

class InputDateSample extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date1 : moment().toISOString()
        }
    }

    changeHandler = (id) => {
        return value => {
            const {isValid, message} = this.refs[`date${id}`].validate(value);
                this.setState({
                    [`date${id}`]: value,
                    [`error${id}`]: isValid ? null : message
                });
        }
    }

    render = () => {
        const {date1, error1} = this.state;
        return (
            <div>
                <h3>With value</h3>
                <InputDate error={error1} name='date1' onChange={this.changeHandler(1)} ref='date1' value={date1} />
            </div>
        );
    }
}

return <InputDateSample/>;
