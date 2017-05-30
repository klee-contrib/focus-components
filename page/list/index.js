'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _builder = require('focus-core/component/builder');

var _builder2 = _interopRequireDefault(_builder);

var _types = require('focus-core/component/types');

var _types2 = _interopRequireDefault(_types);

var _actionBuilder = require('focus-core/list/action-builder');

var _actionBuilder2 = _interopRequireDefault(_actionBuilder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//The purpose of this module is to deal with autonomous lists.
//If you need lists inside a form please see the listFor helper function in a form.
//The following lists can
//- be loaded from a criteria (or without) (the criteria can be the result of a form)
//- be paginated
//- be displayed in any list container.
var React = require('react');

var _require = require('lodash/string'),
    camelCase = _require.camelCase,
    capitalize = _require.capitalize;

var type = _types2.default;
var assign = require('object-assign');

var STORE_NODE = ['criteria', 'groupingKey', 'sortBy', 'sortAsc', 'dataList', 'totalCount'];
var DEFAULT_LIST_COMPONENT = require('../../list/table/list').component;
/**
 * Cretes a name for the property listener.
 * @param  {string} node - Node name.
 * @return {string} the built property.
 */
function _listenerProp(node) {
    return 'add' + capitalize(camelCase(node)) + 'ChangeListener';
}
function _unListenerProp(node) {
    return 'remove' + capitalize(camelCase(node)) + 'ChangeListener';
}
/**
 * Mixin to deal the list page.
 * @type {Object}
 */
var listPageMixin = {
    getDefaultProps: function getDefaultProps() {
        return {
            ListComponent: DEFAULT_LIST_COMPONENT,
            pickProps: function pickProps(props) {
                return props;
            }
        };
    },
    getInitialState: function getInitialState() {
        return {};
    },

    /** @inheritdoc */
    propTypes: {
        //Store object.
        pickProps: type('func'),
        service: type('func'),
        store: type('object').isRequired
    },
    /**
     *  Build the action from.
     */
    _buildAction: function _buildAction() {
        var _this = this;

        this._action = this.props.action || (0, _actionBuilder2.default)({
            service: this.props.service,
            identifier: this.props.store.identifier,
            getListOptions: function getListOptions() {
                return _this.props.store.getValue.call(_this.props.store);
            } // Binding the store in the function call
        });
    },

    /**
     * Read the state from the store.
     * @return {object} - The object read from the store.
     */
    _getStateFromStore: function _getStateFromStore() {
        var store = this.props.store;
        return store.getValue();
    },

    /**
     * Hanlde the list store change.
     */
    _handleStoreChanged: function _handleStoreChanged() {
        this.setState(this._getStateFromStore());
    },

    /**
     * Register the store nodes.
     */
    _reload: function _reload() {
        this._action.load();
    },
    _registerStoreNode: function _registerStoreNode() {
        var _this2 = this;

        STORE_NODE.forEach(function (node) {
            //Maybe this is a bit too much, a global change event could be more efficient as almost all store props change.
            _this2.props.store[_listenerProp(node)](_this2._handleStoreChanged);
        });
        //When the criteria is changed, the search is triggered.
        this.props.store.addCriteriaChangeListener(this._reload);
    },
    _unRegisterStoreNode: function _unRegisterStoreNode() {
        var _this3 = this;

        STORE_NODE.forEach(function (node) {
            //Maybe this is a bit too much, a global change event could be more efficient as almost all store props change.
            _this3.props.store[_unListenerProp(node)](_this3._handleStoreChanged);
        });
        //When the criteria is changed, the search is triggered.
        this.props.store.removeCriteriaChangeListener(this._reload);
    },

    /**
     * build the list props.
     * @return {object} - the list property.
     */
    _buildListProps: function _buildListProps() {
        var props = this.props,
            state = this.state;
        var dataList = state.dataList,
            totalCount = state.totalCount;

        dataList = dataList || [];
        return assign({}, props, state, {
            data: dataList,
            fetchNextPage: this._action.load,
            hasMoreData: dataList.length < totalCount
        });
    },

    /** @inheritdoc */
    componentWillMount: function componentWillMount() {
        this._registerStoreNode();
        this._buildAction();
        this._action.load();
    },
    componentWillUnmount: function componentWillUnmount() {
        this._unRegisterStoreNode();
    },

    /** @inheritdoc */
    render: function render() {
        var listProps = this._buildListProps();
        return React.createElement(this.props.ListComponent, _extends({}, listProps, { ref: 'list' }));
    }
};

module.exports = (0, _builder2.default)(listPageMixin);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJSZWFjdCIsInJlcXVpcmUiLCJjYW1lbENhc2UiLCJjYXBpdGFsaXplIiwidHlwZSIsImFzc2lnbiIsIlNUT1JFX05PREUiLCJERUZBVUxUX0xJU1RfQ09NUE9ORU5UIiwiY29tcG9uZW50IiwiX2xpc3RlbmVyUHJvcCIsIm5vZGUiLCJfdW5MaXN0ZW5lclByb3AiLCJsaXN0UGFnZU1peGluIiwiZ2V0RGVmYXVsdFByb3BzIiwiTGlzdENvbXBvbmVudCIsInBpY2tQcm9wcyIsInByb3BzIiwiZ2V0SW5pdGlhbFN0YXRlIiwicHJvcFR5cGVzIiwic2VydmljZSIsInN0b3JlIiwiaXNSZXF1aXJlZCIsIl9idWlsZEFjdGlvbiIsIl9hY3Rpb24iLCJhY3Rpb24iLCJpZGVudGlmaWVyIiwiZ2V0TGlzdE9wdGlvbnMiLCJnZXRWYWx1ZSIsImNhbGwiLCJfZ2V0U3RhdGVGcm9tU3RvcmUiLCJfaGFuZGxlU3RvcmVDaGFuZ2VkIiwic2V0U3RhdGUiLCJfcmVsb2FkIiwibG9hZCIsIl9yZWdpc3RlclN0b3JlTm9kZSIsImZvckVhY2giLCJhZGRDcml0ZXJpYUNoYW5nZUxpc3RlbmVyIiwiX3VuUmVnaXN0ZXJTdG9yZU5vZGUiLCJyZW1vdmVDcml0ZXJpYUNoYW5nZUxpc3RlbmVyIiwiX2J1aWxkTGlzdFByb3BzIiwic3RhdGUiLCJkYXRhTGlzdCIsInRvdGFsQ291bnQiLCJkYXRhIiwiZmV0Y2hOZXh0UGFnZSIsImhhc01vcmVEYXRhIiwibGVuZ3RoIiwiY29tcG9uZW50V2lsbE1vdW50IiwiY29tcG9uZW50V2lsbFVubW91bnQiLCJyZW5kZXIiLCJsaXN0UHJvcHMiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7O0FBUUE7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7QUFWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFNQSxRQUFRQyxRQUFRLE9BQVIsQ0FBZDs7ZUFD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bEI7Ozs7QUFJQU8sbUJBbkVrQiw2QkFtRUE7QUFBQSxZQUNQdkIsS0FETyxHQUNTLElBRFQsQ0FDUEEsS0FETztBQUFBLFlBQ0F3QixLQURBLEdBQ1MsSUFEVCxDQUNBQSxLQURBO0FBQUEsWUFFVEMsUUFGUyxHQUVlRCxLQUZmLENBRVRDLFFBRlM7QUFBQSxZQUVDQyxVQUZELEdBRWVGLEtBRmYsQ0FFQ0UsVUFGRDs7QUFHZEQsbUJBQVdBLFlBQVksRUFBdkI7QUFDQSxlQUFPcEMsT0FBTyxFQUFQLEVBQVdXLEtBQVgsRUFBa0J3QixLQUFsQixFQUF5QjtBQUM1Qkcsa0JBQU1GLFFBRHNCO0FBRTVCRywyQkFBZSxLQUFLckIsT0FBTCxDQUFhVSxJQUZBO0FBRzVCWSx5QkFBYUosU0FBU0ssTUFBVCxHQUFrQko7QUFISCxTQUF6QixDQUFQO0FBS0gsS0E1RWlCOztBQTZFbEI7QUFDQUssc0JBOUVrQixnQ0E4RUc7QUFDakIsYUFBS2Isa0JBQUw7QUFDQSxhQUFLWixZQUFMO0FBQ0EsYUFBS0MsT0FBTCxDQUFhVSxJQUFiO0FBQ0gsS0FsRmlCO0FBbUZsQmUsd0JBbkZrQixrQ0FtRks7QUFDbkIsYUFBS1gsb0JBQUw7QUFDSCxLQXJGaUI7O0FBc0ZsQjtBQUNBWSxVQXZGa0Isb0JBdUZUO0FBQ0wsWUFBTUMsWUFBWSxLQUFLWCxlQUFMLEVBQWxCO0FBQ0EsZUFBTyx5QkFBTSxLQUFOLENBQVksYUFBWixlQUE4QlcsU0FBOUIsSUFBeUMsS0FBSSxNQUE3QyxJQUFQO0FBQ0g7QUExRmlCLENBQXRCOztBQTZGQUMsT0FBT0MsT0FBUCxHQUFpQix1QkFBUXhDLGFBQVIsQ0FBakIiLCJmaWxlIjoiaXMtcmVhY3QtY2xhc3MtY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy9UaGUgcHVycG9zZSBvZiB0aGlzIG1vZHVsZSBpcyB0byBkZWFsIHdpdGggYXV0b25vbW91cyBsaXN0cy5cclxuLy9JZiB5b3UgbmVlZCBsaXN0cyBpbnNpZGUgYSBmb3JtIHBsZWFzZSBzZWUgdGhlIGxpc3RGb3IgaGVscGVyIGZ1bmN0aW9uIGluIGEgZm9ybS5cclxuLy9UaGUgZm9sbG93aW5nIGxpc3RzIGNhblxyXG4vLy0gYmUgbG9hZGVkIGZyb20gYSBjcml0ZXJpYSAob3Igd2l0aG91dCkgKHRoZSBjcml0ZXJpYSBjYW4gYmUgdGhlIHJlc3VsdCBvZiBhIGZvcm0pXHJcbi8vLSBiZSBwYWdpbmF0ZWRcclxuLy8tIGJlIGRpc3BsYXllZCBpbiBhbnkgbGlzdCBjb250YWluZXIuXHJcbmNvbnN0IFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcclxuY29uc3Qge2NhbWVsQ2FzZSwgY2FwaXRhbGl6ZX0gPSByZXF1aXJlKCdsb2Rhc2gvc3RyaW5nJyk7XHJcbmltcG9ydCBidWlsZGVyIGZyb20gJ2ZvY3VzLWNvcmUvY29tcG9uZW50L2J1aWxkZXInO1xyXG5pbXBvcnQgdHlwZXMgZnJvbSAnZm9jdXMtY29yZS9jb21wb25lbnQvdHlwZXMnO1xyXG5pbXBvcnQgYWN0aW9uQnVpbGRlciBmcm9tICdmb2N1cy1jb3JlL2xpc3QvYWN0aW9uLWJ1aWxkZXInO1xyXG5jb25zdCB0eXBlID0gdHlwZXM7XHJcbmNvbnN0IGFzc2lnbiA9IHJlcXVpcmUoJ29iamVjdC1hc3NpZ24nKTtcclxuXHJcbmNvbnN0IFNUT1JFX05PREUgPSBbJ2NyaXRlcmlhJywgJ2dyb3VwaW5nS2V5JywgJ3NvcnRCeScsICdzb3J0QXNjJywgJ2RhdGFMaXN0JywgJ3RvdGFsQ291bnQnXTtcclxuY29uc3QgREVGQVVMVF9MSVNUX0NPTVBPTkVOVCA9IHJlcXVpcmUoJy4uLy4uL2xpc3QvdGFibGUvbGlzdCcpLmNvbXBvbmVudDtcclxuLyoqXHJcbiAqIENyZXRlcyBhIG5hbWUgZm9yIHRoZSBwcm9wZXJ0eSBsaXN0ZW5lci5cclxuICogQHBhcmFtICB7c3RyaW5nfSBub2RlIC0gTm9kZSBuYW1lLlxyXG4gKiBAcmV0dXJuIHtzdHJpbmd9IHRoZSBidWlsdCBwcm9wZXJ0eS5cclxuICovXHJcbmZ1bmN0aW9uIF9saXN0ZW5lclByb3Aobm9kZSkge1xyXG4gICAgcmV0dXJuIGBhZGQke2NhcGl0YWxpemUoY2FtZWxDYXNlKG5vZGUpKX1DaGFuZ2VMaXN0ZW5lcmA7XHJcbn1cclxuZnVuY3Rpb24gX3VuTGlzdGVuZXJQcm9wKG5vZGUpIHtcclxuICAgIHJldHVybiBgcmVtb3ZlJHtjYXBpdGFsaXplKGNhbWVsQ2FzZShub2RlKSl9Q2hhbmdlTGlzdGVuZXJgO1xyXG59XHJcbi8qKlxyXG4gKiBNaXhpbiB0byBkZWFsIHRoZSBsaXN0IHBhZ2UuXHJcbiAqIEB0eXBlIHtPYmplY3R9XHJcbiAqL1xyXG5jb25zdCBsaXN0UGFnZU1peGluID0ge1xyXG4gICAgZ2V0RGVmYXVsdFByb3BzKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIExpc3RDb21wb25lbnQ6IERFRkFVTFRfTElTVF9DT01QT05FTlQsXHJcbiAgICAgICAgICAgIHBpY2tQcm9wcyhwcm9wcykge3JldHVybiBwcm9wczt9XHJcbiAgICAgICAgfTtcclxuICAgIH0sXHJcbiAgICBnZXRJbml0aWFsU3RhdGUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHt9O1xyXG4gICAgfSxcclxuICAgIC8qKiBAaW5oZXJpdGRvYyAqL1xyXG4gICAgcHJvcFR5cGVzOiB7XHJcbiAgICAgICAgLy9TdG9yZSBvYmplY3QuXHJcbiAgICAgICAgcGlja1Byb3BzOiB0eXBlKCdmdW5jJyksXHJcbiAgICAgICAgc2VydmljZTogdHlwZSgnZnVuYycpLFxyXG4gICAgICAgIHN0b3JlOiB0eXBlKCdvYmplY3QnKS5pc1JlcXVpcmVkXHJcbiAgICB9LFxyXG4gICAgLyoqXHJcbiAgICAgKiAgQnVpbGQgdGhlIGFjdGlvbiBmcm9tLlxyXG4gICAgICovXHJcbiAgICBfYnVpbGRBY3Rpb24oKSB7XHJcbiAgICAgICAgdGhpcy5fYWN0aW9uID0gdGhpcy5wcm9wcy5hY3Rpb24gfHwgYWN0aW9uQnVpbGRlcih7XHJcbiAgICAgICAgICAgIHNlcnZpY2U6IHRoaXMucHJvcHMuc2VydmljZSxcclxuICAgICAgICAgICAgaWRlbnRpZmllcjogdGhpcy5wcm9wcy5zdG9yZS5pZGVudGlmaWVyLFxyXG4gICAgICAgICAgICBnZXRMaXN0T3B0aW9uczogKCkgPT4ge3JldHVybiB0aGlzLnByb3BzLnN0b3JlLmdldFZhbHVlLmNhbGwodGhpcy5wcm9wcy5zdG9yZSk7IH0gLy8gQmluZGluZyB0aGUgc3RvcmUgaW4gdGhlIGZ1bmN0aW9uIGNhbGxcclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcbiAgICAvKipcclxuICAgICAqIFJlYWQgdGhlIHN0YXRlIGZyb20gdGhlIHN0b3JlLlxyXG4gICAgICogQHJldHVybiB7b2JqZWN0fSAtIFRoZSBvYmplY3QgcmVhZCBmcm9tIHRoZSBzdG9yZS5cclxuICAgICAqL1xyXG4gICAgX2dldFN0YXRlRnJvbVN0b3JlKCkge1xyXG4gICAgICAgIGNvbnN0IHN0b3JlID0gdGhpcy5wcm9wcy5zdG9yZTtcclxuICAgICAgICByZXR1cm4gc3RvcmUuZ2V0VmFsdWUoKTtcclxuICAgIH0sXHJcbiAgICAvKipcclxuICAgICAqIEhhbmxkZSB0aGUgbGlzdCBzdG9yZSBjaGFuZ2UuXHJcbiAgICAgKi9cclxuICAgIF9oYW5kbGVTdG9yZUNoYW5nZWQoKSB7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh0aGlzLl9nZXRTdGF0ZUZyb21TdG9yZSgpKTtcclxuICAgIH0sXHJcbiAgICAvKipcclxuICAgICAqIFJlZ2lzdGVyIHRoZSBzdG9yZSBub2Rlcy5cclxuICAgICAqL1xyXG4gICAgX3JlbG9hZCgpIHtcclxuICAgICAgICB0aGlzLl9hY3Rpb24ubG9hZCgpO1xyXG4gICAgfSxcclxuICAgIF9yZWdpc3RlclN0b3JlTm9kZSgpIHtcclxuICAgICAgICBTVE9SRV9OT0RFLmZvckVhY2goKG5vZGUpID0+IHtcclxuICAgICAgICAgICAgLy9NYXliZSB0aGlzIGlzIGEgYml0IHRvbyBtdWNoLCBhIGdsb2JhbCBjaGFuZ2UgZXZlbnQgY291bGQgYmUgbW9yZSBlZmZpY2llbnQgYXMgYWxtb3N0IGFsbCBzdG9yZSBwcm9wcyBjaGFuZ2UuXHJcbiAgICAgICAgICAgIHRoaXMucHJvcHMuc3RvcmVbX2xpc3RlbmVyUHJvcChub2RlKV0odGhpcy5faGFuZGxlU3RvcmVDaGFuZ2VkKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICAvL1doZW4gdGhlIGNyaXRlcmlhIGlzIGNoYW5nZWQsIHRoZSBzZWFyY2ggaXMgdHJpZ2dlcmVkLlxyXG4gICAgICAgIHRoaXMucHJvcHMuc3RvcmUuYWRkQ3JpdGVyaWFDaGFuZ2VMaXN0ZW5lcih0aGlzLl9yZWxvYWQpO1xyXG4gICAgfSxcclxuICAgIF91blJlZ2lzdGVyU3RvcmVOb2RlKCkge1xyXG4gICAgICAgIFNUT1JFX05PREUuZm9yRWFjaCgobm9kZSkgPT4ge1xyXG4gICAgICAgICAgICAvL01heWJlIHRoaXMgaXMgYSBiaXQgdG9vIG11Y2gsIGEgZ2xvYmFsIGNoYW5nZSBldmVudCBjb3VsZCBiZSBtb3JlIGVmZmljaWVudCBhcyBhbG1vc3QgYWxsIHN0b3JlIHByb3BzIGNoYW5nZS5cclxuICAgICAgICAgICAgdGhpcy5wcm9wcy5zdG9yZVtfdW5MaXN0ZW5lclByb3Aobm9kZSldKHRoaXMuX2hhbmRsZVN0b3JlQ2hhbmdlZCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgLy9XaGVuIHRoZSBjcml0ZXJpYSBpcyBjaGFuZ2VkLCB0aGUgc2VhcmNoIGlzIHRyaWdnZXJlZC5cclxuICAgICAgICB0aGlzLnByb3BzLnN0b3JlLnJlbW92ZUNyaXRlcmlhQ2hhbmdlTGlzdGVuZXIodGhpcy5fcmVsb2FkKTtcclxuICAgIH0sXHJcbiAgICAvKipcclxuICAgICAqIGJ1aWxkIHRoZSBsaXN0IHByb3BzLlxyXG4gICAgICogQHJldHVybiB7b2JqZWN0fSAtIHRoZSBsaXN0IHByb3BlcnR5LlxyXG4gICAgICovXHJcbiAgICBfYnVpbGRMaXN0UHJvcHMoKSB7XHJcbiAgICAgICAgY29uc3Qge3Byb3BzLCBzdGF0ZX0gPSB0aGlzO1xyXG4gICAgICAgIGxldCB7ZGF0YUxpc3QsIHRvdGFsQ291bnR9ID0gc3RhdGU7XHJcbiAgICAgICAgZGF0YUxpc3QgPSBkYXRhTGlzdCB8fCBbXTtcclxuICAgICAgICByZXR1cm4gYXNzaWduKHt9LCBwcm9wcywgc3RhdGUsIHtcclxuICAgICAgICAgICAgZGF0YTogZGF0YUxpc3QsXHJcbiAgICAgICAgICAgIGZldGNoTmV4dFBhZ2U6IHRoaXMuX2FjdGlvbi5sb2FkLFxyXG4gICAgICAgICAgICBoYXNNb3JlRGF0YTogZGF0YUxpc3QubGVuZ3RoIDwgdG90YWxDb3VudFxyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuICAgIC8qKiBAaW5oZXJpdGRvYyAqL1xyXG4gICAgY29tcG9uZW50V2lsbE1vdW50KCkge1xyXG4gICAgICAgIHRoaXMuX3JlZ2lzdGVyU3RvcmVOb2RlKCk7XHJcbiAgICAgICAgdGhpcy5fYnVpbGRBY3Rpb24oKTtcclxuICAgICAgICB0aGlzLl9hY3Rpb24ubG9hZCgpO1xyXG4gICAgfSxcclxuICAgIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xyXG4gICAgICAgIHRoaXMuX3VuUmVnaXN0ZXJTdG9yZU5vZGUoKTtcclxuICAgIH0sXHJcbiAgICAvKiogQGluaGVyaXRkb2MgKi9cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICBjb25zdCBsaXN0UHJvcHMgPSB0aGlzLl9idWlsZExpc3RQcm9wcygpO1xyXG4gICAgICAgIHJldHVybiA8dGhpcy5wcm9wcy5MaXN0Q29tcG9uZW50IHsuLi5saXN0UHJvcHN9IHJlZj0nbGlzdCcvPjtcclxuICAgIH1cclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gYnVpbGRlcihsaXN0UGFnZU1peGluKTtcclxuIl19