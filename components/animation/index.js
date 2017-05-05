'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactAddonsCssTransitionGroup = require('react-addons-css-transition-group');

var _reactAddonsCssTransitionGroup2 = _interopRequireDefault(_reactAddonsCssTransitionGroup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; } //dependencies


var propTypes = {
    //If you want to use a custom css class
    // for each transion step, set this prop to TRUE.
    customClasses: _react.PropTypes.bool,
    // to enable transition
    appear: _react.PropTypes.bool,
    enter: _react.PropTypes.bool,
    leave: _react.PropTypes.bool,

    // Transition duration
    appearTimeout: _react.PropTypes.number,
    enterTimeout: _react.PropTypes.number,
    leaveTimeout: _react.PropTypes.number,

    // Transition css className.
    appearName: _react.PropTypes.string,
    appearActiveName: _react.PropTypes.string,
    enterName: _react.PropTypes.string,
    enterActiveName: _react.PropTypes.string,
    leaveName: _react.PropTypes.string,
    leaveActiveName: _react.PropTypes.string,
    transitionName: _react.PropTypes.string
};

var defaultProps = {
    customClasses: true,

    appear: true,
    enter: true,
    leave: true,

    appearTimeout: 500,
    enterTimeout: 500,
    leaveTimeout: 500,

    appearName: 'bounce',
    appearActiveName: 'bounce',
    enterName: 'bounce',
    enterActiveName: 'bounce',
    leaveName: 'bounceOut',
    leaveActiveName: 'bounceOut'
};

function Animation(_ref) {
    var customClasses = _ref.customClasses,
        appear = _ref.appear,
        enter = _ref.enter,
        leave = _ref.leave,
        appearName = _ref.appearName,
        appearActiveName = _ref.appearActiveName,
        enterName = _ref.enterName,
        enterActiveName = _ref.enterActiveName,
        leaveName = _ref.leaveName,
        leaveActiveName = _ref.leaveActiveName,
        appearTimeout = _ref.appearTimeout,
        enterTimeout = _ref.enterTimeout,
        leaveTimeout = _ref.leaveTimeout,
        transitionName = _ref.transitionName,
        otherProps = _objectWithoutProperties(_ref, ['customClasses', 'appear', 'enter', 'leave', 'appearName', 'appearActiveName', 'enterName', 'enterActiveName', 'leaveName', 'leaveActiveName', 'appearTimeout', 'enterTimeout', 'leaveTimeout', 'transitionName']);

    var transitionClassName = transitionName;
    if (true === customClasses) {
        transitionClassName = {
            appear: appearName,
            appearActive: appearActiveName,
            enter: enterName,
            enterActive: enterActiveName,
            leave: leaveName,
            leaveActive: leaveActiveName
        };
    }
    return _react2.default.createElement(
        _reactAddonsCssTransitionGroup2.default,
        {
            transitionAppear: appear,
            transitionAppearTimeout: enter,
            transitionEnter: leave,
            transitionEnterTimeout: appearTimeout,
            transitionLeave: enterTimeout,
            transitionLeaveTimeout: leaveTimeout,
            transitionName: transitionClassName
        },
        _react2.default.createElement(
            'div',
            { className: 'animated' },
            otherProps.children
        )
    );
}

//Static props.
Animation.displayName = 'animation';
Animation.defaultProps = defaultProps;
Animation.propTypes = propTypes;

