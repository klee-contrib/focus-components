const {reduce, sortByOrder} = require('lodash/collection');

//Fake data
const componentsMetas = require('./components.json');
//service
function _synchronousSearch(query){
    if(!query){return componentsMetas; }
    const matchQuery = reduce(componentsMetas, (result, comp, index) => {
        const {name, description, tags} = comp;
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
        try{
            const {criteria} = options.data;
            const res = _synchronousSearch((criteria && criteria.query) || undefined);
            success(res);
        }catch(e){
            failure(e);
        }
    }).then((d) => {return {dataList: d, totalCount: d.length}; });
}
//<li key='button'><button onClick={()=>{console.log(searchService('My')); }}>Filter</button></li>
//dependencies
const React = require('react');
const {Component} = React;
const ListStore = require('focus').store.ListStore;
//const types = require('focus').component.types;
//Components
const {component: ListPage} = require('../../page/list');
const CatalogSearch = require('./catalog-search');
const CatalogList = require('./catalog-list');

const store = new ListStore({identifier: 'COMPONENT_CATALOG'});

/**
 * Component describing a component.
 */
class ComponentCatalog extends Component{
    constructor(props){
        super(props);
    }
    /** @inheriteDoc */
    render(){
        const {store} = this.props;
        return (
                <div data-focus='catalog'>
                    <CatalogSearch store={store}/>
                    <ListPage {...this.props}/>
                </div>
        );
    }
}

//Static props.
ComponentCatalog.displayName = 'ComponentCatalog';
ComponentCatalog.defaultProps = {
    store,
    service: searchService,
    ListComponent: CatalogList
};

module.exports = ComponentCatalog;
