'use strict';

FocusExampleInitializers();
//Line behaviour
var lineBehaviour = FocusComponents.list.table.line.mixin;
//Table component
var Table = FocusComponents.list.table.list.component;

//Line creation (should be in a separated file on a project)
var TableLineComponent = React.createClass({
    displayName: 'TableLineComponent',

    mixins: [lineBehaviour],
    definitionPath: 'contact',
    renderLineContent: function renderLineContent(data) {
        var className = this.props.className;

        var cellProps = { className: className };
        return React.createElement(
            'tr',
            { 'data-focus': 'table-line' },
            React.createElement(
                'td',
                cellProps,
                this.textFor("firstName", {})
            ),
            React.createElement(
                'td',
                cellProps,
                this.textFor("lastName", {})
            ),
            React.createElement(
                'td',
                cellProps,
                this.textFor("birthDate", {}),
                this.renderLineActions()
            )
        );
    }
});
//Dake data for the table.
var FAKE_DATA = [{ id: 1, firstName: 'Zeus', lastName: 'God', birthDate: Date.now() }, { id: 2, firstName: 'Ares', lastName: 'God', birthDate: Date.now() }, { id: 3, firstName: 'Athena', lastName: 'Godess', birthDate: Date.now() }, { id: 4, firstName: 'Poseidon', lastName: 'God', birthDate: Date.now() }, { id: 5, firstName: 'Hades', lastName: 'God', birthDate: Date.now() }];

// As table needs many props to be able to be functional.
// Props are created before and the given to the component using destructing asignement.
var tableProps = {
    data: FAKE_DATA,
    lineComponent: TableLineComponent,
    //isSelectable: true,//Uncomment this line to have a selectable table
    columns: {
        firstName: { label: 'Prénom', sort: 'asc' },
        lastName: { label: 'Nom', sort: 'desc' },
        birthDate: { label: "date", noSort: true }
    },
    onLineClick: function onLineClick(line) {
        //Should open a popin
        alert('click sur la ligne ' + line.title);
    },
    sortColumn: function sortColumn(name, order) {
        //Should call an action which sorts the list.
        alert('Order ' + order + ' on column ' + name);
    },
    operationList: [{
        label: "Button1_a",
        action: function action(data) {
            alert(data.title);
        },
        style: { className: 'fa fa-eye', shape: 'fab' },
        priority: 1
    }],
    isLoading: true,
    hasMoreData: true,
    isManualFetch: true
};

var TableSample = React.createClass({
    displayName: 'TableSample',

    /**
    * Render the component.
    * @return {object} React node
    */
    render: function render() {
        return React.createElement(Table, tableProps);
    }
});

return React.createElement(TableSample, null);