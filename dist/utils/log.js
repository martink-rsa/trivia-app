"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chalk = require("chalk");
const log = (() => {
    const info = (...params) => {
        console.log(chalk.blue.bold.inverse(' INFO '), ...params);
    };
    const error = (...params) => {
        console.log(chalk.red.bold.inverse(' ERROR '), ...params);
    };
    const success = (...params) => {
        console.log(chalk.green.bold.inverse(' SUCCESS '), ...params);
    };
    const warn = (...params) => {
        console.log(chalk.yellow.bold.inverse(' WARNING '), ...params);
    };
    return Object.assign(function (...params) {
        console.log.apply(console, arguments);
    }, {
        info,
        i: info,
        error,
        e: error,
        success,
        s: success,
        warn,
        w: warn,
    });
})();
exports.default = log;
//# sourceMappingURL=log.js.map