/* eslint-disable */
var fs = require('fs');
const path = require('path');

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

var focusVariablePath = path.resolve(__dirname, '../src/style/_mdl_variables.scss');
var node4MdlPath = path.resolve(__dirname, '../node_modules/material-design-lite/src/_variables.scss');
var node6MdlPath = path.resolve(__dirname, '../../material-design-lite/src/_variables.scss');

fs.exists(node6MdlPath, function (exists) {
	var path = exists ? node6MdlPath : node4MdlPath;
    copyFileSync(focusVariablePath, path);
    console.log('Material design lite SASS variables overriden into path : ' + path);
});
