const Layout = FocusComponents.components.Layout;
const MenuLeft = FocusComponents.components.MenuLeft;
const Button = FocusComponents.common.button.action.component;
const Popin = FocusComponents.application.popin.component;

const {dispatcher} = Focus;
const CartridgeContent = React.createClass({
    render(){
        return <h1>Modal test page</h1>;
    }
});
const Summary = React.createClass({
    render(){
        return <div>Modal test page</div>;
    }
});
const BarContentLeft = React.createClass({
    render(){
        return (
            <button className='mdl-button mdl-js-button' onClick={()=>{Backbone.history.history.back()}}>
                <i className="material-icons">navigate_before</i>
                <i className="material-icons">extension</i>
            </button>
        );
    }
});

//Simple function to update components in the bar.
function updateComponents(cartridgeConf) {
    const {cartridge: cartridgeComponent, summary: summaryComponent, actions: actions, barLeft: barContentLeftComponent} = cartridgeConf;
    dispatcher.handleViewAction({
        data: {
            cartridgeComponent,
            summaryComponent,
            actions,
            barContentLeftComponent
        },
        type: 'update'
    });
};
//Add a defer in order to inject the props after the component is mounted
_.defer(()=>{
    updateComponents({
        cartridge: {component: CartridgeContent, props:{}},
        summary:{component: Summary, props:{}},
        actions: {
            primary: [{label:'Action 1', icon:'alarm_on', action:() => {console.log("click !")}}, {label:'Action 2', icon:'build', action:() => {console.log("click !")}}],
            secondary: [{label:'Action 3', icon:'print', action:() => {console.log("click !")}}, {label:'Action 4', icon:'print', action:() => {console.log("click !")}}, {label:'Action 5', icon:'print', action:() => {console.log("click !")}}]
        },
        barLeft: {component: BarContentLeft, props:{}}
    })
});


const Demo = React.createClass({
    popinOpener (ref) {
        const self = this;
        return function(event) {
            event.preventDefault();
            self.refs[ref].toggleOpen();
        }
    },
    render() {
        return (
            <Layout MenuLeft={MenuLeft}>
                <div className="buttons">
                    <Button handleOnClick={this.popinOpener('full')} label='Open full popin' />
                    <Button handleOnClick={this.popinOpener('from-menu')} label='Open from-menu popin' />
                    <Button handleOnClick={this.popinOpener('from-right')} label='Open from-right popin' />
                </div>
                <div className="content">
                    <h3>Some content to fill the page</h3>
                    <img src="http://lorempixel.com/800/600/sports/"/>
                    <img src="http://lorempixel.com/800/600/abstract/"/>
                    <img src="http://lorempixel.com/800/600/city/"/>
                    <img src="http://lorempixel.com/800/600/technics/"/>
                </div>
                <div className="popins-container">
                    <Popin ref="full" type="full">
                        <FakeContent />
                    </Popin>
                    <Popin ref="from-menu" type="from-menu">
                        <Button handleOnClick={this.popinOpener('from-right-no-overlay')} label='Open from-right popin' />
                        <Button handleOnClick={this.popinOpener('from-menu-second')} label='Open sub-menu popin' />
                        <Button handleOnClick={this.popinOpener('full')} label='Open full popin' />
                        <FakeContent />
                        <Popin ref="from-right-no-overlay" overlay={false} type="from-right">
                            <FakeContent />
                        </Popin>
                    </Popin>
                    <Popin ref="from-menu-second" overlay={false} level={1} type="from-menu">
                        <FakeContent />
                    </Popin>
                    <Popin ref="from-right" type="from-right">
                        test
                        <FakeContent />
                    </Popin>
                </div>
            </Layout>
        );
    }
});

const FakeContent = React.createClass({
    render() {
        return (
             <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis condimentum, turpis non aliquam bibendum, ligula ex convallis dui,
                vel tincidunt ipsum risus et lacus. Vivamus quam lectus, finibus in gravida id, auctor semper libero. Cras lacinia dapibus erat facilisis vestibulum.
                Suspendisse aliquam sollicitudin lorem, eu ultricies velit malesuada in. Nunc at eros id erat gravida tincidunt. Nulla id ornare sem, nec mattis lacus.
                In ex libero, pulvinar semper nisl ut, pulvinar facilisis nisl. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis condimentum, turpis non aliquam bibendum,
                ligula ex convallis dui, vel tincidunt ipsum risus et lacus. Vivamus quam lectus, finibus in gravida id, auctor semper libero. Cras lacinia dapibus erat facilisis vestibulum.
                Suspendisse aliquam sollicitudin lorem, eu ultricies velit malesuada in. Nunc at eros id erat gravida tincidunt. Nulla id ornare sem, nec mattis lacus. In ex libero, pulvinar
                semper nisl ut, pulvinar facilisis nisl. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis condimentum, turpis non aliquam bibendum, ligula ex convallis dui, vel
                tincidunt ipsum risus et lacus. Vivamus quam lectus, finibus in gravida id, auctor semper libero. Cras lacinia dapibus erat facilisis vestibulum. Suspendisse aliquam sollicitudin
                lorem, eu ultricies velit malesuada in. Nunc at eros id erat gravida tincidunt. Nulla id ornare sem, nec mattis lacus. In ex libero, pulvinar semper nisl ut, pulvinar facilisis nisl.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis condimentum, turpis non aliquam bibendum, ligula ex convallis dui, vel tincidunt ipsum risus et lacus.
                Vivamus quam lectus, finibus in gravida id, auctor semper libero. Cras lacinia dapibus erat facilisis vestibulum. Suspendisse aliquam sollicitudin lorem, eu ultricies
                velit malesuada in. Nunc at eros id erat gravida tincidunt. Nulla id ornare sem, nec mattis lacus. In ex libero, pulvinar semper nisl ut, pulvinar facilisis nisl.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis condimentum, turpis non aliquam bibendum, ligula ex convallis dui, vel tincidunt ipsum risus et lacus.
                Vivamus quam lectus, finibus in gravida id, auctor semper libero. Cras lacinia dapibus erat facilisis vestibulum. Suspendisse aliquam sollicitudin lorem, eu ultricies velit malesuada in.
                Nunc at eros id erat gravida tincidunt. Nulla id ornare sem, nec mattis lacus. In ex libero, pulvinar semper nisl ut, pulvinar facilisis nisl. Lorem ipsum dolor sit amet, consectetur
                adipiscing elit. Duis condimentum, turpis non aliquam bibendum, ligula ex convallis dui, vel tincidunt ipsum risus et lacus. Vivamus quam lectus, finibus in gravida id, auctor semper libero.
                Cras lacinia dapibus erat facilisis vestibulum. Suspendisse aliquam sollicitudin lorem, eu ultricies velit malesuada in. Nunc at eros id erat gravida tincidunt. Nulla id ornare sem, nec mattis
                lacus. In ex libero, pulvinar semper nisl ut, pulvinar facilisis nisl.
            </p>
        );
    }
});

module.exports = () => (
    <Demo />
);
