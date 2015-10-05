import componentIndex from '../catalog/components.json';
import {reduce, sortByOrder} from 'lodash/collection';
// Service

export default function _synchronousSearch(query){
    if(!query){return componentIndex; }
    const matchQuery = reduce(componentIndex, (result, comp, index) => {
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
    const sortedComponents = sortedMatch.map((comp) => componentIndex[comp.index]);
    //console.log('Match', matchQuery);
    //console.log('Sorted ', sortedComponents);
    return sortedComponents;
}
