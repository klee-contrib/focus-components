const myThing = 'one';
const SearchBar = FocusComponents.search.searchBar.component;
const QuickSearchStore = Focus.store.SearchStore.QuickSearch;
const actionBuilder = Focus.search.actionBuilder;
const searchBarWithScopesStore = new QuickSearchStore({identifier: 'QUICK_SEARCH_2'});

describe('MyThing', function() {
    describe('is a string', function() {
        it('should be true', function () {
            expect(myThing).to.be.a('string');
        });
    });
});
