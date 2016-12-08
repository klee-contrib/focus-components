const {MenuLeft} = FocusComponents.components;
const Popin = FocusComponents.application.popin.component;
const {Panel} = FocusComponents.components;

let currentLevel = 0;
const getLevel = function getLevel() {
    currentLevel++;
    return currentLevel;
};

const MyMenu = React.createClass({

    getInitialState() {
        return ({
            levelPopin1: 0,
            levelPopin2: 0,
            levelPopin3: 0,
        });
    },

    goHome() {
        window.location.href = '#'
    },
    itemsBuilder() {
        const self = this;
        return [
            {
                icon: 'home',
                onClick() {
                    self.goHome();
                }
            },
            {
                icon: 'notifications',
                onClick() {
                    self.setState({levelPopin1:getLevel() });
                    self.refs.popin.togglePopin();
                }
            },
            {
                icon: 'chat',
                onClick() {
                    self.setState({levelPopin3:getLevel() });
                    self.refs.thirdPopin.togglePopin();

                }
            }
        ]
    },
    style: {
        position: 'fixed',
        left: '40%',
        top: '30%',
        width: '576px'
    },
    titleStyle: {
        color: 'white',
        height: ' 176px',
        backgroundImage: 'url(http://media.dcentertainment.com/sites/default/files/character_bio_576_superman_0.jpg)'
    },
    makeTheSecondPopinPop() {
        const self = this;
        self.setState({levelPopin2:getLevel()});
        self.refs.secondPopin.setState({dynamicPopin: 0});
        return self.refs.secondPopin.togglePopin();
    },
    makeTheThirdPopinPop() {
        const self = this;
        self.setState({levelPopin3:getLevel() });
        return self.refs.thirdPopin.togglePopin();
    },
    render() {
        const {levelPopin1,levelPopin2,levelPopin3} = this.state;
        return (
            <div>
                <MenuLeft items={this.itemsBuilder()} handleBrandClick={this.goHome}>
                </MenuLeft>
                <div style={this.style} className="demo-card-wide mdl-card mdl-shadow--2dp">
                    <div className="mdl-card__title" style={this.titleStyle}>
                        <h2 className="mdl-card__title-text">The Superman</h2>
                    </div>
                    <div className="mdl-card__supporting-text" style={this.divSupportText}>
                        <h5>
                            Through this example you'll find the different possibilities you got with the Focus Popin
                            component.
                            <br/><br/>
                            Click on
                            <div className="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect"><i
                                className="material-icons">notifications</i></div>
                            icon to have a menu slidding popin
                            <br/>
                            Click on
                            <div className="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect"><i
                                className="material-icons">chat</i></div>
                            icon to have a right slidding popin
                            <br/>
                            And
                            <button
                                className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent"
                                onClick={this.makeTheSecondPopinPop}><b>Click here</b></button>
                            to display a fade-in popin example.
                            <br/>
                        </h5>
                    </div>
                </div>
                <MyPopin ref='popin' level={levelPopin1}/>
                <SecondPopin ref='secondPopin'  level={levelPopin2}/>
                <ThirdPopin ref='thirdPopin'  level={levelPopin3}/>
            </div>
        );
    }
});

const MyPopin = React.createClass({
    togglePopin() {
        this.refs.popin.toggleOpen();
    },
    render() {
        const {level}= this.props;
        return (
            <Popin ref='popin' size='small' type='from-menu' modal={false} level={level} >
                <h2>
                    News
                </h2>
                <br/>
                <h4>
                    Hello there,
                    <br/>
                    <br/>
                    Here, you have a <i>"small"</i> Poping coming <i>"from-menu"</i> with a <i>"false"</i> modal !
                    <br/>
                    Click on the <b>settings</b> button near Superman to display a last Popin.
                </h4>
                <br/>
                <h5><i>Focus.</i></h5>
            </Popin>
        );
    }
});

const SecondPopin = React.createClass({

    getInitialState() {
        return {dynamicPopin: 0};
    },
    togglePopin() {
        this.refs.secondPopin.toggleOpen();
    },
    _renderDynamicPopin(){
        const colors = ['grey', 'Cornsilk', 'Gainsboro', 'LightCyan '];
        const popins = Array.from(Array(this.state.dynamicPopin).keys())
            .map(idx => {
                const colorStyle = {backgroundColor: colors[idx % colors.length]};
                const popinTile = `Popin ${idx + 1}`;
                return (
                    <Popin key={idx} size='small' overlay={false} open={true} level={getLevel()}>
                        <Panel style={colorStyle} title={popinTile}>
                            <p>Close this popin with Escape key</p>
                        </Panel>
                    </Popin>);
            });
        return popins;
    },
    addPopup(){
        this.setState({dynamicPopin: this.state.dynamicPopin + 1});
    },
    render() {
        const {level}= this.props;
        return (
            <Popin ref='secondPopin' id='secondPopin' size='medium' overlay={false} level={level}>
                <h2>
                    The Modal, The Medium and The Full !
                </h2>
                <br/>
                <h4>
                    This Popin is, as described, set the default <b>type</b> named <b>full</b> it defines its animation.
                    <br/>
                    You have 3 choices which are <b>"full"</b>, <b>"from-menu"</b> and <b>"from-right"</b>. The modal
                    <b>attribute</b> is, by default, set to true so you can click outside of the Popin to close it.
                    <br/>
                    Check the notification icon which is in the Focus menu bar now.
                    <br/> <br/>
                    You can add as much popin as you want and close them with esc, from newer to older ones.
                </h4>
                <br/>
                <button className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent"
                        onClick={this.addPopup}><b>Click here</b></button>
                {this._renderDynamicPopin()}
            </Popin>
        );
    }
});

const ThirdPopin = React.createClass({
    togglePopin() {
        this.refs.thirdPopin.toggleOpen();
    },
    render() {
        const {level}= this.props;
        return (
            <Popin ref='thirdPopin' size='small' type='from-right' level={level}>
                <h2>
                    Material Design Videos
                </h2>
                <br/>
                <center>
                    <b>Material design</b>
                    <br/>
                    <iframe width="560" height="315" src="https://www.youtube.com/embed/Q8TXgCzxEnw" frameborder="0"
                            allowfullscreen></iframe>
                    <br/>
                    <br/>
                </center>
                <center>
                    <b>Making Material Design: Crafting Material</b>
                    <br/>
                    <iframe width="560" height="315" src="https://www.youtube.com/embed/Y0UEGsvcYvk" frameborder="0"
                            allowfullscreen></iframe>
                    <br/>
                    <br/>
                </center>
                <center>
                    <b>Material Design : Palette Perfect</b>
                    <br/>
                    <iframe width="560" height="315" src="https://www.youtube.com/embed/xYkz0Ueg0L4" frameborder="0"
                            allowfullscreen></iframe>
                    <br/>
                    <br/>
                </center>
                <center>
                    <b>Material Desing : Story</b>
                    <br/>
                    <iframe width="560" height="315" src="https://www.youtube.com/embed/rrT6v5sOwJg" frameborder="0"
                            allowfullscreen></iframe>
                </center>
            </Popin>
        );
    }
});


module.exports = MyMenu;
