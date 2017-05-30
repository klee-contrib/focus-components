'use strict';

var _builder = require('focus-core/component/builder');

var _builder2 = _interopRequireDefault(_builder);

var _types = require('focus-core/component/types');

var _types2 = _interopRequireDefault(_types);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var React = require('react');
var oneOf = React.PropTypes.oneOf;

var i18nBehaviour = require('../../common/i18n/mixin');
var styleBehaviour = require('../../mixin/stylable');
var Title = require('../title').component;

var _require = require('lodash/collection'),
    includes = _require.includes;

/**
* Mixin used in order to create a block.
* @type {Object}
*/


var blockMixin = {
    mixins: [i18nBehaviour, styleBehaviour],

    /** @inheritdoc */
    getDefaultProps: function getDefaultProps() {
        return {
            actionsPosition: 'top'
        };
    },


    /** @inheritedDoc */
    propTypes: {
        actions: (0, _types2.default)('func'),
        actionsPosition: oneOf(['both', 'bottom', 'top']),
        title: (0, _types2.default)('string')
    },
    /**
    * Header of theblock function.
    * @return {[type]} [description]
    */
    heading: function heading() {
        if (this.props.title) {
            return this.i18n(this.props.title);
        }
    },
    componentWillMount: function componentWillMount() {
        console.warn('FocusComponents 0.7.0: this component is deprecated, please use FocusComponents.components.Panel');
    },

    /**
    * Render the a block container and the cild content of the block.
    * @return {DOM} React DOM element
    */
    render: function render() {
        var _props = this.props,
            actions = _props.actions,
            actionsPosition = _props.actionsPosition,
            children = _props.children;

        var shouldDisplayActionsTop = actions && includes(['both', 'top'], actionsPosition);
        var shouldDisplayActionsBottom = actions && includes(['both', 'bottom'], actionsPosition);
        return React.createElement(
            'div',
            { className: 'mdl-card mdl-card--border mdl-shadow--4dp', 'data-focus': 'block' },
            React.createElement(
                'div',
                { className: 'mdl-card__title mdl-card--border', 'data-focus': 'block-title' },
                React.createElement(Title, { label: this.heading() }),
                shouldDisplayActionsTop && React.createElement(
                    'div',
                    { className: 'actions' },
                    actions()
                )
            ),
            React.createElement(
                'div',
                { className: 'mdl-card__supporting-text', 'data-focus': 'block-content' },
                children
            ),
            shouldDisplayActionsBottom && React.createElement(
                'div',
                { className: 'mdl-card__actions mdl-card--border', 'data-focus': 'block-actions' },
                actions()
            )
        );
    }
};

