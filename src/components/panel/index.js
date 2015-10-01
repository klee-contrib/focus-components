import React, {Component, PropTypes} from 'react';
const {builder} = require('focus-core').component;
const Title = require('../../common/title').component;
const {includes} = require('lodash/collection');
const {uniqueId} = require('lodash/utility');
import Translation from '../../behaviours/translation';

const defaultProps = {
    actionsPosition: 'top'
};

const propTypes = {
    actions: PropTypes.func,
    actionsPosition: PropTypes.oneOf(['both', 'bottom', 'top']).isRequired,
    title: PropTypes.string
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
        const {actions, actionsPosition, children, title} = this.props;
        const {spyId} = this.state;
        const shouldDisplayActionsTop = actions && includes(['both', 'top'], actionsPosition);
        const shouldDisplayActionsBottom = actions && includes(['both', 'bottom'], actionsPosition);
        return (
            <div className='mdl-card mdl-card--border mdl-shadow--4dp' data-focus='panel'>
                <div className='mdl-card__title mdl-card--border' data-focus='panel-title'>
                    {title &&
                        <h3 data-spy={spyId}>{this.i18n(title)}</h3>
                    }
                    {shouldDisplayActionsTop &&
                        <div className='actions'>{actions()}</div>
                    }
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
