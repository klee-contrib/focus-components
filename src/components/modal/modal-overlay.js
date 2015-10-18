import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';

// props types
const propTypes = {
    children: PropTypes.object,
    clickHandler: PropTypes.func,
    show: PropTypes.bool
};

// no props definition

/**
 * Small overlay component used to listen to scroll and prevent it to leave the Popin component
 */
class ModalOverlay extends Component {
    /**
     * Component did mount event handler.
     * Add a listener to the mouse wheel, to spy the scroll.
     */
    componentDidMount() {
        ReactDOM.findDOMNode(this.refs.overlay).addEventListener('mousewheel', this._onScroll);
    }

    /**
     * Store the body overgflow property, and set it to hidden
     * @private
     */
    _storeAndHideBodyOverflow = () => {
        this._oldScroll = document.body.style['overflow-y'];
        document.body.style['overflow-y'] = 'hidden';
    }

    /**
     * Restore body overflow property
     * @private
     */
    _restoreBodyOverflow = () => {
        document.body.style['overflow-y'] = this._oldScroll;
    }

    /**
     * Component will unmount event handler.
     * Remove the mouse wheel listener.
     */
    componentWillUnmount() {
        ReactDOM.findDOMNode(this.refs.overlay).removeEventListener('mousewheel', this._onScroll);
    }

    /**
     * Mouse wheel event handler.
     * @param {Object} event - raised by the mouse wheel.
     * @private
     */
    _onScroll = (event) => {
        const target = event.target;
        const direction = 0 > event.wheelDeltaY ? 'down' : 'up';
        // Test if scrolling down the lower limit
        if (target.clientHeight + target.scrollTop === target.scrollHeight && 'down' === direction) {
            event.preventDefault();
        }
        // Test if scrolling up the upper limit
        if (0 === target.scrollTop && 'up' === direction) {
            event.preventDefault();
        }
    }

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
    }
}

//Static props.
ModalOverlay.displayName = 'ModalOverlay';
//ModalOverlay.defaultProps = defaultProps;
ModalOverlay.propTypes = propTypes;

export default ModalOverlay;
