var applicationStore = require('focus').application.builtInStore;
var applicationStateMixin = {
  /** @inheriteddoc */
  getInitialState: function getCartridgeInitialState() {
    return this._getStateFromStore();
  },
  /** @inheriteddoc */
  componentWillMount: function cartridgeWillMount() {
    applicationStore.addModeChangeListener(this._handleChangeApplicationStatus);
    applicationStore.addRouteChangeListener(this._handleChangeApplicationStatus);
  },
  /** @inheriteddoc */
  appStateWillUnMount: function cartridgeWillUnMount(){
    applicationStore.removeModeChangeListener(this._handleChangeApplicationStatus);
    applicationStore.removeRouteChangeListener(this._handleChangeApplicationStatus);
  },
  _handleChangeApplicationStatus(){
    this.setState(this._getStateFromStore());
  },
  _getStateFromStore: function getCartridgeStateFromStore(){
    var processMode =   applicationStore.getMode();
    var mode = 'consult';
    if(processMode && processMode.edit && processMode.edit > 0){
      mode = 'edit';
    }
  return {mode: mode, route: applicationStore.getRoute()};
  }
};

module.exports = applicationStateMixin;