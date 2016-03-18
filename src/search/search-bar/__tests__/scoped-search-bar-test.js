const {renderIntoDocument, Simulate} = TestUtils;
import {identity} from 'lodash/utility';
const SearchBar = require('../../search-bar').component;
import {quickSearchStore} from 'focus-core/search/built-in-store';
import actionBuilder from 'focus-core/search/action-builder';

const action = {
    updateProperties() {
        return {
            loading: true
        };
    }
};

describe('SearchBar with no scope', () => {
    describe('Check if a default search bar works fine', () => {
        let component;
        before( () => {
            component = renderIntoDocument(<SearchBar hasScopes={false} store={quickSearchStore} />);
        });
        it('loading state should be false', () => {
            expect(component.state.loading).to.equal(false);
        });
        it('shouldn\'t have any scope', () => {
            expect(component.props.scopes.length).to.equal(0);
        });
        it('should have a default rendered placeholder', () => {
            expect(component.props.placeholder).to.equal('search.bar.placeholder');
        });
        it('should create a default input text named \'searchbarinput\'', () => {
            expect(component.refs.query.props.name).to.equal('searchbarinput');
        });
    });
    describe.only('Check configured SearchBar\' behaviour', () => {
        let component, onChangeSpy, input, inputChange;
        before( () => {
            component = renderIntoDocument(<SearchBar hasScopes={false} store={quickSearchStore} action={action} />);
            input = component.refs.query.refs.htmlInput;
            inputChange = input.props.onChange.bind(input);
            onChangeSpy = sinon.spy(inputChange);
        });
        it('should change loading state to true', () => {
            input.value = 'Boy';
            Simulate.change(input);
            console.log(component.state);

            //expect(input.props.onChange.bind(input)).to.be.a('function');
            //Simulate.change(input.props.onChange());
            //input.value = 'test';
            //Simulate.change(input.props.onChange(), {target: {value: 'a'}});
            //expect(onChangeSpy).to.have.been.CallOnce;
            //console.log(component.state);
        });
    });
});
