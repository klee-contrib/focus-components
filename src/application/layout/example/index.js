import dispatcher from 'focus-core/dispatcher';

const CartridgeContent = React.createClass({
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
const MENU = React.createClass({
    render() {
        return <nav>MENU</nav>;
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
        cartridge: { component: CartridgeContent, props: {} },
        summary: { component: Summary, props: {} },
        actions: {
            primary: [],
            secondary: []
        },
        barLeft: { component: BarContentLeft, props: {} },
        barRight: { component: BarContentRight, props: {} }
    })
});


const Layout = FocusComponents.application.layout.component;
const LayoutExample = React.createClass({
    render() {
        return (
            <Layout MenuLeft={MENU}>Test</Layout>
        );
    }
});

return <LayoutExample />;
