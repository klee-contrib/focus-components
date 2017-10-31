import React from 'react';
// Dependencies
import builder from 'focus-core/component/builder';
import historic from 'focus-core/history';
import types from 'focus-core/component/types';
// Mixins
import { mixin as popinProperties } from '../mixin/popin-behaviour';
import stylabe from '../../mixin/stylable'
// Components
import Button from '../../components/button';

const Menu = {
    mixins: [stylabe, popinProperties],/** @inheritedProps*/
    componentWillMount() {
        console.warn('FocusComponents 2.2.0: this component is deprecated, please use component from focus-components/components/menu');
    },
    /** @inheritedProps*/
    getDefaultProps() {
        return {
            items: []
        };
    },
    /** @inheritedProps*/
    propTypes: {
        code: types('array')
    },
    /**
    * Toggle the state of the menu.
    */
    toggle() {
        this.setState({ open: !this.state.open });
    },
    /**
    * Render the links of the menu
    */
    _renderMenuItems() {
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
                ...link
            };
            return (
                <li key={idx} onClick={clickHandler}>
                    <Button {...buttonProps} />
                    <span>{link.name}</span>
                </li>
            );
        });
    },
    /** @inheriteddoc */
    render() {
        const { direction, position, children } = this.props;
        const className = `menu menu-${direction} menu-${position} menu-${this.state.open ? 'open' : ''} ${this._getStyleClassName()}`;
        return (
            <nav className={className} data-focus='menu'>
                <div data-focus='menu-brand' />
                <ul data-focus='menu-items'>{this._renderMenuItems()}</ul>
                {children}
            </nav>
        );
    }
};

const { mixin, component } = builder(Menu);
export { mixin, component };
export default { mixin, component };
