import React, { Component } from 'react';
import { builtInStore as requestStore } from 'focus-core/network';

// import storeConnect from '../../behaviours/store/connect';
import ProgressBar from '../progress-bar';
import Icon from '../icon';

/**
 * Loading bar, listening on Request store
 * 
 * @class HeaderLoadingBar
 * @extends {Component}
 */
// @storeConnect([{ store: requestStore, properties: ['request'] }], () => requestStore.getRequests())
class HeaderLoadingBar extends Component {

    /**
     * Creates an instance of HeaderLoadingBar.
     * @param {object} props component props
     * @memberof HeaderLoadingBar
     */
    constructor(props) {
        super(props);
        this._handleRequestsUpdate = this._handleRequestsUpdate.bind(this);
        this.state = {
            isVisible: true
        };
    }


    /** @inheriteddoc */
    componentWillMount() {
        requestStore.addUpdateRequestListener(this._handleRequestsUpdate);
        requestStore.addClearRequestsListener(this._handleRequestsUpdate);
    }

    /** @inheriteddoc */
    componentWillUnmount() {
        requestStore.removeUpdateRequestListener(this._handleRequestsUpdate);
        requestStore.removeClearRequestsListener(this._handleRequestsUpdate);
    }

    _handleRequestsUpdate() {
        this.setState(requestStore.getRequests());
    }

    /** @inheritdoc */
    render() {
        const { total, pending, isVisible } = this.state;
        const completed = +((total - pending) / total) * 100;
        const visible = completed < 100;

        return (
            <div data-focus='header-loading-bar'>
                {visible && <ProgressBar completed={completed} />}
                {__DEV__ &&
                    <div data-focus='dev-network'>
                        <Icon name={isVisible ? 'network_check' : 'network_locked'} onClick={() => this.setState({ isVisible: !this.state.isVisible })} />
                        {isVisible && <ul className='fa-ul'>
                            <li><Icon name='swap_vert' /><div>{`Pending: ${this.state.pending}`}</div></li>
                            <li><Icon name='not_interested' /> <div>{`Cancelled: ${this.state.cancelled}`}</div></li>
                            <li><Icon name='check_circle' /> <div>{`Success: ${this.state.success}`}</div></li>
                            <li><Icon name='error' /> <div>{`Error: ${this.state.error}`}</div></li>
                            <li><Icon name='functions' /> <div>{`Total: ${this.state.total}`}</div></li>
                        </ul>}
                    </div>
                }
            </div>
        );

    }

}

HeaderLoadingBar.displayName = 'HeaderLoadingBar';

export default HeaderLoadingBar;