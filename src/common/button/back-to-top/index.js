const React = require('react');
const builder = require('focus').component.builder;
const types = require('focus').component.types;
const Icon = require('../../icon').component;
const i18nMixin = require('../../i18n/mixin');
const stylableMixin = require('../../../mixin/stylable');
const {scrollTo, scrollPosition} = require('../../mixin/scroll');

/**
* Mixin button.
* @type {Object}
*/
const backToTopMixin = {
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
        console.debug('did mount');
    },
    componentWillUnMount() {
        this._scrollCarrier.removeEventListener('scroll', this._scrollSpy);
        this._scrollCarrier.removeEventListener('resize', this._scrollSpy);
        console.debug('will unmount');
    },
    /**
    * The scroll event handler
    * @private
    */
    _scrollSpy() {
        console.debug('scrollspy');
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
        let className = `${this._getStyleClassName()} ${this.state.isVisible ? '' : 'invisible'}`;
        return (
            <button className={className} data-focus='back-to-top' onClick={this.goBackToTop}>
            <Icon name={this.props.iconName} prefix={this.props.iconPrefix} />
            <div>{this.i18n('button.backTop')}</div>
            </button>
        );
    }
};

module.exports = builder(backToTopMixin);
