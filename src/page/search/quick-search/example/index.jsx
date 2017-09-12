import { component as QuickSearch } from 'focus-components/page/search/quick-search';

const QuickSearchExample = React.createClass({
    render() {
        return (
            <div>
                <center>
                    <h3>Quicksearch</h3>
                </center>
                <MyQuickSearch ref='QuickSearch' />
            </div>
        );
    }
});

const scopes = [
    {
        icon: 'favorite',
        code: 'FAVORITES',
        label: 'Favorites'
    },
    {
        icon: 'face',
        code: 'USERS',
        label: 'Users'
    },
    {
        icon: 'devices other',
        code: 'DEVICES',
        label: 'Devices'
    }
];

let countId = 0;
const listUsers = [
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
    }
];

const listDevices = [
    {
        id: countId++,
        firstName: 'Nexus 5X',
        lastName: ''
    },
    {
        id: countId++,
        firstName: 'Nexus 6P',
        lastName: ''
    },
    {
        id: countId++,
        firstName: 'iPhone 6S',
        lastName: ''
    },
    {
        id: countId++,
        firstName: 'iPhone 6S Plus',
        lastName: ''
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

let crit = null;
const MyQuickSearch = React.createClass({
    componentDidMount() {
        this.refs.QuickSearch.refs.searchBar.setState({ scope: 'FAVORITES' });
        const allArray = listUsers.concat(listDevices);
        this.refs.QuickSearch.setState({ resultsMap: { All: allArray } });
    },
    getSearchService(scoped) {
        return (criteria) => {
            console.log(this);
            crit = criteria;
            return new Promise(success => {
                setTimeout(() => {
                    let payload;
                    if (criteria.data.criteria.scope === 'FAVORITES') {
                        payload = listUsers.concat(listDevices);
                    } else if (criteria.data.criteria.scope == 'DEVICES') {
                        payload = listDevices;
                    } else if (criteria.data.criteria.scope == 'USERS') {
                        payload = listUsers;
                    } else {
                        console.warn('ERROR IN THE SCOPE SECTION');
                    }

                    const data = {
                        facets: {},
                        list: payload,
                        totalCount: payload.length
                    };
                    success(data);
                }, 70);
            });
        }
    },
    render() {
        const service = {
            unscoped: this.getSearchService(false),
            scoped: this.getSearchService(true)
        };

        const Line = React.createClass({
            displayName: 'ResultLine',
            mixins: [FocusComponents.list.selection.line.mixin],
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

        const quickSearchProps = {
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
            placeholder: 'Enter your search here...',
            groupMaxRows: 3,
            lineComponentMapper(list) {
                return Line;
            },
            service,
            groupComponent: Group
        };

        return (
            <QuickSearch {...quickSearchProps} ref='QuickSearch' />
        );
    }
});

export default QuickSearchExample;
