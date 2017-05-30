'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _filterHtmlAttributes = require('../../utils/filter-html-attributes');

var _filterHtmlAttributes2 = _interopRequireDefault(_filterHtmlAttributes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; } // see http://www.getmdl.io/components/index.html#layout-section/grid
//dependencies


/**
 * Grid component.
 */

function Grid(_ref) {
    var children = _ref.children,
        className = _ref.className,
        otherProps = _objectWithoutProperties(_ref, ['children', 'className']);

    return _react2.default.createElement(
        'div',
        _extends({ className: 'mdl-grid ' + (className ? className : '') }, (0, _filterHtmlAttributes2.default)(otherProps)),
        children
    );
}

Grid.propTypes = {};
//Static props.
Grid.displayName = 'Grid';

module.exports = Grid;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJHcmlkIiwiY2hpbGRyZW4iLCJjbGFzc05hbWUiLCJvdGhlclByb3BzIiwicHJvcFR5cGVzIiwiZGlzcGxheU5hbWUiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7O0FBRUE7Ozs7QUFDQTs7Ozs7OzZOQUhBO0FBQ0E7OztBQUlBOzs7O0FBSUMsU0FBU0EsSUFBVCxPQUFvRDtBQUFBLFFBQXJDQyxRQUFxQyxRQUFyQ0EsUUFBcUM7QUFBQSxRQUEzQkMsU0FBMkIsUUFBM0JBLFNBQTJCO0FBQUEsUUFBYkMsVUFBYTs7QUFDaEQsV0FDSTtBQUFBO0FBQUEsbUJBQUssMEJBQXVCRCxZQUFZQSxTQUFaLEdBQXdCLEVBQS9DLENBQUwsSUFBOEQsb0NBQVlDLFVBQVosQ0FBOUQ7QUFDS0Y7QUFETCxLQURKO0FBS0g7O0FBRUZELEtBQUtJLFNBQUwsR0FBaUIsRUFBakI7QUFDQTtBQUNBSixLQUFLSyxXQUFMLEdBQW1CLE1BQW5COztBQUVBQyxPQUFPQyxPQUFQLEdBQWlCUCxJQUFqQiIsImZpbGUiOiJpcy1yZWFjdC1jbGFzcy1jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBzZWUgaHR0cDovL3d3dy5nZXRtZGwuaW8vY29tcG9uZW50cy9pbmRleC5odG1sI2xheW91dC1zZWN0aW9uL2dyaWRcclxuLy9kZXBlbmRlbmNpZXNcclxuaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IGZpbHRlclByb3BzIGZyb20gJy4uLy4uL3V0aWxzL2ZpbHRlci1odG1sLWF0dHJpYnV0ZXMnO1xyXG5cclxuLyoqXHJcbiAqIEdyaWQgY29tcG9uZW50LlxyXG4gKi9cclxuXHJcbiBmdW5jdGlvbiBHcmlkKHtjaGlsZHJlbiwgY2xhc3NOYW1lLCAuLi5vdGhlclByb3BzfSkge1xyXG4gICAgIHJldHVybiAoXHJcbiAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtgbWRsLWdyaWQgJHtjbGFzc05hbWUgPyBjbGFzc05hbWUgOiAnJ31gfSB7Li4uZmlsdGVyUHJvcHMob3RoZXJQcm9wcyl9PlxyXG4gICAgICAgICAgICAge2NoaWxkcmVufVxyXG4gICAgICAgICA8L2Rpdj5cclxuICAgICApO1xyXG4gfVxyXG5cclxuR3JpZC5wcm9wVHlwZXMgPSB7fTtcclxuLy9TdGF0aWMgcHJvcHMuXHJcbkdyaWQuZGlzcGxheU5hbWUgPSAnR3JpZCc7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEdyaWQ7XHJcbiJdfQ==