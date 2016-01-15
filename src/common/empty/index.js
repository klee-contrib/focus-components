import builder from 'focus-core/component/builder';
var React = require('react');
let emptyMixin  = {
  render(){
    return <div data-focus='empty'></div>
  }
}

module.exports = builder(emptyMixin);
