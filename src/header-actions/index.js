import React, {PropTypes} from 'react';
import Button from '../button';
import Dropdown from '../dropdown'


const defautDropdownPosition = {
    vertical: 'bottom',
    horizontal: 'right'
};

// [
//     {
//         action: () => alert('toto'), //function called when clicked
//         className: 'action-save' //not mandatory, if you want to specify a custom style
//         icon: 'edit' //icon of action (display if primar*)
//         label: 'my.action.save' // action label
//     }
// ]
const HeaderActions = ({primary, secondary}) =>  {
    const hasPrimary = primary && primary.length > 0;
    const hasSecondary = secondary && secondary.length > 0;
    if(!hasPrimary && !hasSecondary) return null;
    return (
        <div data-focus='header-actions'>
            {primary.map((primary) => {
                if(Array.isArray(primary.action)) {
                    return <Dropdown button={{icon: primary.icon, label: '', shape: 'fab'}} operationList={primary.action} position={defautDropdownPosition} />
                } else {
                    return (
                        <Button key={primary.label} handleOnClick={primary.action} icon={primary.icon} label={primary.label} shape='fab' style={{className: primary.className}} type='button'/>
                    );
                }
            })}
            {hasSecondary && <Dropdown button={{icon: 'more_vert', label: 'header.actions.more.label', shape: 'fab'}} operations={secondary} position={defautDropdownPosition} />}
        </div>
    );
};
HeaderActions.displayName = 'HeaderActions';
HeaderActions.propTypes = {
    primary: PropTypes.array,
    secondary: PropTypes.array
};
HeaderActions.defaultProps = {
    primary: [],
    secondary: []
};
export default HeaderActions;
