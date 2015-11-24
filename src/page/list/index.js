//The purpose of this module is to deal with autonomous lists.
//If you need lists inside a form please see the listFor helper function in a form.
//The following lists can
//- be loaded from a criteria (or without) (the criteria can be the result of a form)
//- be paginated
//- be displayed in any list container.
const React = require('react');
const {camelCase, capitalize} = require('lodash/string');
const {types, builder} = require('focus-core').component;
const actionBuilder = require('focus-core').list.actionBuilder;
const type = types;
const assign = require('object-assign');

const STORE_NODE = ['criteria', 'groupingKey', 'sortBy', 'sortAsc', 'dataList', 'totalCount'];
const DEFAULT_LIST_COMPONENT = require('../../list/table/list').component;
/**
 * Cretes a name for the property listener.
 * @param  {string} node - Node name.
 * @return {string} the built property.
 */
function _listenerProp(node){
    return `add${capitalize(camelCase(node))}ChangeListener`;
}
function _unListenerProp(node){
    return `remove${capitalize(camelCase(node))}ChangeListener`;
}
/**
 * Mixin to deal the list page.
 * @type {Object}
 */
const listPageMixin = {
    getDefaultProps(){
        return {
            ListComponent: DEFAULT_LIST_COMPONENT,
            pickProps(props){return props;}
        };
    },
    getInitialState(){
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
    _buildAction(){
        this._action = this.props.action || actionBuilder({
            service: this.props.service,
            identifier: this.props.store.identifier,
            getListOptions: () => {return this.props.store.getValue.call(this.props.store); } // Binding the store in the function call
        });
    },
    /**
     * Read the state from the store.
     * @return {object} - The object read from the store.
     */
    _getStateFromStore(){
        const store = this.props.store;
        return store.getValue();
    },
    /**
     * Hanlde the list store change.
     */
    _handleStoreChanged(){
        this.setState(this._getStateFromStore());
    },
    /**
     * Register the store nodes.
     */
     _reload(){
         this._action.load();
     },
    _registerStoreNode(){
        STORE_NODE.forEach((node)=>{
            //Maybe this is a bit too much, a global change event could be more efficient as almost all store props change.
            this.props.store[_listenerProp(node)](this._handleStoreChanged);
        });
        //When the criteria is changed, the search is triggered.
        this.props.store.addCriteriaChangeListener(this._reload);
    },
    _unRegisterStoreNode(){
          STORE_NODE.forEach((node)=>{
            //Maybe this is a bit too much, a global change event could be more efficient as almost all store props change.
            this.props.store[_unListenerProp(node)](this._handleStoreChanged);
        });
        //When the criteria is changed, the search is triggered.
        this.props.store.removeCriteriaChangeListener(this._reload);
    },
    /**
     * build the list props.
     * @return {object} - the list property.
     */
    _buildListProps(){
        const {props, state} = this;
        let {dataList, totalCount} = state;
        dataList = dataList || [];
        return assign({}, props, state, {
            data: dataList,
            fetchNextPage: this._action.load,
            hasMoreData: dataList.length < totalCount
        });
    },
    /** @inheritdoc */
    componentWillMount(){
        this._registerStoreNode();
        this._buildAction();
        this._action.load();
    },
    componentWillUnmount(){
        this._unRegisterStoreNode();
    },
    /** @inheritdoc */
    render(){
        const listProps = this._buildListProps();
        return <this.props.ListComponent {...listProps} ref='list'/>;
    }
};

module.exports = builder(listPageMixin);
