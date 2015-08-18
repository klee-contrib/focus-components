// Dependencies

let builder = require('focus').component.builder;
let React = require('react');
let checkIsNotNull = require('focus').util.object.checkIsNotNull;
let type = require('focus').component.types;
let find = require('lodash/collection/find');

// Mixins

let translationMixin = require('../../common/i18n').mixin;
let infiniteScrollMixin = require('../mixin/infinite-scroll').mixin;
let referenceMixin = require('../../common/mixin/reference-property');

// Components

let Button = require('../../common/button/action').component;

let listMixin = {
    /**
    * Display name.
    */
    displayName: 'selection-list',

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
        data: type('array'),
        idField: type('string'),
        isLoading: type('bool'),
        isSelection: type('bool'),
        lineComponent: type('func', true),
        loader: type('func'),
        onLineClick: type('func'),
        onSelection: type('func'),
        operationList: type('array'),
        selectionData: type('array'),
        selectionStatus: type('string')
    },

    /**
    * called before component mount
    */
    componentWillMount() {
        checkIsNotNull('lineComponent', this.props.lineComponent);
    },

    /**
    * Return selected items in the list.
    * @return {Array} selected items
    */
    getSelectedItems() {
        let selected = [];
        for(let i = 1; i < this.props.data.length + 1; i++){
            let lineName = 'line' + i;
            let lineValue = this.refs[lineName].getValue();
            if(lineValue.isSelected){
                selected.push(lineValue.item);
            }
        }
        return selected;
    },

    /**
    * Render lines of the list.
    * @returns {*} DOM for lines
    */
    _renderLines() {
        let lineCount = 1;
        let {data, lineComponent, selectionStatus, idField, isSelection, selectionData, onSelection, onLineClick, operationList} = this.props;
        return data.map((line) => {
            let isSelected;
            let selection = find(selectionData, {[idField]: line[idField]});
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
            return React.createElement(lineComponent, {
                key: line[idField],
                data: line,
                ref: `line${lineCount++}`,
                isSelection: isSelection,
                isSelected: isSelected,
                onSelection: onSelection,
                onLineClick: onLineClick,
                operationList: operationList,
                reference: this._getReference()
            });
        });
    },
    _renderLoading() {
        if(this.props.isLoading){
            if(this.props.loader){
                return this.props.loader();
            }
            return (
                <li className='sl-loading'>{this.i18n('list.loading')} ...</li>
            );
        }
    },

    _renderManualFetch() {
        if(this.props.isManualFetch && this.props.hasMoreData){
            let style = {className: 'primary'};
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
        return (
            <ul data-focus='selection-list'>
                {this._renderLines()}
                {this._renderLoading()}
                {this._renderManualFetch()}
            </ul>
        );
    }
};

module.exports = builder(listMixin);
