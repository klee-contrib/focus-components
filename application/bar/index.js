var builder = require('focus').component.builder;
var React = require('react');
var type = require('focus').component.types;
var {pluck, sortBy} = require('lodash/collection');

var barMixin = {
  /** @inheriteddoc */
  getDefaultProps: function getMenuDefaultProps() {
    return {
      scrollTargetSelector: undefined,
      style: {},
      size: 'tall',
      sizeMap: {
        'small': {
          'sizeBorder': 800
        },
        'medium': {
          'sizeBorder': 500
        },
        'tall': {
          'sizeBorder': 300
        }
      }
    };
  },
  /** @inheritdoc */
  propTypes: {
    size: type('string'),
    scrollTargetSelector: type('string'),
    style: type('object'),
    sizeMap: type('object')
  },
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
    return React.findDOMNode(this).offsetHeight;
  },
  /**
   * Get the scroll position from the top of the screen.
   * @returns {int} - The position in pixel from the top of the scroll container.
   */
  _getScrollPosition: function getScrollPosition(){
    //The pageYOffset is done in order to deal with the window case. Another possibility would have been to use window.docment.body as a node for scrollTop.
    //But the scrollListener on the page is only on the window element.
    return this.scrollTargetNode.pageYOffset ? this.scrollTargetNode.pageYOffset : this.scrollTargetNode.scrollTop;
  },
  /**
   * Process the size in order to know if the size should be changed depending on the scroll position and the border of each zone.
   * @returns {object} - The return is used to stop the treatement.
   */
  _processSize: function _processSize(){
    var currentIndex = this.sizes.indexOf(this.state.size);
    var currentScrollPosition = this._getScrollPosition();
    //Process increase treatement.
    if(currentIndex < (this.sizes.length - 1)){
      var increaseBorder = this.props.sizeMap[this.sizes[currentIndex + 1]].sizeBorder;
      if(currentScrollPosition > increaseBorder){
        return this.setState({size: this.sizes[currentIndex + 1]});
      }
    }
    //Process decrease treatement.
    if(currentIndex > 0){
      var decreaseBorder = this.props.sizeMap[this.sizes[currentIndex - 1]].sizeBorder;
      if(currentScrollPosition < decreaseBorder){
        return this.setState({size: this.sizes[currentIndex - 1]});
      }
    }
  },
  /**
   * Handle the scroll event in order to resize the page.
   * @param {[type]} event [description]
   */
  handleScroll: function handleScrollEvent(event){
    console.log('scroll', event);
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
    var className = `bar bar-${this.state.size} ${this.props.style.className}`;
    return (
      <nav className={className}>
        {this.props.children}
      </nav>
    );
  }
};

module.exports = builder(barMixin);
