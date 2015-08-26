const React = require('react');
const {builder, types} = require('focus').component;
const i18nBehaviour = require('../../common/i18n/mixin');
const styleBehaviour = require('../../mixin/stylable');
const Title = require('../title').component;
const trim = require('lodash/string/trim');
/**
* Mixin used in order to create a block.
* @type {Object}
*/
const blockMixin = {
    mixins: [i18nBehaviour, styleBehaviour],

    /** @inheritedDoc */
    getDefaultProps() {
        return {
            actions: function(){
                return ; // override this to add actions.
            }
        };
    },
    /** @inheritedDoc */
    propTypes: {
        title: types('string'),
        actions: types('func')
    },
    /**
    * Header of theblock function.
    * @return {[type]} [description]
    */
    heading() {
        if(this.props.title){
            return this.i18n(this.props.title);
        }
    },
    _buildId() {
        return `${window.location.hash.slice(1)}/${trim(this.heading().toLowerCase())}`;//.replace('/', '_');
    },
    /**
    * Render the a block container and the cild content of the block.
    * @return {DOM} React DOM element
    */
    render: function renderBlock(){
        const {actions, children} = this.props;
        return (
            <div data-focus='block'>
            <header>
            <Title id={this._buildId()} title={this.heading()} />
            <div className="actions">{actions()}</div>
            </header>
            <div className="block-content">
            {children}
            </div>
            </div>
        );
    }
};

module.exports = builder(blockMixin);
