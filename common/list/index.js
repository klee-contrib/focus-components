
//var SelectionList = Focus.components.list.selection.list.component;
var builder = require('focus').component.builder;
var React = require('react');
var Button = require('../button/action').component;
var selectionListMixin = require('../../list/selection/list').mixin;
var assign = require('object-assign');
//Pour étendre SelectionList
//TODO Comment étendre une méthode d'un mixin d'une meilleur façon que celle la ?
var MySelectionList = React.createClass(
  assign(selectionListMixin,
    {
      _renderManualFetch: function renderManualFetch(){
        if(this.props.isManualFetch && this.props.hasMoreData){
          var style = {className: "primary"};
          return (
            <li className="sl-button">
              <Button label="Next"
                type="button"
                handleOnClick={this._handleShowMore}
                style={style}/>
            </li>
          );
        }
      }
  }
  )
);

module.exports = React.createClass({
  /** @inheritdoc */
  getDefaultProps: function() {
    return {
      data: [],
      reference: {}
    };
  },
  /** @inheritdoc */
  getInitialState: function(){
    return { maxElements:  this.props.perPage * page};
  },
  fetchNextPage: function fetchNextPage(page) {
  /** @inheritdoc */
    this.setState({maxElements:this.props.perPage * page });
  },
  /** @inheritdoc */
  getDataToUse: function getDataToUse() {
    if(!this.props.data){
      return [];
    }
    return this.props.data.slice(0, this.state.maxElements ? this.state.maxElements : this.props.perPage);
  },
  getReference: function(){
    return this.state.reference || this.props.reference;
  },
  /** @inheritdoc */
  render: function renderFormList() {
    var data = this.props.data || [];
    var hasMoreData = data.length > (this.state.maxElements ? this.state.maxElements : this.props.perPage);
    return (
      <MySelectionList
        data={this.getDataToUse()}
        hasMoreData={hasMoreData}
        lineComponent={this.props.line}
        isSelection={false}
        isManualFetch={true}
        fetchNextPage={this.fetchNextPage}
        reference={this.getReference()}
        />
    );
  }
});
