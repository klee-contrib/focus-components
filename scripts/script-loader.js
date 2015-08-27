(function module(context){
    /**
     * Load a script given its config.
     * @param  {string} url  - url to load.
     * @return {Promise} - Loading script promise.
     */
    function loadScript(url) {
        const scriptPromise = new Promise((resolve, reject)=>{
            // Create a new script tag
            let script = document.createElement('script');
            // Use the url argument as source attribute
            script.src = url;
            // Call resolve when it’s loaded
            script.addEventListener('load', ()=>{
                resolve(url);
            }, false);

            // Reject the promise if there’s an error
            script.addEventListener('error', ()=>{
                reject(url);
            }, false);
            // Add it to the body
            document.body.appendChild(script);
        });
        return scriptPromise;
    }
    //Exports the function in windows
    context.loadScript = loadScript;
}(window));
