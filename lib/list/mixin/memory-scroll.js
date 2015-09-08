"use strict";

var memoryMixin = {
    /** @inheritdoc */
    getDefaultProps: function getDefaultProps() {
        return {
            data: [],
            reference: {},
            perPage: 5
        };
    },

    /** @inheritdoc */
    getInitialState: function getInitialState() {
        return {
            page: 1,
            maxElements: this.props.perPage
        };
    },

    /**
     * Calculate the number of element to display in the memory list.
     * @param page the current page to fetch
     */
    fetchNextPage: function fetchNextPage() {
        var currentPage = this.state.page + 1;
        this.setState({
            page: currentPage,
            maxElements: this.props.perPage * currentPage
        });
    },

    /**
     * Calculate the data to display.
     * @return data list
     */
    getDataToUse: function getDataToUse() {
        if (!this.props.data) {
            return [];
        }
        return this.props.data.slice(0, this.state.maxElements);
    },

    /**
     * Get the reference lists.
     * @return {object} object wich contains all reference lists.
     */
    getReference: function getReference() {
        return this.state.reference || this.props.reference;
    }
};

module.exports = memoryMixin;