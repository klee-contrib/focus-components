// Dependencies

'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var builder = require('focus').component.builder;
var types = require('focus').component.types;
var React = require('react');

var _require = require('lodash/object');

var omit = _require.omit;
var keys = _require.keys;

var _require2 = require('lodash/collection');

var reduce = _require2.reduce;

// Table class.
var TABLE_CSS_CLASS = 'mdl-data-table mdl-js-data-table mdl-shadow--2dp ';
var TABLE_CELL_CLASS = 'mdl-data-table__cell--non-numeric';

// Mixins

var infiniteScrollMixin = require('../mixin/infinite-scroll').mixin;
var translationMixin = require('../../common/i18n').mixin;
var referenceMixin = require('../../common/mixin/reference-property');
var mdlBehaviour = require('../../common/mixin/mdl-behaviour');

// Components

var Button = require('../../common/button/action').component;

var tableMixin = {
    /**
     * React tag name.
     */
    displayName: 'Table',

    /**
     * Mixin dependancies.
     */
    mixins: [translationMixin, infiniteScrollMixin, referenceMixin, mdlBehaviour],
    /** inheriteddoc */
    getDefaultProps: function getDefaultProps() {
        return {
            data: [],
            idField: 'id',
            isLoading: false,
            operationList: [],
            isSelectable: false
        };
    },
    /** inheriteddoc */
    proptypes: {
        data: types('array'),
        isSelectable: types('bool'),
        onLineClick: types('func'),
        idField: types('string'),
        lineComponent: types('func').isRequired,
        operationList: types('array'),
        columns: types('object'),
        sortColumn: types('func'),
        isloading: types('bool'),
        loader: types('func')
    },
    /**
     * Render the table header.
     * @return {Component} - Render the table header.
     */
    _renderTableHeader: function _renderTableHeader() {
        var columns = this.props.columns;

        return React.createElement(
            'thead',
            null,
            React.createElement(
                'tr',
                null,
                reduce(columns, this._renderColumnHeader, [])
            )
        );
    },
    /**
     * Build a function which is called when there is a click on a table column.
     * @param  {string} column - Column name.
     * @param  {string} order  - The order config.
     * @return {function} - The function to be called when there is a click on it.
     */
    _sortColumnAction: function _sortColumnAction(column, order) {
        var currentComponent = this;
        return function (event) {
            event.preventDefault();
            currentComponent.props.sortColumn(column, order);
        };
    },
    /**
     * Render the column header.
     * @param {array} accumulator - The array co,ntaining the accumulating component.
     * @param  {object} colProperties - The column properties.
     * @param  {string} name - The column name.
     * @return {Component} - The component header.
     */
    _renderColumnHeader: function _renderColumnHeader(accumulator, colProperties, name) {
        var sort = undefined;
        if (!this.props.isEdit && !colProperties.noSort) {
            var order = colProperties.sort ? colProperties.sort : 'asc';
            var iconName = 'asc' === order ? 'arrow_drop_up' : 'arrow_drop_down';
            var icon = React.createElement(
                'i',
                { className: 'material-icons' },
                iconName
            );
            sort = React.createElement(
                'a',
                { className: 'sort', 'data-name': name, href: '#', onClick: this._sortColumnAction(name, 'asc' === order ? 'desc' : 'asc') },
                icon
            );
        }
        accumulator.push(React.createElement(
            'th',
            { className: TABLE_CELL_CLASS },
            this.i18n(colProperties.label),
            sort
        ));
        return accumulator;
    },
    /**
     * Render the tbody tag and the content.
     * @return {Component} - The component containing the tbody.
     */
    _renderTableBody: function _renderTableBody() {
        var _this = this;

        var _props = this.props;
        var data = _props.data;
        var TableLineComponent = _props.lineComponent;
        var idField = _props.idField;

        var reference = this._getReference();
        return React.createElement(
            'tbody',
            null,
            data.map(function (line, index) {
                var otherLineProps = omit(_this.props, 'data');
                return React.createElement(TableLineComponent, _extends({ className: TABLE_CELL_CLASS, data: line, key: line[idField], ref: 'line-' + index, reference: reference }, otherLineProps));
            })
        );
    },
    /**
     * Render the loading table
     * @return {Component} - The table in the loading mode.
     */
    _renderLoading: function _renderLoading() {
        var _props2 = this.props;
        var isLoading = _props2.isLoading;
        var loader = _props2.loader;

        if (isLoading) {
            if (loader) {
                return loader();
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
                        '' + this.i18n('list.loading')
                    )
                )
            );
        }
    },
    /**
     * Render the manual fetch mode for the table.
     * @return {Component} - The footer component when the mode is manual fetch , a show mode button is shown.
     */
    _renderManualFetch: function _renderManualFetch() {
        var _props3 = this.props;
        var isManualFetch = _props3.isManualFetch;
        var hasMoreData = _props3.hasMoreData;

        if (isManualFetch && hasMoreData) {
            return React.createElement(
                'tfoot',
                { className: 'table-manual-fetch' },
                React.createElement(
                    'tr',
                    null,
                    React.createElement(
                        'td',
                        { colSpan: keys(this.props.columns).length },
                        React.createElement(Button, {
                            handleOnClick: this.handleShowMore,
                            label: 'list.button.showMore',
                            type: 'button'
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
        var SELECTABLE_CSS = this.props.isSelectable ? 'mdl-data-table--selectable' : '';
        return React.createElement(
            'table',
            { className: TABLE_CSS_CLASS + ' ' + SELECTABLE_CSS },
            this._renderTableHeader(),
            this._renderTableBody(),
            this._renderLoading(),
            this._renderManualFetch()
        );
    }

};

module.exports = builder(tableMixin);