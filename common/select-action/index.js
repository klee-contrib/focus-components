var builder = require('focus/component/builder');
var React = require('react');
var Img = require('../img').component;


var selectActionMixin = {

    /**
     * Display name.
     */
    displayName: "select-action",
    /**
     * Default props.
     * @returns {{isExpanded: true if list of action is expanded.,
     *              operationList: list of operations,
     *              style: css class of the selector.}}
     */
    getDefaultProps: function(){
        return {
           isExpanded: false,
            operationList:[],
            style: "dots-three-vertical"
        };
    },
    /**
     * Define defautl state.
     * @returns {{isExpanded: true if list of action is expanded}}
     */
    getInitialState: function(){
        return {
            isExpanded: this.props.isExpanded
        };
    },
    /**
     * Render the component.
     * @returns Htm code.
     */
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
    /**
     * Action on the root click.
     */
    expandHandler: function expandHandler() {
        this.setState({isExpanded: !this.state.isExpanded});
    }
};

module.exports =  builder(selectActionMixin);
