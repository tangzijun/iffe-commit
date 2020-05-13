#!/usr/bin/env node
"use strict";

const path = require("path");
const bootstrap = require("commitizen/dist/cli/git-cz").bootstrap;

console.info("~~~~~~~~~", path.join(__dirname, "node_modules/commitizen"));

bootstrap({
  cliPath: path.join(__dirname, "node_modules/commitizen"),
  // this is new
  config: {
    path: "cz-customizable",
  },
});
