'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _reactHtmlAttributes = require('./react-html-attributes');

var _lodash = require('lodash');

/**
 * Filter the incoming props, so only valid props for native HTML elements are passed through.
 * Value prop is also defaulted to empty string, instead of null or undefined.
 * 
 * @param {object} props the incoming props
 * @returns {object} an object with valid <props></props>
 */
function checkProps(props) {
    return (0, _lodash.pairs)(props).reduce(function (acc, _ref) {
        var _ref2 = _slicedToArray(_ref, 2),
            key = _ref2[0],
            value = _ref2[1];

        if (_reactHtmlAttributes.inputHtmlAttributes.indexOf(key) !== -1 || _reactHtmlAttributes.eventHtmlAttributes.indexOf(key) !== -1 || key.startsWith('data-') || key.startsWith('aria-')) {
            acc[key] = key === 'value' && (value === null || value === undefined) ? '' : value;
        }
        return acc;
    }, {});
}

exports.default = checkProps;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJjaGVja1Byb3BzIiwicHJvcHMiLCJyZWR1Y2UiLCJhY2MiLCJrZXkiLCJ2YWx1ZSIsImluZGV4T2YiLCJzdGFydHNXaXRoIiwidW5kZWZpbmVkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOztBQUNBOztBQUVJOzs7Ozs7O0FBT0osU0FBU0EsVUFBVCxDQUFvQkMsS0FBcEIsRUFBMkI7QUFDdkIsV0FBTyxtQkFBTUEsS0FBTixFQUFhQyxNQUFiLENBQW9CLFVBQUNDLEdBQUQsUUFBdUI7QUFBQTtBQUFBLFlBQWhCQyxHQUFnQjtBQUFBLFlBQVhDLEtBQVc7O0FBQzlDLFlBQUkseUNBQW9CQyxPQUFwQixDQUE0QkYsR0FBNUIsTUFBcUMsQ0FBQyxDQUF0QyxJQUEyQyx5Q0FBb0JFLE9BQXBCLENBQTRCRixHQUE1QixNQUFxQyxDQUFDLENBQWpGLElBQXNGQSxJQUFJRyxVQUFKLENBQWUsT0FBZixDQUF0RixJQUFpSEgsSUFBSUcsVUFBSixDQUFlLE9BQWYsQ0FBckgsRUFBOEk7QUFDMUlKLGdCQUFJQyxHQUFKLElBQVlBLFFBQVEsT0FBUixLQUFvQkMsVUFBVSxJQUFWLElBQWtCQSxVQUFVRyxTQUFoRCxDQUFELEdBQStELEVBQS9ELEdBQW9FSCxLQUEvRTtBQUNIO0FBQ0QsZUFBT0YsR0FBUDtBQUNILEtBTE0sRUFLSixFQUxJLENBQVA7QUFNSDs7a0JBRWNILFUiLCJmaWxlIjoiaXMtcmVhY3QtY2xhc3MtY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtpbnB1dEh0bWxBdHRyaWJ1dGVzLCBldmVudEh0bWxBdHRyaWJ1dGVzfSBmcm9tICcuL3JlYWN0LWh0bWwtYXR0cmlidXRlcyc7XHJcbmltcG9ydCB7cGFpcnN9IGZyb20gJ2xvZGFzaCc7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBGaWx0ZXIgdGhlIGluY29taW5nIHByb3BzLCBzbyBvbmx5IHZhbGlkIHByb3BzIGZvciBuYXRpdmUgSFRNTCBlbGVtZW50cyBhcmUgcGFzc2VkIHRocm91Z2guXHJcbiAgICAgKiBWYWx1ZSBwcm9wIGlzIGFsc28gZGVmYXVsdGVkIHRvIGVtcHR5IHN0cmluZywgaW5zdGVhZCBvZiBudWxsIG9yIHVuZGVmaW5lZC5cclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHtvYmplY3R9IHByb3BzIHRoZSBpbmNvbWluZyBwcm9wc1xyXG4gICAgICogQHJldHVybnMge29iamVjdH0gYW4gb2JqZWN0IHdpdGggdmFsaWQgPHByb3BzPjwvcHJvcHM+XHJcbiAgICAgKi9cclxuZnVuY3Rpb24gY2hlY2tQcm9wcyhwcm9wcykge1xyXG4gICAgcmV0dXJuIHBhaXJzKHByb3BzKS5yZWR1Y2UoKGFjYywgW2tleSwgdmFsdWVdKSA9PiB7XHJcbiAgICAgICAgaWYgKGlucHV0SHRtbEF0dHJpYnV0ZXMuaW5kZXhPZihrZXkpICE9PSAtMSB8fCBldmVudEh0bWxBdHRyaWJ1dGVzLmluZGV4T2Yoa2V5KSAhPT0gLTEgfHwga2V5LnN0YXJ0c1dpdGgoJ2RhdGEtJykgfHwga2V5LnN0YXJ0c1dpdGgoJ2FyaWEtJykpIHtcclxuICAgICAgICAgICAgYWNjW2tleV0gPSAoa2V5ID09PSAndmFsdWUnICYmICh2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gdW5kZWZpbmVkKSkgPyAnJyA6IHZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gYWNjO1xyXG4gICAgfSwge30pO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjaGVja1Byb3BzOyAgIl19