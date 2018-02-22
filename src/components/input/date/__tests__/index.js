
import TestUtils from 'react-dom/test-utils';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import InputDate from '../';
import moment from 'moment';


global.componentHandler = {
    upgradeElement: jest.fn(),
    downgradeElements: jest.fn()
};

describe('The input date', () => {
    describe('when mounted with a valid value', () => {
        const now = new Date().toISOString();
        let reactComponent, domNode, inputNode;
        const onChangeSpy = jest.fn();
        beforeEach(() => {
            reactComponent = TestUtils.renderIntoDocument(<InputDate name='testdate' onChange={onChangeSpy} value={now} />);
            domNode = ReactDOM.findDOMNode(reactComponent);
        });
        it('should render a node with data-focus attribute', () => {
            expect(reactComponent).toBeDefined();
            expect(reactComponent).toBeInstanceOf(Object);
            expect(domNode.tagName).toBe('DIV');
            expect(domNode.getAttribute('data-focus')).toBe('input-date');
        });
        it('should hold the provided initial value', () => {
            expect(moment(reactComponent.getValue()).isSame(now, 'day')).toBe(true);
        });

        it('should display the provided date in the dropdown', () => {
            expect(moment(reactComponent.state.dropDownDate.toISOString()).isSame(now, 'day')).toBe(true);
        });
    });

    describe('when mounted with a disabled props', () => {
        const now = new Date().toISOString();
        let reactComponent, inputNode;
        const onChangeSpy = jest.fn();
        beforeEach(() => {
            reactComponent = TestUtils.renderIntoDocument(<InputDate name='testdate' onChange={onChangeSpy} value={now} disabled />);
            inputNode = ReactDOM.findDOMNode(reactComponent.refs.input.refs.htmlInput);
        });
        it('should render a node with disabled attribute', () => {
            expect(inputNode.hasAttribute('disabled')).toBe(true);
        });
    });

    describe('when mounted with a null value', () => {
        let renderedTest;
        const onChangeSpy = jest.fn();
        beforeEach(() => {
            renderedTest = TestUtils.renderIntoDocument(<InputDate name='testdate' onChange={onChangeSpy} value={null} />);
        });

        it('should give a null value', () => {
            expect(renderedTest.getValue()).toBeNull();
        });

        it('should display today\'s date in the dropdown', () => {
            expect(moment().isSame(renderedTest.state.dropDownDate, 'day')).toBe(true);
        });

        it('should not display anything in the input', () => {
            expect(ReactDOM.findDOMNode(renderedTest.refs.input.refs.htmlInput).value).toBe('');
        });

    });

    describe('when mounted with an invalid value', () => {
        let renderedTest;
        const onChangeSpy = jest.fn();
        const invalidDateString = 'invalid date';
        beforeEach(() => {
            renderedTest = TestUtils.renderIntoDocument(<InputDate name='testdate' onChange={onChangeSpy} value={invalidDateString} />);
        });

        it('should display the invalid value in the input', () => {
            expect(ReactDOM.findDOMNode(renderedTest.refs.input.refs.htmlInput).value).toBe(invalidDateString);
        });

        it('should give a null value', () => {
            expect(renderedTest.getValue()).toBeNull();
        });

        it('should display today\'s date in the dropdown', () => {
            expect(moment().isSame(renderedTest.state.dropDownDate, 'day')).toBe(true);
        });
    });

    describe('when the value given has a prop changes', () => {
        const now = new Date().toISOString();
        const past = new Date('01/10/1995').toISOString();
        let renderedTest;
        const onChangeSpy = jest.fn();
        class TestComponent extends Component {
            constructor() {
                super();
                this.state = {
                    value: now
                };
            }

            render() {
                return <InputDate name='testdate' onChange={onChangeSpy} ref='date' value={this.state.value} />;
            }
        }

        beforeEach(done => {
            renderedTest = TestUtils.renderIntoDocument(<TestComponent />);
            renderedTest.setState({ value: past }, done);
        });

        it('should change its internal value', () => {
            expect(moment.utc(renderedTest.refs.date.getValue()).isSame(moment.utc(past), 'day')).toBe(true);
        });
    });

    describe('when the user clears the input', () => {
        const now = new Date().toISOString();
        let renderedTest;
        const onChangeSpy = jest.fn();
        beforeEach(() => {
            renderedTest = TestUtils.renderIntoDocument(<InputDate name='testdate' onChange={onChangeSpy} value={now} />);
            const input = ReactDOM.findDOMNode(renderedTest.refs.input.refs.htmlInput);
            TestUtils.Simulate.change(input, { target: { value: '' } });
        });
        it('should give a null value', () => {
            expect(renderedTest.getValue()).toBeNull();
        });
    });

    describe('when the user enters a valid input', () => {
        const validDateString = '02/03/2010';
        let renderedTest;
        class TestComponent extends Component {
            constructor() {
                super();
                this.state = {
                    value: null
                };
            }

            onDateChange = (value) => {
                this.setState({ value });
            };

            render() {
                return <InputDate name='testdate' onChange={this.onDateChange} ref='date' value={this.state.value} />;
            }
        }
        beforeEach(() => {
            renderedTest = TestUtils.renderIntoDocument(<TestComponent />);
            const input = ReactDOM.findDOMNode(renderedTest.refs.date.refs.input.refs.htmlInput);
            TestUtils.Simulate.change(input, { target: { value: validDateString } });
        });
        it('should give the provided value', () => {
            expect(moment(renderedTest.refs.date.getValue()).isSame(moment.utc(validDateString, 'MM/DD/YYYY').toISOString())).toBe(true);
        });
    });

    describe('when the user enters a valid input with multiples formats', () => {
        const validDateString = '02/03/2010';
        let renderedTest;
        class TestComponent extends Component {
            constructor() {
                super();
                this.state = {
                    value: null
                };
            }

            onDateChange = (value) => {
                this.setState({ value });
            };

            render() {
                return <InputDate name='testdate' onChange={this.onDateChange} format={['DD/MM/YYYY', 'DDMMYY', 'DDMMYYYY']} ref='date' value={this.state.value} />;
            }
        }
        beforeEach(() => {
            renderedTest = TestUtils.renderIntoDocument(<TestComponent />);
            const input = ReactDOM.findDOMNode(renderedTest.refs.date.refs.input.refs.htmlInput);
            TestUtils.Simulate.change(input, { target: { value: validDateString } });
        });
        it('should give the provided value', () => {
            expect(moment(renderedTest.refs.date.getValue()).isSame(moment.utc(validDateString, 'DD/MM/YYYY').toISOString())).toBe(true);
        });
    });

    describe('when the user enters a partially valid input with multiples formats', () => {
        const validDateString = '020320';
        let renderedTest;
        class TestComponent extends Component {
            constructor() {
                super();
                this.state = {
                    value: null
                };
            }

            onDateChange = (value) => {
                this.setState({ value });
            };

            render() {
                return <InputDate name='testdate' onChange={this.onDateChange} format={['DD/MM/YYYY', 'DDMMYY', 'DDMMYYYY']} ref='date' value={this.state.value} />;
            }
        }
        beforeEach(() => {
            renderedTest = TestUtils.renderIntoDocument(<TestComponent />);
            const input = ReactDOM.findDOMNode(renderedTest.refs.date.refs.input.refs.htmlInput);
            TestUtils.Simulate.change(input, { target: { value: validDateString } });
        });
        it('should give the provided value', () => {
            expect(moment(renderedTest.refs.date.getValue()).isSame(moment.utc(validDateString, 'DDMMYY').toISOString())).toBe(true);
        });
    });

    describe('when the user enters a partially valid input with multiples formats and checkOnlyOnBlur', () => {
        const invalidDateString = '020320';
        let renderedTest;
        class TestComponent extends Component {
            constructor() {
                super();
                this.state = {
                    value: null
                };
            }

            onDateChange = (value) => {
                this.setState({ value });
            };

            render() {
                return <InputDate name='testdate' onChange={this.onDateChange} format={['DD/MM/YYYY', 'DDMMYY', 'DDMMYYYY']} checkOnlyOnBlur ref='date' value={this.state.value} />;
            }
        }
        beforeEach(() => {
            renderedTest = TestUtils.renderIntoDocument(<TestComponent />);
            const input = ReactDOM.findDOMNode(renderedTest.refs.date.refs.input.refs.htmlInput);
            TestUtils.Simulate.change(input, { target: { value: invalidDateString } });
        });
        it('should give the provided value', () => {
            expect(moment(renderedTest.refs.date.getValue()).isSame(moment.utc(invalidDateString, 'DDMMYY').toISOString())).toBe(true);
        });
        it('but still let the invalid value in the input', () => {
            expect(ReactDOM.findDOMNode(renderedTest.refs.date.refs.input.refs.htmlInput).value).toBe(invalidDateString);
        });
    });

    describe('when the user enters an invalid input', () => {
        const invalidDateString = 'Lol invalid';
        let renderedTest;
        class TestComponent extends Component {
            constructor() {
                super();
                this.state = {
                    value: null
                };
            }

            onDateChange = (value) => {
                this.setState({ value });
            };

            render() {
                return <InputDate name='testdate' onChange={this.onDateChange} ref='date' value={this.state.value} />;
            }
        }
        beforeEach(() => {
            renderedTest = TestUtils.renderIntoDocument(<TestComponent />);
            const input = ReactDOM.findDOMNode(renderedTest.refs.date.refs.input.refs.htmlInput);
            TestUtils.Simulate.change(input, { target: { value: invalidDateString } });
        });
        it('should give a null value', () => {
            expect(renderedTest.refs.date.getValue()).toBeNull();
        });
        it('but still let the invalid value in the input', () => {
            expect(ReactDOM.findDOMNode(renderedTest.refs.date.refs.input.refs.htmlInput).value).toBe(invalidDateString);
        });
    });

    describe('when a date is chosen in the date picker', () => {
        const validDate = moment.utc('2015-10-10T00:00:00.000Z').toISOString();
        let onChangeSpy;
        let renderedTest;
        beforeEach(() => {
            onChangeSpy = jest.fn();
            const onChange = data => {
                onChangeSpy(data);
                // cb();
            };

            class TestComponent extends Component {
                render() {
                    return <InputDate name='testdate' onChange={onChange} ref='date' value={validDate} />;
                }
            }
            renderedTest = TestUtils.renderIntoDocument(<TestComponent />);
            const input = ReactDOM.findDOMNode(renderedTest.refs.date.refs.input.refs.htmlInput);
            TestUtils.Simulate.focus(input);
            const firstDay = ReactDOM.findDOMNode(TestUtils.scryRenderedDOMComponentsWithClass(renderedTest, 'dp-day')[0]);
            TestUtils.Simulate.click(firstDay);
        });
        it('should call the onChange prop with the corresponding ISOString', () => {
            expect(onChangeSpy).toHaveBeenCalledWith(moment.utc('2015-09-27T00:00:00.000Z').toISOString());
        });
    });
});
