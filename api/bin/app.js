"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var server_1 = require("./utils/server");
var logger_1 = __importDefault(require("@exmpl/utils/logger"));
logger_1.default.debug("app.ts::init()");
server_1.createServer()
    .then(function (server) {
    server.listen(3021, function () {
        logger_1.default.info("Listening on port: " + 3021);
    });
})
    .catch(function (err) {
    logger_1.default.error("Error:: " + err);
});