exports.default = Animation;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJwcm9wVHlwZXMiLCJjdXN0b21DbGFzc2VzIiwiYm9vbCIsImFwcGVhciIsImVudGVyIiwibGVhdmUiLCJhcHBlYXJUaW1lb3V0IiwibnVtYmVyIiwiZW50ZXJUaW1lb3V0IiwibGVhdmVUaW1lb3V0IiwiYXBwZWFyTmFtZSIsInN0cmluZyIsImFwcGVhckFjdGl2ZU5hbWUiLCJlbnRlck5hbWUiLCJlbnRlckFjdGl2ZU5hbWUiLCJsZWF2ZU5hbWUiLCJsZWF2ZUFjdGl2ZU5hbWUiLCJ0cmFuc2l0aW9uTmFtZSIsImRlZmF1bHRQcm9wcyIsIkFuaW1hdGlvbiIsIm90aGVyUHJvcHMiLCJ0cmFuc2l0aW9uQ2xhc3NOYW1lIiwiYXBwZWFyQWN0aXZlIiwiZW50ZXJBY3RpdmUiLCJsZWF2ZUFjdGl2ZSIsImNoaWxkcmVuIiwiZGlzcGxheU5hbWUiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs2TkFGQTs7O0FBSUEsSUFBTUEsWUFBWTtBQUNkO0FBQ0E7QUFDQUMsbUJBQWUsaUJBQVVDLElBSFg7QUFJZDtBQUNBQyxZQUFRLGlCQUFVRCxJQUxKO0FBTWRFLFdBQU8saUJBQVVGLElBTkg7QUFPZEcsV0FBTyxpQkFBVUgsSUFQSDs7QUFTZDtBQUNBSSxtQkFBZSxpQkFBVUMsTUFWWDtBQVdkQyxrQkFBYyxpQkFBVUQsTUFYVjtBQVlkRSxrQkFBYyxpQkFBVUYsTUFaVjs7QUFjZDtBQUNBRyxnQkFBWSxpQkFBVUMsTUFmUjtBQWdCZEMsc0JBQWtCLGlCQUFVRCxNQWhCZDtBQWlCZEUsZUFBVyxpQkFBVUYsTUFqQlA7QUFrQmRHLHFCQUFpQixpQkFBVUgsTUFsQmI7QUFtQmRJLGVBQVcsaUJBQVVKLE1BbkJQO0FBb0JkSyxxQkFBaUIsaUJBQVVMLE1BcEJiO0FBcUJkTSxvQkFBZ0IsaUJBQVVOO0FBckJaLENBQWxCOztBQXdCQSxJQUFNTyxlQUFlO0FBQ2pCakIsbUJBQWUsSUFERTs7QUFHakJFLFlBQVEsSUFIUztBQUlqQkMsV0FBTyxJQUpVO0FBS2pCQyxXQUFPLElBTFU7O0FBT2pCQyxtQkFBZSxHQVBFO0FBUWpCRSxrQkFBYyxHQVJHO0FBU2pCQyxrQkFBYyxHQVRHOztBQVdqQkMsZ0JBQVksUUFYSztBQVlqQkUsc0JBQWtCLFFBWkQ7QUFhakJDLGVBQVcsUUFiTTtBQWNqQkMscUJBQWlCLFFBZEE7QUFlakJDLGVBQVcsV0FmTTtBQWdCakJDLHFCQUFpQjtBQWhCQSxDQUFyQjs7QUFvQkEsU0FBU0csU0FBVCxPQUU2RTtBQUFBLFFBRnpEbEIsYUFFeUQsUUFGekRBLGFBRXlEO0FBQUEsUUFGMUNFLE1BRTBDLFFBRjFDQSxNQUUwQztBQUFBLFFBRmxDQyxLQUVrQyxRQUZsQ0EsS0FFa0M7QUFBQSxRQUYzQkMsS0FFMkIsUUFGM0JBLEtBRTJCO0FBQUEsUUFGcEJLLFVBRW9CLFFBRnBCQSxVQUVvQjtBQUFBLFFBRDNFRSxnQkFDMkUsUUFEM0VBLGdCQUMyRTtBQUFBLFFBRHpEQyxTQUN5RCxRQUR6REEsU0FDeUQ7QUFBQSxRQUQ5Q0MsZUFDOEMsUUFEOUNBLGVBQzhDO0FBQUEsUUFEOUJDLFNBQzhCLFFBRDlCQSxTQUM4QjtBQUFBLFFBRG5CQyxlQUNtQixRQURuQkEsZUFDbUI7QUFBQSxRQUEzRVYsYUFBMkUsUUFBM0VBLGFBQTJFO0FBQUEsUUFBNURFLFlBQTRELFFBQTVEQSxZQUE0RDtBQUFBLFFBQTlDQyxZQUE4QyxRQUE5Q0EsWUFBOEM7QUFBQSxRQUFoQ1EsY0FBZ0MsUUFBaENBLGNBQWdDO0FBQUEsUUFBYkcsVUFBYTs7QUFDekUsUUFBSUMsc0JBQXNCSixjQUExQjtBQUNBLFFBQUcsU0FBU2hCLGFBQVosRUFBMkI7QUFDdkJvQiw4QkFBc0I7QUFDbEJsQixvQkFBUU8sVUFEVTtBQUVsQlksMEJBQWNWLGdCQUZJO0FBR2xCUixtQkFBT1MsU0FIVztBQUlsQlUseUJBQWFULGVBSks7QUFLbEJULG1CQUFPVSxTQUxXO0FBTWxCUyx5QkFBYVI7QUFOSyxTQUF0QjtBQVFIO0FBQ0QsV0FDRTtBQUFBO0FBQUE7QUFDSSw4QkFBa0JiLE1BRHRCO0FBRUkscUNBQXlCQyxLQUY3QjtBQUdJLDZCQUFpQkMsS0FIckI7QUFJSSxvQ0FBd0JDLGFBSjVCO0FBS0ksNkJBQWlCRSxZQUxyQjtBQU1JLG9DQUF3QkMsWUFONUI7QUFPSSw0QkFBZ0JZO0FBUHBCO0FBU0k7QUFBQTtBQUFBLGNBQUssV0FBVSxVQUFmO0FBQ0dELHVCQUFXSztBQURkO0FBVEosS0FERjtBQWVIOztBQUVEO0FBQ0FOLFVBQVVPLFdBQVYsR0FBd0IsV0FBeEI7QUFDQVAsVUFBVUQsWUFBVixHQUF5QkEsWUFBekI7QUFDQUMsVUFBVW5CLFNBQVYsR0FBc0JBLFNBQXRCOztrQkFFZW1CLFMiLCJmaWxlIjoiaXMtcmVhY3QtY2xhc3MtY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy9kZXBlbmRlbmNpZXNcclxuaW1wb3J0IFJlYWN0LCB7UHJvcFR5cGVzfSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBSZWFjdENTU1RyYW5zaXRpb25Hcm91cCBmcm9tICdyZWFjdC1hZGRvbnMtY3NzLXRyYW5zaXRpb24tZ3JvdXAnO1xyXG5cclxuY29uc3QgcHJvcFR5cGVzID0ge1xyXG4gICAgLy9JZiB5b3Ugd2FudCB0byB1c2UgYSBjdXN0b20gY3NzIGNsYXNzXHJcbiAgICAvLyBmb3IgZWFjaCB0cmFuc2lvbiBzdGVwLCBzZXQgdGhpcyBwcm9wIHRvIFRSVUUuXHJcbiAgICBjdXN0b21DbGFzc2VzOiBQcm9wVHlwZXMuYm9vbCxcclxuICAgIC8vIHRvIGVuYWJsZSB0cmFuc2l0aW9uXHJcbiAgICBhcHBlYXI6IFByb3BUeXBlcy5ib29sLFxyXG4gICAgZW50ZXI6IFByb3BUeXBlcy5ib29sLFxyXG4gICAgbGVhdmU6IFByb3BUeXBlcy5ib29sLFxyXG5cclxuICAgIC8vIFRyYW5zaXRpb24gZHVyYXRpb25cclxuICAgIGFwcGVhclRpbWVvdXQ6IFByb3BUeXBlcy5udW1iZXIsXHJcbiAgICBlbnRlclRpbWVvdXQ6IFByb3BUeXBlcy5udW1iZXIsXHJcbiAgICBsZWF2ZVRpbWVvdXQ6IFByb3BUeXBlcy5udW1iZXIsXHJcblxyXG4gICAgLy8gVHJhbnNpdGlvbiBjc3MgY2xhc3NOYW1lLlxyXG4gICAgYXBwZWFyTmFtZTogUHJvcFR5cGVzLnN0cmluZyxcclxuICAgIGFwcGVhckFjdGl2ZU5hbWU6IFByb3BUeXBlcy5zdHJpbmcsXHJcbiAgICBlbnRlck5hbWU6IFByb3BUeXBlcy5zdHJpbmcsXHJcbiAgICBlbnRlckFjdGl2ZU5hbWU6IFByb3BUeXBlcy5zdHJpbmcsXHJcbiAgICBsZWF2ZU5hbWU6IFByb3BUeXBlcy5zdHJpbmcsXHJcbiAgICBsZWF2ZUFjdGl2ZU5hbWU6IFByb3BUeXBlcy5zdHJpbmcsXHJcbiAgICB0cmFuc2l0aW9uTmFtZTogUHJvcFR5cGVzLnN0cmluZ1xyXG59O1xyXG5cclxuY29uc3QgZGVmYXVsdFByb3BzID0ge1xyXG4gICAgY3VzdG9tQ2xhc3NlczogdHJ1ZSxcclxuXHJcbiAgICBhcHBlYXI6IHRydWUsXHJcbiAgICBlbnRlcjogdHJ1ZSxcclxuICAgIGxlYXZlOiB0cnVlLFxyXG5cclxuICAgIGFwcGVhclRpbWVvdXQ6IDUwMCxcclxuICAgIGVudGVyVGltZW91dDogNTAwLFxyXG4gICAgbGVhdmVUaW1lb3V0OiA1MDAsXHJcblxyXG4gICAgYXBwZWFyTmFtZTogJ2JvdW5jZScsXHJcbiAgICBhcHBlYXJBY3RpdmVOYW1lOiAnYm91bmNlJyxcclxuICAgIGVudGVyTmFtZTogJ2JvdW5jZScsXHJcbiAgICBlbnRlckFjdGl2ZU5hbWU6ICdib3VuY2UnLFxyXG4gICAgbGVhdmVOYW1lOiAnYm91bmNlT3V0JyxcclxuICAgIGxlYXZlQWN0aXZlTmFtZTogJ2JvdW5jZU91dCdcclxufTtcclxuXHJcblxyXG5mdW5jdGlvbiBBbmltYXRpb24oe2N1c3RvbUNsYXNzZXMsIGFwcGVhciwgZW50ZXIsIGxlYXZlLCBhcHBlYXJOYW1lLFxyXG4gIGFwcGVhckFjdGl2ZU5hbWUsIGVudGVyTmFtZSwgZW50ZXJBY3RpdmVOYW1lLGxlYXZlTmFtZSwgbGVhdmVBY3RpdmVOYW1lLFxyXG4gIGFwcGVhclRpbWVvdXQsIGVudGVyVGltZW91dCwgbGVhdmVUaW1lb3V0LCB0cmFuc2l0aW9uTmFtZSwgLi4ub3RoZXJQcm9wc30pIHtcclxuICAgIGxldCB0cmFuc2l0aW9uQ2xhc3NOYW1lID0gdHJhbnNpdGlvbk5hbWU7XHJcbiAgICBpZih0cnVlID09PSBjdXN0b21DbGFzc2VzKSB7XHJcbiAgICAgICAgdHJhbnNpdGlvbkNsYXNzTmFtZSA9IHtcclxuICAgICAgICAgICAgYXBwZWFyOiBhcHBlYXJOYW1lLFxyXG4gICAgICAgICAgICBhcHBlYXJBY3RpdmU6IGFwcGVhckFjdGl2ZU5hbWUsXHJcbiAgICAgICAgICAgIGVudGVyOiBlbnRlck5hbWUsXHJcbiAgICAgICAgICAgIGVudGVyQWN0aXZlOiBlbnRlckFjdGl2ZU5hbWUsXHJcbiAgICAgICAgICAgIGxlYXZlOiBsZWF2ZU5hbWUsXHJcbiAgICAgICAgICAgIGxlYXZlQWN0aXZlOiBsZWF2ZUFjdGl2ZU5hbWVcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8UmVhY3RDU1NUcmFuc2l0aW9uR3JvdXBcclxuICAgICAgICAgIHRyYW5zaXRpb25BcHBlYXI9e2FwcGVhcn1cclxuICAgICAgICAgIHRyYW5zaXRpb25BcHBlYXJUaW1lb3V0PXtlbnRlcn1cclxuICAgICAgICAgIHRyYW5zaXRpb25FbnRlcj17bGVhdmV9XHJcbiAgICAgICAgICB0cmFuc2l0aW9uRW50ZXJUaW1lb3V0PXthcHBlYXJUaW1lb3V0fVxyXG4gICAgICAgICAgdHJhbnNpdGlvbkxlYXZlPXtlbnRlclRpbWVvdXR9XHJcbiAgICAgICAgICB0cmFuc2l0aW9uTGVhdmVUaW1lb3V0PXtsZWF2ZVRpbWVvdXR9XHJcbiAgICAgICAgICB0cmFuc2l0aW9uTmFtZT17dHJhbnNpdGlvbkNsYXNzTmFtZX1cclxuICAgICAgPlxyXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2FuaW1hdGVkJz5cclxuICAgICAgICAgICAge290aGVyUHJvcHMuY2hpbGRyZW59XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9SZWFjdENTU1RyYW5zaXRpb25Hcm91cD5cclxuICAgICk7XHJcbn1cclxuXHJcbi8vU3RhdGljIHByb3BzLlxyXG5BbmltYXRpb24uZGlzcGxheU5hbWUgPSAnYW5pbWF0aW9uJztcclxuQW5pbWF0aW9uLmRlZmF1bHRQcm9wcyA9IGRlZmF1bHRQcm9wcztcclxuQW5pbWF0aW9uLnByb3BUeXBlcyA9IHByb3BUeXBlcztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEFuaW1hdGlvbjtcclxuIl19