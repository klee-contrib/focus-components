import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Button from '../button';
import { scrollTo, scrollPosition } from '../../common/mixin/scroll';

/**
 * Back to top button.
 */
class ButtonBackToTop extends Component {

    static displayName = 'ButtonBackToTop';

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

    /** @inheritdoc */
    componentDidMount() {
        this._scrollCarrier = window;
        this._scrollCarrier.addEventListener('scroll', this._scrollSpy);
        this._scrollCarrier.addEventListener('resize', this._scrollSpy);
        this._scrollSpy();
    }

    /** @inheritdoc */
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
                this.setState({ isVisible: true });
            }
        } else {
            if (this.state.isVisible) {
                this.setState({ isVisible: false });
            }
        }
    };

    /**
    * Go back to the top of the page.
    */
    goBackToTop = () => {
        scrollTo(undefined, 0);
    };

    /** @inheritdoc */
    render = () => {
        const { isVisible } = this.state;
        return isVisible ? (
            <div data-focus='back-to-top'>
                <Button
                    color='colored'
                    handleOnClick={this.goBackToTop}
                    icon='expand_less'
                    shape='fab'
                    type='button'
                />
            </div>
        ) : null;
    };
}

export default ButtonBackToTop;