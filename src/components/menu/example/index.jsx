const {MenuLeft} = FocusComponents.components;
const Popin = FocusComponents.application.popin.component;

const MyMenu = React.createClass({
    launchSecondPopin(MyMenu) {
        const self = this;
        return self.refs.secondPopin.togglePopin();
    },
    itemsBuilder() {
        const self = this;
        return [
            {
                icon:'home',
                onClick() {
                    window.location.href = '#';
                }
            },
            {
                icon:'chat bubble',
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
    styleBuilder() {
        return {
            position: 'fixed',
            left:'40%',
            top:'30%',
            width:'512px'
        }
    },
    render() {
        return (
            <div>
                <MenuLeft items={this.itemsBuilder()}>
                </MenuLeft>
                <div style={this.styleBuilder()} className="demo-card-wide mdl-card mdl-shadow--2dp">
                    <div className="mdl-card__title">
                        <h1 className="mdl-card__title-text">Welcome</h1>
                    </div>
                    <div className="mdl-card__supporting-text">
                        <h6>
                            Here you can see a example of a Focus menu bar.<br/>
                            You can easily define actions to your icons and stay on the same wavelength as your application's logic.
                        </h6>
                    </div>
                    <div className="mdl-card__actions mdl-card--border">
                        <a className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" onClick={this.launchSecondPopin}>
                            <b>See more</b>
                        </a>
                    </div>
                </div>
                <MyPopin ref='popin'/>
                <SecondPopin ref='secondPopin'/>
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
            <Popin ref='popin' size="small">
                <h2>
                    Popin Title
                </h2><br/>
                <h4>
                    Hello there, <br/>
                    I'm a Popin component.<br/>
                    I Hope our demos are helpful...
                </h4>
                And I hope I'll got my demo page soon 😐 <br/>
                <h5><i>Focus.</i></h5>
            </Popin>
        );
    }
});

const SecondPopin = React.createClass({
    togglePopin() {
        this.refs.secondPopin.toggleOpen();
    },
    render() {
        return (
            <Popin ref='secondPopin' size="small">
                <h2>
                    News
                </h2><br/>
                <h4>
                    By the moment, i don't have my page...
                </h4>
                And I hope I'll got it soon 😐 <br/>
                <h5><i>Focus.</i></h5>
            </Popin>
        );
    }
});

module.exports = MyMenu;
