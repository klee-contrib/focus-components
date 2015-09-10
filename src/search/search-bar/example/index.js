//Components
const SearchBar = FocusComponents.search.searchBar.component;

//stores
const store = Focus.search.builtInStore.quickSearchStore;

//data
const scopes = [
    {
        code: 'face',
        label: 'Utilisateurs'
    },
    {
        code: 'extension',
        label: 'Extensions'
    },
    {
        code: 'contact_phone',
        label: 'Contacts'
    }
];

//config
Focus.reference.config.set({
    scopes() {
        return new Promise(success => {
            success([
                {
                    code: 'SCP1',
                    label: 'Scope 1'
                },
                {
                    code: 'SCP2',
                    label: 'Scope 2'
                },
                {
                    code: 'SCP3',
                    label: 'Scope 3'
                }
            ]);
        });
    }
});

Focus.reference.builtInAction(['scopes'])();

return <SearchBar scopes={scopes} store={store} />;
