//dependencies
const React = require('react');
const {reduce} = require('lodash/collection');
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
function searchAction(query){
    const matchNames = reduce(componentsMetas, (result, comp, key) => {
        if( -1 !== comp.name.indexOf(query)){
            result[key] = (result[key] | 0) + 1;
        }
        if( -1 !== comp.description.indexOf(query)){
            result[key] = (result[key] | 0) + 1;
        }
        if( -1 !== comp.tags.indexOf(query)){
            result[key] = (result[key] | 0) + 1;
        }
        return result;
    }, {});
    console.log('Match', matchNames);
}

class CatalogComponent extends Component{
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
            <li key='button'><button onClick={()=>{console.log(searchAction('My')); }}>Filter</button></li>
            {data.map( (comp, idx) => <ComponentCard key={idx} {...comp}/> )}
            </ul>
        );
    }
}
//Static props.
CatalogComponent.displayName = 'Catalog';
module.exports = CatalogComponent;
