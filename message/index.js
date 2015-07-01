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
  componentDidMount(){
    if(this.props.ttl){
      setTimeout(()=>{
        this._handleTimeToLeave();
      }, this.props.ttl);
    }
  },
  _handleTimeToLeave(){
    if(this.props.handleTimeToLeave){
      this.props.handleTimeToLeave(this.props.id);
    }
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
  _renderTitle: function renderMessageTitle() {
      if(this.props.title) {
          return <h4>{this.props.title}</h4>
      }
      return undefined;
  },
  /**
   * Render an alert.
   * @return {JSX} The jsx.
   */
  render: function renderAlert(){
    let type = this.props.type && this.props.type === 'error' ? 'danger' : this.props.type;
    var cssClass = `alert alert-dismissable alert-${type} ${this.props.style.className}`;
    return(
      <div className={cssClass} data-id={this.props.id} data-focus='message'>
        <button type='button' className='close'  onClick={this._handleOnClick}>×</button>
        {this._renderTitle()}
        <p>{this.props.content}</p>
      </div>
    );
  }
};
module.exports = builder(messageMixin);
