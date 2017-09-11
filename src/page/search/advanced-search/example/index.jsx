import { component as AdvancedSearch } from 'focus-components/page/search/advanced-search';
import { init as i18nInitializer } from 'focus-core/translation';
import { mixin as linePreset } from 'focus-components/list/selection/line';

const resources = {
    dev: {
        translation: {
            live: {
                filter: {
                    title: 'FILTERS',
                    facets: {
                        FCT_PAYS: 'Contries',
                        FCT_STATUS: 'Status',
                        FCT_REGIONS: 'Regions'
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
            },
            search: {
                empty: 'Aucun résultat trouvé'
            },
            result: {
                for: 'résultats'
            }
        }
    }
};

i18nInitializer({ resources: resources });

const _facets = {
    Contries: {
        FCT_PAYS: {
            FRA: { France: 10 },
            GER: { Germany: 7 }
        }
    },
    Regions: {
        FCT_REGIONS: {
            IDF: { 'Ile de France': 7 },
            GRD: { Gironde: 3 }
        }
    }
};

const AdvancedSearchExample = React.createClass({
    render() {
        return (
            <div>
                <center>
                    <h3>Advanced Search</h3>
                </center>
                <MyAdvancedSearch ref='SearchExample' />
            </div>
        );
    }
});

const scopes = [
    { icon: 'face', code: 'USERS', label: 'Users' },
    { icon: 'extension', code: 'EXTENSIONS', label: 'Extensions' },
    { icon: 'contact_phone', code: 'CONTACTS', label: 'Contacts' }
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

let crit = null;
const indexPopulate = gpName => (el, idx) => ({ name: el, id: `${gpName}_${idx}` })
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

// We mock the service
const getSearchService = (scoped) => {
    return (criteria) => {
        crit = criteria;
        return new Promise(success => {
            setTimeout(() => {
                let list = [];

                for (let i = 0; i < groups.France.length; i++) {
                    list.push(groups.France[i]);
                }

                for (let i = 0; i < groups.Germany.length; i++) {
                    list.push(groups.Germany[i]);
                }

                let name = '';
                let facets = crit.data.facets;
                let facetArray = [];

                let count = 0;
                for (let facet in facets) {
                    if (facets.hasOwnProperty(facet)) {
                        ++count;
                        facetArray.push(facets[facet]);
                    }
                }

                let showGroup = count > 0 ? true : false;
                let group = [];
                let facetsCount = facetArray.length;

                if (showGroup) {

                    if (facetsCount < 2) {
                        name = facetArray[0];
                        if (name === 'Ile de France') {
                            name = 'IDF';
                            for (let j = 0; j < groups[name].length; j++) {
                                group.push(groups[name][j]);
                            }
                        } else {
                            for (let i = 0; i < facetsCount; i++) {
                                name = facetArray[i];
                                for (let j = 0; j < groups[name].length; j++) {
                                    group.push(groups[name][j]);
                                }
                            }
                        }
                    } else if (facetsCount > 1) {
                        console.log('MORE THAN ONE', facetsCount);
                        name = facetArray[1];
                        if (name === 'Ile de France') {
                            name = 'IDF';
                        }
                        for (let j = 0; j < groups[name].length; j++) {
                            group.push(groups[name][j]);
                        }
                    }
                } else {
                    group = list;
                }

                const data = {
                    facets: _facets,
                    list: group,
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
    displayName: 'ResultLine',
    mixins: [linePreset],
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
        scopeName = this.props.groupKey != 'undefined'
            ? this.props.groupKey
            : 'Your search';

        return (scopeName);
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
            placeholder: 'Enter your search here...',
            groupMaxRows: 3,
            lineComponentMapper(list) {
                return Line;
            },
            service,
            groupComponent: Group
        };
        return (
            <AdvancedSearch {...advancedSearchProps} ref='AdvSearch' />
        );
    }
});

export default AdvancedSearchExample;
