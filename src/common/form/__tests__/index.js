import React, {Component} from 'react';
import {mixin as formMixin} from '../../form';
//import initEnvironment from './environment';

import {initEnvironment} from './environment';
const {renderIntoDocument,findAllInRenderedTree} = TestUtils;
const alertSpy = sinon.spy();

initEnvironment();

describe.only('The xxx component', () => {
    describe('xx ', () => {

        const testedReactCpt = <div/>;
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
            TestFocus.logElements(domNode);
        });

        it('', () => {

        });
    });

});
