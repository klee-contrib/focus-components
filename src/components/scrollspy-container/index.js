import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import BackToTop from '../button-back-to-top'
import StickyMenu from './sticky-menu';
import Scroll from '../../behaviours/scroll';

import debounce from 'lodash/function/debounce';
import filter from 'lodash/collection/filter';
import first from 'lodash/array/first';
import last from 'lodash/array/last';
import xor from 'lodash/array/xor';


const BackToTopComponent = BackToTop;

// component default props.
const defaultProps = {
    hasMenu: true, //Activate the presence of the sticky navigation component.
    hasBackToTop: true, //Activate the presence of BackToTop button
    offset: 100, //offset position when affix
    scrollDelay: 10 //defaut debounce delay for scroll spy call
};

// component props definition.
const propTypes = {
    hasMenu: PropTypes.bool,
    hasBackToTop: PropTypes.bool,
    offset: PropTypes.number,
    scrollDelay: PropTypes.number
};

/**
* ScrollspyContainer component.
*/
@Scroll
class ScrollspyContainer extends Component {

    constructor(props) {
        super(props);
        const state = {
            menuList: [],
            affix: false
        };
        this.state = state;
    }

    /** @inheritDoc */
    componentDidMount() {
        this._scrollCarrier = window;
        this._debouncedRefresh = debounce(this._refreshMenu, this.props.scrollDelay);
        this._scrollCarrier.addEventListener('scroll', this._debounceRefreshMenu);
        this._scrollCarrier.addEventListener('resize', this._debounceRefreshMenu);
        this._executeRefreshMenu(10);
    }

    /** @inheritDoc */
    componentWillMount() {
        this._refreshMenu = this._refreshMenu.bind(this);
        this._debounceRefreshMenu = this._debounceRefreshMenu.bind(this);
    }

    /** @inheritDoc */
    componentWillUnmount() {
        this._timeouts.map(clearTimeout);
        this._scrollCarrier.removeEventListener('scroll', this._debounceRefreshMenu);
        this._scrollCarrier.removeEventListener('resize', this._debounceRefreshMenu);
        this._debouncedRefresh.cancel();
    }

    /**
    * Refresh screen X times.
    * @param  {number} time number of execution
    */
    _executeRefreshMenu(time) {
        this._timeouts = [];
        for (let i = 0; i < time; i++) {
            this._timeouts.push(setTimeout(this._refreshMenu, i * 1000));
        }
    }

    _debounceRefreshMenu() {
        this._debouncedRefresh();
    }

    /**
    * The scroll event handler
    * @private
    */
    _refreshMenu() {
        if (!this.props.hasMenu) {
            return;
        }
        const { stickyMenu } = this.refs;
        const { clickedId } = this.state;
        const menus = this._buildMenuList(); //build the menu list
        //TODO remove this check
        const affix = stickyMenu ? this._isMenuAffix() : this.state.affix; //Calculate menu position (affix or not)
        // Check if scroll is at cliked item level
        let isAtClickedItem;
        if (clickedId !== undefined) {
            const selector = `[data-spy='${clickedId}']`;
            const node = document.querySelector(selector);
            if (node) {
                const nodePosition = this.scrollPosition(node);
                const positionTop = this._getElementRealPosition(nodePosition.top);
                isAtClickedItem = this.scrollPosition().top === positionTop;
            }
        }
        this.setState({
            menuList: menus,
            clickedId: isAtClickedItem ? undefined : clickedId,
            affix
        });
    }

