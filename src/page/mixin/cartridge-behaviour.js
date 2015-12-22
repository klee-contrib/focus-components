import {isFunction} from 'lodash/lang';
import {dispatcher} from 'focus-core';
import {component as Empty} from '../../common/empty';

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

        let cartridgeConf = this.cartridgeConfiguration();

        let data = {
            cartridgeComponent: cartridgeConf.cartridge || {component: Empty},
            summaryComponent: cartridgeConf.summary || {component: Empty},
            actions: cartridgeConf.actions || {primary: [], secondary: []},
            barContentLeftComponent: cartridgeConf.barLeft || {component: Empty},
            headerSize: cartridgeConf.headerSize || 'medium'
        };

        if (cartridgeConf.barRight) {
            data.barContentRightComponent = cartridgeConf.barRight;
        }

        dispatcher.handleViewAction({data, type: 'update'});
    },

    /**
     * Registers the cartridge upon mounting.
     */
    componentWillMount() {
        this._registerCartridge();
    }
};
