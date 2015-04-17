var paginationMixin = {
    /**
     * @inheritDoc
     */
    getDefaultProps: function getPaginationDefaultProps(){
        return {
            hasMoreData: false,
            isManualFetch: false
        };
    },

    /**
     * Fetch the next page.
     * @param {number} page the page to fetch
     * @return {*} the next page
     */
    fetchNextPage: function fetchNextPage(page){
        if(!this.props.hasMoreData){
            return;
        }
        if(this.props.fetchNextPage){
            return this.props.fetchNextPage(page);
        }
    }
};

module.exports = {mixin: paginationMixin};
