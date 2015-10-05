import _synchronousSearch from './search-component';
export default function searchService(options){
    return new Promise((success, failure) => {
        try {
            const {criteria} = options.data;
            const res = _synchronousSearch((criteria && criteria.query) || undefined);
            success(res);
        } catch(e) {

            failure(e);
        }
    }).then((dataList) => {return {dataList, totalCount: dataList.length}; });
}
