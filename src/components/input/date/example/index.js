// Components

const InputDate = FocusComponents.components.input.Date;

class InputDateSample extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date1 : moment().toISOString()
        }
    }

    changeHandler = (id) => {
        return value => {
            const validation = this.refs[`date${id}`].validate(value);
            if (validation.isValid) {
                this.setState({
                    [`date${id}`]: value
                });
            } else {
                this.setState({
                    [`date${id}`]: value,
                    [`error${id}`]: validation.message
                });
            }
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
