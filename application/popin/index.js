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
                    _extends({}, this._getAnimationProps(), { 'data-focus': 'popin-window' }, optionnalModalProps, { role: 'dialog', onClick: this._preventPopinClose, ref: 'popin-window' }),
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJPdmVybGF5IiwiY3JlYXRlQ2xhc3MiLCJkaXNwbGF5TmFtZSIsInByb3BUeXBlcyIsImNoaWxkcmVuIiwib2JqZWN0IiwiY2xpY2tIYW5kbGVyIiwiZnVuYyIsInNob3ciLCJib29sIiwiZ2V0RGVmYXVsdFByb3BzIiwiX2hpZGVCb2R5T3ZlcmZsb3ciLCJkb2N1bWVudCIsImJvZHkiLCJzdHlsZSIsIl9yZXN0b3JlQm9keU92ZXJmbG93IiwiY29tcG9uZW50V2lsbFVubW91bnQiLCJyZW5kZXIiLCJwcm9wcyIsInBvcGluIiwiZ2V0SW5pdGlhbFN0YXRlIiwib3BlbmVkIiwib3BlbiIsIm1vZGFsIiwic2l6ZSIsInR5cGUiLCJsZXZlbCIsIm92ZXJsYXkiLCJ0eXBlcyIsIl9vbldoZWVsIiwiZXZlbnQiLCJmaW5kRE9NTm9kZSIsInJlZnMiLCJzY3JvbGxUb3AiLCJkZWx0YVkiLCJ0b2dnbGVPcGVuIiwidGltZW91dCIsInN0YXRlIiwib25Qb3BpbkNsb3NlIiwicG9waW5XaW5kb3ciLCJwb3Bpbk92ZXJsYXkiLCJjbGFzc0xpc3QiLCJyZW1vdmUiLCJnZXRBdHRyaWJ1dGUiLCJhZGQiLCJfb3BlblRpbWVvdXRJRCIsInNldFRpbWVvdXQiLCJ3YXNPcGVuZWQiLCJzZXRTdGF0ZSIsIndpbmRvdyIsImNsZWFyVGltZW91dCIsIm1vZGFsVGl0bGVJZCIsIm9wdGlvbm5hbE1vZGFsUHJvcHMiLCJfdmFsaWRhdGVTaXplIiwiX2dldEFuaW1hdGlvblByb3BzIiwiX3ByZXZlbnRQb3BpbkNsb3NlIiwib3BlbmluZ0FuaW1hdGlvbiIsImNsb3NpbmdBbmltYXRpb24iLCJjbGFzc05hbWUiLCJmaW5kIiwic3RvcFByb3BhZ2F0aW9uIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7a1FBQUE7O0FBRUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUVBOzs7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Y0FBbkI7QUFDQTtBQUNKLGlCQUFLLFlBQUw7QUFDSUQsbUNBQW1CLGNBQW5CO0FBQ0FDLG1DQUFtQixlQUFuQjtBQUNBO0FBQ0o7QUFDSUQsbUNBQW1CLFFBQW5CO0FBQ0FDLG1DQUFtQixTQUFuQjtBQUNBO0FBWlI7QUFjQSxlQUFRO0FBQ0pDLHFDQUF1QkYsZ0JBRG5CO0FBRUosOEJBQWtCQSxnQkFGZDtBQUdKLHNDQUEwQkM7QUFIdEIsU0FBUjtBQUtILEtBOUlTOztBQStJVjs7Ozs7QUFLQUosaUJBcEpVLDJCQW9KTTtBQUFBOztBQUNaLFlBQUksQ0FBQyxDQUFDLE9BQUQsRUFBVSxRQUFWLEVBQW9CLE9BQXBCLEVBQTZCTSxJQUE3QixDQUFrQztBQUFBLG1CQUFRbkMsU0FBUyxPQUFLTixLQUFMLENBQVdNLElBQTVCO0FBQUEsU0FBbEMsQ0FBTCxFQUEwRTtBQUN0RSxrQkFBTSx3Q0FBNkIsK0VBQStFLEtBQUtOLEtBQUwsQ0FBV00sSUFBdkgsQ0FBTjtBQUNIO0FBQ0QsZUFBTyxLQUFLTixLQUFMLENBQVdNLElBQWxCO0FBQ0gsS0F6SlM7O0FBMEpWOzs7OztBQUtBK0Isc0JBL0pVLDhCQStKU3pCLEtBL0pULEVBK0pnQjtBQUN0QkEsY0FBTThCLGVBQU47QUFDSDtBQWpLUyxDQUFkOztBQW9LQUMsT0FBT0MsT0FBUCxHQUFpQix1QkFBUTNDLEtBQVIsQ0FBakIiLCJmaWxlIjoiaXMtcmVhY3QtY2xhc3MtY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gRGVwZW5kZW5jaWVzXHJcblxyXG5pbXBvcnQgUmVhY3QsIHsgUHJvcFR5cGVzIH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgUmVhY3RET00gZnJvbSAncmVhY3QtZG9tJztcclxuaW1wb3J0IGJ1aWxkZXIgZnJvbSAnZm9jdXMtY29yZS9jb21wb25lbnQvYnVpbGRlcic7XHJcbmltcG9ydCB0eXBlcyBmcm9tICdmb2N1cy1jb3JlL2NvbXBvbmVudC90eXBlcyc7XHJcbmltcG9ydCB7IEFyZ3VtZW50SW52YWxpZEV4Y2VwdGlvbiB9IGZyb20gJ2ZvY3VzLWNvcmUvZXhjZXB0aW9uJztcclxuXHJcbi8qKlxyXG4qIFNtYWxsIG92ZXJsYXkgY29tcG9uZW50IHVzZWQgdG8gbGlzdGVuIHRvIHNjcm9sbCBhbmQgcHJldmVudCBpdCB0byBsZWF2ZSB0aGUgUG9waW4gY29tcG9uZW50XHJcbiovXHJcbmNvbnN0IE92ZXJsYXkgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XHJcbiAgICBkaXNwbGF5TmFtZTogJ1BvcGluT3ZlcmxheScsXHJcbiAgICBwcm9wVHlwZXM6IHtcclxuICAgICAgICBjaGlsZHJlbjogUHJvcFR5cGVzLm9iamVjdCxcclxuICAgICAgICBjbGlja0hhbmRsZXI6IFByb3BUeXBlcy5mdW5jLFxyXG4gICAgICAgIHNob3c6IFByb3BUeXBlcy5ib29sXHJcbiAgICB9LFxyXG4gICAgZ2V0RGVmYXVsdFByb3BzKCkge1xyXG4gICAgICAgIHJldHVybiB7IHNob3c6IGZhbHNlIH07XHJcbiAgICB9LFxyXG4gICAgLyoqXHJcbiAgICAqIFN0b3JlIHRoZSBib2R5IG92ZXJnZmxvdyBwcm9wZXJ0eSwgYW5kIHNldCBpdCB0byBoaWRkZW5cclxuICAgICogQHByaXZhdGVcclxuICAgICovXHJcbiAgICBfaGlkZUJvZHlPdmVyZmxvdygpIHtcclxuICAgICAgICBkb2N1bWVudC5ib2R5LnN0eWxlWydvdmVyZmxvdy15J10gPSAnaGlkZGVuJztcclxuICAgIH0sXHJcbiAgICAvKipcclxuICAgICogUmVzdG9yZSBib2R5IG92ZXJmbG93IHByb3BlcnR5XHJcbiAgICAqIEBwcml2YXRlXHJcbiAgICAqL1xyXG4gICAgX3Jlc3RvcmVCb2R5T3ZlcmZsb3coKSB7XHJcbiAgICAgICAgZG9jdW1lbnQuYm9keS5zdHlsZVsnb3ZlcmZsb3cteSddID0gJ2F1dG8nO1xyXG4gICAgfSxcclxuICAgIC8qKlxyXG4gICAgKiBDb21wb25lbnQgd2lsbCB1bm1vdW50IGV2ZW50IGhhbmRsZXIuXHJcbiAgICAqIFJlbW92ZSB0aGUgbW91c2Ugd2hlZWwgbGlzdGVuZXIuXHJcbiAgICAqL1xyXG4gICAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XHJcbiAgICAgICAgLy8gUmVhY3RET00uZmluZERPTU5vZGUodGhpcy5yZWZzLm92ZXJsYXkpLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNld2hlZWwnLCB0aGlzLl9vblNjcm9sbCk7XHJcbiAgICAgICAgdGhpcy5fcmVzdG9yZUJvZHlPdmVyZmxvdygpO1xyXG4gICAgfSxcclxuICAgIC8qKlxyXG4gICAgKiBSZW5kZXIgdGhlIGNvbXBvbmVudFxyXG4gICAgKiBAcmV0dXJuIHtYTUx9IHRoZSByZW5kZXJlZCBIVE1MXHJcbiAgICAqL1xyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIGNvbnN0IHtjaGlsZHJlbiwgY2xpY2tIYW5kbGVyLCBzaG93fSA9IHRoaXMucHJvcHM7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2FuaW1hdGVkIGZhZGVJbicgZGF0YS1hbmltYXRpb249J2ZhZGVJbicgZGF0YS1jbG9zaW5nLWFuaW1hdGlvbj0nZmFkZU91dCcgZGF0YS1mb2N1cz0ncG9waW4tb3ZlcmxheScgZGF0YS12aXNpYmxlPXtzaG93fSBvbkNsaWNrPXtjbGlja0hhbmRsZXJ9IHJlZj0nb3ZlcmxheSc+XHJcbiAgICAgICAgICAgICAgICB7Y2hpbGRyZW59XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuLyoqXHJcbiogVGhlIHBvcGluIGNvbXBvbmVudCBjb25maWd1cmF0aW9uXHJcbiogQHR5cGUge09iamVjdH1cclxuKi9cclxuY29uc3QgcG9waW4gPSB7XHJcbiAgICAvKipcclxuICAgICogSW5pdCB0aGUgY29tcG9uZW50LlxyXG4gICAgKiBUaGUgcG9waW4gaXMgY2xvc2VkIGJ5IGRlZmF1bHQuXHJcbiAgICAqIEByZXR1cm4ge09iamVjdH0gdGhlIGluaXRpYWwgc3RhdGVcclxuICAgICovXHJcbiAgICBnZXRJbml0aWFsU3RhdGUoKSB7XHJcbiAgICAgICAgcmV0dXJuICh7XHJcbiAgICAgICAgICAgIG9wZW5lZDogdGhpcy5wcm9wcy5vcGVuXHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgLyoqXHJcbiAgICAqIEluaXQgdGhlIHByb3BzIGlmIG5vdCBwcm92aWRlZC5cclxuICAgICogQnkgZGVmYXVsdCwgYSBwb3BpbiBpcyBmdWxsLCBtZWRpdW0gYW5kIG1vZGFsLlxyXG4gICAgKiBAcmV0dXJuIHtPYmplY3R9IHRoZSBkZWZhdWx0IHByb3BzXHJcbiAgICAqL1xyXG4gICAgZ2V0RGVmYXVsdFByb3BzKCkge1xyXG4gICAgICAgIHJldHVybiAoe1xyXG4gICAgICAgICAgICBtb2RhbDogdHJ1ZSxcclxuICAgICAgICAgICAgc2l6ZTogJ21lZGl1bScsXHJcbiAgICAgICAgICAgIHR5cGU6ICdmdWxsJyxcclxuICAgICAgICAgICAgbGV2ZWw6IDAsXHJcbiAgICAgICAgICAgIG92ZXJsYXk6IHRydWUsXHJcbiAgICAgICAgICAgIG9wZW46IGZhbHNlXHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgLyoqXHJcbiAgICAqIEhlbHBlciBhdHRyaWJ1dGUsIGZvciBSZWFjdCBkZWJ1Z2dpbmdcclxuICAgICovXHJcbiAgICBkaXNwbGF5TmFtZTogJ1BvcGluJyxcclxuICAgIC8qKlxyXG4gICAgKiBQcm9wZXJ0aWVzIHZhbGlkYXRpb25cclxuICAgICovXHJcbiAgICBwcm9wVHlwZXM6IHtcclxuICAgICAgICBtb2RhbDogdHlwZXMoJ2Jvb2wnKSxcclxuICAgICAgICBzaXplOiB0eXBlcygnc3RyaW5nJyksXHJcbiAgICAgICAgdHlwZXM6IHR5cGVzKCdzdHJpbmcnKSxcclxuICAgICAgICBsZXZlbDogdHlwZXMoJ251bWJlcicpLFxyXG4gICAgICAgIG92ZXJsYXk6IHR5cGVzKCdib29sJyksXHJcbiAgICAgICAgb3BlbjogdHlwZXMoJ2Jvb2wnKVxyXG4gICAgfSxcclxuICAgIC8qKlxyXG4gICAgKiBXaGVlbCBldmVudCBoYW5kbGVyLlxyXG4gICAgKiBAcGFyYW0gIHtvYmplY3R9IGV2ZW50IHdoZWVsIGV2ZW50XHJcbiAgICAqL1xyXG4gICAgX29uV2hlZWwoZXZlbnQpIHtcclxuICAgICAgICBSZWFjdERPTS5maW5kRE9NTm9kZSh0aGlzLnJlZnNbJ3BvcGluLXdpbmRvdyddKS5zY3JvbGxUb3AgKz0gMCA8IGV2ZW50LmRlbHRhWSA/IDEwMCA6IC0xMDA7XHJcbiAgICB9LFxyXG4gICAgLyoqXHJcbiAgICAqIFRvZ2dsZSB0aGUgcG9waW4ncyBvcGVuIHN0YXRlXHJcbiAgICAqL1xyXG4gICAgdG9nZ2xlT3BlbigpIHtcclxuICAgICAgICBsZXQgdGltZW91dCA9IDA7XHJcbiAgICAgICAgY29uc3Qge29wZW5lZH0gPSB0aGlzLnN0YXRlO1xyXG4gICAgICAgIGNvbnN0IHtvblBvcGluQ2xvc2V9ID0gdGhpcy5wcm9wcztcclxuICAgICAgICBpZiAob3BlbmVkKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHBvcGluV2luZG93ID0gUmVhY3RET00uZmluZERPTU5vZGUodGhpcy5yZWZzWydwb3Bpbi13aW5kb3cnXSk7XHJcbiAgICAgICAgICAgIGNvbnN0IHBvcGluT3ZlcmxheSA9IFJlYWN0RE9NLmZpbmRET01Ob2RlKHRoaXMucmVmc1sncG9waW4tb3ZlcmxheSddKTtcclxuICAgICAgICAgICAgcG9waW5XaW5kb3cuY2xhc3NMaXN0LnJlbW92ZShwb3BpbldpbmRvdy5nZXRBdHRyaWJ1dGUoJ2RhdGEtYW5pbWF0aW9uJykpO1xyXG4gICAgICAgICAgICBwb3BpbldpbmRvdy5jbGFzc0xpc3QuYWRkKHBvcGluV2luZG93LmdldEF0dHJpYnV0ZSgnZGF0YS1jbG9zaW5nLWFuaW1hdGlvbicpKTtcclxuICAgICAgICAgICAgcG9waW5PdmVybGF5LmNsYXNzTGlzdC5yZW1vdmUocG9waW5PdmVybGF5LmdldEF0dHJpYnV0ZSgnZGF0YS1hbmltYXRpb24nKSk7XHJcbiAgICAgICAgICAgIHBvcGluT3ZlcmxheS5jbGFzc0xpc3QuYWRkKHBvcGluT3ZlcmxheS5nZXRBdHRyaWJ1dGUoJ2RhdGEtY2xvc2luZy1hbmltYXRpb24nKSk7XHJcbiAgICAgICAgICAgIHRpbWVvdXQgPSAyMDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChvcGVuZWQgJiYgb25Qb3BpbkNsb3NlKSB7XHJcbiAgICAgICAgICAgIG9uUG9waW5DbG9zZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9vcGVuVGltZW91dElEID0gc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIC8vIFN0b3JlIHRoZSBjdXJyZW50IHBvcGluIHN0YXRlXHJcbiAgICAgICAgICAgIGNvbnN0IHdhc09wZW5lZCA9IHRoaXMuc3RhdGUub3BlbmVkO1xyXG4gICAgICAgICAgICAvLyBJZiBpdCB3YXMgIG9wZW5lZCwgdGhlbiB3ZSBhcmUgY2xvc2luZyBpdCwgc28gcmVzdG9yZSB0aGUgYm9keSBvdmVyZmxvdyBiZWZvcmUgY2xvc2luZy5cclxuICAgICAgICAgICAgaWYgKHdhc09wZW5lZCAmJiB0aGlzLnJlZnNbJ3BvcGluLW92ZXJsYXknXSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZWZzWydwb3Bpbi1vdmVybGF5J10uX3Jlc3RvcmVCb2R5T3ZlcmZsb3coKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgICAgICAgICAgIG9wZW5lZDogIXdhc09wZW5lZFxyXG4gICAgICAgICAgICB9LCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5yZWZzWydwb3Bpbi1vdmVybGF5J10pIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIXdhc09wZW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBXZSBqdXN0IG9wZW5lZCB0aGUgcG9waW4sIHNvIHN0b3JlIGFuZCBoaWRlIHRoZSBib2R5IG92ZXJmbG93LlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlZnNbJ3BvcGluLW92ZXJsYXknXS5faGlkZUJvZHlPdmVyZmxvdygpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSwgdGltZW91dCk7XHJcbiAgICB9LFxyXG4gICAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XHJcbiAgICAgICAgd2luZG93LmNsZWFyVGltZW91dCh0aGlzLl9vcGVuVGltZW91dElEKTtcclxuICAgIH0sXHJcbiAgICAvKipcclxuICAgICogUmVuZGVyIHRoZSBjb21wb25lbnRcclxuICAgICogQHJldHVybiB7WE1MfSB0aGUgcmVuZGVyZWQgSFRNTFxyXG4gICAgKi9cclxuICAgIHJlbmRlcigpIHsgLy8gdGVzdCBmb3IgdGhpcy5zdGF0ZS5vcGVuZWQgYW5kIHJldHVybiBhbiBPdmVybGF5IGNvbXBvbmVudCBpZiB0cnVlXHJcbiAgICAgICAgY29uc3Qge3R5cGUsIGxldmVsLCBtb2RhbCwgb3ZlcmxheSwgY2hpbGRyZW4sIG1vZGFsVGl0bGVJZH0gPSB0aGlzLnByb3BzO1xyXG5cclxuICAgICAgICBjb25zdCBvcHRpb25uYWxNb2RhbFByb3BzID0ge307XHJcbiAgICAgICAgaWYgKG1vZGFsVGl0bGVJZCkge1xyXG4gICAgICAgICAgICBvcHRpb25uYWxNb2RhbFByb3BzWydhcmlhLWxhYmVsbGVkYnknXSA9IG1vZGFsVGl0bGVJZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdiBkYXRhLWZvY3VzPSdwb3BpbicgZGF0YS1sZXZlbD17bGV2ZWx9IGRhdGEtc2l6ZT17dGhpcy5fdmFsaWRhdGVTaXplKCl9IGRhdGEtdHlwZT17dHlwZX0gPlxyXG4gICAgICAgICAgICAgICAge3RoaXMuc3RhdGUub3BlbmVkICYmXHJcbiAgICAgICAgICAgICAgICAgICAgPE92ZXJsYXkgY2xpY2tIYW5kbGVyPXttb2RhbCAmJiB0aGlzLnRvZ2dsZU9wZW59IHJlZj0ncG9waW4tb3ZlcmxheScgcmVzaXplPXsnZnVsbCcgPT09IHR5cGV9IHNob3c9e292ZXJsYXl9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHsuLi50aGlzLl9nZXRBbmltYXRpb25Qcm9wcygpIH0gZGF0YS1mb2N1cz0ncG9waW4td2luZG93JyB7Li4ub3B0aW9ubmFsTW9kYWxQcm9wc30gcm9sZT0nZGlhbG9nJyBvbkNsaWNrPXt0aGlzLl9wcmV2ZW50UG9waW5DbG9zZX0gcmVmPSdwb3Bpbi13aW5kb3cnPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3NOYW1lPSdtYXRlcmlhbC1pY29ucycgZGF0YS1mb2N1cz0ncG9waW4td2luZG93LWNsb3NlJyBvbkNsaWNrPXt0aGlzLnRvZ2dsZU9wZW59PmNsb3NlPC9pPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBvbldoZWVsPXt0aGlzLl9vbldoZWVsfT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7Y2hpbGRyZW59XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9PdmVybGF5PlxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApO1xyXG4gICAgfSxcclxuICAgIC8qKlxyXG4gICAgKiBDb21wdXRlIHRoZSBhbmltYXRpb24gY2xhc3Nlc1xyXG4gICAgKiBAcmV0dXJuIHtPYmplY3R9IHRoZSBwcm9wcyB0byBhdHRhY2ggdG8gdGhlIGNvbXBvbmVudFxyXG4gICAgKiBAcHJpdmF0ZVxyXG4gICAgKi9cclxuICAgIF9nZXRBbmltYXRpb25Qcm9wcygpIHtcclxuICAgICAgICBsZXQgb3BlbmluZ0FuaW1hdGlvbjtcclxuICAgICAgICBsZXQgY2xvc2luZ0FuaW1hdGlvbjtcclxuICAgICAgICBzd2l0Y2ggKHRoaXMucHJvcHMudHlwZSkge1xyXG4gICAgICAgICAgICBjYXNlICdmcm9tLW1lbnUnOlxyXG4gICAgICAgICAgICAgICAgb3BlbmluZ0FuaW1hdGlvbiA9ICdzbGlkZUluTGVmdCc7XHJcbiAgICAgICAgICAgICAgICBjbG9zaW5nQW5pbWF0aW9uID0gJ3NsaWRlT3V0TGVmdCc7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnZnJvbS1yaWdodCc6XHJcbiAgICAgICAgICAgICAgICBvcGVuaW5nQW5pbWF0aW9uID0gJ3NsaWRlSW5SaWdodCc7XHJcbiAgICAgICAgICAgICAgICBjbG9zaW5nQW5pbWF0aW9uID0gJ3NsaWRlT3V0UmlnaHQnO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICBvcGVuaW5nQW5pbWF0aW9uID0gJ3pvb21Jbic7XHJcbiAgICAgICAgICAgICAgICBjbG9zaW5nQW5pbWF0aW9uID0gJ3pvb21PdXQnO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiAoe1xyXG4gICAgICAgICAgICBjbGFzc05hbWU6IGBhbmltYXRlZCAke29wZW5pbmdBbmltYXRpb259YCxcclxuICAgICAgICAgICAgJ2RhdGEtYW5pbWF0aW9uJzogb3BlbmluZ0FuaW1hdGlvbixcclxuICAgICAgICAgICAgJ2RhdGEtY2xvc2luZy1hbmltYXRpb24nOiBjbG9zaW5nQW5pbWF0aW9uXHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgLyoqXHJcbiAgICAqIFZhbGlkYXRlIHRoZSBvcHRpb25hbCBnaXZlbiBzaXplXHJcbiAgICAqIEByZXR1cm4ge3N0cmluZ30gdGhlIHZhbGlkYXRlZCBzaXplXHJcbiAgICAqIEBwcml2YXRlXHJcbiAgICAqL1xyXG4gICAgX3ZhbGlkYXRlU2l6ZSgpIHtcclxuICAgICAgICBpZiAoIVsnc21hbGwnLCAnbWVkaXVtJywgJ2xhcmdlJ10uZmluZChzaXplID0+IHNpemUgPT09IHRoaXMucHJvcHMuc2l6ZSkpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEFyZ3VtZW50SW52YWxpZEV4Y2VwdGlvbignUGxlYXNlIHByb3ZpZGUgYSB2YWxpZCBwb3BpbiBzaXplIGFtb25nIHNtYWxsLCBtZWRpdW0gYW5kIGxhcmdlLiBQcm92aWRlZCAnICsgdGhpcy5wcm9wcy5zaXplKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMuc2l6ZTtcclxuICAgIH0sXHJcbiAgICAvKipcclxuICAgICogUHJldmVudCBwb3BpbiBjbG9zZSB3aGVuIHRoZXJlJ3MgYSBjbGljayBvbiB0aGUgcG9waW4gd2luZG93XHJcbiAgICAqIEBwYXJhbSB7T2JqZWN0fSBldmVudCAtIHJhaXNlZCBieSB0aGUgY2xpY2tcclxuICAgICogQHByaXZhdGVcclxuICAgICovXHJcbiAgICBfcHJldmVudFBvcGluQ2xvc2UoZXZlbnQpIHtcclxuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgIH1cclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gYnVpbGRlcihwb3Bpbik7XHJcbiJdfQ==