'use strict';

var _builder = require('focus-core/component/builder');

var _builder2 = _interopRequireDefault(_builder);

var _types = require('focus-core/component/types');

var _types2 = _interopRequireDefault(_types);

var _network = require('focus-core/network');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var React = require('react');

var assign = require('object-assign');
var ProgressBar = require('../../common/progress-bar').component;
var Icon = require('../../common/icon').component;
var LoadingBarMixin = {
    /** @inheriteddoc */
    getInitialState: function getInitialState() {
        return this._getStateFromStore();
    },

    /** @inheriteddoc */
    componentWillMount: function componentWillMount() {
        _network.builtInStore.addUpdateRequestListener(this._handleRequestsUpdate);
        _network.builtInStore.addClearRequestsListener(this._handleClearRequests);
    },

    /** @inheriteddoc */
    componentWillUnmount: function cartridgeWillUnMount() {
        _network.builtInStore.removeUpdateRequestListener(this._handleRequestsUpdate);
        _network.builtInStore.removeClearRequestsListener(this._handleClearRequests);
    },
    _getStateFromStore: function getCartridgeStateFromStore() {
        return _network.builtInStore.getRequests();
    },
    _handleRequestsUpdate: function _handlePushMessage(messageId) {
        this.setState(this._getStateFromStore());
    },
    _handleClearRequests: function _handleClearRequests() {
        this.setState({ requests: {} });
    },

    /** @inheriteddoc */
    render: function renderProgressBar() {
        var completed = +((this.state.total - this.state.pending) / this.state.total) * 100;
        var visible = false;
        var displayDevBar = this.props.displayDevBar;

        if (completed < 100) {
            visible = true;
        }
        //Else empty the loading list?
        return React.createElement(
            'div',
            { 'data-focus': 'loading-bar' },
            visible && React.createElement(ProgressBar, { completed: completed }),
            displayDevBar && React.createElement(
                'ul',
                { className: 'fa-ul' },
                React.createElement(
                    'li',
                    null,
                    React.createElement(Icon, { name: 'swap_vert' }),
                    ' pending ',
                    this.state.pending
                ),
                React.createElement(
                    'li',
                    null,
                    React.createElement(Icon, { name: 'not_interested' }),
                    ' cancelled ',
                    this.state.cancelled
                ),
                React.createElement(
                    'li',
                    null,
                    React.createElement(Icon, { name: 'check_circle' }),
                    ' success ',
                    this.state.success
                ),
                React.createElement(
                    'li',
                    null,
                    React.createElement(Icon, { name: 'error' }),
                    ' error ',
                    this.state.error
                ),
                React.createElement(
                    'li',
                    null,
                    React.createElement(Icon, { name: 'functions' }),
                    ' total ',
                    this.state.total
                )
            )
        );
    }
};

