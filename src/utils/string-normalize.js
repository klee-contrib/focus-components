import 'unorm'; // Using as String.prototype.normalize polyfill
/**
 * Normalize a string by removing diacritics and making it lower case
 * 
 * @param {string} str a string to be normalized 
 * @returns {string} the normalized string
 */
const toNormalizedLowerString = (str) => {
    if (!str) {
        return str;
    }
    //https://en.wikipedia.org/wiki/Combining_character#Unicode_ranges
    /*
    Combining Diacritical Marks (0300–036F), since version 1.0, with modifications in subsequent versions down to 4.1
    Combining Diacritical Marks Extended (1AB0–1AFF), version 7.0
    Combining Diacritical Marks Supplement (1DC0–1DFF), versions 4.1 to 5.2
    Combining Diacritical Marks for Symbols (20D0–20FF), since version 1.0, with modifications in subsequent versions down to 5.1
    Combining Half Marks (FE20–FE2F), versions 1.0, with modifications in subsequent versions down to 8.0
    */

    let toFilter = str.toLocaleLowerCase().normalize('NFKD');

    toFilter = Array.prototype.map.call(toFilter, elt => {
        const cp = elt.codePointAt(0);
        if (cp >= 768 && cp <= 879 /* 0300–036F */
            || cp >= 6832 && cp <= 6911 /* 1AB0–1AFF */
            || cp >= 7616 && cp <= 7679 /* 1DC0–1DFF */
            || cp >= 8400 && cp <= 8447 /* 20D0–20FF */
            || cp >= 65056 && cp <= 65071 /* FE20–FE2F */
        ) {
            return '';
        }

        return elt;
    }).join('');

    return toFilter.normalize('NFKC');
};

export default toNormalizedLowerString;