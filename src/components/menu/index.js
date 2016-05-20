import React, {Component, PropTypes} from 'react';
import {navigate, Link, history} from 'focus-core/history';
import Button from '../../components/button';

// default props
const defaultProps = {
    items: [],
    reactRouterNavigation: false
};

// props types
const propTypes = {
    items: PropTypes.array,
    handleBrandClick: PropTypes.func,
    reactRouterNavigation: PropTypes.bool
};

/**
* Left menu.
*/
class MenuLeft extends Component {

    _renderButton(menuButton) {
        const {reactRouterNavigation} = this.props;

        const buttonProps = {
            option: 'link',
            shape: 'icon',
            type: 'button',
            ...menuButton
        };
        let clickHandler;
        switch (reactRouterNavigation) {
            case true:
                if(menuButton.route !== undefined) {
                    return <Link to={menuButton.route} style={{color: 'white'}}><Button {...buttonProps} onClick={menuButton.onClick}/></Link>
                }
                else {
                    return <Button {...buttonProps} onClick={menuButton.onClick}/>
                }
                break;
            default:
                if(menuButton.route !== undefined) {
                    clickHandler = () => {
                        if(menuButton.onClick) menuButton.onClick();
                        history.navigate(menuButton.route, true);
                    };
                    return <Button {...buttonProps} onClick={clickHandler}/>
                }
                else {
                    return <Button {...buttonProps} onClick={menuButton.onClick} />
                }
                break;
        }
    }

    /**
    * Render the links of the menu
    */
    _renderMenuItems = () => {
        return this.props.items.map((link, idx) => {
            // let clickHandler = link.onClick;
            return (
                <li key={idx}>
                    {this._renderButton(link)}
                    <span>{link.name}</span>
                </li>
            );
        });
    };

    _handleBrandClick() {
        const {handleBrandClick} = this.props;
        if(handleBrandClick) {
            handleBrandClick();
        }
    }

    /** @inheritDoc */
    render() {
        const {direction, handleBrandClick, position, children, ...otherProps} = this.props;
        const hasBrandClickHandler = !!handleBrandClick;
        return (
            <nav data-focus='menu-left' {...otherProps}>
                <div data-focus='menu-brand' data-click={hasBrandClickHandler} onClick={::this._handleBrandClick} />
                <ul data-focus='menu-items'>{this._renderMenuItems()}</ul>
                {children}
            </nav>
        );
    }

}

//Static props.
MenuLeft.displayName = 'MenuLeft';
MenuLeft.defaultProps = defaultProps;
MenuLeft.propTypes = propTypes;

export default MenuLeft;
