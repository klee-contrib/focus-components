//Components
const SearchBar = FocusComponents.search.searchBar.component;

//stores
const store = Focus.search.builtInStore.quickSearchStore;

const action = {
    updateProperties (props) {
        return alert('Cette action a lancé une recherche et vous avez choisi le scope "' + props.scope + '".');
    }
}

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

const SearchBarExample =  React.createClass({
    render(){
        return (
            <div>
                <h3>Search bar with scope</h3>
                <SearchBar scopes={scopes} store={store} action={action} />

                <h3>Search bar without scope</h3>
                <SearchBar scopes={scopes} store={store} hasScopes={false} />
            </div>
        );
    }
});

return <SearchBarExample/>;
