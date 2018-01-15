
import TestUtils from 'react-dom/test-utils';
import React from 'react';
import ReactDOM from 'react-dom';

import { init } from 'focus-core/translation';

const i18nConfig = {
    resources: {},
    lng: 'fr-FR'///langOpts.i18nCulture
};

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

const onChangeHandler = () => console.log('Autocomplete onChange call...');

describe('The autocomplete select', () => {
    beforeEach(() => {
        init(i18nConfig);
        jest.useFakeTimers();
    });

    let renderedTest;
    describe('when mounted with no value', () => {
        beforeEach(() => {
            renderedTest = TestUtils.renderIntoDocument(<AutocompleteSelect onChange={onChangeHandler} keyResolver={keyResolver} querySearcher={querySearcher} inputTimeout={0} />);
        });
        it('should give an null object when getValue is called', () => {
            expect(renderedTest.getValue()).toBeNull();
        });
    });
    describe('when mounted with a value', () => {
        const value = 'value';
        let keyResolverSpy;

        beforeEach(() => {
            keyResolverSpy = jest.fn();
            const keyResolverSpied = data => {
                keyResolverSpy(data);
                return keyResolver(data);
            };

            renderedTest = TestUtils.renderIntoDocument(<AutocompleteSelect onChange={onChangeHandler} keyResolver={keyResolverSpied} querySearcher={querySearcher} value={value} inputTimeout={0} />);
        });
        it('should give a resolved value when getValue is called', () => {
            expect(renderedTest.getValue()).toBe(value);
        });
        it('should call the key resolver with the provided value', () => {
            expect(keyResolverSpy).toHaveBeenCalledTimes(1);
            expect(keyResolverSpy).toHaveBeenCalledWith(value);
        });
    });
    describe('when the user types in the field', () => {
        const query = 'query';
        let querySearcherSpy;
        let querySearcherSpied;
        beforeEach(() => {
            querySearcherSpy = jest.fn();
            querySearcherSpied = data => {
                querySearcherSpy(data);
                return querySearcher(data);
            };

            renderedTest = TestUtils.renderIntoDocument(<AutocompleteSelect onChange={onChangeHandler} keyResolver={keyResolver} querySearcher={querySearcherSpied} inputTimeout={0} />);
            const input = ReactDOM.findDOMNode(renderedTest.refs.htmlInput);
            TestUtils.Simulate.change(input, { target: { value: query } });
            jest.runAllTimers();
        });
        it('should call the query searcher once, with the user input', () => {
            expect(querySearcherSpy).toHaveBeenCalledTimes(1);
            expect(querySearcherSpy).toHaveBeenCalledWith(query);
        });
        it('should give a null value on the getValue since the user did not select anything', () => {
            expect(renderedTest.getValue()).toBeNull();
        });
    });
    describe.skip('when the user types in the field and selects an option', () => {
        const query = 'query';
        let onChangeSpy;
        beforeEach((done) => {
            onChangeSpy = jest.fn();
            // const querySearcherCustom = data => {
            //     // setTimeout(() => {
            //     //     TestUtils.Simulate.keyDown(input, { key: 'Down', keyCode: 40, which: 40 });
            //     //     TestUtils.Simulate.keyDown(input, { key: 'Down', keyCode: 40, which: 40 });
            //     //     TestUtils.Simulate.keyDown(input, { key: 'Enter', keyCode: 13, which: 13 });
            //     //     setTimeout(done, 0);
            //     // }, 0);
            //     return querySearcher(data);
            // };
            renderedTest = TestUtils.renderIntoDocument(<AutocompleteSelect onChange={onChangeSpy} keyResolver={keyResolver} querySearcher={querySearcher} inputTimeout={0} />);
            const input = ReactDOM.findDOMNode(renderedTest.refs.htmlInput);
            TestUtils.Simulate.focus(input);
            TestUtils.Simulate.change(input, { target: { value: query } });
            jest.runAllTimers();
            TestUtils.Simulate.keyDown(input, { key: 'Down', keyCode: 40, which: 40 });
            TestUtils.Simulate.keyDown(input, { key: 'Down', keyCode: 40, which: 40 });
            TestUtils.Simulate.keyDown(input, { key: 'Enter', keyCode: 13, which: 13 });
            jest.runAllTimers();

            // jest.runAllTimers();
            // jest.runAllTimers();
            // jest.runAllTimers();

        });
        it('should give the selected option when the getValue is called', () => {
            expect(renderedTest.getValue()).toBe('PAR');
        });
        it('should call the onChange with the selected value', () => {
            expect(onChangeSpy).toHaveBeenCalledTimes(1);
            expect(onChangeSpy).toHaveBeenCalledWith('PAR');
        });
    });
    describe.skip('when the user clears the input', () => {
        const value = 'value';
        let onChangeSpy;
        beforeEach(done => {
            onChangeSpy = jest.fn();
            const keyResolverStub = key => {
                // setTimeout(() => {
                //     const input = ReactDOM.findDOMNode(renderedTest.refs.htmlInput);
                //     TestUtils.Simulate.change(input, { target: { value: '' } });
                //     done();
                // }, 0);
                return keyResolver(key);
            }
            renderedTest = TestUtils.renderIntoDocument(<AutocompleteSelect onChange={onChangeSpy} keyResolver={keyResolverStub} querySearcher={querySearcher} value={value} inputTimeout={0} />);
            const input = ReactDOM.findDOMNode(renderedTest.refs.htmlInput);
            TestUtils.Simulate.change(input, { target: { value: '' } });
        });
        it('should give a null value when getValue is called', () => {
            expect(renderedTest.getValue()).toBeNull();
        });
        it('should call the onChange with the a null value', () => {
            expect(onChangeSpy).toHaveBeenCalledTimes(1);
            expect(onChangeSpy).toHaveBeenCalledWith(null);
        });
    });
    describe('when the given value changes', () => {
        let keyResolverSpy;
        const secondValue = 'secondValue';

        beforeEach(done => {
            keyResolverSpy = jest.fn();
            const keyResolverSpied = data => {
                keyResolverSpy(data);
                return keyResolver(data);
            };
            class Parent extends React.Component {
                state = { value: 'value' };
                render() {
                    const { value } = this.state;
                    return <AutocompleteSelect onChange={onChangeHandler} keyResolver={keyResolverSpied} querySearcher={querySearcher} value={value} ref='child' inputTimeout={0} />;
                }
            }

            renderedTest = TestUtils.renderIntoDocument(<Parent />);
            renderedTest.setState({ value: secondValue }, done);
        });
        it('should call the keyResolver twice', () => {
            expect(keyResolverSpy).toHaveBeenCalledTimes(2);
            expect(keyResolverSpy).toHaveBeenCalledWith('value');
            expect(keyResolverSpy).toHaveBeenCalledWith(secondValue);
        });
        it('should give the second value on a getValue', () => {
            expect(renderedTest.refs.child.getValue()).toBe(secondValue);
        });
    });
});
