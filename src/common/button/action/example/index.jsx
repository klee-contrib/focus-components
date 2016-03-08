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
    render() {
        return(
            <div>
                <Button label='BOUTON' type='button' shape='raised' color='colored' handleOnClick={() => console.log(this)} />
            </div>
        );
    }
});

module.exports = ButtonExample;
