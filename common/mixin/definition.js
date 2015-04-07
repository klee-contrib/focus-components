//Dependencies.
/**
 * Accessor on the entity informations.
 * @type {function} - Get the entity definition for a given key.
 */
var getEntityDefinition = require('focus').definition.entity.builder.getEntityInformations;

var definitionMixin = {
  /**
   * Build the entity definition givent the path of the definition.
   */
  _buildDefinition: function buildFormDefinition(){
    if(!this.definitionPath){
      throw new Error('the definition path should be defined to know the domain of your entity property.');
    }
    this.definition = getEntityDefinition(this.definitionPath, this.additionalDefinition);
  },
  /** @inheritdoc */
  componentWillMount: function definitionWillMount(){
    this._buildDefinition();
  }
};

module.exports = definitionMixin;
