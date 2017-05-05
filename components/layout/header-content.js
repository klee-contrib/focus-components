'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _builtInStore = require('focus-core/application/built-in-store');

var _builtInStore2 = _interopRequireDefault(_builtInStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

/**
* HeaderContent component.
*/
var HeaderContent = function (_Component) {
    _inherits(HeaderContent, _Component);

    function HeaderContent(props) {
        _classCallCheck(this, HeaderContent);

        var _this = _possibleConstructorReturn(this, _Component.call(this, props));

        _this._getStateFromStore = function () {
            return { cartridgeComponent: _builtInStore2.default.getCartridgeComponent() || { component: 'div', props: {} } };
        };

        _this._handleComponentChange = function () {
            _this.setState(_this._getStateFromStore());
        };

        _this.state = _this._getStateFromStore();
        return _this;
    }

    /** @inheriteddoc */


    HeaderContent.prototype.componentWillMount = function componentWillMount() {
        _builtInStore2.default.addCartridgeComponentChangeListener(this._handleComponentChange);
    };

    /** @inheriteddoc */


    HeaderContent.prototype.componentWillUnmount = function componentWillUnmount() {
        _builtInStore2.default.removeCartridgeComponentChangeListener(this._handleComponentChange);
    };

    /**
    * Read the component state from the connected stores.
    * @return {object} - The new state.
    */


    /**
    * Handle the component change cb.
    */


    /** @inheriteddoc */
    HeaderContent.prototype.render = function render() {
        var cartridgeComponent = this.state.cartridgeComponent;
        var Component = cartridgeComponent.component,
            props = cartridgeComponent.props;

        return _react2.default.createElement(
            'div',
            { 'data-focus': 'header-content' },
            _react2.default.createElement(Component, props)
        );
    };

    return HeaderContent;
}(_react.Component);

//Static props.


HeaderContent.displayName = 'HeaderContent';
//HeaderContent.defaultProps = defaultProps;
//HeaderContent.propTypes = propTypes;

exports.default = HeaderContent;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJIZWFkZXJDb250ZW50IiwicHJvcHMiLCJfZ2V0U3RhdGVGcm9tU3RvcmUiLCJjYXJ0cmlkZ2VDb21wb25lbnQiLCJnZXRDYXJ0cmlkZ2VDb21wb25lbnQiLCJjb21wb25lbnQiLCJfaGFuZGxlQ29tcG9uZW50Q2hhbmdlIiwic2V0U3RhdGUiLCJzdGF0ZSIsImNvbXBvbmVudFdpbGxNb3VudCIsImFkZENhcnRyaWRnZUNvbXBvbmVudENoYW5nZUxpc3RlbmVyIiwiY29tcG9uZW50V2lsbFVubW91bnQiLCJyZW1vdmVDYXJ0cmlkZ2VDb21wb25lbnRDaGFuZ2VMaXN0ZW5lciIsInJlbmRlciIsIkNvbXBvbmVudCIsImRpc3BsYXlOYW1lIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7OztBQUVBOzs7SUFHTUEsYTs7O0FBQ0YsMkJBQVlDLEtBQVosRUFBbUI7QUFBQTs7QUFBQSxxREFDZixzQkFBTUEsS0FBTixDQURlOztBQUFBLGNBbUJuQkMsa0JBbkJtQixHQW1CRSxZQUFNO0FBQ3ZCLG1CQUFPLEVBQUNDLG9CQUFvQix1QkFBaUJDLHFCQUFqQixNQUE0QyxFQUFDQyxXQUFXLEtBQVosRUFBbUJKLE9BQU8sRUFBMUIsRUFBakUsRUFBUDtBQUNILFNBckJrQjs7QUFBQSxjQTBCbkJLLHNCQTFCbUIsR0EwQk0sWUFBTTtBQUMzQixrQkFBS0MsUUFBTCxDQUFjLE1BQUtMLGtCQUFMLEVBQWQ7QUFDSCxTQTVCa0I7O0FBRWYsY0FBS00sS0FBTCxHQUFhLE1BQUtOLGtCQUFMLEVBQWI7QUFGZTtBQUdsQjs7QUFFRDs7OzRCQUNBTyxrQixpQ0FBcUI7QUFDakIsK0JBQWlCQyxtQ0FBakIsQ0FBcUQsS0FBS0osc0JBQTFEO0FBQ0gsSzs7QUFFRDs7OzRCQUNBSyxvQixtQ0FBdUI7QUFDbkIsK0JBQWlCQyxzQ0FBakIsQ0FBd0QsS0FBS04sc0JBQTdEO0FBQ0gsSzs7QUFFRDs7Ozs7O0FBUUE7Ozs7O0FBT0E7NEJBQ0FPLE0scUJBQVM7QUFBQSxZQUNFVixrQkFERixHQUN3QixLQUFLSyxLQUQ3QixDQUNFTCxrQkFERjtBQUFBLFlBRWFXLFNBRmIsR0FFaUNYLGtCQUZqQyxDQUVFRSxTQUZGO0FBQUEsWUFFd0JKLEtBRnhCLEdBRWlDRSxrQkFGakMsQ0FFd0JGLEtBRnhCOztBQUdMLGVBQ0k7QUFBQTtBQUFBLGNBQUssY0FBVyxnQkFBaEI7QUFDSSwwQ0FBQyxTQUFELEVBQWVBLEtBQWY7QUFESixTQURKO0FBS0gsSzs7Ozs7QUFHTDs7O0FBQ0FELGNBQWNlLFdBQWQsR0FBNEIsZUFBNUI7QUFDQTtBQUNBOztrQkFFZWYsYSIsImZpbGUiOiJpcy1yZWFjdC1jbGFzcy1jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnR9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IGFwcGxpY2F0aW9uU3RvcmUgZnJvbSAnZm9jdXMtY29yZS9hcHBsaWNhdGlvbi9idWlsdC1pbi1zdG9yZSc7XHJcblxyXG4vKipcclxuKiBIZWFkZXJDb250ZW50IGNvbXBvbmVudC5cclxuKi9cclxuY2xhc3MgSGVhZGVyQ29udGVudCBleHRlbmRzIENvbXBvbmVudCB7XHJcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xyXG4gICAgICAgIHN1cGVyKHByb3BzKTtcclxuICAgICAgICB0aGlzLnN0YXRlID0gdGhpcy5fZ2V0U3RhdGVGcm9tU3RvcmUoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKiogQGluaGVyaXRlZGRvYyAqL1xyXG4gICAgY29tcG9uZW50V2lsbE1vdW50KCkge1xyXG4gICAgICAgIGFwcGxpY2F0aW9uU3RvcmUuYWRkQ2FydHJpZGdlQ29tcG9uZW50Q2hhbmdlTGlzdGVuZXIodGhpcy5faGFuZGxlQ29tcG9uZW50Q2hhbmdlKTtcclxuICAgIH1cclxuXHJcbiAgICAvKiogQGluaGVyaXRlZGRvYyAqL1xyXG4gICAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XHJcbiAgICAgICAgYXBwbGljYXRpb25TdG9yZS5yZW1vdmVDYXJ0cmlkZ2VDb21wb25lbnRDaGFuZ2VMaXN0ZW5lcih0aGlzLl9oYW5kbGVDb21wb25lbnRDaGFuZ2UpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgKiBSZWFkIHRoZSBjb21wb25lbnQgc3RhdGUgZnJvbSB0aGUgY29ubmVjdGVkIHN0b3Jlcy5cclxuICAgICogQHJldHVybiB7b2JqZWN0fSAtIFRoZSBuZXcgc3RhdGUuXHJcbiAgICAqL1xyXG4gICAgX2dldFN0YXRlRnJvbVN0b3JlID0gKCkgPT4ge1xyXG4gICAgICAgIHJldHVybiB7Y2FydHJpZGdlQ29tcG9uZW50OiBhcHBsaWNhdGlvblN0b3JlLmdldENhcnRyaWRnZUNvbXBvbmVudCgpIHx8IHtjb21wb25lbnQ6ICdkaXYnLCBwcm9wczoge319fTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAqIEhhbmRsZSB0aGUgY29tcG9uZW50IGNoYW5nZSBjYi5cclxuICAgICovXHJcbiAgICBfaGFuZGxlQ29tcG9uZW50Q2hhbmdlID0gKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUodGhpcy5fZ2V0U3RhdGVGcm9tU3RvcmUoKSk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKiBAaW5oZXJpdGVkZG9jICovXHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgY29uc3Qge2NhcnRyaWRnZUNvbXBvbmVudH0gPSB0aGlzLnN0YXRlO1xyXG4gICAgICAgIGNvbnN0IHtjb21wb25lbnQ6IENvbXBvbmVudCwgcHJvcHN9ID0gY2FydHJpZGdlQ29tcG9uZW50O1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXYgZGF0YS1mb2N1cz0naGVhZGVyLWNvbnRlbnQnPlxyXG4gICAgICAgICAgICAgICAgPENvbXBvbmVudCB7Li4ucHJvcHN9Lz5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufVxyXG5cclxuLy9TdGF0aWMgcHJvcHMuXHJcbkhlYWRlckNvbnRlbnQuZGlzcGxheU5hbWUgPSAnSGVhZGVyQ29udGVudCc7XHJcbi8vSGVhZGVyQ29udGVudC5kZWZhdWx0UHJvcHMgPSBkZWZhdWx0UHJvcHM7XHJcbi8vSGVhZGVyQ29udGVudC5wcm9wVHlwZXMgPSBwcm9wVHlwZXM7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBIZWFkZXJDb250ZW50O1xyXG4iXX0=