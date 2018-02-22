import PropTypes from 'prop-types';
import React, { Component } from 'react';

const propTypes = {
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ])
}

const DisplayTextArea = ({ value }) => (
    <div data-focus='display-textarea'>
        {value}
    </div>
);

DisplayTextArea.propTypes = propTypes;

export default DisplayTextArea;