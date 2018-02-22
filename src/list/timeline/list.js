import builder from 'focus-core/component/builder';
import React from 'react';
import createReactClass from 'create-react-class';
import type from 'focus-core/component/types';
import { mixin as Line } from './line'
import uuid from 'uuid';
import { mixin as translationMixin } from '../../common/i18n';
import { mixin as infiniteScrollMixin } from '../mixin/infinite-scroll';
import referenceMixin from '../../common/mixin/reference-property';
import { checkIsNotNull } from 'focus-core/util/object';
import Button from '../../components/button';
//Add a ref to the props if the component is not pure add nothing in the other case.
import { addRefToPropsIfNotPure, LINE } from '../../utils/is-react-class-component';

const listMixin = {
    /**
    * Tag name
    */
    displayName: 'timeline',

    /**
    * Mixin dependancies.
    */
    mixins: [translationMixin, infiniteScrollMixin, referenceMixin],

    /**
    * Default properties for the list.
    * @return {object} default props.
    */
    getDefaultProps() {
        return {
            data: [],
            idField: 'id',
            dateField: 'date',
            isLoading: false
        };
    },

    /**
    * list property validation.
    */
    propTypes: {
        data: type('array'),
        idField: type('string'),
        dateField: type('string'),
        dateComponent: type('object'),
        lineComponent: type('func'),
        isloading: type('bool'),
        loader: type('func'),
        onLineClick: type('func')
    },

    /**
    * Render lines of the list.
    * @returns {*} the lines
    */
    _renderLines() {
        const { LineComponent = createReactClass(Line), idField, dateField, onLineClick, data, ...otherProps } = this.props;
        // LEGACY CODE
        const customLineComponent = otherProps.lineComponent;
        if (customLineComponent) {
            console.warn('%c DEPRECATED : You are using the lineComponent prop in a timeline component, this will be removed in the next release of Focus Components. Please use LineComponent prop instead.', 'color: #FF9C00; font-weight: bold');
        }
        const FinalLineComponent = customLineComponent || LineComponent;
        // END OF LEGACY CODE

        return data.map((line, idx) => {
            const timelineFinalProps = addRefToPropsIfNotPure(
                FinalLineComponent, {
                    ...otherProps,
                    data: line,
                    dateField,
                    key: line[idField] || uuid.v4(),
                    onLineClick,
                    reference: this._getReference()
                }, `${LINE}${idx}`);
            return (
                <FinalLineComponent {...timelineFinalProps} />
            );
        });
    },

    _renderLoading() {
        if (this.props.isLoading) {
            if (this.props.loader) {
                return this.props.loader();
            }
            return (
                <li className='timeline-loading'>{this.i18n('list.loading')} ...</li>
            );
        }
    },

    _renderManualFetch() {
        if (this.props.isManualFetch && this.props.hasMoreData) {
            let style = { className: 'primary' };
            return (
                <li className='timeline-button'>
                    <Button label='list.button.showMore'
                        type='button'
                        handleOnClick={this.handleShowMore}
                        style={style}
                    />
                </li>
            );
        }
    },

    /**
    * Render the list.
    * @returns {XML} the list component
    */
    render() {
        return (
            <ul className='timeline'>
                {this._renderLines()}
                {this._renderLoading()}
                {this._renderManualFetch()}
            </ul>
        );
    }
};

const { mixin, component } = builder(listMixin);
export { mixin, component };
export default { mixin, component };