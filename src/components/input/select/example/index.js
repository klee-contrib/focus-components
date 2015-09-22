const SelectInput = FocusComponents.components.input.select;

const valuesExample = [
    {code: "A", label: "aaaa"},
    {code: "B", label: "bbbbb"},
    {code: "C", label: "ccccc"},
    {code: "D", label: "DDDD"}
];
const valuesCustomExample = [
    {id: "custom", name: "aaaaCustom"},
    {id: "BCustom", name: "bbbbbCustom"},
    {id: "CCustom", name: "cccccCustom"}
];
const valuesInt = [
    {code: 1, label: "aInt"},
    {code: 2, label: "bInt"},
    {code: 3, label: "cInt"}
];


const SelectSample = React.createClass({
    onChangeSelect(name){
        return (value)=>{
            this.setState({[name]: value});
        };
    },
    getInitialState(){
            return {
                valueHasUndefined: 'B',
                valueNonRequis: 'B',
                valueRequis: 'B',
                valueWithoutValue: null,
                valueCodeRedefined: null,
                valueIntValues: 1,
                valueListDesactive: 1
            };
    },
    /**
    * Render the component.
    * @return {object} React node
    */
    render() {
        const {valueHasUndefined, valueNonRequis, valueRequis, valueWithoutValue, valueCodeRedefined, valueIntValues, valueListDesactive} = this.state;
        return (
            <div>
                <h3>Liste simple avec valeur préselectionnée</h3>
                <p>
                    <span>hasUndefined forcé</span>
                    <SelectInput value={valueHasUndefined} hasUndefined={false} onChange={this.onChangeSelect('valueHasUndefined')} values={valuesExample}/>
                </p>
                <p>
                    <span>Non requis</span>
                    <SelectInput value={valueNonRequis} isRequired={false} onChange={this.onChangeSelect('valueNonRequis')} values={valuesExample}/>
                </p>
                <p>
                    <span>Requis</span>
                    <SelectInput value={valueRequis} onChange={this.onChangeSelect('valueRequis')} isRequired={true} values={valuesExample}/>
                </p>
                <h3>Liste simple sans valeur préselectionnée</h3>
                <SelectInput value={valueWithoutValue} values={valuesExample} onChange={this.onChangeSelect('valueWithoutValue')}/>

                <h3>Liste simple avec redéfinition des code /value</h3>
                <SelectInput value={valueCodeRedefined} values={valuesCustomExample}  onChange={this.onChangeSelect('valueCodeRedefined')} valueKey='id' labelKey='name'/>

                <h3>Liste simple avec valeurs entières</h3>
                <SelectInput value={valueIntValues} onChange={this.onChangeSelect('valueIntValues')} values={valuesInt} />

                <h3>Liste désactivée</h3>
                <SelectInput value={valueListDesactive}  onChange={this.onChangeSelect('valueListDesactive')} values={valuesInt} disabled={true} />
            </div>
        );
    }
});

return <SelectSample />;
