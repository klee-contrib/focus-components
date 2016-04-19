import translation from 'focus-core/translation'

/*global window*/
/*todo check the library presence*/
module.exports = {
    /**
     * Compute the translated label.
     * @param key {string}- Key in the dictionnary of translations.
     * @param data {object} - Data to interpole in the translated string.
     * @returns {string} - Translated string.
     */
    i18n: function translate(key, data) {
        return translation.translate(key, data);
    }
};
