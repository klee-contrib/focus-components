//Needed components
'use strict';

var Header = require('../header').component;
var Cartridge = require('../cartridge').component;
var ContentBar = require('../content-bar').component;
var Bar = require('../bar').component;
var ContentActions = require('../content-actions').component;
module.exports = React.createClass({
  displayName: 'AppHeader',
  render: function renderApplicationHeader() {
    return React.createElement(
      Header,
      null,
      React.createElement(
        ContentBar,
        null,
        React.createElement(Bar, null),
        React.createElement(Cartridge, null)
      ),
      React.createElement(ContentActions, null)
    );
  }
});