const React = require('react');
const {builder, types} = require('focus').component;
const i18nBehaviour = require('../../common/i18n/mixin');
const styleBehaviour = require('../../mixin/stylable');
const Title = require('../title').component;

/**
* Mixin used in order to create a block.
* @type {Object}
*/
const blockMixin = {
    mixins: [i18nBehaviour, styleBehaviour],
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
    /**
    * Render the a block container and the cild content of the block.
    * @return {DOM} React DOM element
    */
    render: function renderBlock(){
        const {actions, children} = this.props;
        return (
            <div>
                <div className="mdl-card mdl-card--border mdl-shadow--8dp" data-focus='block'>
                    <div className="mdl-card__title mdl-card--border" data-focus='block-title'>
                        <Title label={this.heading()} />
                        {actions &&
                            <div className="actions">{actions()}</div>
                        }
                    </div>
                    <div className="mdl-card__supporting-text">
                        {children}
                    </div>
                    {actions &&
                        <div className="mdl-card__actions mdl-card--border">
                            {actions()}
                        </div>
                    }
                </div>
            </div>
        );
    }
};

module.exports = builder(blockMixin);
