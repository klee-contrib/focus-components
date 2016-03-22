import React, {Component} from 'react';
import {CoreStore,ReferenceStore} from 'focus-core/store';

import {mixin as formMixin} from '../../form';
import {component as Debug} from '../../../../test/components';
import Panel from '../../../components/panel';
import {BasicFakeForm, FakeForm} from './fake-form';

import {initEnvironment, loadRef, loadRefList, jsonContact, contactStore,entities} from './environment';
const {renderIntoDocument, findAllInRenderedTree} = TestUtils;
const alertSpy = sinon.spy();

const isEmpty = require("lodash/lang/isEmpty");
const isEqual = require('lodash/lang/isEqual');
const keys = require('lodash/object/keys');
const difference = require('lodash/array/difference');

initEnvironment();

describe.only('The Form component', () => {

    describe('Basic Form with no action, not editable ', () => {

        const testedReactCpt = <BasicFakeForm hasLoad={false} isEdit={false}/>;
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
            expect(isEmpty(reactComponent.state.reference)).to.equal(true);

        });
        it('props are correct', () => {
            expect(reactComponent.props.hasEdit).to.equal(true);
            expect(reactComponent.props.hasForm).to.equal(true);
            expect(reactComponent.props.hasDelete).to.equal(false);

        });
        it('store is correct', () => {
            expect(isEmpty(reactComponent.stores)).to.equal(true);
        });

        it('definitions are correct', () => {
            expect(isEmpty(reactComponent.definition)).to.equal(false);
            expect(isEmpty(difference(reactComponent,entities.contact)));
            expect(isEmpty(difference(entities.contact,reactComponent)));
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
            expect(isEmpty(reactComponent.state.reference)).to.equal(true);
        });
        it('props are correct', () => {
            expect(reactComponent.props.hasEdit).to.equal(true);
            expect(reactComponent.props.hasForm).to.equal(true);
            expect(reactComponent.props.hasDelete).to.equal(false);

        });
        it('store is correct', () => {
            expect(isEmpty(reactComponent.stores)).to.equal(true);
        });

        it('definitions are correct', () => {
            expect(isEmpty(reactComponent.definition)).to.equal(false);
            expect(isEmpty(difference(reactComponent,entities.contact)));
            expect(isEmpty(difference(entities.contact,reactComponent)));
        });
    });

    describe('Form with action, editable ', () => {

        const testedReactCpt = <FakeForm hasLoad={true} isEdit={true}/>;

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
            expect(isEmpty(reactComponent.state.reference)).to.equal(false);

        });

        it('props are correct', () => {
            expect(reactComponent.props.hasEdit).to.equal(true);
            expect(reactComponent.props.hasForm).to.equal(true);
            expect(reactComponent.props.hasDelete).to.equal(false);

        });

        it('store is correct', () => {
            expect(isEmpty(reactComponent.stores)).to.equal(false);
            expect(reactComponent.stores.length).to.equal(2);
            const contactStore = reactComponent.stores[0].store;
            expect(contactStore instanceof CoreStore).to.equal(true);
            const storeData = contactStore.getContact();
            expect(isEqual(storeData,jsonContact)).to.equal(true);

            const referenceStore = reactComponent.stores[1].store;
            expect(referenceStore instanceof ReferenceStore).to.equal(true);
            const refDataSinge = referenceStore.getSinge();
            expect(isEqual(refDataSinge,reactComponent.state.reference.singe)).to.equal(true);
            const refDataPapas = referenceStore.getPapas();
            expect(isEqual(refDataPapas,reactComponent.state.reference.papas)).to.equal(true);


        });

        it('definitions are correct', () => {
            expect(isEmpty(reactComponent.definition)).to.equal(false);
            expect(isEmpty(difference(reactComponent,entities.contact)));
            expect(isEmpty(difference(entities.contact,reactComponent)));
        });

        it('log', () => {
            TestFocus.logProperties("reactComponent",reactComponent);
        });
    });

});
