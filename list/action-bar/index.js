/**@jsx*/
var builder = require('focus/component/builder');
var React = require('react');
var type = require('focus/component/types');
var SelectAction = require('../../common/select-action').component;
var ActionContextual = require('../action-contextual').component;
var TopicDisplayer = require('../../common/topic-displayer').component;

var actionBarMixin = {

    /**
     * Display name.
     */
    displayName: "list-action-bar",

    /**
     * INit default props
     * @returns Defautkl props.
     */
    getDefaultProps: function() {
        return {
            selectionStatus: 0, // 0=> None, 1 => All, other value =>  some
            selectionAction: function(selectionStatus) {}, // Action on selection click

            orderableColumnList:{}, // [{key:"columnKey", label:"columnLabel"}]
            orderAction: function(key, order) {}, // Action on click on order function
            orderSelected: {},

            facetClickAction: function(key) {}, // Action when click on facet
            facetList:{}, // {facet1: "Label of facet one", facet2:"Label of facet 2"} List of facets

            groupableColumnList: {}, // {col1: "Label1", col2: "Label2"}
            groupAction: function(key) {}, // Action on group function
            groupSelectedKey:undefined, // Defautl grouped key.

            operationList: [] // List of contextual operations
        }
    },

    /**
     * Render the html
     * @returns {XML}
     */
    render: function renderActionBar(){
        return (
            <div className="action-bar">
                <div className="general-action">{this._getSelectionObject()}{this._getOrderObject()}{this._getGroupObject()}</div>
                <div className="facet-container"><TopicDisplayer topicList={this.props.facetList} topicClickAction={this.props.facetClickAction}  /></div>
                <div className="contextual-action"><ActionContextual operationList={this.props.operationList} /></div>
            </div>
        );
    },

    /**
     * @returns Selection component.
     * @private
     */
    _getSelectionObject: function() {
        // Selection datas
        var selectionOperationList = [
            {action: this._selectionFunction(this.props.selectionAction, 1) , label: "all" },
            {action: this._selectionFunction(this.props.selectionAction, 0), label: "none" }
        ];
        return <SelectAction style={this._getSelectionObjectStyle()} operationList={selectionOperationList} />;
    },

    /**
     * @returns Order component.
     * @private
     */
    _getOrderObject: function() {
        // Order
        var orderDescOperationList = [];
        var orderAscOperationList = [];
        var orderSelectedParsedKey = this.props.orderSelected.key + this.props.orderSelected.order;
        for(var key in this.props.orderableColumnList) {
            orderDescOperationList.push({action: this._orderFunction(this.props.orderAction, key, "desc"), label: this.props.orderableColumnList[key], style: this._getSelectedStyle(key+"desc", orderSelectedParsedKey)});
            orderAscOperationList.push({action: this._orderFunction(this.props.orderAction, key, "asc"), label: this.props.orderableColumnList[key], style: this._getSelectedStyle(key+"asc", orderSelectedParsedKey) });
        }
        var downStyle = this.props.orderSelected.order == "desc" ? "circle-down" : "chevron-down";
        var upStyle = this.props.orderSelected.order == "asc" ? "circle-up" : "chevron-up";
        return [   <SelectAction style={downStyle} operationList={orderDescOperationList} />,
                    <SelectAction style={upStyle} operationList={orderAscOperationList} />];
    },

    /**
     * @returns Grouping component.
     * @private
     */
    _getGroupObject: function() {
        var groupList = [];
        for(var key in this.props.groupableColumnList) {
            groupList.push({action: this._groupFunction(this.props.groupAction, key), label: this.props.groupableColumnList[key],
                style: this._getSelectedStyle(key,this.props.groupSelectedKey)});
        }
        var groupOperationList = [
            { label: "action.group",  childOperationList: groupList },
            { label: "action.ungroup",  action: this._groupFunction(this.props.groupAction, null) }];
        var groupStyle = this.props.groupSelectedKey ? "controller-record" : "dots-three-vertical";
        return <SelectAction style={groupStyle} operationList={groupOperationList} />;
    },

    /**
     * @param currentKey
     * @param selectedKey
     * @returns Class selected if currentKey corresponds to the selectedKey.
     * @private
     */
    _getSelectedStyle: function(currentKey, selectedKey) {
        if(currentKey == selectedKey) {
            return " selected ";
        }
        return undefined;
    },

    /**
     * @returns Style of the selection compoent icon.
     * @private
     */
    _getSelectionObjectStyle: function() {
        if(this.props.selectionStatus == 0) {
            return "checkbox-unchecked";
        } else if(this.props.selectionStatus == 1) {
            return "checkbox-checked";
        }
        return "notification";
    },

    /**
     * Created to avoid closure problems.
     */
    _selectionFunction(func, selectionStatus) {
        return function() { func(selectionStatus)};
    },
    /**
     * Created to avoid closure problems.
     */
    _orderFunction: function(func, key, order) {
        return function() { func(key, order); };
    },
    /**
     * Created to avoid closure problems.
     */
    _groupFunction(func, key) {
        return function() { func(key)};
    }
}


module.exports = builder(actionBarMixin);