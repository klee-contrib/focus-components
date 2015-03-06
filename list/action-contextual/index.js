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

    /**
     * Init default props.
     * @returns {{operationList: List of operations.}}
     */
    getDefaultProps: function() {
        return {
            operationList: []
        }
    },
    /**
     * Init default state.
     * @returns {{isSecondaryActionListExpanded: true if secondary actionList is expanded.}}
     */
    getInitialState: function() {
        return {
            isSecondaryActionListExpanded: false
        };
    },
    /**
     * render the component.
     * @returns Html code.
     */
    render: function renderContextualAction() {
        var primaryActionList = [];
        var secondaryActionList = [];
        for (var key in this.props.operationList) {
            var operation = this.props.operationList[key];
            if (operation.priority === 1) {
                primaryActionList.push( <Button style = {operation.style} handleOnClick = {operation.action} label = {operation.label}/> );
            } else {
                secondaryActionList.push(operation);
            }
        }
        return ( <div className = "list-action-contextual" >
                        <span> {primaryActionList}</span>
                        <SelectAction operationList={secondaryActionList} isExpanded={this.state.isSecondaryActionListExpanded} />
                </div>);
    }
}

module.exports = builder(actionContextualMixin);
