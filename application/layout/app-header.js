//Needed components
var Header = require('../header').component;
var Cartridge = require('../cartridge').component;
var ContentBar = require('../content-bar').component;
var Bar = require('../bar').component;
var ContentActions = require('../content-actions').component;
var applicationStore = require('focus').application.builtInStore();
module.exports = React.createClass({

  displayName: 'AppHeader',
/** @inheriteddoc */
  getInitialState: function getCartridgeInitialState() {
    return this._getStateFromStore();
  },
  /** @inheriteddoc */
  componentWillMount: function cartridgeWillMount() {
    applicationStore.addModeChangeListener(this._handleModeChange);
  },
  /** @inheriteddoc */
  componentWillUnMount: function cartridgeWillUnMount(){
    applicationStore.removeModeChangeListener(this._handleModeChange);
  },
  _handleModeChange: function(){
    this.setState(this._getStateFromStore());
  },
  _getStateFromStore: function getCartridgeStateFromStore(){
    var processMode =   applicationStore.getMode();
    var mode = 'consult';
    if(processMode && processMode.edit && processMode.edit > 0){
      mode = 'edit';
    }
  return {mode: mode};
  },
  render: function renderApplicationHeader() {
    return (
      <Header data-focus-mode={this.state.mode}>
        <ContentBar>
          <Bar appName='FOCUS'/>
          <Cartridge />
        </ContentBar>
        <ContentActions />
      </Header>
    );
  }
});