module.exports = (0, _builder2.default)(blockMixin);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJSZWFjdCIsInJlcXVpcmUiLCJvbmVPZiIsIlByb3BUeXBlcyIsImkxOG5CZWhhdmlvdXIiLCJzdHlsZUJlaGF2aW91ciIsIlRpdGxlIiwiY29tcG9uZW50IiwiaW5jbHVkZXMiLCJibG9ja01peGluIiwibWl4aW5zIiwiZ2V0RGVmYXVsdFByb3BzIiwiYWN0aW9uc1Bvc2l0aW9uIiwicHJvcFR5cGVzIiwiYWN0aW9ucyIsInRpdGxlIiwiaGVhZGluZyIsInByb3BzIiwiaTE4biIsImNvbXBvbmVudFdpbGxNb3VudCIsImNvbnNvbGUiLCJ3YXJuIiwicmVuZGVyIiwiY2hpbGRyZW4iLCJzaG91bGREaXNwbGF5QWN0aW9uc1RvcCIsInNob3VsZERpc3BsYXlBY3Rpb25zQm90dG9tIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7QUFFQTs7OztBQUNBOzs7Ozs7QUFIQSxJQUFNQSxRQUFRQyxRQUFRLE9BQVIsQ0FBZDtBQUNBLElBQU1DLFFBQVFGLE1BQU1HLFNBQU4sQ0FBZ0JELEtBQTlCOztBQUdBLElBQU1FLGdCQUFnQkgsUUFBUSx5QkFBUixDQUF0QjtBQUNBLElBQU1JLGlCQUFpQkosUUFBUSxzQkFBUixDQUF2QjtBQUNBLElBQU1LLFFBQVFMLFFBQVEsVUFBUixFQUFvQk0sU0FBbEM7O2VBQ21CTixRQUFRLG1CQUFSLEM7SUFBWk8sUSxZQUFBQSxROztBQUVQOzs7Ozs7QUFJQSxJQUFNQyxhQUFhO0FBQ2ZDLFlBQVEsQ0FBQ04sYUFBRCxFQUFnQkMsY0FBaEIsQ0FETzs7QUFHZjtBQUNBTSxtQkFKZSw2QkFJRztBQUNkLGVBQU87QUFDSEMsNkJBQWlCO0FBRGQsU0FBUDtBQUdILEtBUmM7OztBQVVmO0FBQ0FDLGVBQVc7QUFDUEMsaUJBQVMscUJBQU0sTUFBTixDQURGO0FBRVBGLHlCQUFpQlYsTUFBTSxDQUFDLE1BQUQsRUFBUyxRQUFULEVBQW1CLEtBQW5CLENBQU4sQ0FGVjtBQUdQYSxlQUFPLHFCQUFNLFFBQU47QUFIQSxLQVhJO0FBZ0JmOzs7O0FBSUFDLFdBcEJlLHFCQW9CTDtBQUNOLFlBQUcsS0FBS0MsS0FBTCxDQUFXRixLQUFkLEVBQXFCO0FBQ2pCLG1CQUFPLEtBQUtHLElBQUwsQ0FBVSxLQUFLRCxLQUFMLENBQVdGLEtBQXJCLENBQVA7QUFDSDtBQUNKLEtBeEJjO0FBeUJmSSxzQkF6QmUsZ0NBeUJNO0FBQ2pCQyxnQkFBUUMsSUFBUixDQUFhLGtHQUFiO0FBQ0gsS0EzQmM7O0FBNEJmOzs7O0FBSUFDLFVBaENlLG9CQWdDTjtBQUFBLHFCQUN3QyxLQUFLTCxLQUQ3QztBQUFBLFlBQ0VILE9BREYsVUFDRUEsT0FERjtBQUFBLFlBQ1dGLGVBRFgsVUFDV0EsZUFEWDtBQUFBLFlBQzRCVyxRQUQ1QixVQUM0QkEsUUFENUI7O0FBRUwsWUFBTUMsMEJBQTBCVixXQUFXTixTQUFTLENBQUMsTUFBRCxFQUFTLEtBQVQsQ0FBVCxFQUEwQkksZUFBMUIsQ0FBM0M7QUFDQSxZQUFNYSw2QkFBNkJYLFdBQVdOLFNBQVMsQ0FBQyxNQUFELEVBQVMsUUFBVCxDQUFULEVBQTZCSSxlQUE3QixDQUE5QztBQUNBLGVBQ0k7QUFBQTtBQUFBLGNBQUssV0FBVSwyQ0FBZixFQUEyRCxjQUFXLE9BQXRFO0FBQ0k7QUFBQTtBQUFBLGtCQUFLLFdBQVUsa0NBQWYsRUFBa0QsY0FBVyxhQUE3RDtBQUNJLG9DQUFDLEtBQUQsSUFBTyxPQUFPLEtBQUtJLE9BQUwsRUFBZCxHQURKO0FBRUtRLDJDQUNHO0FBQUE7QUFBQSxzQkFBSyxXQUFVLFNBQWY7QUFBMEJWO0FBQTFCO0FBSFIsYUFESjtBQU9JO0FBQUE7QUFBQSxrQkFBSyxXQUFVLDJCQUFmLEVBQTJDLGNBQVcsZUFBdEQ7QUFDS1M7QUFETCxhQVBKO0FBVUtFLDBDQUNHO0FBQUE7QUFBQSxrQkFBSyxXQUFVLG9DQUFmLEVBQW9ELGNBQVcsZUFBL0Q7QUFDS1g7QUFETDtBQVhSLFNBREo7QUFrQkg7QUF0RGMsQ0FBbkI7O0FBeURBWSxPQUFPQyxPQUFQLEdBQWlCLHVCQUFRbEIsVUFBUixDQUFqQiIsImZpbGUiOiJpcy1yZWFjdC1jbGFzcy1jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XHJcbmNvbnN0IG9uZU9mID0gUmVhY3QuUHJvcFR5cGVzLm9uZU9mO1xyXG5pbXBvcnQgYnVpbGRlciBmcm9tICdmb2N1cy1jb3JlL2NvbXBvbmVudC9idWlsZGVyJztcclxuaW1wb3J0IHR5cGVzIGZyb20gJ2ZvY3VzLWNvcmUvY29tcG9uZW50L3R5cGVzJztcclxuY29uc3QgaTE4bkJlaGF2aW91ciA9IHJlcXVpcmUoJy4uLy4uL2NvbW1vbi9pMThuL21peGluJyk7XHJcbmNvbnN0IHN0eWxlQmVoYXZpb3VyID0gcmVxdWlyZSgnLi4vLi4vbWl4aW4vc3R5bGFibGUnKTtcclxuY29uc3QgVGl0bGUgPSByZXF1aXJlKCcuLi90aXRsZScpLmNvbXBvbmVudDtcclxuY29uc3Qge2luY2x1ZGVzfSA9IHJlcXVpcmUoJ2xvZGFzaC9jb2xsZWN0aW9uJyk7XHJcblxyXG4vKipcclxuKiBNaXhpbiB1c2VkIGluIG9yZGVyIHRvIGNyZWF0ZSBhIGJsb2NrLlxyXG4qIEB0eXBlIHtPYmplY3R9XHJcbiovXHJcbmNvbnN0IGJsb2NrTWl4aW4gPSB7XHJcbiAgICBtaXhpbnM6IFtpMThuQmVoYXZpb3VyLCBzdHlsZUJlaGF2aW91cl0sXHJcblxyXG4gICAgLyoqIEBpbmhlcml0ZG9jICovXHJcbiAgICBnZXREZWZhdWx0UHJvcHMoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgYWN0aW9uc1Bvc2l0aW9uOiAndG9wJ1xyXG4gICAgICAgIH07XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKiBAaW5oZXJpdGVkRG9jICovXHJcbiAgICBwcm9wVHlwZXM6IHtcclxuICAgICAgICBhY3Rpb25zOiB0eXBlcygnZnVuYycpLFxyXG4gICAgICAgIGFjdGlvbnNQb3NpdGlvbjogb25lT2YoWydib3RoJywgJ2JvdHRvbScsICd0b3AnXSksXHJcbiAgICAgICAgdGl0bGU6IHR5cGVzKCdzdHJpbmcnKVxyXG4gICAgfSxcclxuICAgIC8qKlxyXG4gICAgKiBIZWFkZXIgb2YgdGhlYmxvY2sgZnVuY3Rpb24uXHJcbiAgICAqIEByZXR1cm4ge1t0eXBlXX0gW2Rlc2NyaXB0aW9uXVxyXG4gICAgKi9cclxuICAgIGhlYWRpbmcoKSB7XHJcbiAgICAgICAgaWYodGhpcy5wcm9wcy50aXRsZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5pMThuKHRoaXMucHJvcHMudGl0bGUpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBjb21wb25lbnRXaWxsTW91bnQoKSB7XHJcbiAgICAgICAgY29uc29sZS53YXJuKCdGb2N1c0NvbXBvbmVudHMgMC43LjA6IHRoaXMgY29tcG9uZW50IGlzIGRlcHJlY2F0ZWQsIHBsZWFzZSB1c2UgRm9jdXNDb21wb25lbnRzLmNvbXBvbmVudHMuUGFuZWwnKTtcclxuICAgIH0sXHJcbiAgICAvKipcclxuICAgICogUmVuZGVyIHRoZSBhIGJsb2NrIGNvbnRhaW5lciBhbmQgdGhlIGNpbGQgY29udGVudCBvZiB0aGUgYmxvY2suXHJcbiAgICAqIEByZXR1cm4ge0RPTX0gUmVhY3QgRE9NIGVsZW1lbnRcclxuICAgICovXHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgY29uc3Qge2FjdGlvbnMsIGFjdGlvbnNQb3NpdGlvbiwgY2hpbGRyZW59ID0gdGhpcy5wcm9wcztcclxuICAgICAgICBjb25zdCBzaG91bGREaXNwbGF5QWN0aW9uc1RvcCA9IGFjdGlvbnMgJiYgaW5jbHVkZXMoWydib3RoJywgJ3RvcCddLCBhY3Rpb25zUG9zaXRpb24pO1xyXG4gICAgICAgIGNvbnN0IHNob3VsZERpc3BsYXlBY3Rpb25zQm90dG9tID0gYWN0aW9ucyAmJiBpbmNsdWRlcyhbJ2JvdGgnLCAnYm90dG9tJ10sIGFjdGlvbnNQb3NpdGlvbik7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J21kbC1jYXJkIG1kbC1jYXJkLS1ib3JkZXIgbWRsLXNoYWRvdy0tNGRwJyBkYXRhLWZvY3VzPSdibG9jayc+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nbWRsLWNhcmRfX3RpdGxlIG1kbC1jYXJkLS1ib3JkZXInIGRhdGEtZm9jdXM9J2Jsb2NrLXRpdGxlJz5cclxuICAgICAgICAgICAgICAgICAgICA8VGl0bGUgbGFiZWw9e3RoaXMuaGVhZGluZygpfSAvPlxyXG4gICAgICAgICAgICAgICAgICAgIHtzaG91bGREaXNwbGF5QWN0aW9uc1RvcCAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nYWN0aW9ucyc+e2FjdGlvbnMoKX08L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdtZGwtY2FyZF9fc3VwcG9ydGluZy10ZXh0JyBkYXRhLWZvY3VzPSdibG9jay1jb250ZW50Jz5cclxuICAgICAgICAgICAgICAgICAgICB7Y2hpbGRyZW59XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIHtzaG91bGREaXNwbGF5QWN0aW9uc0JvdHRvbSAmJlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdtZGwtY2FyZF9fYWN0aW9ucyBtZGwtY2FyZC0tYm9yZGVyJyBkYXRhLWZvY3VzPSdibG9jay1hY3Rpb25zJz5cclxuICAgICAgICAgICAgICAgICAgICAgICAge2FjdGlvbnMoKX1cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gYnVpbGRlcihibG9ja01peGluKTtcclxuIl19