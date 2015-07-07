// Dependencies

let builder = require('focus').component.builder;
let type = require('focus').component.types;
let checkIsNotNull = require('focus').util.object.checkIsNotNull;
let React = require('react');

// Mixins

let infiniteScrollMixin = require('../mixin/infinite-scroll').mixin;
let translationMixin = require('../../common/i18n').mixin;
let referenceMixin = require('../../common/mixin/reference-property');

// Components

let Button = require('../../common/button/action').component;

let tableMixin = {
    /**
     * React tag name.
     */
    displayName: 'table-list',

    /**
     * Mixin dependancies.
     */
    mixins: [translationMixin, infiniteScrollMixin, referenceMixin],

    getDefaultProps() {
        return {
            data: [],
            idField: 'id',
            isLoading: false,
            operationList: []
        };
    },

    proptypes: {
        data: type('array'),
        onLineClick: type('func'),
        idField: type('string'),
        lineComponent: type('func', true),
        operationList: type('array'),
        columns: type('object'),
        sortColumn: type('func'),
        isloading: type('bool'),
        loader: type('func')
    },

    /**
     * called before component mount
     */
    componentWillMount(){
        checkIsNotNull('lineComponent', this.props.lineComponent);
    },

    _renderTableHeader(){
        let headerCols = [];
        for(let field in this.props.columns){
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

    _sortColumnAction(column, order) {
        let currentComponent = this;
        return function(event) {
            event.preventDefault();
            currentComponent.props.sortColumn(column, order);
        };
    },

    _renderColumnHeader(name) {
        let colProperties = this.props.columns[name];
        let sort;
        if(!this.props.isEdit && !colProperties.noSort ){
            let order = colProperties.sort ? colProperties.sort : 'asc';
            let iconClass = 'fa fa-sort-' + order;
            let icon = <i className={iconClass}/>;
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
        return (
            <tbody className="table-body">
                {this.props.data.map((line, index) => {
                    return (
                        <this.props.lineComponent
                            key={line[this.props.idField]}
                            data={line}
                            ref={`line${index}`}
                            reference={this._getReference()}
                            onSelection={this.props.onSelection}
                            onLineClick={this.props.onLineClick}
                            operationList={this.props.operationList}
                        />
                    );
                })}
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
                        <td>{`${this.i18n('list.loading')} ...`}</td>
                    </tr>
                </tbody>
            );
        }
    },

    _renderManualFetch: function renderManualFetch(){
        if(this.props.isManualFetch && this.props.hasMoreData){
            let style = {className: 'primary'};
            return (
                <tfoot className="table-manualFetch">
                    <tr>
                        <td colSpan={Object.keys(this.props.columns).length}>
                            <Button
                                label="list.button.showMore"
                                type="button"
                                handleOnClick={this.handleShowMore}
                                style={style}
                            />
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
    render() {
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
