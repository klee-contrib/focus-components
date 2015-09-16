const SelectInput = FocusComponents.common.select.classic.component;


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


const SelectInputSample = React.createClass({
    /**
    * Render the component.
    * @return {object} React node
    */
    render() {
        return (
            <div>
                <h3>Liste simple sans valeur préselectionnée</h3>
                <p>
                <span>hasUndefined forcé</span>
                <SelectInput value='B' hasUndefined={false} values={valuesExample}/>
                </p>
                <p>
                <span>Non requis</span>
                <SelectInput value='B' isRequired={false} values={valuesExample}/>
                </p>
                <p>
                <span>Requis</span>
                <SelectInput value='B' isRequired={true} values={valuesExample}/>
                </p>
                <h3>Liste simple avec valeur préselectionnée</h3>
                <SelectInput values={valuesExample}/>

                <h3>Liste simple avec redéfinition des code /value</h3>
                <SelectInput values={valuesCustomExample} valueKey='id' labelKey='name'/>

                <h3>Liste simple sans valeur préselectionnée</h3>
                <SelectInput value={['B','C']} multiple={true} values={valuesExample}/>

                <h3>Liste simple avec valeurs entières</h3>
                <SelectInput value={1} values={valuesInt} />

                <h3>Liste désactivée</h3>
                <SelectInput value={1} values={valuesInt} disabled={true} />
            </div>
        );
    }
});

return <SelectInputSample />;
