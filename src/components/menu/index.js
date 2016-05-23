import React, {Component, PropTypes} from 'react';
import {navigate} from 'focus-core/history';
import Button from '../../components/button';

// default props
const defaultProps = {
    items: [],
    LinkComponent: undefined,
    navigate: navigate
};

// props types
const propTypes = {
    navigate: PropTypes.func.isRequired,
    items: PropTypes.array,
    handleBrandClick: PropTypes.func,
    LinkComponent: PropTypes.func
};

const MenuItems = (props) => {
    console.log('MENU ITEM PROPS', props)
    const {items, LinkComponent, navigate} = props;
    return (
        <div>{_renderItemsList(items, LinkComponent, navigate)}</div>
    );
}
MenuItems.propTypes = {
    items: PropTypes.array
}

const _renderItemsList = (items, LinkComponent, navigate) => {
    return items.map((link, idx) => {
        return (
            <li key={idx}>
                {_renderButton(link, LinkComponent, navigate)}
                <span>{link.name}</span>
            </li>
        );
    });
}

//Todo: refactor into component
const _renderButton = (menuButton, LinkComponent, navigate) => {
    const buttonProps = {
        option: 'link',
        shape: 'icon',
        type: 'button',
        ...menuButton
    };
    let clickHandler;
    if(menuButton.route !== undefined) {
        //React router case
        if(LinkComponent){
            //Todo: check menButton onClick use
            return <LinkComponent to={menuButton.route} style={{color: 'white'}}><Button {...buttonProps}/></LinkComponent>
        }
        //Backbone case
        console.log('BACKBONE CASE');
        clickHandler = () => {
            if(menuButton.onClick) menuButton.onClick();
            console.log('Menu Button Route', menuButton.route);
            navigate(menuButton.route, true);
        };
        return <Button {...buttonProps} onClick={clickHandler}/>

    }
    //No route => Both the same treatement.
    return <Button {...buttonProps} onClick={menuButton.onClick}/>
}

const MenuLeft = (props) => {
    const {direction, handleBrandClick, position, children, items, LinkComponent, navigate, ...otherProps} = props;
    const itemRenderProps = {LinkComponent, navigate};
    const hasBrandClickHandler = !!handleBrandClick;

    return (
        <nav data-focus='menu-left' {...otherProps}>
            <div data-focus='menu-brand' data-click={hasBrandClickHandler} onClick={() => handleBrandClick && handleBrandClick()} />
            <ul data-focus='menu-items'><MenuItems items={items} {...itemRenderProps}/></ul>
            {children}
        </nav>
    );
}

//Static props.
MenuLeft.displayName = 'MenuLeft';
MenuLeft.defaultProps = defaultProps;
MenuLeft.propTypes = propTypes;

export default MenuLeft;
