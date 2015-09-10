// Dependencies

'use strict';

var builder = require('focus').component.builder;

var _require = require('lodash/collection');

var reduce = _require.reduce;

// Components

var Dropdown = require('../../common/select-action').component;
var ActionContextual = require('../action-contextual').component;
var TopicDisplayer = require('../../common/topic-displayer').component;

// Mixins

var translationMixin = require('../../common/i18n/mixin');

var ActionBar = {

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
            orderableColumnList: undefined, // [{key:'columnKey', label:'columnLabel'}]
            orderAction: function orderAction(key, order) {
                console.warn(key + '-' + order);
            }, // Action on click on order function
            orderSelected: {},
            facetClickAction: function facetClickAction(key) {
                console.warn(key);
            }, // Action when click on facet
            facetList: {}, // {facet1: 'Label of facet one', facet2:'Label of facet 2'} List of facets
            groupableColumnList: {}, // {col1: 'Label1', col2: 'Label2'}
            groupAction: function groupAction(key) {
                console.warn(key);
            }, // Action on group function
            groupSelectedKey: undefined, // Defautl grouped key.
            operationList: [], // List of contextual operations
            groupLabelPrefix: '',
            style: require('./style')
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
        var style = this.props.style;

        return React.createElement(
            'div',
            { style: style.actions.select },
            React.createElement(Dropdown, { iconProps: this._getSelectionObjectIcon(), operationList: selectionOperationList })
        );
    },

    /**
    * @returns {JSX} Order component.
    * @private
    */
    _getOrderObject: function _getOrderObject() {
        if (this.props.orderableColumnList) {
            var orderSelectedParsedKey = this.props.orderSelected.key + this.props.orderSelected.order;
            var orderOperationList = []; // [{key:'columnKey', order:'asc', label:'columnLabel'}]
            for (var key in this.props.orderableColumnList) {
                var description = this.props.orderableColumnList[key];
                orderOperationList.push({
                    action: this._orderFunction(description.key, description.order),
                    label: description.label,
                    style: this._getSelectedStyle(description.key + description.order, orderSelectedParsedKey)
                });
            }
            var orderIcon = this.props.orderSelected.order ? 'sort-alpha-desc' : 'sort-alpha-asc';
            var style = this.props.style;

            return React.createElement(
                'div',
                { style: style.actions.sort },
                React.createElement(Dropdown, { iconProps: { name: orderIcon }, key: 'down', operationList: orderOperationList })
            );
        }
        return null;
    },

    /**
    * @returns {JSX} Grouping component.
    * @private
    */
    _getGroupObject: function _getGroupObject() {
        var _this = this;

        var _props = this.props;
        var groupLabelPrefix = _props.groupLabelPrefix;
        var groupSelectedKey = _props.groupSelectedKey;
        var groupableColumnList = _props.groupableColumnList;
        var style = _props.style;

        var groupOperationList = reduce(groupableColumnList, function (operationList, label, key) {
            operationList.push({
                action: _this._groupFunction(key),
                label: _this.i18n(groupLabelPrefix + label),
                style: _this._getSelectedStyle(key, groupSelectedKey)
            });
            return operationList;
        }, []).concat([{
            label: this.i18n('list.actionBar.ungroup'),
            action: this._groupFunction()
        }]);
        var groupIcon = groupSelectedKey ? 'folder-open-o' : 'folder-o';
        return React.createElement(
            'div',
            { style: style.actions.group },
            React.createElement(Dropdown, { iconProps: { name: groupIcon }, operationList: groupOperationList })
        );
    },

    /**
    * @param {string} currentKey Current selected key.
    * @param {string} selectedKey Key corresponding to the selected one.
    * @returns {string} Class selected if currentKey corresponds to the selectedKey.
    * @private
    */
    _getSelectedStyle: function _getSelectedStyle(currentKey, selectedKey) {
        if (currentKey === selectedKey) {
            return ' selected ';
        }
        return undefined;
    },

    /**
    * @return {string} Class of the selection component icon.
    * @private
    */
    _getSelectionObjectIcon: function _getSelectionObjectIcon() {
        if ('none' === this.props.selectionStatus) {
            return { name: 'check_box_outline_blank' };
        } else if ('selected' === this.props.selectionStatus) {
            return { name: 'check_box' };
        }
        return { name: 'indeterminate_check_box' };
    },

    _selectionFunction: function _selectionFunction(selectionStatus) {
        var _this2 = this;

        return function () {
            _this2.props.selectionAction(selectionStatus);
        };
    },
    _orderFunction: function _orderFunction(key, order) {
        var _this3 = this;

        return function () {
            _this3.props.orderAction(key, order);
        };
    },
    _groupFunction: function _groupFunction(key) {
        var _this4 = this;

        return function () {
            _this4.props.groupAction(key);
        };
    },

    /**
    * Render the html
    * @returns {JSX} Htm content.
    */
    render: function render() {
        var style = this.props.style;

        return React.createElement(
            'div',
            { className: 'is-casting-shadow', 'data-focus': 'list-action-bar', style: style.bar },
            React.createElement(
                'div',
                { 'data-focus': 'global-list-content', style: style.actions },
                this._getSelectionObject(),
                this._getOrderObject(),
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
                React.createElement(TopicDisplayer, {
                    displayLabels: true,
                    topicClickAction: this.props.facetClickAction,
                    topicList: this.props.facetList
                })
            )
        );
    }
};

module.exports = builder(ActionBar);