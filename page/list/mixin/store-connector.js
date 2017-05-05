'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var React = require('react');
var isEqual = require('lodash/lang/isEqual');
module.exports = function connectToStores(Component, stores, pickProps, getState) {
    return function (_React$Component) {
        _inherits(StoreConnector, _React$Component);

        function StoreConnector(props) {
            _classCallCheck(this, StoreConnector);

            var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

            _this.state = _this.getStateFromStores(props);
            _this.handleStoresChanged = _this.handleStoresChanged.bind(_this);
            return _this;
        }

        StoreConnector.prototype.getStateFromStores = function getStateFromStores(props) {
            return getState(pickProps(props));
        };

        StoreConnector.prototype.componentDidMount = function componentDidMount() {
            var _this2 = this;

            stores.forEach(function (store) {
                return store.addChangeListener(_this2.handleStoresChanged);
            });
        };

        StoreConnector.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
            if (!isEqual(pickProps(nextProps), pickProps(this.props))) {
                //isEqual
                this.setState(this.getStateFromStores(nextProps));
            }
        };

        StoreConnector.prototype.componentWillUnmount = function componentWillUnmount() {
            var _this3 = this;

            stores.forEach(function (store) {
                return store.removeChangeListener(_this3.handleStoresChanged);
            });
        };

        StoreConnector.prototype.handleStoresChanged = function handleStoresChanged() {
            this.setState(this.getStateFromStores(this.props));
        };

        StoreConnector.prototype.render = function render() {
            return React.createElement(Component, _extends({}, this.props, this.state));
        };

        return StoreConnector;
    }(React.Component);
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJSZWFjdCIsInJlcXVpcmUiLCJpc0VxdWFsIiwibW9kdWxlIiwiZXhwb3J0cyIsImNvbm5lY3RUb1N0b3JlcyIsIkNvbXBvbmVudCIsInN0b3JlcyIsInBpY2tQcm9wcyIsImdldFN0YXRlIiwicHJvcHMiLCJzdGF0ZSIsImdldFN0YXRlRnJvbVN0b3JlcyIsImhhbmRsZVN0b3Jlc0NoYW5nZWQiLCJiaW5kIiwiY29tcG9uZW50RGlkTW91bnQiLCJmb3JFYWNoIiwic3RvcmUiLCJhZGRDaGFuZ2VMaXN0ZW5lciIsImNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMiLCJuZXh0UHJvcHMiLCJzZXRTdGF0ZSIsImNvbXBvbmVudFdpbGxVbm1vdW50IiwicmVtb3ZlQ2hhbmdlTGlzdGVuZXIiLCJyZW5kZXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLElBQUlBLFFBQVFDLFFBQVEsT0FBUixDQUFaO0FBQ0EsSUFBSUMsVUFBVUQsUUFBUSxxQkFBUixDQUFkO0FBQ0FFLE9BQU9DLE9BQVAsR0FBaUIsU0FBU0MsZUFBVCxDQUF5QkMsU0FBekIsRUFBb0NDLE1BQXBDLEVBQTRDQyxTQUE1QyxFQUF1REMsUUFBdkQsRUFBaUU7QUFDOUU7QUFBQTs7QUFDSSxnQ0FBWUMsS0FBWixFQUFtQjtBQUFBOztBQUFBLHlEQUNmLDRCQUFNQSxLQUFOLENBRGU7O0FBRWYsa0JBQUtDLEtBQUwsR0FBYSxNQUFLQyxrQkFBTCxDQUF3QkYsS0FBeEIsQ0FBYjtBQUNBLGtCQUFLRyxtQkFBTCxHQUEyQixNQUFLQSxtQkFBTCxDQUF5QkMsSUFBekIsT0FBM0I7QUFIZTtBQUlsQjs7QUFMTCxpQ0FPSUYsa0JBUEosK0JBT3VCRixLQVB2QixFQU84QjtBQUN0QixtQkFBT0QsU0FBU0QsVUFBVUUsS0FBVixDQUFULENBQVA7QUFDSCxTQVRMOztBQUFBLGlDQVdJSyxpQkFYSixnQ0FXd0I7QUFBQTs7QUFDaEJSLG1CQUFPUyxPQUFQLENBQWU7QUFBQSx1QkFDbkJDLE1BQU1DLGlCQUFOLENBQXdCLE9BQUtMLG1CQUE3QixDQURtQjtBQUFBLGFBQWY7QUFHSCxTQWZMOztBQUFBLGlDQWlCSU0seUJBakJKLHNDQWlCOEJDLFNBakI5QixFQWlCeUM7QUFDakMsZ0JBQUksQ0FBQ2xCLFFBQVFNLFVBQVVZLFNBQVYsQ0FBUixFQUE4QlosVUFBVSxLQUFLRSxLQUFmLENBQTlCLENBQUwsRUFBMkQ7QUFBRTtBQUN6RCxxQkFBS1csUUFBTCxDQUFjLEtBQUtULGtCQUFMLENBQXdCUSxTQUF4QixDQUFkO0FBQ0g7QUFDSixTQXJCTDs7QUFBQSxpQ0F1QklFLG9CQXZCSixtQ0F1QjJCO0FBQUE7O0FBQ25CZixtQkFBT1MsT0FBUCxDQUFlO0FBQUEsdUJBQ25CQyxNQUFNTSxvQkFBTixDQUEyQixPQUFLVixtQkFBaEMsQ0FEbUI7QUFBQSxhQUFmO0FBR0gsU0EzQkw7O0FBQUEsaUNBNkJJQSxtQkE3Qkosa0NBNkIwQjtBQUNsQixpQkFBS1EsUUFBTCxDQUFjLEtBQUtULGtCQUFMLENBQXdCLEtBQUtGLEtBQTdCLENBQWQ7QUFDSCxTQS9CTDs7QUFBQSxpQ0FpQ0ljLE1BakNKLHFCQWlDYTtBQUNMLG1CQUFPLG9CQUFDLFNBQUQsZUFBZSxLQUFLZCxLQUFwQixFQUErQixLQUFLQyxLQUFwQyxFQUFQO0FBQ0gsU0FuQ0w7O0FBQUE7QUFBQSxNQUFvQ1gsTUFBTU0sU0FBMUM7QUFxQ0gsQ0F0Q0QiLCJmaWxlIjoiaXMtcmVhY3QtY2xhc3MtY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsibGV0IFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcclxubGV0IGlzRXF1YWwgPSByZXF1aXJlKCdsb2Rhc2gvbGFuZy9pc0VxdWFsJyk7XHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gY29ubmVjdFRvU3RvcmVzKENvbXBvbmVudCwgc3RvcmVzLCBwaWNrUHJvcHMsIGdldFN0YXRlKSB7XHJcbiAgICByZXR1cm4gY2xhc3MgU3RvcmVDb25uZWN0b3IgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XHJcbiAgICAgICAgICAgIHN1cGVyKHByb3BzKTtcclxuICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IHRoaXMuZ2V0U3RhdGVGcm9tU3RvcmVzKHByb3BzKTtcclxuICAgICAgICAgICAgdGhpcy5oYW5kbGVTdG9yZXNDaGFuZ2VkID0gdGhpcy5oYW5kbGVTdG9yZXNDaGFuZ2VkLmJpbmQodGhpcyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBnZXRTdGF0ZUZyb21TdG9yZXMocHJvcHMpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGdldFN0YXRlKHBpY2tQcm9wcyhwcm9wcykpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29tcG9uZW50RGlkTW91bnQoKSB7XHJcbiAgICAgICAgICAgIHN0b3Jlcy5mb3JFYWNoKHN0b3JlID0+XHJcbiAgICAgICAgc3RvcmUuYWRkQ2hhbmdlTGlzdGVuZXIodGhpcy5oYW5kbGVTdG9yZXNDaGFuZ2VkKVxyXG4gICAgICApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpIHtcclxuICAgICAgICAgICAgaWYgKCFpc0VxdWFsKHBpY2tQcm9wcyhuZXh0UHJvcHMpLCBwaWNrUHJvcHModGhpcy5wcm9wcykpKSB7IC8vaXNFcXVhbFxyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh0aGlzLmdldFN0YXRlRnJvbVN0b3JlcyhuZXh0UHJvcHMpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XHJcbiAgICAgICAgICAgIHN0b3Jlcy5mb3JFYWNoKHN0b3JlID0+XHJcbiAgICAgICAgc3RvcmUucmVtb3ZlQ2hhbmdlTGlzdGVuZXIodGhpcy5oYW5kbGVTdG9yZXNDaGFuZ2VkKVxyXG4gICAgICApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaGFuZGxlU3RvcmVzQ2hhbmdlZCgpIHtcclxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh0aGlzLmdldFN0YXRlRnJvbVN0b3Jlcyh0aGlzLnByb3BzKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiA8Q29tcG9uZW50IHsuLi50aGlzLnByb3BzfSB7Li4udGhpcy5zdGF0ZX0gLz47XHJcbiAgICAgICAgfVxyXG4gIH07XHJcbn1cclxuIl19