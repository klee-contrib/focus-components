import { inputHtmlAttributes, eventHtmlAttributes } from './react-html-attributes';
import pairs from 'lodash/object/pairs';

/**
 * Filter the incoming props, so only valid props for native HTML elements are passed through.
 * Value prop is also defaulted to empty string, instead of null or undefined.
 * 
 * @param {object} props the incoming props
 * @returns {object} an object with valid <props></props>
 */
function checkProps(props) {
    return pairs(props).reduce((acc, [key, value]) => {
        if (inputHtmlAttributes.indexOf(key) !== -1 || eventHtmlAttributes.indexOf(key) !== -1 || key.startsWith('data-') || key.startsWith('aria-')) {
            acc[key] = (key === 'value' && (value === null || value === undefined)) ? '' : value;
        }
        return acc;
    }, {});
}

export default checkProps;  