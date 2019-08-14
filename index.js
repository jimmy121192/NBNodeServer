const express = require("express");
var app = express();
var fetch = require('node-fetch');
const port = process.env.PORT || 8800;

// const jsonServer = require("json-server");
// const path = require("path");
// const server = jsonServer.create();
// const router = jsonServer.router(path.join(__dirname, "listDB.json"));
// const middlewares = jsonServer.defaults();
// server.use(middlewares);
// server.use(router);
// server.listen(8080, () => {
//   console.log("JSON Server is running");
// });

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

  app.get("/events/:dataObj", function(req, resp){
    var dataObj = JSON.parse(req.params.dataObj);
    fetch("https://"+dataObj.site_slug+".nationbuilder.com/api/v1/sites/"+dataObj.site_slug+"/pages/events?limit=10&access_token="+dataObj.apikey+"").then(function(resp){
			
        return resp.json();
    }).then(function(json){
        console.log(json);
        resp.json(json);
    });

})



app.listen(port, function(err){

if(err){
	console.log("Code doesn't work, Jimmy: "+err);
	return false;
}

console.log("Port is open for Jimmy!!")

});