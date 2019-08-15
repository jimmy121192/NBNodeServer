const express = require("express");
var app = express();
var fetch = require("node-fetch");
const port = process.env.PORT || 8800;
var request = require("request");
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
//SHOW ALL EVENTS
app.get("/events/:dataObj", function(req, resp) {
  var dataObj = JSON.parse(req.params.dataObj);
  fetch(
    "https://" +
      dataObj.site_slug +
      ".nationbuilder.com/api/v1/sites/" +
      dataObj.site_slug +
      "/pages/events?limit=10&access_token=" +
      dataObj.apikey +
      ""
  )
    .then(function(resp) {
      return resp.json();
    })
    .then(function(json) {
      console.log(json);
      resp.json(json);
    });
});
//CREATE AN EVENT
app.get("/create-event/:requestObj", function(req) {
  var dataObj = JSON.parse(req.params.requestObj);
  console.log(dataObj);
  var options = {
    method: "POST",
    url:
      "https://" +
      dataObj.site_slug +
      ".nationbuilder.com/api/v1/sites/" +
      dataObj.site_slug +
      "/pages/events",
    qs: { access_token: dataObj.apikey },
    headers: {
      Accept: "*/*",
      "Content-Type": "application/json"
    },
    body: dataObj.event,
    json: true
  };
  request(options, function(error, response, body) {
    if (error) throw new Error(error);
    console.log(body);
  });
});
//GET A EVENT
app.get("/retrieve-event/:requestObj", function(req, resp) {
  var dataObj = JSON.parse(req.params.requestObj);
  fetch(
    "https://" +
      dataObj.site_slug +
      ".nationbuilder.com/api/v1/sites/" +
      dataObj.site_slug +
      "/pages/events/" +
      dataObj.event_id +
      "?access_token=" +
      dataObj.apikey +
      ""
  )
    .then(function(resp) {
      return resp.json();
    })
    .then(function(json) {
      return resp.json(json);
    });
});
//UPDATE THAT EVENT
app.get("/update-event/:requestObj", async function(req, resp) {
  var dataObj = JSON.parse(req.params.requestObj);
  // console.log(dataObj);
  var options = {
    method: "PUT",
    url:
      "https://" +
      dataObj.site_slug +
      ".nationbuilder.com/api/v1/sites/" +
      dataObj.site_slug +
      "/pages/events/" +
      dataObj.event_id +
      "?access_token=" +
      dataObj.apikey +
      "",
    qs: { access_token: dataObj.apikey },
    headers: {
      Accept: "*/*",
      "Content-Type": "application/json"
    },
    body: dataObj.event,
    json: true
  };
  await request(options, function(error, response, body) {
    if (error) throw new Error(error);
    if (!error && response.statusCode == 200) {
      console.log(body);
    }
  });
});
//SHOW ALL PEOPLE
app.get("/people/:dataObj", function(req, resp) {
  var dataObj = JSON.parse(req.params.dataObj);
  fetch(
    "https://" +
      dataObj.site_slug +
      ".nationbuilder.com/api/v1/people?limit=20&access_token=" +
      dataObj.apikey +
      ""
  )
    .then(function(resp) {
      return resp.json();
    })
    .then(function(json) {
      console.log(json);
      resp.json(json);
    });
});
//CREATE A PERSON
app.get("/create-person/:requestObj", function(req) {
  var dataObj = JSON.parse(req.params.requestObj);
  // console.log(dataObj);
  var options = {
    method: "POST",
    url: "https://" + dataObj.site_slug + ".nationbuilder.com/api/v1/people",
    qs: { access_token: dataObj.apikey },
    headers: {
      Accept: "*/*",
      "Content-Type": "application/json"
    },
    body: dataObj.person,
    json: true
  };
  request(options, function(error, response, body) {
    if (error) throw new Error(error);
    console.log(body);
  });
});
//GET A PERSON
app.get("/retrieve-person/:requestObj", function(req, resp) {
  var dataObj = JSON.parse(req.params.requestObj);
  fetch(
    "https://" +
      dataObj.site_slug +
      ".nationbuilder.com/api/v1/people/" +
      dataObj.id +
      "?access_token=" +
      dataObj.apikey +
      ""
  )
    .then(function(resp) {
      return resp.json();
    })
    .then(function(json) {
      return resp.json(json);
    });
});
//UPDATE THAT PERSON
app.get("/update-person/:requestObj", async function(req, resp) {
  var dataObj = JSON.parse(req.params.requestObj);
  // console.log(dataObj);
  var options = {
    method: "PUT",
    url:
      "https://" +
      dataObj.site_slug +
      ".nationbuilder.com/api/v1/people/" +
      dataObj.id +
      "",
    qs: { access_token: dataObj.apikey },
    headers: {
      Accept: "*/*",
      "Content-Type": "application/json"
    },
    body: dataObj.person,
    json: true
  };
  await request(options, function(error, response, body) {
    if (error) throw new Error(error);
    if (!error && response.statusCode == 200) {
      console.log(body);
    }
  });
});
//DELETE A PERSON
app.get("/delete-person/:requestObj", function(req, resp) {
  var dataObj = JSON.parse(req.params.requestObj);
  // console.log(dataObj)
  fetch(
    "https://" +
      dataObj.site_slug +
      ".nationbuilder.com/api/v1/people/" +
      dataObj.id +
      "?access_token=" +
      dataObj.apikey +
      "",
    {
      method: "DELETE"
    }
  ).then(function(resp) {
    if (resp.status == 204) {
      console.log(resp);
    }
  });
});
app.listen(port, function(err) {
  if (err) {
    console.log("Code doesn't work, Jimmy: " + err);
    return false;
  }
  console.log("Port is open for Jimmy!!");
});
