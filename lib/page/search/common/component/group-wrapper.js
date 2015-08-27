// Dependencies

'use strict';

var builder = require('focus').component.builder;
var clone = require('lodash/lang/clone');

var GroupWrapper = {
    getDefaultProps: function getDefaultProps() {
        return {
            groupComponent: undefined,
            groupKey: undefined,
            count: undefined,
            isUnique: false,
            showAllHandler: undefined,
            list: undefined,
            renderResultsList: undefined
        };
    },
    getInitialState: function getInitialState() {
        return {
            resultsDisplayedCount: 3
        };
    },
    _showMoreHandler: function _showMoreHandler() {
        this.setState({
            resultsDisplayedCount: this.state.resultsDisplayedCount + 3 <= this.props.list.length ? this.state.resultsDisplayedCount + 3 : this.props.list.length
        });
    },
    render: function render() {
        var listClone = clone(this.props.list);
        var list = this.props.isUnique ? listClone : listClone.splice(0, this.state.resultsDisplayedCount);
        return React.createElement(
            this.props.groupComponent,
            { canShowMore: this.props.list.length > this.state.resultsDisplayedCount, count: this.props.count, isUnique: this.props.isUnique, groupKey: this.props.groupKey, list: list, showAllHandler: this.props.showAllHandler, showMoreHandler: this._showMoreHandler },
            this.props.renderResultsList(list, this.props.groupKey, this.props.count, this.props.isUnique)
        );
    }
};

module.exports = builder(GroupWrapper);