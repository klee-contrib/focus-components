import React, {Component, PropTypes} from 'react';
import i18next from 'i18next';
import Button from '../button';

const defaultButtonProps = {icon: 'link', shape: 'icon', type: 'button'};

const MenuPanel = ({children, onClose}) => {
    const style = { 'width': document.body.clientWidth }
    return (
        <div className='animate-menu' data-focus='menu-sub-panel' style={style} onClick={onClose}>
            <div>
                {children}
            </div>
        </div>
    );
}
MenuPanel.displayName = 'MenuPanel';
MenuPanel.PropTypes = {
    onClose: PropTypes.func
};

class MenuItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displaySubMenu: false
        };
    }
    _toggleSubMenuVisibility() {
        const {showLabels, showPanel} = this.props;
        if(showLabels && !showPanel) {
            const {displaySubMenu} = this.state;
            this.setState({displaySubMenu: !displaySubMenu});
        }
    }
    render() {
        const {menu, isActive, LinkComponent, onClick, showLabels, showPanel} = this.props;
        const {route, label, icon, subMenus} = menu;
        const {displaySubMenu} = this.state;
        const hasRoute = LinkComponent && route;
        const buttonProps = {...defaultButtonProps, label, icon: (!showLabels && icon === undefined ? 'link' : icon), shape: (showLabels ? null : 'icon')};
        const hasSubMenus = subMenus && subMenus.length > 0;
        if(hasSubMenus) {
            return (
                <li data-deployed={isActive}>
                    <Button {...buttonProps} onClick={showPanel ? onClick : ::this._toggleSubMenuVisibility} />
                    {displaySubMenu &&
                        <ul data-focus='menu-sub-items'>
                            {subMenus.map((menu, idx) => (
                                <MenuItem key={idx} menu={menu} LinkComponent={LinkComponent} showLabels={showLabels} />
                            ))}
                        </ul>
                    }
                </li>
            );
        } else {
            return (
                <li>
                    {hasRoute && <LinkComponent to={route}><Button {...buttonProps} /></LinkComponent>}
                    {!hasRoute && <Button {...buttonProps} />}
                </li>
            );
        }
    }
};
MenuItem.displayName = 'MenuItem';
MenuItem.PropTypes = {
    LinkComponent: PropTypes.func,
    menu: PropTypes.object.isRequired,
    showLabels: PropTypes.bool.isRequired
};


const MenuList = ({activeMenuId, menus, offset = 0, LinkComponent, onClick, showLabels, showPanel}) => {
    const style = {'position': 'relative', 'top': offset };
    return (
        <ul data-focus='menu-items' style={style}>
            {menus.map((menu, idx) => {
                const isActive = activeMenuId && activeMenuId === idx;
                const {route, label, icon, subMenus} = menu;
                const buttonProps = {...defaultButtonProps, label, icon: (!showLabels && icon === undefined ? 'link' : icon), shape: (showLabels ? null : 'icon')};
                return (
                    <MenuItem key={idx} menu={menu} LinkComponent={LinkComponent} onClick={(evt) => onClick && onClick(evt, idx)} isActive={isActive} showLabels={showLabels} showPanel={showPanel} />
                );
            })}
        </ul>
    );
};
MenuList.displayName = 'MenuList';
MenuList.PropTypes = {
    activeMenuId: PropTypes.number,
    LinkComponent: PropTypes.func,
    menus: PropTypes.array.isRequired,
    onClick: PropTypes.func,
    showLabels: PropTypes.bool.isRequired,
    showPanel: PropTypes.bool.isRequired
};


/**
 *
 * Requested data.
 * [
 *    { icon: 'home', label: 'menu.home', route: '/' }, // route: 'home'
 *    { icon: 'search', label: 'menu.search', handleOnClick: () => toto() }},
 *    { label: 'menu.test', route: '/admin/masterdata', subMenus: [
 *        { label: 'menu.home', route: '/' },
 *        { label: 'menu.home', route: '/' },
 *        { label: 'menu.home', route: '/' },
 *        { label: 'menu.home', route: '/' }
 *    ]},
 *    { icon: 'settings', label: 'menu.admin', route: '/admin/masterdata', subMenus: [
 *        { icon: 'settings', label: 'menu.home', route: '/' },
 *        { icon: 'settings', label: 'menu.home', route: '/' },
 *        { icon: 'settings', label: 'menu.home', route: '/' },
 *        { icon: 'settings', label: 'menu.home', route: '/' }
 *    ]},
 * ];
 *
 */
class Menu extends Component {
    constructor(props) {
        super(props);
        const subMenus = [];
        props.menus.map((menu, idx) => {
            subMenus[idx] = menu.subMenus;
        });
        this.state = {
            activeMenuId: null,
            subMenus,
            yPosition: 0
        };
    }
    _onSelectMenu(evt, menuId) {
        const targetPosition = evt.target.getBoundingClientRect();
        this.setState({
            activeMenuId: menuId,
            yPosition: targetPosition.top - 35 //TODO temporary : to improve
        });
    }
    _onSubPanelClose() {
        this.setState({
            activeMenuId: null
        })
    }
    render() {
        const { children, handleBrandClick, menus, LinkComponent, showLabels, showPanel } = this.props;
        const size = showLabels ? 'large' : 'small';
        const {activeMenuId, subMenus, yPosition} = this.state;
        const displayPanel = activeMenuId && subMenus[activeMenuId];
        const subMenuItems = subMenus[activeMenuId];
        return (
            <nav data-focus='menu' data-size={size}>
                <div>
                    <div data-focus='menu-brand' data-click={!!handleBrandClick} onClick={() => handleBrandClick && handleBrandClick()} />
                    <MenuList activeMenuId={activeMenuId} menus={menus} LinkComponent={LinkComponent} showLabels={showLabels} showPanel={showPanel} onClick={::this._onSelectMenu} />
                    {children}
                    {showPanel && subMenuItems &&
                        <MenuPanel onClose={::this._onSubPanelClose}>
                            <MenuList offset={yPosition} menus={subMenuItems} LinkComponent={LinkComponent} showLabels={true} showPanel={false} />
                        </MenuPanel>
                    }
                </div>
            </nav>
        );
    };
}
Menu.displayName = 'Menu';
Menu.propTypes = {
    handleBrandClick: PropTypes.func,
    LinkComponent: PropTypes.func.isRequired,
    menus: PropTypes.array.isRequired,
    showPanel: PropTypes.bool,
    showLabels: PropTypes.bool
};
Menu.defaultProps =  {
    menus: [],
    showLabels: false,
    showPanel: true
};
export default Menu;
