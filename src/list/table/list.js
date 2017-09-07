// Dependencies
import builder from 'focus-core/component/builder';
import types from 'focus-core/component/types';
import React from 'react';

import reduce from 'lodash/collection/reduce';

import { translate } from 'focus-core/translation';
//Add a ref to the props if the component is not pure add nothing in the other case.
import { addRefToPropsIfNotPure, LINE } from '../../utils/is-react-class-component';
// Table class.
const TABLE_CSS_CLASS = 'mdl-data-table mdl-js-data-table mdl-shadow--2dp ';
const TABLE_CELL_CLASS = 'mdl-data-table__cell--non-numeric';
// Mixins
import { mixin as infiniteScrollMixin } from '../mixin/infinite-scroll';
import referenceMixin from '../../common/mixin/reference-property';
import mdlBehaviour from '../../common/mixin/mdl-behaviour';
// Components
import Button from '../../components/button';

const tableMixin = {
    /**
     * React tag name.
     */
    displayName: 'Table',

    /**
     * Mixin dependancies.
     */
    mixins: [infiniteScrollMixin, referenceMixin, mdlBehaviour],
    /** inheriteddoc */
    getDefaultProps() {
        return {
            data: [],
            idField: 'id',
            isLoading: false,
            operationList: [],
            isSelectable: false
        };
    },
    /** inheriteddoc */
    proptypes: {
        data: types('array'),
        isSelectable: types('bool'),
        onLineClick: types('func'),
        idField: types('string'),
        lineComponent: types('func').isRequired,
        operationList: types('array'),
        columns: types('object'),
        sortColumn: types('func'),
        isloading: types('bool'),
        loader: types('func')
    },
    /**
     * Render the table header.
     * @return {Component} - Render the table header.
     */
    _renderTableHeader() {
        const { columns } = this.props;
        return (
            <thead>
                <tr>{reduce(columns, this._renderColumnHeader, [])}</tr>
            </thead>
        );
    },
    /**
     * Build a function which is called when there is a click on a table column.
     * @param  {string} column - Column name.
     * @param  {string} order  - The order config.
     * @return {function} - The function to be called when there is a click on it.
     */
    _sortColumnAction(column, order) {
        let currentComponent = this;
        return (event) => {
            event.preventDefault();
            currentComponent.props.sortColumn(column, order);
        };
    },
    /**
     * Render the column header.
     * @param {array} accumulator - The array co,ntaining the accumulating component.
     * @param  {object} colProperties - The column properties.
     * @param  {string} name - The column name.
     * @return {Component} - The component header.
     */
    _renderColumnHeader(accumulator, colProperties, name) {
        let sort;
        if (!this.props.isEdit && !colProperties.noSort) {
            const order = colProperties.sort ? colProperties.sort : 'asc';
            const iconName = 'asc' === order ? 'arrow_drop_up' : 'arrow_drop_down';
            const icon = (<i className='material-icons'>{iconName}</i>);
            sort = (
                <a className='sort' data-bypass data-name={name} href='#' onClick={this._sortColumnAction(name, ('asc' === order ? 'desc' : 'asc'))}>
                    {icon}
                </a>
            );
        }
        accumulator.push((
            <th className={TABLE_CELL_CLASS} key={colProperties.label}>{translate(colProperties.label)}{sort}</th>
        ));

        return accumulator;
    },
    /**
     * Render the tbody tag and the content.
     * @return {Component} - The component containing the tbody.
     */
    _renderTableBody() {
        const { data, LineComponent: TableLineComponent, idField } = this.props;
        const reference = this._getReference();
        return (
            <tbody>
                {data.map((line, idx) => {
                    const { data, ...otherLineProps } = this.props;
                    const tableBodyFinalProps = addRefToPropsIfNotPure(
                        TableLineComponent, {
                            className: TABLE_CELL_CLASS,
                            data: line,
                            key: line[idField],
                            reference,
                            ...otherLineProps
                        }, `${LINE}${idx}`);
                    return (
                        <TableLineComponent {...tableBodyFinalProps} />
                    );
                })}
            </tbody>
        );
    },
    /**
     * Render the loading table
     * @return {Component} - The table in the loading mode.
     */
    _renderLoading() {
        const { isLoading, loader } = this.props;
        if (isLoading) {
            if (loader) {
                return loader();
            }
            return (
                <tbody className={'table-loading'}>
                    <tr>
                        <td>{`${translate('list.loading')}`}</td>
                    </tr>
                </tbody>
            );
        }
    },
    /**
     * Render the manual fetch mode for the table.
     * @return {Component} - The footer component when the mode is manual fetch , a show mode button is shown.
     */
    _renderManualFetch() {
        const { isManualFetch, hasMoreData } = this.props;
        if (isManualFetch && hasMoreData) {
            return (
                <tfoot className='table-manual-fetch'>
                    <tr>
                        <td colSpan={Object.keys(this.props.columns).length}>
                            <Button handleOnClick={this.fetchNextPage} label='list.button.showMore' type='button' />
                        </td>
                    </tr>
                </tfoot>
            );
        }
    },

    /**
     * Render the list.
     * @return {XML} the render of the table list.
     */
    render() {
        const SELECTABLE_CSS = this.props.isSelectable ? 'mdl-data-table--selectable' : '';
        return (
            <table className={`${TABLE_CSS_CLASS} ${SELECTABLE_CSS}`}>
                {this._renderTableHeader()}
                {this._renderTableBody()}
                {this._renderLoading()}
                {this._renderManualFetch()}
            </table>
        );
    }

};

const builtComp = builder(tableMixin);
const { component, mixin } = builtComp;

export {
    component,
    mixin
}
export default builtComp;