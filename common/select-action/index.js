var builder = require('focus/component/builder');
var React = require('react');
var Img = require('../img').component;


var selectActionMixin = {

    /**
     * Display name.
     */
    displayName: "select-action",
    getDefaultProps: function(){
        return {
           isExpanded: false,
            operationList:[],
            style: "dots-three-vertical"
        };
    },
    getInitialState: function(){
        return {
            isExpanded: this.props.isExpanded
        };
    },
    render: function renderSelectAcion(){
        var liList = [];
        if(this.state.isExpanded) {
            for (var key in this.props.operationList) {
                var operation = this.props.operationList[key];
                liList.push(<li onClick={operation.action} className={operation.style} >{operation.label}</li>);
            }
        }
        return (<span className="select-action"><Img onClick={this.expandHandler} src={this.props.style} /><br/><ul>{liList}</ul></span>);
    },
    expandHandler: function expandHandler() {
        this.setState({isExpanded: !this.state.isExpanded});
    }
};

module.exports =  builder(selectActionMixin);
