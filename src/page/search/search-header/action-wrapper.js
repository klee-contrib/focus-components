const DEFAULT_TIMEOUT = 500; // 0.5s

let currentCall = {};

function actionWrapper(searchAction, context, timeout) {
    return () => {
        context = context || this || {};
        let args = arguments;
        if (currentCall) {
            //Cancel previous search action.
            window.clearTimeout(currentCall.timeout);
            if (currentCall.action && currentCall.action.cancel) {
                currentCall.action.cancel();
            }
        }
        currentCall.timeout = window.setTimeout(() => {
            currentCall.action = searchAction.apply(context, args);
            if (currentCall.action && currentCall.action.cancel) {
                currentCall.action.then(() => {
                    currentCall = {};
                })
            } else {
                currentCall = {};
            }
        },
            timeout !== undefined ? timeout : DEFAULT_TIMEOUT
        );
        return currentCall.timeout;
    };
}

export default actionWrapper;
