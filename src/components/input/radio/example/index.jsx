import Radio from 'focus-components/components/input/radio';

function InputRadioSample() {
    return (
        <div>
            <h3>With value : False</h3>
            <div>
                <Radio name='options1' label='Value False' />
            </div>
            <h3>With value : True</h3>
            <div>
                <Radio name='options2' value label='Value True' />
            </div>
        </div>
    );
}

export default InputRadioSample;
