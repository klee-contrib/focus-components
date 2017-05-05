'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _builder = require('focus-core/component/builder');

var _builder2 = _interopRequireDefault(_builder);

var _types = require('focus-core/component/types');

var _types2 = _interopRequireDefault(_types);

var _object = require('focus-core/util/object');

var _button = require('../../components/button');

var _button2 = _interopRequireDefault(_button);

var _isReactClassComponent = require('../../utils/is-react-class-component');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var React = require('react');

var Line = require('./line').mixin;
var uuid = require('uuid');
var translationMixin = require('../../common/i18n').mixin;
var infiniteScrollMixin = require('../mixin/infinite-scroll').mixin;
var referenceMixin = require('../../common/mixin/reference-property');
//Add a ref to the props if the component is not pure add nothing in the other case.


var listMixin = {
    /**
    * Tag name
    */
    displayName: 'timeline',

    /**
    * Mixin dependancies.
    */
    mixins: [translationMixin, infiniteScrollMixin, referenceMixin],

    /**
    * Default properties for the list.
    * @return {object} default props.
    */
    getDefaultProps: function getDefaultProps() {
        return {
            data: [],
            idField: 'id',
            dateField: 'date',
            isLoading: false
        };
    },

    /**
    * list property validation.
    */
    propTypes: {
        data: (0, _types2.default)('array'),
        idField: (0, _types2.default)('string'),
        dateField: (0, _types2.default)('string'),
        dateComponent: (0, _types2.default)('object'),
        lineComponent: (0, _types2.default)('func'),
        isloading: (0, _types2.default)('bool'),
        loader: (0, _types2.default)('func'),
        onLineClick: (0, _types2.default)('func')
    },

    /**
    * Render lines of the list.
    * @returns {*} the lines
    */
    _renderLines: function _renderLines() {
        var _this = this;

        var _props = this.props,
            _props$LineComponent = _props.LineComponent,
            LineComponent = _props$LineComponent === undefined ? React.createClass(Line) : _props$LineComponent,
            idField = _props.idField,
            dateField = _props.dateField,
            onLineClick = _props.onLineClick,
            data = _props.data,
            otherProps = _objectWithoutProperties(_props, ['LineComponent', 'idField', 'dateField', 'onLineClick', 'data']);
        // LEGACY CODE


        var customLineComponent = otherProps.lineComponent;
        if (customLineComponent) {
            console.warn('%c DEPRECATED : You are using the lineComponent prop in a timeline component, this will be removed in the next release of Focus Components. Please use LineComponent prop instead.', 'color: #FF9C00; font-weight: bold');
        }
        var FinalLineComponent = customLineComponent || LineComponent;
        // END OF LEGACY CODE

        return data.map(function (line, idx) {
            var timelineFinalProps = (0, _isReactClassComponent.addRefToPropsIfNotPure)(FinalLineComponent, _extends({}, otherProps, {
                data: line,
                dateField: dateField,
                key: line[idField] || uuid.v4(),
                onLineClick: onLineClick,
                reference: _this._getReference()
            }), '' + _isReactClassComponent.LINE + idx);
            return React.createElement(FinalLineComponent, timelineFinalProps);
        });
    },


    _renderLoading: function renderLoading() {
        if (this.props.isLoading) {
            if (this.props.loader) {
                return this.props.loader();
            }
            return React.createElement(
                'li',
                { className: 'timeline-loading' },
                this.i18n('list.loading'),
                ' ...'
            );
        }
    },

    _renderManualFetch: function renderManualFetch() {
        if (this.props.isManualFetch && this.props.hasMoreData) {
            var style = { className: 'primary' };
            return React.createElement(
                'li',
                { className: 'timeline-button' },
                React.createElement(_button2.default, { label: 'list.button.showMore',
                    type: 'button',
                    handleOnClick: this.handleShowMore,
                    style: style })
            );
        }
    },

    /**
    * Render the list.
    * @returns {XML} the list component
    */
    render: function renderList() {
        return React.createElement(
            'ul',
            { className: 'timeline' },
            this._renderLines(),
            this._renderLoading(),
            this._renderManualFetch()
        );
    }
};

