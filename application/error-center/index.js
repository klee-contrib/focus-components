var builder = require('focus').component.builder;
var React = require('react');
var type = require('focus').component.types;
var assign = require('object-assign');
var errorCenter = {
  getDefaultProps(){
    return {
      source: window,
      errors: [],
      isErrorsVisible: false
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
  /** @inheriteddoc */
  render() {
    return (
      <div data-focus='error-center'>
        <div data-focus='error-counter'>
          {this.state.errors.length}
        </div>
        <div data-focus='error-actions'>
          {
            this.state.errors.length > 1
            &&
            <button className='btn btn-default' onClick={()=>{window.location.reload();}}>Reload</button>
          }
          {
            this.state.errors.length > 1
            &&
            <button className='btn btn-default' onClick={this._toggleVisible}>{this.state.isErrorsVisible ? "Hide Errors":"Show Errors"}</button>
          }
        </div>
        <ul data-focus='error-stack'>
          {this.state.isErrorsVisible ? this.state.errors.map((err)=>{return <li>{err}</li>}) : null}
        </ul>
      </div>
      );
  }
};

module.exports = builder(errorCenter);
