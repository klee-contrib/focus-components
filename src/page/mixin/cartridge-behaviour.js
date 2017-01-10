import {isFunction} from 'lodash';
import {setHeader} from 'focus-core/application';

export default {

    /**
     * Updates the cartridge using the cartridgeConfiguration.
     */
    _registerCartridge() {
        this.cartridgeConfiguration = this.cartridgeConfiguration || this.props.cartridgeConfiguration;

        if (!isFunction(this.cartridgeConfiguration)) {
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
        
        setHeader(this.cartridgeConfiguration());
    },

    /**
     * Registers the cartridge upon mounting.
     */
    componentWillMount() {
        this._registerCartridge();
    }
};
