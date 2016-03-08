import React, {Component, PropTypes} from 'react';
import {builtInStore as requestStore} from 'focus-core/network';
import LoadingStatus from './loading-status';

class LoadingStatusWrapper extends Component {
    constructor(props) {
        super(props);
        this.state = {
            total: 0,
            pending: 0
        };

    }
    componentWillMount() {
        requestStore.addUpdateRequestListener(::this._handleRequestsUpdate);
        requestStore.addClearRequestsListener(::this._handleClearRequests);
    }
    componentWillUnmount() {
        requestStore.removeUpdateRequestListener(this._handleRequestsUpdate);
        requestStore.removeClearRequestsListener(this._handleClearRequests);
    }
    _handleRequestsUpdate() {
        this.setState(requestStore.getRequests());
    }
    _handleClearRequests() {
        this.setState({requests: {}});
    }
    render() {
        const {total, pending} = this.state;
        const isLoading = (+((total - pending)/total)*100) < 100;
        return isLoading ? <LoadingStatus /> : null;
    }
}

export default LoadingStatusWrapper;
