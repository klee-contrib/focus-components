import React, {PropTypes} from 'react';
import {translate} from 'focus-core/translation';

const defaultProps = {
    formatter: (data) => data
};

const propTypes = {
    formatter: PropTypes.func,
    name: PropTypes.string,
    style: PropTypes.object,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

//v2 : replace div by span
function DisplayText({formatter, style, value}) {
    const formattedValue = translate(formatter(value));
    return(
        <div className={style}>{formattedValue}</div>
    );
}

//Static props.
DisplayText.displayName = 'DisplayText';
DisplayText.defaultProps = defaultProps;
DisplayText.propTypes = propTypes;

export default DisplayText;
