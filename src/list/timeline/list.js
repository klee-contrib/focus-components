import builder from 'focus-core/component/builder';
var React = require('react');
import type from 'focus-core/component/types';
var Line = require('./line').mixin;
var uuid= require('uuid');
var translationMixin = require('../../common/i18n').mixin;
var infiniteScrollMixin = require('../mixin/infinite-scroll').mixin;
var referenceMixin = require('../../common/mixin/reference-property');
import {checkIsNotNull} from 'focus-core/util/object';
var Button = require('../../common/button/action').component;

var listMixin = {
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
    getDefaultProps: function getDefaultProps(){
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
        const {LineComponent = React.createClass(Line), idField, dateField, onLineClick, data, ...otherProps} = this.props;
        // LEGACY CODE
        const customLineComponent = otherProps.lineComponent;
        if (customLineComponent) {
            console.warn(`%c DEPRECATED : You are using the lineComponent prop in a timeline component, this will be removed in the next release of Focus Components. Please use LineComponent prop instead.`, `color: #FF9C00; font-weight: bold`);
        }
        const FinalLineComponent = customLineComponent || LineComponent;
        // END OF LEGACY CODE
        return data.map((line, idx) => {
            return (
                <FinalLineComponent
                    data={line}
                    dateField={dateField}
                    key={line[idField] || uuid.v4()}
                    onLineClick={onLineClick}
                    ref={idx}
                    reference={this._getReference()}
                    {...otherProps}
                    />
            );
        });
    },

    _renderLoading: function renderLoading() {
        if(this.props.isLoading) {
            if(this.props.loader) {
                return this.props.loader();
            }
            return (
                <li className="timeline-loading">{this.i18n('list.loading')} ...</li>
            );
        }
    },

    _renderManualFetch: function renderManualFetch(){
        if(this.props.isManualFetch && this.props.hasMoreData){
            var style = {className: 'primary'};
            return (
                <li className="timeline-button">
                    <Button label="list.button.showMore"
                        type="button"
                        handleOnClick={this.handleShowMore}
                        style={style}/>
                </li>
            );
        }
    },

    /**
    * Render the list.
    * @returns {XML} the list component
    */
    render: function renderList(){
        return (
            <ul className="timeline">
                {this._renderLines()}
                {this._renderLoading()}
                {this._renderManualFetch()}
            </ul>
        );
    }
};

module.exports = builder(listMixin);
