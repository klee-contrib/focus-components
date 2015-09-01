var pick = require('lodash/object/pick');
var dir = require('node-dir');
var components = [];
var exampleIndex = {};
var fs = require('fs');
function _processFileName(fileName){
    var path = fileName.split('\\src\\')[1];
    console.log('PATHHHHHHHHHHHH', path);
    return {dot: path.replace(/\\/g, '.'), path: '../src/' + path.replace(/\\/g, '/')};
}

dir.readFiles('/dev/focus-components/src',
    {match: /package.json/},
    function(err, content, filename, next) {
        if (err) {throw err;}
        var componentInfos = JSON.parse(content);
        //push the components into the list
        components.push(pick(componentInfos, 'name','version','description','keywords','photo'));
        var processName = _processFileName(filename);
        console.log('fn', filename, 'process', processName);
         exampleIndex[processName.dot] = {
             path :  processName.path/*,
             content: fs.readFileSync(filename + '/example/index.js')*/
         };
        //console.log('content:', content);
        next();
    },
    function(err, files){
        if (err) {throw err;}
        console.log('finished reading files:', files);
        console.log('components', components);
        console.log('exampleIndex', exampleIndex);
});
