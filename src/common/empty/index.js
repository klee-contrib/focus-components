var builder = require('focusjs').component.builder;
var React = require('react');
let emptyMixin  = {
  render(){
    return <div data-focus='empty'></div>
  }
}

module.exports = builder(emptyMixin);
