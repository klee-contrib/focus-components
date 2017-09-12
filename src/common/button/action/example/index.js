import { component as Button } from 'focus-components/common/button/action';
import { init } from 'focus-core/translation';

/***********************************************************************************************************************/
/* to test internationalisation. */
let resources = {
    dev: {
        translation: {
            button: {
                label: 'Button avec tradution'
            }
        }
    }
};
init({ resources: resources });
/***********************************************************************************************************************/

const ButtonSample = React.createClass({
    /**
    * Render the component.
    * @return {object} React node
    */
    render() {
        return (
            <div className='button-example'>
                <Button label='Bouton primaire' type='button' handleOnClick={() => alert('click bouton')} />
                <br /><br />
                <Button icon='alarm' color='colored' label='Bouton primaire' shape='fab' type='button' handleOnClick={() => alert('click bouton')} />
                <br /><br />
                <Button icon='build' label='Bouton icone' type='button' handleOnClick={() => alert('click bouton')} />
                <br /><br />
                <Button icon='build' color='accent' label='Bouton accent' type='button' handleOnClick={() => alert('click bouton')} />
                <br /><br />
                <Button icon='mood' color='colored' label='iconbutton' shape='icon' type='button' handleOnClick={() => alert('click bouton')} />
                <br /><br />
                <Button icon='mood' label='minifabbutton' color='announcement' shape='mini-fab' type='button' handleOnClick={() => alert('click bouton')} />
                <br /><br />
                <Button label='button.label' type='button' handleOnClick={() => alert('click bouton')} />
            </div>
        );
    }
});

return <ButtonSample />;
