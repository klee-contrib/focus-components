'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _dec, _class;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _lang = require('lodash/lang');

var _confirmationPopin = require('../../application/confirmation-popin');

var _connect = require('../../behaviours/store/connect');

var _connect2 = _interopRequireDefault(_connect);

var _application = require('focus-core/application');

var _application2 = _interopRequireDefault(_application);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var applicationStore = _application2.default.builtInStore;

var propTypes = {
    isVisible: _react.PropTypes.bool,
    ConfirmContentComponent: _react.PropTypes.oneOfType([_react.PropTypes.func, _react.PropTypes.string]),
    handleCancel: _react.PropTypes.func,
    handleConfirm: _react.PropTypes.func
};

var defaultProps = {
    isVisible: false,
    ConfirmContentComponent: null
};

var ConfirmWrapper = (_dec = (0, _connect2.default)([{ store: applicationStore, properties: ['confirmConfig'] }], function () {
    var _ref = applicationStore.getConfirmConfig() || {},
        _ref$isVisible = _ref.isVisible,
        isVisible = _ref$isVisible === undefined ? false : _ref$isVisible,
        _ref$Content = _ref.Content,
        ConfirmContentComponent = _ref$Content === undefined ? null : _ref$Content,
        cancelHandler = _ref.handleCancel,
        confirmHandler = _ref.handleConfirm,
        contentProps = _objectWithoutProperties(_ref, ['isVisible', 'Content', 'handleCancel', 'handleConfirm']);

    return { isVisible: isVisible, ConfirmContentComponent: ConfirmContentComponent, cancelHandler: cancelHandler, confirmHandler: confirmHandler, contentProps: contentProps };
}), _dec(_class = function (_Component) {
    _inherits(ConfirmWrapper, _Component);

    function ConfirmWrapper() {
        _classCallCheck(this, ConfirmWrapper);

        return _possibleConstructorReturn(this, _Component.apply(this, arguments));
    }

    ConfirmWrapper.prototype.render = function render() {
        var _props = this.props,
            isVisible = _props.isVisible,
            ConfirmContentComponent = _props.ConfirmContentComponent,
            cancelHandler = _props.cancelHandler,
            confirmHandler = _props.confirmHandler,
            contentProps = _props.contentProps;

        var ConfirmContent = (0, _lang.isString)(ConfirmContentComponent) ? function () {
            return _react2.default.createElement(
                'span',
                null,
                ConfirmContentComponent
            );
        } : ConfirmContentComponent;
        return isVisible ? _react2.default.createElement(
            _confirmationPopin.component,
            _extends({ open: true, cancelHandler: cancelHandler, confirmHandler: confirmHandler }, contentProps),
            ConfirmContent ? _react2.default.createElement(ConfirmContent, null) : null
        ) : null;
    };

    return ConfirmWrapper;
}(_react.Component)) || _class);


ConfirmWrapper.propTypes = propTypes;
ConfirmWrapper.defaultProps = defaultProps;
ConfirmWrapper.displayName = 'ConfirmWrapper';

