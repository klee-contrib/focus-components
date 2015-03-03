/**@jsx*/
var builder = require('focus/component/builder');
var React = require('react');
var type = require('focus/component/types');

var secondaryActionMixin = {

    /**
     * Display name.
     */
    displayName: "secondary-action",

    /**
     * Returns default prop.
     * @returns {{label: label of the operation, action: function to call on click, class: cass class}}
     */
    getDefaultProps: function() {
        return {
            label: undefined,
            action: undefined,
            class: undefined
        }
    },
    /**
     * Render the component.
     * @returns Html code.
     */
    render: function renderAction(){
        return <li className={this.props.class} onClick={this.buttonClickHandler}>{this.props.label}</li>;
    },
    /**
     * Action on click.
     */
    buttonClickHandler: function buttonClickHandler() {
        this.props.action();
    }
}


module.exports = builder(secondaryActionMixin);