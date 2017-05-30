'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _builder = require('focus-core/component/builder');

var _builder2 = _interopRequireDefault(_builder);

var _translation = require('focus-core/translation');

var _collection = require('lodash/collection');

var _action = require('../button/action');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TopicDisplayer = {
    displayName: 'TopicDisplayer',

    /**
     * Default props.
     * @returns {object} default props.
     */
    getDefaultProps: function getDefaultProps() {
        return {
            style: undefined, // Component css style.
            topicClickAction: function topicClickAction() {},
            // Action when click on topic
            topicList: {}, // {topic1: "Label of topic one", topic2:"Label of topic 2"} List f topics,
            displayLabels: false
        };
    },


    /**
     * Render the component.
     * @returns {JSX} Htm code.
     */
    render: function render() {
        var _this = this;

        var _props = this.props,
            displayLabels = _props.displayLabels,
            topicList = _props.topicList;

        return _react2.default.createElement(
            'div',
            { 'data-focus': 'topic-displayer' },
            (0, _collection.map)(topicList, function (topic, key) {
                var text = displayLabels ? (0, _translation.translate)(topic.label) + ': ' + (0, _translation.translate)(topic.value) : (0, _translation.translate)(topic.value);
                return _react2.default.createElement(_action.component, {
                    handleOnClick: _this.topicClickHandler(key),
                    icon: 'clear',
                    key: key,
                    label: text
                });
            })
        );
    },


    /**
     * Action on the topic click.
     * @param  {String} key  topic key
     * @return {Function}     Click handler
     */
    topicClickHandler: function topicClickHandler(key) {
        var _this2 = this;

        return function (event) {
            if (event) {
                event.preventDefault();
            }
            _this2.props.topicClickAction(key);
        };
    }
};

// Components


