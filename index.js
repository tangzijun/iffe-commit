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

// 添加scripts脚本
file.set("scripts.commit", "git add . && git-cz");
file.set("scripts.push", "git push origin dev");
file.set("scripts.pull", "git pull origin dev --rebase");

// 添加commitizen配置
file.set("config.commitizen.path", "node_modules/cz-customizable");
file.set(
  "config.cz-customizable.config",
  `node_modules/${pakName}/cz-config.js`
);

// 添加husky配置
file.set(
  "husky.hooks.commit-msg",
  `commitlint --config node_modules/${pakName}/commitlint.config.js -E HUSKY_GIT_PARAMS`
);
file.save();
