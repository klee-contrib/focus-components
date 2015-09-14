var pick = require('lodash/object/pick');
var dir = require('node-dir');
var components = [];
var assign = require('object-assign');
var exampleIndex = {};
var fs = require('fs');
var os = require('os');

function _processFileName(fileName){
    if (os.type() === 'Windows_NT') {
        var path = fileName.split('src\\')[1];
        return {dot: path.replace(/\\/g, '.'), path: './src/' + path.replace(/\\/g, '/')};
    } else {
        var path = fileName.split('src\/')[1];
        return {dot: path.replace(/\//g, '.'), path: './src/' + path.replace(/\//g, '/')};
    }
}

dir.readFiles('./src',
    {match: /package.json/},
    function(err, content, filename, next) {
        if (err) {throw err;}
        var componentInfos = JSON.parse(content);
        //push the components into the list
        var processName = _processFileName(filename);
        var packageInfos = pick(componentInfos, 'name','version','description','keywords','photo','homepage');
        var code = fs.readFileSync(processName.path.split('/package.json')[0] + '/example/index.js', {encoding: 'utf-8'});
        components.push(assign({}, packageInfos, {code: code}));
        next();
    },
    function(err, files){
        if (err) {throw err;}
            //console.log('finished reading files:', files);
            // console.log('components', components);
        _createComponentJSON(components, './src/showcase/catalog/components.json')
});

function _createComponentJSON(data, outputFilename){
    fs.writeFile(outputFilename, JSON.stringify(data, null, 4), function(err) {
        if(err) {
          console.log(err);
        } else {
          console.log("Components.json saved to " + outputFilename);
        }
    });
}
