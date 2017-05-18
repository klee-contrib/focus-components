'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _translation = require('focus-core/translation');

var _collection = require('lodash/collection');

var _button = require('../button');

var _button2 = _interopRequireDefault(_button);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
* Action on the topic click.
* @param  {String} key  topic key
* @return {Function}     Click handler
*/
function topicClickHandler(key, topicClickAction) {
    topicClickAction(key);
}

// Components


function TopicDisplayer(_ref) {
    var displayLabels = _ref.displayLabels,
        topicList = _ref.topicList,
        topicClickAction = _ref.topicClickAction;

    return _react2.default.createElement(
        'div',
        { 'data-focus': 'topic-displayer' },
        (0, _collection.map)(topicList, function (topic, key) {
            var text = displayLabels ? (0, _translation.translate)(topic.label) + ': ' + (0, _translation.translate)(topic.value) : (0, _translation.translate)(topic.value);
            return _react2.default.createElement(_button2.default, {
                handleOnClick: function handleOnClick() {
                    topicClickHandler(key, topicClickAction);
                },
                icon: 'clear',
                key: key,
                label: text
            });
        })
    );
}

TopicDisplayer.displayName = 'TopicDisplayer';
TopicDisplayer.defaultProps = {
    style: undefined, // Component css style.
    topicClickAction: function topicClickAction() {},
    // Action when click on topic
    topicList: {}, // {topic1: "Label of topic one", topic2:"Label of topic 2"} List f topics,
    displayLabels: false
};

