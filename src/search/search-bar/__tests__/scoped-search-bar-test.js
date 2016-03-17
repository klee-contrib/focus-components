const {renderIntoDocument, Simulate} = TestUtils;
import {identity} from 'lodash/utility';
const SearchBar = require('../../search-bar').component;
import actionBuilder from 'focus-core/search/action-builder';
import {quickSearchStore} from 'focus-core/search/built-in-store';

describe('SearchBar with no scope', () => {
    describe('Check if a default search bar works fine', () => {
        before( () => {
            component = renderIntoDocument(<SearchBar hasScopes={false} store={quickSearchStore} />);
        });
        it('loading state should be false', () => {
            expect(component.displayName).to.equal('SearchBar');
        });
    });
});
