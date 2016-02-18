const {MenuLeft} = FocusComponents.components;
const Popin = FocusComponents.application.popin.component;

function OpenPopin() {
    MyPopin.toggleOpen();
}

const MyMenu = React.createClass({
    itemsBuilder() {
        const self = this;
        return [
            {
                icon:'home',
                onClick() {
                    window.location.href = '#';
                }
            }, // route: 'home'
            { icon:'chat bubble',
                onClick() {
                    self.refs.popin.togglePopin();
                }
            }
        ]
    },
    render() {
        return (
            <div>
                <MenuLeft items={this.itemsBuilder()}>
                </MenuLeft>
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
            <Popin ref='popin'>
                Hello there. I'm a Popin component.<br/>
                I Hope our demos are helpful... And I hope I'll have my demo page soon.<br/>
                Focus.
            </Popin>
        );
    }
});

module.exports = MyMenu;
