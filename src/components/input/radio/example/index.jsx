const {Radio} = FocusComponents.components.input;


function InputRadioSample() {
    return(
        <div>
            <h3>With value : False</h3>
            <div>
                <Radio name="options1" label="Value False" />
            </div>
            <h3>With value : True</h3>
            <div>
                <Radio name="options2" value={true} label="Value True" />
            </div>
        </div>
    );
}

module.exports = InputRadioSample;
