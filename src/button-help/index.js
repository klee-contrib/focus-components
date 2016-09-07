import React, {PropTypes} from 'react';
import Button from '../button';
import i18next from 'i18next';

function ButtonHelp({blockName}) {
    const {hash, pathname} = window.location;
    const url = hash && hash.replace('#', '') || pathname;
    const {openHelpCenter} = window;

    if (typeof openHelpCenter !== 'function') {
        console.warn('You forgot to set the function "window.openHelpCenter". Please mount somewhere in your application a "DraggableIframe" with "openHelpCenter" as the "toggleFunctionName" prop');
    }

    return (
        <Button
            className='help-button'
            handleOnClick={() => openHelpCenter(url, blockName)}
            icon='help_outline'
            label={`${i18next.t('help.alt')} : ${blockName}`}
            shape='icon'
            type='button'
        />
    );
}
ButtonHelp.propTypes = {
    blockName: PropTypes.string
};
export default ButtonHelp;
