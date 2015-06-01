// Dependencies
let React = require('react');
let builder = require('focus').component.builder;

let Overlay = React.createClass({
  //getInitialState() {
  //  return ({
  //    position: 'fixed',
  //    top: '0',
  //    left: '0',
  //    right: '0',
  //    height: '100vh'
  //  });
  //},
  componentDidMount: function() {
    React.findDOMNode(this.refs.overlay).addEventListener('scroll', this._onScroll);
  },
  _onScroll(event) {
    console.log(event);
  },
  render() {
    //let style = this.props.resize ? this.state : null;
    return (
        <div className='popin-overlay' ref='overlay' onClick={this.props.clickHandler}>
          {this.props.children}
        </div>
    )
  }
});

/**
 * The popin component configuration
 * @type {Object}
 */
let popin = {
  /**
   * Init the component.
   * The popin is closed by default.
   * @return {Object} the initial state
   */
  getInitialState() {
    return ({
      opened: false
    });
  },
  /**
   * Init the props if not provided.
   * By default, a popin is full, medium and modal.
   * @return {Object} the default props
   */
  getDefaultProps() {
    return ({
      modal: true,
      size: 'medium',
      type: 'full',
      level: 0
    });
  },
  /**
   * Helper attribute, for React debugging
   */
  displayName: 'Popin',
  /**
   * Properties validation
   */
  propTypes: {
    modal: React.PropTypes.bool,
    size: React.PropTypes.string,
    type: React.PropTypes.string,
    level: React.PropTypes.number
  },
  /**
   * Toggle the popin's open state
   */
  toggleOpen() {
    this.setState({
      opened: !this.state.opened
    });
  },
  /**
   * Render the component
   * @return {XML} the rendered HTML
   */
  render() {
    return (
        <div data-focus='popin' data-size={this._validateSize()} data-type={this.props.type} data-level={this.props.level}>
          {this.state.opened &&
            <Overlay clickHandler={this.props.modal && this.toggleOpen} resize={this.props.type=='full'}>
              <div className='popin-window' onClick={this._preventPopinClose}>
                <i className='fa fa-close' onClick={this.toggleOpen}></i>
                {this.props.children}
              </div>
            </Overlay>
          }
        </div>
    );
  },
  /**
   * Validate the optional given size
   * @return {string} the validated size
   * @private
   */
  _validateSize() {
    if (['small', 'medium', 'large'].indexOf(this.props.size) === -1) {
      // focus exc
      throw new Error('Please provide a valid popin size among small, medium and large. Provided ' + this.props.size);
    }
    return this.props.size;
  },
  /**
   * Prevent popin close when there's a click on the popin window
   * @param {Object} event - raised by the click
   * @private
   */
  _preventPopinClose(event) {
    event.stopPropagation();
  }
};

module.exports = builder(popin);
