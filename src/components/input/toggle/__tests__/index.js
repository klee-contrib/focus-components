
import TestUtils from 'react-addons-test-utils';
import React from 'react';
import ReactDOM from 'react-dom';

import InputToggle from '../';

global.componentHandler = {
    upgradeElement: jest.fn(),
    downgradeElements: jest.fn()
};

describe('The input toggle', () => {
    describe('when mounted', () => {
        let renderedTest;
        const onChangeSpy = jest.fn();
        beforeEach(() => {
            renderedTest = TestUtils.renderIntoDocument(<InputToggle onChange={onChangeSpy} value />);
        });

        it('should hold the provided initial value', () => {
            expect(renderedTest.getValue()).toBe(true);
        });
    });
    describe('when clicked', () => {
        let renderedTest;
        let toggle;
        const onChangeSpy = jest.fn();
        beforeEach(() => {
            renderedTest = TestUtils.renderIntoDocument(<InputToggle onChange={onChangeSpy} value={false} />);
            toggle = ReactDOM.findDOMNode(renderedTest.refs.toggle);
            TestUtils.Simulate.change(toggle, { target: { checked: true } });
        });

        it('should call the handeOnChange prop', () => {
            expect(onChangeSpy).toHaveBeenCalledTimes(1);
        });

        it('should not change the toggle value if the parent does not explicitly change it', () => {
            expect(renderedTest.getValue()).toBe(false);
        });
    });
});
