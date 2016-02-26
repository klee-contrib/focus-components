const QuickSearch = FocusComponents.page.search.quickSearch.component;

const QuickSearchExample = React.createClass({
    render() {
        return(
            <div>
                <h1>Hello</h1>
                <MyQuickSearch />
            </div>
        );
    }
});

const MyQuickSearch = React.createClass({
    render() {
        Focus.reference.config.set({
            scopes() {
                return new Promise(success => {
                    success([
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
                    setTimeout(() => {
                        const groups = {
                            Test: [
                            ],
                            Autre: [
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
                    }, 300);
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
        return(
            <QuickSearch {...quickSearchProps} placeholder={`Enter your search here...`}/>
        );
    }
});

module.exports = QuickSearchExample;
