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
            children = _props2.children,
            modalTitleId = _props2.modalTitleId;


        var optionnalModalProps = {};
        if (modalTitleId) {
            optionnalModalProps['aria-labelledby'] = modalTitleId;
        }
        return _react2.default.createElement(
            'div',
            { 'data-focus': 'popin', 'data-level': level, 'data-size': this._validateSize(), 'data-type': type },
            this.state.opened && _react2.default.createElement(
                Overlay,
                { clickHandler: modal && this.toggleOpen, ref: 'popin-overlay', resize: 'full' === type, show: overlay },
                _react2.default.createElement(
                    'div',
                    _extends({}, this._getAnimationProps(), { 'data-focus': 'popin-window', role: 'dialog', onClick: this._preventPopinClose, ref: 'popin-window' }),
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

        if (!['small', 'medium', 'large'].find(function (size) {
            return size === _this2.props.size;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJPdmVybGF5IiwiY3JlYXRlQ2xhc3MiLCJkaXNwbGF5TmFtZSIsInByb3BUeXBlcyIsImNoaWxkcmVuIiwib2JqZWN0IiwiY2xpY2tIYW5kbGVyIiwiZnVuYyIsInNob3ciLCJib29sIiwiZ2V0RGVmYXVsdFByb3BzIiwiX2hpZGVCb2R5T3ZlcmZsb3ciLCJkb2N1bWVudCIsImJvZHkiLCJzdHlsZSIsIl9yZXN0b3JlQm9keU92ZXJmbG93IiwiY29tcG9uZW50V2lsbFVubW91bnQiLCJyZW5kZXIiLCJwcm9wcyIsInBvcGluIiwiZ2V0SW5pdGlhbFN0YXRlIiwib3BlbmVkIiwib3BlbiIsIm1vZGFsIiwic2l6ZSIsInR5cGUiLCJsZXZlbCIsIm92ZXJsYXkiLCJ0eXBlcyIsIl9vbldoZWVsIiwiZXZlbnQiLCJmaW5kRE9NTm9kZSIsInJlZnMiLCJzY3JvbGxUb3AiLCJkZWx0YVkiLCJ0b2dnbGVPcGVuIiwidGltZW91dCIsInN0YXRlIiwib25Qb3BpbkNsb3NlIiwicG9waW5XaW5kb3ciLCJwb3Bpbk92ZXJsYXkiLCJjbGFzc0xpc3QiLCJyZW1vdmUiLCJnZXRBdHRyaWJ1dGUiLCJhZGQiLCJfb3BlblRpbWVvdXRJRCIsInNldFRpbWVvdXQiLCJ3YXNPcGVuZWQiLCJzZXRTdGF0ZSIsIndpbmRvdyIsImNsZWFyVGltZW91dCIsIm1vZGFsVGl0bGVJZCIsIm9wdGlvbm5hbE1vZGFsUHJvcHMiLCJfdmFsaWRhdGVTaXplIiwiX2dldEFuaW1hdGlvblByb3BzIiwiX3ByZXZlbnRQb3BpbkNsb3NlIiwib3BlbmluZ0FuaW1hdGlvbiIsImNsb3NpbmdBbmltYXRpb24iLCJjbGFzc05hbWUiLCJmaW5kIiwic3RvcFByb3BhZ2F0aW9uIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7a1FBQUE7O0FBRUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUVBOzs7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SixpQkFBSyxZQUFMO0FBQ0lELG1DQUFtQixjQUFuQjtBQUNBQyxtQ0FBbUIsZUFBbkI7QUFDQTtBQUNKO0FBQ0lELG1DQUFtQixRQUFuQjtBQUNBQyxtQ0FBbUIsU0FBbkI7QUFDQTtBQVpSO0FBY0EsZUFBUTtBQUNKQyxxQ0FBdUJGLGdCQURuQjtBQUVKLDhCQUFrQkEsZ0JBRmQ7QUFHSixzQ0FBMEJDO0FBSHRCLFNBQVI7QUFLSCxLQTlJUzs7QUErSVY7Ozs7O0FBS0FKLGlCQXBKVSwyQkFvSk07QUFBQTs7QUFDWixZQUFJLENBQUMsQ0FBQyxPQUFELEVBQVUsUUFBVixFQUFvQixPQUFwQixFQUE2Qk0sSUFBN0IsQ0FBa0M7QUFBQSxtQkFBUW5DLFNBQVMsT0FBS04sS0FBTCxDQUFXTSxJQUE1QjtBQUFBLFNBQWxDLENBQUwsRUFBMEU7QUFDdEUsa0JBQU0sd0NBQTZCLCtFQUErRSxLQUFLTixLQUFMLENBQVdNLElBQXZILENBQU47QUFDSDtBQUNELGVBQU8sS0FBS04sS0FBTCxDQUFXTSxJQUFsQjtBQUNILEtBekpTOztBQTBKVjs7Ozs7QUFLQStCLHNCQS9KVSw4QkErSlN6QixLQS9KVCxFQStKZ0I7QUFDdEJBLGNBQU04QixlQUFOO0FBQ0g7QUFqS1MsQ0FBZDs7QUFvS0FDLE9BQU9DLE9BQVAsR0FBaUIsdUJBQVEzQyxLQUFSLENBQWpCIiwiZmlsZSI6ImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIERlcGVuZGVuY2llc1xyXG5cclxuaW1wb3J0IFJlYWN0LCB7IFByb3BUeXBlcyB9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IFJlYWN0RE9NIGZyb20gJ3JlYWN0LWRvbSc7XHJcbmltcG9ydCBidWlsZGVyIGZyb20gJ2ZvY3VzLWNvcmUvY29tcG9uZW50L2J1aWxkZXInO1xyXG5pbXBvcnQgdHlwZXMgZnJvbSAnZm9jdXMtY29yZS9jb21wb25lbnQvdHlwZXMnO1xyXG5pbXBvcnQgeyBBcmd1bWVudEludmFsaWRFeGNlcHRpb24gfSBmcm9tICdmb2N1cy1jb3JlL2V4Y2VwdGlvbic7XHJcblxyXG4vKipcclxuKiBTbWFsbCBvdmVybGF5IGNvbXBvbmVudCB1c2VkIHRvIGxpc3RlbiB0byBzY3JvbGwgYW5kIHByZXZlbnQgaXQgdG8gbGVhdmUgdGhlIFBvcGluIGNvbXBvbmVudFxyXG4qL1xyXG5jb25zdCBPdmVybGF5ID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG4gICAgZGlzcGxheU5hbWU6ICdQb3Bpbk92ZXJsYXknLFxyXG4gICAgcHJvcFR5cGVzOiB7XHJcbiAgICAgICAgY2hpbGRyZW46IFByb3BUeXBlcy5vYmplY3QsXHJcbiAgICAgICAgY2xpY2tIYW5kbGVyOiBQcm9wVHlwZXMuZnVuYyxcclxuICAgICAgICBzaG93OiBQcm9wVHlwZXMuYm9vbFxyXG4gICAgfSxcclxuICAgIGdldERlZmF1bHRQcm9wcygpIHtcclxuICAgICAgICByZXR1cm4geyBzaG93OiBmYWxzZSB9O1xyXG4gICAgfSxcclxuICAgIC8qKlxyXG4gICAgKiBTdG9yZSB0aGUgYm9keSBvdmVyZ2Zsb3cgcHJvcGVydHksIGFuZCBzZXQgaXQgdG8gaGlkZGVuXHJcbiAgICAqIEBwcml2YXRlXHJcbiAgICAqL1xyXG4gICAgX2hpZGVCb2R5T3ZlcmZsb3coKSB7XHJcbiAgICAgICAgZG9jdW1lbnQuYm9keS5zdHlsZVsnb3ZlcmZsb3cteSddID0gJ2hpZGRlbic7XHJcbiAgICB9LFxyXG4gICAgLyoqXHJcbiAgICAqIFJlc3RvcmUgYm9keSBvdmVyZmxvdyBwcm9wZXJ0eVxyXG4gICAgKiBAcHJpdmF0ZVxyXG4gICAgKi9cclxuICAgIF9yZXN0b3JlQm9keU92ZXJmbG93KCkge1xyXG4gICAgICAgIGRvY3VtZW50LmJvZHkuc3R5bGVbJ292ZXJmbG93LXknXSA9ICdhdXRvJztcclxuICAgIH0sXHJcbiAgICAvKipcclxuICAgICogQ29tcG9uZW50IHdpbGwgdW5tb3VudCBldmVudCBoYW5kbGVyLlxyXG4gICAgKiBSZW1vdmUgdGhlIG1vdXNlIHdoZWVsIGxpc3RlbmVyLlxyXG4gICAgKi9cclxuICAgIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xyXG4gICAgICAgIC8vIFJlYWN0RE9NLmZpbmRET01Ob2RlKHRoaXMucmVmcy5vdmVybGF5KS5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZXdoZWVsJywgdGhpcy5fb25TY3JvbGwpO1xyXG4gICAgICAgIHRoaXMuX3Jlc3RvcmVCb2R5T3ZlcmZsb3coKTtcclxuICAgIH0sXHJcbiAgICAvKipcclxuICAgICogUmVuZGVyIHRoZSBjb21wb25lbnRcclxuICAgICogQHJldHVybiB7WE1MfSB0aGUgcmVuZGVyZWQgSFRNTFxyXG4gICAgKi9cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICBjb25zdCB7Y2hpbGRyZW4sIGNsaWNrSGFuZGxlciwgc2hvd30gPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdhbmltYXRlZCBmYWRlSW4nIGRhdGEtYW5pbWF0aW9uPSdmYWRlSW4nIGRhdGEtY2xvc2luZy1hbmltYXRpb249J2ZhZGVPdXQnIGRhdGEtZm9jdXM9J3BvcGluLW92ZXJsYXknIGRhdGEtdmlzaWJsZT17c2hvd30gb25DbGljaz17Y2xpY2tIYW5kbGVyfSByZWY9J292ZXJsYXknPlxyXG4gICAgICAgICAgICAgICAge2NoaWxkcmVufVxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG59KTtcclxuXHJcbi8qKlxyXG4qIFRoZSBwb3BpbiBjb21wb25lbnQgY29uZmlndXJhdGlvblxyXG4qIEB0eXBlIHtPYmplY3R9XHJcbiovXHJcbmNvbnN0IHBvcGluID0ge1xyXG4gICAgLyoqXHJcbiAgICAqIEluaXQgdGhlIGNvbXBvbmVudC5cclxuICAgICogVGhlIHBvcGluIGlzIGNsb3NlZCBieSBkZWZhdWx0LlxyXG4gICAgKiBAcmV0dXJuIHtPYmplY3R9IHRoZSBpbml0aWFsIHN0YXRlXHJcbiAgICAqL1xyXG4gICAgZ2V0SW5pdGlhbFN0YXRlKCkge1xyXG4gICAgICAgIHJldHVybiAoe1xyXG4gICAgICAgICAgICBvcGVuZWQ6IHRoaXMucHJvcHMub3BlblxyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuICAgIC8qKlxyXG4gICAgKiBJbml0IHRoZSBwcm9wcyBpZiBub3QgcHJvdmlkZWQuXHJcbiAgICAqIEJ5IGRlZmF1bHQsIGEgcG9waW4gaXMgZnVsbCwgbWVkaXVtIGFuZCBtb2RhbC5cclxuICAgICogQHJldHVybiB7T2JqZWN0fSB0aGUgZGVmYXVsdCBwcm9wc1xyXG4gICAgKi9cclxuICAgIGdldERlZmF1bHRQcm9wcygpIHtcclxuICAgICAgICByZXR1cm4gKHtcclxuICAgICAgICAgICAgbW9kYWw6IHRydWUsXHJcbiAgICAgICAgICAgIHNpemU6ICdtZWRpdW0nLFxyXG4gICAgICAgICAgICB0eXBlOiAnZnVsbCcsXHJcbiAgICAgICAgICAgIGxldmVsOiAwLFxyXG4gICAgICAgICAgICBvdmVybGF5OiB0cnVlLFxyXG4gICAgICAgICAgICBvcGVuOiBmYWxzZVxyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuICAgIC8qKlxyXG4gICAgKiBIZWxwZXIgYXR0cmlidXRlLCBmb3IgUmVhY3QgZGVidWdnaW5nXHJcbiAgICAqL1xyXG4gICAgZGlzcGxheU5hbWU6ICdQb3BpbicsXHJcbiAgICAvKipcclxuICAgICogUHJvcGVydGllcyB2YWxpZGF0aW9uXHJcbiAgICAqL1xyXG4gICAgcHJvcFR5cGVzOiB7XHJcbiAgICAgICAgbW9kYWw6IHR5cGVzKCdib29sJyksXHJcbiAgICAgICAgc2l6ZTogdHlwZXMoJ3N0cmluZycpLFxyXG4gICAgICAgIHR5cGVzOiB0eXBlcygnc3RyaW5nJyksXHJcbiAgICAgICAgbGV2ZWw6IHR5cGVzKCdudW1iZXInKSxcclxuICAgICAgICBvdmVybGF5OiB0eXBlcygnYm9vbCcpLFxyXG4gICAgICAgIG9wZW46IHR5cGVzKCdib29sJylcclxuICAgIH0sXHJcbiAgICAvKipcclxuICAgICogV2hlZWwgZXZlbnQgaGFuZGxlci5cclxuICAgICogQHBhcmFtICB7b2JqZWN0fSBldmVudCB3aGVlbCBldmVudFxyXG4gICAgKi9cclxuICAgIF9vbldoZWVsKGV2ZW50KSB7XHJcbiAgICAgICAgUmVhY3RET00uZmluZERPTU5vZGUodGhpcy5yZWZzWydwb3Bpbi13aW5kb3cnXSkuc2Nyb2xsVG9wICs9IDAgPCBldmVudC5kZWx0YVkgPyAxMDAgOiAtMTAwO1xyXG4gICAgfSxcclxuICAgIC8qKlxyXG4gICAgKiBUb2dnbGUgdGhlIHBvcGluJ3Mgb3BlbiBzdGF0ZVxyXG4gICAgKi9cclxuICAgIHRvZ2dsZU9wZW4oKSB7XHJcbiAgICAgICAgbGV0IHRpbWVvdXQgPSAwO1xyXG4gICAgICAgIGNvbnN0IHtvcGVuZWR9ID0gdGhpcy5zdGF0ZTtcclxuICAgICAgICBjb25zdCB7b25Qb3BpbkNsb3NlfSA9IHRoaXMucHJvcHM7XHJcbiAgICAgICAgaWYgKG9wZW5lZCkge1xyXG4gICAgICAgICAgICBjb25zdCBwb3BpbldpbmRvdyA9IFJlYWN0RE9NLmZpbmRET01Ob2RlKHRoaXMucmVmc1sncG9waW4td2luZG93J10pO1xyXG4gICAgICAgICAgICBjb25zdCBwb3Bpbk92ZXJsYXkgPSBSZWFjdERPTS5maW5kRE9NTm9kZSh0aGlzLnJlZnNbJ3BvcGluLW92ZXJsYXknXSk7XHJcbiAgICAgICAgICAgIHBvcGluV2luZG93LmNsYXNzTGlzdC5yZW1vdmUocG9waW5XaW5kb3cuZ2V0QXR0cmlidXRlKCdkYXRhLWFuaW1hdGlvbicpKTtcclxuICAgICAgICAgICAgcG9waW5XaW5kb3cuY2xhc3NMaXN0LmFkZChwb3BpbldpbmRvdy5nZXRBdHRyaWJ1dGUoJ2RhdGEtY2xvc2luZy1hbmltYXRpb24nKSk7XHJcbiAgICAgICAgICAgIHBvcGluT3ZlcmxheS5jbGFzc0xpc3QucmVtb3ZlKHBvcGluT3ZlcmxheS5nZXRBdHRyaWJ1dGUoJ2RhdGEtYW5pbWF0aW9uJykpO1xyXG4gICAgICAgICAgICBwb3Bpbk92ZXJsYXkuY2xhc3NMaXN0LmFkZChwb3Bpbk92ZXJsYXkuZ2V0QXR0cmlidXRlKCdkYXRhLWNsb3NpbmctYW5pbWF0aW9uJykpO1xyXG4gICAgICAgICAgICB0aW1lb3V0ID0gMjAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAob3BlbmVkICYmIG9uUG9waW5DbG9zZSkge1xyXG4gICAgICAgICAgICBvblBvcGluQ2xvc2UoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fb3BlblRpbWVvdXRJRCA9IHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAvLyBTdG9yZSB0aGUgY3VycmVudCBwb3BpbiBzdGF0ZVxyXG4gICAgICAgICAgICBjb25zdCB3YXNPcGVuZWQgPSB0aGlzLnN0YXRlLm9wZW5lZDtcclxuICAgICAgICAgICAgLy8gSWYgaXQgd2FzICBvcGVuZWQsIHRoZW4gd2UgYXJlIGNsb3NpbmcgaXQsIHNvIHJlc3RvcmUgdGhlIGJvZHkgb3ZlcmZsb3cgYmVmb3JlIGNsb3NpbmcuXHJcbiAgICAgICAgICAgIGlmICh3YXNPcGVuZWQgJiYgdGhpcy5yZWZzWydwb3Bpbi1vdmVybGF5J10pIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVmc1sncG9waW4tb3ZlcmxheSddLl9yZXN0b3JlQm9keU92ZXJmbG93KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgICAgICAgICBvcGVuZWQ6ICF3YXNPcGVuZWRcclxuICAgICAgICAgICAgfSwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucmVmc1sncG9waW4tb3ZlcmxheSddKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF3YXNPcGVuZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gV2UganVzdCBvcGVuZWQgdGhlIHBvcGluLCBzbyBzdG9yZSBhbmQgaGlkZSB0aGUgYm9keSBvdmVyZmxvdy5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZWZzWydwb3Bpbi1vdmVybGF5J10uX2hpZGVCb2R5T3ZlcmZsb3coKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sIHRpbWVvdXQpO1xyXG4gICAgfSxcclxuICAgIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xyXG4gICAgICAgIHdpbmRvdy5jbGVhclRpbWVvdXQodGhpcy5fb3BlblRpbWVvdXRJRCk7XHJcbiAgICB9LFxyXG4gICAgLyoqXHJcbiAgICAqIFJlbmRlciB0aGUgY29tcG9uZW50XHJcbiAgICAqIEByZXR1cm4ge1hNTH0gdGhlIHJlbmRlcmVkIEhUTUxcclxuICAgICovXHJcbiAgICByZW5kZXIoKSB7IC8vIHRlc3QgZm9yIHRoaXMuc3RhdGUub3BlbmVkIGFuZCByZXR1cm4gYW4gT3ZlcmxheSBjb21wb25lbnQgaWYgdHJ1ZVxyXG4gICAgICAgIGNvbnN0IHt0eXBlLCBsZXZlbCwgbW9kYWwsIG92ZXJsYXksIGNoaWxkcmVuLCBtb2RhbFRpdGxlSWR9ID0gdGhpcy5wcm9wcztcclxuXHJcbiAgICAgICAgY29uc3Qgb3B0aW9ubmFsTW9kYWxQcm9wcyA9IHt9O1xyXG4gICAgICAgIGlmIChtb2RhbFRpdGxlSWQpIHtcclxuICAgICAgICAgICAgb3B0aW9ubmFsTW9kYWxQcm9wc1snYXJpYS1sYWJlbGxlZGJ5J10gPSBtb2RhbFRpdGxlSWQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXYgZGF0YS1mb2N1cz0ncG9waW4nIGRhdGEtbGV2ZWw9e2xldmVsfSBkYXRhLXNpemU9e3RoaXMuX3ZhbGlkYXRlU2l6ZSgpfSBkYXRhLXR5cGU9e3R5cGV9ID5cclxuICAgICAgICAgICAgICAgIHt0aGlzLnN0YXRlLm9wZW5lZCAmJlxyXG4gICAgICAgICAgICAgICAgICAgIDxPdmVybGF5IGNsaWNrSGFuZGxlcj17bW9kYWwgJiYgdGhpcy50b2dnbGVPcGVufSByZWY9J3BvcGluLW92ZXJsYXknIHJlc2l6ZT17J2Z1bGwnID09PSB0eXBlfSBzaG93PXtvdmVybGF5fT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiB7Li4udGhpcy5fZ2V0QW5pbWF0aW9uUHJvcHMoKSB9IGRhdGEtZm9jdXM9J3BvcGluLXdpbmRvdycgcm9sZT0nZGlhbG9nJyBvbkNsaWNrPXt0aGlzLl9wcmV2ZW50UG9waW5DbG9zZX0gcmVmPSdwb3Bpbi13aW5kb3cnPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3NOYW1lPSdtYXRlcmlhbC1pY29ucycgZGF0YS1mb2N1cz0ncG9waW4td2luZG93LWNsb3NlJyBvbkNsaWNrPXt0aGlzLnRvZ2dsZU9wZW59PmNsb3NlPC9pPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBvbldoZWVsPXt0aGlzLl9vbldoZWVsfT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7Y2hpbGRyZW59XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9PdmVybGF5PlxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApO1xyXG4gICAgfSxcclxuICAgIC8qKlxyXG4gICAgKiBDb21wdXRlIHRoZSBhbmltYXRpb24gY2xhc3Nlc1xyXG4gICAgKiBAcmV0dXJuIHtPYmplY3R9IHRoZSBwcm9wcyB0byBhdHRhY2ggdG8gdGhlIGNvbXBvbmVudFxyXG4gICAgKiBAcHJpdmF0ZVxyXG4gICAgKi9cclxuICAgIF9nZXRBbmltYXRpb25Qcm9wcygpIHtcclxuICAgICAgICBsZXQgb3BlbmluZ0FuaW1hdGlvbjtcclxuICAgICAgICBsZXQgY2xvc2luZ0FuaW1hdGlvbjtcclxuICAgICAgICBzd2l0Y2ggKHRoaXMucHJvcHMudHlwZSkge1xyXG4gICAgICAgICAgICBjYXNlICdmcm9tLW1lbnUnOlxyXG4gICAgICAgICAgICAgICAgb3BlbmluZ0FuaW1hdGlvbiA9ICdzbGlkZUluTGVmdCc7XHJcbiAgICAgICAgICAgICAgICBjbG9zaW5nQW5pbWF0aW9uID0gJ3NsaWRlT3V0TGVmdCc7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnZnJvbS1yaWdodCc6XHJcbiAgICAgICAgICAgICAgICBvcGVuaW5nQW5pbWF0aW9uID0gJ3NsaWRlSW5SaWdodCc7XHJcbiAgICAgICAgICAgICAgICBjbG9zaW5nQW5pbWF0aW9uID0gJ3NsaWRlT3V0UmlnaHQnO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICBvcGVuaW5nQW5pbWF0aW9uID0gJ3pvb21Jbic7XHJcbiAgICAgICAgICAgICAgICBjbG9zaW5nQW5pbWF0aW9uID0gJ3pvb21PdXQnO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiAoe1xyXG4gICAgICAgICAgICBjbGFzc05hbWU6IGBhbmltYXRlZCAke29wZW5pbmdBbmltYXRpb259YCxcclxuICAgICAgICAgICAgJ2RhdGEtYW5pbWF0aW9uJzogb3BlbmluZ0FuaW1hdGlvbixcclxuICAgICAgICAgICAgJ2RhdGEtY2xvc2luZy1hbmltYXRpb24nOiBjbG9zaW5nQW5pbWF0aW9uXHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgLyoqXHJcbiAgICAqIFZhbGlkYXRlIHRoZSBvcHRpb25hbCBnaXZlbiBzaXplXHJcbiAgICAqIEByZXR1cm4ge3N0cmluZ30gdGhlIHZhbGlkYXRlZCBzaXplXHJcbiAgICAqIEBwcml2YXRlXHJcbiAgICAqL1xyXG4gICAgX3ZhbGlkYXRlU2l6ZSgpIHtcclxuICAgICAgICBpZiAoIVsnc21hbGwnLCAnbWVkaXVtJywgJ2xhcmdlJ10uZmluZChzaXplID0+IHNpemUgPT09IHRoaXMucHJvcHMuc2l6ZSkpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50SW52YWxpZEV4Y2VwdGlvbignUGxlYXNlIHByb3ZpZGUgYSB2YWxpZCBwb3BpbiBzaXplIGFtb25nIHNtYWxsLCBtZWRpdW0gYW5kIGxhcmdlLiBQcm92aWRlZCAnICsgdGhpcy5wcm9wcy5zaXplKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMuc2l6ZTtcclxuICAgIH0sXHJcbiAgICAvKipcclxuICAgICogUHJldmVudCBwb3BpbiBjbG9zZSB3aGVuIHRoZXJlJ3MgYSBjbGljayBvbiB0aGUgcG9waW4gd2luZG93XHJcbiAgICAqIEBwYXJhbSB7T2JqZWN0fSBldmVudCAtIHJhaXNlZCBieSB0aGUgY2xpY2tcclxuICAgICogQHByaXZhdGVcclxuICAgICovXHJcbiAgICBfcHJldmVudFBvcGluQ2xvc2UoZXZlbnQpIHtcclxuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgIH1cclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gYnVpbGRlcihwb3Bpbik7XHJcbiJdfQ==