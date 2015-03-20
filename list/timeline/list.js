var builder =  require('focus').component.builder;
var React = require('react');
var type = require('focus').component.types;
var Line = require('./line').mixin;
var uuid= require('uuid');

var listMixin = {
    /**
     * Tag name
     */
    displayName: "timeline",

    /**
     * Default properties for the list.
     */
    getDefaultProps: function getDefaultProps(){
        idField : "id"
    },

    /**
     * list property validation.
     */
    propTypes:{
        date: type('array'),
        lineComponent: type('object')
    },

    /**
     * Render lines of the list.
     * @returns {*}
     */
    _renderLines: function renderLines() {
        var lineCount = 1;
        var LineComponent = this.props.lineComponent || React.createClass(Line);
        return this.props.data.map((line)=> {
            return React.createElement(LineComponent, {
                key: line[this.props.idField] || uuid.v4(),
                data: line,
                ref: "line" + lineCount++,
                onLineClick: this.props.onLineClick
            });
        });
    },

    /**
     * Render the list.
     * @returns {XML}
     */
    render: function renderList(){
        return(
            <ul className="timeline">
              {this._renderLines()}
            </ul>
        );
    }
};

module.exports = builder(listMixin);