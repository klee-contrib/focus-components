var builder = require('focus').component.builder;
var React = require('react');
var type = require('focus').component.types;
var {pluck, sortBy} = require('lodash/collection');

var barMixin = {
  /** @inheriteddoc */
  getDefaultProps: function getMenuDefaultProps() {
    return {
      open: true,
      scrollTargetSelector: undefined,
      style: {},
      size: 'tall',
      sizeMap: {
        'small': {
          'visibility': 0.5
        },
        'medium': {
          'visibility': 0.7
        },
        'tall': {
          'visibility': 1
        }
      }
    };
  },
  /** @inheritdoc */
  propTypes: {
    open: type('bool'),
    size: type('string'),
    scrollTargetSelector: type('string')
  },
  getInitialState: function getMenuDefaultState() {
  /** @inheriteddoc */
    return {
      open: this.props.open,
      visibility: this.props.sizeMap[this.props.size].visibility,
      size: this.props.size
    };
  },
  _processSizes: function processSizes(){
    var sizes = [];
    for(var sz in this.props.sizeMap){
     sizes.push({name: sz, visibility: this.props.sizeMap[sz].visibility});
    }
    this.sizes = pluck(sortBy(sizes, 'visibility'), 'name');
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
   * Toggle the state of the menu.
   */
  toggle: function toggleOpenMenu() {
    this.setState({open: !this.state.open});
  },
  _processElementSize: function processElementSize(){
    return React.findDOMNode(this).offsetHeight;
  },
  _getScrollPosition: function getScrollPosition(){
    return this.scrollTargetNode.scrollTop;
  },
  _isChangeSize: function isChangeSize(){
     return (this._getScrollPosition() / this._processElementSize()) < this.state.visibility;
  },
  _changeSize: function changeSize(){

  },
  handleScroll: function(event){

    console.log('scroll', event);
  //React.findDOMNode
  },

  /**
   * Attach scroll listener on the component.
   */
  attachScrollListener: function attachScrollListener() {
    this.scrollTargetNode.addEventListener('scroll', this.handleScroll);
    this.scrollTargetNode.addEventListener('resize', this.handleScroll);
  },

  /**
   * Detach scroll handler on the component
   */
  detachScrollListener: function detachScrollListener() {
    this.scrollTargetNode.removeEventListener('scroll', this.handleScroll);
    this.scrollTargetNode.removeEventListener('resize', this.handleScroll);
  },
  /** @inheriteddoc */
  render: function renderBar() {
    var className = `bar bar-${this.state.open ? 'open' : ''} ${this.props.style.className}`;
    return (
      <nav className={className}>
        {this.state.open ? this._renderLargeContent() : this._renderMinimalContent()}
      </nav>
    );
  }
};

module.exports = builder(barMixin);
