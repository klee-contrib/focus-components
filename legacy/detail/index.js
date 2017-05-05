'use strict';

var _builder = require('focus-core/component/builder');

var _builder2 = _interopRequireDefault(_builder);

var _types = require('focus-core/component/types');

var _types2 = _interopRequireDefault(_types);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var React = require('react');

//var i18nMixin = require('../i18n').mixin;
var Scrollspy = require('../scrollspy').component;

var stylable = require('../../mixin/stylable');
var DefaultBackToTopComponent = require('../button/back-to-top').component;
/**
* Mixin used in order to create a Detail.
* @type {Object}
*/
var detailMixin = {
    mixins: [stylable],
    /** @inheritedDoc */
    getDefaultProps: function getDefaultProps() {
        return {
            /**
            * Activate the presence of the sticky navigation component.
            * @type {Boolean}
            */
            hasNavigation: true,
            hasBackToTop: true,
            BackToTopComponent: DefaultBackToTopComponent,
            navigationAffixOffset: 80
        };
    },

    /** @inheritedDoc */
    propTypes: {
        hasNavigation: (0, _types2.default)('bool'),
        hasBackToTop: (0, _types2.default)('bool'),
        BackToTopComponent: (0, _types2.default)(['func', 'object']),
        navigationAffixOffset: (0, _types2.default)('number')
    },
    /**
    * Returns detail content.
    * @return {object} detail content
    */
    _detailContent: function _detailContent() {
        return React.createElement(
            'div',
            { 'data-focus': 'detail-content' },
            this.props.children
        );
    },
    componentWillMount: function componentWillMount() {
        console.warn('FocusComponents 0.7.0: this component is deprecated, please use FocusComponents.components.ScrollspyContainer');
    },

    /** @inheritedDoc */
    render: function render() {
        var _props = this.props,
            hasNavigation = _props.hasNavigation,
            hasBackToTop = _props.hasBackToTop,
            BackToTopComponent = _props.BackToTopComponent,
            navigationAffixOffset = _props.navigationAffixOffset;

        return React.createElement(
            'div',
            { className: '' + this._getStyleClassName(), 'data-focus': 'detail' },
            hasNavigation ? React.createElement(
                Scrollspy,
                { affixOffset: navigationAffixOffset },
                this._detailContent()
            ) : this._detailContent(),
            hasBackToTop && React.createElement(BackToTopComponent, null)
        );
    }
};

