//dependencies
const React = require('react');
const {filter} = require('lodash/collection');
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
    return filter(componentsMetas, (comp)=>{
        return comp.name.indexOf(query) !== -1;
    });
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
            <li><button onClick={()=>{console.log(searchAction('My')); }}>Filter</button></li>
            {data.map( (comp) => <ComponentCard {...comp}/> )}
            </ul>
        );
    }
}
//Static props.
CatalogComponent.displayName = 'Catalog';
module.exports = CatalogComponent;
