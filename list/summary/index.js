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
                'div',
                { className: 'sentence' },
                this._getResultSentence()
            ),
            _react2.default.createElement(
                'div',
                { className: 'topics' },
                _react2.default.createElement(TopicDisplayer, { topicClickAction: scopeClickAction, topicList: scopeList })
            )
        );
    }
};

module.exports = (0, _builder2.default)(listSummaryMixin);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJzdHlsZUJlaGF2aW91ciIsInJlcXVpcmUiLCJUb3BpY0Rpc3BsYXllciIsImxpc3RTdW1tYXJ5TWl4aW4iLCJtaXhpbnMiLCJkaXNwbGF5TmFtZSIsImdldERlZmF1bHRQcm9wcyIsInNjb3BlTGlzdCIsInByb3BUeXBlcyIsIm5iIiwicXVlcnlUZXh0IiwiaXNSZXF1aXJlZCIsInNjb3BlQ2xpY2tBY3Rpb24iLCJleHBvcnRBY3Rpb24iLCJfZ2V0UmVzdWx0U2VudGVuY2UiLCJwcm9wcyIsImhhc1RleHQiLCJ0cmltIiwibGVuZ3RoIiwic2VudGVuY2UiLCJmb3JtYXQiLCJyZW5kZXIiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOztBQUlBOzs7O0FBQ0E7Ozs7OztBQUhBLElBQU1BLGlCQUFpQkMsUUFBUSxzQkFBUixDQUF2QjtBQUNBLElBQU1DLGlCQUFpQkQsUUFBUSxrQ0FBUixDQUF2Qjs7O0FBSUEsSUFBTUUsbUJBQW1CO0FBQ3JCQyxZQUFRLENBQUNKLGNBQUQsQ0FEYTtBQUVyQjs7O0FBR0FLLGlCQUFhLGFBTFE7O0FBT3JCOzs7O0FBSUFDLG1CQVhxQiw2QkFXSDtBQUNkLGVBQU87QUFDSEMsdUJBQVc7QUFEUixTQUFQO0FBR0gsS0Fmb0I7O0FBZ0JyQjtBQUNBQyxlQUFXO0FBQ1BDLFlBQUkscUJBQU0sUUFBTixDQURHO0FBRVBDLG1CQUFXLHFCQUFNLFFBQU4sQ0FGSjtBQUdQSCxtQkFBVyxxQkFBTSxRQUFOLEVBQWdCSSxVQUhwQjtBQUlQQywwQkFBa0IscUJBQU0sTUFBTixDQUpYO0FBS1BDLHNCQUFjLHFCQUFNLE1BQU47QUFMUCxLQWpCVTtBQXdCckI7Ozs7QUFJQUMsc0JBNUJxQixnQ0E0QkE7QUFBQSxxQkFDTyxLQUFLQyxLQURaO0FBQUEsWUFDVk4sRUFEVSxVQUNWQSxFQURVO0FBQUEsWUFDTkMsU0FETSxVQUNOQSxTQURNOztBQUVqQixZQUFNTSxVQUFVTixhQUFhQSxVQUFVTyxJQUFWLEdBQWlCQyxNQUFqQixHQUEwQixDQUF2RDtBQUNBLFlBQU1DLFdBQVdWLEtBQUssQ0FBTCxHQUFTTyxVQUFVLGFBQVYsR0FBMEIsYUFBbkMsR0FBbURBLFVBQVUsWUFBVixHQUF5QixZQUE3RjtBQUNBLGVBQ0k7QUFBQTtBQUFBO0FBQ0k7QUFBQTtBQUFBO0FBQVMsaUNBQWdCSSxNQUFoQixDQUF1QlgsRUFBdkIsQ0FBVDtBQUFBO0FBQUEsYUFESjtBQUVJO0FBQUE7QUFBQTtBQUFPLDRDQUFVVSxRQUFWLENBQVA7QUFDS0gsMkJBQ0c7QUFBQTtBQUFBLHNCQUFNLFdBQVUsYUFBaEI7QUFBQTtBQUEyQ04sNkJBQTNDO0FBQUE7QUFBQTtBQUZSO0FBRkosU0FESjtBQVVILEtBMUNvQjs7QUEyQ3JCOzs7O0FBSUFXLFVBL0NxQixvQkErQ1o7QUFBQSxzQkFDK0MsS0FBS04sS0FEcEQ7QUFBQSxZQUNFRixZQURGLFdBQ0VBLFlBREY7QUFBQSxZQUNnQk4sU0FEaEIsV0FDZ0JBLFNBRGhCO0FBQUEsWUFDMkJLLGdCQUQzQixXQUMyQkEsZ0JBRDNCOztBQUVMLGVBQ0k7QUFBQTtBQUFBLGNBQUssY0FBVyxjQUFoQjtBQUNLQyw0QkFDRztBQUFBO0FBQUEsa0JBQUssV0FBVSxPQUFmO0FBQ0ksa0VBQVEsZUFBZUEsWUFBdkIsRUFBcUMsTUFBSyxPQUExQyxFQUFrRCxPQUFNLGVBQXhELEVBQXdFLE9BQU8sSUFBL0U7QUFESixhQUZSO0FBTUk7QUFBQTtBQUFBLGtCQUFLLFdBQVUsVUFBZjtBQUEyQixxQkFBS0Msa0JBQUw7QUFBM0IsYUFOSjtBQU9JO0FBQUE7QUFBQSxrQkFBSyxXQUFVLFFBQWY7QUFDSSw4Q0FBQyxjQUFELElBQWdCLGtCQUFrQkYsZ0JBQWxDLEVBQW9ELFdBQVdMLFNBQS9EO0FBREo7QUFQSixTQURKO0FBYUg7QUE5RG9CLENBQXpCOztBQWlFQWUsT0FBT0MsT0FBUCxHQUFpQix1QkFBUXBCLGdCQUFSLENBQWpCIiwiZmlsZSI6ImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBidWlsZGVyIGZyb20gJ2ZvY3VzLWNvcmUvY29tcG9uZW50L2J1aWxkZXInO1xyXG5pbXBvcnQgdHlwZXMgZnJvbSAnZm9jdXMtY29yZS9jb21wb25lbnQvdHlwZXMnO1xyXG5pbXBvcnQgeyB0cmFuc2xhdGUgfSBmcm9tICdmb2N1cy1jb3JlL3RyYW5zbGF0aW9uJztcclxuXHJcbmNvbnN0IHN0eWxlQmVoYXZpb3VyID0gcmVxdWlyZSgnLi4vLi4vbWl4aW4vc3R5bGFibGUnKTtcclxuY29uc3QgVG9waWNEaXNwbGF5ZXIgPSByZXF1aXJlKCcuLi8uLi9jb21wb25lbnRzL3RvcGljLWRpc3BsYXllcicpO1xyXG5pbXBvcnQgQnV0dG9uIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvYnV0dG9uJztcclxuaW1wb3J0IG51bWJlckZvcm1hdHRlciBmcm9tICdmb2N1cy1jb3JlL2RlZmluaXRpb24vZm9ybWF0dGVyL251bWJlcic7XHJcblxyXG5jb25zdCBsaXN0U3VtbWFyeU1peGluID0ge1xyXG4gICAgbWl4aW5zOiBbc3R5bGVCZWhhdmlvdXJdLFxyXG4gICAgLyoqXHJcbiAgICAgKiBEaXNwbGF5IG5hbWUuXHJcbiAgICAgKi9cclxuICAgIGRpc3BsYXlOYW1lOiAnTGlzdFN1bW1hcnknLFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSW5pdCB0aGUgZGVmYXVsdCBwcm9wcy5cclxuICAgICAqIEByZXR1cm5zIHtvYmpldH0gZGVmYXVsdCBwcm9wcy5cclxuICAgICAqL1xyXG4gICAgZ2V0RGVmYXVsdFByb3BzKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHNjb3BlTGlzdDoge31cclxuICAgICAgICB9O1xyXG4gICAgfSxcclxuICAgIC8qKiBAaW5oZXJpdGRvYyAqL1xyXG4gICAgcHJvcFR5cGVzOiB7XHJcbiAgICAgICAgbmI6IHR5cGVzKCdudW1iZXInKSxcclxuICAgICAgICBxdWVyeVRleHQ6IHR5cGVzKCdzdHJpbmcnKSxcclxuICAgICAgICBzY29wZUxpc3Q6IHR5cGVzKCdvYmplY3QnKS5pc1JlcXVpcmVkLFxyXG4gICAgICAgIHNjb3BlQ2xpY2tBY3Rpb246IHR5cGVzKCdmdW5jJyksXHJcbiAgICAgICAgZXhwb3J0QWN0aW9uOiB0eXBlcygnZnVuYycpXHJcbiAgICB9LFxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm4gcmVzdWx0IHNlbnRlbmNlLlxyXG4gICAgICogQHJldHVybiB7b2JqZWN0fSBSZXN1bHQgc2VudGVuY2VcclxuICAgICAqL1xyXG4gICAgX2dldFJlc3VsdFNlbnRlbmNlKCkge1xyXG4gICAgICAgIGNvbnN0IHtuYiwgcXVlcnlUZXh0fSA9IHRoaXMucHJvcHM7XHJcbiAgICAgICAgY29uc3QgaGFzVGV4dCA9IHF1ZXJ5VGV4dCAmJiBxdWVyeVRleHQudHJpbSgpLmxlbmd0aCA+IDA7XHJcbiAgICAgICAgY29uc3Qgc2VudGVuY2UgPSBuYiA+IDEgPyBoYXNUZXh0ID8gJ3Jlc3VsdHMuZm9yJyA6ICdyZXN1bHRzLmFsbCcgOiBoYXNUZXh0ID8gJ3Jlc3VsdC5mb3InIDogJ3Jlc3VsdC5hbGwnO1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxzcGFuPlxyXG4gICAgICAgICAgICAgICAgPHN0cm9uZz57bnVtYmVyRm9ybWF0dGVyLmZvcm1hdChuYil9Jm5ic3A7PC9zdHJvbmc+XHJcbiAgICAgICAgICAgICAgICA8c3Bhbj57dHJhbnNsYXRlKHNlbnRlbmNlKX1cclxuICAgICAgICAgICAgICAgICAgICB7aGFzVGV4dCAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9J3NlYXJjaC10ZXh0Jz4mIzE3MTsmbmJzcDt7cXVlcnlUZXh0fSZuYnNwOyYjMTg3Ozwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICApO1xyXG4gICAgfSxcclxuICAgIC8qKlxyXG4gICAgICogUmVuZGVyIHRoZSBodG1sLlxyXG4gICAgICogQHJldHVybnMge0pTWH0gSHRtbCByZW5kZXJpbmcuXHJcbiAgICAgKi9cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICBjb25zdCB7ZXhwb3J0QWN0aW9uLCBzY29wZUxpc3QsIHNjb3BlQ2xpY2tBY3Rpb259ID0gdGhpcy5wcm9wcztcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2IGRhdGEtZm9jdXM9J2xpc3Qtc3VtbWFyeSc+XHJcbiAgICAgICAgICAgICAgICB7ZXhwb3J0QWN0aW9uICYmXHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3ByaW50Jz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPEJ1dHRvbiBoYW5kbGVPbkNsaWNrPXtleHBvcnRBY3Rpb259IGljb249J3ByaW50JyBsYWJlbD0ncmVzdWx0LmV4cG9ydCcgc2hhcGU9e251bGx9IC8+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nc2VudGVuY2UnPnt0aGlzLl9nZXRSZXN1bHRTZW50ZW5jZSgpfTwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J3RvcGljcyc+XHJcbiAgICAgICAgICAgICAgICAgICAgPFRvcGljRGlzcGxheWVyIHRvcGljQ2xpY2tBY3Rpb249e3Njb3BlQ2xpY2tBY3Rpb259IHRvcGljTGlzdD17c2NvcGVMaXN0fSAvPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGJ1aWxkZXIobGlzdFN1bW1hcnlNaXhpbik7XHJcbiJdfQ==