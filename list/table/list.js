'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _builder = require('focus-core/component/builder');

var _builder2 = _interopRequireDefault(_builder);

var _types = require('focus-core/component/types');

var _types2 = _interopRequireDefault(_types);

var _isReactClassComponent = require('../../utils/is-react-class-component');

var _button = require('../../components/button');

var _button2 = _interopRequireDefault(_button);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; } // Dependencies

var React = require('react');

var _require = require('lodash/object'),
    omit = _require.omit,
    keys = _require.keys;

var _require2 = require('lodash/collection'),
    reduce = _require2.reduce;
//Add a ref to the props if the component is not pure add nothing in the other case.


// Table class.
var TABLE_CSS_CLASS = 'mdl-data-table mdl-js-data-table mdl-shadow--2dp ';
var TABLE_CELL_CLASS = 'mdl-data-table__cell--non-numeric';

// Mixins

var infiniteScrollMixin = require('../mixin/infinite-scroll').mixin;
var translationMixin = require('../../common/i18n').mixin;
var referenceMixin = require('../../common/mixin/reference-property');
var mdlBehaviour = require('../../common/mixin/mdl-behaviour');

// Components

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
        data: (0, _types2.default)('array'),
        isSelectable: (0, _types2.default)('bool'),
        onLineClick: (0, _types2.default)('func'),
        idField: (0, _types2.default)('string'),
        lineComponent: (0, _types2.default)('func').isRequired,
        operationList: (0, _types2.default)('array'),
        columns: (0, _types2.default)('object'),
        sortColumn: (0, _types2.default)('func'),
        isloading: (0, _types2.default)('bool'),
        loader: (0, _types2.default)('func')
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
        var sort = void 0;
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
                { className: 'sort', 'data-bypass': true, 'data-name': name, href: '#', onClick: this._sortColumnAction(name, 'asc' === order ? 'desc' : 'asc') },
                icon
            );
        }
        accumulator.push(React.createElement(
            'th',
            { className: TABLE_CELL_CLASS, key: colProperties.label },
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

        var _props = this.props,
            data = _props.data,
            TableLineComponent = _props.LineComponent,
            idField = _props.idField;

        var reference = this._getReference();
        return React.createElement(
            'tbody',
            null,
            data.map(function (line, idx) {
                var _props2 = _this.props,
                    data = _props2.data,
                    otherLineProps = _objectWithoutProperties(_props2, ['data']);

                var tableBodyFinalProps = (0, _isReactClassComponent.addRefToPropsIfNotPure)(TableLineComponent, _extends({
                    className: TABLE_CELL_CLASS,
                    data: line,
                    key: line[idField],
                    reference: reference
                }, otherLineProps), '' + _isReactClassComponent.LINE + idx);
                return React.createElement(TableLineComponent, tableBodyFinalProps);
            })
        );
    },

    /**
     * Render the loading table
     * @return {Component} - The table in the loading mode.
     */
    _renderLoading: function _renderLoading() {
        var _props3 = this.props,
            isLoading = _props3.isLoading,
            loader = _props3.loader;

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
        var _props4 = this.props,
            isManualFetch = _props4.isManualFetch,
            hasMoreData = _props4.hasMoreData;

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
                        React.createElement(_button2.default, { handleOnClick: this.fetchNextPage, label: 'list.button.showMore', type: 'button' })
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

module.exports = (0, _builder2.default)(tableMixin);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJSZWFjdCIsInJlcXVpcmUiLCJvbWl0Iiwia2V5cyIsInJlZHVjZSIsIlRBQkxFX0NTU19DTEFTUyIsIlRBQkxFX0NFTExfQ0xBU1MiLCJpbmZpbml0ZVNjcm9sbE1peGluIiwibWl4aW4iLCJ0cmFuc2xhdGlvbk1peGluIiwicmVmZXJlbmNlTWl4aW4iLCJtZGxCZWhhdmlvdXIiLCJ0YWJsZU1peGluIiwiZGlzcGxheU5hbWUiLCJtaXhpbnMiLCJnZXREZWZhdWx0UHJvcHMiLCJkYXRhIiwiaWRGaWVsZCIsImlzTG9hZGluZyIsIm9wZXJhdGlvbkxpc3QiLCJpc1NlbGVjdGFibGUiLCJwcm9wdHlwZXMiLCJvbkxpbmVDbGljayIsImxpbmVDb21wb25lbnQiLCJpc1JlcXVpcmVkIiwiY29sdW1ucyIsInNvcnRDb2x1bW4iLCJpc2xvYWRpbmciLCJsb2FkZXIiLCJfcmVuZGVyVGFibGVIZWFkZXIiLCJwcm9wcyIsIl9yZW5kZXJDb2x1bW5IZWFkZXIiLCJfc29ydENvbHVtbkFjdGlvbiIsImNvbHVtbiIsIm9yZGVyIiwiY3VycmVudENvbXBvbmVudCIsImV2ZW50IiwicHJldmVudERlZmF1bHQiLCJhY2N1bXVsYXRvciIsImNvbFByb3BlcnRpZXMiLCJuYW1lIiwic29ydCIsImlzRWRpdCIsIm5vU29ydCIsImljb25OYW1lIiwiaWNvbiIsInB1c2giLCJsYWJlbCIsImkxOG4iLCJfcmVuZGVyVGFibGVCb2R5IiwiVGFibGVMaW5lQ29tcG9uZW50IiwiTGluZUNvbXBvbmVudCIsInJlZmVyZW5jZSIsIl9nZXRSZWZlcmVuY2UiLCJtYXAiLCJsaW5lIiwiaWR4Iiwib3RoZXJMaW5lUHJvcHMiLCJ0YWJsZUJvZHlGaW5hbFByb3BzIiwiY2xhc3NOYW1lIiwia2V5IiwiX3JlbmRlckxvYWRpbmciLCJfcmVuZGVyTWFudWFsRmV0Y2giLCJpc01hbnVhbEZldGNoIiwiaGFzTW9yZURhdGEiLCJsZW5ndGgiLCJmZXRjaE5leHRQYWdlIiwicmVuZGVyIiwiU0VMRUNUQUJMRV9DU1MiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7O0FBRUE7Ozs7QUFDQTs7OztBQUtBOztBQWVBOzs7Ozs7Nk5BdkJBOztBQUlBLElBQU1BLFFBQVFDLFFBQVEsT0FBUixDQUFkOztlQUNxQkEsUUFBUSxlQUFSLEM7SUFBZEMsSSxZQUFBQSxJO0lBQU1DLEksWUFBQUEsSTs7Z0JBQ0lGLFFBQVEsbUJBQVIsQztJQUFWRyxNLGFBQUFBLE07QUFDUDs7O0FBR0E7QUFDQSxJQUFNQyxrQkFBa0IsbURBQXhCO0FBQ0EsSUFBTUMsbUJBQW1CLG1DQUF6Qjs7QUFFQTs7QUFFQSxJQUFNQyxzQkFBc0JOLFFBQVEsMEJBQVIsRUFBb0NPLEtBQWhFO0FBQ0EsSUFBTUMsbUJBQW1CUixRQUFRLG1CQUFSLEVBQTZCTyxLQUF0RDtBQUNBLElBQU1FLGlCQUFpQlQsUUFBUSx1Q0FBUixDQUF2QjtBQUNBLElBQU1VLGVBQWVWLFFBQVEsa0NBQVIsQ0FBckI7O0FBRUE7O0FBSUEsSUFBTVcsYUFBYTtBQUNmOzs7QUFHQUMsaUJBQWEsT0FKRTs7QUFNZjs7O0FBR0FDLFlBQVEsQ0FBQ0wsZ0JBQUQsRUFBbUJGLG1CQUFuQixFQUF3Q0csY0FBeEMsRUFBd0RDLFlBQXhELENBVE87QUFVZjtBQUNBSSxtQkFYZSw2QkFXRztBQUNkLGVBQU87QUFDSEMsa0JBQU0sRUFESDtBQUVIQyxxQkFBUyxJQUZOO0FBR0hDLHVCQUFXLEtBSFI7QUFJSEMsMkJBQWUsRUFKWjtBQUtIQywwQkFBYztBQUxYLFNBQVA7QUFPSCxLQW5CYzs7QUFvQmY7QUFDQUMsZUFBVztBQUNQTCxjQUFNLHFCQUFNLE9BQU4sQ0FEQztBQUVQSSxzQkFBYyxxQkFBTSxNQUFOLENBRlA7QUFHUEUscUJBQWEscUJBQU0sTUFBTixDQUhOO0FBSVBMLGlCQUFTLHFCQUFNLFFBQU4sQ0FKRjtBQUtQTSx1QkFBZSxxQkFBTSxNQUFOLEVBQWNDLFVBTHRCO0FBTVBMLHVC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U0FESjtBQVFIO0FBcEpjLENBQW5COztBQXdKQU8sT0FBT0MsT0FBUCxHQUFpQix1QkFBUTFELFVBQVIsQ0FBakIiLCJmaWxlIjoiaXMtcmVhY3QtY2xhc3MtY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gRGVwZW5kZW5jaWVzXHJcblxyXG5pbXBvcnQgYnVpbGRlciBmcm9tICdmb2N1cy1jb3JlL2NvbXBvbmVudC9idWlsZGVyJztcclxuaW1wb3J0IHR5cGVzIGZyb20gJ2ZvY3VzLWNvcmUvY29tcG9uZW50L3R5cGVzJztcclxuY29uc3QgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xyXG5jb25zdCB7b21pdCwga2V5c30gPSByZXF1aXJlKCdsb2Rhc2gvb2JqZWN0Jyk7XHJcbmNvbnN0IHtyZWR1Y2V9ID0gcmVxdWlyZSgnbG9kYXNoL2NvbGxlY3Rpb24nKTtcclxuLy9BZGQgYSByZWYgdG8gdGhlIHByb3BzIGlmIHRoZSBjb21wb25lbnQgaXMgbm90IHB1cmUgYWRkIG5vdGhpbmcgaW4gdGhlIG90aGVyIGNhc2UuXHJcbmltcG9ydCB7YWRkUmVmVG9Qcm9wc0lmTm90UHVyZSwgTElORX0gZnJvbSAnLi4vLi4vdXRpbHMvaXMtcmVhY3QtY2xhc3MtY29tcG9uZW50JztcclxuXHJcbi8vIFRhYmxlIGNsYXNzLlxyXG5jb25zdCBUQUJMRV9DU1NfQ0xBU1MgPSAnbWRsLWRhdGEtdGFibGUgbWRsLWpzLWRhdGEtdGFibGUgbWRsLXNoYWRvdy0tMmRwICc7XHJcbmNvbnN0IFRBQkxFX0NFTExfQ0xBU1MgPSAnbWRsLWRhdGEtdGFibGVfX2NlbGwtLW5vbi1udW1lcmljJztcclxuXHJcbi8vIE1peGluc1xyXG5cclxuY29uc3QgaW5maW5pdGVTY3JvbGxNaXhpbiA9IHJlcXVpcmUoJy4uL21peGluL2luZmluaXRlLXNjcm9sbCcpLm1peGluO1xyXG5jb25zdCB0cmFuc2xhdGlvbk1peGluID0gcmVxdWlyZSgnLi4vLi4vY29tbW9uL2kxOG4nKS5taXhpbjtcclxuY29uc3QgcmVmZXJlbmNlTWl4aW4gPSByZXF1aXJlKCcuLi8uLi9jb21tb24vbWl4aW4vcmVmZXJlbmNlLXByb3BlcnR5Jyk7XHJcbmNvbnN0IG1kbEJlaGF2aW91ciA9IHJlcXVpcmUoJy4uLy4uL2NvbW1vbi9taXhpbi9tZGwtYmVoYXZpb3VyJyk7XHJcblxyXG4vLyBDb21wb25lbnRzXHJcblxyXG5pbXBvcnQgQnV0dG9uIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvYnV0dG9uJztcclxuXHJcbmNvbnN0IHRhYmxlTWl4aW4gPSB7XHJcbiAgICAvKipcclxuICAgICAqIFJlYWN0IHRhZyBuYW1lLlxyXG4gICAgICovXHJcbiAgICBkaXNwbGF5TmFtZTogJ1RhYmxlJyxcclxuXHJcbiAgICAvKipcclxuICAgICAqIE1peGluIGRlcGVuZGFuY2llcy5cclxuICAgICAqL1xyXG4gICAgbWl4aW5zOiBbdHJhbnNsYXRpb25NaXhpbiwgaW5maW5pdGVTY3JvbGxNaXhpbiwgcmVmZXJlbmNlTWl4aW4sIG1kbEJlaGF2aW91cl0sXHJcbiAgICAvKiogaW5oZXJpdGVkZG9jICovXHJcbiAgICBnZXREZWZhdWx0UHJvcHMoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgZGF0YTogW10sXHJcbiAgICAgICAgICAgIGlkRmllbGQ6ICdpZCcsXHJcbiAgICAgICAgICAgIGlzTG9hZGluZzogZmFsc2UsXHJcbiAgICAgICAgICAgIG9wZXJhdGlvbkxpc3Q6IFtdLFxyXG4gICAgICAgICAgICBpc1NlbGVjdGFibGU6IGZhbHNlXHJcbiAgICAgICAgfTtcclxuICAgIH0sXHJcbiAgICAvKiogaW5oZXJpdGVkZG9jICovXHJcbiAgICBwcm9wdHlwZXM6IHtcclxuICAgICAgICBkYXRhOiB0eXBlcygnYXJyYXknKSxcclxuICAgICAgICBpc1NlbGVjdGFibGU6IHR5cGVzKCdib29sJyksXHJcbiAgICAgICAgb25MaW5lQ2xpY2s6IHR5cGVzKCdmdW5jJyksXHJcbiAgICAgICAgaWRGaWVsZDogdHlwZXMoJ3N0cmluZycpLFxyXG4gICAgICAgIGxpbmVDb21wb25lbnQ6IHR5cGVzKCdmdW5jJykuaXNSZXF1aXJlZCxcclxuICAgICAgICBvcGVyYXRpb25MaXN0OiB0eXBlcygnYXJyYXknKSxcclxuICAgICAgICBjb2x1bW5zOiB0eXBlcygnb2JqZWN0JyksXHJcbiAgICAgICAgc29ydENvbHVtbjogdHlwZXMoJ2Z1bmMnKSxcclxuICAgICAgICBpc2xvYWRpbmc6IHR5cGVzKCdib29sJyksXHJcbiAgICAgICAgbG9hZGVyOiB0eXBlcygnZnVuYycpXHJcbiAgICB9LFxyXG4gICAgLyoqXHJcbiAgICAgKiBSZW5kZXIgdGhlIHRhYmxlIGhlYWRlci5cclxuICAgICAqIEByZXR1cm4ge0NvbXBvbmVudH0gLSBSZW5kZXIgdGhlIHRhYmxlIGhlYWRlci5cclxuICAgICAqL1xyXG4gICAgX3JlbmRlclRhYmxlSGVhZGVyKCkge1xyXG4gICAgICAgIGNvbnN0IHtjb2x1bW5zfSA9IHRoaXMucHJvcHM7XHJcbiAgICAgICAgcmV0dXJuIDx0aGVhZD48dHI+e3JlZHVjZShjb2x1bW5zLCB0aGlzLl9yZW5kZXJDb2x1bW5IZWFkZXIsIFtdKX08L3RyPjwvdGhlYWQ+O1xyXG4gICAgfSxcclxuICAgIC8qKlxyXG4gICAgICogQnVpbGQgYSBmdW5jdGlvbiB3aGljaCBpcyBjYWxsZWQgd2hlbiB0aGVyZSBpcyBhIGNsaWNrIG9uIGEgdGFibGUgY29sdW1uLlxyXG4gICAgICogQHBhcmFtICB7c3RyaW5nfSBjb2x1bW4gLSBDb2x1bW4gbmFtZS5cclxuICAgICAqIEBwYXJhbSAge3N0cmluZ30gb3JkZXIgIC0gVGhlIG9yZGVyIGNvbmZpZy5cclxuICAgICAqIEByZXR1cm4ge2Z1bmN0aW9ufSAtIFRoZSBmdW5jdGlvbiB0byBiZSBjYWxsZWQgd2hlbiB0aGVyZSBpcyBhIGNsaWNrIG9uIGl0LlxyXG4gICAgICovXHJcbiAgICBfc29ydENvbHVtbkFjdGlvbihjb2x1bW4sIG9yZGVyKSB7XHJcbiAgICAgICAgbGV0IGN1cnJlbnRDb21wb25lbnQgPSB0aGlzO1xyXG4gICAgICAgIHJldHVybiAoZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgY3VycmVudENvbXBvbmVudC5wcm9wcy5zb3J0Q29sdW1uKGNvbHVtbiwgb3JkZXIpO1xyXG4gICAgICAgIH07XHJcbiAgICB9LFxyXG4gICAgLyoqXHJcbiAgICAgKiBSZW5kZXIgdGhlIGNvbHVtbiBoZWFkZXIuXHJcbiAgICAgKiBAcGFyYW0ge2FycmF5fSBhY2N1bXVsYXRvciAtIFRoZSBhcnJheSBjbyxudGFpbmluZyB0aGUgYWNjdW11bGF0aW5nIGNvbXBvbmVudC5cclxuICAgICAqIEBwYXJhbSAge29iamVjdH0gY29sUHJvcGVydGllcyAtIFRoZSBjb2x1bW4gcHJvcGVydGllcy5cclxuICAgICAqIEBwYXJhbSAge3N0cmluZ30gbmFtZSAtIFRoZSBjb2x1bW4gbmFtZS5cclxuICAgICAqIEByZXR1cm4ge0NvbXBvbmVudH0gLSBUaGUgY29tcG9uZW50IGhlYWRlci5cclxuICAgICAqL1xyXG4gICAgX3JlbmRlckNvbHVtbkhlYWRlcihhY2N1bXVsYXRvciwgY29sUHJvcGVydGllcywgbmFtZSkge1xyXG4gICAgICAgIGxldCBzb3J0O1xyXG4gICAgICAgIGlmKCF0aGlzLnByb3BzLmlzRWRpdCAmJiAhY29sUHJvcGVydGllcy5ub1NvcnQgKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IG9yZGVyID0gY29sUHJvcGVydGllcy5zb3J0ID8gY29sUHJvcGVydGllcy5zb3J0IDogJ2FzYyc7XHJcbiAgICAgICAgICAgIGNvbnN0IGljb25OYW1lID0gJ2FzYycgPT09IG9yZGVyID8gJ2Fycm93X2Ryb3BfdXAnIDogJ2Fycm93X2Ryb3BfZG93bic7XHJcbiAgICAgICAgICAgIGNvbnN0IGljb24gPSA8aSBjbGFzc05hbWU9J21hdGVyaWFsLWljb25zJz57aWNvbk5hbWV9PC9pPjtcclxuICAgICAgICAgICAgc29ydCA9IDxhIGNsYXNzTmFtZT0nc29ydCcgZGF0YS1ieXBhc3MgZGF0YS1uYW1lPXtuYW1lfSBocmVmPScjJyBvbkNsaWNrPXt0aGlzLl9zb3J0Q29sdW1uQWN0aW9uKG5hbWUsICgnYXNjJyA9PT0gb3JkZXIgPyAnZGVzYycgOiAnYXNjJyApKX0+e2ljb259PC9hPjtcclxuICAgICAgICB9XHJcbiAgICAgICAgYWNjdW11bGF0b3IucHVzaCg8dGggY2xhc3NOYW1lPXtUQUJMRV9DRUxMX0NMQVNTfSBrZXk9e2NvbFByb3BlcnRpZXMubGFiZWx9Pnt0aGlzLmkxOG4oY29sUHJvcGVydGllcy5sYWJlbCl9e3NvcnR9PC90aD4pO1xyXG4gICAgICAgIHJldHVybiBhY2N1bXVsYXRvcjtcclxuICAgIH0sXHJcbiAgICAvKipcclxuICAgICAqIFJlbmRlciB0aGUgdGJvZHkgdGFnIGFuZCB0aGUgY29udGVudC5cclxuICAgICAqIEByZXR1cm4ge0NvbXBvbmVudH0gLSBUaGUgY29tcG9uZW50IGNvbnRhaW5pbmcgdGhlIHRib2R5LlxyXG4gICAgICovXHJcbiAgICBfcmVuZGVyVGFibGVCb2R5KCkge1xyXG4gICAgICAgIGNvbnN0IHtkYXRhLCBMaW5lQ29tcG9uZW50OiBUYWJsZUxpbmVDb21wb25lbnQsIGlkRmllbGR9ID0gdGhpcy5wcm9wcztcclxuICAgICAgICBjb25zdCByZWZlcmVuY2UgPSB0aGlzLl9nZXRSZWZlcmVuY2UoKTtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8dGJvZHk+XHJcbiAgICAgICAgICAgICAgICB7ZGF0YS5tYXAoKGxpbmUsIGlkeCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHtkYXRhLCAuLi5vdGhlckxpbmVQcm9wc30gPSB0aGlzLnByb3BzO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHRhYmxlQm9keUZpbmFsUHJvcHMgPSBhZGRSZWZUb1Byb3BzSWZOb3RQdXJlKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBUYWJsZUxpbmVDb21wb25lbnQsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBUQUJMRV9DRUxMX0NMQVNTLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiBsaW5lLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBrZXk6IGxpbmVbaWRGaWVsZF0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZmVyZW5jZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLi4ub3RoZXJMaW5lUHJvcHNcclxuICAgICAgICAgICAgICAgICAgICB9LCBgJHtMSU5FfSR7aWR4fWApO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiA8VGFibGVMaW5lQ29tcG9uZW50IHsuLi50YWJsZUJvZHlGaW5hbFByb3BzfS8+O1xyXG4gICAgICAgICAgICAgICAgfSl9XHJcbiAgICAgICAgICAgIDwvdGJvZHk+XHJcbiAgICAgICAgKTtcclxuICAgIH0sXHJcbiAgICAvKipcclxuICAgICAqIFJlbmRlciB0aGUgbG9hZGluZyB0YWJsZVxyXG4gICAgICogQHJldHVybiB7Q29tcG9uZW50fSAtIFRoZSB0YWJsZSBpbiB0aGUgbG9hZGluZyBtb2RlLlxyXG4gICAgICovXHJcbiAgICBfcmVuZGVyTG9hZGluZygpIHtcclxuICAgICAgICBjb25zdCB7aXNMb2FkaW5nLCBsb2FkZXJ9ID0gdGhpcy5wcm9wcztcclxuICAgICAgICBpZihpc0xvYWRpbmcpIHtcclxuICAgICAgICAgICAgaWYobG9hZGVyKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbG9hZGVyKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICAgIDx0Ym9keSBjbGFzc05hbWU9eyd0YWJsZS1sb2FkaW5nJ30+XHJcbiAgICAgICAgICAgICAgICAgICAgPHRyPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8dGQ+e2Ake3RoaXMuaTE4bignbGlzdC5sb2FkaW5nJyl9YH08L3RkPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvdHI+XHJcbiAgICAgICAgICAgICAgICA8L3Rib2R5PlxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICAvKipcclxuICAgICAqIFJlbmRlciB0aGUgbWFudWFsIGZldGNoIG1vZGUgZm9yIHRoZSB0YWJsZS5cclxuICAgICAqIEByZXR1cm4ge0NvbXBvbmVudH0gLSBUaGUgZm9vdGVyIGNvbXBvbmVudCB3aGVuIHRoZSBtb2RlIGlzIG1hbnVhbCBmZXRjaCAsIGEgc2hvdyBtb2RlIGJ1dHRvbiBpcyBzaG93bi5cclxuICAgICAqL1xyXG4gICAgX3JlbmRlck1hbnVhbEZldGNoKCkge1xyXG4gICAgICAgIGNvbnN0IHtpc01hbnVhbEZldGNoLCBoYXNNb3JlRGF0YX0gPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIGlmKGlzTWFudWFsRmV0Y2ggJiYgaGFzTW9yZURhdGEpIHtcclxuICAgICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICAgIDx0Zm9vdCBjbGFzc05hbWU9XCJ0YWJsZS1tYW51YWwtZmV0Y2hcIj5cclxuICAgICAgICAgICAgICAgICAgICA8dHI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBjb2xTcGFuPXtrZXlzKHRoaXMucHJvcHMuY29sdW1ucykubGVuZ3RofT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxCdXR0b24gaGFuZGxlT25DbGljaz17dGhpcy5mZXRjaE5leHRQYWdlfSBsYWJlbD1cImxpc3QuYnV0dG9uLnNob3dNb3JlXCIgdHlwZT1cImJ1dHRvblwiIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdGQ+XHJcbiAgICAgICAgICAgICAgICAgICAgPC90cj5cclxuICAgICAgICAgICAgICAgIDwvdGZvb3Q+XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlbmRlciB0aGUgbGlzdC5cclxuICAgICAqIEByZXR1cm4ge1hNTH0gdGhlIHJlbmRlciBvZiB0aGUgdGFibGUgbGlzdC5cclxuICAgICAqL1xyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIGNvbnN0IFNFTEVDVEFCTEVfQ1NTID0gdGhpcy5wcm9wcy5pc1NlbGVjdGFibGUgPyAnbWRsLWRhdGEtdGFibGUtLXNlbGVjdGFibGUnIDogJyc7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPHRhYmxlIGNsYXNzTmFtZT17YCR7VEFCTEVfQ1NTX0NMQVNTfSAke1NFTEVDVEFCTEVfQ1NTfWB9PlxyXG4gICAgICAgICAgICAgICAge3RoaXMuX3JlbmRlclRhYmxlSGVhZGVyKCl9XHJcbiAgICAgICAgICAgICAgICB7dGhpcy5fcmVuZGVyVGFibGVCb2R5KCl9XHJcbiAgICAgICAgICAgICAgICB7dGhpcy5fcmVuZGVyTG9hZGluZygpfVxyXG4gICAgICAgICAgICAgICAge3RoaXMuX3JlbmRlck1hbnVhbEZldGNoKCl9XHJcbiAgICAgICAgICAgIDwvdGFibGU+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGJ1aWxkZXIodGFibGVNaXhpbik7XHJcbiJdfQ==