'use strict';

var React = require('react');
var builder = require('focus').component.builder;
var types = require('focus').component.types;
var Button = require('../../button/action').component;
var i18nMixin = require('../../i18n/mixin');
var stylableMixin = require('../../../mixin/stylable');

var _require = require('../../mixin/scroll');

var scrollTo = _require.scrollTo;
var scrollPosition = _require.scrollPosition;

/**
* Mixin button.
* @type {Object}
*/
var backToTopMixin = {
    displayName: 'ButtonBackToTop',
    mixins: [i18nMixin, stylableMixin],
    /** inheritedDoc */
    getDefaultProps: function getDefaultProps() {
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
    getInitialState: function getInitialState() {
        return {
            isVisible: false
        };
    },
    /**
    * Component did mount, attach the scroll spy
    */
    componentDidMount: function componentDidMount() {
        this._scrollCarrier = window;
        this._scrollCarrier.addEventListener('scroll', this._scrollSpy);
        this._scrollCarrier.addEventListener('resize', this._scrollSpy);
        this._scrollSpy();
    },
    componentWillUnMount: function componentWillUnMount() {
        this._scrollCarrier.removeEventListener('scroll', this._scrollSpy);
        this._scrollCarrier.removeEventListener('resize', this._scrollSpy);
    },
    /**
    * The scroll event handler
    * @private
    */
    _scrollSpy: function _scrollSpy() {
        var currentScrollPosition = scrollPosition();
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
    goBackToTop: function goBackToTop() {
        //TODO: Add animation
        scrollTo(undefined, 0);
    },
    /** inheritedDoc */
    render: function render() {
        var isVisible = this.state.isVisible;

        return isVisible ? React.createElement(
            'div',
            { 'data-focus': 'back-to-top' },
            React.createElement(Button, { color: 'colored', handleOnClick: this.goBackToTop, icon: 'expand_less', shape: 'fab' })
        ) : null;
    }
};

module.exports = builder(backToTopMixin);