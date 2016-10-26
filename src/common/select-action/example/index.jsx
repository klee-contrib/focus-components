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

const DropdownExample = React.createClass({
  render() {
    return(
      <div>
        <Dropdown top={true} position='left' operationList={operationList}/>
        <Dropdown top={true} position='left' operationList={operationList}/>
        <Dropdown top={true} position='left' operationList={operationList}/>
        <Dropdown top={true} position='left' operationList={operationList}/>
        <Dropdown top={true} position='left' operationList={operationList}/>
        <Dropdown top={true} position='left' operationList={operationList}/>
        <Dropdown top={true} position='left' operationList={operationList}/>
        <Dropdown top={true} position='left' operationList={operationList}/>
        <Dropdown top={true} position='left' operationList={operationList}/>
        <Dropdown top={true} position='left' operationList={operationList}/>
        <Dropdown top={true} position='left' operationList={operationList}/>
        <Dropdown top={true} position='left' operationList={operationList}/>
        <Dropdown top={true} position='left' operationList={operationList}/>
        <Dropdown top={true} position='left' operationList={operationList}/>
        <Dropdown top={true} position='left' operationList={operationList}/>
        <Dropdown top={true} position='left' operationList={operationList}/>
        <Dropdown top={true} position='left' operationList={operationList}/>
        <Dropdown top={true} position='left' operationList={operationList}/>
        <Dropdown top={true} position='left' operationList={operationList}/>
        <Dropdown top={true} position='left' operationList={operationList}/>
        <Dropdown top={true} position='left' operationList={operationList}/>
        <Dropdown top={true} position='left' operationList={operationList}/>
        <Dropdown top={true} position='left' operationList={operationList}/>
        <Dropdown top={true} position='left' operationList={operationList}/>
        <Dropdown top={true} position='left' operationList={operationList}/>
        <Dropdown top={true} position='left' operationList={operationList}/>
        <Dropdown top={true} position='left' operationList={operationList}/>
        <Dropdown top={true} position='left' operationList={operationList}/>
        <Dropdown top={true} position='left' operationList={operationList}/>
        <Dropdown top={true} position='left' operationList={operationList}/>
        <Dropdown top={true} position='left' operationList={operationList}/>
        <Dropdown top={true} position='left' operationList={operationList}/>
        <Dropdown top={true} position='left' operationList={operationList}/>
        <Dropdown top={true} position='left' operationList={operationList}/>
        <Dropdown top={true} position='left' operationList={operationList}/>
        <Dropdown top={true} position='left' operationList={operationList}/>
        <Dropdown top={true} position='left' operationList={operationList}/>
        <Dropdown top={true} position='left' operationList={operationList}/>
        <Dropdown top={true} position='left' operationList={operationList}/>
        <Dropdown top={true} position='left' operationList={operationList}/>
        <Dropdown top={true} position='left' operationList={operationList}/>
        <Dropdown top={true} position='left' operationList={operationList}/>
        <Dropdown top={true} position='left' operationList={operationList}/>
        <Dropdown top={true} position='left' operationList={operationList}/>
        <Dropdown top={true} position='left' operationList={operationList}/>
      </div>
    )
  }
})

module.exports = DropdownExample;
