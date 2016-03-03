const SearchBar = FocusComponents.search.searchBar.component;
const QuickSearchStore = Focus.store.SearchStore.QuickSearch;
const actionBuilder = Focus.search.actionBuilder;

const searchBarStore = new QuickSearchStore({identifier: 'QUICK_SEARCH_1'});
const searchBarWithScopesStore = new QuickSearchStore({identifier: 'QUICK_SEARCH_2'});

const SearchBarExample = React.createClass({
    render() {
        return(
            <div>
                <center>
                    <h3>Example of a search without scopes</h3>
                </center>
                <MySearchBarWithoutScopes />

                <br/>
                <center>
                    <h3>Example of a search with scopes</h3>
                    <h6>The prop <b>hasScopes</b> is, by default, set to true so don't forget to define your different scopes.</h6>
                </center>
                <MySearchBarWithScopes />
            </div>
        );
    }
});

const MySearchBarWithoutScopes = React.createClass({
    MyFunction() {
        this.setState({loading: false});
    },
    setTimeLoad() {
        setTimeout(this.myFunction(), 3000 );
    },
    componentWillMount() {
        this._action = actionBuilder({
            service: this.props.service,
            identifier: searchBarStore.identifier,
            getSearchOptions: () => {return searchBarStore.getValue.call(searchBarStore); } // Binding the store in the function call
        });
        searchBarStore.addQueryChangeListener(this._onSearchCriteriaChange);
        searchBarStore.addScopeChangeListener(this._onSearchCriteriaChange);
    },
    componentWillUnmount() {
        searchBarStore.removeQueryChangeListener(this._onSearchCriteriaChange);
        searchBarStore.removeScopeChangeListener(this._onSearchCriteriaChange);
    },
    _onSearchCriteriaChange() {
        const {onSearchCriteriaChange} = this.props;
        if (onSearchCriteriaChange) {
            onSearchCriteriaChange();
        }
        this.MyFunction();
    },
    render() {
        return(
            <SearchBar
                hasScopes={false}
                store={searchBarStore}
                placeholder={`Enter your search here...`}
                action={this._action}
                />
        );
    }
});

const MySearchBarWithScopes = React.createClass({
    getInitialState() {
        return ({
            loading: false
        });
    },
    componentWillMount() {
        this._action = actionBuilder({
            service: this.props.service,
            identifier: searchBarWithScopesStore.identifier,
            getSearchOptions: () => {return searchBarWithScopesStore.getValue.call(searchBarWithScopesStore); } // Binding the store in the function call
        });
        searchBarWithScopesStore.addQueryChangeListener(this._onSearchCriteriaChange);
        searchBarWithScopesStore.addScopeChangeListener(this._onSearchCriteriaChange);
        setTimeout(
            () => this.setState({loading: false}),
            3000
        );
    },
    componentWillUnmount() {
        searchBarWithScopesStore.removeQueryChangeListener(this._onSearchCriteriaChange);
        searchBarWithScopesStore.removeScopeChangeListener(this._onSearchCriteriaChange);
    },
    _onSearchCriteriaChange() {
        const {onSearchCriteriaChange} = this.props;
        if (onSearchCriteriaChange) {
            onSearchCriteriaChange();
        }
    },
    render() {
        const self = this;
        const {loading} = this.state;
        const searchBarScopes = [
            {
                code: 'movie',
                label: 'Movies'
            },
            {
                code: 'audiotrack',
                label: 'Music'
            },
            {
                code: 'devices other',
                label: 'Devices'
            },
            {
                code: 'collections',
                label: 'Photos'
            },
        ];
        return(
            <SearchBar
                scopes={searchBarScopes}
                store={searchBarWithScopesStore}
                placeholder={`Enter your search here...`}
                action={this._action}
                />
        );
    }
});

module.exports = SearchBarExample;
