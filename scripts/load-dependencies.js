const loadScript = window.loadScript;
const loadStyle = window.loadStyle;
//bootstrap
const BOOTSTRAP_JS = 'https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.5/js/bootstrap.js',
BOOTSTRAP_CSS = 'https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.5/css/bootstrap.css',
FONTAWESOME_CSS = '//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css';
//bootstrap material
const BOOTSTRAP_MATERIAL_CSS = '//cdn.jsdelivr.net/bootstrap.material-design/0.3.0/css/material.min.css',
BOOTSTRAP_MATERIAL_RIPPLE_CSS = '//cdn.jsdelivr.net/bootstrap.material-design/0.3.0/css/ripples.min.css',
BOOTSTRAP_MATERIAL_FONT = '//cdn.jsdelivr.net/bootstrap.material-design/0.3.0/css/material-wfont.min.css',
BOOTSTRAP_MATERIAL_JS = '//cdn.jsdelivr.net/bootstrap.material-design/0.3.0/js/material.min.js',
BOOTSTRAP_MATERIAL_RIPPLE_JS = '//cdn.jsdelivr.net/bootstrap.material-design/0.3.0/js/ripples.min.js';
//React
const REACT_JS = 'https://fb.me/react-0.13.3.js',
BABEL_TRANSFORMER = 'https://cdnjs.cloudflare.com/ajax/libs/babel-core/5.6.15/browser.js';
//Lodash
const LODASH = 'https://cdnjs.cloudflare.com/ajax/libs/lodash.js/3.9.3/lodash.js';
//jquery
const JQUERY = '//code.jquery.com/jquery-1.10.2.min.js';
//Backbone
const BACKBONE = 'https://cdnjs.cloudflare.com/ajax/libs/backbone.js/1.2.1/backbone.js';
const I18N = 'https://cdnjs.cloudflare.com/ajax/libs/i18next/1.6.3/i18next-1.6.3.min.js';
const SHOWDOWN = 'https://cdnjs.cloudflare.com/ajax/libs/showdown/0.4.0/Showdown.js';
const MOMENT = '//cdn.jsdelivr.net/momentjs/2.9.0/moment.min.js';
const NUMERAL = '//cdnjs.cloudflare.com/ajax/libs/numeral.js/1.4.5/numeral.min.js';

const DATE_RANGE_PICKER_JS = '//cdn.jsdelivr.net/bootstrap.daterangepicker/1/daterangepicker.js',
DATE_RANGE_PICKER_CSS = '//cdn.jsdelivr.net/bootstrap.daterangepicker/1/daterangepicker-bs3.css';

const FOCUS_JS = '/focus-components/dist/js/focus.js';
const FOCUS_COMPONENTS_JS = '/focus-components/dist/js/focus-components.js',
      FOCUS_COMPONENTS_CSS = '/focus-components/dist/css/focus-components.css';
const FOCUS_INIT = '/focus-components/example/js/initFocus.js';
/**
 * Load all js dep.
 * @return {Promise} - Promise of the JS loading.
 */
function loadJS(){
    // Bootstrap.
    function bootstrapPromise(){
        return loadScript(BOOTSTRAP_JS).then(()=>{
            return Promise.all([
                    loadScript(BOOTSTRAP_MATERIAL_JS),
                    loadScript(BOOTSTRAP_MATERIAL_RIPPLE_JS)
                ]);
        });
    }
    function focusPromise(){return loadScript(FOCUS_JS).then(()=>{return loadScript(FOCUS_COMPONENTS_JS); })}
    return Promise.all([loadScript(JQUERY), loadScript(REACT_JS), loadScript(LODASH), loadScript(BABEL_TRANSFORMER)])
    .then(()=>{
        return Promise.all([
            bootstrapPromise(),
            loadScript(BACKBONE),
            loadScript(I18N),
            loadScript(MOMENT).then(()=>{return loadScript(DATE_RANGE_PICKER_JS); }),
            loadScript(NUMERAL),
            loadScript(SHOWDOWN)
        ]);
    })
    .then(()=>{return focusPromise(); })
    .then(()=>{return loadScript(FOCUS_INIT); });
}
/**
 * Load all CSS dependencies.
 * @return {Promise} - Promise of all css load.
 */
function loadCSS(){
    return Promise.all([loadStyle(BOOTSTRAP_CSS), loadStyle(FONTAWESOME_CSS)]).then(()=>{
        return Promise.all([
            loadStyle(BOOTSTRAP_MATERIAL_CSS),
            loadStyle(BOOTSTRAP_MATERIAL_RIPPLE_CSS),
            //loadStyle(BOOTSTRAP_MATERIAL_FONT),
            loadStyle(DATE_RANGE_PICKER_CSS)
        ]);
    }).then(()=>{
        return loadStyle(FOCUS_COMPONENTS_CSS);
    });
}
function loadAssets(){
    return Promise.all([loadJS(),loadCSS()]).then((s)=>{
        console.info('All style and scripts loaded', s);
    }, (err)=>{
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
