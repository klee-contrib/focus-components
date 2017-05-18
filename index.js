'use strict';

require('./style');

var _translation = require('focus-core/translation');

var _translation2 = _interopRequireDefault(_translation);

var _history = require('focus-core/history');

var _history2 = _interopRequireDefault(_history);

var _components = require('./components');

var _components2 = _interopRequireDefault(_components);

var _behaviours = require('./behaviours');

var _behaviours2 = _interopRequireDefault(_behaviours);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var infos = require(__PACKAGE_JSON_PATH__ + '/package.json'); //Generator http://patorjk.com/software/taag/#p=display&h=1&f=Banner4&t=Focus-COMPONENTS


/** LEGACY DIRTY HACKISH RUBBISH TRICK */
window.i18n = {
    t: _translation2.default.translate,
    init: _translation2.default.init
};
window.Backbone = {
    history: _history2.default
};

/**
* Display information data for Focus-COMPONENTS
*/
var infosFn = function infos() {
    console.log('\n        FOCUS COMPONENTS\n\n        version: ' + infos.version + '\n        focus-components: ' + infos.homepage + '\n        documentation: ' + infos.documentation + '\n        issues: ' + infos.bugs.url + '\n        ');
};
module.exports = {
    VERSION: infos.version,
    AUTHORS: infos.author,
    NAME: infos.name,

    /**
    * Display documentation data
    */
    DOCUMENTATION: function DOCUMENTATION() {
        console.log('documentation: http://kleegroup.github.io/focus-components');
        console.log('components available');
        console.table(infos.components);
        console.log('repository: ' + infos.repository.url);
        console.log('issues: ' + infos.bugs.url);
    },
    common: require('./common'),
    list: require('./list'),
    search: require('./search'),
    page: require('./page'),
    message: require('./message'),
    application: require('./application'),
    infos: infosFn,
    components: _components2.default,
    behaviours: _behaviours2.default
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlzLXJlYWN0LWNsYXNzLWNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJpbmZvcyIsInJlcXVpcmUiLCJfX1BBQ0tBR0VfSlNPTl9QQVRIX18iLCJ3aW5kb3ciLCJpMThuIiwidCIsInRyYW5zbGF0ZSIsImluaXQiLCJCYWNrYm9uZSIsImhpc3RvcnkiLCJpbmZvc0ZuIiwiY29uc29sZSIsImxvZyIsInZlcnNpb24iLCJob21lcGFnZSIsImRvY3VtZW50YXRpb24iLCJidWdzIiwidXJsIiwibW9kdWxlIiwiZXhwb3J0cyIsIlZFUlNJT04iLCJBVVRIT1JTIiwiYXV0aG9yIiwiTkFNRSIsIm5hbWUiLCJET0NVTUVOVEFUSU9OIiwidGFibGUiLCJjb21wb25lbnRzIiwicmVwb3NpdG9yeSIsImNvbW1vbiIsImxpc3QiLCJzZWFyY2giLCJwYWdlIiwibWVzc2FnZSIsImFwcGxpY2F0aW9uIiwiYmVoYXZpb3VycyJdLCJtYXBwaW5ncyI6Ijs7QUFDQTs7QUFDQTs7OztBQUNBOzs7O0FBSUE7Ozs7QUFDQTs7Ozs7O0FBSEEsSUFBTUEsUUFBUUMsUUFBV0MscUJBQVgsbUJBQWQsQyxDQUxBOzs7QUFVQTtBQUNBQyxPQUFPQyxJQUFQLEdBQWM7QUFDVkMsT0FBRyxzQkFBWUMsU0FETDtBQUVWQyxVQUFNLHNCQUFZQTtBQUZSLENBQWQ7QUFJQUosT0FBT0ssUUFBUCxHQUFrQjtBQUNkQztBQURjLENBQWxCOztBQUlBOzs7QUFHQSxJQUFNQyxVQUFVLFNBQVNWLEtBQVQsR0FBaUI7QUFDN0JXLFlBQVFDLEdBQVIscURBSWVaLE1BQU1hLE9BSnJCLG9DQUt3QmIsTUFBTWMsUUFMOUIsaUNBTXFCZCxNQUFNZSxhQU4zQiwwQkFPY2YsTUFBTWdCLElBQU4sQ0FBV0MsR0FQekI7QUFVSCxDQVhEO0FBWUFDLE9BQU9DLE9BQVAsR0FBaUI7QUFDYkMsYUFBU3BCLE1BQU1hLE9BREY7QUFFYlEsYUFBU3JCLE1BQU1zQixNQUZGO0FBR2JDLFVBQU12QixNQUFNd0IsSUFIQzs7QUFLYjs7O0FBR0FDLG1CQUFlLHlCQUFXO0FBQ3RCZCxnQkFBUUMsR0FBUixDQUFZLDREQUFaO0FBQ0FELGdCQUFRQyxHQUFSLENBQVksc0JBQVo7QUFDQUQsZ0JBQVFlLEtBQVIsQ0FBYzFCLE1BQU0yQixVQUFwQjtBQUNBaEIsZ0JBQVFDLEdBQVIsa0JBQTJCWixNQUFNNEIsVUFBTixDQUFpQlgsR0FBNUM7QUFDQU4sZ0JBQVFDLEdBQVIsY0FBdUJaLE1BQU1nQixJQUFOLENBQVdDLEdBQWxDO0FBQ0gsS0FkWTtBQWViWSxZQUFRNUIsUUFBUSxVQUFSLENBZks7QUFnQmI2QixVQUFNN0IsUUFBUSxRQUFSLENBaEJPO0FBaUJiOEIsWUFBUTlCLFFBQVEsVUFBUixDQWpCSztBQWtCYitCLFVBQU0vQixRQUFRLFFBQVIsQ0FsQk87QUFtQmJnQyxhQUFTaEMsUUFBUSxXQUFSLENBbkJJO0FBb0JiaUMsaUJBQWFqQyxRQUFRLGVBQVIsQ0FwQkE7QUFxQmJELFdBQU9VLE9BckJNO0FBc0JiaUIsb0NBdEJhO0FBdUJiUTtBQXZCYSxDQUFqQiIsImZpbGUiOiJpcy1yZWFjdC1jbGFzcy1jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvL0dlbmVyYXRvciBodHRwOi8vcGF0b3Jqay5jb20vc29mdHdhcmUvdGFhZy8jcD1kaXNwbGF5Jmg9MSZmPUJhbm5lcjQmdD1Gb2N1cy1DT01QT05FTlRTXHJcbmltcG9ydCAnLi9zdHlsZSc7XHJcbmltcG9ydCB0cmFuc2xhdGlvbiBmcm9tICdmb2N1cy1jb3JlL3RyYW5zbGF0aW9uJztcclxuaW1wb3J0IGhpc3RvcnkgZnJvbSAnZm9jdXMtY29yZS9oaXN0b3J5JztcclxuXHJcbmNvbnN0IGluZm9zID0gcmVxdWlyZShgJHtfX1BBQ0tBR0VfSlNPTl9QQVRIX199L3BhY2thZ2UuanNvbmApO1xyXG5cclxuaW1wb3J0IGNvbXBvbmVudHMgZnJvbSAnLi9jb21wb25lbnRzJztcclxuaW1wb3J0IGJlaGF2aW91cnMgZnJvbSAnLi9iZWhhdmlvdXJzJztcclxuXHJcbi8qKiBMRUdBQ1kgRElSVFkgSEFDS0lTSCBSVUJCSVNIIFRSSUNLICovXHJcbndpbmRvdy5pMThuID0ge1xyXG4gICAgdDogdHJhbnNsYXRpb24udHJhbnNsYXRlLFxyXG4gICAgaW5pdDogdHJhbnNsYXRpb24uaW5pdFxyXG59O1xyXG53aW5kb3cuQmFja2JvbmUgPSB7XHJcbiAgICBoaXN0b3J5XHJcbn07XHJcblxyXG4vKipcclxuKiBEaXNwbGF5IGluZm9ybWF0aW9uIGRhdGEgZm9yIEZvY3VzLUNPTVBPTkVOVFNcclxuKi9cclxuY29uc3QgaW5mb3NGbiA9IGZ1bmN0aW9uIGluZm9zKCkge1xyXG4gICAgY29uc29sZS5sb2coXHJcbiAgICAgICAgYFxyXG4gICAgICAgIEZPQ1VTIENPTVBPTkVOVFNcclxuXHJcbiAgICAgICAgdmVyc2lvbjogJHtpbmZvcy52ZXJzaW9ufVxyXG4gICAgICAgIGZvY3VzLWNvbXBvbmVudHM6ICR7aW5mb3MuaG9tZXBhZ2V9XHJcbiAgICAgICAgZG9jdW1lbnRhdGlvbjogJHtpbmZvcy5kb2N1bWVudGF0aW9ufVxyXG4gICAgICAgIGlzc3VlczogJHtpbmZvcy5idWdzLnVybH1cclxuICAgICAgICBgXHJcbiAgICApO1xyXG59O1xyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuICAgIFZFUlNJT046IGluZm9zLnZlcnNpb24sXHJcbiAgICBBVVRIT1JTOiBpbmZvcy5hdXRob3IsXHJcbiAgICBOQU1FOiBpbmZvcy5uYW1lLFxyXG5cclxuICAgIC8qKlxyXG4gICAgKiBEaXNwbGF5IGRvY3VtZW50YXRpb24gZGF0YVxyXG4gICAgKi9cclxuICAgIERPQ1VNRU5UQVRJT046IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdkb2N1bWVudGF0aW9uOiBodHRwOi8va2xlZWdyb3VwLmdpdGh1Yi5pby9mb2N1cy1jb21wb25lbnRzJyk7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ2NvbXBvbmVudHMgYXZhaWxhYmxlJyk7XHJcbiAgICAgICAgY29uc29sZS50YWJsZShpbmZvcy5jb21wb25lbnRzKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhgcmVwb3NpdG9yeTogJHtpbmZvcy5yZXBvc2l0b3J5LnVybH1gKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhgaXNzdWVzOiAke2luZm9zLmJ1Z3MudXJsfWApO1xyXG4gICAgfSxcclxuICAgIGNvbW1vbjogcmVxdWlyZSgnLi9jb21tb24nKSxcclxuICAgIGxpc3Q6IHJlcXVpcmUoJy4vbGlzdCcpLFxyXG4gICAgc2VhcmNoOiByZXF1aXJlKCcuL3NlYXJjaCcpLFxyXG4gICAgcGFnZTogcmVxdWlyZSgnLi9wYWdlJyksXHJcbiAgICBtZXNzYWdlOiByZXF1aXJlKCcuL21lc3NhZ2UnKSxcclxuICAgIGFwcGxpY2F0aW9uOiByZXF1aXJlKCcuL2FwcGxpY2F0aW9uJyksXHJcbiAgICBpbmZvczogaW5mb3NGbixcclxuICAgIGNvbXBvbmVudHMsXHJcbiAgICBiZWhhdmlvdXJzXHJcbn07XHJcbiJdfQ==