/**@jsx*/
var builder = require('focus/component/builder');
var React = require('react');
var PrimaryAction = require('./primary-action').component;
var SecondaryAction = require('./secondary-action').component;
var type = require('focus/component/types');

var actionContextualMixin = {

    /**
     * Display name.
     */
    displayName: "list-action-contextual",

    getDefaultProps: function() {
        return {
            operationList: []
        }
    },

    getInitialState: function(){
        return {
            isSecondaryActionListDisplayed: false
        };
    },

    render: function renderContextualAction(){
        var primaryActionList = [];
        var secondaryActionList = [];
        for(var key in this.props.operationList) {
            var operation = this.props.operationList[key];
            if(operation.priority == 1) {
                primaryActionList.push(<PrimaryAction label={operation.label} action={operation.action} class={operation.class} />);
            } else if(this.state.isSecondaryActionListDisplayed) {
                secondaryActionList.push(<SecondaryAction label={operation.label} action={operation.action} class={operation.class} />);
            }
        }
        if(!this.state.isSecondaryActionListDisplayed) {
            secondaryActionList.push(<button onClick={this.expandSecondaryActionListHandler} class="todo">Secondary actin list</button>);
        }
        return (<div className="list-action-contextual" ><div>{primaryActionList}</div><ul>{secondaryActionList}</ul></div>);
    },
    expandSecondaryActionListHandler: function expandSecondaryActionListHandler() {
        this.setState({isSecondaryActionListDisplayed: !this.state.isSecondaryActionListDisplayed});
    }
}


module.exports = builder(actionContextualMixin);