import React, {PropTypes} from 'react';
import {translate} from 'focus-core/translation';

/**
* Render the boolean value.
*/
function renderValue(value) {
    var stringValue = value === true ? 'true' : 'false';
    return translate(`display.checkbox.${stringValue}`);
}

function displayCheckbox({name, value}) {
    return(
        <div id={name} name={name}>
            {this.renderValue(value)}
        </div>
    );
}

displayCheckbox.defaultProps = {
    value: undefined,
    name: undefined,
    style: {}
};

displayCheckbox.propTypes = {
    type: PropTypes.string,
    value: PropTypes.bool,
    name: PropTypes.string,
    style: PropTypes.object
};

displayCheckbox.displayName = 'DisplayCheckbox';

module.exports = displayCheckbox;
