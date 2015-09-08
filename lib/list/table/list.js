// Dependencies

'use strict';

var builder = require('focus').component.builder;
var type = require('focus').component.types;
var checkIsNotNull = require('focus').util.object.checkIsNotNull;
var React = require('react');

// Mixins

var infiniteScrollMixin = require('../mixin/infinite-scroll').mixin;
var translationMixin = require('../../common/i18n').mixin;
var referenceMixin = require('../../common/mixin/reference-property');

// Components

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

    getDefaultProps: function getDefaultProps() {
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
    componentWillMount: function componentWillMount() {
        checkIsNotNull('lineComponent', this.props.lineComponent);
    },

    _renderTableHeader: function _renderTableHeader() {
        var headerCols = [];
        for (var field in this.props.columns) {
            headerCols.push(this._renderColumnHeader(field));
        }
        return React.createElement(
            'thead',
            null,
            React.createElement(
                'tr',
                null,
                headerCols
            )
        );
    },

    _sortColumnAction: function _sortColumnAction(column, order) {
        var currentComponent = this;
        return function (event) {
            event.preventDefault();
            currentComponent.props.sortColumn(column, order);
        };
    },

    _renderColumnHeader: function _renderColumnHeader(name) {
        var colProperties = this.props.columns[name];
        var sort = undefined;
        if (!this.props.isEdit && !colProperties.noSort) {
            var order = colProperties.sort ? colProperties.sort : 'asc';
            var iconClass = 'fa fa-sort-' + order;
            var icon = React.createElement('i', { className: iconClass });
            sort = React.createElement(
                'a',
                { className: 'sort', href: '#', 'data-name': name, onClick: this._sortColumnAction(name, order == 'asc' ? 'desc' : 'asc') },
                icon
            );
        }
        return React.createElement(
            'th',
            null,
            this.i18n(colProperties.label),
            sort
        );
    },

    _renderTableBody: function renderTableBody() {
        var _this = this;

        return React.createElement(
            'tbody',
            { className: 'table-body' },
            this.props.data.map(function (line, index) {
                return React.createElement(_this.props.lineComponent, {
                    key: line[_this.props.idField],
                    data: line,
                    ref: 'line' + index,
                    reference: _this._getReference(),
                    onSelection: _this.props.onSelection,
                    onLineClick: _this.props.onLineClick,
                    operationList: _this.props.operationList
                });
            })
        );
    },

    _renderLoading: function renderLoading() {
        if (this.props.isLoading) {
            if (this.props.loader) {
                return this.props.loader();
            }
            return React.createElement(
                'tbody',
                { className: 'table-loading' },
                React.createElement(
                    'tr',
                    null,
                    React.createElement(
                        'td',
                        null,
                        this.i18n('list.loading') + ' ...'
                    )
                )
            );
        }
    },

    _renderManualFetch: function renderManualFetch() {
        if (this.props.isManualFetch && this.props.hasMoreData) {
            var style = { className: 'primary' };
            return React.createElement(
                'tfoot',
                { className: 'table-manualFetch' },
                React.createElement(
                    'tr',
                    null,
                    React.createElement(
                        'td',
                        { colSpan: Object.keys(this.props.columns).length },
                        React.createElement(Button, {
                            label: 'list.button.showMore',
                            type: 'button',
                            handleOnClick: this.handleShowMore,
                            style: style
                        })
                    )
                )
            );
        }
    },

    /**
     * Render the list.
     * @return {XML} the render of the table list.
     */
    render: function render() {
        return React.createElement(
            'table',
            { className: 'table-list' },
            this._renderTableHeader(),
            this._renderTableBody(),
            this._renderLoading(),
            this._renderManualFetch()
        );
    }

};

module.exports = builder(tableMixin);