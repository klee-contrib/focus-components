'use strict';

var referenceBehaviour = require('./reference-behaviour');
var actionBehaviour = require('./action-behaviour');
var validationBehaviour = require('./validation-behaviour');

module.exports = {
    actionBehaviour: actionBehaviour,
    referenceBehaviour: referenceBehaviour,
    validationBehaviour: validationBehaviour
};