'use strict';

(function module(context) {
    /**
     * Load a script given its config.
     * @param  {string} url  - url to load.
     * @return {Promise} - Loading script promise.
     */
    function loadScript(url) {
        var scriptPromise = new Promise(function (resolve, reject) {
            // Create a new script tag
            var script = document.createElement('script');
            // Use the url argument as source attribute
            script.src = url;
            // Call resolve when it’s loaded
            script.addEventListener('load', function () {
                resolve(url);
            }, false);

            // Reject the promise if there’s an error
            script.addEventListener('error', function () {
                reject(url);
            }, false);
            // Add it to the body
            document.body.appendChild(script);
        });
        return scriptPromise;
    }
    //Exports the function in windows
    context.loadScript = loadScript;
})(window);
'use strict';

(function module(context) {
    context;
    /**
     * Load a script given its config.
     * @param  {string} url  - url to load.
     * @return {Promise} - Loading script promise.
     */
    function loadStyle(url) {
        var scriptPromise = new Promise(function (resolve, reject) {
            // Create a new script tag
            var style = document.createElement('link');
            style.setAttribute('rel', 'stylesheet');
            style.setAttribute('type', 'text/css');
            style.setAttribute('href', url);
            // Call resolve when it’s loaded
            style.addEventListener('load', function () {
                resolve(url);
            }, false);

            // Reject the promise if there’s an error
            style.addEventListener('error', function () {
                reject(url);
            }, false);
            // Add it to the body
            document.getElementsByTagName('head')[0].appendChild(style);
        });
        return scriptPromise;
    }
    //Exports the function in windows
    context.loadStyle = loadStyle;
})(window);
'use strict';

var loadScript = window.loadScript;
var loadStyle = window.loadStyle;
//bootstrap
var BOOTSTRAP_JS = 'https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.5/js/bootstrap.js',
    BOOTSTRAP_CSS = 'https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.5/css/bootstrap.css',
    FONTAWESOME_CSS = '//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css';
//bootstrap material
var BOOTSTRAP_MATERIAL_CSS = '//cdn.jsdelivr.net/bootstrap.material-design/0.3.0/css/material.min.css',
    BOOTSTRAP_MATERIAL_RIPPLE_CSS = '//cdn.jsdelivr.net/bootstrap.material-design/0.3.0/css/ripples.min.css',
    BOOTSTRAP_MATERIAL_FONT = '//cdn.jsdelivr.net/bootstrap.material-design/0.3.0/css/material-wfont.min.css',
    BOOTSTRAP_MATERIAL_JS = '//cdn.jsdelivr.net/bootstrap.material-design/0.3.0/js/material.min.js',
    BOOTSTRAP_MATERIAL_RIPPLE_JS = '//cdn.jsdelivr.net/bootstrap.material-design/0.3.0/js/ripples.min.js';
//React
var REACT_JS = 'https://fb.me/react-0.13.3.js',
    BABEL_TRANSFORMER = 'https://cdnjs.cloudflare.com/ajax/libs/babel-core/5.6.15/browser.js';
//Lodash
var LODASH = 'https://cdnjs.cloudflare.com/ajax/libs/lodash.js/3.9.3/lodash.js';
//jquery
var JQUERY = '//code.jquery.com/jquery-1.10.2.min.js';
//Backbone
var BACKBONE = 'https://cdnjs.cloudflare.com/ajax/libs/backbone.js/1.2.1/backbone.js';
var I18N = 'https://cdnjs.cloudflare.com/ajax/libs/i18next/1.6.3/i18next-1.6.3.min.js';
var SHOWDOWN = 'https://cdnjs.cloudflare.com/ajax/libs/showdown/0.4.0/Showdown.js';
var MOMENT = '//cdn.jsdelivr.net/momentjs/2.9.0/moment.min.js';
var NUMERAL = '//cdnjs.cloudflare.com/ajax/libs/numeral.js/1.4.5/numeral.min.js';

var DATE_RANGE_PICKER_JS = '//cdn.jsdelivr.net/bootstrap.daterangepicker/1/daterangepicker.js',
    DATE_RANGE_PICKER_CSS = '//cdn.jsdelivr.net/bootstrap.daterangepicker/1/daterangepicker-bs3.css';

var FOCUS_JS = '/focus-components/dist/js/focus.js';
var FOCUS_COMPONENTS_JS = '/focus-components/dist/js/focus-components.js',
    FOCUS_COMPONENTS_CSS = '/focus-components/dist/css/focus-components.css';
