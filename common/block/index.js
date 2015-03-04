var React = require('react');
var builder = require('focus/component/builder')
/**
 * Mixin used in order to create a block.
 * @type {Object}
 */
var blockMixin = {
  /**
   * Header of theblock function.
   * @return {[type]} [description]
   */
  heading: function(){
    if(this.props.title){
      return (
        <div className="panel-heading">
          {this.props.title}
        </div>
      );
    }
  },
  /**
   * Render the a block container and the cild content of the block.
   * @return {DOM}
   */
  render: function renderBlock(){
    return(
      <div className="panel panel-default">
        {this.heading()}
        <div className="panel-body">
            {this.props.children}
        </div>
      </div>
    );
  }
}
module.exports = builder(blockMixin);
