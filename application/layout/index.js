'use strict';

var _builder = require('focus-core/component/builder');

var _builder2 = _interopRequireDefault(_builder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Components

var AppHeaderDefault = require('./app-header'); // Dependencies

var LoadingBarDefault = require('../loading-bar').component;
var MessageCenterDefault = require('../message-center').component;
var ErrorCenterDefault = require('../error-center').component;

// Mixins

var stylableBehaviour = require('../../mixin/stylable');

var contentActionsMixin = {
    mixins: [stylableBehaviour],
    /** inheriteddoc */
    getDefaultProps: function getDefaultProps() {
        return {
            AppHeader: AppHeaderDefault,
            LoadingBar: LoadingBarDefault,
            MessageCenter: MessageCenterDefault,
            ErrorCenter: ErrorCenterDefault,
            displayDevBar: true,
            footerText: 'Please override the footer text by giving a "footerText" property to the Layout component.'
        };
    },

    /** inheriteddoc */
    render: function render() {
        var _props = this.props,
            LoadingBar = _props.LoadingBar,
            MessageCenter = _props.MessageCenter,
            ErrorCenter = _props.ErrorCenter,
            AppHeader = _props.AppHeader,
            MenuLeft = _props.MenuLeft,
            footerText = _props.footerText,
            displayDevBar = _props.displayDevBar,
            children = _props.children;

        return React.createElement(
            'div',
            { className: this._getStyleClassName(), 'data-focus': 'layout' },
            React.createElement(LoadingBar, { displayDevBar: displayDevBar }),
            React.createElement(MessageCenter, null),
            React.createElement(ErrorCenter, null),
            React.createElement(AppHeader, null),
            React.createElement(
                'div',
                { 'data-focus': 'menu' },
                MenuLeft && React.createElement(MenuLeft, null)
            ),
            React.createElement('div', { 'data-focus': 'page-content' }),
            React.createElement(
                'footer',
                { 'data-focus': 'footer' },
                footerText
            ),
            children
        );
    }
};

module.exports = (0, _builder2.default)(contentActionsMixin);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJBcHBIZWFkZXJEZWZhdWx0IiwicmVxdWlyZSIsIkxvYWRpbmdCYXJEZWZhdWx0IiwiY29tcG9uZW50IiwiTWVzc2FnZUNlbnRlckRlZmF1bHQiLCJFcnJvckNlbnRlckRlZmF1bHQiLCJzdHlsYWJsZUJlaGF2aW91ciIsImNvbnRlbnRBY3Rpb25zTWl4aW4iLCJtaXhpbnMiLCJnZXREZWZhdWx0UHJvcHMiLCJBcHBIZWFkZXIiLCJMb2FkaW5nQmFyIiwiTWVzc2FnZUNlbnRlciIsIkVycm9yQ2VudGVyIiwiZGlzcGxheURldkJhciIsImZvb3RlclRleHQiLCJyZW5kZXIiLCJwcm9wcyIsIk1lbnVMZWZ0IiwiY2hpbGRyZW4iLCJfZ2V0U3R5bGVDbGFzc05hbWUiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOztBQUVBOzs7Ozs7QUFFQTs7QUFFQSxJQUFNQSxtQkFBbUJDLFFBQVEsY0FBUixDQUF6QixDLENBTkE7O0FBT0EsSUFBTUMsb0JBQW9CRCxRQUFRLGdCQUFSLEVBQTBCRSxTQUFwRDtBQUNBLElBQU1DLHVCQUF1QkgsUUFBUSxtQkFBUixFQUE2QkUsU0FBMUQ7QUFDQSxJQUFNRSxxQkFBcUJKLFFBQVEsaUJBQVIsRUFBMkJFLFNBQXREOztBQUVBOztBQUVBLElBQU1HLG9CQUFvQkwsUUFBUSxzQkFBUixDQUExQjs7QUFFQSxJQUFNTSxzQkFBc0I7QUFDeEJDLFlBQVEsQ0FBQ0YsaUJBQUQsQ0FEZ0I7QUFFeEI7QUFDQUcsbUJBSHdCLDZCQUdOO0FBQ2QsZUFBTztBQUNIQyx1QkFBV1YsZ0JBRFI7QUFFSFcsd0JBQVlULGlCQUZUO0FBR0hVLDJCQUFlUixvQkFIWjtBQUlIUyx5QkFBYVIsa0JBSlY7QUFLSFMsMkJBQWUsSUFMWjtBQU1IQyx3QkFBWTtBQU5ULFNBQVA7QUFRSCxLQVp1Qjs7QUFheEI7QUFDQUMsVUFkd0Isb0JBY2Y7QUFBQSxxQkFDc0csS0FBS0MsS0FEM0c7QUFBQSxZQUNFTixVQURGLFVBQ0VBLFVBREY7QUFBQSxZQUNjQyxhQURkLFVBQ2NBLGFBRGQ7QUFBQSxZQUM2QkMsV0FEN0IsVUFDNkJBLFdBRDdCO0FBQUEsWUFDMENILFNBRDFDLFVBQzBDQSxTQUQxQztBQUFBLFlBQ3FEUSxRQURyRCxVQUNxREEsUUFEckQ7QUFBQSxZQUMrREgsVUFEL0QsVUFDK0RBLFVBRC9EO0FBQUEsWUFDMkVELGFBRDNFLFVBQzJFQSxhQUQzRTtBQUFBLFlBQzBGSyxRQUQxRixVQUMwRkEsUUFEMUY7O0FBRUwsZUFDSTtBQUFBO0FBQUEsY0FBSyxXQUFXLEtBQUtDLGtCQUFMLEVBQWhCLEVBQTJDLGNBQVcsUUFBdEQ7QUFDSSxnQ0FBQyxVQUFELElBQVksZUFBZU4sYUFBM0IsR0FESjtBQUVJLGdDQUFDLGFBQUQsT0FGSjtBQUdJLGdDQUFDLFdBQUQsT0FISjtBQUlJLGdDQUFDLFNBQUQsT0FKSjtBQUtJO0FBQUE7QUFBQSxrQkFBSyxjQUFXLE1BQWhCO0FBQ0tJLDRCQUFZLG9CQUFDLFFBQUQ7QUFEakIsYUFMSjtBQVFJLHlDQUFLLGNBQVcsY0FBaEIsR0FSSjtBQVNJO0FBQUE7QUFBQSxrQkFBUSxjQUFXLFFBQW5CO0FBQ0tIO0FBREwsYUFUSjtBQVlLSTtBQVpMLFNBREo7QUFnQkg7QUFoQ3VCLENBQTVCOztBQW1DQUUsT0FBT0MsT0FBUCxHQUFpQix1QkFBUWYsbUJBQVIsQ0FBakIiLCJmaWxlIjoiaXMtcmVhY3QtY2xhc3MtY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gRGVwZW5kZW5jaWVzXHJcblxyXG5pbXBvcnQgYnVpbGRlciBmcm9tICdmb2N1cy1jb3JlL2NvbXBvbmVudC9idWlsZGVyJztcclxuXHJcbi8vIENvbXBvbmVudHNcclxuXHJcbmNvbnN0IEFwcEhlYWRlckRlZmF1bHQgPSByZXF1aXJlKCcuL2FwcC1oZWFkZXInKTtcclxuY29uc3QgTG9hZGluZ0JhckRlZmF1bHQgPSByZXF1aXJlKCcuLi9sb2FkaW5nLWJhcicpLmNvbXBvbmVudDtcclxuY29uc3QgTWVzc2FnZUNlbnRlckRlZmF1bHQgPSByZXF1aXJlKCcuLi9tZXNzYWdlLWNlbnRlcicpLmNvbXBvbmVudDtcclxuY29uc3QgRXJyb3JDZW50ZXJEZWZhdWx0ID0gcmVxdWlyZSgnLi4vZXJyb3ItY2VudGVyJykuY29tcG9uZW50O1xyXG5cclxuLy8gTWl4aW5zXHJcblxyXG5jb25zdCBzdHlsYWJsZUJlaGF2aW91ciA9IHJlcXVpcmUoJy4uLy4uL21peGluL3N0eWxhYmxlJyk7XHJcblxyXG5jb25zdCBjb250ZW50QWN0aW9uc01peGluID0ge1xyXG4gICAgbWl4aW5zOiBbc3R5bGFibGVCZWhhdmlvdXJdLFxyXG4gICAgLyoqIGluaGVyaXRlZGRvYyAqL1xyXG4gICAgZ2V0RGVmYXVsdFByb3BzKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIEFwcEhlYWRlcjogQXBwSGVhZGVyRGVmYXVsdCxcclxuICAgICAgICAgICAgTG9hZGluZ0JhcjogTG9hZGluZ0JhckRlZmF1bHQsXHJcbiAgICAgICAgICAgIE1lc3NhZ2VDZW50ZXI6IE1lc3NhZ2VDZW50ZXJEZWZhdWx0LFxyXG4gICAgICAgICAgICBFcnJvckNlbnRlcjogRXJyb3JDZW50ZXJEZWZhdWx0LFxyXG4gICAgICAgICAgICBkaXNwbGF5RGV2QmFyOiB0cnVlLFxyXG4gICAgICAgICAgICBmb290ZXJUZXh0OiAnUGxlYXNlIG92ZXJyaWRlIHRoZSBmb290ZXIgdGV4dCBieSBnaXZpbmcgYSBcImZvb3RlclRleHRcIiBwcm9wZXJ0eSB0byB0aGUgTGF5b3V0IGNvbXBvbmVudC4nXHJcbiAgICAgICAgfTtcclxuICAgIH0sXHJcbiAgICAvKiogaW5oZXJpdGVkZG9jICovXHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgY29uc3Qge0xvYWRpbmdCYXIsIE1lc3NhZ2VDZW50ZXIsIEVycm9yQ2VudGVyLCBBcHBIZWFkZXIsIE1lbnVMZWZ0LCBmb290ZXJUZXh0LCBkaXNwbGF5RGV2QmFyLCBjaGlsZHJlbn0gPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXt0aGlzLl9nZXRTdHlsZUNsYXNzTmFtZSgpfSBkYXRhLWZvY3VzPSdsYXlvdXQnPlxyXG4gICAgICAgICAgICAgICAgPExvYWRpbmdCYXIgZGlzcGxheURldkJhcj17ZGlzcGxheURldkJhcn0gLz5cclxuICAgICAgICAgICAgICAgIDxNZXNzYWdlQ2VudGVyIC8+XHJcbiAgICAgICAgICAgICAgICA8RXJyb3JDZW50ZXIgLz5cclxuICAgICAgICAgICAgICAgIDxBcHBIZWFkZXIgLz5cclxuICAgICAgICAgICAgICAgIDxkaXYgZGF0YS1mb2N1cz0nbWVudSc+XHJcbiAgICAgICAgICAgICAgICAgICAge01lbnVMZWZ0ICYmIDxNZW51TGVmdC8+fVxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGRhdGEtZm9jdXM9J3BhZ2UtY29udGVudCc+PC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8Zm9vdGVyIGRhdGEtZm9jdXM9J2Zvb3Rlcic+XHJcbiAgICAgICAgICAgICAgICAgICAge2Zvb3RlclRleHR9XHJcbiAgICAgICAgICAgICAgICA8L2Zvb3Rlcj5cclxuICAgICAgICAgICAgICAgIHtjaGlsZHJlbn1cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gYnVpbGRlcihjb250ZW50QWN0aW9uc01peGluKTtcclxuIl19