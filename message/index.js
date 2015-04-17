var builder = require('focus').component.builder;
var type = require('focus').component.types;
var messageMixin = {
  /** @inheritedDoc */
  getDefaultProps: function getMessageDefaultProps(){
    return {
      title: undefined,
      content: undefined,
      type: 'info',
      ttl: undefined,
      style: {}
    };
  },
  /** @inheritedDoc */
  propTypes: {
    title: type('string'),
    content: type('string'),
    type: type('string'),
    ttl: type('number'),
    style: type('object')
  },
  /**
   * Handle click on the dismiss button.
   * @param {Event} event - Sanitize event.
   */
  _handleOnClick: function handleOnClickMessageDismiss(event){
    if(this.props.handleOnClick){
      this.props.handleOnClick(this.props.id);
    }
    //Maybe it is not the best way to do it.
    //React.unmountComponentAtNode(this.getDOMNode().parentNode);
  },
  /**
   * Render an alert.
   * @return {JSX} The jsx.
   */
  render: function renderAlert(){
    var cssClass = `alert alert-dismissable alert-${this.props.type} ${this.props.style.className}`;
    return(
      <div className={cssClass} data-id={this.props.id}>
        <button type='button' className='close' data-dismiss='alert' onClick={this._handleOnClick}>×</button>
        <h4>{this.props.title}</h4>
        <p>{this.props.content}</p>
      </div>
    );
  }
};
module.exports = builder(messageMixin);
