import React, { Component } from 'react';
import AutocompleteSelect from 'focus-components/components/input/autocomplete-select';
import { init } from 'focus-core/translation';

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
];

const querySearcher = query => {
    const value = data.filter(({ key, label }) => label.toLowerCase().indexOf(query.toLowerCase()) !== -1);
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({
                data: value,
                totalCount: value.length
            });
        }, 200);
    });
};

const keyResolver = key => {
    return new Promise((resolve, reject) => {
        data.forEach(element => {
            if (element.key === key) {
                setTimeout(resolve.bind(this, element.label), 10);
            }
        });
    });
}

const AutoComplete = (props) => {
    return (
        <AutocompleteSelect
            {...props}
        />
    )
}

const resources = {
    dev: {
        translation: {
            autocomplete: {
                error: {
                    badInput: '__value__ is not a valid entry.'
                }
            }
        }
    }
};

init({ resources: resources });

class Sample extends Component {

    state = { isEdit: true };

    componentDidMount() {
        setTimeout(() => {
            this.setState({ delayedValue: 'test' }, this.forceUpdate);
        }, 3000);
    }

    render() {
        const { delayedValue, isEdit } = this.state;

        return (
            <div>
                <AutocompleteSelect
                    isEdit={isEdit}
                    keyResolver={keyResolver}
                    querySearcher={querySearcher}
                    ref='first'
                    value='lol'
                />
                <br />
                <AutocompleteSelect
                    isEdit={isEdit}
                    keyResolver={keyResolver}
                    querySearcher={querySearcher}
                    value={delayedValue}
                /> <br />
                <button className='mdl-button mdl-js-button mdl-button--raised mdl-button--colored' onClick={() => { this.setState({ isEdit: !this.state.isEdit }) }}>Toggle edit</button>
                <button className='mdl-button mdl-js-button mdl-button--raised mdl-button--colored' onClick={() => { alert(this.refs.first.getValue()) }}>Get value of first one</button>
            </div>
        );
    }
}

export default Sample;
