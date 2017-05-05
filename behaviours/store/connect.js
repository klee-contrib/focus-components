'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = connectToStores;

var _lang = require('lodash/lang');

var _string = require('lodash/string');

var _object = require('lodash/object');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

// - Provide the component
// - Provide the store configuration `[{store: yourStore, properties: ['property1', 'property2']}]`
// - Provide a function to read state from your store
function connectToStores(storesConfiguration, getState) {
    // Validate the stores object
    if (!(0, _lang.isArray)(storesConfiguration)) {
        throw new Error('connectToStores: you need to provide an array of store config.');
    }

    // Validate .
    if (!(0, _lang.isFunction)(getState)) {
        throw new Error('connectToStores: you need to provide function to read state from store.');
    }
    // Return a wrapper function around the component
    return function connectComponent(DecoratedComponent) {

        // Save the display name for later
        var displayName = DecoratedComponent.displayName || 'Component';

        // The goal of this class is to connect a component to a list of stores with properties.

        var StoreConnector = function (_Component) {
            _inherits(StoreConnector, _Component);

            function StoreConnector(props) {
                _classCallCheck(this, StoreConnector);

                //Build the initial state from props.
                var _this = _possibleConstructorReturn(this, _Component.call(this, props));

                _this.handleStoresChanged = function () {
                    _this.updateState(_this.props);
                };

                _this.state = getState(props);
                _this._isMounted = false;
                return _this;
            }

            // When the component will mount, we listen to all stores changes.
            // When a change occurs the state is read again from the state.


            StoreConnector.prototype.componentWillMount = function componentWillMount() {
                var _this2 = this;

                storesConfiguration.forEach(function (storeConf) {
                    var properties = storeConf.properties,
                        store = storeConf.store;

                    properties.forEach(function (property) {
                        if (!store || !store.definition || !store.definition[property]) {
                            console.warn('\n                                StoreConnector ' + displayName + ':\n                                    You add a property : ' + property + ' in your store configuration which is not in your definition : ' + (0, _object.keys)(store.definition) + '\n                            ');
                        }
                        var capitalizedProperty = (0, _string.capitalize)(property);
                        storeConf.store['add' + capitalizedProperty + 'ChangeListener'](_this2.handleStoresChanged);
                        storeConf.store['add' + capitalizedProperty + 'ErrorListener'](_this2.handleStoresChanged);
                    });
                });
            };

            // When a component will receive a new props.


            StoreConnector.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
                this.updateState(nextProps);
            };

            // Component unmount.


            StoreConnector.prototype.componentWillUnmount = function componentWillUnmount() {
                var _this3 = this;

                this._isMounted = false;
                storesConfiguration.forEach(function (storeConf) {
                    var properties = storeConf.properties,
                        store = storeConf.store;

                    properties.forEach(function (property) {
                        var capitalizedProperty = (0, _string.capitalize)(property);
                        storeConf.store['remove' + capitalizedProperty + 'ChangeListener'](_this3.handleStoresChanged);
                        storeConf.store['remove' + capitalizedProperty + 'ErrorListener'](_this3.handleStoresChanged);
                    });
                });
            };

            StoreConnector.prototype.componentDidMount = function componentDidMount() {
                this._isMounted = true;
                this.updateState(this.props);
            };

            StoreConnector.prototype.updateState = function updateState(props) {
                if (this._isMounted) {
                    this.setState(getState(this.props));
                }
            };

            //Handle the store changes


            // Render the component with only props, some from the real props some from the state
            StoreConnector.prototype.render = function render() {
                var props = this.props,
                    state = this.state;

                return _react2.default.createElement(DecoratedComponent, _extends({}, props, state));
            };

            return StoreConnector;
        }(_react.Component);

        StoreConnector.displayName = displayName + 'Connected';
        return StoreConnector;
    };
}

// Add a function to connect a store to a component .
// All the store properties values will be provided to the component as props.
// This could be use as an ES7 annotation or as a function.


// ### ES6 version
// ```jsx
// store
// const newStore = new CoreStore({definition: {name: 'name', email: 'email'}});
//Component
// const Component = props => <div>{JSON.stringify(props)}</div>;
// create a connector function
// const connector = storeConnectBehaviour(
//     [{store: newStore, properties: ['name', 'email']}],
//     (props) => {return newStore.getValue()}
// );
// Component connected to the store
// const ConnectedComponent = connector(Component);
// ```

