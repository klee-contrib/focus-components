import React, {PropTypes, Component} from 'react';
import ReactDOM from 'react-dom';
import includes from 'lodash/includes';

/**
* Small overlay component used to listen to scroll and prevent it to leave the Modal component
*/
class ModalOverlay extends Component {
    constructor(props) {
        super(props);
        this._hideBodyOverflow.bind(this);
        this._restoreBodyOverflow.bind(this);
    }
    /**
    * Store the body overgflow property, and set it to hidden
    * @private
    */
    _hideBodyOverflow() {
        document.body.style['overflow-y'] = 'hidden';
    };
    /**
    * Restore body overflow property
    * @private
    */
    _restoreBodyOverflow() {
        document.body.style['overflow-y'] = 'auto';
    };
    /**
    * Component will unmount event handler.
    * Remove the mouse wheel listener.
    */
    componentWillUnmount() {
        // ReactDOM.findDOMNode(this.refs.overlay).removeEventListener('mousewheel', this._onScroll);
        this._restoreBodyOverflow();
    };
    /**
    * Render the component
    * @return {XML} the rendered HTML
    */
    render() {
        const {children, clickHandler, show} = this.props;
        return (
            <div className='animated fadeIn' data-animation='fadeIn' data-closing-animation='fadeOut' data-focus='modal-overlay' data-visible={show} onClick={clickHandler} ref='overlay'>
                {children}
            </div>
        );
    };
};
ModalOverlay.displayName = 'ModalOverlay';
ModalOverlay.propTypes = {
    children: PropTypes.object,
    clickHandler: PropTypes.func,
    show: PropTypes.bool
};
ModalOverlay.defaultProps = {
    show: false
};


/**
* The modal component configuration
* @type {Object}
*/
class Modal extends Component {
    constructor(props) {
        super(props);
        this._onWheel.bind(this);
        this.toggleOpen.bind(this);
        this._getAnimationProps.bind(this);

        this.state = {
            opened: this.props.open
        };
    };

    componentWillUnmount() {
        window.clearTimeout(this._openTimeoutID);
    };

    /**
    * Wheel event handler.
    * @param  {object} event wheel event
    */
    _onWheel(event) {
        ReactDOM.findDOMNode(this.refs['modal-window']).scrollTop += 0 < event.deltaY ? 100 : -100;
    };

    /**
    * Toggle the modal's open state
    */
    toggleOpen() {
        let timeout = 0;
        const {opened} = this.state;
        const {onModalClose} = this.props;
        if (opened) {
            const modalWindow = ReactDOM.findDOMNode(this.refs['modal-window']);
            const modalOverlay = ReactDOM.findDOMNode(this.refs['modal-overlay']);
            modalWindow.classList.remove(modalWindow.getAttribute('data-animation'));
            modalWindow.classList.add(modalWindow.getAttribute('data-closing-animation'));
            modalOverlay.classList.remove(modalOverlay.getAttribute('data-animation'));
            modalOverlay.classList.add(modalOverlay.getAttribute('data-closing-animation'));
            timeout = 200;
        }
        if (opened && onModalClose) {
            onModalClose();
        }
        this._openTimeoutID = setTimeout(() => {
            // Store the current modal state
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
                        // We just opened the modal, so store and hide the body overflow.
                        this.refs['modal-overlay']._hideBodyOverflow();
                    }
                }
            });
        }, timeout);
    };

    /**
    * Render the component
    * @return {XML} the rendered HTML
    */
    render() { // test for this.state.opened and return an Overlay component if true
        const {children, level, modal, overlay, size, type} = this.props;
        const animationProps = this._getAnimationProps();
        return (
            <div data-focus='modal' data-level={level} data-size={size} data-type={type} >
                {this.state.opened &&
                    <ModalOverlay clickHandler={modal && this.toggleOpen} ref='modal-overlay' resize={'full' === type} show={overlay}>
                        <div {...animationProps} data-focus='modal-window' onClick={this._preventModalClose} ref='modal-window'>
                            <i className='material-icons' data-focus='modal-window-close' onClick={this.toggleOpen}>close</i>
                            <div onWheel={this._onWheel}>
                                {children}
                            </div>
                        </div>
                    </ModalOverlay>
                }
            </div>
        );
    };

    /**
    * Compute the animation classes
    * @return {Object} the props to attach to the component
    * @private
    */
    _getAnimationProps() {
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
    };

    /**
    * Prevent modal close when there's a click on the modal window
    * @param {Object} event - raised by the click
    * @private
    */
    _preventModalClose(event) {
        event.stopPropagation();
    };
};

Modal.displayName = 'Modal';
Modal.defaultProps = {
    modal: true,
    size: 'medium',
    type: 'full',
    level: 0,
    overlay: true,
    open: false
};
Modal.propTypes = {
    modal: PropTypes.bool.isRequired,
    size: PropTypes.oneOf(['small', 'medium', 'large']).isRequired,
    type: PropTypes.string.isRequired,
    level: PropTypes.number.isRequired,
    overlay: PropTypes.bool.isRequired,
    open: PropTypes.bool.isRequired
};
export default Modal;
