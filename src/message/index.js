const {builder, types} = require('focus-core').component;
const i18nBehaviour = require('../common/i18n/mixin');
const Button = require('../common/button/action').component;
const messageMixin = {
    /** @inheritedDoc */
    getDefaultProps(){
        return {
            type: 'info',
            style: {}
        };
    },
    /** @inheritedDoc */
    propTypes: {
        title: types('string'),
        content: types('string'),
        type: types('string'),
        ttl: types('number'),
        style: types('object')
    },
    /** @inheritedDoc */
    componentDidMount(){
        if(this.props.ttl){
            setTimeout(()=>{
                this._handleTimeToLeave();
            }, this.props.ttl);
        }
    },
    /** @inheritedDoc */
    mixins: [i18nBehaviour],
    /**
    * Time to leave handler.
    */
    _handleTimeToLeave(){
        let {handleTimeToLeave, id} = this.props;
        if(handleTimeToLeave){
            handleTimeToLeave(id);
        }
    },
    /**
    * Handle click on the dismiss button.
    * @param {Event} event - Sanitize event.
    */
    _handleOnClick(event){
        let {handleOnClick, id} = this.props;
        if(handleOnClick){
            handleOnClick(id);
        }
    },
    /**
    * Render an alert.
    * @return {JSX} The jsx.
    */
    render(){
        const {type, id, content, title} = this.props;
        return (
            <div data-focus='message' data-id={id} data-message-type={type} >
                <Button handleOnClick={this._handleOnClick} icon='clear' shape='icon' type='button' />
                {title && <h4>{title}</h4>}
                <p>{this.i18n(content)}</p>
            </div>
        );
    }
};
module.exports = builder(messageMixin);
