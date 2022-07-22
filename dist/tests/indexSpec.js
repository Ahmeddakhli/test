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
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const index_1 = __importDefault(require("../index"));
const supertest_1 = __importDefault(require("supertest"));
const request = (0, supertest_1.default)(index_1.default);
describe('test main response', () => {
    it('To verify express app is working or not', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/api');
        expect(response.status).toBe(200);
    }));
});
//It should return 404  when there is no file'
it('It should return 404  when there is no file', () => __awaiter(void 0, void 0, void 0, function* () {
    const fileName = 'fjor';
    const response = yield request.get(`/api/image_api?filename=${fileName}&width=200&height=200`);
    expect(response.status).toBe(404);
    expect(response.text).toBe(`${fileName} does not exist .check the file name`);
}));
//Test image api
describe('Test image api', () => {
    it('It should return 500 status ', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/api/image_api');
        expect(response.status).toBe(500);
        expect(response.text).toBe('img_file_name, img_width and img_height are mandatory . Please hit the api again');
    }));
    //It should resize the image
    it('It should resize the image', () => __awaiter(void 0, void 0, void 0, function* () {
        yield request.get('/api/image_api?filename=fjord&width=200&height=200');
        const filePath = path_1.default.join(__dirname, '../../public/resizedimages', 'fjord-200-200-thumb.jpg');
        expect(fs_1.default.existsSync(filePath)).toBeTrue();
    }));
});
