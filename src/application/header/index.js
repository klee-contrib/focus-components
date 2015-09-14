const builder = require('focusjs').component.builder;
const React = require('react');
const ReactDOM = require('react-dom');
const type = require('focusjs').component.types;
const {pluck, sortBy} = require('lodash/collection');
const applicationStateBehaviour = require('./mixin/application-state');
const headerMixin = {
    mixins: [applicationStateBehaviour],
    /** @inheriteddoc */
    getDefaultProps: function getMenuDefaultProps() {
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
                'small': {
                    'sizeBorder': 5
                },
                'medium': {
                    'sizeBorder': 0
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
        notifySizeChange: type(['function', 'object']),
        processSize: type(['function', 'object'])
    },
    /** @inheritdoc */
    getInitialState: function getMenuDefaultState() {
        /** @inheriteddoc */
        return {
            open: this.props.open,
            size: this.props.size
        };
    },

    /** @inheriteddoc */
    componentWillMount: function barWillMount() {
        this._processSizes();
        this.scrollTargetNode = (this.props.scrollTargetSelector && this.props.scrollTargetSelector !== '') ? document.querySelector(this.props.scrollTargetSelector) : window;
    },
    /** @inheriteddoc */
    componentDidMount: function barDidMount(){
        this.attachScrollListener();
    },
    /** @inheriteddoc */
    componentWillUnMount: function barWillUnMount(){
        this.detachScrollListener();
        this.appStateWillUnmount();
    },
    /**
    * Process the sizeMap in order to sort them by border size and create a sizes array.
    */
    _processSizes: function processSizes(){
        var sizes = [];
        for(var sz in this.props.sizeMap){
            sizes.push({name: sz, sizeBorder: this.props.sizeMap[sz].sizeBorder});
        }
        this.sizes = pluck(sortBy(sizes, 'sizeBorder'), 'name');
    },
    /**
    * Get the current element size.
    * @returns {int} - The size in pixel of the current element in the browser.
    */
    _processElementSize: function processElementSize(){
        return ReactDOM.findDOMNode(this).offsetHeight;
    },
    /**
    * Get the scroll position from the top of the screen.
    * @returns {int} - The position in pixel from the top of the scroll container.
    */
    _getScrollPosition: function getScrollPosition(){
        //The pageYOffset is done in order to deal with the window case. Another possibility would have been to use window.docment.body as a node for scrollTop.
        //But the scrollListener on the page is only on the window element.
        return this.scrollTargetNode.pageYOffset !== undefined ? this.scrollTargetNode.pageYOffset : this.scrollTargetNode.scrollTop;
    },
    /**
    * Notify other elements that the size has changed.
    */
    _notifySizeChange: function notifySizeChanged(){
        if(this.props.notifySizeChange){
            this.props.notifySizeChange(this.state.size);
        }
    },
    /**
    * Change the size of the bar.
    * @param {string} newSize - The new size.
    * @returns {undefined} -  A way to stop the propagation.
    */
    _changeSize: function changeSize(newSize){
        // Todo: see if the notification of the changed size can be called before.
        return this.setState({size: newSize}, this._notifySizeChange);
    },
    /**
    * Process the size in order to know if the size should be changed depending on the scroll position and the border of each zone.
    * @returns {object} - The return is used to stop the treatement.
    */
    _processSize: function _processSize(){
        //Allow the user to redefine the process size function.
        if(this.props.processSize){
            return this.props.processSize();
        }
        var currentIndex = this.sizes.indexOf(this.state.size);
        var currentScrollPosition = this._getScrollPosition();
        //Process increase treatement.
        if(currentIndex < (this.sizes.length - 1)){
            var increaseBorder = this.props.sizeMap[this.sizes[currentIndex + 1]].sizeBorder;
            if(currentScrollPosition > increaseBorder){
                return this._changeSize(this.sizes[currentIndex + 1]);
            }
        }
        //Process decrease treatement.
        if(currentIndex > 0){
            var decreaseBorder = this.props.sizeMap[this.sizes[currentIndex - 1]].sizeBorder;
            if(currentScrollPosition <= decreaseBorder){
                return this._changeSize(this.sizes[currentIndex - 1]);
            }
        }
    },
    /**
    * Handle the scroll event in order to resize the page.
    * @param {object} event [description]
    */
    handleScroll: function handleScrollEvent(event){
        this._processSize();
    },

    /**
    * Attach scroll listener on the scroll target node.
    */
    attachScrollListener: function attachScrollListener() {
        this.scrollTargetNode.addEventListener('scroll', this.handleScroll);
        this.scrollTargetNode.addEventListener('resize', this.handleScroll);
    },

    /**
    * Detach scroll handler on the scroll target node.
    */
    detachScrollListener: function detachScrollListener() {
        this.scrollTargetNode.removeEventListener('scroll', this.handleScroll);
        this.scrollTargetNode.removeEventListener('resize', this.handleScroll);
    },
    /** @inheriteddoc */
    render: function renderBar() {
        const className = `header-${this.state.size}`;
        return (
            <header className={className} data-focus='header' data-route={this.state.route} data-mode={this.state.mode} data-size={this.state.size}>
            {this.props.children}
            </header>
        );
    }
};

module.exports = builder(headerMixin);
