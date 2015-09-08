const Button = FocusComponents.common.button.action.component;

const ButtonSample = React.createClass({
    /**
    * Render the component.
    * @return {object} React node
    */
    render() {
        return (
            <div className='button-example'>
                <Button label='Bouton primaire' type='button' handleOnClick={()=> alert('click bouton')}/>
                <br /><br />
                <Button icon='alarm' color='colored' label='Bouton primaire' shape='fab' type='button' handleOnClick={()=> alert('click bouton')}/>
                <br /><br />
                <Button icon='build' label='Bouton icone' type='button' handleOnClick={()=> alert('click bouton')}/>
                <br /><br />
                <Button icon='build' color='accent' label='Bouton accent' type='button' handleOnClick={()=> alert('click bouton')}/>
                <br /><br />
                <Button icon='mood' color='colored' shape='icon' type='button' handleOnClick={()=> alert('click bouton')}/>
                <br /><br />
                <Button icon='mood' color='announcement' shape='mini-fab' type='button' handleOnClick={()=> alert('click bouton')}/>
            </div>
        );
    }
});

return <ButtonSample/>;
