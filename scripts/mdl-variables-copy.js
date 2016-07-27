/* eslint-disable */
var fs = require('fs');
function copyFileSync(srcFile, destFile) {
    try {
        var BUF_LENGTH, buff, bytesRead, fdr, fdw, pos;
        BUF_LENGTH = 64 * 1024;
        buff = new Buffer(BUF_LENGTH);
        fdr = fs.openSync(srcFile, 'r');
        fdw = fs.openSync(destFile, 'w');
        bytesRead = 1;
        pos = 0;
        while (bytesRead > 0) {
            bytesRead = fs.readSync(fdr, buff, 0, BUF_LENGTH, pos);
            fs.writeSync(fdw, buff, 0, bytesRead);
            pos += bytesRead;
        }
        fs.closeSync(fdr);
        return fs.closeSync(fdw);
    } catch(error) {
        console.log(error);
    }
};

var overridenVariablesFilePath = __dirname + '/../src/style/_mdl_variables.scss';
var oldMdlVariablesFilePath = __dirname + '/../node_modules/material-design-lite/src/_variables.scss'
var newMdlVariablesFilePath = __dirname + '/../../node_modules/material-design-lite/src/_variables.scss'

fs.access(oldMdlVariablesFilePath, fs.constants.W_OK, (err) => {
    console.log('Override MDL variables...');
    if(err) {
        console.log('Override file path : ' + newMdlVariablesFilePath);
        copyFileSync(overridenVariablesFilePath, newMdlVariablesFilePath);
    } else {
        console.log('Override file path : ' + oldMdlVariablesFilePath);
        copyFileSync(overridenVariablesFilePath, oldMdlVariablesFilePath);
    }
    console.log('Material design lite SASS variables overriden !');
});
