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
            sort = _react2.default.createElement(
                'a',
                { className: 'sort', 'data-bypass': true, 'data-name': name, href: '#', onClick: this._sortColumnAction(name, 'asc' === order ? 'desc' : 'asc') },
                icon
            );
        }
        accumulator.push(_react2.default.createElement(
            'th',
            { className: TABLE_CELL_CLASS, key: colProperties.label },
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
            { className: TABLE_CSS_CLASS + ' ' + SELECTABLE_CSS },
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJUQUJMRV9DU1NfQ0xBU1MiLCJUQUJMRV9DRUxMX0NMQVNTIiwidGFibGVNaXhpbiIsImRpc3BsYXlOYW1lIiwibWl4aW5zIiwiZ2V0RGVmYXVsdFByb3BzIiwiZGF0YSIsImlkRmllbGQiLCJpc0xvYWRpbmciLCJvcGVyYXRpb25MaXN0IiwiaXNTZWxlY3RhYmxlIiwicHJvcHR5cGVzIiwib25MaW5lQ2xpY2siLCJsaW5lQ29tcG9uZW50IiwiaXNSZXF1aXJlZCIsImNvbHVtbnMiLCJzb3J0Q29sdW1uIiwiaXNsb2FkaW5nIiwibG9hZGVyIiwiX3JlbmRlclRhYmxlSGVhZGVyIiwicHJvcHMiLCJfcmVuZGVyQ29sdW1uSGVhZGVyIiwiX3NvcnRDb2x1bW5BY3Rpb24iLCJjb2x1bW4iLCJvcmRlciIsImN1cnJlbnRDb21wb25lbnQiLCJldmVudCIsInByZXZlbnREZWZhdWx0IiwiYWNjdW11bGF0b3IiLCJjb2xQcm9wZXJ0aWVzIiwibmFtZSIsInNvcnQiLCJpc0VkaXQiLCJub1NvcnQiLCJpY29uTmFtZSIsImljb24iLCJwdXNoIiwibGFiZWwiLCJfcmVuZGVyVGFibGVCb2R5IiwiVGFibGVMaW5lQ29tcG9uZW50IiwiTGluZUNvbXBvbmVudCIsInJlZmVyZW5jZSIsIl9nZXRSZWZlcmVuY2UiLCJtYXAiLCJsaW5lIiwiaWR4Iiwib3RoZXJMaW5lUHJvcHMiLCJ0YWJsZUJvZHlGaW5hbFByb3BzIiwiY2xhc3NOYW1lIiwia2V5IiwiX3JlbmRlckxvYWRpbmciLCJfcmVuZGVyTWFudWFsRmV0Y2giLCJpc01hbnVhbEZldGNoIiwiaGFzTW9yZURhdGEiLCJsZW5ndGgiLCJmZXRjaE5leHRQYWdlIiwicmVuZGVyIiwiU0VMRUNUQUJMRV9DU1MiLCJidWlsdENvbXAiLCJjb21wb25lbnQiLCJtaXhpbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBRUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FB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V0FBckIsRUFBa0M7QUFDOUIsbUJBQ0k7QUFBQTtBQUFBLGtCQUFPLFdBQVUsb0JBQWpCO0FBQ0k7QUFBQTtBQUFBO0FBQ0k7QUFBQTtBQUFBLDBCQUFJLFNBQVMsa0JBQUssS0FBS2pDLEtBQUwsQ0FBV0wsT0FBaEIsRUFBeUJ1QyxNQUF0QztBQUNJLDBFQUFRLGVBQWUsS0FBS0MsYUFBNUIsRUFBMkMsT0FBTSxzQkFBakQsRUFBd0UsTUFBSyxRQUE3RTtBQURKO0FBREo7QUFESixhQURKO0FBU0g7QUFDSixLQXBJYzs7O0FBc0lmOzs7O0FBSUFDLFVBMUllLG9CQTBJTjtBQUNMLFlBQU1DLGlCQUFpQixLQUFLckMsS0FBTCxDQUFXVixZQUFYLEdBQTBCLDRCQUExQixHQUF5RCxFQUFoRjtBQUNBLGVBQ0k7QUFBQTtBQUFBLGNBQU8sV0FBY1YsZUFBZCxTQUFpQ3lELGNBQXhDO0FBQ0ssaUJBQUt0QyxrQkFBTCxFQURMO0FBRUssaUJBQUttQixnQkFBTCxFQUZMO0FBR0ssaUJBQUtZLGNBQUwsRUFITDtBQUlLLGlCQUFLQyxrQkFBTDtBQUpMLFNBREo7QUFRSDtBQXBKYyxDQUFuQjs7QUF3SkEsSUFBTU8sWUFBWSx1QkFBUXhELFVBQVIsQ0FBbEI7SUFDT3lELFMsR0FBb0JELFMsQ0FBcEJDLFM7SUFBV0MsSyxHQUFTRixTLENBQVRFLEs7UUFHZEQsUyxHQUFBQSxTO1FBQ0FDLEssR0FBQUEsSztrQkFFV0YsUyIsImZpbGUiOiJpcy1yZWFjdC1jbGFzcy1jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBEZXBlbmRlbmNpZXNcclxuXHJcbmltcG9ydCBidWlsZGVyIGZyb20gJ2ZvY3VzLWNvcmUvY29tcG9uZW50L2J1aWxkZXInO1xyXG5pbXBvcnQgdHlwZXMgZnJvbSAnZm9jdXMtY29yZS9jb21wb25lbnQvdHlwZXMnO1xyXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBrZXlzLCByZWR1Y2UgfSBmcm9tICdsb2Rhc2gnO1xyXG5cclxuaW1wb3J0IHt0cmFuc2xhdGV9IGZyb20gJ2ZvY3VzLWNvcmUvdHJhbnNsYXRpb24nO1xyXG4vL0FkZCBhIHJlZiB0byB0aGUgcHJvcHMgaWYgdGhlIGNvbXBvbmVudCBpcyBub3QgcHVyZSBhZGQgbm90aGluZyBpbiB0aGUgb3RoZXIgY2FzZS5cclxuaW1wb3J0IHsgYWRkUmVmVG9Qcm9wc0lmTm90UHVyZSwgTElORSB9IGZyb20gJy4uLy4uL3V0aWxzL2lzLXJlYWN0LWNsYXNzLWNvbXBvbmVudCc7XHJcblxyXG4vLyBUYWJsZSBjbGFzcy5cclxuY29uc3QgVEFCTEVfQ1NTX0NMQVNTID0gJ21kbC1kYXRhLXRhYmxlIG1kbC1qcy1kYXRhLXRhYmxlIG1kbC1zaGFkb3ctLTJkcCAnO1xyXG5jb25zdCBUQUJMRV9DRUxMX0NMQVNTID0gJ21kbC1kYXRhLXRhYmxlX19jZWxsLS1ub24tbnVtZXJpYyc7XHJcblxyXG4vLyBNaXhpbnNcclxuXHJcbmltcG9ydCB7bWl4aW4gYXMgaW5maW5pdGVTY3JvbGxNaXhpbn0gZnJvbSAnLi4vbWl4aW4vaW5maW5pdGUtc2Nyb2xsJztcclxuaW1wb3J0IHJlZmVyZW5jZU1peGluIGZyb20gJy4uLy4uL2NvbW1vbi9taXhpbi9yZWZlcmVuY2UtcHJvcGVydHknO1xyXG5pbXBvcnQgbWRsQmVoYXZpb3VyIGZyb20gJy4uLy4uL2NvbW1vbi9taXhpbi9tZGwtYmVoYXZpb3VyJztcclxuXHJcbi8vIENvbXBvbmVudHNcclxuXHJcbmltcG9ydCBCdXR0b24gZnJvbSAnLi4vLi4vY29tcG9uZW50cy9idXR0b24nO1xyXG5cclxuY29uc3QgdGFibGVNaXhpbiA9IHtcclxuICAgIC8qKlxyXG4gICAgICogUmVhY3QgdGFnIG5hbWUuXHJcbiAgICAgKi9cclxuICAgIGRpc3BsYXlOYW1lOiAnVGFibGUnLFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogTWl4aW4gZGVwZW5kYW5jaWVzLlxyXG4gICAgICovXHJcbiAgICBtaXhpbnM6IFtpbmZpbml0ZVNjcm9sbE1peGluLCByZWZlcmVuY2VNaXhpbiwgbWRsQmVoYXZpb3VyXSxcclxuICAgIC8qKiBpbmhlcml0ZWRkb2MgKi9cclxuICAgIGdldERlZmF1bHRQcm9wcygpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBkYXRhOiBbXSxcclxuICAgICAgICAgICAgaWRGaWVsZDogJ2lkJyxcclxuICAgICAgICAgICAgaXNMb2FkaW5nOiBmYWxzZSxcclxuICAgICAgICAgICAgb3BlcmF0aW9uTGlzdDogW10sXHJcbiAgICAgICAgICAgIGlzU2VsZWN0YWJsZTogZmFsc2VcclxuICAgICAgICB9O1xyXG4gICAgfSxcclxuICAgIC8qKiBpbmhlcml0ZWRkb2MgKi9cclxuICAgIHByb3B0eXBlczoge1xyXG4gICAgICAgIGRhdGE6IHR5cGVzKCdhcnJheScpLFxyXG4gICAgICAgIGlzU2VsZWN0YWJsZTogdHlwZXMoJ2Jvb2wnKSxcclxuICAgICAgICBvbkxpbmVDbGljazogdHlwZXMoJ2Z1bmMnKSxcclxuICAgICAgICBpZEZpZWxkOiB0eXBlcygnc3RyaW5nJyksXHJcbiAgICAgICAgbGluZUNvbXBvbmVudDogdHlwZXMoJ2Z1bmMnKS5pc1JlcXVpcmVkLFxyXG4gICAgICAgIG9wZXJhdGlvbkxpc3Q6IHR5cGVzKCdhcnJheScpLFxyXG4gICAgICAgIGNvbHVtbnM6IHR5cGVzKCdvYmplY3QnKSxcclxuICAgICAgICBzb3J0Q29sdW1uOiB0eXBlcygnZnVuYycpLFxyXG4gICAgICAgIGlzbG9hZGluZzogdHlwZXMoJ2Jvb2wnKSxcclxuICAgICAgICBsb2FkZXI6IHR5cGVzKCdmdW5jJylcclxuICAgIH0sXHJcbiAgICAvKipcclxuICAgICAqIFJlbmRlciB0aGUgdGFibGUgaGVhZGVyLlxyXG4gICAgICogQHJldHVybiB7Q29tcG9uZW50fSAtIFJlbmRlciB0aGUgdGFibGUgaGVhZGVyLlxyXG4gICAgICovXHJcbiAgICBfcmVuZGVyVGFibGVIZWFkZXIoKSB7XHJcbiAgICAgICAgY29uc3Qge2NvbHVtbnN9ID0gdGhpcy5wcm9wcztcclxuICAgICAgICByZXR1cm4gPHRoZWFkPjx0cj57cmVkdWNlKGNvbHVtbnMsIHRoaXMuX3JlbmRlckNvbHVtbkhlYWRlciwgW10pfTwvdHI+PC90aGVhZD47XHJcbiAgICB9LFxyXG4gICAgLyoqXHJcbiAgICAgKiBCdWlsZCBhIGZ1bmN0aW9uIHdoaWNoIGlzIGNhbGxlZCB3aGVuIHRoZXJlIGlzIGEgY2xpY2sgb24gYSB0YWJsZSBjb2x1bW4uXHJcbiAgICAgKiBAcGFyYW0gIHtzdHJpbmd9IGNvbHVtbiAtIENvbHVtbiBuYW1lLlxyXG4gICAgICogQHBhcmFtICB7c3RyaW5nfSBvcmRlciAgLSBUaGUgb3JkZXIgY29uZmlnLlxyXG4gICAgICogQHJldHVybiB7ZnVuY3Rpb259IC0gVGhlIGZ1bmN0aW9uIHRvIGJlIGNhbGxlZCB3aGVuIHRoZXJlIGlzIGEgY2xpY2sgb24gaXQuXHJcbiAgICAgKi9cclxuICAgIF9zb3J0Q29sdW1uQWN0aW9uKGNvbHVtbiwgb3JkZXIpIHtcclxuICAgICAgICBsZXQgY3VycmVudENvbXBvbmVudCA9IHRoaXM7XHJcbiAgICAgICAgcmV0dXJuIChldmVudCkgPT4ge1xyXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICBjdXJyZW50Q29tcG9uZW50LnByb3BzLnNvcnRDb2x1bW4oY29sdW1uLCBvcmRlcik7XHJcbiAgICAgICAgfTtcclxuICAgIH0sXHJcbiAgICAvKipcclxuICAgICAqIFJlbmRlciB0aGUgY29sdW1uIGhlYWRlci5cclxuICAgICAqIEBwYXJhbSB7YXJyYXl9IGFjY3VtdWxhdG9yIC0gVGhlIGFycmF5IGNvLG50YWluaW5nIHRoZSBhY2N1bXVsYXRpbmcgY29tcG9uZW50LlxyXG4gICAgICogQHBhcmFtICB7b2JqZWN0fSBjb2xQcm9wZXJ0aWVzIC0gVGhlIGNvbHVtbiBwcm9wZXJ0aWVzLlxyXG4gICAgICogQHBhcmFtICB7c3RyaW5nfSBuYW1lIC0gVGhlIGNvbHVtbiBuYW1lLlxyXG4gICAgICogQHJldHVybiB7Q29tcG9uZW50fSAtIFRoZSBjb21wb25lbnQgaGVhZGVyLlxyXG4gICAgICovXHJcbiAgICBfcmVuZGVyQ29sdW1uSGVhZGVyKGFjY3VtdWxhdG9yLCBjb2xQcm9wZXJ0aWVzLCBuYW1lKSB7XHJcbiAgICAgICAgbGV0IHNvcnQ7XHJcbiAgICAgICAgaWYgKCF0aGlzLnByb3BzLmlzRWRpdCAmJiAhY29sUHJvcGVydGllcy5ub1NvcnQpIHtcclxuICAgICAgICAgICAgY29uc3Qgb3JkZXIgPSBjb2xQcm9wZXJ0aWVzLnNvcnQgPyBjb2xQcm9wZXJ0aWVzLnNvcnQgOiAnYXNjJztcclxuICAgICAgICAgICAgY29uc3QgaWNvbk5hbWUgPSAnYXNjJyA9PT0gb3JkZXIgPyAnYXJyb3dfZHJvcF91cCcgOiAnYXJyb3dfZHJvcF9kb3duJztcclxuICAgICAgICAgICAgY29uc3QgaWNvbiA9IDxpIGNsYXNzTmFtZT0nbWF0ZXJpYWwtaWNvbnMnPntpY29uTmFtZX08L2k+O1xyXG4gICAgICAgICAgICBzb3J0ID0gPGEgY2xhc3NOYW1lPSdzb3J0JyBkYXRhLWJ5cGFzcyBkYXRhLW5hbWU9e25hbWV9IGhyZWY9JyMnIG9uQ2xpY2s9e3RoaXMuX3NvcnRDb2x1bW5BY3Rpb24obmFtZSwgKCdhc2MnID09PSBvcmRlciA/ICdkZXNjJyA6ICdhc2MnKSl9PntpY29ufTwvYT47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGFjY3VtdWxhdG9yLnB1c2goPHRoIGNsYXNzTmFtZT17VEFCTEVfQ0VMTF9DTEFTU30ga2V5PXtjb2xQcm9wZXJ0aWVzLmxhYmVsfT57dHJhbnNsYXRlKGNvbFByb3BlcnRpZXMubGFiZWwpfXtzb3J0fTwvdGg+KTtcclxuICAgICAgICByZXR1cm4gYWNjdW11bGF0b3I7XHJcbiAgICB9LFxyXG4gICAgLyoqXHJcbiAgICAgKiBSZW5kZXIgdGhlIHRib2R5IHRhZyBhbmQgdGhlIGNvbnRlbnQuXHJcbiAgICAgKiBAcmV0dXJuIHtDb21wb25lbnR9IC0gVGhlIGNvbXBvbmVudCBjb250YWluaW5nIHRoZSB0Ym9keS5cclxuICAgICAqL1xyXG4gICAgX3JlbmRlclRhYmxlQm9keSgpIHtcclxuICAgICAgICBjb25zdCB7ZGF0YSwgTGluZUNvbXBvbmVudDogVGFibGVMaW5lQ29tcG9uZW50LCBpZEZpZWxkfSA9IHRoaXMucHJvcHM7XHJcbiAgICAgICAgY29uc3QgcmVmZXJlbmNlID0gdGhpcy5fZ2V0UmVmZXJlbmNlKCk7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPHRib2R5PlxyXG4gICAgICAgICAgICAgICAge2RhdGEubWFwKChsaW5lLCBpZHgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCB7ZGF0YSwgLi4ub3RoZXJMaW5lUHJvcHN9ID0gdGhpcy5wcm9wcztcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCB0YWJsZUJvZHlGaW5hbFByb3BzID0gYWRkUmVmVG9Qcm9wc0lmTm90UHVyZShcclxuICAgICAgICAgICAgICAgICAgICAgICAgVGFibGVMaW5lQ29tcG9uZW50LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU6IFRBQkxFX0NFTExfQ0xBU1MsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiBsaW5lLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5OiBsaW5lW2lkRmllbGRdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmZXJlbmNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLi4ub3RoZXJMaW5lUHJvcHNcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSwgYCR7TElORX0ke2lkeH1gKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gPFRhYmxlTGluZUNvbXBvbmVudCB7Li4udGFibGVCb2R5RmluYWxQcm9wc30gLz47XHJcbiAgICAgICAgICAgICAgICB9KX1cclxuICAgICAgICAgICAgPC90Ym9keT5cclxuICAgICAgICApO1xyXG4gICAgfSxcclxuICAgIC8qKlxyXG4gICAgICogUmVuZGVyIHRoZSBsb2FkaW5nIHRhYmxlXHJcbiAgICAgKiBAcmV0dXJuIHtDb21wb25lbnR9IC0gVGhlIHRhYmxlIGluIHRoZSBsb2FkaW5nIG1vZGUuXHJcbiAgICAgKi9cclxuICAgIF9yZW5kZXJMb2FkaW5nKCkge1xyXG4gICAgICAgIGNvbnN0IHtpc0xvYWRpbmcsIGxvYWRlcn0gPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIGlmIChpc0xvYWRpbmcpIHtcclxuICAgICAgICAgICAgaWYgKGxvYWRlcikge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGxvYWRlcigpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICA8dGJvZHkgY2xhc3NOYW1lPXsndGFibGUtbG9hZGluZyd9PlxyXG4gICAgICAgICAgICAgICAgICAgIDx0cj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHRkPntgJHt0cmFuc2xhdGUoJ2xpc3QubG9hZGluZycpfWB9PC90ZD5cclxuICAgICAgICAgICAgICAgICAgICA8L3RyPlxyXG4gICAgICAgICAgICAgICAgPC90Ym9keT5cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgLyoqXHJcbiAgICAgKiBSZW5kZXIgdGhlIG1hbnVhbCBmZXRjaCBtb2RlIGZvciB0aGUgdGFibGUuXHJcbiAgICAgKiBAcmV0dXJuIHtDb21wb25lbnR9IC0gVGhlIGZvb3RlciBjb21wb25lbnQgd2hlbiB0aGUgbW9kZSBpcyBtYW51YWwgZmV0Y2ggLCBhIHNob3cgbW9kZSBidXR0b24gaXMgc2hvd24uXHJcbiAgICAgKi9cclxuICAgIF9yZW5kZXJNYW51YWxGZXRjaCgpIHtcclxuICAgICAgICBjb25zdCB7aXNNYW51YWxGZXRjaCwgaGFzTW9yZURhdGF9ID0gdGhpcy5wcm9wcztcclxuICAgICAgICBpZiAoaXNNYW51YWxGZXRjaCAmJiBoYXNNb3JlRGF0YSkge1xyXG4gICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgICAgPHRmb290IGNsYXNzTmFtZT0ndGFibGUtbWFudWFsLWZldGNoJz5cclxuICAgICAgICAgICAgICAgICAgICA8dHI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBjb2xTcGFuPXtrZXlzKHRoaXMucHJvcHMuY29sdW1ucykubGVuZ3RofT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxCdXR0b24gaGFuZGxlT25DbGljaz17dGhpcy5mZXRjaE5leHRQYWdlfSBsYWJlbD0nbGlzdC5idXR0b24uc2hvd01vcmUnIHR5cGU9J2J1dHRvbicgLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC90ZD5cclxuICAgICAgICAgICAgICAgICAgICA8L3RyPlxyXG4gICAgICAgICAgICAgICAgPC90Zm9vdD5cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVuZGVyIHRoZSBsaXN0LlxyXG4gICAgICogQHJldHVybiB7WE1MfSB0aGUgcmVuZGVyIG9mIHRoZSB0YWJsZSBsaXN0LlxyXG4gICAgICovXHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgY29uc3QgU0VMRUNUQUJMRV9DU1MgPSB0aGlzLnByb3BzLmlzU2VsZWN0YWJsZSA/ICdtZGwtZGF0YS10YWJsZS0tc2VsZWN0YWJsZScgOiAnJztcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8dGFibGUgY2xhc3NOYW1lPXtgJHtUQUJMRV9DU1NfQ0xBU1N9ICR7U0VMRUNUQUJMRV9DU1N9YH0+XHJcbiAgICAgICAgICAgICAgICB7dGhpcy5fcmVuZGVyVGFibGVIZWFkZXIoKX1cclxuICAgICAgICAgICAgICAgIHt0aGlzLl9yZW5kZXJUYWJsZUJvZHkoKX1cclxuICAgICAgICAgICAgICAgIHt0aGlzLl9yZW5kZXJMb2FkaW5nKCl9XHJcbiAgICAgICAgICAgICAgICB7dGhpcy5fcmVuZGVyTWFudWFsRmV0Y2goKX1cclxuICAgICAgICAgICAgPC90YWJsZT5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxufTtcclxuXHJcbmNvbnN0IGJ1aWx0Q29tcCA9IGJ1aWxkZXIodGFibGVNaXhpbik7XHJcbmNvbnN0IHtjb21wb25lbnQsIG1peGlufSA9IGJ1aWx0Q29tcDtcclxuXHJcbmV4cG9ydCB7XHJcbiAgICBjb21wb25lbnQsXHJcbiAgICBtaXhpblxyXG59XHJcbmV4cG9ydCBkZWZhdWx0IGJ1aWx0Q29tcDsiXX0=