var FOCUS_INIT = '/focus-components/example/js/initFocus.js';
/**
 * Load all js dep.
 * @return {Promise} - Promise of the JS loading.
 */
function loadJS() {
    // Bootstrap.
    function bootstrapPromise() {
        return loadScript(BOOTSTRAP_JS).then(function () {
            return Promise.all([loadScript(BOOTSTRAP_MATERIAL_JS), loadScript(BOOTSTRAP_MATERIAL_RIPPLE_JS)]);
        });
    }
    function focusPromise() {
        return loadScript(FOCUS_JS).then(function () {
            return loadScript(FOCUS_COMPONENTS_JS);
        });
    }
    return Promise.all([loadScript(JQUERY), loadScript(REACT_JS), loadScript(LODASH), loadScript(BABEL_TRANSFORMER)]).then(function () {
        return Promise.all([bootstrapPromise(), loadScript(BACKBONE), loadScript(I18N), loadScript(MOMENT).then(function () {
            return loadScript(DATE_RANGE_PICKER_JS);
        }), loadScript(NUMERAL), loadScript(SHOWDOWN)]);
    }).then(function () {
        return focusPromise();
    }).then(function () {
        return loadScript(FOCUS_INIT);
    });
}
/**
 * Load all CSS dependencies.
 * @return {Promise} - Promise of all css load.
 */
function loadCSS() {
    return Promise.all([loadStyle(BOOTSTRAP_CSS), loadStyle(FONTAWESOME_CSS)]).then(function () {
        return Promise.all([loadStyle(BOOTSTRAP_MATERIAL_CSS), loadStyle(BOOTSTRAP_MATERIAL_RIPPLE_CSS),
        //loadStyle(BOOTSTRAP_MATERIAL_FONT),
        loadStyle(DATE_RANGE_PICKER_CSS)]);
    }).then(function () {
        return loadStyle(FOCUS_COMPONENTS_CSS);
    });
}
function loadAssets() {
    return Promise.all([loadJS(), loadCSS()]).then(function (s) {
        console.info('All style and scripts loaded', s);
    }, function (err) {
        console.error('A problem occurs on the loadin of one or sevral scripts of style files.', err);
    });
}

/*
<link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css">
<link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css"/>

<script src="https://fb.me/react-0.13.3.js"></script>
<script src="https://fb.me/JSXTransformer-0.13.3.js"></script>

<script src="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/3.9.3/lodash.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/backbone.js/1.2.1/backbone.js"></script>

<!-- Material degign-->
<script src="//code.jquery.com/jquery-1.10.2.min.js"></script>
<script src='https://cdnjs.cloudflare.com/ajax/libs/i18next/1.6.3/i18next-1.6.3.min.js'></script>

<link rel="stylesheet" href="//cdn.jsdelivr.net/bootstrap.material-design/0.3.0/css/material-wfont.min.css">
<link rel="stylesheet" href="//cdn.jsdelivr.net/bootstrap.material-design/0.3.0/css/material.min.css">
<link rel="stylesheet" href="//cdn.jsdelivr.net/bootstrap.material-design/0.3.0/css/ripples.min.css">
<script src="//cdn.jsdelivr.net/bootstrap.material-design/0.3.0/js/material.min.js"></script>
<script src="//cdn.jsdelivr.net/bootstrap.material-design/0.3.0/js/ripples.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/showdown/0.4.0/Showdown.js"></script>

<!-- Include Date Range Picker -->
<script type="text/javascript" src="//cdn.jsdelivr.net/momentjs/2.9.0/moment.min.js"></script>
<script type="text/javascript" src="//cdn.jsdelivr.net/bootstrap.daterangepicker/1/daterangepicker.js"></script>
<link rel="stylesheet" type="text/css"
href="//cdn.jsdelivr.net/bootstrap.daterangepicker/1/daterangepicker-bs3.css"/>


<!-- Material degign-->
<script src="/focus-components/dist/js/focus.js"></script>
<script src="/focus-components/dist/js/focus-components.js"></script>
<script src="/focus-components/example/js/initFocus.js"></script>
<link rel="stylesheet" href="/focus-components/dist/css/focus-components.css"/>
<link rel="stylesheet" href="/focus-components/example/js/picker.css"/>
*/
