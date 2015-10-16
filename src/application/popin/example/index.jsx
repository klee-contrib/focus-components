const Layout = FocusComponents.components.Layout;
const MenuLeft = FocusComponents.components.MenuLeft;
const Button = FocusComponents.common.button.action.component;
const Popin = FocusComponents.application.popin.component;


const PopinContent = React.createClass({
    render() {
        return (
             <p className="popin-content">
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

const Demo = React.createClass({
    popinOpener: function (ref) {
        const self = this;
        return function(event) {
            event.preventDefault();
            self.refs[ref].toggleOpen();
        }
    },
    render: function() {
        return (
        <Layout MenuLeft={MenuLeft}>
            <div className='buttons'>
                <Button handleOnClick={this.popinOpener('full')} label='Open full popin' />
                <Button handleOnClick={this.popinOpener('from-menu')} label='Open from-menu popin' />
                <Button handleOnClick={this.popinOpener('from-right')} label='Open from-right popin' />
            </div>
            <div className='content'>
                <h3>Some content to fill the page</h3>
                <img src='http://lorempixel.com/800/600/sports/'/>
                <img src='http://lorempixel.com/800/600/abstract/'/>
                <img src='http://lorempixel.com/800/600/city/'/>
                <img src='http://lorempixel.com/800/600/technics/'/>
            </div>

                <Popin ref='full' type='full'>
                    <p className="popin-content">
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
                </Popin>

        </Layout>
        );
    }
});

module.exports = () => (
    <Demo />
);


// //Simple function to update components in the bar.
// function updateComponents(cartridgeConf) {
//     const {cartridge: cartridgeComponent, summary: summaryComponent, actions: actions, barLeft: barContentLeftComponent, barRight: barContentRightComponent} = cartridgeConf;
//     dispatcher.handleViewAction({
//         data: {
//             cartridgeComponent,
//             summaryComponent,
//             actions,
//             barContentLeftComponent,
//             barContentRightComponent
//         },
//         type: 'update'
//     });
// };
// //Add a defer in order to inject the props after the component is mounted
// _.defer(()=>{
//     updateComponents({
//         cartridge: {component: CartridgeContent, props:{}},
//         summary:{component: Summary, props:{}},
//         actions: {
//             primary: [{label:'Action 1', icon:'alarm_on', action:() => {console.log('click !')}}, {label:'Action 2', icon:'build', action:() => {console.log('click !')}}],
//             secondary: [{label:'Action 3', icon:'print', action:() => {console.log('click !')}}, {label:'Action 4', icon:'print', action:() => {console.log("click !")}}, {label:'Action 5', icon:'print', action:() => {console.log("click !")}}]
//         },
//         barLeft: {component: BarContentLeft, props:{}},
//         barRight: {component: BarContentRight, props:{}}
//     })
// });
