'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _builder = require('focus-core/component/builder');

var _builder2 = _interopRequireDefault(_builder);

var _types = require('focus-core/component/types');

var _types2 = _interopRequireDefault(_types);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _require = require('lodash/utility'),
    uniqueId = _require.uniqueId; // Dependencies


var titleMixin = {

    /**
    * Display name.
    */
    displayName: 'Title',
    /** @inheritDoc */
    getInitialState: function getInitialState() {
        return {
            spyId: uniqueId('title_')
        };
    },
    componentWillMount: function componentWillMount() {
        console.warn('FocusComponents v0.15: the \'Title\' component from FocusComponents.common is deprecated, please use FocusComponents.components.Title');
    },

    /**
    * Props validation
    */
    propTypes: {
        id: (0, _types2.default)('string'),
        label: (0, _types2.default)('string')
    },
    /**
    * Render the component.
    * @returns {JSX} Htm code.
    */
    render: function render() {
        var spyId = this.state.spyId;
        var _props = this.props,
            id = _props.id,
            label = _props.label;

        return _react2.default.createElement(
            'h3',
            { 'data-spy': spyId, id: id },
            label
        );
    }
};

module.exports = (0, _builder2.default)(titleMixin);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJyZXF1aXJlIiwidW5pcXVlSWQiLCJ0aXRsZU1peGluIiwiZGlzcGxheU5hbWUiLCJnZXRJbml0aWFsU3RhdGUiLCJzcHlJZCIsImNvbXBvbmVudFdpbGxNb3VudCIsImNvbnNvbGUiLCJ3YXJuIiwicHJvcFR5cGVzIiwiaWQiLCJsYWJlbCIsInJlbmRlciIsInN0YXRlIiwicHJvcHMiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O2VBQ21CQSxRQUFRLGdCQUFSLEM7SUFBWkMsUSxZQUFBQSxRLEVBSlA7OztBQU9BLElBQU1DLGFBQWE7O0FBRWY7OztBQUdBQyxpQkFBYSxPQUxFO0FBTWY7QUFDQUMsbUJBUGUsNkJBT0c7QUFDZCxlQUFPO0FBQ0hDLG1CQUFPSixTQUFTLFFBQVQ7QUFESixTQUFQO0FBR0gsS0FYYztBQVlmSyxzQkFaZSxnQ0FZTztBQUNsQkMsZ0JBQVFDLElBQVIsQ0FBYSx1SUFBYjtBQUNILEtBZGM7O0FBZWY7OztBQUdBQyxlQUFXO0FBQ1BDLFlBQUkscUJBQUssUUFBTCxDQURHO0FBRVBDLGVBQU8scUJBQUssUUFBTDtBQUZBLEtBbEJJO0FBc0JmOzs7O0FBSUFDLFVBMUJlLG9CQTBCTjtBQUFBLFlBQ0VQLEtBREYsR0FDVyxLQUFLUSxLQURoQixDQUNFUixLQURGO0FBQUEscUJBRWUsS0FBS1MsS0FGcEI7QUFBQSxZQUVFSixFQUZGLFVBRUVBLEVBRkY7QUFBQSxZQUVNQyxLQUZOLFVBRU1BLEtBRk47O0FBR0wsZUFBTztBQUFBO0FBQUEsY0FBSSxZQUFVTixLQUFkLEVBQXFCLElBQUlLLEVBQXpCO0FBQThCQztBQUE5QixTQUFQO0FBQ0g7QUE5QmMsQ0FBbkI7O0FBaUNBSSxPQUFPQyxPQUFQLEdBQWlCLHVCQUFRZCxVQUFSLENBQWpCIiwiZmlsZSI6ImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIERlcGVuZGVuY2llc1xyXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgYnVpbGRlciBmcm9tICdmb2N1cy1jb3JlL2NvbXBvbmVudC9idWlsZGVyJztcclxuaW1wb3J0IHR5cGUgZnJvbSAnZm9jdXMtY29yZS9jb21wb25lbnQvdHlwZXMnO1xyXG5jb25zdCB7dW5pcXVlSWR9ID0gcmVxdWlyZSgnbG9kYXNoL3V0aWxpdHknKTtcclxuXHJcblxyXG5jb25zdCB0aXRsZU1peGluID0ge1xyXG5cclxuICAgIC8qKlxyXG4gICAgKiBEaXNwbGF5IG5hbWUuXHJcbiAgICAqL1xyXG4gICAgZGlzcGxheU5hbWU6ICdUaXRsZScsXHJcbiAgICAvKiogQGluaGVyaXREb2MgKi9cclxuICAgIGdldEluaXRpYWxTdGF0ZSgpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBzcHlJZDogdW5pcXVlSWQoJ3RpdGxlXycpXHJcbiAgICAgICAgfTtcclxuICAgIH0sXHJcbiAgICBjb21wb25lbnRXaWxsTW91bnQgKCkge1xyXG4gICAgICAgIGNvbnNvbGUud2FybignRm9jdXNDb21wb25lbnRzIHYwLjE1OiB0aGUgXFwnVGl0bGVcXCcgY29tcG9uZW50IGZyb20gRm9jdXNDb21wb25lbnRzLmNvbW1vbiBpcyBkZXByZWNhdGVkLCBwbGVhc2UgdXNlIEZvY3VzQ29tcG9uZW50cy5jb21wb25lbnRzLlRpdGxlJyk7XHJcbiAgICB9LFxyXG4gICAgLyoqXHJcbiAgICAqIFByb3BzIHZhbGlkYXRpb25cclxuICAgICovXHJcbiAgICBwcm9wVHlwZXM6IHtcclxuICAgICAgICBpZDogdHlwZSgnc3RyaW5nJyksXHJcbiAgICAgICAgbGFiZWw6IHR5cGUoJ3N0cmluZycpXHJcbiAgICB9LFxyXG4gICAgLyoqXHJcbiAgICAqIFJlbmRlciB0aGUgY29tcG9uZW50LlxyXG4gICAgKiBAcmV0dXJucyB7SlNYfSBIdG0gY29kZS5cclxuICAgICovXHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgY29uc3Qge3NweUlkfSA9IHRoaXMuc3RhdGU7XHJcbiAgICAgICAgY29uc3Qge2lkLCBsYWJlbH0gPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIHJldHVybiA8aDMgZGF0YS1zcHk9e3NweUlkfSBpZD17aWR9PntsYWJlbH08L2gzPjtcclxuICAgIH1cclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gYnVpbGRlcih0aXRsZU1peGluKTtcclxuIl19