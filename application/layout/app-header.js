//Needed components
var Header = require('../header').component;
var Cartridge = require('../cartridge').component;
var ContentBar = require('../content-bar').component;
var Bar = require('../bar').component;
var ContentActions = require('../content-actions').component;
module.exports = React.createClass({
  displayName: 'AppHeader',
  render: function renderApplicationHeader() {
    return (
      <Header>
        <ContentBar>
          <Bar />
          <Cartridge />
        </ContentBar>
        <ContentActions />
      </Header>
    );
  }
});
