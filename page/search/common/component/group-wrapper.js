// Dependencies

let builder = require('focus').component.builder;

let GroupWrapper = {
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
            resultsDisplayedCount: 3
        });
    },
    _showMoreHandler() {
        this.setState({
            resultsDisplayedCount: this.state.resultsDisplayedCount + 3
        });
    },
    render() {
        let list = this.props.isUnique ? this.props.list : this.props.list.splice(0, this.state.resultsDisplayedCount);
        return (
            <this.props.groupComponent count={this.props.count} isUnique={this.props.isUnique} groupKey={this.props.groupKey} list={list} showAllHandler={this.props.showAllHandler} showMoreHandler={this._showMoreHandler}>
                {this.props.renderResultsList(list, this.props.groupKey, this.props.count, this.props.isUnique)}
            </this.props.groupComponent>
        );
    }
};

module.exports = builder(GroupWrapper);
