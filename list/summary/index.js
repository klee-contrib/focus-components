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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJzdHlsZUJlaGF2aW91ciIsInJlcXVpcmUiLCJUb3BpY0Rpc3BsYXllciIsImxpc3RTdW1tYXJ5TWl4aW4iLCJtaXhpbnMiLCJkaXNwbGF5TmFtZSIsImdldERlZmF1bHRQcm9wcyIsInNjb3BlTGlzdCIsInByb3BUeXBlcyIsIm5iIiwicXVlcnlUZXh0IiwiaXNSZXF1aXJlZCIsInNjb3BlQ2xpY2tBY3Rpb24iLCJleHBvcnRBY3Rpb24iLCJfZ2V0UmVzdWx0U2VudGVuY2UiLCJwcm9wcyIsImhhc1RleHQiLCJ0cmltIiwibGVuZ3RoIiwic2VudGVuY2UiLCJmb3JtYXQiLCJyZW5kZXIiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOztBQUlBOzs7O0FBQ0E7Ozs7OztBQUhBLElBQU1BLGlCQUFpQkMsUUFBUSxzQkFBUixDQUF2QjtBQUNBLElBQU1DLGlCQUFpQkQsUUFBUSxrQ0FBUixDQUF2Qjs7O0FBSUEsSUFBTUUsbUJBQW1CO0FBQ3JCQyxZQUFRLENBQUNKLGNBQUQsQ0FEYTtBQUVyQjs7O0FBR0FLLGlCQUFhLGFBTFE7O0FBT3JCOzs7O0FBSUFDLG1CQVhxQiw2QkFXRjtBQUNmLGVBQU87QUFDSEMsdUJBQVc7QUFEUixTQUFQO0FBR0gsS0Fmb0I7O0FBZ0JyQjtBQUNBQyxlQUFXO0FBQ1BDLFlBQUkscUJBQU0sUUFBTixDQURHO0FBRVBDLG1CQUFXLHFCQUFNLFFBQU4sQ0FGSjtBQUdQSCxtQkFBVyxxQkFBTSxRQUFOLEVBQWdCSSxVQUhwQjtBQUlQQywwQkFBa0IscUJBQU0sTUFBTixDQUpYO0FBS1BDLHNCQUFjLHFCQUFNLE1BQU47QUFMUCxLQWpCVTtBQXdCckI7Ozs7QUFJQUMsc0JBNUJxQixnQ0E0QkE7QUFBQSxxQkFDTyxLQUFLQyxLQURaO0FBQUEsWUFDVk4sRUFEVSxVQUNWQSxFQURVO0FBQUEsWUFDTkMsU0FETSxVQUNOQSxTQURNOztBQUVqQixZQUFNTSxVQUFVTixhQUFhQSxVQUFVTyxJQUFWLEdBQWlCQyxNQUFqQixHQUEwQixDQUF2RDtBQUNBLFlBQU1DLFdBQVdWLEtBQUssQ0FBTCxHQUFTTyxVQUFVLGFBQVYsR0FBMEIsYUFBbkMsR0FBbURBLFVBQVUsWUFBVixHQUF5QixZQUE3RjtBQUNBLGVBQ0k7QUFBQTtBQUFBO0FBQ0k7QUFBQTtBQUFBO0FBQVMsaUNBQWdCSSxNQUFoQixDQUF1QlgsRUFBdkIsQ0FBVDtBQUFBO0FBQUEsYUFESjtBQUVJO0FBQUE7QUFBQTtBQUFPLDRDQUFVVSxRQUFWLENBQVA7QUFDQ0gsMkJBQ0c7QUFBQTtBQUFBLHNCQUFNLFdBQVUsYUFBaEI7QUFBQTtBQUEyQ04sNkJBQTNDO0FBQUE7QUFBQTtBQUZKO0FBRkosU0FESjtBQVVILEtBMUNvQjs7QUEyQ3JCOzs7O0FBSUFXLFVBL0NxQixvQkErQ1o7QUFBQSxzQkFDK0MsS0FBS04sS0FEcEQ7QUFBQSxZQUNFRixZQURGLFdBQ0VBLFlBREY7QUFBQSxZQUNnQk4sU0FEaEIsV0FDZ0JBLFNBRGhCO0FBQUEsWUFDMkJLLGdCQUQzQixXQUMyQkEsZ0JBRDNCOztBQUVMLGVBQ0k7QUFBQTtBQUFBLGNBQUssY0FBVyxjQUFoQjtBQUNLQyw0QkFDRztBQUFBO0FBQUEsa0JBQUssV0FBVSxPQUFmO0FBQ0ksa0VBQVEsZUFBZUEsWUFBdkIsRUFBcUMsTUFBSyxPQUExQyxFQUFrRCxPQUFNLGVBQXhELEVBQXdFLE9BQU8sSUFBL0U7QUFESixhQUZSO0FBTUk7QUFBQTtBQUFBLGtCQUFNLFdBQVUsVUFBaEI7QUFBNEIscUJBQUtDLGtCQUFMO0FBQTVCLGFBTko7QUFPSTtBQUFBO0FBQUEsa0JBQU0sV0FBVSxRQUFoQjtBQUNJLDhDQUFDLGNBQUQsSUFBZ0Isa0JBQWtCRixnQkFBbEMsRUFBb0QsV0FBV0wsU0FBL0Q7QUFESjtBQVBKLFNBREo7QUFhSDtBQTlEb0IsQ0FBekI7O0FBaUVBZSxPQUFPQyxPQUFQLEdBQWlCLHVCQUFRcEIsZ0JBQVIsQ0FBakIiLCJmaWxlIjoiaXMtcmVhY3QtY2xhc3MtY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBidWlsZGVyIGZyb20gJ2ZvY3VzLWNvcmUvY29tcG9uZW50L2J1aWxkZXInO1xuaW1wb3J0IHR5cGVzIGZyb20gJ2ZvY3VzLWNvcmUvY29tcG9uZW50L3R5cGVzJztcbmltcG9ydCB7dHJhbnNsYXRlfSBmcm9tICdmb2N1cy1jb3JlL3RyYW5zbGF0aW9uJztcblxuY29uc3Qgc3R5bGVCZWhhdmlvdXIgPSByZXF1aXJlKCcuLi8uLi9taXhpbi9zdHlsYWJsZScpO1xuY29uc3QgVG9waWNEaXNwbGF5ZXIgPSByZXF1aXJlKCcuLi8uLi9jb21wb25lbnRzL3RvcGljLWRpc3BsYXllcicpO1xuaW1wb3J0IEJ1dHRvbiBmcm9tICcuLi8uLi9jb21wb25lbnRzL2J1dHRvbic7XG5pbXBvcnQgbnVtYmVyRm9ybWF0dGVyIGZyb20gJ2ZvY3VzLWNvcmUvZGVmaW5pdGlvbi9mb3JtYXR0ZXIvbnVtYmVyJztcblxuY29uc3QgbGlzdFN1bW1hcnlNaXhpbiA9IHtcbiAgICBtaXhpbnM6IFtzdHlsZUJlaGF2aW91cl0sXG4gICAgLyoqXG4gICAgICogRGlzcGxheSBuYW1lLlxuICAgICAqL1xuICAgIGRpc3BsYXlOYW1lOiAnTGlzdFN1bW1hcnknLFxuXG4gICAgLyoqXG4gICAgICogSW5pdCB0aGUgZGVmYXVsdCBwcm9wcy5cbiAgICAgKiBAcmV0dXJucyB7b2JqZXR9IGRlZmF1bHQgcHJvcHMuXG4gICAgICovXG4gICAgZ2V0RGVmYXVsdFByb3BzICgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHNjb3BlTGlzdDoge31cbiAgICAgICAgfTtcbiAgICB9LFxuICAgIC8qKiBAaW5oZXJpdGRvYyAqL1xuICAgIHByb3BUeXBlczoge1xuICAgICAgICBuYjogdHlwZXMoJ251bWJlcicpLFxuICAgICAgICBxdWVyeVRleHQ6IHR5cGVzKCdzdHJpbmcnKSxcbiAgICAgICAgc2NvcGVMaXN0OiB0eXBlcygnb2JqZWN0JykuaXNSZXF1aXJlZCxcbiAgICAgICAgc2NvcGVDbGlja0FjdGlvbjogdHlwZXMoJ2Z1bmMnKSxcbiAgICAgICAgZXhwb3J0QWN0aW9uOiB0eXBlcygnZnVuYycpXG4gICAgfSxcbiAgICAvKipcbiAgICAgKiBSZXR1cm4gcmVzdWx0IHNlbnRlbmNlLlxuICAgICAqIEByZXR1cm4ge29iamVjdH0gUmVzdWx0IHNlbnRlbmNlXG4gICAgICovXG4gICAgX2dldFJlc3VsdFNlbnRlbmNlKCkge1xuICAgICAgICBjb25zdCB7bmIsIHF1ZXJ5VGV4dH0gPSB0aGlzLnByb3BzO1xuICAgICAgICBjb25zdCBoYXNUZXh0ID0gcXVlcnlUZXh0ICYmIHF1ZXJ5VGV4dC50cmltKCkubGVuZ3RoID4gMDtcbiAgICAgICAgY29uc3Qgc2VudGVuY2UgPSBuYiA+IDEgPyBoYXNUZXh0ID8gJ3Jlc3VsdHMuZm9yJyA6ICdyZXN1bHRzLmFsbCcgOiBoYXNUZXh0ID8gJ3Jlc3VsdC5mb3InIDogJ3Jlc3VsdC5hbGwnO1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPHNwYW4+XG4gICAgICAgICAgICAgICAgPHN0cm9uZz57bnVtYmVyRm9ybWF0dGVyLmZvcm1hdChuYil9Jm5ic3A7PC9zdHJvbmc+XG4gICAgICAgICAgICAgICAgPHNwYW4+e3RyYW5zbGF0ZShzZW50ZW5jZSl9XG4gICAgICAgICAgICAgICAge2hhc1RleHQgJiZcbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPSdzZWFyY2gtdGV4dCc+JiMxNzE7Jm5ic3A7e3F1ZXJ5VGV4dH0mbmJzcDsmIzE4Nzs8L3NwYW4+XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgKTtcbiAgICB9LFxuICAgIC8qKlxuICAgICAqIFJlbmRlciB0aGUgaHRtbC5cbiAgICAgKiBAcmV0dXJucyB7SlNYfSBIdG1sIHJlbmRlcmluZy5cbiAgICAgKi9cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGNvbnN0IHtleHBvcnRBY3Rpb24sIHNjb3BlTGlzdCwgc2NvcGVDbGlja0FjdGlvbn0gPSB0aGlzLnByb3BzO1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBkYXRhLWZvY3VzPVwibGlzdC1zdW1tYXJ5XCI+XG4gICAgICAgICAgICAgICAge2V4cG9ydEFjdGlvbiAmJlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInByaW50XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8QnV0dG9uIGhhbmRsZU9uQ2xpY2s9e2V4cG9ydEFjdGlvbn0gaWNvbj1cInByaW50XCIgbGFiZWw9XCJyZXN1bHQuZXhwb3J0XCIgc2hhcGU9e251bGx9IC8+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJzZW50ZW5jZVwiPnt0aGlzLl9nZXRSZXN1bHRTZW50ZW5jZSgpfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0b3BpY3NcIj5cbiAgICAgICAgICAgICAgICAgICAgPFRvcGljRGlzcGxheWVyIHRvcGljQ2xpY2tBY3Rpb249e3Njb3BlQ2xpY2tBY3Rpb259IHRvcGljTGlzdD17c2NvcGVMaXN0fSAvPlxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gYnVpbGRlcihsaXN0U3VtbWFyeU1peGluKTtcbiJdfQ==