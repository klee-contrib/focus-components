/**@jsx*/
var builder = require('focus').component.builder;
var SelectAction = require('../../common/select-action').component;
var ActionContextual = require('../action-contextual').component;
var TopicDisplayer = require('../../common/topic-displayer').component;

var actionBarMixin = {

    /**
     * Display name.
     */
    displayName: 'list-action-bar',

    /**
     * INit default props
     * @returns {object} Defautkl props.
     */
    getDefaultProps: function() {
        return {
            selectionStatus: 'none', // none, selected, partial
            selectionAction: function(selectionStatus) { console.warn(selectionStatus); }, // Action on selection click
            orderableColumnList: undefined, // [{key:"columnKey", label:"columnLabel"}]
            orderAction: function(key, order) { console.warn(key + '-' + order); }, // Action on click on order function
            orderSelected: {},
            facetClickAction: function(key) { console.warn(key); }, // Action when click on facet
            facetList: {}, // {facet1: "Label of facet one", facet2:"Label of facet 2"} List of facets
            groupableColumnList: {}, // {col1: "Label1", col2: "Label2"}
            groupAction: function(key) { console.warn(key); }, // Action on group function
            groupSelectedKey: undefined, // Defautl grouped key.
            operationList: [] // List of contextual operations
        };
    },

    /**
     * @returns {JSX} Selection component.
     * @private
     */
    _getSelectionObject: function() {
        // Selection datas
        var selectionOperationList = [
            {action: this._selectionFunction('selected'), label: 'all', style: this._getSelectedStyle(this.props.selectionStatus, 'selected') },
            {action: this._selectionFunction('none'), label: 'none', style: this._getSelectedStyle(this.props.selectionStatus, 'none') }
        ];
        return <SelectAction style={this._getSelectionObjectStyle()} operationList={selectionOperationList} />;
    },

    /**
     * @returns {JSX} Order component.
     * @private
     */
    _getOrderObject: function() {
        if(this.props.orderableColumnList) {
            // Order
            var orderDescOperationList = [];
            var orderAscOperationList = [];
            var orderSelectedParsedKey = this.props.orderSelected.key + this.props.orderSelected.order;

            for (var key in this.props.orderableColumnList) {
                orderDescOperationList.push({
                    action: this._orderFunction(key, 'desc'),
                    label: this.props.orderableColumnList[key],
                    style: this._getSelectedStyle(key + 'desc', orderSelectedParsedKey)
                });
                orderAscOperationList.push({
                    action: this._orderFunction(key, 'asc'),
                    label: this.props.orderableColumnList[key],
                    style: this._getSelectedStyle(key + 'asc', orderSelectedParsedKey)
                });
            }
            var downStyle = this.props.orderSelected.order == 'desc' ? 'circle-down' : 'chevron-down';
            var upStyle = this.props.orderSelected.order == 'asc' ? 'circle-up' : 'chevron-up';
            return [<SelectAction key='down' style={downStyle} operationList={orderDescOperationList} />,
                <SelectAction key='up' style={upStyle} operationList={orderAscOperationList} />];
        }
        return '';
    },

    /**
     * @returns {JSX} Grouping component.
     * @private
     */
    _getGroupObject: function() {
        var groupList = [];
        for(var key in this.props.groupableColumnList) {
            groupList.push({
                action: this._groupFunction(key),
                label: this.props.groupableColumnList[key],
                style: this._getSelectedStyle(key, this.props.groupSelectedKey)
            });
        }
        var groupOperationList = [
            { label: 'action.group', childOperationList: groupList },
            { label: 'action.ungroup', action: this._groupFunction(null) }];
        var groupStyle = this.props.groupSelectedKey ? 'controller-record' : 'dots-three-vertical';
        return <SelectAction style={groupStyle} operationList={groupOperationList} />;
    },

    /**
     * @param {string} currentKey Current selected key.
     * @param {string} selectedKey Key corresponding to the selected one.
     * @returns {string} Class selected if currentKey corresponds to the selectedKey.
     * @private
     */
    _getSelectedStyle: function(currentKey, selectedKey) {
        if(currentKey == selectedKey) {
            return ' selected ';
        }
        return undefined;
    },

    /**
     * @return {string} Class of the selection component icon.
     * @private
     */
    _getSelectionObjectStyle: function() {
        if(this.props.selectionStatus == 'none') {
            return 'checkbox-unchecked';
        } else if(this.props.selectionStatus == 'selected') {
            return 'checkbox-checked';
        }
        return 'notification';
    },

    _selectionFunction: function(selectionStatus) {
        return ()=> {
            this.props.selectionAction(selectionStatus);
        };
    },
    _orderFunction: function(key, order) {
        return ()=> {
            this.props.orderAction(key, order);
        };
    },
    _groupFunction: function(key) {
        return ()=> {
            this.props.groupAction(key);
        };
    },

    /**
     * Render the html
     * @returns {JSX} Htm content.
     */
    render: function renderActionBar(){
        return (
            <div className="action-bar">
                <div className="general-action">{this._getSelectionObject()} {this._getOrderObject()} {this._getGroupObject()}</div>
                <div className="facet-container"><TopicDisplayer topicList={this.props.facetList} topicClickAction={this.props.facetClickAction} /></div>
                <div className="contextual-action"><ActionContextual operationList={this.props.operationList} /></div>
            </div>
        );
    }
};

module.exports = builder(actionBarMixin);