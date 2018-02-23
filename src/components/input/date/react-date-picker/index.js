import PropTypes from 'prop-types';

import React from 'react';

import moment from 'moment';
import assign from 'object-assign';
import asConfig from './utils/as-config';

import MonthView from './month-view';
import YearView from './year-view';
import DecadeView from './decade-view';
import Header from './header';

import toMoment from './to-moment';

import onEnter from './on-enter';
import checkProps from '../../../../utils/filter-html-attributes';

let hasOwn = function hasOwn(obj, key) {
    return Object.prototype.hasOwnProperty.call(obj, key)
}

let Views = {
    month: MonthView,
    year: YearView,
    decade: DecadeView
}

function emptyFn() { }

class DatePicker extends React.Component {
    static displayName = 'DatePicker';

    static propTypes = {
        todayText: PropTypes.string,
        gotoSelectedText: PropTypes.string,

        renderFooter: PropTypes.func,
        onChange: PropTypes.func,

        date: PropTypes.any,
        viewDate: PropTypes.any
    };

    static defaultProps = (function () {
        let props = assign({}, asConfig(), {
            isDatePicker: true,
            navOnDateClick: true,
            defaultStyle: {
                boxSizing: 'border-box'
            }
        })

        delete props.viewDate
        delete props.date

        return props
    }());

    state = {
        view: this.props.defaultView,
        viewDate: this.props.defaultViewDate,
        defaultDate: this.props.defaultDate
    };

    constructor(props) {
        super(props);
        this.toMoment = this.toMoment.bind(this);
    }

    getViewOrder = () => {
        return this.props.viewOrder || ['month', 'year', 'decade']
    };

    getViewName = () => {
        let view = this.props.view != null ?
            this.props.view :
            this.state.view

        return view || 'month'
    };

    addViewIndex = (amount) => {
        let viewName = this.getViewName()

        let order = this.getViewOrder()
        let index = order.indexOf(viewName)

        index += amount

        return index % order.length
    };

    getNextViewName = () => {
        return this.getViewOrder()[this.addViewIndex(1)]
    };

    getPrevViewName = () => {
        return this.getViewOrder()[this.addViewIndex(-1)]
    };

    getView = () => {
        let views = this.props.views || Views
        return views[this.getViewName()] || views.month
    };

    getViewFactory = () => {
        let view = this.getView()

        if (React.createFactory && view && view.prototype && typeof view.prototype.render === 'function') {
            view.__factory = view.__factory || React.createFactory(view)
            view = view.__factory
        }

        return view
    };

    getViewDate = () => {
        let date = hasOwn(this.props, 'viewDate') ?
            this.props.viewDate :
            this.state.viewDate

        date = date || this.viewMoment || this.getDate() || new Date()

        if (moment.isMoment(date)) {
            //in order to strip the locale - the date picker may have had its locale changed
            //between two render calls. If we don't strip this, moment(mom) returns a new moment
            //with the locale of mom, which is not what we want
            date = +date
        }

        date = this.toMoment(date)

        return date
    };

    getDate = () => {
        let date

        if (hasOwn(this.props, 'date')) {
            date = this.props.date
        } else {
            date = this.state.defaultDate
        }

        return date ? this.toMoment(date) : null
    };

    toMoment(value, dateFormat) {
        return toMoment(value, dateFormat || this.props.dateFormat, { locale: this.props.locale })
    }

    render() {

        let props = assign({}, this.props)

        let view = this.getViewFactory()

        props.date = this.getDate()

        let dateString = (props.date == null ? '' : props.date.format(this.props.dateFormat))

        props.viewDate = this.viewMoment = this.getViewDate()
        props.locale = this.props.locale
        props.localeData = moment.localeData(props.locale)

        props.renderDay = this.props.renderDay
        props.onRenderDay = this.props.onRenderDay

        // props.onChange  = this.handleChange
        // props.onSelect  = this.handleSelect

        let className = (this.props.className || '') + ' date-picker'

        props.style = this.prepareStyle(props)

        let viewProps = props
        viewProps = asConfig(props)

        viewProps.dateString = dateString
        viewProps.localeData = props.localeData
        viewProps.onSelect = this.handleSelect
        viewProps.onChange = this.handleChange

        return (
            <div {...checkProps(this.props)} className={className} style={props.style} >
                {this.renderHeader(view, props)}

                <div className='dp-body' style={{ flex: 1 }}>
                    {view(viewProps)}
                </div>

                {this.renderFooter(props)}
            </div>
        )
    }

    prepareStyle = (props) => {
        return assign({}, props.defaultStyle, props.style)
    };

