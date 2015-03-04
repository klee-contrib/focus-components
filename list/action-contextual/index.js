/**@jsx*/
var builder = require('focus/component/builder');
var React = require('react');
var Button = require('../../common/button/action').component;
var SelectAction = require('../../common/select-action').component;
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
                primaryActionList.push(<Button style={operation.class}  handleOnClick={operation.action} label={operation.label} /> );
            } else  {
                secondaryActionList.push(operation);
            }
        }
        return (<div className="list-action-contextual" ><span>{primaryActionList}</span><SelectAction operationList={secondaryActionList} isExpanded={this.state.isSecondaryActionListDisplayed}/></div>);
    },
    expandSecondaryActionListHandler: function expandSecondaryActionListHandler() {
        this.setState({isSecondaryActionListDisplayed: !this.state.isSecondaryActionListDisplayed});
    }
}


module.exports = builder(actionContextualMixin);