'use strict';

var topOfElement = function topOfElement(element) {
    if (!element) {
        return 0;
    }
    return element.offsetTop + topOfElement(element.offsetParent);
};

var paginationMixin = require('../mixin/pagination').mixin;
/**
 *
 * Mixin which add infinite scroll behavior.
 */
var InfiniteScrollMixin = {

    mixins: [paginationMixin],
    /**
     * defaults props for the mixin.
     * @returns {object} - the default props
     */
    getDefaultProps: function getDefaultProps() {
        return {
            isInfiniteScroll: true,
            initialPage: 1,
            offset: 250
        };
    },

    /**
     * Before component mount
     */
    componentWillMount: function componentWillMount() {
        this.nextPage = this.props.initialPage;
    },

    /**
     * Before component unmount.
     */
    componentWillUnmount: function componentWillUnmount() {
        if (!this.props.isManualFetch) {
            this.detachScrollListener();
        }
    },

    /**
     * After component Mount.
     */
    componentDidMount: function componentDidMount() {
        this.parentNode = this.props.parentSelector ? document.querySelector(this.props.parentSelector) : window;
        if (!this.props.isManualFetch) {
            this.attachScrollListener();
        }
    },

    /**
     * after component update.
     */
    componentDidUpdate: function componentDidUpdate() {
        if (!this.props.isLoading && !this.props.isManualFetch) {
            this.attachScrollListener();
        }
    },

    /**
     * Handler for the scroll event.
     */
    scrollListener: function scrollListener() {
        var el = this.getDOMNode();
        var scrollTop = this.parentNode.pageYOffset !== undefined ? this.parentNode.pageYOffset : this.parentNode.scrollTop;
        if (topOfElement(el) + el.offsetHeight - scrollTop - (window.innerHeight || this.parentNode.offsetHeight) < this.props.offset) {
            this.detachScrollListener();
            this.fetchNextPage(this.nextPage++);
        }

        //calculate visible index in the list
        /*var topHeader = topOfElement(el);
        var pageHeight = topHeader+el.offsetHeight;
        var scrollHeader = (topHeader / pageHeight)*window.innerHeight;
        //console.log((scrollTop - (topHeader / pageHeight) / (el.offsetHeight - topHeader) * this.state.data.length);
        var visibleIndex = (scrollTop - topHeader) / (el.offsetHeight) * this.state.data.length;
        console.log(visibleIndex);*/
    },

    /**
     * Attach scroll listener on the component.
     */
    attachScrollListener: function attachScrollListener() {
        if (!this.props.hasMoreData) {
            return;
        }
        this.parentNode.addEventListener('scroll', this.scrollListener);
        this.parentNode.addEventListener('resize', this.scrollListener);
        this.scrollListener();
    },

    /**
     * detach scroll listener on the component
     */
    detachScrollListener: function detachScrollListener() {
        this.parentNode.removeEventListener('scroll', this.scrollListener);
        this.parentNode.removeEventListener('resize', this.scrollListener);
    }
};

module.exports = { mixin: InfiniteScrollMixin };