const React = require('react');
const builder = require('focus-core').component.builder;
const types = require('focus-core').component.types;
const Button = require('../../button/action').component;
const i18nMixin = require('../../i18n/mixin');
const stylableMixin = require('../../../mixin/stylable');
const {scrollTo, scrollPosition} = require('../../mixin/scroll');

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
    /**
    * Component did mount, attach the scroll spy
    */
    componentDidMount() {
        this._scrollCarrier = window;
        this._scrollCarrier.addEventListener('scroll', this._scrollSpy);
        this._scrollCarrier.addEventListener('resize', this._scrollSpy);
        this._scrollSpy();
    },
    componentWillUnMount() {
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
                this.setState({isVisible: true});
            }
        } else {
            if (this.state.isVisible) {
                this.setState({isVisible: false});
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
        const {isVisible} = this.state;
        return isVisible ? <div data-focus='back-to-top'><Button color='colored' handleOnClick={this.goBackToTop} icon='expand_less' shape='fab' /></div> : null;
    }
};

module.exports = builder(backToTopMixin);
