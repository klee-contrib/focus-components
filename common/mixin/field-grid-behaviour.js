'use strict';

var _types = require('focus-core/component/types');

var _types2 = _interopRequireDefault(_types);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var React = require('react');
var PropTypes = React.PropTypes;


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

var fieldGridBehaviourMixin = {
    /** @inheritdoc */
    getDefaultProps: function getDefaultProps() {
        return {
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
        };
    },

    /** @inheritdoc */
    propTypes: {
        contentCellPosition: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        labelCellPosition: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        labelSize: PropTypes.number,
        contentSize: PropTypes.number,
        labelOffset: PropTypes.number,
        contentOffset: PropTypes.number
    },
    _buildGridClassName: function _buildGridClassName(prop, suffix) {
        return prop ? ' mdl-cell--' + prop + (suffix ? suffix : '') : '';
    },
    _getCellGridClassName: function _getCellGridClassName(position, size, offset) {
        var cellPosition = this._buildGridClassName(position);
        var cellSize = this._buildGridClassName(size, '-col');
        var cellOffset = this._buildGridClassName(offset, '-offset');

        return CELL + cellPosition + cellSize + cellOffset;
    },
    /**
    * Get the label gridClass.
    * @returns {string} - The label gridSize.
    */
    _getLabelGridClassName: function _getLabelGridClassName() {
        return this._getCellGridClassName(this.props.labelCellPosition, this.props.labelSize, this.props.labelOffset);
    },
    /**
    * Get the content class Name.
    * @returns {string} - The content gridSize.
    */
    _getContentGridClassName: function _getContentGridClassName() {
        return this._getCellGridClassName(this.props.contentCellPosition, this.props.contentSize || GRID_SIZE - this.props.labelSize, this.props.contentOffset);
    },
    /**
    * Get the content offset className.
    * @returns {string} - The label gridSize.
    */
    _getContentOffsetClassName: function _getContentOffsetClassName() {
        return CELL + ' mdl-cell--' + this.props.labelSize + '-offset';
    }
};
module.exports = fieldGridBehaviourMixin;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJSZWFjdCIsInJlcXVpcmUiLCJQcm9wVHlwZXMiLCJHUklEX1NJWkUiLCJDRUxMIiwiZmllbGRHcmlkQmVoYXZpb3VyTWl4aW4iLCJnZXREZWZhdWx0UHJvcHMiLCJsYWJlbFNpemUiLCJsYWJlbENlbGxQb3NpdGlvbiIsImNvbnRlbnRDZWxsUG9zaXRpb24iLCJwcm9wVHlwZXMiLCJvbmVPZlR5cGUiLCJudW1iZXIiLCJzdHJpbmciLCJjb250ZW50U2l6ZSIsImxhYmVsT2Zmc2V0IiwiY29udGVudE9mZnNldCIsIl9idWlsZEdyaWRDbGFzc05hbWUiLCJwcm9wIiwic3VmZml4IiwiX2dldENlbGxHcmlkQ2xhc3NOYW1lIiwicG9zaXRpb24iLCJzaXplIiwib2Zmc2V0IiwiY2VsbFBvc2l0aW9uIiwiY2VsbFNpemUiLCJjZWxsT2Zmc2V0IiwiX2dldExhYmVsR3JpZENsYXNzTmFtZSIsInByb3BzIiwiX2dldENvbnRlbnRHcmlkQ2xhc3NOYW1lIiwiX2dldENvbnRlbnRPZmZzZXRDbGFzc05hbWUiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOztBQUFBOzs7Ozs7QUFDQSxJQUFNQSxRQUFRQyxRQUFRLE9BQVIsQ0FBZDtJQUNPQyxTLEdBQWFGLEssQ0FBYkUsUzs7O0FBR1AsSUFBTUMsWUFBWSxFQUFsQjtBQUFBLElBQXNCQyxPQUFPLFVBQTdCO0FBQ0E7Ozs7Ozs7Ozs7OztBQVlBLElBQU1DLDBCQUEwQjtBQUM1QjtBQUNBQyxtQkFGNEIsNkJBRVY7QUFDZCxlQUFPO0FBQ0g7Ozs7QUFJQUMsdUJBQVcsQ0FMUjtBQU1IOzs7OztBQUtBQywrQkFBbUIsS0FYaEI7QUFZSDs7Ozs7QUFLQUMsaUNBQXFCO0FBakJsQixTQUFQO0FBbUJILEtBdEIyQjs7QUF1QjVCO0FBQ0FDLGVBQVc7QUFDUEQsNkJBQXFCUCxVQUFVUyxTQUFWLENBQW9CLENBQUNULFVBQVVVLE1BQVgsRUFBbUJWLFVBQVVXLE1BQTdCLENBQXBCLENBRGQ7QUFFUEwsMkJBQW1CTixVQUFVUyxTQUFWLENBQW9CLENBQUNULFVBQVVVLE1BQVgsRUFBbUJWLFVBQVVXLE1BQTdCLENBQXBCLENBRlo7QUFHUE4sbUJBQVdMLFVBQVVVLE1BSGQ7QUFJUEUscUJBQWFaLFVBQVVVLE1BSmhCO0FBS1BHLHFCQUFhYixVQUFVVSxNQUxoQjtBQU1QSSx1QkFBZWQsVUFBVVU7QUFObEIsS0F4QmlCO0FBZ0M1QksseUJBQXNCLFNBQVNBLG1CQUFULENBQThCQyxJQUE5QixFQUFvQ0MsTUFBcEMsRUFBNEM7QUFDcEMsZUFBT0QsT0FBTSxnQkFBZ0JBLElBQWhCLElBQXdCQyxTQUFTQSxNQUFULEdBQWtCLEVBQTFDLENBQU4sR0FBcUQsRUFBNUQ7QUFDN0IsS0FsQzJCO0FBbUM1QkMsMkJBQXVCLFNBQVNBLHFCQUFULENBQStCQyxRQUEvQixFQUF3Q0MsSUFBeEMsRUFBOENDLE1BQTlDLEVBQXNEO0FBQy9DLFlBQU1DLGVBQWUsS0FBS1AsbUJBQUwsQ0FBeUJJLFFBQXpCLENBQXJCO0FBQ0EsWUFBTUksV0FBVyxLQUFLUixtQkFBTCxDQUF5QkssSUFBekIsRUFBK0IsTUFBL0IsQ0FBakI7QUFDQSxZQUFNSSxhQUFhLEtBQUtULG1CQUFMLENBQXlCTSxNQUF6QixFQUFpQyxTQUFqQyxDQUFuQjs7QUFFMUIsZUFBT25CLE9BQU9vQixZQUFQLEdBQXNCQyxRQUF0QixHQUFpQ0MsVUFBeEM7QUFDSCxLQXpDMkI7QUEwQzVCOzs7O0FBSUFDLDRCQUF3QixTQUFTQSxzQkFBVCxHQUFrQztBQUM1QixlQUFPLEtBQUtQLHFCQUFMLENBQTJCLEtBQUtRLEtBQUwsQ0FBV3BCLGlCQUF0QyxFQUF5RCxLQUFLb0IsS0FBTCxDQUFXckIsU0FBcEUsRUFBK0UsS0FBS3FCLEtBQUwsQ0FBV2IsV0FBMUYsQ0FBUDtBQUNoQixLQWhEYztBQWlENUI7Ozs7QUFJQWMsOEJBQTBCLFNBQVNBLHdCQUFULEdBQW9DO0FBQ2hDLGVBQU8sS0FBS1QscUJBQUwsQ0FBMkIsS0FBS1EsS0FBTCxDQUFXbkIsbUJBQXRDLEVBQTRELEtBQUttQixLQUFMLENBQVdkLFdBQVgsSUFBMkJYLFlBQVksS0FBS3lCLEtBQUwsQ0FBV3JCLFNBQTlHLEVBQTJILEtBQUtxQixLQUFMLENBQVdaLGFBQXRJLENBQVA7QUFDN0IsS0F2RDJCO0FBd0Q1Qjs7OztBQUlBYyw4QkE1RDRCLHdDQTREQztBQUN6QixlQUFVMUIsSUFBVixtQkFBNEIsS0FBS3dCLEtBQUwsQ0FBV3JCLFNBQXZDO0FBQ0g7QUE5RDJCLENBQWhDO0FBZ0VBd0IsT0FBT0MsT0FBUCxHQUFpQjNCLHVCQUFqQiIsImZpbGUiOiJpcy1yZWFjdC1jbGFzcy1jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgdHlwZXMgZnJvbSAnZm9jdXMtY29yZS9jb21wb25lbnQvdHlwZXMnO1xyXG5jb25zdCBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XHJcbmNvbnN0IHtQcm9wVHlwZXN9ID0gUmVhY3Q7XHJcblxyXG5cclxuY29uc3QgR1JJRF9TSVpFID0gMTIsIENFTEwgPSAnbWRsLWNlbGwnO1xyXG4vKipcclxuICogQW4gZXhhbXBsZSBvZiB0aGUgbGFiZWwgYW5kIGNvbnRlbnQgc2l6ZSwgYW5kIG9mIGxhYmVsIGFuZCBjb250ZW50IG9mZnNldCwgd2l0aCBmdW5jdGlvbiBmaWVsZEZvclxyXG4gKiBcclxuICogSSB3YW50IHRvIGhhdmUgdGhlIGxhYmVsIG9uIHRoZSBmaXJzdCByb3cgb2YgdGhlIGdyaWQsIHRoZSBmaWVsZCBvbiB0aGUgc2Vjb25kIG9uZSxcclxuICogd2l0aCBhICdwYWRkaW5nJyAob2Zmc2V0KSBvZiBvbmUgY2VsbCBvbiBlYWNoIHJvdy5cclxuICogXHJcbiAqIGNvbnN0IGZpZWxkT3B0aW9ucyA9IHsgbGFiZWxTaXplOiAxMCwgY29udGVudFNpemU6IDEwLCBsYWJlbE9mZnNldDoxLCBjb250ZW50T2Zmc2V0OjEgfTtcclxuICogLi4uXHJcbiAqIHt0aGlzLmZpZWxkRm9yKCdub20nLCBmaWVsZE9wdGlvbnMpfVxyXG4gKiBcclxuICoqL1xyXG4gXHJcbmNvbnN0IGZpZWxkR3JpZEJlaGF2aW91ck1peGluID0ge1xyXG4gICAgLyoqIEBpbmhlcml0ZG9jICovXHJcbiAgICBnZXREZWZhdWx0UHJvcHMoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICogU2l6ZSBvZiB0aGUgbGFiZWwgaW4gdGhlIGdyaWQgc3lzdGVtLlxyXG4gICAgICAgICAgICAqIEB0eXBlIHtOdW1iZXJ9XHJcbiAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgIGxhYmVsU2l6ZTogNCxcclxuICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAqIFBPc2l0aW9uIG9mIHRoZSBsYWJlbCBpbiB0aGUgY2VsbC5cclxuICAgICAgICAgICAgICogUG9zc2libGUgdmFsdWVzOiB0b3AsIG1pZGRsZSwgYm90dG9tXHJcbiAgICAgICAgICAgICAqIEB0eXBlIHtTdHJpbmd9XHJcbiAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICBsYWJlbENlbGxQb3NpdGlvbjogJ3RvcCcsXHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiBQb3NpdGlvbiBvZiB0aGUgY29udGVudCBpbiB0aGUgY2VsbC5cclxuICAgICAgICAgICAgICogUG9zc2libGUgdmFsdWVzOiB0b3AsIG1pZGRsZSwgYm90dG9tXHJcbiAgICAgICAgICAgICAqIEB0eXBlIHtTdHJpbmd9XHJcbiAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICBjb250ZW50Q2VsbFBvc2l0aW9uOiAndG9wJ1xyXG4gICAgICAgIH07XHJcbiAgICB9LFxyXG4gICAgLyoqIEBpbmhlcml0ZG9jICovXHJcbiAgICBwcm9wVHlwZXM6IHtcclxuICAgICAgICBjb250ZW50Q2VsbFBvc2l0aW9uOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMubnVtYmVyLCBQcm9wVHlwZXMuc3RyaW5nXSksXHJcbiAgICAgICAgbGFiZWxDZWxsUG9zaXRpb246IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5udW1iZXIsIFByb3BUeXBlcy5zdHJpbmddKSxcclxuICAgICAgICBsYWJlbFNpemU6IFByb3BUeXBlcy5udW1iZXIsXHJcbiAgICAgICAgY29udGVudFNpemU6IFByb3BUeXBlcy5udW1iZXIsXHJcbiAgICAgICAgbGFiZWxPZmZzZXQ6IFByb3BUeXBlcy5udW1iZXIsXHJcbiAgICAgICAgY29udGVudE9mZnNldDogUHJvcFR5cGVzLm51bWJlclxyXG4gICAgfSxcclxuICAgIF9idWlsZEdyaWRDbGFzc05hbWUgOiBmdW5jdGlvbiBfYnVpbGRHcmlkQ2xhc3NOYW1lIChwcm9wLCBzdWZmaXgpIHtcclxuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHByb3A/KCcgbWRsLWNlbGwtLScgKyBwcm9wICsgKHN1ZmZpeCA/IHN1ZmZpeCA6ICcnKSk6Jyc7XHJcbiAgICB9LFxyXG4gICAgX2dldENlbGxHcmlkQ2xhc3NOYW1lOiBmdW5jdGlvbiBfZ2V0Q2VsbEdyaWRDbGFzc05hbWUocG9zaXRpb24sc2l6ZSwgb2Zmc2V0KSB7XHJcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGNlbGxQb3NpdGlvbiA9IHRoaXMuX2J1aWxkR3JpZENsYXNzTmFtZShwb3NpdGlvbik7XHJcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGNlbGxTaXplID0gdGhpcy5fYnVpbGRHcmlkQ2xhc3NOYW1lKHNpemUsICctY29sJyk7XHJcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGNlbGxPZmZzZXQgPSB0aGlzLl9idWlsZEdyaWRDbGFzc05hbWUob2Zmc2V0LCAnLW9mZnNldCcpO1xyXG5cclxuICAgICAgICByZXR1cm4gQ0VMTCArIGNlbGxQb3NpdGlvbiArIGNlbGxTaXplICsgY2VsbE9mZnNldDtcclxuICAgIH0sXHJcbiAgICAvKipcclxuICAgICogR2V0IHRoZSBsYWJlbCBncmlkQ2xhc3MuXHJcbiAgICAqIEByZXR1cm5zIHtzdHJpbmd9IC0gVGhlIGxhYmVsIGdyaWRTaXplLlxyXG4gICAgKi9cclxuICAgIF9nZXRMYWJlbEdyaWRDbGFzc05hbWU6IGZ1bmN0aW9uIF9nZXRMYWJlbEdyaWRDbGFzc05hbWUoKSB7XHJcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9nZXRDZWxsR3JpZENsYXNzTmFtZSh0aGlzLnByb3BzLmxhYmVsQ2VsbFBvc2l0aW9uLCB0aGlzLnByb3BzLmxhYmVsU2l6ZSwgdGhpcy5wcm9wcy5sYWJlbE9mZnNldCk7XHJcblx0ICAgICAgICAgICAgICAgIH0sXHJcbiAgICAvKipcclxuICAgICogR2V0IHRoZSBjb250ZW50IGNsYXNzIE5hbWUuXHJcbiAgICAqIEByZXR1cm5zIHtzdHJpbmd9IC0gVGhlIGNvbnRlbnQgZ3JpZFNpemUuXHJcbiAgICAqL1xyXG4gICAgX2dldENvbnRlbnRHcmlkQ2xhc3NOYW1lOiBmdW5jdGlvbiBfZ2V0Q29udGVudEdyaWRDbGFzc05hbWUoKSB7XHJcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9nZXRDZWxsR3JpZENsYXNzTmFtZSh0aGlzLnByb3BzLmNvbnRlbnRDZWxsUG9zaXRpb24sICh0aGlzLnByb3BzLmNvbnRlbnRTaXplIHx8IChHUklEX1NJWkUgLSB0aGlzLnByb3BzLmxhYmVsU2l6ZSkpLCB0aGlzLnByb3BzLmNvbnRlbnRPZmZzZXQpO1xyXG4gICAgfSxcclxuICAgIC8qKlxyXG4gICAgKiBHZXQgdGhlIGNvbnRlbnQgb2Zmc2V0IGNsYXNzTmFtZS5cclxuICAgICogQHJldHVybnMge3N0cmluZ30gLSBUaGUgbGFiZWwgZ3JpZFNpemUuXHJcbiAgICAqL1xyXG4gICAgX2dldENvbnRlbnRPZmZzZXRDbGFzc05hbWUoKSB7XHJcbiAgICAgICAgcmV0dXJuIGAke0NFTEx9IG1kbC1jZWxsLS0ke3RoaXMucHJvcHMubGFiZWxTaXplfS1vZmZzZXRgO1xyXG4gICAgfVxyXG59O1xyXG5tb2R1bGUuZXhwb3J0cyA9IGZpZWxkR3JpZEJlaGF2aW91ck1peGluO1xyXG4iXX0=