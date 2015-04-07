var builder = require('focus').component.builder;
var React = require('react');
//var type = require('focus').component.types;

var barMixin = {
  /** @inheritedProps*/
  getDefaultProps: function getMenuDefaultProps() {
    return {
      open: true,
      scrollTargetSelector: 'body'
    };
  },
  /** @inheritedProps*/
  getInitialState: function getMenuDefaultState() {
    return {
      open: this.props.open
    };
  },
  /**
   * Toggle the state of the menu.
   */
  toggle: function toggleOpenMenu() {
    this.setState({open: !this.state.open});
  },
  scrollListener: function(event){
    console.log('scroll', event);
//React.findDOMNode
  },
  /**
   * Attach scroll listener on the component.
   */
  attachScrollListener: function attachScrollListener() {
      if(!this.props.hasMoreData){
          return;
      }
      document.querySelector(this.props.scrollTargetSelector).addEventListener('scroll', this.scrollListener);
      document.querySelector(this.props.scrollTargetSelector).addEventListener('resize', this.scrollListener);
  },

  /**
   * detach scroll listener on the component
   */
  detachScrollListener: function detachScrollListener() {
    document.querySelector(this.props.scrollTargetSelector).removeEventListener('scroll', this.scrollListener);
    document.querySelector(this.props.scrollTargetSelector).removeEventListener('resize', this.scrollListener);
  },
  /** @inheriteddoc */
  render: function () {
    var className = `bar bar-${this.state.open ? 'open' : ''}`;
    return (
      <nav className={className}>
        {this.state.open ? this._renderLargeContent() : this._renderMinimalContent()}
      </nav>
    );
  }
};

module.exports = builder(barMixin);
