"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const express_1 = __importDefault(require("express"));
const imgUtilities_1 = require("../../imgUtilities");
const app = express_1.default.Router();
app.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    const img_height = parseInt((_a = req.query) === null || _a === void 0 ? void 0 : _a.height);
    const img_width = parseInt((_b = req.query) === null || _b === void 0 ? void 0 : _b.width);
    const img_file_name = (_c = req.query) === null || _c === void 0 ? void 0 : _c.filename;
    if (!img_file_name || !img_width || !img_height) {
        res
            .status(500)
            .send('img_file_name, img_width and img_height are mandatory . Please hit the api again');
    }
    else {
        const image_path = path_1.default.join(__dirname, '../../../public/oraginimages', `${img_file_name}.jpg`);
        if (!fs_1.default.existsSync(image_path)) {
            // If there is no such file
            res
                .status(404)
                .send(`${img_file_name} does not exist .check the file name`);
        }
        else {
            const resizedImage = path_1.default.join(__dirname, '../../../public/resizedimages', `${img_file_name}-${img_width}-${img_height}-thumb.jpg`);
            if (fs_1.default.existsSync(resizedImage)) {
                // Return resizedImage, If we already have resized image
                res.sendFile(resizedImage);
            }
            else {
                yield (0, imgUtilities_1.resizedImages)(img_file_name, img_width, img_height); // If there is no resized file for that Name.
                // Send  image to client.
                res.sendFile(path_1.default.join(__dirname, '../../../public/resizedimages', `${img_file_name}-${img_width}-${img_height}-thumb.jpg`));
            }
        }
    }
}));
exports.default = app;
