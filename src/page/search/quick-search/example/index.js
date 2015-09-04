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

Focus.definition.entity.container.setEntityConfiguration({
    contact: {
        firstName: {
            domain: 'DO_TEXT',
            required: false
        },
        lastName: {
            domain: 'DO_TEXT',
            required: true
        },
        age: {
            domain: 'DO_NUMBER',
            required: false
        },
        email: {
            domain: 'DO_EMAIL',
            required: false
        }
    }
});

let countId = 0;

const getSearchService = (scoped) => {
    return (criteria) => {
        return new Promise(success => {
            window.setTimeout(() => {
                const groups = {
                    Test: [
                        {
                            id: countId++,
                            firstName: 'toto',
                            lastName: 'ceci est un test'
                        },
                        {
                            id: countId++,
                            firstName: 'tata',
                            lastName: 'deuxieme test'
                        }
                    ],
                    Autre: [
                        {
                            id: countId++,
                            firstName: 'toto',
                            lastName: 'ceci est un test'
                        },
                        {
                            id: countId++,
                            firstName: 'tata',
                            lastName: 'deuxieme test'
                        }
                    ]
                };

                const list = [
                    {
                        id: countId++,
                        firstName: 'toto',
                        lastName: 'ceci est un test'
                    },
                    {
                        id: countId++,
                        firstName: 'tata',
                        lastName: 'deuxieme test'
                    }
                ];

                const payload = scoped ? list : groups;
                const data = {
                    facets: {},
                    [scoped ? 'list' : 'groups']: payload,
                    totalCount: 20
                };
                success(data);
                // Focus.dispatcher.handleServerAction({
                //     data: data, type: 'update'
                // });
            }, 1000);
        });
    }
};

const service = {
    unscoped: getSearchService(false),
    scoped: getSearchService(true)
};

const Line = React.createClass({
    mixins: [FocusComponents.list.selection.line.mixin],
    displayName: 'ResultLine',
    definitionPath: 'contact',
    renderLineContent(data) {
        return (
            <div>
                {`${data.firstName} ${data.lastName}`}
            </div>
        );
    }
});

const Group = React.createClass({
    displayName: 'ResultGroup',
    render() {
        return (
            <div>
                <h2>{this.props.groupKey}</h2>
                {this.props.children}
            </div>
        );
    }
});

const quickSearchProps = {
    onLineClick(line) {
        alert('click sur la ligne ' + line.id);
    },
    scope: 'SCP2',
    groupMaxRows: 3,
    lineComponentMapper(list) {
        return Line;
    },
    service,
    groupComponent: Group
};

const QuickSearchComponent = FocusComponents.page.search.quickSearch.component;

return <QuickSearchComponent {...quickSearchProps}/>;
