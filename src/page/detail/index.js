import saveBehaviour from './mixin/save-behaviour';
import validateBehaviour from './mixin/validate-behaviour';
import cartridgeBehaviour from '../mixin/cartridge-behaviour';

const detailMixin = {
    mixins: [validateBehaviour, saveBehaviour, cartridgeBehaviour]
};

export { detailMixin as mixin };
export default { mixin: detailMixin };
