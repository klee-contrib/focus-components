import React, {Component} from 'react';
import {mixin as formMixin} from '../../form';
import {component as Debug} from '../../../../test/components';
import Panel from '../../../components/panel';
import {BasicFakeForm, FakeForm} from './fake-form';

import {initEnvironment, loadRef, loadRefList} from './environment';
const {renderIntoDocument, findAllInRenderedTree} = TestUtils;
const alertSpy = sinon.spy();

const _ = require("lodash");

initEnvironment();

describe.only('The Form component', () => {

    describe('Basic Form with no action, not editable ', () => {

        const testedReactCpt = <BasicFakeForm hasLoad={false} isEdit={false}>
            <div data-focus="child1">test1</div>
        </BasicFakeForm>;
        let reactComponent, domNode;


        before(
            () => {
                reactComponent = renderIntoDocument(testedReactCpt);
                domNode = ReactDOM.findDOMNode(reactComponent);
            }
        );

        it('component is rendered', () => {
            expect(reactComponent).not.to.equal(null);
            expect(domNode).not.to.equal(null);
        });
        it('state is correct', () => {
            expect(reactComponent.state.isEdit).to.equal(false);
            expect(_.isEmpty(reactComponent.state.reference)).to.equal(true);

        });
        it('props are correct', () => {
            expect(reactComponent.props.hasEdit).to.equal(true);
            expect(reactComponent.props.hasForm).to.equal(true);
            expect(reactComponent.props.hasDelete).to.equal(false);

        });
    });

    describe('Basic Form with no action, editable ', () => {

        const testedReactCpt = <BasicFakeForm hasLoad={false} isEdit={true}>
            <div data-focus="child1">test1</div>
        </BasicFakeForm>;

        let reactComponent, domNode;

        before(
            () => {
                reactComponent = renderIntoDocument(testedReactCpt);
                domNode = ReactDOM.findDOMNode(reactComponent);
            }
        );

        it('component is rendered', () => {
            expect(reactComponent).not.to.equal(null);
            expect(domNode).not.to.equal(null);
        });
        it('state is correct', () => {
            expect(reactComponent.state.isEdit).to.equal(true);
            expect(_.isEmpty(reactComponent.state.reference)).to.equal(true);
        });
        it('props are correct', () => {
            expect(reactComponent.props.hasEdit).to.equal(true);
            expect(reactComponent.props.hasForm).to.equal(true);
            expect(reactComponent.props.hasDelete).to.equal(false);

        });

    });

    describe('Form with  action, editable ', () => {

        const testedReactCpt = <FakeForm hasLoad={true} isEdit={true}>
            <div data-focus="child1">test1</div>
        </FakeForm>;

        let reactComponent, domNode;

        before(
            () => {
                reactComponent = renderIntoDocument(testedReactCpt);
                domNode = ReactDOM.findDOMNode(reactComponent);
            }
        );

        it('component is rendered', () => {
            expect(reactComponent).not.to.equal(null);
            expect(domNode).not.to.equal(null);
        });
        it('state is correct', () => {
            expect(reactComponent.state.isEdit).to.equal(true);
            expect(_.isEmpty(reactComponent.state.reference)).to.equal(false);

        });

        it('props are correct', () => {
            expect(reactComponent.props.hasEdit).to.equal(true);
            expect(reactComponent.props.hasForm).to.equal(true);
            expect(reactComponent.props.hasDelete).to.equal(false);

        });

        it('Log', () => {
            TestFocus.logProps(reactComponent);
            TestFocus.logState(reactComponent);
            const childReactCpt = reactComponent.props.children;
            TestFocus.logProps(childReactCpt);
            TestFocus.logState(childReactCpt);
        });
    });

});
