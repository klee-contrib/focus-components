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
            { className: TABLE_CSS_CLASS + ' ' + SELECTABLE_CSS, role: 'presentation' },
            this._renderTableHeader(),
            this._renderTableBody(),
            this._renderLoading(),
            this._renderManualFetch()
        );
    }
};

module.exports = (0, _builder2.default)(tableMixin);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJSZWFjdCIsInJlcXVpcmUiLCJvbWl0Iiwia2V5cyIsInJlZHVjZSIsIlRBQkxFX0NTU19DTEFTUyIsIlRBQkxFX0NFTExfQ0xBU1MiLCJpbmZpbml0ZVNjcm9sbE1peGluIiwibWl4aW4iLCJ0cmFuc2xhdGlvbk1peGluIiwicmVmZXJlbmNlTWl4aW4iLCJtZGxCZWhhdmlvdXIiLCJ0YWJsZU1peGluIiwiZGlzcGxheU5hbWUiLCJtaXhpbnMiLCJnZXREZWZhdWx0UHJvcHMiLCJkYXRhIiwiaWRGaWVsZCIsImlzTG9hZGluZyIsIm9wZXJhdGlvbkxpc3QiLCJpc1NlbGVjdGFibGUiLCJwcm9wdHlwZXMiLCJvbkxpbmVDbGljayIsImxpbmVDb21wb25lbnQiLCJpc1JlcXVpcmVkIiwiY29sdW1ucyIsInNvcnRDb2x1bW4iLCJpc2xvYWRpbmciLCJsb2FkZXIiLCJfcmVuZGVyVGFibGVIZWFkZXIiLCJwcm9wcyIsIl9yZW5kZXJDb2x1bW5IZWFkZXIiLCJfc29ydENvbHVtbkFjdGlvbiIsImNvbHVtbiIsIm9yZGVyIiwiY3VycmVudENvbXBvbmVudCIsImV2ZW50IiwicHJldmVudERlZmF1bHQiLCJhY2N1bXVsYXRvciIsImNvbFByb3BlcnRpZXMiLCJuYW1lIiwic29ydCIsImlzRWRpdCIsIm5vU29ydCIsImljb25OYW1lIiwiaWNvbiIsInB1c2giLCJsYWJlbCIsImkxOG4iLCJfcmVuZGVyVGFibGVCb2R5IiwiVGFibGVMaW5lQ29tcG9uZW50IiwiTGluZUNvbXBvbmVudCIsInJlZmVyZW5jZSIsIl9nZXRSZWZlcmVuY2UiLCJtYXAiLCJsaW5lIiwiaWR4Iiwib3RoZXJMaW5lUHJvcHMiLCJ0YWJsZUJvZHlGaW5hbFByb3BzIiwiY2xhc3NOYW1lIiwia2V5IiwiX3JlbmRlckxvYWRpbmciLCJfcmVuZGVyTWFudWFsRmV0Y2giLCJpc01hbnVhbEZldGNoIiwiaGFzTW9yZURhdGEiLCJsZW5ndGgiLCJmZXRjaE5leHRQYWdlIiwicmVuZGVyIiwiU0VMRUNUQUJMRV9DU1MiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7O0FBRUE7Ozs7QUFDQTs7OztBQUtBOztBQWVBOzs7Ozs7Nk5BdkJBOztBQUlBLElBQU1BLFFBQVFDLFFBQVEsT0FBUixDQUFkOztlQUNxQkEsUUFBUSxlQUFSLEM7SUFBZEMsSSxZQUFBQSxJO0lBQU1DLEksWUFBQUEsSTs7Z0JBQ0lGLFFBQVEsbUJBQVIsQztJQUFWRyxNLGFBQUFBLE07QUFDUDs7O0FBR0E7QUFDQSxJQUFNQyxrQkFBa0IsbURBQXhCO0FBQ0EsSUFBTUMsbUJBQW1CLG1DQUF6Qjs7QUFFQTs7QUFFQSxJQUFNQyxzQkFBc0JOLFFBQVEsMEJBQVIsRUFBb0NPLEtBQWhFO0FBQ0EsSUFBTUMsbUJBQW1CUixRQUFRLG1CQUFSLEVBQTZCTyxLQUF0RDtBQUNBLElBQU1FLGlCQUFpQlQsUUFBUSx1Q0FBUixDQUF2QjtBQUNBLElBQU1VLGVBQWVWLFFBQVEsa0NBQVIsQ0FBckI7O0FBRUE7O0FBSUEsSUFBTVcsYUFBYTtBQUNmOzs7QUFHQUMsaUJBQWEsT0FKRTs7QUFNZjs7O0FBR0FDLFlBQVEsQ0FBQ0wsZ0JBQUQsRUFBbUJGLG1CQUFuQixFQUF3Q0csY0FBeEMsRUFBd0RDLFlBQXhELENBVE87QUFVZjtBQUNBSSxtQkFYZSw2QkFXRztBQUNkLGVBQU87QUFDSEMsa0JBQU0sRUFESDtBQUVIQyxxQkFBUyxJQUZOO0FBR0hDLHVCQUFXLEtBSFI7QUFJSEMsMkJBQWUsRUFKWjtBQUtIQywwQkFBYztBQUxYLFNBQVA7QUFPSCxLQW5CYzs7QUFvQmY7QUFDQUMsZUFBVztBQUNQTCxjQUFNLHFCQUFNLE9BQU4sQ0FEQztBQUVQSSxzQkFBYyxxQkFBTSxNQUFOLENBRlA7QUFHUEUscUJBQWEscUJBQU0sTUFBTixDQUhOO0FBSVBMLGlCQUFTLHFCQUFNLFFBQU4sQ0FKRjtBQUtQTSx1QkFBZSxxQkFBTSxNQUFOLEVBQWNDLFVBTHRCO0FBTVBMLHVCQUFlLHFCQUFNLE9BQU4sQ0FOUjtBQU9QTSxpQkFBUyxxQkFBTSxRQUFOLENBUEY7QUFRUEMsb0JBQVkscUJBQU0sTUFBTixDQVJMO0FBU1BDLG1CQUFXLHFCQUFNLE1BQU4sQ0FUSjtBQVVQQyxnQkFBUSxxQkFBTSxNQUFOO0FBVkQsS0FyQkk7QUFpQ2Y7Ozs7QUFJQUMsc0JBckNlLGdDQXFDTTtBQUFBLFlBQ1ZKLE9BRFUsR0FDQyxLQUFLSyxLQUROLENBQ1ZMLE9BRFU7O0FBRWpCLGVBQU87QUFBQTtBQUFBO0FBQU87QUFBQTtBQUFBO0FBQUtyQix1QkFBT3FCLE9BQVAsRUFBZ0IsS0FBS00sbUJBQXJCLEVBQTBDLEVBQTFDO0FBQUw7QUFBUCxTQUFQO0FBQ0gsS0F4Q2M7O0FBeUNmOzs7Ozs7QUFNQUMscUJBL0NlLDZCQStDR0MsTUEvQ0gsRUErQ1dDLEtBL0NYLEVBK0NrQjtBQUM3QixZQUFJQyxtQkFBbUIsSUFBdkI7QUFDQSxlQUFPLFVBQUNDLEtBQUQsRUFBVztBQUNkQSxrQkFBTUMsY0FBTjtBQUNBRiw2QkFBaUJMLEtBQWpCLENBQXVCSixVQUF2QixDQUFrQ08sTUFBbEMsRUFBMENDLEtBQTFDO0FBQ0gsU0FIRDtBQUlILEtBckRjOztBQXNEZjs7Ozs7OztBQU9BSCx1QkE3RGUsK0JBNkRLTyxXQTdETCxFQTZEa0JDLGFBN0RsQixFQTZEaUNDLElBN0RqQyxFQTZEdUM7QUFDbEQsWUFBSUMsYUFBSjtBQUNBLFlBQUksQ0FBQyxLQUFLWCxLQUFMLENBQVdZLE1BQVosSUFBc0IsQ0FBQ0gsY0FBY0ksTUFBekMsRUFBaUQ7QUFDN0MsZ0JBQU1ULFFBQVFLLGNBQWNFLElBQWQsR0FBcUJGLGNBQWNFLElBQW5DLEdBQTBDLEtBQXhEO0FBQ0EsZ0JBQU1HLFdBQVcsVUFBVVYsS0FBVixHQUFrQixlQUFsQixHQUFvQyxpQkFBckQ7QUFDQSxnQkFBTVcsT0FBTztBQUFBO0FBQUEsa0JBQUcsV0FBVSxnQkFBYjtBQUErQkQ7QUFBL0IsYUFBYjtBQUNBSCxtQkFBTztBQUFBO0FBQUEsa0JBQUcsV0FBVSxNQUFiLEVBQW9CLG1CQUFwQixFQUFnQyxhQUFXRCxJQUEzQyxFQUFpRCxNQUFLLEdBQXRELEVBQTBELFNBQVMsS0FBS1IsaUJBQUwsQ0FBdUJRLElBQXZCLEVBQThCLFVBQVVOLEtBQVYsR0FBa0IsTUFBbEIsR0FBMkIsS0FBekQsQ0FBbkU7QUFBc0lXO0FBQXRJLGFBQVA7QUFDSDtBQUNEUCxvQkFBWVEsSUFBWixDQUFpQjtBQUFBO0FBQUEsY0FBSSxXQUFXeEMsZ0JBQWYsRUFBaUMsS0FBS2lDLGNBQWNRLEtBQXBEO0FBQTRELGlCQUFLQyxJQUFMLENBQVVULGNBQWNRLEtBQXhCLENBQTVEO0FBQTRGTjtBQUE1RixTQUFqQjtBQUNBLGVBQU9ILFdBQVA7QUFDSCxLQXZFYzs7QUF3RWY7Ozs7QUFJQVcsb0JBNUVlLDhCQTRFSTtBQUFBOztBQUFBLHFCQUM0QyxLQUFLbkIsS0FEakQ7QUFBQSxZQUNSZCxJQURRLFVBQ1JBLElBRFE7QUFBQSxZQUNha0Msa0JBRGIsVUFDRkMsYUFERTtBQUFBLFlBQ2lDbEMsT0FEakMsVUFDaUNBLE9BRGpDOztBQUVmLFlBQU1tQyxZQUFZLEtBQUtDLGFBQUwsRUFBbEI7QUFDQSxlQUNJO0FBQUE7QUFBQTtBQUNLckMsaUJBQUtzQyxHQUFMLENBQVMsVUFBQ0MsSUFBRCxFQUFPQyxHQUFQLEVBQWU7QUFBQSw4QkFDYSxNQUFLMUIsS0FEbEI7QUFBQSxvQkFDZGQsSUFEYyxXQUNkQSxJQURjO0FBQUEsb0JBQ0x5QyxjQURLOztBQUVyQixvQkFBTUMsc0JBQXNCLG1EQUN4QlIsa0JBRHdCO0FBRXBCUywrQkFBV3JELGdCQUZTO0FBR3BCVSwwQkFBTXVDLElBSGM7QUFJcEJLLHlCQUFLTCxLQUFLdEMsT0FBTCxDQUplO0FBS3BCbUM7QUFMb0IsbUJBTWpCSyxjQU5pQixzQ0FPWEQsR0FQVyxDQUE1QjtBQVFBLHVCQUFPLG9CQUFDLGtCQUFELEVBQXdCRSxtQkFBeEIsQ0FBUDtBQUNILGFBWEE7QUFETCxTQURKO0FBZ0JILEtBL0ZjOztBQWdHZjs7OztBQUlBRyxrQkFwR2UsNEJBb0dFO0FBQUEsc0JBQ2UsS0FBSy9CLEtBRHBCO0FBQUEsWUFDTlosU0FETSxXQUNOQSxTQURNO0FBQUEsWUFDS1UsTUFETCxXQUNLQSxNQURMOztBQUViLFlBQUlWLFNBQUosRUFBZTtBQUNYLGdCQUFJVSxNQUFKLEVBQVk7QUFDUix1QkFBT0EsUUFBUDtBQUNIO0FBQ0QsbUJBQ0k7QUFBQTtBQUFBLGtCQUFPLFdBQVcsZUFBbEI7QUFDSTtBQUFBO0FBQUE7QUFDSTtBQUFBO0FBQUE7QUFBQSw2QkFBUSxLQUFLb0IsSUFBTCxDQUFVLGNBQVY7QUFBUjtBQURKO0FBREosYUFESjtBQU9IO0FBQ0osS0FsSGM7O0FBbUhmOzs7O0FBSUFjLHNCQXZIZSxnQ0F1SE07QUFBQSxzQkFDb0IsS0FBS2hDLEtBRHpCO0FBQUEsWUFDVmlDLGFBRFUsV0FDVkEsYUFEVTtBQUFBLFlBQ0tDLFdBREwsV0FDS0EsV0FETDs7QUFFakIsWUFBSUQsaUJBQWlCQyxXQUFyQixFQUFrQztBQUM5QixtQkFDSTtBQUFBO0FBQUEsa0JBQU8sV0FBVSxvQkFBakI7QUFDSTtBQUFBO0FBQUE7QUFDSTtBQUFBO0FBQUEsMEJBQUksU0FBUzdELEtBQUssS0FBSzJCLEtBQUwsQ0FBV0wsT0FBaEIsRUFBeUJ3QyxNQUF0QztBQUNJLGdFQUFRLGVBQWUsS0FBS0MsYUFBNUIsRUFBMkMsT0FBTSxzQkFBakQsRUFBd0UsTUFBSyxRQUE3RTtBQURKO0FBREo7QUFESixhQURKO0FBU0g7QUFDSixLQXBJYzs7O0FBc0lmOzs7O0FBSUFDLFVBMUllLG9CQTBJTjtBQUNMLFlBQU1DLGlCQUFpQixLQUFLdEMsS0FBTCxDQUFXVixZQUFYLEdBQTBCLDRCQUExQixHQUF5RCxFQUFoRjtBQUNBLGVBQ0k7QUFBQTtBQUFBLGNBQU8sV0FBY2YsZUFBZCxTQUFpQytELGNBQXhDLEVBQTBELE1BQUssY0FBL0Q7QUFDSyxpQkFBS3ZDLGtCQUFMLEVBREw7QUFFSyxpQkFBS29CLGdCQUFMLEVBRkw7QUFHSyxpQkFBS1ksY0FBTCxFQUhMO0FBSUssaUJBQUtDLGtCQUFMO0FBSkwsU0FESjtBQVFIO0FBcEpjLENBQW5COztBQXdKQU8sT0FBT0MsT0FBUCxHQUFpQix1QkFBUTFELFVBQVIsQ0FBakIiLCJmaWxlIjoiaXMtcmVhY3QtY2xhc3MtY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gRGVwZW5kZW5jaWVzXHJcblxyXG5pbXBvcnQgYnVpbGRlciBmcm9tICdmb2N1cy1jb3JlL2NvbXBvbmVudC9idWlsZGVyJztcclxuaW1wb3J0IHR5cGVzIGZyb20gJ2ZvY3VzLWNvcmUvY29tcG9uZW50L3R5cGVzJztcclxuY29uc3QgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xyXG5jb25zdCB7b21pdCwga2V5c30gPSByZXF1aXJlKCdsb2Rhc2gvb2JqZWN0Jyk7XHJcbmNvbnN0IHtyZWR1Y2V9ID0gcmVxdWlyZSgnbG9kYXNoL2NvbGxlY3Rpb24nKTtcclxuLy9BZGQgYSByZWYgdG8gdGhlIHByb3BzIGlmIHRoZSBjb21wb25lbnQgaXMgbm90IHB1cmUgYWRkIG5vdGhpbmcgaW4gdGhlIG90aGVyIGNhc2UuXHJcbmltcG9ydCB7IGFkZFJlZlRvUHJvcHNJZk5vdFB1cmUsIExJTkUgfSBmcm9tICcuLi8uLi91dGlscy9pcy1yZWFjdC1jbGFzcy1jb21wb25lbnQnO1xyXG5cclxuLy8gVGFibGUgY2xhc3MuXHJcbmNvbnN0IFRBQkxFX0NTU19DTEFTUyA9ICdtZGwtZGF0YS10YWJsZSBtZGwtanMtZGF0YS10YWJsZSBtZGwtc2hhZG93LS0yZHAgJztcclxuY29uc3QgVEFCTEVfQ0VMTF9DTEFTUyA9ICdtZGwtZGF0YS10YWJsZV9fY2VsbC0tbm9uLW51bWVyaWMnO1xyXG5cclxuLy8gTWl4aW5zXHJcblxyXG5jb25zdCBpbmZpbml0ZVNjcm9sbE1peGluID0gcmVxdWlyZSgnLi4vbWl4aW4vaW5maW5pdGUtc2Nyb2xsJykubWl4aW47XHJcbmNvbnN0IHRyYW5zbGF0aW9uTWl4aW4gPSByZXF1aXJlKCcuLi8uLi9jb21tb24vaTE4bicpLm1peGluO1xyXG5jb25zdCByZWZlcmVuY2VNaXhpbiA9IHJlcXVpcmUoJy4uLy4uL2NvbW1vbi9taXhpbi9yZWZlcmVuY2UtcHJvcGVydHknKTtcclxuY29uc3QgbWRsQmVoYXZpb3VyID0gcmVxdWlyZSgnLi4vLi4vY29tbW9uL21peGluL21kbC1iZWhhdmlvdXInKTtcclxuXHJcbi8vIENvbXBvbmVudHNcclxuXHJcbmltcG9ydCBCdXR0b24gZnJvbSAnLi4vLi4vY29tcG9uZW50cy9idXR0b24nO1xyXG5cclxuY29uc3QgdGFibGVNaXhpbiA9IHtcclxuICAgIC8qKlxyXG4gICAgICogUmVhY3QgdGFnIG5hbWUuXHJcbiAgICAgKi9cclxuICAgIGRpc3BsYXlOYW1lOiAnVGFibGUnLFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogTWl4aW4gZGVwZW5kYW5jaWVzLlxyXG4gICAgICovXHJcbiAgICBtaXhpbnM6IFt0cmFuc2xhdGlvbk1peGluLCBpbmZpbml0ZVNjcm9sbE1peGluLCByZWZlcmVuY2VNaXhpbiwgbWRsQmVoYXZpb3VyXSxcclxuICAgIC8qKiBpbmhlcml0ZWRkb2MgKi9cclxuICAgIGdldERlZmF1bHRQcm9wcygpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBkYXRhOiBbXSxcclxuICAgICAgICAgICAgaWRGaWVsZDogJ2lkJyxcclxuICAgICAgICAgICAgaXNMb2FkaW5nOiBmYWxzZSxcclxuICAgICAgICAgICAgb3BlcmF0aW9uTGlzdDogW10sXHJcbiAgICAgICAgICAgIGlzU2VsZWN0YWJsZTogZmFsc2VcclxuICAgICAgICB9O1xyXG4gICAgfSxcclxuICAgIC8qKiBpbmhlcml0ZWRkb2MgKi9cclxuICAgIHByb3B0eXBlczoge1xyXG4gICAgICAgIGRhdGE6IHR5cGVzKCdhcnJheScpLFxyXG4gICAgICAgIGlzU2VsZWN0YWJsZTogdHlwZXMoJ2Jvb2wnKSxcclxuICAgICAgICBvbkxpbmVDbGljazogdHlwZXMoJ2Z1bmMnKSxcclxuICAgICAgICBpZEZpZWxkOiB0eXBlcygnc3RyaW5nJyksXHJcbiAgICAgICAgbGluZUNvbXBvbmVudDogdHlwZXMoJ2Z1bmMnKS5pc1JlcXVpcmVkLFxyXG4gICAgICAgIG9wZXJhdGlvbkxpc3Q6IHR5cGVzKCdhcnJheScpLFxyXG4gICAgICAgIGNvbHVtbnM6IHR5cGVzKCdvYmplY3QnKSxcclxuICAgICAgICBzb3J0Q29sdW1uOiB0eXBlcygnZnVuYycpLFxyXG4gICAgICAgIGlzbG9hZGluZzogdHlwZXMoJ2Jvb2wnKSxcclxuICAgICAgICBsb2FkZXI6IHR5cGVzKCdmdW5jJylcclxuICAgIH0sXHJcbiAgICAvKipcclxuICAgICAqIFJlbmRlciB0aGUgdGFibGUgaGVhZGVyLlxyXG4gICAgICogQHJldHVybiB7Q29tcG9uZW50fSAtIFJlbmRlciB0aGUgdGFibGUgaGVhZGVyLlxyXG4gICAgICovXHJcbiAgICBfcmVuZGVyVGFibGVIZWFkZXIoKSB7XHJcbiAgICAgICAgY29uc3Qge2NvbHVtbnN9ID0gdGhpcy5wcm9wcztcclxuICAgICAgICByZXR1cm4gPHRoZWFkPjx0cj57cmVkdWNlKGNvbHVtbnMsIHRoaXMuX3JlbmRlckNvbHVtbkhlYWRlciwgW10pfTwvdHI+PC90aGVhZD47XHJcbiAgICB9LFxyXG4gICAgLyoqXHJcbiAgICAgKiBCdWlsZCBhIGZ1bmN0aW9uIHdoaWNoIGlzIGNhbGxlZCB3aGVuIHRoZXJlIGlzIGEgY2xpY2sgb24gYSB0YWJsZSBjb2x1bW4uXHJcbiAgICAgKiBAcGFyYW0gIHtzdHJpbmd9IGNvbHVtbiAtIENvbHVtbiBuYW1lLlxyXG4gICAgICogQHBhcmFtICB7c3RyaW5nfSBvcmRlciAgLSBUaGUgb3JkZXIgY29uZmlnLlxyXG4gICAgICogQHJldHVybiB7ZnVuY3Rpb259IC0gVGhlIGZ1bmN0aW9uIHRvIGJlIGNhbGxlZCB3aGVuIHRoZXJlIGlzIGEgY2xpY2sgb24gaXQuXHJcbiAgICAgKi9cclxuICAgIF9zb3J0Q29sdW1uQWN0aW9uKGNvbHVtbiwgb3JkZXIpIHtcclxuICAgICAgICBsZXQgY3VycmVudENvbXBvbmVudCA9IHRoaXM7XHJcbiAgICAgICAgcmV0dXJuIChldmVudCkgPT4ge1xyXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICBjdXJyZW50Q29tcG9uZW50LnByb3BzLnNvcnRDb2x1bW4oY29sdW1uLCBvcmRlcik7XHJcbiAgICAgICAgfTtcclxuICAgIH0sXHJcbiAgICAvKipcclxuICAgICAqIFJlbmRlciB0aGUgY29sdW1uIGhlYWRlci5cclxuICAgICAqIEBwYXJhbSB7YXJyYXl9IGFjY3VtdWxhdG9yIC0gVGhlIGFycmF5IGNvLG50YWluaW5nIHRoZSBhY2N1bXVsYXRpbmcgY29tcG9uZW50LlxyXG4gICAgICogQHBhcmFtICB7b2JqZWN0fSBjb2xQcm9wZXJ0aWVzIC0gVGhlIGNvbHVtbiBwcm9wZXJ0aWVzLlxyXG4gICAgICogQHBhcmFtICB7c3RyaW5nfSBuYW1lIC0gVGhlIGNvbHVtbiBuYW1lLlxyXG4gICAgICogQHJldHVybiB7Q29tcG9uZW50fSAtIFRoZSBjb21wb25lbnQgaGVhZGVyLlxyXG4gICAgICovXHJcbiAgICBfcmVuZGVyQ29sdW1uSGVhZGVyKGFjY3VtdWxhdG9yLCBjb2xQcm9wZXJ0aWVzLCBuYW1lKSB7XHJcbiAgICAgICAgbGV0IHNvcnQ7XHJcbiAgICAgICAgaWYgKCF0aGlzLnByb3BzLmlzRWRpdCAmJiAhY29sUHJvcGVydGllcy5ub1NvcnQpIHtcclxuICAgICAgICAgICAgY29uc3Qgb3JkZXIgPSBjb2xQcm9wZXJ0aWVzLnNvcnQgPyBjb2xQcm9wZXJ0aWVzLnNvcnQgOiAnYXNjJztcclxuICAgICAgICAgICAgY29uc3QgaWNvbk5hbWUgPSAnYXNjJyA9PT0gb3JkZXIgPyAnYXJyb3dfZHJvcF91cCcgOiAnYXJyb3dfZHJvcF9kb3duJztcclxuICAgICAgICAgICAgY29uc3QgaWNvbiA9IDxpIGNsYXNzTmFtZT0nbWF0ZXJpYWwtaWNvbnMnPntpY29uTmFtZX08L2k+O1xyXG4gICAgICAgICAgICBzb3J0ID0gPGEgY2xhc3NOYW1lPSdzb3J0JyBkYXRhLWJ5cGFzcyBkYXRhLW5hbWU9e25hbWV9IGhyZWY9JyMnIG9uQ2xpY2s9e3RoaXMuX3NvcnRDb2x1bW5BY3Rpb24obmFtZSwgKCdhc2MnID09PSBvcmRlciA/ICdkZXNjJyA6ICdhc2MnKSl9PntpY29ufTwvYT47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGFjY3VtdWxhdG9yLnB1c2goPHRoIGNsYXNzTmFtZT17VEFCTEVfQ0VMTF9DTEFTU30ga2V5PXtjb2xQcm9wZXJ0aWVzLmxhYmVsfT57dGhpcy5pMThuKGNvbFByb3BlcnRpZXMubGFiZWwpfXtzb3J0fTwvdGg+KTtcclxuICAgICAgICByZXR1cm4gYWNjdW11bGF0b3I7XHJcbiAgICB9LFxyXG4gICAgLyoqXHJcbiAgICAgKiBSZW5kZXIgdGhlIHRib2R5IHRhZyBhbmQgdGhlIGNvbnRlbnQuXHJcbiAgICAgKiBAcmV0dXJuIHtDb21wb25lbnR9IC0gVGhlIGNvbXBvbmVudCBjb250YWluaW5nIHRoZSB0Ym9keS5cclxuICAgICAqL1xyXG4gICAgX3JlbmRlclRhYmxlQm9keSgpIHtcclxuICAgICAgICBjb25zdCB7ZGF0YSwgTGluZUNvbXBvbmVudDogVGFibGVMaW5lQ29tcG9uZW50LCBpZEZpZWxkfSA9IHRoaXMucHJvcHM7XHJcbiAgICAgICAgY29uc3QgcmVmZXJlbmNlID0gdGhpcy5fZ2V0UmVmZXJlbmNlKCk7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPHRib2R5PlxyXG4gICAgICAgICAgICAgICAge2RhdGEubWFwKChsaW5lLCBpZHgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCB7ZGF0YSwgLi4ub3RoZXJMaW5lUHJvcHN9ID0gdGhpcy5wcm9wcztcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCB0YWJsZUJvZHlGaW5hbFByb3BzID0gYWRkUmVmVG9Qcm9wc0lmTm90UHVyZShcclxuICAgICAgICAgICAgICAgICAgICAgICAgVGFibGVMaW5lQ29tcG9uZW50LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU6IFRBQkxFX0NFTExfQ0xBU1MsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiBsaW5lLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5OiBsaW5lW2lkRmllbGRdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmZXJlbmNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLi4ub3RoZXJMaW5lUHJvcHNcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSwgYCR7TElORX0ke2lkeH1gKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gPFRhYmxlTGluZUNvbXBvbmVudCB7Li4udGFibGVCb2R5RmluYWxQcm9wc30gLz47XHJcbiAgICAgICAgICAgICAgICB9KX1cclxuICAgICAgICAgICAgPC90Ym9keT5cclxuICAgICAgICApO1xyXG4gICAgfSxcclxuICAgIC8qKlxyXG4gICAgICogUmVuZGVyIHRoZSBsb2FkaW5nIHRhYmxlXHJcbiAgICAgKiBAcmV0dXJuIHtDb21wb25lbnR9IC0gVGhlIHRhYmxlIGluIHRoZSBsb2FkaW5nIG1vZGUuXHJcbiAgICAgKi9cclxuICAgIF9yZW5kZXJMb2FkaW5nKCkge1xyXG4gICAgICAgIGNvbnN0IHtpc0xvYWRpbmcsIGxvYWRlcn0gPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIGlmIChpc0xvYWRpbmcpIHtcclxuICAgICAgICAgICAgaWYgKGxvYWRlcikge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGxvYWRlcigpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICA8dGJvZHkgY2xhc3NOYW1lPXsndGFibGUtbG9hZGluZyd9PlxyXG4gICAgICAgICAgICAgICAgICAgIDx0cj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHRkPntgJHt0aGlzLmkxOG4oJ2xpc3QubG9hZGluZycpfWB9PC90ZD5cclxuICAgICAgICAgICAgICAgICAgICA8L3RyPlxyXG4gICAgICAgICAgICAgICAgPC90Ym9keT5cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgLyoqXHJcbiAgICAgKiBSZW5kZXIgdGhlIG1hbnVhbCBmZXRjaCBtb2RlIGZvciB0aGUgdGFibGUuXHJcbiAgICAgKiBAcmV0dXJuIHtDb21wb25lbnR9IC0gVGhlIGZvb3RlciBjb21wb25lbnQgd2hlbiB0aGUgbW9kZSBpcyBtYW51YWwgZmV0Y2ggLCBhIHNob3cgbW9kZSBidXR0b24gaXMgc2hvd24uXHJcbiAgICAgKi9cclxuICAgIF9yZW5kZXJNYW51YWxGZXRjaCgpIHtcclxuICAgICAgICBjb25zdCB7aXNNYW51YWxGZXRjaCwgaGFzTW9yZURhdGF9ID0gdGhpcy5wcm9wcztcclxuICAgICAgICBpZiAoaXNNYW51YWxGZXRjaCAmJiBoYXNNb3JlRGF0YSkge1xyXG4gICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgICAgPHRmb290IGNsYXNzTmFtZT1cInRhYmxlLW1hbnVhbC1mZXRjaFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDx0cj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHRkIGNvbFNwYW49e2tleXModGhpcy5wcm9wcy5jb2x1bW5zKS5sZW5ndGh9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPEJ1dHRvbiBoYW5kbGVPbkNsaWNrPXt0aGlzLmZldGNoTmV4dFBhZ2V9IGxhYmVsPVwibGlzdC5idXR0b24uc2hvd01vcmVcIiB0eXBlPVwiYnV0dG9uXCIgLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC90ZD5cclxuICAgICAgICAgICAgICAgICAgICA8L3RyPlxyXG4gICAgICAgICAgICAgICAgPC90Zm9vdD5cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVuZGVyIHRoZSBsaXN0LlxyXG4gICAgICogQHJldHVybiB7WE1MfSB0aGUgcmVuZGVyIG9mIHRoZSB0YWJsZSBsaXN0LlxyXG4gICAgICovXHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgY29uc3QgU0VMRUNUQUJMRV9DU1MgPSB0aGlzLnByb3BzLmlzU2VsZWN0YWJsZSA/ICdtZGwtZGF0YS10YWJsZS0tc2VsZWN0YWJsZScgOiAnJztcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8dGFibGUgY2xhc3NOYW1lPXtgJHtUQUJMRV9DU1NfQ0xBU1N9ICR7U0VMRUNUQUJMRV9DU1N9YH0gcm9sZT0ncHJlc2VudGF0aW9uJz5cclxuICAgICAgICAgICAgICAgIHt0aGlzLl9yZW5kZXJUYWJsZUhlYWRlcigpfVxyXG4gICAgICAgICAgICAgICAge3RoaXMuX3JlbmRlclRhYmxlQm9keSgpfVxyXG4gICAgICAgICAgICAgICAge3RoaXMuX3JlbmRlckxvYWRpbmcoKX1cclxuICAgICAgICAgICAgICAgIHt0aGlzLl9yZW5kZXJNYW51YWxGZXRjaCgpfVxyXG4gICAgICAgICAgICA8L3RhYmxlPlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBidWlsZGVyKHRhYmxlTWl4aW4pO1xyXG4iXX0=