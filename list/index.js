/**@jsx*/
var builder =  require('focus/component/builder');
var React = require('react');
var Line = require('./line').component;
var uuid= require('uuid');
var type = require('focus/component/types');

var listMixin = {
    /**
     * Default properties for the list.
     * @returns {{isSelection: boolean}}
     */
    getDefaultProps: function getLineDefaultProps(){
        return {
            isSelection : true,
            isAllSelected : false
        };
    },

    /**
     * list property validation.
     * @type {Object}
     */
    propTypes:{
        data: type('object'),
        isSelection: type('bool'),
        isAllSelected: type('bool'),
        onSelection: type('func'),
        onLineClick: type('func')
    },

    /**
     * Return selected items in the list.
     */
    getSelectedItems: function getListSelectedItems(){
        var selected = [];
        for(var i= 1; i< this.props.data.length + 1;i++){
            var lineName = "line" + i;
            var lineValue = this.refs[lineName].getValue();
            if(lineValue.isSelected){
                selected.push(lineValue.item);
            }
        }
        return selected;
    },

    /**
     * Render lines of the list.
     * @returns {*}
     */
    renderLines: function renderLines(){
        var lineCount = 1;
        return this.props.data.map((line)=>{
            return <Line key={line.id || uuid.v4()}
                            data={line} ref={"line" + lineCount++}
                            isSelected={this.props.isAllSelected}
                            onSelection={this.props.onSelection}
                            onLineClick={this.props.onLineClick}/>;
        });
    },

    /**
     * Render the list.
     * @returns {XML}
     */
    render: function renderList(){
        return(
          <ul className="selection-list">
              {this.renderLines()}
          </ul>
        );
    }
}

module.exports = builder(listMixin);
