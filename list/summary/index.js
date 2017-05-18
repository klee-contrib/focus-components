'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _builder = require('focus-core/component/builder');

var _builder2 = _interopRequireDefault(_builder);

var _types = require('focus-core/component/types');

var _types2 = _interopRequireDefault(_types);

var _translation = require('focus-core/translation');

var _button = require('../../components/button');

var _button2 = _interopRequireDefault(_button);

var _number = require('focus-core/definition/formatter/number');

var _number2 = _interopRequireDefault(_number);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styleBehaviour = require('../../mixin/stylable');
var TopicDisplayer = require('../../components/topic-displayer');


var listSummaryMixin = {
    mixins: [styleBehaviour],
    /**
     * Display name.
     */
    displayName: 'ListSummary',

    /**
     * Init the default props.
     * @returns {objet} default props.
     */
    getDefaultProps: function getDefaultProps() {
        return {
            scopeList: {}
        };
    },

    /** @inheritdoc */
    propTypes: {
        nb: (0, _types2.default)('number'),
        queryText: (0, _types2.default)('string'),
        scopeList: (0, _types2.default)('object').isRequired,
        scopeClickAction: (0, _types2.default)('func'),
        exportAction: (0, _types2.default)('func')
    },
    /**
     * Return result sentence.
     * @return {object} Result sentence
     */
    _getResultSentence: function _getResultSentence() {
        var _props = this.props,
            nb = _props.nb,
            queryText = _props.queryText;

        var hasText = queryText && queryText.trim().length > 0;
        var sentence = nb > 1 ? hasText ? 'results.for' : 'results.all' : hasText ? 'result.for' : 'result.all';
        return _react2.default.createElement(
            'span',
            null,
            _react2.default.createElement(
                'strong',
                null,
                _number2.default.format(nb),
                '\xA0'
            ),
            _react2.default.createElement(
                'span',
                null,
                (0, _translation.translate)(sentence),
                hasText && _react2.default.createElement(
                    'span',
                    { className: 'search-text' },
                    '\xAB\xA0',
                    queryText,
                    '\xA0\xBB'
                )
            )
        );
    },

    /**
     * Render the html.
     * @returns {JSX} Html rendering.
     */
    render: function render() {
        var _props2 = this.props,
            exportAction = _props2.exportAction,
            scopeList = _props2.scopeList,
            scopeClickAction = _props2.scopeClickAction;

        return _react2.default.createElement(
            'div',
            { 'data-focus': 'list-summary' },
            exportAction && _react2.default.createElement(
                'div',
                { className: 'print' },
                _react2.default.createElement(_button2.default, { handleOnClick: exportAction, icon: 'print', label: 'result.export', shape: null })
            ),
            _react2.default.createElement(
                'span',
                { className: 'sentence' },
                this._getResultSentence()
            ),
            _react2.default.createElement(
                'span',
                { className: 'topics' },
                _react2.default.createElement(TopicDisplayer, { topicClickAction: scopeClickAction, topicList: scopeList })
            )
        );
    }
};

