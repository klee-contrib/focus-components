const AdvancedSearch = FocusComponents.page.search.advancedSearch.component;
const i18nInitializer = FocusCore.translation.init;

const resources = {
    dev: {
        translation: {
            live: {
                filter: {
                    title: 'FILTERS',
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
        France: 10,
        Germany: 7
    },
    FCT_REGION:
    {
        'IDF': 7,
        'Gironde': 3
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
                    France: [
                        {
                            id: countId++,
                            name: 'Paris'
                        },
                        {
                            id: countId++,
                            name: 'Lyon'
                        },
                        {
                            id: countId++,
                            name: 'Limeil'
                        },
                        {
                            id: countId++,
                            name: 'Le Plessis-Robinson'
                        },
                        {
                            id: countId++,
                            name: 'Bordeaux'
                        },
                        {
                            id: countId++,
                            name: 'Mérignac'
                        },
                        {
                            id: countId++,
                            name: 'Langon'
                        },
                        {
                            id: countId++,
                            name: 'Bercy'
                        },
                        {
                            id: countId++,
                            name: 'Marne la Vallée'
                        },
                        {
                            id: countId++,
                            name: 'Antony'
                        }
                    ],
                    Germany: [
                        {
                            id: countId++,
                            name: 'Berlin'
                        },
                        {
                            id: countId++,
                            name: 'Hamburg'
                        },
                        {
                            id: countId++,
                            name: 'Munich'
                        },
                        {
                            id: countId++,
                            name: 'Cologne'
                        },
                        {
                            id: countId++,
                            name: 'Frankfurt'
                        },
                        {
                            id: countId++,
                            name: 'Essen'
                        },
                        {
                            id: countId++,
                            name: 'Dortmund'
                        }
                    ],
                    IDF: [
                        {
                            id: countId++,
                            name: 'Paris'
                        },
                        {
                            id: countId++,
                            name: 'Lyon'
                        },
                        {
                            id: countId++,
                            name: 'Limeil'
                        },
                        {
                            id: countId++,
                            name: 'Le Plessis-Robinson'
                        },
                        {
                            id: countId++,
                            name: 'Bercy'
                        },
                        {
                            id: countId++,
                            name: 'Marne la Vallée'
                        },
                        {
                            id: countId++,
                            name: 'Antony'
                        }
                    ],
                    Gironde: [
                        {
                            id: countId++,
                            name: 'Bordeaux'
                        },
                        {
                            id: countId++,
                            name: 'Mérignac'
                        },
                        {
                            id: countId++,
                            name: 'Langon'
                        }
                    ]
                };

                let list = [];

                for(let i = 0; i< groups.France.length; i++)
                    list.push(groups.France[i]);

                for(let i = 0; i< groups.Germany.length; i++)
                    list.push(groups.Germany[i]);

                let name = '';
                const showGroup = crit.data.facets.length > 0 ? true : false;
                let group = [];

                if(showGroup) {
                    name = crit.data.facets[0].value;
                    group = groups[name];
                }
                else
                group = list;

                const data = {
                    facets: facets,
                    'list': group,
                    totalCount: group.length
                };
                success(data);
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
                {`${data.name}`}
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
                const name = line.name;
                switch (name) {
                    case 'Paris':
                        alert('Achetez votre baguette et vos croissants à ' + name + '.');
                        break;
                    case 'Marne la Vallée':
                        alert('Have you ever been to ' + name + '\'s Disneyland® Resort Paris ?');
                        break;
                    default:
                        alert('You clicked on ' + name + '.');
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
