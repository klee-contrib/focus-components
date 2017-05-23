// Dependencies
import React, { Component, PropTypes } from 'react';
import { translate } from 'focus-core/translation';

function Label({name, text, isRequired}) {
    const content = text || name;
    return (
        <label data-focus='label' htmlFor={name}>
            {translate(content) + (isRequired ? '\u202f*' : '')}
        </label>
    );
}

Label.propTypes = {
    name: PropTypes.string.isRequired,
    text: PropTypes.string
}

export default Label;
