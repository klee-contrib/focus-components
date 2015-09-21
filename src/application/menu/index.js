// Dependencies

const {builder} = require('focus-core').component;
const Backbone = require('backbone');
const {types} = require('focus-core').component;

// Mixins

const popinProperties = require('../mixin/popin-behaviour').mixin;
const stylabe = require('../../mixin/stylable');

// Components

const Button = require('../../common/button/action').component;

const Menu = {
    mixins: [stylabe, popinProperties],/** @inheritedProps*/
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
    toggle(){
        this.setState({open: !this.state.open});
    },
    /**
    * Render the links of the menu
    */
    _renderMenuItems(){
        return this.props.items.map((link, idx)=> {
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
                    <Button {...buttonProps} />
                    <span>{link.name}</span>
                </li>
            );
        });
    },
    /** @inheriteddoc */
    render(){
        const {direction, position, children} = this.props;
        const className = `menu menu-${direction} menu-${position} menu-${this.state.open ? 'open' : ''} ${this._getStyleClassName()}`;
        return (
            <nav className={className} data-focus='menu'>
                <div data-focus='menu-brand'></div>
                <ul data-focus='menu-items'>{this._renderMenuItems()}</ul>
                {children}
            </nav>
        );
    }
};

module.exports = builder(Menu);
