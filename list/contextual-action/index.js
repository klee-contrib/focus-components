/**@jsx*/
var builder = require('focus/component/builder');
var React = require('react');
var type = require('focus/component/types');

var contextualActionMixin = {

    /**
     * Display name.
     */
    displayName: "list-contextual-action",

    render: function renderContextualAction(){
        return <div><span>ACT1</span><span>ACT2</span><span>ACT3</span></div>;
    }
}


module.exports = builder(contextualActionMixin);