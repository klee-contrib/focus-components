// Dependencies

const {builder} = require('focus-core').component;
const {reduce} = require('lodash/collection');

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
            groupLabelPrefix: '',
            style: require('./style')
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
        const {style} = this.props;
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
            const orderIcon = 'sort_by_alpha';
            const {style} = this.props;
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
        const {groupLabelPrefix, groupSelectedKey, groupableColumnList, style} = this.props;
        const groupOperationList = reduce(groupableColumnList, (operationList, label, key) => {
            operationList.push({
                action: this._groupFunction(key),
                label: this.i18n(groupLabelPrefix + label),
                style: this._getSelectedStyle(key, groupSelectedKey)
            });
            return operationList;
        }, []).concat([{
            label: this.i18n('list.actionBar.ungroup'),
            action: this._groupFunction()
        }]);
        const groupIcon = groupSelectedKey ? 'folder-open-o' : 'folder-o';
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
            return {name: 'check_box_outline_blank'};
        } else if ('selected' === this.props.selectionStatus) {
            return {name: 'check_box'};
        }
        return {name: 'indeterminate_check_box'};
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
        const {style} = this.props;
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
