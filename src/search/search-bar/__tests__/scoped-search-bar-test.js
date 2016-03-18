const {renderIntoDocument, Simulate} = TestUtils;
import {identity} from 'lodash/utility';
const SearchBar = require('../../search-bar').component;
import {quickSearchStore} from 'focus-core/search/built-in-store';
import actionBuilder from 'focus-core/search/action-builder';

const ConfiguredSearchBar = React.createClass({
    componentWillMount() {
        this._action = actionBuilder({
            service: this.props.service,
            identifier: quickSearchStore.identifier,
            getSearchOptions: () => {return quickSearchStore.getValue.call(quickSearchStore); }
        });
        quickSearchStore.addQueryChangeListener(this._onQueryChangeFromStore);
    },
    _onQueryChangeFromStore() {
        this.setState({
            query: quickSearchStore.getQuery()
        });
    },
    render() {
        return(
            <div>
                <SearchBar
                    hasScopes={false}
                    store={quickSearchStore}
                    placeholder={`Enter your search here...`}
                    action={this._action}
                    ref='searchBar'
                    />
            </div>
        );
    }
});

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
        let component, onChangeSpy;
        before( () => {
            component = renderIntoDocument(<SearchBar hasScopes={false} store={quickSearchStore} onChange={onChangeSpy}/>);
            onChangeSpy = sinon.spy();
        });
        it('should change loading state to true', () => {
            Simulate.change(ReactDOM.findDOMNode(component.refs.query), {target: {value: 'hello'}});
            expect(onChangeSpy).to.have.been.called.once;
            expect(onChangeSpy).to.have.been.calledWith('hello');;
            console.log(component.refs.query.textContent);
        });
    });
});
