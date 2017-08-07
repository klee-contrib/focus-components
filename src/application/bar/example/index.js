
import { component as Bar } from 'focus-components/application/bar';
import dispatcher from 'focus-core/dispatcher',

const Cartridge = React.createClass({
    render() {
        return <div>CARTOUCHE</div>;
    }
});
const Summary = React.createClass({
    render() {
        return <div>SUMMARY</div>;
    }
});
const BarContentRight = React.createClass({
    render() {
        return <div>BAR RIGHT</div>;
    }
});
const BarContentLeft = React.createClass({
    render() {
        return <div>BAR LEFT</div>;
    }
});
//Simple function to update components in the bar.
function updateComponents(cartridgeConf) {
    const { cartridge: cartridgeComponent, summary: summaryComponent, actions: actions, barLeft: barContentLeftComponent, barRight: barContentRightComponent } = cartridgeConf;
    dispatcher.handleViewAction({
        data: {
            cartridgeComponent,
            summaryComponent,
            actions,
            barContentLeftComponent,
            barContentRightComponent
        },
        type: 'update'
    });
}
//Add a defer in order to inject the props after the component is mounted
_.defer(() => {
    updateComponents({
        cartridge: { component: Cartridge, props: {} },
        summary: { component: Summary, props: {} },
        actions: {
            primary: [],
            secondary: []
        },
        barLeft: { component: BarContentLeft, props: {} },
        barRight: { component: BarContentRight, props: {} }
    })
});


const BarExample = React.createClass({
    render() {
        return (
            <header>
                <Bar />
            </header>
        );
    }
});

return <BarExample />;
