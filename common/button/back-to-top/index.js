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
    getDefaultProps: function(){
      return {
        icon: 'arrow-circle-up',
        scrollTarget: 'body',
        duration: 100
      };
    },
    /**
     * Go back to the top of the page.
     */
    goBackToTop: function goBackToTop(){
      //todo: Add animation
      scrollTo(document.querySelector(this.props.scrollTarget), 0, this.props.duration);
      //window.document.body.scrollTop = 0;
    },
    /** inheritedDoc */
    render: function renderInput() {
      return <button className={`${this._getStyleClassName()}`} data-focus='back-to-top' onClick={this.goBackToTop}>
        <Icon name={this.props.icon}/> this.i18n('button.backTop')
      </button>;
    }
};

module.exports = builder(buttonMixin);
