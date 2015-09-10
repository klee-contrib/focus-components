//Components
'use strict';

var SearchBar = FocusComponents.search.searchBar.component;

//stores
var store = Focus.search.builtInStore.quickSearchStore;

//data
var scopes = [{
    code: 'face',
    label: 'Utilisateurs'
}, {
    code: 'extension',
    label: 'Extensions'
}, {
    code: 'contact_phone',
    label: 'Contacts'
}];

//config
Focus.reference.config.set({
    scopes: function scopes() {
        return new Promise(function (success) {
            success([{
                code: 'SCP1',
                label: 'Scope 1'
            }, {
                code: 'SCP2',
                label: 'Scope 2'
            }, {
                code: 'SCP3',
                label: 'Scope 3'
            }]);
        });
    }
});

Focus.reference.builtInAction(['scopes'])();

return React.createElement(SearchBar, { scopes: scopes, store: store });