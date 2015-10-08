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
            const {isValid, message} = this.refs[`date${id}`].validate();
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
                <InputDate error={error1} format='DD/MM/YYYY' locale='fr' name='date1' onChange={this.changeHandler(1)} ref='date1' value={date1} />
            </div>
        );
    }
}

return <InputDateSample/>;