exports.default = ConfirmWrapper;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJhcHBsaWNhdGlvblN0b3JlIiwiYnVpbHRJblN0b3JlIiwicHJvcFR5cGVzIiwiaXNWaXNpYmxlIiwiYm9vbCIsIkNvbmZpcm1Db250ZW50Q29tcG9uZW50Iiwib25lT2ZUeXBlIiwiZnVuYyIsInN0cmluZyIsImhhbmRsZUNhbmNlbCIsImhhbmRsZUNvbmZpcm0iLCJkZWZhdWx0UHJvcHMiLCJDb25maXJtV3JhcHBlciIsInN0b3JlIiwicHJvcGVydGllcyIsImdldENvbmZpcm1Db25maWciLCJDb250ZW50IiwiY2FuY2VsSGFuZGxlciIsImNvbmZpcm1IYW5kbGVyIiwiY29udGVudFByb3BzIiwicmVuZGVyIiwicHJvcHMiLCJDb25maXJtQ29udGVudCIsImRpc3BsYXlOYW1lIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOztBQUNBOztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7SUFDcUJBLGdCLHlCQUFkQyxZOztBQUNQLElBQU1DLFlBQVk7QUFDZEMsZUFBVyxpQkFBVUMsSUFEUDtBQUVkQyw2QkFBeUIsaUJBQVVDLFNBQVYsQ0FBb0IsQ0FBQyxpQkFBVUMsSUFBWCxFQUFpQixpQkFBVUMsTUFBM0IsQ0FBcEIsQ0FGWDtBQUdkQyxrQkFBYyxpQkFBVUYsSUFIVjtBQUlkRyxtQkFBZSxpQkFBVUg7QUFKWCxDQUFsQjs7QUFPQSxJQUFNSSxlQUFlO0FBQ2pCUixlQUFXLEtBRE07QUFFakJFLDZCQUF5QjtBQUZSLENBQXJCOztJQWFNTyxjLFdBUEwsdUJBQ0csQ0FBQyxFQUFDQyxPQUFPYixnQkFBUixFQUEwQmMsWUFBWSxDQUFDLGVBQUQsQ0FBdEMsRUFBRCxDQURILEVBRUcsWUFBTTtBQUFBLGVBQ2dKZCxpQkFBaUJlLGdCQUFqQixNQUF1QyxFQUR2TDtBQUFBLDhCQUNLWixTQURMO0FBQUEsUUFDS0EsU0FETCxrQ0FDaUIsS0FEakI7QUFBQSw0QkFDd0JhLE9BRHhCO0FBQUEsUUFDaUNYLHVCQURqQyxnQ0FDMkQsSUFEM0Q7QUFBQSxRQUMrRVksYUFEL0UsUUFDaUVSLFlBRGpFO0FBQUEsUUFDNkdTLGNBRDdHLFFBQzhGUixhQUQ5RjtBQUFBLFFBQ2dJUyxZQURoSTs7QUFFRixXQUFPLEVBQUNoQixvQkFBRCxFQUFZRSxnREFBWixFQUFxQ1ksNEJBQXJDLEVBQW9EQyw4QkFBcEQsRUFBb0VDLDBCQUFwRSxFQUFQO0FBQ0gsQ0FMSixDOzs7Ozs7Ozs7NkJBUUdDLE0scUJBQVM7QUFBQSxxQkFDcUYsS0FBS0MsS0FEMUY7QUFBQSxZQUNFbEIsU0FERixVQUNFQSxTQURGO0FBQUEsWUFDYUUsdUJBRGIsVUFDYUEsdUJBRGI7QUFBQSxZQUNzQ1ksYUFEdEMsVUFDc0NBLGFBRHRDO0FBQUEsWUFDcURDLGNBRHJELFVBQ3FEQSxjQURyRDtBQUFBLFlBQ3FFQyxZQURyRSxVQUNxRUEsWUFEckU7O0FBRUwsWUFBTUcsaUJBQWlCLG9CQUFTakIsdUJBQVQsSUFBcUM7QUFBQSxtQkFBTTtBQUFBO0FBQUE7QUFBT0E7QUFBUCxhQUFOO0FBQUEsU0FBckMsR0FBcUZBLHVCQUE1RztBQUNBLGVBQU9GLFlBQVk7QUFBQTtBQUFBLHVCQUFtQixVQUFuQixFQUF3QixlQUFlYyxhQUF2QyxFQUFzRCxnQkFBZ0JDLGNBQXRFLElBQTBGQyxZQUExRjtBQUF5R0csNkJBQWlCLDhCQUFDLGNBQUQsT0FBakIsR0FBc0M7QUFBL0ksU0FBWixHQUF1TCxJQUE5TDtBQUNILEs7Ozs7OztBQUdMVixlQUFlVixTQUFmLEdBQTJCQSxTQUEzQjtBQUNBVSxlQUFlRCxZQUFmLEdBQThCQSxZQUE5QjtBQUNBQyxlQUFlVyxXQUFmLEdBQTZCLGdCQUE3Qjs7a0JBRWVYLGMiLCJmaWxlIjoiaXMtcmVhY3QtY2xhc3MtY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IFJlYWN0RE9NIGZyb20gJ3JlYWN0LWRvbSc7XHJcbmltcG9ydCB7aXNTdHJpbmd9IGZyb20gJ2xvZGFzaC9sYW5nJztcclxuaW1wb3J0IHtjb21wb25lbnQgYXMgQ29uZmlybWF0aW9uTW9kYWx9IGZyb20gJy4uLy4uL2FwcGxpY2F0aW9uL2NvbmZpcm1hdGlvbi1wb3Bpbic7XHJcbmltcG9ydCBDb25uZWN0IGZyb20gJy4uLy4uL2JlaGF2aW91cnMvc3RvcmUvY29ubmVjdCc7XHJcbmltcG9ydCBhcHBsaWNhdGlvbiBmcm9tICdmb2N1cy1jb3JlL2FwcGxpY2F0aW9uJztcclxuY29uc3Qge2J1aWx0SW5TdG9yZTogYXBwbGljYXRpb25TdG9yZX0gPSBhcHBsaWNhdGlvbjtcclxuY29uc3QgcHJvcFR5cGVzID0ge1xyXG4gICAgaXNWaXNpYmxlOiBQcm9wVHlwZXMuYm9vbCxcclxuICAgIENvbmZpcm1Db250ZW50Q29tcG9uZW50OiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuZnVuYywgUHJvcFR5cGVzLnN0cmluZ10pLFxyXG4gICAgaGFuZGxlQ2FuY2VsOiBQcm9wVHlwZXMuZnVuYyxcclxuICAgIGhhbmRsZUNvbmZpcm06IFByb3BUeXBlcy5mdW5jXHJcbn07XHJcblxyXG5jb25zdCBkZWZhdWx0UHJvcHMgPSB7XHJcbiAgICBpc1Zpc2libGU6IGZhbHNlLFxyXG4gICAgQ29uZmlybUNvbnRlbnRDb21wb25lbnQ6IG51bGxcclxufTtcclxuXHJcblxyXG5AQ29ubmVjdChcclxuICAgIFt7c3RvcmU6IGFwcGxpY2F0aW9uU3RvcmUsIHByb3BlcnRpZXM6IFsnY29uZmlybUNvbmZpZyddfV0sXHJcbiAgICAoKSA9PiB7XHJcbiAgICAgICAgY29uc3Qge2lzVmlzaWJsZSA9IGZhbHNlLCBDb250ZW50OiBDb25maXJtQ29udGVudENvbXBvbmVudCA9IG51bGwsIGhhbmRsZUNhbmNlbDogY2FuY2VsSGFuZGxlciwgaGFuZGxlQ29uZmlybTogY29uZmlybUhhbmRsZXIsIC4uLmNvbnRlbnRQcm9wc30gPSBhcHBsaWNhdGlvblN0b3JlLmdldENvbmZpcm1Db25maWcoKSB8fCB7fTtcclxuICAgICAgICByZXR1cm4ge2lzVmlzaWJsZSwgQ29uZmlybUNvbnRlbnRDb21wb25lbnQsIGNhbmNlbEhhbmRsZXIsIGNvbmZpcm1IYW5kbGVyLCBjb250ZW50UHJvcHN9O1xyXG4gICAgfVxyXG4pXHJcbmNsYXNzIENvbmZpcm1XcmFwcGVyIGV4dGVuZHMgQ29tcG9uZW50IHtcclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICBjb25zdCB7aXNWaXNpYmxlLCBDb25maXJtQ29udGVudENvbXBvbmVudCwgY2FuY2VsSGFuZGxlciwgY29uZmlybUhhbmRsZXIsIGNvbnRlbnRQcm9wc30gPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIGNvbnN0IENvbmZpcm1Db250ZW50ID0gaXNTdHJpbmcoQ29uZmlybUNvbnRlbnRDb21wb25lbnQpID8gKCgpID0+IDxzcGFuPntDb25maXJtQ29udGVudENvbXBvbmVudH08L3NwYW4+KSA6IENvbmZpcm1Db250ZW50Q29tcG9uZW50O1xyXG4gICAgICAgIHJldHVybiBpc1Zpc2libGUgPyA8Q29uZmlybWF0aW9uTW9kYWwgb3BlbiBjYW5jZWxIYW5kbGVyPXtjYW5jZWxIYW5kbGVyfSBjb25maXJtSGFuZGxlcj17Y29uZmlybUhhbmRsZXJ9IHsuLi5jb250ZW50UHJvcHN9PntDb25maXJtQ29udGVudCA/IDxDb25maXJtQ29udGVudCAvPiA6IG51bGx9PC9Db25maXJtYXRpb25Nb2RhbD4gOiBudWxsO1xyXG4gICAgfVxyXG59XHJcblxyXG5Db25maXJtV3JhcHBlci5wcm9wVHlwZXMgPSBwcm9wVHlwZXM7XHJcbkNvbmZpcm1XcmFwcGVyLmRlZmF1bHRQcm9wcyA9IGRlZmF1bHRQcm9wcztcclxuQ29uZmlybVdyYXBwZXIuZGlzcGxheU5hbWUgPSAnQ29uZmlybVdyYXBwZXInO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgQ29uZmlybVdyYXBwZXI7XHJcbiJdfQ==