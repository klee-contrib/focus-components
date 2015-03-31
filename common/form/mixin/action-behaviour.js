var assign = require('object-assign');
var actionMixin = {

/**
   * Get the entity identifier for the form loading.
   * @returns {object} - The identifier of the entity.
   */
  _getId: function formGetId() {
    if(this.getId){
      return this.getId();
    }
    return this.state.id;
  },
  /**
   * Get the constructed entity from the state.
   * @returns {object} - the entity informations.
   */
  _getEntity: function formGetEntity(){
    if(this.getEntity){
      return this.getEntity();
    }
    //Build the entity value from the ref getVaue.
    var htmlData = {};
    for(var r in this.refs){
      htmlData[r] = this.refs[r].getValue();
    }
    return assign({}, this.state, htmlData);
  },
  /**
   * Load data action call.
   */
  _loadData: function formLoadData() {
    this.action.load(this._getId());
  }
};


module.exports = actionMixin;
