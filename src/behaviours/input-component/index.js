import {inputHtmlAttributes, eventHtmlAttributes} from './react-html-attributes';
import {pairs} from 'lodash';

export const InputBehaviour = Component => class InputComponent extends Component {

    /**
     * Filter the incoming props, so only valid props for native HTML elements are passed through.
     * Value prop is also defaulted to empty string, instead of null or undefined.
     * 
     * @param {object} props the incoming props
     * @returns {object} an object with valid <props></props>
     */
    _checkProps(props) {
        return pairs(props).reduce((acc, [key, value]) => {
            if (inputHtmlAttributes.indexOf(key) !== -1 || eventHtmlAttributes.indexOf(key) !== -1) {
                acc[key] = (key === 'value' && (value === null || value === undefined)) ? '' : value;
            }
            return acc;
        }, {});
    }
};
 