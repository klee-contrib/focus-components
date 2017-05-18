'use strict';

// Dependencies

var React = require('react');
var detailMixin = require('./detail').mixin;

//Function to help page creation.
module.exports = {
    detail: detailMixin,
    search: require('./search'),
    mixin: require('./mixin'),
    list: require('./list'),
    /**
     * Helper to creates a detail page.
     * @param {object} config - The page configuration.
     * @returns {object} - The react component associated to the page.
     */
    createDetail: function createDetail(config) {
        config = config || {};
        if (config.mixins) {
            config.mixins.push(detailMixin);
        } else {
            config.mixins = [detailMixin];
        }
        return React.createClass(config);
    }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJSZWFjdCIsInJlcXVpcmUiLCJkZXRhaWxNaXhpbiIsIm1peGluIiwibW9kdWxlIiwiZXhwb3J0cyIsImRldGFpbCIsInNlYXJjaCIsImxpc3QiLCJjcmVhdGVEZXRhaWwiLCJjb25maWciLCJtaXhpbnMiLCJwdXNoIiwiY3JlYXRlQ2xhc3MiXSwibWFwcGluZ3MiOiI7O0FBQUE7O0FBRUEsSUFBSUEsUUFBUUMsUUFBUSxPQUFSLENBQVo7QUFDQSxJQUFJQyxjQUFjRCxRQUFRLFVBQVIsRUFBb0JFLEtBQXRDOztBQUVBO0FBQ0FDLE9BQU9DLE9BQVAsR0FBaUI7QUFDYkMsWUFBUUosV0FESztBQUViSyxZQUFRTixRQUFRLFVBQVIsQ0FGSztBQUdiRSxXQUFPRixRQUFRLFNBQVIsQ0FITTtBQUliTyxVQUFNUCxRQUFRLFFBQVIsQ0FKTztBQUtmOzs7OztBQUtFUSxrQkFBYyxTQUFTQSxZQUFULENBQXNCQyxNQUF0QixFQUE4QjtBQUN4Q0EsaUJBQVNBLFVBQVUsRUFBbkI7QUFDQSxZQUFJQSxPQUFPQyxNQUFYLEVBQW1CO0FBQ2ZELG1CQUFPQyxNQUFQLENBQWNDLElBQWQsQ0FBbUJWLFdBQW5CO0FBQ0gsU0FGRCxNQUVPO0FBQ0hRLG1CQUFPQyxNQUFQLEdBQWdCLENBQUNULFdBQUQsQ0FBaEI7QUFDSDtBQUNELGVBQU9GLE1BQU1hLFdBQU4sQ0FBa0JILE1BQWxCLENBQVA7QUFDSDtBQWxCWSxDQUFqQiIsImZpbGUiOiJpcy1yZWFjdC1jbGFzcy1jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBEZXBlbmRlbmNpZXNcclxuXHJcbmxldCBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XHJcbmxldCBkZXRhaWxNaXhpbiA9IHJlcXVpcmUoJy4vZGV0YWlsJykubWl4aW47XHJcblxyXG4vL0Z1bmN0aW9uIHRvIGhlbHAgcGFnZSBjcmVhdGlvbi5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcbiAgICBkZXRhaWw6IGRldGFpbE1peGluLFxyXG4gICAgc2VhcmNoOiByZXF1aXJlKCcuL3NlYXJjaCcpLFxyXG4gICAgbWl4aW46IHJlcXVpcmUoJy4vbWl4aW4nKSxcclxuICAgIGxpc3Q6IHJlcXVpcmUoJy4vbGlzdCcpLFxyXG4gIC8qKlxyXG4gICAqIEhlbHBlciB0byBjcmVhdGVzIGEgZGV0YWlsIHBhZ2UuXHJcbiAgICogQHBhcmFtIHtvYmplY3R9IGNvbmZpZyAtIFRoZSBwYWdlIGNvbmZpZ3VyYXRpb24uXHJcbiAgICogQHJldHVybnMge29iamVjdH0gLSBUaGUgcmVhY3QgY29tcG9uZW50IGFzc29jaWF0ZWQgdG8gdGhlIHBhZ2UuXHJcbiAgICovXHJcbiAgICBjcmVhdGVEZXRhaWw6IGZ1bmN0aW9uIGNyZWF0ZURldGFpbChjb25maWcpIHtcclxuICAgICAgICBjb25maWcgPSBjb25maWcgfHwge307XHJcbiAgICAgICAgaWYgKGNvbmZpZy5taXhpbnMpIHtcclxuICAgICAgICAgICAgY29uZmlnLm1peGlucy5wdXNoKGRldGFpbE1peGluKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjb25maWcubWl4aW5zID0gW2RldGFpbE1peGluXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUNsYXNzKGNvbmZpZyk7XHJcbiAgICB9XHJcbn07XHJcbiJdfQ==