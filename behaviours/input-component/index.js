'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.InputBehaviour = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _reactHtmlAttributes = require('./react-html-attributes');

var _lodash = require('lodash');

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var InputBehaviour = exports.InputBehaviour = function InputBehaviour(Component) {
    return function (_Component) {
        _inherits(InputComponent, _Component);

        function InputComponent() {
            _classCallCheck(this, InputComponent);

            return _possibleConstructorReturn(this, _Component.apply(this, arguments));
        }

        /**
         * Filter the incoming props, so only valid props for native HTML elements are passed through.
         * Value prop is also defaulted to empty string, instead of null or undefined.
         * 
         * @param {object} props the incoming props
         * @returns {object} an object with valid <props></props>
         */
        InputComponent.prototype._checkProps = function _checkProps(props) {
            return (0, _lodash.pairs)(props).reduce(function (acc, _ref) {
                var _ref2 = _slicedToArray(_ref, 2),
                    key = _ref2[0],
                    value = _ref2[1];

                if (_reactHtmlAttributes.inputHtmlAttributes.indexOf(key) !== -1 || _reactHtmlAttributes.eventHtmlAttributes.indexOf(key) !== -1) {
                    acc[key] = key === 'value' && (value === null || value === undefined) ? '' : value;
                }
                return acc;
            }, {});
        };

        return InputComponent;
    }(Component);
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJJbnB1dEJlaGF2aW91ciIsIl9jaGVja1Byb3BzIiwicHJvcHMiLCJyZWR1Y2UiLCJhY2MiLCJrZXkiLCJ2YWx1ZSIsImluZGV4T2YiLCJ1bmRlZmluZWQiLCJDb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBOztBQUNBOzs7Ozs7Ozs7O0FBRU8sSUFBTUEsMENBQWlCLFNBQWpCQSxjQUFpQjtBQUFBO0FBQUE7O0FBQUE7QUFBQTs7QUFBQTtBQUFBOztBQUUxQjs7Ozs7OztBQUYwQixpQ0FTMUJDLFdBVDBCLHdCQVNkQyxLQVRjLEVBU1A7QUFDZixtQkFBTyxtQkFBTUEsS0FBTixFQUFhQyxNQUFiLENBQW9CLFVBQUNDLEdBQUQsUUFBdUI7QUFBQTtBQUFBLG9CQUFoQkMsR0FBZ0I7QUFBQSxvQkFBWEMsS0FBVzs7QUFDOUMsb0JBQUkseUNBQW9CQyxPQUFwQixDQUE0QkYsR0FBNUIsTUFBcUMsQ0FBQyxDQUF0QyxJQUEyQyx5Q0FBb0JFLE9BQXBCLENBQTRCRixHQUE1QixNQUFxQyxDQUFDLENBQXJGLEVBQXdGO0FBQ3BGRCx3QkFBSUMsR0FBSixJQUFZQSxRQUFRLE9BQVIsS0FBb0JDLFVBQVUsSUFBVixJQUFrQkEsVUFBVUUsU0FBaEQsQ0FBRCxHQUErRCxFQUEvRCxHQUFvRUYsS0FBL0U7QUFDSDtBQUNELHVCQUFPRixHQUFQO0FBQ0gsYUFMTSxFQUtKLEVBTEksQ0FBUDtBQU1ILFNBaEJ5Qjs7QUFBQTtBQUFBLE1BQTBDSyxTQUExQztBQUFBLENBQXZCIiwiZmlsZSI6ImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7aW5wdXRIdG1sQXR0cmlidXRlcywgZXZlbnRIdG1sQXR0cmlidXRlc30gZnJvbSAnLi9yZWFjdC1odG1sLWF0dHJpYnV0ZXMnO1xyXG5pbXBvcnQge3BhaXJzfSBmcm9tICdsb2Rhc2gnO1xyXG5cclxuZXhwb3J0IGNvbnN0IElucHV0QmVoYXZpb3VyID0gQ29tcG9uZW50ID0+IGNsYXNzIElucHV0Q29tcG9uZW50IGV4dGVuZHMgQ29tcG9uZW50IHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEZpbHRlciB0aGUgaW5jb21pbmcgcHJvcHMsIHNvIG9ubHkgdmFsaWQgcHJvcHMgZm9yIG5hdGl2ZSBIVE1MIGVsZW1lbnRzIGFyZSBwYXNzZWQgdGhyb3VnaC5cclxuICAgICAqIFZhbHVlIHByb3AgaXMgYWxzbyBkZWZhdWx0ZWQgdG8gZW1wdHkgc3RyaW5nLCBpbnN0ZWFkIG9mIG51bGwgb3IgdW5kZWZpbmVkLlxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gcHJvcHMgdGhlIGluY29taW5nIHByb3BzXHJcbiAgICAgKiBAcmV0dXJucyB7b2JqZWN0fSBhbiBvYmplY3Qgd2l0aCB2YWxpZCA8cHJvcHM+PC9wcm9wcz5cclxuICAgICAqL1xyXG4gICAgX2NoZWNrUHJvcHMocHJvcHMpIHtcclxuICAgICAgICByZXR1cm4gcGFpcnMocHJvcHMpLnJlZHVjZSgoYWNjLCBba2V5LCB2YWx1ZV0pID0+IHtcclxuICAgICAgICAgICAgaWYgKGlucHV0SHRtbEF0dHJpYnV0ZXMuaW5kZXhPZihrZXkpICE9PSAtMSB8fCBldmVudEh0bWxBdHRyaWJ1dGVzLmluZGV4T2Yoa2V5KSAhPT0gLTEpIHtcclxuICAgICAgICAgICAgICAgIGFjY1trZXldID0gKGtleSA9PT0gJ3ZhbHVlJyAmJiAodmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09IHVuZGVmaW5lZCkpID8gJycgOiB2YWx1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gYWNjO1xyXG4gICAgICAgIH0sIHt9KTtcclxuICAgIH1cclxufTtcclxuICJdfQ==