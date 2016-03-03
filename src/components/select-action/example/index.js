const Dropdown = FocusComponents.common.selectAction.component;
const operationList = [
    {
        label: 'Action_a',
        action() {
            alert('Actiona');
        }
    },
    {
        label: 'Action_b',
        action() {
            alert('Actionb');
        }
    },
    {
        label: 'Action_c',
        action() {
            alert('Actionc');
        }
    }
];

return <Dropdown operationList={operationList}/>;
