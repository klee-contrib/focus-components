// Dependencies

const {reduce, sortByOrder, find} = require('lodash/collection');
const React = require('react');
const {Component} = React;
import searchService from '../service/search';

//Components

const {component: ListPage} = require('../../page/list');
const CatalogSearch = require('./catalog-search');
const CatalogList = require('./catalog-list');
const {component: Popin} = require('../../application/popin');

/**
* Component describing a component.
*/
class ComponentCatalog extends Component{
    constructor(props){
        super(props);
    }

    _showLiveComponent(component = {}) {
        Backbone.history.navigate(`component/${component.name}`, true);
    }

    /** @inheriteDoc */
    render(){
        const {store, query} = this.props;
        const props = {...this.props, showLiveComponent: this._showLiveComponent.bind(this)};
        return (
            <div data-focus='catalog'>
                <CatalogSearch store={store} query={query}/>
                <ListPage {...props}/>
            </div>
        );
    }
}

// Static props

ComponentCatalog.displayName = 'ComponentCatalog';
ComponentCatalog.defaultProps = {
    query: '',
    service: searchService,
    ListComponent: CatalogList
};

module.exports = ComponentCatalog;
