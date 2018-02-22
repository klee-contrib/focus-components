

import CONFIG from '../config';
import toMoment from '../to-moment';

function f(mom, format) {
    return toMoment(mom).format(format)
}

export default {
    day: function day(mom, format) {
        return f(mom, format || CONFIG.dayFormat)
    },

    month: function month(mom, format) {
        return f(mom, format || CONFIG.monthFormat)
    },

    year: function year(mom, format) {
        return f(mom, format || CONFIG.yearFormat)
    }
}