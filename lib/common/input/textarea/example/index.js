"use strict";

var TextArea = FocusComponents.common.input.textarea.component;

var InputTextAreaSample = React.createClass({
    displayName: "InputTextAreaSample",

    render: function render() {
        var value = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In a accumsan dolor. Nullam in euismod risus. Integer finibus tellus porta tristique tincidunt. Mauris ac velit a nulla ultricies aliquet vitae facilisis lectus. Praesent eget eleifend augue. Curabitur vel metus feugiat, faucibus elit eu, mollis mi. Integer viverra finibus est, a tristique sem pharetra ut. Aenean dignissim, leo eu eleifend tincidunt, ex erat vulputate purus, nec commodo felis velit ac augue. Duis sed iaculis quam, quis dictum augue. Duis ac leo dolor. Integer sit amet quam metus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Vestibulum aliquam mollis felis, non consectetur sem fermentum ac. Vivamus facilisis eleifend leo non tincidunt. Nam orci eros, blandit aliquam sodales vitae, ultrices ac sem. Nunc quis dui a est fringilla faucibus.";
        return React.createElement(TextArea, {
            value: value,
            label: "My awsome textarea",
            cols: 5,
            rows: 5,
            maxLength: 1000,
            maxLength: 3 });
    }
});

return React.createElement(InputTextAreaSample, null);