module.exports = (0, _builder2.default)(LoadingBarMixin);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJSZWFjdCIsInJlcXVpcmUiLCJhc3NpZ24iLCJQcm9ncmVzc0JhciIsImNvbXBvbmVudCIsIkljb24iLCJMb2FkaW5nQmFyTWl4aW4iLCJnZXRJbml0aWFsU3RhdGUiLCJfZ2V0U3RhdGVGcm9tU3RvcmUiLCJjb21wb25lbnRXaWxsTW91bnQiLCJhZGRVcGRhdGVSZXF1ZXN0TGlzdGVuZXIiLCJfaGFuZGxlUmVxdWVzdHNVcGRhdGUiLCJhZGRDbGVhclJlcXVlc3RzTGlzdGVuZXIiLCJfaGFuZGxlQ2xlYXJSZXF1ZXN0cyIsImNvbXBvbmVudFdpbGxVbm1vdW50IiwiY2FydHJpZGdlV2lsbFVuTW91bnQiLCJyZW1vdmVVcGRhdGVSZXF1ZXN0TGlzdGVuZXIiLCJyZW1vdmVDbGVhclJlcXVlc3RzTGlzdGVuZXIiLCJnZXRDYXJ0cmlkZ2VTdGF0ZUZyb21TdG9yZSIsImdldFJlcXVlc3RzIiwiX2hhbmRsZVB1c2hNZXNzYWdlIiwibWVzc2FnZUlkIiwic2V0U3RhdGUiLCJyZXF1ZXN0cyIsInJlbmRlciIsInJlbmRlclByb2dyZXNzQmFyIiwiY29tcGxldGVkIiwic3RhdGUiLCJ0b3RhbCIsInBlbmRpbmciLCJ2aXNpYmxlIiwiZGlzcGxheURldkJhciIsInByb3BzIiwiY2FuY2VsbGVkIiwic3VjY2VzcyIsImVycm9yIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7OztBQUVBOzs7O0FBQ0E7Ozs7QUFGQSxJQUFJQSxRQUFRQyxRQUFRLE9BQVIsQ0FBWjs7QUFHQSxJQUFJQyxTQUFTRCxRQUFRLGVBQVIsQ0FBYjtBQUNBLElBQUlFLGNBQWNGLFFBQVEsMkJBQVIsRUFBcUNHLFNBQXZEO0FBQ0EsSUFBSUMsT0FBT0osUUFBUSxtQkFBUixFQUE2QkcsU0FBeEM7QUFDQSxJQUFJRSxrQkFBa0I7QUFDbEI7QUFDQUMsbUJBRmtCLDZCQUVBO0FBQ2QsZUFBTyxLQUFLQyxrQkFBTCxFQUFQO0FBQ0gsS0FKaUI7O0FBS2xCO0FBQ0FDLHNCQU5rQixnQ0FNRztBQUNqQiw4QkFBYUMsd0JBQWIsQ0FBc0MsS0FBS0MscUJBQTNDO0FBQ0EsOEJBQWFDLHdCQUFiLENBQXNDLEtBQUtDLG9CQUEzQztBQUNILEtBVGlCOztBQVVsQjtBQUNBQywwQkFBc0IsU0FBU0Msb0JBQVQsR0FBZ0M7QUFDbEQsOEJBQWFDLDJCQUFiLENBQXlDLEtBQUtMLHFCQUE5QztBQUNBLDhCQUFhTSwyQkFBYixDQUF5QyxLQUFLSixvQkFBOUM7QUFDSCxLQWRpQjtBQWVsQkwsd0JBQW9CLFNBQVNVLDBCQUFULEdBQXNDO0FBQ3RELGVBQU8sc0JBQWFDLFdBQWIsRUFBUDtBQUNILEtBakJpQjtBQWtCbEJSLDJCQUF1QixTQUFTUyxrQkFBVCxDQUE0QkMsU0FBNUIsRUFBdUM7QUFDMUQsYUFBS0MsUUFBTCxDQUFjLEtBQUtkLGtCQUFMLEVBQWQ7QUFDSCxLQXBCaUI7QUFxQmxCSyx3QkFyQmtCLGtDQXFCSztBQUNuQixhQUFLUyxRQUFMLENBQWMsRUFBQ0MsVUFBVSxFQUFYLEVBQWQ7QUFDSCxLQXZCaUI7O0FBd0JsQjtBQUNBQyxZQUFRLFNBQVNDLGlCQUFULEdBQTZCO0FBQ2pDLFlBQUlDLFlBQVksRUFBRSxDQUFDLEtBQUtDLEtBQUwsQ0FBV0MsS0FBWCxHQUFtQixLQUFLRCxLQUFMLENBQVdFLE9BQS9CLElBQXdDLEtBQUtGLEtBQUwsQ0FBV0MsS0FBckQsSUFBNEQsR0FBNUU7QUFDQSxZQUFJRSxVQUFVLEtBQWQ7QUFGaUMsWUFHMUJDLGFBSDBCLEdBR1QsS0FBS0MsS0FISSxDQUcxQkQsYUFIMEI7O0FBSWpDLFlBQUdMLFlBQVksR0FBZixFQUFvQjtBQUNoQkksc0JBQVUsSUFBVjtBQUNIO0FBQ0Q7QUFDQSxlQUNJO0FBQUE7QUFBQSxjQUFLLGNBQVcsYUFBaEI7QUFDS0EsdUJBQVcsb0JBQUMsV0FBRCxJQUFhLFdBQVdKLFNBQXhCLEdBRGhCO0FBRUtLLDZCQUNHO0FBQUE7QUFBQSxrQkFBSSxXQUFVLE9BQWQ7QUFDSTtBQUFBO0FBQUE7QUFBSSx3Q0FBQyxJQUFELElBQU0sTUFBSyxXQUFYLEdBQUo7QUFBQTtBQUFzQyx5QkFBS0osS0FBTCxDQUFXRTtBQUFqRCxpQkFESjtBQUVJO0FBQUE7QUFBQTtBQUFJLHdDQUFDLElBQUQsSUFBTSxNQUFLLGdCQUFYLEdBQUo7QUFBQTtBQUE2Qyx5QkFBS0YsS0FBTCxDQUFXTTtBQUF4RCxpQkFGSjtBQUdJO0FBQUE7QUFBQTtBQUFJLHdDQUFDLElBQUQsSUFBTSxNQUFLLGNBQVgsR0FBSjtBQUFBO0FBQXlDLHlCQUFLTixLQUFMLENBQVdPO0FBQXBELGlCQUhKO0FBSUk7QUFBQTtBQUFBO0FBQUksd0NBQUMsSUFBRCxJQUFNLE1BQUssT0FBWCxHQUFKO0FBQUE7QUFBZ0MseUJBQUtQLEtBQUwsQ0FBV1E7QUFBM0MsaUJBSko7QUFLSTtBQUFBO0FBQUE7QUFBSSx3Q0FBQyxJQUFELElBQU0sTUFBSyxXQUFYLEdBQUo7QUFBQTtBQUFvQyx5QkFBS1IsS0FBTCxDQUFXQztBQUEvQztBQUxKO0FBSFIsU0FESjtBQWNIO0FBL0NpQixDQUF0Qjs7QUFrREFRLE9BQU9DLE9BQVAsR0FBaUIsdUJBQVEvQixlQUFSLENBQWpCIiwiZmlsZSI6ImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBidWlsZGVyIGZyb20gJ2ZvY3VzLWNvcmUvY29tcG9uZW50L2J1aWxkZXInO1xyXG5sZXQgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xyXG5pbXBvcnQgdHlwZSBmcm9tICdmb2N1cy1jb3JlL2NvbXBvbmVudC90eXBlcyc7XHJcbmltcG9ydCB7YnVpbHRJblN0b3JlIGFzIHJlcXVlc3RTdG9yZX0gZnJvbSAnZm9jdXMtY29yZS9uZXR3b3JrJztcclxubGV0IGFzc2lnbiA9IHJlcXVpcmUoJ29iamVjdC1hc3NpZ24nKTtcclxubGV0IFByb2dyZXNzQmFyID0gcmVxdWlyZSgnLi4vLi4vY29tbW9uL3Byb2dyZXNzLWJhcicpLmNvbXBvbmVudDtcclxubGV0IEljb24gPSByZXF1aXJlKCcuLi8uLi9jb21tb24vaWNvbicpLmNvbXBvbmVudDtcclxubGV0IExvYWRpbmdCYXJNaXhpbiA9IHtcclxuICAgIC8qKiBAaW5oZXJpdGVkZG9jICovXHJcbiAgICBnZXRJbml0aWFsU3RhdGUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2dldFN0YXRlRnJvbVN0b3JlKCk7XHJcbiAgICB9LFxyXG4gICAgLyoqIEBpbmhlcml0ZWRkb2MgKi9cclxuICAgIGNvbXBvbmVudFdpbGxNb3VudCgpIHtcclxuICAgICAgICByZXF1ZXN0U3RvcmUuYWRkVXBkYXRlUmVxdWVzdExpc3RlbmVyKHRoaXMuX2hhbmRsZVJlcXVlc3RzVXBkYXRlKTtcclxuICAgICAgICByZXF1ZXN0U3RvcmUuYWRkQ2xlYXJSZXF1ZXN0c0xpc3RlbmVyKHRoaXMuX2hhbmRsZUNsZWFyUmVxdWVzdHMpO1xyXG4gICAgfSxcclxuICAgIC8qKiBAaW5oZXJpdGVkZG9jICovXHJcbiAgICBjb21wb25lbnRXaWxsVW5tb3VudDogZnVuY3Rpb24gY2FydHJpZGdlV2lsbFVuTW91bnQoKSB7XHJcbiAgICAgICAgcmVxdWVzdFN0b3JlLnJlbW92ZVVwZGF0ZVJlcXVlc3RMaXN0ZW5lcih0aGlzLl9oYW5kbGVSZXF1ZXN0c1VwZGF0ZSk7XHJcbiAgICAgICAgcmVxdWVzdFN0b3JlLnJlbW92ZUNsZWFyUmVxdWVzdHNMaXN0ZW5lcih0aGlzLl9oYW5kbGVDbGVhclJlcXVlc3RzKTtcclxuICAgIH0sXHJcbiAgICBfZ2V0U3RhdGVGcm9tU3RvcmU6IGZ1bmN0aW9uIGdldENhcnRyaWRnZVN0YXRlRnJvbVN0b3JlKCkge1xyXG4gICAgICAgIHJldHVybiByZXF1ZXN0U3RvcmUuZ2V0UmVxdWVzdHMoKTtcclxuICAgIH0sXHJcbiAgICBfaGFuZGxlUmVxdWVzdHNVcGRhdGU6IGZ1bmN0aW9uIF9oYW5kbGVQdXNoTWVzc2FnZShtZXNzYWdlSWQpIHtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHRoaXMuX2dldFN0YXRlRnJvbVN0b3JlKCkpO1xyXG4gICAgfSxcclxuICAgIF9oYW5kbGVDbGVhclJlcXVlc3RzKCkge1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe3JlcXVlc3RzOiB7fX0pO1xyXG4gICAgfSxcclxuICAgIC8qKiBAaW5oZXJpdGVkZG9jICovXHJcbiAgICByZW5kZXI6IGZ1bmN0aW9uIHJlbmRlclByb2dyZXNzQmFyKCkge1xyXG4gICAgICAgIHZhciBjb21wbGV0ZWQgPSArKCh0aGlzLnN0YXRlLnRvdGFsIC0gdGhpcy5zdGF0ZS5wZW5kaW5nKS90aGlzLnN0YXRlLnRvdGFsKSoxMDA7XHJcbiAgICAgICAgdmFyIHZpc2libGUgPSBmYWxzZTtcclxuICAgICAgICBjb25zdCB7ZGlzcGxheURldkJhcn0gPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIGlmKGNvbXBsZXRlZCA8IDEwMCkge1xyXG4gICAgICAgICAgICB2aXNpYmxlID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy9FbHNlIGVtcHR5IHRoZSBsb2FkaW5nIGxpc3Q/XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdiBkYXRhLWZvY3VzPSdsb2FkaW5nLWJhcic+XHJcbiAgICAgICAgICAgICAgICB7dmlzaWJsZSAmJiA8UHJvZ3Jlc3NCYXIgY29tcGxldGVkPXtjb21wbGV0ZWR9IC8+fVxyXG4gICAgICAgICAgICAgICAge2Rpc3BsYXlEZXZCYXIgJiZcclxuICAgICAgICAgICAgICAgICAgICA8dWwgY2xhc3NOYW1lPSdmYS11bCc+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxsaT48SWNvbiBuYW1lPSdzd2FwX3ZlcnQnLz4gcGVuZGluZyB7dGhpcy5zdGF0ZS5wZW5kaW5nfTwvbGk+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxsaT48SWNvbiBuYW1lPSdub3RfaW50ZXJlc3RlZCcvPiBjYW5jZWxsZWQge3RoaXMuc3RhdGUuY2FuY2VsbGVkfTwvbGk+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxsaT48SWNvbiBuYW1lPSdjaGVja19jaXJjbGUnLz4gc3VjY2VzcyB7dGhpcy5zdGF0ZS5zdWNjZXNzfTwvbGk+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxsaT48SWNvbiBuYW1lPSdlcnJvcicvPiBlcnJvciB7dGhpcy5zdGF0ZS5lcnJvcn08L2xpPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8bGk+PEljb24gbmFtZT0nZnVuY3Rpb25zJy8+IHRvdGFsIHt0aGlzLnN0YXRlLnRvdGFsfTwvbGk+XHJcbiAgICAgICAgICAgICAgICAgICAgPC91bD5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gYnVpbGRlcihMb2FkaW5nQmFyTWl4aW4pO1xyXG4iXX0=