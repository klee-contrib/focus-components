/**@jsx*/
var React = require('react');
var builder = require('focus').component.builder;
var type = require('focus').component.types;
var ContextualActions = require('../action-contextual').component;
var CheckBox = require('../../common/input/checkbox').component;
var translationMixin = require('../../common/i18n').mixin;
var referenceMixin = require('../../common/mixin/reference-property');
var definitionMixin = require('../../common/mixin/definition');
var builtInComponentsMixin = require('../mixin/built-in-components');

var lineMixin = {
    /**
     * React component name.
     */
    displayName: "selection-line",

    /**
     * Mixin dependancies.
     */
    mixins: [translationMixin, definitionMixin,referenceMixin, builtInComponentsMixin],

    /**
     * Default properties for the line.
     * @returns {{isSelection: boolean}}
     */
    getDefaultProps: function getLineDefaultProps(){
        return {
            isSelection: true,
            operationList: []
        };
    },

    /**
     * line property validation.
     * @type {Object}
     */
    propTypes:{
        data: type('object'),
        isSelection: type('bool'),
        isSelected: type('bool'),
        onLineClick: type('func'),
        onSelection: type('func'),
        operationList: type('array')
    },

    /**
     * State initialization.
     * @returns {{isSelected: boolean, lineItem: *}}
     */
    getInitialState: function getLineInitialState(){
        return {
            isSelected: this.props.isSelected || false
        };
    },

    /**
     * Update properties on component.
     * @param nextProps next properties
     */
    componentWillReceiveProps: function(nextProps) {
        if(nextProps.isSelected !== undefined){
            this.setState({isSelected : nextProps.isSelected});
        }
    },

    /**
     * Get the line value.
     * @returns {{item: *, isSelected: (*|isSelected|boolean)}}
     */
    getValue: function getLineValue(){
        return {
          item : this.props.data,
          isSelected: this.state.isSelected
        };
    },

    /**
     * Selection Click handler.
     * @param event
     */
    _handleSelectionClick: function handleSelectionClick(event){
        var select = !this.state.isSelected;
        this.setState({isSelected:select});
        if(this.props.onSelection){
            this.props.onSelection(this.props.data,select);
        }
    },

    /**
     * Line Click handler.
     * @param event
     */
    _handleLineClick: function handleLineClick(event){
        if(this.props.onLineClick){
            this.props.onLineClick(this.props.data);
        }
    },

    /**
     * Render the left box for selection
     * @returns {XML}
     */
    _renderSelectionBox: function renderSelectionBox(){
        if(this.props.isSelection){
            var selectionClass = this.state.isSelected? "selected" : "no-selection";
            //var image = this.state.isSelected? undefined : <img src={this.state.lineItem[this.props.iconfield]}/>
            return(
                <div className={`sl-selection ${selectionClass}`}>
                    <CheckBox value={this.state.isSelected} onChange={this._handleSelectionClick}/>
                </div>
            );
        }
        return null;
    },

    /**
     * render content for a line.
     * @returns {*}
     */
    _renderLineContent: function renderLineContent(){
        if(this.renderLineContent){
            return this.renderLineContent(this.props.data);
        }else{
            return (
                <div>
                    <div>{this.props.data.title}</div>
                    <div>{this.props.data.body}</div>
                </div>
            );
        }
    },

    /**
     * Render actions wich can be applied on the line
     */
    _renderActions: function renderLineActions(){
        if(this.props.operationList.length > 0){
            return (
                <div className="sl-actions">
                    <ContextualActions operationList={this.props.operationList} operationParam={this.props.data}/>
                </div>
            );
        }
    },

    /**
     * Render line in list.
     * @returns {*}
     */
    render: function renderLine(){
        if(this.renderLine){
            return this.renderLine();
        }else{
            return (
                <li className="sl-line">
                    {this._renderSelectionBox()}
                    <div className="sl-content" onClick={this._handleLineClick}>
                        {this._renderLineContent()}
                    </div>
                    {this._renderActions()}
                </li>
            );
        }
    }
};

module.exports = {mixin : lineMixin};
