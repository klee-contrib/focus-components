let {builder, types} = require('focus').component;
let i18nBehaviour = require('../common/i18n/mixin');
let messageMixin = {
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
        //Maybe it is not the best way to do it.
        //React.unmountComponentAtNode(this.getDOMNode().parentNode);
    },
    _renderTitle() {
        let {title} = this.props;
        return title ? <h4>{title}</h4> : null;
    },
    /**
     * Render an alert.
     * @return {JSX} The jsx.
     */
    render(){
        let {type, style, id, content} = this.props;
        type = type && 'error' === type ? 'danger' : type;
        let cssClass = `alert alert-dismissable alert-${type} ${style && style.className}`;
        return (
          <div className={cssClass} data-focus='message' data-id={id} >
            <button className='close' onClick={this._handleOnClick} type='button' >×</button>
            {this._renderTitle()}
            <p>{this.i18n(content)}</p>
          </div>
        );
    }
};
module.exports = builder(messageMixin);
