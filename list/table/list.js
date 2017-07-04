'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.mixin = exports.component = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _builder = require('focus-core/component/builder');

var _builder2 = _interopRequireDefault(_builder);

var _types = require('focus-core/component/types');

var _types2 = _interopRequireDefault(_types);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash');

var _translation = require('focus-core/translation');

var _isReactClassComponent = require('../../utils/is-react-class-component');

var _infiniteScroll = require('../mixin/infinite-scroll');

var _referenceProperty = require('../../common/mixin/reference-property');

var _referenceProperty2 = _interopRequireDefault(_referenceProperty);

var _mdlBehaviour = require('../../common/mixin/mdl-behaviour');

var _mdlBehaviour2 = _interopRequireDefault(_mdlBehaviour);

var _button = require('../../components/button');

var _button2 = _interopRequireDefault(_button);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; } // Dependencies

//Add a ref to the props if the component is not pure add nothing in the other case.


// Table class.
var TABLE_CSS_CLASS = 'mdl-data-table mdl-js-data-table mdl-shadow--2dp ';
var TABLE_CELL_CLASS = 'mdl-data-table__cell--non-numeric';

// Mixins

// Components

var tableMixin = {
    /**
     * React tag name.
     */
    displayName: 'Table',

    /**
     * Mixin dependancies.
     */
    mixins: [_infiniteScroll.mixin, _referenceProperty2.default, _mdlBehaviour2.default],
    /** inheriteddoc */
    getDefaultProps: function getDefaultProps() {
        return {
            data: [],
            idField: 'id',
            isLoading: false,
            operationList: [],
            isSelectable: false,
            dataTable: false,
            infosSortIcon: false
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
        loader: (0, _types2.default)('func'),
        dataTable: (0, _types2.default)('bool'),
        captionTitle: (0, _types2.default)('array'),
        infosSortIcon: (0, _types2.default)('bool')
    },
    /**
     * Render the table header.
     * @return {Component} - Render the table header.
     */
    _renderTableHeader: function _renderTableHeader() {
        var columns = this.props.columns;

        return _react2.default.createElement(
            'thead',
            null,
            _react2.default.createElement(
                'tr',
                null,
                (0, _lodash.reduce)(columns, this._renderColumnHeader, [])
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
            var icon = _react2.default.createElement(
                'i',
                { className: 'material-icons' },
                iconName
            );
            if (this.props.infosSortIcon) {
                var descriptionSort = _react2.default.createElement(
                    'span',
                    null,
                    'Icone de tri'
                );
                sort = _react2.default.createElement(
                    'a',
                    { className: 'sort', 'data-bypass': true, 'data-name': name, href: '#', onClick: this._sortColumnAction(name, 'asc' === order ? 'desc' : 'asc') },
                    icon,
                    ' ',
                    descriptionSort
                );
            } else {
                sort = _react2.default.createElement(
                    'a',
                    { className: 'sort', 'data-bypass': true, 'data-name': name, href: '#', onClick: this._sortColumnAction(name, 'asc' === order ? 'desc' : 'asc') },
                    icon
                );
            }
        }
        accumulator.push(_react2.default.createElement(
            'th',
            { scope: 'col', className: TABLE_CELL_CLASS, key: colProperties.label },
            (0, _translation.translate)(colProperties.label),
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
        return _react2.default.createElement(
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
                return _react2.default.createElement(TableLineComponent, tableBodyFinalProps);
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
            return _react2.default.createElement(
                'tbody',
                { className: 'table-loading' },
                _react2.default.createElement(
                    'tr',
                    null,
                    _react2.default.createElement(
                        'td',
                        null,
                        '' + (0, _translation.translate)('list.loading')
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
            return _react2.default.createElement(
                'tfoot',
                { className: 'table-manual-fetch' },
                _react2.default.createElement(
                    'tr',
                    null,
                    _react2.default.createElement(
                        'td',
                        { colSpan: (0, _lodash.keys)(this.props.columns).length },
                        _react2.default.createElement(_button2.default, { handleOnClick: this.fetchNextPage, label: 'list.button.showMore', type: 'button' })
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
        return _react2.default.createElement(
            'table',
            { className: TABLE_CSS_CLASS + ' ' + SELECTABLE_CSS, role: 'presentation' },
            this.props.dataTable && _react2.default.createElement(
                'caption',
                null,
                this.props.captionTitle
            ),
            this._renderTableHeader(),
            this._renderTableBody(),
            this._renderLoading(),
            this._renderManualFetch()
        );
    }
};

var builtComp = (0, _builder2.default)(tableMixin);
var component = builtComp.component,
    mixin = builtComp.mixin;
exports.component = component;
exports.mixin = mixin;
exports.default = builtComp;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJUQUJMRV9DU1NfQ0xBU1MiLCJUQUJMRV9DRUxMX0NMQVNTIiwidGFibGVNaXhpbiIsImRpc3BsYXlOYW1lIiwibWl4aW5zIiwiZ2V0RGVmYXVsdFByb3BzIiwiZGF0YSIsImlkRmllbGQiLCJpc0xvYWRpbmciLCJvcGVyYXRpb25MaXN0IiwiaXNTZWxlY3RhYmxlIiwiZGF0YVRhYmxlIiwiaW5mb3NTb3J0SWNvbiIsInByb3B0eXBlcyIsIm9uTGluZUNsaWNrIiwibGluZUNvbXBvbmVudCIsImlzUmVxdWlyZWQiLCJjb2x1bW5zIiwic29ydENvbHVtbiIsImlzbG9hZGluZyIsImxvYWRlciIsImNhcHRpb25UaXRsZSIsIl9yZW5kZXJUYWJsZUhlYWRlciIsInByb3BzIiwiX3JlbmRlckNvbHVtbkhlYWRlciIsIl9zb3J0Q29sdW1uQWN0aW9uIiwiY29sdW1uIiwib3JkZXIiLCJjdXJyZW50Q29tcG9uZW50IiwiZXZlbnQiLCJwcmV2ZW50RGVmYXVsdCIsImFjY3VtdWxhdG9yIiwiY29sUHJvcGVydGllcyIsIm5hbWUiLCJzb3J0IiwiaXNFZGl0Iiwibm9Tb3J0IiwiaWNvbk5hbWUiLCJpY29uIiwiZGVzY3JpcHRpb25Tb3J0IiwicHVzaCIsImxhYmVsIiwiX3JlbmRlclRhYmxlQm9keSIsIlRhYmxlTGluZUNvbXBvbmVudCIsIkxpbmVDb21wb25lbnQiLCJyZWZlcmVuY2UiLCJfZ2V0UmVmZXJlbmNlIiwibWFwIiwibGluZSIsImlkeCIsIm90aGVyTGluZVByb3BzIiwidGFibGVCb2R5RmluYWxQcm9wcyIsImNsYXNzTmFtZSIsImtleSIsIl9yZW5kZXJMb2FkaW5nIiwiX3JlbmRlck1hbnVhbEZldGNoIiwiaXNNYW51YWxGZXRjaCIsImhhc01vcmVEYXRhIiwibGVuZ3RoIiwiZmV0Y2hOZXh0UGFnZSIsInJlbmRlciIsIlNFTEVDVEFCTEVfQ1NTIiwiYnVpbHRDb21wIiwiY29tcG9uZW50IiwibWl4aW4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUVBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOztBQUVBOztBQUVBOztBQVFBOztBQUNBOzs7O0FBQ0E7Ozs7QUFJQTs7Ozs7OzZOQXZCQTs7QUFRQTs7O0FBR0E7QUFDQSxJQUFNQSxrQkFBa0IsbURBQXhCO0FBQ0EsSUFBTUMsbUJBQW1CLG1DQUF6Qjs7QUFFQTs7QUFNQTs7QUFJQSxJQUFNQyxhQUFhO0FBQ2Y7OztBQUdBQyxpQkFBYSxPQUpFOztBQU1mOzs7QUFHQUMsWUFBUSw0RUFUTztBQVVmO0FBQ0FDLG1CQVhlLDZCQVdHO0FBQ2QsZUFBTztBQUNIQyxrQkFBTSxFQURIO0FBRUhDLHFCQUFTLElBRk47QUFHSEMsdUJBQVcsS0FIUjtBQUlIQywyQkFBZSxFQUpaO0FBS0hDLDBCQUFjLEtBTFg7QUFNSEMsdUJBQVcsS0FOUjtBQU9IQywyQkFBZTtBQVBaLFNBQVA7QUFTSCxLQXJCYzs7QUFzQmY7QUFDQUMsZUFBVztBQUNQUCxjQUFNLHFCQUFNLE9BQU4sQ0FEQztBQUVQSSxzQkFBYyxxQkFBTSxNQUFOLENBRlA7QUFHUEkscUJBQWEscUJBQU0sTUFBTixDQUhOO0FBSVBQLGlCQUFTLHFCQUFNLFFBQU4sQ0FKRjtBQUtQUSx1QkFBZSxxQkFBTSxNQUFOLEVBQWNDLFVBTHRCO0FBTVBQLHVCQUFlLHFCQUFNLE9BQU4sQ0FOUjtBQU9QUSxpQkFBUyxxQkFBTSxRQUFOLENBUEY7QUFRUEMsb0JBQVkscUJBQU0sTUFBTixDQVJMO0FBU1BDLG1CQUFXLHFCQUFNLE1BQU4sQ0FUSjtBQVVQQyxnQkFBUSxxQkFBTSxNQUFOLENBVkQ7QUFXUFQsbUJBQVcscUJBQU0sTUFBTixDQVhKO0FBWVBVLHNCQUFjLHFCQUFNLE9BQU4sQ0FaUDtBQWFQVCx1QkFBZSxxQkFBTSxNQUFOO0FBYlIsS0F2Qkk7QUFzQ2Y7Ozs7QUFJQVUsc0JBMUNlLGdDQTBDTTtBQUFBLFlBQ1ZMLE9BRFUsR0FDQyxLQUFLTSxLQUROLENBQ1ZOLE9BRFU7O0FBRWpCLGVBQU87QUFBQTtBQUFBO0FBQU87QUFBQTtBQUFBO0FBQUssb0NBQU9BLE9BQVAsRUFBZ0IsS0FBS08sbUJBQXJCLEVBQTBDLEVBQTFDO0FBQUw7QUFBUCxTQUFQO0FBQ0gsS0E3Q2M7O0FBOENmOzs7Ozs7QUFNQUMscUJBcERlLDZCQW9ER0MsTUFwREgsRUFvRFdDLEtBcERYLEVBb0RrQjtBQUM3QixZQUFJQyxtQkFBbUIsSUFBdkI7QUFDQSxlQUFPLFVBQUNDLEtBQUQsRUFBVztBQUNkQSxrQkFBTUMsY0FBTjtBQUNBRiw2QkFBaUJMLEtBQWpCLENBQXVCTCxVQUF2QixDQUFrQ1EsTUFBbEMsRUFBMENDLEtBQTFDO0FBQ0gsU0FIRDtBQUlILEtBMURjOztBQTJEZjs7Ozs7OztBQU9BSCx1QkFsRWUsK0JBa0VLTyxXQWxFTCxFQWtFa0JDLGFBbEVsQixFQWtFaUNDLElBbEVqQyxFQWtFdUM7QUFDbEQsWUFBSUMsYUFBSjtBQUNBLFlBQUksQ0FBQyxLQUFLWCxLQUFMLENBQVdZLE1BQVosSUFBc0IsQ0FBQ0gsY0FBY0ksTUFBekMsRUFBaUQ7QUFDN0MsZ0JBQU1ULFFBQVFLLGNBQWNFLElBQWQsR0FBcUJGLGNBQWNFLElBQW5DLEdBQTBDLEtBQXhEO0FBQ0EsZ0JBQU1HLFdBQVcsVUFBVVYsS0FBVixHQUFrQixlQUFsQixHQUFvQyxpQkFBckQ7QUFDQSxnQkFBTVcsT0FBTztBQUFBO0FBQUEsa0JBQUcsV0FBVSxnQkFBYjtBQUErQkQ7QUFBL0IsYUFBYjtBQUNBLGdCQUFJLEtBQUtkLEtBQUwsQ0FBV1gsYUFBZixFQUE4QjtBQUMxQixvQkFBTTJCLGtCQUFrQjtBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQUF4QjtBQUNBTCx1QkFBTztBQUFBO0FBQUEsc0JBQUcsV0FBVSxNQUFiLEVBQW9CLG1CQUFwQixFQUFnQyxhQUFXRCxJQUEzQyxFQUFpRCxNQUFLLEdBQXRELEVBQTBELFNBQVMsS0FBS1IsaUJBQUwsQ0FBdUJRLElBQXZCLEVBQThCLFVBQVVOLEtBQVYsR0FBa0IsTUFBbEIsR0FBMkIsS0FBekQsQ0FBbkU7QUFBc0lXLHdCQUF0STtBQUFBO0FBQTZJQztBQUE3SSxpQkFBUDtBQUNILGFBSEQsTUFHTztBQUNITCx1QkFBTztBQUFBO0FBQUEsc0JBQUcsV0FBVSxNQUFiLEVBQW9CLG1CQUFwQixFQUFnQyxhQUFXRCxJQUEzQyxFQUFpRCxNQUFLLEdBQXRELEVBQTBELFNBQVMsS0FBS1IsaUJBQUwsQ0FBdUJRLElBQXZCLEVBQThCLFVBQVVOLEtBQVYsR0FBa0IsTUFBbEIsR0FBMkIsS0FBekQsQ0FBbkU7QUFBc0lXO0FBQXRJLGlCQUFQO0FBQ0g7QUFFSjtBQUNEUCxvQkFBWVMsSUFBWixDQUFpQjtBQUFBO0FBQUEsY0FBSSxPQUFNLEtBQVYsRUFBZ0IsV0FBV3ZDLGdCQUEzQixFQUE2QyxLQUFLK0IsY0FBY1MsS0FBaEU7QUFBd0Usd0NBQVVULGNBQWNTLEtBQXhCLENBQXhFO0FBQXdHUDtBQUF4RyxTQUFqQjtBQUNBLGVBQU9ILFdBQVA7QUFDSCxLQWxGYzs7QUFtRmY7Ozs7QUFJQVcsb0JBdkZlLDhCQXVGSTtBQUFBOztBQUFBLHFCQUM0QyxLQUFLbkIsS0FEakQ7QUFBQSxZQUNSakIsSUFEUSxVQUNSQSxJQURRO0FBQUEsWUFDYXFDLGtCQURiLFVBQ0ZDLGFBREU7QUFBQSxZQUNpQ3JDLE9BRGpDLFVBQ2lDQSxPQURqQzs7QUFFZixZQUFNc0MsWUFBWSxLQUFLQyxhQUFMLEVBQWxCO0FBQ0EsZUFDSTtBQUFBO0FBQUE7QUFDS3hDLGlCQUFLeUMsR0FBTCxDQUFTLFVBQUNDLElBQUQsRUFBT0MsR0FBUCxFQUFlO0FBQUEsOEJBQ2EsTUFBSzFCLEtBRGxCO0FBQUEsb0JBQ2RqQixJQURjLFdBQ2RBLElBRGM7QUFBQSxvQkFDTDRDLGNBREs7O0FBRXJCLG9CQUFNQyxzQkFBc0IsbURBQ3hCUixrQkFEd0I7QUFFcEJTLCtCQUFXbkQsZ0JBRlM7QUFHcEJLLDBCQUFNMEMsSUFIYztBQUlwQksseUJBQUtMLEtBQUt6QyxPQUFMLENBSmU7QUFLcEJzQztBQUxvQixtQkFNakJLLGNBTmlCLHNDQU9YRCxHQVBXLENBQTVCO0FBUUEsdUJBQU8sOEJBQUMsa0JBQUQsRUFBd0JFLG1CQUF4QixDQUFQO0FBQ0gsYUFYQTtBQURMLFNBREo7QUFnQkgsS0ExR2M7O0FBMkdmOzs7O0FBSUFHLGtCQS9HZSw0QkErR0U7QUFBQSxzQkFDZSxLQUFLL0IsS0FEcEI7QUFBQSxZQUNOZixTQURNLFdBQ05BLFNBRE07QUFBQSxZQUNLWSxNQURMLFdBQ0tBLE1BREw7O0FBRWIsWUFBSVosU0FBSixFQUFlO0FBQ1gsZ0JBQUlZLE1BQUosRUFBWTtBQUNSLHVCQUFPQSxRQUFQO0FBQ0g7QUFDRCxtQkFDSTtBQUFBO0FBQUEsa0JBQU8sV0FBVyxlQUFsQjtBQUNJO0FBQUE7QUFBQTtBQUNJO0FBQUE7QUFBQTtBQUFBLDZCQUFRLDRCQUFVLGNBQVY7QUFBUjtBQURKO0FBREosYUFESjtBQU9IO0FBQ0osS0E3SGM7O0FBOEhmOzs7O0FBSUFtQyxzQkFsSWUsZ0NBa0lNO0FBQUEsc0JBQ29CLEtBQUtoQyxLQUR6QjtBQUFBLFlBQ1ZpQyxhQURVLFdBQ1ZBLGFBRFU7QUFBQSxZQUNLQyxXQURMLFdBQ0tBLFdBREw7O0FBRWpCLFlBQUlELGlCQUFpQkMsV0FBckIsRUFBa0M7QUFDOUIsbUJBQ0k7QUFBQTtBQUFBLGtCQUFPLFdBQVUsb0JBQWpCO0FBQ0k7QUFBQTtBQUFBO0FBQ0k7QUFBQTtBQUFBLDBCQUFJLFNBQVMsa0JBQUssS0FBS2xDLEtBQUwsQ0FBV04sT0FBaEIsRUFBeUJ5QyxNQUF0QztBQUNJLDBFQUFRLGVBQWUsS0FBS0MsYUFBNUIsRUFBMkMsT0FBTSxzQkFBakQsRUFBd0UsTUFBSyxRQUE3RTtBQURKO0FBREo7QUFESixhQURKO0FBU0g7QUFDSixLQS9JYzs7O0FBaUpmOzs7O0FBSUFDLFVBckplLG9CQXFKTjtBQUNMLFlBQU1DLGlCQUFpQixLQUFLdEMsS0FBTCxDQUFXYixZQUFYLEdBQTBCLDRCQUExQixHQUF5RCxFQUFoRjtBQUNBLGVBQ0k7QUFBQTtBQUFBLGNBQU8sV0FBY1YsZUFBZCxTQUFpQzZELGNBQXhDLEVBQTBELE1BQUssY0FBL0Q7QUFDSyxpQkFBS3RDLEtBQUwsQ0FBV1osU0FBWCxJQUNHO0FBQUE7QUFBQTtBQUFVLHFCQUFLWSxLQUFMLENBQVdGO0FBQXJCLGFBRlI7QUFJSyxpQkFBS0Msa0JBQUwsRUFKTDtBQUtLLGlCQUFLb0IsZ0JBQUwsRUFMTDtBQU1LLGlCQUFLWSxjQUFMLEVBTkw7QUFPSyxpQkFBS0Msa0JBQUw7QUFQTCxTQURKO0FBV0g7QUFsS2MsQ0FBbkI7O0FBc0tBLElBQU1PLFlBQVksdUJBQVE1RCxVQUFSLENBQWxCO0lBQ082RCxTLEdBQW9CRCxTLENBQXBCQyxTO0lBQVdDLEssR0FBU0YsUyxDQUFURSxLO1FBR2RELFMsR0FBQUEsUztRQUNBQyxLLEdBQUFBLEs7a0JBRVdGLFMiLCJmaWxlIjoiaXMtcmVhY3QtY2xhc3MtY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gRGVwZW5kZW5jaWVzXHJcblxyXG5pbXBvcnQgYnVpbGRlciBmcm9tICdmb2N1cy1jb3JlL2NvbXBvbmVudC9idWlsZGVyJztcclxuaW1wb3J0IHR5cGVzIGZyb20gJ2ZvY3VzLWNvcmUvY29tcG9uZW50L3R5cGVzJztcclxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsga2V5cywgcmVkdWNlIH0gZnJvbSAnbG9kYXNoJztcclxuXHJcbmltcG9ydCB7IHRyYW5zbGF0ZSB9IGZyb20gJ2ZvY3VzLWNvcmUvdHJhbnNsYXRpb24nO1xyXG4vL0FkZCBhIHJlZiB0byB0aGUgcHJvcHMgaWYgdGhlIGNvbXBvbmVudCBpcyBub3QgcHVyZSBhZGQgbm90aGluZyBpbiB0aGUgb3RoZXIgY2FzZS5cclxuaW1wb3J0IHsgYWRkUmVmVG9Qcm9wc0lmTm90UHVyZSwgTElORSB9IGZyb20gJy4uLy4uL3V0aWxzL2lzLXJlYWN0LWNsYXNzLWNvbXBvbmVudCc7XHJcblxyXG4vLyBUYWJsZSBjbGFzcy5cclxuY29uc3QgVEFCTEVfQ1NTX0NMQVNTID0gJ21kbC1kYXRhLXRhYmxlIG1kbC1qcy1kYXRhLXRhYmxlIG1kbC1zaGFkb3ctLTJkcCAnO1xyXG5jb25zdCBUQUJMRV9DRUxMX0NMQVNTID0gJ21kbC1kYXRhLXRhYmxlX19jZWxsLS1ub24tbnVtZXJpYyc7XHJcblxyXG4vLyBNaXhpbnNcclxuXHJcbmltcG9ydCB7IG1peGluIGFzIGluZmluaXRlU2Nyb2xsTWl4aW4gfSBmcm9tICcuLi9taXhpbi9pbmZpbml0ZS1zY3JvbGwnO1xyXG5pbXBvcnQgcmVmZXJlbmNlTWl4aW4gZnJvbSAnLi4vLi4vY29tbW9uL21peGluL3JlZmVyZW5jZS1wcm9wZXJ0eSc7XHJcbmltcG9ydCBtZGxCZWhhdmlvdXIgZnJvbSAnLi4vLi4vY29tbW9uL21peGluL21kbC1iZWhhdmlvdXInO1xyXG5cclxuLy8gQ29tcG9uZW50c1xyXG5cclxuaW1wb3J0IEJ1dHRvbiBmcm9tICcuLi8uLi9jb21wb25lbnRzL2J1dHRvbic7XHJcblxyXG5jb25zdCB0YWJsZU1peGluID0ge1xyXG4gICAgLyoqXHJcbiAgICAgKiBSZWFjdCB0YWcgbmFtZS5cclxuICAgICAqL1xyXG4gICAgZGlzcGxheU5hbWU6ICdUYWJsZScsXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBNaXhpbiBkZXBlbmRhbmNpZXMuXHJcbiAgICAgKi9cclxuICAgIG1peGluczogW2luZmluaXRlU2Nyb2xsTWl4aW4sIHJlZmVyZW5jZU1peGluLCBtZGxCZWhhdmlvdXJdLFxyXG4gICAgLyoqIGluaGVyaXRlZGRvYyAqL1xyXG4gICAgZ2V0RGVmYXVsdFByb3BzKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGRhdGE6IFtdLFxyXG4gICAgICAgICAgICBpZEZpZWxkOiAnaWQnLFxyXG4gICAgICAgICAgICBpc0xvYWRpbmc6IGZhbHNlLFxyXG4gICAgICAgICAgICBvcGVyYXRpb25MaXN0OiBbXSxcclxuICAgICAgICAgICAgaXNTZWxlY3RhYmxlOiBmYWxzZSxcclxuICAgICAgICAgICAgZGF0YVRhYmxlOiBmYWxzZSxcclxuICAgICAgICAgICAgaW5mb3NTb3J0SWNvbjogZmFsc2VcclxuICAgICAgICB9O1xyXG4gICAgfSxcclxuICAgIC8qKiBpbmhlcml0ZWRkb2MgKi9cclxuICAgIHByb3B0eXBlczoge1xyXG4gICAgICAgIGRhdGE6IHR5cGVzKCdhcnJheScpLFxyXG4gICAgICAgIGlzU2VsZWN0YWJsZTogdHlwZXMoJ2Jvb2wnKSxcclxuICAgICAgICBvbkxpbmVDbGljazogdHlwZXMoJ2Z1bmMnKSxcclxuICAgICAgICBpZEZpZWxkOiB0eXBlcygnc3RyaW5nJyksXHJcbiAgICAgICAgbGluZUNvbXBvbmVudDogdHlwZXMoJ2Z1bmMnKS5pc1JlcXVpcmVkLFxyXG4gICAgICAgIG9wZXJhdGlvbkxpc3Q6IHR5cGVzKCdhcnJheScpLFxyXG4gICAgICAgIGNvbHVtbnM6IHR5cGVzKCdvYmplY3QnKSxcclxuICAgICAgICBzb3J0Q29sdW1uOiB0eXBlcygnZnVuYycpLFxyXG4gICAgICAgIGlzbG9hZGluZzogdHlwZXMoJ2Jvb2wnKSxcclxuICAgICAgICBsb2FkZXI6IHR5cGVzKCdmdW5jJyksXHJcbiAgICAgICAgZGF0YVRhYmxlOiB0eXBlcygnYm9vbCcpLFxyXG4gICAgICAgIGNhcHRpb25UaXRsZTogdHlwZXMoJ2FycmF5JyksXHJcbiAgICAgICAgaW5mb3NTb3J0SWNvbjogdHlwZXMoJ2Jvb2wnKVxyXG4gICAgfSxcclxuICAgIC8qKlxyXG4gICAgICogUmVuZGVyIHRoZSB0YWJsZSBoZWFkZXIuXHJcbiAgICAgKiBAcmV0dXJuIHtDb21wb25lbnR9IC0gUmVuZGVyIHRoZSB0YWJsZSBoZWFkZXIuXHJcbiAgICAgKi9cclxuICAgIF9yZW5kZXJUYWJsZUhlYWRlcigpIHtcclxuICAgICAgICBjb25zdCB7Y29sdW1uc30gPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIHJldHVybiA8dGhlYWQ+PHRyPntyZWR1Y2UoY29sdW1ucywgdGhpcy5fcmVuZGVyQ29sdW1uSGVhZGVyLCBbXSl9PC90cj48L3RoZWFkPjtcclxuICAgIH0sXHJcbiAgICAvKipcclxuICAgICAqIEJ1aWxkIGEgZnVuY3Rpb24gd2hpY2ggaXMgY2FsbGVkIHdoZW4gdGhlcmUgaXMgYSBjbGljayBvbiBhIHRhYmxlIGNvbHVtbi5cclxuICAgICAqIEBwYXJhbSAge3N0cmluZ30gY29sdW1uIC0gQ29sdW1uIG5hbWUuXHJcbiAgICAgKiBAcGFyYW0gIHtzdHJpbmd9IG9yZGVyICAtIFRoZSBvcmRlciBjb25maWcuXHJcbiAgICAgKiBAcmV0dXJuIHtmdW5jdGlvbn0gLSBUaGUgZnVuY3Rpb24gdG8gYmUgY2FsbGVkIHdoZW4gdGhlcmUgaXMgYSBjbGljayBvbiBpdC5cclxuICAgICAqL1xyXG4gICAgX3NvcnRDb2x1bW5BY3Rpb24oY29sdW1uLCBvcmRlcikge1xyXG4gICAgICAgIGxldCBjdXJyZW50Q29tcG9uZW50ID0gdGhpcztcclxuICAgICAgICByZXR1cm4gKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIGN1cnJlbnRDb21wb25lbnQucHJvcHMuc29ydENvbHVtbihjb2x1bW4sIG9yZGVyKTtcclxuICAgICAgICB9O1xyXG4gICAgfSxcclxuICAgIC8qKlxyXG4gICAgICogUmVuZGVyIHRoZSBjb2x1bW4gaGVhZGVyLlxyXG4gICAgICogQHBhcmFtIHthcnJheX0gYWNjdW11bGF0b3IgLSBUaGUgYXJyYXkgY28sbnRhaW5pbmcgdGhlIGFjY3VtdWxhdGluZyBjb21wb25lbnQuXHJcbiAgICAgKiBAcGFyYW0gIHtvYmplY3R9IGNvbFByb3BlcnRpZXMgLSBUaGUgY29sdW1uIHByb3BlcnRpZXMuXHJcbiAgICAgKiBAcGFyYW0gIHtzdHJpbmd9IG5hbWUgLSBUaGUgY29sdW1uIG5hbWUuXHJcbiAgICAgKiBAcmV0dXJuIHtDb21wb25lbnR9IC0gVGhlIGNvbXBvbmVudCBoZWFkZXIuXHJcbiAgICAgKi9cclxuICAgIF9yZW5kZXJDb2x1bW5IZWFkZXIoYWNjdW11bGF0b3IsIGNvbFByb3BlcnRpZXMsIG5hbWUpIHtcclxuICAgICAgICBsZXQgc29ydDtcclxuICAgICAgICBpZiAoIXRoaXMucHJvcHMuaXNFZGl0ICYmICFjb2xQcm9wZXJ0aWVzLm5vU29ydCkge1xyXG4gICAgICAgICAgICBjb25zdCBvcmRlciA9IGNvbFByb3BlcnRpZXMuc29ydCA/IGNvbFByb3BlcnRpZXMuc29ydCA6ICdhc2MnO1xyXG4gICAgICAgICAgICBjb25zdCBpY29uTmFtZSA9ICdhc2MnID09PSBvcmRlciA/ICdhcnJvd19kcm9wX3VwJyA6ICdhcnJvd19kcm9wX2Rvd24nO1xyXG4gICAgICAgICAgICBjb25zdCBpY29uID0gPGkgY2xhc3NOYW1lPSdtYXRlcmlhbC1pY29ucyc+e2ljb25OYW1lfTwvaT47XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnByb3BzLmluZm9zU29ydEljb24pIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGRlc2NyaXB0aW9uU29ydCA9IDxzcGFuPkljb25lIGRlIHRyaTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgIHNvcnQgPSA8YSBjbGFzc05hbWU9J3NvcnQnIGRhdGEtYnlwYXNzIGRhdGEtbmFtZT17bmFtZX0gaHJlZj0nIycgb25DbGljaz17dGhpcy5fc29ydENvbHVtbkFjdGlvbihuYW1lLCAoJ2FzYycgPT09IG9yZGVyID8gJ2Rlc2MnIDogJ2FzYycpKX0+e2ljb259IHtkZXNjcmlwdGlvblNvcnR9PC9hPjtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHNvcnQgPSA8YSBjbGFzc05hbWU9J3NvcnQnIGRhdGEtYnlwYXNzIGRhdGEtbmFtZT17bmFtZX0gaHJlZj0nIycgb25DbGljaz17dGhpcy5fc29ydENvbHVtbkFjdGlvbihuYW1lLCAoJ2FzYycgPT09IG9yZGVyID8gJ2Rlc2MnIDogJ2FzYycpKX0+e2ljb259PC9hPjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgYWNjdW11bGF0b3IucHVzaCg8dGggc2NvcGU9J2NvbCcgY2xhc3NOYW1lPXtUQUJMRV9DRUxMX0NMQVNTfSBrZXk9e2NvbFByb3BlcnRpZXMubGFiZWx9Pnt0cmFuc2xhdGUoY29sUHJvcGVydGllcy5sYWJlbCl9e3NvcnR9PC90aD4pO1xyXG4gICAgICAgIHJldHVybiBhY2N1bXVsYXRvcjtcclxuICAgIH0sXHJcbiAgICAvKipcclxuICAgICAqIFJlbmRlciB0aGUgdGJvZHkgdGFnIGFuZCB0aGUgY29udGVudC5cclxuICAgICAqIEByZXR1cm4ge0NvbXBvbmVudH0gLSBUaGUgY29tcG9uZW50IGNvbnRhaW5pbmcgdGhlIHRib2R5LlxyXG4gICAgICovXHJcbiAgICBfcmVuZGVyVGFibGVCb2R5KCkge1xyXG4gICAgICAgIGNvbnN0IHtkYXRhLCBMaW5lQ29tcG9uZW50OiBUYWJsZUxpbmVDb21wb25lbnQsIGlkRmllbGR9ID0gdGhpcy5wcm9wcztcclxuICAgICAgICBjb25zdCByZWZlcmVuY2UgPSB0aGlzLl9nZXRSZWZlcmVuY2UoKTtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8dGJvZHk+XHJcbiAgICAgICAgICAgICAgICB7ZGF0YS5tYXAoKGxpbmUsIGlkeCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHtkYXRhLCAuLi5vdGhlckxpbmVQcm9wc30gPSB0aGlzLnByb3BzO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHRhYmxlQm9keUZpbmFsUHJvcHMgPSBhZGRSZWZUb1Byb3BzSWZOb3RQdXJlKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBUYWJsZUxpbmVDb21wb25lbnQsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogVEFCTEVfQ0VMTF9DTEFTUyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IGxpbmUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk6IGxpbmVbaWRGaWVsZF0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWZlcmVuY2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuLi5vdGhlckxpbmVQcm9wc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCBgJHtMSU5FfSR7aWR4fWApO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiA8VGFibGVMaW5lQ29tcG9uZW50IHsuLi50YWJsZUJvZHlGaW5hbFByb3BzfSAvPjtcclxuICAgICAgICAgICAgICAgIH0pfVxyXG4gICAgICAgICAgICA8L3Rib2R5PlxyXG4gICAgICAgICk7XHJcbiAgICB9LFxyXG4gICAgLyoqXHJcbiAgICAgKiBSZW5kZXIgdGhlIGxvYWRpbmcgdGFibGVcclxuICAgICAqIEByZXR1cm4ge0NvbXBvbmVudH0gLSBUaGUgdGFibGUgaW4gdGhlIGxvYWRpbmcgbW9kZS5cclxuICAgICAqL1xyXG4gICAgX3JlbmRlckxvYWRpbmcoKSB7XHJcbiAgICAgICAgY29uc3Qge2lzTG9hZGluZywgbG9hZGVyfSA9IHRoaXMucHJvcHM7XHJcbiAgICAgICAgaWYgKGlzTG9hZGluZykge1xyXG4gICAgICAgICAgICBpZiAobG9hZGVyKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbG9hZGVyKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICAgIDx0Ym9keSBjbGFzc05hbWU9eyd0YWJsZS1sb2FkaW5nJ30+XHJcbiAgICAgICAgICAgICAgICAgICAgPHRyPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8dGQ+e2Ake3RyYW5zbGF0ZSgnbGlzdC5sb2FkaW5nJyl9YH08L3RkPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvdHI+XHJcbiAgICAgICAgICAgICAgICA8L3Rib2R5PlxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICAvKipcclxuICAgICAqIFJlbmRlciB0aGUgbWFudWFsIGZldGNoIG1vZGUgZm9yIHRoZSB0YWJsZS5cclxuICAgICAqIEByZXR1cm4ge0NvbXBvbmVudH0gLSBUaGUgZm9vdGVyIGNvbXBvbmVudCB3aGVuIHRoZSBtb2RlIGlzIG1hbnVhbCBmZXRjaCAsIGEgc2hvdyBtb2RlIGJ1dHRvbiBpcyBzaG93bi5cclxuICAgICAqL1xyXG4gICAgX3JlbmRlck1hbnVhbEZldGNoKCkge1xyXG4gICAgICAgIGNvbnN0IHtpc01hbnVhbEZldGNoLCBoYXNNb3JlRGF0YX0gPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIGlmIChpc01hbnVhbEZldGNoICYmIGhhc01vcmVEYXRhKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICA8dGZvb3QgY2xhc3NOYW1lPSd0YWJsZS1tYW51YWwtZmV0Y2gnPlxyXG4gICAgICAgICAgICAgICAgICAgIDx0cj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHRkIGNvbFNwYW49e2tleXModGhpcy5wcm9wcy5jb2x1bW5zKS5sZW5ndGh9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPEJ1dHRvbiBoYW5kbGVPbkNsaWNrPXt0aGlzLmZldGNoTmV4dFBhZ2V9IGxhYmVsPSdsaXN0LmJ1dHRvbi5zaG93TW9yZScgdHlwZT0nYnV0dG9uJyAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L3RkPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvdHI+XHJcbiAgICAgICAgICAgICAgICA8L3Rmb290PlxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZW5kZXIgdGhlIGxpc3QuXHJcbiAgICAgKiBAcmV0dXJuIHtYTUx9IHRoZSByZW5kZXIgb2YgdGhlIHRhYmxlIGxpc3QuXHJcbiAgICAgKi9cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICBjb25zdCBTRUxFQ1RBQkxFX0NTUyA9IHRoaXMucHJvcHMuaXNTZWxlY3RhYmxlID8gJ21kbC1kYXRhLXRhYmxlLS1zZWxlY3RhYmxlJyA6ICcnO1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDx0YWJsZSBjbGFzc05hbWU9e2Ake1RBQkxFX0NTU19DTEFTU30gJHtTRUxFQ1RBQkxFX0NTU31gfSByb2xlPSdwcmVzZW50YXRpb24nPlxyXG4gICAgICAgICAgICAgICAge3RoaXMucHJvcHMuZGF0YVRhYmxlICYmXHJcbiAgICAgICAgICAgICAgICAgICAgPGNhcHRpb24+e3RoaXMucHJvcHMuY2FwdGlvblRpdGxlfTwvY2FwdGlvbj5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHt0aGlzLl9yZW5kZXJUYWJsZUhlYWRlcigpfVxyXG4gICAgICAgICAgICAgICAge3RoaXMuX3JlbmRlclRhYmxlQm9keSgpfVxyXG4gICAgICAgICAgICAgICAge3RoaXMuX3JlbmRlckxvYWRpbmcoKX1cclxuICAgICAgICAgICAgICAgIHt0aGlzLl9yZW5kZXJNYW51YWxGZXRjaCgpfVxyXG4gICAgICAgICAgICA8L3RhYmxlPlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG59O1xyXG5cclxuY29uc3QgYnVpbHRDb21wID0gYnVpbGRlcih0YWJsZU1peGluKTtcclxuY29uc3Qge2NvbXBvbmVudCwgbWl4aW59ID0gYnVpbHRDb21wO1xyXG5cclxuZXhwb3J0IHtcclxuICAgIGNvbXBvbmVudCxcclxuICAgIG1peGluXHJcbn1cclxuZXhwb3J0IGRlZmF1bHQgYnVpbHRDb21wOyJdfQ==