var React = require('react');
var builder = require('focus').component.builder;
var Icon = require('../../icon').component;
var i18nMixin = require('../../i18n/mixin');
var stylableMixin = require('../../../mixin/stylable');

function scrollTo(element, to, duration) {
    if (duration < 0) {return; }
    var difference = to - element.scrollTop;
    var perTick = difference / duration * 10;

    setTimeout(function() {
        element.scrollTop = element.scrollTop + perTick;
        if (element.scrollTop === to) {return; }
        scrollTo(element, to, duration - 10);
    }, 10);
}

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
        duration: 300
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
