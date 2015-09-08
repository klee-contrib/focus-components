//The purpose of this module is to deal with autonomous lists.
//If you need lists inside a form please see the listFor helper function in a form.
//The following lists can
//- be loaded from a criteria (or without) (the criteria can be the result of a form)
//- be paginated
//- be displayed in any list container.
'use strict';

var _require = require('lodash/string');

var camelCase = _require.camelCase;
var capitalize = _require.capitalize;

var _require$component = require('focus').component;

var types = _require$component.types;
var builder = _require$component.builder;

var actionBuilder = require('focus').list.actionBuilder;
var type = types;
var assign = require('object-assign');

var STORE_NODE = ['criteria', 'groupingKey', 'sortBy', 'sortAsc', 'dataList', 'totalCount'];
var DEFAULT_LIST_COMPONENT = require('../../list/table/list').component;
/**
 * Cretes a name for the property listener.
 * @param  {string} node - Node name.
 * @return {string} the built property.
 */
function _listenerProp(node) {
    return 'add' + capitalize(camelCase(node)) + 'ChangeListener';
}
/**
 * Mixin to deal the list page.
 * @type {Object}
 */
var listPageMixin = {
    getDefaultProps: function getDefaultProps() {
        return {
            ListComponent: DEFAULT_LIST_COMPONENT,
            pickProps: function pickProps(props) {
                return props;
            }
        };
    },
    getInitialState: function getInitialState() {
        return {};
    },
    /** @inheritdoc */
    propTypes: {
        //Store object.
        pickProps: type('func'),
        service: type('func'),
        store: type('object').isRequired
    },
    /**
     *  Build the action from.
     */
    _buildAction: function _buildAction() {
        var _this = this;

        this._action = this.props.action || actionBuilder({
            service: this.props.service,
            identifier: this.props.store.identifier,
            getListOptions: function getListOptions() {
                return _this.props.store.getValue.call(_this.props.store);
            } // Binding the store in the function call
        });
    },
    /**
     * Read the state from the store.
     * @return {object} - The object read from the store.
     */
    _getStateFromStore: function _getStateFromStore() {
        var store = this.props.store;
        return store.getValue();
    },
    /**
     * Hanlde the list store change.
     */
    _handleStoreChanged: function _handleStoreChanged() {
        this.setState(this._getStateFromStore());
    },
    /**
     * Register the store nodes.
     */
    _registerStoreNode: function _registerStoreNode() {
        var _this2 = this;

        STORE_NODE.forEach(function (node) {
            //Maybe this is a bit too much, a global change event could be more efficient as almost all store props change.
            _this2.props.store[_listenerProp(node)](_this2._handleStoreChanged);
        });
        //When the criteria is changed, the search is triggered.
        this.props.store.addCriteriaChangeListener(function () {
            _this2._action.load();
        });
    },
    /**
     * build the list props.
     * @return {object} - the list property.
     */
    _buildListProps: function _buildListProps() {
        var props = this.props;
        var state = this.state;
        var dataList = state.dataList;
        var totalCount = state.totalCount;

        dataList = dataList || [];
        return assign(props, state, {
            data: dataList,
            fetchNextPage: this._action.load,
            hasMoreData: dataList.length < totalCount
        });
    },
    /** @inheritdoc */
    componentWillMount: function componentWillMount() {
        this._registerStoreNode();
        this._buildAction();
        this._action.load();
    },
    /** @inheritdoc */
    render: function render() {
        var listProps = this._buildListProps();
        return React.createElement(this.props.ListComponent, listProps);
    }
};

module.exports = builder(listPageMixin);