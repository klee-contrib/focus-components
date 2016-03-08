import React, {Component, PropTypes} from 'react';
import historic from 'focus-core/history';
import Button from '../../common/button/action';

// definition of components
const ButtonComponent = Button.component;

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

    /**
    * Render the links of the menu
    */
    _renderMenuItems = () => {
        return this.props.items.map((link, idx) => {
            let clickHandler;
            if (link.route !== undefined) {
                clickHandler = () => {
                    if (link.onClick) link.onClick.call(this, arguments);
                    historic.navigate(link.route, true);
                };
            } else {
                clickHandler = link.onClick;
            }
            const buttonProps = {
                option: 'link',
                shape: 'icon',
                type: 'button',
                ...link,
                onClick: null
            };
            return (
                <li key={idx} onClick={clickHandler}>
                    <ButtonComponent {...buttonProps} />
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
