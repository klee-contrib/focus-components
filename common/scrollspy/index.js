'use strict';

var _builder = require('focus-core/component/builder');

var _builder2 = _interopRequireDefault(_builder);

var _types = require('focus-core/component/types');

var _types2 = _interopRequireDefault(_types);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Dependencies
var React = require('react');
var ReactDOM = require('react-dom');


// Mixins
var Stylabe = require('../../mixin/stylable');

var _require = require('../mixin/scroll'),
    scrollTo = _require.scrollTo,
    scrollPosition = _require.scrollPosition;

var _require2 = require('lodash/collection'),
    filter = _require2.filter;

var _require3 = require('lodash/array'),
    first = _require3.first,
    last = _require3.last;

/**
* Scrollspy component.
* Listen to a scroll, and sets an active class to the currently displayed element.
*/


var Scrollspy = {
    /**
    * Stylable mixin.
    */
    mixins: [Stylabe],
    /**
    * Get the default props.
    * By default, listen to the body element
    * @return {Object} the default properties
    */
    getDefaultProps: function getDefaultProps() {
        return {
            titleSelector: '[data-spy]',
            affixOffset: 0
        };
    },

    /**
    * Props validation
    */
    propTypes: {
        titleSelector: (0, _types2.default)('string'),
        affixOffset: (0, _types2.default)('number')
    },
    /** @inheritDoc */
    getInitialState: function getInitialState() {
        return {
            titleList: []
        };
    },

    /** @inheritDoc */
    componentDidMount: function componentDidMount() {
        this.setState({
            titleList: this._getTitleList()
        });
        this._scrollCarrier = window;
        this._scrollCarrier.addEventListener('scroll', this._scrollSpy);
        this._scrollCarrier.addEventListener('resize', this._scrollSpy);
        this._scrollSpy();
    },

    /** @inheritDoc */
    componentWillUnmount: function componentWillUnmount() {
        this._scrollCarrier.removeEventListener('scroll', this._scrollSpy);
        this._scrollCarrier.removeEventListener('resize', this._scrollSpy);
    },

    /**
    * Get the menu items list
    * @return {Array} the menu items
    * @private
    */
    _getTitleList: function _getTitleList() {
        var titleSelector = this.props.titleSelector;

        var rawTitleList = document.querySelectorAll(titleSelector);
        return [].map.call(rawTitleList, function (titleElement, index) {
            return {
                index: index,
                label: titleElement.innerHTML,
                id: titleElement.getAttribute('data-spy'),
                offsetTop: titleElement.parentElement.parentElement.offsetTop // TODO TGN : to rewrite
            };
        });
    },

    /**
    * Item click handler.
    * Set the scroll to display the clicked item
    * @param {Object} title - the clicked item object
    * @return {Function} hte click handler
    * @private
    */
    _linkClickHandler: function _linkClickHandler(title) {
        var _this = this;

        return function () {
            var selectedTitle = document.querySelector('[data-spy=\'' + title.id + '\']');
            scrollTo(undefined, selectedTitle.offsetTop - _this.props.affixOffset);
        };
    },

    /**
    * Render the items list
    * @return {XML} the rendered HTML
    * @private
    */
    _renderList: function _renderList() {
        var _this2 = this;

        var _state = this.state,
            activeTitleId = _state.activeTitleId,
            titleList = _state.titleList;

        return React.createElement(
            'ul',
            null,
            ' ',
            titleList.map(function (title) {
                var lineProps = {
                    className: activeTitleId === title.id && 'active',
                    key: title.id,
                    onClick: _this2._linkClickHandler(title)
                };
                return React.createElement(
                    'li',
                    lineProps,
                    title.label
                );
            }),
            ' '
        );
    },

    /**
    * Render the component
    * @return {XML} the rendered component
    */
    render: function render() {
        var affix = this.state.affix;

        return React.createElement(
            'div',
            { 'data-focus': 'scrollspy', ref: 'scrollSpy' },
            React.createElement(
                'nav',
                { 'data-affix': !!affix, style: affix ? { position: 'fixed', top: this.props.affixOffset + 'px' } : null },
                this._renderList()
            ),
            React.createElement(
                'div',
                null,
                this.props.children
            )
        );
    },

    /**
    * The scroll event handler
    * @private
    */
    _scrollSpy: function _scrollSpy() {
        var _this3 = this;

        var titleList = this._getTitleList();
        if (0 === titleList.length) {
            return;
        }
        //---
        var scrollposition = scrollPosition();

        var nextTitles = filter(titleList, function (n) {
            return scrollposition.top < n.offsetTop - _this3.props.affixOffset;
        });

        //by default, first node is indexed
        var currentId = titleList[0].id;
        if (0 < nextTitles.length) {
            //check the first node
            var firstNode = first(nextTitles);
            var index = firstNode.index;
            if (0 < index) {
                currentId = titleList[index - 1].id;
            }
        } else {
            //means that the position is the last title
            currentId = last(titleList).id;
        }
        //save current state
        var scrollSpy = this.refs.scrollSpy;

        if (scrollSpy) {
            var componentTopPosition = ReactDOM.findDOMNode(scrollSpy).offsetTop;
            this.setState({
                activeTitleId: currentId,
                affix: componentTopPosition + this.props.affixOffset < scrollposition.top
            });
        }
    }
};

