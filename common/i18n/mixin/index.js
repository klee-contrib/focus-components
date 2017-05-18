'use strict';

var _translation = require('focus-core/translation');

var _translation2 = _interopRequireDefault(_translation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*global window*/
/*todo check the library presence*/
module.exports = {
    /**
     * Compute the translated label.
     * @param key {string}- Key in the dictionnary of translations.
     * @param data {object} - Data to interpole in the translated string.
     * @returns {string} - Translated string.
     */
    i18n: function translate(key, data) {
        return _translation2.default.translate(key, data);
    }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJtb2R1bGUiLCJleHBvcnRzIiwiaTE4biIsInRyYW5zbGF0ZSIsImtleSIsImRhdGEiXSwibWFwcGluZ3MiOiI7O0FBQUE7Ozs7OztBQUVBO0FBQ0E7QUFDQUEsT0FBT0MsT0FBUCxHQUFpQjtBQUNiOzs7Ozs7QUFNQUMsVUFBTSxTQUFTQyxTQUFULENBQW1CQyxHQUFuQixFQUF3QkMsSUFBeEIsRUFBOEI7QUFDaEMsZUFBTyxzQkFBWUYsU0FBWixDQUFzQkMsR0FBdEIsRUFBMkJDLElBQTNCLENBQVA7QUFDSDtBQVRZLENBQWpCIiwiZmlsZSI6ImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB0cmFuc2xhdGlvbiBmcm9tICdmb2N1cy1jb3JlL3RyYW5zbGF0aW9uJ1xyXG5cclxuLypnbG9iYWwgd2luZG93Ki9cclxuLyp0b2RvIGNoZWNrIHRoZSBsaWJyYXJ5IHByZXNlbmNlKi9cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcbiAgICAvKipcclxuICAgICAqIENvbXB1dGUgdGhlIHRyYW5zbGF0ZWQgbGFiZWwuXHJcbiAgICAgKiBAcGFyYW0ga2V5IHtzdHJpbmd9LSBLZXkgaW4gdGhlIGRpY3Rpb25uYXJ5IG9mIHRyYW5zbGF0aW9ucy5cclxuICAgICAqIEBwYXJhbSBkYXRhIHtvYmplY3R9IC0gRGF0YSB0byBpbnRlcnBvbGUgaW4gdGhlIHRyYW5zbGF0ZWQgc3RyaW5nLlxyXG4gICAgICogQHJldHVybnMge3N0cmluZ30gLSBUcmFuc2xhdGVkIHN0cmluZy5cclxuICAgICAqL1xyXG4gICAgaTE4bjogZnVuY3Rpb24gdHJhbnNsYXRlKGtleSwgZGF0YSkge1xyXG4gICAgICAgIHJldHVybiB0cmFuc2xhdGlvbi50cmFuc2xhdGUoa2V5LCBkYXRhKTtcclxuICAgIH1cclxufTtcclxuIl19