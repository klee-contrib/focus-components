'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; // Dependencies

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _builder = require('focus-core/component/builder');

var _builder2 = _interopRequireDefault(_builder);

var _types = require('focus-core/component/types');

var _types2 = _interopRequireDefault(_types);

var _exception = require('focus-core/exception');

var _find = require('lodash/collection/find');

var _find2 = _interopRequireDefault(_find);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
* Small overlay component used to listen to scroll and prevent it to leave the Popin component
*/
var Overlay = _react2.default.createClass({
    displayName: 'PopinOverlay',
    propTypes: {
        children: _react.PropTypes.object,
        clickHandler: _react.PropTypes.func,
        show: _react.PropTypes.bool
    },
    getDefaultProps: function getDefaultProps() {
        return { show: false };
    },

    /**
    * Store the body overgflow property, and set it to hidden
    * @private
    */
    _hideBodyOverflow: function _hideBodyOverflow() {
        document.body.style['overflow-y'] = 'hidden';
    },

    /**
    * Restore body overflow property
    * @private
    */
    _restoreBodyOverflow: function _restoreBodyOverflow() {
        document.body.style['overflow-y'] = 'auto';
    },

    /**
    * Component will unmount event handler.
    * Remove the mouse wheel listener.
    */
    componentWillUnmount: function componentWillUnmount() {
        // ReactDOM.findDOMNode(this.refs.overlay).removeEventListener('mousewheel', this._onScroll);
        this._restoreBodyOverflow();
    },

    /**
    * Render the component
    * @return {XML} the rendered HTML
    */
    render: function render() {
        var _props = this.props,
            children = _props.children,
            clickHandler = _props.clickHandler,
            show = _props.show;

        return _react2.default.createElement(
            'div',
            { className: 'animated fadeIn', 'data-animation': 'fadeIn', 'data-closing-animation': 'fadeOut', 'data-focus': 'popin-overlay', 'data-visible': show, onClick: clickHandler, ref: 'overlay' },
            children
        );
    }
});

