'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _builder = require('focus-core/component/builder');

var _builder2 = _interopRequireDefault(_builder);

var _exception = require('focus-core/exception');

var _number = require('focus-core/definition/formatter/number');

var _number2 = _interopRequireDefault(_number);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FacetData = {
    getDefaultProps: function getDefaultProps() {
        return {
            type: 'text'
        };
    },

    /**
     * Display name.
     */
    displayName: 'FacetData',
    /**
     * Render the component.
     * @returns {XML} Html code of the component.
     */
    render: function render() {
        return _react2.default.createElement(
            'div',
            { 'data-focus': 'facet-data', onClick: this._selectFacetData },
            this._renderData()
        );
    },

    /**
     * Render the data.
     * @returns {string} Html generated code.
     */
    _renderData: function _renderData() {
        if (this.props.type == 'text') {
            return this.props.data.label + ' (' + _number2.default.format(this.props.data.count) + ')';
        }
        throw new _exception.ArgumentInvalidException('Unknown property type : ' + this.props.type);
    },

    /**
     * Facet selection action handler.
     * @returns {function} the facet selection handler.
     */
    _selectFacetData: function _selectFacetData() {
        return this.props.selectHandler(this.props.dataKey, this.props.data);
    }
};

module.exports = (0, _builder2.default)(FacetData);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJGYWNldERhdGEiLCJnZXREZWZhdWx0UHJvcHMiLCJ0eXBlIiwiZGlzcGxheU5hbWUiLCJyZW5kZXIiLCJfc2VsZWN0RmFjZXREYXRhIiwiX3JlbmRlckRhdGEiLCJwcm9wcyIsImRhdGEiLCJsYWJlbCIsImZvcm1hdCIsImNvdW50Iiwic2VsZWN0SGFuZGxlciIsImRhdGFLZXkiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7Ozs7O0FBRUEsSUFBTUEsWUFBWTtBQUNkQyxtQkFEYyw2QkFDSTtBQUNkLGVBQVE7QUFDSkMsa0JBQU07QUFERixTQUFSO0FBR0gsS0FMYTs7QUFNZDs7O0FBR0FDLGlCQUFhLFdBVEM7QUFVZDs7OztBQUlBQyxVQWRjLG9CQWNMO0FBQ0wsZUFDSTtBQUFBO0FBQUEsY0FBSyxjQUFXLFlBQWhCLEVBQTZCLFNBQVMsS0FBS0MsZ0JBQTNDO0FBQ0ssaUJBQUtDLFdBQUw7QUFETCxTQURKO0FBS0gsS0FwQmE7O0FBcUJkOzs7O0FBSUFBLGVBekJjLHlCQXlCQTtBQUNWLFlBQUcsS0FBS0MsS0FBTCxDQUFXTCxJQUFYLElBQW1CLE1BQXRCLEVBQThCO0FBQzFCLG1CQUFVLEtBQUtLLEtBQUwsQ0FBV0MsSUFBWCxDQUFnQkMsS0FBMUIsVUFBb0MsaUJBQWdCQyxNQUFoQixDQUF1QixLQUFLSCxLQUFMLENBQVdDLElBQVgsQ0FBZ0JHLEtBQXZDLENBQXBDO0FBQ0g7QUFDRCxjQUFNLHdDQUE2Qiw2QkFBNkIsS0FBS0osS0FBTCxDQUFXTCxJQUFyRSxDQUFOO0FBQ0gsS0E5QmE7O0FBK0JkOzs7O0FBSUFHLG9CQW5DYyw4QkFtQ0s7QUFDZixlQUFPLEtBQUtFLEtBQUwsQ0FBV0ssYUFBWCxDQUF5QixLQUFLTCxLQUFMLENBQVdNLE9BQXBDLEVBQTZDLEtBQUtOLEtBQUwsQ0FBV0MsSUFBeEQsQ0FBUDtBQUNIO0FBckNhLENBQWxCOztBQXdDQU0sT0FBT0MsT0FBUCxHQUFpQix1QkFBUWYsU0FBUixDQUFqQiIsImZpbGUiOiJpcy1yZWFjdC1jbGFzcy1jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgYnVpbGRlciBmcm9tICdmb2N1cy1jb3JlL2NvbXBvbmVudC9idWlsZGVyJztcclxuaW1wb3J0IHtBcmd1bWVudEludmFsaWRFeGNlcHRpb259IGZyb20gJ2ZvY3VzLWNvcmUvZXhjZXB0aW9uJztcclxuaW1wb3J0IG51bWJlckZvcm1hdHRlciBmcm9tICdmb2N1cy1jb3JlL2RlZmluaXRpb24vZm9ybWF0dGVyL251bWJlcic7XHJcblxyXG5jb25zdCBGYWNldERhdGEgPSB7XHJcbiAgICBnZXREZWZhdWx0UHJvcHMoKSB7XHJcbiAgICAgICAgcmV0dXJuICh7XHJcbiAgICAgICAgICAgIHR5cGU6ICd0ZXh0J1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuICAgIC8qKlxyXG4gICAgICogRGlzcGxheSBuYW1lLlxyXG4gICAgICovXHJcbiAgICBkaXNwbGF5TmFtZTogJ0ZhY2V0RGF0YScsXHJcbiAgICAvKipcclxuICAgICAqIFJlbmRlciB0aGUgY29tcG9uZW50LlxyXG4gICAgICogQHJldHVybnMge1hNTH0gSHRtbCBjb2RlIG9mIHRoZSBjb21wb25lbnQuXHJcbiAgICAgKi9cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICByZXR1cm4oXHJcbiAgICAgICAgICAgIDxkaXYgZGF0YS1mb2N1cz0nZmFjZXQtZGF0YScgb25DbGljaz17dGhpcy5fc2VsZWN0RmFjZXREYXRhfT5cclxuICAgICAgICAgICAgICAgIHt0aGlzLl9yZW5kZXJEYXRhKCl9XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICk7XHJcbiAgICB9LFxyXG4gICAgLyoqXHJcbiAgICAgKiBSZW5kZXIgdGhlIGRhdGEuXHJcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfSBIdG1sIGdlbmVyYXRlZCBjb2RlLlxyXG4gICAgICovXHJcbiAgICBfcmVuZGVyRGF0YSgpIHtcclxuICAgICAgICBpZih0aGlzLnByb3BzLnR5cGUgPT0gJ3RleHQnKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBgJHt0aGlzLnByb3BzLmRhdGEubGFiZWx9ICgke251bWJlckZvcm1hdHRlci5mb3JtYXQodGhpcy5wcm9wcy5kYXRhLmNvdW50KX0pYDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50SW52YWxpZEV4Y2VwdGlvbignVW5rbm93biBwcm9wZXJ0eSB0eXBlIDogJyArIHRoaXMucHJvcHMudHlwZSk7XHJcbiAgICB9LFxyXG4gICAgLyoqXHJcbiAgICAgKiBGYWNldCBzZWxlY3Rpb24gYWN0aW9uIGhhbmRsZXIuXHJcbiAgICAgKiBAcmV0dXJucyB7ZnVuY3Rpb259IHRoZSBmYWNldCBzZWxlY3Rpb24gaGFuZGxlci5cclxuICAgICAqL1xyXG4gICAgX3NlbGVjdEZhY2V0RGF0YSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5zZWxlY3RIYW5kbGVyKHRoaXMucHJvcHMuZGF0YUtleSwgdGhpcy5wcm9wcy5kYXRhKTtcclxuICAgIH1cclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gYnVpbGRlcihGYWNldERhdGEpO1xyXG4iXX0=