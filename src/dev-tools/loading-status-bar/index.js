import React, {PropTypes} from 'react';
import FocusCore from 'focus-core';
import LoadingStatus from './loading-status';

const requestStore = FocusCore.network.builtInStore;

class LoadingStatusWrapper {
  componentWillMount() {
      requestStore.addUpdateRequestListener(this._handleRequestsUpdate);
      requestStore.addClearRequestsListener(this._handleClearRequests);
  }
  componentWillUnmount(){
      requestStore.removeUpdateRequestListener(this._handleRequestsUpdate);
      requestStore.removeClearRequestsListener(this._handleClearRequests);
  }
  _getStateFromStore(){
      return requestStore.getRequests();
  }
  _handleRequestsUpdate(){
      this.setState(this._getStateFromStore());
  }
  _handleClearRequests(){
      this.setState({requests: {}});
  }
  render(){
    const {total, pending} = this.state;
    const isLoading = (+((total - pending)/total)*100) < 100;
    return isLoading ? <LoadingStatus /> : null;
  }
}

export default LoadingStatusWrapper;
