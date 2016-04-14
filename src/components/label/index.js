// Dependencies
import React, {Component, PropTypes} from 'react';
import {translate} from 'focus-core/translation';

function Label({name, text, style}) {
    const content = text || name;
    return (
        <label className={style.className} data-focus="label" htmlFor={name}>
            {translate(content)}
        </label>
    );
}

Label.propTypes = {
    name: PropTypes.string.isRequired,
    text: PropTypes.string
}

module.exports = Label;
