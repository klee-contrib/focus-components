'use strict';

var _types = require('focus-core/component/types');

var _types2 = _interopRequireDefault(_types);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
    /** @inheritedDocs */
    getDefaultProps: function getDefaultProps() {
        return {
            style: { className: '' }
        };
    },

    /** @inheritedDocs */
    propTypes: {
        style: (0, _types2.default)('object')
    },
    /**
    * Get the className from the style.className props
    * @returns {string} - the className.
    */
    _getStyleClassName: function getStyleClassName() {
        if (this.props.style && this.props.style.className) {
            return this.props.style.className;
        }
        return '';
    }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJtb2R1bGUiLCJleHBvcnRzIiwiZ2V0RGVmYXVsdFByb3BzIiwic3R5bGUiLCJjbGFzc05hbWUiLCJwcm9wVHlwZXMiLCJfZ2V0U3R5bGVDbGFzc05hbWUiLCJnZXRTdHlsZUNsYXNzTmFtZSIsInByb3BzIl0sIm1hcHBpbmdzIjoiOztBQUFBOzs7Ozs7QUFDQUEsT0FBT0MsT0FBUCxHQUFpQjtBQUNiO0FBQ0FDLG1CQUZhLDZCQUVLO0FBQ2QsZUFBTztBQUNIQyxtQkFBTyxFQUFDQyxXQUFXLEVBQVo7QUFESixTQUFQO0FBR0gsS0FOWTs7QUFPYjtBQUNBQyxlQUFXO0FBQ1BGLGVBQU8scUJBQU0sUUFBTjtBQURBLEtBUkU7QUFXYjs7OztBQUlBRyx3QkFBb0IsU0FBU0MsaUJBQVQsR0FBNkI7QUFDN0MsWUFBRyxLQUFLQyxLQUFMLENBQVdMLEtBQVgsSUFBb0IsS0FBS0ssS0FBTCxDQUFXTCxLQUFYLENBQWlCQyxTQUF4QyxFQUFtRDtBQUMvQyxtQkFBTyxLQUFLSSxLQUFMLENBQVdMLEtBQVgsQ0FBaUJDLFNBQXhCO0FBQ0g7QUFDRCxlQUFPLEVBQVA7QUFDSDtBQXBCWSxDQUFqQiIsImZpbGUiOiJpcy1yZWFjdC1jbGFzcy1jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgdHlwZXMgZnJvbSAnZm9jdXMtY29yZS9jb21wb25lbnQvdHlwZXMnO1xyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuICAgIC8qKiBAaW5oZXJpdGVkRG9jcyAqL1xyXG4gICAgZ2V0RGVmYXVsdFByb3BzKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHN0eWxlOiB7Y2xhc3NOYW1lOiAnJ31cclxuICAgICAgICB9O1xyXG4gICAgfSxcclxuICAgIC8qKiBAaW5oZXJpdGVkRG9jcyAqL1xyXG4gICAgcHJvcFR5cGVzOiB7XHJcbiAgICAgICAgc3R5bGU6IHR5cGVzKCdvYmplY3QnKVxyXG4gICAgfSxcclxuICAgIC8qKlxyXG4gICAgKiBHZXQgdGhlIGNsYXNzTmFtZSBmcm9tIHRoZSBzdHlsZS5jbGFzc05hbWUgcHJvcHNcclxuICAgICogQHJldHVybnMge3N0cmluZ30gLSB0aGUgY2xhc3NOYW1lLlxyXG4gICAgKi9cclxuICAgIF9nZXRTdHlsZUNsYXNzTmFtZTogZnVuY3Rpb24gZ2V0U3R5bGVDbGFzc05hbWUoKSB7XHJcbiAgICAgICAgaWYodGhpcy5wcm9wcy5zdHlsZSAmJiB0aGlzLnByb3BzLnN0eWxlLmNsYXNzTmFtZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5zdHlsZS5jbGFzc05hbWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiAnJztcclxuICAgIH1cclxufTtcclxuIl19