/**
* The popin component configuration
* @type {Object}
*/
var popin = {
    /**
    * Init the component.
    * The popin is closed by default.
    * @return {Object} the initial state
    */
    getInitialState: function getInitialState() {
        return {
            opened: this.props.open
        };
    },

    /**
    * Init the props if not provided.
    * By default, a popin is full, medium and modal.
    * @return {Object} the default props
    */
    getDefaultProps: function getDefaultProps() {
        return {
            modal: true,
            size: 'medium',
            type: 'full',
            level: 0,
            overlay: true,
            open: false
        };
    },

    /**
    * Helper attribute, for React debugging
    */
    displayName: 'Popin',
    /**
    * Properties validation
    */
    propTypes: {
        modal: (0, _types2.default)('bool'),
        size: (0, _types2.default)('string'),
        types: (0, _types2.default)('string'),
        level: (0, _types2.default)('number'),
        overlay: (0, _types2.default)('bool'),
        open: (0, _types2.default)('bool')
    },
    /**
    * Wheel event handler.
    * @param  {object} event wheel event
    */
    _onWheel: function _onWheel(event) {
        _reactDom2.default.findDOMNode(this.refs['popin-window']).scrollTop += 0 < event.deltaY ? 100 : -100;
    },

    /**
    * Toggle the popin's open state
    */
    toggleOpen: function toggleOpen() {
        var _this = this;

        var timeout = 0;
        var opened = this.state.opened;
        var onPopinClose = this.props.onPopinClose;

        if (opened) {
            var popinWindow = _reactDom2.default.findDOMNode(this.refs['popin-window']);
            var popinOverlay = _reactDom2.default.findDOMNode(this.refs['popin-overlay']);
            popinWindow.classList.remove(popinWindow.getAttribute('data-animation'));
            popinWindow.classList.add(popinWindow.getAttribute('data-closing-animation'));
            popinOverlay.classList.remove(popinOverlay.getAttribute('data-animation'));
            popinOverlay.classList.add(popinOverlay.getAttribute('data-closing-animation'));
            timeout = 200;
        }
        if (opened && onPopinClose) {
            onPopinClose();
        }
        this._openTimeoutID = setTimeout(function () {
            // Store the current popin state
            var wasOpened = _this.state.opened;
            // If it was  opened, then we are closing it, so restore the body overflow before closing.
            if (wasOpened && _this.refs['popin-overlay']) {
                _this.refs['popin-overlay']._restoreBodyOverflow();
            }
            _this.setState({
                opened: !wasOpened
            }, function () {
                if (_this.refs['popin-overlay']) {
                    if (!wasOpened) {
                        // We just opened the popin, so store and hide the body overflow.
                        _this.refs['popin-overlay']._hideBodyOverflow();
                    }
                }
            });
        }, timeout);
    },
    componentWillUnmount: function componentWillUnmount() {
        window.clearTimeout(this._openTimeoutID);
    },

    /**
    * Render the component
    * @return {XML} the rendered HTML
    */
    render: function render() {
        // test for this.state.opened and return an Overlay component if true
        var _props2 = this.props,
            type = _props2.type,
            level = _props2.level,
            modal = _props2.modal,
            overlay = _props2.overlay,
            children = _props2.children;

        return _react2.default.createElement(
            'div',
            { 'data-focus': 'popin', 'data-level': level, 'data-size': this._validateSize(), 'data-type': type },
            this.state.opened && _react2.default.createElement(
                Overlay,
                { clickHandler: modal && this.toggleOpen, ref: 'popin-overlay', resize: 'full' === type, show: overlay },
                _react2.default.createElement(
                    'div',
                    _extends({}, this._getAnimationProps(), { 'data-focus': 'popin-window', onClick: this._preventPopinClose, ref: 'popin-window' }),
                    _react2.default.createElement(
                        'i',
                        { className: 'material-icons', 'data-focus': 'popin-window-close', onClick: this.toggleOpen },
                        'close'
                    ),
                    _react2.default.createElement(
                        'div',
                        { onWheel: this._onWheel },
                        children
                    )
                )
            )
        );
    },

    /**
    * Compute the animation classes
    * @return {Object} the props to attach to the component
    * @private
    */
    _getAnimationProps: function _getAnimationProps() {
        var openingAnimation = void 0;
        var closingAnimation = void 0;
        switch (this.props.type) {
            case 'from-menu':
                openingAnimation = 'slideInLeft';
                closingAnimation = 'slideOutLeft';
                break;
            case 'from-right':
                openingAnimation = 'slideInRight';
                closingAnimation = 'slideOutRight';
                break;
            default:
                openingAnimation = 'zoomIn';
                closingAnimation = 'zoomOut';
                break;
        }
        return {
            className: 'animated ' + openingAnimation,
            'data-animation': openingAnimation,
            'data-closing-animation': closingAnimation
        };
    },

    /**
    * Validate the optional given size
    * @return {string} the validated size
    * @private
    */
    _validateSize: function _validateSize() {
        var _this2 = this;

        if (!(0, _find2.default)(['small', 'medium', 'large'], function (arg) {
            return arg === _this2.props.size;
        })) {
            throw new _exception.ArgumentInvalidException('Please provide a valid popin size among small, medium and large. Provided ' + this.props.size);
        }
        return this.props.size;
    },

    /**
    * Prevent popin close when there's a click on the popin window
    * @param {Object} event - raised by the click
    * @private
    */
    _preventPopinClose: function _preventPopinClose(event) {
        event.stopPropagation();
    }
};

