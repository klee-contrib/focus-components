
let saveBehaviour = require('./mixin/save-behaviour');
let validateBehaviour = require('./mixin/validate-behaviour');
let cartridgeBehaviour = require('../mixin/cartridge-behaviour');

let detailMixin = {
    mixins: [validateBehaviour, saveBehaviour, cartridgeBehaviour]
};
export {
    detailMixin as mixin
}

export default {
    mixin: detailMixin
};
