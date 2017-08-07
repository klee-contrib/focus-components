import InputDate from 'focus-components/components/input/date';
import moment from 'moment';

class InputDateSample extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            date1: moment().toISOString()
        }
    }

    changeHandler = id => {
        return value => {
            const { isValid, message } = this.refs[`date${id}`].validate();
            this.setState({
                [`date${id}`]: value,
                [`error${id}`]: isValid ? null : message
            });
        }
    }

    render = () => {
        const { date1, error1 } = this.state;

        return (
            <div style={{ maxWidth: '500px', minHeight: '600px' }}>
                <h3>Input date</h3>
                <p>You can input some dates either by typing it directly, or by picking it in the dropdown. For this example, the loaded locale is the french one.</p>
                <InputDate
                    error={error1}
                    format={['DD/MM/YYYY', 'DD.MM.YYYY', 'DD MMM YYYY']}
                    locale='fr'
                    name='date1'
                    onChange={this.changeHandler(1)}
                    ref='date1'
                    value={date1}
                />
            </div>
        );
    }
}

export default InputDateSample;
