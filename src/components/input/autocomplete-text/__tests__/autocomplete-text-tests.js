import AutocompleteTextEdit from '../edit';
const {renderIntoDocument, Simulate} = TestUtils;

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
            autocompleteTextEdit = renderIntoDocument(<AutocompleteTextEdit querySearcher={_querySearcher} />);
            inputRef = autocompleteTextEdit.refs.inputText;
            initialState = autocompleteTextEdit.state;
            Simulate.change(inputRef, {target: {value: _query}});
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
        it('should update the state \'results\'', () => {
            expect(autocompleteTextEdit.state).to.not.equal(initialState);
        });
        it('should have the same data has the object given by the promise', () => {
            expect(autocompleteTextEdit.state.results).to.equal(dataResults);
        });
        it('should create an <ul>', () => {
            expect(autocompleteTextEdit.refs.results).to.exist;
        });
        it('should have created <li>s in the <ul>', () => {
            expect(autocompleteTextEdit.refs.result0).to.exist;
        });
    });
    describe('When a result is selected by the user', () => {
        let autocompleteTextEdit, selectedLI, inputRef, initialState;
        let _query = 'Hola';
        before(() => {
            const _querySearcher = query => {
                return Promise.resolve({
                    data,
                    totalCount: data.length
                });
            };
            autocompleteTextEdit = renderIntoDocument(<AutocompleteTextEdit querySearcher={_querySearcher} />);
            inputRef = autocompleteTextEdit.refs.inputText;
            initialState = autocompleteTextEdit.state;
            Simulate.change(inputRef, {target: {value: _query}});
        });
        it('should change the input value', () => {
            selectedLI = autocompleteTextEdit.refs.result0;
            Simulate.click(selectedLI);
            expect(autocompleteTextEdit.refs.inputText.value).to.equal(selectedLI.textContent);
        });
        it('should change component\'s state \'inputValue\'', () => {
            selectedLI = autocompleteTextEdit.refs.result0;
            Simulate.click(selectedLI);
            expect(autocompleteTextEdit.state.inputValue).to.equal(selectedLI.textContent);
            expect(autocompleteTextEdit.state.inputValue).to.equal(autocompleteTextEdit.refs.inputText.value);
        });
    });
});
