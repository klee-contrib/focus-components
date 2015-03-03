/**@jsx*/
var builder = require('focus/component/builder');
var React = require('react');
var type = require('focus/component/types');

var actionBarMixin = {

    /**
     * Display name.
     */
    displayName: "list-action-bar",

    render: function renderActionBar(){
        return <div><span>SELECTION</span><span>SORT</span><span>GROUPING</span></div>;
    }
}


module.exports = builder(actionBarMixin);