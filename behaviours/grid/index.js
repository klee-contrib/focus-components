'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var GRID_SIZE = 12,
    CELL = 'mdl-cell';
/**
* An example of the label and content size, and of label and content offset, with function fieldFor
*
* I want to have the label on the first row of the grid, the field on the second one,
* with a 'padding' (offset) of one cell on each row.
*
* const fieldOptions = { labelSize: 10, contentSize: 10, labelOffset:1, contentOffset:1 };
* ...
* {this.fieldFor('nom', fieldOptions)}
*
**/

var Grid = function Grid(Component) {
    var _class, _temp;

    return _temp = _class = function (_Component) {
        _inherits(GridComponent, _Component);

        function GridComponent() {
            _classCallCheck(this, GridComponent);

            return _possibleConstructorReturn(this, _Component.apply(this, arguments));
        }

        GridComponent.prototype._buildGridClassName = function _buildGridClassName(prop, suffix) {
            return prop ? ' mdl-cell--' + prop + (suffix ? suffix : '') : '';
        };

        /**
        * Get the label gridClass.
        * @returns {string} - The label gridSize.
        */


        GridComponent.prototype._getCellGridClassName = function _getCellGridClassName(position, size, offset) {
            var cellPosition = this._buildGridClassName(position);
            var cellSize = this._buildGridClassName(size, '-col');
            var cellOffset = this._buildGridClassName(offset, '-offset');

            return CELL + cellPosition + cellSize + cellOffset;
        };

        /**
        * Get the content class Name.
        * @returns {string} - The content gridSize.
        */


        GridComponent.prototype._getLabelGridClassName = function _getLabelGridClassName() {
            return this._getCellGridClassName(this.props.labelCellPosition, this.props.labelSize, this.props.labelOffset);
        };

        GridComponent.prototype._getContentGridClassName = function _getContentGridClassName() {
            return this._getCellGridClassName(this.props.contentCellPosition, this.props.contentSize || GRID_SIZE - this.props.labelSize, this.props.contentOffset);
        };

        /**
        * Get the content offset className.
        * @returns {string} - The label gridSize.
        */


        GridComponent.prototype._getContentOffsetClassName = function _getContentOffsetClassName() {
            return CELL + ' mdl-cell--' + this.props.labelSize + '-offset';
        };

        return GridComponent;
    }(Component), _class.defaultProps = {
        /**
        * Size of the label in the grid system.
        * @type {Number}
        */
        labelSize: 4,
        /**
        * POsition of the label in the cell.
        * Possible values: top, middle, bottom
        * @type {String}
        */
        labelCellPosition: 'top',
        /**
        * Position of the content in the cell.
        * Possible values: top, middle, bottom
        * @type {String}
        */
        contentCellPosition: 'top'
    }, _class.propTypes = {
        contentCellPosition: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.string]),
        labelCellPosition: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.string]),
        labelSize: _react.PropTypes.number,
        contentSize: _react.PropTypes.number,
        labelOffset: _react.PropTypes.number,
        contentOffset: _react.PropTypes.number
    }, _temp;
};

