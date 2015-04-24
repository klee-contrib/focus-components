var builder =  require('focus').component.builder;
var React = require('react');
var type = require('focus').component.types;
var infiniteScrollMixin = require('../mixin/infinite-scroll').mixin;
var translationMixin = require('../../common/i18n').mixin;
var referenceMixin = require('../../common/mixin/reference-property');
var paginationMixin = require('../mixin/pagination');
var checkIsNotNull = require('focus').util.object.checkIsNotNull;

var tableMixin = {
    /**
     * React tag name.
     */
    displayName: 'table-list',

    /**
     * Mixin dependancies.
     */
    mixins: [translationMixin, infiniteScrollMixin, referenceMixin],

    getDefaultProps: function getListDefaultProps(){
        return {
            idField: 'id'
        };
    },

    proptypes: {
        data: type('array'),
        onLineClick: type('func'),
        idField: type('string'),
        lineComponent: type('func', true),
        columns: type('object'),
        sortColumn: type('func')
    },

    /**
     * called before component mount
     */
    componentWillMount: function componentWillMount(){
        checkIsNotNull('lineComponent', this.props.lineComponent);
    },

    _renderTableHeader: function renderTableHeader(){
        var headerRows = [];
        for(var field in this.props.columns){
            headerRows.push(
                <th>
                {this.i18n(this.props.columns[field].label)}
                </th>
            );
        }
        return (
          <thead>
          {headerRows}
          </thead>
        );
    },

    _renderTableBody: function renderTableBody(){
        var lineCount = 1;
        var lineComponent = this.props.lineComponent;
        return this.props.data.map((line)=>{
            return React.createElement(lineComponent, {
                key: line[this.props.idField],
                data: line,
                ref: 'line' + lineCount++,
                reference: this._getReference()
            });
        });
    },

    /**
     * Render the list.
     * @return {XML} the render of the table list.
     */
    render: function render(){
        return (
            <table className="table-list">
            {this._renderTableHeader()}
            {this._renderTableBody()}
            </table>
        );
    }

};

module.exports = builder(tableMixin);
