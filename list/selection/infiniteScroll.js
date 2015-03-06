var topOfElement = function(element) {
    if (!element) {
        return 0;
    }
    return element.offsetTop + topOfElement(element.offsetParent);
};

/**
 * @extends ReactCompositeComponentInterface
 *
 * @mixin InfiniteScrollMixin
 */
var InfiniteScrollMixin = {
    getDefaultProps: function() {
        return {
            initialPage: 1,
            offset: 250
        };
    },

    componentWillMount: function() {
        this.nextPage = this.props.initialPage;
        this.parentNode = this.props.parentSelector? document.querySelector(this.props.parentSelector) : window;
    },

    componentWillUnmount: function() {
        this.detachScrollListener();
    },

    componentDidMount: function() {
        this.attachScrollListener();
    },

    componentDidUpdate: function() {
        this.attachScrollListener();
    },

    scrollListener: function () {
        var el = this.getDOMNode();
        var scrollTop = (this.parentNode.pageYOffset !== undefined) ? this.parentNode.pageYOffset : this.parentNode.scrollTop;
        if (topOfElement(el) + el.offsetHeight - scrollTop - (window.innerHeight || this.parentNode.offsetHeight) < this.props.offset) {
            this.detachScrollListener();
            this.fetchNextPage(this.nextPage++);
        }
        var topHeader = topOfElement(el);
        var pageHeight = topHeader+el.offsetHeight;
        var scrollHeader = (topHeader / pageHeight)*window.innerHeight;
        //console.log((scrollTop - (topHeader / pageHeight) / (el.offsetHeight - topHeader) * this.state.data.length);
        console.log((scrollTop - topHeader) / (el.offsetHeight) * this.state.data.length);
    },

    attachScrollListener: function () {
        if(!this.props.hasMoreData){
            return;
        }
        this.parentNode.addEventListener('scroll', this.scrollListener);
        this.parentNode.addEventListener('resize', this.scrollListener);
        this.scrollListener();
    },

    detachScrollListener: function () {
        this.parentNode.removeEventListener('scroll', this.scrollListener);
        this.parentNode.removeEventListener('resize', this.scrollListener);
    }
};

module.exports = InfiniteScrollMixin;

