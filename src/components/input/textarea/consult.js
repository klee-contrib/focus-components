import React, {Component, PropTypes} from 'react';

const DisplayTextArea = ({value}) => (
    <div data-focus='display-textarea'>
        {value}
    </div>
);

const propTypes = {
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ])
}
DisplayTextArea.propTypes = propTypes;

export default DisplayTextArea;
