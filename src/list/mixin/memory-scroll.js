const memoryMixin = {

    /** @inheritdoc */
    getDefaultProps() {
        return {
            data: [],
            reference: {},
            perPage: 5
        };
    },

    /** @inheritdoc */
    getInitialState() {
        return {
            page: 1,
            maxElements: this.props.perPage
        };
    },

    componentWillReceiveProps(nextProps) {
        if (nextProps.perPage && nextProps.perPage !== this.props.perPage) {
            this.setState({
                maxElements: nextProps.perPage
            });
        }
    },

    /**
     * Calculate the number of element to display in the memory list.
     * @param page the current page to fetch
     */
    fetchNextPage() {
        let currentPage = this.state.page + 1;
        this.setState({
            page: currentPage,
            maxElements: this.props.perPage * currentPage
        });
    },

    /**
     * Calculate the data to display.
     * @return data list
     */
    getDataToUse() {
        if (!this.props.data) {
            return [];
        }
        return this.props.data.slice(0, this.state.maxElements);
    },

    /**
     * Get the reference lists.
     * @return {object} object wich contains all reference lists.
     */
    getReference() {
        return this.state.reference || this.props.reference;
    }
};

export default memoryMixin;
