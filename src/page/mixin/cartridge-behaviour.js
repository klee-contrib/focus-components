import isFunction from 'lodash/lang/isFunction';
import { setHeader } from 'focus-core/application';

const cartridgeBehaviour = {

    /**
     * Updates the cartridge using the cartridgeConfiguration.
     */
    _registerCartridge(props = this.props) {
        const cartridgeConfiguration = this.cartridgeConfiguration || props.cartridgeConfiguration;
        const hasCartridge = isFunction(cartridgeConfiguration);
        if (!hasCartridge) {
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
        const config = hasCartridge ? cartridgeConfiguration() : {};
        setHeader(config);
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

export default cartridgeBehaviour; 