exports.default = TopicDisplayer;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJ0b3BpY0NsaWNrSGFuZGxlciIsImtleSIsInRvcGljQ2xpY2tBY3Rpb24iLCJUb3BpY0Rpc3BsYXllciIsImRpc3BsYXlMYWJlbHMiLCJ0b3BpY0xpc3QiLCJ0b3BpYyIsInRleHQiLCJsYWJlbCIsInZhbHVlIiwiZGlzcGxheU5hbWUiLCJkZWZhdWx0UHJvcHMiLCJzdHlsZSIsInVuZGVmaW5lZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7Ozs7QUFDQTs7QUFDQTs7QUFHQTs7Ozs7O0FBRUE7Ozs7O0FBS0EsU0FBU0EsaUJBQVQsQ0FBMkJDLEdBQTNCLEVBQWdDQyxnQkFBaEMsRUFBa0Q7QUFDOUNBLHFCQUFpQkQsR0FBakI7QUFDSDs7QUFWRDs7O0FBWUEsU0FBU0UsY0FBVCxPQUFzRTtBQUFBLFFBQTdDQyxhQUE2QyxRQUE3Q0EsYUFBNkM7QUFBQSxRQUE5QkMsU0FBOEIsUUFBOUJBLFNBQThCO0FBQUEsUUFBbkJILGdCQUFtQixRQUFuQkEsZ0JBQW1COztBQUNsRSxXQUNJO0FBQUE7QUFBQSxVQUFLLGNBQVcsaUJBQWhCO0FBQ0ssNkJBQUlHLFNBQUosRUFBZSxVQUFDQyxLQUFELEVBQVFMLEdBQVIsRUFBZ0I7QUFDNUIsZ0JBQU1NLE9BQU9ILGdCQUFtQiw0QkFBVUUsTUFBTUUsS0FBaEIsQ0FBbkIsVUFBOEMsNEJBQVVGLE1BQU1HLEtBQWhCLENBQTlDLEdBQXlFLDRCQUFVSCxNQUFNRyxLQUFoQixDQUF0RjtBQUNBLG1CQUNJO0FBQ0ksK0JBQWUseUJBQU07QUFBQ1Qsc0NBQWtCQyxHQUFsQixFQUF1QkMsZ0JBQXZCO0FBQXlDLGlCQURuRTtBQUVJLHNCQUFLLE9BRlQ7QUFHSSxxQkFBS0QsR0FIVDtBQUlJLHVCQUFPTTtBQUpYLGNBREo7QUFRSCxTQVZBO0FBREwsS0FESjtBQWVIOztBQUVESixlQUFlTyxXQUFmLEdBQTZCLGdCQUE3QjtBQUNBUCxlQUFlUSxZQUFmLEdBQThCO0FBQzFCQyxXQUFPQyxTQURtQixFQUNSO0FBQ2xCWCxvQkFGMEIsOEJBRVAsQ0FBRSxDQUZLO0FBRUg7QUFDdkJHLGVBQVcsRUFIZSxFQUdYO0FBQ2ZELG1CQUFlO0FBSlcsQ0FBOUI7O2tCQU9lRCxjIiwiZmlsZSI6ImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7dHJhbnNsYXRlfSBmcm9tICdmb2N1cy1jb3JlL3RyYW5zbGF0aW9uJztcclxuaW1wb3J0IHttYXB9IGZyb20gJ2xvZGFzaC9jb2xsZWN0aW9uJztcclxuXHJcbi8vIENvbXBvbmVudHNcclxuaW1wb3J0IEJ1dHRvbiBmcm9tICcuLi9idXR0b24nO1xyXG5cclxuLyoqXHJcbiogQWN0aW9uIG9uIHRoZSB0b3BpYyBjbGljay5cclxuKiBAcGFyYW0gIHtTdHJpbmd9IGtleSAgdG9waWMga2V5XHJcbiogQHJldHVybiB7RnVuY3Rpb259ICAgICBDbGljayBoYW5kbGVyXHJcbiovXHJcbmZ1bmN0aW9uIHRvcGljQ2xpY2tIYW5kbGVyKGtleSwgdG9waWNDbGlja0FjdGlvbikge1xyXG4gICAgdG9waWNDbGlja0FjdGlvbihrZXkpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBUb3BpY0Rpc3BsYXllcih7ZGlzcGxheUxhYmVscywgdG9waWNMaXN0LCB0b3BpY0NsaWNrQWN0aW9ufSkge1xyXG4gICAgcmV0dXJuKFxyXG4gICAgICAgIDxkaXYgZGF0YS1mb2N1cz0ndG9waWMtZGlzcGxheWVyJz5cclxuICAgICAgICAgICAge21hcCh0b3BpY0xpc3QsICh0b3BpYywga2V5KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB0ZXh0ID0gZGlzcGxheUxhYmVscyA/IGAke3RyYW5zbGF0ZSh0b3BpYy5sYWJlbCl9OiAke3RyYW5zbGF0ZSh0b3BpYy52YWx1ZSl9YCA6IHRyYW5zbGF0ZSh0b3BpYy52YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgICAgICAgIDxCdXR0b25cclxuICAgICAgICAgICAgICAgICAgICAgICAgaGFuZGxlT25DbGljaz17KCkgPT4ge3RvcGljQ2xpY2tIYW5kbGVyKGtleSwgdG9waWNDbGlja0FjdGlvbil9fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpY29uPSdjbGVhcidcclxuICAgICAgICAgICAgICAgICAgICAgICAga2V5PXtrZXl9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsPXt0ZXh0fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgfSl9XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICApO1xyXG59XHJcblxyXG5Ub3BpY0Rpc3BsYXllci5kaXNwbGF5TmFtZSA9ICdUb3BpY0Rpc3BsYXllcic7XHJcblRvcGljRGlzcGxheWVyLmRlZmF1bHRQcm9wcyA9IHtcclxuICAgIHN0eWxlOiB1bmRlZmluZWQsIC8vIENvbXBvbmVudCBjc3Mgc3R5bGUuXHJcbiAgICB0b3BpY0NsaWNrQWN0aW9uKCkge30sIC8vIEFjdGlvbiB3aGVuIGNsaWNrIG9uIHRvcGljXHJcbiAgICB0b3BpY0xpc3Q6IHt9LCAvLyB7dG9waWMxOiBcIkxhYmVsIG9mIHRvcGljIG9uZVwiLCB0b3BpYzI6XCJMYWJlbCBvZiB0b3BpYyAyXCJ9IExpc3QgZiB0b3BpY3MsXHJcbiAgICBkaXNwbGF5TGFiZWxzOiBmYWxzZVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBUb3BpY0Rpc3BsYXllcjtcclxuIl19