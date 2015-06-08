var builder = require('focus').component.builder;
var React = require('react');
var type = require('focus').component.types;
var infiniteScrollMixin = require('../mixin/infinite-scroll').mixin;
var translationMixin = require('../../common/i18n').mixin;
var referenceMixin = require('../../common/mixin/reference-property');
var checkIsNotNull = require('focus').util.object.checkIsNotNull;
var Button = require('../../common/button/action').component;

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
            data: [],
            idField: 'id',
            isLoading: false
        };
    },

    proptypes: {
        data: type('array'),
        onLineClick: type('func'),
        idField: type('string'),
        lineComponent: type('func', true),
        columns: type('object'),
        sortColumn: type('func'),
        isloading: type('bool'),
        loader: type('func')
    },

    /**
     * called before component mount
     */
    componentWillMount: function componentWillMount(){
        checkIsNotNull('lineComponent', this.props.lineComponent);
    },

    _renderTableHeader: function renderTableHeader(){
        var headerCols = [];
        for(var field in this.props.columns){
            headerCols.push(
                this._renderColumnHeader(field)
            );
        }
        return (
          <thead>
              <tr>
              {headerCols}
              </tr>
          </thead>
        );
    },

    _sortColumnAction: function sortColumnAction(column, order) {
        var currentComponent = this;
        return function(event) {
            event.preventDefault();
            currentComponent.props.sortColumn(column, order);
        };
    },

    _renderColumnHeader: function(name){
        var colProperties = this.props.columns[name];
        var sort;
        if(!this.props.isEdit && !colProperties.noSort ){
            var order = colProperties.sort ? colProperties.sort : 'asc';
            var iconClass = 'fa fa-sort-' + order;
            var icon = <i className={iconClass}/>;
            sort = <a className='sort' href='#' data-name={name} onClick={this._sortColumnAction(name, (order == 'asc' ? 'desc' : 'asc' ))}>{icon}</a>;
        }
        return (
            <th>
                {this.i18n(colProperties.label)}
                {sort}
            </th>
        );
    },

    _renderTableBody: function renderTableBody(){
        var lineCount = 1;
        var lineComponent = this.props.lineComponent;
        var content = this.props.data.map((line)=>{
            return React.createElement(lineComponent, {
                key: line[this.props.idField],
                data: line,
                ref: 'line' + lineCount++,
                reference: this._getReference(),
                onSelection: this.props.onSelection
            });
        });
        return (
          <tbody className="table-body">
            {content}
          </tbody>
        );
    },

    _renderLoading: function renderLoading(){
        if(this.props.isLoading){
            if(this.props.loader){
                return this.props.loader();
            }
            return (
                <tbody className="table-loading">
                    <tr>
                        <td>{this.i18n('list.loading')} ...</td>
                    </tr>
                </tbody>
            );
        }
    },

    _renderManualFetch: function renderManualFetch(){
        if(this.props.isManualFetch && this.props.hasMoreData){
            var style = {className: 'primary'};
            return (
                <tfoot className="table-manualFetch">
                    <tr>
                        <td colSpan={Object.keys(this.props.columns).length}>
                            <Button label="list.button.showMore"
                                    type="button"
                                    handleOnClick={this.handleShowMore}
                                    style={style}/>
                        </td>
                    </tr>
                </tfoot>
            );
        }
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
                {this._renderLoading()}
                {this._renderManualFetch()}
            </table>
        );
    }

};

module.exports = builder(tableMixin);
