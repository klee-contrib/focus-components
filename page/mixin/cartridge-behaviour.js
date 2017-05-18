'use strict';

var _lang = require('lodash/lang');

var _application = require('focus-core/application');

var _empty = require('../../common/empty');

module.exports = {

    /**
     * Updates the cartridge using the cartridgeConfiguration.
     */
    _registerCartridge: function _registerCartridge() {
        this.cartridgeConfiguration = this.cartridgeConfiguration || this.props.cartridgeConfiguration;

        if (!(0, _lang.isFunction)(this.cartridgeConfiguration)) {
            this.cartridgeConfiguration = function () {
                return {};
            };
            console.warn('\n                Your detail page does not have any cartrige configuration, this is not mandarory but recommended.\n                It should be a component attribute return by a function.\n                function cartridgeConfiguration(){\n                    var cartridgeConfiguration = {\n                    summary: {component: "A React Component", props: {id: this.props.id}},\n                    cartridge: {component: "A React Component"},\n                    actions: {components: "react actions"}\n                    };\n                    return cartridgeConfiguration;\n                }\n            ');
        }

        (0, _application.setHeader)(this.cartridgeConfiguration());
    },


    /**
     * Registers the cartridge upon mounting.
     */
    componentWillMount: function componentWillMount() {
        this._registerCartridge();
    }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJtb2R1bGUiLCJleHBvcnRzIiwiX3JlZ2lzdGVyQ2FydHJpZGdlIiwiY2FydHJpZGdlQ29uZmlndXJhdGlvbiIsInByb3BzIiwiY29uc29sZSIsIndhcm4iLCJjb21wb25lbnRXaWxsTW91bnQiXSwibWFwcGluZ3MiOiI7O0FBQUE7O0FBQ0E7O0FBQ0E7O0FBRUFBLE9BQU9DLE9BQVAsR0FBaUI7O0FBRWI7OztBQUdBQyxzQkFMYSxnQ0FLUTtBQUNqQixhQUFLQyxzQkFBTCxHQUE4QixLQUFLQSxzQkFBTCxJQUErQixLQUFLQyxLQUFMLENBQVdELHNCQUF4RTs7QUFFQSxZQUFJLENBQUMsc0JBQVcsS0FBS0Esc0JBQWhCLENBQUwsRUFBOEM7QUFDMUMsaUJBQUtBLHNCQUFMLEdBQThCO0FBQUEsdUJBQU8sRUFBUDtBQUFBLGFBQTlCO0FBQ0FFLG9CQUFRQyxJQUFSO0FBWUg7O0FBRUQsb0NBQVUsS0FBS0gsc0JBQUwsRUFBVjtBQUNILEtBekJZOzs7QUEyQmI7OztBQUdBSSxzQkE5QmEsZ0NBOEJRO0FBQ2pCLGFBQUtMLGtCQUFMO0FBQ0g7QUFoQ1ksQ0FBakIiLCJmaWxlIjoiaXMtcmVhY3QtY2xhc3MtY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtpc0Z1bmN0aW9uLCBpc1VuZGVmaW5lZH0gZnJvbSAnbG9kYXNoL2xhbmcnO1xyXG5pbXBvcnQge3NldEhlYWRlcn0gZnJvbSAnZm9jdXMtY29yZS9hcHBsaWNhdGlvbic7XHJcbmltcG9ydCB7Y29tcG9uZW50IGFzIEVtcHR5fSBmcm9tICcuLi8uLi9jb21tb24vZW1wdHknO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBVcGRhdGVzIHRoZSBjYXJ0cmlkZ2UgdXNpbmcgdGhlIGNhcnRyaWRnZUNvbmZpZ3VyYXRpb24uXHJcbiAgICAgKi9cclxuICAgIF9yZWdpc3RlckNhcnRyaWRnZSgpIHtcclxuICAgICAgICB0aGlzLmNhcnRyaWRnZUNvbmZpZ3VyYXRpb24gPSB0aGlzLmNhcnRyaWRnZUNvbmZpZ3VyYXRpb24gfHwgdGhpcy5wcm9wcy5jYXJ0cmlkZ2VDb25maWd1cmF0aW9uO1xyXG5cclxuICAgICAgICBpZiAoIWlzRnVuY3Rpb24odGhpcy5jYXJ0cmlkZ2VDb25maWd1cmF0aW9uKSkge1xyXG4gICAgICAgICAgICB0aGlzLmNhcnRyaWRnZUNvbmZpZ3VyYXRpb24gPSAoKSA9PiAoe30pO1xyXG4gICAgICAgICAgICBjb25zb2xlLndhcm4oYFxyXG4gICAgICAgICAgICAgICAgWW91ciBkZXRhaWwgcGFnZSBkb2VzIG5vdCBoYXZlIGFueSBjYXJ0cmlnZSBjb25maWd1cmF0aW9uLCB0aGlzIGlzIG5vdCBtYW5kYXJvcnkgYnV0IHJlY29tbWVuZGVkLlxyXG4gICAgICAgICAgICAgICAgSXQgc2hvdWxkIGJlIGEgY29tcG9uZW50IGF0dHJpYnV0ZSByZXR1cm4gYnkgYSBmdW5jdGlvbi5cclxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIGNhcnRyaWRnZUNvbmZpZ3VyYXRpb24oKXtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgY2FydHJpZGdlQ29uZmlndXJhdGlvbiA9IHtcclxuICAgICAgICAgICAgICAgICAgICBzdW1tYXJ5OiB7Y29tcG9uZW50OiBcIkEgUmVhY3QgQ29tcG9uZW50XCIsIHByb3BzOiB7aWQ6IHRoaXMucHJvcHMuaWR9fSxcclxuICAgICAgICAgICAgICAgICAgICBjYXJ0cmlkZ2U6IHtjb21wb25lbnQ6IFwiQSBSZWFjdCBDb21wb25lbnRcIn0sXHJcbiAgICAgICAgICAgICAgICAgICAgYWN0aW9uczoge2NvbXBvbmVudHM6IFwicmVhY3QgYWN0aW9uc1wifVxyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNhcnRyaWRnZUNvbmZpZ3VyYXRpb247XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBzZXRIZWFkZXIodGhpcy5jYXJ0cmlkZ2VDb25maWd1cmF0aW9uKCkpO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlZ2lzdGVycyB0aGUgY2FydHJpZGdlIHVwb24gbW91bnRpbmcuXHJcbiAgICAgKi9cclxuICAgIGNvbXBvbmVudFdpbGxNb3VudCgpIHtcclxuICAgICAgICB0aGlzLl9yZWdpc3RlckNhcnRyaWRnZSgpO1xyXG4gICAgfVxyXG59O1xyXG4iXX0=