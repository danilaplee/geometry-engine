"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDB = exports.setCors = void 0;
var admin = require("firebase-admin");
var serviceAccount = require("../serviceAccountKey.json");
var config_1 = require("./config");
var setCors = function (req, res) {
    res.set('Access-Control-Allow-Origin', '*');
    if (req.method === 'OPTIONS') {
        // Send response to OPTIONS requests
        res.set('Access-Control-Allow-Methods', 'GET');
        res.set('Access-Control-Allow-Headers', 'Content-Type');
        res.set('Access-Control-Max-Age', '3600');
        res.status(204).send('');
    }
    else {
        // res.send('Hello World!');
    }
    return res;
};
exports.setCors = setCors;
var getDB = function () {
    admin.initializeApp(__assign(__assign({}, config_1.firebaseConfig), { credential: admin.credential.cert(serviceAccount), databaseAuthVariableOverride: {
            uid: "sqs-processor"
        } }));
    var db = admin.database();
    return db;
};
exports.getDB = getDB;
//# sourceMappingURL=utils.js.map