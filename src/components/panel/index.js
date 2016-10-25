import React, {Component, PropTypes} from 'react';
import {findDOMNode} from 'react-dom';
import Translation from '../../behaviours/translation';
import {includes} from 'lodash/collection';
import {uniqueId} from 'lodash/utility';
import {snakeCase} from 'lodash/string';
import ButtonHelp from '../button-help';
import xor from 'lodash/array/xor';

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
        const {actions, actionsPosition, children, title, showHelp, blockName, ...otherProps} = this.props;
        const {spyId} = this.state;
        const shouldDisplayActionsTop = actions && includes(['both', 'top'], actionsPosition);
        const shouldDisplayActionsBottom = actions && includes(['both', 'bottom'], actionsPosition);
        return (
            <div className='mdl-card mdl-card--border mdl-shadow--4dp' data-spy={spyId} data-focus='panel' {...otherProps}>
                <div className='mdl-card__title mdl-card--border' data-focus='panel-title'>
                    {title &&
                        <h3 data-spy-title>{this.i18n(title)}</h3>
                    }
                    {shouldDisplayActionsTop &&
                        <div className='actions'>{actions()}</div>
                    }
                    {showHelp && <ButtonHelp blockName={blockName || snakeCase(this.i18n(title)).split('_')[0]} />}
                </div>
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