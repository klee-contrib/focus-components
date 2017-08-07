FocusExampleInitializers();
import { mixin as lineBehaviour } from 'focus-components/list/table/line';
import { component as Table } from 'focus-components/list/table/list';

//Line creation (should be in a separated file on a project)
const TableLineComponent = React.createClass({
    mixins: [lineBehaviour],
    definitionPath: 'contact',
    renderLineContent(data) {
        const { className } = this.props;
        const cellProps = { className };
        return (
            <tr data-focus='table-line'>
                <td {...cellProps}>{this.textFor('firstName', {})}</td>
                <td {...cellProps}>{this.textFor('lastName', {})}</td>
                <td {...cellProps}>
                    {this.textFor('birthDate', {})}
                    {this.renderLineActions()}
                </td>
            </tr>
        );
    }
});
//Dake data for the table.
const FAKE_DATA = [
    { id: 1, firstName: 'Zeus', lastName: 'God', birthDate: Date.now() },
    { id: 2, firstName: 'Ares', lastName: 'God', birthDate: Date.now() },
    { id: 3, firstName: 'Athena', lastName: 'Godess', birthDate: Date.now() },
    { id: 4, firstName: 'Poseidon', lastName: 'God', birthDate: Date.now() },
    { id: 5, firstName: 'Hades', lastName: 'God', birthDate: Date.now() }
]

// As table needs many props to be able to be functional.
// Props are created before and the given to the component using destructing asignement.
const tableProps = {
    data: FAKE_DATA,
    lineComponent: TableLineComponent,
    //isSelectable: true,//Uncomment this line to have a selectable table
    columns: {
        firstName: { label: 'Prénom', sort: 'asc' },
        lastName: { label: 'Nom', sort: 'desc' },
        birthDate: { label: 'date', noSort: true }
    },
    onLineClick: function onLineClick(line) {
        //Should open a popin
        alert('click sur la ligne ' + line.title);
    },
    sortColumn: function sortColumn(name, order) {
        //Should call an action which sorts the list.
        alert('Order ' + order + ' on column ' + name);
    },
    operationList: [
        {
            label: 'Button1_a',
            action: function (data) { alert(data.title); },
            style: { className: 'fa fa-eye', shape: 'fab' },
            priority: 1
        }
    ],
    isLoading: true,
    hasMoreData: true,
    isManualFetch: true
};

const TableSample = React.createClass({
    /**
    * Render the component.
    * @return {object} React node
    */
    render() {
        return <Table {...tableProps} />;
    }
});

return <TableSample />;
