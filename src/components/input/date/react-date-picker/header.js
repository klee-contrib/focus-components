let PropTypes = require('prop-types');

import React from 'react';
let P = PropTypes
import onEnter from './on-enter';

export default class extends React.Component {
    static displayName = 'DatePickerHeader';

    static propTypes = {
        onChange: P.func,
        onPrev: P.func,
        onNext: P.func,
        colspan: P.number,
        children: P.node
    };

    render() {

        let props = this.props

        return (<div className='dp-header'>
            <div className='dp-nav-table'>
                <div className='dp-row'>
                    <div
                        tabIndex='1'
                        role='link'
                        className='dp-prev-nav dp-nav-cell dp-cell'
                        onClick={props.onPrev}
                        onKeyUp={onEnter(props.onPrev)}
                    >{props.prevText}
                    </div>

                    <div
                        tabIndex='1'
                        role='link'
                        className='dp-nav-view dp-cell'
                        colSpan={props.colspan}
                        onClick={props.onChange}
                        onKeyUp={onEnter(props.onChange)}
                    >{props.children}</div>

                    <div
                        tabIndex='1'
                        role='link'
                        className='dp-next-nav dp-nav-cell dp-cell'
                        onClick={props.onNext}
                        onKeyUp={onEnter(props.onNext)}
                    >{props.nextText}</div>
                </div>
            </div>
        </div>)
    }
}