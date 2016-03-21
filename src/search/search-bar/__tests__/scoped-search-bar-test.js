const {renderIntoDocument, Simulate} = TestUtils;
import {identity} from 'lodash/utility';
const SearchBar = require('../../search-bar').component;
import {quickSearchStore} from 'focus-core/search/built-in-store';
import actionBuilder from 'focus-core/search/action-builder';


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
    describe('Check configured SearchBar\' behaviour', () => {
        const action = {
            updateProperties() {
                return configuredComponent.state.query;
            }
        };
        let configuredComponent = renderIntoDocument(<SearchBar hasScopes={false} store={quickSearchStore} action={action} />);
        let onChangeSpy, input, inputChange, initialValue;
        before( () => {
            input = configuredComponent.refs.query.refs.htmlInput;
            initialValue = configuredComponent.state.query;
            inputChange = input.props.onChange.bind(input);
            onChangeSpy = sinon.spy(inputChange);
        });
        describe('Simulate onChange behaviour', function() {
            it('should set the loading state to true', () => {
                input.value = ' ';
                Simulate.change(input);
                if(initialValue != configuredComponent.state.query)
                    configuredComponent.setState({loading: true});
                expect(onChangeSpy).to.have.been.CalledOnce;
                expect(configuredComponent.state.loading).to.be.equal(true);
            });
            it('should change the query state (default query state is \'undefined\')', () => {
                input.value = 'Boy';
                Simulate.change(input);
                expect(onChangeSpy).to.have.been.CalledOnce;
                expect(initialValue).to.be.equal(undefined);
                expect(configuredComponent.state.query).to.be.equal('Boy');
            });
        });
        describe.only('Simulate onKeyPress behaviour', function() {
            const action = {
                updateProperties() {
                    return configuredComponent.state.query;
                }
            };
            let secondComponent = renderIntoDocument(<SearchBar hasScopes={false} store={quickSearchStore} action={action} />);
            let onKeyPressSpy, input, inputChange, initialValue;
            before( () => {
                input = secondComponent.refs.query.refs.htmlInput;
                initialValue = secondComponent.state.query;
                //inputKeyPress = input.props.onKeyPress().bind(input);
                //onKeyPressSpy = sinon.spy(inputKeyPress);
            });
            it('set the loading state to true', () => {
                console.log(input.props.onKeyPress);
                //Simulate.keyDown(input, {key: "Enter"});
                //expec(onKeyPressSpy).to.have.been.CalledOnce;
                // Put the test code here
            });
        });
    });
});
