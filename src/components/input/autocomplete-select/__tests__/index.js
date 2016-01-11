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

describe('The autocomplete select', () => {
    let renderedTest;
    describe('when mounted with no value', () => {
        before(() => {
            renderedTest = TestUtils.renderIntoDocument(<AutocompleteSelect keyResolver={keyResolver} querySearcher={querySearcher} inputTimeout={0}/>);
        });
        it('should give an null object when getValue is called', () => {
            expect(renderedTest.getValue()).to.be.null;
        });
    });
    describe('when mounted with a value', () => {
        const value = 'value';
        const keyResolverSpy = sinon.spy();
        const keyResolverSpied = data => {
            keyResolverSpy(data);
            return keyResolver(data);
        };
        before(() => {
            renderedTest = TestUtils.renderIntoDocument(<AutocompleteSelect keyResolver={keyResolverSpied} querySearcher={querySearcher} value={value} inputTimeout={0}/>);
        });
        it('should give a resolved value when getValue is called', () => {
            expect(renderedTest.getValue()).to.equal(value);
        });
        it('should call the key resolver with the provided value', () => {
            expect(keyResolverSpy).to.have.been.calledOnce;
            expect(keyResolverSpy).to.have.been.calledWith(value);
        });
    });
    describe('when the user types in the field', () => {
        const query = 'query';
        const querySearcherSpy = sinon.spy();
        const querySearcherSpied = data => {
            querySearcherSpy(data);
            return querySearcher(data);
        };
        before(() => {
            renderedTest = TestUtils.renderIntoDocument(<AutocompleteSelect keyResolver={keyResolver} querySearcher={querySearcherSpied} inputTimeout={0}/>);
            const input = ReactDOM.findDOMNode(renderedTest.refs.htmlInput);
            TestUtils.Simulate.change(input, {target: {value: query}});
        });
        it('should call the query searcher once, with the user input', () => {
            expect(querySearcherSpy).to.have.been.calledOnce;
            expect(querySearcherSpy).to.have.been.calledWith(query);
        });
        it('should give a null value on the getValue since the user did not select anything', () => {
            expect(renderedTest.getValue()).to.be.null;
        });
    });
    describe('when the user types in the field and selects an option', () => {
        const query = 'query';
        const onChangeSpy = sinon.spy();
        before(done => {
            const querySearcherCustom = data => {
                setTimeout(() => {
                    TestUtils.Simulate.keyDown(input, {key: 'Down', keyCode: 40, which: 40});
                    TestUtils.Simulate.keyDown(input, {key: 'Down', keyCode: 40, which: 40});
                    TestUtils.Simulate.keyDown(input, {key: 'Enter', keyCode: 13, which: 13});
                    setTimeout(done, 0);
                }, 0);
                return querySearcher(data);
            };
            renderedTest = TestUtils.renderIntoDocument(<AutocompleteSelect onChange={onChangeSpy} keyResolver={keyResolver} querySearcher={querySearcherCustom} inputTimeout={0}/>);
            const input = ReactDOM.findDOMNode(renderedTest.refs.htmlInput);
            TestUtils.Simulate.change(input, {target: {value: query}});
        });
        it('should give the selected option when the getValue is called', () => {
            expect(renderedTest.getValue()).to.equal('PAR');
        });
        it('should call the onChange with the selected value', () => {
            expect(onChangeSpy).to.have.been.called.once;
            expect(onChangeSpy).to.have.been.calledWith('PAR');
        });
    });
    describe('when the user clears the input', () => {
        const value = 'value';
        const onChangeSpy = sinon.spy();
        before(done => {
            const keyResolverStub = key => {
                setTimeout(() => {
                    const input = ReactDOM.findDOMNode(renderedTest.refs.htmlInput);
                    TestUtils.Simulate.change(input, {target: {value: ''}});
                    done();
                }, 0);
                return keyResolver(key);
            }
            renderedTest = TestUtils.renderIntoDocument(<AutocompleteSelect onChange={onChangeSpy} keyResolver={keyResolverStub} querySearcher={querySearcher} value={value} inputTimeout={0}/>);
        });
        it('should give a null value when getValue is called', () => {
            expect(renderedTest.getValue()).to.be.null;
        });
        it('should call the onChange with the a null value', () => {
            expect(onChangeSpy).to.have.been.called.once;
            expect(onChangeSpy).to.have.been.calledWith(null);
        });
    });
    describe('when the given value changes', () => {
        const keyResolverSpy = sinon.spy();
        const secondValue = 'secondValue';
        const keyResolverSpied = data => {
            keyResolverSpy(data);
            return keyResolver(data);
        };
        class Parent extends React.Component {
            state = {value: 'value'};
            render() {
                const {value} = this.state;
                return <AutocompleteSelect keyResolver={keyResolverSpied} querySearcher={querySearcher} value={value} ref='child' inputTimeout={0}/>;
            }
        }
        before(done => {
            renderedTest = TestUtils.renderIntoDocument(<Parent/>);
            renderedTest.setState({value: secondValue}, done);
        });
        it('should call the keyResolver twice', () => {
            expect(keyResolverSpy).to.have.been.calledTwice;
            expect(keyResolverSpy).to.have.been.calledWith('value');
            expect(keyResolverSpy).to.have.been.calledWith(secondValue);
        });
        it('should give the second value on a getValue', () => {
            expect(renderedTest.refs.child.getValue()).to.equal(secondValue);
        });
    });
});
