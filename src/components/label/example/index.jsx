const {Label} = FocusComponents.components;

function LabelExample() {
    return(
        <div>
            <form>
                <Label name='Hello Label Test' value='labelTest' className='mdl-textfield__label'/>
            </form>
        </div>
    );
}

module.exports = LabelExample;
