/**@jsx*/
'use strict';

var builder = require('focus').component.builder;
var SelectAction = require('../../common/select-action').component;
var ActionContextual = require('../action-contextual').component;
var TopicDisplayer = require('../../common/topic-displayer').component;
var translationMixin = require('../../common/i18n/mixin');

var actionBarMixin = {

    /**
     * Display name.
     */
    displayName: 'list-action-bar',

    mixins: [translationMixin],

    /**
     * INit default props
     * @returns {object} Defautkl props.
     */
    getDefaultProps: function getDefaultProps() {
        return {
            selectionStatus: 'none', // none, selected, partial
            selectionAction: function selectionAction(selectionStatus) {
                console.warn(selectionStatus);
            }, // Action on selection click
            orderableColumnList: undefined, // [{key:"columnKey", label:"columnLabel"}]
            orderAction: function orderAction(key, order) {
                console.warn(key + '-' + order);
            }, // Action on click on order function
            orderSelected: {},
            facetClickAction: function facetClickAction(key) {
                console.warn(key);
            }, // Action when click on facet
            facetList: {}, // {facet1: "Label of facet one", facet2:"Label of facet 2"} List of facets
            groupableColumnList: {}, // {col1: "Label1", col2: "Label2"}
            groupAction: function groupAction(key) {
                console.warn(key);
            }, // Action on group function
            groupSelectedKey: undefined, // Defautl grouped key.
            operationList: [], // List of contextual operations
            groupLabelPrefix: ''
        };
    },

    /**
     * @returns {JSX} Selection component.
     * @private
     */
    _getSelectionObject: function _getSelectionObject() {
        // Selection datas
        var selectionOperationList = [{
            action: this._selectionFunction('selected'),
            label: this.i18n('list.actionBar.selection.all'),
            style: this._getSelectedStyle(this.props.selectionStatus, 'selected')
        }, {
            action: this._selectionFunction('none'),
            label: this.i18n('list.actionBar.selection.none'),
            style: this._getSelectedStyle(this.props.selectionStatus, 'none')
        }];
        return React.createElement(SelectAction, { icon: this._getSelectionObjectIcon(), operationList: selectionOperationList });
    },

    /**
     * @returns {JSX} Order component.
     * @private
     */
    _getOrderObject: function _getOrderObject() {
        if (this.props.orderableColumnList) {
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
            return React.createElement(SelectAction, { key: 'down', icon: orderIcon, operationList: orderOperationList });
        }
        return '';
    },

    /**
     * @returns {JSX} Grouping component.
     * @private
     */
    _getGroupObject: function _getGroupObject() {
        var groupList = [];
        for (var key in this.props.groupableColumnList) {
            groupList.push({
                action: this._groupFunction(key),
                label: this.i18n(this.props.groupLabelPrefix + this.props.groupableColumnList[key]),
                style: this._getSelectedStyle(key, this.props.groupSelectedKey)
            });
        }
        var groupOperationList = [{
            label: this.i18n('list.actionBar.group'),
            childOperationList: groupList
        }, {
            label: this.i18n('list.actionBar.ungroup'),
            action: this._groupFunction()
        }];
        var groupIcon = this.props.groupSelectedKey ? 'folder-open-o' : 'folder-o';
        return React.createElement(SelectAction, { icon: groupIcon, operationList: groupOperationList });
    },

    /**
     * @param {string} currentKey Current selected key.
     * @param {string} selectedKey Key corresponding to the selected one.
     * @returns {string} Class selected if currentKey corresponds to the selectedKey.
     * @private
     */
    _getSelectedStyle: function _getSelectedStyle(currentKey, selectedKey) {
        if (currentKey == selectedKey) {
            return ' selected ';
        }
        return undefined;
    },

    /**
     * @return {string} Class of the selection component icon.
     * @private
     */
    _getSelectionObjectIcon: function _getSelectionObjectIcon() {
        if (this.props.selectionStatus == 'none') {
            return 'square-o';
        } else if (this.props.selectionStatus == 'selected') {
            return 'check-square-o';
        }
        return 'minus-square-o';
    },

    _selectionFunction: function _selectionFunction(selectionStatus) {
        var _this = this;

        return function () {
            _this.props.selectionAction(selectionStatus);
        };
    },
    _orderFunction: function _orderFunction(key, order) {
        var _this2 = this;

        return function () {
            _this2.props.orderAction(key, order);
        };
    },
    _groupFunction: function _groupFunction(key) {
        var _this3 = this;

        return function () {
            _this3.props.groupAction(key);
        };
    },

    /**
     * Render the html
     * @returns {JSX} Htm content.
     */
    render: function renderActionBar() {
        return React.createElement(
            'div',
            { 'data-focus': 'list-action-bar', className: 'panel' },
            React.createElement(
                'div',
                {
                    'data-focus': 'global-list-content' },
                this._getSelectionObject(),
                ' ',
                this._getOrderObject(),
                ' ',
                this._getGroupObject()
            ),
            React.createElement(
                'div',
                { 'data-focus': 'contextual-action-content' },
                React.createElement(ActionContextual, { operationList: this.props.operationList })
            ),
            React.createElement(
                'div',
                { 'data-focus': 'selected-facet-content' },
                React.createElement(TopicDisplayer, { displayLabels: true,
                    topicList: this.props.facetList,
                    topicClickAction: this.props.facetClickAction })
            )
        );
    }
};

module.exports = builder(actionBarMixin);