module.exports = (0, _builder2.default)(listSummaryMixin);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJzdHlsZUJlaGF2aW91ciIsInJlcXVpcmUiLCJUb3BpY0Rpc3BsYXllciIsImxpc3RTdW1tYXJ5TWl4aW4iLCJtaXhpbnMiLCJkaXNwbGF5TmFtZSIsImdldERlZmF1bHRQcm9wcyIsInNjb3BlTGlzdCIsInByb3BUeXBlcyIsIm5iIiwicXVlcnlUZXh0IiwiaXNSZXF1aXJlZCIsInNjb3BlQ2xpY2tBY3Rpb24iLCJleHBvcnRBY3Rpb24iLCJfZ2V0UmVzdWx0U2VudGVuY2UiLCJwcm9wcyIsImhhc1RleHQiLCJ0cmltIiwibGVuZ3RoIiwic2VudGVuY2UiLCJmb3JtYXQiLCJyZW5kZXIiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOztBQUlBOzs7O0FBQ0E7Ozs7OztBQUhBLElBQU1BLGlCQUFpQkMsUUFBUSxzQkFBUixDQUF2QjtBQUNBLElBQU1DLGlCQUFpQkQsUUFBUSxrQ0FBUixDQUF2Qjs7O0FBSUEsSUFBTUUsbUJBQW1CO0FBQ3JCQyxZQUFRLENBQUNKLGNBQUQsQ0FEYTtBQUVyQjs7O0FBR0FLLGlCQUFhLGFBTFE7O0FBT3JCOzs7O0FBSUFDLG1CQVhxQiw2QkFXRjtBQUNmLGVBQU87QUFDSEMsdUJBQVc7QUFEUixTQUFQO0FBR0gsS0Fmb0I7O0FBZ0JyQjtBQUNBQyxlQUFXO0FBQ1BDLFlBQUkscUJBQU0sUUFBTixDQURHO0FBRVBDLG1CQUFXLHFCQUFNLFFBQU4sQ0FGSjtBQUdQSCxtQkFBVyxxQkFBTSxRQUFOLEVBQWdCSSxVQUhwQjtBQUlQQywwQkFBa0IscUJBQU0sTUFBTixDQUpYO0FBS1BDLHNCQUFjLHFCQUFNLE1BQU47QUFMUCxLQWpCVTtBQXdCckI7Ozs7QUFJQUMsc0JBNUJxQixnQ0E0QkE7QUFBQSxxQkFDTyxLQUFLQyxLQURaO0FBQUEsWUFDVk4sRUFEVSxVQUNWQSxFQURVO0FBQUEsWUFDTkMsU0FETSxVQUNOQSxTQURNOztBQUVqQixZQUFNTSxVQUFVTixhQUFhQSxVQUFVTyxJQUFWLEdBQWlCQyxNQUFqQixHQUEwQixDQUF2RDtBQUNBLFlBQU1DLFdBQVdWLEtBQUssQ0FBTCxHQUFTTyxVQUFVLGFBQVYsR0FBMEIsYUFBbkMsR0FBbURBLFVBQVUsWUFBVixHQUF5QixZQUE3RjtBQUNBLGVBQ0k7QUFBQTtBQUFBO0FBQ0k7QUFBQTtBQUFBO0FBQVMsaUNBQWdCSSxNQUFoQixDQUF1QlgsRUFBdkIsQ0FBVDtBQUFBO0FBQUEsYUFESjtBQUVJO0FBQUE7QUFBQTtBQUFPLDRDQUFVVSxRQUFWLENBQVA7QUFDQ0gsMkJBQ0c7QUFBQTtBQUFBLHNCQUFNLFdBQVUsYUFBaEI7QUFBQTtBQUEyQ04sNkJBQTNDO0FBQUE7QUFBQTtBQUZKO0FBRkosU0FESjtBQVVILEtBMUNvQjs7QUEyQ3JCOzs7O0FBSUFXLFVBL0NxQixvQkErQ1o7QUFBQSxzQkFDK0MsS0FBS04sS0FEcEQ7QUFBQSxZQUNFRixZQURGLFdBQ0VBLFlBREY7QUFBQSxZQUNnQk4sU0FEaEIsV0FDZ0JBLFNBRGhCO0FBQUEsWUFDMkJLLGdCQUQzQixXQUMyQkEsZ0JBRDNCOztBQUVMLGVBQ0k7QUFBQTtBQUFBLGNBQUssY0FBVyxjQUFoQjtBQUNLQyw0QkFDRztBQUFBO0FBQUEsa0JBQUssV0FBVSxPQUFmO0FBQ0ksa0VBQVEsZUFBZUEsWUFBdkIsRUFBcUMsTUFBSyxPQUExQyxFQUFrRCxPQUFNLGVBQXhELEVBQXdFLE9BQU8sSUFBL0U7QUFESixhQUZSO0FBTUk7QUFBQTtBQUFBLGtCQUFNLFdBQVUsVUFBaEI7QUFBNEIscUJBQUtDLGtCQUFMO0FBQTVCLGFBTko7QUFPSTtBQUFBO0FBQUEsa0JBQU0sV0FBVSxRQUFoQjtBQUNJLDhDQUFDLGNBQUQsSUFBZ0Isa0JBQWtCRixnQkFBbEMsRUFBb0QsV0FBV0wsU0FBL0Q7QUFESjtBQVBKLFNBREo7QUFhSDtBQTlEb0IsQ0FBekI7O0FBaUVBZSxPQUFPQyxPQUFQLEdBQWlCLHVCQUFRcEIsZ0JBQVIsQ0FBakIiLCJmaWxlIjoiaXMtcmVhY3QtY2xhc3MtY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IGJ1aWxkZXIgZnJvbSAnZm9jdXMtY29yZS9jb21wb25lbnQvYnVpbGRlcic7XHJcbmltcG9ydCB0eXBlcyBmcm9tICdmb2N1cy1jb3JlL2NvbXBvbmVudC90eXBlcyc7XHJcbmltcG9ydCB7dHJhbnNsYXRlfSBmcm9tICdmb2N1cy1jb3JlL3RyYW5zbGF0aW9uJztcclxuXHJcbmNvbnN0IHN0eWxlQmVoYXZpb3VyID0gcmVxdWlyZSgnLi4vLi4vbWl4aW4vc3R5bGFibGUnKTtcclxuY29uc3QgVG9waWNEaXNwbGF5ZXIgPSByZXF1aXJlKCcuLi8uLi9jb21wb25lbnRzL3RvcGljLWRpc3BsYXllcicpO1xyXG5pbXBvcnQgQnV0dG9uIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvYnV0dG9uJztcclxuaW1wb3J0IG51bWJlckZvcm1hdHRlciBmcm9tICdmb2N1cy1jb3JlL2RlZmluaXRpb24vZm9ybWF0dGVyL251bWJlcic7XHJcblxyXG5jb25zdCBsaXN0U3VtbWFyeU1peGluID0ge1xyXG4gICAgbWl4aW5zOiBbc3R5bGVCZWhhdmlvdXJdLFxyXG4gICAgLyoqXHJcbiAgICAgKiBEaXNwbGF5IG5hbWUuXHJcbiAgICAgKi9cclxuICAgIGRpc3BsYXlOYW1lOiAnTGlzdFN1bW1hcnknLFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSW5pdCB0aGUgZGVmYXVsdCBwcm9wcy5cclxuICAgICAqIEByZXR1cm5zIHtvYmpldH0gZGVmYXVsdCBwcm9wcy5cclxuICAgICAqL1xyXG4gICAgZ2V0RGVmYXVsdFByb3BzICgpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBzY29wZUxpc3Q6IHt9XHJcbiAgICAgICAgfTtcclxuICAgIH0sXHJcbiAgICAvKiogQGluaGVyaXRkb2MgKi9cclxuICAgIHByb3BUeXBlczoge1xyXG4gICAgICAgIG5iOiB0eXBlcygnbnVtYmVyJyksXHJcbiAgICAgICAgcXVlcnlUZXh0OiB0eXBlcygnc3RyaW5nJyksXHJcbiAgICAgICAgc2NvcGVMaXN0OiB0eXBlcygnb2JqZWN0JykuaXNSZXF1aXJlZCxcclxuICAgICAgICBzY29wZUNsaWNrQWN0aW9uOiB0eXBlcygnZnVuYycpLFxyXG4gICAgICAgIGV4cG9ydEFjdGlvbjogdHlwZXMoJ2Z1bmMnKVxyXG4gICAgfSxcclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJuIHJlc3VsdCBzZW50ZW5jZS5cclxuICAgICAqIEByZXR1cm4ge29iamVjdH0gUmVzdWx0IHNlbnRlbmNlXHJcbiAgICAgKi9cclxuICAgIF9nZXRSZXN1bHRTZW50ZW5jZSgpIHtcclxuICAgICAgICBjb25zdCB7bmIsIHF1ZXJ5VGV4dH0gPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIGNvbnN0IGhhc1RleHQgPSBxdWVyeVRleHQgJiYgcXVlcnlUZXh0LnRyaW0oKS5sZW5ndGggPiAwO1xyXG4gICAgICAgIGNvbnN0IHNlbnRlbmNlID0gbmIgPiAxID8gaGFzVGV4dCA/ICdyZXN1bHRzLmZvcicgOiAncmVzdWx0cy5hbGwnIDogaGFzVGV4dCA/ICdyZXN1bHQuZm9yJyA6ICdyZXN1bHQuYWxsJztcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8c3Bhbj5cclxuICAgICAgICAgICAgICAgIDxzdHJvbmc+e251bWJlckZvcm1hdHRlci5mb3JtYXQobmIpfSZuYnNwOzwvc3Ryb25nPlxyXG4gICAgICAgICAgICAgICAgPHNwYW4+e3RyYW5zbGF0ZShzZW50ZW5jZSl9XHJcbiAgICAgICAgICAgICAgICB7aGFzVGV4dCAmJlxyXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT0nc2VhcmNoLXRleHQnPiYjMTcxOyZuYnNwO3txdWVyeVRleHR9Jm5ic3A7JiMxODc7PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgKTtcclxuICAgIH0sXHJcbiAgICAvKipcclxuICAgICAqIFJlbmRlciB0aGUgaHRtbC5cclxuICAgICAqIEByZXR1cm5zIHtKU1h9IEh0bWwgcmVuZGVyaW5nLlxyXG4gICAgICovXHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgY29uc3Qge2V4cG9ydEFjdGlvbiwgc2NvcGVMaXN0LCBzY29wZUNsaWNrQWN0aW9ufSA9IHRoaXMucHJvcHM7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdiBkYXRhLWZvY3VzPVwibGlzdC1zdW1tYXJ5XCI+XHJcbiAgICAgICAgICAgICAgICB7ZXhwb3J0QWN0aW9uICYmXHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwcmludFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8QnV0dG9uIGhhbmRsZU9uQ2xpY2s9e2V4cG9ydEFjdGlvbn0gaWNvbj1cInByaW50XCIgbGFiZWw9XCJyZXN1bHQuZXhwb3J0XCIgc2hhcGU9e251bGx9IC8+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJzZW50ZW5jZVwiPnt0aGlzLl9nZXRSZXN1bHRTZW50ZW5jZSgpfTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRvcGljc1wiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxUb3BpY0Rpc3BsYXllciB0b3BpY0NsaWNrQWN0aW9uPXtzY29wZUNsaWNrQWN0aW9ufSB0b3BpY0xpc3Q9e3Njb3BlTGlzdH0gLz5cclxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gYnVpbGRlcihsaXN0U3VtbWFyeU1peGluKTtcclxuIl19