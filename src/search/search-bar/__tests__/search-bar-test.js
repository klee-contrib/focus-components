const {renderIntoDocument, Simulate} = TestUtils;
import {identity} from 'lodash/utility';
const SearchBar = require('../../search-bar').component;
import {quickSearchStore} from 'focus-core/search/built-in-store';
import actionBuilder from 'focus-core/search/action-builder';


describe.only('SearchBar with no scope', () => {
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
        let onChangeSpy, input, inputChange, initialValue, configuredComponent, action;
        before( done => {
            onChangeSpy = sinon.spy();
            action = {
                updateProperties({query}) {
                    onChangeSpy(query);
                    if(query != undefined)
                        configuredComponent.setState({loading: true});
                    done();
                }
            };
            configuredComponent = renderIntoDocument(<SearchBar hasScopes={false} store={quickSearchStore} action={action} placeholder='Search here...'/>);
            input = configuredComponent.refs.query.refs.htmlInput;
            inputChange = input.props.onChange.bind(input);
            initialValue = configuredComponent.state.query;
            input.value = 'Boy';
            Simulate.change(input);
        });
        describe('When the placeholder has been set', () => {
            it('shouldn\'t have the default\`s one', () =>{
                expect(configuredComponent.props.placeholder).to.not.equal('search.bar.placeholder');
            });

            it('should have different placeholder than the default\`s one', () =>{
                expect(configuredComponent.props.placeholder).to.equal('Search here...');
            });
        });
        describe('Simulate onChange behaviour', function() {
            it('should set the loading state to true', () => {
                expect(onChangeSpy).to.have.been.called;
                expect(configuredComponent.state.loading).to.be.equal(true);
            });
            it('should change the query state (default query state is \'undefined\')', () => {
                expect(onChangeSpy).to.have.been.called;
                expect(initialValue).to.equal(undefined);
                expect(configuredComponent.state.query).to.be.equal('Boy');
            });
        });
        describe('Simulate onKeyPress behaviour', function() {
            let input, inputKeyPress, initialValue, onKeyPressSpy, secondComponent, searchAction, pressure;
            before( done => {
                pressure = {
                    key: 'Enter'
                };
                onKeyPressSpy = sinon.spy();
                searchAction = {
                    updateProperties({query}) {
                        onKeyPressSpy(query);
                        if(query != undefined) {}
                            secondComponent.setState({query: query, loading: true});
                        done();
                    }
                };
                secondComponent = renderIntoDocument(<SearchBar hasScopes={false} store={quickSearchStore} action={searchAction} />);
                input = secondComponent.refs.query.refs.htmlInput;
                initialValue = secondComponent.state.query;
                input.value = "test";
                Simulate.keyPress(input, pressure);
            });
            it('should change the query state', () => {
                expect(onKeyPressSpy).to.have.been.called.once;
                expect(secondComponent.state.query).to.not.equal(undefined);
            });
            it('should change the loading state', () => {
                expect(secondComponent.state.loading).to.equal(true);
            });
        });
    });
});
