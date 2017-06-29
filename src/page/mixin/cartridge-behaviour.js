import { isFunction } from 'lodash';
import { setHeader } from 'focus-core/application';


module.exports = {

    /**
     * Updates the cartridge using the cartridgeConfiguration.
     */
    _registerCartridge(props = this.props) {
        const cartridgeConfiguration = this.cartridgeConfiguration || props.cartridgeConfiguration;

        if (!isFunction(cartridgeConfiguration)) {
            this.cartridgeConfiguration = () => ({});
            console.warn(`
                Your detail page does not have any cartrige configuration, this is not mandarory but recommended.
                It should be a component attribute return by a function.
                function cartridgeConfiguration(){
                    var cartridgeConfiguration = {
                    summary: {component: "A React Component", props: {id: this.props.id}},
                    cartridge: {component: "A React Component"},
                    actions: {components: "react actions"}
                    };
                    return cartridgeConfiguration;
                }
            `);
        }

        setHeader(cartridgeConfiguration());
    },

    /**
     * Registers the cartridge upon mounting.
     */
    componentWillMount() {
        this._registerCartridge();
    },

    componentWillReceiveProps(nextProps) {
        this._registerCartridge(nextProps);
    }
};
