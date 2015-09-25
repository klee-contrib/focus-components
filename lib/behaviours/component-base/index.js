'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _translation = require('../translation');

var _translation2 = _interopRequireDefault(_translation);

var _lodashFunction = require('lodash/function');

/**
 * Component base is an annotation used to combine all the standard annotation of a component.
 * @return {function} - The annotation.
 */
var componentBase = _lodashFunction.flow(_translation2['default']);

exports['default'] = componentBase;
module.exports = exports['default'];