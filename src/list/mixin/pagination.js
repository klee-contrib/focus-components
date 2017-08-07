import type from 'focus-core/component/types';

const paginationMixin = {
    /**
     * @inheritDoc
     */
    getDefaultProps() {
        return {
            hasMoreData: false,
            isManualFetch: false
        };
    },

    propTypes: {
        hasMoreData: type('bool'),
        fetchNextPage: type('func'),
        isManualFetch: type('bool')
    },

    /**
     * Fetch the next page.
     * @param {number} page the page to fetch
     * @return {*} the next page
     */
    fetchNextPage(page) {
        if (!this.props.hasMoreData) {
            return;
        }
        if (this.props.fetchNextPage) {
            return this.props.fetchNextPage(page);
        }
    },

    /**
     * handle manual fetch.
     * @param {object} event event received
     */
    handleShowMore(event) {
        this.nextPage++;
        this.fetchNextPage(this.nextPage);
    }
};

export { paginationMixin as mixin };
export default { mixin: paginationMixin };
