var path = require('path');

function route(handle, pathname, response, postData, dbtest) {
  //console.log("A punto de rutear una peticion para " + pathname);

  if(pathname == '/modifyDB'){
      handle[pathname](response, postData,dbtest);
  }else if(typeof handle[pathname] == 'function') {// prove that the "pathname" is the same name of one of the 
  	                                          //functions defined in out environment. in this case the function was defined in requestHandlers
    handle[pathname](response, postData); //call the function with its parameters. The function is in the environment.
  } else if(path.extname(pathname) == '.js') { // redirect ALL js files to this function
      handle['/addJS'](response, postData, pathname);
  } else{
    console.log("No se ha encontrado manipulador para " + pathname);
    response.writeHead(404, {"Content-Type": "text/html"});
    response.write("404 No encontrado");
    response.end();
  }
}

exports.route = route;
