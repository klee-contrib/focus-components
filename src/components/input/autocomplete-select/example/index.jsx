const {AutocompleteSelect} = FocusComponents.components.input;

const keyResolver = key => {
    return new Promise((resolve, reject) => {
        setTimeout(resolve.bind(this, 'Resolved value'), 300);
    });
}

const querySearcher = query => {
    const data = [
        {
            key: 'NY',
            label: 'New York'
        },
        {
            key: 'PAR',
            label: 'Paris'
        },
        {
            key: 'TOY',
            label: 'Tokyo'
        },
        {
            key: 'BEI',
            label: 'Pékin'
        },
        {
            key: 'LON',
            label: 'Londres'
        },
        {
            key: 'BER',
            label: 'Berlin'
        }
    ].filter(({key, label}) => label.toLowerCase().indexOf(query.toLowerCase()) !== -1);
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({
                data,
                totalCount: 40
            });
        }, 200);
    });
}

class Sample extends React.Component {
    state = {isEdit: true};

    componentDidMount() {
        setTimeout(() => {
            this.setState({delayedValue: 'test'}, this.forceUpdate);
        }, 3000);
    }



    render() {
        const {delayedValue, isEdit} = this.state;
        return (
            <div>
                <button onClick={() => {this.setState({isEdit: !this.state.isEdit})}}>Toggle edit</button>
                <button onClick={() => {alert(this.refs.first.getValue())}}>Get value of first one</button>
                <AutocompleteSelect
                    isEdit={isEdit}
                    keyResolver={keyResolver}
                    querySearcher={querySearcher}
                    ref='first'
                    value='lol'
                    />
                <AutocompleteSelect
                    isEdit={isEdit}
                    keyResolver={keyResolver}
                    querySearcher={querySearcher}
                    value={delayedValue}
                    />
            </div>
        );
    }
}

module.exports = Sample;
