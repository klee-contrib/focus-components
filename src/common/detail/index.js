const React = require('react');
const builder = require('focus').component.builder;
//var i18nMixin = require('../i18n').mixin;
const Scrollspy = require('../scrollspy').component;
const type = require('focus').component.types;
const stylable = require('../../mixin/stylable');
const DefaultBackToTopComponent = require('../button/back-to-top').component;
/**
* Mixin used in order to create a Detail.
* @type {Object}
*/
var detailMixin = {
    mixins: [stylable],
    /** @inheritedDoc */
    getDefaultProps() {
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
    _detailContent(){
        return (
            <div data-focus='detail-content'>
            {this.props.children}
            </div>
        );
    },
    /** @inheritedDoc */
    render() {
        const {hasNavigation, hasBackToTop, BackToTopComponent, navigationAffixOffset} = this.props;
        return (
            <div className={`${this._getStyleClassName()}`} data-focus='detail'>
            {hasNavigation ? <Scrollspy affixOffset={navigationAffixOffset}>{this._detailContent()}</Scrollspy> : this._detailContent()}
            {hasBackToTop && <BackToTopComponent/>}
            </div>
        );
    }
};

module.exports = builder(detailMixin);
