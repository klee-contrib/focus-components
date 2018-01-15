import PropTypes from 'prop-types';
import React from 'react';
import { translate } from 'focus-core/translation';

/**
* Render the boolean value.
*/
function renderValue(value) {
    const stringValue = value ? 'true' : 'false';
    return translate(`display.checkbox.${stringValue}`);
}

function displayCheckbox({ name, value }) {
    return (
        <div id={name} name={name}>
            {renderValue(value)}
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

export default displayCheckbox;