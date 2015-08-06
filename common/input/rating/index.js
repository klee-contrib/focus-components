let builder = require('focus').component.builder;
let React = require('react');
let type = require('focus').component.types;
let fieldGridBehaviourMixin = require('../../mixin/field-grid-behaviour');

var ratingMixin = {
  mixin: [fieldGridBehaviourMixin],

  /** @inheritdoc */
  getDefaultProps(){
    return {
      name: undefined,
      value: 0,
      max: 5
    };
  },

  /** @inheritdoc */
  propTypes: {
    value: type('number'),
    name: type('string')
  },

  /** @inheritdoc */
  getInitialState(){
    return {
      value: this.props.value
    };
  },

  /**
   * Update the component.
   * @param {object} newProps - The new props to update.
   */
  componentWillReceiveProps: function inputWillReceiveProps(newProps){
    this.setState({value: this.props.value});
  },

  /**
   * Get the rating value.
   * @return the rating value.
   */
  getValue(){
    return this.state.value;
  },

  /** @inheritdoc */
  render(){
    return (
      <div data-focus='rating'>
        {this.renderStars()}
      </div>
    );
  },

  /**
   * render te line of stars.
   */
  renderStars(){
    let stars = [];
    for(let i=this.props.max; i>0; i--){
      stars = stars.concat(this.starItem(i));
    }
    return stars;
  },

  /**
   * Handle change event.
   * @param {object} event - the change event
   */
  handleChange(event){
    this.setState({value: event.target.value});
  },

  /**
   * Create a star item.
   * @param {number} index - index of the star
   * @return a star item
   */
  starItem(index){
    let id = 'star-' + this.props.name  + '-' + index;
    let name = 'rating-' + this.props.name;
    let isChecked = this.state.value == index;
    let star = [];
    star.push(<input type="radio" id={id} name={name} value={index} onChange={this.handleChange} checked={isChecked}/>);
    star.push(<label htmlFor={id}></label>);
    return star;
  }
};

module.exports = builder(ratingMixin);