module.exports = (0, _builder2.default)(detailMixin);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJSZWFjdCIsInJlcXVpcmUiLCJTY3JvbGxzcHkiLCJjb21wb25lbnQiLCJzdHlsYWJsZSIsIkRlZmF1bHRCYWNrVG9Ub3BDb21wb25lbnQiLCJkZXRhaWxNaXhpbiIsIm1peGlucyIsImdldERlZmF1bHRQcm9wcyIsImhhc05hdmlnYXRpb24iLCJoYXNCYWNrVG9Ub3AiLCJCYWNrVG9Ub3BDb21wb25lbnQiLCJuYXZpZ2F0aW9uQWZmaXhPZmZzZXQiLCJwcm9wVHlwZXMiLCJfZGV0YWlsQ29udGVudCIsInByb3BzIiwiY2hpbGRyZW4iLCJjb21wb25lbnRXaWxsTW91bnQiLCJjb25zb2xlIiwid2FybiIsInJlbmRlciIsIl9nZXRTdHlsZUNsYXNzTmFtZSIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7O0FBQ0E7Ozs7QUFHQTs7Ozs7O0FBSkEsSUFBTUEsUUFBUUMsUUFBUSxPQUFSLENBQWQ7O0FBRUE7QUFDQSxJQUFNQyxZQUFZRCxRQUFRLGNBQVIsRUFBd0JFLFNBQTFDOztBQUVBLElBQU1DLFdBQVdILFFBQVEsc0JBQVIsQ0FBakI7QUFDQSxJQUFNSSw0QkFBNEJKLFFBQVEsdUJBQVIsRUFBaUNFLFNBQW5FO0FBQ0E7Ozs7QUFJQSxJQUFJRyxjQUFjO0FBQ2RDLFlBQVEsQ0FBQ0gsUUFBRCxDQURNO0FBRWQ7QUFDQUksbUJBSGMsNkJBR0k7QUFDZCxlQUFPO0FBQ0g7Ozs7QUFJQUMsMkJBQWUsSUFMWjtBQU1IQywwQkFBYyxJQU5YO0FBT0hDLGdDQUFvQk4seUJBUGpCO0FBUUhPLG1DQUF1QjtBQVJwQixTQUFQO0FBVUgsS0FkYTs7QUFlZDtBQUNBQyxlQUFXO0FBQ1BKLHVCQUFlLHFCQUFLLE1BQUwsQ0FEUjtBQUVQQyxzQkFBYyxxQkFBSyxNQUFMLENBRlA7QUFHUEMsNEJBQW9CLHFCQUFLLENBQUMsTUFBRCxFQUFTLFFBQVQsQ0FBTCxDQUhiO0FBSVBDLCtCQUF1QixxQkFBSyxRQUFMO0FBSmhCLEtBaEJHO0FBc0JkOzs7O0FBSUFFLGtCQTFCYyw0QkEwQkc7QUFDYixlQUNJO0FBQUE7QUFBQSxjQUFLLGNBQVcsZ0JBQWhCO0FBQ0MsaUJBQUtDLEtBQUwsQ0FBV0M7QUFEWixTQURKO0FBS0gsS0FoQ2E7QUFpQ2RDLHNCQWpDYyxnQ0FpQ087QUFDakJDLGdCQUFRQyxJQUFSLENBQWEsK0dBQWI7QUFDSCxLQW5DYTs7QUFvQ2Q7QUFDQUMsVUFyQ2Msb0JBcUNMO0FBQUEscUJBQzRFLEtBQUtMLEtBRGpGO0FBQUEsWUFDRU4sYUFERixVQUNFQSxhQURGO0FBQUEsWUFDaUJDLFlBRGpCLFVBQ2lCQSxZQURqQjtBQUFBLFlBQytCQyxrQkFEL0IsVUFDK0JBLGtCQUQvQjtBQUFBLFlBQ21EQyxxQkFEbkQsVUFDbURBLHFCQURuRDs7QUFFTCxlQUNJO0FBQUE7QUFBQSxjQUFLLGdCQUFjLEtBQUtTLGtCQUFMLEVBQW5CLEVBQWdELGNBQVcsUUFBM0Q7QUFDQ1osNEJBQWdCO0FBQUMseUJBQUQ7QUFBQSxrQkFBVyxhQUFhRyxxQkFBeEI7QUFBZ0QscUJBQUtFLGNBQUw7QUFBaEQsYUFBaEIsR0FBcUcsS0FBS0EsY0FBTCxFQUR0RztBQUVDSiw0QkFBZ0Isb0JBQUMsa0JBQUQ7QUFGakIsU0FESjtBQU1IO0FBN0NhLENBQWxCOztBQWdEQVksT0FBT0MsT0FBUCxHQUFpQix1QkFBUWpCLFdBQVIsQ0FBakIiLCJmaWxlIjoiaXMtcmVhY3QtY2xhc3MtY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xyXG5pbXBvcnQgYnVpbGRlciBmcm9tICdmb2N1cy1jb3JlL2NvbXBvbmVudC9idWlsZGVyJztcclxuLy92YXIgaTE4bk1peGluID0gcmVxdWlyZSgnLi4vaTE4bicpLm1peGluO1xyXG5jb25zdCBTY3JvbGxzcHkgPSByZXF1aXJlKCcuLi9zY3JvbGxzcHknKS5jb21wb25lbnQ7XHJcbmltcG9ydCB0eXBlIGZyb20gJ2ZvY3VzLWNvcmUvY29tcG9uZW50L3R5cGVzJztcclxuY29uc3Qgc3R5bGFibGUgPSByZXF1aXJlKCcuLi8uLi9taXhpbi9zdHlsYWJsZScpO1xyXG5jb25zdCBEZWZhdWx0QmFja1RvVG9wQ29tcG9uZW50ID0gcmVxdWlyZSgnLi4vYnV0dG9uL2JhY2stdG8tdG9wJykuY29tcG9uZW50O1xyXG4vKipcclxuKiBNaXhpbiB1c2VkIGluIG9yZGVyIHRvIGNyZWF0ZSBhIERldGFpbC5cclxuKiBAdHlwZSB7T2JqZWN0fVxyXG4qL1xyXG52YXIgZGV0YWlsTWl4aW4gPSB7XHJcbiAgICBtaXhpbnM6IFtzdHlsYWJsZV0sXHJcbiAgICAvKiogQGluaGVyaXRlZERvYyAqL1xyXG4gICAgZ2V0RGVmYXVsdFByb3BzKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAqIEFjdGl2YXRlIHRoZSBwcmVzZW5jZSBvZiB0aGUgc3RpY2t5IG5hdmlnYXRpb24gY29tcG9uZW50LlxyXG4gICAgICAgICAgICAqIEB0eXBlIHtCb29sZWFufVxyXG4gICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICBoYXNOYXZpZ2F0aW9uOiB0cnVlLFxyXG4gICAgICAgICAgICBoYXNCYWNrVG9Ub3A6IHRydWUsXHJcbiAgICAgICAgICAgIEJhY2tUb1RvcENvbXBvbmVudDogRGVmYXVsdEJhY2tUb1RvcENvbXBvbmVudCxcclxuICAgICAgICAgICAgbmF2aWdhdGlvbkFmZml4T2Zmc2V0OiA4MFxyXG4gICAgICAgIH07XHJcbiAgICB9LFxyXG4gICAgLyoqIEBpbmhlcml0ZWREb2MgKi9cclxuICAgIHByb3BUeXBlczoge1xyXG4gICAgICAgIGhhc05hdmlnYXRpb246IHR5cGUoJ2Jvb2wnKSxcclxuICAgICAgICBoYXNCYWNrVG9Ub3A6IHR5cGUoJ2Jvb2wnKSxcclxuICAgICAgICBCYWNrVG9Ub3BDb21wb25lbnQ6IHR5cGUoWydmdW5jJywgJ29iamVjdCddKSxcclxuICAgICAgICBuYXZpZ2F0aW9uQWZmaXhPZmZzZXQ6IHR5cGUoJ251bWJlcicpXHJcbiAgICB9LFxyXG4gICAgLyoqXHJcbiAgICAqIFJldHVybnMgZGV0YWlsIGNvbnRlbnQuXHJcbiAgICAqIEByZXR1cm4ge29iamVjdH0gZGV0YWlsIGNvbnRlbnRcclxuICAgICovXHJcbiAgICBfZGV0YWlsQ29udGVudCgpIHtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2IGRhdGEtZm9jdXM9J2RldGFpbC1jb250ZW50Jz5cclxuICAgICAgICAgICAge3RoaXMucHJvcHMuY2hpbGRyZW59XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICk7XHJcbiAgICB9LFxyXG4gICAgY29tcG9uZW50V2lsbE1vdW50KCkge1xyXG4gICAgICAgIGNvbnNvbGUud2FybignRm9jdXNDb21wb25lbnRzIDAuNy4wOiB0aGlzIGNvbXBvbmVudCBpcyBkZXByZWNhdGVkLCBwbGVhc2UgdXNlIEZvY3VzQ29tcG9uZW50cy5jb21wb25lbnRzLlNjcm9sbHNweUNvbnRhaW5lcicpO1xyXG4gICAgfSxcclxuICAgIC8qKiBAaW5oZXJpdGVkRG9jICovXHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgY29uc3Qge2hhc05hdmlnYXRpb24sIGhhc0JhY2tUb1RvcCwgQmFja1RvVG9wQ29tcG9uZW50LCBuYXZpZ2F0aW9uQWZmaXhPZmZzZXR9ID0gdGhpcy5wcm9wcztcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17YCR7dGhpcy5fZ2V0U3R5bGVDbGFzc05hbWUoKX1gfSBkYXRhLWZvY3VzPSdkZXRhaWwnPlxyXG4gICAgICAgICAgICB7aGFzTmF2aWdhdGlvbiA/IDxTY3JvbGxzcHkgYWZmaXhPZmZzZXQ9e25hdmlnYXRpb25BZmZpeE9mZnNldH0+e3RoaXMuX2RldGFpbENvbnRlbnQoKX08L1Njcm9sbHNweT4gOiB0aGlzLl9kZXRhaWxDb250ZW50KCl9XHJcbiAgICAgICAgICAgIHtoYXNCYWNrVG9Ub3AgJiYgPEJhY2tUb1RvcENvbXBvbmVudC8+fVxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBidWlsZGVyKGRldGFpbE1peGluKTtcclxuIl19