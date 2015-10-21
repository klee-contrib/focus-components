import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import {includes} from 'lodash';
import {exception} from 'focus-core';
import ModalOverlay from './modal-overlay'

const ArgumentInvalidException = exception.ArgumentInvalidException;

// props types
const propTypes = {
    modal: PropTypes.bool,
    size: PropTypes.string,
    types: PropTypes.string,
    level: PropTypes.number,
    overlay: PropTypes.bool,
    open: PropTypes.bool
};

const defaultProps = {
    modal: true,
    size: 'medium',
    type: 'full',
    level: 0,
    overlay: true,
    open: false
}

/**
 * The popin component configuration
 * @type {Object}
 */
class Modal extends Component {
    constructor(props) {
        super(props);
        const state = {
            opened: this.props.open
        };
        this.state = state;
    }

    /**
     * Wheel event handler.
     * @param  {object} event wheel event
     */
    _onWheel = (event) => {
        ReactDOM.findDOMNode(this.refs['modal-window']).scrollTop += 0 < event.deltaY ? 100 : -100;
    }

    /**
     * Toggle the popin's open state
     */
    toggleOpen = () => {
        let timeout = 0;
        const {opened} = this.state;
        const {onPopinClose} = this.props;
        if (opened) {
            const popinWindow = ReactDOM.findDOMNode(this.refs['modal-window']);
            const popinOverlay = ReactDOM.findDOMNode(this.refs['modal-overlay']);
            popinWindow.classList.remove(popinWindow.getAttribute('data-animation'));
            popinWindow.classList.add(popinWindow.getAttribute('data-closing-animation'));
            popinOverlay.classList.remove(popinOverlay.getAttribute('data-animation'));
            popinOverlay.classList.add(popinOverlay.getAttribute('data-closing-animation'));
            timeout = 200;
        }
        if (opened && onPopinClose) {
            onPopinClose();
        }
        setTimeout(() => {
            // Store the current popin state
            const wasOpened = this.state.opened;
            // If it was  opened, then we are closing it, so restore the body overflow before closing.
            if (wasOpened && this.refs['modal-overlay']) {
                this.refs['modal-overlay']._restoreBodyOverflow();
            }
            this.setState({
                opened: !wasOpened
            }, () => {
                if (this.refs['modal-overlay']) {
                    if (!wasOpened) {
                        // We just opened the popin, so store and hide the body overflow.
                        this.refs['modal-overlay']._storeAndHideBodyOverflow();
                    }
                }
            });
        }, timeout);
    }

    /**
     * Render the component
     * @return {XML} the rendered HTML
     */
    render() { // test for this.state.opened and return an Overlay component if true
        const {type, level, modal, overlay, children} = this.props;
        return (
            <div data-focus='modal' data-level={level} data-size={this._validateSize()} data-type={type} >
                {this.state.opened &&
                    <ModalOverlay clickHandler={modal && this.toggleOpen} ref='modal-overlay' resize={'full' === type} show={overlay}>
                        <div {...this._getAnimationProps()} data-focus='modal-window' onClick={this._preventPopinClose} ref='modal-window'>
                            <i className='fa fa-close' onClick={this.toggleOpen}></i>
                            <div onWheel={this._onWheel}>
                                {children}
                            </div>
                        </div>
                    </ModalOverlay>
                }
            </div>
        );
    }

    /**
     * Compute the animation classes
     * @return {Object} the props to attach to the component
     * @private
     */
    _getAnimationProps = () => {
        let openingAnimation;
        let closingAnimation;
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
        return ({
            className: `animated ${openingAnimation}`,
            'data-animation': openingAnimation,
            'data-closing-animation': closingAnimation
        });
    }

    /**
     * Validate the optional given size
     * @return {string} the validated size
     * @private
     */
    _validateSize = () => {
        if (!includes(['small', 'medium', 'large'], this.props.size)) {
            throw new ArgumentInvalidException('Please provide a valid popin size among small, medium and large. Provided ' + this.props.size);
        }
        return this.props.size;
    }

    /**
     * Prevent popin close when there's a click on the popin window
     * @param {Object} event - raised by the click
     * @private
     */
    _preventPopinClose = (event) => {
        event.stopPropagation();
    }
}

//Static props.
Modal.displayName = 'Modal';
Modal.defaultProps = defaultProps;
Modal.propTypes = propTypes;

export default Modal;
