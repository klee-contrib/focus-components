/**@jsx*/
var builder =  require('focus').component.builder;
var React = require('react');
var Line = require('./line').mixin;
var Button = require('../../common/button/action').component;
var type = require('focus').component.types;
var translationMixin = require('../../common/i18n').mixin;
var infiniteScrollMixin = require('../mixin/infinite-scroll').mixin;
var referenceMixin = require('../../common/mixin/reference-property');
var checkIsNotNull = require('focus').util.object.checkIsNotNull;

var listMixin = {
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
        isSelection: type('bool'),
        onSelection: type('func'),
        onLineClick: type('func'),
        isLoading: type('bool'),
        loader: type('func'),
        operationList: type('array'),
        idField: type('string'),
        lineComponent: type('func', true),
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
        var selected = [];
        for(var i = 1; i < this.props.data.length + 1; i++){
            var lineName = 'line' + i;
            var lineValue = this.refs[lineName].getValue();
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
        var lineCount = 1;
        var LineComponent = this.props.lineComponent;
        return this.props.data.map((line)=>{
            var isSelected;
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
                <li className="sl-loading">{this.i18n('list.loading')} ...</li>
            );
        }
    },

    _renderManualFetch: function renderManualFetch(){
        if(this.props.isManualFetch && this.props.hasMoreData){
            var style = {className: 'primary'};
            return (
                <li className="sl-button">
                    <Button label="list.button.showMore"
                        type="button"
                        handleOnClick={this.handleShowMore}
                        style={style}/>
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
            <ul className="selection-list">
              {this._renderLines()}
              {this._renderLoading()}
              {this._renderManualFetch()}
            </ul>
        );
    }
};

module.exports = builder(listMixin);
