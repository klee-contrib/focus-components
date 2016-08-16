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
        var _props = this.props;
        var hasNavigation = _props.hasNavigation;
        var hasBackToTop = _props.hasBackToTop;
        var BackToTopComponent = _props.BackToTopComponent;
        var navigationAffixOffset = _props.navigationAffixOffset;

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBOzs7O0FBR0E7Ozs7OztBQUpBLElBQU0sUUFBUSxRQUFRLE9BQVIsQ0FBZDs7QUFFQTtBQUNBLElBQU0sWUFBWSxRQUFRLGNBQVIsRUFBd0IsU0FBMUM7O0FBRUEsSUFBTSxXQUFXLFFBQVEsc0JBQVIsQ0FBakI7QUFDQSxJQUFNLDRCQUE0QixRQUFRLHVCQUFSLEVBQWlDLFNBQW5FO0FBQ0E7Ozs7QUFJQSxJQUFJLGNBQWM7QUFDZCxZQUFRLENBQUMsUUFBRCxDQURNO0FBRWQ7QUFDQSxtQkFIYyw2QkFHSTtBQUNkLGVBQU87QUFDSDs7OztBQUlBLDJCQUFlLElBTFo7QUFNSCwwQkFBYyxJQU5YO0FBT0gsZ0NBQW9CLHlCQVBqQjtBQVFILG1DQUF1QjtBQVJwQixTQUFQO0FBVUgsS0FkYTs7QUFlZDtBQUNBLGVBQVc7QUFDUCx1QkFBZSxxQkFBSyxNQUFMLENBRFI7QUFFUCxzQkFBYyxxQkFBSyxNQUFMLENBRlA7QUFHUCw0QkFBb0IscUJBQUssQ0FBQyxNQUFELEVBQVMsUUFBVCxDQUFMLENBSGI7QUFJUCwrQkFBdUIscUJBQUssUUFBTDtBQUpoQixLQWhCRztBQXNCZDs7OztBQUlBLGtCQTFCYyw0QkEwQkc7QUFDYixlQUNJO0FBQUE7QUFBQSxjQUFLLGNBQVcsZ0JBQWhCO0FBQ0MsaUJBQUssS0FBTCxDQUFXO0FBRFosU0FESjtBQUtILEtBaENhO0FBaUNkLHNCQWpDYyxnQ0FpQ087QUFDakIsZ0JBQVEsSUFBUixDQUFhLCtHQUFiO0FBQ0gsS0FuQ2E7O0FBb0NkO0FBQ0EsVUFyQ2Msb0JBcUNMO0FBQUEscUJBQzRFLEtBQUssS0FEakY7QUFBQSxZQUNFLGFBREYsVUFDRSxhQURGO0FBQUEsWUFDaUIsWUFEakIsVUFDaUIsWUFEakI7QUFBQSxZQUMrQixrQkFEL0IsVUFDK0Isa0JBRC9CO0FBQUEsWUFDbUQscUJBRG5ELFVBQ21ELHFCQURuRDs7QUFFTCxlQUNJO0FBQUE7QUFBQSxjQUFLLGdCQUFjLEtBQUssa0JBQUwsRUFBbkIsRUFBZ0QsY0FBVyxRQUEzRDtBQUNDLDRCQUFnQjtBQUFDLHlCQUFEO0FBQUEsa0JBQVcsYUFBYSxxQkFBeEI7QUFBZ0QscUJBQUssY0FBTDtBQUFoRCxhQUFoQixHQUFxRyxLQUFLLGNBQUwsRUFEdEc7QUFFQyw0QkFBZ0Isb0JBQUMsa0JBQUQ7QUFGakIsU0FESjtBQU1IO0FBN0NhLENBQWxCOztBQWdEQSxPQUFPLE9BQVAsR0FBaUIsdUJBQVEsV0FBUixDQUFqQiIsImZpbGUiOiJpcy1yZWFjdC1jbGFzcy1jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XHJcbmltcG9ydCBidWlsZGVyIGZyb20gJ2ZvY3VzLWNvcmUvY29tcG9uZW50L2J1aWxkZXInO1xyXG4vL3ZhciBpMThuTWl4aW4gPSByZXF1aXJlKCcuLi9pMThuJykubWl4aW47XHJcbmNvbnN0IFNjcm9sbHNweSA9IHJlcXVpcmUoJy4uL3Njcm9sbHNweScpLmNvbXBvbmVudDtcclxuaW1wb3J0IHR5cGUgZnJvbSAnZm9jdXMtY29yZS9jb21wb25lbnQvdHlwZXMnO1xyXG5jb25zdCBzdHlsYWJsZSA9IHJlcXVpcmUoJy4uLy4uL21peGluL3N0eWxhYmxlJyk7XHJcbmNvbnN0IERlZmF1bHRCYWNrVG9Ub3BDb21wb25lbnQgPSByZXF1aXJlKCcuLi9idXR0b24vYmFjay10by10b3AnKS5jb21wb25lbnQ7XHJcbi8qKlxyXG4qIE1peGluIHVzZWQgaW4gb3JkZXIgdG8gY3JlYXRlIGEgRGV0YWlsLlxyXG4qIEB0eXBlIHtPYmplY3R9XHJcbiovXHJcbnZhciBkZXRhaWxNaXhpbiA9IHtcclxuICAgIG1peGluczogW3N0eWxhYmxlXSxcclxuICAgIC8qKiBAaW5oZXJpdGVkRG9jICovXHJcbiAgICBnZXREZWZhdWx0UHJvcHMoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICogQWN0aXZhdGUgdGhlIHByZXNlbmNlIG9mIHRoZSBzdGlja3kgbmF2aWdhdGlvbiBjb21wb25lbnQuXHJcbiAgICAgICAgICAgICogQHR5cGUge0Jvb2xlYW59XHJcbiAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgIGhhc05hdmlnYXRpb246IHRydWUsXHJcbiAgICAgICAgICAgIGhhc0JhY2tUb1RvcDogdHJ1ZSxcclxuICAgICAgICAgICAgQmFja1RvVG9wQ29tcG9uZW50OiBEZWZhdWx0QmFja1RvVG9wQ29tcG9uZW50LFxyXG4gICAgICAgICAgICBuYXZpZ2F0aW9uQWZmaXhPZmZzZXQ6IDgwXHJcbiAgICAgICAgfTtcclxuICAgIH0sXHJcbiAgICAvKiogQGluaGVyaXRlZERvYyAqL1xyXG4gICAgcHJvcFR5cGVzOiB7XHJcbiAgICAgICAgaGFzTmF2aWdhdGlvbjogdHlwZSgnYm9vbCcpLFxyXG4gICAgICAgIGhhc0JhY2tUb1RvcDogdHlwZSgnYm9vbCcpLFxyXG4gICAgICAgIEJhY2tUb1RvcENvbXBvbmVudDogdHlwZShbJ2Z1bmMnLCAnb2JqZWN0J10pLFxyXG4gICAgICAgIG5hdmlnYXRpb25BZmZpeE9mZnNldDogdHlwZSgnbnVtYmVyJylcclxuICAgIH0sXHJcbiAgICAvKipcclxuICAgICogUmV0dXJucyBkZXRhaWwgY29udGVudC5cclxuICAgICogQHJldHVybiB7b2JqZWN0fSBkZXRhaWwgY29udGVudFxyXG4gICAgKi9cclxuICAgIF9kZXRhaWxDb250ZW50KCkge1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXYgZGF0YS1mb2N1cz0nZGV0YWlsLWNvbnRlbnQnPlxyXG4gICAgICAgICAgICB7dGhpcy5wcm9wcy5jaGlsZHJlbn1cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKTtcclxuICAgIH0sXHJcbiAgICBjb21wb25lbnRXaWxsTW91bnQoKSB7XHJcbiAgICAgICAgY29uc29sZS53YXJuKCdGb2N1c0NvbXBvbmVudHMgMC43LjA6IHRoaXMgY29tcG9uZW50IGlzIGRlcHJlY2F0ZWQsIHBsZWFzZSB1c2UgRm9jdXNDb21wb25lbnRzLmNvbXBvbmVudHMuU2Nyb2xsc3B5Q29udGFpbmVyJyk7XHJcbiAgICB9LFxyXG4gICAgLyoqIEBpbmhlcml0ZWREb2MgKi9cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICBjb25zdCB7aGFzTmF2aWdhdGlvbiwgaGFzQmFja1RvVG9wLCBCYWNrVG9Ub3BDb21wb25lbnQsIG5hdmlnYXRpb25BZmZpeE9mZnNldH0gPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtgJHt0aGlzLl9nZXRTdHlsZUNsYXNzTmFtZSgpfWB9IGRhdGEtZm9jdXM9J2RldGFpbCc+XHJcbiAgICAgICAgICAgIHtoYXNOYXZpZ2F0aW9uID8gPFNjcm9sbHNweSBhZmZpeE9mZnNldD17bmF2aWdhdGlvbkFmZml4T2Zmc2V0fT57dGhpcy5fZGV0YWlsQ29udGVudCgpfTwvU2Nyb2xsc3B5PiA6IHRoaXMuX2RldGFpbENvbnRlbnQoKX1cclxuICAgICAgICAgICAge2hhc0JhY2tUb1RvcCAmJiA8QmFja1RvVG9wQ29tcG9uZW50Lz59XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGJ1aWxkZXIoZGV0YWlsTWl4aW4pO1xyXG4iXX0=