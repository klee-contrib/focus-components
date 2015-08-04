var builder = require('focus').component.builder;
var React = require('react');
var applicationStore = require('focus').application.builtInStore();
var stylableBehaviour = require('../../mixin/stylable');
var Button = require('../../common/button/action').component;
var SelectButtons = require('../../common/select-action').component;
var contentActionsMixin = {
  mixins: [stylableBehaviour],
  /** @inheriteddoc */
  getInitialState: function getContentActionsInitialState() {
    return this._getStateFromStore();
  },
  /** @inheriteddoc */
  componentWillMount: function ContentActionsWillMount() {
    applicationStore.addActionsChangeListener(this._handleComponentChange);
  },
  /** @inheriteddoc */
  componentWillUnMount: function ContentActionsWillUnMount(){
    applicationStore.removeActionsChangeListener(this._handleComponentChange);
  },
  _getStateFromStore: function getContentActionsStateFromStore(){
    return {actions: applicationStore.getActions() || {primary: [], secondary: []}};
  },
  _handleComponentChange: function _handleComponentChange(){
    this.setState(this._getStateFromStore());
  },
  /** @inheriteddoc */
  render: function renderActions() {
    return (
      <div className={this._getStyleClassName()} data-focus='content-actions'>
        {this.state.actions.primary.map((primary)=>{
          //<button class="btn btn-fab"><i class="mdi-action-open-in-new"></i></button>
          return <Button shape='fab' style={{className: primary.className}} handleOnClick={primary.action} label={primary.label} type='button' icon={primary.icon}/>;
        })}
        <SelectButtons operationList={this.state.actions.secondary} />
      </div>
    );
  }
};

module.exports = builder(contentActionsMixin);
