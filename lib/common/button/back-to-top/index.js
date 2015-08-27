'use strict';

var React = require('react');
var builder = require('focus').component.builder;
var Icon = require('../../icon').component;
var i18nMixin = require('../../i18n/mixin');
var stylableMixin = require('../../../mixin/stylable');
var scrollTo = require('../../mixin/scroll').scrollTo;

/**
 * Mixin button.
 * @type {Object}
 */
var buttonMixin = {
    /** inheritedDoc */
    mixins: [i18nMixin, stylableMixin],
    getDefaultProps: function getDefaultProps() {
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
    getInitialState: function getInitialState() {
        return { isVisible: false };
    },
    componentWillMount: function componentWillMount() {
        this._scrollCarrier = this.props.scrollSpyTargetSelector ? document.querySelector(this.props.scrollSpyTargetSelector) : document;
        this._attachScrollSpy();
    },
    componentWillUnMount: function componentWillUnMount() {
        this._detachScrollSpy();
    },
    componentDidMount: function componentDidMount() {
        this._scrollSpy();
    },
    /**
     * Attach the scroll spy
     * @private
     */
    _attachScrollSpy: function _attachScrollSpy() {
        this._scrollCarrier.addEventListener('scroll', this._scrollSpy);
        this._scrollCarrier.addEventListener('resize', this._scrollSpy);
    },
    /**
     * Detach the scroll spy
     * @private
     */
    _detachScrollSpy: function _detachScrollSpy() {
        this._scrollCarrier.removeEventListener('scroll', this._scrollSpy);
        this._scrollCarrier.removeEventListener('resize', this._scrollSpy);
    },
    /**
     * The scroll event handler
     * @private
     */
    _scrollSpy: function _scrollSpy() {
        var scrollPosition = document.querySelector(this.props.scrolledElementSelector).scrollTop;
        if (scrollPosition > this.props.scrollTriggerBorder) {
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
    goBackToTop: function goBackToTop() {
        //todo: Add animation
        scrollTo(document.querySelector(this.props.scrollTarget), 0, this.props.duration);
        //window.document.body.scrollTop = 0;
    },
    /** inheritedDoc */
    render: function renderInput() {
        var className = this._getStyleClassName() + ' ' + (this.state.isVisible ? '' : 'invisible');
        return React.createElement(
            'button',
            { className: className, 'data-focus': 'back-to-top', onClick: this.goBackToTop },
            React.createElement(Icon, { prefix: this.props.iconPrefix, name: this.props.iconName }),
            React.createElement(
                'div',
                null,
                this.i18n('button.backTop')
            )
        );
    }
};

module.exports = builder(buttonMixin);