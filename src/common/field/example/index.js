const Field = FocusComponents.common.field.component;

const valuesExample = [
    {code: "A", label: "aaaa"},
    {code: "B", label: "bbbbb"},
    {code: "C", label: "ccccc"},
    {code: "D", label: "DDDD"}
];

const FieldSample = React.createClass({
    /**
    * Render the component.
    * @return {object} React node
    */
    render() {
        return (
            <form>
                <h3>Champ en mode consultation</h3>
                <Field name='fieldConsult' value='fieldConsultValue' isEdit={false} label="My awsome field" />
                <Field name='fieldConsultFormatted' value='fieldConsultValue' isEdit={false} formatter={function(data){return data + " formatter applied";}} label="My awsome field formatted" />
                <h3>Champ en mode édition</h3>
                <Field name='field1' value='fieldValue' isEdit={true}/>
                <h3>Champ en mode édition avec domaine</h3>
                <Field name='field1' value='fieldValue' isEdit={true} domain="DO_NOM"/>
                <h3>Champ en erreur</h3>
                <Field name='field2' value='field2Value' error='error in field2' isEdit={true} />
                <h3>Type number</h3>
                <Field name='field3' value={3} type='number'/>
                <Field name='field4' value='popop' isEdit={true} help='Here to help'/>
                <h3>Select</h3>
                <Field name='field5' value='A' values={valuesExample} />
                <p>Ici, il devrait me rendre un select mais il ne le fait pas... Pierr ?</p>
                <h3>Disable</h3>
                <Field name='fieldDisabled' value='popop' isEdit={true} disabled={true}/>
            </form>
        );
    }
});

return <FieldSample/>;
