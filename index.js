#!/usr/bin/env node
"use strict";

const minimist = require("minimist");
const rawArgs = process.argv.slice(2);
const args = minimist(rawArgs);
const path = require("path");

const editJsonFile = require("edit-json-file");

const pkgUrl = `${process.cwd()}/package.json`;
let file = editJsonFile(pkgUrl);
const pakName = "iffe-commit";

file.set("scripts.commit", "git add . && git-cz");

file.set("config.commitizen.path", "node_modules/cz-customizable");
file.set(
  "config.cz-customizable.config",
  `node_modules/${pakName}/cz-config.js`
);

file.set(
  "husky.hooks.commit-msg",
  `commitlint --config node_modules/${pakName}/commitlint.config.js -E HUSKY_GIT_PARAMS`
);
file.save();
