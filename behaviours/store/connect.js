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
                        store['remove' + capitalizedProperty + 'ChangeListener'](_this3.handleStoresChanged);
                        store['remove' + capitalizedProperty + 'ErrorListener'](_this3.handleStoresChanged);
                    });
                });
            };

            StoreConnector.prototype.componentDidMount = function componentDidMount() {
                this._isMounted = true;
                this.updateState(this.props);
            };

            StoreConnector.prototype.updateState = function updateState(props) {
                if (this._isMounted) {
                    this.setState(getState(props));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJjb25uZWN0VG9TdG9yZXMiLCJzdG9yZXNDb25maWd1cmF0aW9uIiwiZ2V0U3RhdGUiLCJFcnJvciIsImNvbm5lY3RDb21wb25lbnQiLCJEZWNvcmF0ZWRDb21wb25lbnQiLCJkaXNwbGF5TmFtZSIsIlN0b3JlQ29ubmVjdG9yIiwicHJvcHMiLCJoYW5kbGVTdG9yZXNDaGFuZ2VkIiwidXBkYXRlU3RhdGUiLCJzdGF0ZSIsIl9pc01vdW50ZWQiLCJjb21wb25lbnRXaWxsTW91bnQiLCJmb3JFYWNoIiwicHJvcGVydGllcyIsInN0b3JlQ29uZiIsInN0b3JlIiwicHJvcGVydHkiLCJkZWZpbml0aW9uIiwiY29uc29sZSIsIndhcm4iLCJjYXBpdGFsaXplZFByb3BlcnR5IiwiY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyIsIm5leHRQcm9wcyIsImNvbXBvbmVudFdpbGxVbm1vdW50IiwiY29tcG9uZW50RGlkTW91bnQiLCJzZXRTdGF0ZSIsInJlbmRlciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7a0JBUXdCQSxlOztBQVJ4Qjs7QUFDQTs7QUFDQTs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7QUFFQTtBQUNBO0FBQ0E7QUFDZSxTQUFTQSxlQUFULENBQXlCQyxtQkFBekIsRUFBOENDLFFBQTlDLEVBQXdEO0FBQ25FO0FBQ0EsUUFBSSxDQUFDLG1CQUFRRCxtQkFBUixDQUFMLEVBQW1DO0FBQy9CLGNBQU0sSUFBSUUsS0FBSixDQUFVLGdFQUFWLENBQU47QUFDSDs7QUFFRDtBQUNBLFFBQUksQ0FBQyxzQkFBV0QsUUFBWCxDQUFMLEVBQTJCO0FBQ3ZCLGNBQU0sSUFBSUMsS0FBSixDQUFVLHlFQUFWLENBQU47QUFDSDtBQUNEO0FBQ0EsV0FBTyxTQUFTQyxnQkFBVCxDQUEwQkMsa0JBQTFCLEVBQThDOztBQUVqRDtBQUNBLFlBQU1DLGNBQWNELG1CQUFtQkMsV0FBbkIsSUFBa0MsV0FBdEQ7O0FBRUE7O0FBTGlELFlBTTNDQyxjQU4yQztBQUFBOztBQVE3QyxvQ0FBWUMsS0FBWixFQUFtQjtBQUFBOztBQUVmO0FBRmUsNkRBQ2Ysc0JBQU1BLEtBQU4sQ0FEZTs7QUFBQSxzQkF3RG5CQyxtQkF4RG1CLEdBd0RHLFlBQU07QUFDeEIsMEJBQUtDLFdBQUwsQ0FBaUIsTUFBS0YsS0FBdEI7QUFDSCxpQkExRGtCOztBQUdmLHNCQUFLRyxLQUFMLEdBQWFULFNBQVNNLEtBQVQsQ0FBYjtBQUNBLHNCQUFLSSxVQUFMLEdBQWtCLEtBQWxCO0FBSmU7QUFLbEI7O0FBRUQ7QUFDQTs7O0FBaEI2QyxxQ0FpQjdDQyxrQkFqQjZDLGlDQWlCeEI7QUFBQTs7QUFDakJaLG9DQUFvQmEsT0FBcEIsQ0FBNEIscUJBQWE7QUFBQSx3QkFDOUJDLFVBRDhCLEdBQ1RDLFNBRFMsQ0FDOUJELFVBRDhCO0FBQUEsd0JBQ2xCRSxLQURrQixHQUNURCxTQURTLENBQ2xCQyxLQURrQjs7QUFFckNGLCtCQUFXRCxPQUFYLENBQW1CLFVBQUNJLFFBQUQsRUFBYztBQUM3Qiw0QkFBSSxDQUFDRCxLQUFELElBQVUsQ0FBQ0EsTUFBTUUsVUFBakIsSUFBK0IsQ0FBQ0YsTUFBTUUsVUFBTixDQUFpQkQsUUFBakIsQ0FBcEMsRUFBZ0U7QUFDNURFLG9DQUFRQyxJQUFSLHVEQUNxQmYsV0FEckIsb0VBRStCWSxRQUYvQix1RUFFeUcsa0JBQUtELE1BQU1FLFVBQVgsQ0FGekc7QUFJSDtBQUNELDRCQUFNRyxzQkFBc0Isd0JBQVdKLFFBQVgsQ0FBNUI7QUFDQUYsa0NBQVVDLEtBQVYsU0FBc0JLLG1CQUF0QixxQkFBMkQsT0FBS2IsbUJBQWhFO0FBQ0FPLGtDQUFVQyxLQUFWLFNBQXNCSyxtQkFBdEIsb0JBQTBELE9BQUtiLG1CQUEvRDtBQUNILHFCQVZEO0FBV0gsaUJBYkQ7QUFjSCxhQWhDNEM7O0FBa0M3Qzs7O0FBbEM2QyxxQ0FtQzdDYyx5QkFuQzZDLHNDQW1DbkJDLFNBbkNtQixFQW1DUjtBQUNqQyxxQkFBS2QsV0FBTCxDQUFpQmMsU0FBakI7QUFDSCxhQXJDNEM7O0FBdUM3Qzs7O0FBdkM2QyxxQ0F3QzdDQyxvQkF4QzZDLG1DQXdDdEI7QUFBQTs7QUFDbkIscUJBQUtiLFVBQUwsR0FBa0IsS0FBbEI7QUFDQVgsb0NBQW9CYSxPQUFwQixDQUE0QixxQkFBYTtBQUFBLHdCQUM5QkMsVUFEOEIsR0FDVEMsU0FEUyxDQUM5QkQsVUFEOEI7QUFBQSx3QkFDbEJFLEtBRGtCLEdBQ1RELFNBRFMsQ0FDbEJDLEtBRGtCOztBQUVyQ0YsK0JBQVdELE9BQVgsQ0FBbUIsVUFBQ0ksUUFBRCxFQUFjO0FBQzdCLDRCQUFNSSxzQkFBc0Isd0JBQVdKLFFBQVgsQ0FBNUI7QUFDQUQseUNBQWVLLG1CQUFmLHFCQUFvRCxPQUFLYixtQkFBekQ7QUFDQVEseUNBQWVLLG1CQUFmLG9CQUFtRCxPQUFLYixtQkFBeEQ7QUFDSCxxQkFKRDtBQUtILGlCQVBEO0FBUUgsYUFsRDRDOztBQUFBLHFDQW9EN0NpQixpQkFwRDZDLGdDQW9EekI7QUFDaEIscUJBQUtkLFVBQUwsR0FBa0IsSUFBbEI7QUFDQSxxQkFBS0YsV0FBTCxDQUFpQixLQUFLRixLQUF0QjtBQUNILGFBdkQ0Qzs7QUFBQSxxQ0F5RDdDRSxXQXpENkMsd0JBeURqQ0YsS0F6RGlDLEVBeUQxQjtBQUNmLG9CQUFJLEtBQUtJLFVBQVQsRUFBcUI7QUFDakIseUJBQUtlLFFBQUwsQ0FBY3pCLFNBQVNNLEtBQVQsQ0FBZDtBQUNIO0FBQ0osYUE3RDRDOztBQStEN0M7OztBQUtBO0FBcEU2QyxxQ0FxRTdDb0IsTUFyRTZDLHFCQXFFcEM7QUFBQSxvQkFDRXBCLEtBREYsR0FDa0IsSUFEbEIsQ0FDRUEsS0FERjtBQUFBLG9CQUNTRyxLQURULEdBQ2tCLElBRGxCLENBQ1NBLEtBRFQ7O0FBRUwsdUJBQ0ksOEJBQUMsa0JBQUQsZUFDUUgsS0FEUixFQUVRRyxLQUZSLEVBREo7QUFNSCxhQTdFNEM7O0FBQUE7QUFBQTs7QUErRWpESix1QkFBZUQsV0FBZixHQUFnQ0EsV0FBaEM7QUFDQSxlQUFPQyxjQUFQO0FBQ0gsS0FqRkQ7QUFrRkg7O0FBRUQ7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7aXNBcnJheSwgaXNGdW5jdGlvbn0gZnJvbSAnbG9kYXNoL2xhbmcnO1xyXG5pbXBvcnQge2NhcGl0YWxpemV9IGZyb20gJ2xvZGFzaC9zdHJpbmcnXHJcbmltcG9ydCB7a2V5c30gZnJvbSAnbG9kYXNoL29iamVjdCc7XHJcbmltcG9ydCBSZWFjdCwge0NvbXBvbmVudH0gZnJvbSAncmVhY3QnO1xyXG5cclxuLy8gLSBQcm92aWRlIHRoZSBjb21wb25lbnRcclxuLy8gLSBQcm92aWRlIHRoZSBzdG9yZSBjb25maWd1cmF0aW9uIGBbe3N0b3JlOiB5b3VyU3RvcmUsIHByb3BlcnRpZXM6IFsncHJvcGVydHkxJywgJ3Byb3BlcnR5MiddfV1gXHJcbi8vIC0gUHJvdmlkZSBhIGZ1bmN0aW9uIHRvIHJlYWQgc3RhdGUgZnJvbSB5b3VyIHN0b3JlXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbm5lY3RUb1N0b3JlcyhzdG9yZXNDb25maWd1cmF0aW9uLCBnZXRTdGF0ZSkge1xyXG4gICAgLy8gVmFsaWRhdGUgdGhlIHN0b3JlcyBvYmplY3RcclxuICAgIGlmICghaXNBcnJheShzdG9yZXNDb25maWd1cmF0aW9uKSkge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignY29ubmVjdFRvU3RvcmVzOiB5b3UgbmVlZCB0byBwcm92aWRlIGFuIGFycmF5IG9mIHN0b3JlIGNvbmZpZy4nKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBWYWxpZGF0ZSAuXHJcbiAgICBpZiAoIWlzRnVuY3Rpb24oZ2V0U3RhdGUpKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdjb25uZWN0VG9TdG9yZXM6IHlvdSBuZWVkIHRvIHByb3ZpZGUgZnVuY3Rpb24gdG8gcmVhZCBzdGF0ZSBmcm9tIHN0b3JlLicpO1xyXG4gICAgfSBcclxuICAgIC8vIFJldHVybiBhIHdyYXBwZXIgZnVuY3Rpb24gYXJvdW5kIHRoZSBjb21wb25lbnRcclxuICAgIHJldHVybiBmdW5jdGlvbiBjb25uZWN0Q29tcG9uZW50KERlY29yYXRlZENvbXBvbmVudCkge1xyXG5cclxuICAgICAgICAvLyBTYXZlIHRoZSBkaXNwbGF5IG5hbWUgZm9yIGxhdGVyXHJcbiAgICAgICAgY29uc3QgZGlzcGxheU5hbWUgPSBEZWNvcmF0ZWRDb21wb25lbnQuZGlzcGxheU5hbWUgfHwgJ0NvbXBvbmVudCc7XHJcblxyXG4gICAgICAgIC8vIFRoZSBnb2FsIG9mIHRoaXMgY2xhc3MgaXMgdG8gY29ubmVjdCBhIGNvbXBvbmVudCB0byBhIGxpc3Qgb2Ygc3RvcmVzIHdpdGggcHJvcGVydGllcy5cclxuICAgICAgICBjbGFzcyBTdG9yZUNvbm5lY3RvciBleHRlbmRzIENvbXBvbmVudCB7XHJcblxyXG4gICAgICAgICAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xyXG4gICAgICAgICAgICAgICAgc3VwZXIocHJvcHMpO1xyXG4gICAgICAgICAgICAgICAgLy9CdWlsZCB0aGUgaW5pdGlhbCBzdGF0ZSBmcm9tIHByb3BzLlxyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IGdldFN0YXRlKHByb3BzKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2lzTW91bnRlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBXaGVuIHRoZSBjb21wb25lbnQgd2lsbCBtb3VudCwgd2UgbGlzdGVuIHRvIGFsbCBzdG9yZXMgY2hhbmdlcy5cclxuICAgICAgICAgICAgLy8gV2hlbiBhIGNoYW5nZSBvY2N1cnMgdGhlIHN0YXRlIGlzIHJlYWQgYWdhaW4gZnJvbSB0aGUgc3RhdGUuXHJcbiAgICAgICAgICAgIGNvbXBvbmVudFdpbGxNb3VudCgpIHtcclxuICAgICAgICAgICAgICAgIHN0b3Jlc0NvbmZpZ3VyYXRpb24uZm9yRWFjaChzdG9yZUNvbmYgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHtwcm9wZXJ0aWVzLCBzdG9yZX0gPSBzdG9yZUNvbmY7XHJcbiAgICAgICAgICAgICAgICAgICAgcHJvcGVydGllcy5mb3JFYWNoKChwcm9wZXJ0eSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXN0b3JlIHx8ICFzdG9yZS5kZWZpbml0aW9uIHx8ICFzdG9yZS5kZWZpbml0aW9uW3Byb3BlcnR5XSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS53YXJuKGBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBTdG9yZUNvbm5lY3RvciAke2Rpc3BsYXlOYW1lfTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgWW91IGFkZCBhIHByb3BlcnR5IDogJHtwcm9wZXJ0eX0gaW4geW91ciBzdG9yZSBjb25maWd1cmF0aW9uIHdoaWNoIGlzIG5vdCBpbiB5b3VyIGRlZmluaXRpb24gOiAke2tleXMoc3RvcmUuZGVmaW5pdGlvbil9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBgKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjYXBpdGFsaXplZFByb3BlcnR5ID0gY2FwaXRhbGl6ZShwcm9wZXJ0eSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0b3JlQ29uZi5zdG9yZVtgYWRkJHtjYXBpdGFsaXplZFByb3BlcnR5fUNoYW5nZUxpc3RlbmVyYF0odGhpcy5oYW5kbGVTdG9yZXNDaGFuZ2VkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3RvcmVDb25mLnN0b3JlW2BhZGQke2NhcGl0YWxpemVkUHJvcGVydHl9RXJyb3JMaXN0ZW5lcmBdKHRoaXMuaGFuZGxlU3RvcmVzQ2hhbmdlZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gV2hlbiBhIGNvbXBvbmVudCB3aWxsIHJlY2VpdmUgYSBuZXcgcHJvcHMuXHJcbiAgICAgICAgICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVN0YXRlKG5leHRQcm9wcyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIENvbXBvbmVudCB1bm1vdW50LlxyXG4gICAgICAgICAgICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2lzTW91bnRlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgc3RvcmVzQ29uZmlndXJhdGlvbi5mb3JFYWNoKHN0b3JlQ29uZiA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qge3Byb3BlcnRpZXMsIHN0b3JlfSA9IHN0b3JlQ29uZjtcclxuICAgICAgICAgICAgICAgICAgICBwcm9wZXJ0aWVzLmZvckVhY2goKHByb3BlcnR5KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGNhcGl0YWxpemVkUHJvcGVydHkgPSBjYXBpdGFsaXplKHByb3BlcnR5KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3RvcmVbYHJlbW92ZSR7Y2FwaXRhbGl6ZWRQcm9wZXJ0eX1DaGFuZ2VMaXN0ZW5lcmBdKHRoaXMuaGFuZGxlU3RvcmVzQ2hhbmdlZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0b3JlW2ByZW1vdmUke2NhcGl0YWxpemVkUHJvcGVydHl9RXJyb3JMaXN0ZW5lcmBdKHRoaXMuaGFuZGxlU3RvcmVzQ2hhbmdlZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY29tcG9uZW50RGlkTW91bnQoKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9pc01vdW50ZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVTdGF0ZSh0aGlzLnByb3BzKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdXBkYXRlU3RhdGUocHJvcHMpIHsgXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5faXNNb3VudGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZShnZXRTdGF0ZShwcm9wcykpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvL0hhbmRsZSB0aGUgc3RvcmUgY2hhbmdlc1xyXG4gICAgICAgICAgICBoYW5kbGVTdG9yZXNDaGFuZ2VkID0gKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVTdGF0ZSh0aGlzLnByb3BzKTtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIC8vIFJlbmRlciB0aGUgY29tcG9uZW50IHdpdGggb25seSBwcm9wcywgc29tZSBmcm9tIHRoZSByZWFsIHByb3BzIHNvbWUgZnJvbSB0aGUgc3RhdGVcclxuICAgICAgICAgICAgcmVuZGVyKCkge1xyXG4gICAgICAgICAgICAgICAgY29uc3Qge3Byb3BzLCBzdGF0ZX0gPSB0aGlzO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICAgICAgICA8RGVjb3JhdGVkQ29tcG9uZW50XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsuLi5wcm9wc31cclxuICAgICAgICAgICAgICAgICAgICAgICAgey4uLnN0YXRlfVxyXG4gICAgICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFN0b3JlQ29ubmVjdG9yLmRpc3BsYXlOYW1lID0gYCR7ZGlzcGxheU5hbWV9Q29ubmVjdGVkYDtcclxuICAgICAgICByZXR1cm4gU3RvcmVDb25uZWN0b3I7XHJcbiAgICB9O1xyXG59XHJcblxyXG4vLyBBZGQgYSBmdW5jdGlvbiB0byBjb25uZWN0IGEgc3RvcmUgdG8gYSBjb21wb25lbnQgLlxyXG4vLyBBbGwgdGhlIHN0b3JlIHByb3BlcnRpZXMgdmFsdWVzIHdpbGwgYmUgcHJvdmlkZWQgdG8gdGhlIGNvbXBvbmVudCBhcyBwcm9wcy5cclxuLy8gVGhpcyBjb3VsZCBiZSB1c2UgYXMgYW4gRVM3IGFubm90YXRpb24gb3IgYXMgYSBmdW5jdGlvbi5cclxuXHJcblxyXG4vLyAjIyMgRVM2IHZlcnNpb25cclxuLy8gYGBganN4XHJcbi8vIHN0b3JlXHJcbi8vIGNvbnN0IG5ld1N0b3JlID0gbmV3IENvcmVTdG9yZSh7ZGVmaW5pdGlvbjoge25hbWU6ICduYW1lJywgZW1haWw6ICdlbWFpbCd9fSk7XHJcbi8vQ29tcG9uZW50XHJcbi8vIGNvbnN0IENvbXBvbmVudCA9IHByb3BzID0+IDxkaXY+e0pTT04uc3RyaW5naWZ5KHByb3BzKX08L2Rpdj47XHJcbi8vIGNyZWF0ZSBhIGNvbm5lY3RvciBmdW5jdGlvblxyXG4vLyBjb25zdCBjb25uZWN0b3IgPSBzdG9yZUNvbm5lY3RCZWhhdmlvdXIoXHJcbi8vICAgICBbe3N0b3JlOiBuZXdTdG9yZSwgcHJvcGVydGllczogWyduYW1lJywgJ2VtYWlsJ119XSxcclxuLy8gICAgIChwcm9wcykgPT4ge3JldHVybiBuZXdTdG9yZS5nZXRWYWx1ZSgpfVxyXG4vLyApO1xyXG4vLyBDb21wb25lbnQgY29ubmVjdGVkIHRvIHRoZSBzdG9yZVxyXG4vLyBjb25zdCBDb25uZWN0ZWRDb21wb25lbnQgPSBjb25uZWN0b3IoQ29tcG9uZW50KTtcclxuLy8gYGBgXHJcblxyXG4vLyAjIyMgRVM3IHZlcnNpb25cclxuLy8gYGBganN4XHJcbi8vICAgIENsYXNzIHZlcnNpb25cclxuLy8gQGNvbm5lY3QoIFt7c3RvcmU6IG5ld1N0b3JlLCBwcm9wZXJ0aWVzOiBbJ25hbWUnLCAnZW1haWwnXX1dLChwcm9wcykgPT4gbmV3U3RvcmUuZ2V0VmFsdWUoKSlcclxuLy8gY2xhc3MgWW91ckNvbXBvbmVudCBleHRlbmRzIENvbXBvbmVudHtcclxuLy8gICAgIHJlbmRlcigpe1xyXG4vLyAgICAgICAgICByZXR1cm4gIDxkaXY+e0pTT04uc3RyaW5naWZ5KHByb3BzKX08L2Rpdj47XHJcbi8vICAgICB9XHJcbi8vIH1cclxuLy8gYGBgXHJcbiJdfQ==