'use strict';

var _builder = require('focus-core/component/builder');

var _builder2 = _interopRequireDefault(_builder);

var _user = require('focus-core/user');

var _user2 = _interopRequireDefault(_user);

var _types = require('focus-core/component/types');

var _types2 = _interopRequireDefault(_types);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var React = require('react');

var intersection = require('lodash/array/intersection');
var isArray = require('lodash/lang/isArray');


/**
 * Mixin button.
 * @type {Object}
 */
var roleMixin = {
    propTypes: {
        hasOne: (0, _types2.default)('array'),
        hasAll: (0, _types2.default)('array')
    },
    render: function render() {
        var userRoles = _user2.default.getRoles();
        if (isArray(this.props.hasAll) && intersection(userRoles, this.props.hasAll).length === this.props.hasAll.length) {
            return this.props.children;
        } else if (isArray(this.props.hasOne) && intersection(userRoles, this.props.hasOne).length > 0) {
            return this.props.children;
        }
        return null;
    }
};

module.exports = (0, _builder2.default)(roleMixin);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJSZWFjdCIsInJlcXVpcmUiLCJpbnRlcnNlY3Rpb24iLCJpc0FycmF5Iiwicm9sZU1peGluIiwicHJvcFR5cGVzIiwiaGFzT25lIiwiaGFzQWxsIiwicmVuZGVyIiwidXNlclJvbGVzIiwiZ2V0Um9sZXMiLCJwcm9wcyIsImxlbmd0aCIsImNoaWxkcmVuIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7QUFDQTs7OztBQUNBOzs7O0FBR0E7Ozs7OztBQUxBLElBQUlBLFFBQVFDLFFBQVEsT0FBUixDQUFaOztBQUdBLElBQUlDLGVBQWVELFFBQVEsMkJBQVIsQ0FBbkI7QUFDQSxJQUFJRSxVQUFVRixRQUFRLHFCQUFSLENBQWQ7OztBQUdBOzs7O0FBSUEsSUFBSUcsWUFBWTtBQUNaQyxlQUFVO0FBQ05DLGdCQUFRLHFCQUFLLE9BQUwsQ0FERjtBQUVOQyxnQkFBTyxxQkFBSyxPQUFMO0FBRkQsS0FERTtBQUtaQyxVQUxZLG9CQUtIO0FBQ0wsWUFBSUMsWUFBWSxlQUFLQyxRQUFMLEVBQWhCO0FBQ0EsWUFBR1AsUUFBUSxLQUFLUSxLQUFMLENBQVdKLE1BQW5CLEtBQThCTCxhQUFhTyxTQUFiLEVBQXdCLEtBQUtFLEtBQUwsQ0FBV0osTUFBbkMsRUFBMkNLLE1BQTNDLEtBQXNELEtBQUtELEtBQUwsQ0FBV0osTUFBWCxDQUFrQkssTUFBekcsRUFBaUg7QUFDN0csbUJBQU8sS0FBS0QsS0FBTCxDQUFXRSxRQUFsQjtBQUNILFNBRkQsTUFFTyxJQUFHVixRQUFRLEtBQUtRLEtBQUwsQ0FBV0wsTUFBbkIsS0FBOEJKLGFBQWFPLFNBQWIsRUFBd0IsS0FBS0UsS0FBTCxDQUFXTCxNQUFuQyxFQUEyQ00sTUFBM0MsR0FBb0QsQ0FBckYsRUFBd0Y7QUFDM0YsbUJBQU8sS0FBS0QsS0FBTCxDQUFXRSxRQUFsQjtBQUNIO0FBQ0QsZUFBTyxJQUFQO0FBRUg7QUFkVyxDQUFoQjs7QUFpQkFDLE9BQU9DLE9BQVAsR0FBaUIsdUJBQVFYLFNBQVIsQ0FBakIiLCJmaWxlIjoiaXMtcmVhY3QtY2xhc3MtY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsibGV0IFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcclxuaW1wb3J0IGJ1aWxkZXIgZnJvbSAnZm9jdXMtY29yZS9jb21wb25lbnQvYnVpbGRlcic7XHJcbmltcG9ydCB1c2VyIGZyb20gJ2ZvY3VzLWNvcmUvdXNlcic7XHJcbmxldCBpbnRlcnNlY3Rpb24gPSByZXF1aXJlKCdsb2Rhc2gvYXJyYXkvaW50ZXJzZWN0aW9uJyk7XHJcbmxldCBpc0FycmF5ID0gcmVxdWlyZSgnbG9kYXNoL2xhbmcvaXNBcnJheScpO1xyXG5pbXBvcnQgdHlwZSBmcm9tICdmb2N1cy1jb3JlL2NvbXBvbmVudC90eXBlcyc7XHJcblxyXG4vKipcclxuICogTWl4aW4gYnV0dG9uLlxyXG4gKiBAdHlwZSB7T2JqZWN0fVxyXG4gKi9cclxudmFyIHJvbGVNaXhpbiA9IHtcclxuICAgIHByb3BUeXBlczp7XHJcbiAgICAgICAgaGFzT25lOiB0eXBlKCdhcnJheScpLFxyXG4gICAgICAgIGhhc0FsbDp0eXBlKCdhcnJheScpXHJcbiAgICB9LFxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIGxldCB1c2VyUm9sZXMgPSB1c2VyLmdldFJvbGVzKCk7XHJcbiAgICAgICAgaWYoaXNBcnJheSh0aGlzLnByb3BzLmhhc0FsbCkgJiYgaW50ZXJzZWN0aW9uKHVzZXJSb2xlcywgdGhpcy5wcm9wcy5oYXNBbGwpLmxlbmd0aCA9PT0gdGhpcy5wcm9wcy5oYXNBbGwubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnByb3BzLmNoaWxkcmVuO1xyXG4gICAgICAgIH0gZWxzZSBpZihpc0FycmF5KHRoaXMucHJvcHMuaGFzT25lKSAmJiBpbnRlcnNlY3Rpb24odXNlclJvbGVzLCB0aGlzLnByb3BzLmhhc09uZSkubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5jaGlsZHJlbjtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcblxyXG4gICAgfVxyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBidWlsZGVyKHJvbGVNaXhpbik7XHJcbiJdfQ==