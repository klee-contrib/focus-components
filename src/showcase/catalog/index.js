// Dependencies

const {reduce, sortByOrder, find} = require('lodash/collection');
const React = require('react');
const {Component} = React;
const ListStore = require('focus-core').store.ListStore;
// Data

const componentsMetas = require('./components.json');

// Service

function _synchronousSearch(query){
    if(!query){return componentsMetas; }
    const matchQuery = reduce(componentsMetas, (result, comp, index) => {
        const {name, description, keywords} = comp;
        let count = 0;
        if( -1 !== name.indexOf(query)){
            count++;
        }
        if( -1 !== description.indexOf(query)){
            count++;
        }
        if( -1 !== keywords.indexOf(query)){
            count++;
        }
        if(0 < count){
            result[index] = {name, count, index};
        }
        return result;
    }, {});
    const sortedMatch = sortByOrder(matchQuery, ['count'], ['desc']);
    const sortedComponents = sortedMatch.map((comp) => componentsMetas[comp.index]);
    //console.log('Match', matchQuery);
    //console.log('Sorted ', sortedComponents);
    return sortedComponents;
}

function searchService(options){
    return new Promise((success, failure)=>{
        try {
            const {criteria} = options.data;
            const res = _synchronousSearch((criteria && criteria.query) || undefined);
            success(res);
        } catch(e) {
            failure(e);
        }
    }).then((dataList) => {return {dataList, totalCount: dataList.length}; });
}

//Components

const {component: ListPage} = require('../../page/list');
const CatalogSearch = require('./catalog-search');
const CatalogList = require('./catalog-list');
const {component: Popin} = require('../../application/popin');
const LiveComponent = require('../live-component');

/**
* Component describing a component.
*/
class ComponentCatalog extends Component{
    constructor(props){
        super(props);
        if(props.component){
            const component = find(componentsMetas, (comp)=>{
                return comp.name === props.component;
            });
            if(component){
                this.state = {component};
            }
        }else {
            this.state = {};
        }
    }

    _showLiveComponent(component = {}) {
        this.setState({component}, ()=>{
            Backbone.history.navigate(`component/${component.name}`);
            //this.refs.liveComponentPopin.toggleOpen();
        });
    }

    /** @inheriteDoc */
    render(){
        const {store, query} = this.props;
        const props = {...this.props, showLiveComponent: this._showLiveComponent.bind(this)};
        const {component} = this.state;
        return (
            <div data-focus='catalog'>
                {!component && <CatalogSearch store={store} query={query}/>}
                {!component && <ListPage {...props}/>}
                <div data-focus='live-component-popin'>
                    {component && <button onClick={()=>{Backbone.history.navigate(`query/${this.props.store.getValue().criteria.query}`, true); }}>Back to search</button>}
                    {component && <LiveComponent component={component}/>}
                    </div>
            </div>
        );
    }
}

// Static props

ComponentCatalog.displayName = 'ComponentCatalog';
ComponentCatalog.defaultProps = {
    store: new ListStore({identifier: 'COMPONENT_CATALOG'}),
    query: '',
    service: searchService,
    ListComponent: CatalogList
};

module.exports = ComponentCatalog;