    renderFooter = (props) => {
        if (this.props.hideFooter) {
            return
        }

        if (this.props.today) {
            console.warn('Please use "todayText" prop instead of "today"!')
        }
        if (this.props.gotoSelected) {
            console.warn('Please use "gotoSelectedText" prop instead of "gotoSelected"!')
        }

        let todayText = this.props.todayText || 'Today'
        let gotoSelectedText = this.props.gotoSelectedText || 'Go to selected'

        let footerProps = {
            todayText: todayText,
            gotoSelectedText: gotoSelectedText,
            gotoToday: this.gotoNow,
            gotoSelected: this.gotoSelected.bind(this, props),
            date: props.date,
            viewDate: props.viewDate
        }

        let result
        if (typeof this.props.footerFactory === 'function') {
            result = this.props.footerFactory(footerProps)
        }

        if (result !== undefined) {
            return result
        }

        return (
            <div className='dp-footer'>
                <div
                    tabIndex='1'
                    role='link'
                    className='dp-footer-today'
                    onClick={footerProps.gotoToday}
                    onKeyUp={onEnter(footerProps.gotoToday)}
                >
                    {todayText}
                </div>
                <div
                    tabIndex='1'
                    role='link'
                    className='dp-footer-selected'
                    onClick={footerProps.gotoSelected}
                    onKeyUp={onEnter(footerProps.gotoSelected)}
                >
                    {gotoSelectedText}
                </div>
            </div>
        )
    };

    gotoNow = () => {
        this.gotoDate(+new Date())
    };

    gotoSelected = (props) => {
        this.gotoDate(props.date || +new Date())
    };

    gotoDate = (value) => {

        this.setView('month')

        this.setViewDate(value)
    };

    getViewColspan = () => {
        let map = {
            month: 5,
            year: 2,
            decade: 2
        }

        return map[this.getViewName()]
    };

    renderHeader = (view, props) => {

        if (this.props.hideHeader) {
            return
        }

        props = props || this.props

        let viewDate = this.getViewDate()
        let headerText = this.getView().getHeaderText(viewDate, props)

        let colspan = this.getViewColspan()
        let prev = this.props.navPrev
        let next = this.props.navNext

        return (<Header
            prevText={prev}
            nextText={next}
            colspan={colspan}
            onPrev={this.handleNavPrev}
            onNext={this.handleNavNext}
            onChange={this.handleViewChange}
                >
            {headerText}
        </Header>)
    };

    handleRenderDay = (date) => {
        return (this.props.renderDay || emptyFn)(date) || []
    };

    handleViewChange = () => {
        this.setView(this.getNextViewName())
    };

    /**
     * Use this method to set the view.
     *
     * @param {String} view 'month'/'year'/'decade'
     *
     * It calls onViewChange, and if the view is uncontrolled, also sets it is state,
     * so the datepicker gets re-rendered view the new view
     *
     */
    setView = (view) => {

        if (typeof this.props.onViewChange === 'function') {
            this.props.onViewChange(view)
        }

        if (this.props.view == null) {
            this.setState({
                view: view
            })
        }
    };

    setViewDate = (moment) => {

        moment = this.toMoment(moment)

        let fn = this.props.onViewDateChange

        if (typeof fn === 'function') {

            let text = moment.format(this.props.dateFormat)
            let view = this.getViewName()

            fn(text, moment, view)
        }

        if (!hasOwn(this.props, 'viewDate')) {
            this.setState({
                viewDate: moment
            })
        }
    };

    getNext = () => {
        let current = this.getViewDate()
        let toMoment = this.toMoment

        return ({
            month: function () {
                return toMoment(current).add(1, 'month')
            },
            year: function () {
                return toMoment(current).add(1, 'year')
            },
            decade: function () {
                return toMoment(current).add(10, 'year')
            }
        })[this.getViewName()]()
    };

    getPrev = () => {
        let current = this.getViewDate()
        let toMoment = this.toMoment

        return ({
            month: function () {
                return toMoment(current).add(-1, 'month')
            },
            year: function () {
                return toMoment(current).add(-1, 'year')
            },
            decade: function () {
                return toMoment(current).add(-10, 'year')
            }
        })[this.getViewName()]()
    };

    handleNavigation = (direction, event) => {
        let viewMoment = direction == -1 ?
            this.getPrev() :
            this.getNext()

        this.setViewDate(viewMoment)

        if (typeof this.props.onNav === 'function') {
            let text = viewMoment.format(this.props.dateFormat)
            let view = this.getViewName()

            this.props.onNav(text, viewMoment, view, direction, event)
        }
    };

    handleNavPrev = (event) => {
        this.handleNavigation(-1, event)
    };

