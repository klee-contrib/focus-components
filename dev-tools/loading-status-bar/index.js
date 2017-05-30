'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _network = require('focus-core/network');

var _loadingStatus = require('./loading-status');

var _loadingStatus2 = _interopRequireDefault(_loadingStatus);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var LoadingStatusWrapper = function (_Component) {
    _inherits(LoadingStatusWrapper, _Component);

    function LoadingStatusWrapper(props) {
        _classCallCheck(this, LoadingStatusWrapper);

        var _this = _possibleConstructorReturn(this, _Component.call(this, props));

        _this.state = {
            total: 0,
            pending: 0
        };

        return _this;
    }

    LoadingStatusWrapper.prototype.componentWillMount = function componentWillMount() {
        _network.builtInStore.addUpdateRequestListener(this._handleRequestsUpdate.bind(this));
        _network.builtInStore.addClearRequestsListener(this._handleClearRequests.bind(this));
    };

    LoadingStatusWrapper.prototype.componentWillUnmount = function componentWillUnmount() {
        _network.builtInStore.removeUpdateRequestListener(this._handleRequestsUpdate);
        _network.builtInStore.removeClearRequestsListener(this._handleClearRequests);
    };

    LoadingStatusWrapper.prototype._handleRequestsUpdate = function _handleRequestsUpdate() {
        this.setState(_network.builtInStore.getRequests());
    };

    LoadingStatusWrapper.prototype._handleClearRequests = function _handleClearRequests() {
        this.setState({ requests: {} });
    };

    LoadingStatusWrapper.prototype.render = function render() {
        var _state = this.state,
            total = _state.total,
            pending = _state.pending;

        var isLoading = +((total - pending) / total) * 100 < 100;
        return isLoading ? _react2.default.createElement(_loadingStatus2.default, null) : null;
    };

    return LoadingStatusWrapper;
}(_react.Component);

