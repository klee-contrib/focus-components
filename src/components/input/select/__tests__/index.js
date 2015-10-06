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
            // i18n.init({
            //     dev: {
            //         translation: {
            //             select:{
            //                 unSelected: '-',
            //                 noLabel: 'No label'
            //             }
            //         }
            //     }
            // }, () => {
            expect(domNode.tagName).to.equal('DIV');
            expect(domNode.getAttribute('data-focus')).to.equal('select');
            const domSelect = ReactDOM.findDOMNode(component.refs.htmlSelect);
            expect(domSelect.tagName).to.equal('SELECT');
            expect(domSelect.options.length).to.equal(mockValues.length + 1);
            expect(domSelect.options[0].value).to.equal('UNSELECTED_KEY');
            //expect(domSelect.options[0].innerHTML).to.equal('select.unSelected');
            expect(+domSelect.options[1].value).to.equal(mockValues[0].code);
            expect(domSelect.options[1].innerHTML).to.equal(mockValues[0].label);
            // });
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
                component = renderIntoDocument(<Select name='selectName' onChange={onChangeSpy} value={VALUE} values={VALUES} />);
            }
        );
        it('should call onChange with the new value', ()=>{
            Simulate.change(ReactDOM.findDOMNode(component.refs.htmlSelect), {target: {value: VALUE}});
            expect(onChangeSpy).to.have.been.called.once;
            expect(onChangeSpy).to.have.been.calledWith(VALUE);
        });
    });
    describe('when there is an error', ()=>{
        const {VALUE, VALUES} = fixture;
        const error = 'MY ERROR';
        let component;
        before(
            () => {
                component = renderIntoDocument(<Select error={error} name='selectName' onChange={identity} value={VALUE} values={VALUES} />);
            }
        );
        it('it should be displayed', ()=>{
            const errorDOMNode = ReactDOM.findDOMNode(component.refs.error);
            expect(errorDOMNode).to.exist;
            expect(errorDOMNode.innerHTML).to.equal(error);
        });
    })
});
