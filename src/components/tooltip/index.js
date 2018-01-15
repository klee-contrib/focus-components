//dependencies
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import MDBehaviour from '../../behaviours/material';
import Translation from '../../behaviours/translation';
import filterProps from '../../utils/filter-html-attributes'

/**
 * Component's props
 */
const propTypes = {
    position: PropTypes.oneOf(['top', 'left', 'bottom', 'right']),
    isLarge: PropTypes.bool,
    label: PropTypes.string.isRequired,
    htmlFor: PropTypes.string.isRequired
};

/**
 * Component default Props
 */
const defaultProps = {
    position: 'bottom',
    isLarge: false
};

/**
* Tooltip Component.
*/
@MDBehaviour('materialTooltip')
@Translation
class Tooltip extends PureComponent {

    /**
     * Builds the tooltip's className
     * @return {string} The built classname
     */
    buildClassname = () => {
        const { isLarge, position } = this.props;
        let tooltipLarge = isLarge === true ? ' mdl-tooltip--large' : '';
        return ` mdl-tooltip mdl-tooltip--${position}${tooltipLarge}`;
    }

    render() {
        const { label, className, htmlFor, ...others } = this.props;
        const renderedClassName = `${className ? className : ''}${this.buildClassname()}`;
        const tooltipProps = { ...filterProps(others), htmlFor, className: renderedClassName };

        return (
            <div data-focus='tooltip' ref='materialTooltip' {...tooltipProps} >
                <span className='tooltip-text'>{this.i18n(label)}</span>
            </div>
        );
    }
}

Tooltip.displayName = 'Tooltip';
Tooltip.propTypes = propTypes;
Tooltip.defaultProps = defaultProps;

export default Tooltip;
