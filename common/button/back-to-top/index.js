var React = require('react');
var builder = require('focus').component.builder;
var Icon = require('../../icon').component;
var i18nMixin = require('../../i18n/mixin');
var stylableMixin = require('../../../mixin/stylable');
var scrollTo = require('../../mixin/scroll-to').scrollTo;

/**
 * Mixin button.
 * @type {Object}
 */
var buttonMixin = {
    /** inheritedDoc */
    mixins: [i18nMixin, stylableMixin],
    getDefaultProps: function () {
        return {
            iconPrefix: 'fa fa-',
            iconName: 'arrow-circle-up',
            scrollTarget: 'body',
            duration: 100,
            scrolledElementSelector: 'body',
            scrollSpyTargetSelector: undefined,
            scrollTriggerBorder: 100
        };
    },
    getInitialState() {
        return {isVisible: false};
    },
    componentWillMount() {
        this._scrollCarrier = this.props.scrollSpyTargetSelector ? document.querySelector(this.props.scrollSpyTargetSelector) : document;
        this._attachScrollSpy();
    },
    componentWillUnMount() {
        this._detachScrollSpy();
    },
    componentDidMount() {
        this._scrollSpy();
    },
    /**
     * Attach the scroll spy
     * @private
     */
    _attachScrollSpy() {
        this._scrollCarrier.addEventListener('scroll', this._scrollSpy);
        this._scrollCarrier.addEventListener('resize', this._scrollSpy);
    },
    /**
     * Detach the scroll spy
     * @private
     */
    _detachScrollSpy() {
        this._scrollCarrier.removeEventListener('scroll', this._scrollSpy);
        this._scrollCarrier.removeEventListener('resize', this._scrollSpy);
    },
    /**
     * The scroll event handler
     * @private
     */
    _scrollSpy() {
        let scrollPosition = document.querySelector(this.props.scrolledElementSelector).scrollTop;
        if (scrollPosition > this.props.scrollTriggerBorder) {
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
    goBackToTop: function goBackToTop() {
        //todo: Add animation
        scrollTo(document.querySelector(this.props.scrollTarget), 0, this.props.duration);
        //window.document.body.scrollTop = 0;
    },
    /** inheritedDoc */
    render: function renderInput() {
        let className = `${this._getStyleClassName()} ${this.state.isVisible ? '' : 'invisible'}`;
        return <button className={className} data-focus='back-to-top' onClick={this.goBackToTop}>
            <Icon prefix={this.props.iconPrefix} name={this.props.iconName} />
            <div>{this.i18n('button.backTop')}</div>
        </button>;
    }
};

module.exports = builder(buttonMixin);
