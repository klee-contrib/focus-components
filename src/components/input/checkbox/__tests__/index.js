
import TestUtils from 'react-dom/test-utils';
import React from 'react';
import ReactDOM from 'react-dom';

import InputCheckBox from '../';

global.componentHandler = {
    upgradeElement: jest.fn(),
    downgradeElements: jest.fn()
};

describe('The input checkbox', () => {
    describe('when mounted', () => {
        let renderedTest;
        const onChangeSpy = jest.fn();
        beforeEach(() => {
            renderedTest = TestUtils.renderIntoDocument(<InputCheckBox onChange={onChangeSpy} value />);
        });

        it('should hold the provided initial value', () => {
            expect(renderedTest.getValue()).toBe(true);
        });
    });
    describe('when clicked', () => {
        let renderedTest;
        let checkbox;
        const onChangeSpy = jest.fn();
        beforeEach(() => {
            renderedTest = TestUtils.renderIntoDocument(<InputCheckBox onChange={onChangeSpy} value={false} />);
            checkbox = ReactDOM.findDOMNode(renderedTest.refs.checkbox);
            TestUtils.Simulate.change(checkbox, { target: { checked: true } });
        });

        it('should call the handeOnChange prop', () => {
            expect(onChangeSpy).toHaveBeenCalledTimes(1);
        });

        it('should not change the checkbox value if the parent does not explicitly change it', () => {
            expect(renderedTest.getValue()).toBe(false);
        });
    });
});
