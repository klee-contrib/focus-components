'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _button = require('./button');

var _button2 = _interopRequireDefault(_button);

var _dropdown = require('./dropdown');

var _dropdown2 = _interopRequireDefault(_dropdown);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Components

var HeaderActions = function HeaderActions(_ref) {
    var primary = _ref.primary;
    var secondary = _ref.secondary;

    return React.createElement(
        'div',
        { 'data-focus': 'content-actions' },
        primary.map(function (primary) {
            if (Array.isArray(primary.action)) {
                return React.createElement(_dropdown2.default, { iconProps: { name: primary.icon }, operationList: primary.action, shape: 'fab' });
            } else {
                return React.createElement(_button2.default, { handleOnClick: primary.action, icon: primary.icon, label: primary.label, shape: 'fab', style: { className: primary.className }, type: 'button' });
            }
        }),
        React.createElement(_dropdown2.default, { iconProps: { name: 'more_vert' }, operationList: secondary, shape: 'fab' })
    );
};

exports.default = HeaderActions;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZyLUZSLmpzIl0sIm5hbWVzIjpbIkhlYWRlckFjdGlvbnMiLCJwcmltYXJ5Iiwic2Vjb25kYXJ5IiwibWFwIiwiQXJyYXkiLCJpc0FycmF5IiwiYWN0aW9uIiwibmFtZSIsImljb24iLCJsYWJlbCIsImNsYXNzTmFtZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBSUE7Ozs7QUFDQTs7Ozs7O0FBSEE7O0FBS0EsSUFBTUEsZ0JBQWdCLFNBQWhCQSxhQUFnQixPQUEyQjtBQUFBLFFBQXpCQyxPQUF5QixRQUF6QkEsT0FBeUI7QUFBQSxRQUFoQkMsU0FBZ0IsUUFBaEJBLFNBQWdCOztBQUMzQyxXQUNJO0FBQUE7QUFBQSxVQUFLLGNBQVcsaUJBQWhCO0FBQ0tELGdCQUFRRSxHQUFSLENBQVksVUFBQ0YsT0FBRCxFQUFhO0FBQ3RCLGdCQUFHRyxNQUFNQyxPQUFOLENBQWNKLFFBQVFLLE1BQXRCLENBQUgsRUFBa0M7QUFDOUIsdUJBQU8sMENBQVUsV0FBVyxFQUFDQyxNQUFNTixRQUFRTyxJQUFmLEVBQXJCLEVBQTJDLGVBQWVQLFFBQVFLLE1BQWxFLEVBQTBFLE9BQU0sS0FBaEYsR0FBUDtBQUNILGFBRkQsTUFFTztBQUNILHVCQUNJLHdDQUFRLGVBQWVMLFFBQVFLLE1BQS9CLEVBQXVDLE1BQU1MLFFBQVFPLElBQXJELEVBQTJELE9BQU9QLFFBQVFRLEtBQTFFLEVBQWlGLE9BQU0sS0FBdkYsRUFBNkYsT0FBTyxFQUFDQyxXQUFXVCxRQUFRUyxTQUFwQixFQUFwRyxFQUFvSSxNQUFLLFFBQXpJLEdBREo7QUFHSDtBQUNKLFNBUkEsQ0FETDtBQVVJLGtEQUFVLFdBQVcsRUFBQ0gsTUFBTSxXQUFQLEVBQXJCLEVBQTBDLGVBQWVMLFNBQXpELEVBQW9FLE9BQU0sS0FBMUU7QUFWSixLQURKO0FBY0wsQ0FmRDs7a0JBa0JlRixhIiwiZmlsZSI6ImZyLUZSLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcblxyXG4vLyBDb21wb25lbnRzXHJcblxyXG5pbXBvcnQgQnV0dG9uIGZyb20gJy4vYnV0dG9uJztcclxuaW1wb3J0IERyb3Bkb3duIGZyb20gJy4vZHJvcGRvd24nXHJcblxyXG5jb25zdCBIZWFkZXJBY3Rpb25zID0gKHtwcmltYXJ5LCBzZWNvbmRhcnl9KSA9PiAge1xyXG4gICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgPGRpdiBkYXRhLWZvY3VzPSdjb250ZW50LWFjdGlvbnMnPlxyXG4gICAgICAgICAgICAgIHtwcmltYXJ5Lm1hcCgocHJpbWFyeSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICBpZihBcnJheS5pc0FycmF5KHByaW1hcnkuYWN0aW9uKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDxEcm9wZG93biBpY29uUHJvcHM9e3tuYW1lOiBwcmltYXJ5Lmljb259fSBvcGVyYXRpb25MaXN0PXtwcmltYXJ5LmFjdGlvbn0gc2hhcGU9J2ZhYicvPjtcclxuICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPEJ1dHRvbiBoYW5kbGVPbkNsaWNrPXtwcmltYXJ5LmFjdGlvbn0gaWNvbj17cHJpbWFyeS5pY29ufSBsYWJlbD17cHJpbWFyeS5sYWJlbH0gc2hhcGU9J2ZhYicgc3R5bGU9e3tjbGFzc05hbWU6IHByaW1hcnkuY2xhc3NOYW1lfX0gdHlwZT0nYnV0dG9uJy8+XHJcbiAgICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgfSl9XHJcbiAgICAgICAgICAgICAgPERyb3Bkb3duIGljb25Qcm9wcz17e25hbWU6ICdtb3JlX3ZlcnQnfX0gb3BlcmF0aW9uTGlzdD17c2Vjb25kYXJ5fSBzaGFwZT0nZmFiJy8+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgKTtcclxufTtcclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBIZWFkZXJBY3Rpb25zO1xyXG4iXX0=