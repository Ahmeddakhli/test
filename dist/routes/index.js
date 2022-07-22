"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express")); //iimport express
const imageProcessingApi_1 = __importDefault(require("./imgApi/imageProcessingApi")); //iimport Api
const routes = express_1.default.Router(); //express.Router
routes.use('/image_api', imageProcessingApi_1.default); // main routes
routes.get('/', (req, res) => {
    res.send('test image apis projects');
}); // test
exports.default = routes; // export routes
