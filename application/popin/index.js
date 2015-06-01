// Dependencies
let React = require('react');
let builder = require('focus').component.builder;

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
      type: 'full'
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
    modal: React.PropTypes.boolean,
    size: React.PropTypes.string,
    type: React.PropTypes.string
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
        <div data-focus='popin' data-size={this._validateSize()} data-type={this.props.type}>
          {this.state.opened &&
            <div className='popin-overlay' onClick={this.props.modal && this.toggleOpen}>
              <div className='popin-window' onClick={this._preventPopinClose}>
                <i className='fa fa-close' onClick={this.toggleOpen}></i>
                {this.props.children}
              </div>
            </div>
          }
        </div>
    )
  },
  /**
   * Validate the optional given size
   * @return {string} the validated size
   * @private
   */
  _validateSize() {
    if (['small', 'medium', 'large'].indexOf(this.props.size) === -1) {
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
