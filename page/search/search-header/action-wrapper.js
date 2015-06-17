const DEFAULT_TIMEOUT = 500; // 0.5s
var currentCall = {};
function actionWrapper(searchAction, context){
  return function(){
    context = context || this || {};
    var args = arguments;
    if(currentCall){
      //Cancel previous search action.
      window.clearTimeout(currentCall.timeout);
      if(currentCall.action && currentCall.action.cancel){
        currentCall.action.cancel();
      }
    }
    currentCall.timeout = window.setTimeout(
      function(){
        currentCall.action = searchAction.apply(context, args);
        if(currentCall.action && currentCall.action.cancel){
          currentCall.action.then(()=>{
            currentCall ={};
          })
        }else{
          currentCall ={};
        }
      },
      DEFAULT_TIMEOUT
    );
    return currentCall.timeout;
  };
}
module.exports = actionWrapper;
