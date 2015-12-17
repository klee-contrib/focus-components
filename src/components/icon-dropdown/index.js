import React, {Component, PropTypes} from 'react';
import {component as Button} from '../../common/button/action';
import IconMenu from 'material-ui/lib/menus/icon-menu';

class Dropdown extends Component {
    static propTypes = {
        openDirection: PropTypes.oneOf(['bottom-left', 'bottom-right', 'top-left', 'top-right']),
    }

    static defaultProps = {
        openDirection: 'bottom-left',
        iconProps: {
            name: 'more_vert',
            iconLibrary: 'material'
        },
        shape: 'fab',
        operationList: []
    }

    render() {
        const {iconProps: {name, iconLibrary}, operationList, shape} = this.props;
        const buttonElement = (
            <Button
                shape={shape}
                icon={name}
                iconLibrary={iconLibrary}
                handleOnClick={event => {
                    this.refs.iconMenu.open('iconTap', event);
                }}
                />
        );
        return (
            <div data-focus='icon-dropdown'>
                <IconMenu
                    iconButtonElement={buttonElement}
                    ref='iconMenu'
                    >
                    <div data-focus='dropdown-menu'>
                        {operationList.map(({label, action}, idx) => (<div key={idx} data-role='dropdown-item' onClick={action}>{label}</div>))}
                    </div>
                </IconMenu>
            </div>
        )
    }
}

export default Dropdown;
