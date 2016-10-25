import AutocompleteTextEdit from '../edit';
const {renderIntoDocument, scryRenderedDOMComponentsWithTag, findRenderedDOMComponentWithTag, Simulate} = TestUtils;

const data = [
    {
        key: 'JL',
        label: 'Joh Lickeur'
    },
    {
        key: 'GK',
        label: 'Guénolé Kikabou'
    },
    {
        key: 'YL',
        label: 'Yannick Lounivis'
    }
];

describe('AutocompleteTextEdit', () => {
    describe('When no value is given', () => {
        let autocompleteTextEdit;
        before(() => {
            autocompleteTextEdit = renderIntoDocument(<AutocompleteTextEdit />);
        });
        it('should have a null object when getValue is called', () => {
            expect(autocompleteTextEdit.getValue()).to.be.null;
        });
    });
    describe('When a value is given', () => {
        let autocompleteTextEdit;
        const _value = 'hello';
        before(() => {
            autocompleteTextEdit = renderIntoDocument(<AutocompleteTextEdit value={_value}/>);
        });
        it('should render the given value', () => {
            expect(autocompleteTextEdit.getValue()).to.equal('hello');
        });
    });
    describe('When a value is typed by the user', () => {
        let autocompleteTextEdit;
        const _query = 'hello from the other side';
        let inputRef, initialState, dataResults;
        let querySearcherSpy = sinon.spy();
        before( () => {
            const _querySearcher = query => {
                querySearcherSpy(query);
                dataResults = data;
                return Promise.resolve({
                    data,
                    totalCount: data.length
                });
            };
            autocompleteTextEdit = renderIntoDocument(<AutocompleteTextEdit onChange={() => console.log('On change call...')} querySearcher={_querySearcher} inputTimeout={0} />);
            inputRef = autocompleteTextEdit.refs.inputText;
            initialState = autocompleteTextEdit.state;
            Simulate.change(inputRef, {target: {value: _query}});
            autocompleteTextEdit.setState({hasFocus: true});
        });
        it('should update the inputValue state', () => {
            expect(autocompleteTextEdit.state.inputValue).to.equal(_query);
        });
        it('should return the new value on the getValue call', () => {
            expect(autocompleteTextEdit.getValue()).to.equal(_query);
        });
        it('should call the querySearcher', () => {
            expect(querySearcherSpy).to.have.been.called.once;
            expect(querySearcherSpy).to.have.been.calledWith(_query);
        });
        it('should update the state \'suggestions\'', () => {
            expect(autocompleteTextEdit.state).to.not.equal(initialState);
        });
        it('should have the same data has the object given by the promise', () => {
            expect(autocompleteTextEdit.state.suggestions).to.equal(dataResults);
        });
        it('should create an <ul>', () => {
            expect(autocompleteTextEdit.refs.suggestions).to.exist;
        });
        it('should have created <li>s in the <ul>', () => {
            const arr = scryRenderedDOMComponentsWithTag(autocompleteTextEdit, 'li');
            expect(arr[0]).to.exist;
        });
        describe('When the data is empty and the error is set', () => {
            let inputRef;
            let _query = 'test';
            const customError = 'Sorry, no data.'
            const _querySearcher = query => {
                const emptyData = [];
                return Promise.resolve({
                    emptyData,
                    totalCount: emptyData.length
                });
            };
            before(() => {
                autocompleteTextEdit = renderIntoDocument(<AutocompleteTextEdit onChange={() => console.log('On change call...')} querySearcher={_querySearcher} inputTimeout={0} error={customError} />);
                inputRef = autocompleteTextEdit.refs.inputText;
                Simulate.change(inputRef, {target: {value: _query}})
            })
            it('should set the error state', () => {
                expect(autocompleteTextEdit.state.error).to.equal(customError);
            });
            it('should set the error <span> value', () => {
                expect(autocompleteTextEdit.refs.errorMessage.textContent).to.equal(customError);
            });
        });
    });
    describe('When the value is cleared by the user', () => {
        let autocompleteTextEdit;
        const _query = '';
        let inputRef, dataResults;
        const _querySearcher = query => {
            dataResults = data;
            return Promise.resolve({
                data,
                totalCount: data.length
            });
        };
        before(() => {
            autocompleteTextEdit = renderIntoDocument(<AutocompleteTextEdit onChange={() => console.log('On change call...')} querySearcher={_querySearcher} inputTimeout={0} />);
            inputRef = autocompleteTextEdit.refs.inputText;
            Simulate.change(inputRef, {target: {value: _query}});
        });
        it('should returns an empty value', () => {
            expect(autocompleteTextEdit.getValue()).to.equal('');
        });
    });
    describe('When a suggestion is selected by the user', () => {
        let autocompleteTextEdit, selectedLI, inputRef, initialState;
        let _query = 'Hola';
        let arr;
        before(() => {
            const _querySearcher = query => {
                return Promise.resolve({
                    data,
                    totalCount: data.length
                });
            };
            autocompleteTextEdit = renderIntoDocument(<AutocompleteTextEdit onChange={() => console.log('On change call...')} querySearcher={_querySearcher} inputTimeout={0} />);
            inputRef = autocompleteTextEdit.refs.inputText;
            initialState = autocompleteTextEdit.state;
            Simulate.change(inputRef, {target: {value: _query}});
            autocompleteTextEdit.setState({hasFocus: true});
        });
        it('should change the input value', () => {
            arr = scryRenderedDOMComponentsWithTag(autocompleteTextEdit, 'li');
            selectedLI = arr[0];
            Simulate.mouseDown(selectedLI);
            expect(autocompleteTextEdit.refs.inputText.value).to.equal(selectedLI.textContent);
            Simulate.change(inputRef, {target: {value: _query}});
        });
        it('should change component\'s state \'inputValue\'', () => {
            arr = scryRenderedDOMComponentsWithTag(autocompleteTextEdit, 'li');
            selectedLI = arr[0];
            Simulate.mouseDown(selectedLI);
            expect(autocompleteTextEdit.state.inputValue).to.equal(selectedLI.textContent);
            expect(autocompleteTextEdit.state.inputValue).to.equal(autocompleteTextEdit.refs.inputText.value);
            Simulate.change(inputRef, {target: {value: _query}});
        });
        it('should change component\'s state \'hasSuggestions\' to false', () => {
            arr = scryRenderedDOMComponentsWithTag(autocompleteTextEdit, 'li');
            selectedLI = arr[0];
            Simulate.mouseDown(selectedLI);
            expect(autocompleteTextEdit.state.hasSuggestions).to.equal(false);
        });
        it('should delete the <ul> on the DOM', () => {
            expect(autocompleteTextEdit.refs.suggestions).to.equal(undefined);
        });
        it('should set an empty suggestions state array', () => {
            expect(autocompleteTextEdit.state.suggestions.length).to.equal(0);
        });
    });
    describe('When the user clicks on the inputText', () => {
        let autocompleteTextEdit, inputRef;
        const query = 'hello from the upside';
        before(() => {
            autocompleteTextEdit = renderIntoDocument(<AutocompleteTextEdit />);
            inputRef = autocompleteTextEdit.refs.inputText;
            Simulate.focus(inputRef);
        });
        it('should set the hasFocus state to true', () => {
            expect(autocompleteTextEdit.state.hasFocus).to.equal(true);
        });
    });
});
