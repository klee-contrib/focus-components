//dependencies
const React = require('react');
const {Component} = React;
const types = require('focus').component.types;
/**
 * Component describing a component.
 */
class ComponentCard extends Component{
    constructor(props){
        super(props);
    }
    /** @inheriteDoc */
    render(){
        const {name, description, example, url, photo, tags} = this.props;
        const style = {background: `url('${photo}') bottom right 15% no-repeat #46B6AC`};
        return (
                <li className='demo-card-wide mdl-card mdl-shadow--2dp'>
                <div className='mdl-card__title' style={style}>
                    <h2 className='mdl-card__title-text'>{name}</h2>
                    </div>
                    <div className='mdl-card__supporting-text'>
                        {description} {tags} {url}
                    </div>
                    <div className='mdl-card__actions mdl-card--border'>
                        <a className='mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect' href={example}>
                          Example
                        </a>
                        </div>
                    <div className='mdl-card__menu'>
                        <button className='mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect'>
                          <i className='material-icons'>share</i>
                        </button>
                    </div>
                </li>
        );
    }
}

//Static props.
ComponentCard.displayName = 'ComponentCard';
ComponentCard.defaultProps = {};
ComponentCard.propTypes = {
    description: types('string'),
    example: types('string'),
    url: types('string'),
    tags: types('string'),
    photo: types('string'),
    name: types('string')
};

module.exports = ComponentCard;
