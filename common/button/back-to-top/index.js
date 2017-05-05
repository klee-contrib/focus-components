'use strict';

var _builder = require('focus-core/component/builder');

var _builder2 = _interopRequireDefault(_builder);

var _types = require('focus-core/component/types');

var _types2 = _interopRequireDefault(_types);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var React = require('react');

var Button = require('../../button/action').component;
var i18nMixin = require('../../i18n/mixin');
var stylableMixin = require('../../../mixin/stylable');

var _require = require('../../mixin/scroll'),
    scrollTo = _require.scrollTo,
    scrollPosition = _require.scrollPosition;

/**
* Mixin button.
* @type {Object}
*/


var backToTopMixin = {
    displayName: 'ButtonBackToTop',
    mixins: [i18nMixin, stylableMixin],
    /** inheritedDoc */
    getDefaultProps: function getDefaultProps() {
        return {
            iconPrefix: 'fa fa-',
            iconName: 'arrow-circle-up',
            duration: 100,
            scrollStart: 100
        };
    },

    /**
    * Props validation
    */
    propTypes: {
        iconPrefix: (0, _types2.default)('string'),
        iconName: (0, _types2.default)('string'),
        duration: (0, _types2.default)('number'),
        scrollStart: (0, _types2.default)('number')
    },
    /** inheritedDoc */
    getInitialState: function getInitialState() {
        return {
            isVisible: false
        };
    },
    componentWillMount: function componentWillMount() {
        console.warn('FocusComponents v0.15: the \'ButtonBackToTop\' component from FocusComponents.common is deprecated, please use FocusComponents.components.ButtonBackToTop');
    },

    /**
    * Component did mount, attach the scroll spy
    */
    componentDidMount: function componentDidMount() {
        this._scrollCarrier = window;
        this._scrollCarrier.addEventListener('scroll', this._scrollSpy);
        this._scrollCarrier.addEventListener('resize', this._scrollSpy);
        this._scrollSpy();
    },
    componentWillUnmount: function componentWillUnmount() {
        this._scrollCarrier.removeEventListener('scroll', this._scrollSpy);
        this._scrollCarrier.removeEventListener('resize', this._scrollSpy);
    },

    /**
    * The scroll event handler
    * @private
    */
    _scrollSpy: function _scrollSpy() {
        var currentScrollPosition = scrollPosition();
        if (currentScrollPosition.top > this.props.scrollStart) {
            if (!this.state.isVisible) {
                this.setState({ isVisible: true });
            }
        } else {
            if (this.state.isVisible) {
                this.setState({ isVisible: false });
            }
        }
    },

    /**
    * Go back to the top of the page.
    */
    goBackToTop: function goBackToTop() {
        //TODO: Add animation
        scrollTo(undefined, 0);
    },

    /** inheritedDoc */
    render: function render() {
        var isVisible = this.state.isVisible;

        return isVisible ? React.createElement(
            'div',
            { 'data-focus': 'back-to-top' },
            React.createElement(Button, { color: 'colored', handleOnClick: this.goBackToTop, icon: 'expand_less', shape: 'fab' })
        ) : null;
    }
};

