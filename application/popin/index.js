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
            modalTitleId = _props2.modalTitleId,
            labelIcon = _props2.labelIcon,
            classNameIcon = _props2.classNameIcon;

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
                    _extends({}, this._getAnimationProps(), { 'data-focus': 'popin-window' }, optionnalModalProps, { role: 'dialog', onClick: this._preventPopinClose, ref: 'popin-window' }),
                    labelIcon && classNameIcon && _react2.default.createElement(
                        'span',
                        { className: classNameIcon },
                        labelIcon
                    ),
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJPdmVybGF5IiwiY3JlYXRlQ2xhc3MiLCJkaXNwbGF5TmFtZSIsInByb3BUeXBlcyIsImNoaWxkcmVuIiwib2JqZWN0IiwiY2xpY2tIYW5kbGVyIiwiZnVuYyIsInNob3ciLCJib29sIiwiZ2V0RGVmYXVsdFByb3BzIiwiX2hpZGVCb2R5T3ZlcmZsb3ciLCJkb2N1bWVudCIsImJvZHkiLCJzdHlsZSIsIl9yZXN0b3JlQm9keU92ZXJmbG93IiwiY29tcG9uZW50V2lsbFVubW91bnQiLCJyZW5kZXIiLCJwcm9wcyIsInBvcGluIiwiZ2V0SW5pdGlhbFN0YXRlIiwib3BlbmVkIiwib3BlbiIsIm1vZGFsIiwic2l6ZSIsInR5cGUiLCJsZXZlbCIsIm92ZXJsYXkiLCJ0eXBlcyIsIl9vbldoZWVsIiwiZXZlbnQiLCJmaW5kRE9NTm9kZSIsInJlZnMiLCJzY3JvbGxUb3AiLCJkZWx0YVkiLCJ0b2dnbGVPcGVuIiwidGltZW91dCIsInN0YXRlIiwib25Qb3BpbkNsb3NlIiwicG9waW5XaW5kb3ciLCJwb3Bpbk92ZXJsYXkiLCJjbGFzc0xpc3QiLCJyZW1vdmUiLCJnZXRBdHRyaWJ1dGUiLCJhZGQiLCJfb3BlblRpbWVvdXRJRCIsInNldFRpbWVvdXQiLCJ3YXNPcGVuZWQiLCJzZXRTdGF0ZSIsIndpbmRvdyIsImNsZWFyVGltZW91dCIsIm1vZGFsVGl0bGVJZCIsImxhYmVsSWNvbiIsImNsYXNzTmFtZUljb24iLCJvcHRpb25uYWxNb2RhbFByb3BzIiwiX3ZhbGlkYXRlU2l6ZSIsIl9nZXRBbmltYXRpb25Qcm9wcyIsIl9wcmV2ZW50UG9waW5DbG9zZSIsIm9wZW5pbmdBbmltYXRpb24iLCJjbG9zaW5nQW5pbWF0aW9uIiwiY2xhc3NOYW1lIiwiZmluZCIsInN0b3BQcm9wYWdhdGlvbiIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7O2tRQUFBOztBQUVBOzs7O0FBQ0E7Ozs7QUFD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QWVILEtBbEhTOztBQW1IVjs7Ozs7QUFLQW9ELHNCQXhIVSxnQ0F3SFc7QUFDakIsWUFBSUUseUJBQUo7QUFDQSxZQUFJQyx5QkFBSjtBQUNBLGdCQUFRLEtBQUt6QyxLQUFMLENBQVdPLElBQW5CO0FBQ0ksaUJBQUssV0FBTDtBQUNJaUMsbUNBQW1CLGFBQW5CO0FBQ0FDLG1DQUFtQixjQUFuQjtBQUNBO0FBQ0osaUJBQUssWUFBTDtBQUNJRCxtQ0FBbUIsY0FBbkI7QUFDQUMsbUNBQW1CLGVBQW5CO0FBQ0E7QUFDSjtBQUNJRCxtQ0FBbUIsUUFBbkI7QUFDQUMsbUNBQW1CLFNBQW5CO0FBQ0E7QUFaUjtBQWNBLGVBQVE7QUFDSkMscUNBQXVCRixnQkFEbkI7QUFFSiw4QkFBa0JBLGdCQUZkO0FBR0osc0NBQTBCQztBQUh0QixTQUFSO0FBS0gsS0E5SVM7O0FBK0lWOzs7OztBQUtBSixpQkFwSlUsMkJBb0pNO0FBQUE7O0FBQ1osWUFBSSxDQUFDLENBQUMsT0FBRCxFQUFVLFFBQVYsRUFBb0IsT0FBcEIsRUFBNkJNLElBQTdCLENBQWtDO0FBQUEsbUJBQVFyQyxTQUFTLE9BQUtOLEtBQUwsQ0FBV00sSUFBNUI7QUFBQSxTQUFsQyxDQUFMLEVBQTBFO0FBQ3RFLGtCQUFNLHdDQUE2QiwrRUFBK0UsS0FBS04sS0FBTCxDQUFXTSxJQUF2SCxDQUFOO0FBQ0g7QUFDRCxlQUFPLEtBQUtOLEtBQUwsQ0FBV00sSUFBbEI7QUFDSCxLQXpKUzs7QUEwSlY7Ozs7O0FBS0FpQyxzQkEvSlUsOEJBK0pTM0IsS0EvSlQsRUErSmdCO0FBQ3RCQSxjQUFNZ0MsZUFBTjtBQUNIO0FBaktTLENBQWQ7O0FBb0tBQyxPQUFPQyxPQUFQLEdBQWlCLHVCQUFRN0MsS0FBUixDQUFqQiIsImZpbGUiOiJpcy1yZWFjdC1jbGFzcy1jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBEZXBlbmRlbmNpZXNcclxuXHJcbmltcG9ydCBSZWFjdCwgeyBQcm9wVHlwZXMgfSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBSZWFjdERPTSBmcm9tICdyZWFjdC1kb20nO1xyXG5pbXBvcnQgYnVpbGRlciBmcm9tICdmb2N1cy1jb3JlL2NvbXBvbmVudC9idWlsZGVyJztcclxuaW1wb3J0IHR5cGVzIGZyb20gJ2ZvY3VzLWNvcmUvY29tcG9uZW50L3R5cGVzJztcclxuaW1wb3J0IHsgQXJndW1lbnRJbnZhbGlkRXhjZXB0aW9uIH0gZnJvbSAnZm9jdXMtY29yZS9leGNlcHRpb24nO1xyXG5cclxuLyoqXHJcbiogU21hbGwgb3ZlcmxheSBjb21wb25lbnQgdXNlZCB0byBsaXN0ZW4gdG8gc2Nyb2xsIGFuZCBwcmV2ZW50IGl0IHRvIGxlYXZlIHRoZSBQb3BpbiBjb21wb25lbnRcclxuKi9cclxuY29uc3QgT3ZlcmxheSA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcclxuICAgIGRpc3BsYXlOYW1lOiAnUG9waW5PdmVybGF5JyxcclxuICAgIHByb3BUeXBlczoge1xyXG4gICAgICAgIGNoaWxkcmVuOiBQcm9wVHlwZXMub2JqZWN0LFxyXG4gICAgICAgIGNsaWNrSGFuZGxlcjogUHJvcFR5cGVzLmZ1bmMsXHJcbiAgICAgICAgc2hvdzogUHJvcFR5cGVzLmJvb2xcclxuICAgIH0sXHJcbiAgICBnZXREZWZhdWx0UHJvcHMoKSB7XHJcbiAgICAgICAgcmV0dXJuIHsgc2hvdzogZmFsc2UgfTtcclxuICAgIH0sXHJcbiAgICAvKipcclxuICAgICogU3RvcmUgdGhlIGJvZHkgb3ZlcmdmbG93IHByb3BlcnR5LCBhbmQgc2V0IGl0IHRvIGhpZGRlblxyXG4gICAgKiBAcHJpdmF0ZVxyXG4gICAgKi9cclxuICAgIF9oaWRlQm9keU92ZXJmbG93KCkge1xyXG4gICAgICAgIGRvY3VtZW50LmJvZHkuc3R5bGVbJ292ZXJmbG93LXknXSA9ICdoaWRkZW4nO1xyXG4gICAgfSxcclxuICAgIC8qKlxyXG4gICAgKiBSZXN0b3JlIGJvZHkgb3ZlcmZsb3cgcHJvcGVydHlcclxuICAgICogQHByaXZhdGVcclxuICAgICovXHJcbiAgICBfcmVzdG9yZUJvZHlPdmVyZmxvdygpIHtcclxuICAgICAgICBkb2N1bWVudC5ib2R5LnN0eWxlWydvdmVyZmxvdy15J10gPSAnYXV0byc7XHJcbiAgICB9LFxyXG4gICAgLyoqXHJcbiAgICAqIENvbXBvbmVudCB3aWxsIHVubW91bnQgZXZlbnQgaGFuZGxlci5cclxuICAgICogUmVtb3ZlIHRoZSBtb3VzZSB3aGVlbCBsaXN0ZW5lci5cclxuICAgICovXHJcbiAgICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcclxuICAgICAgICAvLyBSZWFjdERPTS5maW5kRE9NTm9kZSh0aGlzLnJlZnMub3ZlcmxheSkucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2V3aGVlbCcsIHRoaXMuX29uU2Nyb2xsKTtcclxuICAgICAgICB0aGlzLl9yZXN0b3JlQm9keU92ZXJmbG93KCk7XHJcbiAgICB9LFxyXG4gICAgLyoqXHJcbiAgICAqIFJlbmRlciB0aGUgY29tcG9uZW50XHJcbiAgICAqIEByZXR1cm4ge1hNTH0gdGhlIHJlbmRlcmVkIEhUTUxcclxuICAgICovXHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgY29uc3Qge2NoaWxkcmVuLCBjbGlja0hhbmRsZXIsIHNob3d9ID0gdGhpcy5wcm9wcztcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nYW5pbWF0ZWQgZmFkZUluJyBkYXRhLWFuaW1hdGlvbj0nZmFkZUluJyBkYXRhLWNsb3NpbmctYW5pbWF0aW9uPSdmYWRlT3V0JyBkYXRhLWZvY3VzPSdwb3Bpbi1vdmVybGF5JyBkYXRhLXZpc2libGU9e3Nob3d9IG9uQ2xpY2s9e2NsaWNrSGFuZGxlcn0gcmVmPSdvdmVybGF5Jz5cclxuICAgICAgICAgICAgICAgIHtjaGlsZHJlbn1cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufSk7XHJcblxyXG4vKipcclxuKiBUaGUgcG9waW4gY29tcG9uZW50IGNvbmZpZ3VyYXRpb25cclxuKiBAdHlwZSB7T2JqZWN0fVxyXG4qL1xyXG5jb25zdCBwb3BpbiA9IHtcclxuICAgIC8qKlxyXG4gICAgKiBJbml0IHRoZSBjb21wb25lbnQuXHJcbiAgICAqIFRoZSBwb3BpbiBpcyBjbG9zZWQgYnkgZGVmYXVsdC5cclxuICAgICogQHJldHVybiB7T2JqZWN0fSB0aGUgaW5pdGlhbCBzdGF0ZVxyXG4gICAgKi9cclxuICAgIGdldEluaXRpYWxTdGF0ZSgpIHtcclxuICAgICAgICByZXR1cm4gKHtcclxuICAgICAgICAgICAgb3BlbmVkOiB0aGlzLnByb3BzLm9wZW5cclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcbiAgICAvKipcclxuICAgICogSW5pdCB0aGUgcHJvcHMgaWYgbm90IHByb3ZpZGVkLlxyXG4gICAgKiBCeSBkZWZhdWx0LCBhIHBvcGluIGlzIGZ1bGwsIG1lZGl1bSBhbmQgbW9kYWwuXHJcbiAgICAqIEByZXR1cm4ge09iamVjdH0gdGhlIGRlZmF1bHQgcHJvcHNcclxuICAgICovXHJcbiAgICBnZXREZWZhdWx0UHJvcHMoKSB7XHJcbiAgICAgICAgcmV0dXJuICh7XHJcbiAgICAgICAgICAgIG1vZGFsOiB0cnVlLFxyXG4gICAgICAgICAgICBzaXplOiAnbWVkaXVtJyxcclxuICAgICAgICAgICAgdHlwZTogJ2Z1bGwnLFxyXG4gICAgICAgICAgICBsZXZlbDogMCxcclxuICAgICAgICAgICAgb3ZlcmxheTogdHJ1ZSxcclxuICAgICAgICAgICAgb3BlbjogZmFsc2VcclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcbiAgICAvKipcclxuICAgICogSGVscGVyIGF0dHJpYnV0ZSwgZm9yIFJlYWN0IGRlYnVnZ2luZ1xyXG4gICAgKi9cclxuICAgIGRpc3BsYXlOYW1lOiAnUG9waW4nLFxyXG4gICAgLyoqXHJcbiAgICAqIFByb3BlcnRpZXMgdmFsaWRhdGlvblxyXG4gICAgKi9cclxuICAgIHByb3BUeXBlczoge1xyXG4gICAgICAgIG1vZGFsOiB0eXBlcygnYm9vbCcpLFxyXG4gICAgICAgIHNpemU6IHR5cGVzKCdzdHJpbmcnKSxcclxuICAgICAgICB0eXBlczogdHlwZXMoJ3N0cmluZycpLFxyXG4gICAgICAgIGxldmVsOiB0eXBlcygnbnVtYmVyJyksXHJcbiAgICAgICAgb3ZlcmxheTogdHlwZXMoJ2Jvb2wnKSxcclxuICAgICAgICBvcGVuOiB0eXBlcygnYm9vbCcpXHJcbiAgICB9LFxyXG4gICAgLyoqXHJcbiAgICAqIFdoZWVsIGV2ZW50IGhhbmRsZXIuXHJcbiAgICAqIEBwYXJhbSAge29iamVjdH0gZXZlbnQgd2hlZWwgZXZlbnRcclxuICAgICovXHJcbiAgICBfb25XaGVlbChldmVudCkge1xyXG4gICAgICAgIFJlYWN0RE9NLmZpbmRET01Ob2RlKHRoaXMucmVmc1sncG9waW4td2luZG93J10pLnNjcm9sbFRvcCArPSAwIDwgZXZlbnQuZGVsdGFZID8gMTAwIDogLTEwMDtcclxuICAgIH0sXHJcbiAgICAvKipcclxuICAgICogVG9nZ2xlIHRoZSBwb3BpbidzIG9wZW4gc3RhdGVcclxuICAgICovXHJcbiAgICB0b2dnbGVPcGVuKCkge1xyXG4gICAgICAgIGxldCB0aW1lb3V0ID0gMDtcclxuICAgICAgICBjb25zdCB7b3BlbmVkfSA9IHRoaXMuc3RhdGU7XHJcbiAgICAgICAgY29uc3Qge29uUG9waW5DbG9zZX0gPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIGlmIChvcGVuZWQpIHtcclxuICAgICAgICAgICAgY29uc3QgcG9waW5XaW5kb3cgPSBSZWFjdERPTS5maW5kRE9NTm9kZSh0aGlzLnJlZnNbJ3BvcGluLXdpbmRvdyddKTtcclxuICAgICAgICAgICAgY29uc3QgcG9waW5PdmVybGF5ID0gUmVhY3RET00uZmluZERPTU5vZGUodGhpcy5yZWZzWydwb3Bpbi1vdmVybGF5J10pO1xyXG4gICAgICAgICAgICBwb3BpbldpbmRvdy5jbGFzc0xpc3QucmVtb3ZlKHBvcGluV2luZG93LmdldEF0dHJpYnV0ZSgnZGF0YS1hbmltYXRpb24nKSk7XHJcbiAgICAgICAgICAgIHBvcGluV2luZG93LmNsYXNzTGlzdC5hZGQocG9waW5XaW5kb3cuZ2V0QXR0cmlidXRlKCdkYXRhLWNsb3NpbmctYW5pbWF0aW9uJykpO1xyXG4gICAgICAgICAgICBwb3Bpbk92ZXJsYXkuY2xhc3NMaXN0LnJlbW92ZShwb3Bpbk92ZXJsYXkuZ2V0QXR0cmlidXRlKCdkYXRhLWFuaW1hdGlvbicpKTtcclxuICAgICAgICAgICAgcG9waW5PdmVybGF5LmNsYXNzTGlzdC5hZGQocG9waW5PdmVybGF5LmdldEF0dHJpYnV0ZSgnZGF0YS1jbG9zaW5nLWFuaW1hdGlvbicpKTtcclxuICAgICAgICAgICAgdGltZW91dCA9IDIwMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKG9wZW5lZCAmJiBvblBvcGluQ2xvc2UpIHtcclxuICAgICAgICAgICAgb25Qb3BpbkNsb3NlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX29wZW5UaW1lb3V0SUQgPSBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgLy8gU3RvcmUgdGhlIGN1cnJlbnQgcG9waW4gc3RhdGVcclxuICAgICAgICAgICAgY29uc3Qgd2FzT3BlbmVkID0gdGhpcy5zdGF0ZS5vcGVuZWQ7XHJcbiAgICAgICAgICAgIC8vIElmIGl0IHdhcyAgb3BlbmVkLCB0aGVuIHdlIGFyZSBjbG9zaW5nIGl0LCBzbyByZXN0b3JlIHRoZSBib2R5IG92ZXJmbG93IGJlZm9yZSBjbG9zaW5nLlxyXG4gICAgICAgICAgICBpZiAod2FzT3BlbmVkICYmIHRoaXMucmVmc1sncG9waW4tb3ZlcmxheSddKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlZnNbJ3BvcGluLW92ZXJsYXknXS5fcmVzdG9yZUJvZHlPdmVyZmxvdygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgICAgICAgICAgb3BlbmVkOiAhd2FzT3BlbmVkXHJcbiAgICAgICAgICAgIH0sICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnJlZnNbJ3BvcGluLW92ZXJsYXknXSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghd2FzT3BlbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFdlIGp1c3Qgb3BlbmVkIHRoZSBwb3Bpbiwgc28gc3RvcmUgYW5kIGhpZGUgdGhlIGJvZHkgb3ZlcmZsb3cuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVmc1sncG9waW4tb3ZlcmxheSddLl9oaWRlQm9keU92ZXJmbG93KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9LCB0aW1lb3V0KTtcclxuICAgIH0sXHJcbiAgICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcclxuICAgICAgICB3aW5kb3cuY2xlYXJUaW1lb3V0KHRoaXMuX29wZW5UaW1lb3V0SUQpO1xyXG4gICAgfSxcclxuICAgIC8qKlxyXG4gICAgKiBSZW5kZXIgdGhlIGNvbXBvbmVudFxyXG4gICAgKiBAcmV0dXJuIHtYTUx9IHRoZSByZW5kZXJlZCBIVE1MXHJcbiAgICAqL1xyXG4gICAgcmVuZGVyKCkgeyAvLyB0ZXN0IGZvciB0aGlzLnN0YXRlLm9wZW5lZCBhbmQgcmV0dXJuIGFuIE92ZXJsYXkgY29tcG9uZW50IGlmIHRydWVcclxuICAgICAgICBjb25zdCB7dHlwZSwgbGV2ZWwsIG1vZGFsLCBvdmVybGF5LCBjaGlsZHJlbiwgbW9kYWxUaXRsZUlkLCBsYWJlbEljb24sIGNsYXNzTmFtZUljb259ID0gdGhpcy5wcm9wcztcclxuICAgICAgICBjb25zdCBvcHRpb25uYWxNb2RhbFByb3BzID0ge307XHJcbiAgICAgICAgaWYgKG1vZGFsVGl0bGVJZCkge1xyXG4gICAgICAgICAgICBvcHRpb25uYWxNb2RhbFByb3BzWydhcmlhLWxhYmVsbGVkYnknXSA9IG1vZGFsVGl0bGVJZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdiBkYXRhLWZvY3VzPSdwb3BpbicgZGF0YS1sZXZlbD17bGV2ZWx9IGRhdGEtc2l6ZT17dGhpcy5fdmFsaWRhdGVTaXplKCl9IGRhdGEtdHlwZT17dHlwZX0gPlxyXG4gICAgICAgICAgICAgICAge3RoaXMuc3RhdGUub3BlbmVkICYmXHJcbiAgICAgICAgICAgICAgICAgICAgPE92ZXJsYXkgY2xpY2tIYW5kbGVyPXttb2RhbCAmJiB0aGlzLnRvZ2dsZU9wZW59IHJlZj0ncG9waW4tb3ZlcmxheScgcmVzaXplPXsnZnVsbCcgPT09IHR5cGV9IHNob3c9e292ZXJsYXl9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHsuLi50aGlzLl9nZXRBbmltYXRpb25Qcm9wcygpIH0gZGF0YS1mb2N1cz0ncG9waW4td2luZG93JyB7Li4ub3B0aW9ubmFsTW9kYWxQcm9wc30gcm9sZT0nZGlhbG9nJyBvbkNsaWNrPXt0aGlzLl9wcmV2ZW50UG9waW5DbG9zZX0gcmVmPSdwb3Bpbi13aW5kb3cnPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge2xhYmVsSWNvbiAmJiBjbGFzc05hbWVJY29uICYmIDxzcGFuIGNsYXNzTmFtZT17Y2xhc3NOYW1lSWNvbn0+e2xhYmVsSWNvbn08L3NwYW4+fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3NOYW1lPSdtYXRlcmlhbC1pY29ucycgZGF0YS1mb2N1cz0ncG9waW4td2luZG93LWNsb3NlJyBvbkNsaWNrPXt0aGlzLnRvZ2dsZU9wZW59PmNsb3NlPC9pPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBvbldoZWVsPXt0aGlzLl9vbldoZWVsfT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7Y2hpbGRyZW59XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9PdmVybGF5PlxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApO1xyXG4gICAgfSxcclxuICAgIC8qKlxyXG4gICAgKiBDb21wdXRlIHRoZSBhbmltYXRpb24gY2xhc3Nlc1xyXG4gICAgKiBAcmV0dXJuIHtPYmplY3R9IHRoZSBwcm9wcyB0byBhdHRhY2ggdG8gdGhlIGNvbXBvbmVudFxyXG4gICAgKiBAcHJpdmF0ZVxyXG4gICAgKi9cclxuICAgIF9nZXRBbmltYXRpb25Qcm9wcygpIHtcclxuICAgICAgICBsZXQgb3BlbmluZ0FuaW1hdGlvbjtcclxuICAgICAgICBsZXQgY2xvc2luZ0FuaW1hdGlvbjtcclxuICAgICAgICBzd2l0Y2ggKHRoaXMucHJvcHMudHlwZSkge1xyXG4gICAgICAgICAgICBjYXNlICdmcm9tLW1lbnUnOlxyXG4gICAgICAgICAgICAgICAgb3BlbmluZ0FuaW1hdGlvbiA9ICdzbGlkZUluTGVmdCc7XHJcbiAgICAgICAgICAgICAgICBjbG9zaW5nQW5pbWF0aW9uID0gJ3NsaWRlT3V0TGVmdCc7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnZnJvbS1yaWdodCc6XHJcbiAgICAgICAgICAgICAgICBvcGVuaW5nQW5pbWF0aW9uID0gJ3NsaWRlSW5SaWdodCc7XHJcbiAgICAgICAgICAgICAgICBjbG9zaW5nQW5pbWF0aW9uID0gJ3NsaWRlT3V0UmlnaHQnO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICBvcGVuaW5nQW5pbWF0aW9uID0gJ3pvb21Jbic7XHJcbiAgICAgICAgICAgICAgICBjbG9zaW5nQW5pbWF0aW9uID0gJ3pvb21PdXQnO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiAoe1xyXG4gICAgICAgICAgICBjbGFzc05hbWU6IGBhbmltYXRlZCAke29wZW5pbmdBbmltYXRpb259YCxcclxuICAgICAgICAgICAgJ2RhdGEtYW5pbWF0aW9uJzogb3BlbmluZ0FuaW1hdGlvbixcclxuICAgICAgICAgICAgJ2RhdGEtY2xvc2luZy1hbmltYXRpb24nOiBjbG9zaW5nQW5pbWF0aW9uXHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgLyoqXHJcbiAgICAqIFZhbGlkYXRlIHRoZSBvcHRpb25hbCBnaXZlbiBzaXplXHJcbiAgICAqIEByZXR1cm4ge3N0cmluZ30gdGhlIHZhbGlkYXRlZCBzaXplXHJcbiAgICAqIEBwcml2YXRlXHJcbiAgICAqL1xyXG4gICAgX3ZhbGlkYXRlU2l6ZSgpIHtcclxuICAgICAgICBpZiAoIVsnc21hbGwnLCAnbWVkaXVtJywgJ2xhcmdlJ10uZmluZChzaXplID0+IHNpemUgPT09IHRoaXMucHJvcHMuc2l6ZSkpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50SW52YWxpZEV4Y2VwdGlvbignUGxlYXNlIHByb3ZpZGUgYSB2YWxpZCBwb3BpbiBzaXplIGFtb25nIHNtYWxsLCBtZWRpdW0gYW5kIGxhcmdlLiBQcm92aWRlZCAnICsgdGhpcy5wcm9wcy5zaXplKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMuc2l6ZTtcclxuICAgIH0sXHJcbiAgICAvKipcclxuICAgICogUHJldmVudCBwb3BpbiBjbG9zZSB3aGVuIHRoZXJlJ3MgYSBjbGljayBvbiB0aGUgcG9waW4gd2luZG93XHJcbiAgICAqIEBwYXJhbSB7T2JqZWN0fSBldmVudCAtIHJhaXNlZCBieSB0aGUgY2xpY2tcclxuICAgICogQHByaXZhdGVcclxuICAgICovXHJcbiAgICBfcHJldmVudFBvcGluQ2xvc2UoZXZlbnQpIHtcclxuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgIH1cclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gYnVpbGRlcihwb3Bpbik7XHJcbiJdfQ==