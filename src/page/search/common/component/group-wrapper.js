// Dependencies
import React from 'react';
import builder from 'focus-core/component/builder';

const GroupWrapper = {
    getDefaultProps() {
        return ({
            groupComponent: undefined,
            groupKey: undefined,
            count: undefined,
            isUnique: false,
            showAllHandler: undefined,
            list: undefined,
            renderResultsList: undefined
        });
    },
    getInitialState() {
        return ({
            resultsDisplayedCount: this.props.initialRowsCount || 3
        });
    },
    _showMoreHandler() {
        this.setState({
            resultsDisplayedCount: this.state.resultsDisplayedCount + 3 <= this.props.list.length ? this.state.resultsDisplayedCount + 3 : this.props.list.length
        });
    },
    render() {
        const list = this.props.isUnique ? this.props.list : this.props.list.slice(0, this.state.resultsDisplayedCount);
        return (
            <this.props.groupComponent canShowMore={this.props.list.length > this.state.resultsDisplayedCount} count={this.props.count} isUnique={this.props.isUnique} groupKey={this.props.groupKey} list={list} showAllHandler={this.props.showAllHandler} showMoreHandler={this._showMoreHandler}>
                {this.props.renderResultsList(list, this.props.groupKey, this.props.count, this.props.isUnique)}
            </this.props.groupComponent>
        );
    }
};

const { mixin, component } = builder(GroupWrapper);
export { mixin, component };
export default { mixin, component };
