

import React from 'react';
import moment from 'moment';
import assign from 'object-assign';

import FORMAT from './utils/format';
import asConfig from './utils/as-config';
import onEnter from './on-enter';

function emptyFn() { }

class DecadeView extends React.Component {
    static displayName = 'DecadeView';
    static defaultProps = asConfig();

    /**
     * Returns all the years in the decade of the given value
     *
     * @param  {Moment/Date/Number} value
     * @return {Moment[]}
     */
    getYearsInDecade = (value) => {
        let year = moment(value).get('year')
        let offset = year % 10

        year = year - offset - 1

        let result = []
        let i = 0

        let start = moment(year, 'YYYY').startOf('year')

        for (; i < 12; i++) {
            result.push(moment(start))
            start.add(1, 'year')
        }

        return result
    };

    render() {

        let props = assign({}, this.props)

        let viewMoment = props.viewMoment = moment(this.props.viewDate)

        if (props.date) {
            props.moment = moment(props.date).startOf('year')
        }

        let yearsInView = this.getYearsInDecade(viewMoment)

        return (
            <div className='dp-table dp-decade-view'>
                {this.renderYears(props, yearsInView)}
            </div>
        )
    }

    /**
     * Render the given array of days
     * @param  {Moment[]} days
     * @return {React.DOM}
     */
    renderYears = (props, days) => {
        let nodes = days.map(function (date, index, arr) {
            return this.renderYear(props, date, index, arr)
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

    renderYear = (props, date, index, arr) => {
        let yearText = FORMAT.year(date, props.yearFormat)
        let classes = ['dp-cell dp-year']

        let dateTimestamp = +date

        if (dateTimestamp == props.moment) {
            classes.push('dp-value')
        }

        if (!index) {
            classes.push('dp-prev')
        }

        if (index == arr.length - 1) {
            classes.push('dp-next')
        }

        let onClick = this.handleClick.bind(this, props, date)

        return (
            <div
                role='link'
                tabIndex='1'
                key={yearText}
                className={classes.join(' ')}
                onClick={onClick}
                onKeyUp={onEnter(onClick)}
            >
                {yearText}
            </div>
        )
    };

    handleClick = (props, date, event) => {
        event.target.value = date;
        (props.onSelect || emptyFn)(date, event)
    };

}

DecadeView.getHeaderText = (value, props) => {
    let year = moment(value).get('year')
    let offset = year % 10

    year = year - offset - 1

    return year + ' - ' + (year + 11)
};

export default DecadeView
