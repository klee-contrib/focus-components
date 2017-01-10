const {Button} = FocusComponents.components;
const i18nInitializer = FocusCore.translation.init;

let resources = {
    dev: {
        translation: {
            button: {
                label: 'button'
            }
        }
    }
};
i18n.init({resStore: resources});

const ButtonExample = React.createClass({
    flexContainer: {
        display: 'flex',
        justifyContent: 'center',
        flexFlow: 'wrap'
    },
    flexItem: {
        padding: '15px',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    flexItemTitle: {
        textAlign: 'center',
        width: '100%'
    },
    render() {
        return(
            <div>
                <div style={this.flexContainer}>
                    <h4 style={this.flexItemTitle}>RIPPLE EFFECT</h4>
                    <div style={this.flexItem}><Button label='button.label' type='button' shape='raised' onClick={() => console.log(this)} onMouseOver={() => console.log('Mouse enter event')} /><br/><br/>Without ripple</div>
                    <div style={this.flexItem}><Button label='button.label' type='button' shape='raised' color='colored' hasRipple onClick={() => console.log(this)} /><br/><br/>With ripple</div>
                </div>

                <div style={this.flexContainer}>
                    <h4 style={this.flexItemTitle}>SIMPLE BUTTON</h4>
                    <div style={this.flexItem}><Button label='button.label' type='button' shape='raised' hasRipple onClick={() => console.log(this)} /><br/><br/>Button</div>
                    <div style={this.flexItem}><Button label='button.label' type='button' shape='raised' color='primary' hasRipple onClick={() => console.log(this)} /><br/><br/>Primary color</div>
                    <div style={this.flexItem}><Button label='button.label' type='button' shape='raised' color='accent' hasRipple onClick={() => console.log(this)} /><br/><br/>Accent color</div>
                </div>

                <div style={this.flexContainer}>
                    <h4 style={this.flexItemTitle}>FAB</h4>
                    <div style={this.flexItem}><Button icon='add' type='button' shape='fab' hasRipple onClick={() => console.log(this)} /><br/><br/>FAB</div>
                    <div style={this.flexItem}><Button icon='add' type='button' shape='fab' color='primary' hasRipple onClick={() => console.log(this)} /><br/><br/>Primary color</div>
                    <div style={this.flexItem}><Button icon='add' type='button' shape='fab' color='accent' hasRipple onClick={() => console.log(this)} /><br/><br/>Accent color</div>
                </div>

                <div style={this.flexContainer}>
                    <h4 style={this.flexItemTitle}>MINI-FAB</h4>
                    <div style={this.flexItem}><Button icon='add' type='button' shape='mini-fab' onClick={() => console.log(this)} /><br/><br/>Mini FAB</div>
                    <div style={this.flexItem}><Button icon='add' type='button' shape='mini-fab' color='primary' hasRipple onClick={() => console.log(this)} /><br/><br/>Primary color</div>
                    <div style={this.flexItem}><Button icon='add' type='button' shape='mini-fab' color='accent' hasRipple onClick={() => console.log(this)} /><br/><br/>Accent color</div>
                </div>
            </div>
        );
    }
});

module.exports = ButtonExample;
