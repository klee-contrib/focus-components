const Button = FocusComponents.common.button.action.component;
const i18nInitializer = FocusCore.translation.init;

const resources = {
    dev: {
        translation: {
            'button': {
                'label': 'button'
            }
        }
    }
};
i18nInitializer({resStore: resources});

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
                    <h4 style={this.flexItemTitle}>BUTTON RIPPLE</h4>
                    <div style={this.flexItem}><Button label='TEST' type='button' hasRipple={true} shape='raised' color='primary' handleOnClick={() => console.log(this)} /><br/><br/>Without ripple</div>
                    <div style={this.flexItem}><Button label='TEST' type='button' hasRipple={true} shape='raised' color='accent' handleOnClick={() => console.log(this)} /><br/><br/>With ripple</div>
                </div>

                <div style={this.flexContainer}>
                    <h4 style={this.flexItemTitle}>SIMPLE BUTTON</h4>
                    <div style={this.flexItem}><Button label='TEST' type='button' hasRipple={true} shape='raised' handleOnClick={() => console.log(this)} /><br/><br/>Button</div>
                    <div style={this.flexItem}><Button label='TEST' type='button' hasRipple={true} shape='raised' color='primary' handleOnClick={() => console.log(this)} /><br/><br/>Primary color</div>
                    <div style={this.flexItem}><Button label='TEST' type='button' hasRipple={true} shape='raised' color='accent' handleOnClick={() => console.log(this)} /><br/><br/>Accent color</div>
                </div>

                <div style={this.flexContainer}>
                    <h4 style={this.flexItemTitle}>FAB</h4>
                    <div style={this.flexItem}><Button icon='add' type='button' shape='fab' handleOnClick={() => console.log(this)} /><br/><br/>FAB</div>
                    <div style={this.flexItem}><Button icon='add' type='button' shape='fab' color='primary' handleOnClick={() => console.log(this)} /><br/><br/>Primary color</div>
                    <div style={this.flexItem}><Button icon='add' type='button' shape='fab' color='accent' handleOnClick={() => console.log(this)} /><br/><br/>Accent color</div>
                </div>

                <div style={this.flexContainer}>
                    <h4 style={this.flexItemTitle}>MINI-FAB</h4>
                    <div style={this.flexItem}><Button icon='add' type='button' shape='mini-fab' handleOnClick={() => console.log(this)} /><br/><br/>Mini FAB</div>
                    <div style={this.flexItem}><Button icon='add' type='button' shape='mini-fab' color='primary' handleOnClick={() => console.log(this)} /><br/><br/>Primary color</div>
                    <div style={this.flexItem}><Button icon='add' type='button' shape='mini-fab' color='accent' handleOnClick={() => console.log(this)} /><br/><br/>Accent color</div>
                </div>
            </div>
        );
    }
});

module.exports = ButtonExample;
