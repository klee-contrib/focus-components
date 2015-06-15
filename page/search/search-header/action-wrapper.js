var currentTimeout;
function actionWrapper(searchAction){
  return function(){
    const DEFAULT_TIMEOUT = 5000;
    var context = this || {};
    var args = arguments;
    if(currentTimeout){
      //Cancel previous search action.
      window.clearTimeout(currentTimeout);
    }
    currentTimeout = window.setTimeout(
      function(){
        searchAction.apply(context, args)
      },
      DEFAULT_TIMEOUT
    );
    return currentTimeout;
  };
}
module.exports = actionWrapper;
