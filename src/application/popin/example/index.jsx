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
                icon:'notifications',
                onClick() {
                    self.refs.popin.togglePopin();
                }
            }
        ]
    },
    style: {
        position: 'fixed',
        left:'40%',
        top:'30%',
        width:'576px'
    },
    titleStyle: {
        color: 'white',
        height:' 176px',
        backgroundImage: 'url(http://media.dcentertainment.com/sites/default/files/character_bio_576_superman_0.jpg)'
    },
    cardMenu: {
        color: 'white'
    },
    makeTheSecondPopinPop() {
        const self = this;
        return self.refs.secondPopin.togglePopin();
    },
    makeTheThirdPopinPop() {
        const self = this;
        return self.refs.thirdPopin.togglePopin();
    },
    render() {
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
                            Through this example you'll find the different possibilities you got with the Focus Popin component.
                            <br/>
                            The popin have different animations and different sizes.
                            <br/>
                            You can <b><i>size</i></b> them with keywords "small", "medium" & "large". You can also make theme animate with different by specifying what you want in the <b><i>type</i></b> attribute. In fact by default you'll have a zoomIn/zoomOut animation if you dont set the type props to the Popin.
                            <br/>
                            <br/>
                            Click the button bellow to have an example and more tips about the Focus Popin.
                        </h5>
                    </div>
                    <div className="mdl-card__actions mdl-card--border">
                        <a className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect raised" onClick={this.makeTheSecondPopinPop}>
                            Read more
                        </a>
                    </div>
                    <div className="mdl-card__menu" style={this.cardMenu}>
                        <button className="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect" onClick={this.makeTheThirdPopinPop}>
                            <i className="material-icons">settings</i>
                        </button>
                    </div>
                </div>
                <MyPopin ref='popin'/>
                <SecondPopin ref='secondPopin'/>
                <ThirdPopin ref='thirdPopin'/>
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
            <Popin ref='popin' size='small' type='from-menu' modal={false}>
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
    togglePopin() {
        this.refs.secondPopin.toggleOpen();
    },
    render() {
        return (
            <Popin ref='secondPopin' size='medium'>
                <h2>
                    The Modal, The Medium and The Full !
                </h2>
                <br/>
                <h4>
                    This Popin is, as described, set the default <b>type</b> named <b>full</b> it defines its animation.
                    <br/>
                    You have 3 choices which are <b>"full"</b>, <b>"from-menu"</b> and <b>"from-right"</b>. The modal <b>attribute</b> is, by default, set to true so you can click outside of the Popin to close it.
                    <br/>
                    Check the notification icon which is in the Focus menu bar now.
                </h4>
                Yeah, the Popin finally have its demo page 😄
                <br/>
            </Popin>
        );
    }
});

const ThirdPopin = React.createClass({
    togglePopin() {
        this.refs.thirdPopin.toggleOpen();
    },
    render() {
        return (
            <Popin ref='thirdPopin' size='small' type='from-right'>
                <h2>
                    Right article
                </h2>
                <br/>
                <h4>
                    Post hanc adclinis Libano monti
                    <br/>
                    Phoenice, regio plena gratiarum et venustatis,
                    <br/>
                    urbibus decorata magnis et pulchris; in quibus
                    <br/>
                    amoenitate celebritateque nominum
                    <br/>
                    Tyros excellit, Sidon et Berytus
                    <br/>
                    isdemque pares Emissa et Damascus
                    <br/>
                    saeculis condita priscis.

                    Cum autem commodis intervallata
                    <br/>
                    temporibus convivia longa et noxia
                    <br/>
                    coeperint apparari vel distributio
                    <br/>
                    sollemnium sportularum,
                    <br/>
                    anxia deliberatione tractatur an
                    <br/>
                    exceptis his quibus vicissitudo
                    <br/>
                    debetur, peregrinum invitari
                    <br/>
                    conveniet, et si digesto plene
                    <br/>
                    consilio id placuerit fieri, is
                    <br/>
                    adhibetur qui pro domibus excubat
                    <br/>
                    aurigarum aut artem tesserariam
                    <br/>
                    profitetur aut secretiora quaedam
                    <br/>
                    se nosse confingit.
                    <br/>
                    Hinc ille commotus ut iniusta
                    <br/>
                    perferens et indigna praefecti
                    <br/>
                    custodiam protectoribus
                    <br/>
                    mandaverat fidis. quo
                    <br/>
                    conperto Montius tunc quaestor
                    <br/>
                    acer quidem sed ad lenitatem
                    <br/>
                    propensior, consulens in commune
                    <br/>
                    advocatos palatinarum
                    <br/>
                    primos scholarum adlocutus
                    <br/>
                    est mollius docens nec decere
                    <br/>
                    haec fieri nec prodesse addensque
                    <br/>
                    vocis obiurgatorio sonu quod si id
                    <br/>
                    placeret, post
                    <br/>
                    statuas Constantii deiectas super
                    <br/>
                    adimenda vita praefecto conveniet
                    <br/>
                    securius cogitari.
                    <br/>
                    Equitis Romani autem esse filium
                    <br/>
                    criminis loco poni ab accusatoribus neque his
                    <br/>
                    iudicantibus oportuit neque defendentibus
                    <br/>
                    nobis. Nam quod de
                </h4>
            </Popin>
        );
    }
});

module.exports = MyMenu;
