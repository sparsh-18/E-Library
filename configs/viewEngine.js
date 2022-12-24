const express = require('express');
// const bodyParser = require("body-parser");

// const configViewEngine = require("./configs/viewEngine");

/**
 * Config view engine for app
 */

let configViewEngine = (app)=> {
    app.use(express.static("public"));
    // app.use(bodyParser.urlencoded({ extended: true }));
    // app.use(bodyParser.json());
    app.set("view engine", "ejs");
};

module.exports = configViewEngine;
