import builder from 'focus-core/component/builder';
import React from 'react';
import ReactDOM from 'react-dom'
import type from 'focus-core/component/types';

import applicationStateBehaviour from './mixin/application-state';

const headerMixin = {
    mixins: [applicationStateBehaviour],
    /** @inheriteddoc */
    getDefaultProps() {
        return {
            /**
            * Selector for the domNode on which the scroll is attached.
            * @type {string}
            */
            scrollTargetSelector: undefined,
            /**
            * Default style of the component.s
            * @type {Object}
            */
            style: {},
            /**
            * Default size of the bar. Should be present in sizeMap.
            * @type {String}
            */
            size: 'medium',
            /**
            * Map which defines sizes exists for the components and their border.
            * @type {Object}
            */
            sizeMap: {
                small: {
                    sizeBorder: 5
                },
                medium: {
                    sizeBorder: 0
                }
            },
            /**
            * A way to redefine the process size of the element.
            * @type {function}
            */
            processSize: undefined,
            /**
            * A handler to notify other elements that the size has changed.
            * @type {[type]}
            */
            notifySizeChange: undefined
        };
    },
    /** @inheritdoc */
    propTypes: {
        size: type('string'),
        scrollTargetSelector: type('string'),
        style: type('object'),
        sizeMap: type('object'),
        notifySizeChange: type(['func', 'object']),
        processSize: type(['func', 'object'])
    },
    /** @inheritdoc */
    getInitialState() {
        /** @inheriteddoc */
        return {
            open: this.props.open,
            size: this.props.size
        };
    },

    /** @inheriteddoc */
    componentWillMount() {
        console.warn('FocusComponents 2.2.0: this component is deprecated, please use components from focus-components/components/layout folder');
        this._processSizes();
        this.scrollTargetNode = (this.props.scrollTargetSelector && this.props.scrollTargetSelector !== '')
            ? document.querySelector(this.props.scrollTargetSelector)
            : window;
    },
    /** @inheriteddoc */
    componentDidMount() {
        this.attachScrollListener();
    },
    /** @inheriteddoc */
    componentWillUnmount() {
        this.detachScrollListener();
        this.appStateWillUnmount();
    },
    /**
    * Process the sizeMap in order to sort them by border size and create a sizes array.
    */
    _processSizes() {
        let sizes = [];
        for (let sz in this.props.sizeMap) {
            sizes.push({ name: sz, sizeBorder: this.props.sizeMap[sz].sizeBorder });
        }
        this.sizes = sizes.sort((a, b) => a.sizeBorder - b.sizeBorder).map(elt => elt.name);
    },
    /**
    * Get the current element size.
    * @returns {int} - The size in pixel of the current element in the browser.
    */
    _processElementSize() {
        return ReactDOM.findDOMNode(this).offsetHeight;
    },
    /**
    * Get the scroll position from the top of the screen.
    * @returns {int} - The position in pixel from the top of the scroll container.
    */
    _getScrollPosition() {
        //The pageYOffset is done in order to deal with the window case. Another possibility would have been to use window.docment.body as a node for scrollTop.
        //But the scrollListener on the page is only on the window element.
        return this.scrollTargetNode.pageYOffset !== undefined ? this.scrollTargetNode.pageYOffset : this.scrollTargetNode.scrollTop;
    },
    /**
    * Notify other elements that the size has changed.
    */
    _notifySizeChange() {
        if (this.props.notifySizeChange) {
            this.props.notifySizeChange(this.state.size);
        }
    },
    /**
    * Change the size of the bar.
    * @param {string} newSize - The new size.
    * @returns {undefined} -  A way to stop the propagation.
    */
    _changeSize(newSize) {
        // Todo: see if the notification of the changed size can be called before.
        return this.setState({ size: newSize }, this._notifySizeChange);
    },
    /**
    * Process the size in order to know if the size should be changed depending on the scroll position and the border of each zone.
    * @returns {object} - The return is used to stop the treatement.
    */
    _processSize() {
        //Allow the user to redefine the process size function.
        if (this.props.processSize) {
            return this.props.processSize();
        }
        let currentIndex = this.sizes.indexOf(this.state.size);
        let currentScrollPosition = this._getScrollPosition();
        //Process increase treatement.
        if (currentIndex < (this.sizes.length - 1)) {
            let increaseBorder = this.props.sizeMap[this.sizes[currentIndex + 1]].sizeBorder;
            if (currentScrollPosition > increaseBorder) {
                return this._changeSize(this.sizes[currentIndex + 1]);
            }
        }
        //Process decrease treatement.
        if (currentIndex > 0) {
            let decreaseBorder = this.props.sizeMap[this.sizes[currentIndex - 1]].sizeBorder;
            if (currentScrollPosition <= decreaseBorder) {
                return this._changeSize(this.sizes[currentIndex - 1]);
            }
        }
    },
    /**
    * Handle the scroll event in order to resize the page.
    * @param {object} event [description]
    */
    handleScroll(event) {
        this._processSize();
    },

    /**
    * Attach scroll listener on the scroll target node.
    */
    attachScrollListener() {
        this.scrollTargetNode.addEventListener('scroll', this.handleScroll);
        this.scrollTargetNode.addEventListener('resize', this.handleScroll);
    },

    /**
    * Detach scroll handler on the scroll target node.
    */
    detachScrollListener() {
        this.scrollTargetNode.removeEventListener('scroll', this.handleScroll);
        this.scrollTargetNode.removeEventListener('resize', this.handleScroll);
    },
    /** @inheriteddoc */
    render() {
        const className = `header-${this.state.size}`;
        return (
            <header className={className} data-focus='header' data-route={this.state.route} data-mode={this.state.mode} data-size={this.state.size}>
                {this.props.children}
            </header>
        );
    }
};

const { mixin, component } = builder(headerMixin);
export { mixin, component };
export default { mixin, component };
