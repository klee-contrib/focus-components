'use strict';

var _builder = require('focus-core/component/builder');

var _builder2 = _interopRequireDefault(_builder);

var _builtInStore = require('focus-core/application/built-in-store');

var _builtInStore2 = _interopRequireDefault(_builtInStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var React = require('react');


var cartridgeMixin = {
    /** @inheriteddoc */
    getInitialState: function getInitialState() {
        return this._getStateFromStore();
    },

    /** @inheriteddoc */
    componentWillMount: function componentWillMount() {
        _builtInStore2.default.addCartridgeComponentChangeListener(this._handleComponentChange);
    },

    /** @inheriteddoc */
    componentWillUnmount: function componentWillUnmount() {
        _builtInStore2.default.removeCartridgeComponentChangeListener(this._handleComponentChange);
    },

    /**
     * Read the component state from the connected stores.
     * @return {object} - The new state.
     */
    _getStateFromStore: function _getStateFromStore() {
        return { cartridgeComponent: _builtInStore2.default.getCartridgeComponent() || { component: 'div', props: {} } };
    },

    /**
     * Handle the component change cb.
     */
    _handleComponentChange: function _handleComponentChange() {
        this.setState(this._getStateFromStore());
    },

    /** @inheriteddoc */
    render: function render() {
        var cartridgeComponent = this.state.cartridgeComponent;
        var Component = cartridgeComponent.component,
            props = cartridgeComponent.props;

        return React.createElement(
            'div',
            { 'data-focus': 'cartridge' },
            React.createElement(Component, props)
        );
    }
};

module.exports = (0, _builder2.default)(cartridgeMixin);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJSZWFjdCIsInJlcXVpcmUiLCJjYXJ0cmlkZ2VNaXhpbiIsImdldEluaXRpYWxTdGF0ZSIsIl9nZXRTdGF0ZUZyb21TdG9yZSIsImNvbXBvbmVudFdpbGxNb3VudCIsImFkZENhcnRyaWRnZUNvbXBvbmVudENoYW5nZUxpc3RlbmVyIiwiX2hhbmRsZUNvbXBvbmVudENoYW5nZSIsImNvbXBvbmVudFdpbGxVbm1vdW50IiwicmVtb3ZlQ2FydHJpZGdlQ29tcG9uZW50Q2hhbmdlTGlzdGVuZXIiLCJjYXJ0cmlkZ2VDb21wb25lbnQiLCJnZXRDYXJ0cmlkZ2VDb21wb25lbnQiLCJjb21wb25lbnQiLCJwcm9wcyIsInNldFN0YXRlIiwicmVuZGVyIiwic3RhdGUiLCJDb21wb25lbnQiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOztBQUFBOzs7O0FBRUE7Ozs7OztBQURBLElBQU1BLFFBQVFDLFFBQVEsT0FBUixDQUFkOzs7QUFHQSxJQUFNQyxpQkFBaUI7QUFDbkI7QUFDQUMsbUJBRm1CLDZCQUVEO0FBQ2QsZUFBTyxLQUFLQyxrQkFBTCxFQUFQO0FBQ0gsS0FKa0I7O0FBS25CO0FBQ0FDLHNCQU5tQixnQ0FNRTtBQUNqQiwrQkFBaUJDLG1DQUFqQixDQUFxRCxLQUFLQyxzQkFBMUQ7QUFDSCxLQVJrQjs7QUFTbkI7QUFDQUMsd0JBVm1CLGtDQVVJO0FBQ25CLCtCQUFpQkMsc0NBQWpCLENBQXdELEtBQUtGLHNCQUE3RDtBQUNILEtBWmtCOztBQWFuQjs7OztBQUlBSCxzQkFqQm1CLGdDQWlCRTtBQUNqQixlQUFPLEVBQUNNLG9CQUFvQix1QkFBaUJDLHFCQUFqQixNQUE0QyxFQUFDQyxXQUFXLEtBQVosRUFBbUJDLE9BQU8sRUFBMUIsRUFBakUsRUFBUDtBQUNILEtBbkJrQjs7QUFvQm5COzs7QUFHQU4sMEJBdkJtQixvQ0F1Qk07QUFDckIsYUFBS08sUUFBTCxDQUFjLEtBQUtWLGtCQUFMLEVBQWQ7QUFDSCxLQXpCa0I7O0FBMEJuQjtBQUNBVyxVQTNCbUIsb0JBMkJWO0FBQUEsWUFDRUwsa0JBREYsR0FDd0IsS0FBS00sS0FEN0IsQ0FDRU4sa0JBREY7QUFBQSxZQUVhTyxTQUZiLEdBRWlDUCxrQkFGakMsQ0FFRUUsU0FGRjtBQUFBLFlBRXdCQyxLQUZ4QixHQUVpQ0gsa0JBRmpDLENBRXdCRyxLQUZ4Qjs7QUFHTCxlQUNJO0FBQUE7QUFBQSxjQUFLLGNBQVcsV0FBaEI7QUFDSSxnQ0FBQyxTQUFELEVBQWVBLEtBQWY7QUFESixTQURKO0FBS0g7QUFuQ2tCLENBQXZCOztBQXNDQUssT0FBT0MsT0FBUCxHQUFpQix1QkFBUWpCLGNBQVIsQ0FBakIiLCJmaWxlIjoiaXMtcmVhY3QtY2xhc3MtY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGJ1aWxkZXIgZnJvbSAnZm9jdXMtY29yZS9jb21wb25lbnQvYnVpbGRlcic7XHJcbmNvbnN0IFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcclxuaW1wb3J0IGFwcGxpY2F0aW9uU3RvcmUgZnJvbSAnZm9jdXMtY29yZS9hcHBsaWNhdGlvbi9idWlsdC1pbi1zdG9yZSc7XHJcblxyXG5jb25zdCBjYXJ0cmlkZ2VNaXhpbiA9IHtcclxuICAgIC8qKiBAaW5oZXJpdGVkZG9jICovXHJcbiAgICBnZXRJbml0aWFsU3RhdGUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2dldFN0YXRlRnJvbVN0b3JlKCk7XHJcbiAgICB9LFxyXG4gICAgLyoqIEBpbmhlcml0ZWRkb2MgKi9cclxuICAgIGNvbXBvbmVudFdpbGxNb3VudCgpIHtcclxuICAgICAgICBhcHBsaWNhdGlvblN0b3JlLmFkZENhcnRyaWRnZUNvbXBvbmVudENoYW5nZUxpc3RlbmVyKHRoaXMuX2hhbmRsZUNvbXBvbmVudENoYW5nZSk7XHJcbiAgICB9LFxyXG4gICAgLyoqIEBpbmhlcml0ZWRkb2MgKi9cclxuICAgIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xyXG4gICAgICAgIGFwcGxpY2F0aW9uU3RvcmUucmVtb3ZlQ2FydHJpZGdlQ29tcG9uZW50Q2hhbmdlTGlzdGVuZXIodGhpcy5faGFuZGxlQ29tcG9uZW50Q2hhbmdlKTtcclxuICAgIH0sXHJcbiAgICAvKipcclxuICAgICAqIFJlYWQgdGhlIGNvbXBvbmVudCBzdGF0ZSBmcm9tIHRoZSBjb25uZWN0ZWQgc3RvcmVzLlxyXG4gICAgICogQHJldHVybiB7b2JqZWN0fSAtIFRoZSBuZXcgc3RhdGUuXHJcbiAgICAgKi9cclxuICAgIF9nZXRTdGF0ZUZyb21TdG9yZSgpIHtcclxuICAgICAgICByZXR1cm4ge2NhcnRyaWRnZUNvbXBvbmVudDogYXBwbGljYXRpb25TdG9yZS5nZXRDYXJ0cmlkZ2VDb21wb25lbnQoKSB8fCB7Y29tcG9uZW50OiAnZGl2JywgcHJvcHM6IHt9fX07XHJcbiAgICB9LFxyXG4gICAgLyoqXHJcbiAgICAgKiBIYW5kbGUgdGhlIGNvbXBvbmVudCBjaGFuZ2UgY2IuXHJcbiAgICAgKi9cclxuICAgIF9oYW5kbGVDb21wb25lbnRDaGFuZ2UoKSB7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh0aGlzLl9nZXRTdGF0ZUZyb21TdG9yZSgpKTtcclxuICAgIH0sXHJcbiAgICAvKiogQGluaGVyaXRlZGRvYyAqL1xyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIGNvbnN0IHtjYXJ0cmlkZ2VDb21wb25lbnR9ID0gdGhpcy5zdGF0ZTtcclxuICAgICAgICBjb25zdCB7Y29tcG9uZW50OiBDb21wb25lbnQsIHByb3BzfSA9IGNhcnRyaWRnZUNvbXBvbmVudDtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2IGRhdGEtZm9jdXM9J2NhcnRyaWRnZSc+XHJcbiAgICAgICAgICAgICAgICA8Q29tcG9uZW50IHsuLi5wcm9wc30vPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBidWlsZGVyKGNhcnRyaWRnZU1peGluKTtcclxuIl19