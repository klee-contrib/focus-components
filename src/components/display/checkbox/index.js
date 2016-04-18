import React, {PropTypes} from 'react';
import {translate} from 'focus-core/translation';

/**
* Render the boolean value.
*/
renderValue: function renderValueDisplayText(value) {
    var stringValue = value === true ? 'true' : 'false';
    return translate(`display.checkbox.${stringValue}`);
}

function displayCheckbox({name, value, style}) {
    return(
        <div id={name} name={name} className={style.class}>
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
    style: PropTypes.object,
};

displayCheckbox.displayName = 'DisplayCheckbox';

module.exports = displayCheckbox;
