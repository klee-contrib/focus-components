'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _user = require('focus-core/user');

var _user2 = _interopRequireDefault(_user);

var _intersection = require('lodash/array/intersection');

var _intersection2 = _interopRequireDefault(_intersection);

var _isArray = require('lodash/lang/isArray');

var _isArray2 = _interopRequireDefault(_isArray);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Role(_ref) {
    var hasAll = _ref.hasAll,
        hasOne = _ref.hasOne,
        children = _ref.children,
        emptyBlock = _ref.emptyBlock;

    var userRoles = _user2.default.getRoles();
    //console.log("emptyBlock",emptyBlock);
    if ((0, _isArray2.default)(hasAll) && (0, _intersection2.default)(userRoles, hasAll).length === hasAll.length) {
        return children;
    } else if ((0, _isArray2.default)(hasOne) && (0, _intersection2.default)(userRoles, hasOne).length > 0) {
        return children;
    }
    return emptyBlock;
}

Role.displayName = 'Role';
Role.defaultProps = {
    emptyBlock: null
};
Role.propTypes = {
    children: _react.PropTypes.object,
    hasOne: _react.PropTypes.array,
    hasAll: _react.PropTypes.array
};

exports.default = Role;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJSb2xlIiwiaGFzQWxsIiwiaGFzT25lIiwiY2hpbGRyZW4iLCJlbXB0eUJsb2NrIiwidXNlclJvbGVzIiwiZ2V0Um9sZXMiLCJsZW5ndGgiLCJkaXNwbGF5TmFtZSIsImRlZmF1bHRQcm9wcyIsInByb3BUeXBlcyIsIm9iamVjdCIsImFycmF5Il0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTs7OztBQUVBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBRUEsU0FBU0EsSUFBVCxPQUFtRDtBQUFBLFFBQXBDQyxNQUFvQyxRQUFwQ0EsTUFBb0M7QUFBQSxRQUE3QkMsTUFBNkIsUUFBN0JBLE1BQTZCO0FBQUEsUUFBdEJDLFFBQXNCLFFBQXRCQSxRQUFzQjtBQUFBLFFBQWJDLFVBQWEsUUFBYkEsVUFBYTs7QUFDL0MsUUFBSUMsWUFBWSxlQUFLQyxRQUFMLEVBQWhCO0FBQ0E7QUFDQSxRQUFHLHVCQUFRTCxNQUFSLEtBQW1CLDRCQUFhSSxTQUFiLEVBQXdCSixNQUF4QixFQUFnQ00sTUFBaEMsS0FBMkNOLE9BQU9NLE1BQXhFLEVBQWdGO0FBQzVFLGVBQU9KLFFBQVA7QUFDSCxLQUZELE1BRU8sSUFBRyx1QkFBUUQsTUFBUixLQUFtQiw0QkFBYUcsU0FBYixFQUF3QkgsTUFBeEIsRUFBZ0NLLE1BQWhDLEdBQXlDLENBQS9ELEVBQWtFO0FBQ3JFLGVBQU9KLFFBQVA7QUFDSDtBQUNELFdBQU9DLFVBQVA7QUFDSDs7QUFJREosS0FBS1EsV0FBTCxHQUFtQixNQUFuQjtBQUNBUixLQUFLUyxZQUFMLEdBQW9CO0FBQ2hCTCxnQkFBWTtBQURJLENBQXBCO0FBR0FKLEtBQUtVLFNBQUwsR0FBaUI7QUFDYlAsY0FBVyxpQkFBVVEsTUFEUjtBQUViVCxZQUFRLGlCQUFVVSxLQUZMO0FBR2JYLFlBQU8saUJBQVVXO0FBSEosQ0FBakI7O2tCQU9lWixJIiwiZmlsZSI6ImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge1Byb3BUeXBlc30gZnJvbSAncmVhY3QnO1xyXG5cclxuaW1wb3J0IHVzZXIgZnJvbSAnZm9jdXMtY29yZS91c2VyJztcclxuaW1wb3J0IGludGVyc2VjdGlvbiBmcm9tICdsb2Rhc2gvYXJyYXkvaW50ZXJzZWN0aW9uJztcclxuaW1wb3J0IGlzQXJyYXkgZnJvbSAnbG9kYXNoL2xhbmcvaXNBcnJheSc7XHJcblxyXG5mdW5jdGlvbiBSb2xlKHtoYXNBbGwsaGFzT25lLGNoaWxkcmVuLGVtcHR5QmxvY2t9KSB7XHJcbiAgICBsZXQgdXNlclJvbGVzID0gdXNlci5nZXRSb2xlcygpO1xyXG4gICAgLy9jb25zb2xlLmxvZyhcImVtcHR5QmxvY2tcIixlbXB0eUJsb2NrKTtcclxuICAgIGlmKGlzQXJyYXkoaGFzQWxsKSAmJiBpbnRlcnNlY3Rpb24odXNlclJvbGVzLCBoYXNBbGwpLmxlbmd0aCA9PT0gaGFzQWxsLmxlbmd0aCkge1xyXG4gICAgICAgIHJldHVybiBjaGlsZHJlbjtcclxuICAgIH0gZWxzZSBpZihpc0FycmF5KGhhc09uZSkgJiYgaW50ZXJzZWN0aW9uKHVzZXJSb2xlcywgaGFzT25lKS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgcmV0dXJuIGNoaWxkcmVuO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGVtcHR5QmxvY2s7XHJcbn1cclxuXHJcblxyXG5cclxuUm9sZS5kaXNwbGF5TmFtZSA9ICdSb2xlJztcclxuUm9sZS5kZWZhdWx0UHJvcHMgPSB7XHJcbiAgICBlbXB0eUJsb2NrOiBudWxsXHJcbn07XHJcblJvbGUucHJvcFR5cGVzID0ge1xyXG4gICAgY2hpbGRyZW4gOiBQcm9wVHlwZXMub2JqZWN0LFxyXG4gICAgaGFzT25lOiBQcm9wVHlwZXMuYXJyYXksXHJcbiAgICBoYXNBbGw6UHJvcFR5cGVzLmFycmF5XHJcbn07XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgUm9sZTtcclxuIl19