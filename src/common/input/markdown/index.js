//Dependencies.
const builder = require('focusjs').component.builder;
const React = require('react');
const ReactDOM = require('react-dom');



const markdownEditorMixin = {
  /** @inherideddoc */
  getInitialState: function getMarkdownInitialState() {
    return {value: this.props.value};
  },
  /** @inherideddoc */
  componentDidMount: function markdownComponentDidMount(){
    if(!window.Showdown){
      console.warn('The showdown library should be imported. See https://github.com/showdownjs/showdown');
    }
  },
  /**
   * Handle the change of the value.
   */
  handleChange: function handleMarkdownChange() {
    this.setState({value: ReactDOM.findDOMNode(this.refs.textarea).value});
  },
  /** @inherideddoc */
  render: function renderMarkdownComponent() {
    const converter = window.Showdown ? function(data){ console.warn('showdown should be imported/'); return data; } : new window.Showdown.converter();
    return (
      <div className="MarkdownEditor">
        <textarea
          onChange={this.handleChange}
          ref="textarea"
          defaultValue={this.state.value} />

        <div
          className="content"
          dangerouslySetInnerHTML={{
            __html: converter.makeHtml(this.state.value)
          }}
        />
      </div>
    );
  }
};


module.exports = builder(markdownEditorMixin);
