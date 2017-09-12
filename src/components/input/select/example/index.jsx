import SelectInput from 'focus-components/components/input/select';

const valuesExample = [
    { code: 'A', label: 'aaaa' },
    { code: 'B', label: 'bbbbb' },
    { code: 'C', label: 'ccccc' },
    { code: 'D', label: 'DDDD' }
];

const valuesCustomExample = [
    { id: 'custom', name: 'aaaaCustom' },
    { id: 'BCustom', name: 'bbbbbCustom' },
    { id: 'CCustom', name: 'cccccCustom' }
];

const valuesInt = [
    { code: 1, label: 'aInt' },
    { code: 2, label: 'bInt' },
    { code: 3, label: 'cInt' }
];

function _capitalize(string) {
    return string && (string.charAt(0).toUpperCase() + string.slice(1));
}

const SelectSample = React.createClass({
    onChangeSelect(name) {
        return (value) => {
            console.log('change', name, value);
            this.setState({ [name]: value, [`error${_capitalize(name)}`]: null });
        };
    },
    getInitialState() {
        return {
            valueHasUndefined: 'B',
            valueNonRequis: 'B',
            valueRequis: 'B',
            valueWithoutValue: null,
            valueCodeRedefined: null,
            valueIntValues: 1,
            valueListDesactive: 1,
            valueError: '1111',
            errorValueError: 'Erreur sur le champ select'
        };
    },
    /**
    * Render the component.
    * @return {object} React node
    */
    render() {
        const { valueHasUndefined, valueNonRequis, valueRequis, valueWithoutValue, valueCodeRedefined, valueIntValues, valueListDesactive, valueError, errorValueError } = this.state;
        return (
            <div>
                <h3>Liste simple avec valeur préselectionnée</h3>
                <p>
                    <span>hasUndefined forcé</span>
                    <SelectInput hasUndefined={false} name='valueHasUndefined' onChange={this.onChangeSelect('valueHasUndefined')} values={valuesExample} value={valueHasUndefined} />
                </p>
                <p>
                    <span>Non requis</span>
                    <SelectInput isRequired={false} name='valueNonRequis' onChange={this.onChangeSelect('valueNonRequis')} value={valueNonRequis} values={valuesExample} />
                </p>
                <p>
                    <span>Requis</span>
                    <SelectInput name='valueRequis' onChange={this.onChangeSelect('valueRequis')} isRequired value={valueRequis} values={valuesExample} />
                </p>
                <h3>Liste simple sans valeur préselectionnée</h3>
                <SelectInput name='valueWithoutValue' onChange={this.onChangeSelect('valueWithoutValue')} value={valueWithoutValue} values={valuesExample} />

                <h3>Liste simple avec redéfinition des code /value</h3>
                <SelectInput name='valueCodeRedefined' labelKey='name' onChange={this.onChangeSelect('valueCodeRedefined')} valueKey='id' value={valueCodeRedefined} values={valuesCustomExample} />

                <h3>Select avec une erreur</h3>
                <h3>Liste simple avec redéfinition des code /value</h3>
                <SelectInput error={errorValueError} name='valueError' onChange={this.onChangeSelect('valueError')} value={valueError} values={valuesExample} />

                <h3>Liste simple avec valeurs entières</h3>
                <SelectInput name='valueIntValues' onChange={this.onChangeSelect('valueIntValues')} value={valueIntValues} values={valuesInt} />

                <h3>Liste désactivée</h3>
                <SelectInput disabled name='valueListDesactive' onChange={this.onChangeSelect('valueListDesactive')} value={valueListDesactive} values={valuesInt} />
            </div>
        );
    }
});

export default SelectSample;
