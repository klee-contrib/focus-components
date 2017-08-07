import React from 'react';
import builder from 'focus-core/component/builder';
import types from 'focus-core/component/types';
import { component as Button } from '../action';
import i18nMixin from '../../i18n/mixin';
import stylableMixin from '../../../mixin/stylable';
import { scrollTo, scrollPosition } from '../../mixin/scroll';

/**
* Mixin button.
* @type {Object}
*/
const backToTopMixin = {
    displayName: 'ButtonBackToTop',
    mixins: [i18nMixin, stylableMixin],
    /** inheritedDoc */
    getDefaultProps() {
        return {
            iconPrefix: 'fa fa-',
            iconName: 'arrow-circle-up',
            duration: 100,
            scrollStart: 100
        };
    },
    /**
    * Props validation
    */
    propTypes: {
        iconPrefix: types('string'),
        iconName: types('string'),
        duration: types('number'),
        scrollStart: types('number')
    },
    /** inheritedDoc */
    getInitialState() {
        return {
            isVisible: false
        };
    },
    componentWillMount() {
        console.warn('FocusComponents v0.15: the \'ButtonBackToTop\' component from FocusComponents.common is deprecated, please use FocusComponents.components.ButtonBackToTop');
    },
    /**
    * Component did mount, attach the scroll spy
    */
    componentDidMount() {
        this._scrollCarrier = window;
        this._scrollCarrier.addEventListener('scroll', this._scrollSpy);
        this._scrollCarrier.addEventListener('resize', this._scrollSpy);
        this._scrollSpy();
    },
    componentWillUnmount() {
        this._scrollCarrier.removeEventListener('scroll', this._scrollSpy);
        this._scrollCarrier.removeEventListener('resize', this._scrollSpy);
    },
    /**
    * The scroll event handler
    * @private
    */
    _scrollSpy() {
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
    },
    /**
    * Go back to the top of the page.
    */
    goBackToTop() {
        //TODO: Add animation
        scrollTo(undefined, 0);
    },
    /** inheritedDoc */
    render() {
        const { isVisible } = this.state;
        return isVisible ? (
            <div data-focus='back-to-top'><Button color='colored' handleOnClick={this.goBackToTop} icon='expand_less' shape='fab' /></div>
        ) : null;
    }
};

const { mixin, component } = builder(backToTopMixin);
export { mixin, component };
export default { mixin, component };
