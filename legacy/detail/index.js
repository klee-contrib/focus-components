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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBOzs7O0FBR0E7Ozs7OztBQUpBLElBQU0sUUFBUSxRQUFRLE9BQVIsQ0FBZDs7O0FBR0EsSUFBTSxZQUFZLFFBQVEsY0FBUixFQUF3QixTQUExQzs7QUFFQSxJQUFNLFdBQVcsUUFBUSxzQkFBUixDQUFqQjtBQUNBLElBQU0sNEJBQTRCLFFBQVEsdUJBQVIsRUFBaUMsU0FBbkU7Ozs7O0FBS0EsSUFBSSxjQUFjO0FBQ2QsWUFBUSxDQUFDLFFBQUQsQ0FETTs7QUFHZCxtQkFIYyw2QkFHSTtBQUNkLGVBQU87Ozs7O0FBS0gsMkJBQWUsSUFMWjtBQU1ILDBCQUFjLElBTlg7QUFPSCxnQ0FBb0IseUJBUGpCO0FBUUgsbUNBQXVCO0FBUnBCLFNBQVA7QUFVSCxLQWRhOzs7QUFnQmQsZUFBVztBQUNQLHVCQUFlLHFCQUFLLE1BQUwsQ0FEUjtBQUVQLHNCQUFjLHFCQUFLLE1BQUwsQ0FGUDtBQUdQLDRCQUFvQixxQkFBSyxDQUFDLE1BQUQsRUFBUyxRQUFULENBQUwsQ0FIYjtBQUlQLCtCQUF1QixxQkFBSyxRQUFMO0FBSmhCLEtBaEJHOzs7OztBQTBCZCxrQkExQmMsNEJBMEJHO0FBQ2IsZUFDSTtBQUFBO1lBQUEsRUFBSyxjQUFXLGdCQUFoQjtZQUNDLEtBQUssS0FBTCxDQUFXO0FBRFosU0FESjtBQUtILEtBaENhO0FBaUNkLHNCQWpDYyxnQ0FpQ087QUFDakIsZ0JBQVEsSUFBUixDQUFhLCtHQUFiO0FBQ0gsS0FuQ2E7OztBQXFDZCxVQXJDYyxvQkFxQ0w7QUFBQSxxQkFDNEUsS0FBSyxLQURqRjtBQUFBLFlBQ0UsYUFERixVQUNFLGFBREY7QUFBQSxZQUNpQixZQURqQixVQUNpQixZQURqQjtBQUFBLFlBQytCLGtCQUQvQixVQUMrQixrQkFEL0I7QUFBQSxZQUNtRCxxQkFEbkQsVUFDbUQscUJBRG5EOztBQUVMLGVBQ0k7QUFBQTtZQUFBLEVBQUssZ0JBQWMsS0FBSyxrQkFBTCxFQUFuQixFQUFnRCxjQUFXLFFBQTNEO1lBQ0MsZ0JBQWdCO0FBQUMseUJBQUQ7Z0JBQUEsRUFBVyxhQUFhLHFCQUF4QjtnQkFBZ0QsS0FBSyxjQUFMO0FBQWhELGFBQWhCLEdBQXFHLEtBQUssY0FBTCxFQUR0RztZQUVDLGdCQUFnQixvQkFBQyxrQkFBRDtBQUZqQixTQURKO0FBTUg7QUE3Q2EsQ0FBbEI7O0FBZ0RBLE9BQU8sT0FBUCxHQUFpQix1QkFBUSxXQUFSLENBQWpCIiwiZmlsZSI6ImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcclxuaW1wb3J0IGJ1aWxkZXIgZnJvbSAnZm9jdXMtY29yZS9jb21wb25lbnQvYnVpbGRlcic7XHJcbi8vdmFyIGkxOG5NaXhpbiA9IHJlcXVpcmUoJy4uL2kxOG4nKS5taXhpbjtcclxuY29uc3QgU2Nyb2xsc3B5ID0gcmVxdWlyZSgnLi4vc2Nyb2xsc3B5JykuY29tcG9uZW50O1xyXG5pbXBvcnQgdHlwZSBmcm9tICdmb2N1cy1jb3JlL2NvbXBvbmVudC90eXBlcyc7XHJcbmNvbnN0IHN0eWxhYmxlID0gcmVxdWlyZSgnLi4vLi4vbWl4aW4vc3R5bGFibGUnKTtcclxuY29uc3QgRGVmYXVsdEJhY2tUb1RvcENvbXBvbmVudCA9IHJlcXVpcmUoJy4uL2J1dHRvbi9iYWNrLXRvLXRvcCcpLmNvbXBvbmVudDtcclxuLyoqXHJcbiogTWl4aW4gdXNlZCBpbiBvcmRlciB0byBjcmVhdGUgYSBEZXRhaWwuXHJcbiogQHR5cGUge09iamVjdH1cclxuKi9cclxudmFyIGRldGFpbE1peGluID0ge1xyXG4gICAgbWl4aW5zOiBbc3R5bGFibGVdLFxyXG4gICAgLyoqIEBpbmhlcml0ZWREb2MgKi9cclxuICAgIGdldERlZmF1bHRQcm9wcygpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgKiBBY3RpdmF0ZSB0aGUgcHJlc2VuY2Ugb2YgdGhlIHN0aWNreSBuYXZpZ2F0aW9uIGNvbXBvbmVudC5cclxuICAgICAgICAgICAgKiBAdHlwZSB7Qm9vbGVhbn1cclxuICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgaGFzTmF2aWdhdGlvbjogdHJ1ZSxcclxuICAgICAgICAgICAgaGFzQmFja1RvVG9wOiB0cnVlLFxyXG4gICAgICAgICAgICBCYWNrVG9Ub3BDb21wb25lbnQ6IERlZmF1bHRCYWNrVG9Ub3BDb21wb25lbnQsXHJcbiAgICAgICAgICAgIG5hdmlnYXRpb25BZmZpeE9mZnNldDogODBcclxuICAgICAgICB9O1xyXG4gICAgfSxcclxuICAgIC8qKiBAaW5oZXJpdGVkRG9jICovXHJcbiAgICBwcm9wVHlwZXM6IHtcclxuICAgICAgICBoYXNOYXZpZ2F0aW9uOiB0eXBlKCdib29sJyksXHJcbiAgICAgICAgaGFzQmFja1RvVG9wOiB0eXBlKCdib29sJyksXHJcbiAgICAgICAgQmFja1RvVG9wQ29tcG9uZW50OiB0eXBlKFsnZnVuYycsICdvYmplY3QnXSksXHJcbiAgICAgICAgbmF2aWdhdGlvbkFmZml4T2Zmc2V0OiB0eXBlKCdudW1iZXInKVxyXG4gICAgfSxcclxuICAgIC8qKlxyXG4gICAgKiBSZXR1cm5zIGRldGFpbCBjb250ZW50LlxyXG4gICAgKiBAcmV0dXJuIHtvYmplY3R9IGRldGFpbCBjb250ZW50XHJcbiAgICAqL1xyXG4gICAgX2RldGFpbENvbnRlbnQoKSB7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdiBkYXRhLWZvY3VzPSdkZXRhaWwtY29udGVudCc+XHJcbiAgICAgICAgICAgIHt0aGlzLnByb3BzLmNoaWxkcmVufVxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApO1xyXG4gICAgfSxcclxuICAgIGNvbXBvbmVudFdpbGxNb3VudCgpIHtcclxuICAgICAgICBjb25zb2xlLndhcm4oJ0ZvY3VzQ29tcG9uZW50cyAwLjcuMDogdGhpcyBjb21wb25lbnQgaXMgZGVwcmVjYXRlZCwgcGxlYXNlIHVzZSBGb2N1c0NvbXBvbmVudHMuY29tcG9uZW50cy5TY3JvbGxzcHlDb250YWluZXInKTtcclxuICAgIH0sXHJcbiAgICAvKiogQGluaGVyaXRlZERvYyAqL1xyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIGNvbnN0IHtoYXNOYXZpZ2F0aW9uLCBoYXNCYWNrVG9Ub3AsIEJhY2tUb1RvcENvbXBvbmVudCwgbmF2aWdhdGlvbkFmZml4T2Zmc2V0fSA9IHRoaXMucHJvcHM7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e2Ake3RoaXMuX2dldFN0eWxlQ2xhc3NOYW1lKCl9YH0gZGF0YS1mb2N1cz0nZGV0YWlsJz5cclxuICAgICAgICAgICAge2hhc05hdmlnYXRpb24gPyA8U2Nyb2xsc3B5IGFmZml4T2Zmc2V0PXtuYXZpZ2F0aW9uQWZmaXhPZmZzZXR9Pnt0aGlzLl9kZXRhaWxDb250ZW50KCl9PC9TY3JvbGxzcHk+IDogdGhpcy5fZGV0YWlsQ29udGVudCgpfVxyXG4gICAgICAgICAgICB7aGFzQmFja1RvVG9wICYmIDxCYWNrVG9Ub3BDb21wb25lbnQvPn1cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gYnVpbGRlcihkZXRhaWxNaXhpbik7XHJcbiJdfQ==