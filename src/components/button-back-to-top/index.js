import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import Button from '../button';
import Scroll from '../../behaviours/scroll';

@Scroll
class ButtonBackToTop extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isVisible: false
        };
    }

    /**
    * Component did mount, attach the scroll spy
    */
    componentDidMount() {
        this._scrollCarrier = window;
        this._scrollCarrier.addEventListener('scroll', this._scrollSpy);
        this._scrollCarrier.addEventListener('resize', this._scrollSpy);
        this._scrollSpy();
    }

    componentWillUnmount() {
        this._scrollCarrier.removeEventListener('scroll', this._scrollSpy);
        this._scrollCarrier.removeEventListener('resize', this._scrollSpy);
    }

    /**
    * The scroll event handler
    * @private
    */
    _scrollSpy = () => {
        const currentScrollPosition = scrollPosition();
        if (currentScrollPosition.top > this.props.scrollStart) {
            if (!this.state.isVisible) {
                this.setState({isVisible: true});
            }
        } else {
            if (this.state.isVisible) {
                this.setState({isVisible: false});
            }
        }
    }

    /**
    * Go back to the top of the page.
    */
    goBackToTop = () => {
        //TODO: Add animation
        scrollTo(undefined, 0);
    }

    render = () => {
        const {isVisible} = this.state;
        return isVisible ? <div data-focus='back-to-top'><Button color='colored' handleOnClick={this.goBackToTop} icon='expand_less' shape='fab' /></div> : null;
    }
}

ButtonBackToTop.displayName = 'ButtonBackToTop';
ButtonBackToTop.defaultProps = {
    iconPrefix: 'fa fa-',
    iconName: 'arrow-circle-up',
    duration: 100,
    scrollStart: 100
};
ButtonBackToTop.propTypes = {
    duration: PropTypes.number,
    iconName: PropTypes.string,
    iconPrefix: PropTypes.string,
    scrollStart: PropTypes.number
};
export default ButtonBackToTop;
