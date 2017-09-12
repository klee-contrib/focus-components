import { component as Button } from 'focus-components/common/button/action';
import { init } from 'focus-core/translation';

let resources = {
    dev: {
        translation: {
            button: {
                label: 'button'
            }
        }
    }
};
init({ resources: resources });

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
        return (
            <div>
                <div style={this.flexContainer}>
                    <h4 style={this.flexItemTitle}>RIPPLE EFFECT</h4>
                    <div style={this.flexItem}><Button label='button.label' type='button' shape='raised' handleOnClick={() => console.log(this)} /><br /><br />Without ripple</div>
                    <div style={this.flexItem}><Button label='button.label' type='button' shape='raised' color='colored' hasRipple handleOnClick={() => console.log(this)} /><br /><br />With ripple</div>
                </div>

                <div style={this.flexContainer}>
                    <h4 style={this.flexItemTitle}>SIMPLE BUTTON</h4>
                    <div style={this.flexItem}><Button label='button.label' type='button' shape='raised' handleOnClick={() => console.log(this)} /><br /><br />Button</div>
                    <div style={this.flexItem}><Button label='button.label' type='button' shape='raised' color='primary' handleOnClick={() => console.log(this)} /><br /><br />Primary color</div>
                    <div style={this.flexItem}><Button label='button.label' type='button' shape='raised' color='accent' handleOnClick={() => console.log(this)} /><br /><br />Accent color</div>
                </div>

                <div style={this.flexContainer}>
                    <h4 style={this.flexItemTitle}>FAB</h4>
                    <div style={this.flexItem}><Button icon='add' type='button' shape='fab' handleOnClick={() => console.log(this)} /><br /><br />FAB</div>
                    <div style={this.flexItem}><Button icon='add' type='button' shape='fab' color='primary' handleOnClick={() => console.log(this)} /><br /><br />Primary color</div>
                    <div style={this.flexItem}><Button icon='add' type='button' shape='fab' color='accent' handleOnClick={() => console.log(this)} /><br /><br />Accent color</div>
                </div>

                <div style={this.flexContainer}>
                    <h4 style={this.flexItemTitle}>MINI-FAB</h4>
                    <div style={this.flexItem}><Button icon='add' type='button' shape='mini-fab' handleOnClick={() => console.log(this)} /><br /><br />Mini FAB</div>
                    <div style={this.flexItem}><Button icon='add' type='button' shape='mini-fab' color='primary' handleOnClick={() => console.log(this)} /><br /><br />Primary color</div>
                    <div style={this.flexItem}><Button icon='add' type='button' shape='mini-fab' color='accent' handleOnClick={() => console.log(this)} /><br /><br />Accent color</div>
                </div>
            </div>
        );
    }
});

export default ButtonExample;
