import { component as Dropdown } from 'focus-components/common/select-action';

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

const DropdownExample = React.createClass({
    render() {
        return (
            <div>
                <Dropdown top position='left' operationList={operationList} />
                <Dropdown top position='left' operationList={operationList} />
                <Dropdown top position='left' operationList={operationList} />
                <Dropdown top position='left' operationList={operationList} />
                <Dropdown top position='left' operationList={operationList} />
                <Dropdown top position='left' operationList={operationList} />
                <Dropdown top position='left' operationList={operationList} />
                <Dropdown top position='left' operationList={operationList} />
                <Dropdown top position='left' operationList={operationList} />
                <Dropdown top position='left' operationList={operationList} />
                <Dropdown top position='left' operationList={operationList} />
                <Dropdown top position='left' operationList={operationList} />
                <Dropdown top position='left' operationList={operationList} />
                <Dropdown top position='left' operationList={operationList} />
                <Dropdown top position='left' operationList={operationList} />
                <Dropdown top position='left' operationList={operationList} />
                <Dropdown top position='left' operationList={operationList} />
                <Dropdown top position='left' operationList={operationList} />
                <Dropdown top position='left' operationList={operationList} />
                <Dropdown top position='left' operationList={operationList} />
                <Dropdown top position='left' operationList={operationList} />
                <Dropdown top position='left' operationList={operationList} />
                <Dropdown top position='left' operationList={operationList} />
                <Dropdown top position='left' operationList={operationList} />
                <Dropdown top position='left' operationList={operationList} />
                <Dropdown top position='left' operationList={operationList} />
                <Dropdown top position='left' operationList={operationList} />
                <Dropdown top position='left' operationList={operationList} />
                <Dropdown top position='left' operationList={operationList} />
                <Dropdown top position='left' operationList={operationList} />
                <Dropdown top position='left' operationList={operationList} />
                <Dropdown top position='left' operationList={operationList} />
                <Dropdown top position='left' operationList={operationList} />
                <Dropdown top position='left' operationList={operationList} />
                <Dropdown top position='left' operationList={operationList} />
                <Dropdown top position='left' operationList={operationList} />
                <Dropdown top position='left' operationList={operationList} />
                <Dropdown top position='left' operationList={operationList} />
                <Dropdown top position='left' operationList={operationList} />
                <Dropdown top position='left' operationList={operationList} />
                <Dropdown top position='left' operationList={operationList} />
                <Dropdown top position='left' operationList={operationList} />
                <Dropdown top position='left' operationList={operationList} />
                <Dropdown top position='left' operationList={operationList} />
                <Dropdown top position='left' operationList={operationList} />
            </div>
        )
    }
})

export default DropdownExample;
