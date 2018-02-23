

import React from 'react';

import moment from 'moment';
import assign from 'object-assign';

import FORMAT from './utils/format';
import asConfig from './utils/as-config';
import onEnter from './on-enter';
import toMoment from './to-moment';
import checkProps from '../../../../utils/filter-html-attributes';

function emptyFn() { }

class MonthView extends React.Component {
    static displayName = 'MonthView';
    static defaultProps = asConfig();

    constructor(props) {
        super(props);
        this.toMoment = this.toMoment.bind(this);
    }
    /**
     * Formats the given date in the specified format.
     * @method format
     *
     * @param  {Date/String/Moment} value
     * @param  {String} [format] If none specified, #dateFormat will be used
     *
     * @return {String}
     */

    formatAsDay = (moment, dayDisplayFormat) => {
        return moment.format(dayDisplayFormat || 'D')
    };

    getWeekStartMoment = (value) => {
        let weekStartDay = this.weekStartDay
        let clone = this.toMoment(value).day(weekStartDay)

        return clone
    };

    /**
     * Returns all the days in the specified month.
     *
     * @param  {Moment/Date/Number} value
     * @return {Moment[]}
     */
    getDaysInMonth = (value) => {
        let first = this.toMoment(value).startOf('month')
        let beforeFirst = this.toMoment(value).startOf('month').add(-1, 'days')
        let start = this.getWeekStartMoment(first)
        let result = []
        let i = 0

        if (
            beforeFirst.isBefore(start)
            // and it doen't start with a full week before and the week has at least 1 day from current month (default)
            &&
            (this.props.alwaysShowPrevWeek || !start.isSame(first))
        ) {
            start.add(-1, 'weeks')
        }

        for (; i < 42; i++) {
            result.push(this.toMoment(start))
            start.add(1, 'days')
        }

        return result
    };

    toMoment(value, dateFormat) {
        return toMoment(value, dateFormat || this.props.dateFormat, { locale: this.props.locale })
    }

    isToday(timestamp) {
        return timestamp == +this.toMoment().startOf('day');
    }

    render() {

        let props = assign({}, this.props)

        let dateFormat = props.dateFormat
        let viewMoment = props.viewMoment = this.toMoment(props.viewDate, dateFormat)

        let weekStartDay = props.weekStartDay

        if (weekStartDay == null) {
            weekStartDay = props.localeData._week ? props.localeData._week.dow : null
        }

        this.weekStartDay = props.weekStartDay = weekStartDay

        if (props.minDate && moment.isMoment(props.minDate)) {
            props.minDate.startOf('day');
        }

        props.minDate && (props.minDate = +this.toMoment(props.minDate, dateFormat))
        props.maxDate && (props.maxDate = +this.toMoment(props.maxDate, dateFormat))

        this.monthFirst = this.toMoment(viewMoment).startOf('month')
        this.monthLast = this.toMoment(viewMoment).endOf('month')

        if (props.date) {
            props.moment = this.toMoment(props.date).startOf('day')
        }

        let daysInView = this.getDaysInMonth(viewMoment)

        return (
            <div className='dp-table dp-month-view'>
                {this.renderWeekDayNames()}
                {this.renderDays(props, daysInView)}
            </div>
        )
    }

    /**
     * Render the given array of days
     * @param  {Moment[]} days
     * @return {React.DOM}
     */
    renderDays = (props, days) => {
        let nodes = days.map(function (date) {
            return this.renderDay(props, date)
        }, this)

        let len = days.length
        let buckets = []
        let bucketsLen = Math.ceil(len / 7)

        let i = 0

        for (; i < bucketsLen; i++) {
            buckets.push(nodes.slice(i * 7, (i + 1) * 7))
        }

        return buckets.map(function (bucket, i) {
            return <div key={'row' + i} className='dp-week dp-row'>{bucket}</div>
        })
    };

    renderDay = (props, date) => {
        let dayText = FORMAT.day(date, props.dayFormat)
        let classes = ['dp-cell dp-day']

        let dateTimestamp = +date

        if (this.isToday(dateTimestamp)) {
            classes.push('dp-current')
        } else if (dateTimestamp < this.monthFirst) {
            classes.push('dp-prev')
        } else if (dateTimestamp > this.monthLast) {
            classes.push('dp-next')
        }

        let beforeMinDate

        if (props.minDate && date < props.minDate) {
            classes.push('dp-disabled dp-before-min')
            beforeMinDate = true
        }

        let afterMaxDate
        if (props.maxDate && date > props.maxDate) {
            classes.push('dp-disabled dp-after-max')
            afterMaxDate = true
        }

        if (dateTimestamp == props.moment) {
            classes.push('dp-value')
        }

        let mom = this.toMoment(date)
        let onClick = this.handleClick.bind(this, props, date, dateTimestamp)

        let renderDayProps = {
            role: 'link',
            tabIndex: 1,
            key: dayText,
            text: dayText,
            date: mom,
            moment: mom,
            className: classes.join(' '),
            style: {},
            onClick: onClick,
            onKeyUp: onEnter(onClick),
            children: dayText
        }

        if (beforeMinDate) {
            renderDayProps.isDisabled = true
            renderDayProps.beforeMinDate = true
        }
        if (afterMaxDate) {
            renderDayProps.isDisabled = true
            renderDayProps.afterMaxDate = true
        }

        if (typeof props.onRenderDay === 'function') {
            renderDayProps = props.onRenderDay(renderDayProps)
        }

        let defaultRenderFunction = ({ children, ...other }) => (<div {...checkProps(other)}>{children} </div>);
        let renderFunction = props.renderDay || defaultRenderFunction

        let result = renderFunction(renderDayProps)

        if (result === undefined) {
            result = defaultRenderFunction(renderDayProps)
        }

        return result
    };

    getWeekDayNames = (props) => {
        props = props || this.props

        let names = props.weekDayNames
        let weekStartDay = this.weekStartDay

        if (typeof names === 'function') {
            names = names(weekStartDay, props.locale)
        } else if (Array.isArray(names)) {

            names = [].concat(names)

            let index = weekStartDay

            while (index > 0) {
                names.push(names.shift())
                index--
            }
        }

        return names
    };

    renderWeekDayNames = () => {
        let names = this.getWeekDayNames()

        return (
            <div className='dp-row dp-week-day-names'>
                {names.map((name, index) => <div key={index} className='dp-cell dp-week-day-name'>{name}</div>)}
            </div>
        )
    };

    handleClick = (props, date, timestamp, event) => {
        if (props.minDate && timestamp < props.minDate) {
            return
        }
        if (props.maxDate && timestamp > props.maxDate) {
            return
        }

        event.target.value = date

        ; (props.onChange || emptyFn)(date, event)
    };
}

MonthView.getHeaderText = function MonthViewGetHeaderText(moment, props) {
    return toMoment(moment, null, { locale: props.locale }).format('MMMM YYYY')
}

export default MonthView