module.exports = (0, _builder2.default)(TopicDisplayer);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJUb3BpY0Rpc3BsYXllciIsImRpc3BsYXlOYW1lIiwiZ2V0RGVmYXVsdFByb3BzIiwic3R5bGUiLCJ1bmRlZmluZWQiLCJ0b3BpY0NsaWNrQWN0aW9uIiwidG9waWNMaXN0IiwiZGlzcGxheUxhYmVscyIsInJlbmRlciIsInByb3BzIiwidG9waWMiLCJrZXkiLCJ0ZXh0IiwibGFiZWwiLCJ2YWx1ZSIsInRvcGljQ2xpY2tIYW5kbGVyIiwiZXZlbnQiLCJwcmV2ZW50RGVmYXVsdCIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOztBQUNBOztBQUdBOzs7O0FBRUEsSUFBTUEsaUJBQWlCO0FBQ25CQyxpQkFBYSxnQkFETTs7QUFHbkI7Ozs7QUFJQUMsbUJBUG1CLDZCQU9EO0FBQ2QsZUFBTztBQUNIQyxtQkFBT0MsU0FESixFQUNlO0FBQ2xCQyw0QkFGRyw4QkFFZ0IsQ0FBRSxDQUZsQjtBQUVvQjtBQUN2QkMsdUJBQVcsRUFIUixFQUdZO0FBQ2ZDLDJCQUFlO0FBSlosU0FBUDtBQU1ILEtBZGtCOzs7QUFnQm5COzs7O0FBSUFDLFVBcEJtQixvQkFvQlY7QUFBQTs7QUFBQSxxQkFDOEIsS0FBS0MsS0FEbkM7QUFBQSxZQUNFRixhQURGLFVBQ0VBLGFBREY7QUFBQSxZQUNpQkQsU0FEakIsVUFDaUJBLFNBRGpCOztBQUVMLGVBQ0k7QUFBQTtBQUFBLGNBQUssY0FBVyxpQkFBaEI7QUFDSyxpQ0FBSUEsU0FBSixFQUFlLFVBQUNJLEtBQUQsRUFBUUMsR0FBUixFQUFnQjtBQUM1QixvQkFBTUMsT0FBT0wsZ0JBQW1CLDRCQUFVRyxNQUFNRyxLQUFoQixDQUFuQixVQUE4Qyw0QkFBVUgsTUFBTUksS0FBaEIsQ0FBOUMsR0FBeUUsNEJBQVVKLE1BQU1JLEtBQWhCLENBQXRGO0FBQ0EsdUJBQ0k7QUFDSSxtQ0FBZSxNQUFLQyxpQkFBTCxDQUF1QkosR0FBdkIsQ0FEbkI7QUFFSSwwQkFBSyxPQUZUO0FBR0kseUJBQUtBLEdBSFQ7QUFJSSwyQkFBT0M7QUFKWCxrQkFESjtBQVFILGFBVkE7QUFETCxTQURKO0FBZUgsS0FyQ2tCOzs7QUF1Q25COzs7OztBQUtBRyxxQkE1Q21CLDZCQTRDREosR0E1Q0MsRUE0Q0k7QUFBQTs7QUFDbkIsZUFBTyxVQUFDSyxLQUFELEVBQVc7QUFDZCxnQkFBR0EsS0FBSCxFQUFVO0FBQ05BLHNCQUFNQyxjQUFOO0FBQ0g7QUFDRCxtQkFBS1IsS0FBTCxDQUFXSixnQkFBWCxDQUE0Qk0sR0FBNUI7QUFDSCxTQUxEO0FBTUg7QUFuRGtCLENBQXZCOztBQUhBOzs7QUF5REFPLE9BQU9DLE9BQVAsR0FBaUIsdUJBQVFuQixjQUFSLENBQWpCIiwiZmlsZSI6ImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBidWlsZGVyIGZyb20gJ2ZvY3VzLWNvcmUvY29tcG9uZW50L2J1aWxkZXInO1xyXG5pbXBvcnQge3RyYW5zbGF0ZX0gZnJvbSAnZm9jdXMtY29yZS90cmFuc2xhdGlvbic7XHJcbmltcG9ydCB7bWFwfSBmcm9tICdsb2Rhc2gvY29sbGVjdGlvbic7XHJcblxyXG4vLyBDb21wb25lbnRzXHJcbmltcG9ydCB7Y29tcG9uZW50IGFzIEJ1dHRvbn0gZnJvbSAnLi4vYnV0dG9uL2FjdGlvbic7XHJcblxyXG5jb25zdCBUb3BpY0Rpc3BsYXllciA9IHtcclxuICAgIGRpc3BsYXlOYW1lOiAnVG9waWNEaXNwbGF5ZXInLFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGVmYXVsdCBwcm9wcy5cclxuICAgICAqIEByZXR1cm5zIHtvYmplY3R9IGRlZmF1bHQgcHJvcHMuXHJcbiAgICAgKi9cclxuICAgIGdldERlZmF1bHRQcm9wcygpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBzdHlsZTogdW5kZWZpbmVkLCAvLyBDb21wb25lbnQgY3NzIHN0eWxlLlxyXG4gICAgICAgICAgICB0b3BpY0NsaWNrQWN0aW9uKCkge30sIC8vIEFjdGlvbiB3aGVuIGNsaWNrIG9uIHRvcGljXHJcbiAgICAgICAgICAgIHRvcGljTGlzdDoge30sIC8vIHt0b3BpYzE6IFwiTGFiZWwgb2YgdG9waWMgb25lXCIsIHRvcGljMjpcIkxhYmVsIG9mIHRvcGljIDJcIn0gTGlzdCBmIHRvcGljcyxcclxuICAgICAgICAgICAgZGlzcGxheUxhYmVsczogZmFsc2VcclxuICAgICAgICB9O1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlbmRlciB0aGUgY29tcG9uZW50LlxyXG4gICAgICogQHJldHVybnMge0pTWH0gSHRtIGNvZGUuXHJcbiAgICAgKi9cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICBjb25zdCB7ZGlzcGxheUxhYmVscywgdG9waWNMaXN0fSA9IHRoaXMucHJvcHM7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdiBkYXRhLWZvY3VzPSd0b3BpYy1kaXNwbGF5ZXInPlxyXG4gICAgICAgICAgICAgICAge21hcCh0b3BpY0xpc3QsICh0b3BpYywga2V5KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdGV4dCA9IGRpc3BsYXlMYWJlbHMgPyBgJHt0cmFuc2xhdGUodG9waWMubGFiZWwpfTogJHt0cmFuc2xhdGUodG9waWMudmFsdWUpfWAgOiB0cmFuc2xhdGUodG9waWMudmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxCdXR0b25cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhhbmRsZU9uQ2xpY2s9e3RoaXMudG9waWNDbGlja0hhbmRsZXIoa2V5KX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljb249J2NsZWFyJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5PXtrZXl9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbD17dGV4dH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgIH0pfVxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIEFjdGlvbiBvbiB0aGUgdG9waWMgY2xpY2suXHJcbiAgICAgKiBAcGFyYW0gIHtTdHJpbmd9IGtleSAgdG9waWMga2V5XHJcbiAgICAgKiBAcmV0dXJuIHtGdW5jdGlvbn0gICAgIENsaWNrIGhhbmRsZXJcclxuICAgICAqL1xyXG4gICAgdG9waWNDbGlja0hhbmRsZXIoa2V5KSB7XHJcbiAgICAgICAgcmV0dXJuIChldmVudCkgPT4ge1xyXG4gICAgICAgICAgICBpZihldmVudCkge1xyXG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnByb3BzLnRvcGljQ2xpY2tBY3Rpb24oa2V5KTtcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBidWlsZGVyKFRvcGljRGlzcGxheWVyKTtcclxuIl19