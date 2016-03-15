const ReactDOM = require('react-dom');
import {component as Field} from '../';


const {renderIntoDocument,findAllInRenderedTree} = TestUtils;
import * as TestFocus from  './test-focus.jsx';

const alertSpy = sinon.spy();

const fieldName = 'testField';
const fieldLabel = 'label value';
const fieldValue = 'field value';
const newFieldValue = 'new value';


const fieldLabelContainer = 'field-label-container';
const fieldValueContainer = 'field-value-container';


describe.only('The Field component', () => {
    describe('Field is not editable', () => {

        const testedReactCpt = <Field name={fieldName} value={fieldValue} isEdit={false}
                                      label={fieldLabel}/>;
        let reactComponent,domNode;


        before(
            () => {
                reactComponent = renderIntoDocument(testedReactCpt);
                domNode = ReactDOM.findDOMNode(reactComponent);
            }
        );

        it('component is rendered', () => {
            expect(reactComponent).not.to.equal(null);
            expect(reactComponent.getValue()).to.equal(fieldValue);
        });

        it('label is rendered nd not editable', () => {
            //label value
            const labelCpts = TestFocus.findFocusElementsWithDataFocus(reactComponent,fieldLabelContainer);
            expect(labelCpts.length).to.equal(1);
            const labelCpt = labelCpts[0];
            expect(labelCpt.textContent).to.equal(fieldLabel);
        });

        it('text is rendered and not editable', () => {
            //search with data-focus dependant of the component architecture
            const valueCpts = TestFocus.findFocusElementsWithDataFocus(reactComponent,fieldValueContainer);
            expect(valueCpts.length).to.equal(1);
            const valueCpt = valueCpts[0];
            expect(valueCpt.textContent).to.equal(fieldValue);
            expect(valueCpt.tagName).to.equal(TestFocus.TAG_DIV);

            //search with text content in inner html
            const textCpts = TestFocus.findElementWithInnerHTML(reactComponent,fieldValue);
            expect(textCpts.length).to.equal(1);
            const textCpt = textCpts[0];
            expect(textCpt.tagName).to.equal(TestFocus.TAG_DIV);
        });


    });

    describe('Field is editable', () => {
        const testedReactCpt = <Field name={fieldName} value={fieldValue} isEdit={true}
                                      label={fieldLabel}/>;
        let reactComponent,domNode;


        before(
            () => {
                reactComponent = renderIntoDocument(testedReactCpt);
                domNode = ReactDOM.findDOMNode(reactComponent);

            }
        );

        it('component is rendered', () => {
            expect(reactComponent).not.to.equal(null);
            expect(reactComponent.getValue()).to.equal(fieldValue);
        });

        it('label is rendered and not editable', () => {
            //label value
            const labelCpts = TestFocus.findFocusElementsWithDataFocus(reactComponent,fieldLabelContainer);
            expect(labelCpts.length).to.equal(1);
            const labelCpt = labelCpts[0];
            expect(labelCpt.textContent).to.equal(fieldLabel);
        });

        it('text is rendered and editable', () => {
            //text value
            const valueCpts = TestFocus.findFocusElementsWithDataFocus(reactComponent,fieldValueContainer);
            expect(valueCpts.length).to.equal(1);
            const valueCpt = valueCpts[0];

            //search with text content in inner html
            const readOnlyTextCpts = TestFocus.findElementWithInnerHTML(reactComponent,fieldValue);
            expect(readOnlyTextCpts.length).to.equal(0);

            const textCpts = TestFocus.findElementWithValue(reactComponent,fieldValue);
            expect(textCpts.length).to.equal(1);
            const textCpt = textCpts[0];
            expect(textCpt.tagName).to.equal(TestFocus.TAG_INPUT);
        });

        it('text is modified', () => {
            const textCpts = TestFocus.findElementWithValue(reactComponent,fieldValue);
            expect(textCpts.length).to.equal(1);
            const textCpt = textCpts[0];
            //simulating change event
            TestUtils.Simulate.change(textCpt,{target:{value: newFieldValue}});
            expect(reactComponent.getValue()).to.equal(newFieldValue);
        });

    });

});

/* Examples

 const domSelect = ReactDOM.findDOMNode(reactComponent.refs.htmlSelect);
 */
