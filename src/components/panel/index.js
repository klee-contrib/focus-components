import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Translation from '../../behaviours/translation';
import uniqueId from 'lodash/utility/uniqueId';
import snakeCase from 'lodash/string/snakeCase';
import ButtonHelp from '../button-help';

const defaultProps = {
    actionsPosition: 'top'
};

const propTypes = {
    actions: PropTypes.func,
    actionsPosition: PropTypes.oneOf(['both', 'bottom', 'top']).isRequired,
    title: PropTypes.string,
    showHelp: PropTypes.bool,
    blockName: PropTypes.string
};

/**
* Panel.
*/
@Translation
class Panel extends Component {

    constructor(props) {
        super(props);
        const state = {
            spyId: uniqueId('panel_')
        };
        this.state = state;
    }

    /**
    * Render the a block container and the cild content of the block.
    * @return {DOM} React DOM element
    */
    render() {
        const { actions, actionsPosition, children, title, showHelp, blockName, modalTitleId, ...otherProps } = this.props;
        const { spyId } = this.state;
        const shouldDisplayActionsTop = actions && ['both', 'top'].includes(actionsPosition);
        const shouldDisplayActionsBottom = actions && ['both', 'bottom'].includes(actionsPosition);

        const optionalModalProps = {};
        if (modalTitleId) {
            optionalModalProps.id = modalTitleId;
        }

        return (
            <div className='mdl-card mdl-card--border mdl-shadow--4dp' data-spy={spyId} data-focus='panel' {...otherProps}>
                {(title || shouldDisplayActionsTop || showHelp) && <div className='mdl-card__title mdl-card--border' data-focus='panel-title'>
                    {title &&
                        <h3 data-spy-title {...optionalModalProps}>{this.i18n(title)}</h3>
                    }
                    {shouldDisplayActionsTop &&
                        <div className='actions'>{actions()}</div>
                    }
                    {showHelp && <ButtonHelp blockName={blockName || snakeCase(this.i18n(title)).split('_')[0]} />}
                </div>}
                <div className='mdl-card__supporting-text' data-focus='panel-content'>
                    {children}
                </div>
                {shouldDisplayActionsBottom &&
                    <div className='mdl-card__actions mdl-card--border' data-focus='panel-actions'>
                        <div className='actions'>{actions()}</div>
                    </div>
                }
            </div>
        );
    }
}

//Static props.
Panel.displayName = 'Panel';
Panel.defaultProps = defaultProps;
Panel.propTypes = propTypes;

export default Panel;
