var pick = require('lodash/object/pick');
var dir = require('node-dir');
var components = [];
dir.readFiles('/dev/focus-components/src',
    {match: /package.json/},
    function(err, content, next) {
        if (err) {throw err;}
        components.push(pick(JSON.parse(content), 'name','version','description','keywords','photo'));
        console.log('content:', content);
        next();
    },
    function(err, files){
        if (err) {throw err;}
        console.log('finished reading files:', files);
        console.log('components', components);
});
