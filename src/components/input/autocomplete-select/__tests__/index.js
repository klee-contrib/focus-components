import AutocompleteSelect from '../';

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
        it('should give a resolved object when getValue is called', () => {
            expect(renderedTest.getValue()).to.equal(value);
        });
    });
});
