var builder = require('focus').component.builder;
var React = require('react');
var type = require('focus').component.types;
var assign = require('object-assign');
var errorCenter = {
  getDefaultProps(){
    return {
      source: window,
      errors: [],
      isErrorsVisible: false,
      numberDisplayed: 3
    }
  },
  getInitialState(){
    return {errors: this.props.errors, isErrorsVisible: this.props.isErrorsVisible};
  },
  /** @inheriteddoc */
  componentWillMount() {
    this.props.source.onerror = ((e)=>{
      let errs = this.state.errors;
      errs.push(e);
      this.setState({errors: errs});
    });
  },
  _toggleVisible(){
    this.setState({isErrorsVisible: !this.state.isErrorsVisible})
  },
  _renderErrors(){
    return (
      <div data-focus='error-center'>
        <div data-focus='error-counter'>
          <i className="fa fa-times-circle"></i>{this.state.errors.length}
        </div>
        <div data-focus='error-actions'>
          <i className='fa fa-refresh' onClick={()=>{window.location.reload();}}></i>
          <i className={`fa fa-arrow-circle-o-${this.state.isErrorsVisible ? 'up' : 'down'}`} onClick={this._toggleVisible}></i>
          <i className='fa fa-trash-o' onClick={()=>{this.setState({errors: []})}}></i>
        </div>
        <ul data-focus='error-stack'>
          {this.state.isErrorsVisible ? this.state.errors.slice(this.state.errors.length - this.props.numberDisplayed, this.state.errors.length).map((err)=>{return <li>{err}</li>}) : null}
        </ul>
      </div>
    );
  },
  /** @inheriteddoc */
  render() {
    return this.state.errors.length > 0 ? this._renderErrors() : null;
  }
};

module.exports = builder(errorCenter);
