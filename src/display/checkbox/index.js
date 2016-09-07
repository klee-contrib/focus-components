import React, {PropTypes} from 'react';
import i18next from 'i18next';

/**
* Render the boolean value.
*/
function renderValue(value) {
    var stringValue = value ? 'true' : 'false';
    return i18next.t(`display.checkbox.${stringValue}`);
}

function displayCheckbox({name, value}) {
    return(
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

module.exports = displayCheckbox;
