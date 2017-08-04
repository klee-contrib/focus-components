import builder from 'focus-core/component/builder';
import React from 'react';
import { builtInStore as requestStore } from 'focus-core/network';
import { component as ProgressBar } from '../../common/progress-bar';
import { component as Icon } from '../../common/icon';

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
    componentWillUnmount() {
        requestStore.removeUpdateRequestListener(this._handleRequestsUpdate);
        requestStore.removeClearRequestsListener(this._handleClearRequests);
    },
    _getStateFromStore() {
        return requestStore.getRequests();
    },
    _handleRequestsUpdate(messageId) {
        this.setState(this._getStateFromStore());
    },
    _handleClearRequests() {
        this.setState({ requests: {} });
    },
    /** @inheriteddoc */
    render() {
        let completed = +((this.state.total - this.state.pending) / this.state.total) * 100;
        let visible = false;
        const { displayDevBar } = this.props;
        if (completed < 100) {
            visible = true;
        }
        //Else empty the loading list?
        return (
            <div data-focus='loading-bar'>
                {visible && <ProgressBar completed={completed} />}
                {displayDevBar &&
                    <ul className='fa-ul'>
                        <li><Icon name='swap_vert' /> pending {this.state.pending}</li>
                        <li><Icon name='not_interested' /> cancelled {this.state.cancelled}</li>
                        <li><Icon name='check_circle' /> success {this.state.success}</li>
                        <li><Icon name='error' /> error {this.state.error}</li>
                        <li><Icon name='functions' /> total {this.state.total}</li>
                    </ul>
                }
            </div>
        );
    }
};

const { mixin, component } = builder(LoadingBarMixin);
export { mixin, component };
export default { mixin, component };
