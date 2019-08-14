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

  app.get("/events", function(req, resp){
    fetch("https://jimmysandbox.nationbuilder.com/api/v1/sites/jimmysandbox/pages/events?limit=10&access_token=99824f989930fca6e85f2ad5e9a47f7a3866c742257d1dcbb37e24139e598fe5").then(function(resp){
			
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