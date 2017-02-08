import {inputHtmlAttributes} from '../../common/react-html-attributes';

export const InputBehaviour = Component => class InputComponent extends Component {

    /**
    * comments will be right there
    */
    _checkProps(props) {
        let validInputProps = {};
        let invalidInputProps = {};

        Object.keys(props).map(key => {
            if(key === inputHtmlAttributes[inputHtmlAttributes.indexOf(key)]) {
                validInputProps[key] = (key === 'value' && (props[key] === null || props[key] === undefined)) ? '' : props[key];
            } else {
                invalidInputProps[key] = props[key];
            }
        });
        const managedProps = [validInputProps, invalidInputProps];
        return managedProps;
    };
};
