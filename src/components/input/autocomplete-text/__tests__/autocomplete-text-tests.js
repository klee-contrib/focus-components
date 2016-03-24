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
        let inputRef;
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
            return Promise.resolve({
                data,
                totalCount: data.length
            });
        };
        before( () => {
            autocompleteText = renderIntoDocument(<AutocompleteText querySearcher={_querySearcher}/>);
            inputRef = autocompleteText.refs.inputText;
            Simulate.change(inputRef, {target: {value: _query}});
        });
        it('should update the inputValue state', () => {
            expect(autocompleteText.state.inputValue).to.equal(_query);
            console.log(autocompleteText.state.inputValue);
        });
        it('should return the new value on the getValue call', () => {
            expect(autocompleteText.getValue()).to.equal(_query);
        });
        it('should call the querySearcher', () => {
            const theCall = () => {
                const myData = autocompleteText.props.querySearcher().then(({data, totalCount}) => {
                    return data;
                });
                return Promise.resolve({
                    myData
                })
            };
            console.log(theCall().then());
        });
    });
});
