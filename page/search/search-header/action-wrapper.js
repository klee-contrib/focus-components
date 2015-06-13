function searchWrapper(searchAction){
  return function(){
    const DEFAULT_TIMEOUT = 5000;
    let currentTimeout;
    var args = arguments;
    if(currentTimeout){
      //Cancel previous search action.
      window.clearTimeout(currentTimeout);
    }
    currentTimeout = window.setTimeout(
      ()=> searchAction.call(this, args),
      DEFAULT_TIMEOUT
    );
    return currentTimeout;
  };
}
module.export = searchWrapper;