exports.default = Grid;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJHUklEX1NJWkUiLCJDRUxMIiwiR3JpZCIsIl9idWlsZEdyaWRDbGFzc05hbWUiLCJwcm9wIiwic3VmZml4IiwiX2dldENlbGxHcmlkQ2xhc3NOYW1lIiwicG9zaXRpb24iLCJzaXplIiwib2Zmc2V0IiwiY2VsbFBvc2l0aW9uIiwiY2VsbFNpemUiLCJjZWxsT2Zmc2V0IiwiX2dldExhYmVsR3JpZENsYXNzTmFtZSIsInByb3BzIiwibGFiZWxDZWxsUG9zaXRpb24iLCJsYWJlbFNpemUiLCJsYWJlbE9mZnNldCIsIl9nZXRDb250ZW50R3JpZENsYXNzTmFtZSIsImNvbnRlbnRDZWxsUG9zaXRpb24iLCJjb250ZW50U2l6ZSIsImNvbnRlbnRPZmZzZXQiLCJfZ2V0Q29udGVudE9mZnNldENsYXNzTmFtZSIsIkNvbXBvbmVudCIsImRlZmF1bHRQcm9wcyIsInByb3BUeXBlcyIsIm9uZU9mVHlwZSIsIm51bWJlciIsInN0cmluZyJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7Ozs7O0FBRUEsSUFBTUEsWUFBWSxFQUFsQjtBQUFBLElBQXNCQyxPQUFPLFVBQTdCO0FBQ0E7Ozs7Ozs7Ozs7OztBQWFBLElBQU1DLE9BQU8sU0FBUEEsSUFBTztBQUFBOztBQUFBO0FBQUE7O0FBQUE7QUFBQTs7QUFBQTtBQUFBOztBQUFBLGdDQStCVEMsbUJBL0JTLGdDQStCV0MsSUEvQlgsRUErQmlCQyxNQS9CakIsRUErQnlCO0FBQzlCLG1CQUFPRCxPQUFNLGdCQUFnQkEsSUFBaEIsSUFBd0JDLFNBQVNBLE1BQVQsR0FBa0IsRUFBMUMsQ0FBTixHQUFxRCxFQUE1RDtBQUNILFNBakNROztBQW1DVDs7Ozs7O0FBbkNTLGdDQXVDVEMscUJBdkNTLGtDQXVDYUMsUUF2Q2IsRUF1Q3NCQyxJQXZDdEIsRUF1QzRCQyxNQXZDNUIsRUF1Q29DO0FBQ3pDLGdCQUFNQyxlQUFlLEtBQUtQLG1CQUFMLENBQXlCSSxRQUF6QixDQUFyQjtBQUNBLGdCQUFNSSxXQUFXLEtBQUtSLG1CQUFMLENBQXlCSyxJQUF6QixFQUErQixNQUEvQixDQUFqQjtBQUNBLGdCQUFNSSxhQUFhLEtBQUtULG1CQUFMLENBQXlCTSxNQUF6QixFQUFpQyxTQUFqQyxDQUFuQjs7QUFFQSxtQkFBT1IsT0FBT1MsWUFBUCxHQUFzQkMsUUFBdEIsR0FBaUNDLFVBQXhDO0FBQ0gsU0E3Q1E7O0FBK0NUOzs7Ozs7QUEvQ1MsZ0NBbURUQyxzQkFuRFMscUNBbURnQjtBQUNyQixtQkFBTyxLQUFLUCxxQkFBTCxDQUEyQixLQUFLUSxLQUFMLENBQVdDLGlCQUF0QyxFQUF5RCxLQUFLRCxLQUFMLENBQVdFLFNBQXBFLEVBQStFLEtBQUtGLEtBQUwsQ0FBV0csV0FBMUYsQ0FBUDtBQUNILFNBckRROztBQUFBLGdDQXVEVEMsd0JBdkRTLHVDQXVEa0I7QUFDdkIsbUJBQU8sS0FBS1oscUJBQUwsQ0FBMkIsS0FBS1EsS0FBTCxDQUFXSyxtQkFBdEMsRUFBNEQsS0FBS0wsS0FBTCxDQUFXTSxXQUFYLElBQTJCcEIsWUFBWSxLQUFLYyxLQUFMLENBQVdFLFNBQTlHLEVBQTJILEtBQUtGLEtBQUwsQ0FBV08sYUFBdEksQ0FBUDtBQUNILFNBekRROztBQTJEVDs7Ozs7O0FBM0RTLGdDQStEVEMsMEJBL0RTLHlDQStEb0I7QUFDekIsbUJBQVVyQixJQUFWLG1CQUE0QixLQUFLYSxLQUFMLENBQVdFLFNBQXZDO0FBQ0gsU0FqRVE7O0FBQUE7QUFBQSxNQUF5Q08sU0FBekMsVUFFRkMsWUFGRSxHQUVhO0FBQ2xCOzs7O0FBSUFSLG1CQUFXLENBTE87QUFNbEI7Ozs7O0FBS0FELDJCQUFtQixLQVhEO0FBWWxCOzs7OztBQUtBSSw2QkFBcUI7QUFqQkgsS0FGYixTQXNCRk0sU0F0QkUsR0FzQlU7QUFDZk4sNkJBQXFCLGlCQUFVTyxTQUFWLENBQW9CLENBQUMsaUJBQVVDLE1BQVgsRUFBbUIsaUJBQVVDLE1BQTdCLENBQXBCLENBRE47QUFFZmIsMkJBQW1CLGlCQUFVVyxTQUFWLENBQW9CLENBQUMsaUJBQVVDLE1BQVgsRUFBbUIsaUJBQVVDLE1BQTdCLENBQXBCLENBRko7QUFHZlosbUJBQVcsaUJBQVVXLE1BSE47QUFJZlAscUJBQWEsaUJBQVVPLE1BSlI7QUFLZlYscUJBQWEsaUJBQVVVLE1BTFI7QUFNZk4sdUJBQWUsaUJBQVVNO0FBTlYsS0F0QlY7QUFBQSxDQUFiOztrQkFvRWV6QixJIiwiZmlsZSI6ImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge1Byb3BUeXBlc30gZnJvbSAncmVhY3QnO1xyXG5cclxuY29uc3QgR1JJRF9TSVpFID0gMTIsIENFTEwgPSAnbWRsLWNlbGwnO1xyXG4vKipcclxuKiBBbiBleGFtcGxlIG9mIHRoZSBsYWJlbCBhbmQgY29udGVudCBzaXplLCBhbmQgb2YgbGFiZWwgYW5kIGNvbnRlbnQgb2Zmc2V0LCB3aXRoIGZ1bmN0aW9uIGZpZWxkRm9yXHJcbipcclxuKiBJIHdhbnQgdG8gaGF2ZSB0aGUgbGFiZWwgb24gdGhlIGZpcnN0IHJvdyBvZiB0aGUgZ3JpZCwgdGhlIGZpZWxkIG9uIHRoZSBzZWNvbmQgb25lLFxyXG4qIHdpdGggYSAncGFkZGluZycgKG9mZnNldCkgb2Ygb25lIGNlbGwgb24gZWFjaCByb3cuXHJcbipcclxuKiBjb25zdCBmaWVsZE9wdGlvbnMgPSB7IGxhYmVsU2l6ZTogMTAsIGNvbnRlbnRTaXplOiAxMCwgbGFiZWxPZmZzZXQ6MSwgY29udGVudE9mZnNldDoxIH07XHJcbiogLi4uXHJcbioge3RoaXMuZmllbGRGb3IoJ25vbScsIGZpZWxkT3B0aW9ucyl9XHJcbipcclxuKiovXHJcblxyXG5cclxuY29uc3QgR3JpZCA9IENvbXBvbmVudCA9PiBjbGFzcyBHcmlkQ29tcG9uZW50IGV4dGVuZHMgQ29tcG9uZW50IHtcclxuXHJcbiAgICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICogU2l6ZSBvZiB0aGUgbGFiZWwgaW4gdGhlIGdyaWQgc3lzdGVtLlxyXG4gICAgICAgICogQHR5cGUge051bWJlcn1cclxuICAgICAgICAqL1xyXG4gICAgICAgIGxhYmVsU2l6ZTogNCxcclxuICAgICAgICAvKipcclxuICAgICAgICAqIFBPc2l0aW9uIG9mIHRoZSBsYWJlbCBpbiB0aGUgY2VsbC5cclxuICAgICAgICAqIFBvc3NpYmxlIHZhbHVlczogdG9wLCBtaWRkbGUsIGJvdHRvbVxyXG4gICAgICAgICogQHR5cGUge1N0cmluZ31cclxuICAgICAgICAqL1xyXG4gICAgICAgIGxhYmVsQ2VsbFBvc2l0aW9uOiAndG9wJyxcclxuICAgICAgICAvKipcclxuICAgICAgICAqIFBvc2l0aW9uIG9mIHRoZSBjb250ZW50IGluIHRoZSBjZWxsLlxyXG4gICAgICAgICogUG9zc2libGUgdmFsdWVzOiB0b3AsIG1pZGRsZSwgYm90dG9tXHJcbiAgICAgICAgKiBAdHlwZSB7U3RyaW5nfVxyXG4gICAgICAgICovXHJcbiAgICAgICAgY29udGVudENlbGxQb3NpdGlvbjogJ3RvcCdcclxuICAgIH07XHJcblxyXG4gICAgc3RhdGljIHByb3BUeXBlcyA9IHtcclxuICAgICAgICBjb250ZW50Q2VsbFBvc2l0aW9uOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMubnVtYmVyLCBQcm9wVHlwZXMuc3RyaW5nXSksXHJcbiAgICAgICAgbGFiZWxDZWxsUG9zaXRpb246IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5udW1iZXIsIFByb3BUeXBlcy5zdHJpbmddKSxcclxuICAgICAgICBsYWJlbFNpemU6IFByb3BUeXBlcy5udW1iZXIsXHJcbiAgICAgICAgY29udGVudFNpemU6IFByb3BUeXBlcy5udW1iZXIsXHJcbiAgICAgICAgbGFiZWxPZmZzZXQ6IFByb3BUeXBlcy5udW1iZXIsXHJcbiAgICAgICAgY29udGVudE9mZnNldDogUHJvcFR5cGVzLm51bWJlclxyXG4gICAgfTtcclxuXHJcbiAgICBfYnVpbGRHcmlkQ2xhc3NOYW1lKHByb3AsIHN1ZmZpeCkge1xyXG4gICAgICAgIHJldHVybiBwcm9wPygnIG1kbC1jZWxsLS0nICsgcHJvcCArIChzdWZmaXggPyBzdWZmaXggOiAnJykpOicnO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgKiBHZXQgdGhlIGxhYmVsIGdyaWRDbGFzcy5cclxuICAgICogQHJldHVybnMge3N0cmluZ30gLSBUaGUgbGFiZWwgZ3JpZFNpemUuXHJcbiAgICAqL1xyXG4gICAgX2dldENlbGxHcmlkQ2xhc3NOYW1lKHBvc2l0aW9uLHNpemUsIG9mZnNldCkge1xyXG4gICAgICAgIGNvbnN0IGNlbGxQb3NpdGlvbiA9IHRoaXMuX2J1aWxkR3JpZENsYXNzTmFtZShwb3NpdGlvbik7XHJcbiAgICAgICAgY29uc3QgY2VsbFNpemUgPSB0aGlzLl9idWlsZEdyaWRDbGFzc05hbWUoc2l6ZSwgJy1jb2wnKTtcclxuICAgICAgICBjb25zdCBjZWxsT2Zmc2V0ID0gdGhpcy5fYnVpbGRHcmlkQ2xhc3NOYW1lKG9mZnNldCwgJy1vZmZzZXQnKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIENFTEwgKyBjZWxsUG9zaXRpb24gKyBjZWxsU2l6ZSArIGNlbGxPZmZzZXQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAqIEdldCB0aGUgY29udGVudCBjbGFzcyBOYW1lLlxyXG4gICAgKiBAcmV0dXJucyB7c3RyaW5nfSAtIFRoZSBjb250ZW50IGdyaWRTaXplLlxyXG4gICAgKi9cclxuICAgIF9nZXRMYWJlbEdyaWRDbGFzc05hbWUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2dldENlbGxHcmlkQ2xhc3NOYW1lKHRoaXMucHJvcHMubGFiZWxDZWxsUG9zaXRpb24sIHRoaXMucHJvcHMubGFiZWxTaXplLCB0aGlzLnByb3BzLmxhYmVsT2Zmc2V0KTtcclxuICAgIH1cclxuXHJcbiAgICBfZ2V0Q29udGVudEdyaWRDbGFzc05hbWUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2dldENlbGxHcmlkQ2xhc3NOYW1lKHRoaXMucHJvcHMuY29udGVudENlbGxQb3NpdGlvbiwgKHRoaXMucHJvcHMuY29udGVudFNpemUgfHwgKEdSSURfU0laRSAtIHRoaXMucHJvcHMubGFiZWxTaXplKSksIHRoaXMucHJvcHMuY29udGVudE9mZnNldCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAqIEdldCB0aGUgY29udGVudCBvZmZzZXQgY2xhc3NOYW1lLlxyXG4gICAgKiBAcmV0dXJucyB7c3RyaW5nfSAtIFRoZSBsYWJlbCBncmlkU2l6ZS5cclxuICAgICovXHJcbiAgICBfZ2V0Q29udGVudE9mZnNldENsYXNzTmFtZSgpIHtcclxuICAgICAgICByZXR1cm4gYCR7Q0VMTH0gbWRsLWNlbGwtLSR7dGhpcy5wcm9wcy5sYWJlbFNpemV9LW9mZnNldGA7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEdyaWQ7XHJcbiJdfQ==