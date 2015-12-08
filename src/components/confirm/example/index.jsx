// Dependencies
const {Component} = React;
const ConfirmWrapper = FocusComponents.components.Confirm;
const handleConfirm = () => {
         Focus.dispatcher.handleViewAction(
           {
             data: {
                confirmConfig:{
                    isVisible: true,
                    ConfirmContentComponent: 'hello',
                    handleCancel: () => {
                       //console.log('rodrigo')
                    },
                    handleConfirm: () => {
                       // alert('confirm');
                    }
                }
            },
            type: 'update'
           }
        );
}
// test to see if it is working
Focus.application.builtInStore.addConfirmConfigChangeListener((d)=>{
    console.log('change', Focus.application.builtInStore.getValue())
})

function  ConfirmExample() {
        return (
            <div>
                <ConfirmWrapper />
                <h1>Confirm example</h1>
                <button className='mdl-button mdl-js-button mdl-button--raised mdl-button--colored' onClick={handleConfirm}>
                    Confirm
                </button>
            </div>
        );
}

module.exports = ConfirmExample;
