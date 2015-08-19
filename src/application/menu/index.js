let builder = require('focus').component.builder;
let React = require('react');
let Backbone = require('backbone');
let types = require('focus').component.types;
let popinProperties = require('../mixin/popin-behaviour').mixin;
let stylabe =  require('../../mixin/stylable');
let Icon = require('../../common/icon').component;
let Button = require('../../common/button/action').component;
let menuMixin = {
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
            if(link.route !== undefined ){
                clickHandler = (event)=>{
                    //event.preventDefault();
                    link.onClick.call(this, arguments);
                    Backbone.history.navigate(link.route, true);
                };
            }else{
                clickHandler = link.onClick;
            }
            let buttonProps = {
                handleOnClick: clickHandler,
                label: link.name,
                icon: link.icon,
                style: link.style,
                option: 'link',
                shape: 'flat',
                type: 'button'
            };
            return (
                <li key={idx}><Button {...buttonProps} /></li>
            );
        });
    },
    /** @inheriteddoc */
    render(){
        let {direction, position, children} = this.props;
        let className = `menu menu-${direction} menu-${position} menu-${this.state.open ? 'open' : ''} ${this._getStyleClassName()}`;
        return (
            <nav className={className} data-focus='menu'>
                <div data-focus='menu-brand'></div>
                <ul data-focus='menu-items'>{this._renderMenuItems()}</ul>
                {children}
            </nav>
        );
    }
};

module.exports = builder(menuMixin);
