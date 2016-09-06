import React, {Component, PropTypes} from 'react';
import Button from '../button';


//Todo: check menButton onClick use
//TODO : Write tests
const MenuButton = ({item, LinkComponent, navigate}) => {
    const buttonProps = { option: 'link', shape: 'icon', type: 'button', ...menuButton };
    const {route} = item;
    return (
        {route &&
            <LinkComponent to={item.route}>
                <Button {...buttonProps} />
            </LinkComponent>
        }
        {!route &&
            return <Button {...buttonProps} onClick={item.onClick} />
        }
    );
}
MenuButton.displayName = 'MenuButton';
MenuButton.propTypes = {
    item: PropTypes.object.isRequired,
    LinkComponent: PropTypes.func.isRequired,
    navigate: PropTypes.func.isRequired
};



const MenuLeft = ({ children, handleBrandClick, items, LinkComponent, navigate, ...otherProps }) => (
    <nav data-focus='menu-left' {...otherProps}>
        <div data-focus='menu-brand' data-click={!!handleBrandClick} onClick={() => handleBrandClick && handleBrandClick()} />
        <ul data-focus='menu-items'>
            items.map((item, idx) => {
                return (
                    <li key={idx}>
                        <MenuButton item={item} LinkComponent={LinkComponent} navigate={navigate} />
                        <span>{item.name}</span>
                    </li>
                );
            });
        </ul>
        {children}
    </nav>
);
MenuLeft.displayName = 'MenuLeft';
MenuLeft.propTypes = {
    handleBrandClick: PropTypes.func,
    items: PropTypes.array.isRequired,
    LinkComponent: PropTypes.func.isRequired,
    navigate: PropTypes.func.isRequired
};
MenuLeft.defaultProps =  {
    items: []
};
export default MenuLeft;
