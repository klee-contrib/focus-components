let builder = require('focus').component.builder;
let React = require('react');
let Line = require('./line').mixin;
let Button = require('../../common/button/action').component;
let type = require('focus').component.types;
let translationMixin = require('../../common/i18n').mixin;
let infiniteScrollMixin = require('../mixin/infinite-scroll').mixin;
let referenceMixin = require('../../common/mixin/reference-property');
let checkIsNotNull = require('focus').util.object.checkIsNotNull;

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
    componentWillMount: function componentWillMount(){
        checkIsNotNull('lineComponent', this.props.lineComponent);
    },

    /**
    * Return selected items in the list.
    * @return {Array} selected items
    */
    getSelectedItems: function getListSelectedItems(){
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
    _renderLines: function renderLines(){
        let lineCount = 1;
        let LineComponent = this.props.lineComponent;
        return this.props.data.map((line)=>{
            let isSelected;
            switch(this.props.selectionStatus){
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
            return React.createElement(LineComponent, {
                key: line[this.props.idField],
                data: line,
                ref: 'line' + lineCount++,
                isSelection: this.props.isSelection,
                isSelected: isSelected,
                onSelection: this.props.onSelection,
                onLineClick: this.props.onLineClick,
                operationList: this.props.operationList,
                reference: this._getReference()
            });
        });
    },
    _renderLoading: function renderLoading(){
        if(this.props.isLoading){
            if(this.props.loader){
                return this.props.loader();
            }
            return (
                <li className='sl-loading'>{this.i18n('list.loading')} ...</li>
            );
        }
    },

    _renderManualFetch: function renderManualFetch(){
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
    render: function renderList(){
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
