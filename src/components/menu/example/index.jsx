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
                <MenuLeft items={this.itemsBuilder()} handleBrandClick={this.goHome} />
                <div style={this.style} className='demo-card-wide mdl-card mdl-shadow--2dp'>
                    <div className='mdl-card__title'>
                        <h1 className='mdl-card__title-text'>Welcome</h1>
                    </div>
                    <div className='mdl-card__supporting-text'>
                        <h6>
                            <br/>
                            On the left menu bar the <div className="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect"><i  className="material-icons">home</i></div> button will make you go on the home page, the <b><div className="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect"><i className="material-icons">chat</i></div></b> button will show you an action (here it will show a popin) and  <b><div className="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect"><i className="material-icons">info</i></div></b> button will make you go to the menu's sample code page.
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
                    I'm a Popin component..
                </h4>
                <br/>
                <h5><i>Focus.</i></h5>
            </Popin>
        );
    }
});

module.exports = MyMenu;
