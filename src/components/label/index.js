// Dependencies
import React, { Component, PropTypes } from 'react';
import { translate } from 'focus-core/translation';

function Label({ name, text }) {
    const content = text || name;
    return (
        <label data-focus='label' htmlFor={name}>
            {translate(content)}
        </label>
    );
}

Label.propTypes = {
    name: PropTypes.string.isRequired,
    text: PropTypes.string
}

export default Label;
