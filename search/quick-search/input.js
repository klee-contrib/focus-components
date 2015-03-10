var builder = require('focus/component/builder');
var type = require('focus/component/types');
var React = require('react');
var Scope = require('./scope').component;
//var Icon = require('../common/icon').component;
var words = require('lodash/string/words');
var SearchInputMixin = {
  displayName : "SearchInput",
  getDefaultProps: function(){
    return {
      placeholder: "",
      value:"defaultValue",
      scope:2,
      scopes: [
        {code: undefined, label: "None", style: "qs-scope-none"},
        {code: 1, label: "Scope1", style: "qs-scope-1"},
        {code: 2, label: "Scope2", style: "qs-scope-2"},
        {code: 3, label: "Scope3", style: "qs-scope-3"}
      ],
      minChar: 0,
      loading: false
    };
  },
  propTypes: {
    placeholder: type('string'),
    value: type('string'),
    scope: type(['string', 'number']),
    scopes: type('array'),
    minChar: type('number'),
    loading: type('bool')
  },
  getInitialState: function(){
    return {
      value: this.props.value,
      scope: this.props.scope,
      loading: this.props.loading
    };
  },
  getValue: function(){
    return {
      scope: this.refs.scope.getValue(),
      query: this.refs.query.getDOMNode().value
    };
  },
  handleKeyUp: function handleKeyUpInputSearch(event){
    var val = event.target.value;
    if(val.length >= this.props.minChar){
      console.log("keyUp", words(val));
      if(this.props.handleKeyUp){
        this.props.handleKeyUp(event);
      }
    }
  },
  handleOnClickScope: function handleOnClickScope(){
    console.log('Search value', this.getValue());
    this.setState({scope: this.refs.scope.getValue()}, this.focusQuery);
  },
  renderHelp: function renderHelp(){
    /*if(this.state.scope){
      return;
    }*/
    return (
      <div className="qs-help" ref="help">
        <span name="share" />
        <span>{"Define the scope of research"}</span>
      </div>

    );
  },
  focusQuery: function(){
    this.refs.query.getDOMNode().focus();
  },
  setStateFromSubComponent: function(){
    return this.setState(this.getValue(), this.focusQuery);
  },
  render:function renderSearchInput(){
    return (
      <div className="qs-quick-search">
        <Scope ref="scope" list={this.props.scopes} value={this.state.scope} handleOnClick={this.handleOnClickScope}/>
        <input ref="query" onKeyUp={this.handleKeyUp} type="search" />
        {this.renderHelp()}

      </div>
    );
  }
};

module.exports = builder(SearchInputMixin);
