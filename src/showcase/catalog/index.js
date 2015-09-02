// Dependencies

const {reduce, sortByOrder} = require('lodash/collection');
const React = require('react');
const {Component} = React;
const ListStore = require('focus').store.ListStore;

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
    console.log('Match', matchQuery);
    console.log('Sorted ', sortedComponents);
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
        this.state = {};
    }

    _showLiveComponent(component) {
        this.setState({component}, this.refs.liveComponentPopin.toggleOpen);
    }

    /** @inheriteDoc */
    render(){
        const {store} = this.props;
        const props = {...this.props, showLiveComponent: this._showLiveComponent.bind(this)};
        const {component} = this.state;
        return (
            <div data-focus='catalog'>
                <CatalogSearch store={store}/>
                <ListPage {...props}/>
                <div data-focus='live-component-popin'>
                    <Popin ref='liveComponentPopin' type='from-right'>
                        <LiveComponent component={component}/>
                    </Popin>
                </div>
            </div>
        );
    }
}

// Static props

ComponentCatalog.displayName = 'ComponentCatalog';
ComponentCatalog.defaultProps = {
    store: new ListStore({identifier: 'COMPONENT_CATALOG'}),
    service: searchService,
    ListComponent: CatalogList
};

module.exports = ComponentCatalog;
