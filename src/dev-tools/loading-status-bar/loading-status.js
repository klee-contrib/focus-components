import React, {Component} from 'react';
import MaterialBebaviour from '../../behaviours/material';


@MaterialBebaviour('spinner')
class LoadingStatus extends Component {
    render() {
        return (
        <div data-focus='loading-status'>
          <div ref='spinner' className="mdl-spinner mdl-js-spinner is-active"></div>
          <div className='content'>{'Loading'}</div>
        </div>
    );
    }
}


export default LoadingStatus;
