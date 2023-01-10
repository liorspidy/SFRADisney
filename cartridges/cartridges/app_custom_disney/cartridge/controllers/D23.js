"use strict";

var server = require("server");

server.get("Start", function (req, res, next) {
    var PageMgr = require("dw/experience/PageMgr");
    var page = PageMgr.getPage("d23");

    if (page && page.isVisible()) {
        res.page("d23");
    } else {
        res.render("home/homePage");
    }
    next();
});

module.exports = server.exports();
