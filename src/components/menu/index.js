import React, {Component, PropTypes} from 'react';
import {navigate, Link} from 'focus-core/history';
import Button from '../../components/button';

// default props
const defaultProps = {
    items: []
};

// props types
const propTypes = {
    items: PropTypes.array,
    handleBrandClick: PropTypes.func
};

/**
* Left menu.
*/
class MenuLeft extends Component {

    _renderButton(menuButton) {
        const buttonProps = {
            option: 'link',
            shape: 'icon',
            type: 'button',
            ...menuButton,
            onClick: null
        };
        if(menuButton.route !== undefined) {
            console.log('YES', menuButton);
            return <Link to={menuButton.route}><Button {...buttonProps} /></Link>
        }
        else {
            return <Button {...buttonProps} />
        }
    }

    /**
    * Render the links of the menu
    */
    _renderMenuItems = () => {
        return this.props.items.map((link, idx) => {
            let clickHandler;
            if (link.route !== undefined) {
                clickHandler = () => {
                    if (link.onClick) link.onClick.call(this, arguments);
                    //navigate(link.route);
                };
            } else {
                clickHandler = link.onClick;
            }

            return (
                <li key={idx} onClick={clickHandler}>
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
