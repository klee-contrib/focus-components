import React, {Component, PropTypes} from 'react';
import Button from '../button';

//Todo: check menButton onClick use
//TODO : Write tests
const MenuButton = ({item, LinkComponent}) => {
    const buttonProps = { icon: 'link', shape: 'icon', type: 'button', ...item };
    const {onClick, route} = item;
    if(route) {
        return <LinkComponent to={route}><Button {...buttonProps} /></LinkComponent>
    }
    return <Button {...buttonProps} onClick={onClick} />
};
MenuButton.displayName = 'MenuButton';
MenuButton.propTypes = {
    item: PropTypes.object.isRequired,
    LinkComponent: PropTypes.func
};



const MenuLeft = ({ children, handleBrandClick, items, LinkComponent, ...otherProps }) => (
    <nav data-focus='menu-left' {...otherProps}>
        <div data-focus='menu-brand' data-click={!!handleBrandClick} onClick={() => handleBrandClick && handleBrandClick()} />
        <ul data-focus='menu-items'>
            {items.map((item, idx) => (
                <li key={idx}>
                    <MenuButton item={item} LinkComponent={LinkComponent} />
                    <span>{item.name}</span>
                </li>
            ))}
        </ul>
        {children}
    </nav>
);
MenuLeft.displayName = 'MenuLeft';
MenuLeft.propTypes = {
    handleBrandClick: PropTypes.func,
    items: PropTypes.array.isRequired,
    LinkComponent: PropTypes.func
};
MenuLeft.defaultProps =  {
    items: []
};
export default MenuLeft;
