const {renderIntoDocument, Simulate} = TestUtils;
import {identity} from 'lodash';
const SearchBar = require('../../search-bar').component;
import {quickSearchStore} from 'focus-core/search/built-in-store';
import actionBuilder from 'focus-core/search/action-builder';


describe('SearchBar with no scope', () => {
    describe('When a default search bar is in the DOM', () => {
        let component;
        before( () => {
            component = renderIntoDocument(<SearchBar hasScopes={false} store={quickSearchStore} />);
        });
        it('should have the loading state set to false', () => {
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
        let onChangeSpy, input, initialValue, configuredComponent, action;
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
            initialValue = configuredComponent.state.query;
            Simulate.change(input, {target: {value: 'Boy'}});
        });
        describe('When the placeholder has been set', () => {
            it('shouldn\'t have the default\`s one', () => {
                expect(configuredComponent.props.placeholder).to.not.equal('search.bar.placeholder');
            });

            it('should have different placeholder than the default\`s one', () => {
                expect(configuredComponent.props.placeholder).to.equal('Search here...');
            });
        });
        describe('Simulate onChange behaviour', () => {
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
        describe('Simulate onKeyPress behaviour', () => {
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
                input.value = 'test';
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
