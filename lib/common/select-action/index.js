'use strict';

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
    getDefaultProps: function getDefaultProps() {
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
    _handleAction: function _handleAction(action) {
        var _this = this;

        return function (event) {
            if (_this.props.operationParam) {
                action(_this.props.operationParam);
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
    _getList: function _getList(operationList) {
        var liList = [];
        for (var key in operationList) {
            var operation = operationList[key];

            liList.push(React.createElement(
                'li',
                { key: key, onClick: this._handleAction(operation.action), className: operation.style },
                React.createElement(
                    'a',
                    {
                        href: 'javascript:void(0)' },
                    operation.label
                )
            ));
            if (operation.childOperationList) {
                var subKey = 'sub_' + key;
                liList.push(React.createElement(
                    'li',
                    { key: subKey },
                    React.createElement(
                        'ul',
                        null,
                        this._getList(operation.childOperationList)
                    )
                ));
            }
        }
        return liList;
    },
    /**
     * Render the component.
     * @returns  {XML} Htm code.
     */
    render: function renderSelectAcion() {
        if (this.props.operationList.length == 0) {
            return React.createElement('div', null);
        }
        var liList = this._getList(this.props.operationList);
        //todo : a revoir pour gérer les boutons d'action groupés
        return React.createElement(
            'div',
            { 'data-focus': 'select-action', className: '' },
            React.createElement('a', { className: 'dropdown-toggle btn btn-fab btn-default fa fa-' + this.props.icon, 'data-toggle': 'dropdown', ref: 'dropdown-toggle' }),
            React.createElement(
                'ul',
                { className: 'dropdown-menu' },
                liList
            )
        );
    }
};

module.exports = builder(selectActionMixin);