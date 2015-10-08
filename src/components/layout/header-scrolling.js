import React, {Component, PropTypes} from 'react';
import Focus from 'focus-core';
import ReactDom from 'react-dom';
import {pluck, sortBy} from 'lodash/collection';
import Scroll from '../../behaviours/scroll';

import HeaderTopRow from './header-top-row';
import HeaderContent from './header-content';
import HeaderActions from './header-actions';

// variables
const applicationStore = Focus.application.builtInStore;

// component default props.
const defaultProps = {
    notifySizeChange: undefined, // A handler to notify other elements that the size has changed.
    processSize: undefined, // A way to redefine the process size of the element.
    sizeMap: { // Map which defines sizes exists for the components and their border.
        small: {
            sizeBorder: 5
        },
        medium: {
            sizeBorder: 0
        }
    },
    scrollTargetSelector: undefined, // Selector for the domNode on which the scroll is attached.
    size: 'medium' // Default size of the bar. Should be present in sizeMap.
};

// component props definition.
const propTypes = {
    size: PropTypes.oneOf(['small', 'medium']),
    scrollTargetSelector: PropTypes.string,
    sizeMap: PropTypes.object,
    notifySizeChange: PropTypes.oneOfType([PropTypes.fuction, PropTypes.object]),
    processSize: PropTypes.oneOfType([PropTypes.fuction, PropTypes.object])
};

/**
* HeaderScrolling component.
*/
@Scroll
class HeaderScrolling extends Component {
    constructor(props) {
        super(props);
        const {size} = props;
        const storeState = this._getStateFromStore();
        storeState.size = size;
        this.state = storeState;
    }

    /** @inheriteddoc */
    componentWillMount() {
        this._processSizes();
        const {scrollTargetSelector} = this.props;
        this.scrollTargetNode = (scrollTargetSelector && scrollTargetSelector !== '') ? document.querySelector(scrollTargetSelector) : window;
        applicationStore.addModeChangeListener(this._handleChangeApplicationStatus);
        applicationStore.addRouteChangeListener(this._handleChangeApplicationStatus)
    }

    /** @inheriteddoc */
    componentDidMount() {
        this.scrollTargetNode.addEventListener('scroll', this.handleScroll);
        this.scrollTargetNode.addEventListener('resize', this.handleScroll);
    }

    _handleChangeApplicationStatus = () => {
        const {size} = this.state;
        const storeState = this._getStateFromStore();
        storeState.size = size;
        this.setState(storeState);
    }

    _getStateFromStore = () => {
        const processMode = applicationStore.getMode();
        let mode = 'consult';
        if(processMode && processMode.edit && processMode.edit > 0) {
            mode = 'edit';
        }
        return {mode: mode, route: applicationStore.getRoute()};
    }

    /** @inheriteddoc */
    componentWillUnMount() {
        this.scrollTargetNode.removeEventListener('scroll', this.handleScroll);
        this.scrollTargetNode.removeEventListener('resize', this.handleScroll);
        applicationStore.removeModeChangeListener(this._handleChangeApplicationStatus);
        applicationStore.removeRouteChangeListener(this._handleChangeApplicationStatus);
    }

    /**
    * Process the sizeMap in order to sort them by border size and create a sizes array.
    */
    _processSizes = () => {
        const sizes = [];
        for(const sz in this.props.sizeMap) {
            sizes.push({name: sz, sizeBorder: this.props.sizeMap[sz].sizeBorder});
        }
        this.sizes = pluck(sortBy(sizes, 'sizeBorder'), 'name');
    }

    /**
    * Get the current element size.
    * @returns {int} - The size in pixel of the current element in the browser.
    */
    _processElementSize = () => {
        return ReactDOM.findDOMNode(this).offsetHeight;
    }

    /**
    * Notify other elements that the size has changed.
    */
    _notifySizeChange = () => {
        const {notifySizeChange} = this.props;
        const {size} = this.state;
        if(notifySizeChange) {
            this.props.notifySizeChange(size);
        }
    }

    /**
    * Change the size of the bar.
    * @param {string} newSize - The new size.
    * @returns {undefined} -  A way to stop the propagation.
    */
    _changeSize = (newSize) => {
        // Todo: see if the notification of the changed size can be called before.
        return this.setState({size: newSize}, this._notifySizeChange);
    }

    /**
    * Process the size in order to know if the size should be changed depending on the scroll position and the border of each zone.
    * @returns {object} - The return is used to stop the treatement.
    */
    _processSize = () => {
        //Allow the user to redefine the process size function.
        const {processSize} = this.props;
        if(processSize) {
            return processSize();
        }
        const {size} = this.state;
        const currentIndex = this.sizes.indexOf(size);
        const currentScrollPosition = this.scrollPosition();
        //Process increase treatement.
        if(currentIndex < (this.sizes.length - 1)) {
            const increaseBorder = this.props.sizeMap[this.sizes[currentIndex + 1]].sizeBorder;
            if(currentScrollPosition.top > increaseBorder) {
                return this._changeSize(this.sizes[currentIndex + 1]);
            }
        }
        //Process decrease treatement.
        if(currentIndex > 0) {
            const decreaseBorder = this.props.sizeMap[this.sizes[currentIndex - 1]].sizeBorder;
            if(currentScrollPosition.top <= decreaseBorder) {
                return this._changeSize(this.sizes[currentIndex - 1]);
            }
        }
    }

    /**
    * Handle the scroll event in order to resize the page.
    * @param {object} event [description]
    */
    handleScroll = (event) => {
        this._processSize();
    }

    /** @inheriteddoc */
    render() {
        const {mode, route, size} = this.state;
        const {children} = this.props;
        return (
            <header data-focus='header-scrolling' data-mode={mode} data-route={route} data-size={size}>
                <HeaderTopRow />
                <HeaderContent />
                <HeaderActions />
            </header>
        );
    }
}

//Static props.
HeaderScrolling.displayName = 'HeaderScrolling';
HeaderScrolling.defaultProps = defaultProps;
HeaderScrolling.propTypes = propTypes;

export default HeaderScrolling;
