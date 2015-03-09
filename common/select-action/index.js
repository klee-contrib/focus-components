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
        if(this.props.operationList.length == 0) {
            return <div/>;
        }
        var liList = this._getList(this.props.operationList);
        return (<div className="select-action"><Img onClick={this.expandHandler} src={this.props.style} /><br/><ul>{liList}</ul></div>);
    },

    _getList: function(operationList) {
        var liList = []
        if(this.state.isExpanded) {
            for (var key in operationList) {
                var operation = operationList[key];
                liList.push(<li onClick={operation.action} className={operation.style} >{operation.label}</li>);
                if(operation.childOperationList) {
                    liList.push(<li><ul>{this._getList(operation.childOperationList)}</ul></li>);
                }
            }
        }
        return liList;
    },

    /**
     * Action on the root click.
     */
    expandHandler: function expandHandler() {
        this.setState({isExpanded: !this.state.isExpanded});
    }
};

module.exports =  builder(selectActionMixin);
