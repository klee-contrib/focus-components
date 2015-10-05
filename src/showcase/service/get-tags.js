import catalog from '../catalog/components.json';
//Reduce the tags list.
export default catalog.reduce((prev, current, idx, arr)=>{
    const {keywords} = current;
    if(keywords){
        keywords.map((keyword)=>{
            if(prev.indexOf(keyword) === -1){
                prev.push(keyword);
            }
        })
    }
    return prev;
}, []).sort();
