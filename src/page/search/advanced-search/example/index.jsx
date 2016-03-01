const AdvancedSearch = FocusComponents.page.search.advancedSearch.component;
const i18nInitializer = FocusCore.translation.init;

const resources = {
    dev: {
        translation: {
            live: {
                filter: {
                    title: 'FACETS',
                    facets: {
                        FCT_PAYS: 'Contries',
                        FCT_STATUS: 'Status',
                        FCT_REGION: 'Regions'
                    }
                }
            },
            list: {
                actionBar: {
                    selection: {
                        all: 'ALL',
                        none: 'NONE'
                    }
                }
            }
        }
    }
};

i18nInitializer({resStore: resources});

const facets = {
    FCT_PAYS:
    {
        France: 5,
        Germany: 8
    },
    FCT_STATUS:
    {
        Open: 7,
        Closed: 2,
        'Status 1': 2,
        'Status 2': 2,
        'Status 3': 2,
        'Status 4': 2,
        'Status 5': 2
    },
    FCT_REGION:
    {
        'Ile de France': 11,
        'Gironde': 6
    }
};


const AdvancedSearchExample = React.createClass({
    render() {
        return(
            <div>
                <center>
                    <h3>Advanced Search</h3>
                </center>
                <MyAdvancedSearch />
            </div>
        );
    }
});

const scopes = [
    {
        icon: 'face',
        code: 'USERS',
        label: 'Users'
    },
    {
        icon: 'extension',
        code: 'EXTENSIONS',
        label: 'Extensions'
    },
    {
        icon: 'contact_phone',
        code: 'CONTACTS',
        label: 'Contacts'
    }
];

Focus.reference.config.set({
    scopes() {
        return new Promise(success => {
            success(scopes);
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

let crit = null;
const getSearchService = (scoped) => {
    return (criteria) => {
        console.log(criteria);
        crit = criteria
        return new Promise(success => {
            setTimeout(() => {
                const groups = {
                    Countries: [
                        {
                            id: countId++,
                            firstName: 'France',
                            lastName: 'Gator'
                        },
                        {
                            id: countId++,
                            firstName: 'Lyon',
                            lastName: 'Paupière'
                        },
                        {
                            id: countId++,
                            firstName: 'Marseille',
                            lastName: 'Scope'
                        }
                    ],
                    Regions: [
                        {
                            id: countId++,
                            firstName: 'Ile de France',
                            lastName: 'Gator'
                        },
                        {
                            id: countId++,
                            firstName: 'Gironde',
                            lastName: 'Paupière'
                        },
                        {
                            id: countId++,
                            firstName: 'Lorraine',
                            lastName: 'Scope'
                        }
                    ]
                };

                const list = [
                    {
                        id: countId++,
                        firstName: 'Ali',
                        lastName: 'Gator'
                    },
                    {
                        id: countId++,
                        firstName: 'Farah',
                        lastName: 'Paupière'
                    },
                    {
                        id: countId++,
                        firstName: 'Perry',
                        lastName: 'Scope'
                    },
                    {
                        id: countId++,
                        firstName: 'Jean',
                        lastName: 'Bonneau'
                    },
                    {
                        id: countId++,
                        firstName: 'Cho',
                        lastName: 'Kaze'
                    },
                    {
                        id: countId++,
                        firstName: 'Guénolé',
                        lastName: 'Kikabou'
                    },
                ];

                const payload = crit.data.facets.length > 0 ? groups : list;
                console.log(payload);

                const data = {
                    facets,
                    list,
                    totalCount: 15
                };
                success(data);
                // Focus.dispatcher.handleServerAction({
                //     data: data, type: 'update'
                // });
            }, 150);
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
    showName() {
        let scopeName = 'test';
        this.props.groupKey != 'undefined' ? scopeName = this.props.groupKey : scopeName = 'Your search';
        return(scopeName);
    },
    render() {
        return (
            <div>
                <h2>{this.showName()}</h2>
                {this.props.children}
            </div>
        );
    }
});

const MyAdvancedSearch = React.createClass({
    render() {
        const advancedSearchProps = {
            facetConfig: {
                FCT_PAYS: 'text',
                FCT_STATUS: 'text',
                FCT_REGION: 'text'
            },
            onLineClick(line) {
                const name = line.firstName + ' ' + line.lastName;
                switch (name) {
                    case 'Ali Gator':
                    alert('Grrr grrr, does the ' + name + '.');
                    break;
                    case 'Perry Scope':
                    alert(name + ' now everybody know you.');
                    break;
                    case 'Cho Case':
                    alert('You are actualy on the ' + name + '... Showcase => Cho Kaze... Ok, I\'m done for tonight.');
                    break;
                    default:
                    alert('It\'s ' + name + '.');
                }
            },
            placeholder:'Enter your search here...',
            groupMaxRows: 3,
            lineComponentMapper(list) {
                return Line;
            },
            service,
            groupComponent: Group
        };

        return(
            <AdvancedSearch {...advancedSearchProps}/>
        );
    }
});

module.exports = AdvancedSearchExample;