    handleNavNext = (event) => {
        this.handleNavigation(1, event)
    };

    handleChange = (date, event) => {
        date = this.toMoment(date)

        if (this.props.navOnDateClick) {
            let viewDate = this.toMoment(this.getViewDate())

            //it's not enough to compare months, since the year can change as well
            //
            //also it's ok to hardcode the format here
            let viewMonth = viewDate.format('YYYY-MM')
            let dateMonth = date.format('YYYY-MM')

            if (dateMonth > viewMonth) {
                this.handleNavNext(event)
            } else if (dateMonth < viewMonth) {
                this.handleNavPrev(event)
            }
        }

        let text = date.format(this.props.dateFormat)

        if (!hasOwn(this.props, 'date')) {
            this.setState({
                defaultDate: text
            })
        }

        (this.props.onChange || emptyFn)(text, date, event)
    };

    handleSelect = (date, event) => {
        let viewName = this.getViewName()

        let property = ({
            decade: 'year',
            year: 'month'
        })[viewName]

        let value = date.get(property)
        let viewMoment = this.toMoment(this.getViewDate()).set(property, value)
        let view = this.getPrevViewName()

        this.setViewDate(viewMoment)

        this.setView(view)

        if (typeof this.props.onSelect === 'function') {
            let text = viewMoment.format(this.props.dateFormat)
            this.props.onSelect(text, viewMoment, view, event)
        }
    };
}

DatePicker.views = Views

let PT = PropTypes

DatePicker.propTypes = {

    /**
     * Function to be called when user selects a date.
     *
     * Called with the following params:
     *
     * @param {String} dateText Date formatted as string
     * @param {Moment} moment Moment.js instance
     * @param {Event} event
     *
     * @type {Function}
     */
    onChange: PT.func,

    /**
     * Function to be called when the user navigates to the next/prev month/year/decade
     *
     * Called with the following params:
     *
     * @param {String} dateText Date formatted as string
     * @param {Moment} moment Moment.js instance
     * @param {String} view The name of the current view (eg: "month")
     * @param {Number} direction 1 or -1. 1 if the right arrow, to nav to next period was pressed. -1 if the left arrow, to nav to the prev period was pressed.
     * @param {Event} event
     *
     * @type {Function}
     */
    onNav: PT.func,

    /**
     * Function to be called when the user selects a year/month.
     *
     * Called with the following params:
     *
     * @param {String} dateText Date formatted as string
     * @param {Moment} moment Moment.js instance
     * @param {String} view The name of the view displayed after following the selection. For now, either "year" or "month"
     *
     * @type {Function}
     */
    onSelect: PT.func,

    /**
     * A function that should return a React DOM for the day cell. The first param is the props object.
     * You can use this to have full control over what gets rendered for a day.
     *
     * @param {Object} dayProps The props object passed to day rendering
     *
     * @type {Function}
     */
    renderDay: PT.func,

    /**
     * A function that can manipulate the props object for a day, and SHOULD return a props object (a new one, or the same).
     * Use this for CUSTOM DAY STYLING.
     * You can use this to take full control over the styles/css classes/attributes applied to the day cell in the month view.
     *
     * @param {Object} dayProps
     * @return {Object} dayProps
     *
     * @type {Function}
     */
    onRenderDay: PT.func,


    /******************************************/
    /********** VIEW-related props ************/
    /******************************************/

    /**
     * The default view to show in the picker. This is an uncontrolled prop.
     * If none specified, the default view will be "month"
     *
     * @type {String}
     */
    defaultView: PT.string,

    /**
     * The view to show in the picker. This is a CONTROLLED prop!
     *
     * When using this controlled prop, make sure you update it when `onViewChange` function is called
     * if you want to navigate to another view, as expected.
     *
     * @type {String}
     */
    view: PT.string,

    /**
     * A function to be called when navigating to another view date.
     *
     * Called with the following params:
     *
     * @param {String} dateText Date formatted as string
     * @param {Moment} moment Moment.js instance
     * @param {String} view the name of the view displayed after the navigation occurs.
     *
     * @type {Function}
     */
    onViewDateChange: PT.func,

    /**
     * A function to be called when the view is changed.
     * If you're using the controlled `view` prop, make sure you update the `view` prop in this function if you want to navigate to another view, as expected.
     *
     * @param {String} nextView One of "month", "year", "decade"
     *
     * @type {Function}
     */
    onViewChange: PT.func,

    /**
     * Defaults to true. If specified as false, will not navigate to the date that was clicked, even if that date is in the prev/next month
     * @type {Boolean}
     */
    navOnDateClick: PT.bool
}

export default DatePicker