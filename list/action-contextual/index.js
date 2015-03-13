/**@jsx*/
var builder = require('focus').component.builder;
var React = require('react');
var Button = require('../../common/button/action').component;
var SelectAction = require('../../common/select-action').component;
var type = require('focus').component.types;

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
            operationList: [],
            operationParam: undefined
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
     * handle contextual action on click.
     */
    _handleAction: function handleContextualAction(key){
        return (event)=> {
            if (this.props.operationParam) {
                this.props.operationList[key].action(this.props.operationParam);
            } else {
                this.props.operationList[key].action();
            }
        }
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
                primaryActionList.push( <Button key={key} style={operation.style} handleOnClick={this._handleAction(key)} label={operation.label}/> );
            } else {
                secondaryActionList.push(operation);
            }
        }
        return ( <div className = "list-action-contextual" >
                        <span> {primaryActionList}</span>
                        <SelectAction operationList={secondaryActionList} operationParam={this.props.operationParam} isExpanded={this.state.isSecondaryActionListExpanded} />
                </div>);
    }
}

module.exports = builder(actionContextualMixin);
