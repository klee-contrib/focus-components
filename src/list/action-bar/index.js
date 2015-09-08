// Dependencies

const builder = require('focus').component.builder;
const style = require('./style');

// Components

const Dropdown = require('../../common/select-action').component;
const ActionContextual = require('../action-contextual').component;
const TopicDisplayer = require('../../common/topic-displayer').component;

// Mixins

const translationMixin = require('../../common/i18n/mixin');

const ActionBar = {

    /**
    * Display name.
    */
    displayName: 'list-action-bar',

    mixins: [translationMixin],

    /**
    * INit default props
    * @returns {object} Defautkl props.
    */
    getDefaultProps() {
        return {
            selectionStatus: 'none', // none, selected, partial
            selectionAction(selectionStatus) {
                console.warn(selectionStatus);
            }, // Action on selection click
            orderableColumnList: undefined, // [{key:'columnKey', label:'columnLabel'}]
            orderAction(key, order) {
                console.warn(key + '-' + order);
            }, // Action on click on order function
            orderSelected: {},
            facetClickAction(key) {
                console.warn(key);
            }, // Action when click on facet
            facetList: {}, // {facet1: 'Label of facet one', facet2:'Label of facet 2'} List of facets
            groupableColumnList: {}, // {col1: 'Label1', col2: 'Label2'}
            groupAction(key) {
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
    _getSelectionObject() {
        // Selection datas
        const selectionOperationList = [
            {
                action: this._selectionFunction('selected'),
                label: this.i18n('list.actionBar.selection.all'),
                style: this._getSelectedStyle(this.props.selectionStatus, 'selected')
            },
            {
                action: this._selectionFunction('none'),
                label: this.i18n('list.actionBar.selection.none'),
                style: this._getSelectedStyle(this.props.selectionStatus, 'none')
            }
        ];
        return (
            <div style={style.actions.select}>
                <Dropdown iconProps={this._getSelectionObjectIcon()} operationList={selectionOperationList}/>
            </div>
        );
    },

    /**
    * @returns {JSX} Order component.
    * @private
    */
    _getOrderObject() {
        if (this.props.orderableColumnList) {
            const orderSelectedParsedKey = this.props.orderSelected.key + this.props.orderSelected.order;
            const orderOperationList = []; // [{key:'columnKey', order:'asc', label:'columnLabel'}]
            for (const key in this.props.orderableColumnList) {
                const description = this.props.orderableColumnList[key];
                orderOperationList.push({
                    action: this._orderFunction(description.key, description.order),
                    label: description.label,
                    style: this._getSelectedStyle(description.key + description.order, orderSelectedParsedKey)
                });
            }
            const orderIcon = this.props.orderSelected.order ? 'sort-alpha-desc' : 'sort-alpha-asc';
            return (
                <div style={style.actions.sort}>
                    <Dropdown iconProps={{name: orderIcon}} key='down' operationList={orderOperationList}/>
                </div>
            );
        }
        return null;
    },

    /**
    * @returns {JSX} Grouping component.
    * @private
    */
    _getGroupObject() {
        const groupList = [];
        for (const key in this.props.groupableColumnList) {
            groupList.push({
                action: this._groupFunction(key),
                label: this.i18n(this.props.groupLabelPrefix + this.props.groupableColumnList[key]),
                style: this._getSelectedStyle(key, this.props.groupSelectedKey)
            });
        }
        const groupOperationList = [
            {
                label: this.i18n('list.actionBar.group'),
                childOperationList: groupList
            },
            {
                label: this.i18n('list.actionBar.ungroup'),
                action: this._groupFunction()
            }
        ];
        const groupIcon = this.props.groupSelectedKey ? 'folder-open-o' : 'folder-o';
        return (
            <div style={style.actions.group}>
                <Dropdown iconProps={{name: groupIcon}} operationList={groupOperationList}/>
            </div>
        );
    },

    /**
    * @param {string} currentKey Current selected key.
    * @param {string} selectedKey Key corresponding to the selected one.
    * @returns {string} Class selected if currentKey corresponds to the selectedKey.
    * @private
    */
    _getSelectedStyle(currentKey, selectedKey) {
        if (currentKey === selectedKey) {
            return ' selected ';
        }
        return undefined;
    },

    /**
    * @return {string} Class of the selection component icon.
    * @private
    */
    _getSelectionObjectIcon() {
        if ('none' === this.props.selectionStatus) {
            return {name: 'square-o'};
        } else if ('selected' === this.props.selectionStatus) {
            return {name: 'check-square-o'};
        }
        return {name: 'minus-square-o'};
    },

    _selectionFunction(selectionStatus) {
        return ()=> {
            this.props.selectionAction(selectionStatus);
        };
    },
    _orderFunction(key, order) {
        return ()=> {
            this.props.orderAction(key, order);
        };
    },
    _groupFunction(key) {
        return ()=> {
            this.props.groupAction(key);
        };
    },

    /**
    * Render the html
    * @returns {JSX} Htm content.
    */
    render() {
        return (
            <div className='is-casting-shadow' data-focus='list-action-bar' style={style.bar}>
                <div data-focus='global-list-content' style={style.actions}>
                    {this._getSelectionObject()}
                    {this._getOrderObject()}
                    {this._getGroupObject()}
                </div>
                <div data-focus='contextual-action-content'>
                    <ActionContextual operationList={this.props.operationList}/>
                </div>
                <div data-focus='selected-facet-content'>
                    <TopicDisplayer
                        displayLabels={true}
                        topicClickAction={this.props.facetClickAction}
                        topicList={this.props.facetList}
                        />
                </div>
            </div>
        );
    }
};

module.exports = builder(ActionBar);
