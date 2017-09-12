
import TestUtils from 'react-addons-test-utils';
import React from 'react';

import MaterialBehaviour from '../';


describe('The Material behaviour', () => {
    let mdlSpy;
    beforeEach(() => {
        mdlSpy = global.componentHandler = {
            upgradeElement: jest.fn(),
            downgradeElements: jest.fn()
        };
    });
    describe('when called with no ref', () => {
        beforeEach(() => {
            @MaterialBehaviour()
            class TestComponent extends React.Component {
                render() {
                    return (
                        <div ref='myRef'>
                            {this.props.test}
                        </div>
                    );
                }
            }
            TestUtils.renderIntoDocument(<TestComponent test='hello' />);
        });
        it('should not bind mdl JS', () => {
            expect(mdlSpy.upgradeElement).not.toHaveBeenCalled();
        });
    });
    describe('when called with a bad ref', () => {
        beforeEach(() => {
            @MaterialBehaviour('badRef')
            class TestComponent extends React.Component {
                render() {
                    return (
                        <div ref='myRef'>
                            {this.props.test}
                        </div>
                    );
                }
            }
            TestUtils.renderIntoDocument(<TestComponent test='hello' />);
        });

        it('should not bind mdl JS', () => {
            expect(mdlSpy.upgradeElement).not.toHaveBeenCalled();
        });
    });
    describe('when called with a good ref', () => {
        beforeEach(() => {
            @MaterialBehaviour('myRef')
            class TestComponent extends React.Component {
                render() {
                    return (
                        <div ref='myRef'>
                            {this.props.test}
                        </div>
                    );
                }
            }
            TestUtils.renderIntoDocument(<TestComponent test='hello' />);
        });

        it('should bind mdl JS once', () => {
            expect(mdlSpy.upgradeElement).toHaveBeenCalledTimes(1);
        });
    });
});
