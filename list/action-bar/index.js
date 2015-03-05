/**@jsx*/
var builder = require('focus/component/builder');
var React = require('react');
var type = require('focus/component/types');
var SelectAction = require('../../common/select-action').component;

var actionBarMixin = {

    /**
     * Display name.
     */
    displayName: "list-action-bar",

    getDefaultProps: function() {
        return {
            selectionStatus: 0, // 0=> None, 1 => All, other value =>  some
            selectionAllAction: undefined, // Action on select all click
            selectionNoneAction: undefined, // Action on select none click
            orderableColumnList:{}, // [{key:"columnKey", label:"columnLabel"}]
            orderAction: function(key, order) {},
            groupableColumnList: {},
            groupAction: function(key) {},
            groupSelectedKey:undefined
        }
    },

    orderFunction: function(func, key, order) {
        return function() { func(key, order); };
    },
    groupFunction(func, key) {
        return function() { func(key)};
    },

    render: function renderActionBar(){
        var selectionOperationList = [
            {action: this.props.selectionAllAction, label: "all" },
            {action: this.props.selectionNoneAction, label: "none" }
        ];
        var orderDescOperationList = [];
        var orderAscOperationList = [];
        for(var key in this.props.orderableColumnList) {
            orderDescOperationList.push({action: this.orderFunction(this.props.orderAction, key, "desc"), label: this.props.orderableColumnList[key] });
            orderAscOperationList.push({action: this.orderFunction(this.props.orderAction, key, "asc"), label: this.props.orderableColumnList[key] });
        }

        var groupList = [];
        for(var key in this.props.groupableColumnList) {
            groupList.push({action: this.groupFunction(this.props.groupAction, key), label: this.props.groupableColumnList[key],
                style: this._getSelectedStyle(key,this.props.groupSelectedKey)});
        }
        var groupOperationList = [
            { label: "action.group",  childOperationList: groupList },
            { label: "action.ungroup",  action: this.groupFunction(this.props.groupAction, null) }];
        var groupStyle = this.props.groupSelectedKey ? "controller-record" : "dots-three-vertical";
        return (<div >
                    <SelectAction style={this._getSelectionStyle()} operationList={selectionOperationList} />
                    <SelectAction style="circle-down" operationList={orderDescOperationList} />
                    <SelectAction style="circle-up" operationList={orderAscOperationList} />
                    <SelectAction style={groupStyle} operationList={groupOperationList} />
                </div>);
    },

    _getSelectedStyle: function(currentKey, selectedKey) {
        if(currentKey == selectedKey) {
            return " selected ";
        }
        return undefined;
    },
    _getSelectionStyle: function() {
        if(this.props.selectionStatus == 0) {
            return "checkbox-unchecked";
        } else if(this.props.selectionStatus == 1) {
            return "checkbox-checked";
        }
        return undefined;
    }
}


module.exports = builder(actionBarMixin);