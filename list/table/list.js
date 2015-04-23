var type = require('focus').component.types;
var infiniteScrollMixin = require('../mixin/infinite-scroll').mixin;
var referenceMixin = require('../../common/mixin/reference-property');
var paginationMixin = require('../mixin/pagination');
var checkIsNotNull = require('focus').util.object.checkIsNotNull;

var tableMixin = {
    /**
     * React tag name.
     */
    displayName: 'table-list',

    /**
     * Mixin dependancies.
     */
    mixins: [infiniteScrollMixin, referenceMixin],

    getDefaultProps: function getListDefaultProps(){
        return {

        };
    },

    proptypes: {
        data: type('array'),
        onLineClick: type('func')
    }
};

module.exports = tableMixin;