module.exports = (0, _builder2.default)(popin);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJPdmVybGF5IiwiY3JlYXRlQ2xhc3MiLCJkaXNwbGF5TmFtZSIsInByb3BUeXBlcyIsImNoaWxkcmVuIiwib2JqZWN0IiwiY2xpY2tIYW5kbGVyIiwiZnVuYyIsInNob3ciLCJib29sIiwiZ2V0RGVmYXVsdFByb3BzIiwiX2hpZGVCb2R5T3ZlcmZsb3ciLCJkb2N1bWVudCIsImJvZHkiLCJzdHlsZSIsIl9yZXN0b3JlQm9keU92ZXJmbG93IiwiY29tcG9uZW50V2lsbFVubW91bnQiLCJyZW5kZXIiLCJwcm9wcyIsInBvcGluIiwiZ2V0SW5pdGlhbFN0YXRlIiwib3BlbmVkIiwib3BlbiIsIm1vZGFsIiwic2l6ZSIsInR5cGUiLCJsZXZlbCIsIm92ZXJsYXkiLCJ0eXBlcyIsIl9vbldoZWVsIiwiZXZlbnQiLCJmaW5kRE9NTm9kZSIsInJlZnMiLCJzY3JvbGxUb3AiLCJkZWx0YVkiLCJ0b2dnbGVPcGVuIiwidGltZW91dCIsInN0YXRlIiwib25Qb3BpbkNsb3NlIiwicG9waW5XaW5kb3ciLCJwb3Bpbk92ZXJsYXkiLCJjbGFzc0xpc3QiLCJyZW1vdmUiLCJnZXRBdHRyaWJ1dGUiLCJhZGQiLCJfb3BlblRpbWVvdXRJRCIsInNldFRpbWVvdXQiLCJ3YXNPcGVuZWQiLCJzZXRTdGF0ZSIsIndpbmRvdyIsImNsZWFyVGltZW91dCIsIl92YWxpZGF0ZVNpemUiLCJfZ2V0QW5pbWF0aW9uUHJvcHMiLCJfcHJldmVudFBvcGluQ2xvc2UiLCJvcGVuaW5nQW5pbWF0aW9uIiwiY2xvc2luZ0FuaW1hdGlvbiIsImNsYXNzTmFtZSIsImFyZyIsInN0b3BQcm9wYWdhdGlvbiIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7O2tRQUFBOztBQUVBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7OztBQUNBOzs7QUFHQSxJQUFNQSxVQUFVLGdCQUFNQyxXQUFOLENB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c0NBQTBCQztBQUh0QixTQUFSO0FBS0gsS0F6SVM7O0FBMElWOzs7OztBQUtBSixpQkEvSVUsMkJBK0lNO0FBQUE7O0FBQ1osWUFBSSxDQUFDLG9CQUFLLENBQUMsT0FBRCxFQUFVLFFBQVYsRUFBb0IsT0FBcEIsQ0FBTCxFQUFtQztBQUFBLG1CQUFPTSxRQUFRLE9BQUt2QyxLQUFMLENBQVdNLElBQTFCO0FBQUEsU0FBbkMsQ0FBTCxFQUF5RTtBQUNyRSxrQkFBTSx3Q0FBNkIsK0VBQStFLEtBQUtOLEtBQUwsQ0FBV00sSUFBdkgsQ0FBTjtBQUNIO0FBQ0QsZUFBTyxLQUFLTixLQUFMLENBQVdNLElBQWxCO0FBQ0gsS0FwSlM7O0FBcUpWOzs7OztBQUtBNkIsc0JBMUpVLDhCQTBKU3ZCLEtBMUpULEVBMEpnQjtBQUN0QkEsY0FBTTRCLGVBQU47QUFDSDtBQTVKUyxDQUFkOztBQStKQUMsT0FBT0MsT0FBUCxHQUFpQix1QkFBUXpDLEtBQVIsQ0FBakIiLCJmaWxlIjoiaXMtcmVhY3QtY2xhc3MtY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gRGVwZW5kZW5jaWVzXG5cbmltcG9ydCBSZWFjdCwge1Byb3BUeXBlc30gZnJvbSAncmVhY3QnO1xuaW1wb3J0IFJlYWN0RE9NIGZyb20gJ3JlYWN0LWRvbSc7XG5pbXBvcnQgYnVpbGRlciBmcm9tICdmb2N1cy1jb3JlL2NvbXBvbmVudC9idWlsZGVyJztcbmltcG9ydCB0eXBlcyBmcm9tICdmb2N1cy1jb3JlL2NvbXBvbmVudC90eXBlcyc7XG5pbXBvcnQge0FyZ3VtZW50SW52YWxpZEV4Y2VwdGlvbn0gZnJvbSAnZm9jdXMtY29yZS9leGNlcHRpb24nO1xuaW1wb3J0IGZpbmQgZnJvbSAnbG9kYXNoL2NvbGxlY3Rpb24vZmluZCc7XG4vKipcbiogU21hbGwgb3ZlcmxheSBjb21wb25lbnQgdXNlZCB0byBsaXN0ZW4gdG8gc2Nyb2xsIGFuZCBwcmV2ZW50IGl0IHRvIGxlYXZlIHRoZSBQb3BpbiBjb21wb25lbnRcbiovXG5jb25zdCBPdmVybGF5ID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICAgIGRpc3BsYXlOYW1lOiAnUG9waW5PdmVybGF5JyxcbiAgICBwcm9wVHlwZXM6IHtcbiAgICAgICAgY2hpbGRyZW46IFByb3BUeXBlcy5vYmplY3QsXG4gICAgICAgIGNsaWNrSGFuZGxlcjogUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgIHNob3c6IFByb3BUeXBlcy5ib29sXG4gICAgfSxcbiAgICBnZXREZWZhdWx0UHJvcHMoKSB7XG4gICAgICAgIHJldHVybiB7c2hvdzogZmFsc2V9O1xuICAgIH0sXG4gICAgLyoqXG4gICAgKiBTdG9yZSB0aGUgYm9keSBvdmVyZ2Zsb3cgcHJvcGVydHksIGFuZCBzZXQgaXQgdG8gaGlkZGVuXG4gICAgKiBAcHJpdmF0ZVxuICAgICovXG4gICAgX2hpZGVCb2R5T3ZlcmZsb3coKSB7XG4gICAgICAgIGRvY3VtZW50LmJvZHkuc3R5bGVbJ292ZXJmbG93LXknXSA9ICdoaWRkZW4nO1xuICAgIH0sXG4gICAgLyoqXG4gICAgKiBSZXN0b3JlIGJvZHkgb3ZlcmZsb3cgcHJvcGVydHlcbiAgICAqIEBwcml2YXRlXG4gICAgKi9cbiAgICBfcmVzdG9yZUJvZHlPdmVyZmxvdygpIHtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5zdHlsZVsnb3ZlcmZsb3cteSddID0gJ2F1dG8nO1xuICAgIH0sXG4gICAgLyoqXG4gICAgKiBDb21wb25lbnQgd2lsbCB1bm1vdW50IGV2ZW50IGhhbmRsZXIuXG4gICAgKiBSZW1vdmUgdGhlIG1vdXNlIHdoZWVsIGxpc3RlbmVyLlxuICAgICovXG4gICAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgICAgIC8vIFJlYWN0RE9NLmZpbmRET01Ob2RlKHRoaXMucmVmcy5vdmVybGF5KS5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZXdoZWVsJywgdGhpcy5fb25TY3JvbGwpO1xuICAgICAgICB0aGlzLl9yZXN0b3JlQm9keU92ZXJmbG93KCk7XG4gICAgfSxcbiAgICAvKipcbiAgICAqIFJlbmRlciB0aGUgY29tcG9uZW50XG4gICAgKiBAcmV0dXJuIHtYTUx9IHRoZSByZW5kZXJlZCBIVE1MXG4gICAgKi9cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGNvbnN0IHtjaGlsZHJlbiwgY2xpY2tIYW5kbGVyLCBzaG93fSA9IHRoaXMucHJvcHM7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nYW5pbWF0ZWQgZmFkZUluJyBkYXRhLWFuaW1hdGlvbj0nZmFkZUluJyBkYXRhLWNsb3NpbmctYW5pbWF0aW9uPSdmYWRlT3V0JyBkYXRhLWZvY3VzPSdwb3Bpbi1vdmVybGF5JyBkYXRhLXZpc2libGU9e3Nob3d9IG9uQ2xpY2s9e2NsaWNrSGFuZGxlcn0gcmVmPSdvdmVybGF5Jz5cbiAgICAgICAgICAgICAgICB7Y2hpbGRyZW59XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59KTtcblxuLyoqXG4qIFRoZSBwb3BpbiBjb21wb25lbnQgY29uZmlndXJhdGlvblxuKiBAdHlwZSB7T2JqZWN0fVxuKi9cbmNvbnN0IHBvcGluID0ge1xuICAgIC8qKlxuICAgICogSW5pdCB0aGUgY29tcG9uZW50LlxuICAgICogVGhlIHBvcGluIGlzIGNsb3NlZCBieSBkZWZhdWx0LlxuICAgICogQHJldHVybiB7T2JqZWN0fSB0aGUgaW5pdGlhbCBzdGF0ZVxuICAgICovXG4gICAgZ2V0SW5pdGlhbFN0YXRlKCkge1xuICAgICAgICByZXR1cm4gKHtcbiAgICAgICAgICAgIG9wZW5lZDogdGhpcy5wcm9wcy5vcGVuXG4gICAgICAgIH0pO1xuICAgIH0sXG4gICAgLyoqXG4gICAgKiBJbml0IHRoZSBwcm9wcyBpZiBub3QgcHJvdmlkZWQuXG4gICAgKiBCeSBkZWZhdWx0LCBhIHBvcGluIGlzIGZ1bGwsIG1lZGl1bSBhbmQgbW9kYWwuXG4gICAgKiBAcmV0dXJuIHtPYmplY3R9IHRoZSBkZWZhdWx0IHByb3BzXG4gICAgKi9cbiAgICBnZXREZWZhdWx0UHJvcHMoKSB7XG4gICAgICAgIHJldHVybiAoe1xuICAgICAgICAgICAgbW9kYWw6IHRydWUsXG4gICAgICAgICAgICBzaXplOiAnbWVkaXVtJyxcbiAgICAgICAgICAgIHR5cGU6ICdmdWxsJyxcbiAgICAgICAgICAgIGxldmVsOiAwLFxuICAgICAgICAgICAgb3ZlcmxheTogdHJ1ZSxcbiAgICAgICAgICAgIG9wZW46IGZhbHNlXG4gICAgICAgIH0pO1xuICAgIH0sXG4gICAgLyoqXG4gICAgKiBIZWxwZXIgYXR0cmlidXRlLCBmb3IgUmVhY3QgZGVidWdnaW5nXG4gICAgKi9cbiAgICBkaXNwbGF5TmFtZTogJ1BvcGluJyxcbiAgICAvKipcbiAgICAqIFByb3BlcnRpZXMgdmFsaWRhdGlvblxuICAgICovXG4gICAgcHJvcFR5cGVzOiB7XG4gICAgICAgIG1vZGFsOiB0eXBlcygnYm9vbCcpLFxuICAgICAgICBzaXplOiB0eXBlcygnc3RyaW5nJyksXG4gICAgICAgIHR5cGVzOiB0eXBlcygnc3RyaW5nJyksXG4gICAgICAgIGxldmVsOiB0eXBlcygnbnVtYmVyJyksXG4gICAgICAgIG92ZXJsYXk6IHR5cGVzKCdib29sJyksXG4gICAgICAgIG9wZW46IHR5cGVzKCdib29sJylcbiAgICB9LFxuICAgIC8qKlxuICAgICogV2hlZWwgZXZlbnQgaGFuZGxlci5cbiAgICAqIEBwYXJhbSAge29iamVjdH0gZXZlbnQgd2hlZWwgZXZlbnRcbiAgICAqL1xuICAgIF9vbldoZWVsKGV2ZW50KSB7XG4gICAgICAgIFJlYWN0RE9NLmZpbmRET01Ob2RlKHRoaXMucmVmc1sncG9waW4td2luZG93J10pLnNjcm9sbFRvcCArPSAwIDwgZXZlbnQuZGVsdGFZID8gMTAwIDogLTEwMDtcbiAgICB9LFxuICAgIC8qKlxuICAgICogVG9nZ2xlIHRoZSBwb3BpbidzIG9wZW4gc3RhdGVcbiAgICAqL1xuICAgIHRvZ2dsZU9wZW4oKSB7XG4gICAgICAgIGxldCB0aW1lb3V0ID0gMDtcbiAgICAgICAgY29uc3Qge29wZW5lZH0gPSB0aGlzLnN0YXRlO1xuICAgICAgICBjb25zdCB7b25Qb3BpbkNsb3NlfSA9IHRoaXMucHJvcHM7XG4gICAgICAgIGlmIChvcGVuZWQpIHtcbiAgICAgICAgICAgIGNvbnN0IHBvcGluV2luZG93ID0gUmVhY3RET00uZmluZERPTU5vZGUodGhpcy5yZWZzWydwb3Bpbi13aW5kb3cnXSk7XG4gICAgICAgICAgICBjb25zdCBwb3Bpbk92ZXJsYXkgPSBSZWFjdERPTS5maW5kRE9NTm9kZSh0aGlzLnJlZnNbJ3BvcGluLW92ZXJsYXknXSk7XG4gICAgICAgICAgICBwb3BpbldpbmRvdy5jbGFzc0xpc3QucmVtb3ZlKHBvcGluV2luZG93LmdldEF0dHJpYnV0ZSgnZGF0YS1hbmltYXRpb24nKSk7XG4gICAgICAgICAgICBwb3BpbldpbmRvdy5jbGFzc0xpc3QuYWRkKHBvcGluV2luZG93LmdldEF0dHJpYnV0ZSgnZGF0YS1jbG9zaW5nLWFuaW1hdGlvbicpKTtcbiAgICAgICAgICAgIHBvcGluT3ZlcmxheS5jbGFzc0xpc3QucmVtb3ZlKHBvcGluT3ZlcmxheS5nZXRBdHRyaWJ1dGUoJ2RhdGEtYW5pbWF0aW9uJykpO1xuICAgICAgICAgICAgcG9waW5PdmVybGF5LmNsYXNzTGlzdC5hZGQocG9waW5PdmVybGF5LmdldEF0dHJpYnV0ZSgnZGF0YS1jbG9zaW5nLWFuaW1hdGlvbicpKTtcbiAgICAgICAgICAgIHRpbWVvdXQgPSAyMDA7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG9wZW5lZCAmJiBvblBvcGluQ2xvc2UpIHtcbiAgICAgICAgICAgIG9uUG9waW5DbG9zZSgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX29wZW5UaW1lb3V0SUQgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIC8vIFN0b3JlIHRoZSBjdXJyZW50IHBvcGluIHN0YXRlXG4gICAgICAgICAgICBjb25zdCB3YXNPcGVuZWQgPSB0aGlzLnN0YXRlLm9wZW5lZDtcbiAgICAgICAgICAgIC8vIElmIGl0IHdhcyAgb3BlbmVkLCB0aGVuIHdlIGFyZSBjbG9zaW5nIGl0LCBzbyByZXN0b3JlIHRoZSBib2R5IG92ZXJmbG93IGJlZm9yZSBjbG9zaW5nLlxuICAgICAgICAgICAgaWYgKHdhc09wZW5lZCAmJiB0aGlzLnJlZnNbJ3BvcGluLW92ZXJsYXknXSkge1xuICAgICAgICAgICAgICAgIHRoaXMucmVmc1sncG9waW4tb3ZlcmxheSddLl9yZXN0b3JlQm9keU92ZXJmbG93KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgICAgICBvcGVuZWQ6ICF3YXNPcGVuZWRcbiAgICAgICAgICAgIH0sICgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5yZWZzWydwb3Bpbi1vdmVybGF5J10pIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF3YXNPcGVuZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFdlIGp1c3Qgb3BlbmVkIHRoZSBwb3Bpbiwgc28gc3RvcmUgYW5kIGhpZGUgdGhlIGJvZHkgb3ZlcmZsb3cuXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlZnNbJ3BvcGluLW92ZXJsYXknXS5faGlkZUJvZHlPdmVyZmxvdygpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sIHRpbWVvdXQpO1xuICAgIH0sXG4gICAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgICAgIHdpbmRvdy5jbGVhclRpbWVvdXQodGhpcy5fb3BlblRpbWVvdXRJRCk7XG4gICAgfSxcbiAgICAvKipcbiAgICAqIFJlbmRlciB0aGUgY29tcG9uZW50XG4gICAgKiBAcmV0dXJuIHtYTUx9IHRoZSByZW5kZXJlZCBIVE1MXG4gICAgKi9cbiAgICByZW5kZXIoKSB7IC8vIHRlc3QgZm9yIHRoaXMuc3RhdGUub3BlbmVkIGFuZCByZXR1cm4gYW4gT3ZlcmxheSBjb21wb25lbnQgaWYgdHJ1ZVxuICAgICAgICBjb25zdCB7dHlwZSwgbGV2ZWwsIG1vZGFsLCBvdmVybGF5LCBjaGlsZHJlbn0gPSB0aGlzLnByb3BzO1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBkYXRhLWZvY3VzPSdwb3BpbicgZGF0YS1sZXZlbD17bGV2ZWx9IGRhdGEtc2l6ZT17dGhpcy5fdmFsaWRhdGVTaXplKCl9IGRhdGEtdHlwZT17dHlwZX0gPlxuICAgICAgICAgICAgICAgIHt0aGlzLnN0YXRlLm9wZW5lZCAmJlxuICAgICAgICAgICAgICAgICAgICA8T3ZlcmxheSBjbGlja0hhbmRsZXI9e21vZGFsICYmIHRoaXMudG9nZ2xlT3Blbn0gcmVmPSdwb3Bpbi1vdmVybGF5JyByZXNpemU9eydmdWxsJyA9PT0gdHlwZX0gc2hvdz17b3ZlcmxheX0+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHsuLi50aGlzLl9nZXRBbmltYXRpb25Qcm9wcygpfSBkYXRhLWZvY3VzPSdwb3Bpbi13aW5kb3cnIG9uQ2xpY2s9e3RoaXMuX3ByZXZlbnRQb3BpbkNsb3NlfSByZWY9J3BvcGluLXdpbmRvdyc+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3NOYW1lPSdtYXRlcmlhbC1pY29ucycgZGF0YS1mb2N1cz0ncG9waW4td2luZG93LWNsb3NlJyBvbkNsaWNrPXt0aGlzLnRvZ2dsZU9wZW59PmNsb3NlPC9pPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgb25XaGVlbD17dGhpcy5fb25XaGVlbH0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtjaGlsZHJlbn1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L092ZXJsYXk+XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfSxcbiAgICAvKipcbiAgICAqIENvbXB1dGUgdGhlIGFuaW1hdGlvbiBjbGFzc2VzXG4gICAgKiBAcmV0dXJuIHtPYmplY3R9IHRoZSBwcm9wcyB0byBhdHRhY2ggdG8gdGhlIGNvbXBvbmVudFxuICAgICogQHByaXZhdGVcbiAgICAqL1xuICAgIF9nZXRBbmltYXRpb25Qcm9wcygpIHtcbiAgICAgICAgbGV0IG9wZW5pbmdBbmltYXRpb247XG4gICAgICAgIGxldCBjbG9zaW5nQW5pbWF0aW9uO1xuICAgICAgICBzd2l0Y2ggKHRoaXMucHJvcHMudHlwZSkge1xuICAgICAgICAgICAgY2FzZSAnZnJvbS1tZW51JzpcbiAgICAgICAgICAgICAgICBvcGVuaW5nQW5pbWF0aW9uID0gJ3NsaWRlSW5MZWZ0JztcbiAgICAgICAgICAgICAgICBjbG9zaW5nQW5pbWF0aW9uID0gJ3NsaWRlT3V0TGVmdCc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdmcm9tLXJpZ2h0JzpcbiAgICAgICAgICAgICAgICBvcGVuaW5nQW5pbWF0aW9uID0gJ3NsaWRlSW5SaWdodCc7XG4gICAgICAgICAgICAgICAgY2xvc2luZ0FuaW1hdGlvbiA9ICdzbGlkZU91dFJpZ2h0JztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgb3BlbmluZ0FuaW1hdGlvbiA9ICd6b29tSW4nO1xuICAgICAgICAgICAgICAgIGNsb3NpbmdBbmltYXRpb24gPSAnem9vbU91dCc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuICh7XG4gICAgICAgICAgICBjbGFzc05hbWU6IGBhbmltYXRlZCAke29wZW5pbmdBbmltYXRpb259YCxcbiAgICAgICAgICAgICdkYXRhLWFuaW1hdGlvbic6IG9wZW5pbmdBbmltYXRpb24sXG4gICAgICAgICAgICAnZGF0YS1jbG9zaW5nLWFuaW1hdGlvbic6IGNsb3NpbmdBbmltYXRpb25cbiAgICAgICAgfSk7XG4gICAgfSxcbiAgICAvKipcbiAgICAqIFZhbGlkYXRlIHRoZSBvcHRpb25hbCBnaXZlbiBzaXplXG4gICAgKiBAcmV0dXJuIHtzdHJpbmd9IHRoZSB2YWxpZGF0ZWQgc2l6ZVxuICAgICogQHByaXZhdGVcbiAgICAqL1xuICAgIF92YWxpZGF0ZVNpemUoKSB7XG4gICAgICAgIGlmICghZmluZChbJ3NtYWxsJywgJ21lZGl1bScsICdsYXJnZSddLCBhcmcgPT4gYXJnID09PSB0aGlzLnByb3BzLnNpemUpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnRJbnZhbGlkRXhjZXB0aW9uKCdQbGVhc2UgcHJvdmlkZSBhIHZhbGlkIHBvcGluIHNpemUgYW1vbmcgc21hbGwsIG1lZGl1bSBhbmQgbGFyZ2UuIFByb3ZpZGVkICcgKyB0aGlzLnByb3BzLnNpemUpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLnByb3BzLnNpemU7XG4gICAgfSxcbiAgICAvKipcbiAgICAqIFByZXZlbnQgcG9waW4gY2xvc2Ugd2hlbiB0aGVyZSdzIGEgY2xpY2sgb24gdGhlIHBvcGluIHdpbmRvd1xuICAgICogQHBhcmFtIHtPYmplY3R9IGV2ZW50IC0gcmFpc2VkIGJ5IHRoZSBjbGlja1xuICAgICogQHByaXZhdGVcbiAgICAqL1xuICAgIF9wcmV2ZW50UG9waW5DbG9zZShldmVudCkge1xuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGJ1aWxkZXIocG9waW4pO1xuIl19