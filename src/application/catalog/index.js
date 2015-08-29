const {Component} = require('react');
const componentsMetas = [{
    name: 'MySuperComponent',
    url: 'htttp://google.com',
    photo: 'https://media.giphy.com/media/3o85xK5DSSgQZ6vq7u/giphy.gif',
    tag: 'super,form,pierr'
}, {
    name: 'MyOtherSuperComponent',
    url: 'htttp://google.com',
    photo: 'https://media.giphy.com/media/3o85xK5DSSgQZ6vq7u/giphy.gif',
    tag: 'super,form,pierr'
}];
module.exports = class CatalogComponent extends Component{
    constructor(props){
        super(props);
        this.state = {data: componentsMetas };
    }
    render(){
        const {data} = this.state;
        return (
            <div>
                <h2>The super catalog of Lopez's components........</h2>
                <ul>
                    {data.map( (comp) => <li>{JSON.stringify(comp)}</li> )}
                </ul>
            </div>
        );
    }
};
