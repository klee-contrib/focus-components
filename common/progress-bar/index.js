//Code from https://raw.githubusercontent.com/paramaggarwal/react-progressbar/master/index.js
//
var React = require('react');
var builder = require('focus').component.builder;

var progressMixin = {
  getDefaultProps(){
    return {
      type: 'info'
    };
  },
  /**@inheritDoc**/
  render() {
    var completed = +this.props.completed;
    if (completed < 0) {completed = 0; }
    if (completed > 100) {completed = 100; }

    var style = {
      width: completed + '%',
      transition: 'width 200ms',
      height: this.props.height || 4
    };
    return (
      <div className='progress' data-focus='progress-bar' >
        <div className={`progress-bar progress-bar-${this.props.type}`} style={style}>{this.props.children}</div>
      </div>
    );
  }
};

module.exports = builder(progressMixin);