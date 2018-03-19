// Dependencies
import React from 'react';
import FirstWrapper from 'focus-components/components/confirm';
import confirm from 'focus-core/application/confirm';
import Input from 'focus-components/components/input/text';
import AutocompleteSelect from 'focus-components/components/input/autocomplete-select';

class ConfirmExample extends React.Component {
    // This code is for the first confirm example
    firstDataBuilder = () => {
        return 'Hey there do you want to continue';
    };

    firstConfirm = () => {
        const self = this;
        const value = self.refs.textName.textValue();
        alert('Welcome to Focus ' + value);
    };

    firstCancel = () => {
        console.log('KO');
    };

    renderTextValue = () => {
        const self = this;
        return 'So, your name is ' + self.refs.textName.textValue() + ' ?';
    };

    // This one is for the second confirm example (will contain a component inside the popin)
    secondDataBuilder = () => {
        return MyAutocomplete;
    };

    secondConfirm = (value) => {
        console.log(value);
    };

    secondCancel = () => {
        console.log('Save has failed');
    };

    render() {
        return (
            <div>
                <FirstWrapper />
                <h1>Confirm example</h1>
                <h5> What's your name ?</h5>
                <NameText ref='textName' />
                <button className='mdl-button mdl-js-button mdl-button--raised mdl-button--colored' onClick={() => confirm(this.renderTextValue()).then(() => this.firstConfirm(), () => this.firstCancel())}>
                    Confirm
                </button>

                <h1>Second example</h1>
                <h5>Here you can put your Component to display it trough a Confirm Popin</h5>
                <button className='mdl-button mdl-js-button mdl-button--raised mdl-button--colored' onClick={() => confirm(this.secondDataBuilder()).then(() => this.secondConfirm(), () => this.secondCancel())}>
                    Save
                </button>
            </div>
        );
    }
}

const keyResolver = key => {
    return new Promise((resolve, reject) => {
        setTimeout(resolve.bind(this, ''), 300);
    });
}

const querySearcher = query => {
    const data = [
        {
            key: 'PAR',
            label: 'Paris'
        },
        {
            key: 'MAN',
            label: 'Manchester'
        },
        {
            key: 'LON',
            label: 'Londres'
        }
    ].filter(({ key, label }) => label.toLowerCase().indexOf(query.toLowerCase()) !== -1);
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({
                data,
                totalCount: 40
            });
        }, 200);
    });
}

class MyAutocomplete extends React.Component {
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
                <h1> Enter your city name</h1>
                <h5>Here is the AutocompleteSelect imported to give a customized confirm popin. You'll have the posibility to get the data you want from it.</h5>
                <AutocompleteSelect ref='autocomp' isEdit={isEdit} keyResolver={keyResolver} querySearcher={querySearcher} onChange={() => console.log('Autocomplete text is changing')} />
            </div>
        );
    }
}

class NameText extends React.Component {
    textValue = () => {
        return this.refs.textName.getValue();
    };

    render() {
        return (
            <Input name='myInput' onChange={() => console.log('Changing the input')} ref='textName' />
        );
    }
}

export default ConfirmExample;
