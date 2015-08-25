(function module(context){
    context;
    /**
     * Load a script given its config.
     * @param  {string} url  - url to load.
     * @return {Promise} - Loading script promise.
     */
    function loadStyle(url) {
        const scriptPromise = new Promise((resolve, reject)=>{
            // Create a new script tag
            let style = document.createElement('link');
            style.setAttribute('rel', 'stylesheet');
            style.setAttribute('type', 'text/css');
            style.setAttribute('href', url);
            // Call resolve when it’s loaded
            style.addEventListener('load', ()=>{
                resolve(url);
            }, false);

            // Reject the promise if there’s an error
            style.addEventListener('error', ()=>{
                reject(url);
            }, false);
            // Add it to the body
            document.getElementsByTagName('head')[0].appendChild(style);
        });
        return scriptPromise;
    }
    //Exports the function in windows
    context.loadStyle = loadStyle;
}(window));
