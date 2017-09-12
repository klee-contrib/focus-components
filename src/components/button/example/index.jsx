import React, { Component } from 'react';
import { Button } from 'FocusComponents/components';
import { init } from 'focus-core/translation';

const resources = {
    dev: {
        translation: {
            button: {
                label: 'button'
            }
        }
    }
};
init({ resources: resources });

/**
 * Custom button.
 */
class ButtonExample extends Component {

    flexContainer = {
        display: 'flex',
        justifyContent: 'center',
        flexFlow: 'wrap'
    }

    flexItem = {
        padding: '15px',
        fontWeight: 'bold',
        textAlign: 'center'
    }

    flexItemTitle = {
        textAlign: 'center',
        width: '100%'
    }

    /** @inheritDoc */
    render() {
        return (
            <div>
                <div style={this.flexContainer}>
                    <h4 style={this.flexItemTitle}>RIPPLE EFFECT</h4>
                    <div style={this.flexItem}><Button label='button.label' type='button' shape='raised' onClick={() => console.log(this)} onMouseOver={() => console.log('Mouse enter event')} /><br /><br />Without ripple</div>
                    <div style={this.flexItem}><Button label='button.label' type='button' shape='raised' color='colored' hasRipple onClick={() => console.log(this)} /><br /><br />With ripple</div>
                </div>

                <div style={this.flexContainer}>
                    <h4 style={this.flexItemTitle}>SIMPLE BUTTON</h4>
                    <div style={this.flexItem}><Button label='button.label' type='button' shape='raised' hasRipple onClick={() => console.log(this)} /><br /><br />Button</div>
                    <div style={this.flexItem}><Button label='button.label' type='button' shape='raised' color='primary' hasRipple onClick={() => console.log(this)} /><br /><br />Primary color</div>
                    <div style={this.flexItem}><Button label='button.label' type='button' shape='raised' color='accent' hasRipple onClick={() => console.log(this)} /><br /><br />Accent color</div>
                </div>

                <div style={this.flexContainer}>
                    <h4 style={this.flexItemTitle}>FAB</h4>
                    <div style={this.flexItem}><Button icon='add' type='button' shape='fab' hasRipple onClick={() => console.log(this)} /><br /><br />FAB</div>
                    <div style={this.flexItem}><Button icon='add' type='button' shape='fab' color='primary' hasRipple onClick={() => console.log(this)} /><br /><br />Primary color</div>
                    <div style={this.flexItem}><Button icon='add' type='button' shape='fab' color='accent' hasRipple onClick={() => console.log(this)} /><br /><br />Accent color</div>
                </div>

                <div style={this.flexContainer}>
                    <h4 style={this.flexItemTitle}>MINI-FAB</h4>
                    <div style={this.flexItem}><Button icon='add' type='button' shape='mini-fab' onClick={() => console.log(this)} /><br /><br />Mini FAB</div>
                    <div style={this.flexItem}><Button icon='add' type='button' shape='mini-fab' color='primary' hasRipple onClick={() => console.log(this)} /><br /><br />Primary color</div>
                    <div style={this.flexItem}><Button icon='add' type='button' shape='mini-fab' color='accent' hasRipple onClick={() => console.log(this)} /><br /><br />Accent color</div>
                </div>
            </div>
        );
    }
}

export default ButtonExample;
