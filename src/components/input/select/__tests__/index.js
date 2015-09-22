import Select from '../';
const {renderIntoDocument, Simulate} = TestUtils;
import {identity} from 'lodash/lang';
import fixture from './fixture';
//onChangeSpy = sinon.spy();

describe('The select ', () => {
    describe('when called with no props', () => {
        let component;
        before(
            () => {
                const shallowRenderer = TestUtils.createRenderer();
                shallowRenderer.render(<Select/>);
                component = shallowRenderer.getRenderOutput();
            }
        );
        it.skip('should render an empty select', ()=>{

        });
    });
    describe('when called with minimal props', () => {
        let component, domNode;
        const mockValues = fixture.VALUES;
        before(
            () => {
                component = renderIntoDocument(<Select name='selectName' values={mockValues} onChange={identity}/>);
                domNode = ReactDOM.findDOMNode(component);
            }
        );
        it('should render an empty select', () => {
            expect(domNode.tagName).to.equal('DIV');
            expect(domNode.getAttribute('data-focus')).to.equal('select');
            expect(ReactDOM.findDOMNode(component.refs.htmlSelect).tagName).to.equal('SELECT');
        });
        it('should not have a value', () => {
            expect(component.getValue()).to.equal(null);
        });
    });
    describe('when a value is provided', ()=>{
        const {VALUE, VALUES} = fixture;
        let component, domNode;
        before(()=>{
            component = renderIntoDocument(<Select name='selectName' onChange={identity} value={VALUE} values={VALUES} />);
        });
        it('should return the value when provided as a props', ()=> {
            expect(component.getValue()).to.equal(VALUE);
        });
        it('should render the value in the DOM', ()=>{
            expect(ReactDOM.findDOMNode(component.refs.htmlSelect).value).to.equal(`${VALUE}`);
        });
    });
    describe('when the user select a new value', ()=>{
        const {VALUE, VALUES} = fixture;
        let onChangeSpy, component;
        before(
            () => {
                onChangeSpy = sinon.spy();
                component = renderIntoDocument(<Select name='selectName' onChange={identity} value={VALUE} values={VALUES} />);
            }
        );
        it('should call onChange with the new value', ()=>{
            Simulate.change(ReactDOM.findDOMNode(component.refs.htmlSelect), {target: {value: VALUE}});
        });
    })
});