module.exports = (0, _builder2.default)(listMixin);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJSZWFjdCIsInJlcXVpcmUiLCJMaW5lIiwibWl4aW4iLCJ1dWlkIiwidHJhbnNsYXRpb25NaXhpbiIsImluZmluaXRlU2Nyb2xsTWl4aW4iLCJyZWZlcmVuY2VNaXhpbiIsImxpc3RNaXhpbiIsImRpc3BsYXlOYW1lIiwibWl4aW5zIiwiZ2V0RGVmYXVsdFByb3BzIiwiZGF0YSIsImlkRmllbGQiLCJkYXRlRmllbGQiLCJpc0xvYWRpbmciLCJwcm9wVHlwZXMiLCJkYXRlQ29tcG9uZW50IiwibGluZUNvbXBvbmVudCIsImlzbG9hZGluZyIsImxvYWRlciIsIm9uTGluZUNsaWNrIiwiX3JlbmRlckxpbmVzIiwicHJvcHMiLCJMaW5lQ29tcG9uZW50IiwiY3JlYXRlQ2xhc3MiLCJvdGhlclByb3BzIiwiY3VzdG9tTGluZUNvbXBvbmVudCIsImNvbnNvbGUiLCJ3YXJuIiwiRmluYWxMaW5lQ29tcG9uZW50IiwibWFwIiwibGluZSIsImlkeCIsInRpbWVsaW5lRmluYWxQcm9wcyIsImtleSIsInY0IiwicmVmZXJlbmNlIiwiX2dldFJlZmVyZW5jZSIsIl9yZW5kZXJMb2FkaW5nIiwicmVuZGVyTG9hZGluZyIsImkxOG4iLCJfcmVuZGVyTWFudWFsRmV0Y2giLCJyZW5kZXJNYW51YWxGZXRjaCIsImlzTWFudWFsRmV0Y2giLCJoYXNNb3JlRGF0YSIsInN0eWxlIiwiY2xhc3NOYW1lIiwiaGFuZGxlU2hvd01vcmUiLCJyZW5kZXIiLCJyZW5kZXJMaXN0IiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7OztBQUFBOzs7O0FBRUE7Ozs7QUFNQTs7QUFDQTs7OztBQUVBOzs7Ozs7QUFWQSxJQUFJQSxRQUFRQyxRQUFRLE9BQVIsQ0FBWjs7QUFFQSxJQUFJQyxPQUFPRCxRQUFRLFFBQVIsRUFBa0JFLEtBQTdCO0FBQ0EsSUFBSUMsT0FBTUgsUUFBUSxNQUFSLENBQVY7QUFDQSxJQUFJ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LE9BQU0sc0JBQWQ7QUFDSSwwQkFBSyxRQURUO0FBRUksbUNBQWUsS0FBS0MsY0FGeEI7QUFHSSwyQkFBT0YsS0FIWDtBQURKLGFBREo7QUFRSDtBQUNKLEtBekZXOztBQTJGWjs7OztBQUlBRyxZQUFRLFNBQVNDLFVBQVQsR0FBc0I7QUFDMUIsZUFDSTtBQUFBO0FBQUEsY0FBSSxXQUFVLFVBQWQ7QUFDSyxpQkFBSzVCLFlBQUwsRUFETDtBQUVLLGlCQUFLaUIsY0FBTCxFQUZMO0FBR0ssaUJBQUtHLGtCQUFMO0FBSEwsU0FESjtBQU9IO0FBdkdXLENBQWhCOztBQTBHQVMsT0FBT0MsT0FBUCxHQUFpQix1QkFBUTVDLFNBQVIsQ0FBakIiLCJmaWxlIjoiaXMtcmVhY3QtY2xhc3MtY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGJ1aWxkZXIgZnJvbSAnZm9jdXMtY29yZS9jb21wb25lbnQvYnVpbGRlcic7XHJcbnZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XHJcbmltcG9ydCB0eXBlIGZyb20gJ2ZvY3VzLWNvcmUvY29tcG9uZW50L3R5cGVzJztcclxudmFyIExpbmUgPSByZXF1aXJlKCcuL2xpbmUnKS5taXhpbjtcclxudmFyIHV1aWQ9IHJlcXVpcmUoJ3V1aWQnKTtcclxudmFyIHRyYW5zbGF0aW9uTWl4aW4gPSByZXF1aXJlKCcuLi8uLi9jb21tb24vaTE4bicpLm1peGluO1xyXG52YXIgaW5maW5pdGVTY3JvbGxNaXhpbiA9IHJlcXVpcmUoJy4uL21peGluL2luZmluaXRlLXNjcm9sbCcpLm1peGluO1xyXG52YXIgcmVmZXJlbmNlTWl4aW4gPSByZXF1aXJlKCcuLi8uLi9jb21tb24vbWl4aW4vcmVmZXJlbmNlLXByb3BlcnR5Jyk7XHJcbmltcG9ydCB7Y2hlY2tJc05vdE51bGx9IGZyb20gJ2ZvY3VzLWNvcmUvdXRpbC9vYmplY3QnO1xyXG5pbXBvcnQgQnV0dG9uIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvYnV0dG9uJztcclxuLy9BZGQgYSByZWYgdG8gdGhlIHByb3BzIGlmIHRoZSBjb21wb25lbnQgaXMgbm90IHB1cmUgYWRkIG5vdGhpbmcgaW4gdGhlIG90aGVyIGNhc2UuXHJcbmltcG9ydCB7YWRkUmVmVG9Qcm9wc0lmTm90UHVyZSwgTElORX0gZnJvbSAnLi4vLi4vdXRpbHMvaXMtcmVhY3QtY2xhc3MtY29tcG9uZW50JztcclxuXHJcbnZhciBsaXN0TWl4aW4gPSB7XHJcbiAgICAvKipcclxuICAgICogVGFnIG5hbWVcclxuICAgICovXHJcbiAgICBkaXNwbGF5TmFtZTogJ3RpbWVsaW5lJyxcclxuXHJcbiAgICAvKipcclxuICAgICogTWl4aW4gZGVwZW5kYW5jaWVzLlxyXG4gICAgKi9cclxuICAgIG1peGluczogW3RyYW5zbGF0aW9uTWl4aW4sIGluZmluaXRlU2Nyb2xsTWl4aW4sIHJlZmVyZW5jZU1peGluXSxcclxuXHJcbiAgICAvKipcclxuICAgICogRGVmYXVsdCBwcm9wZXJ0aWVzIGZvciB0aGUgbGlzdC5cclxuICAgICogQHJldHVybiB7b2JqZWN0fSBkZWZhdWx0IHByb3BzLlxyXG4gICAgKi9cclxuICAgIGdldERlZmF1bHRQcm9wczogZnVuY3Rpb24gZ2V0RGVmYXVsdFByb3BzKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGRhdGE6IFtdLFxyXG4gICAgICAgICAgICBpZEZpZWxkOiAnaWQnLFxyXG4gICAgICAgICAgICBkYXRlRmllbGQ6ICdkYXRlJyxcclxuICAgICAgICAgICAgaXNMb2FkaW5nOiBmYWxzZVxyXG4gICAgICAgIH07XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgKiBsaXN0IHByb3BlcnR5IHZhbGlkYXRpb24uXHJcbiAgICAqL1xyXG4gICAgcHJvcFR5cGVzOiB7XHJcbiAgICAgICAgZGF0YTogdHlwZSgnYXJyYXknKSxcclxuICAgICAgICBpZEZpZWxkOiB0eXBlKCdzdHJpbmcnKSxcclxuICAgICAgICBkYXRlRmllbGQ6IHR5cGUoJ3N0cmluZycpLFxyXG4gICAgICAgIGRhdGVDb21wb25lbnQ6IHR5cGUoJ29iamVjdCcpLFxyXG4gICAgICAgIGxpbmVDb21wb25lbnQ6IHR5cGUoJ2Z1bmMnKSxcclxuICAgICAgICBpc2xvYWRpbmc6IHR5cGUoJ2Jvb2wnKSxcclxuICAgICAgICBsb2FkZXI6IHR5cGUoJ2Z1bmMnKSxcclxuICAgICAgICBvbkxpbmVDbGljazogdHlwZSgnZnVuYycpXHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgKiBSZW5kZXIgbGluZXMgb2YgdGhlIGxpc3QuXHJcbiAgICAqIEByZXR1cm5zIHsqfSB0aGUgbGluZXNcclxuICAgICovXHJcbiAgICBfcmVuZGVyTGluZXMoKSB7XHJcbiAgICAgICAgY29uc3Qge0xpbmVDb21wb25lbnQgPSBSZWFjdC5jcmVhdGVDbGFzcyhMaW5lKSwgaWRGaWVsZCwgZGF0ZUZpZWxkLCBvbkxpbmVDbGljaywgZGF0YSwgLi4ub3RoZXJQcm9wc30gPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIC8vIExFR0FDWSBDT0RFXHJcbiAgICAgICAgY29uc3QgY3VzdG9tTGluZUNvbXBvbmVudCA9IG90aGVyUHJvcHMubGluZUNvbXBvbmVudDtcclxuICAgICAgICBpZiAoY3VzdG9tTGluZUNvbXBvbmVudCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLndhcm4oJyVjIERFUFJFQ0FURUQgOiBZb3UgYXJlIHVzaW5nIHRoZSBsaW5lQ29tcG9uZW50IHByb3AgaW4gYSB0aW1lbGluZSBjb21wb25lbnQsIHRoaXMgd2lsbCBiZSByZW1vdmVkIGluIHRoZSBuZXh0IHJlbGVhc2Ugb2YgRm9jdXMgQ29tcG9uZW50cy4gUGxlYXNlIHVzZSBMaW5lQ29tcG9uZW50IHByb3AgaW5zdGVhZC4nLCAnY29sb3I6ICNGRjlDMDA7IGZvbnQtd2VpZ2h0OiBib2xkJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IEZpbmFsTGluZUNvbXBvbmVudCA9IGN1c3RvbUxpbmVDb21wb25lbnQgfHwgTGluZUNvbXBvbmVudDtcclxuICAgICAgICAvLyBFTkQgT0YgTEVHQUNZIENPREVcclxuXHJcbiAgICAgICAgcmV0dXJuIGRhdGEubWFwKChsaW5lLCBpZHgpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgdGltZWxpbmVGaW5hbFByb3BzID0gYWRkUmVmVG9Qcm9wc0lmTm90UHVyZShcclxuICAgICAgICAgICAgICAgIEZpbmFsTGluZUNvbXBvbmVudCwge1xyXG4gICAgICAgICAgICAgICAgICAgIC4uLm90aGVyUHJvcHMsXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogbGluZSxcclxuICAgICAgICAgICAgICAgICAgICBkYXRlRmllbGQsXHJcbiAgICAgICAgICAgICAgICAgICAga2V5OiBsaW5lW2lkRmllbGRdIHx8ICB1dWlkLnY0KCksXHJcbiAgICAgICAgICAgICAgICAgICAgb25MaW5lQ2xpY2ssXHJcbiAgICAgICAgICAgICAgICAgICAgcmVmZXJlbmNlOiB0aGlzLl9nZXRSZWZlcmVuY2UoKVxyXG4gICAgICAgICAgICAgICAgfSwgYCR7TElORX0ke2lkeH1gKTtcclxuICAgICAgICAgICAgcmV0dXJuIDxGaW5hbExpbmVDb21wb25lbnQgey4uLnRpbWVsaW5lRmluYWxQcm9wc30gLz47XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG5cclxuICAgIF9yZW5kZXJMb2FkaW5nOiBmdW5jdGlvbiByZW5kZXJMb2FkaW5nKCkge1xyXG4gICAgICAgIGlmKHRoaXMucHJvcHMuaXNMb2FkaW5nKSB7XHJcbiAgICAgICAgICAgIGlmKHRoaXMucHJvcHMubG9hZGVyKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5sb2FkZXIoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgICAgPGxpIGNsYXNzTmFtZT1cInRpbWVsaW5lLWxvYWRpbmdcIj57dGhpcy5pMThuKCdsaXN0LmxvYWRpbmcnKX0gLi4uPC9saT5cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIF9yZW5kZXJNYW51YWxGZXRjaDogZnVuY3Rpb24gcmVuZGVyTWFudWFsRmV0Y2goKSB7XHJcbiAgICAgICAgaWYodGhpcy5wcm9wcy5pc01hbnVhbEZldGNoICYmIHRoaXMucHJvcHMuaGFzTW9yZURhdGEpIHtcclxuICAgICAgICAgICAgdmFyIHN0eWxlID0ge2NsYXNzTmFtZTogJ3ByaW1hcnknfTtcclxuICAgICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICAgIDxsaSBjbGFzc05hbWU9XCJ0aW1lbGluZS1idXR0b25cIj5cclxuICAgICAgICAgICAgICAgICAgICA8QnV0dG9uIGxhYmVsPVwibGlzdC5idXR0b24uc2hvd01vcmVcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgaGFuZGxlT25DbGljaz17dGhpcy5oYW5kbGVTaG93TW9yZX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3N0eWxlfS8+XHJcbiAgICAgICAgICAgICAgICA8L2xpPlxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAqIFJlbmRlciB0aGUgbGlzdC5cclxuICAgICogQHJldHVybnMge1hNTH0gdGhlIGxpc3QgY29tcG9uZW50XHJcbiAgICAqL1xyXG4gICAgcmVuZGVyOiBmdW5jdGlvbiByZW5kZXJMaXN0KCkge1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDx1bCBjbGFzc05hbWU9XCJ0aW1lbGluZVwiPlxyXG4gICAgICAgICAgICAgICAge3RoaXMuX3JlbmRlckxpbmVzKCl9XHJcbiAgICAgICAgICAgICAgICB7dGhpcy5fcmVuZGVyTG9hZGluZygpfVxyXG4gICAgICAgICAgICAgICAge3RoaXMuX3JlbmRlck1hbnVhbEZldGNoKCl9XHJcbiAgICAgICAgICAgIDwvdWw+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gYnVpbGRlcihsaXN0TWl4aW4pO1xyXG4iXX0=