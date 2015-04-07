/*global window*/
module.exports = {
    /**
     * Compute the translated label.
     * @param key {string}- Key in the dictionnary of translations.
     * @param data {object} - Data to interpole in the translated string.
     * @returns {string} - Translated string.
     */
    i18n: function translate(key, data) {
        var fn = (window.i18n && window.i18n.t) ? window.i18n.t : function defaulti18n(trKey){return trKey; };
        return fn(key, data);
    }
};