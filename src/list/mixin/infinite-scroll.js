import ReactDOM from 'react-dom';
import { mixin as paginationMixin } from '../mixin/pagination';

const topOfElement = function topOfElement(element) {
    if (!element) {
        return 0;
    }
    return element.offsetTop + topOfElement(element.offsetParent);
};

/**
 *
 * Mixin which add infinite scroll behavior.
 */
const InfiniteScrollMixin = {

    mixins: [paginationMixin],
    /**
     * defaults props for the mixin.
     * @returns {object} - the default props
     */
    getDefaultProps() {
        return {
            isInfiniteScroll: true,
            initialPage: 1,
            offset: 250
        };
    },

    /**
     * Before component mount
     */
    componentWillMount() {
        this.nextPage = this.props.initialPage;
    },

    /**
     * Before component unmount.
     */
    componentWillUnmount() {
        if (!this.props.isManualFetch) {
            this.detachScrollListener();
        }
    },

    /**
     * After component Mount.
     */
    componentDidMount() {
        this.parentNode = this.props.parentSelector ? document.querySelector(this.props.parentSelector) : window;
        if (!this.props.isManualFetch) {
            this.attachScrollListener();
        }
    },

    /**
     * after component update.
     */
    componentDidUpdate() {
        if (!this.props.isLoading && !this.props.isManualFetch) {
            this.attachScrollListener();
        }
    },

    /**
     * Handler for the scroll event.
     */
    scrollListener() {
        const el = ReactDOM.findDOMNode(this);
        const scrollTop = (this.parentNode.pageYOffset !== undefined) ? this.parentNode.pageYOffset : this.parentNode.scrollTop;
        if (topOfElement(el) + el.offsetHeight - scrollTop - (window.innerHeight || this.parentNode.offsetHeight) < this.props.offset) {
            this.detachScrollListener();
            this.fetchNextPage(this.nextPage++);
        }
    },

    /**
     * Attach scroll listener on the component.
     */
    attachScrollListener() {
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
    detachScrollListener() {
        this.parentNode.removeEventListener('scroll', this.scrollListener);
        this.parentNode.removeEventListener('resize', this.scrollListener);
    }
};

export { InfiniteScrollMixin as mixin }
export default { mixin: InfiniteScrollMixin };
