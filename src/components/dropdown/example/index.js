const Dropdown = FocusComponents.common.selectAction.component;
const operationList = [
    {
        label: 'Action_a',
        action() {
            alert('Action a');
        }
    },
    {
        label: 'Action_b',
        action() {
            alert('Action b');
        }
    },
    {
        label: 'Action_c',
        action() {
            alert('Action c');
        }
    }
];

return <Dropdown operationList={operationList}/>;
