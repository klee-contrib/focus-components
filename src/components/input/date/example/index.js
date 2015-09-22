// Components

const InputDate = FocusComponents.components.input.Date;

class InputDateSample extends React.Component {
    constructor(props) {
        super(props);
        console.log(moment().toISOString());
        this.state = {
            date1 : moment().toISOString()
        }
    }

    changeHandler = (id) => {
        return value => {
            this.setState({
                [`date${id}`]: value
            });
        }
    }

    render = () => {
        const {date1} = this.state;
        return (
            <div>
                <h3>With value</h3>
                <InputDate name='date1' onChange={this.changeHandler(1)} value={date1} />
            </div>
        );
    }
}

return <InputDateSample/>;
