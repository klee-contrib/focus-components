var builder = require('focus').component.builder;
var React = require('react');
var Img = require('../img').component;
var Icon = require('../icon').component;

var selectActionMixin = {

    /**
     * Display name.
     */
    displayName: 'select-action',
    /**
     * Default props.
     * @returns {object} Defauilt props.
     */
    getDefaultProps: function () {
        return {
            operationList: [],
            icon: 'ellipsis-v'
        };
    },
    /**
     * Handle action on selected item.
     * @param {function} action Action to call
     * @returns {function} Function called when item is selected.
     * @private
     */
    _handleAction: function (action) {
        return (event)=> {
            if (event) {
                event.preventDefault();
            }
            if (this.props.operationParam) {
                action(this.props.operationParam);
            } else {
                action();
            }
        };
    },

    /**
     * Generate the list of actions.
     * @param {object} operationList List of operations.
     * @returns {Array} List of action in li component.
     * @private
     */
    _getList: function (operationList) {
        var liList = [];
        for (var key in operationList) {
            var operation = operationList[key];

            liList.push(<li key={key} onClick={this._handleAction(operation.action)} className={operation.style}><a
                href="javascript:void(0)">{operation.label}</a></li>);
            if (operation.childOperationList) {
                var subKey = 'sub_' + key;
                liList.push(<li key={subKey}>
                    <ul>{this._getList(operation.childOperationList)}</ul>
                </li>);
            }
        }
        return liList;
    },
    _dropdownToggleClickHandler: function () {
        React.findDOMNode(this.refs['dropdown-toggle']).click();
    },
    /**
     * Render the component.
     * @returns  {XML} Htm code.
     */
    render: function renderSelectAcion() {
        if (this.props.operationList.length == 0) {
            return <div/>;
        }
        var liList = this._getList(this.props.operationList);
        //todo : a revoir pour gérer les boutons d'action groupés
        return (
            <div data-focus="select-action" className='' onClick={this._dropdownToggleClickHandler}>
                <a className={`btn btn-fab btn-default fa fa-${this.props.icon}`}></a>
                <a className="dropdown-toggle" data-toggle="dropdown" ref='dropdown-toggle'></a>
                <ul className="dropdown-menu">{liList}</ul>
            </div>
        );
    }
};

module.exports = builder(selectActionMixin);
