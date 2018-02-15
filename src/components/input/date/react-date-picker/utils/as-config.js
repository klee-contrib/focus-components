

import assign from 'object-assign';
import CONFIG from '../config';

let KEYS = Object.keys(CONFIG)

function copyList(src, target, list) {
    if (src) {
        list.forEach((key) => {
            target[key] = src[key]
        })
    }

    return target
}

/**
 * Returns an object that copies from given source object
 * on the resulting object only the properties also found in cfg.
 *
 * If no cfg specified, CONFIG is assumed
 *
 * @param  {object} source
 * @param  {Object} [cfg] If not specied, CONFIG will be used
 *
 * @return {Object}
 */
export default function asConfig(source, cfg) {

    let keys = KEYS

    if (cfg) {
        keys = Object.keys(cfg)
    }

    cfg = cfg || CONFIG

    if (!source) {
        return assign({}, cfg)
    }

    return copyList(source, assign({}, cfg), keys)
}