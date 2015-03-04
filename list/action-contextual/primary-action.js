/**@jsx*/
var builder = require('focus/component/builder');
var React = require('react');
var type = require('focus/component/types');

var primaryActionMixin = {

    /**
     * Display name.
     */
    displayName: "primary-action",

    /**
     * Returns the default properties.
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
    render: function renderPrimaryAction(){
        return <button className={this.props.class} onClick={this.buttonClickHandler}>{this.props.label}</button>;
    },

/*
    <button class="btn">....</button>
    <button class="btn-icon customCss">....</button>
*/

    /**
     * Action on click.
     */
    buttonClickHandler: function buttonClickHandler() {
        this.props.action();
    }
}


module.exports = builder(primaryActionMixin);