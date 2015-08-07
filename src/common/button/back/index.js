var React = require('react');
var builder = require('focus').component.builder;
var Icon = require('../../icon').component;
var i18nMixin = require('../../i18n/mixin');
var stylableMixin = require('../../../mixin/stylable');
var scrollTo = require('../../mixin/scroll-to').scrollTo;
var backbone = require('backbone');

/**
 * Mixin button.
 * @type {Object}
 */
var buttonBackMixin = {
    /** inheritedDoc */
    mixins: [i18nMixin, stylableMixin],
    getDefaultProps(){
      return {
        back: backbone.history.history.back
      };
    },
    /**
     * Go back to the top of the page.
     */
    goBackHistory(){
      backbone.history.history.back();
    },
    /** inheritedDoc */
    render() {
      return (
        <button data-focus='button-back' className='btn btn-link' onClick={this.goBackHistory}>
          <Icon name='navigation-arrow-back' prefix='mdi-' />
          {this.i18n('button.back')}
        </button>
      );
    }
};

module.exports = builder(buttonBackMixin);