    /**
    * Build the list of menus.
    * @private
    * @return {array} the list of menus.
    */
    _buildMenuList() {
        const { hasMenu } = this.props;
        if (!hasMenu) {
            return [];
        }
        const detectionOffset = window.screen.height / 5;
        const currentScrollPosition = { top: this.scrollPosition().top, left: this.scrollPosition().left };
        const isAtPageBottom = this.isAtPageBottom();

        //get the menu list (without blocks in popin)
        const thisComponentNode = ReactDOM.findDOMNode(this);
        const allDataSpy = thisComponentNode.querySelectorAll('[data-spy]');
        const popinDataSpy = thisComponentNode.querySelectorAll('[data-focus=\'popin-window\'] [data-spy]');
        const selectionList = xor(allDataSpy, popinDataSpy);

        if (selectionList.length === 0) {
            return;
        }
        let menuList = selectionList.map((selection) => {
            return {
                title: selection.querySelector('[data-spy-title]'),
                nodeId: selection.getAttribute('data-spy'),
                selection
            };
        }).filter(({ title, nodeId, selection }) => title && nodeId && selection).map(({ title, nodeId, selection }, index) => {
            return {
                index,
                label: title.innerHTML,
                nodeId,
                scrollTop: this.scrollPosition(selection).top, // offset of 10 to be safe
                isActive: false,
                onClick: this._getMenuItemClickHandler(nodeId)
            };
        });

        const nextTitles = filter(menuList, (n) => currentScrollPosition.top + detectionOffset < this._getElementRealPosition(n.scrollTop));

        //Calculate current node
        //by default, first node is indexed
        let currentIndex = menuList[0].index;
        if (0 < nextTitles.length) {
            //check the first node
            const firstNode = first(nextTitles);
            const index = firstNode.index;
            if (0 < index) {
                currentIndex = menuList[index - 1].index;
            }
        } else {
            //means that the position is the last title
            currentIndex = last(menuList).index;
        }
        const clickedId = this.state.clickedId;
        if (isAtPageBottom && undefined !== clickedId) {
            menuList = menuList.map((item) => {
                if (item.nodeId === clickedId) {
                    item.isActive = true;
                }
                return item;
            });
            this.setState({ clickedId: undefined });
        } else {
            menuList[currentIndex].isActive = true;
        }
        return menuList;
    }

    /**
    * Calculate the real position of an element, depending on declared offset in props.
    * @private
    * @param  {number} position position
    * @return {number} the real position
    */
    _getElementRealPosition(position) {
        const sscDomNode = ReactDOM.findDOMNode(this);
        const sscPosition = this.scrollPosition(sscDomNode);
        return position - sscPosition.top;
    }

    /**
    * Calculate menu position (affix or not)
    * @private
    * @return {Boolean} true is menu must be affix, else false
    */
    _isMenuAffix() {
        let { offset } = this.props;
        const { hasMenu } = this.props;
        if (!hasMenu) {
            return false;
        }
        const sscDomNode = ReactDOM.findDOMNode(this);
        const currentViewPosition = sscDomNode.getBoundingClientRect();
        const containerPaddingTop = this._getPaddingTopValue();
        offset -= containerPaddingTop;
        return currentViewPosition.top <= offset;
    }

    _getPaddingTopValue() {
        const sscDomNode = ReactDOM.findDOMNode(this);
        const computedStyles = window.getComputedStyle(sscDomNode, null);
        const paddingTop = computedStyles.getPropertyValue('padding-top');
        return paddingTop ? parseInt(paddingTop, 0) : 0;
    }

    /**
    * Handle click on item menu function.
    * @private
    * @param  {string} menuId  node spyId in DOM to scroll to
    * @return {function}        function to call
    */
    _getMenuItemClickHandler(menuId) {
        return () => {
            this.setState({
                clickedId: menuId
            }, () => {
                this._refreshMenu();
                this._onMenuItemClick(menuId);
            });
        };
    }

    /**
    * Menu click function. Scroll to the node position.
    * @private
    * @param  {string} menuId  node spyId in DOM to scroll to
    */
    _onMenuItemClick(menuId) {
        const selector = `[data-spy='${menuId}']`;
        const node = document.querySelector(selector);
        const nodePosition = this.scrollPosition(node);
        const positionTop = this._getElementRealPosition(nodePosition.top);
        this.scrollTo(undefined, positionTop);
    }

    /** @inheritedDoc */
    render() {
        const { children, hasMenu, hasBackToTop, offset, scrollDelay, ...otherProps } = this.props;
        const { affix, menuList } = this.state;

        return (
            <div data-focus='scrollspy-container' {...otherProps}>
                {hasMenu &&
                    <StickyMenu affix={affix} affixOffset={offset} menuList={menuList} ref='stickyMenu' />
                }
                <div data-focus='scrollspy-container-content'>
                    {children}
                </div>
                {hasBackToTop &&
                    <BackToTopComponent />
                }
            </div>
        );
    }
}

//Static props.
ScrollspyContainer.displayName = 'ScrollspyContainer';
ScrollspyContainer.defaultProps = defaultProps;
ScrollspyContainer.propTypes = propTypes;

export default ScrollspyContainer;
