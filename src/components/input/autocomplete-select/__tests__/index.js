import AutocompleteSelect from '../edit';

const keyResolver = key => Promise.resolve(`Label for ${key}`);
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
    ];
    return Promise.resolve({
        data,
        totalCount: 10
    });
};

describe.only('The autocomplete select', () => {
    let renderedTest;
    describe('when mounted with no value', () => {
        before(() => {
            renderedTest = TestUtils.renderIntoDocument(<AutocompleteSelect keyResolver={keyResolver} querySearcher={querySearcher} inputTimeout={0}/>);
        });
        it('should give an empty object when getValue is called', () => {
            expect(renderedTest.getValue()).to.be.undefined;
        });
    });
    describe('when mounted with a value', () => {
        const value = 'value';
        before(() => {
            renderedTest = TestUtils.renderIntoDocument(<AutocompleteSelect keyResolver={keyResolver} querySearcher={querySearcher} value={value} inputTimeout={0}/>);
        });
        it('should give a resolved value when getValue is called', () => {
            expect(renderedTest.getValue()).to.equal(value);
        });
    });
    describe('when mounted', () => {
        const value = 'value';
        const keyResolverSpy = sinon.spy();
        const keyResolver = data => {
            keyResolverSpy(data);
            return Promise.resolve(data);
        };
        before(() => {
            renderedTest = TestUtils.renderIntoDocument(<AutocompleteSelect keyResolver={keyResolver} querySearcher={querySearcher} value={value} inputTimeout={0}/>);
        });
        it('should call the key resolver', () => {
            expect(keyResolverSpy).to.have.been.calledWith(value);
        });
    });
    describe('when the user types in the field', () => {
        const query = 'query';
        const querySearcherSpy = sinon.spy();
        const querySearcher = data => {
            querySearcherSpy(data);
            return Promise.resolve({data: [], totalCount: 0});
        };
        before(() => {
            renderedTest = TestUtils.renderIntoDocument(<AutocompleteSelect keyResolver={keyResolver} querySearcher={querySearcher} inputTimeout={0}/>);
            const input = ReactDOM.findDOMNode(renderedTest.refs.htmlInput);
            TestUtils.Simulate.change(input, {target: {value: query}});
        });
        it('should call the query searcher', () => {
            expect(querySearcherSpy).to.have.been.calledWith(query);
        });
        it('should give a null value since the user did not select anything', () => {
            expect(renderedTest.getValue()).to.be.null;
        });
    });
    describe('when the user clears the input', () => {
        const value = 'value';
        before(done => {
            const keyResolverStub = key => {
                setTimeout(() => {
                    const input = ReactDOM.findDOMNode(renderedTest.refs.htmlInput);
                    TestUtils.Simulate.change(input, {target: {value: ''}});
                    done();
                }, 0);
                return keyResolver(key);
            }
            renderedTest = TestUtils.renderIntoDocument(<AutocompleteSelect keyResolver={keyResolverStub} querySearcher={querySearcher} value={value} inputTimeout={0}/>);
        });
        it('should give a null value when getValue is called', () => {
            expect(renderedTest.getValue()).to.be.null;
        });
    });
});
