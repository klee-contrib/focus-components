var builder = require('focus').component.builder;
var React = require('react');
var applicationStore = require('focus').application.builtInStore();
var stylableBehaviour = require('../../mixin/stylable');
var Button = require('../../common/button/action').component;

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
    applicationStore.removeActionsChangeListener(this._onComponentChange);
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
          return <Button style={{className: primary.className}} handleOnClick={primary.onClick} label={primary.label} type='button'/>;
        })}
        <ul className='secondary'>
          {this.state.actions.secondary.map((secondary)=>{
            return <li><Button style={{className: secondary.className}} handleOnClick={secondary.onClick} label={secondary.label} type='button'/></li>;
          })}
        </ul>
      </div>
    );
  }
};

module.exports = builder(contentActionsMixin);
