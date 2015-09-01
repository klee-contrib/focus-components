var pick = require('lodash/object/pick');
var dir = require('node-dir');
var components = [];
var exampleIndex = {};
dir.readFiles('/dev/focus-components/src',
    {match: /package.json/},
    function(err, content, filename, next) {
        if (err) {throw err;}
        var componentInfos = JSON.parse(content);
        //push the components into the list
        components.push(pick(componentInfos, 'name','version','description','keywords','photo'));
        exampleIndex[componentInfos.name] = filename;
        console.log('content:', content);
        next();
    },
    function(err, files){
        if (err) {throw err;}
        console.log('finished reading files:', files);
        console.log('components', components);
        console.log('exampleIndex', exampleIndex);
});