module.exports = (0, _builder2.default)(backToTopMixin);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJSZWFjdCIsInJlcXVpcmUiLCJCdXR0b24iLCJjb21wb25lbnQiLCJpMThuTWl4aW4iLCJzdHlsYWJsZU1peGluIiwic2Nyb2xsVG8iLCJzY3JvbGxQb3NpdGlvbiIsImJhY2tUb1RvcE1peGluIiwiZGlzcGxheU5hbWUiLCJtaXhpbnMiLCJnZXREZWZhdWx0UHJvcHMiLCJpY29uUHJlZml4IiwiaWNvbk5hbWUiLCJkdXJhdGlvbiIsInNjcm9sbFN0YXJ0IiwicHJvcFR5cGVzIiwiZ2V0SW5pdGlhbFN0YXRlIiwiaXNWaXNpYmxlIiwiY29tcG9uZW50V2lsbE1vdW50IiwiY29uc29sZSIsIndhcm4iLCJjb21wb25lbnREaWRNb3VudCIsIl9zY3JvbGxDYXJyaWVyIiwid2luZG93IiwiYWRkRXZlbnRMaXN0ZW5lciIsIl9zY3JvbGxTcHkiLCJjb21wb25lbnRXaWxsVW5tb3VudCIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJjdXJyZW50U2Nyb2xsUG9zaXRpb24iLCJ0b3AiLCJwcm9wcyIsInN0YXRlIiwic2V0U3RhdGUiLCJnb0JhY2tUb1RvcCIsInVuZGVmaW5lZCIsInJlbmRlciIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBRkEsSUFBTUEsUUFBUUMsUUFBUSxPQUFSLENBQWQ7O0FBR0EsSUFBTUMsU0FBU0QsUUFBUSxxQkFBUixFQUErQkUsU0FBOUM7QUFDQSxJQUFNQyxZQUFZSCxRQUFRLGtCQUFSLENBQWxCO0FBQ0EsSUFBTUksZ0JBQWdCSixRQUFRLHlCQUFSLENBQXRCOztlQUNtQ0EsUUFBUSxvQkFBUixDO0lBQTVCSyxRLFlBQUFBLFE7SUFBVUMsYyxZQUFBQSxjOztBQUVqQjs7Ozs7O0FBSUEsSUFBTUMsaUJBQWlCO0FBQ25CQyxpQkFBYSxpQkFETTtBQUVuQkMsWUFBUSxDQUFDTixTQUFELEVBQVlDLGFBQVosQ0FGVztBQUduQjtBQUNBTSxtQkFKbUIsNkJBSUQ7QUFDZCxlQUFPO0FBQ0hDLHdCQUFZLFFBRFQ7QUFFSEMsc0JBQVUsaUJBRlA7QUFHSEMsc0JBQVUsR0FIUDtBQUlIQyx5QkFBYTtBQUpWLFNBQVA7QUFNSCxLQVhrQjs7QUFZbkI7OztBQUdBQyxlQUFXO0FBQ1BKLG9CQUFZLHFCQUFNLFFBQU4sQ0FETDtBQUVQQyxrQkFBVSxxQkFBTSxRQUFOLENBRkg7QUFHUEMsa0JBQVUscUJBQU0sUUFBTixDQUhIO0FBSVBDLHFCQUFhLHFCQUFNLFFBQU47QUFKTixLQWZRO0FBcUJuQjtBQUNBRSxtQkF0Qm1CLDZCQXNCRDtBQUNkLGVBQU87QUFDSEMsdUJBQVc7QUFEUixTQUFQO0FBR0gsS0ExQmtCO0FBMkJuQkMsc0JBM0JtQixnQ0EyQkc7QUFDbEJDLGdCQUFRQyxJQUFSLENBQWEsMkpBQWI7QUFDSCxLQTdCa0I7O0FBOEJuQjs7O0FBR0FDLHFCQWpDbUIsK0JBaUNDO0FBQ2hCLGFBQUtDLGNBQUwsR0FBc0JDLE1BQXRCO0FBQ0EsYUFBS0QsY0FBTCxDQUFvQkUsZ0JBQXBCLENBQXFDLFFBQXJDLEVBQStDLEtBQUtDLFVBQXBEO0FBQ0EsYUFBS0gsY0FBTCxDQUFvQkUsZ0JBQXBCLENBQXFDLFFBQXJDLEVBQStDLEtBQUtDLFVBQXBEO0FBQ0EsYUFBS0EsVUFBTDtBQUNILEtBdENrQjtBQXVDbkJDLHdCQXZDbUIsa0NBdUNJO0FBQ25CLGFBQUtKLGNBQUwsQ0FBb0JLLG1CQUFwQixDQUF3QyxRQUF4QyxFQUFrRCxLQUFLRixVQUF2RDtBQUNBLGFBQUtILGNBQUwsQ0FBb0JLLG1CQUFwQixDQUF3QyxRQUF4QyxFQUFrRCxLQUFLRixVQUF2RDtBQUNILEtBMUNrQjs7QUEyQ25COzs7O0FBSUFBLGNBL0NtQix3QkErQ047QUFDVCxZQUFNRyx3QkFBd0J0QixnQkFBOUI7QUFDQSxZQUFJc0Isc0JBQXNCQyxHQUF0QixHQUE0QixLQUFLQyxLQUFMLENBQVdoQixXQUEzQyxFQUF3RDtBQUNwRCxnQkFBSSxDQUFDLEtBQUtpQixLQUFMLENBQVdkLFNBQWhCLEVBQTJCO0FBQ3ZCLHFCQUFLZSxRQUFMLENBQWMsRUFBQ2YsV0FBVyxJQUFaLEVBQWQ7QUFDSDtBQUNKLFNBSkQsTUFJTztBQUNILGdCQUFJLEtBQUtjLEtBQUwsQ0FBV2QsU0FBZixFQUEwQjtBQUN0QixxQkFBS2UsUUFBTCxDQUFjLEVBQUNmLFdBQVcsS0FBWixFQUFkO0FBQ0g7QUFDSjtBQUNKLEtBMURrQjs7QUEyRG5COzs7QUFHQWdCLGVBOURtQix5QkE4REw7QUFDVjtBQUNBNUIsaUJBQVM2QixTQUFULEVBQW9CLENBQXBCO0FBQ0gsS0FqRWtCOztBQWtFbkI7QUFDQUMsVUFuRW1CLG9CQW1FVjtBQUFBLFlBQ0VsQixTQURGLEdBQ2UsS0FBS2MsS0FEcEIsQ0FDRWQsU0FERjs7QUFFTCxlQUFPQSxZQUFZO0FBQUE7QUFBQSxjQUFLLGNBQVcsYUFBaEI7QUFBOEIsZ0NBQUMsTUFBRCxJQUFRLE9BQU0sU0FBZCxFQUF3QixlQUFlLEtBQUtnQixXQUE1QyxFQUF5RCxNQUFLLGFBQTlELEVBQTRFLE9BQU0sS0FBbEY7QUFBOUIsU0FBWixHQUE2SSxJQUFwSjtBQUNIO0FBdEVrQixDQUF2Qjs7QUF5RUFHLE9BQU9DLE9BQVAsR0FBaUIsdUJBQVE5QixjQUFSLENBQWpCIiwiZmlsZSI6ImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcclxuaW1wb3J0IGJ1aWxkZXIgZnJvbSAnZm9jdXMtY29yZS9jb21wb25lbnQvYnVpbGRlcic7XHJcbmltcG9ydCB0eXBlcyBmcm9tICdmb2N1cy1jb3JlL2NvbXBvbmVudC90eXBlcyc7XHJcbmNvbnN0IEJ1dHRvbiA9IHJlcXVpcmUoJy4uLy4uL2J1dHRvbi9hY3Rpb24nKS5jb21wb25lbnQ7XHJcbmNvbnN0IGkxOG5NaXhpbiA9IHJlcXVpcmUoJy4uLy4uL2kxOG4vbWl4aW4nKTtcclxuY29uc3Qgc3R5bGFibGVNaXhpbiA9IHJlcXVpcmUoJy4uLy4uLy4uL21peGluL3N0eWxhYmxlJyk7XHJcbmNvbnN0IHtzY3JvbGxUbywgc2Nyb2xsUG9zaXRpb259ID0gcmVxdWlyZSgnLi4vLi4vbWl4aW4vc2Nyb2xsJyk7XHJcblxyXG4vKipcclxuKiBNaXhpbiBidXR0b24uXHJcbiogQHR5cGUge09iamVjdH1cclxuKi9cclxuY29uc3QgYmFja1RvVG9wTWl4aW4gPSB7XHJcbiAgICBkaXNwbGF5TmFtZTogJ0J1dHRvbkJhY2tUb1RvcCcsXHJcbiAgICBtaXhpbnM6IFtpMThuTWl4aW4sIHN0eWxhYmxlTWl4aW5dLFxyXG4gICAgLyoqIGluaGVyaXRlZERvYyAqL1xyXG4gICAgZ2V0RGVmYXVsdFByb3BzKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGljb25QcmVmaXg6ICdmYSBmYS0nLFxyXG4gICAgICAgICAgICBpY29uTmFtZTogJ2Fycm93LWNpcmNsZS11cCcsXHJcbiAgICAgICAgICAgIGR1cmF0aW9uOiAxMDAsXHJcbiAgICAgICAgICAgIHNjcm9sbFN0YXJ0OiAxMDBcclxuICAgICAgICB9O1xyXG4gICAgfSxcclxuICAgIC8qKlxyXG4gICAgKiBQcm9wcyB2YWxpZGF0aW9uXHJcbiAgICAqL1xyXG4gICAgcHJvcFR5cGVzOiB7XHJcbiAgICAgICAgaWNvblByZWZpeDogdHlwZXMoJ3N0cmluZycpLFxyXG4gICAgICAgIGljb25OYW1lOiB0eXBlcygnc3RyaW5nJyksXHJcbiAgICAgICAgZHVyYXRpb246IHR5cGVzKCdudW1iZXInKSxcclxuICAgICAgICBzY3JvbGxTdGFydDogdHlwZXMoJ251bWJlcicpXHJcbiAgICB9LFxyXG4gICAgLyoqIGluaGVyaXRlZERvYyAqL1xyXG4gICAgZ2V0SW5pdGlhbFN0YXRlKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGlzVmlzaWJsZTogZmFsc2VcclxuICAgICAgICB9O1xyXG4gICAgfSxcclxuICAgIGNvbXBvbmVudFdpbGxNb3VudCAoKSB7XHJcbiAgICAgICAgY29uc29sZS53YXJuKCdGb2N1c0NvbXBvbmVudHMgdjAuMTU6IHRoZSBcXCdCdXR0b25CYWNrVG9Ub3BcXCcgY29tcG9uZW50IGZyb20gRm9jdXNDb21wb25lbnRzLmNvbW1vbiBpcyBkZXByZWNhdGVkLCBwbGVhc2UgdXNlIEZvY3VzQ29tcG9uZW50cy5jb21wb25lbnRzLkJ1dHRvbkJhY2tUb1RvcCcpO1xyXG4gICAgfSxcclxuICAgIC8qKlxyXG4gICAgKiBDb21wb25lbnQgZGlkIG1vdW50LCBhdHRhY2ggdGhlIHNjcm9sbCBzcHlcclxuICAgICovXHJcbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcclxuICAgICAgICB0aGlzLl9zY3JvbGxDYXJyaWVyID0gd2luZG93O1xyXG4gICAgICAgIHRoaXMuX3Njcm9sbENhcnJpZXIuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgdGhpcy5fc2Nyb2xsU3B5KTtcclxuICAgICAgICB0aGlzLl9zY3JvbGxDYXJyaWVyLmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMuX3Njcm9sbFNweSk7XHJcbiAgICAgICAgdGhpcy5fc2Nyb2xsU3B5KCk7XHJcbiAgICB9LFxyXG4gICAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XHJcbiAgICAgICAgdGhpcy5fc2Nyb2xsQ2Fycmllci5yZW1vdmVFdmVudExpc3RlbmVyKCdzY3JvbGwnLCB0aGlzLl9zY3JvbGxTcHkpO1xyXG4gICAgICAgIHRoaXMuX3Njcm9sbENhcnJpZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5fc2Nyb2xsU3B5KTtcclxuICAgIH0sXHJcbiAgICAvKipcclxuICAgICogVGhlIHNjcm9sbCBldmVudCBoYW5kbGVyXHJcbiAgICAqIEBwcml2YXRlXHJcbiAgICAqL1xyXG4gICAgX3Njcm9sbFNweSgpIHtcclxuICAgICAgICBjb25zdCBjdXJyZW50U2Nyb2xsUG9zaXRpb24gPSBzY3JvbGxQb3NpdGlvbigpO1xyXG4gICAgICAgIGlmIChjdXJyZW50U2Nyb2xsUG9zaXRpb24udG9wID4gdGhpcy5wcm9wcy5zY3JvbGxTdGFydCkge1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuc3RhdGUuaXNWaXNpYmxlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtpc1Zpc2libGU6IHRydWV9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnN0YXRlLmlzVmlzaWJsZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7aXNWaXNpYmxlOiBmYWxzZX0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIC8qKlxyXG4gICAgKiBHbyBiYWNrIHRvIHRoZSB0b3Agb2YgdGhlIHBhZ2UuXHJcbiAgICAqL1xyXG4gICAgZ29CYWNrVG9Ub3AoKSB7XHJcbiAgICAgICAgLy9UT0RPOiBBZGQgYW5pbWF0aW9uXHJcbiAgICAgICAgc2Nyb2xsVG8odW5kZWZpbmVkLCAwKTtcclxuICAgIH0sXHJcbiAgICAvKiogaW5oZXJpdGVkRG9jICovXHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgY29uc3Qge2lzVmlzaWJsZX0gPSB0aGlzLnN0YXRlO1xyXG4gICAgICAgIHJldHVybiBpc1Zpc2libGUgPyA8ZGl2IGRhdGEtZm9jdXM9J2JhY2stdG8tdG9wJz48QnV0dG9uIGNvbG9yPSdjb2xvcmVkJyBoYW5kbGVPbkNsaWNrPXt0aGlzLmdvQmFja1RvVG9wfSBpY29uPSdleHBhbmRfbGVzcycgc2hhcGU9J2ZhYicgLz48L2Rpdj4gOiBudWxsO1xyXG4gICAgfVxyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBidWlsZGVyKGJhY2tUb1RvcE1peGluKTtcclxuIl19