module.exports = (0, _builder2.default)(Scrollspy);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJSZWFjdCIsInJlcXVpcmUiLCJSZWFjdERPTSIsIlN0eWxhYmUiLCJzY3JvbGxUbyIsInNjcm9sbFBvc2l0aW9uIiwiZmlsdGVyIiwiZmlyc3QiLCJsYXN0IiwiU2Nyb2xsc3B5IiwibWl4aW5zIiwiZ2V0RGVmYXVsdFByb3BzIiwidGl0bGVTZWxlY3RvciIsImFmZml4T2Zmc2V0IiwicHJvcFR5cGVzIiwiZ2V0SW5pdGlhbFN0YXRlIiwidGl0bGVMaXN0IiwiY29tcG9uZW50RGlkTW91bnQiLCJzZXRTdGF0ZSIsIl9nZXRUaXRsZUxpc3QiLCJfc2Nyb2xsQ2FycmllciIsIndpbmRvdyIsImFkZEV2ZW50TGlzdGVuZXIiLCJfc2Nyb2xsU3B5IiwiY29tcG9uZW50V2lsbFVubW91bnQiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwicHJvcHMiLCJyYXdUaXRsZUxpc3QiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJtYXAiLCJjYWxsIiwidGl0bGVFbGVtZW50IiwiaW5kZXgiLCJsYWJlbCIsImlubmVySFRNTCIsImlkIiwiZ2V0QXR0cmlidXRlIiwib2Zmc2V0VG9wIiwicGFyZW50RWxlbWVudCIsIl9saW5rQ2xpY2tIYW5kbGVyIiwidGl0bGUiLCJzZWxlY3RlZFRpdGxlIiwicXVlcnlTZWxlY3RvciIsInVuZGVmaW5lZCIsIl9yZW5kZXJMaXN0Iiwic3RhdGUiLCJhY3RpdmVUaXRsZUlkIiwibGluZVByb3BzIiwiY2xhc3NOYW1lIiwia2V5Iiwib25DbGljayIsInJlbmRlciIsImFmZml4IiwicG9zaXRpb24iLCJ0b3AiLCJjaGlsZHJlbiIsImxlbmd0aCIsInNjcm9sbHBvc2l0aW9uIiwibmV4dFRpdGxlcyIsIm4iLCJjdXJyZW50SWQiLCJmaXJzdE5vZGUiLCJzY3JvbGxTcHkiLCJyZWZzIiwiY29tcG9uZW50VG9wUG9zaXRpb24iLCJmaW5kRE9NTm9kZSIsIm1vZHVsZSIs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Z0QsWUFBWTdDLFVBQVUsQ0FBVixFQUFhb0IsRUFBN0I7QUFDQSxZQUFHLElBQUl1QixXQUFXRixNQUFsQixFQUEwQjtBQUN0QjtBQUNBLGdCQUFNSyxZQUFZdkQsTUFBTW9ELFVBQU4sQ0FBbEI7QUFDQSxnQkFBTTFCLFFBQVE2QixVQUFVN0IsS0FBeEI7QUFDQSxnQkFBRyxJQUFJQSxLQUFQLEVBQWM7QUFDVjRCLDRCQUFZN0MsVUFBVWlCLFFBQVEsQ0FBbEIsRUFBcUJHLEVBQWpDO0FBQ0g7QUFDSixTQVBELE1BT087QUFDSDtBQUNBeUIsd0JBQVlyRCxLQUFLUSxTQUFMLEVBQWdCb0IsRUFBNUI7QUFDSDtBQUNEO0FBdkJTLFlBd0JGMkIsU0F4QkUsR0F3QlcsS0FBS0MsSUF4QmhCLENBd0JGRCxTQXhCRTs7QUF5QlQsWUFBR0EsU0FBSCxFQUFjO0FBQ1YsZ0JBQU1FLHVCQUF1Qi9ELFNBQVNnRSxXQUFULENBQXFCSCxTQUFyQixFQUFnQ3pCLFNBQTdEO0FBQ0EsaUJBQUtwQixRQUFMLENBQWM7QUFDVjZCLCtCQUFlYyxTQURMO0FBRVZSLHVCQUFPWSx1QkFBdUIsS0FBS3ZDLEtBQUwsQ0FBV2IsV0FBbEMsR0FBZ0Q2QyxlQUFlSDtBQUY1RCxhQUFkO0FBSUg7QUFDSjtBQWpKYSxDQUFsQjs7QUFvSkFZLE9BQU9DLE9BQVAsR0FBaUIsdUJBQVEzRCxTQUFSLENBQWpCIiwiZmlsZSI6ImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIERlcGVuZGVuY2llc1xyXG5jb25zdCBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XHJcbmNvbnN0IFJlYWN0RE9NID0gcmVxdWlyZSgncmVhY3QtZG9tJyk7XHJcbmltcG9ydCBidWlsZGVyIGZyb20gJ2ZvY3VzLWNvcmUvY29tcG9uZW50L2J1aWxkZXInO1xyXG5pbXBvcnQgdHlwZXMgZnJvbSAnZm9jdXMtY29yZS9jb21wb25lbnQvdHlwZXMnO1xyXG5cclxuLy8gTWl4aW5zXHJcbmNvbnN0IFN0eWxhYmUgPSByZXF1aXJlKCcuLi8uLi9taXhpbi9zdHlsYWJsZScpO1xyXG5jb25zdCB7c2Nyb2xsVG8sIHNjcm9sbFBvc2l0aW9ufSA9IHJlcXVpcmUoJy4uL21peGluL3Njcm9sbCcpO1xyXG5jb25zdCB7ZmlsdGVyfSA9IHJlcXVpcmUoJ2xvZGFzaC9jb2xsZWN0aW9uJyk7XHJcbmNvbnN0IHtmaXJzdCwgbGFzdH0gPSByZXF1aXJlKCdsb2Rhc2gvYXJyYXknKTtcclxuXHJcbi8qKlxyXG4qIFNjcm9sbHNweSBjb21wb25lbnQuXHJcbiogTGlzdGVuIHRvIGEgc2Nyb2xsLCBhbmQgc2V0cyBhbiBhY3RpdmUgY2xhc3MgdG8gdGhlIGN1cnJlbnRseSBkaXNwbGF5ZWQgZWxlbWVudC5cclxuKi9cclxuY29uc3QgU2Nyb2xsc3B5ID0ge1xyXG4gICAgLyoqXHJcbiAgICAqIFN0eWxhYmxlIG1peGluLlxyXG4gICAgKi9cclxuICAgIG1peGluczogW1N0eWxhYmVdLFxyXG4gICAgLyoqXHJcbiAgICAqIEdldCB0aGUgZGVmYXVsdCBwcm9wcy5cclxuICAgICogQnkgZGVmYXVsdCwgbGlzdGVuIHRvIHRoZSBib2R5IGVsZW1lbnRcclxuICAgICogQHJldHVybiB7T2JqZWN0fSB0aGUgZGVmYXVsdCBwcm9wZXJ0aWVzXHJcbiAgICAqL1xyXG4gICAgZ2V0RGVmYXVsdFByb3BzKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHRpdGxlU2VsZWN0b3I6ICdbZGF0YS1zcHldJyxcclxuICAgICAgICAgICAgYWZmaXhPZmZzZXQ6IDBcclxuICAgICAgICB9O1xyXG4gICAgfSxcclxuICAgIC8qKlxyXG4gICAgKiBQcm9wcyB2YWxpZGF0aW9uXHJcbiAgICAqL1xyXG4gICAgcHJvcFR5cGVzOiB7XHJcbiAgICAgICAgdGl0bGVTZWxlY3RvcjogdHlwZXMoJ3N0cmluZycpLFxyXG4gICAgICAgIGFmZml4T2Zmc2V0OiB0eXBlcygnbnVtYmVyJylcclxuICAgIH0sXHJcbiAgICAvKiogQGluaGVyaXREb2MgKi9cclxuICAgIGdldEluaXRpYWxTdGF0ZSgpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICB0aXRsZUxpc3Q6IFtdXHJcbiAgICAgICAgfTtcclxuICAgIH0sXHJcbiAgICAvKiogQGluaGVyaXREb2MgKi9cclxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgICAgICB0aXRsZUxpc3Q6IHRoaXMuX2dldFRpdGxlTGlzdCgpXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5fc2Nyb2xsQ2FycmllciA9IHdpbmRvdztcclxuICAgICAgICB0aGlzLl9zY3JvbGxDYXJyaWVyLmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHRoaXMuX3Njcm9sbFNweSk7XHJcbiAgICAgICAgdGhpcy5fc2Nyb2xsQ2Fycmllci5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLl9zY3JvbGxTcHkpO1xyXG4gICAgICAgIHRoaXMuX3Njcm9sbFNweSgpO1xyXG4gICAgfSxcclxuICAgIC8qKiBAaW5oZXJpdERvYyAqL1xyXG4gICAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XHJcbiAgICAgICAgdGhpcy5fc2Nyb2xsQ2Fycmllci5yZW1vdmVFdmVudExpc3RlbmVyKCdzY3JvbGwnLCB0aGlzLl9zY3JvbGxTcHkpO1xyXG4gICAgICAgIHRoaXMuX3Njcm9sbENhcnJpZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5fc2Nyb2xsU3B5KTtcclxuICAgIH0sXHJcbiAgICAvKipcclxuICAgICogR2V0IHRoZSBtZW51IGl0ZW1zIGxpc3RcclxuICAgICogQHJldHVybiB7QXJyYXl9IHRoZSBtZW51IGl0ZW1zXHJcbiAgICAqIEBwcml2YXRlXHJcbiAgICAqL1xyXG4gICAgX2dldFRpdGxlTGlzdCgpIHtcclxuICAgICAgICBjb25zdCB7dGl0bGVTZWxlY3Rvcn0gPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIGNvbnN0IHJhd1RpdGxlTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwodGl0bGVTZWxlY3Rvcik7XHJcbiAgICAgICAgcmV0dXJuIFtdLm1hcC5jYWxsKHJhd1RpdGxlTGlzdCwgKHRpdGxlRWxlbWVudCwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIGluZGV4OiBpbmRleCxcclxuICAgICAgICAgICAgICAgIGxhYmVsOiB0aXRsZUVsZW1lbnQuaW5uZXJIVE1MLFxyXG4gICAgICAgICAgICAgICAgaWQ6IHRpdGxlRWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2RhdGEtc3B5JyksXHJcbiAgICAgICAgICAgICAgICBvZmZzZXRUb3A6IHRpdGxlRWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQub2Zmc2V0VG9wIC8vIFRPRE8gVEdOIDogdG8gcmV3cml0ZVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuICAgIC8qKlxyXG4gICAgKiBJdGVtIGNsaWNrIGhhbmRsZXIuXHJcbiAgICAqIFNldCB0aGUgc2Nyb2xsIHRvIGRpc3BsYXkgdGhlIGNsaWNrZWQgaXRlbVxyXG4gICAgKiBAcGFyYW0ge09iamVjdH0gdGl0bGUgLSB0aGUgY2xpY2tlZCBpdGVtIG9iamVjdFxyXG4gICAgKiBAcmV0dXJuIHtGdW5jdGlvbn0gaHRlIGNsaWNrIGhhbmRsZXJcclxuICAgICogQHByaXZhdGVcclxuICAgICovXHJcbiAgICBfbGlua0NsaWNrSGFuZGxlcih0aXRsZSkge1xyXG4gICAgICAgIHJldHVybiAoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHNlbGVjdGVkVGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1zcHk9XFwnJyArIHRpdGxlLmlkICsgJ1xcJ10nKTtcclxuICAgICAgICAgICAgc2Nyb2xsVG8odW5kZWZpbmVkLCBzZWxlY3RlZFRpdGxlLm9mZnNldFRvcCAtIHRoaXMucHJvcHMuYWZmaXhPZmZzZXQpO1xyXG4gICAgICAgIH07XHJcbiAgICB9LFxyXG4gICAgLyoqXHJcbiAgICAqIFJlbmRlciB0aGUgaXRlbXMgbGlzdFxyXG4gICAgKiBAcmV0dXJuIHtYTUx9IHRoZSByZW5kZXJlZCBIVE1MXHJcbiAgICAqIEBwcml2YXRlXHJcbiAgICAqL1xyXG4gICAgX3JlbmRlckxpc3QoKSB7XHJcbiAgICAgICAgY29uc3Qge2FjdGl2ZVRpdGxlSWQsIHRpdGxlTGlzdH0gPSB0aGlzLnN0YXRlO1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDx1bD4ge1xyXG4gICAgICAgICAgICAgICAgdGl0bGVMaXN0Lm1hcCgodGl0bGUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBsaW5lUHJvcHMgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogYWN0aXZlVGl0bGVJZCA9PT0gdGl0bGUuaWQgJiYgJ2FjdGl2ZScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGtleTogdGl0bGUuaWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s6IHRoaXMuX2xpbmtDbGlja0hhbmRsZXIodGl0bGUpXHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8bGkgey4uLmxpbmVQcm9wc30+e3RpdGxlLmxhYmVsfTwvbGk+XHJcbiAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0gPC91bD5cclxuICAgICAgICApO1xyXG4gICAgfSxcclxuICAgIC8qKlxyXG4gICAgKiBSZW5kZXIgdGhlIGNvbXBvbmVudFxyXG4gICAgKiBAcmV0dXJuIHtYTUx9IHRoZSByZW5kZXJlZCBjb21wb25lbnRcclxuICAgICovXHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgY29uc3Qge2FmZml4fSA9IHRoaXMuc3RhdGU7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdiBkYXRhLWZvY3VzPSdzY3JvbGxzcHknIHJlZj0nc2Nyb2xsU3B5Jz5cclxuICAgICAgICAgICAgICAgIDxuYXYgZGF0YS1hZmZpeD17ISFhZmZpeH0gc3R5bGU9e2FmZml4ID8ge3Bvc2l0aW9uOiAnZml4ZWQnLCB0b3A6IGAke3RoaXMucHJvcHMuYWZmaXhPZmZzZXR9cHhgfSA6IG51bGx9Pnt0aGlzLl9yZW5kZXJMaXN0KCl9PC9uYXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2Pnt0aGlzLnByb3BzLmNoaWxkcmVufTwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApO1xyXG4gICAgfSxcclxuICAgIC8qKlxyXG4gICAgKiBUaGUgc2Nyb2xsIGV2ZW50IGhhbmRsZXJcclxuICAgICogQHByaXZhdGVcclxuICAgICovXHJcbiAgICBfc2Nyb2xsU3B5KCkge1xyXG4gICAgICAgIGNvbnN0IHRpdGxlTGlzdCA9IHRoaXMuX2dldFRpdGxlTGlzdCgpO1xyXG4gICAgICAgIGlmKDAgPT09IHRpdGxlTGlzdC5sZW5ndGgpIHsgcmV0dXJuOyB9XHJcbiAgICAgICAgLy8tLS1cclxuICAgICAgICBjb25zdCBzY3JvbGxwb3NpdGlvbiA9IHNjcm9sbFBvc2l0aW9uKCk7XHJcblxyXG4gICAgICAgIGNvbnN0IG5leHRUaXRsZXMgPSBmaWx0ZXIodGl0bGVMaXN0LCBuID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIHNjcm9sbHBvc2l0aW9uLnRvcCA8IG4ub2Zmc2V0VG9wIC0gdGhpcy5wcm9wcy5hZmZpeE9mZnNldDtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy9ieSBkZWZhdWx0LCBmaXJzdCBub2RlIGlzIGluZGV4ZWRcclxuICAgICAgICBsZXQgY3VycmVudElkID0gdGl0bGVMaXN0WzBdLmlkO1xyXG4gICAgICAgIGlmKDAgPCBuZXh0VGl0bGVzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAvL2NoZWNrIHRoZSBmaXJzdCBub2RlXHJcbiAgICAgICAgICAgIGNvbnN0IGZpcnN0Tm9kZSA9IGZpcnN0KG5leHRUaXRsZXMpO1xyXG4gICAgICAgICAgICBjb25zdCBpbmRleCA9IGZpcnN0Tm9kZS5pbmRleDtcclxuICAgICAgICAgICAgaWYoMCA8IGluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICBjdXJyZW50SWQgPSB0aXRsZUxpc3RbaW5kZXggLSAxXS5pZDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vbWVhbnMgdGhhdCB0aGUgcG9zaXRpb24gaXMgdGhlIGxhc3QgdGl0bGVcclxuICAgICAgICAgICAgY3VycmVudElkID0gbGFzdCh0aXRsZUxpc3QpLmlkO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL3NhdmUgY3VycmVudCBzdGF0ZVxyXG4gICAgICAgIGNvbnN0IHtzY3JvbGxTcHl9ID0gdGhpcy5yZWZzO1xyXG4gICAgICAgIGlmKHNjcm9sbFNweSkge1xyXG4gICAgICAgICAgICBjb25zdCBjb21wb25lbnRUb3BQb3NpdGlvbiA9IFJlYWN0RE9NLmZpbmRET01Ob2RlKHNjcm9sbFNweSkub2Zmc2V0VG9wO1xyXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgICAgICAgICAgIGFjdGl2ZVRpdGxlSWQ6IGN1cnJlbnRJZCxcclxuICAgICAgICAgICAgICAgIGFmZml4OiBjb21wb25lbnRUb3BQb3NpdGlvbiArIHRoaXMucHJvcHMuYWZmaXhPZmZzZXQgPCBzY3JvbGxwb3NpdGlvbi50b3BcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBidWlsZGVyKFNjcm9sbHNweSk7XHJcbiJdfQ==