//dependencies
const React = require('react');
const {reduce, sortByOrder} = require('lodash/collection');
const {Component} = React;
//Other component
const ComponentCard = require('./component-card');
//Fake data
const componentsMetas = [
    {
        name: 'MySmartComponent',
        description: 'My super componnent is usefull for',
        example: 'http://github.com',
        url: 'htttp://google.com',
        photo: 'https://media.giphy.com/media/3o85xK5DSSgQZ6vq7u/giphy.gif',
        tags: 'super,form,pierr'
    }, {
        name: 'MyDumbComponent',
        description: 'My super componnent is usefull for',
        example: 'http://github.com',
        url: 'htttp://google.com',
        photo: 'https://media.giphy.com/media/3o85xK5DSSgQZ6vq7u/giphy.gif',
        tags: 'super,form,pierr'
    },
    {
        name: 'SmartFormComponent',
        description: 'Your super componnent is usefull for',
        example: 'http://github.com',
        url: 'htttp://google.com',
        photo: 'https://media.giphy.com/media/3o85xK5DSSgQZ6vq7u/giphy.gif',
        tags: 'super,form,pierr'
    },
    {
        name: 'InputDumbComponent',
        description: ' super componnent is usefull for',
        example: 'http://github.com',
        url: 'htttp://google.com',
        photo: 'https://media.giphy.com/media/3o85xK5DSSgQZ6vq7u/giphy.gif',
        tags: 'super,form,pierr'
    },
    {
        name: 'LabelDumbComponent',
        description: 'My super componnent is usefull for',
        example: 'http://github.com',
        url: 'htttp://google.com',
        photo: 'https://media.giphy.com/media/3o85xK5DSSgQZ6vq7u/giphy.gif',
        tags: 'super,form,pierr'
    },
    {
        name: 'CheckboxDumbComponent',
        description: 'My super componnent is usefull for',
        example: 'http://github.com',
        url: 'htttp://google.com',
        photo: 'https://media.giphy.com/media/3o85xK5DSSgQZ6vq7u/giphy.gif',
        tags: 'super,form,pierr'
    }
];
function searchService(query){
    const matchQuery = reduce(componentsMetas, (result, comp, index) => {
        const {name, description, tags} = comp;
        let count = 0;
        if( -1 !== name.indexOf(query)){
            count++;
        }
        if( -1 !== comp.description.indexOf(query)){
            count++;
        }
        if( -1 !== comp.tags.indexOf(query)){
            count++;
        }
        result[index] = {name, count, index};
        return result;
    }, {});
    const sortedMatch = sortByOrder(matchQuery, ['count'], ['desc']);
    const sortedComponents = sortedMatch.map((comp) => componentsMetas[comp.index]);
    console.log('Match', matchQuery);
    console.log('Sorted ', sortedComponents);
}

class CatalogListComponent extends Component{
    constructor(props){
        super(props);
        this.state = {data: componentsMetas };
    }
    render(){
        const {data} = this.state;
        const style = {
            display: 'flex', flexWrap: 'wrap', listStyleType: 'none'
        };
        return (
            <ul data-focus='catalogs' style={style}>
            <li key='button'><button onClick={()=>{console.log(searchService('My')); }}>Filter</button></li>
            {data.map( (comp, idx) => <ComponentCard key={idx} {...comp}/> )}
            </ul>
        );
    }
}
//Static props.
CatalogListComponent.displayName = 'Catalog';
module.exports = CatalogListComponent;