// ### ES7 version
// ```jsx
//    Class version
// @connect( [{store: newStore, properties: ['name', 'email']}],(props) => newStore.getValue())
// class YourComponent extends Component{
//     render(){
//          return  <div>{JSON.stringify(props)}</div>;
//     }
// }
// ```

module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJjb25uZWN0VG9TdG9yZXMiLCJzdG9yZXNDb25maWd1cmF0aW9uIiwiZ2V0U3RhdGUiLCJFcnJvciIsImNvbm5lY3RDb21wb25lbnQiLCJEZWNvcmF0ZWRDb21wb25lbnQiLCJkaXNwbGF5TmFtZSIsIlN0b3JlQ29ubmVjdG9yIiwicHJvcHMiLCJoYW5kbGVTdG9yZXNDaGFuZ2VkIiwidXBkYXRlU3RhdGUiLCJzdGF0ZSIsIl9pc01vdW50ZWQiLCJjb21wb25lbnRXaWxsTW91bnQiLCJmb3JFYWNoIiwicHJvcGVydGllcyIsInN0b3JlQ29uZiIsInN0b3JlIiwicHJvcGVydHkiLCJkZWZpbml0aW9uIiwiY29uc29sZSIsIndhcm4iLCJjYXBpdGFsaXplZFByb3BlcnR5IiwiY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyIsIm5leHRQcm9wcyIsImNvbXBvbmVudFdpbGxVbm1vdW50IiwiY29tcG9uZW50RGlkTW91bnQiLCJzZXRTdGF0ZSIsInJlbmRlciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7a0JBUXdCQSxlOztBQVJ4Qjs7QUFDQTs7QUFDQTs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7QUFFQTtBQUNBO0FBQ0E7QUFDZSxTQUFTQSxlQUFULENBQXlCQyxtQkFBekIsRUFBOENDLFFBQTlDLEVBQXdEO0FBQ25FO0FBQ0EsUUFBRyxDQUFDLG1CQUFRRCxtQkFBUixDQUFKLEVBQWtDO0FBQzlCLGNBQU0sSUFBSUUsS0FBSixDQUFVLGdFQUFWLENBQU47QUFDSDs7QUFFRDtBQUNBLFFBQUcsQ0FBQyxzQkFBV0QsUUFBWCxDQUFKLEVBQTBCO0FBQ3RCLGNBQU0sSUFBSUMsS0FBSixDQUFVLHlFQUFWLENBQU47QUFDSDtBQUNEO0FBQ0EsV0FBTyxTQUFTQyxnQkFBVCxDQUEwQkMsa0JBQTFCLEVBQThDOztBQUVqRDtBQUNBLFlBQU1DLGNBQWNELG1CQUFtQkMsV0FBbkIsSUFBa0MsV0FBdEQ7O0FBRUE7O0FBTGlELFlBTTNDQyxjQU4yQztBQUFBOztBQVE3QyxvQ0FBWUMsS0FBWixFQUFtQjtBQUFBOztBQUVmO0FBRmUsNkRBQ2Ysc0JBQU1BLEtBQU4sQ0FEZTs7QUFBQSxzQkF3RG5CQyxtQkF4RG1CLEdBd0RHLFlBQU07QUFDcEMsMEJBQUtDLFdBQUwsQ0FBaUIsTUFBS0YsS0FBdEI7QUFDUyxpQkExRGtCOztBQUdmLHNCQUFLRyxLQUFMLEdBQWFULFNBQVNNLEtBQVQsQ0FBYjtBQUNBLHNCQUFLSSxVQUFMLEdBQWtCLEtBQWxCO0FBSmU7QUFLbEI7O0FBRUQ7QUFDQTs7O0FBaEI2QyxxQ0FpQjdDQyxrQkFqQjZDLGlDQWlCeEI7QUFBQTs7QUFDakJaLG9DQUFvQmEsT0FBcEIsQ0FBNEIscUJBQWE7QUFBQSx3QkFDOUJDLFVBRDhCLEdBQ1RDLFNBRFMsQ0FDOUJELFVBRDhCO0FBQUEsd0JBQ2xCRSxLQURrQixHQUNURCxTQURTLENBQ2xCQyxLQURrQjs7QUFFckNGLCtCQUFXRCxPQUFYLENBQW1CLFVBQUNJLFFBQUQsRUFBYztBQUM3Qiw0QkFBRyxDQUFDRCxLQUFELElBQVUsQ0FBQ0EsTUFBTUUsVUFBakIsSUFBK0IsQ0FBQ0YsTUFBTUUsVUFBTixDQUFpQkQsUUFBakIsQ0FBbkMsRUFBK0Q7QUFDM0RFLG9DQUFRQyxJQUFSLHVEQUNxQmYsV0FEckIsb0VBRStCWSxRQUYvQix1RUFFeUcsa0JBQUtELE1BQU1FLFVBQVgsQ0FGekc7QUFJSDtBQUNELDRCQUFNRyxzQkFBc0Isd0JBQVdKLFFBQVgsQ0FBNUI7QUFDQUYsa0NBQVVDLEtBQVYsU0FBc0JLLG1CQUF0QixxQkFBMkQsT0FBS2IsbUJBQWhFO0FBQ0FPLGtDQUFVQyxLQUFWLFNBQXNCSyxtQkFBdEIsb0JBQTBELE9BQUtiLG1CQUEvRDtBQUNILHFCQVZEO0FBV0gsaUJBYkQ7QUFjSCxhQWhDNEM7O0FBa0M3Qzs7O0FBbEM2QyxxQ0FtQzdDYyx5QkFuQzZDLHNDQW1DbkJDLFNBbkNtQixFQW1DUjtBQUM3QyxxQkFBS2QsV0FBTCxDQUFpQmMsU0FBakI7QUFDUyxhQXJDNEM7O0FBdUM3Qzs7O0FBdkM2QyxxQ0F3QzdDQyxvQkF4QzZDLG1DQXdDdEI7QUFBQTs7QUFDNUIscUJBQUtiLFVBQUwsR0FBa0IsS0FBbEI7QUFDU1gsb0NBQW9CYSxPQUFwQixDQUE0QixxQkFBYTtBQUFBLHdCQUM5QkMsVUFEOEIsR0FDVEMsU0FEUyxDQUM5QkQsVUFEOEI7QUFBQSx3QkFDbEJFLEtBRGtCLEdBQ1RELFNBRFMsQ0FDbEJDLEtBRGtCOztBQUVyQ0YsK0JBQVdELE9BQVgsQ0FBbUIsVUFBQ0ksUUFBRCxFQUFjO0FBQzdCLDRCQUFNSSxzQkFBc0Isd0JBQVdKLFFBQVgsQ0FBNUI7QUFDQUYsa0NBQVVDLEtBQVYsWUFBeUJLLG1CQUF6QixxQkFBOEQsT0FBS2IsbUJBQW5FO0FBQ0FPLGtDQUFVQyxLQUFWLFlBQXlCSyxtQkFBekIsb0JBQTZELE9BQUtiLG1CQUFsRTtBQUNILHFCQUpEO0FBS0gsaUJBUEQ7QUFRSCxhQWxENEM7O0FBQUEscUNBb0R0RGlCLGlCQXBEc0QsZ0NBb0RuQztBQUNsQixxQkFBS2QsVUFBTCxHQUFrQixJQUFsQjtBQUNBLHFCQUFLRixXQUFMLENBQWlCLEtBQUtGLEtBQXRCO0FBQ0EsYUF2RHFEOztBQUFBLHFDQXlEdERFLFdBekRzRCx3QkF5RDFDRixLQXpEMEMsRUF5RHBDO0FBQ2pCLG9CQUFHLEtBQUtJLFVBQVIsRUFBbUI7QUFDbEIseUJBQUtlLFFBQUwsQ0FBY3pCLFNBQVMsS0FBS00sS0FBZCxDQUFkO0FBQ0E7QUFDRCxhQTdEcUQ7O0FBK0Q3Qzs7O0FBS0E7QUFwRTZDLHFDQXFFN0NvQixNQXJFNkMscUJBcUVwQztBQUFBLG9CQUNFcEIsS0FERixHQUNrQixJQURsQixDQUNFQSxLQURGO0FBQUEsb0JBQ1NHLEtBRFQsR0FDa0IsSUFEbEIsQ0FDU0EsS0FEVDs7QUFFTCx1QkFDSSw4QkFBQyxrQkFBRCxlQUNRSCxLQURSLEVBRVFHLEtBRlIsRUFESjtBQU1ILGFBN0U0Qzs7QUFBQTtBQUFBOztBQStFakRKLHVCQUFlRCxXQUFmLEdBQWdDQSxXQUFoQztBQUNBLGVBQU9DLGNBQVA7QUFDSCxLQWpGRDtBQWtGSDs7QUFFRDtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiaXMtcmVhY3QtY2xhc3MtY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtpc0FycmF5LCBpc0Z1bmN0aW9uLCBpc09iamVjdH0gZnJvbSAnbG9kYXNoL2xhbmcnO1xyXG5pbXBvcnQge2NhcGl0YWxpemV9IGZyb20gJ2xvZGFzaC9zdHJpbmcnXHJcbmltcG9ydCB7a2V5c30gZnJvbSAnbG9kYXNoL29iamVjdCc7XHJcbmltcG9ydCBSZWFjdCwge0NvbXBvbmVudH0gZnJvbSAncmVhY3QnO1xyXG5cclxuLy8gLSBQcm92aWRlIHRoZSBjb21wb25lbnRcclxuLy8gLSBQcm92aWRlIHRoZSBzdG9yZSBjb25maWd1cmF0aW9uIGBbe3N0b3JlOiB5b3VyU3RvcmUsIHByb3BlcnRpZXM6IFsncHJvcGVydHkxJywgJ3Byb3BlcnR5MiddfV1gXHJcbi8vIC0gUHJvdmlkZSBhIGZ1bmN0aW9uIHRvIHJlYWQgc3RhdGUgZnJvbSB5b3VyIHN0b3JlXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbm5lY3RUb1N0b3JlcyhzdG9yZXNDb25maWd1cmF0aW9uLCBnZXRTdGF0ZSkge1xyXG4gICAgLy8gVmFsaWRhdGUgdGhlIHN0b3JlcyBvYmplY3RcclxuICAgIGlmKCFpc0FycmF5KHN0b3Jlc0NvbmZpZ3VyYXRpb24pKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdjb25uZWN0VG9TdG9yZXM6IHlvdSBuZWVkIHRvIHByb3ZpZGUgYW4gYXJyYXkgb2Ygc3RvcmUgY29uZmlnLicpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFZhbGlkYXRlIC5cclxuICAgIGlmKCFpc0Z1bmN0aW9uKGdldFN0YXRlKSkge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignY29ubmVjdFRvU3RvcmVzOiB5b3UgbmVlZCB0byBwcm92aWRlIGZ1bmN0aW9uIHRvIHJlYWQgc3RhdGUgZnJvbSBzdG9yZS4nKTtcclxuICAgIH1cclxuICAgIC8vIFJldHVybiBhIHdyYXBwZXIgZnVuY3Rpb24gYXJvdW5kIHRoZSBjb21wb25lbnRcclxuICAgIHJldHVybiBmdW5jdGlvbiBjb25uZWN0Q29tcG9uZW50KERlY29yYXRlZENvbXBvbmVudCkge1xyXG5cclxuICAgICAgICAvLyBTYXZlIHRoZSBkaXNwbGF5IG5hbWUgZm9yIGxhdGVyXHJcbiAgICAgICAgY29uc3QgZGlzcGxheU5hbWUgPSBEZWNvcmF0ZWRDb21wb25lbnQuZGlzcGxheU5hbWUgfHwgJ0NvbXBvbmVudCc7XHJcblxyXG4gICAgICAgIC8vIFRoZSBnb2FsIG9mIHRoaXMgY2xhc3MgaXMgdG8gY29ubmVjdCBhIGNvbXBvbmVudCB0byBhIGxpc3Qgb2Ygc3RvcmVzIHdpdGggcHJvcGVydGllcy5cclxuICAgICAgICBjbGFzcyBTdG9yZUNvbm5lY3RvciBleHRlbmRzIENvbXBvbmVudCB7XHJcblxyXG4gICAgICAgICAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xyXG4gICAgICAgICAgICAgICAgc3VwZXIocHJvcHMpO1xyXG4gICAgICAgICAgICAgICAgLy9CdWlsZCB0aGUgaW5pdGlhbCBzdGF0ZSBmcm9tIHByb3BzLlxyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IGdldFN0YXRlKHByb3BzKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2lzTW91bnRlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBXaGVuIHRoZSBjb21wb25lbnQgd2lsbCBtb3VudCwgd2UgbGlzdGVuIHRvIGFsbCBzdG9yZXMgY2hhbmdlcy5cclxuICAgICAgICAgICAgLy8gV2hlbiBhIGNoYW5nZSBvY2N1cnMgdGhlIHN0YXRlIGlzIHJlYWQgYWdhaW4gZnJvbSB0aGUgc3RhdGUuXHJcbiAgICAgICAgICAgIGNvbXBvbmVudFdpbGxNb3VudCgpIHtcclxuICAgICAgICAgICAgICAgIHN0b3Jlc0NvbmZpZ3VyYXRpb24uZm9yRWFjaChzdG9yZUNvbmYgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHtwcm9wZXJ0aWVzLCBzdG9yZX0gPSBzdG9yZUNvbmY7XHJcbiAgICAgICAgICAgICAgICAgICAgcHJvcGVydGllcy5mb3JFYWNoKChwcm9wZXJ0eSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZighc3RvcmUgfHwgIXN0b3JlLmRlZmluaXRpb24gfHwgIXN0b3JlLmRlZmluaXRpb25bcHJvcGVydHldKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oYFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFN0b3JlQ29ubmVjdG9yICR7ZGlzcGxheU5hbWV9OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBZb3UgYWRkIGEgcHJvcGVydHkgOiAke3Byb3BlcnR5fSBpbiB5b3VyIHN0b3JlIGNvbmZpZ3VyYXRpb24gd2hpY2ggaXMgbm90IGluIHlvdXIgZGVmaW5pdGlvbiA6ICR7a2V5cyhzdG9yZS5kZWZpbml0aW9uKX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGNhcGl0YWxpemVkUHJvcGVydHkgPSBjYXBpdGFsaXplKHByb3BlcnR5KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3RvcmVDb25mLnN0b3JlW2BhZGQke2NhcGl0YWxpemVkUHJvcGVydHl9Q2hhbmdlTGlzdGVuZXJgXSh0aGlzLmhhbmRsZVN0b3Jlc0NoYW5nZWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdG9yZUNvbmYuc3RvcmVbYGFkZCR7Y2FwaXRhbGl6ZWRQcm9wZXJ0eX1FcnJvckxpc3RlbmVyYF0odGhpcy5oYW5kbGVTdG9yZXNDaGFuZ2VkKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBXaGVuIGEgY29tcG9uZW50IHdpbGwgcmVjZWl2ZSBhIG5ldyBwcm9wcy5cclxuICAgICAgICAgICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpIHtcclxuXHRcdFx0XHR0aGlzLnVwZGF0ZVN0YXRlKG5leHRQcm9wcyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIENvbXBvbmVudCB1bm1vdW50LlxyXG4gICAgICAgICAgICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcclxuICAgXHRcdFx0XHR0aGlzLl9pc01vdW50ZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHN0b3Jlc0NvbmZpZ3VyYXRpb24uZm9yRWFjaChzdG9yZUNvbmYgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHtwcm9wZXJ0aWVzLCBzdG9yZX0gPSBzdG9yZUNvbmY7XHJcbiAgICAgICAgICAgICAgICAgICAgcHJvcGVydGllcy5mb3JFYWNoKChwcm9wZXJ0eSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjYXBpdGFsaXplZFByb3BlcnR5ID0gY2FwaXRhbGl6ZShwcm9wZXJ0eSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0b3JlQ29uZi5zdG9yZVtgcmVtb3ZlJHtjYXBpdGFsaXplZFByb3BlcnR5fUNoYW5nZUxpc3RlbmVyYF0odGhpcy5oYW5kbGVTdG9yZXNDaGFuZ2VkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3RvcmVDb25mLnN0b3JlW2ByZW1vdmUke2NhcGl0YWxpemVkUHJvcGVydHl9RXJyb3JMaXN0ZW5lcmBdKHRoaXMuaGFuZGxlU3RvcmVzQ2hhbmdlZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuXHRcdFx0Y29tcG9uZW50RGlkTW91bnQoKXtcclxuXHRcdFx0XHR0aGlzLl9pc01vdW50ZWQgPSB0cnVlO1xyXG5cdFx0XHRcdHRoaXMudXBkYXRlU3RhdGUodGhpcy5wcm9wcyk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHVwZGF0ZVN0YXRlKHByb3BzKXtcclxuXHRcdFx0XHRpZih0aGlzLl9pc01vdW50ZWQpe1xyXG5cdFx0XHRcdFx0dGhpcy5zZXRTdGF0ZShnZXRTdGF0ZSh0aGlzLnByb3BzKSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblxyXG4gICAgICAgICAgICAvL0hhbmRsZSB0aGUgc3RvcmUgY2hhbmdlc1xyXG4gICAgICAgICAgICBoYW5kbGVTdG9yZXNDaGFuZ2VkID0gKCkgPT4ge1xyXG5cdFx0XHRcdHRoaXMudXBkYXRlU3RhdGUodGhpcy5wcm9wcyk7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAvLyBSZW5kZXIgdGhlIGNvbXBvbmVudCB3aXRoIG9ubHkgcHJvcHMsIHNvbWUgZnJvbSB0aGUgcmVhbCBwcm9wcyBzb21lIGZyb20gdGhlIHN0YXRlXHJcbiAgICAgICAgICAgIHJlbmRlcigpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHtwcm9wcywgc3RhdGV9ID0gdGhpcztcclxuICAgICAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICAgICAgPERlY29yYXRlZENvbXBvbmVudFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7Li4ucHJvcHN9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsuLi5zdGF0ZX1cclxuICAgICAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBTdG9yZUNvbm5lY3Rvci5kaXNwbGF5TmFtZSA9IGAke2Rpc3BsYXlOYW1lfUNvbm5lY3RlZGA7XHJcbiAgICAgICAgcmV0dXJuIFN0b3JlQ29ubmVjdG9yO1xyXG4gICAgfTtcclxufVxyXG5cclxuLy8gQWRkIGEgZnVuY3Rpb24gdG8gY29ubmVjdCBhIHN0b3JlIHRvIGEgY29tcG9uZW50IC5cclxuLy8gQWxsIHRoZSBzdG9yZSBwcm9wZXJ0aWVzIHZhbHVlcyB3aWxsIGJlIHByb3ZpZGVkIHRvIHRoZSBjb21wb25lbnQgYXMgcHJvcHMuXHJcbi8vIFRoaXMgY291bGQgYmUgdXNlIGFzIGFuIEVTNyBhbm5vdGF0aW9uIG9yIGFzIGEgZnVuY3Rpb24uXHJcblxyXG5cclxuLy8gIyMjIEVTNiB2ZXJzaW9uXHJcbi8vIGBgYGpzeFxyXG4vLyBzdG9yZVxyXG4vLyBjb25zdCBuZXdTdG9yZSA9IG5ldyBDb3JlU3RvcmUoe2RlZmluaXRpb246IHtuYW1lOiAnbmFtZScsIGVtYWlsOiAnZW1haWwnfX0pO1xyXG4vL0NvbXBvbmVudFxyXG4vLyBjb25zdCBDb21wb25lbnQgPSBwcm9wcyA9PiA8ZGl2PntKU09OLnN0cmluZ2lmeShwcm9wcyl9PC9kaXY+O1xyXG4vLyBjcmVhdGUgYSBjb25uZWN0b3IgZnVuY3Rpb25cclxuLy8gY29uc3QgY29ubmVjdG9yID0gc3RvcmVDb25uZWN0QmVoYXZpb3VyKFxyXG4vLyAgICAgW3tzdG9yZTogbmV3U3RvcmUsIHByb3BlcnRpZXM6IFsnbmFtZScsICdlbWFpbCddfV0sXHJcbi8vICAgICAocHJvcHMpID0+IHtyZXR1cm4gbmV3U3RvcmUuZ2V0VmFsdWUoKX1cclxuLy8gKTtcclxuLy8gQ29tcG9uZW50IGNvbm5lY3RlZCB0byB0aGUgc3RvcmVcclxuLy8gY29uc3QgQ29ubmVjdGVkQ29tcG9uZW50ID0gY29ubmVjdG9yKENvbXBvbmVudCk7XHJcbi8vIGBgYFxyXG5cclxuLy8gIyMjIEVTNyB2ZXJzaW9uXHJcbi8vIGBgYGpzeFxyXG4vLyAgICBDbGFzcyB2ZXJzaW9uXHJcbi8vIEBjb25uZWN0KCBbe3N0b3JlOiBuZXdTdG9yZSwgcHJvcGVydGllczogWyduYW1lJywgJ2VtYWlsJ119XSwocHJvcHMpID0+IG5ld1N0b3JlLmdldFZhbHVlKCkpXHJcbi8vIGNsYXNzIFlvdXJDb21wb25lbnQgZXh0ZW5kcyBDb21wb25lbnR7XHJcbi8vICAgICByZW5kZXIoKXtcclxuLy8gICAgICAgICAgcmV0dXJuICA8ZGl2PntKU09OLnN0cmluZ2lmeShwcm9wcyl9PC9kaXY+O1xyXG4vLyAgICAgfVxyXG4vLyB9XHJcbi8vIGBgYFxyXG4iXX0=