const AdvancedSearch = FocusComponents.page.search.advancedSearch.component;
const i18nInitializer = FocusCore.translation.init;
const linePreset = [FocusComponents.list.selection.line.mixin];

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
const indexPopulate = gpName => (el, idx) => ({name: el, id: `${gpName}_${idx}`})
const groups = {
    France:
    ['Paris', 'Lyon', 'Limeil', 'Le Plessis-Robinson', 'Bordeaux', 'Mérignac', 'Langon', 'Bercy', 'Marne la Vallée', 'Antony'].map(indexPopulate('FRA')),
    Germany:
    ['Berlin', 'Hamburg', 'Munich', 'Cologne', 'Frankfurt', 'Essen', 'Dortmund'].map(indexPopulate('GER')),
    IDF:
    ['Paris', 'Lyon', 'Limeil', 'Le Plessis-Robinson', 'Bercy', 'Marne la Vallée', 'Antony'].map(indexPopulate('IDF')),
    Gironde:
    ['Bordeaux', 'Mérignac', 'Pessac'].map(indexPopulate('GIR'))
}

const getSearchService = (scoped) => {
    return (criteria) => {
        crit = criteria;
        console.log(crit);
        return new Promise(success => {
            setTimeout(() => {
                let list = [];

                for(let i = 0; i< groups.France.length; i++)
                list.push(groups.France[i]);

                for(let i = 0; i< groups.Germany.length; i++)
                list.push(groups.Germany[i]);

                let name = '';
                const showGroup = crit.data.facets.length > 0 ? true : false;
                let group = [];

                let facetsCount = crit.data.facets.length;
                if(showGroup) {
                    if(facetsCount > 1) {
                        name = crit.data.facets[0].value;
                        let tempID = facetsCount-1
                        let secondName = crit.data.facets[tempID].value;
                        if(name == 'Germany') {
                            for(let i =0; i < facetsCount; i ++) {
                                name = crit.data.facets[i].value;
                                for(let j = 0; j < groups[name].length; j++) {
                                    group.push(groups[name][j]);
                                }
                            }
                        }
                        else
                            group = groups[secondName];
                    }
                    else {
                        for(let i =0; i < facetsCount; i ++) {
                            name = crit.data.facets[i].value;
                            for(let j = 0; j < groups[name].length; j++) {
                                group.push(groups[name][j]);
                            }
                        }
                    }
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
    mixins: linePreset,
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
