// Dependencies
import PropTypes from 'prop-types';

import React from 'react';
import builder from 'focus-core/component/builder';
import reduce from 'lodash/collection/reduce';
// Components
import Dropdown from '../../components/dropdown';
import { component as ActionContextual } from '../action-contextual';
import TopicDisplayer from '../../components/topic-displayer';
import Button from '../../components/button';
// Mixins
import translationMixin from '../../common/i18n/mixin';

const ActionBar = {

    /**
    * Display name.
    */
    displayName: 'ListActionBar',

    mixins: [translationMixin],

    propTypes: {
        facetClickAction: PropTypes.func,
        facetList: PropTypes.object,
        groupAction: PropTypes.func,
        groupLabelPrefix: PropTypes.string,
        groupSelectedKey: PropTypes.string,
        groupableColumnList: PropTypes.object,
        hasGrouping: PropTypes.bool.isRequired,
        isSelection: PropTypes.bool.isRequired,
        operationList: PropTypes.array,
        orderAction: PropTypes.func,
        orderSelected: PropTypes.object,
        orderableColumnList: PropTypes.array, // [{key:'columnKey', label:'columnLabel'}]
        selectionAction: PropTypes.func,
        selectionStatus: PropTypes.string // none, selected, partial
    },


    /**
    * INit default props
    * @returns {object} Defautkl props.
    */
    getDefaultProps() {
        return {
            isSelection: true,
            hasGrouping: true,
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
            operationList: [], // List of contextual operations
            groupLabelPrefix: ''
        };
    },

    /**
    * @returns {JSX} Selection component.
    * @private
    */
    _getSelectionObject() {
        const onIconClick = () => {
            const newSelectionStatus = this.props.selectionStatus === 'none' ? 'selected' : 'none';
            this.props.selectionAction(newSelectionStatus);
        };
        return (
            <Button shape='icon' icon={this._getSelectionObjectIcon()} handleOnClick={onIconClick} />
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
            return (
                <Dropdown iconProps={{ name: orderIcon }} key='down' operationList={orderOperationList} />
            );
        }
        return null;
    },

    /**
    * @returns {JSX} Grouping component.
    * @private
    */
    _getGroupObject() {
        const { hasGrouping } = this.props;
        if (hasGrouping) {
            const { groupLabelPrefix, groupSelectedKey, groupableColumnList, style } = this.props;
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
            const groupIcon = 'folder_open';
            return (
                <Dropdown iconProps={{ name: groupIcon }} operationList={groupOperationList} />
            );
        }
        return null;
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
            return 'check_box_outline_blank';
        } else if ('selected' === this.props.selectionStatus) {
            return 'check_box';
        }
        return 'indeterminate_check_box';
    },
    _orderFunction(key, order) {
        return () => {
            this.props.orderAction(key, order);
        };
    },
    _groupFunction(key) {
        return () => {
            this.props.groupAction(key);
        };
    },

    /**
    * Render the html
    * @returns {JSX} Htm content.
    */
    render() {
        return (
            <div className='mdl-grid' data-focus='list-action-bar'>
                <div className='mdl-cell' data-focus='global-list-content'>
                    {this.props.isSelection && this._getSelectionObject()}
                    {this._getOrderObject()}
                    {this._getGroupObject()}
                </div>
                <div className='mdl-cell mdl-cell--hide-tablet mdl-cell--hide-phone' data-focus='selected-facet-content'>
                    <TopicDisplayer
                        displayLabels
                        topicClickAction={this.props.facetClickAction}
                        topicList={this.props.facetList}
                    />
                </div>
                <div className='mdl-cell' data-focus='contextual-action-content'>
                    <ActionContextual operationList={this.props.operationList} />
                </div>
            </div>
        );
    }
};

const { component, mixin } = builder(ActionBar);
export { component, mixin };
export default { component, mixin };