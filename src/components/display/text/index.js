import React, {PropTypes, Component} from 'react';
import {translate} from 'focus-core/translation';
// import Translation from '../../../behaviours/translation';

/**
* Render the value.
* @return {string} The formated value.
*/
function renderValue(formatter, value) {
    return formatter(value);
}

function DisplayText({formatter, value, ...otherProps}) {
    return(
        <div {...otherProps}>
            {translate(this.renderValue(formatter, value))}
        </div>
    );
}

DisplayText.defaultProps = {
    formatter: (data) => data
};

DisplayText.propTypes = {
    type: PropTypes.string,
    value: PropTypes.oneOfType(['string', 'number']),
    name: PropTypes.string,
    style: PropTypes.object
};

DisplayText.displayName = 'DisplayText';

module.exports = DisplayText;
