import builder from 'focus-core/component/builder';
let React = require('react');
import type from 'focus-core/component/types';
import {builtInStore as requestStore} from 'focus-core/network';
let assign = require('object-assign');
let ProgressBar = require('../../common/progress-bar').component;
let Icon = require('../../common/icon').component;
let LoadingBarMixin = {
    /** @inheriteddoc */
    getInitialState() {
        return this._getStateFromStore();
    },
    /** @inheriteddoc */
    componentWillMount() {
        requestStore.addUpdateRequestListener(this._handleRequestsUpdate);
        requestStore.addClearRequestsListener(this._handleClearRequests);
    },
    /** @inheriteddoc */
    componentWillUnmount: function cartridgeWillUnMount() {
        requestStore.removeUpdateRequestListener(this._handleRequestsUpdate);
        requestStore.removeClearRequestsListener(this._handleClearRequests);
    },
    _getStateFromStore: function getCartridgeStateFromStore() {
        return requestStore.getRequests();
    },
    _handleRequestsUpdate: function _handlePushMessage(messageId) {
        this.setState(this._getStateFromStore());
    },
    _handleClearRequests() {
        this.setState({requests: {}});
    },
    /** @inheriteddoc */
    render: function renderProgressBar() {
        var completed = +((this.state.total - this.state.pending)/this.state.total)*100;
        var visible = false;
        const {displayDevBar} = this.props;
        if(completed < 100) {
            visible = true;
        }
        //Else empty the loading list?
        return (
            <div data-focus='loading-bar'>
                {visible && <ProgressBar completed={completed} />}
                {displayDevBar &&
                    <ul className='fa-ul'>
                        <li><Icon name='swap_vert'/> pending {this.state.pending}</li>
                        <li><Icon name='not_interested'/> cancelled {this.state.cancelled}</li>
                        <li><Icon name='check_circle'/> success {this.state.success}</li>
                        <li><Icon name='error'/> error {this.state.error}</li>
                        <li><Icon name='functions'/> total {this.state.total}</li>
                    </ul>
                }
            </div>
        );
    }
};

module.exports = builder(LoadingBarMixin);
