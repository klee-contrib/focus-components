// Dependencies
'use strict';

var builder = require('focus').component.builder;
var type = require('focus').component.types;

// Mixins
var Stylabe = require('../../mixin/stylable');

var _require = require('../mixin/scroll');

var scrollTo = _require.scrollTo;
var scrollPosition = _require.scrollPosition;

var _require2 = require('lodash/collection');

var filter = _require2.filter;

var _require3 = require('lodash/array');

var first = _require3.first;
var last = _require3.last;

/**
* Scrollspy component.
* Listen to a scroll, and sets an active class to the currently displayed element.
*/
var Scrollspy = {
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
            titleSelector: '[data-spy]',
            scrolledElementSelector: 'body',
            affixOffset: 0
        };
    },
    /**
    * Props validation
    */
    propTypes: {
        titleSelector: type('string'),
        affixOffset: type('number')
    },
    /** @inheritDoc */
    getInitialState: function getInitialState() {
        return {
            titleList: []
        };
    },
    /**
    * Component did mount, attach the scroll spy
    */
    componentDidMount: function componentDidMount() {
        this.setState({
            titleList: this._getTitleList()
        });
        this._scrollCarrier = window;
        this._attachScrollSpy();
        this._scrollSpy();
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
    * Get the menu items list
    * @return {Array} the menu items
    * @private
    */
    _getTitleList: function _getTitleList() {
        var rawTitleList = document.querySelectorAll(this.props.titleSelector);
        return [].map.call(rawTitleList, function (titleElement, index) {
            return {
                index: index,
                label: titleElement.innerHTML,
                id: titleElement.getAttribute('id'),
                offsetTop: titleElement.offsetTop
            };
        });
    },
    /**
    * Item click handler.
    * Set the scroll to display the clicked item
    * @param {Object} title - the clicked item object
    * @return {Function} hte click handler
    * @private
    */
    _linkClickHandler: function _linkClickHandler(title) {
        return function () {
            var selectedTitle = document.getElementById(title.id);
            scrollTo(undefined, selectedTitle.offsetTop);
        };
    },
    /**
    * Render the items list
    * @return {XML} the rendered HTML
    * @private
    */
    _renderList: function _renderList() {
        var _this = this;

        var _state = this.state;
        var activeTitleId = _state.activeTitleId;
        var titleList = _state.titleList;

        return React.createElement(
            'ul',
            null,
            ' ',
            titleList.map(function (title) {
                var lineProps = {
                    className: activeTitleId === title.id && 'active',
                    key: title.id,
                    onClick: _this._linkClickHandler(title)
                };
                return React.createElement(
                    'li',
                    lineProps,
                    title.label
                );
            }),
            ' '
        );
    },
    /**
    * Render the component
    * @return {XML} the rendered component
    */
    render: function render() {
        var affix = this.state.affix;

        return React.createElement(
            'div',
            { 'data-focus': 'scrollspy' },
            React.createElement(
                'nav',
                { 'data-affix': !!affix, style: affix ? { position: 'fixed', top: this.props.affixOffset + 'px' } : null },
                this._renderList()
            ),
            React.createElement(
                'div',
                null,
                this.props.children
            )
        );
    },
    /**
    * The scroll event handler
    * @private
    */
    _scrollSpy: function _scrollSpy() {
        var titleList = this._getTitleList();
        if (0 === titleList.length) {
            return;
        }
        //---
        var scrollposition = scrollPosition();
        var nextTitles = filter(titleList, function (n) {
            return scrollposition.top < n.offsetTop;
        });
        //by default, first node is indexed
        var currentId = titleList[0].id;
        if (0 < nextTitles.length) {
            //check the first node
            var firstNode = first(nextTitles);
            var index = firstNode.index;
            if (0 < index) {
                currentId = titleList[index - 1].id;
            }
        } else {
            //means that the position is the last title
            currentId = last(titleList).id;
        }
        //save current state
        var componentTopPosition = React.findDOMNode(this).offsetTop;
        console.debug(componentTopPosition);
        this.setState({
            activeTitleId: currentId,
            affix: componentTopPosition + this.props.affixOffset < scrollposition.top
        });
    }
};

module.exports = builder(Scrollspy);