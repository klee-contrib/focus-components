// Dependencies

let builder = require('focus').component.builder;
let type = require('focus').component.types;

// Mixins

let Stylabe =  require('../../mixin/stylable');
let scrollTo = require('../mixin/scroll-to').scrollTo;

/**
 * Sticky navigation component.
 * Listen to a scroll, and sets an active class to the currently displayed element.
 */
let StickyNavigation = {
    /**
     * Stylable mixin.
     */
    mixins: [Stylabe],
    /**
     * Get the default props.
     * By default, listen to the body element
     * @return {Object} the default properties
     */
    getDefaultProps() {
        return ({
            titleSelector: '[data-menu]',
            scrolledElementSelector: 'body'
        });
    },
    /**
     * Props validation
     */
    propTypes: {
        titleSelector: type('string'),
        scrolledElementSelector: type('string'),
        triggerHeight: type('number'),
        style: type('object')
    },
    /**
     * Component did mount, attach the scroll spy
     */
    componentDidMount() {
        this.setState({
            titleList: this._getTitleList()
        });
        this._scrollCarrier = this.props.scrollSpyTargetSelector ? document.querySelector(this.props.scrollSpyTargetSelector) : document;
        this._attachScrollSpy();
        this._scrollSpy();
    },
    /**
     * Component will unmount, detach the scroll spy
     */
    componentWillUnmount() {
        this._detachScrollSpy();
    },
    /**
     * Get the menu items list
     * @return {Array} the menu items
     * @private
     */
    _getTitleList() {
        let rawTitleList = document.querySelectorAll(this.props.titleSelector);
        return [].map.call(rawTitleList, (titleElement) => {
            return {
                label: titleElement.innerText,
                id: titleElement.getAttribute('id'),
                offsetTop: titleElement.offsetTop,
                offsetHeight: titleElement.parentElement.offsetHeight
            }
        });
    },
    /**
     * Attach the scroll spy
     * @private
     */
    _attachScrollSpy() {
        this._scrollCarrier.addEventListener('scroll', this._scrollSpy);
        this._scrollCarrier.addEventListener('resize', this._scrollSpy);
    },
    /**
     * Detach the scroll spy
     * @private
     */
    _detachScrollSpy() {
        this._scrollCarrier.removeEventListener('scroll', this._scrollSpy);
        this._scrollCarrier.removeEventListener('resize', this._scrollSpy);
    },
    /**
     * The scroll event handler
     * @private
     */
    _scrollSpy() {
        let scrollPosition = document.querySelector(this.props.scrolledElementSelector).scrollTop;
        if (this.state && this.state.titleList) {
            this.state.titleList.forEach((title) => {
                if (title.offsetTop <= scrollPosition && title.offsetTop + title.offsetHeight > scrollPosition) {
                    this.setState({
                        activeTitle: title.id
                    });
                }
            });
        }
    },
    /**
     * Render the items list
     * @return {XML} the rendered HTML
     * @private
     */
    _renderList() {
        if (this.state && this.state.titleList) {
            return this.state.titleList.map((title) => {
                return (
                    <div className={this.state.activeTitle == title.id && 'active'} onClick={this._linkClickHandler(title)} key={title.id}>
                        {title.label}
                    </div>
                );
            });
        }
    },
    /**
     * Item click handler.
     * Set the scroll to display the clicked item
     * @param {Object} title - the clicked item object
     * @return {Function} hte click handler
     * @private
     */
    _linkClickHandler(title) {
        return () => {
            scrollTo(document.querySelector(this.props.scrolledElementSelector), title.offsetTop, 500);
        }
    },
    /**
     * Render the component
     * @return {XML} the rendered component
     */
    render() {
        return (
            <nav data-focus='sticky-navigation' className={this._getStyleClassName()}>
                {this._renderList()}
            </nav>
        )
    }
};

module.exports = builder(StickyNavigation);
