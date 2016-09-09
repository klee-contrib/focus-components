import React, {PropTypes, PureComponent} from 'react';
import i18next from 'i18next';
import includes from 'lodash/includes';
import uniqueId from 'lodash/uniqueId';
import snakeCase from 'lodash/snakeCase';
import ButtonHelp from '../button-help';

const defaultProps = {
    buttonsPosition: 'top',
    showHelp: false
};

const propTypes = {
    Buttons: PropTypes.element,
    buttonsPosition: PropTypes.oneOf(['both', 'bottom', 'top']).isRequired,
    title: PropTypes.string,
    showHelp: PropTypes.bool,
    blockName: PropTypes.string
};

/**
* Panel.
*/
class Panel extends PureComponent {
    constructor(props) {
        super(props);
        this.spyId = uniqueId('panel_');
    }

    /**
    * Render the a block container and the cild content of the block.
    * @return {DOM} React DOM element
    */
    render() {
        const {blockName, Buttons, buttonsPosition, children, title, showHelp} = this.props;
        const shouldDisplayActionsTop = Buttons && includes(['both', 'top'], buttonsPosition);
        const shouldDisplayActionsBottom = Buttons && includes(['both', 'bottom'], buttonsPosition);
        return (
            <div className='mdl-card mdl-card--border mdl-shadow--4dp' data-spy={this.spyId} data-focus='panel'>
                <div className='mdl-card__title mdl-card--border' data-focus='panel-title'>
                    {title && <h3 data-spy-title>{i18next.t(title)}</h3>}
                    {shouldDisplayActionsTop && <div className='buttons'>{Buttons}</div>}
                    {showHelp && <ButtonHelp blockName={blockName || snakeCase(i18next.t(title)).split('_')[0]} />}
                </div>
                <div className='mdl-card__supporting-text' data-focus='panel-content'>
                    {children}
                </div>
                {shouldDisplayActionsBottom &&
                    <div className='mdl-card__actions mdl-card--border' data-focus='panel-actions'>
                        <div className='buttons'>{Buttons}</div>
                    </div>
                }
            </div>
        );
    }
}

Panel.displayName = 'Panel';
Panel.defaultProps = defaultProps;
Panel.propTypes = propTypes;
export default Panel;
