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
        return{
            idField : "id",
            dateField : "date"
        }
    },

    /**
     * list property validation.
     */
    propTypes:{
        date: type('array'),
        idField: type('string'),
        dateField: type('string'),
        dateComponent: type('object'),
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
                dateField: this.props.dateField,
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