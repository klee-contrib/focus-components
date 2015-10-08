import React, {Component, PropTypes} from 'react';
import Backbone from 'backbone';
import Button from '../../common/button/action';

// definition of components
const ButtonComponent = Button.component;

// default props
const defaultProps = {
    items: []
};

// props types
const propTypes = {
    items: PropTypes.array
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
                    link.onClick.call(this, arguments);
                    Backbone.history.navigate(link.route, true);
                };
            } else {
                clickHandler = link.onClick;
            }
            const buttonProps = {
                icon: link.icon,
                style: link.style,
                option: 'link',
                shape: 'icon',
                type: 'button'
            };
            return (
                <li key={idx} onClick={clickHandler}>
                    <ButtonComponent {...buttonProps} />
                    <span>{link.name}</span>
                </li>
            );
        });
    }

    /** @inheritDoc */
    render() {
        const {direction, position, children, ...otherProps} = this.props;
        return (
            <nav data-focus='menu-left' {...otherProps}>
                <div data-focus='menu-brand'></div>
                <ul data-focus='menu-items'>{this._renderMenuItems()}</ul>
                {children}
            </nav>
        );
    }

};

//Static props.
MenuLeft.displayName = 'MenuLeft';
MenuLeft.defaultProps = defaultProps;
MenuLeft.propTypes = propTypes;

export default MenuLeft;
