
var saveBehaviour = require('./mixin/save-behaviour');
var validateBehaviour = require('./mixin/validate-behaviour');
var cartridgeBehaviour = require('../mixin/cartridge-behaviour');

var detailMixin = {
  mixins: [validateBehaviour, saveBehaviour, cartridgeBehaviour]
};
module.exports = {mixin: detailMixin};
