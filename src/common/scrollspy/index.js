// Dependencies
const React = require('react');
const ReactDOM = require('react-dom');
const {builder, types} = require('focusjs').component;

// Mixins
const Stylabe = require('../../mixin/stylable');
const {scrollTo, scrollPosition} = require('../mixin/scroll');
const {filter} = require('lodash/collection');
const {first, last} = require('lodash/array');

/**
* Scrollspy component.
* Listen to a scroll, and sets an active class to the currently displayed element.
*/
const Scrollspy = {
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
        return {
            titleSelector: '[data-spy]',
            affixOffset: 0
        };
    },
    /**
    * Props validation
    */
    propTypes: {
        titleSelector: types('string'),
        affixOffset: types('number')
    },
    /** @inheritDoc */
    getInitialState() {
        return {
            titleList: []
        };
    },
    /** @inheritDoc */
    componentDidMount() {
        this.setState({
            titleList: this._getTitleList()
        });
        this._scrollCarrier = window;
        this._scrollCarrier.addEventListener('scroll', this._scrollSpy);
        this._scrollCarrier.addEventListener('resize', this._scrollSpy);
        this._scrollSpy();
    },
    /** @inheritDoc */
    componentWillUnMount() {
        this._scrollCarrier.removeEventListener('scroll', this._scrollSpy);
        this._scrollCarrier.removeEventListener('resize', this._scrollSpy);
    },
    /**
    * Get the menu items list
    * @return {Array} the menu items
    * @private
    */
    _getTitleList() {
        const {titleSelector} = this.props;
        const rawTitleList = document.querySelectorAll(titleSelector);
        return [].map.call(rawTitleList, (titleElement, index) => {
            return {
                index: index,
                label: titleElement.innerHTML,
                id: titleElement.getAttribute('data-spy'),
                offsetTop: titleElement.parentElement.parentElement.offsetTop // TODO TGN : to rewrite
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
    _linkClickHandler(title) {
        return () => {
            const selectedTitle = document.querySelector('[data-spy=\'' + title.id + '\']');
            scrollTo(undefined, selectedTitle.offsetTop - this.props.affixOffset);
        };
    },
    /**
    * Render the items list
    * @return {XML} the rendered HTML
    * @private
    */
    _renderList() {
        const {activeTitleId, titleList} = this.state;
        return (
            <ul> {
                titleList.map((title) => {
                    const lineProps = {
                        className: activeTitleId === title.id && 'active',
                        key: title.id,
                        onClick: this._linkClickHandler(title)
                    };
                    return (
                        <li {...lineProps}>{title.label}</li>
                    );
                })
            } </ul>
        );
    },
    /**
    * Render the component
    * @return {XML} the rendered component
    */
    render() {
        const {affix} = this.state;
        return (
            <div data-focus='scrollspy' ref='scrollSpy'>
                <nav data-affix={!!affix} style={affix ? {position: 'fixed', top: `${this.props.affixOffset}px`} : null}>{this._renderList()}</nav>
                <div>{this.props.children}</div>
            </div>
        );
    },
    /**
    * The scroll event handler
    * @private
    */
    _scrollSpy() {
        const titleList = this._getTitleList();
        if(0 === titleList.length) { return; }
        //---
        const scrollposition = scrollPosition();

        const nextTitles = filter(titleList, n => {
            return scrollposition.top < n.offsetTop - this.props.affixOffset;
        });

        //by default, first node is indexed
        let currentId = titleList[0].id;
        if(0 < nextTitles.length) {
            //check the first node
            const firstNode = first(nextTitles);
            const index = firstNode.index;
            if(0 < index) {
                currentId = titleList[index - 1].id;
            }
        } else {
            //means that the position is the last title
            currentId = last(titleList).id;
        }
        //save current state
        const {scrollSpy} = this.refs;
        if(scrollSpy){
            const componentTopPosition = ReactDOM.findDOMNode(scrollSpy).offsetTop;
            this.setState({
                activeTitleId: currentId,
                affix: componentTopPosition + this.props.affixOffset < scrollposition.top
            });
        }
    }
};

module.exports = builder(Scrollspy);
