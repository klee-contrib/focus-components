/**@jsx*/
var React = require('react');
var builder = require('focus/component/builder');
var type = require('focus/component/types');
var lineMixin = {
    /**
     * Default properties for the line.
     * @returns {{isSelection: boolean}}
     */
    getDefaultProps: function getLineDefaultProps(){
        return {
            isSelection: true
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
        onSelection: type('func')
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
        if(this.props.onSelection){
            this.props.onSelection(this.props.data);
        }
        var select = !this.state.isSelected;
        this.setState({isSelected:select});
    },

    /**
     * Line Click handler.
     * @param event
     */
    _handleLineClick: function handleLineClick(event){
        this.props.onLineClick(this.props.data);
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
                <div className={`sl-selection ${selectionClass}`} onClick={this._handleSelectionClick}></div>
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
                </li>
            );
        }
    }
};

module.exports = {mixin : lineMixin};