exports.default = LoadingStatusWrapper;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJMb2FkaW5nU3RhdHVzV3JhcHBlciIsInByb3BzIiwic3RhdGUiLCJ0b3RhbCIsInBlbmRpbmciLCJjb21wb25lbnRXaWxsTW91bnQiLCJhZGRVcGRhdGVSZXF1ZXN0TGlzdGVuZXIiLCJfaGFuZGxlUmVxdWVzdHNVcGRhdGUiLCJhZGRDbGVhclJlcXVlc3RzTGlzdGVuZXIiLCJfaGFuZGxlQ2xlYXJSZXF1ZXN0cyIsImNvbXBvbmVudFdpbGxVbm1vdW50IiwicmVtb3ZlVXBkYXRlUmVxdWVzdExpc3RlbmVyIiwicmVtb3ZlQ2xlYXJSZXF1ZXN0c0xpc3RlbmVyIiwic2V0U3RhdGUiLCJnZXRSZXF1ZXN0cyIsInJlcXVlc3RzIiwicmVuZGVyIiwiaXNMb2FkaW5nIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTs7OztBQUNBOztBQUNBOzs7Ozs7Ozs7Ozs7OztJQUVNQSxvQjs7O0FBQ0Ysa0NBQVlDLEtBQVosRUFBbUI7QUFBQTs7QUFBQSxxREFDZixzQkFBTUEsS0FBTixDQURlOztBQUVmLGNBQUtDLEtBQUwsR0FBYTtBQUNUQyxtQkFBTyxDQURFO0FBRVRDLHFCQUFTO0FBRkEsU0FBYjs7QUFGZTtBQU9sQjs7bUNBQ0RDLGtCLGlDQUFxQjtBQUNqQiw4QkFBYUMsd0JBQWIsQ0FBd0MsS0FBS0MscUJBQTdDLE1BQXdDLElBQXhDO0FBQ0EsOEJBQWFDLHdCQUFiLENBQXdDLEtBQUtDLG9CQUE3QyxNQUF3QyxJQUF4QztBQUNILEs7O21DQUNEQyxvQixtQ0FBdUI7QUFDbkIsOEJBQWFDLDJCQUFiLENBQXlDLEtBQUtKLHFCQUE5QztBQUNBLDhCQUFhSywyQkFBYixDQUF5QyxLQUFLSCxvQkFBOUM7QUFDSCxLOzttQ0FDREYscUIsb0NBQXdCO0FBQ3BCLGFBQUtNLFFBQUwsQ0FBYyxzQkFBYUMsV0FBYixFQUFkO0FBQ0gsSzs7bUNBQ0RMLG9CLG1DQUF1QjtBQUNuQixhQUFLSSxRQUFMLENBQWMsRUFBQ0UsVUFBVSxFQUFYLEVBQWQ7QUFDSCxLOzttQ0FDREMsTSxxQkFBUztBQUFBLHFCQUNvQixLQUFLZCxLQUR6QjtBQUFBLFlBQ0VDLEtBREYsVUFDRUEsS0FERjtBQUFBLFlBQ1NDLE9BRFQsVUFDU0EsT0FEVDs7QUFFTCxZQUFNYSxZQUFhLEVBQUUsQ0FBQ2QsUUFBUUMsT0FBVCxJQUFrQkQsS0FBcEIsSUFBMkIsR0FBNUIsR0FBbUMsR0FBckQ7QUFDQSxlQUFPYyxZQUFZLDREQUFaLEdBQWdDLElBQXZDO0FBQ0gsSzs7Ozs7a0JBR1VqQixvQiIsImZpbGUiOiJpcy1yZWFjdC1jbGFzcy1jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnQsIFByb3BUeXBlc30gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQge2J1aWx0SW5TdG9yZSBhcyByZXF1ZXN0U3RvcmV9IGZyb20gJ2ZvY3VzLWNvcmUvbmV0d29yayc7XHJcbmltcG9ydCBMb2FkaW5nU3RhdHVzIGZyb20gJy4vbG9hZGluZy1zdGF0dXMnO1xyXG5cclxuY2xhc3MgTG9hZGluZ1N0YXR1c1dyYXBwZXIgZXh0ZW5kcyBDb21wb25lbnQge1xyXG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcclxuICAgICAgICBzdXBlcihwcm9wcyk7XHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcclxuICAgICAgICAgICAgdG90YWw6IDAsXHJcbiAgICAgICAgICAgIHBlbmRpbmc6IDBcclxuICAgICAgICB9O1xyXG5cclxuICAgIH1cclxuICAgIGNvbXBvbmVudFdpbGxNb3VudCgpIHtcclxuICAgICAgICByZXF1ZXN0U3RvcmUuYWRkVXBkYXRlUmVxdWVzdExpc3RlbmVyKDo6dGhpcy5faGFuZGxlUmVxdWVzdHNVcGRhdGUpO1xyXG4gICAgICAgIHJlcXVlc3RTdG9yZS5hZGRDbGVhclJlcXVlc3RzTGlzdGVuZXIoOjp0aGlzLl9oYW5kbGVDbGVhclJlcXVlc3RzKTtcclxuICAgIH1cclxuICAgIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xyXG4gICAgICAgIHJlcXVlc3RTdG9yZS5yZW1vdmVVcGRhdGVSZXF1ZXN0TGlzdGVuZXIodGhpcy5faGFuZGxlUmVxdWVzdHNVcGRhdGUpO1xyXG4gICAgICAgIHJlcXVlc3RTdG9yZS5yZW1vdmVDbGVhclJlcXVlc3RzTGlzdGVuZXIodGhpcy5faGFuZGxlQ2xlYXJSZXF1ZXN0cyk7XHJcbiAgICB9XHJcbiAgICBfaGFuZGxlUmVxdWVzdHNVcGRhdGUoKSB7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZShyZXF1ZXN0U3RvcmUuZ2V0UmVxdWVzdHMoKSk7XHJcbiAgICB9XHJcbiAgICBfaGFuZGxlQ2xlYXJSZXF1ZXN0cygpIHtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHtyZXF1ZXN0czoge319KTtcclxuICAgIH1cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICBjb25zdCB7dG90YWwsIHBlbmRpbmd9ID0gdGhpcy5zdGF0ZTtcclxuICAgICAgICBjb25zdCBpc0xvYWRpbmcgPSAoKygodG90YWwgLSBwZW5kaW5nKS90b3RhbCkqMTAwKSA8IDEwMDtcclxuICAgICAgICByZXR1cm4gaXNMb2FkaW5nID8gPExvYWRpbmdTdGF0dXMgLz4gOiBudWxsO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBMb2FkaW5nU3RhdHVzV3JhcHBlcjtcclxuIl19