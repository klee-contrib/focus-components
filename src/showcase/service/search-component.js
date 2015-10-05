import searchIndex from './create-index';
import components from '../catalog/components.json';

export default function searchComponent(query){
    if(query === null || query === undefined || query === ''){
        return components;
    }
    const res = searchIndex.search(query);
    return res.map((comp) => components[comp.ref]);
}
