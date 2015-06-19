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
        return <SelectAction icon={this._getSelectionObjectIcon()} operationList={selectionOperationList} />;
    },

    /**
     * @returns {JSX} Order component.
     * @private
     */
    _getOrderObject: function() {
        if(this.props.orderableColumnList) {
            var orderSelectedParsedKey = this.props.orderSelected.key + this.props.orderSelected.order;
            var orderOperationList = []; // [{key:"columnKey", order:"asc", label:"columnLabel"}]
            for (var key in this.props.orderableColumnList) {
                var description = this.props.orderableColumnList[key];
                orderOperationList.push({
                    action: this._orderFunction(description.key, description.order),
                    label: description.label,
                    style: this._getSelectedStyle(description.key + description.order, orderSelectedParsedKey)
                });
            }
            var orderIcon = this.props.orderSelected.order ? 'sort-alpha-desc' : 'sort-alpha-asc';
            return <SelectAction key='down' icon={orderIcon} operationList={orderOperationList} />;
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
        var groupIcon = this.props.groupSelectedKey ? 'folder-open-o' : 'folder-o';
        return <SelectAction icon={groupIcon} operationList={groupOperationList} />;
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
    _getSelectionObjectIcon: function() {
        if(this.props.selectionStatus == 'none') {
            return 'square-o';
        } else if(this.props.selectionStatus == 'selected') {
            return 'check-square-o';
        }
        return 'minus-square-o';
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
            <div data-focus="list-action-bar" className="panel">
                <div data-focus="global-list-content">{this._getSelectionObject()} {this._getOrderObject()} {this._getGroupObject()}</div>
                <div data-focus="contextual-action-content"><ActionContextual operationList={this.props.operationList} /></div>
                <div data-focus="selected-facet-content"><TopicDisplayer topicList={this.props.facetList} topicClickAction={this.props.facetClickAction} /></div>
            </div>
        );
    }
};

module.exports = builder(actionBarMixin);