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
