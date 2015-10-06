import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import BackToTop from '../../common/button/back-to-top'
import StickyMenu from './sticky-menu';
import Scroll from '../../behaviours/scroll';
import {filter} from 'lodash/collection';
import {debounce} from 'lodash/function';
import {first, last} from 'lodash/array';
import Grid from '../../common/grid';
import Column from '../../common/column'

const BackToTopComponent = BackToTop.component;
const debounceDelay = 50;

// component default props.
const defaultProps = {
    hasMenu: true, //Activate the presence of the sticky navigation component.
    hasBackToTop: true, //Activate the presence of BackToTop button
    offset: 80, //offset position when affix
    gridMenuSize: 3, //default grid size of the menu
    gridContentSize: 9 //default content size of the menu
};

// component props definition.
const propTypes = {
    hasMenu: PropTypes.bool,
    hasBackToTop: PropTypes.bool,
    offset: PropTypes.number,
    gridMenuSize: PropTypes.number,
    gridContentSize: PropTypes.number
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
    componentDidMount = () => {
        this._scrollCarrier = window;
        this._scrollCarrier.addEventListener('scroll', debounce(this._refreshMenu, debounceDelay));
        this._scrollCarrier.addEventListener('resize', debounce(this._refreshMenu, debounceDelay));
        this._executeRefreshMenu(10);
    }

    /** @inheritDoc */
    componentWillUnMount = () => {
        this._scrollCarrier.removeEventListener('scroll', debounce(this._refreshMenu, debounceDelay));
        this._scrollCarrier.removeEventListener('resize', debounce(this._refreshMenu, debounceDelay));
    }

    /**
    * Refresh screen X times.
    * @param  {number} time number of execution
    */
    _executeRefreshMenu = (time) => {
        //TODO : to rewrite becuase of memory leak
        for (let i = 0; i < time; i++) {
            setTimeout(() => {
                this._refreshMenu();
            }, i * 1000);
        }
    }

    /**
    * The scroll event handler
    * @private
    */
    _refreshMenu = () => {
        if(!this.props.hasMenu) { return; }
        this.setState({
            menuList: this._buildMenuList(), //build the menu list
            affix: this._isMenuAffix() //Calculate menu position (affix or not)
        });
    }

    /**
    * Build the list of menus.
    * @private
    * @return {array} the list of menus.
    */
    _buildMenuList = () => {
        const {hasMenu} = this.props;
        if(!hasMenu) {
            return [];
        }
        const currentScrollPosition = this.scrollPosition();

        //get menu list
        const selectionList = document.querySelectorAll('[data-spy]');
        if(selectionList.length === 0) {
            return;
        }
        const menuList = [].map.call(selectionList, (selection, index) => {
            const title = selection.querySelector('[data-spy-title]');
            const nodeId = selection.getAttribute('data-spy');
            return {
                index: index,
                label: title.innerHTML,
                nodeId: nodeId,
                offsetTop: selection.offsetTop, // offset of 10 to ensure
                isActive: false,
                onClick: this._handleMenuItemClick(nodeId)
            };
        });

        const nextTitles = filter(menuList, n => {
            return currentScrollPosition.top < this._getElementRealPosition(n.offsetTop);
        });

        //Calculate current node
        //by default, first node is indexed
        let currentIndex = menuList[0].index;
        if(0 < nextTitles.length) {
            //check the first node
            const firstNode = first(nextTitles);
            const index = firstNode.index;
            if(0 < index) {
                currentIndex = menuList[index - 1].index;
            }
        } else {
            //means that the position is the last title
            currentIndex = last(menuList).index;
        }
        menuList[currentIndex].isActive = true;
        return menuList;
    }

    /**
    * Calculate the real position of an element, depending on declared offset in props.
    * @private
    * @param  {number} position position
    * @return {number} the real position
    */
    _getElementRealPosition = (position) => {
        const {offset} = this.props;
        return position - offset - 10;
    }

    /**
    * Calculate menu position (affix or not)
    * @private
    * @return {Boolean} true is menu must be affix, else false
    */
    _isMenuAffix = () => {
        const {hasMenu, offset} = this.props;
        if(!hasMenu) {
            return false;
        }
        const currentScrollPosition = this.scrollPosition();
        const menu = ReactDOM.findDOMNode(this.refs.stickyMenu);
        const menuTopPosition = menu.offsetTop;
        return menuTopPosition < currentScrollPosition.top + offset;
    }

    /**
    * Handle click on item menu function.
    * @private
    * @param  {string} menuId  node spyId in DOM to scroll to
    * @return {function}        function to call
    */
    _handleMenuItemClick(menuId){
        return () => {
            this._onMenuItemClick(menuId);
        }
    }

    /**
    * Menu click function. Scroll to the node position.
    * @private
    * @param  {string} menuId  node spyId in DOM to scroll to
    */
    _onMenuItemClick(menuId) {
        const selector = `[data-spy='${menuId}']`;
        const node = document.querySelector(selector);
        const positionTop = this._getElementRealPosition(node.offsetTop);
        this.scrollTo(undefined, positionTop);
    }

    /** @inheritedDoc */
    render() {
        const {children, gridMenuSize, hasMenu, hasBackToTop, offset, ...otherProps} = this.props;
        const {affix, menuList} = this.state;
        let {gridContentSize} = this.props;
        gridContentSize = hasMenu ? gridContentSize : 12;
        return (

            <Grid data-focus='scrollspy-container' {...otherProps}>
                {hasMenu &&
                    <Column size={gridMenuSize}>
                        <StickyMenu affix={affix} affixOffset={offset} menuList={menuList} ref="stickyMenu" />
                    </Column>
                }
                <Column data-focus='scrollspy-container-content' size={gridContentSize}>
                    {children}
                </Column>
                {hasBackToTop &&
                    <BackToTopComponent />
                }
            </Grid>
        );
    }
}

//Static props.
ScrollspyContainer.displayName = 'ScrollspyContainer';
ScrollspyContainer.defaultProps = defaultProps;
ScrollspyContainer.propTypes = propTypes;

export default ScrollspyContainer;
