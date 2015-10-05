import lunr from 'lunr/lunr';
import catalog from '../catalog/components.json';


/*
    Fields
    name => boost 20
    version => Component's version
    description => component's description
    keywords => keywords //Boost 10
    (code) => Source code
    id => Array's position
 */
const searchIndex = lunr(function(){
    this.field('name', {boost: 10});
    this.field('description');
    this.field('keywords', {boost: 5});
    this.ref('id')
});

//Populate the index
catalog.map((component, idx)=>{
    const {keywords, ...otherComponentProp} = component
    searchIndex.add({...otherComponentProp, keywords: keywords.concat(' '), id: idx});
});

export default searchIndex;
