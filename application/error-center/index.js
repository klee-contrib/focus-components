'use strict';

var _builder = require('focus-core/component/builder');

var _builder2 = _interopRequireDefault(_builder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var React = require('react');
var REACT_NOT_COMPONENT_ERROR = 'Uncaught TypeError: undefined is not a function';
var REACT_NOT_COMPONENT_MESSAGE = 'Check your console errors, it seems you are trying to create a component from something which is not a component.';
/**
 * Error center component.
 * @example React.render(<ErrorCenter />, document.querySelector('#container'))
 * @type {Object}
 */
var errorCenter = {
    displayName: 'ErrorCenter',
    /** @inheriteddoc */
    getDefaultProps: function getDefaultProps() {
        return {
            source: window,
            errors: [],
            isErrorsVisible: false,
            numberDisplayed: 3
        };
    },

    /** @inheriteddoc */
    getInitialState: function getInitialState() {
        return { errors: this.props.errors, isErrorsVisible: this.props.isErrorsVisible };
    },

    /** @inheriteddoc */
    componentWillMount: function componentWillMount() {
        var _this = this;

        this.props.source.onerror = function (e) {
            var errors = _this.state.errors;

            errors.push(e);
            _this.setState({ errors: errors });
        };
    },

    /**
     * Toggle the visibility of the error component.
     */
    _toggleVisible: function _toggleVisible() {
        this.setState({ isErrorsVisible: !this.state.isErrorsVisible });
    },

    /**
     * Render all the errors.
     * @return {object} - The jsx errors.
     */
    _renderErrors: function _renderErrors() {
        var _this2 = this;

        var _state = this.state,
            errors = _state.errors,
            isErrorsVisible = _state.isErrorsVisible;
        var numberDisplayed = this.props.numberDisplayed;

        var errorLength = errors.length;
        return React.createElement(
            'div',
            { 'data-focus': 'error-center' },
            React.createElement(
                'div',
                { 'data-focus': 'error-counter' },
                React.createElement(
                    'i',
                    { className: 'material-icons', style: { cursor: 'pointer', fontSize: '28px', padding: '15px 5px 5px 5px' } },
                    'error'
                ),
                errorLength
            ),
            React.createElement(
                'div',
                { 'data-focus': 'error-actions' },
                React.createElement(
                    'i',
                    { className: 'material-icons', style: { cursor: 'pointer', fontSize: '36px', padding: '10px' }, onClick: function onClick() {
                            window.location.reload();
                        } },
                    'refresh'
                ),
                React.createElement(
                    'i',
                    { className: 'material-icons', style: { cursor: 'pointer', fontSize: '36px', padding: '10px' }, onClick: this._toggleVisible },
                    'keyboard_arrow_' + (isErrorsVisible ? 'down' : 'up')
                ),
                React.createElement(
                    'i',
                    { className: 'material-icons', style: { cursor: 'pointer', fontSize: '36px', padding: '10px' }, onClick: function onClick() {
                            _this2.setState({ errors: [] });
                        } },
                    'delete'
                )
            ),
            React.createElement(
                'ul',
                { 'data-focus': 'error-stack' },
                isErrorsVisible ? errors.slice(errorLength - numberDisplayed, errorLength).map(function (err) {
                    var e = REACT_NOT_COMPONENT_ERROR === err ? REACT_NOT_COMPONENT_MESSAGE : err;return React.createElement(
                        'li',
                        null,
                        e
                    );
                }) : null
            )
        );
    },

    /** @inheriteddoc */
    render: function render() {
        return 0 < this.state.errors.length ? this._renderErrors() : null;
    }
};

module.exports = (0, _builder2.default)(errorCenter);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJSZWFjdCIsInJlcXVpcmUiLCJSRUFDVF9OT1RfQ09NUE9ORU5UX0VSUk9SIiwiUkVBQ1RfTk9UX0NPTVBPTkVOVF9NRVNTQUdFIiwiZXJyb3JDZW50ZXIiLCJkaXNwbGF5TmFtZSIsImdldERlZmF1bHRQcm9wcyIsInNvdXJjZSIsIndpbmRvdyIsImVycm9ycyIsImlzRXJyb3JzVmlzaWJsZSIsIm51bWJlckRpc3BsYXllZCIsImdldEluaXRpYWxTdGF0ZSIsInByb3BzIiwiY29tcG9uZW50V2lsbE1vdW50Iiwib25lcnJvciIsImUiLCJzdGF0ZSIsInB1c2giLCJzZXRTdGF0ZSIsIl90b2dnbGVWaXNpYmxlIiwiX3JlbmRlckVycm9ycyIsImVycm9yTGVuZ3RoIiwibGVuZ3RoIiwiY3Vyc29yIiwiZm9udFNpemUiLCJwYWRkaW5nIiwibG9jYXRpb24iLCJyZWxvYWQiLCJzbGljZSIsIm1hcCIsImVyciIsInJlbmRlciIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7O0FBQUE7Ozs7OztBQUNBLElBQU1BLFFBQVFDLFFBQVEsT0FBUixDQUFkO0FBQ0EsSUFBTUMsNEJBQTRCLGlEQUFsQztBQUNBLElBQU1DLDhCQUE4QixtSEFBcEM7QUFDQTs7Ozs7QUFLQSxJQUFNQyxjQUFjO0FBQ2hCQyxpQkFBYSxhQURHO0FBRWhCO0FBQ0FDLG1CQUhnQiw2QkFHRTtBQUNkLGVBQU87QUFDSEMsb0JBQVFDLE1BREw7QUFFSEMsb0JBQVEsRUFGTDtBQUdIQyw2QkFBaUIsS0FIZDtBQUlIQyw2QkFBaUI7QUFKZCxTQUFQO0FBTUgsS0FWZTs7QUFXaEI7QUFDQUMsbUJBWmdCLDZCQVlFO0FBQ2QsZUFBTyxFQUFDSCxRQUFRLEtBQUtJLEtBQUwsQ0FBV0osTUFBcEIsRUFBNEJDLGlCQUFpQixLQUFLRyxLQUFMLENBQVdILGVBQXhELEVBQVA7QUFDSCxLQWRlOztBQWVoQjtBQUNBSSxzQkFo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Y2VzQ29udGVudCI6WyJpbXBvcnQgYnVpbGRlciBmcm9tICdmb2N1cy1jb3JlL2NvbXBvbmVudC9idWlsZGVyJztcclxuY29uc3QgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xyXG5jb25zdCBSRUFDVF9OT1RfQ09NUE9ORU5UX0VSUk9SID0gJ1VuY2F1Z2h0IFR5cGVFcnJvcjogdW5kZWZpbmVkIGlzIG5vdCBhIGZ1bmN0aW9uJztcclxuY29uc3QgUkVBQ1RfTk9UX0NPTVBPTkVOVF9NRVNTQUdFID0gJ0NoZWNrIHlvdXIgY29uc29sZSBlcnJvcnMsIGl0IHNlZW1zIHlvdSBhcmUgdHJ5aW5nIHRvIGNyZWF0ZSBhIGNvbXBvbmVudCBmcm9tIHNvbWV0aGluZyB3aGljaCBpcyBub3QgYSBjb21wb25lbnQuJztcclxuLyoqXHJcbiAqIEVycm9yIGNlbnRlciBjb21wb25lbnQuXHJcbiAqIEBleGFtcGxlIFJlYWN0LnJlbmRlcig8RXJyb3JDZW50ZXIgLz4sIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjb250YWluZXInKSlcclxuICogQHR5cGUge09iamVjdH1cclxuICovXHJcbmNvbnN0IGVycm9yQ2VudGVyID0ge1xyXG4gICAgZGlzcGxheU5hbWU6ICdFcnJvckNlbnRlcicsXHJcbiAgICAvKiogQGluaGVyaXRlZGRvYyAqL1xyXG4gICAgZ2V0RGVmYXVsdFByb3BzKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHNvdXJjZTogd2luZG93LFxyXG4gICAgICAgICAgICBlcnJvcnM6IFtdLFxyXG4gICAgICAgICAgICBpc0Vycm9yc1Zpc2libGU6IGZhbHNlLFxyXG4gICAgICAgICAgICBudW1iZXJEaXNwbGF5ZWQ6IDNcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgLyoqIEBpbmhlcml0ZWRkb2MgKi9cclxuICAgIGdldEluaXRpYWxTdGF0ZSgpIHtcclxuICAgICAgICByZXR1cm4ge2Vycm9yczogdGhpcy5wcm9wcy5lcnJvcnMsIGlzRXJyb3JzVmlzaWJsZTogdGhpcy5wcm9wcy5pc0Vycm9yc1Zpc2libGV9O1xyXG4gICAgfSxcclxuICAgIC8qKiBAaW5oZXJpdGVkZG9jICovXHJcbiAgICBjb21wb25lbnRXaWxsTW91bnQoKSB7XHJcbiAgICAgICAgdGhpcy5wcm9wcy5zb3VyY2Uub25lcnJvciA9ICgoZSkgPT4ge1xyXG4gICAgICAgICAgICBsZXQge2Vycm9yc30gPSB0aGlzLnN0YXRlO1xyXG4gICAgICAgICAgICBlcnJvcnMucHVzaChlKTtcclxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7ZXJyb3JzOiBlcnJvcnN9KTtcclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcbiAgICAvKipcclxuICAgICAqIFRvZ2dsZSB0aGUgdmlzaWJpbGl0eSBvZiB0aGUgZXJyb3IgY29tcG9uZW50LlxyXG4gICAgICovXHJcbiAgICBfdG9nZ2xlVmlzaWJsZSgpIHtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHtpc0Vycm9yc1Zpc2libGU6ICF0aGlzLnN0YXRlLmlzRXJyb3JzVmlzaWJsZX0pO1xyXG4gICAgfSxcclxuICAgIC8qKlxyXG4gICAgICogUmVuZGVyIGFsbCB0aGUgZXJyb3JzLlxyXG4gICAgICogQHJldHVybiB7b2JqZWN0fSAtIFRoZSBqc3ggZXJyb3JzLlxyXG4gICAgICovXHJcbiAgICBfcmVuZGVyRXJyb3JzKCkge1xyXG4gICAgICAgIGNvbnN0IHtlcnJvcnMsIGlzRXJyb3JzVmlzaWJsZX0gPSB0aGlzLnN0YXRlO1xyXG4gICAgICAgIGNvbnN0IHtudW1iZXJEaXNwbGF5ZWR9ID0gdGhpcy5wcm9wcztcclxuICAgICAgICBjb25zdCBlcnJvckxlbmd0aCA9IGVycm9ycy5sZW5ndGg7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdiBkYXRhLWZvY3VzPSdlcnJvci1jZW50ZXInPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBkYXRhLWZvY3VzPSdlcnJvci1jb3VudGVyJz5cclxuICAgICAgICAgICAgICAgICAgICA8aSBjbGFzc05hbWU9J21hdGVyaWFsLWljb25zJyBzdHlsZT17e2N1cnNvcjogJ3BvaW50ZXInLCBmb250U2l6ZTogJzI4cHgnLCBwYWRkaW5nOiAnMTVweCA1cHggNXB4IDVweCd9fT5lcnJvcjwvaT57ZXJyb3JMZW5ndGh9XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgZGF0YS1mb2N1cz0nZXJyb3ItYWN0aW9ucyc+XHJcbiAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3NOYW1lPSdtYXRlcmlhbC1pY29ucycgc3R5bGU9e3tjdXJzb3I6ICdwb2ludGVyJywgZm9udFNpemU6ICczNnB4JywgcGFkZGluZzogJzEwcHgnfX0gb25DbGljaz17KCkgPT4ge3dpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTsgfX0+cmVmcmVzaDwvaT5cclxuICAgICAgICAgICAgICAgICAgICA8aSBjbGFzc05hbWU9J21hdGVyaWFsLWljb25zJyBzdHlsZT17e2N1cnNvcjogJ3BvaW50ZXInLCBmb250U2l6ZTogJzM2cHgnLCBwYWRkaW5nOiAnMTBweCd9fSBvbkNsaWNrPXt0aGlzLl90b2dnbGVWaXNpYmxlfT57YGtleWJvYXJkX2Fycm93XyR7aXNFcnJvcnNWaXNpYmxlID8gJ2Rvd24nIDogJ3VwJ31gfTwvaT5cclxuICAgICAgICAgICAgICAgICAgICA8aSBjbGFzc05hbWU9J21hdGVyaWFsLWljb25zJyBzdHlsZT17e2N1cnNvcjogJ3BvaW50ZXInLCBmb250U2l6ZTogJzM2cHgnLCBwYWRkaW5nOiAnMTBweCd9fSBvbkNsaWNrPXsoKSA9PiB7dGhpcy5zZXRTdGF0ZSh7ZXJyb3JzOiBbXX0pOyB9fT5kZWxldGU8L2k+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDx1bCBkYXRhLWZvY3VzPSdlcnJvci1zdGFjayc+XHJcbiAgICAgICAgICAgICAgICAgIHtpc0Vycm9yc1Zpc2libGUgPyBlcnJvcnMuc2xpY2UoZXJyb3JMZW5ndGggLSBudW1iZXJEaXNwbGF5ZWQsIGVycm9yTGVuZ3RoKS5tYXAoKGVycikgPT4geyBjb25zdCBlID0gUkVBQ1RfTk9UX0NPTVBPTkVOVF9FUlJPUiA9PT0gZXJyID8gUkVBQ1RfTk9UX0NPTVBPTkVOVF9NRVNTQUdFIDogZXJyOyByZXR1cm4gPGxpPntlfTwvbGk+OyB9KSA6IG51bGx9XHJcbiAgICAgICAgICAgICAgICA8L3VsPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApO1xyXG4gICAgfSxcclxuICAgIC8qKiBAaW5oZXJpdGVkZG9jICovXHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIDAgPCB0aGlzLnN0YXRlLmVycm9ycy5sZW5ndGggPyB0aGlzLl9yZW5kZXJFcnJvcnMoKSA6IG51bGw7XHJcbiAgICB9XHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGJ1aWxkZXIoZXJyb3JDZW50ZXIpO1xyXG4iXX0=