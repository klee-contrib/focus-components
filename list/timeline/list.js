var builder =  require('focus').component.builder;
var React = require('react');
var type = require('focus').component.types;
var Line = require('./line').mixin;
var uuid= require('uuid');
var InfiniteScrollMixin = require('../mixin/infinite-scroll').mixin;
var referenceMixin = require('../../common/mixin/reference-property');
var checkIsNotNull = require('focus').util.object.checkIsNotNull;

var listMixin = {
    /**
     * Tag name
     */
    displayName: 'timeline',

    /**
     * Mixin dependancies.
     */
    mixins: [InfiniteScrollMixin, referenceMixin],

    /**
     * Default properties for the list.
     * @return {object} default props.
     */
    getDefaultProps: function getDefaultProps(){
        return {
            idField: 'id',
            dateField: 'date'
        };
    },

    /**
     * list property validation.
     */
    propTypes: {
        data: type('array'),
        idField: type('string'),
        dateField: type('string'),
        dateComponent: type('object'),
        lineComponent: type('func', true)
    },

    /**
     * called before component mount
     */
    componentWillMount: function componentWillMount(){
        checkIsNotNull('lineComponent', this.props.lineComponent);
    },

    /**
     * Render lines of the list.
     * @returns {*} the lines
     */
    _renderLines: function renderLines() {
        var lineCount = 1;
        var LineComponent = this.props.lineComponent || React.createClass(Line);
        return this.props.data.map((line)=> {
            return React.createElement(LineComponent, {
                key: line[this.props.idField] || uuid.v4(),
                data: line,
                ref: 'line' + lineCount++,
                dateField: this.props.dateField,
                onLineClick: this.props.onLineClick
            });
        });
    },

    /**
     * Render the list.
     * @returns {XML} the list component
     */
    render: function renderList(){
        return (
            <ul className="timeline">
              {this._renderLines()}
            </ul>
        );
    }
};

module.exports = builder(listMixin);
