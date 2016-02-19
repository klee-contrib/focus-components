const {MenuLeft} = FocusComponents.components;
const Popin = FocusComponents.application.popin.component;

const MyMenu = React.createClass({
    goHome() {
        window.location.href = '#'
    },
    itemsBuilder() {
        const self = this;
        return [
            {
                icon:'home',
                onClick() {
                    self.goHome();
                }
            },
            {
                icon:'chat',
                onClick() {
                    self.refs.popin.togglePopin();
                }
            },
            {
                icon:'info',
                onClick() {
                    window.location.href = '#component/Menu';
                }
            }
        ]
    },
    style: {
        position: 'fixed',
        left:'40%',
        top:'30%',
        width:'512px'
    },
    render() {
        return (
            <div>
                <MenuLeft items={this.itemsBuilder()} handleBrandClick={this.goHome}>
                </MenuLeft>
                <div style={this.style} className='demo-card-wide mdl-card mdl-shadow--2dp'>
                    <div className='mdl-card__title'>
                        <h1 className='mdl-card__title-text'>Welcome</h1>
                    </div>
                    <div className='mdl-card__supporting-text'>
                        <h6>
                            Here you can see a Focus menu bar example.
                            <br/>
                            You can easily define actions to your icons and stay on the same wavelength as your application's logic.
                        </h6>
                    </div>
                </div>
                <MyPopin ref='popin'/>
            </div>
        );
    }
});

const MyPopin = React.createClass({
    togglePopin() {
        this.refs.popin.toggleOpen();
    },
    render() {
        return (
            <Popin ref='popin' size='small' type='from-menu'>
                <h2>
                    News
                </h2>
                <br/>
                <h4>
                    Hello there,
                    <br/>
                    I'm a Popin component.
                    <br/>
                    I Hope our demos are helpful...
                </h4>
                And I hope I'll got my demo page soon 😐
                <br/>
                <h5><i>Focus.</i></h5>
            </Popin>
        );
    }
});

module.exports = MyMenu;
