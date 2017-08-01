// Dependencies
import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import mdlBehaviour from '../../behaviours/material';

@mdlBehaviour('bar')
class ProgressBar extends Component {

    static propTypes = {
        completed: PropTypes.number,
        indeterminated: PropTypes.bool
    };

    static defaultProps = {
        completed: 0,
        indetermindated: false
    };

    componentDidMount() {
        const { completed } = this.props
        const bar = ReactDOM.findDOMNode(this.refs.bar);
        if (bar) {
            bar.MaterialProgress.setProgress(completed);
            bar.MaterialProgress.setBuffer(100);
        }
    }

    componentWillReceiveProps({ completed }) {
        if (0 > completed) {
            completed = 0;
        }
        if (100 < completed) {
            completed = 100;
        }
        const bar = ReactDOM.findDOMNode(this.refs.bar);
        if (bar) {
            bar.MaterialProgress.setProgress(completed);
            bar.MaterialProgress.setBuffer(100);
        }
    }

    _renderClassName() {
        const { indeterminated } = this.props;

        if (indeterminated) {
            return 'mdl-progress mdl-js-progress mdl-progress__indeterminate'
        }
        else {
            return 'mdl-progress mdl-js-progress'
        }
    }

    render() {
        let completed = +this.props.completed;
        if (0 > completed) {
            completed = 0;
        }
        if (100 < completed) {
            completed = 100;
        }
        return (
            <div className={this._renderClassName()} data-focus='progress-bar' ref='bar' />
        );
    }
}

ProgressBar.displayName = 'ProgressBar';

export default ProgressBar;
