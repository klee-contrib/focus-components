

import React from 'react';
import moment from 'moment';

import FORMAT from './utils/format';
import asConfig from './utils/as-config';
import toMoment from './to-moment';
import onEnter from './on-enter';
import assign from 'object-assign';


function emptyFn() { }

class YearView extends React.Component {
    static displayName = 'YearView';
    static defaultProps = asConfig();

    /**
     * Returns all the days in the specified month.
     *
     * @param  {Moment/Date/Number} value
     * @return {Moment[]}
     */
    getMonthsInYear = (value) => {
        let start = moment(value).startOf('year')
        let result = []
        let i = 0

        for (; i < 12; i++) {
            result.push(moment(start))
            start.add(1, 'month')
        }

        return result
    };

    render() {

        let props = assign({}, this.props)

        let viewMoment = props.viewMoment = moment(this.props.viewDate)

        if (props.date) {
            props.moment = moment(props.date).startOf('month')
        }

        let monthsInView = this.getMonthsInYear(viewMoment)

        return (
            <div className='dp-table dp-year-view'>
                {this.renderMonths(props, monthsInView)}
            </div>
        )
    }

    /**
     * Render the given array of days
     * @param  {Moment[]} days
     * @return {React.DOM}
     */
    renderMonths = (props, days) => {
        let nodes = days.map(function (date) {
            return this.renderMonth(props, date)
        }, this)
        let len = days.length
        let buckets = []
        let bucketsLen = Math.ceil(len / 4)

        let i = 0

        for (; i < bucketsLen; i++) {
            buckets.push(nodes.slice(i * 4, (i + 1) * 4))
        }

        return buckets.map(function (bucket, i) {
            return <div key={'row' + i} className='dp-row'>{bucket}</div>
        })
    };

    renderMonth = (props, date) => {
        let monthText = FORMAT.month(date, props.monthFormat)
        let classes = ['dp-cell dp-month']

        let dateTimestamp = +date

        if (dateTimestamp == props.moment) {
            classes.push('dp-value')
        }

        let onClick = this.handleClick.bind(this, props, date)

        return (
            <div
                tabIndex='1'
                role='link'
                key={monthText}
                className={classes.join(' ')}
                onClick={onClick}
                onKeyUp={onEnter(onClick)}
            >
                {monthText}
            </div>
        )
    };

    handleClick = (props, date, event) => {
        event.target.value = date;

        (props.onSelect || emptyFn)(date, event);
    };
}

YearView.getHeaderText = function YearViewGetHeaderText(moment, props) {
    return toMoment(moment, null, { locale: props.locale }).format('YYYY')
}

export default YearView
