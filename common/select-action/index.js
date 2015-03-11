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
     * @returns {{ operationList: list of operations,
     *              style: css class of the selector.}}
     */
    getDefaultProps: function(){
        return {
            operationList:[],
            style: "dots-three-vertical"
        };
    },

    /**
     * Handle action on selected item.
     * @param key
     * @returns {Function}
     */
    _handleAction: function handleSelectAction(key){
        return (event)=>{
            if(this.props.operationParam){
                this.props.operationList[key].action(this.props.operationParam);
            }else{
                this.props.operationList[key].action();
            }
        };
    },

    _getList: function(operationList) {
        var liList = []
        for (var key in operationList) {
            var operation = operationList[key];
            liList.push(<li key={key} onClick={this._handleAction(key)} className={operation.style} ><a href="javascript:void(0)">{operation.label}</a></li>);
            if(operation.childOperationList) {
                liList.push(<li><ul>{this._getList(operation.childOperationList)}</ul></li>);
            }
        }
        return liList;
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
        var style = "btn btn-primary ";
        return (
            <div className="select-action btn-group">
                <a href="#" data-target="#" class="btn btn-primary dropdown-toggle" data-toggle="dropdown"><Img src={this.props.style} /></a>

                <ul className="dropdown-menu">{liList}</ul>
            </div>);
    }


};

module.exports =  builder(selectActionMixin);
