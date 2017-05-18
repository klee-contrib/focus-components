'use strict';

var _builder = require('focus-core/component/builder');

var _builder2 = _interopRequireDefault(_builder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var React = require('react'); //Dependencies.

var ReactDOM = require('react-dom');

var markdownEditorMixin = {
    /** @inherideddoc */
    getInitialState: function getMarkdownInitialState() {
        return { value: this.props.value };
    },
    /** @inherideddoc */
    componentDidMount: function markdownComponentDidMount() {
        if (!window.Showdown) {
            console.warn('The showdown library should be imported. See https://github.com/showdownjs/showdown');
        }
    },
    /**
     * Handle the change of the value.
     */
    handleChange: function handleMarkdownChange() {
        this.setState({ value: ReactDOM.findDOMNode(this.refs.textarea).value });
    },
    /** @inherideddoc */
    render: function renderMarkdownComponent() {
        var converter = window.Showdown ? function (data) {
            console.warn('showdown should be imported/');return data;
        } : new window.Showdown.converter();
        return React.createElement(
            'div',
            { className: 'MarkdownEditor' },
            React.createElement('textarea', {
                onChange: this.handleChange,
                ref: 'textarea',
                defaultValue: this.state.value }),
            React.createElement('div', {
                className: 'content',
                dangerouslySetInnerHTML: {
                    __html: converter.makeHtml(this.state.value)
                }
            })
        );
    }
};

module.exports = (0, _builder2.default)(markdownEditorMixin);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJSZWFjdCIsInJlcXVpcmUiLCJSZWFjdERPTSIsIm1hcmtkb3duRWRpdG9yTWl4aW4iLCJnZXRJbml0aWFsU3RhdGUiLCJnZXRNYXJrZG93bkluaXRpYWxTdGF0ZSIsInZhbHVlIiwicHJvcHMiLCJjb21wb25lbnREaWRNb3VudCIsIm1hcmtkb3duQ29tcG9uZW50RGlkTW91bnQiLCJ3aW5kb3ciLCJTaG93ZG93biIsImNvbnNvbGUiLCJ3YXJuIiwiaGFuZGxlQ2hhbmdlIiwiaGFuZGxlTWFya2Rvd25DaGFuZ2UiLCJzZXRTdGF0ZSIsImZpbmRET01Ob2RlIiwicmVmcyIsInRleHRhcmVhIiwicmVuZGVyIiwicmVuZGVyTWFya2Rvd25Db21wb25lbnQiLCJjb252ZXJ0ZXIiLCJkYXRhIiwic3RhdGUiLCJfX2h0bWwiLCJtYWtlSHRtbCIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7O0FBQ0E7Ozs7OztBQUNBLElBQU1BLFFBQVFDLFFBQVEsT0FBUixDQUFkLEMsQ0FGQTs7QUFHQSxJQUFNQyxXQUFXRCxRQUFRLFdBQVIsQ0FBakI7O0FBSUEsSUFBTUUsc0JBQXNCO0FBQzFCO0FBQ0VDLHFCQUFpQixTQUFTQyx1QkFBVCxHQUFtQztBQUNoRCxlQUFPLEVBQUNDLE9BQU8sS0FBS0MsS0FBTCxDQUFXRCxLQUFuQixFQUFQO0FBQ0gsS0FKdUI7QUFLMUI7QUFDRUUsdUJBQW1CLFNBQVNDLHlCQUFULEdBQXFDO0FBQ3BELFlBQUcsQ0FBQ0MsT0FBT0MsUUFBWCxFQUFxQjtBQUNqQkMsb0JBQVFDLElBQVIsQ0FBYSxxRkFBYjtBQUNIO0FBQ0osS0FWdUI7QUFXMUI7OztBQUdFQyxrQkFBYyxTQUFTQyxvQkFBVCxHQUFnQztBQUMxQyxhQUFLQyxRQUFMLENBQWMsRUFBQ1YsT0FBT0osU0FBU2UsV0FBVCxDQUFxQixLQUFLQyxJQUFMLENBQVVDLFFBQS9CLEVBQXlDYixLQUFqRCxFQUFkO0FBQ0gsS0FoQnVCO0FBaUIxQjtBQUNFYyxZQUFRLFNBQVNDLHVCQUFULEdBQW1DO0FBQ3ZDLFlBQU1DLFlBQVlaLE9BQU9DLFFBQVAsR0FBa0IsVUFBU1ksSUFBVCxFQUFlO0FBQUVYLG9CQUFRQyxJQUFSLENBQWEsOEJBQWIsRUFBOEMsT0FBT1UsSUFBUDtBQUFjLFNBQS9GLEdBQWtHLElBQUliLE9BQU9DLFFBQVAsQ0FBZ0JXLFNBQXBCLEVBQXBIO0FBQ0EsZUFDRjtBQUFBO0FBQUEsY0FBSyxXQUFVLGdCQUFmO0FBQ0U7QUFDSSwwQkFBVSxLQUFLUixZQURuQjtBQUVJLHFCQUFJLFVBRlI7QUFHSSw4QkFBYyxLQUFLVSxLQUFMLENBQVdsQixLQUg3QixHQURGO0FBTUU7QUFDSSwyQkFBVSxTQURkO0FBRUkseUNBQXlCO0FBQ3JCbUIsNEJBQVFILFVBQVVJLFFBQVYsQ0FBbUIsS0FBS0YsS0FBTCxDQUFXbEIsS0FBOUI7QUFEYTtBQUY3QjtBQU5GLFNBREU7QUFlSDtBQW5DdUIsQ0FBNUI7O0FBdUNBcUIsT0FBT0MsT0FBUCxHQUFpQix1QkFBUXpCLG1CQUFSLENBQWpCIiwiZmlsZSI6ImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vRGVwZW5kZW5jaWVzLlxyXG5pbXBvcnQgYnVpbGRlciBmcm9tICdmb2N1cy1jb3JlL2NvbXBvbmVudC9idWlsZGVyJztcclxuY29uc3QgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xyXG5jb25zdCBSZWFjdERPTSA9IHJlcXVpcmUoJ3JlYWN0LWRvbScpO1xyXG5cclxuXHJcblxyXG5jb25zdCBtYXJrZG93bkVkaXRvck1peGluID0ge1xyXG4gIC8qKiBAaW5oZXJpZGVkZG9jICovXHJcbiAgICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uIGdldE1hcmtkb3duSW5pdGlhbFN0YXRlKCkge1xyXG4gICAgICAgIHJldHVybiB7dmFsdWU6IHRoaXMucHJvcHMudmFsdWV9O1xyXG4gICAgfSxcclxuICAvKiogQGluaGVyaWRlZGRvYyAqL1xyXG4gICAgY29tcG9uZW50RGlkTW91bnQ6IGZ1bmN0aW9uIG1hcmtkb3duQ29tcG9uZW50RGlkTW91bnQoKSB7XHJcbiAgICAgICAgaWYoIXdpbmRvdy5TaG93ZG93bikge1xyXG4gICAgICAgICAgICBjb25zb2xlLndhcm4oJ1RoZSBzaG93ZG93biBsaWJyYXJ5IHNob3VsZCBiZSBpbXBvcnRlZC4gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9zaG93ZG93bmpzL3Nob3dkb3duJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAvKipcclxuICAgKiBIYW5kbGUgdGhlIGNoYW5nZSBvZiB0aGUgdmFsdWUuXHJcbiAgICovXHJcbiAgICBoYW5kbGVDaGFuZ2U6IGZ1bmN0aW9uIGhhbmRsZU1hcmtkb3duQ2hhbmdlKCkge1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe3ZhbHVlOiBSZWFjdERPTS5maW5kRE9NTm9kZSh0aGlzLnJlZnMudGV4dGFyZWEpLnZhbHVlfSk7XHJcbiAgICB9LFxyXG4gIC8qKiBAaW5oZXJpZGVkZG9jICovXHJcbiAgICByZW5kZXI6IGZ1bmN0aW9uIHJlbmRlck1hcmtkb3duQ29tcG9uZW50KCkge1xyXG4gICAgICAgIGNvbnN0IGNvbnZlcnRlciA9IHdpbmRvdy5TaG93ZG93biA/IGZ1bmN0aW9uKGRhdGEpIHsgY29uc29sZS53YXJuKCdzaG93ZG93biBzaG91bGQgYmUgaW1wb3J0ZWQvJyk7IHJldHVybiBkYXRhOyB9IDogbmV3IHdpbmRvdy5TaG93ZG93bi5jb252ZXJ0ZXIoKTtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIk1hcmtkb3duRWRpdG9yXCI+XHJcbiAgICAgICAgPHRleHRhcmVhXHJcbiAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUNoYW5nZX1cclxuICAgICAgICAgICAgcmVmPVwidGV4dGFyZWFcIlxyXG4gICAgICAgICAgICBkZWZhdWx0VmFsdWU9e3RoaXMuc3RhdGUudmFsdWV9IC8+XHJcblxyXG4gICAgICAgIDxkaXZcclxuICAgICAgICAgICAgY2xhc3NOYW1lPVwiY29udGVudFwiXHJcbiAgICAgICAgICAgIGRhbmdlcm91c2x5U2V0SW5uZXJIVE1MPXt7XHJcbiAgICAgICAgICAgICAgICBfX2h0bWw6IGNvbnZlcnRlci5tYWtlSHRtbCh0aGlzLnN0YXRlLnZhbHVlKVxyXG4gICAgICAgICAgICB9fVxyXG4gICAgICAgIC8+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgKTtcclxuICAgIH1cclxufTtcclxuXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGJ1aWxkZXIobWFya2Rvd25FZGl0b3JNaXhpbik7XHJcbiJdfQ==