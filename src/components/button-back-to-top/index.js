import React, {Component, PropTypes} from 'react';
import builder from 'focus-core/component/builder';
import types from 'focus-core/component/types';
import Button from '../button';
const {scrollTo, scrollPosition} = require('../../common/mixin/scroll');


class ButtonBackToTop extends Component {

    static defaultProps = {
        iconPrefix: 'fa fa-',
        iconName: 'arrow-circle-up',
        duration: 100,
        scrollStart: 100
    };

    static propTypes = {
        iconPrefix: PropTypes.string,
        iconName: PropTypes.string,
        duration: PropTypes.number,
        scrollStart: PropTypes.number
    };

    state = {
        isVisible: false
    };

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
    };

    /**
    * Go back to the top of the page.
    */
    goBackToTop = () => {
        //TODO: Add animation
        scrollTo(undefined, 0);
    };

    render = () => {
        console.log('Action button', Button);
        const {isVisible} = this.state;
        return isVisible ? <div data-focus='back-to-top'><Button color='colored' handleOnClick={this.goBackToTop} icon='expand_less' shape='fab' /></div> : null;
    };
}

ButtonBackToTop.displayName = 'ButtonBackToTop';
export default ButtonBackToTop;
