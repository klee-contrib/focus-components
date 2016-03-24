import AutocompleteText from '../edit';
const {renderIntoDocument, Simulate} = TestUtils;

describe.only('AutocompleteText', () => {
    describe('When no value is given', () => {
        let autocompleteText;
        before(() => {
            autocompleteText = renderIntoDocument(<AutocompleteText />);
        });
        it('should have a null object when getValue is called', () => {
            expect(autocompleteText.getValue()).to.be.null;
        });
    });
    describe('When a value is given', () => {
        let autocompleteText;
        const _value = 'hello';
        before(() => {
            autocompleteText = renderIntoDocument(<AutocompleteText value={_value}/>);
        });
        it('should render the given value', () => {
            expect(autocompleteText.getValue()).to.equal('hello');
        });
    });
    describe('When a value is typed by the user', () => {
        let autocompleteText;
        const _query = 'hello from the other side';
        let inputRef, initialState, dataResults;
        let querySearcherSpy = sinon.spy();
        before( () => {
            const _querySearcher = query => {
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
                querySearcherSpy(query);
                dataResults = data;
                return Promise.resolve({
                    data,
                    totalCount: data.length
                });
            };
            /*const querySearcherCustom = data => {
            dataResults = _querySearcher().then(({data}) => { return data});
            setTimeout(done, 0);
            return _querySearcher(data);
            };*/
            autocompleteText = renderIntoDocument(<AutocompleteText querySearcher={_querySearcher} />);
            inputRef = autocompleteText.refs.inputText;
            initialState = autocompleteText.state;
            Simulate.change(inputRef, {target: {value: _query}});
        });
        it('should update the inputValue state', () => {
            expect(autocompleteText.state.inputValue).to.equal(_query);
        });
        it('should return the new value on the getValue call', () => {
            expect(autocompleteText.getValue()).to.equal(_query);
        });
        it('should call the querySearcher', () => {
            expect(querySearcherSpy).to.have.been.called.once;
            expect(querySearcherSpy).to.have.been.calledWith(_query);
        });
        it('should update the state \'results\'', () => {
            expect(autocompleteText.state).to.not.equal(initialState);
        });
        it('should have the same data has the object given by the promise', () => {
            expect(autocompleteText.state.results).to.equal(dataResults);
        });
    });
});
