'use strict';

var React = require('react');
var builder = require('focus').component.builder;
//var i18nMixin = require('../i18n').mixin;
var Scrollspy = require('../scrollspy').component;
var type = require('focus').component.types;
var stylable = require('../../mixin/stylable');
var DefaultBackToTopComponent = require('../button/back-to-top').component;
/**
* Mixin used in order to create a Detail.
* @type {Object}
*/
var detailMixin = {
    mixins: [stylable],
    /** @inheritedDoc */
    getDefaultProps: function getDefaultProps() {
        return {
            /**
            * Activate the presence of the sticky navigation component.
            * @type {Boolean}
            */
            hasNavigation: true,
            hasBackToTop: true,
            BackToTopComponent: DefaultBackToTopComponent,
            navigationAffixOffset: 80
        };
    },
    /** @inheritedDoc */
    propTypes: {
        hasNavigation: type('bool'),
        hasBackToTop: type('bool'),
        BackToTopComponent: type(['function', 'object']),
        navigationAffixOffset: type('number')
    },
    /**
    * Returns detail content.
    * @return {object} detail content
    */
    _detailContent: function _detailContent() {
        return React.createElement(
            'div',
            { 'data-focus': 'detail-content' },
            this.props.children
        );
    },
    /** @inheritedDoc */
    render: function render() {
        var _props = this.props;
        var hasNavigation = _props.hasNavigation;
        var hasBackToTop = _props.hasBackToTop;
        var BackToTopComponent = _props.BackToTopComponent;
        var navigationAffixOffset = _props.navigationAffixOffset;

        return React.createElement(
            'div',
            { className: '' + this._getStyleClassName(), 'data-focus': 'detail' },
            hasNavigation ? React.createElement(
                Scrollspy,
                { affixOffset: navigationAffixOffset },
                this._detailContent()
            ) : this._detailContent(),
            hasBackToTop && React.createElement(BackToTopComponent, null)
        );
    }
};

module.exports = builder(detailMixin);