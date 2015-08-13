// Dependencies

'use strict';

var builder = require('focus').component.builder;
var type = require('focus').component.types;

// Mixins

var Stylabe = require('../../mixin/stylable');
var scrollTo = require('../mixin/scroll-to').scrollTo;

/**
 * Sticky navigation component.
 * Listen to a scroll, and sets an active class to the currently displayed element.
 */
var StickyNavigation = {
    /**
     * Stylable mixin.
     */
    mixins: [Stylabe],
    /**
     * Get the default props.
     * By default, listen to the body element
     * @return {Object} the default properties
     */
    getDefaultProps: function getDefaultProps() {
        return {
            titleSelector: '[data-menu]',
            scrolledElementSelector: 'body',
            hasBackToTop: true,
            affixMargin: 80
        };
    },
    /**
     * Props validation
     */
    propTypes: {
        titleSelector: type('string'),
        scrolledElementSelector: type('string'),
        triggerHeight: type('number'),
        style: type('object'),
        hasBackToTop: type('bool'),
        affixMargin: type('number')
    },
    /**
     * Component did mount, attach the scroll spy
     */
    componentDidMount: function componentDidMount() {
        this.setState({
            titleList: this._getTitleList()
        });
        //todo: @stan Maybe put this in the componentWillMount
        this._scrollCarrier = this.props.scrollSpyTargetSelector ? document.querySelector(this.props.scrollSpyTargetSelector) : document;
        this._attachScrollSpy();
        //
        this._scrollSpy();
    },
    /**
     * Component will unmount, detach the scroll spy
     */
    componentWillUnmount: function componentWillUnmount() {
        this._detachScrollSpy();
    },
    /**
     * Get the menu items list
     * @return {Array} the menu items
     * @private
     */
    _getTitleList: function _getTitleList() {
        var rawTitleList = document.querySelectorAll(this.props.titleSelector);
        return [].map.call(rawTitleList, function (titleElement, titleIndex) {
            return {
                label: titleElement.innerHTML,
                id: titleElement.getAttribute('id'),
                offsetTop: titleIndex === 0 ? 0 : titleElement.offsetTop,
                offsetHeight: titleElement.parentElement.offsetHeight
            };
        });
    },
    /**
     * Attach the scroll spy
     * @private
     */
    _attachScrollSpy: function _attachScrollSpy() {
        this._scrollCarrier.addEventListener('scroll', this._scrollSpy);
        this._scrollCarrier.addEventListener('resize', this._scrollSpy);
    },
    /**
     * Detach the scroll spy
     * @private
     */
    _detachScrollSpy: function _detachScrollSpy() {
        this._scrollCarrier.removeEventListener('scroll', this._scrollSpy);
        this._scrollCarrier.removeEventListener('resize', this._scrollSpy);
    },
    /**
     * The scroll event handler
     * @private
     */
    _scrollSpy: function _scrollSpy() {
        var _this = this;

        var scrollPosition = document.querySelector(this.props.scrolledElementSelector).scrollTop;
        this.setState({ affixNav: this.props.affixMargin < scrollPosition });
        if (this.state && this.state.titleList) {
            this.state.titleList.forEach(function (title) {
                if (title.offsetTop <= scrollPosition && title.offsetTop + title.offsetHeight > scrollPosition) {
                    _this.setState({
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
    _renderList: function _renderList() {
        var _this2 = this;

        if (this.state && this.state.titleList) {
            return this.state.titleList.map(function (title) {
                return React.createElement(
                    'div',
                    { className: _this2.state.activeTitle == title.id && 'active', onClick: _this2._linkClickHandler(title), key: title.id },
                    title.label
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
    _linkClickHandler: function _linkClickHandler(title) {
        var _this3 = this;

        return function () {
            scrollTo(document.querySelector(_this3.props.scrolledElementSelector), title.offsetTop, 500);
        };
    },
    /**
     * Render the component
     * @return {XML} the rendered component
     */
    render: function render() {
        return React.createElement(
            'nav',
            { 'data-focus': 'sticky-navigation', className: this._getStyleClassName(), 'data-affix': this.state && this.state.affixNav ? 'true' : 'false', ref: 'nav' },
            this._renderList()
        );
    }
};

module.exports = builder(StickyNavigation);