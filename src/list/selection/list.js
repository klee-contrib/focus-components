// Dependencies
const React = require('react');
import {checkIsNotNull} from 'focus-core/util/object';
import builder from 'focus-core/component/builder';
import types from 'focus-core/component/types';
const find = require('lodash/collection/find');
const {omit} = require('lodash/object');
const {isArray} = require('lodash/lang');
import {clone} from 'lodash/lang';
import {reduce} from 'lodash/collection';

// Mixins

const translationMixin = require('../../common/i18n').mixin;
const infiniteScrollMixin = require('../mixin/infinite-scroll').mixin;
const referenceMixin = require('../../common/mixin/reference-property');

// Components

const Button = require('../../common/button/action').component;

const listMixin = {
    /**
    * Display name.
    */
    displayName: 'SelectionList',

    /**
    * Mixin dependancies.
    */
    mixins: [translationMixin, infiniteScrollMixin, referenceMixin],

    /**
    * Default properties for the list.
    * @returns {{isSelection: boolean}} the default properties
    */
    getDefaultProps: function getListDefaultProps(){
        return {
            data: [],
            isSelection: true,
            selectionStatus: 'partial',
            selectionData: [],
            isLoading: false,
            operationList: [],
            idField: 'id'
        };
    },

    /**
    * list property validation.
    * @type {Object}
    */
    propTypes: {
        LineComponent: types('func'),
        buttonComponent: types('func'),
        data: types('array'),
        idField: types('string'),
        isLoading: types('bool'),
        isSelection: types('bool'),
        loader: types('func'),
        onLineClick: types('func'),
        onSelection: types('func'),
        operationList: types(['array', 'object']),
        selectionData: types('array'),
        selectionStatus: types('string')
    },

    getInitialState() {
        return {
            selectedItems: null
        }
    },

    /**
    * Return selected items in the list.
    * @return {Array} selected items
    */
    getSelectedItems() {
        const {selectedItems} = this.state;
        if (selectedItems !== null) {
            const selectedItems = [];
            for (let [item, isSelected] of this.state.selectedItems) {
                if (isSelected) selectedItems.push(item);
            }
            return selectedItems;
        } else {
            return reduce(this.refs, (acc, ref) => {
                if (ref.getValue) {
                    const {item, isSelected} = ref.getValue();
                    if (isSelected) acc.push(item);
                }
                return acc;
            }, []);
        }
    },

    _handleLineSelection(data, isSelected) {
        const {selectedItems} = this.state;
        const newSelectedItems = new Map();
        if (selectedItems !== null) {
            for (let [key, value] of selectedItems) {
                newSelectedItems.set(key, value);
            }
        }
        newSelectedItems.set(data, isSelected);

        if (this.props.onSelection) {
            this.props.onSelection(data, isSelected);
        }

        this.setState({selectedItems: newSelectedItems});
    },

    /**
    * Render lines of the list.
    * @returns {*} DOM for lines
    */
    _renderLines() {
        const {data, LineComponent: Line, selectionData, idField, selectionStatus, ...otherProps} = this.props;
        if(selectionData && selectionData.length > 0) {
            console.warn('[DEPRECATED] You are using \'selectionData\' prop which is now DEPRECATED. Please use \'selectionnableInitializer\' on line component.');
        }
        // LEGACY CODE
        const customLineComponent = otherProps.lineComponent;
        if (customLineComponent) {
            console.warn(`%c DEPRECATED : You are using the lineComponent prop in a list component, this will be removed in the next release of Focus Components. Please use LineComponent prop instead.`, `color: #FF9C00; font-weight: bold`);
        }
        const FinalLineComponent = customLineComponent || Line;
        // END OF LEGACY CODE
        if(!isArray(data)){
            console.error(
                'List: Lines: it seems data is not an array, please check the value in your store, it could also be related to your action in case of a load (have a look to shouldDumpStoreOnActionCall option).'
            );
        }
        return data.map((line, idx) => {
            let isSelected;
            const selection = find(selectionData, {[idField]: line[idField]});
            if (selection) {
                isSelected = selection.isSelected;
            } else {
                switch(selectionStatus){
                    case 'none':
                        isSelected = false;
                    break;
                    case 'selected':
                        isSelected = true;
                    break;
                    case 'partial':
                        isSelected = undefined;
                    break;
                    default:
                        isSelected = false;
                }
            }
            return (
                <FinalLineComponent
                    {...otherProps}
                    data={line}
                    isSelected={isSelected}
                    key={line[idField] || idx}
                    onSelection={this._handleLineSelection}
                    ref={`line${idx}`}
                    reference={this._getReference()}
                    />
            );
        });
    },
    /**
    * Render loading state
    * @return {HTML} the loading state
    */
    _renderLoading() {
        const {isLoading, loader} = this.props;
        if(isLoading){
            if(loader){
                return loader();
            }
            return (
                <li className='sl-loading'>{this.i18n('list.loading')} ...</li>
            );
        }
    },
    /**
    * Render manual fetch state
    * @return {HTML} the rendered manual fetch state
    */
    _renderManualFetch() {
        const {isManualFetch, hasMoreData} = this.props;
        if(isManualFetch && hasMoreData){
            const style = {className: 'primary'};
            return (
                <li className='sl-button'>
                    <Button
                        handleOnClick={this.handleShowMore}
                        label='list.button.showMore'
                        style={style}
                        type='button'
                        />
                </li>
            );
        }
    },

    /**
    * Render the list.
    * @returns {XML} DOM of the component
    */
    render() {
        const {isSelection} = this.props;
        return (
            <ul data-focus='selection-list' data-selection={isSelection}>
                {this._renderLines()}
                {this._renderLoading()}
                {this._renderManualFetch()}
            </ul>
        );
    }
};

module.exports = builder(listMixin);
