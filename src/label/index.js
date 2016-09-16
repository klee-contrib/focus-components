// Dependencies
import React, {Component, PropTypes} from 'react';
import i18next from 'i18next';

function Label({name, text}) {
    const content = text || name;
    return (
        <label data-focus="label" htmlFor={name}>
            {i18next.t(content)}
        </label>
    );
}

Label.propTypes = {
    name: PropTypes.string.isRequired,
    text: PropTypes.string
}
module.exports = Label;
