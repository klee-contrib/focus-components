'use strict';

var uuid = require('uuid');
/**
 * Export a method which add an identifier to component;
 * @type {Object}
 */
module.exports = {
    /** @inheriteDoc */
    componentWillMount: function componentWillMount() {
        Object.defineProperty(this, '_identifier', {
            value: uuid.v4(),
            writable: false,
            enumerable: true,
            configurable: false
        });
    }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJ1dWlkIiwicmVxdWlyZSIsIm1vZHVsZSIsImV4cG9ydHMiLCJjb21wb25lbnRXaWxsTW91bnQiLCJPYmplY3QiLCJkZWZpbmVQcm9wZXJ0eSIsInZhbHVlIiwidjQiLCJ3cml0YWJsZSIsImVudW1lcmFibGUiLCJjb25maWd1cmFibGUiXSwibWFwcGluZ3MiOiI7O0FBQUEsSUFBSUEsT0FBT0MsUUFBUSxNQUFSLENBQVg7QUFDQTs7OztBQUlBQyxPQUFPQyxPQUFQLEdBQWlCO0FBQ2I7QUFDQUMsc0JBRmEsZ0NBRVE7QUFDakJDLGVBQU9DLGNBQVAsQ0FBdUIsSUFBdkIsRUFBNkIsYUFBN0IsRUFBNEM7QUFDeENDLG1CQUFPUCxLQUFLUSxFQUFMLEVBRGlDO0FBRXhDQyxzQkFBVSxLQUY4QjtBQUd4Q0Msd0JBQVksSUFINEI7QUFJeENDLDBCQUFjO0FBSjBCLFNBQTVDO0FBTUg7QUFUWSxDQUFqQiIsImZpbGUiOiJpcy1yZWFjdC1jbGFzcy1jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJsZXQgdXVpZCA9IHJlcXVpcmUoJ3V1aWQnKTtcclxuLyoqXHJcbiAqIEV4cG9ydCBhIG1ldGhvZCB3aGljaCBhZGQgYW4gaWRlbnRpZmllciB0byBjb21wb25lbnQ7XHJcbiAqIEB0eXBlIHtPYmplY3R9XHJcbiAqL1xyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuICAgIC8qKiBAaW5oZXJpdGVEb2MgKi9cclxuICAgIGNvbXBvbmVudFdpbGxNb3VudCgpIHtcclxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoIHRoaXMsICdfaWRlbnRpZmllcicsIHtcclxuICAgICAgICAgICAgdmFsdWU6IHV1aWQudjQoKSxcclxuICAgICAgICAgICAgd3JpdGFibGU6IGZhbHNlLFxyXG4gICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICBjb25maWd1cmFibGU6IGZhbHNlXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn07XHJcbiJdfQ==