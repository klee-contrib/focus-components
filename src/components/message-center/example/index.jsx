
import { addErrorMessage, addWarningMessage, addInformationMessage, addSuccessMessage } from 'focus-core/message';
import MessageCenter from 'focus-components/components/message-center';
import Button from 'focus-components/components/button';

function handleActionMessageButtonClick() {
    const message = {
        content: 'This is a message with possible action. Click on it to try !',
        action: {
            text: 'Click here',
            handler: () => alert('You clicked on the action button !')
        }
    }
    addInformationMessage(message);
}

function MessageCenterExample() {
    return (
        <div>
            <ul>
                <li>
                    <span>Throw an informative message :</span>
                    <Button label='Click here' shape={null} color='accent' type='button' handleOnClick={() => { addInformationMessage('This is an informative message.'); }} />
                </li>
                <li>
                    <span>Throw an error message :</span>
                    <Button label='Click here' shape={null} color='accent' type='button' handleOnClick={() => { addErrorMessage('This is an error message.'); }} />
                </li>
                <li>
                    <span>Throw a warning message :</span>
                    <Button label='Click here' shape={null} color='accent' type='button' handleOnClick={() => { addWarningMessage('This is a warning message.'); }} />
                </li>
                <li>
                    <span>Throw a success message :</span>
                    <Button label='Click here' shape={null} color='accent' type='button' handleOnClick={() => { addSuccessMessage('This is a success message.'); }} />
                </li>
                <li>
                    <span>Throw a informative message with clickable action :</span>
                    <Button label='Click here' shape={null} color='accent' type='button' handleOnClick={handleActionMessageButtonClick} />
                </li>
            </ul>
            <MessageCenter />
        </div>
    );
}

export default MessageCenterExample;
